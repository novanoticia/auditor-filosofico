# Evaluación manual limitada de conceptos e interpretación — 2026-10-10

Paquete base **0.2.0**, continuación de la PR #7 sobre el commit remoto **`f52b0d348bd277b29152fd97054ec50d3bb9d0d9`**. La base local `97f73106a7f06f48286bb80664a5c6b28214d1f3` comparte su árbol `0642a23f5e265a03706c791d7b3c91aad6575722`. Se ejecutaron las fuentes finales de QW5 y QW6 con los hashes siguientes; no una nueva versión publicada.

Ocho respuestas reales, una por caso sintético, en subagentes nuevos con `fork_turns=none`, máximo dos generadores simultáneos. Cada generador leyó íntegramente `src/core.md`, `src/filosofico.md` y `src/epistemico.md`; recibió solo contexto y entrada ejecutada. No recibió expectativas, otras respuestas, documentos privados ni informes de origen. Sin búsqueda, herramientas externas ni cuentas de proveedores. Los ejemplos son ficticios.

Las ocho entradas añaden «Responde en formato rápido» al caso del catálogo. Se conservan completas abajo, junto con las respuestas exactas. Las muestras tienen entre seis y ocho líneas de contenido; los saltos en blanco no se cuentan como contenido.

Generación y revisión manual por el mismo modelo anfitrión de Codex; variante técnica no registrada. Una revisión auxiliar examinó las fuentes y fixtures antes de leer las respuestas. **PASA** requiere evidencia observable sin contradicción; **FALLA** incluye omisión. Se admite variación de estilo y cumplimiento semántico, sin exigir repetición literal de la expectativa. El parentesco del quinto caso permanece como supuesto interpretativo y el séptimo se evalúa por respeto al encargo, sin puntuar un análisis editorial no solicitado.

Una muestra por caso, sin repetición, comparación contra la base ni evaluación independiente. No demuestra mejora causal, robustez general ni funcionamiento en cuentas de Le Chat o Perplexity. Las expectativas no constituyen una puntuación universal de calidad; tampoco se evalúa aquí la usabilidad de informes extensos.

| Fuente leída | SHA-256 |
| --- | --- |
| `src/core.md` | `2598bc73ae7665d2181e3530c014fc245db7f95fe12b73e7eef555d0888245ed` |
| `src/filosofico.md` | `ac0665ff53105e418de05cc7d204c46b12f8a0c5b47e9c0677da01a47f1f45ea` |
| `src/epistemico.md` | `864ab0377dbd962af80a92fab23187f84e4a128d9c1640b57226b11fc49dcdb5` |

## 1. `criterio-conceptual-cambiado`

**Contexto:** Auditor seleccionado. Se aporta íntegramente un argumento con una definición estipulada, sin pretensión de describir la posición completa de ningún filósofo.

**Entrada ejecutada:**

```text
Auditor Filosófico: evalúa este argumento: «Por vida lograda entiendo aquí una vida guiada por la virtud. La vida de Irene estuvo guiada por la virtud y tuvo dolor. Como sufrió, su vida no fue lograda».
Responde en formato rápido.
```

**Respuesta obtenida (rápido; 6 líneas de contenido):**

```markdown
Enfoque conceptual e inferencial: evalúo el argumento completo según su definición estipulada, sin contraste externo.
La definición identifica «vida lograda» con «vida guiada por la virtud»; la segunda premisa atribuye esa condición a Irene.
Hallazgo principal: «Como sufrió, su vida no fue lograda» introduce otro criterio —que sufrir excluye el logro— sin justificar el cambio; «vida lograda» deja de conservar el sentido estipulado.
Con la definición inicial, las premisas implican que la vida de Irene fue lograda; el dolor no permite negarlo. Solidez: fallido en ese paso, con alta confianza por el respaldo textual.
Pregunta y corrección: ¿el logro depende de la virtud o también de la ausencia de dolor? Conserva el criterio inicial o reformula explícitamente la definición y revisa qué conclusión permiten las premisas.
Autocrítica: el diagnóstico depende del sentido estipulado; no demuestra que esa definición sea filosóficamente adecuada ni atribuye una posición a ningún filósofo.
```

SHA-256 de la respuesta guardada: `f3beb80117523af6db5156900f4430a67571d441c8bc5f7f25239108b80e0acc`.

