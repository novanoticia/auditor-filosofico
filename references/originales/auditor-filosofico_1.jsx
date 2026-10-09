import { useState, useRef, useEffect, useCallback } from "react";

/* ═══════════════════════════════════════════ i18n ═══════════════════════════════════════════ */

var T = {
  es: {
    header_sub: "Auditor Epistémico v6 · Modo Filosófico · 7 Tradiciones",
    title: "Auditor Filosófico",
    desc: "Evalúa solidez argumentativa, detecta errores filosóficos, analiza por capas.",
    solidez: "Solidez", tipo_texto: "Tipo de texto", sup_meta: "Supuestos metafilosóficos",
    propositions: "Proposiciones", assumptions: "Supuestos implícitos",
    chain: "Cadena inferencial", biases: "Errores detectados", evidence: "Balance de evidencia",
    ev_for: "A favor", ev_against: "En contra", ev_missing: "Ausente",
    questions: "Preguntas socráticas", verdict: "Veredicto", recommendation: "Recomendación",
    metacog: "Autocrítica del auditor", missing: "Lo que falta",
    disclaimer: "Análisis asistido por IA — requiere revisión y criterio humano.",
    attach: "Adjuntar", audit_btn: "Auditar", history: "Historial",
    placeholder: "Pega aquí el texto filosófico, argumento o ensayo a auditar…",
    drop: "Suelta para adjuntar", copy_md: "Copiar MD", copied: "¡Copiado!",
    truncated: "Respuesta truncada.", bin_fallback: "PDF/imagen no enviados. Solo texto.",
    footer: "Auditor Filosófico v1 · Claude Sonnet · Marco: Auditor Epistémico v6",
    dedication: "Dedicado al Dr. Francisco José García Carbonell",
    depth_quick: "Rápido", depth_std: "Estándar", depth_deep: "Profundo", depth_label: "Profundidad",
    saved: "Guardado", load: "Cargar", save: "Guardar", clear_saved: "Borrar", no_saved: "Sin auditorías",
    saved_audits: "Auditorías guardadas", save_current: "Guardar auditoría",
    traditions: { auto: "Auto", analytic: "Analítica", continental: "Continental", phenom: "Fenomenológica", genealogical: "Genealógica", dialectical: "Dialéctica", pragmatist: "Pragmatista", essay: "Ensayo libre" },
    trad_desc: { auto: "Autodetectar tradición", analytic: "Validez formal y claridad", continental: "Interpretación y sentido", phenom: "Estructuras de experiencia", genealogical: "Poder y contingencia", dialectical: "Contradicciones internas", pragmatist: "Consecuencias prácticas", essay: "Reflexión libre" },
    sol_solido: "Sólido", sol_plausible: "Plausible", sol_dependiente: "Dependiente", sol_fallido: "Fallido", sol_indeterminado: "Indeterminado",
    lang_instruction: "Responde en español.",
    ios_warn: "La API no funciona en la app iOS de Claude. Abre este artefacto en Safari (compártelo como enlace público) para usar la auditoría.",
    layers: "Evaluación por capas",
    lay_conceptual: "Conceptual", lay_inferencial: "Inferencial", lay_dialectica: "Dialéctica",
    lay_hermeneutica: "Hermenéutica", lay_normativa: "Normativa", lay_retorica: "Retórico-performativa",
  },
  en: {
    header_sub: "Epistemic Auditor v6 · Philosophical Mode · 7 Traditions",
    title: "Philosophical Auditor",
    desc: "Evaluate argumentative soundness, detect philosophical errors, layer analysis.",
    solidez: "Soundness", tipo_texto: "Text type", sup_meta: "Metaphilosophical assumptions",
    propositions: "Propositions", assumptions: "Implicit assumptions",
    chain: "Inferential chain", biases: "Errors detected", evidence: "Evidence balance",
    ev_for: "For", ev_against: "Against", ev_missing: "Missing",
    questions: "Socratic questions", verdict: "Verdict", recommendation: "Recommendation",
    metacog: "Auditor self-critique", missing: "What's missing",
    disclaimer: "AI-assisted analysis — requires human review.",
    attach: "Attach", audit_btn: "Audit", history: "History",
    placeholder: "Paste philosophical text, argument, or essay to audit…",
    drop: "Drop to attach", copy_md: "Copy MD", copied: "Copied!",
    truncated: "Truncated response.", bin_fallback: "PDF/image not sent. Text only.",
    footer: "Philosophical Auditor v1 · Claude Sonnet · Framework: Epistemic Auditor v6",
    dedication: "Dedicated to Dr. Francisco José García Carbonell",
    depth_quick: "Quick", depth_std: "Standard", depth_deep: "Deep", depth_label: "Depth",
    saved: "Saved", load: "Load", save: "Save", clear_saved: "Clear", no_saved: "No saved audits",
    saved_audits: "Saved audits", save_current: "Save audit",
    traditions: { auto: "Auto", analytic: "Analytic", continental: "Continental", phenom: "Phenomenological", genealogical: "Genealogical", dialectical: "Dialectical", pragmatist: "Pragmatist", essay: "Free essay" },
    trad_desc: { auto: "Auto-detect tradition", analytic: "Formal validity & clarity", continental: "Interpretation & meaning", phenom: "Experience structures", genealogical: "Power & contingency", dialectical: "Internal contradictions", pragmatist: "Practical consequences", essay: "Free reflection" },
    sol_solido: "Sound", sol_plausible: "Plausible", sol_dependiente: "Dependent", sol_fallido: "Failed", sol_indeterminado: "Indeterminate",
    lang_instruction: "Respond in English.",
    ios_warn: "The API does not work in the Claude iOS app. Open this artifact in Safari (share as public link) to use the audit.",
    layers: "Layer evaluation",
    lay_conceptual: "Conceptual", lay_inferencial: "Inferential", lay_dialectica: "Dialectical",
    lay_hermeneutica: "Hermeneutic", lay_normativa: "Normative", lay_retorica: "Rhetorical-performative",
  },
};

