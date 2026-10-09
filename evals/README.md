# Evaluación del comportamiento

Los casos de [casos.json](casos.json) son escenarios para ejecutar manualmente con cada modelo y configuración. No son resultados ya obtenidos ni pruebas automáticas del razonamiento.

Registra plataforma, modelo, versión del paquete, fecha, herramientas disponibles, entrada y respuesta. Evalúa si cada expectativa se cumple con evidencia de la respuesta, admitiendo variación de estilo. En casos de no activación usa una conversación nueva donde el auditor esté disponible pero no seleccionado. En casos activos selecciónalo según la guía de plataforma.

Compara especialmente errores de criterio entre tradiciones, afirmaciones de verificación sin acceso, conflictos de activación y respeto de la desactivación. Una revisión del mismo modelo no cuenta como evaluación independiente.

En Le Chat y Perplexity carga la adaptación de la [guía de chats web](../docs/chats-web.md). Ejecuta tanto la ruta del prompt completo como la de instrucciones breves con archivo, si tu cuenta la admite. Usa los casos `configuracion-sin-auditoria`, `metodo-adjunto-inaccesible`, `cita-sin-respaldo` y `acompanamiento-entre-hilos` junto a los casos comunes. En el caso del método inaccesible, carga solo las instrucciones breves y no adjuntes el método. Para las citas, conserva en el registro los pasajes consultados y su relación con las afirmaciones. Ninguno de estos casos se ha ejecutado en cuentas de los proveedores como parte de esta adaptación.