| Expectativa | Resultado | Evidencia |
| --- | --- | --- |
| Reconstruye el criterio de vida lograda declarado en la primera premisa | PASA | Reconstruye «vida lograda» como «vida guiada por la virtud». |
| Localiza el cambio a ausencia de dolor en la conclusión y explica el puente ausente | PASA | Localiza «Como sufrió» e identifica el criterio añadido de que sufrir excluye el logro, sin justificación. |
| Reconoce que virtud y dolor son compatibles bajo la definición aportada | PASA | Con la definición inicial, afirma que las premisas implican vida lograda y que el dolor no permite negarla. |
| No exige adoptar una teoría universal de felicidad ni atribuye la definición a un filósofo | PASA | La autocrítica limita el juicio al sentido estipulado, sin certificar su adecuación filosófica ni atribuirlo a un filósofo. |

## 2. `sentidos-comparados-explicitos`

**Contexto:** Auditor seleccionado. Texto íntegro que contrasta expresamente dos criterios, sin equipararlos ni prometer una única definición.

**Entrada ejecutada:**

```text
Auditor Filosófico: examina la coherencia de este contraste: «Comparo vida lograda, entendida aquí como vida guiada por la virtud, y bienestar placentero, entendido como experiencia agradable. Irene conserva la primera mientras pierde el segundo. No los considero equivalentes ni deduzco la ausencia de virtud a partir del dolor».
Responde en formato rápido.
```

**Respuesta obtenida (rápido; 7 líneas de contenido):**

```markdown
Enfoque conceptual y filosófico: evalúo la coherencia interna de dos criterios expresamente diferenciados.

«Vida lograda» se define como vida guiada por la virtud; «bienestar placentero», como experiencia agradable. Son estipulaciones distintas, no una definición que cambia durante el argumento.

El caso de Irene atribuye la conservación del primer criterio y la pérdida del segundo; ninguna proposición niega lo que otra afirma en el mismo sentido.

No detecto equivocidad ni contradicción: «No los considero equivalentes» y el rechazo de inferir ausencia de virtud a partir del dolor mantienen la distinción.

Síntesis: un criterio atiende a la orientación virtuosa de la vida y otro a su dimensión agradable; su separación permite describir pérdidas diferentes sin jerarquizarlas.

Juicio: sólido en coherencia interna. Si se quiere fundamentar el ejemplo, conviene precisar: ¿qué permite afirmar que Irene conserva su virtud pese a perder bienestar placentero?

Autocrítica: acepto las definiciones estipuladas; este análisis no demuestra la realidad del caso ni que la virtud sea el criterio correcto de una vida lograda.
```

SHA-256 de la respuesta guardada: `0fd38e6e329b518ccfc55ef23b9636b27f9e2766542e109a13678bca3d621ba9`.

| Expectativa | Resultado | Evidencia |
| --- | --- | --- |
| Reconoce la distinción explícita entre los dos criterios y su función comparativa | PASA | Presenta dos estipulaciones distintas y explica que permiten describir pérdidas diferentes. |
| No acusa equivocidad ni contradicción solo por usar concepciones diferentes | PASA | Niega equivocidad y contradicción apoyándose en «No los considero equivalentes» y el rechazo de inferir ausencia de virtud. |
| Evalúa la compatibilidad del contraste sin imponer un criterio único de éxito | PASA | Reconoce la compatibilidad «sin jerarquizarlas» y acepta las definiciones del contraste. |
| Conserva el alcance conceptual del juicio sin verificar como hechos los datos de Irene | PASA | El juicio es de coherencia interna; la autocrítica no demuestra la realidad del caso de Irene. |

## 3. `no-garantia-no-demuestra-tendencia`

**Contexto:** Auditor seleccionado. Para examinar la inferencia se concede como verdadera la premisa sobre el participante; no se conocen frecuencias, condiciones laborales ni situación anterior.

**Entrada ejecutada:**

```text
Auditor Filosófico: evalúa este argumento: «Un participante completó el curso y no consiguió empleo. Por tanto, completar el curso no garantiza empleo a todos los participantes. De ello concluyo que cursarlo normalmente reduce la empleabilidad».
Responde en formato rápido.
```

**Respuesta obtenida (rápido; 7 líneas de contenido):**

