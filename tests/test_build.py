"""Build failures must leave adapters and release archives unchanged."""

import contextlib
import io
import json
from pathlib import Path
import shutil
import sys
import tempfile
import unittest
from unittest.mock import patch
from zipfile import ZIP_DEFLATED, ZIP_STORED, ZipFile

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))
import build


class BuildPreparation(unittest.TestCase):
    def setUp(self):
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        self.root = Path(temporary.name)
        for name in ("src", "docs", "evals"):
            shutil.copytree(build.ROOT / name, self.root / name)
        for name in ("project.json", "LICENSE"):
            shutil.copy(build.ROOT / name, self.root / name)
        patcher = patch.object(build, "ROOT", self.root)
        patcher.start()
        self.addCleanup(patcher.stop)

    def run_build(self, *arguments):
        errors = io.StringIO()
        with patch.object(sys, "argv", ["build.py", *arguments]), \
                contextlib.redirect_stdout(io.StringIO()), contextlib.redirect_stderr(errors):
            result = build.main()
        return result, errors.getvalue()

    def snapshot(self):
        return {
            path.relative_to(self.root).as_posix(): path.read_bytes()
            for path in self.root.rglob("*") if path.is_file()
        }

    def test_surrogates_report_errors_without_writing(self):
        config = json.loads((self.root / "project.json").read_text(encoding="utf-8"))
        for field in ("name", "display_name", "license", "repository", "description"):
            for arguments in ((), ("--check",), ("--package",)):
                with self.subTest(field=field, arguments=arguments):
                    (self.root / "project.json").write_text(
                        json.dumps(dict(config, **{field: "\ud800"})), encoding="utf-8"
                    )
                    before = self.snapshot()
                    result, error = self.run_build(*arguments)
                    self.assertEqual(result, 1)
                    self.assertIn("No se puede generar el paquete:", error)
                    self.assertIn("UTF-8", error)
                    self.assertEqual(self.snapshot(), before)

    def test_missing_package_sources_preserve_existing_outputs(self):
        self.assertEqual(self.run_build("--package")[0], 0)
        # A valid source change would overwrite the adapters without preparation.
        with (self.root / "src/core.md").open("a", encoding="utf-8") as source:
            source.write("\nCambio del método para esta prueba.\n")
        for relative in ("docs/chats-web.md", "evals/README.md", "evals/casos.json"):
            with self.subTest(relative=relative):
                path = self.root / relative
                content = path.read_bytes()
                path.unlink()
                before = self.snapshot()
                result, error = self.run_build("--package")
                self.assertEqual(result, 1)
                self.assertIn(relative, error)
                self.assertEqual(self.snapshot(), before)
                path.write_bytes(content)

    def test_invalid_package_source_encoding_does_not_create_outputs(self):
        (self.root / "docs/chats-web.md").write_bytes(b"\xff")
        before = self.snapshot()
        result, error = self.run_build("--package")
        self.assertEqual(result, 1)
        self.assertIn("No se puede generar el paquete:", error)
        self.assertEqual(self.snapshot(), before)
        self.assertFalse((self.root / ".artifacts").exists())

    def test_check_does_not_write(self):
        self.assertEqual(self.run_build()[0], 0)
        before = self.snapshot()
        self.assertEqual(self.run_build("--check")[0], 0)
        self.assertEqual(self.snapshot(), before)
        self.assertFalse((self.root / ".artifacts").exists())

    def test_check_can_package_synchronized_adapters_for_release(self):
        self.assertEqual(self.run_build()[0], 0)
        before = self.snapshot()
        self.assertEqual(self.run_build("--check", "--package")[0], 0)
        after = self.snapshot()
        self.assertEqual({path: data for path, data in after.items()
                          if not path.startswith(".artifacts/")}, before)
        self.assertEqual(len([path for path in after if path.startswith(".artifacts/")]), 4)
        for platform in build.WEB_ADAPTERS:
            name = f"auditor-filosofico-{platform}-skill.zip"
            self.assertEqual(after[f".artifacts/{name}"], before[f"downloads/{name}"])

    def test_stale_check_does_not_write_release_packages(self):
        self.assertEqual(self.run_build()[0], 0)
        (self.root / "prompts/auditor-filosofico.md").write_text("desactualizado", encoding="utf-8")
        before = self.snapshot()
        result, error = self.run_build("--check", "--package")
        self.assertEqual(result, 1)
        self.assertIn("prompts/auditor-filosofico.md", error)
        self.assertEqual(self.snapshot(), before)
        self.assertFalse((self.root / ".artifacts").exists())

    def test_release_archives_are_deterministic_with_fixed_metadata(self):
        packages = []
        for platform in ("linux", "win32"):
            with patch("zipfile.sys.platform", platform):
                self.assertEqual(self.run_build("--package")[0], 0)
            packages.append({path: data for path, data in self.snapshot().items()
                             if path.startswith(".artifacts/")})
        self.assertEqual(packages[0], packages[1])
        for relative, content in packages[0].items():
            with self.subTest(relative=relative), ZipFile(io.BytesIO(content)) as archive:
                self.assertIsNone(archive.testzip())
                compression = (ZIP_STORED if any(f"-{platform}-skill.zip" in relative
                                                for platform in build.WEB_ADAPTERS)
                               else ZIP_DEFLATED)
                for entry in archive.infolist():
                    self.assertEqual(entry.date_time, (1980, 1, 1, 0, 0, 0))
                    self.assertEqual(entry.create_system, 3)
                    self.assertEqual(entry.external_attr, 0o100644 << 16)
                    self.assertEqual(entry.compress_type, compression)


if __name__ == "__main__":
    unittest.main()
