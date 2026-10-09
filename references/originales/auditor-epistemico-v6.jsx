import { useState, useRef, useEffect, useCallback } from "react";

/* ═══════════════════════════════════════════ i18n ═══════════════════════════════════════════ */

var T = {
  es: {
    header_sub: "LessWrong · Sequences + Post-2015 + Filosófico · Mapa ≠ Territorio", title: "Auditor Epistémico",
    desc: "Detecta sesgos, evalúa inferencias, calibra confianza.",
    confidence: "Confianza", propositions: "Proposiciones", assumptions: "Supuestos implícitos",
    chain: "Cadena inferencial", biases: "Sesgos", evidence: "Balance de evidencia",
    ev_for: "A favor", ev_against: "En contra", ev_missing: "Ausente",
    questions: "Preguntas", verdict: "Veredicto", recommendation: "Recomendación",
    metacog: "Autocrítica del auditor",
    disclaimer: "Análisis asistido por IA — requiere revisión y criterio humano.",
    attach: "Adjuntar", audit_btn: "Auditar", search_btn: "Buscar y auditar",
    compare_btn: "Comparar", history: "Historial",
    placeholder: "Pega aquí la afirmación, argumento o texto a auditar…",
    placeholder_lw: "Escribe un tema para buscar en LessWrong…",
    placeholder_cmp_a: "Postura A…", placeholder_cmp_b: "Postura B…",
    drop: "Suelta para adjuntar", copy_md: "Copiar MD", copied: "¡Copiado!",
    truncated: "Respuesta truncada.", lw_fallback: "Sin búsqueda web. Análisis desde conocimiento del modelo.",
    bin_fallback: "PDF/imagen no enviados. Solo texto.", falsifiable: "falsable",
    footer: "Auditor Epistémico v6 · Claude Sonnet · LessWrong Sequences + Post-2015",
    dedication: "Dedicado al Dr. Francisco José García Carbonell", lw_link: "LW ↗",
    depth_quick: "Rápido", depth_std: "Estándar", depth_deep: "Profundo", depth_label: "Profundidad",
    saved: "Guardado", load: "Cargar", save: "Guardar", clear_saved: "Borrar", no_saved: "Sin auditorías guardadas",
    saved_audits: "Auditorías guardadas", save_current: "Guardar auditoría",
    modes: { claim: "Afirmación", argument: "Argumento", text: "Texto", decision: "Decisión", socratic: "Socrático", lesswrong: "LessWrong", compare: "Comparar", philosophical: "Filosófico" },
    mode_desc: { claim: "Evalúa una afirmación", argument: "Estructura lógica", text: "Audita un texto", decision: "Analiza decisión", socratic: "Diálogo exploratorio", lesswrong: "Busca en LessWrong", compare: "Dos posturas enfrentadas", philosophical: "Audita textos filosóficos" },
    lang_instruction: "Responde en español.",
    vs: "vs",
    solidez: "Solidez", tipo_texto: "Tipo de texto", sup_meta: "Supuestos metafilosóficos",
    sol_solido: "Sólido", sol_plausible: "Plausible", sol_dependiente: "Dependiente", sol_fallido: "Fallido", sol_indeterminado: "Indeterminado",
    placeholder_phil: "Pega el texto filosófico a auditar…",
  },
  en: {
    header_sub: "LessWrong · Sequences + Post-2015 + Philosophical · Map ≠ Territory", title: "Epistemic Auditor",
    desc: "Detect biases, evaluate inferences, calibrate confidence.",
    confidence: "Confidence", propositions: "Propositions", assumptions: "Implicit assumptions",
    chain: "Inferential chain", biases: "Biases", evidence: "Evidence balance",
    ev_for: "For", ev_against: "Against", ev_missing: "Missing",
    questions: "Questions", verdict: "Verdict", recommendation: "Recommendation",
    metacog: "Auditor self-critique",
    disclaimer: "AI-assisted analysis — requires human review.",
    attach: "Attach", audit_btn: "Audit", search_btn: "Search & audit",
    compare_btn: "Compare", history: "History",
    placeholder: "Paste claim, argument, or text to audit…",
    placeholder_lw: "Topic to search on LessWrong…",
    placeholder_cmp_a: "Position A…", placeholder_cmp_b: "Position B…",
    drop: "Drop to attach", copy_md: "Copy MD", copied: "Copied!",
    truncated: "Truncated response.", lw_fallback: "No web search. Analysis from model knowledge.",
    bin_fallback: "PDF/image not sent. Text only.", falsifiable: "falsifiable by",
    footer: "Epistemic Auditor v6 · Claude Sonnet · LessWrong Sequences + Post-2015",
    dedication: "Dedicated to Dr. Francisco José García Carbonell", lw_link: "LW ↗",
    depth_quick: "Quick", depth_std: "Standard", depth_deep: "Deep", depth_label: "Depth",
    saved: "Saved", load: "Load", save: "Save", clear_saved: "Clear", no_saved: "No saved audits",
    saved_audits: "Saved audits", save_current: "Save audit",
    modes: { claim: "Claim", argument: "Argument", text: "Text", decision: "Decision", socratic: "Socratic", lesswrong: "LessWrong", compare: "Compare", philosophical: "Philosophical" },
    mode_desc: { claim: "Evaluate a claim", argument: "Logical structure", text: "Audit a text", decision: "Analyze decision", socratic: "Exploratory dialogue", lesswrong: "Search LessWrong", compare: "Two opposing positions", philosophical: "Audit philosophical texts" },
    lang_instruction: "Respond in English.",
    vs: "vs",
    solidez: "Soundness", tipo_texto: "Text type", sup_meta: "Metaphilosophical assumptions",
    sol_solido: "Sound", sol_plausible: "Plausible", sol_dependiente: "Dependent", sol_fallido: "Failed", sol_indeterminado: "Indeterminate",
    placeholder_phil: "Paste philosophical text to audit…",
  },
  zh: {
    header_sub: "LessWrong · 序列 + 2015后 + 哲学 · 地图 ≠ 领土", title: "认知审计器",
    desc: "检测偏见，评估推理，校准置信度。",
    confidence: "置信度", propositions: "命题", assumptions: "隐含假设",
    chain: "推理链", biases: "偏见", evidence: "证据平衡",
    ev_for: "支持", ev_against: "反对", ev_missing: "缺失",
    questions: "问题", verdict: "判决", recommendation: "建议",
    metacog: "审计器自我批评",
    disclaimer: "AI辅助分析——需要人工审核。",
    attach: "附件", audit_btn: "审计", search_btn: "搜索并审计",
    compare_btn: "比较", history: "历史",
    placeholder: "在此粘贴要审计的内容…",
    placeholder_lw: "输入LessWrong搜索主题…",
    placeholder_cmp_a: "立场A…", placeholder_cmp_b: "立场B…",
    drop: "放下以附加", copy_md: "复制MD", copied: "已复制！",
    truncated: "响应截断。", lw_fallback: "无网络搜索。基于模型知识。",
    bin_fallback: "无法发送PDF/图像。", falsifiable: "可证伪",
    footer: "认知审计器 v6 · Claude Sonnet · LessWrong序列 + 2015后",
    dedication: "献给 Francisco José García Carbonell 博士", lw_link: "LW ↗",
    depth_quick: "快速", depth_std: "标准", depth_deep: "深入", depth_label: "深度",
    saved: "已保存", load: "加载", save: "保存", clear_saved: "清除", no_saved: "无保存的审计",
    saved_audits: "保存的审计", save_current: "保存审计",
    modes: { claim: "主张", argument: "论证", text: "文本", decision: "决策", socratic: "苏格拉底", lesswrong: "LessWrong", compare: "比较", philosophical: "哲学" },
    mode_desc: { claim: "评估主张", argument: "逻辑结构", text: "审计文章", decision: "分析决策", socratic: "探索性对话", lesswrong: "搜索LessWrong", compare: "两个对立立场", philosophical: "审计哲学文本" },
    lang_instruction: "用中文回答。",
    vs: "对",
    solidez: "论证力", tipo_texto: "文本类型", sup_meta: "元哲学假设",
    sol_solido: "坚实", sol_plausible: "合理", sol_dependiente: "依赖性", sol_fallido: "失败", sol_indeterminado: "不确定",
    placeholder_phil: "粘贴要审计的哲学文本…",
  },
};