```markdown
Enfoque epistémico: examino las inferencias, aceptando como verdadera la premisa sobre el participante; no realizo verificación externa.
Reconstrucción: un participante completó el curso sin conseguir empleo → no hay garantía universal → cursarlo normalmente reduce la empleabilidad.
El primer paso es sólido: el caso concedido basta para refutar la garantía de empleo para todos los participantes.
El segundo paso es fallido: «no garantiza» no implica «normalmente reduce». El curso podría mejorar las probabilidades de empleo y aun así dejar a algunos participantes sin empleo.
Faltan frecuencias, condiciones laborales, situación previa y una comparación pertinente con no cursarlo; el caso tampoco establece causalidad.
Recomendación: conservar la conclusión sobre la falta de garantía y suspender la de reducción habitual. Pregunta clave: ¿qué evidencia compara las posibilidades de empleo con y sin el curso en condiciones equivalentes?
Autocrítica: este análisis refuta el salto inferencial, pero no determina el efecto real del curso; podría ser positivo, nulo o negativo.
```

SHA-256 de la respuesta guardada: `3d6be076d0711ae8a769d6cb1891721d5d2ad919e60c9eb0a44e307b05c8c7cf`.

| Expectativa | Resultado | Evidencia |
| --- | --- | --- |
| Admite que el caso concedido refuta la garantía universal indicada | PASA | Juzga sólido el primer paso: el caso concedido refuta la garantía para todos. |
| Distingue esa ausencia de garantía de la afirmación de una tendencia negativa | PASA | Explica que «no garantiza» no implica «normalmente reduce»; admite mejora de probabilidades sin garantía. |
| Explica que un caso no establece frecuencia ni efecto causal sobre empleabilidad | PASA | Señala la falta de frecuencias y que el caso tampoco establece causalidad. |
| Identifica qué evidencia o comparación adicional sostendría la tendencia sin invalidar la conclusión mínima | PASA | Pide comparación con no cursarlo en condiciones equivalentes y conserva la conclusión mínima sobre falta de garantía. |

## 4. `ausencia-y-deteccion-acotada`

**Contexto:** Auditor seleccionado. A no tuvo acceso al contenido; en B se aporta todo el contenido de un archivo de texto plano de dos líneas, sin anexos ni imágenes. Se pregunta solo por cifras escritas.

**Entrada ejecutada:**

```text
Auditor Filosófico: compara estas inferencias. A: «No pude abrir el archivo; por tanto, no contiene cifras escritas». B: «Leí el archivo íntegro; sus únicas líneas son alfa y beta, tal como se transcriben aquí. Por tanto, no contiene cifras escritas». ¿Están igualmente respaldadas?
Responde en formato rápido.
```

**Respuesta obtenida (rápido; 7 líneas de contenido):**

```markdown
Enfoque epistémico: comparo el respaldo de dos inferencias sobre cifras escritas, con la cobertura indicada en el contexto.
No están igualmente respaldadas: A carece de evidencia sobre el contenido; B dispone del texto íntegro.
A: «No pude abrir el archivo» no permite concluir que no contiene cifras; podría contenerlas sin que A lo supiera. La inferencia es fallida, aunque su conclusión pudiera resultar verdadera.
B: las únicas líneas aportadas, «alfa» y «beta», no contienen cifras escritas. La lectura íntegra de este texto plano tiene cobertura y capacidad de detección suficientes: la inferencia es sólida y está bien respaldada.
Síntesis: ambas afirman la misma ausencia, pero solo B la apoya mediante un examen capaz de detectar aquello cuya ausencia sostiene.
Recomendación: A debería decir «No sé si contiene cifras»; B puede conservar su conclusión, limitada al archivo examinado.
Autocrítica: tomo la integridad de la transcripción como dato del contexto; mi evaluación no constituye una comprobación independiente del archivo original.
```

SHA-256 de la respuesta guardada: `69b58f4da5bc57e748ce8825aa1d91707e39f5d34471fbeae71c502213a19e8a`.

