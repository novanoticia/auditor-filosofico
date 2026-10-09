# Evaluación del comportamiento

Los casos de [casos.json](casos.json) son escenarios para ejecutar manualmente con cada modelo y configuración. No son resultados ya obtenidos ni pruebas automáticas del razonamiento.

Registra plataforma, modelo, versión del paquete, fecha, herramientas disponibles, entrada y respuesta. Evalúa si cada expectativa se cumple con evidencia de la respuesta, admitiendo variación de estilo. En casos de no activación usa una conversación nueva donde el auditor esté disponible pero no seleccionado. En casos activos selecciónalo según la guía de plataforma.

Compara especialmente errores de criterio entre tradiciones, afirmaciones de verificación sin acceso, conflictos de activación y respeto de la desactivación. Una revisión del mismo modelo no cuenta como evaluación independiente.

El catálogo incluye ocho escenarios sintéticos sobre correcciones inventadas, atribuciones sin fuente, cronologías, alcance de expresiones ambiguas, interpretación literaria y coherencia entre veredicto y autocrítica. El caso `cronologia-mismo-suceso-incompatible` comprueba que la cautela no impida detectar una contradicción demostrada. Estos escenarios recogen patrones observados en salidas aportadas por el usuario, sin incorporar sus documentos ni informes al paquete.

El [registro limitado en Codex del 9 de octubre de 2026](resultados/2026-10-09-codex.md) conserva seis respuestas obtenidas en contextos separados y la evidencia de sus 22 expectativas. Generación y revisión usan el mismo modelo anfitrión; no demuestra calidad universal ni comportamiento de las cuentas de otros proveedores.

El [registro del 10 de octubre de 2026](resultados/2026-10-10-codex.md) recoge cinco variaciones rápidas de los escenarios nuevos, sus respuestas y 22 expectativas cumplidas. No compara resultados anteriores y posteriores ni demuestra que los modelos de Mistral o Perplexity reproduzcan ese comportamiento.

En Le Chat y Perplexity carga la adaptación de la [guía de chats web](../docs/chats-web.md). Ejecuta tanto la ruta del prompt completo como la de instrucciones breves con archivo, si tu cuenta la admite. Usa los casos `configuracion-sin-auditoria`, `metodo-adjunto-inaccesible`, `cita-sin-respaldo` y `acompanamiento-entre-hilos` junto a los casos comunes. En el caso del método inaccesible, carga solo las instrucciones breves y no adjuntes el método. Para las citas, conserva en el registro los pasajes consultados y su relación con las afirmaciones. Ninguno de estos casos se ha ejecutado en cuentas de los proveedores como parte de esta adaptación.