/* ═══════════════════════════════════════════ LW LINKS ═══════════════════════════════════════════ */

var LW_LINKS = {
  "confundir mapa con territorio": "https://www.lesswrong.com/tag/map-and-territory", "map territory": "https://www.lesswrong.com/tag/map-and-territory",
  "reificación": "https://www.lesswrong.com/tag/reductionism", "reification": "https://www.lesswrong.com/tag/reductionism",
  "etiqueta como explicación": "https://www.lesswrong.com/posts/FkMzSBi4HFXYq4yJo/fake-explanations", "fake explanation": "https://www.lesswrong.com/posts/FkMzSBi4HFXYq4yJo/fake-explanations",
  "respuesta misteriosa": "https://www.lesswrong.com/posts/6i3zToomS86oj9bS6/mysterious-answers-to-mysterious-questions", "mysterious answer": "https://www.lesswrong.com/posts/6i3zToomS86oj9bS6/mysterious-answers-to-mysterious-questions",
  "ignorar tasa base": "https://www.lesswrong.com/tag/base-rate-neglect", "base rate neglect": "https://www.lesswrong.com/tag/base-rate-neglect",
  "sesgo de confirmación": "https://www.lesswrong.com/tag/confirmation-bias", "confirmation bias": "https://www.lesswrong.com/tag/confirmation-bias",
  "argumentador sofisticado": "https://www.lesswrong.com/posts/AdYdLP2sRqPMoe8fb/knowing-about-biases-can-hurt-people", "sophisticated arguer": "https://www.lesswrong.com/posts/AdYdLP2sRqPMoe8fb/knowing-about-biases-can-hurt-people",
  "contraargumento completamente general": "https://www.lesswrong.com/posts/AdYdLP2sRqPMoe8fb/knowing-about-biases-can-hurt-people", "fully general counterargument": "https://www.lesswrong.com/posts/AdYdLP2sRqPMoe8fb/knowing-about-biases-can-hurt-people",
  "política como asesino mental": "https://www.lesswrong.com/posts/9weLK2AJ9JEt2Tt8f/politics-is-the-mind-killer", "politics mind-killer": "https://www.lesswrong.com/posts/9weLK2AJ9JEt2Tt8f/politics-is-the-mind-killer",
  "the bottom line": "https://www.lesswrong.com/posts/34XtPMFdhGRuNpuSm/the-bottom-line", "bottom line": "https://www.lesswrong.com/posts/34XtPMFdhGRuNpuSm/the-bottom-line",
  "disputa definicional": "https://www.lesswrong.com/posts/7X2j8HAkWdmMoS8PE/disputing-definitions", "definitional dispute": "https://www.lesswrong.com/posts/7X2j8HAkWdmMoS8PE/disputing-definitions",
  "tabú de la palabra": "https://www.lesswrong.com/posts/WBdvyyHLdxZSAMmoz/taboo-your-words", "taboo your words": "https://www.lesswrong.com/posts/WBdvyyHLdxZSAMmoz/taboo-your-words",
  "creencias que no pagan alquiler": "https://www.lesswrong.com/posts/a7n8GdKiAZRX86T5A/making-beliefs-pay-rent-in-anticipated-experiences", "beliefs pay rent": "https://www.lesswrong.com/posts/a7n8GdKiAZRX86T5A/making-beliefs-pay-rent-in-anticipated-experiences",
  "goodhart": "https://www.lesswrong.com/tag/goodhart-s-law", "ley de goodhart": "https://www.lesswrong.com/tag/goodhart-s-law",
  "mesa-optimización": "https://www.lesswrong.com/tag/mesa-optimization", "mesa-optimization": "https://www.lesswrong.com/tag/mesa-optimization",
  "agencia embebida": "https://www.lesswrong.com/posts/i3BTagvt3HbPMx6PN/embedded-agency-full-text-version", "embedded agency": "https://www.lesswrong.com/posts/i3BTagvt3HbPMx6PN/embedded-agency-full-text-version",
  "alineamiento engañoso": "https://www.lesswrong.com/tag/deceptive-alignment", "deceptive alignment": "https://www.lesswrong.com/tag/deceptive-alignment",
  "moloch": "https://www.lesswrong.com/posts/TxcRbCYHaeL59aY7E/meditations-on-moloch",
  "noncentral fallacy": "https://www.lesswrong.com/posts/yCWPkLi8wJvewPbEp/the-noncentral-fallacy-the-worst-argument-in-the-world", "falacia del no-centro": "https://www.lesswrong.com/posts/yCWPkLi8wJvewPbEp/the-noncentral-fallacy-the-worst-argument-in-the-world",
  "doble crux": "https://www.lesswrong.com/tag/double-crux", "double crux": "https://www.lesswrong.com/tag/double-crux",
  "corregibilidad": "https://www.lesswrong.com/tag/corrigibility", "corrigibility": "https://www.lesswrong.com/tag/corrigibility",
};
function findLWLink(n) { var l = (n || "").toLowerCase(); for (var k in LW_LINKS) { if (l.indexOf(k) !== -1) return LW_LINKS[k]; } return null; }

/* ═══════════════════════════════════════════ SYSTEM PROMPT ═══════════════════════════════════════════ */

var SYS_BASE = "Eres un Auditor Epistémico riguroso. Base teórica: LessWrong Sequences (2006-2009) + desarrollos post-2015 + extensión filosófica.\n\nTAXONOMÍA:\n=== SEQUENCES === confundir mapa/territorio, reificación, etiqueta como explicación, respuesta misteriosa, ignorar tasa base, evidencia débil como fuerte, conservadurismo bayesiano, evidencia filtrada, conservación de evidencia esperada, sesgo de confirmación, argumentador sofisticado, contraargumento completamente general, política como asesino mental, the bottom line, disputa definicional, categorías difusas como nítidas, inferencia por etiqueta, tabú de la palabra, predicciones infalsables, sorpresa sin actualización, mover postes de portería, creencias que no pagan alquiler.\n=== POST-2015 === ley de Goodhart (4 variantes), mesa-optimización, alineamiento interno/externo, agencia embebida, alineamiento engañoso, corregibilidad, giro traicionero, Moloch, equilibrios inadecuados, falacia del no-centro, doble crux, inmunidad epistémica, trampa de la abstracción.\n=== ERRORES FILOSÓFICOS === Lógico-argumentativos: petición de principio disfrazada de definición, regreso al infinito no reconocido, equivocidad (dos significados en mismo argumento), confusión necesario/suficiente, falso dilema filosófico. Metodológicos: abuso de experimentos mentales (intuition pump), generalización de intuiciones parroquiales, trampa de la abstracción filosófica, confusión de niveles (objeto/metanivel), error de composición filosófico. Hermenéuticos: lectura anacrónica, lectura selectiva (cherry-picking textual), argumento de autoridad filosófica, fusión autor-posición. Retórico-performativos: inmunización por oscuridad, profundidad simulada, falacia naturalista/moralista, deslizamiento normativo, reificación filosófica.\n\nREGLAS: 1) SOLO JSON válido. 2) Claves cortas del ejemplo. 3) En sesgos indica Sequences/post-2015/Filosófico. 4) En modo filosófico: usa campo 'sol' (solidez) en vez de 'c' (confianza), y añade campos 'tt' (tipo de texto) y 'sm' (supuestos metafilosóficos).\n\n";