/* ═══════════════════════════════════════════ SYSTEM PROMPT ════════════════════════════════ */

var SYS_BASE = "Eres un Auditor Filosófico especializado. Base: Auditor Epistémico v6 + extensión filosófica con 7 tradiciones y 19 errores filosóficos.\n\nProtocolo: Clasifica tradición → estructura argumentativa → evalúa por 6 capas → solidez → errores → lo que falta → preguntas socráticas → veredicto → autocrítica.\n\nCapas: Conceptual, Inferencial, Dialéctica, Hermenéutica, Normativa, Retórico-performativa.\nSolidez: SOLIDO/PLAUSIBLE/DEPENDIENTE/FALLIDO/INDETERMINADO.\n\nCriterios por tradición:\n- Analítica: peso conceptual+inferencial, exigir claridad formal.\n- Continental: no penalizar metáforas ni ausencia formal. Sí penalizar oscuridad vacía.\n- Fenomenológica: coherencia descriptiva, no pretensión empírica.\n- Genealógica: rigor histórico.\n- Dialéctica: contradicciones genuinas.\n- Pragmatista: consecuencias reales.\n\n";

var DEPTH_CFG = {
  quick: { tokens: 2048, inst: "Sé MUY breve: 1 frase por campo, max 2 elementos por array.\n" },
  standard: { tokens: 8192, inst: "Sé analítico: hasta 3 frases por campo, max 5 elementos por array.\n" },
  deep: { tokens: 8192, inst: "Sé exhaustivo: desarrolla cada campo, compara con tradiciones rivales, max 6 elementos.\n" },
};

var JSON_SCHEMA = 'Responde SOLO con JSON válido, sin texto antes ni después, sin markdown fences.\nEsquema: {"r":"resumen","tt":"tipo de texto y tradición","sm":"supuestos metafilosóficos","sol":"SOLIDO|PLAUSIBLE|DEPENDIENTE|FALLIDO|INDETERMINADO","ne":"nivel epistémico breve","capas":{"conceptual":"...","inferencial":"...","dialectica":"...","hermeneutica":"...","normativa":"...","retorica":"..."},"p":[{"t":"proposición","tp":"tipo","e":"estado:solido|debil|fallido|indeterminado","f":"falsable por"}],"si":["supuesto implícito"],"ci":[{"n":"1","de":"premisa","a":"conclusión","fu":"FUERTE|MEDIA|DEBIL","pr":"problema o null"}],"sg":[{"s":"nombre error","sv":"ALTA|MEDIA|BAJA","ex":"explicación","dl":"¿deliberado? sí/no/posible"}],"ev":{"af":["a favor"],"ec":["en contra"],"au":["ausente"]},"falta":["lo que falta"],"pq":["pregunta socrática"],"v":"veredicto","rc":"recomendación","mc":"autocrítica del auditor"}';

var TRAD_INST = {
  auto: "Detecta automáticamente la tradición filosófica del texto antes de auditar.",
  analytic: "El texto es de tradición ANALÍTICA. Peso máximo en capas conceptual e inferencial. Exige claridad terminológica y validez formal.",
  continental: "El texto es de tradición CONTINENTAL/HERMENÉUTICA. No penalices ausencia de argumentos formales ni metáforas como vehículo. Sí penaliza oscuridad vacía e inmunización por complejidad.",
  phenom: "El texto es FENOMENOLÓGICO. Evalúa coherencia de la descripción fenomenológica, no pretensión empírica. Penaliza si abandona la epoché sin señalarlo.",
  genealogical: "El texto es GENEALÓGICO/CRÍTICO. Evalúa rigor histórico. Penaliza generalización sin evidencia concreta.",
  dialectical: "El texto es DIALÉCTICO. Evalúa si las contradicciones son genuinas o forzadas. Penaliza síntesis como deus ex machina.",
  pragmatist: "El texto es PRAGMATISTA. Evalúa si las consecuencias invocadas son reales o hipotéticas. Penaliza circularidad funciona/verdadero.",
  essay: "El texto es un ENSAYO FILOSÓFICO LIBRE, no adscrito a una tradición. Evalúa con criterios generales.",
};

var TRADS = [
  { id: "auto", icon: "◎" }, { id: "analytic", icon: "△" }, { id: "continental", icon: "◈" },
  { id: "phenom", icon: "◉" }, { id: "genealogical", icon: "⟐" }, { id: "dialectical", icon: "⟺" },
  { id: "pragmatist", icon: "⟁" }, { id: "essay", icon: "∿" },
];

var SOL_C = { SOLIDO: "#4a9e6b", PLAUSIBLE: "#6a9fb5", DEPENDIENTE: "#c98a2e", FALLIDO: "#d4493b", INDETERMINADO: "#7a7f8a" };
var SOL_I = { SOLIDO: "●", PLAUSIBLE: "◐", DEPENDIENTE: "◑", FALLIDO: "○", INDETERMINADO: "◌" };
var SEV_C = { ALTA: "#d4493b", MEDIA: "#c98a2e", BAJA: "#4a9e6b" };
var STR_C = { FUERTE: "#4a9e6b", MEDIA: "#c98a2e", DEBIL: "#d4493b" };
var EST_C = { solido: "#4a9e6b", debil: "#c98a2e", fallido: "#d4493b", indeterminado: "#7a7f8a" };
var EST_I = { solido: "●", debil: "◐", fallido: "○", indeterminado: "◌" };