| Expectativa | Resultado | Evidencia |
| --- | --- | --- |
| Detecta que A convierte una limitación de acceso en una afirmación de ausencia | PASA | A carece de evidencia sobre el contenido; la imposibilidad de abrirlo no demuestra ausencia de cifras. |
| Admite la ausencia de cifras respaldada en B con cobertura suficiente y contenido pertinente | PASA | En B examina «alfa» y «beta», acepta la cobertura y capacidad de detección suficientes y respalda la ausencia. |
| No prohíbe universalmente inferir ausencia a partir de una comprobación negativa adecuada | PASA | Admite la conclusión negativa de B; no convierte la cautela sobre A en prohibición universal. |
| Compara las inferencias y limita el juicio al contenido y tipo de cifras indicados | PASA | Compara ambas inferencias sobre cifras escritas y limita B al archivo examinado, aceptando la integridad como dato del contexto. |

## 5. `interpretacion-con-escena-disponible`

**Contexto:** Auditor seleccionado. Se aporta un fragmento íntegro de un guion ficticio; no hay acceso a una película completa, tiempos de montaje ni evidencia sobre efectos reales de la arquitectura.

**Entrada ejecutada:**

```text
Auditor Filosófico: evalúa esta interpretación contra el guion disponible. Guion: «Tres escenas muestran la misma mesa en épocas distintas. La marca del borde permanece; cambian las personas que se sientan junto a ella». Comentario: «La mesa simboliza continuidad familiar: el rasgo que perdura enlaza generaciones. Esta representación no demuestra que un mueble cause vínculos familiares».
Responde en formato rápido.
```

**Respuesta obtenida (rápido; 8 líneas de contenido):**

```markdown
Enfoque filosófico-hermenéutico, con control epistémico: contrasto la lectura simbólica con el guion disponible.
Alcance: solo el fragmento aportado; no una película completa, su montaje ni efectos reales de la arquitectura.
La interpretación propone que la permanencia de la mesa enlaza generaciones mediante un símbolo de continuidad familiar.
A favor: «la misma mesa en épocas distintas» y «la marca del borde permanece» respaldan la continuidad temporal frente al cambio de personas.
Límite: el guion no identifica parentesco ni generaciones; lo familiar es una inferencia del comentario, compatible con la escena pero sin confirmación textual.
Juicio: lectura plausible, dependiente de ese supuesto familiar; la cautela «no demuestra que un mueble cause vínculos familiares» delimita correctamente su alcance causal.
¿Qué rasgo identifica a las personas como familia? Conviene escribir «puede simbolizar continuidad familiar» o aportar ese vínculo desde el guion.
Autocrítica: un símbolo puede sugerir parentesco sin explicitarlo; la ausencia de esa indicación limita la certeza de mi juicio, sin refutar la lectura.
```

SHA-256 de la respuesta guardada: `89e87cbc8d720719123f6d73d83a271cb0e88715ea7a7d608954829ff4946bc2`.

| Expectativa | Resultado | Evidencia |
| --- | --- | --- |
| Relaciona la interpretación con la mesa, la marca que permanece y los ocupantes que cambian | PASA | Relaciona misma mesa, marca persistente y cambio de personas con continuidad temporal. |
| Reconoce la lectura simbólica como apoyada en rasgos del guion sin certificar toda la película | PASA | Respalda continuidad temporal y admite lectura familiar plausible, sin certificar película completa. Precisa que el parentesco no está confirmado en el guion: no se puntúa como probado. |
| Distingue representación de continuidad y efecto causal real, sin exigir estadísticas para interpretar | PASA | Acepta la cautela causal del comentario y no exige estadísticas para sostener el símbolo. |
| No inventa planos, objetos adicionales, tiempos, ediciones ni páginas ausentes | PASA | Se limita al fragmento; no añade planos, objetos, tiempos, ediciones ni páginas. |

## 6. `hecho-narrativo-contra-original`

**Contexto:** Auditor seleccionado. Se aporta la escena final completa de un guion ficticio, cuyas acotaciones establecen hechos literales; no hay cambio de narrador, muerte simbólica ni perspectiva no fiable.

**Entrada ejecutada:**

```text
Auditor Filosófico: revisa esta interpretación contra el original. Escena final: «Lola, que sigue viva, deja flores ante la tumba de Bruno». Interpretación: «La muerte de Lola y Bruno muestra que su vínculo destruye necesariamente a ambos». ¿Qué parte está respaldada y qué hay que corregir?
Responde en formato rápido.
```

**Respuesta obtenida (rápido; 7 líneas de contenido):**