var DEPTH_CFG = {
  quick: { tokens: 2048, inst: "Sé MUY breve: 1 frase por campo, max 2 elementos por array.\n\n" },
  standard: { tokens: 8192, inst: "Sé analítico: hasta 3 frases por campo, max 5 elementos por array.\n\n" },
  deep: { tokens: 8192, inst: "Sé exhaustivo y detallado: desarrolla cada campo con profundidad, max 6 elementos por array, explica conexiones entre sesgos.\n\n" },
};

var JSON_SCHEMA = '{"r":"resumen","ne":"OBSERVACION|INFERENCIA_FUERTE|INFERENCIA_DEBIL|ESPECULACION|AUTOENGANO_POSIBLE","c":0.7,"p":[{"t":"prop","tp":"empirica|logica|normativa|definicional","e":"solido|debil|fallido|indeterminado","f":"falsable por"}],"si":["supuesto"],"ci":[{"n":1,"de":"premisa","a":"conclusión","fu":"FUERTE|MEDIA|DEBIL","pr":"problema o null"}],"sg":[{"s":"sesgo","x":"explicación + Sequences/post-2015","sv":"ALTA|MEDIA|BAJA"}],"ev":{"af":["a favor"],"ec":["en contra"],"au":["ausente"]},"pq":["pregunta"],"v":"veredicto","rc":"recomendación","mc":"autocrítica"}';

var MODE_INST = {
  claim: "MODO AFIRMACIÓN: descompón en proposiciones, evalúa tipo/evidencia/confianza/falsabilidad, detecta sesgos.",
  argument: "MODO ARGUMENTO: reconstruye premisas→conclusión, evalúa validez/solidez, detecta falacias, semáforo por paso.",
  text: "MODO TEXTO: extrae 3-6 tesis, evalúa capas factual/inferencial/retórica/framing, detecta omisiones.",
  decision: "MODO DECISIÓN: clarifica valores, mapea opciones, evalúa valor esperado/peor caso/reversibilidad, detecta sesgos decisionales.",
  socratic: "MODO SOCRÁTICO: identifica pregunta implícita, formula preguntas que distingan saber/creer/asumir.",
  lesswrong: "MODO LESSWRONG: busca artículos en lesswrong.com, selecciona el más relevante, resume tesis, aplica auditoría epistémica.",
  compare: "MODO COMPARATIVO: audita esta postura individual. Identifica sus puntos fuertes y débiles. Sé riguroso e imparcial.",
  philosophical: "MODO FILOSÓFICO. Paso 0: Clasifica el texto (analítico/continental-hermenéutico/fenomenológico/genealógico-crítico/dialéctico/pragmatista/ensayo libre). Paso 1: Identifica tesis central (explícita/implícita/abierta), movimientos conceptuales clave, supuestos metafilosóficos, cadena de dependencias. Paso 2: Evalúa capas conceptual/inferencial/dialéctica/hermenéutica/normativa/retórico-performativa. Paso 3: Usa escala de solidez (SOLIDO/PLAUSIBLE/DEPENDIENTE/FALLIDO/INDETERMINADO) en campo 'sol' en vez de confianza numérica. Paso 4: Detecta errores filosóficos de la taxonomía. Paso 5: Contraargumentos omitidos, tradición rival, evidencia empírica ignorada. Paso 6: Preguntas sobre compromisos ontológicos/metodológicos/aplicabilidad. NOTA: En textos continentales, no penalizar por ausencia de argumentos formalizables, uso de metáforas como vehículo, o circularidad hermenéutica. SÍ penalizar por oscuridad gratuita, inmunización por complejidad, argumento de autoridad, equivocidad no reconocida. Añade campos 'tt' (tipo texto) y 'sm' (supuestos metafilosóficos) al JSON.",
};

var MODES = [
  { id: "claim", icon: "◎" }, { id: "argument", icon: "⟁" }, { id: "text", icon: "⊞" }, { id: "decision", icon: "⟐" },
  { id: "socratic", icon: "∿" }, { id: "lesswrong", icon: "⧉" }, { id: "compare", icon: "⟺" }, { id: "philosophical", icon: "⦿" },
];

var SEV_C = { ALTA: "#d4493b", MEDIA: "#c98a2e", BAJA: "#4a9e6b" };
var STR_C = { FUERTE: "#4a9e6b", MEDIA: "#c98a2e", DEBIL: "#d4493b" };
var EST_C = { solido: "#4a9e6b", debil: "#c98a2e", fallido: "#d4493b", indeterminado: "#7a7f8a" };
var EST_I = { solido: "●", debil: "◐", fallido: "○", indeterminado: "◌" };
var LVL_C = { OBSERVACION: "#4a8fb8", INFERENCIA_FUERTE: "#4a9e6b", INFERENCIA_DEBIL: "#c98a2e", ESPECULACION: "#8e6aad", AUTOENGANO_POSIBLE: "#d4493b" };
var SOL_C = { SOLIDO: "#4a9e6b", PLAUSIBLE: "#6a9fb5", DEPENDIENTE: "#c98a2e", FALLIDO: "#d4493b", INDETERMINADO: "#7a7f8a" };
var SOL_I = { SOLIDO: "●", PLAUSIBLE: "◐", DEPENDIENTE: "◑", FALLIDO: "○", INDETERMINADO: "◌" };

/* ═══════════════════════════════════════════ UTILS ═══════════════════════════════════════════ */