/* ═══════════════════════════════════════════ UTILS ════════════════════════════════════════ */

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
    resumen: d.r || d.resumen || "",
    tipo_texto: d.tt || d.tipo_texto || "",
    sup_meta: d.sm || d.supuestos_meta || "",
    solidez: d.sol || d.solidez || "",
    nivel_epistemico: d.ne || d.nivel_epistemico || "",
    capas: d.capas || {},
    proposiciones: (d.p || d.proposiciones || []).map(function(x) { return { texto: x.t || x.texto || "", tipo: x.tp || x.tipo || "", estado: x.e || x.estado || "", falsable_por: x.f || x.falsable_por || "" }; }),
    supuestos: d.si || d.supuestos_implicitos || [],
    cadena: (d.ci || d.cadena_inferencial || []).map(function(x) { return { paso: x.n || x.paso || "", de: x.de || "", a: x.a || "", fuerza: x.fu || x.fuerza || "", problema: x.pr || x.problema || "" }; }),
    sesgos: (d.sg || d.sesgos_detectados || []).map(function(x) { return { sesgo: x.s || x.sesgo || "", severidad: x.sv || x.severidad || "", explicacion: x.ex || x.explicacion || "", deliberado: x.dl || x.deliberado || "" }; }),
    evidencia: { a_favor: (d.ev && d.ev.af) || [], en_contra: (d.ev && d.ev.ec) || [], ausente: (d.ev && d.ev.au) || [] },
    falta: d.falta || [],
    preguntas: d.pq || d.preguntas || [],
    veredicto: d.v || d.veredicto || "",
    recomendacion: d.rc || d.recomendacion || "",
    metacognicion: d.mc || d.metacognicion || "",
  };
}

function toMarkdown(raw, t) {
  var d = normalize(raw); if (!d) return "";
  var L = ["# " + t.title, ""];
  L.push("**" + t.solidez + ":** " + (SOL_I[d.solidez] || "◌") + " " + d.solidez);
  L.push("", d.resumen, "");
  if (d.tipo_texto) L.push("**" + t.tipo_texto + ":** " + d.tipo_texto, "");
  if (d.sup_meta) L.push("**" + t.sup_meta + ":** " + d.sup_meta, "");
  if (d.capas) { L.push("## " + t.layers); Object.keys(d.capas).forEach(function(k) { if (d.capas[k]) L.push("**" + k + ":** " + d.capas[k]); }); L.push(""); }
  if (d.proposiciones.length) { L.push("## " + t.propositions); d.proposiciones.forEach(function(p) { L.push("- " + (EST_I[p.estado] || "◌") + " " + p.texto + " [" + p.tipo + "] " + (p.falsable_por ? "— " + p.falsable_por : "")); }); L.push(""); }
  if (d.sesgos.length) { L.push("## " + t.biases); d.sesgos.forEach(function(s) { L.push("- **" + s.sesgo + "** [" + s.severidad + "] " + s.explicacion + (s.deliberado ? " (¿Deliberado? " + s.deliberado + ")" : "")); }); L.push(""); }
  if (d.falta.length) { L.push("## " + t.missing); d.falta.forEach(function(f) { L.push("- " + f); }); L.push(""); }
  if (d.preguntas.length) { L.push("## " + t.questions); d.preguntas.forEach(function(q, i) { L.push((i + 1) + ". " + q); }); L.push(""); }
  L.push("## " + t.verdict, d.veredicto, "");
  if (d.recomendacion) L.push("## " + t.recommendation, d.recomendacion, "");
  if (d.metacognicion) L.push("## " + t.metacog, "_" + d.metacognicion + "_", "");
  L.push("---", "_" + t.disclaimer + "_"); return L.join("\n");
}

function copyText(txt) { var ta = document.createElement("textarea"); ta.value = txt; ta.style.cssText = "position:fixed;left:-9999px"; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta); }

/* ═══════════════════════════════════════════ COMPONENTS ═══════════════════════════════════ */

function Tag({ children, color }) { color = color || "var(--ac)"; return (<span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 3, fontSize: 10, fontFamily: "var(--m)", fontWeight: 600, letterSpacing: .6, textTransform: "uppercase", background: color + "18", color: color, border: "1px solid " + color + "30" }}>{children}</span>); }

function Fold({ title, icon, children, open: init }) {
  var _o = useState(init !== false), open = _o[0], setOpen = _o[1];
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
  var ex = "." + (file.name || "").split(".").pop().toLowerCase();
  var ic = { ".pdf": "◰", ".png": "◳", ".jpg": "◳", ".txt": "◱", ".md": "◱", ".csv": "◲" };
  return (<div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 4, background: "var(--bg3)", border: "1px solid var(--bd)", fontSize: 11, color: "var(--t2)", maxWidth: 200, fontFamily: "var(--m)" }}>
    <span style={{ opacity: .5 }}>{ic[ex] || "◎"}</span><span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>{file.name}</span>
    <button onClick={onRemove} style={{ background: "none", border: "none", cursor: "pointer", color: "#d4493b", fontSize: 13, padding: 0, opacity: .6 }}>{"×"}</button>
  </div>);
}

/* ═══════════════════════════════════════════ RESULT ═══════════════════════════════════════ */

