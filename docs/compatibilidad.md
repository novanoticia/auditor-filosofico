# Compatibilidad y alcance de la validación

Esta versión prepara dos formatos nativos, una vía portable y dos adaptaciones para chats web. Cada plataforma usa su modelo y sus herramientas; compartir instrucciones no produce resultados idénticos.

| Destino | Formato | Estado comprobado en esta entrega |
| --- | --- | --- |
| Codex | `.codex-plugin/plugin.json`, marketplace y skill con referencias | Estructura basada en ejemplos oficiales; sincronización y enlaces comprobados localmente. Instalación y auditorías en una cuenta usuaria pendientes. |
| Claude Code | `.claude-plugin/plugin.json`, marketplace y skill invocable | Estructura basada en la documentación oficial; sincronización y enlaces comprobados localmente. Instalación y auditorías en Claude Code pendientes. |
| ChatGPT | Prompt completo o configuración con archivo | Archivo autocontenido generado; evaluación con el modelo y la cuenta usuaria pendiente. |
| Claude en chat | Prompt completo; ZIP de skill si la cuenta permite importación | Prompt y ZIP generados; importación y evaluación en cuenta usuaria pendientes. |
| Mistral Le Chat | Skill Markdown con YAML y ZIP con `SKILL.md` en raíz; prompt e instrucciones de proyecto o agente | Estructura del importador y método íntegro comprobados localmente. Aceptación y auditorías en cuenta usuaria pendientes. |
| Perplexity | Skill Markdown con YAML y ZIP con `SKILL.md` en raíz; prompt e instrucciones de espacio | Estructura del importador y método íntegro comprobados localmente. Aceptación y auditorías en cuenta usuaria pendientes. |
| Otras IAs | Prompt completo en un contexto que admita instrucciones | Archivo generado; admisión y comportamiento por producto pendientes. |

La [guía de chats web](chats-web.md) detalla las rutas de importación y carga manual. Skills y prompts contienen el método completo y reglas específicas sobre acceso a fuentes, citas y límites entre conversaciones. Las instrucciones breves requieren acceso al archivo completo. El ZIP de distribución para chats web se extrae; los ZIP específicos de skill se suben directamente a los importadores que admitan ese formato.

## Capacidades del anfitrión

- **Fuentes:** la verificación externa requiere búsqueda o acceso real a documentos. La auditoría puede evaluar el texto aportado e identificar qué afirmaciones quedan sin contrastar.
- **Adjuntos:** PDF, imágenes, documentos y tamaños máximos dependen del cliente. Una referencia a un archivo no garantiza que el modelo pueda leerlo.
- **Acompañamiento:** se limita a turnos visibles del mismo chat mientras permanezca activado. No programa tareas ni sigue conversaciones de otras plataformas.
- **Historial:** se conserva según las funciones del cliente. El paquete no crea una base de auditorías ni sincroniza cuentas.
- **Activación:** los plugins nativos exigen selección de skill o comando; en la vía portable se invoca por nombre después de cargar el método. La elección de dimensiones es automática en ambos casos.

## Referencias de formato

- [Colección oficial de plugins de Codex](https://github.com/openai/plugins).
- [Ejemplo de manifiesto Codex](https://github.com/openai/plugins/blob/main/plugins/build-web-data-visualization/.codex-plugin/plugin.json).
- [Marketplace oficial de Codex](https://github.com/openai/plugins/blob/main/.agents/plugins/marketplace.json).
- [Referencia de manifiestos de Claude Code](https://github.com/anthropics/claude-plugins-official/blob/main/plugins/plugin-dev/skills/plugin-structure/references/manifest-reference.md).
- [Marketplace oficial de Claude Code](https://github.com/anthropics/claude-plugins-official/blob/main/.claude-plugin/marketplace.json).

Los formatos pueden evolucionar. Las comprobaciones del repositorio verifican consistencia y empaquetado, no equivalen a certificación de los proveedores.