function parseJSON(raw) {
  var s = raw.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```\s*$/, "");
  var i = s.indexOf("{"); if (i === -1) throw new Error("No JSON"); s = s.slice(i);
  try { return JSON.parse(s); } catch (_) {}
  var j = s.lastIndexOf("}"); if (j > 0) { try { return JSON.parse(s.slice(0, j + 1)); } catch (_) {} }
  s = s.replace(/,\s*"[^"]*"?\s*:?\s*("(?:[^"\\]|\\.)*)?$/, "").replace(/,\s*\{[^}]*$/, "").replace(/,\s*\[[^\]]*$/, "").replace(/,\s*"[^"]*$/, "").replace(/,\s*$/, "");
  var br = 0, bk = 0, inS = false, esc = false;
  for (var k = 0; k < s.length; k++) { var c = s[k]; if (esc) { esc = false; continue; } if (c === "\\") { esc = true; continue; } if (c === '"') { inS = !inS; continue; } if (inS) continue; if (c === "{") br++; else if (c === "}") br--; if (c === "[") bk++; else if (c === "]") bk--; }
  if (inS) s += '"'; for (var a = 0; a < bk; a++) s += "]"; for (var b = 0; b < br; b++) s += "}";
  return JSON.parse(s);
}

function normalize(d) {
  if (!d) return null;
  return {
    resumen: d.r || d.resumen || "", nivel_epistemico: d.ne || d.nivel_epistemico || "",
    confianza: d.c != null ? d.c : d.confianza != null ? d.confianza : 0,
    proposiciones: (d.p || d.proposiciones || []).map(function(x) { return { texto: x.t || x.texto || "", tipo: x.tp || x.tipo || "", estado: x.e || x.estado || "", falsable_por: x.f || x.falsable_por || "" }; }),
    supuestos: d.si || d.supuestos_implicitos || [],
    cadena: (d.ci || d.cadena_inferencial || []).map(function(x) { return { paso: x.n || x.paso || 0, de: x.de || "", a: x.a || "", fuerza: x.fu || x.fuerza || "", problema: x.pr || x.problema || null }; }),
    sesgos: (d.sg || d.sesgos_detectados || []).map(function(x) { return { sesgo: x.s || x.sesgo || "", explicacion: x.x || x.explicacion || "", severidad: x.sv || x.severidad || "" }; }),
    evidencia: { a_favor: (d.ev && d.ev.af) || (d.evidencia && d.evidencia.a_favor) || [], en_contra: (d.ev && d.ev.ec) || (d.evidencia && d.evidencia.en_contra) || [], ausente: (d.ev && d.ev.au) || (d.evidencia && d.evidencia.ausente_critica) || [] },
    preguntas: d.pq || d.preguntas || [], veredicto: d.v || d.veredicto || "",
    recomendacion: d.rc || d.recomendacion || "", metacognicion: d.mc || d.metacognicion || "",
    solidez: d.sol || d.solidez || "",
    tipo_texto: d.tt || d.tipo_texto || "",
    supuestos_meta: d.sm || d.supuestos_meta || "",
  };
}

function toMarkdown(raw, t) {
  var d = normalize(raw); if (!d) return "";
  var L = ["# " + t.title, ""];
  if (d.solidez) { L.push("**" + t.solidez + ":** " + d.solidez + " — " + (d.nivel_epistemico || "").replace(/_/g, " ")); }
  else { L.push("**" + t.confidence + ":** " + Math.round(d.confianza * 100) + "% — " + (d.nivel_epistemico || "").replace(/_/g, " ")); }
  L.push("", d.resumen, "");
  if (d.tipo_texto) L.push("**" + t.tipo_texto + ":** " + d.tipo_texto, "");
  if (d.supuestos_meta) L.push("**" + t.sup_meta + ":** " + d.supuestos_meta, "");
  if (d.proposiciones.length) { L.push("## " + t.propositions); d.proposiciones.forEach(function(p) { L.push("- **[" + p.estado + "]** " + p.texto + (p.falsable_por ? " (" + t.falsifiable + ": " + p.falsable_por + ")" : "")); }); L.push(""); }
  if (d.supuestos.length) { L.push("## " + t.assumptions); d.supuestos.forEach(function(s) { L.push("- " + s); }); L.push(""); }
  if (d.cadena.length) { L.push("## " + t.chain); d.cadena.forEach(function(c) { L.push(c.paso + ". " + c.de + " → " + c.a + " [" + c.fuerza + "]" + (c.problema && c.problema !== "null" ? " ⚠ " + c.problema : "")); }); L.push(""); }
  if (d.sesgos.length) { L.push("## " + t.biases); d.sesgos.forEach(function(s) { var lk = findLWLink(s.sesgo); L.push("- **" + s.sesgo + "** [" + s.severidad + "]: " + s.explicacion + (lk ? " [LW](" + lk + ")" : "")); }); L.push(""); }
  L.push("## " + t.verdict, d.veredicto, ""); if (d.recomendacion) L.push("## " + t.recommendation, d.recomendacion, "");
  if (d.metacognicion) L.push("## " + t.metacog, "_" + d.metacognicion + "_", "");
  L.push("---", "_" + t.disclaimer + "_"); return L.join("\n");
}

function copyText(txt) { var ta = document.createElement("textarea"); ta.value = txt; ta.style.position = "fixed"; ta.style.left = "-9999px"; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta); }

/* ═══════════════════════════════════════════ MICRO COMPONENTS ═══════════════════════════════════════════ */

function Bar({ value, label }) {
  var pct = Math.round((value || 0) * 100); var c = pct >= 70 ? "#4a9e6b" : pct >= 40 ? "#c98a2e" : "#d4493b";
  return (<div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    {label && <span style={{ fontSize: 10, fontFamily: "var(--m)", color: "var(--t3)", textTransform: "uppercase", letterSpacing: 1, minWidth: 60 }}>{label}</span>}
    <div style={{ flex: 1, height: 4, background: "var(--bg3)", borderRadius: 2, overflow: "hidden" }}><div style={{ width: pct + "%", height: "100%", background: c, borderRadius: 2, transition: "width .8s" }} /></div>
    <span style={{ fontFamily: "var(--m)", fontSize: 12, color: c, fontWeight: 600, minWidth: 32, textAlign: "right" }}>{pct + "%"}</span>
  </div>);
}
function Tag({ children, color = "var(--ac)" }) { return (<span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 3, fontSize: 10, fontFamily: "var(--m)", fontWeight: 600, letterSpacing: .6, textTransform: "uppercase", background: color + "18", color, border: "1px solid " + color + "30" }}>{children}</span>); }
function Fold({ title, icon, children, open: init = true }) {
  var [open, setOpen] = useState(init);
  return (<div style={{ marginBottom: 2 }}>
    <button onClick={function() { setOpen(!open); }} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, padding: "10px 0", width: "100%", textAlign: "left", borderBottom: open ? "1px solid var(--bd)" : "1px solid transparent" }}>
      <span style={{ fontSize: 14, fontFamily: "var(--m)", color: "var(--ac)", opacity: .6, width: 20, textAlign: "center" }}>{icon}</span>
      <span style={{ fontSize: 13, fontWeight: 600, color: "var(--t1)", fontFamily: "var(--h)", flex: 1 }}>{title}</span>
      <span style={{ fontSize: 10, transform: open ? "rotate(0)" : "rotate(-90deg)", color: "var(--t3)", fontFamily: "var(--m)", transition: "transform .2s" }}>{"▼"}</span>
    </button>
    {open && <div style={{ padding: "12px 0 12px 30px" }}>{children}</div>}
  </div>);
}
function FileChip({ file, onRemove }) {
  var ext = "." + (file.name || "").split(".").pop().toLowerCase();
  var ic = { ".pdf": "◰", ".png": "◳", ".jpg": "◳", ".jpeg": "◳", ".txt": "◱", ".md": "◱", ".csv": "◲" };
  return (<div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 4, background: "var(--bg3)", border: "1px solid var(--bd)", fontSize: 11, color: "var(--t2)", maxWidth: 200, fontFamily: "var(--m)" }}>
    <span style={{ opacity: .5 }}>{ic[ext] || "◎"}</span><span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>{file.name}</span>
    <button onClick={onRemove} style={{ background: "none", border: "none", cursor: "pointer", color: "#d4493b", fontSize: 13, padding: 0, opacity: .6 }}>{"×"}</button>
  </div>);
}

/* ═══════════════════════════════════════════ RESULT ═══════════════════════════════════════════ */

function Result({ data: raw, t, compact }) {
  var data = normalize(raw); if (!data) return null;
  var lvl = LVL_C[data.nivel_epistemico] || "var(--ac)";
  var [cp, setCp] = useState(null);
  function handleCopy() { copyText(toMarkdown(raw, t)); setCp(t.copied); setTimeout(function() { setCp(null); }, 1500); }
  return (<div style={{ animation: compact ? "none" : "auditIn .5s ease" }}>
    <div style={{ padding: compact ? 14 : 20, background: "var(--bg2)", borderRadius: 8, border: "1px solid var(--bd)", marginBottom: 16, borderLeft: "3px solid " + lvl }}>
      <p style={{ fontSize: compact ? 13 : 15, color: "var(--t1)", lineHeight: 1.7, margin: 0, fontFamily: "var(--b)" }}>{data.resumen}</p>
      <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap", alignItems: "center" }}>
        <Tag color={lvl}>{(data.nivel_epistemico || "").replace(/_/g, " ")}</Tag>
        <div style={{ flex: 1, minWidth: 100 }}>
          {data.solidez ? (<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 10, fontFamily: "var(--m)", color: "var(--t3)", textTransform: "uppercase", letterSpacing: 1 }}>{t.solidez}</span>
            <Tag color={SOL_C[data.solidez] || "var(--ac)"}>{(SOL_I[data.solidez] || "") + " " + data.solidez}</Tag>
          </div>) : <Bar value={data.confianza} label={t.confidence} />}
        </div>
      </div>
    </div>
    {/* Philosophical: tipo de texto */}
    {data.tipo_texto && (<div style={{ padding: 12, background: "var(--bg2)", borderRadius: 6, border: "1px solid var(--bd)", marginBottom: 12 }}>
      <span style={{ fontSize: 10, fontFamily: "var(--m)", color: "var(--ac)", textTransform: "uppercase", letterSpacing: 1, marginRight: 8 }}>{t.tipo_texto}</span>
      <span style={{ fontSize: 13, color: "var(--t1)" }}>{data.tipo_texto}</span>
    </div>)}
    {/* Philosophical: supuestos metafilosóficos */}
    {data.supuestos_meta && (<div style={{ padding: 12, background: "var(--bg2)", borderRadius: 6, border: "1px solid var(--bd)", marginBottom: 12 }}>
      <div style={{ fontSize: 10, fontFamily: "var(--m)", color: "var(--ac)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{t.sup_meta}</div>
      <p style={{ fontSize: 12, color: "var(--t2)", margin: 0, lineHeight: 1.65 }}>{data.supuestos_meta}</p>
    </div>)}
    {data.proposiciones.length > 0 && (<Fold title={t.propositions} icon="◎" open={!compact}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{data.proposiciones.map(function(p, i) { return (<div key={i} style={{ padding: 10, background: "var(--bg2)", borderRadius: 6, borderLeft: "3px solid " + (EST_C[p.estado] || "#7a7f8a") }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 6, marginBottom: 3 }}>
          <span style={{ fontSize: 12, color: "var(--t1)", lineHeight: 1.6, flex: 1 }}><span style={{ color: EST_C[p.estado], marginRight: 5 }}>{EST_I[p.estado] || "◌"}</span>{p.texto}</span>
          <div style={{ display: "flex", gap: 3, flexShrink: 0 }}><Tag color={EST_C[p.estado] || "#7a7f8a"}>{p.estado}</Tag>{p.tipo && <Tag>{p.tipo}</Tag>}</div>
        </div>
        {p.falsable_por && <div style={{ fontSize: 10, color: "var(--t3)", fontStyle: "italic", marginTop: 3 }}><span style={{ fontFamily: "var(--m)", color: "var(--ac)", opacity: .5, marginRight: 4 }}>{t.falsifiable + ":"}</span>{p.falsable_por}</div>}
      </div>); })}</div>
    </Fold>)}
    {data.supuestos.length > 0 && (<Fold title={t.assumptions} icon="◌" open={!compact}><ul style={{ margin: 0, paddingLeft: 16 }}>{data.supuestos.map(function(s, i) { return <li key={i} style={{ fontSize: 12, color: "var(--t2)", lineHeight: 1.7, marginBottom: 3 }}>{s}</li>; })}</ul></Fold>)}
    {data.cadena.length > 0 && (<Fold title={t.chain} icon="⟁" open={!compact}>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>{data.cadena.map(function(p, i) { return (<div key={i} style={{ display: "flex", gap: 10, fontSize: 12, color: "var(--t2)", padding: "6px 0", borderBottom: i < data.cadena.length - 1 ? "1px solid var(--bd)" : "none" }}>
        <span style={{ fontFamily: "var(--m)", color: STR_C[p.fuerza] || "#7a7f8a", minWidth: 20, textAlign: "center", fontSize: 11, fontWeight: 700 }}>{p.paso}</span>
        <div style={{ flex: 1 }}><div><span style={{ opacity: .55 }}>{p.de}</span><span style={{ margin: "0 6px", opacity: .25, fontFamily: "var(--m)", fontSize: 10 }}>{"→"}</span><span style={{ fontWeight: 500 }}>{p.a}</span></div>
          <div style={{ display: "flex", gap: 6, marginTop: 4, flexWrap: "wrap" }}><Tag color={STR_C[p.fuerza] || "#7a7f8a"}>{p.fuerza}</Tag>{p.problema && p.problema !== "null" && <span style={{ fontSize: 10, color: "#d4493b", fontStyle: "italic" }}>{"⚠ " + p.problema}</span>}</div></div>
      </div>); })}</div>
    </Fold>)}
    {data.sesgos.length > 0 && (<Fold title={t.biases + " (" + data.sesgos.length + ")"} icon="⊘" open={!compact}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{data.sesgos.map(function(s, i) { var lk = findLWLink(s.sesgo); return (<div key={i} style={{ padding: 12, background: "var(--bg2)", borderRadius: 6, borderLeft: "3px solid " + (SEV_C[s.severidad] || "#7a7f8a") }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
          <span style={{ fontWeight: 600, fontSize: 12, color: "var(--t1)", fontFamily: "var(--h)" }}>{s.sesgo}</span>
          <div style={{ display: "flex", gap: 5, alignItems: "center" }}>{lk && <a href={lk} target="_blank" rel="noopener noreferrer" style={{ fontSize: 9, fontFamily: "var(--m)", color: "var(--ac)", textDecoration: "none", opacity: .7 }}>{t.lw_link}</a>}<Tag color={SEV_C[s.severidad] || "#7a7f8a"}>{s.severidad}</Tag></div>
        </div>
        <p style={{ fontSize: 11, color: "var(--t2)", margin: 0, lineHeight: 1.6 }}>{s.explicacion}</p>
      </div>); })}</div>
    </Fold>)}
    {data.evidencia && (<Fold title={t.evidence} icon="⚖" open={!compact}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 8 }}>
        {[{ key: "a_favor", label: t.ev_for, c: "#4a9e6b" }, { key: "en_contra", label: t.ev_against, c: "#d4493b" }, { key: "ausente", label: t.ev_missing, c: "#8e6aad" }].map(function(ev) { return (<div key={ev.key} style={{ padding: 10, borderRadius: 6, background: ev.c + "0C", border: "1px solid " + ev.c + "20" }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: ev.c, marginBottom: 6, textTransform: "uppercase", fontFamily: "var(--m)" }}>{ev.label}</div>
          <ul style={{ margin: 0, paddingLeft: 12, fontSize: 11, color: "var(--t2)", lineHeight: 1.7 }}>{(data.evidencia[ev.key] || []).map(function(e, i) { return <li key={i}>{e}</li>; })}</ul>
        </div>); })}
      </div>
    </Fold>)}
    {data.preguntas.length > 0 && (<Fold title={t.questions} icon="?" open={!compact}><ol style={{ margin: 0, paddingLeft: 16 }}>{data.preguntas.map(function(q, i) { return <li key={i} style={{ fontSize: 12, color: "var(--t2)", lineHeight: 1.7, marginBottom: 3 }}>{q}</li>; })}</ol></Fold>)}
    <div style={{ padding: compact ? 14 : 20, background: "var(--bg2)", borderRadius: 8, border: "1px solid var(--bd)", marginTop: 14 }}>
      <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: "var(--ac)", marginBottom: 8, fontFamily: "var(--m)" }}>{t.verdict}</div>
      <p style={{ fontSize: compact ? 12 : 14, color: "var(--t1)", lineHeight: 1.75, margin: 0, fontFamily: "var(--b)" }}>{data.veredicto}</p>
      {data.recomendacion && (<><div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: "var(--ac)", marginBottom: 8, marginTop: 14, fontFamily: "var(--m)" }}>{t.recommendation}</div><p style={{ fontSize: 12, color: "var(--t2)", lineHeight: 1.7, margin: 0 }}>{data.recomendacion}</p></>)}
    </div>
    {data.metacognicion && (<div style={{ marginTop: 14, padding: 14, borderRadius: 8, background: "var(--ac)" + "08", border: "1px dashed var(--ac)" + "30" }}>
      <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: "var(--ac)", marginBottom: 8, fontFamily: "var(--m)", opacity: .7 }}>{"◌ " + t.metacog}</div>
      <p style={{ fontSize: 11, color: "var(--t2)", margin: 0, lineHeight: 1.7, fontStyle: "italic" }}>{data.metacognicion}</p>
    </div>)}
    <div style={{ display: "flex", justifyContent: "center", marginTop: 14 }}>
      <button onClick={handleCopy} style={{ padding: "5px 14px", borderRadius: 4, border: "1px solid var(--bd)", background: "transparent", cursor: "pointer", fontSize: 10, color: cp ? "#4a9e6b" : "var(--t3)", fontFamily: "var(--m)" }}>{cp || ("◱ " + t.copy_md)}</button>
    </div>
    {!compact && <p style={{ fontSize: 9, color: "var(--t3)", opacity: .4, marginTop: 14, fontStyle: "italic", textAlign: "center", fontFamily: "var(--m)" }}>{t.disclaimer}</p>}
  </div>);
}

/* ═══════════════════════════════════════════ MAIN APP ═══════════════════════════════════════════ */

export default function EpistemicAuditor() {
  var [input, setInput] = useState("");
  var [inputB, setInputB] = useState("");
  var [mode, setMode] = useState("claim");
  var [lang, setLang] = useState("es");
  var [depth, setDepth] = useState("standard");
  var [loading, setLoading] = useState(false);
  var [result, setResult] = useState(null);
  var [resultB, setResultB] = useState(null);
  var [error, setError] = useState(null);
  var [warn, setWarn] = useState(null);
  var [history, setHistory] = useState([]);
  var [savedAudits, setSavedAudits] = useState([]);
  var [showSaved, setShowSaved] = useState(false);
  var [files, setFiles] = useState([]);
  var [drag, setDrag] = useState(false);
  var [phase, setPhase] = useState("");
  var fileRef = useRef(null);
  var t = T[lang] || T.es;

  useEffect(function() {
    var el = document.createElement("style");
    el.textContent = "@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Source+Sans+3:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');:root{--bg1:#0c0d10;--bg2:#121418;--bg3:#1a1d23;--t1:#c8c8cc;--t2:#8a8a92;--t3:#5a5a64;--ac:#7a9aaa;--bd:#222630;--h:'Cormorant Garamond',Georgia,serif;--b:'Source Sans 3','Source Sans Pro',sans-serif;--m:'IBM Plex Mono',monospace}@media(prefers-color-scheme:light){:root{--bg1:#f5f3ef;--bg2:#eae7e1;--bg3:#dedad3;--t1:#1c1c1e;--t2:#5a5a5e;--t3:#8a8a90;--ac:#4a7a8a;--bd:#ccc8c0}}@keyframes auditIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}@keyframes auditSpin{from{transform:rotate(0)}to{transform:rotate(360deg)}}@keyframes auditPulse{0%,100%{opacity:.3}50%{opacity:.9}}*{box-sizing:border-box}textarea:focus,button:focus-visible{outline:1.5px solid var(--ac);outline-offset:2px}::selection{background:var(--ac);color:#fff}";
    document.head.appendChild(el);
    return function() { document.head.removeChild(el); };
  }, []);

  // Persistent storage
  useEffect(function() {
    try { window.storage.get("audits-saved").then(function(r) { if (r && r.value) setSavedAudits(JSON.parse(r.value)); }).catch(function() {}); } catch (_) {}
  }, []);

  function saveAudit() {
    if (!result) return;
    var entry = { label: input.trim().slice(0, 60) || "audit", mode: mode, date: new Date().toISOString().slice(0, 10), data: result, dataB: resultB || null };
    var next = [entry].concat(savedAudits).slice(0, 30);
    setSavedAudits(next);
    try { window.storage.set("audits-saved", JSON.stringify(next)); } catch (_) {}
  }

  function loadAudit(a) { setResult(a.data); setResultB(a.dataB); setShowSaved(false); }
  function clearSaved() { setSavedAudits([]); try { window.storage.delete("audits-saved"); } catch (_) {} }

  function readText(f) { return new Promise(function(r, j) { var x = new FileReader(); x.onload = function() { r(x.result); }; x.onerror = function() { j("err"); }; x.readAsText(f); }); }
  function readB64(f) { return new Promise(function(r, j) { var x = new FileReader(); x.onload = function() { r(x.result.split(",")[1]); }; x.onerror = function() { j("err"); }; x.readAsDataURL(f); }); }

  var FT = { ".txt": { k: "text", m: "text/plain", mb: .5 }, ".md": { k: "text", m: "text/markdown", mb: .5 }, ".csv": { k: "text", m: "text/csv", mb: .5 }, ".pdf": { k: "pdf", m: "application/pdf", mb: 4.5 }, ".png": { k: "image", m: "image/png", mb: 5 }, ".jpg": { k: "image", m: "image/jpeg", mb: 5 }, ".jpeg": { k: "image", m: "image/jpeg", mb: 5 }, ".gif": { k: "image", m: "image/gif", mb: 5 }, ".webp": { k: "image", m: "image/webp", mb: 5 } };
  function ext(n) { return "." + (n || "").split(".").pop().toLowerCase(); }
  var addFiles = useCallback(function(list) { var ok = []; for (var i = 0; i < list.length; i++) { var f = list[i]; var ft = FT[ext(f.name)]; if (ft && f.size / 1048576 <= ft.mb) ok.push(f); } if (ok.length) setFiles(function(p) { return p.concat(ok).slice(0, 5); }); }, []);
  var onDragOver = useCallback(function(e) { e.preventDefault(); setDrag(true); }, []);
  var onDragLeave = useCallback(function(e) { e.preventDefault(); setDrag(false); }, []);
  var onDrop = useCallback(function(e) { e.preventDefault(); setDrag(false); if (e.dataTransfer.files) addFiles(Array.from(e.dataTransfer.files)); }, [addFiles]);

  async function apiCall(msg, useSearch) {
    try {
      var cfg = DEPTH_CFG[depth] || DEPTH_CFG.standard;
      var body = { model: "claude-sonnet-4-20250514", max_tokens: cfg.tokens, messages: [{ role: "user", content: msg }] };
      if (useSearch) body.tools = [{ type: "web_search_20250305", name: "web_search" }];

      var r;
      try {
        r = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      } catch (fetchErr) {
        return { error: "Red: " + (fetchErr.message || "fetch failed") };
      }

      // Read body as text first — safer on iOS WebKit
      var rawBody = "";
      try {
        rawBody = await r.text();
      } catch (readErr) {
        return { error: "No se pudo leer la respuesta (" + r.status + ")" };
      }

      if (!rawBody || !rawBody.trim()) {
        return { error: "Respuesta vacía (HTTP " + r.status + ")" };
      }

      // Parse JSON from text
      var d;
      try {
        d = JSON.parse(rawBody);
      } catch (parseErr) {
        // Maybe the response is HTML or an error page
        var snippet = rawBody.slice(0, 120).replace(/</g, "").replace(/>/g, "");
        return { error: "Respuesta no-JSON (HTTP " + r.status + "): " + snippet };
      }

      if (!r.ok) {
        var errMsg = "HTTP " + r.status;
        if (d && d.error && d.error.message) errMsg = d.error.message;
        else if (d && d.message) errMsg = d.message;
        return { error: errMsg };
      }

      // Extract text blocks safely
      if (!d || !d.content || !Array.isArray(d.content)) {
        return { error: "Formato inesperado: sin campo 'content'" };
      }

      var txt = "";
      for (var i = 0; i < d.content.length; i++) {
        if (d.content[i] && d.content[i].type === "text" && d.content[i].text) {
          txt += d.content[i].text;
        }
      }

      if (!txt.trim()) return { error: "Respuesta sin texto" };

      return { text: txt, truncated: d.stop_reason === "max_tokens" };
    } catch (e) {
      return { error: "Error inesperado: " + (e.message || String(e)) };
    }
  }

  function buildSysMsg() { var cfg = DEPTH_CFG[depth] || DEPTH_CFG.standard; return SYS_BASE + cfg.inst + t.lang_instruction + "\n\n" + JSON_SCHEMA; }

  async function run() {
    var isCompare = mode === "compare";
    if (!isCompare && !input.trim() && !files.length && mode !== "lesswrong") return;
    if (isCompare && (!input.trim() || !inputB.trim())) return;
    setLoading(true); setError(null); setWarn(null); setResult(null); setResultB(null); setPhase("…");

    try {
      var sys = buildSysMsg();

      if (isCompare) {
        setPhase("A…");
        var rA = await apiCall(sys + "\n\n---\n\n" + MODE_INST.compare + "\n\nPosición A:\n\n" + input.trim());
        setPhase("B…");
        var rB = await apiCall(sys + "\n\n---\n\n" + MODE_INST.compare + "\n\nPosición B:\n\n" + inputB.trim());
        if (rA.error) throw new Error("A: " + rA.error);
        if (rB.error) throw new Error("B: " + rB.error);
        setResult(parseJSON(rA.text));
        setResultB(parseJSON(rB.text));
      } else if (mode === "lesswrong") {
        setPhase("⧉");
        var lwQ = input.trim() || "recent articles";
        var rLW = await apiCall(sys + "\n\n---\n\n" + MODE_INST.lesswrong + "\n\nTopic: " + lwQ, true);
        if (rLW.error) { rLW = await apiCall(sys + "\n\n---\n\n" + MODE_INST.lesswrong + "\n\nTopic: " + lwQ + "\n\nUse your knowledge."); if (!rLW.error) setWarn(t.lw_fallback); }
        if (rLW.error) throw new Error(rLW.error);
        setResult(parseJSON(rLW.text));
        if (rLW.truncated) setWarn(t.truncated);
      } else {
        var textChunks = []; var bins = []; var hasBin = false;
        for (var i = 0; i < files.length; i++) {
          var f = files[i]; var ft = FT[ext(f.name)]; if (!ft) continue;
          if (ft.k === "text") { try { var tx = await readText(f); textChunks.push("[" + f.name + "]\n" + (tx.length > 30000 ? tx.slice(0, 30000) : tx)); } catch (_) {} }
          else if (ft.k === "image") { try { bins.push({ type: "image", source: { type: "base64", media_type: ft.m, data: await readB64(f) } }); hasBin = true; } catch (_) {} }
          else if (ft.k === "pdf") { try { bins.push({ type: "document", source: { type: "base64", media_type: "application/pdf", data: await readB64(f) } }); hasBin = true; } catch (_) {} }
        }
        setPhase("◎");
        var userI = input.trim() ? MODE_INST[mode] + "\n\n" + input : MODE_INST[mode] + "\n\nAnaliza el contenido.";
        var tp = sys + "\n\n---\n\n" + (textChunks.length ? textChunks.join("\n---\n") + "\n---\n" : "") + userI;
        var msg = hasBin ? bins.concat([{ type: "text", text: tp }]) : tp;
        var rStd = await apiCall(msg);
        if (rStd.error && hasBin) { setPhase("↻"); rStd = await apiCall(tp); if (!rStd.error) setWarn(t.bin_fallback); }
        if (rStd.error) throw new Error(rStd.error);
        setResult(parseJSON(rStd.text));
        if (rStd.truncated) setWarn(t.truncated);
      }
      var lb = input.trim() ? input.slice(0, 50) : files.length ? files[0].name : "LW";
      setHistory(function(p) { return [{ label: lb, modeLabel: t.modes[mode], time: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }), data: result, hasFiles: files.length > 0 }].concat(p.slice(0, 19)); });
    } catch (e) { console.error(e); setError(e.message); }
    finally { setLoading(false); setPhase(""); }
  }

  var hasInput = mode === "compare" ? (input.trim() && inputB.trim()) : (input.trim() || files.length > 0 || mode === "lesswrong");
  var depthLabels = { quick: t.depth_quick, standard: t.depth_std, deep: t.depth_deep };

  return (<div style={{ minHeight: "100vh", background: "var(--bg1)", color: "var(--t1)", fontFamily: "var(--b)", padding: "24px 16px", maxWidth: 760, margin: "0 auto" }}>

    {/* Top bar: lang + depth */}
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
      <div style={{ display: "flex", gap: 2 }}>
        {["es", "en", "zh"].map(function(l) { return (<button key={l} onClick={function() { setLang(l); }} style={{ padding: "3px 10px", borderRadius: 3, border: lang === l ? "1px solid var(--ac)" : "1px solid var(--bd)", background: lang === l ? "var(--ac)15" : "transparent", color: lang === l ? "var(--ac)" : "var(--t3)", fontSize: 10, fontFamily: "var(--m)", fontWeight: 600, cursor: "pointer" }}>{{ es: "ES", en: "EN", zh: "中文" }[l]}</button>); })}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 9, fontFamily: "var(--m)", color: "var(--t3)", textTransform: "uppercase", letterSpacing: 1 }}>{t.depth_label}</span>
        {["quick", "standard", "deep"].map(function(d) { return (<button key={d} onClick={function() { setDepth(d); }} style={{ padding: "3px 10px", borderRadius: 3, border: depth === d ? "1px solid var(--ac)" : "1px solid var(--bd)", background: depth === d ? "var(--ac)15" : "transparent", color: depth === d ? "var(--ac)" : "var(--t3)", fontSize: 10, fontFamily: "var(--m)", fontWeight: 600, cursor: "pointer" }}>{depthLabels[d]}</button>); })}
      </div>
    </div>

    <header style={{ marginBottom: 28, textAlign: "center" }}>
      <div style={{ fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: "var(--ac)", fontFamily: "var(--m)", marginBottom: 6, opacity: .6 }}>{t.header_sub}</div>
      <h1 style={{ fontSize: 30, fontWeight: 700, margin: 0, color: "var(--t1)", fontFamily: "var(--h)", fontStyle: "italic" }}>{t.title}</h1>
      <p style={{ fontSize: 12, color: "var(--t3)", marginTop: 6, fontFamily: "var(--b)", maxWidth: 440, marginLeft: "auto", marginRight: "auto" }}>{t.desc}</p>
    </header>

    {/* Modes - 4 columns for 7 modes */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, marginBottom: 18 }}>
      {MODES.map(function(m) { var sel = mode === m.id; return (<button key={m.id} onClick={function() { setMode(m.id); setResult(null); setResultB(null); }} title={t.mode_desc[m.id]} style={{ padding: "7px 6px", borderRadius: 6, border: sel ? "1.5px solid var(--ac)" : "1px solid var(--bd)", background: sel ? "var(--ac)12" : "transparent", cursor: "pointer", textAlign: "center", color: sel ? "var(--ac)" : "var(--t3)" }}>
        <div style={{ fontSize: 15, fontFamily: "var(--m)", lineHeight: 1 }}>{m.icon}</div>
        <div style={{ fontSize: 9, fontWeight: 600, fontFamily: "var(--m)", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.modes[m.id]}</div>
      </button>); })}
    </div>
    <div style={{ fontSize: 10, color: "var(--t3)", textAlign: "center", marginBottom: 14, fontFamily: "var(--m)", opacity: .5 }}>{t.mode_desc[mode]}</div>

    {/* Input area */}
    {mode === "compare" ? (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
        <textarea value={input} onChange={function(e) { setInput(e.target.value); }} placeholder={t.placeholder_cmp_a} rows={4} style={{ width: "100%", padding: 14, borderRadius: 8, border: "1px solid var(--bd)", background: "var(--bg2)", color: "var(--t1)", fontSize: 13, fontFamily: "var(--b)", resize: "vertical", lineHeight: 1.6 }} />
        <textarea value={inputB} onChange={function(e) { setInputB(e.target.value); }} placeholder={t.placeholder_cmp_b} rows={4} style={{ width: "100%", padding: 14, borderRadius: 8, border: "1px solid var(--bd)", background: "var(--bg2)", color: "var(--t1)", fontSize: 13, fontFamily: "var(--b)", resize: "vertical", lineHeight: 1.6 }} />
      </div>
    ) : (
      <div onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop} style={{ marginBottom: 10, borderRadius: 8, position: "relative", border: drag ? "2px dashed var(--ac)" : "1px solid var(--bd)", background: drag ? "var(--ac)08" : "var(--bg2)" }}>
        {drag && (<div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10, background: "var(--bg2)", borderRadius: 8, opacity: .95 }}><span style={{ fontFamily: "var(--m)", fontSize: 11, color: "var(--ac)" }}>{"◎ " + t.drop}</span></div>)}
        <textarea value={input} onChange={function(e) { setInput(e.target.value); }} onKeyDown={function(e) { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) run(); }} placeholder={mode === "lesswrong" ? t.placeholder_lw : mode === "philosophical" ? t.placeholder_phil : t.placeholder} rows={5} style={{ width: "100%", padding: 14, borderRadius: 8, border: "none", background: "transparent", color: "var(--t1)", fontSize: 13, fontFamily: "var(--b)", resize: "vertical", lineHeight: 1.7 }} />
        {files.length > 0 && (<div style={{ padding: "0 12px 10px", display: "flex", flexWrap: "wrap", gap: 5 }}>{files.map(function(f, i) { return <FileChip key={i} file={f} onRemove={function() { setFiles(function(p) { return p.filter(function(_, j) { return j !== i; }); }); }} />; })}</div>)}
      </div>
    )}

    {/* Controls */}
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 8 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {mode !== "compare" && (<>
          <input ref={fileRef} type="file" multiple accept=".txt,.md,.csv,.pdf,.png,.jpg,.jpeg,.gif,.webp" style={{ display: "none" }} onChange={function(e) { if (e.target.files) { addFiles(Array.from(e.target.files)); e.target.value = ""; } }} />
          <button onClick={function() { if (fileRef.current) fileRef.current.click(); }} style={{ padding: "5px 11px", borderRadius: 4, border: "1px solid var(--bd)", background: "transparent", cursor: "pointer", fontSize: 10, color: "var(--t3)", fontFamily: "var(--m)" }}>{"◰ " + t.attach}</button>
        </>)}
        {result && (<button onClick={saveAudit} style={{ padding: "5px 11px", borderRadius: 4, border: "1px solid var(--bd)", background: "transparent", cursor: "pointer", fontSize: 10, color: "var(--t3)", fontFamily: "var(--m)" }}>{"⬡ " + t.save_current}</button>)}
        {savedAudits.length > 0 && (<button onClick={function() { setShowSaved(!showSaved); }} style={{ padding: "5px 11px", borderRadius: 4, border: "1px solid var(--bd)", background: "transparent", cursor: "pointer", fontSize: 10, color: "var(--t3)", fontFamily: "var(--m)" }}>{"◫ " + t.saved_audits + " (" + savedAudits.length + ")"}</button>)}
      </div>
      <button onClick={run} disabled={loading || !hasInput} style={{ padding: "7px 22px", borderRadius: 6, border: "1px solid " + (loading ? "var(--bd)" : "var(--ac)"), background: loading ? "var(--bg3)" : "transparent", color: loading ? "var(--t3)" : "var(--ac)", fontSize: 11, fontWeight: 600, cursor: loading ? "wait" : "pointer", fontFamily: "var(--m)", opacity: !hasInput && !loading ? .3 : 1, letterSpacing: .5 }}>
        {loading ? phase : mode === "lesswrong" ? "⧉ " + t.search_btn : mode === "compare" ? "⟺ " + t.compare_btn : mode === "philosophical" ? "⦿ " + t.audit_btn : "◎ " + t.audit_btn}
      </button>
    </div>

    {/* Saved audits panel */}
    {showSaved && (<div style={{ marginBottom: 16, padding: 14, borderRadius: 8, border: "1px solid var(--bd)", background: "var(--bg2)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ fontSize: 10, fontFamily: "var(--m)", color: "var(--t3)", textTransform: "uppercase", letterSpacing: 1 }}>{t.saved_audits}</span>
        <button onClick={clearSaved} style={{ fontSize: 9, fontFamily: "var(--m)", color: "#d4493b", background: "none", border: "none", cursor: "pointer", opacity: .7 }}>{t.clear_saved}</button>
      </div>
      {savedAudits.map(function(a, i) { return (<button key={i} onClick={function() { loadAudit(a); }} style={{ display: "flex", justifyContent: "space-between", width: "100%", padding: "6px 8px", marginBottom: 3, borderRadius: 4, border: "1px solid var(--bd)", background: "transparent", cursor: "pointer", color: "var(--t2)", fontSize: 10, textAlign: "left" }}>
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>{a.label}</span>
        <span style={{ fontFamily: "var(--m)", fontSize: 9, opacity: .4, marginLeft: 8 }}>{a.date}</span>
      </button>); })}
    </div>)}

    {warn && (<div style={{ padding: 9, borderRadius: 6, background: "#c98a2e10", border: "1px solid #c98a2e25", color: "#c98a2e", fontSize: 10, marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "var(--m)" }}><span>{warn}</span><button onClick={function() { setWarn(null); }} style={{ background: "none", border: "none", color: "#c98a2e", cursor: "pointer", fontSize: 13 }}>{"×"}</button></div>)}
    {loading && (<div style={{ textAlign: "center", padding: 36 }}><div style={{ width: 22, height: 22, border: "2px solid var(--bd)", borderTop: "2px solid var(--ac)", borderRadius: "50%", animation: "auditSpin .8s linear infinite", margin: "0 auto 10px" }} /><div style={{ fontSize: 10, color: "var(--t3)", fontFamily: "var(--m)", animation: "auditPulse 1.4s infinite" }}>{phase}</div></div>)}
    {error && (<div style={{ padding: 12, borderRadius: 6, background: "#d4493b0C", border: "1px solid #d4493b25", color: "#d4493b", fontSize: 11, marginBottom: 14, fontFamily: "var(--m)" }}><strong>{"Error: "}</strong>{error}</div>)}

    {/* Results */}
    {result && !resultB && <Result data={result} t={t} />}
    {result && resultB && (
      <div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 12, alignItems: "start" }}>
          <div><div style={{ fontSize: 10, fontFamily: "var(--m)", color: "var(--ac)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10, textAlign: "center" }}>{"A"}</div><Result data={result} t={t} compact /></div>
          <div style={{ fontSize: 14, fontFamily: "var(--m)", color: "var(--t3)", opacity: .3, paddingTop: 40 }}>{t.vs}</div>
          <div><div style={{ fontSize: 10, fontFamily: "var(--m)", color: "var(--ac)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10, textAlign: "center" }}>{"B"}</div><Result data={resultB} t={t} compact /></div>
        </div>
        <p style={{ fontSize: 9, color: "var(--t3)", opacity: .4, marginTop: 16, fontStyle: "italic", textAlign: "center", fontFamily: "var(--m)" }}>{t.disclaimer}</p>
      </div>
    )}

    {/* History */}
    {history.length > 0 && (<div style={{ marginTop: 36, borderTop: "1px solid var(--bd)", paddingTop: 18 }}>
      <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: 2, color: "var(--t3)", marginBottom: 10, fontFamily: "var(--m)" }}>{t.history + " (" + history.length + ")"}</div>
      {history.map(function(h, i) { return (<button key={i} onClick={function() { setResult(h.data); setResultB(null); }} style={{ display: "flex", justifyContent: "space-between", width: "100%", padding: "7px 10px", marginBottom: 2, borderRadius: 4, border: "1px solid var(--bd)", background: "transparent", cursor: "pointer", color: "var(--t2)", fontSize: 10, textAlign: "left" }}>
        <span style={{ display: "flex", gap: 6, flex: 1, overflow: "hidden" }}>{h.hasFiles && <span style={{ opacity: .4 }}>{"◰"}</span>}<span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{h.label}</span><Tag>{h.modeLabel}</Tag></span>
        <span style={{ fontFamily: "var(--m)", fontSize: 8, opacity: .3, marginLeft: 6 }}>{h.time}</span>
      </button>); })}
    </div>)}

    <div style={{ marginTop: 40, paddingTop: 14, borderTop: "1px solid var(--bd)", textAlign: "center" }}>
      <p style={{ fontSize: 8, color: "var(--t3)", opacity: .3, margin: 0, fontFamily: "var(--m)" }}>{t.footer}</p>
      <p style={{ fontSize: 8, color: "var(--t3)", opacity: .2, margin: "3px 0 0", fontFamily: "var(--m)", fontStyle: "italic" }}>{t.dedication}</p>
    </div>
  </div>);
}
