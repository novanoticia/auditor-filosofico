"""Regression checks for the root SKILL.md required by web skill importers."""

import contextlib
import io
import json
from pathlib import Path
import re
import sys
import tempfile
import unittest
from unittest.mock import patch
from zipfile import ZipFile

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))
import build


class WebSkillPackages(unittest.TestCase):
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
                    for name in ("core", *build.MODULES):
                        self.assertIn((source_root / f"src/{name}.md").read_text().strip(), text)
                    self.assertIn((source_root / f"src/adapters/{platform}.md").read_text().strip(), text)
                    self.assertNotIn("references/", text)
                    # Rebuilding must produce the same downloadable artifact.
                    first = archive_path.read_bytes()
                    with patch.object(build, "ROOT", Path(directory)), contextlib.redirect_stdout(io.StringIO()):
                        build.package_web_skills(outputs)
                    self.assertEqual(first, archive_path.read_bytes())


if __name__ == "__main__":
    unittest.main()
