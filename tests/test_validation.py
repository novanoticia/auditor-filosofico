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


if __name__ == "__main__":
    unittest.main()
