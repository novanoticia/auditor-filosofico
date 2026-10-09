"""Reject malformed package inputs without crashing or writing generated files."""

import contextlib
import io
import json
from pathlib import Path
import shutil
import sys
import tempfile
import unittest
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))
import build
import validate


class ValidationInputs(unittest.TestCase):
    def setUp(self):
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        self.root = Path(temporary.name)
        shutil.copytree(build.ROOT / "src", self.root / "src")
        for name in ("project.json", "LICENSE"):
            shutil.copy(build.ROOT / name, self.root / name)
        for module in (build, validate):
            patcher = patch.object(module, "ROOT", self.root)
            patcher.start()
            self.addCleanup(patcher.stop)
        with patch.object(sys, "argv", ["build.py"]), contextlib.redirect_stdout(io.StringIO()):
            self.assertEqual(build.main(), 0)

    def write_json(self, relative, value):
        path = self.root / relative
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(json.dumps(value), encoding="utf-8")

    def test_valid_repository(self):
        self.assertEqual(validate.validate(), [])

    def test_invalid_project_reports_error_and_does_not_write(self):
        config = json.loads((self.root / "project.json").read_text())
        for value in ([], {}, dict(config, version=3), dict(config, version="../bad")):
            with self.subTest(value=value):
                self.write_json("project.json", value)
                before = {p: p.read_bytes() for p in self.root.rglob("*") if p.is_file()}
                self.assertTrue(validate.validate())
                with patch.object(sys, "argv", ["build.py"]), contextlib.redirect_stderr(io.StringIO()):
                    self.assertEqual(build.main(), 1)
                self.assertEqual(before, {p: p.read_bytes() for p in self.root.rglob("*") if p.is_file()})

    def test_invalid_json_and_missing_source_report_error(self):
        (self.root / "project.json").write_text("{", encoding="utf-8")
        self.assertTrue(validate.validate())

    def test_missing_source_reports_error(self):
        (self.root / "src/core.md").unlink()
        self.assertTrue(validate.validate())

    def test_invalid_utf8_reports_file_errors(self):
        cases = (
            ("extra.md", "Markdown ilegible"),
            ("extra.json", "JSON inválido"),
            ("plugins/codex/auditor-filosofico/skills/auditor-filosofico/agents/openai.yaml", "Política de Codex ilegible"),
        )
        for relative, diagnostic in cases:
            with self.subTest(relative=relative):
                path = self.root / relative
                previous = path.read_bytes() if path.exists() else None
                path.write_bytes(b"\xff")
                try:
                    errors = validate.validate()
                    self.assertTrue(any(diagnostic in error and relative in error for error in errors), errors)
                finally:
                    if previous is None:
                        path.unlink()
                    else:
                        path.write_bytes(previous)

    def test_unencodable_project_reports_error_and_does_not_write(self):
        config = json.loads((self.root / "project.json").read_text())
        self.write_json("project.json", dict(config, description="\ud800"))
        before = {p: p.read_bytes() for p in self.root.rglob("*") if p.is_file()}
        errors = validate.validate()
        self.assertTrue(any("fuentes del paquete" in error for error in errors), errors)
        self.assertEqual(before, {p: p.read_bytes() for p in self.root.rglob("*") if p.is_file()})

    def test_unreadable_files_report_errors(self):
        extra = self.root / "extra.md"
        extra.write_text("Documento", encoding="utf-8")
        original_text = Path.read_text
        original_bytes = Path.read_bytes

        def read_text(path, *args, **kwargs):
            if path == extra:
                raise PermissionError("lectura denegada")
            return original_text(path, *args, **kwargs)

        def read_bytes(path, *args, **kwargs):
            if path == self.root / "downloads/auditor-filosofico-le-chat-skill.zip":
                raise PermissionError("lectura denegada")
            return original_bytes(path, *args, **kwargs)

        with patch.object(Path, "read_text", read_text), patch.object(Path, "read_bytes", read_bytes):
            errors = validate.validate()
        self.assertTrue(any("Markdown ilegible: extra.md" in error for error in errors), errors)
        self.assertTrue(any("No se puede leer la adaptación: downloads/" in error for error in errors), errors)

    def test_malformed_manifests_report_errors(self):
        cases = (
            ("plugin.json", []),
            ("plugin.json", {"skills": []}),
            ("marketplace.json", []),
            ("marketplace.json", {}),
            ("marketplace.json", {"plugins": [None]}),
            ("marketplace.json", {"plugins": [{"source": {}}]}),
            ("marketplace.json", {"plugins": [{"source": []}]}),
        )
        for name, value in cases:
            with self.subTest(name=name, value=value):
                self.write_json("extra/" + name, value)
                self.assertTrue(validate.validate())
                (self.root / "extra" / name).unlink()

    def test_skill_directory_cannot_escape_plugin(self):
        config = json.loads((self.root / "project.json").read_text())
        self.write_json("extra/.codex-plugin/plugin.json", {
            "name": config["name"], "version": config["version"], "skills": "../skills",
        })
        self.assertTrue(validate.validate())

    def test_marketplace_cannot_escape_repository(self):
        self.write_json("extra/marketplace.json", {"plugins": [{"source": "../"}]})
        self.assertTrue(validate.validate())

    def test_manifest_paths_reject_nul_and_symlink_loop(self):
        (self.root / "loop").symlink_to("loop", target_is_directory=True)
        config = json.loads((self.root / "project.json").read_text())
        for directory in ("\x00", "./loop"):
            with self.subTest(directory=directory):
                self.write_json("extra/.codex-plugin/plugin.json", {
                    "name": config["name"], "version": config["version"], "skills": directory,
                })
                self.write_json("extra/marketplace.json", {"plugins": [{"source": directory}]})
                errors = validate.validate()
                self.assertTrue(any("Directorio de skills" in error for error in errors), errors)
                self.assertTrue(any("Plugin fuera del paquete" in error for error in errors), errors)

    def test_marketplace_requires_a_plugin_manifest(self):
        config = json.loads((self.root / "project.json").read_text())
        for source in ("./src", {"source": "local", "path": "./src"}):
            with self.subTest(source=source):
                self.write_json("extra/marketplace.json", {"plugins": [{"name": config["name"], "source": source}]})
                errors = validate.validate()
                self.assertTrue(any("Manifiesto de plugin ausente" in error for error in errors), errors)

    def test_marketplace_entry_matches_the_plugin(self):
        config = json.loads((self.root / "project.json").read_text())
        cases = (
            {"name": "otro-plugin", "source": "./plugins/claude/auditor-filosofico"},
            {"name": config["name"], "source": "./plugins/claude/auditor-filosofico", "version": "99.0.0"},
            {"name": config["name"], "source": {"source": "url", "path": "./plugins/codex/auditor-filosofico"}},
        )
        for plugin in cases:
            with self.subTest(plugin=plugin):
                self.write_json("extra/marketplace.json", {"plugins": [plugin]})
                self.assertTrue(validate.validate())


if __name__ == "__main__":
    unittest.main()
