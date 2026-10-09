"""Regression checks for the root SKILL.md required by web skill importers."""

import contextlib
import io
import json
from pathlib import Path
import re
import shutil
import sys
import tempfile
import unittest
from unittest.mock import patch
from zipfile import ZipFile

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))
import build


class WebSkillPackages(unittest.TestCase):
    def test_packages_match_across_host_platforms(self):
        outputs = build.render()
        packages = []
        for platform in ("linux", "win32"):
            with patch("zipfile.sys.platform", platform):
                packages.append(build.render_web_packages(outputs))
        self.assertEqual(packages[0], packages[1])

    def test_importable_zip_and_standalone_have_complete_method(self):
        outputs = build.render()
        source_root = build.ROOT
        with tempfile.TemporaryDirectory() as directory:
            with patch.object(build, "ROOT", Path(directory)), contextlib.redirect_stdout(io.StringIO()):
                build.package_web_skills(outputs)
            for platform in build.WEB_ADAPTERS:
                with self.subTest(platform=platform):
                    archive_path = Path(directory) / f".artifacts/auditor-filosofico-{platform}-skill.zip"
                    with ZipFile(archive_path) as archive:
                        self.assertIsNone(archive.testzip())
                        self.assertEqual(set(archive.namelist()), {"SKILL.md", "LICENSE"})
                        text = archive.read("SKILL.md").decode("utf-8")
                        self.assertEqual(text, outputs[f"adapters/{platform}/SKILL.md"])
                        self.assertEqual(archive.read("LICENSE").decode(), outputs["skills/auditor-filosofico/LICENSE"])
                    frontmatter = text.split("---\n", 2)[1]
                    self.assertTrue(text.startswith("---\n"))
                    self.assertIn("name: auditor-filosofico\n", frontmatter)
                    description = re.search(r"^description: (.+)$", frontmatter, re.MULTILINE)
                    self.assertIsNotNone(description)
                    self.assertTrue(json.loads(description.group(1)))
                    version = json.loads((source_root / 'project.json').read_text())['version']
                    self.assertIn('  version: ' + json.dumps(version), frontmatter)
                    for name in ("core", *build.MODULES):
                        self.assertIn((source_root / f"src/{name}.md").read_text().strip(), text)
                    self.assertIn((source_root / f"src/adapters/{platform}.md").read_text().strip(), text)
                    self.assertNotIn("references/", text)
                    # Rebuilding must produce the same downloadable artifact.
                    first = archive_path.read_bytes()
                    with patch.object(build, "ROOT", Path(directory)), contextlib.redirect_stdout(io.StringIO()):
                        build.package_web_skills(outputs)
                    self.assertEqual(first, archive_path.read_bytes())

    def test_build_generates_and_checks_repository_zip(self):
        source_root = build.ROOT
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            shutil.copytree(source_root / 'src', root / 'src')
            for name in ('project.json', 'LICENSE'):
                shutil.copy(source_root / name, root / name)
            with patch.object(build, 'ROOT', root), contextlib.redirect_stdout(io.StringIO()), contextlib.redirect_stderr(io.StringIO()):
                with patch.object(sys, 'argv', ['build.py']):
                    self.assertEqual(build.main(), 0)
                packages = build.render_web_packages(build.render())
                for name, expected in packages.items():
                    self.assertEqual((root / name).read_bytes(), expected)
                path = root / next(iter(packages))
                with patch.object(sys, 'argv', ['build.py', '--check']):
                    self.assertEqual(build.main(), 0)
                    path.write_bytes(b'stale archive')
                    self.assertEqual(build.main(), 1)
                    self.assertEqual(path.read_bytes(), b'stale archive')
                    path.unlink()
                    self.assertEqual(build.main(), 1)
                with patch.object(sys, 'argv', ['build.py']):
                    self.assertEqual(build.main(), 0)
                self.assertEqual(path.read_bytes(), packages[path.relative_to(root).as_posix()])
                # A version change must change every ZIP, even if the method is unchanged.
                config = json.loads((root / 'project.json').read_text())
                config['version'] = '99.0.0'
                (root / 'project.json').write_text(json.dumps(config))
                updated = build.render_web_packages(build.render())
                for name in packages:
                    self.assertNotEqual(packages[name], updated[name])


if __name__ == "__main__":
    unittest.main()