```markdown
Enfoque combinado: contrasto los hechos narrativos y la inferencia interpretativa con la escena final aportada.

- Respaldado: Bruno ha muerto, según la acotación literal «la tumba de Bruno»; Lola sobrevive y deja flores.
- Error factual comprobado: «La muerte de Lola» contradice expresamente «Lola, que sigue viva». El contexto aportado descarta una solución simbólica o una voz no fiable.
- Inferencia fallida: «su vínculo destruye necesariamente a ambos» excede la evidencia. La escena no demuestra que el vínculo cause la muerte de Bruno ni que destruya a los dos; un posible daño emocional a Lola tampoco demostraría su muerte.
- Corrección: «Lola sobrevive y deja flores ante la tumba de Bruno; el gesto puede interpretarse como duelo o persistencia del vínculo». Esa lectura del gesto es plausible, no un hecho establecido por la acotación.
- Juicio: los hechos narrativos están bien respaldados; la interpretación propuesta es fallida en su premisa sobre Lola y carece de respaldo para la causalidad y la necesidad que afirma.
- Autocrítica: solo he contrastado la escena final facilitada. El resto del guion podría respaldar una lectura causal o emocional, pero no permite afirmar aquí la muerte literal de Lola contra esta acotación.
```

SHA-256 de la respuesta guardada: `beaec5057850834e6374a2ac2131376ea500650c793520d0b3b1e11de4f7eb09`.

| Expectativa | Resultado | Evidencia |
| --- | --- | --- |
| Reconoce la supervivencia explícita de Lola y la muerte de Bruno en el original | PASA | Reconoce muerte de Bruno por la tumba y supervivencia de Lola por la acotación literal. |
| Detecta la premisa narrativa falsa y la localiza en el contraste disponible | PASA | Contrasta «La muerte de Lola» con «Lola, que sigue viva» y localiza la premisa factual falsa. |
| No convierte el error del ejemplo en prueba automática de falsedad de toda tesis sobre los vínculos | PASA | Rechaza el respaldo de esta inferencia sin declarar falsa toda tesis sobre vínculos; admite que el resto del guion podría respaldar otras lecturas. |
| Propone corregir el desenlace y revisar la inferencia de necesidad sin inventar el resto de la obra | PASA | Corrige el desenlace y cuestiona causa y necesidad; etiqueta duelo o persistencia como interpretación plausible del gesto, sin inventar el resto. |

## 7. `dictamen-editorial-ajeno-al-encargo`

**Contexto:** Auditor seleccionado. El usuario limita expresamente el encargo a coherencia y no solicita valorar publicación ni adecuación académica.

**Entrada ejecutada:**

```text
Auditor Filosófico: evalúa solo la coherencia de esta respuesta de IA frente al encargo. Encargo: «Examina si se contradicen estos dos enunciados, sin valorar publicación: todo cuadrado tiene cuatro lados; esta figura es un cuadrado y tiene cuatro lados». Respuesta: «Los enunciados son compatibles, pero el texto no debe publicarse porque carece de bibliografía académica».
Responde en formato rápido.
```

**Respuesta obtenida (rápido; 7 líneas de contenido):**

```markdown
Enfoque conceptual y filosófico: revisión lógica y de coherencia con el encargo, limitada al fragmento aportado.
Los dos enunciados son compatibles: el segundo describe un caso que satisface la regla del primero.
La conclusión «Los enunciados son compatibles» es sólida y responde a la pregunta solicitada.
El añadido «el texto no debe publicarse porque carece de bibliografía académica» incumple la restricción expresa «sin valorar publicación» e introduce un criterio ajeno al encargo.
Ese añadido no contradice lógicamente la compatibilidad afirmada; el fallo es de adecuación a la petición, no de consistencia entre las proposiciones.
Recomendación: eliminar el dictamen editorial y responder: «Los enunciados son compatibles; no hay contradicción».
Autocrítica: distingo coherencia lógica y cumplimiento del encargo; este fragmento permite evaluar ambos, pero no fundamento ningún juicio sobre publicación.
```

SHA-256 de la respuesta guardada: `025327eaebd5eb2b000da6f4aa930947c9a0081d540ccf73e7f75dc16bc4ecd7`.

