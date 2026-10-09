# Skills para descargar

| Plataforma | ZIP listo para subir a Skills | Markdown alternativo |
| --- | --- | --- |
| Mistral Le Chat | [Descargar ZIP](https://github.com/novanoticia/auditor-filosofico/raw/refs/heads/main/downloads/auditor-filosofico-le-chat-skill.zip) | [SKILL.md](../adapters/le-chat/SKILL.md) |
| Perplexity | [Descargar ZIP](https://github.com/novanoticia/auditor-filosofico/raw/refs/heads/main/downloads/auditor-filosofico-perplexity-skill.zip) | [SKILL.md](../adapters/perplexity/SKILL.md) |

Sube directamente el ZIP de tu plataforma, sin descomprimirlo. Ambos incluyen `SKILL.md` en la raíz, nombre y descripción YAML, la versión del paquete y todo el método, junto con la licencia.

Estos archivos están incluidos en Git y corresponden al código de su revisión. Los enlaces de descarga apuntan a la versión actual de `main`; las [releases](https://github.com/novanoticia/auditor-filosofico/releases) conservan las descargas de cada versión.

No edites los ZIP a mano. `python3 scripts/build.py` los regenera desde el método y `project.json`; `--check` comprueba también que los ZIP no falten ni estén desactualizados. `--package` copia esos mismos bytes a `.artifacts/` para adjuntarlos a la release.

Al cambiar la versión de `project.json` en `main`, el workflow regenera y guarda las adaptaciones y los ZIP, valida el resultado y publica la release. Incluye las notas en `docs/releases/v<versión>.md` antes de publicar una versión nueva; también hay ejecución manual del workflow.