function Result({ data: raw, t }) {
  var data = normalize(raw); if (!data) return null;
  var solC = SOL_C[data.solidez] || "var(--ac)";
  var _cp = useState(null), cp = _cp[0], setCp = _cp[1];
  function handleCopy() { copyText(toMarkdown(raw, t)); setCp(t.copied); setTimeout(function() { setCp(null); }, 1500); }

  var layerKeys = ["conceptual", "inferencial", "dialectica", "hermeneutica", "normativa", "retorica"];
  var layerLabels = { conceptual: t.lay_conceptual, inferencial: t.lay_inferencial, dialectica: t.lay_dialectica, hermeneutica: t.lay_hermeneutica, normativa: t.lay_normativa, retorica: t.lay_retorica };

  return (<div style={{ animation: "auditIn .5s ease" }}>
    {/* Summary */}
    <div style={{ padding: 20, background: "var(--bg2)", borderRadius: 8, border: "1px solid var(--bd)", marginBottom: 16, borderLeft: "3px solid " + solC }}>
      <p style={{ fontSize: 15, color: "var(--t1)", lineHeight: 1.7, margin: 0, fontFamily: "var(--b)" }}>{data.resumen}</p>
      <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap", alignItems: "center" }}>
        <Tag color={solC}>{(SOL_I[data.solidez] || "◌") + " " + (data.solidez || "").replace(/_/g, " ")}</Tag>
        {data.nivel_epistemico && <Tag>{data.nivel_epistemico}</Tag>}
      </div>
    </div>
    {/* Tipo de texto */}
    {data.tipo_texto && (<div style={{ padding: 12, background: "var(--bg2)", borderRadius: 6, marginBottom: 12, border: "1px solid var(--bd)" }}>
      <span style={{ fontSize: 10, fontFamily: "var(--m)", color: "var(--ac)", textTransform: "uppercase", letterSpacing: 1, marginRight: 8 }}>{t.tipo_texto}</span>
      <span style={{ fontSize: 13, color: "var(--t1)" }}>{data.tipo_texto}</span>
    </div>)}
    {/* Supuestos meta */}
    {data.sup_meta && (<div style={{ padding: 12, background: "var(--bg2)", borderRadius: 6, marginBottom: 12, border: "1px solid var(--bd)" }}>
      <div style={{ fontSize: 10, fontFamily: "var(--m)", color: "var(--ac)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{t.sup_meta}</div>
      <p style={{ fontSize: 12, color: "var(--t2)", margin: 0, lineHeight: 1.65 }}>{data.sup_meta}</p>
    </div>)}
    {/* Layers */}
    {data.capas && Object.keys(data.capas).length > 0 && (<Fold title={t.layers} icon="⦿">
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {layerKeys.map(function(k) { if (!data.capas[k]) return null; return (<div key={k} style={{ padding: 10, background: "var(--bg2)", borderRadius: 6, borderLeft: "3px solid var(--ac)" }}>
          <div style={{ fontSize: 10, fontFamily: "var(--m)", color: "var(--ac)", textTransform: "uppercase", letterSpacing: .8, marginBottom: 4 }}>{layerLabels[k] || k}</div>
          <p style={{ fontSize: 12, color: "var(--t2)", margin: 0, lineHeight: 1.65 }}>{data.capas[k]}</p>
        </div>); })}
      </div>
    </Fold>)}
    {/* Propositions */}
    {data.proposiciones.length > 0 && (<Fold title={t.propositions} icon="◎">
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{data.proposiciones.map(function(p, i) { return (<div key={i} style={{ padding: 10, background: "var(--bg2)", borderRadius: 6, borderLeft: "3px solid " + (EST_C[p.estado] || "#7a7f8a") }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 6, marginBottom: 3 }}>
          <span style={{ fontSize: 12, color: "var(--t1)", lineHeight: 1.6, flex: 1 }}><span style={{ color: EST_C[p.estado], marginRight: 5 }}>{EST_I[p.estado] || "◌"}</span>{p.texto}</span>
          <div style={{ display: "flex", gap: 3, flexShrink: 0 }}><Tag color={EST_C[p.estado] || "#7a7f8a"}>{p.estado}</Tag>{p.tipo && <Tag>{p.tipo}</Tag>}</div>
        </div>
        {p.falsable_por && <div style={{ fontSize: 10, color: "var(--t3)", fontStyle: "italic", marginTop: 3 }}>{p.falsable_por}</div>}
      </div>); })}</div>
    </Fold>)}
    {/* Assumptions */}
    {data.supuestos.length > 0 && (<Fold title={t.assumptions} icon="◌"><ul style={{ margin: 0, paddingLeft: 16 }}>{data.supuestos.map(function(s, i) { return <li key={i} style={{ fontSize: 12, color: "var(--t2)", lineHeight: 1.7, marginBottom: 3 }}>{s}</li>; })}</ul></Fold>)}
    {/* Chain */}
    {data.cadena.length > 0 && (<Fold title={t.chain} icon="⟁">
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>{data.cadena.map(function(p, i) { return (<div key={i} style={{ display: "flex", gap: 10, fontSize: 12, color: "var(--t2)", padding: "6px 0", borderBottom: i < data.cadena.length - 1 ? "1px solid var(--bd)" : "none" }}>
        <span style={{ fontFamily: "var(--m)", color: STR_C[p.fuerza] || "#7a7f8a", minWidth: 20, textAlign: "center", fontSize: 11, fontWeight: 700 }}>{p.paso}</span>
        <div style={{ flex: 1 }}><div><span style={{ opacity: .55 }}>{p.de}</span><span style={{ margin: "0 6px", opacity: .25, fontFamily: "var(--m)" }}>{"→"}</span><span style={{ fontWeight: 500 }}>{p.a}</span></div>
          <div style={{ display: "flex", gap: 6, marginTop: 4, flexWrap: "wrap" }}><Tag color={STR_C[p.fuerza] || "#7a7f8a"}>{p.fuerza}</Tag>{p.problema && p.problema !== "null" && <span style={{ fontSize: 10, color: "#d4493b", fontStyle: "italic" }}>{"⚠ " + p.problema}</span>}</div></div>
      </div>); })}</div>
    </Fold>)}
    {/* Errors */}
    {data.sesgos.length > 0 && (<Fold title={t.biases + " (" + data.sesgos.length + ")"} icon="⊘">
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{data.sesgos.map(function(s, i) { return (<div key={i} style={{ padding: 12, background: "var(--bg2)", borderRadius: 6, borderLeft: "3px solid " + (SEV_C[s.severidad] || "#7a7f8a") }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
          <span style={{ fontWeight: 600, fontSize: 12, color: "var(--t1)", fontFamily: "var(--h)" }}>{s.sesgo}</span>
          <div style={{ display: "flex", gap: 5 }}><Tag color={SEV_C[s.severidad] || "#7a7f8a"}>{s.severidad}</Tag></div>
        </div>
        <p style={{ fontSize: 11, color: "var(--t2)", margin: 0, lineHeight: 1.6 }}>{s.explicacion}</p>
        {s.deliberado && <p style={{ fontSize: 10, color: "var(--t3)", margin: "4px 0 0", fontStyle: "italic" }}>{"¿Deliberado? " + s.deliberado}</p>}
      </div>); })}</div>
    </Fold>)}
    {/* Evidence */}
    {data.evidencia && (<Fold title={t.evidence} icon="⚖">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 8 }}>
        {[{ key: "a_favor", label: t.ev_for, c: "#4a9e6b" }, { key: "en_contra", label: t.ev_against, c: "#d4493b" }, { key: "ausente", label: t.ev_missing, c: "#8e6aad" }].map(function(ev) { return (<div key={ev.key} style={{ padding: 10, borderRadius: 6, background: ev.c + "0C", border: "1px solid " + ev.c + "20" }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: ev.c, marginBottom: 6, textTransform: "uppercase", fontFamily: "var(--m)" }}>{ev.label}</div>
          <ul style={{ margin: 0, paddingLeft: 12, fontSize: 11, color: "var(--t2)", lineHeight: 1.7 }}>{(data.evidencia[ev.key] || []).map(function(e, i) { return <li key={i}>{e}</li>; })}</ul>
        </div>); })}
      </div>
    </Fold>)}
    {/* What's missing */}
    {data.falta && data.falta.length > 0 && (<Fold title={t.missing} icon="◇"><ul style={{ margin: 0, paddingLeft: 16 }}>{data.falta.map(function(f, i) { return <li key={i} style={{ fontSize: 12, color: "var(--t2)", lineHeight: 1.7, marginBottom: 3 }}>{f}</li>; })}</ul></Fold>)}
    {/* Questions */}
    {data.preguntas.length > 0 && (<Fold title={t.questions} icon="?"><ol style={{ margin: 0, paddingLeft: 16 }}>{data.preguntas.map(function(q, i) { return <li key={i} style={{ fontSize: 12, color: "var(--t2)", lineHeight: 1.7, marginBottom: 3 }}>{q}</li>; })}</ol></Fold>)}
    {/* Verdict */}
    <div style={{ padding: 20, background: "var(--bg2)", borderRadius: 8, border: "1px solid var(--bd)", marginTop: 14 }}>
      <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: "var(--ac)", marginBottom: 8, fontFamily: "var(--m)" }}>{t.verdict}</div>
      <p style={{ fontSize: 14, color: "var(--t1)", lineHeight: 1.75, margin: 0, fontFamily: "var(--b)" }}>{data.veredicto}</p>
      {data.recomendacion && (<><div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: "var(--ac)", marginBottom: 8, marginTop: 14, fontFamily: "var(--m)" }}>{t.recommendation}</div><p style={{ fontSize: 12, color: "var(--t2)", lineHeight: 1.7, margin: 0 }}>{data.recomendacion}</p></>)}
    </div>
    {/* Metacognition */}
    {data.metacognicion && (<div style={{ marginTop: 14, padding: 14, borderRadius: 8, background: "var(--ac)" + "08", border: "1px dashed var(--ac)" + "30" }}>
      <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: "var(--ac)", marginBottom: 8, fontFamily: "var(--m)", opacity: .7 }}>{"◌ " + t.metacog}</div>
      <p style={{ fontSize: 11, color: "var(--t2)", margin: 0, lineHeight: 1.7, fontStyle: "italic" }}>{data.metacognicion}</p>
    </div>)}
    <div style={{ display: "flex", justifyContent: "center", marginTop: 14 }}>
      <button onClick={handleCopy} style={{ padding: "5px 14px", borderRadius: 4, border: "1px solid var(--bd)", background: "transparent", cursor: "pointer", fontSize: 10, color: cp ? "#4a9e6b" : "var(--t3)", fontFamily: "var(--m)" }}>{cp || ("◱ " + t.copy_md)}</button>
    </div>
    <p style={{ fontSize: 9, color: "var(--t3)", opacity: .4, marginTop: 14, fontStyle: "italic", textAlign: "center", fontFamily: "var(--m)" }}>{t.disclaimer}</p>
  </div>);
}

