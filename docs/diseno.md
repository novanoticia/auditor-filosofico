# Decisiones de diseño

## Alcance acordado

- Nombre público: **Auditor Filosófico**, con epistemología incluida.
- Cada IA aplica el método con su propio modelo.
- Se invoca expresamente y selecciona automáticamente el enfoque pertinente.
- Prioridad: bajo petición, acompañamiento activado expresamente y revisión de respuestas de IA.
- LessWrong como perspectiva seleccionable dentro de un auditor más amplio.
- Los adjuntos sirven de punto de partida para replantear implementación y presentación.
- Licencia MIT, elegida por el titular del repositorio.

## Organización

`src/` es la fuente común del método. `scripts/build.py` genera el prompt portable, la skill portable y paquetes autocontenidos para Codex y Claude Code. Las copias se incluyen en Git para que puedan utilizarse sin Python; Python solo hace falta para regenerarlas o crear el ZIP.

`src/adapters/le-chat.md` y `src/adapters/perplexity.md` añaden reglas del chat web al método común. El generador produce un prompt completo y unas instrucciones breves por plataforma y un ZIP con guía, licencia y casos manuales. Las adaptaciones conservan la invocación expresa y no utilizan API ni servidor. Se documenta por separado la validación estructural y la evaluación pendiente en cada cuenta.

También genera `adapters/<plataforma>/SKILL.md`: metadatos YAML y método completo incorporado. Cada skill se empaqueta en su propio ZIP con `SKILL.md` en la raíz, conforme al requisito mostrado por el importador en la captura del usuario. Se mantiene aparte el ZIP de distribución con varios documentos. Las pruebas de regresión verifican raíz, metadatos, módulos completos, licencia y generación determinista.

Los ZIP importables se guardan en `downloads/` y se incluyen en Git. La generación normal los sincroniza y `--check` verifica sus bytes. La versión de `project.json` se incorpora al YAML de las skills. Se utiliza ZIP sin compresión para que el resultado no cambie entre versiones de zlib. El workflow de publicación responde a cambios de versión en `main`, regenera y guarda los archivos, los valida y publica la release con notas específicas por versión.

El módulo epistémico trabaja principalmente sobre respaldo de afirmaciones y decisiones. El módulo filosófico especializa criterios conceptuales, interpretativos, normativos y por tradición. En contenido mixto se utilizan ambos, con una reconstrucción compartida del argumento. La clasificación es provisional y admite elección explícita del usuario.

## Adaptaciones respecto de los originales

1. Se conserva el material original en su carpeta histórica, separado de las instrucciones activas.
2. Se sustituye la llamada fija a la API de Claude por instrucciones ejecutadas por el modelo anfitrión.
3. La confianza es cualitativa por defecto; una probabilidad requiere definición y justificación. La solidez argumentativa conserva cinco categorías.
4. La verificación externa se distingue del análisis textual; búsqueda y citas dependen de acceso real.
5. LessWrong pasa a perspectiva opcional. Se distingue su organización histórica de una atribución bibliográfica verificada.
6. La falsabilidad empírica se aplica según el tipo de afirmación y no como requisito universal de la filosofía.
7. Las comparaciones incluyen síntesis conjunta y desacuerdos centrales en cualquier enfoque, también en formato rápido. La regla común se carga incluso cuando solo se aplica el módulo filosófico.
8. Las seis capas y las diecinueve entradas filosóficas se preservan en el módulo especializado. La entrada compuesta «falacia naturalista/moralista» exige especificar el problema concreto.
9. Se mantiene la autocrítica también en profundidad rápida. Las pautas de extensión se coordinan con ese formato abreviado.
10. La identidad del autor, intenciones y estados psicológicos no se deducen automáticamente de un fallo en el texto.
11. El auditor pide el objeto imprescindible ausente antes de emitir conclusiones que dependan de él. Cuando dispone de un extracto suficiente, delimita el análisis parcial y evita extrapolar al documento completo.

## Desarrollo posterior

Queda por evaluar el comportamiento con los modelos de cada plataforma y decidir si se quiere una interfaz web o almacenamiento propio. Esta versión ofrece una base utilizable mediante skills y prompts; una interfaz web, publicación en catálogos de proveedores o servicio MCP tendría su propio alcance de trabajo.
