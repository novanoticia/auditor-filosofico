# Auditor Filosófico en Mistral Le Chat y Perplexity

Estas adaptaciones se cargan como instrucciones en el chat web y utilizan su modelo. No requieren API, servidor ni Python para usarlas. Los manifiestos de Codex y Claude Code y el ZIP de skill no se instalan en estos chats.

## Archivos preparados

| Chat | Método completo | Instrucciones para usar con el método adjunto |
| --- | --- | --- |
| Mistral Le Chat | `prompts/auditor-filosofico-le-chat.md` | `prompts/instrucciones-breves-le-chat.md` |
| Perplexity | `prompts/auditor-filosofico-perplexity.md` | `prompts/instrucciones-breves-perplexity.md` |

Cada método completo incluye el núcleo, ambos módulos de análisis, LessWrong opcional y las reglas de la plataforma. Las instrucciones breves dependen del archivo completo; no lo sustituyen. Las copias generadas están en la carpeta `prompts/` del repositorio. También puedes extraerlas del ZIP `.artifacts/auditor-filosofico-chats-web.zip`, generado con `python3 scripts/build.py --package`; el ZIP es un contenedor de descarga, no un formato de importación del chat.

## Ruta directa en cualquier chat

1. Abre una conversación nueva en la plataforma elegida.
2. Copia el contenido íntegro de su archivo de método completo. Anteponle: «Configura al Auditor Filosófico con las instrucciones siguientes. Confirma que está preparado y espera mi petición; todavía no audites».
3. En otro mensaje escribe: «Auditor Filosófico: analiza este texto, rápido: Si una idea es popular, entonces es verdadera».

Si el cliente rechaza o trunca el mensaje, utiliza la configuración con archivo de las secciones siguientes. No recortes el método para hacerlo caber. Si el modelo no puede consultar el método completo, todavía no está preparado; prueba otro contexto que permita cargarlo. Pegar solo la URL de GitHub no garantiza su lectura.

## Mistral Le Chat: configuración reutilizable

Si tu cuenta ofrece un proyecto o agente con instrucciones y archivos accesibles:

1. Crea uno dedicado y llámalo **Auditor Filosófico**.
2. Adjunta `auditor-filosofico-le-chat.md` como archivo de contexto o en una biblioteca que ese agente pueda consultar.
3. Pega el contenido de `instrucciones-breves-le-chat.md` en su campo de instrucciones. Si permite el texto completo, puedes utilizarlo directamente en ese campo.
4. Abre un chat dentro del proyecto o selecciona ese agente e invoca al auditor con el contenido a examinar.

La ubicación de controles y su disponibilidad dependen del producto y la cuenta. Mistral documenta [proyectos con instrucciones y archivos](https://docs.mistral.ai/vibe/work/projects). Usa la ruta directa si esas opciones no aparecen en tu interfaz de Le Chat. La búsqueda y la lectura de archivos dependen de las herramientas realmente disponibles.

## Perplexity: configuración de un espacio

Si tu cuenta permite un espacio (Space) con instrucciones y archivos:

1. Crea un espacio dedicado llamado **Auditor Filosófico**.
2. Añade `auditor-filosofico-perplexity.md` a sus archivos de contexto.
3. Pega el contenido de `instrucciones-breves-perplexity.md` en las instrucciones personalizadas del espacio. Si admite el método completo, puedes pegarlo directamente.
4. Abre un hilo dentro del espacio e invoca al auditor con el texto que deseas examinar. Si quieres verificación externa, solicítala y utiliza un modo con búsqueda disponible.

Perplexity documenta la [configuración de archivos e instrucciones en Spaces](https://www.perplexity.ai/enterprise/videos/how-to-set-custom-files-and-links). La guía citada corresponde a Enterprise; comprueba las opciones de tu cuenta. Si no permite esos archivos o el método no se recupera íntegramente, utiliza la ruta directa. El informe conserva las citas reales y explica su respaldo; los números de cita por sí solos no verifican una conclusión.

## Comprobación en tu cuenta

Ejecuta los [casos de evaluación](../evals/casos.json). Como mínimo, comprueba enfoque epistémico y filosófico, autocrítica, LessWrong opcional, citas con respaldo, archivo inaccesible, órdenes dentro de textos citados y activación/desactivación del acompañamiento. Una configuración cargada sin petición no debe producir una auditoría.

Para revisar una respuesta anterior, asegúrate de que esté visible en ese hilo; en otro chat pega la respuesta. El acompañamiento requiere «Auditor Filosófico: acompáñame en esta conversación» y termina con «desactiva el acompañamiento». No se hereda entre hilos del mismo espacio.

## Estado de comprobación

Se comprueban localmente generación, sincronización, archivos autocontenidos y empaquetado. No se han ejecutado auditorías ni probado la instalación en cuentas de Le Chat o Perplexity. La documentación de producto orienta la carga, pero no demuestra que un modelo cumpla el método. Registra los resultados manuales según la [guía de evaluación](../evals/README.md).
