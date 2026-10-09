# Instalación y activación

Los ejemplos de instalación desde GitHub usan la rama `main` una vez incorporada la primera versión. Para revisar una propuesta en otra rama, clónala y utiliza las instrucciones locales.

## Codex

En una versión con soporte para plugins:

```bash
codex plugin marketplace add novanoticia/auditor-filosofico --ref main
codex plugin add auditor-filosofico@auditor-filosofico-marketplace
```

Para un checkout local, registra el directorio raíz del repositorio:

```bash
codex plugin marketplace add /ruta/al/auditor-filosofico
codex plugin add auditor-filosofico@auditor-filosofico-marketplace
```

Abre una conversación y selecciona la skill o escribe:

```text
$auditor-filosofico analiza este texto: …
```

La skill configura `allow_implicit_invocation: false`: el nombre en lenguaje natural no sustituye la selección en clientes que apliquen esa política. La selección del enfoque sigue siendo automática. Usa el selector del cliente para volver a invocarla cuando sea necesario.

Si tu cliente solo admite skills, copia la carpeta completa [skills/auditor-filosofico](../skills/auditor-filosofico) en `.agents/skills/` del proyecto donde quieras usarla, conservando `references/` y `agents/`. Evita instalar a la vez la copia manual y el plugin en el mismo ámbito. Consulta la [documentación de skills de Codex](https://developers.openai.com/codex/skills) para los ámbitos admitidos por tu versión.

## Claude Code

Dentro de Claude Code:

```text
/plugin marketplace add novanoticia/auditor-filosofico
/plugin install auditor-filosofico@auditor-filosofico-marketplace
/auditor-filosofico:auditar analiza este texto: …
```

Para comprobar un checkout local sin instalarlo en el catálogo:

```bash
claude --plugin-dir /ruta/al/auditor-filosofico/plugins/claude/auditor-filosofico
```

La skill `auditar` requiere invocación explícita mediante el comando o selector admitido por el cliente. El comando lleva el nombre del plugin para reducir colisiones. Para acompañamiento, invoca `/auditor-filosofico:auditar acompáñame en esta conversación`; para desactivarlo basta la petición expresa.

## ChatGPT, Claude en chat y otras IAs

Puedes utilizar el método sin plugin nativo:

1. Introduce el [prompt completo](../prompts/auditor-filosofico.md) como configuración inicial y explica que estás configurando al Auditor Filosófico.
2. En el siguiente mensaje invócalo por su nombre y aporta el contenido: «Auditor Filosófico: analiza este texto: …».
3. Solicita un idioma, profundidad o perspectiva si quieres cambiar los valores predeterminados.

Si un asistente, proyecto o espacio permite adjuntar archivos de configuración, añade el prompt completo y utiliza las [instrucciones breves](../prompts/instrucciones-breves.md) en el campo de instrucciones. Esas instrucciones requieren que el modelo pueda consultar el archivo: si no puede, utiliza el prompt completo en el contexto disponible.

La disponibilidad de proyectos, asistentes, importación de skills o límites de instrucciones depende de la cuenta y el producto. En Mistral, Perplexity u otros clientes, la ruta portable se aplica a espacios que admitan introducir instrucciones; no instala una extensión nativa ni modifica todos tus chats.

Para clientes que acepten skills en ZIP, genera el paquete con `python3 scripts/build.py --package` e importa `.artifacts/auditor-filosofico-skill.zip` según las opciones de ese cliente. Conserva todas sus referencias. La admisión del ZIP debe comprobarse en cada producto.

## Comprobar que quedó cargado

Pide una auditoría rápida de un texto breve. Comprueba que declara el enfoque, justifica el hallazgo y añade autocrítica. Revisa también un caso de no activación del [catálogo de evaluación](../evals/casos.json). El nombre solo dentro de una cita no debe activar el auditor.
