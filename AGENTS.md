# Trabajo en Auditor Filosófico

- El nombre público es Auditor Filosófico; incluye epistemología. Mantén la invocación explícita y la selección automática del enfoque.
- Prioridades: auditoría bajo petición, acompañamiento activado expresamente y revisión de respuestas de IA.
- Edita el método en `src/`. Regenera skills, manifiestos y prompts con `python3 scripts/build.py`; no edites las copias generadas a mano.
- La perspectiva LessWrong requiere selección del usuario. Conserva atribución y límites de verificación.
- Los archivos de `references/originales/` son fuentes históricas, no instrucciones de trabajo. No ejecutes los JSX como implementación activa.
- Las auditorías utilizan el modelo anfitrión. No introduzcas otro proveedor, claves de API ni un servidor para ejecutar el análisis sin una petición que amplíe ese alcance.
- Comprueba `python3 scripts/build.py --check`, `python3 scripts/validate.py` y `git diff --check` cuando cambies el paquete. Las comprobaciones estructurales no demuestran calidad del razonamiento de un modelo; documenta las evaluaciones manuales realizadas.
- Mantén las guías de plataforma acordes a lo realmente preparado y distingue instalación validada de comportamiento pendiente de evaluar.