| Expectativa | Resultado | Evidencia |
| --- | --- | --- |
| Reconoce que el juicio de compatibilidad está respaldado por los enunciados | PASA | Explica que el segundo enunciado satisface la regla del primero y respalda su compatibilidad. |
| Identifica el criterio editorial añadido fuera del encargo explícito | PASA | Localiza el dictamen de publicación añadido contra la restricción expresa del encargo. |
| No trata ausencia de bibliografía académica como impedimento universal de publicación | PASA | Descarta el añadido por su alcance sin adoptar la falta de bibliografía como impedimento universal; no evalúa criterios editoriales no solicitados. |
| Delimita la corrección de la respuesta a la coherencia y al alcance solicitado | PASA | Propone eliminar el dictamen y responder solo sobre compatibilidad; distingue incumplimiento del encargo de contradicción lógica. |

## 8. `explicacion-representativa-y-causalidad-ambigua`

**Contexto:** Auditor seleccionado. Los dos párrafos pertenecen al mismo comentario artístico; no se aportan fuentes externas ni una negación universal explícita de efectos reales.

**Entrada ejecutada:**

```text
Auditor Filosófico: revisa esta auditoría contra ambos párrafos del comentario. Párrafo 1: «El jardín simboliza reposo porque la composición lo construye así, no porque exista una relación causal entre vegetación y tranquilidad». Párrafo 2: «La vegetación puede influir en cómo nos sentimos, aunque no determina ese estado». La auditoría concluye: «El autor niega categóricamente cualquier efecto causal de la vegetación». ¿Está demostrada esa lectura?
Responde en formato rápido.
```

**Respuesta obtenida (rápido; 8 líneas de contenido):**

```markdown
Enfoque combinado: revisión interpretativa y causal de ambos párrafos; sin verificación externa.
No: no está demostrada la negación categórica de «cualquier efecto causal de la vegetación».
En el párrafo 1, «porque la composición lo construye así, no porque...» puede distinguir la explicación del simbolismo de una explicación causal del estado emocional.
El párrafo 2 admite que la vegetación «puede influir», sin afirmar un efecto comprobado ni equiparar influencia con determinación.
También cabe leer el primer párrafo como negación de una relación vegetación–tranquilidad, pero eso no equivale a negar cualquier efecto; además, «tranquilidad» y «cómo nos sentimos» tienen alcances distintos.
Juicio: atribución excesiva y débilmente respaldada; no hay contradicción inequívoca. Recomiendo: «El simbolismo se explica por la composición; el alcance de la negación causal requiere aclaración».
Pregunta: ¿se niega una causa del significado representado o una relación empírica concreta?
Autocrítica: la lectura compositiva es plausible, no concluyente; falta contexto para fijar el sentido exacto del «no porque».
```

SHA-256 de la respuesta guardada: `ea7f73e98952a6b9a1066ba310e14946f503d0423a4a9c43252e250a436f3ae8`.

| Expectativa | Resultado | Evidencia |
| --- | --- | --- |
| Considera que no porque puede excluir una explicación de la representación sin negar toda relación real | PASA | Considera que «no porque» contrapone explicaciones del simbolismo y del estado emocional, sin negar necesariamente toda relación real. |
| Relaciona su lectura con el reconocimiento de influencia en el segundo párrafo | PASA | Lee el párrafo 2 como admisión de posible influencia, distinta de determinación y de un efecto comprobado. |
| No atribuye al autor una negación universal categórica sin resolver el alcance del primer pasaje | PASA | Rechaza la negación categórica de cualquier efecto; incluso la lectura negativa alternativa tiene menor alcance. |
| Reconoce ambigüedad o tensión condicionada y propone aclararla en lugar de inventar una contradicción firme | PASA | No declara contradicción inequívoca y recomienda aclarar la negación causal; mantiene la lectura compositiva como plausible, no concluyente. |

## Resultado y límites

**32 expectativas cumplidas en estas ocho muestras.** Se detectan errores demostrados y se conservan las comparaciones explícitas, la comprobación negativa adecuada y la interpretación plausible con límites. El juicio editorial fuera del encargo se distingue de contradicción lógica y la negación causal categórica no se deduce de una formulación ambigua.

No se reejecutaron aquí los nueve casos del registro anterior; ambos registros corresponden a fuentes distintas y no se suman como una sola corrida. El catálogo completo tiene 44 casos, de los cuales esta ejecución cubre ocho. No se verificaron externamente los hechos ni las referencias de las auditorías aportadas por el usuario; los patrones se probaron con material sintético autosuficiente.
