#!/usr/bin/env python3
"""Validate generated adapters, local links, versions and activation controls."""

import json
from pathlib import Path
import re
import sys

from build import ROOT, load_config, render, render_web_packages


def local_directory(base, value):
    """Accept only existing relative directories contained in their package."""
    if not isinstance(value, str) or not value.strip() or Path(value).is_absolute():
        return False
    root = (base / value).resolve()
    return root.is_relative_to(base.resolve()) and root.is_dir()


def validate():
    errors = []
    try:
        config = load_config()
        outputs = render()
    except (OSError, ValueError) as error:
        return [f"No se pueden leer las fuentes del paquete: {error}"]
    for relative, expected in {**outputs, **render_web_packages(outputs)}.items():
        path = ROOT / relative
        expected_bytes = expected if isinstance(expected, bytes) else expected.encode("utf-8")
        if not path.is_file() or path.read_bytes() != expected_bytes:
            errors.append(f"Adaptación desactualizada: {relative}")

    for path in ROOT.rglob("*.json"):
        if ".git" in path.parts or ".artifacts" in path.parts:
            continue
        try:
            value = json.loads(path.read_text(encoding="utf-8"))
        except (OSError, ValueError) as error:
            errors.append(f"JSON inválido: {path.relative_to(ROOT)}: {error}")
            continue
        if path.name in ("plugin.json", "marketplace.json") and not isinstance(value, dict):
            errors.append(f"Manifiesto inválido (se esperaba un objeto): {path.relative_to(ROOT)}")
            continue
        if path.name == "plugin.json":
            if value.get("name") != config["name"] or value.get("version") != config["version"]:
                errors.append(f"Nombre/versión incoherente: {path.relative_to(ROOT)}")
            if "skills" in value and not local_directory(path.parent.parent, value["skills"]):
                errors.append(f"Directorio de skills fuera del plugin, inválido o ausente: {path.relative_to(ROOT)}")
        if path.name == "marketplace.json":
            if not isinstance(value.get("plugins"), list):
                errors.append(f"Lista de plugins inválida: {path.relative_to(ROOT)}")
                continue
            for plugin in value["plugins"]:
                source = plugin.get("source") if isinstance(plugin, dict) else None
                relative = source.get("path") if isinstance(source, dict) else source
                if not local_directory(ROOT, relative):
                    errors.append(f"Plugin fuera del paquete, inválido o ausente: {path.relative_to(ROOT)}: {relative}")

    for path in ROOT.rglob("*.md"):
        if ".git" in path.parts or "references/originales" in path.as_posix():
            continue
        content = path.read_text(encoding="utf-8")
        for target in re.findall(r"\[[^\]]*\]\(([^)]+)\)", content):
            if "://" in target or target.startswith(("#", "mailto:")):
                continue
            target_path = target.split("#", 1)[0]
            if target_path and not (path.parent / target_path).exists():
                errors.append(f"Enlace roto en {path.relative_to(ROOT)}: {target}")
        if path.name == "SKILL.md":
            if not content.startswith("---\n") or "\n---\n" not in content[4:]:
                errors.append(f"Frontmatter ausente: {path.relative_to(ROOT)}")
            elif not re.search(r"^name: [a-z][a-z0-9-]*$", content, re.MULTILINE):
                errors.append(f"Nombre de skill inválido: {path.relative_to(ROOT)}")
            if "plugins/claude/" in path.as_posix() and "disable-model-invocation: true" not in content:
                errors.append("Claude debe requerir invocación explícita")

    codex_policy = ROOT / "plugins/codex/auditor-filosofico/skills/auditor-filosofico/agents/openai.yaml"
    if not codex_policy.is_file() or "allow_implicit_invocation: false" not in codex_policy.read_text():
        errors.append("Codex debe requerir selección explícita de la skill")
    return errors


if __name__ == "__main__":
    problems = validate()
    if problems:
        print("\n".join(problems), file=sys.stderr)
        raise SystemExit(1)
    print("Validación correcta: adaptaciones, manifiestos, versiones, enlaces y activación.")