/* ═══════════════════════════════════════════ MAIN APP ═══════════════════════════════════════ */

export default function PhilosophicalAuditor() {
  var [input, setInput] = useState("");
  var [tradition, setTradition] = useState("auto");
  var [lang, setLang] = useState("es");
  var [depth, setDepth] = useState("standard");
  var [loading, setLoading] = useState(false);
  var [result, setResult] = useState(null);
  var [error, setError] = useState(null);
  var [warn, setWarn] = useState(null);
  var [history, setHistory] = useState([]);
  var [savedAudits, setSavedAudits] = useState([]);
  var [showSaved, setShowSaved] = useState(false);
  var [files, setFiles] = useState([]);
  var [drag, setDrag] = useState(false);
  var [phase, setPhase] = useState("");
  var [iosWarn, setIosWarn] = useState(false);
  var fileRef = useRef(null);
  var t = T[lang] || T.es;

  useEffect(function() {
    var el = document.createElement("style");
    el.textContent = "@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Source+Sans+3:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');:root{--bg1:#0d0c0a;--bg2:#141210;--bg3:#1c1a16;--t1:#d0c8b8;--t2:#8a8070;--t3:#5a5448;--ac:#c8a55a;--bd:#28251e;--h:'EB Garamond',Georgia,serif;--b:'Source Sans 3','Source Sans Pro',sans-serif;--m:'IBM Plex Mono',monospace}@media(prefers-color-scheme:light){:root{--bg1:#f5f1e8;--bg2:#ece7dc;--bg3:#e0dbd0;--t1:#1c1a14;--t2:#5a5448;--t3:#8a8070;--ac:#9a7a2a;--bd:#d0c8b8}}@keyframes auditIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}@keyframes auditSpin{from{transform:rotate(0)}to{transform:rotate(360deg)}}@keyframes auditPulse{0%,100%{opacity:.3}50%{opacity:.9}}*{box-sizing:border-box}textarea:focus,button:focus-visible{outline:1.5px solid var(--ac);outline-offset:2px}::selection{background:var(--ac);color:#fff}";
    document.head.appendChild(el);
    // Detect iOS Claude app
    var ua = navigator.userAgent || "";
    if (/iPhone|iPad/.test(ua) && !/Safari/.test(ua)) setIosWarn(true);
    return function() { document.head.removeChild(el); };
  }, []);

  useEffect(function() {
    try { window.storage.get("phil-audits-saved").then(function(r) { if (r && r.value) setSavedAudits(JSON.parse(r.value)); }).catch(function() {}); } catch (_) {}
  }, []);

  function saveAudit() {
    if (!result) return;
    var entry = { label: input.trim().slice(0, 60) || "audit", tradition: tradition, date: new Date().toLocaleDateString(), data: result };
    var next = [entry].concat(savedAudits).slice(0, 30);
    setSavedAudits(next);
    try { window.storage.set("phil-audits-saved", JSON.stringify(next)); } catch (_) {}
  }
  function loadAudit(a) { setResult(a.data); setShowSaved(false); }
  function clearSaved() { setSavedAudits([]); try { window.storage.delete("phil-audits-saved"); } catch (_) {} }

  function readText(f) { return new Promise(function(r, j) { var x = new FileReader(); x.onload = function() { r(x.result); }; x.onerror = j; x.readAsText(f); }); }
  function readB64(f) { return new Promise(function(r, j) { var x = new FileReader(); x.onload = function() { r(x.result.split(",")[1]); }; x.onerror = j; x.readAsDataURL(f); }); }
  var FT = { ".txt": { k: "text", m: "text/plain", mb: .5 }, ".md": { k: "text", m: "text/markdown", mb: .5 }, ".csv": { k: "text", m: "text/csv", mb: 1 }, ".pdf": { k: "pdf", m: "application/pdf", mb: 4.5 }, ".png": { k: "image", m: "image/png", mb: 3 }, ".jpg": { k: "image", m: "image/jpeg", mb: 3 }, ".jpeg": { k: "image", m: "image/jpeg", mb: 3 } };
  function ext(n) { return "." + (n || "").split(".").pop().toLowerCase(); }

  var addFiles = useCallback(function(list) { var ok = []; for (var i = 0; i < list.length; i++) { var f = list[i]; var ft = FT[ext(f.name)]; if (ft && f.size / 1048576 <= ft.mb) ok.push(f); } if (ok.length) setFiles(function(p) { return p.concat(ok).slice(0, 5); }); }, []);
  var onDragOver = useCallback(function(e) { e.preventDefault(); setDrag(true); }, []);
  var onDragLeave = useCallback(function(e) { e.preventDefault(); setDrag(false); }, []);
  var onDrop = useCallback(function(e) { e.preventDefault(); setDrag(false); if (e.dataTransfer.files) addFiles(Array.from(e.dataTransfer.files)); }, [addFiles]);

  async function apiCall(msg) {
    try {
      var cfg = DEPTH_CFG[depth] || DEPTH_CFG.standard;
      var body = { model: "claude-sonnet-4-20250514", max_tokens: cfg.tokens, messages: [{ role: "user", content: msg }] };
      var r;
      try {
        r = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      } catch (fetchErr) { return { error: "Red: " + (fetchErr.message || "fetch failed") }; }
      var rawBody = "";
      try { rawBody = await r.text(); } catch (readErr) { return { error: "No se pudo leer la respuesta (" + r.status + ")" }; }
      if (!rawBody || !rawBody.trim()) return { error: "Respuesta vacía (HTTP " + r.status + ")" };
      var d;
      try { d = JSON.parse(rawBody); } catch (parseErr) { return { error: "Respuesta no-JSON (HTTP " + r.status + "): " + rawBody.slice(0, 100) }; }
      if (!r.ok) { return { error: (d && d.error && d.error.message) || "HTTP " + r.status }; }
      if (!d || !d.content || !Array.isArray(d.content)) return { error: "Formato inesperado" };
      var txt = "";
      for (var i = 0; i < d.content.length; i++) { if (d.content[i] && d.content[i].type === "text" && d.content[i].text) txt += d.content[i].text; }
      return txt.trim() ? { text: txt, truncated: d.stop_reason === "max_tokens" } : { error: "Respuesta sin texto" };
    } catch (e) { return { error: "Error: " + (e.message || String(e)) }; }
  }

  function buildSysMsg() { var cfg = DEPTH_CFG[depth] || DEPTH_CFG.standard; return SYS_BASE + cfg.inst + t.lang_instruction + "\n\n" + JSON_SCHEMA; }

  async function run() {
    if (!input.trim() && !files.length) return;
    setLoading(true); setError(null); setWarn(null); setResult(null); setPhase("…");
    try {
      var sys = buildSysMsg();
      var textChunks = []; var bins = []; var hasBin = false;
      for (var i = 0; i < files.length; i++) {
        var f = files[i]; var ft = FT[ext(f.name)]; if (!ft) continue;
        if (ft.k === "text") { try { var tx = await readText(f); textChunks.push("[" + f.name + "]\n" + (tx.length > 30000 ? tx.slice(0, 30000) : tx)); } catch (_) {} }
        else if (ft.k === "image") { try { bins.push({ type: "image", source: { type: "base64", media_type: ft.m, data: await readB64(f) } }); hasBin = true; } catch (_) {} }
        else if (ft.k === "pdf") { try { bins.push({ type: "document", source: { type: "base64", media_type: "application/pdf", data: await readB64(f) } }); hasBin = true; } catch (_) {} }
      }
      setPhase("⦿");
      var tradInst = TRAD_INST[tradition] || TRAD_INST.auto;
      var userI = input.trim() ? tradInst + "\n\n" + input : tradInst + "\n\nAnaliza el contenido.";
      var tp = sys + "\n\n---\n\n" + (textChunks.length ? textChunks.join("\n---\n") + "\n---\n" : "") + userI;
      var msg = hasBin ? bins.concat([{ type: "text", text: tp }]) : tp;
      var rStd = await apiCall(msg);
      if (rStd.error && hasBin) { setPhase("↻"); rStd = await apiCall(tp); if (!rStd.error) setWarn(t.bin_fallback); }
      if (rStd.error) throw new Error(rStd.error);
      setResult(parseJSON(rStd.text));
      if (rStd.truncated) setWarn(t.truncated);
      var lb = input.trim() ? input.slice(0, 50) : files.length ? files[0].name : "audit";
      setHistory(function(p) { return [{ label: lb, modeLabel: t.traditions[tradition], time: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }), data: result, hasFiles: files.length > 0 }].concat(p.slice(0, 19)); });
    } catch (e) { console.error(e); setError(e.message); }
    finally { setLoading(false); setPhase(""); }
  }

  var hasInput = input.trim() || files.length > 0;
  var depthLabels = { quick: t.depth_quick, standard: t.depth_std, deep: t.depth_deep };

  return (<div style={{ minHeight: "100vh", background: "var(--bg1)", color: "var(--t1)", fontFamily: "var(--b)", padding: "24px 16px", maxWidth: 760, margin: "0 auto" }}>

    {/* iOS warning */}
    {iosWarn && (<div style={{ padding: 12, borderRadius: 8, background: "#c98a2e15", border: "1px solid #c98a2e30", marginBottom: 16, fontSize: 11, color: "#c98a2e", lineHeight: 1.6 }}>{t.ios_warn}</div>)}

    {/* Top bar */}
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
      <div style={{ display: "flex", gap: 2 }}>
        {["es", "en"].map(function(l) { return (<button key={l} onClick={function() { setLang(l); }} style={{ padding: "3px 10px", borderRadius: 3, border: lang === l ? "1px solid var(--ac)" : "1px solid var(--bd)", background: lang === l ? "var(--ac)15" : "transparent", color: lang === l ? "var(--ac)" : "var(--t3)", fontSize: 10, fontFamily: "var(--m)", fontWeight: 600, cursor: "pointer" }}>{l.toUpperCase()}</button>); })}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 9, fontFamily: "var(--m)", color: "var(--t3)", textTransform: "uppercase", letterSpacing: 1 }}>{t.depth_label}</span>
        {["quick", "standard", "deep"].map(function(d) { return (<button key={d} onClick={function() { setDepth(d); }} style={{ padding: "3px 10px", borderRadius: 3, border: depth === d ? "1px solid var(--ac)" : "1px solid var(--bd)", background: depth === d ? "var(--ac)15" : "transparent", color: depth === d ? "var(--ac)" : "var(--t3)", fontSize: 10, fontFamily: "var(--m)", fontWeight: 600, cursor: "pointer" }}>{depthLabels[d]}</button>); })}
      </div>
    </div>

    {/* Header */}
    <header style={{ marginBottom: 28, textAlign: "center" }}>
      <div style={{ fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: "var(--ac)", fontFamily: "var(--m)", marginBottom: 6, opacity: .6 }}>{t.header_sub}</div>
      <h1 style={{ fontSize: 30, fontWeight: 700, margin: 0, color: "var(--t1)", fontFamily: "var(--h)", fontStyle: "italic" }}>{t.title}</h1>
      <p style={{ fontSize: 12, color: "var(--t3)", marginTop: 6, fontFamily: "var(--b)", maxWidth: 440, marginLeft: "auto", marginRight: "auto" }}>{t.desc}</p>
    </header>

    {/* Traditions — 4 columns */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, marginBottom: 18 }}>
      {TRADS.map(function(tr) { var sel = tradition === tr.id; return (<button key={tr.id} onClick={function() { setTradition(tr.id); }} title={t.trad_desc[tr.id]} style={{ padding: "7px 6px", borderRadius: 6, border: sel ? "1.5px solid var(--ac)" : "1px solid var(--bd)", background: sel ? "var(--ac)12" : "transparent", cursor: "pointer", textAlign: "center", color: sel ? "var(--ac)" : "var(--t3)" }}>
        <div style={{ fontSize: 15, fontFamily: "var(--m)", lineHeight: 1 }}>{tr.icon}</div>
        <div style={{ fontSize: 9, fontWeight: 600, fontFamily: "var(--m)", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.traditions[tr.id]}</div>
      </button>); })}
    </div>
    <div style={{ fontSize: 10, color: "var(--t3)", textAlign: "center", marginBottom: 14, fontFamily: "var(--m)", opacity: .5 }}>{t.trad_desc[tradition]}</div>

    {/* Input */}
    <div onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop} style={{ marginBottom: 10, borderRadius: 8, position: "relative", border: drag ? "2px dashed var(--ac)" : "1px solid var(--bd)", background: drag ? "var(--ac)08" : "var(--bg2)" }}>
      {drag && (<div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10, background: "var(--bg2)", borderRadius: 8, opacity: .95 }}><span style={{ fontFamily: "var(--m)", fontSize: 11, color: "var(--ac)" }}>{"⦿ " + t.drop}</span></div>)}
      <textarea value={input} onChange={function(e) { setInput(e.target.value); }} onKeyDown={function(e) { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) run(); }} placeholder={t.placeholder} rows={5} style={{ width: "100%", padding: 14, borderRadius: 8, border: "none", background: "transparent", color: "var(--t1)", fontSize: 13, fontFamily: "var(--b)", resize: "vertical", lineHeight: 1.7 }} />
      {files.length > 0 && (<div style={{ padding: "0 12px 10px", display: "flex", flexWrap: "wrap", gap: 4 }}>{files.map(function(f, i) { return <FileChip key={i} file={f} onRemove={function() { setFiles(function(p) { return p.filter(function(_, j) { return j !== i; }); }); }} />; })}</div>)}
    </div>

    {/* Controls */}
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <input ref={fileRef} type="file" multiple accept=".txt,.md,.csv,.pdf,.png,.jpg,.jpeg" style={{ display: "none" }} onChange={function(e) { if (e.target.files) addFiles(Array.from(e.target.files)); e.target.value = ""; }} />
        <button onClick={function() { if (fileRef.current) fileRef.current.click(); }} style={{ padding: "5px 11px", borderRadius: 4, border: "1px solid var(--bd)", background: "transparent", cursor: "pointer", fontSize: 10, color: "var(--t3)", fontFamily: "var(--m)" }}>{t.attach}</button>
        {result && (<button onClick={saveAudit} style={{ padding: "5px 11px", borderRadius: 4, border: "1px solid var(--bd)", background: "transparent", cursor: "pointer", fontSize: 10, color: "var(--t3)", fontFamily: "var(--m)" }}>{t.save}</button>)}
        {savedAudits.length > 0 && (<button onClick={function() { setShowSaved(!showSaved); }} style={{ padding: "5px 11px", borderRadius: 4, border: "1px solid var(--bd)", background: showSaved ? "var(--ac)15" : "transparent", cursor: "pointer", fontSize: 10, color: showSaved ? "var(--ac)" : "var(--t3)", fontFamily: "var(--m)" }}>{t.saved_audits + " (" + savedAudits.length + ")"}</button>)}
      </div>
      <button onClick={run} disabled={loading || !hasInput} style={{ padding: "7px 22px", borderRadius: 5, border: "none", background: (loading || !hasInput) ? "var(--bg3)" : "var(--ac)", color: (loading || !hasInput) ? "var(--t3)" : "var(--bg1)", cursor: (loading || !hasInput) ? "default" : "pointer", fontSize: 12, fontWeight: 600, fontFamily: "var(--m)", letterSpacing: .5, opacity: (loading || !hasInput) ? .5 : 1 }}>
        {loading ? phase : "⦿ " + t.audit_btn}
      </button>
    </div>

    {/* Saved */}
    {showSaved && (<div style={{ marginBottom: 16, padding: 14, borderRadius: 8, border: "1px solid var(--bd)", background: "var(--bg2)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ fontSize: 10, fontFamily: "var(--m)", color: "var(--t3)", textTransform: "uppercase" }}>{t.saved_audits}</span>
        <button onClick={clearSaved} style={{ fontSize: 9, fontFamily: "var(--m)", color: "#d4493b", background: "none", border: "none", cursor: "pointer" }}>{t.clear_saved}</button>
      </div>
      {savedAudits.map(function(a, i) { return (<button key={i} onClick={function() { loadAudit(a); }} style={{ display: "flex", width: "100%", padding: "6px 10px", marginBottom: 3, borderRadius: 4, border: "1px solid var(--bd)", background: "transparent", cursor: "pointer", textAlign: "left", color: "var(--t2)", fontSize: 11, alignItems: "center" }}>
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>{a.label}</span>
        <span style={{ fontFamily: "var(--m)", fontSize: 9, opacity: .4, marginLeft: 8 }}>{a.date}</span>
      </button>); })}
    </div>)}

    {/* Status */}
    {warn && (<div style={{ padding: 9, borderRadius: 6, background: "#c98a2e10", border: "1px solid #c98a2e25", color: "#c98a2e", fontSize: 11, marginBottom: 12 }}>{warn}</div>)}
    {loading && (<div style={{ textAlign: "center", padding: 36 }}><div style={{ width: 22, height: 22, border: "2px solid var(--bd)", borderTop: "2px solid var(--ac)", borderRadius: "50%", animation: "auditSpin .8s linear infinite", margin: "0 auto 12px" }} /><div style={{ fontSize: 11, color: "var(--t3)", animation: "auditPulse 1.5s infinite" }}>{phase}</div></div>)}
    {error && (<div style={{ padding: 12, borderRadius: 6, background: "#d4493b0C", border: "1px solid #d4493b25", color: "#d4493b", fontSize: 12, marginBottom: 14 }}>{error}</div>)}

    {/* Result */}
    {result && <Result data={result} t={t} />}

    {/* History */}
    {history.length > 0 && (<div style={{ marginTop: 36, borderTop: "1px solid var(--bd)", paddingTop: 16 }}>
      <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1.5, color: "var(--t3)", marginBottom: 10, fontFamily: "var(--m)" }}>{t.history + " (" + history.length + ")"}</div>
      {history.map(function(h, i) { return (<button key={i} onClick={function() { setResult(h.data); }} style={{ display: "flex", justifyContent: "space-between", width: "100%", padding: "6px 10px", marginBottom: 3, borderRadius: 4, border: "1px solid var(--bd)", background: "transparent", cursor: "pointer", textAlign: "left", color: "var(--t2)", fontSize: 11 }}>
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
