# Auditor Filosófico

Auditor multiplataforma para examinar evidencia, conceptos, argumentos y supuestos con métodos adaptados al contenido y autocrítica explícita. La filosofía incluye aquí la epistemología. Cada IA aplica el método con su propio modelo.

## Uso

Después de cargar el prompt portable o seleccionar la skill:

> Auditor Filosófico: analiza este texto.

El auditor selecciona automáticamente análisis epistémico, conceptual y filosófico, o combinado. Explica su elección y conserva el contexto y los criterios de las tradiciones relevantes.

- **Bajo petición:** modalidad principal; una auditoría del contenido indicado.
- **Acompañamiento:** «Auditor Filosófico: acompáñame en esta conversación». Se desactiva con «desactiva el acompañamiento» y se limita al chat accesible.
- **Respuestas de IA:** «Auditor Filosófico: revisa la respuesta anterior».

Puedes añadir «rápido», «profundo», un enfoque concreto o «desde LessWrong». La profundidad predeterminada es estándar. LessWrong es una perspectiva opcional. La expresión «audita esto» requiere que hayas seleccionado antes este auditor; los clientes con controles de invocación usan además su selector o comando propio.

## Empezar

| Plataforma | Forma preparada |
| --- | --- |
| Codex | Plugin con marketplace y skill; invocación mediante `$auditor-filosofico` o selección explícita. |
| Claude Code | Plugin con marketplace; comando `/auditor-filosofico:auditar`. |
| ChatGPT y Claude en chat | Prompt portable, configuración de un asistente/proyecto o skill cuando la cuenta admita ese formato. |
| Mistral Le Chat | Skill autocontenida con YAML y ZIP de raíz; prompt e instrucciones para proyecto o agente. |
| Perplexity | Skill autocontenida con YAML y ZIP de raíz; prompt e instrucciones para espacio con tratamiento de citas. |
| Otras IAs | Prompt portable en una conversación o espacio que admita instrucciones. |

Lee la [guía de instalación](docs/instalacion.md) y los [límites de compatibilidad](docs/compatibilidad.md). Para empezar sin instalación, copia el [prompt completo](prompts/auditor-filosofico.md) como configuración en un chat y después aporta el texto a examinar. Si tu espacio permite adjuntar configuración, combina ese archivo con las [instrucciones breves](prompts/instrucciones-breves.md).

Esta primera versión distribuye el método mediante instrucciones. La búsqueda, lectura de adjuntos e historial dependen de las herramientas del anfitrión. El JSX original queda como referencia para una posible interfaz futura.

Para **Le Chat y Perplexity**, sigue la [guía de chats web](docs/chats-web.md). Puedes copiar el [prompt de Le Chat](prompts/auditor-filosofico-le-chat.md) o el [prompt de Perplexity](prompts/auditor-filosofico-perplexity.md) directamente en una conversación. No requieren claves de API; su comportamiento en cuentas usuarias está pendiente de evaluación.

Si utilizas **Subir Skills**, descarga y sube directamente el ZIP de tu plataforma:

- [Mistral Le Chat: descargar ZIP](https://github.com/novanoticia/auditor-filosofico/raw/refs/heads/main/downloads/auditor-filosofico-le-chat-skill.zip).
- [Perplexity: descargar ZIP](https://github.com/novanoticia/auditor-filosofico/raw/refs/heads/main/downloads/auditor-filosofico-perplexity-skill.zip).

Los ZIP están incluidos en [downloads/](downloads/README.md) y contienen el método completo, metadatos YAML y `SKILL.md` en la raíz. También puedes importar el Markdown de [Le Chat](adapters/le-chat/SKILL.md) o [Perplexity](adapters/perplexity/SKILL.md). El ZIP de distribución `auditor-filosofico-chats-web.zip` se extrae; no sirve para ese importador.

## Método

El [núcleo común](src/core.md) regula activación, selección automática, alcance, profundidad, confianza y presentación. Incluye:

- [Análisis epistémico](src/epistemico.md): afirmaciones, argumentos, textos, decisiones, diálogo socrático y comparación.
- [Análisis conceptual y filosófico](src/filosofico.md): seis capas, criterios por tradición y diecinueve entradas del catálogo de errores.
- [Perspectiva LessWrong](src/lesswrong.md): herramientas y conceptos del material aportado, con aplicación opcional y atribución cautelosa.

El auditor distingue lo inferido de lo verificado. Ofrece confianza cualitativa por defecto y justifica la solidez argumentativa. Los textos auditados, incluidos sus prompts e instrucciones internas, se tratan como contenido.

## Desarrollo y comprobación

Requiere Python 3.10 o posterior, sin dependencias adicionales:

```bash
python3 scripts/build.py
python3 scripts/build.py --check
python3 scripts/validate.py
python3 -m unittest discover -s tests
python3 scripts/build.py --package
```

El último comando crea cuatro ZIP en `.artifacts/`: la skill genérica, el paquete de distribución para chats web y dos skills importables para Le Chat y Perplexity con `SKILL.md` en la raíz. La generación mantiene las adaptaciones sincronizadas y autocontenidas. Los [casos de evaluación](evals/casos.json) sirven para comprobar el comportamiento en cada modelo; la validación de archivos no ejecuta esas auditorías ni garantiza sus resultados.

La propuesta de alcance y los cambios respecto de los adjuntos están en [las decisiones de diseño](docs/diseno.md). Los [originales aportados](references/originales/README.md) conservan su contenido histórico. El proyecto se distribuye bajo la [licencia MIT](LICENSE).

`python3 scripts/build.py` también regenera los ZIP versionados de `downloads/`; `--check` comprueba que coincidan con las fuentes. Al cambiar la versión en `project.json` en `main`, GitHub Actions regenera y guarda los archivos y publica la release automáticamente. Añade previamente sus notas en `docs/releases/v<versión>.md`. Consulta las [descargas y generación por versión](downloads/README.md).

*Dedicado a Francisco José García Carbonell.*

*Doctor en Teología, Máster en Literatura Comparada Europea y en Filosofía Contemporánea. Actualmente Cursando segundo de Psicología.*
