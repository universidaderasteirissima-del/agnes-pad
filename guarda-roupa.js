"use strict";
/* ============ Guarda-roupa da joaninha ============
   A joaninha é desenhada numa área de 400 × 720 (x 0–400, y -100–620).
   Cada roupa é uma função que devolve {back, front} em SVG; "u" deixa os ids dos desenhos únicos. */
(function(){
const INK = "#2b1419", SKIN = "#f1d6b6", PINK = "#ec4f9c";
const OL = 'stroke="rgba(0,0,0,.22)" stroke-width="3" stroke-linejoin="round"';
const M = s => `<g transform="translate(400 0) scale(-1 1)">${s}</g>`;   // espelha para o lado direito
const both = s => s + M(s);
const f1 = n => n.toFixed(1);

/* ---------- formas ---------- */
const heart = (x, y, s, f, ex = "") => `<path d="M${x} ${y+s*.9}C${x-s*1.7} ${y-s*.2} ${x-s*.6} ${y-s*1.4} ${x} ${y-s*.4}C${x+s*.6} ${y-s*1.4} ${x+s*1.7} ${y-s*.2} ${x} ${y+s*.9}Z" fill="${f}" ${ex}/>`;
function star(x, y, r, f, ex = ""){
  let d = "";
  for (let i = 0; i < 10; i++){ const a = -Math.PI/2 + i*Math.PI/5, rr = i % 2 ? r*.45 : r; d += (i ? "L" : "M") + f1(x + rr*Math.cos(a)) + " " + f1(y + rr*Math.sin(a)) }
  return `<path d="${d}Z" fill="${f}" stroke-linejoin="round" ${ex}/>`;
}
function flower(x, y, r, f, c = "#ffd84d"){
  let s = "";
  for (let i = 0; i < 5; i++){ const a = i*Math.PI*2/5 - Math.PI/2; s += `<circle cx="${f1(x + r*Math.cos(a))}" cy="${f1(y + r*Math.sin(a))}" r="${f1(r*.72)}" fill="${f}"/>` }
  return s + `<circle cx="${x}" cy="${y}" r="${f1(r*.55)}" fill="${c}"/>`;
}
const bow = (x, y, s, f) => `<path d="M${x} ${y}L${x-s} ${y-s*.75}Q${x-s*1.15} ${y} ${x-s} ${y+s*.75}Z M${x} ${y}L${x+s} ${y-s*.75}Q${x+s*1.15} ${y} ${x+s} ${y+s*.75}Z" fill="${f}" ${OL}/><circle cx="${x}" cy="${y}" r="${f1(s*.32)}" fill="${f}" ${OL}/>`;
const RAINBOW = ["#ef4444", "#f97316", "#facc15", "#22c55e", "#3b82f6", "#a855f7"];

/* estampas: lisa, listras, bolinhas, xadrez, corações, estrelas, arco-íris, jeans */
function paint(id, kind, c, a){
  if (!kind || kind === "plain") return {defs: "", fill: c};
  let inner = "";
  const box = (w, body) => `<pattern id="${id}" width="${w}" height="${w}" patternUnits="userSpaceOnUse"><rect width="${w}" height="${w}" fill="${c}"/>${body}</pattern>`;
  if (kind === "stripes") inner = box(24, `<rect width="24" height="10" fill="${a}"/>`);
  if (kind === "dots")    inner = box(26, `<circle cx="7" cy="7" r="5" fill="${a}"/><circle cx="20" cy="20" r="5" fill="${a}"/>`);
  if (kind === "plaid")   inner = box(30, `<rect width="30" height="8" y="11" fill="${a}" opacity=".55"/><rect width="8" height="30" x="11" fill="${a}" opacity=".55"/><rect width="30" height="2" y="26" fill="#fff" opacity=".5"/>`);
  if (kind === "hearts")  inner = box(28, heart(14, 14, 6, a));
  if (kind === "stars")   inner = box(28, star(14, 14, 7, a));
  if (kind === "sparkle") inner = box(34, star(8, 9, 4, a) + star(25, 24, 3, a) + `<circle cx="25" cy="7" r="1.6" fill="${a}"/>`);
  if (kind === "denim")   inner = box(14, `<path d="M0 14L14 0" stroke="${a}" stroke-width="2" opacity=".35"/>`);
  if (kind === "rainbow"){
    const stops = RAINBOW.map((col, i) => `<stop offset="${f1(i*100/6)}%" stop-color="${col}"/><stop offset="${f1((i+1)*100/6)}%" stop-color="${col}"/>`).join("");
    inner = `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">${stops}</linearGradient>`;
  }
  return {defs: `<defs>${inner}</defs>`, fill: `url(#${id})`};
}

/* ---------- a joaninha (pelúcia da Agnes) ---------- */
const ARM = `<path d="M118 300 Q82 318 54 344" stroke="${SKIN}" stroke-width="30" stroke-linecap="round" fill="none"/>
  <path d="M78 327 L68 335" stroke="${PINK}" stroke-width="34" stroke-linecap="round"/>
  <ellipse cx="42" cy="356" rx="28" ry="20" fill="${INK}" transform="rotate(-25 42 356)"/>`;
const LEG = `<path d="M162 466 L160 540" stroke="${SKIN}" stroke-width="34" stroke-linecap="round"/>
  <path d="M160 530 L160 538" stroke="${PINK}" stroke-width="40" stroke-linecap="round"/>
  <ellipse cx="152" cy="566" rx="46" ry="26" fill="${INK}"/>`;
const SPIRAL = (x, y) => `<path d="M${x} ${y} m-2 0 a2 2 0 1 1 4 0 a5 5 0 1 1 -9 0 a8 8 0 1 1 16 0" stroke="${INK}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
const BODY = `${both(ARM)}${both(LEG)}
  <ellipse cx="200" cy="378" rx="120" ry="124" fill="${PINK}"/>
  <path d="M86 372 Q200 398 314 372" stroke="${INK}" stroke-width="7" fill="none" stroke-linecap="round"/>
  <path d="M100 438 Q200 462 300 438" stroke="${INK}" stroke-width="7" fill="none" stroke-linecap="round"/>
  <path d="M142 258 Q200 280 258 258" stroke="#fff6e8" stroke-width="9" fill="none" stroke-linecap="round"/>
  <circle cx="200" cy="150" r="104" fill="${INK}"/>
  <ellipse cx="200" cy="160" rx="84" ry="88" fill="${SKIN}"/>
  ${both(`<path d="M158 142 Q171 132 184 142" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M161 138 L155 130 M167 135 L164 126 M174 134 L175 125" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`)}
  <circle cx="200" cy="172" r="15" fill="#e889b5"/><circle cx="195" cy="166" r="4" fill="#fff" opacity=".6"/>
  ${SPIRAL(156, 192)}${M(SPIRAL(156, 192))}
  <path d="M162 206 Q200 236 238 206" stroke="${INK}" stroke-width="3.2" fill="none" stroke-linecap="round"/>`;
const HEAD_HINT = `<circle cx="200" cy="150" r="104" fill="rgba(43,20,25,.09)"/>`;

/* ---------- categorias ---------- */
const CATS = [
  {id: "hair",     pt: "Cabelo",      slot: "hair",   vb: "50 0 300 350",   hint: true},
  {id: "hat",      pt: "Chapéus",     slot: "hat",    vb: "30 -100 340 210", hint: true},
  {id: "earrings", pt: "Brincos",     slot: "ears",   vb: "70 150 260 110",  hint: true},
  {id: "glasses",  pt: "Óculos",      slot: "eyes",   vb: "95 95 210 95",    hint: true},
  {id: "necklace", pt: "Colares",     slot: "neck",   vb: "118 236 164 104"},
  {id: "shirt",    pt: "Blusas",      slot: "top",    vb: "30 240 340 190"},
  {id: "dress",    pt: "Vestidos",    slot: "dress",  vb: "40 240 320 310"},
  {id: "pants",    pt: "Calças",      slot: "bottom", vb: "50 370 300 190"},
  {id: "shorts",   pt: "Shorts",      slot: "bottom", vb: "50 370 300 160"},
  {id: "skirt",    pt: "Saias",       slot: "bottom", vb: "40 370 320 170"},
  {id: "shoes",    pt: "Sapatos",     slot: "feet",   vb: "90 520 220 90"},
  {id: "boots",    pt: "Botas",       slot: "feet",   vb: "90 470 220 140"},
  {id: "sandals",  pt: "Sandálias",   slot: "feet",   vb: "90 520 220 90"},
  {id: "bag",      pt: "Na mãozinha", slot: "hand",   vb: "290 130 110 320"}
];
const CAT = Object.fromEntries(CATS.map(c => [c.id, c]));
const ITEMS = [], BY_ID = {};
function add(cat, id, en, clip, make){ const it = {cat, id, en, clip, make}; ITEMS.push(it); BY_ID[id] = it }

/* ---------- cabelos ---------- */
const BANGS = c => `<path d="M110 122 Q114 50 200 46 Q286 50 290 122 Q266 96 240 106 Q220 86 200 102 Q180 86 160 106 Q134 96 110 122Z" fill="${c}" ${OL}/>`;
const CUT = c => `<path d="M104 122 Q108 44 200 42 Q292 44 296 122 Q250 108 200 110 Q150 108 104 122Z" fill="${c}" ${OL}/>`;
add("hair", "h_chiquinha", "hair", "hair", () => ({
  back: both(`<circle cx="84" cy="122" r="44" fill="#6b3e26" ${OL}/><circle cx="70" cy="160" r="28" fill="#6b3e26" ${OL}/>`),
  front: BANGS("#6b3e26") + both(`<circle cx="116" cy="112" r="12" fill="#ff6fae" ${OL}/>`)
}));
add("hair", "h_longo", "hair", "hair", () => ({
  back: `<path d="M84 160 Q76 28 200 26 Q324 28 316 160 L332 300 Q312 320 290 300 L110 300 Q88 320 68 300Z" fill="#f4c542"/>`,
  front: BANGS("#f4c542") + both(`<path d="M100 118 Q82 210 94 324 Q118 340 134 320 Q118 230 126 150Z" fill="#f4c542" ${OL}/>`)
}));
add("hair", "h_rabo", "hair", "hair", () => ({
  back: `<path d="M258 64 Q356 34 356 150 Q354 246 300 280 Q336 170 278 102Z" fill="#d9572b" ${OL}/>`,
  front: BANGS("#d9572b") + bow(270, 64, 26, "#ff6fae")
}));
add("hair", "h_black", "hair", "hair", () => {
  let back = "";
  for (let a = 190; a <= 350; a += 20){ const r = a*Math.PI/180; back += `<circle cx="${f1(200 + 104*Math.cos(r))}" cy="${f1(150 + 104*Math.sin(r))}" r="36" fill="#3b2416"/>` }
  back += both(`<circle cx="84" cy="96" r="46" fill="#3b2416"/>`);
  let front = "";
  [[146, 86], [172, 74], [200, 70], [228, 74], [254, 86]].forEach(([x, y]) => front += `<circle cx="${x}" cy="${y}" r="20" fill="#3b2416"/>`);
  return {back, front};
});
add("hair", "h_trancas", "hair", "hair", () => {
  let braid = "";
  for (let i = 0; i < 7; i++) braid += `<ellipse cx="${f1(112 - i*1.4)}" cy="${170 + i*24}" rx="17" ry="15" fill="#222" ${OL}/>`;
  braid += `<circle cx="102" cy="334" r="9" fill="#ffd84d" ${OL}/><path d="M102 340 l-10 18 h20z" fill="#222"/>`;
  return {back: "", front: BANGS("#222") + both(braid)};
});
add("hair", "h_chanel", "hair", "hair", () => ({
  back: `<path d="M86 160 Q80 34 200 32 Q320 34 314 160 L314 240 Q290 258 268 240 L132 240 Q110 258 86 240Z" fill="#ff8cc6"/>`,
  front: CUT("#ff8cc6")
}));
add("hair", "h_arcoiris", "hair", "hair", u => {
  const p = paint("hr" + u, "rainbow");
  return {
    back: p.defs + `<path d="M84 160 Q76 28 200 26 Q324 28 316 160 L332 300 Q312 320 290 300 L110 300 Q88 320 68 300Z" fill="${p.fill}"/>`,
    front: BANGS(RAINBOW[5]) + both(`<path d="M100 118 Q82 210 94 324 Q118 340 134 320 Q118 230 126 150Z" fill="${p.fill}" ${OL}/>`)
  };
});

/* ---------- chapéus ---------- */
add("hat", "c_coroa", "crown", "crown", () => ({front:
  `<path d="M138 76 L128 -4 L166 34 L200 -18 L234 34 L272 -4 L262 76 Q200 90 138 76Z" fill="#ffcf3a" ${OL}/>
   <circle cx="200" cy="50" r="10" fill="#ef4444"/><circle cx="160" cy="58" r="7" fill="#3b82f6"/><circle cx="240" cy="58" r="7" fill="#22c55e"/>
   <circle cx="128" cy="-6" r="7" fill="#fff6c2"/><circle cx="200" cy="-20" r="8" fill="#fff6c2"/><circle cx="272" cy="-6" r="7" fill="#fff6c2"/>`}));
add("hat", "c_festa", "hat", "hat", u => { const p = paint("cf" + u, "dots", "#5ec8ff", "#fff"); return {front: p.defs +
  `<path d="M146 72 L200 -76 L254 72 Q200 88 146 72Z" fill="${p.fill}" ${OL}/>
   <path d="M146 72 Q200 88 254 72" stroke="#ffd84d" stroke-width="10" fill="none" stroke-linecap="round"/>
   <circle cx="200" cy="-78" r="16" fill="#ff6fae" ${OL}/>`}});
add("hat", "c_praia", "hat", "hat", () => ({front:
  `<ellipse cx="200" cy="66" rx="160" ry="26" fill="#f6d38a" ${OL}/>
   <path d="M118 68 Q120 -12 200 -14 Q280 -12 282 68Z" fill="#f6d38a" ${OL}/>
   <path d="M119 48 Q200 62 281 48 L282 66 Q200 80 118 66Z" fill="#ff6fae"/>` + flower(258, 52, 12, "#fff")}));
add("hat", "c_bone", "hat", "hat", () => ({front:
  `<path d="M196 76 Q300 58 354 90 Q300 106 196 94Z" fill="#1d74d8" ${OL}/>
   <path d="M108 86 Q110 -6 200 -8 Q290 -6 292 86Z" fill="#ef4444" ${OL}/>
   <circle cx="200" cy="-6" r="9" fill="#1d74d8"/>` + star(200, 40, 18, "#fff")}));
add("hat", "c_gorro", "hat", "hat", u => { const p = paint("cg" + u, "stripes", "#a78bfa", "#fff"); return {front: p.defs +
  `<path d="M102 94 Q102 -10 200 -12 Q298 -10 298 94Z" fill="${p.fill}" ${OL}/>
   <rect x="96" y="62" width="208" height="38" rx="18" fill="#7c3aed" ${OL}/>
   <circle cx="200" cy="-24" r="26" fill="#fff" ${OL}/>`}});
add("hat", "c_flores", "hat", "flower", () => {
  let s = "", cols = ["#ff6fae", "#ffd84d", "#a78bfa", "#ffffff", "#5ec8ff"];
  for (let a = 196, i = 0; a <= 344; a += 21, i++){ const r = a*Math.PI/180;
    s += `<ellipse cx="${f1(200 + 100*Math.cos(r + .17))}" cy="${f1(150 + 100*Math.sin(r + .17))}" rx="12" ry="6" fill="#4caf3f" transform="rotate(${a + 100} ${f1(200 + 100*Math.cos(r + .17))} ${f1(150 + 100*Math.sin(r + .17))})"/>`;
    s += flower(+f1(200 + 100*Math.cos(r)), +f1(150 + 100*Math.sin(r)), 14, cols[i % cols.length], i % 2 ? "#ff8c42" : "#ffd84d") }
  return {front: s};
});
add("hat", "c_laco", "bow", "bow", () => ({front: bow(200, 30, 62, "#ff3d8f") + `<circle cx="200" cy="30" r="14" fill="#ff7eb6"/>`}));
add("hat", "c_bruxa", "hat", "hat", () => ({front:
  `<ellipse cx="200" cy="68" rx="142" ry="20" fill="#7c3aed" ${OL}/>
   <path d="M126 70 Q168 30 182 -40 Q192 -92 252 -98 Q214 -60 226 0 Q236 40 274 70Z" fill="#7c3aed" ${OL}/>
   <path d="M136 56 Q200 70 264 56 L270 70 Q200 84 130 70Z" fill="#ffd84d"/>` + star(200, 20, 16, "#ffd84d")}));

/* ---------- brincos (x 106 e o espelho) ---------- */
const HOOK = `<path d="M106 194 L106 204" stroke="#d4a017" stroke-width="3" stroke-linecap="round"/>`;
add("earrings", "b_argola", "earrings", "earrings", () => ({front: both(HOOK + `<circle cx="106" cy="222" r="17" fill="none" stroke="#f5c542" stroke-width="5"/>`)}));
add("earrings", "b_coracao", "earrings", "earrings", () => ({front: both(HOOK + heart(106, 218, 12, "#ff4d8d", OL))}));
add("earrings", "b_estrela", "earrings", "earrings", () => ({front: both(HOOK + star(106, 220, 16, "#ffd84d", OL))}));
add("earrings", "b_perola", "earrings", "earrings", () => ({front: both(HOOK + `<circle cx="106" cy="208" r="5" fill="#fff" ${OL}/><circle cx="106" cy="226" r="11" fill="#fff" ${OL}/><circle cx="102" cy="222" r="3" fill="#fff" opacity=".9"/>`)}));
add("earrings", "b_cereja", "earrings", "earrings", () => ({front: both(HOOK + `<path d="M106 204 Q100 214 96 226 M106 204 Q112 214 116 226" stroke="#3f8f2f" stroke-width="3" fill="none"/><circle cx="96" cy="230" r="9" fill="#e11d48" ${OL}/><circle cx="116" cy="230" r="9" fill="#e11d48" ${OL}/>`)}));
add("earrings", "b_arcoiris", "earrings", "earrings", () => ({front: both(HOOK + RAINBOW.slice(0, 4).map((c, i) => `<circle cx="106" cy="${210 + i*13}" r="${7 - i*.6}" fill="${c}" ${OL}/>`).join(""))}));

/* ---------- óculos (lente esquerda em 171,142 e o espelho) ---------- */
const ARMS = c => `<path d="M146 140 L112 134 M254 140 L288 134" stroke="${c}" stroke-width="5" stroke-linecap="round"/><path d="M194 142 Q200 134 206 142" stroke="${c}" stroke-width="5" fill="none"/>`;
add("glasses", "o_redondo", "glasses", "glasses", () => ({front: both(`<circle cx="171" cy="142" r="25" fill="rgba(255,255,255,.3)" stroke="#ff6fae" stroke-width="6"/>`) + ARMS("#ff6fae")}));
add("glasses", "o_coracao", "glasses", "glasses", () => ({front: both(heart(171, 146, 19, "rgba(239,68,68,.85)", 'stroke="#b91c1c" stroke-width="4"')) + ARMS("#b91c1c")}));
add("glasses", "o_estrela", "glasses", "glasses", () => ({front: both(star(171, 142, 32, "rgba(250,204,21,.9)", 'stroke="#d97706" stroke-width="4"')) + ARMS("#d97706")}));
add("glasses", "o_sol", "glasses", "glasses", () => ({front: both(`<rect x="146" y="124" width="52" height="36" rx="14" fill="#222" stroke="#fff" stroke-width="3"/><path d="M154 134 L166 130" stroke="#fff" stroke-width="3" opacity=".6" stroke-linecap="round"/>`) + ARMS("#222")}));
add("glasses", "o_grande", "glasses", "glasses", () => ({front: both(`<circle cx="169" cy="142" r="31" fill="rgba(94,200,255,.35)" stroke="#22c55e" stroke-width="9"/>`) + ARMS("#22c55e")}));

/* ---------- colares (curva do pescoço) ---------- */
const NECK = t => [(1-t)*(1-t)*140 + 2*(1-t)*t*200 + t*t*260, (1-t)*(1-t)*262 + 2*(1-t)*t*302 + t*t*262];
const along = (n, fn) => Array.from({length: n}, (_, i) => fn(...NECK(i/(n-1)), i)).join("");
add("necklace", "k_perolas", "necklace", "necklace", () => ({front: along(11, (x, y) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="7" fill="#fff" ${OL}/>`)}));
add("necklace", "k_coracao", "necklace", "necklace", () => ({front: `<path d="M140 262 Q200 302 260 262" stroke="#f5c542" stroke-width="4" fill="none"/>` + heart(200, 296, 13, "#ff4d8d", OL)}));
add("necklace", "k_flores", "necklace", "flower", () => ({front: along(7, (x, y, i) => flower(+f1(x), +f1(y), 10, ["#ff6fae", "#ffd84d", "#a78bfa", "#fff"][i % 4]))}));
add("necklace", "k_contas", "necklace", "necklace", () => ({front: along(12, (x, y, i) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="8" fill="${RAINBOW[i % 6]}" ${OL}/>`)}));
add("necklace", "k_gravata", "bow", "bow", () => ({front: bow(200, 272, 26, "#3b82f6")}));
add("necklace", "k_medalha", "necklace", "necklace", () => ({front: `<path d="M150 262 L192 300 M250 262 L208 300" stroke="#3b82f6" stroke-width="10" stroke-linecap="round"/><circle cx="200" cy="312" r="21" fill="#ffcf3a" ${OL}/>` + star(200, 312, 12, "#fff6c2")}));

/* ---------- blusas ---------- */
function shirt(id, c, a, kind, deco){
  add("shirt", id, "shirt", "shirt", u => { const p = paint(id + u, kind, c, a); return {front: p.defs +
    both(`<path d="M122 282 L72 314 Q72 336 92 346 L136 322Z" fill="${p.fill}" ${OL}/>`) +
    `<path d="M108 296 Q124 262 166 254 Q200 270 234 254 Q276 262 292 296 Q316 330 322 394 Q200 420 78 394 Q84 330 108 296Z" fill="${p.fill}" ${OL}/>
     <path d="M166 254 Q200 278 234 254" fill="none" stroke="${a}" stroke-width="6" stroke-linecap="round"/>` + (deco || "")}});
}
shirt("s_coracao", "#ffd84d", "#ff6fae", "plain", heart(200, 336, 24, "#ff6fae"));
shirt("s_listras", "#5ec8ff", "#ffffff", "stripes");
shirt("s_bolinhas", "#ef4444", "#ffffff", "dots");
shirt("s_estrela", "#7ad16a", "#ffffff", "plain", star(200, 336, 30, "#ffd84d", OL));
shirt("s_agnes", "#a78bfa", "#ffffff", "plain", `<text x="200" y="356" text-anchor="middle" font-family="Fredoka, Arial Rounded MT Bold, sans-serif" font-weight="700" font-size="58" fill="#fff">A</text>`);
shirt("s_flor", "#ffb3d1", "#ffffff", "plain", flower(200, 336, 18, "#fff", "#ff8c42"));
shirt("s_arcoiris", "#fff", "#ef4444", "rainbow");

/* ---------- vestidos ---------- */
function dress(id, c, a, kind, deco){
  add("dress", id, "dress", "dress", u => { const p = paint(id + u, kind, c, a); return {front: p.defs +
    `<path d="M160 254 Q200 272 240 254 Q284 262 296 300 Q318 330 326 378 Q340 440 354 506 Q200 548 46 506 Q60 440 74 378 Q82 330 104 300 Q116 262 160 254Z" fill="${p.fill}" ${OL}/>` +
    both(`<ellipse cx="112" cy="294" rx="30" ry="22" fill="${p.fill}" ${OL} transform="rotate(-30 112 294)"/>`) +
    `<path d="M84 350 Q200 374 316 350 L318 368 Q200 392 82 368Z" fill="${a}" ${OL}/>` + (deco || "")}});
}
dress("v_princesa", "#f9a8d4", "#c084fc", "sparkle", bow(200, 362, 20, "#c084fc"));
dress("v_bolinhas", "#ef4444", "#ffffff", "dots");
dress("v_gelo", "#93c5fd", "#ffffff", "sparkle", star(200, 300, 14, "#fff"));
dress("v_girassol", "#ffd84d", "#22c55e", "plain", flower(150, 450, 22, "#fff7b0", "#8b5a2b") + flower(250, 470, 18, "#fff7b0", "#8b5a2b"));
dress("v_arcoiris", "#fff", "#ffffff", "rainbow");
dress("v_menta", "#99f6e4", "#ffffff", "stripes", heart(200, 300, 12, "#ff6fae"));

/* ---------- calças, shorts e saias ---------- */
const PANTS = h => `M80 384 Q200 408 320 384 Q316 430 304 458 Q292 492 262 496 L264 ${h} L216 ${h} L212 506 Q200 498 188 506 L184 ${h} L136 ${h} L138 496 Q108 492 96 458 Q84 430 80 384Z`;
function bottom(cat, id, en, c, a, kind, h, extra){
  add(cat, id, en, en, u => { const p = paint(id + u, kind, c, a); return {front: p.defs +
    `<path d="${cat === "skirt" ? "M80 384 Q200 408 320 384 Q336 440 352 494 Q200 528 48 494 Q64 440 80 384Z" : PANTS(h)}" fill="${p.fill}" ${OL}/>
     <path d="M80 384 Q200 408 320 384 L319 398 Q200 422 81 398Z" fill="${a}" opacity=".9"/>` + (extra || "")}});
}
const JEANS = h => `<path d="M200 404 L200 500" stroke="#ffd27a" stroke-width="2.5" stroke-dasharray="6 5"/><path d="M110 420 Q140 440 160 418 M290 420 Q260 440 240 418" stroke="#ffd27a" stroke-width="2.5" fill="none" stroke-dasharray="6 5"/>`;
bottom("pants", "p_jeans", "pants", "#4a7fd0", "#3463a8", "denim", 550, JEANS());
bottom("pants", "p_legging", "pants", "#ff8cc6", "#ffffff", "hearts", 550);
bottom("pants", "p_estrelas", "pants", "#7c3aed", "#ffd84d", "stars", 550);
bottom("pants", "p_xadrez", "pants", "#22c55e", "#14532d", "plaid", 550);
bottom("shorts", "sh_jeans", "shorts", "#4a7fd0", "#3463a8", "denim", 516, JEANS());
bottom("shorts", "sh_amarelo", "shorts", "#ffd84d", "#ff8c42", "plain", 516, flower(130, 450, 12, "#fff"));
bottom("shorts", "sh_listras", "shorts", "#5ec8ff", "#ffffff", "stripes", 516);
bottom("skirt", "k_tutu", "skirt", "#f9a8d4", "#ff6fae", "sparkle", 0,
  Array.from({length: 9}, (_, i) => `<circle cx="${62 + i*34.5}" cy="${494 + Math.sin(i/8*Math.PI)*14}" r="20" fill="#fbcfe8" ${OL}/>`).join(""));
bottom("skirt", "k_xadrez", "skirt", "#ef4444", "#7f1d1d", "plaid", 0);
bottom("skirt", "k_jeans", "skirt", "#4a7fd0", "#3463a8", "denim", 0, `<path d="M200 404 L200 520" stroke="#ffd27a" stroke-width="2.5" stroke-dasharray="6 5"/>`);
bottom("skirt", "k_arcoiris", "skirt", "#fff", "#ffffff", "rainbow", 0);

/* ---------- sapatos, botas e sandálias (pé esquerdo em 152,566 e o espelho) ---------- */
const SOLE = `<path d="M102 570 Q152 602 202 570 Q204 584 196 590 Q152 610 108 590 Q100 584 102 570Z" fill="#fff" ${OL}/>`;
function shoe(cat, id, en, foot){ add(cat, id, en, en, () => ({front: both(foot)})) }
shoe("shoes", "t_tenis", "shoes", `<ellipse cx="152" cy="564" rx="50" ry="29" fill="#ff6fae" ${OL}/>${SOLE}<path d="M136 548 L168 548 M134 558 L170 558" stroke="#fff" stroke-width="4" stroke-linecap="round"/>`);
shoe("shoes", "t_azul", "shoes", `<ellipse cx="152" cy="564" rx="50" ry="29" fill="#3b82f6" ${OL}/>${SOLE}` + star(152, 560, 12, "#fff"));
shoe("shoes", "t_boneca", "shoes", `<ellipse cx="152" cy="566" rx="49" ry="28" fill="#e11d48" ${OL}/><path d="M116 552 Q152 540 188 552" stroke="#7f1d1d" stroke-width="7" fill="none"/><circle cx="182" cy="552" r="5" fill="#ffd84d"/><path d="M122 572 Q140 580 160 578" stroke="#fff" stroke-width="5" opacity=".5" fill="none" stroke-linecap="round"/>`);
shoe("shoes", "t_sapatilha", "shoes", `<ellipse cx="152" cy="566" rx="49" ry="28" fill="#f9a8d4" ${OL}/>` + bow(152, 548, 12, "#ff3d8f"));
const BOOT = (c, top) => `<rect x="132" y="492" width="56" height="80" rx="16" fill="${c}" ${OL}/><ellipse cx="152" cy="568" rx="50" ry="28" fill="${c}" ${OL}/>${top || ""}`;
shoe("boots", "bo_chuva", "boots", BOOT("#facc15", `<path d="M136 578 Q152 590 196 578" stroke="#ca8a04" stroke-width="6" fill="none"/>`));
shoe("boots", "bo_cowgirl", "boots", BOOT("#a16207", star(160, 528, 13, "#fde68a")));
shoe("boots", "bo_neve", "boots", BOOT("#ffffff", [140, 152, 164, 176, 188].map((x, i) => `<circle cx="${x - 4}" cy="${494 + (i % 2)*4}" r="12" fill="#f1f5f9" ${OL}/>`).join("")));
shoe("boots", "bo_rosa", "boots", BOOT("#ec4899", star(148, 520, 6, "#fff") + star(170, 544, 5, "#fff") + star(140, 560, 5, "#fff")));
const SANDAL = (c, a, deco) => `<ellipse cx="152" cy="590" rx="54" ry="11" fill="${c}" ${OL}/><path d="M110 570 Q152 538 194 570" stroke="${a}" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M124 556 L124 588 M180 556 L180 588" stroke="${a}" stroke-width="6" stroke-linecap="round"/>${deco || ""}`;
shoe("sandals", "sa_flor", "sandals", SANDAL("#f59e0b", "#ff6fae", flower(152, 550, 10, "#fff")));
shoe("sandals", "sa_praia", "sandals", SANDAL("#22c55e", "#3b82f6"));
shoe("sandals", "sa_estrela", "sandals", SANDAL("#a78bfa", "#ffd84d", star(152, 550, 12, "#ffd84d", OL)));

/* ---------- na mãozinha (mão direita em 358,356) ---------- */
add("bag", "m_bolsa", "bag", "bag", () => ({front: `<path d="M336 386 Q358 330 380 386" fill="none" stroke="#7c3aed" stroke-width="7"/><rect x="316" y="382" width="76" height="62" rx="16" fill="#c084fc" ${OL}/>` + heart(354, 412, 12, "#fff")}));
add("bag", "m_varinha", "magic wand", "wand", () => ({front: `<path d="M356 364 L374 244" stroke="#8b5cf6" stroke-width="8" stroke-linecap="round"/>` + star(376, 230, 26, "#ffd84d", OL) + star(334, 222, 7, "#fff") + star(392, 278, 6, "#fff")}));
add("bag", "m_balao", "balloon", "balloon", () => ({front: `<path d="M358 350 Q334 280 350 214" stroke="#555" stroke-width="2.5" fill="none"/>` + heart(350, 182, 26, "#ef4444", OL) + `<ellipse cx="336" cy="164" rx="7" ry="11" fill="#fff" opacity=".6"/>`}));
add("bag", "m_flores", "flower", "flower", () => ({front: `<path d="M358 360 L338 280 M358 360 L360 262 M358 360 L382 282" stroke="#3f8f2f" stroke-width="5" stroke-linecap="round"/>` + flower(338, 276, 13, "#ff6fae") + flower(360, 256, 14, "#ffd84d", "#ff8c42") + flower(382, 278, 13, "#a78bfa")}));
add("bag", "m_sorvete", "ice cream", "icecream", () => ({front: `<path d="M340 324 L378 324 L360 376Z" fill="#f4b860" ${OL}/><path d="M346 334 L372 334 M350 346 L368 346" stroke="#c98a3a" stroke-width="3"/><circle cx="359" cy="310" r="21" fill="#ff8cc6" ${OL}/><circle cx="359" cy="282" r="18" fill="#99f6e4" ${OL}/><circle cx="364" cy="262" r="6" fill="#e11d48"/>`}));

/* ---------- desenhar ---------- */
const svgOf = (vb, inner, cls = "") => `<svg viewBox="${vb}" class="${cls}" preserveAspectRatio="xMidYMid meet">${inner}</svg>`;
let uid = 0;
function itemSVG(it, vb){
  const c = CAT[it.cat], m = it.make("x" + (uid++));
  return svgOf(vb || c.vb, (c.hint ? HEAD_HINT : "") + (m.back || "") + (m.front || ""));
}
let worn = store.get("outfit", {});
Object.keys(worn).forEach(k => { if (!BY_ID[worn[k]]) delete worn[k] });
const ORDER = ["bottom", "feet", "top", "dress", "neck", "hairFront", "ears", "eyes", "hat", "hand"];
function renderDoll(lift){
  const g = (slot, part) => {
    const id = worn[slot]; if (!id) return "";
    const m = BY_ID[id].make("d" + slot), s = m[part] || "";
    return s ? `<g data-slot="${slot}" class="worn${lift === slot ? " lifted" : ""}">${s}</g>` : "";
  };
  let inner = g("hair", "back") + BODY;
  for (const s of ORDER) inner += s === "hairFront" ? g("hair", "front") : g(s, "front");
  $("#doll").innerHTML = svgOf("0 -100 400 720", inner);
  document.querySelectorAll("#wItems .item").forEach(el => el.classList.toggle("worn", Object.values(worn).includes(el.dataset.id)));
}

/* ---------- armário ---------- */
let curCat = "dress";
function renderTabs(){
  $("#wTabs").innerHTML = CATS.map(c => {
    const first = ITEMS.find(i => i.cat === c.id);
    return `<button class="wtab${c.id === curCat ? " on" : ""}" data-cat="${c.id}" aria-label="${c.pt}">${itemSVG(first)}</button>`;
  }).join("");
}
function renderItems(){
  const c = CAT[curCat];
  $("#wItems").innerHTML = `<div class="whead">${c.pt}</div>` + ITEMS.filter(i => i.cat === curCat).map(i =>
    `<div class="item" data-id="${i.id}">${itemSVG(i)}<b>${i.en}</b></div>`).join("");
  renderDoll();
}
$("#wTabs").addEventListener("click", e => {
  const b = e.target.closest(".wtab"); if (!b) return;
  curCat = b.dataset.cat; document.querySelectorAll(".wtab").forEach(t => t.classList.toggle("on", t === b));
  renderItems(); sfx("eat");
});

/* ---------- vestir / tirar ---------- */
let count = 0;
function wear(it){
  const slot = CAT[it.cat].slot;
  if (slot === "dress"){ delete worn.top; delete worn.bottom }
  if (slot === "top" || slot === "bottom") delete worn.dress;
  worn[slot] = it.id; store.set("outfit", worn);
  renderDoll(); sparkle(); sfx("eat"); popWord(it.en);
  stats.roupas = (stats.roupas || 0) + 1; const d = day(); d.roupas = (d.roupas || 0) + 1; saveStats();
  count++;
  const tok = session; stopAudio();
  say("en_" + it.clip).then(() => { if (tok === session && count % 4 === 0) say(pick(["dress_wow1", "dress_wow2", "dress_wow3"])) });
}
function takeOff(slot){ delete worn[slot]; store.set("outfit", worn); renderDoll(); sfx("ops") }
function popWord(w){
  const p = document.createElement("div"); p.className = "wordpop"; p.textContent = w + "!";
  const r = $("#doll").getBoundingClientRect(), s = $("#screen").getBoundingClientRect();
  p.style.left = (r.left - s.left + r.width/2) + "px"; p.style.top = (r.top - s.top + r.height*.12) + "px";
  $("#screen").appendChild(p); setTimeout(() => p.remove(), 1300);
}
function sparkle(){
  const st = $("#stage");
  for (let i = 0; i < 10; i++){
    const s = document.createElement("div"); s.className = "spark"; s.textContent = ["✨", "⭐", "💖"][i % 3];
    s.style.left = (15 + Math.random()*70) + "%"; s.style.top = (10 + Math.random()*75) + "%"; s.style.animationDelay = (Math.random()*.25) + "s";
    st.appendChild(s); setTimeout(() => s.remove(), 1200);
  }
}

/* ---------- arrastar com o dedo ---------- */
let drag = null;
const overStage = e => { const r = $("#stage").getBoundingClientRect(); return e.clientX > r.left && e.clientX < r.right && e.clientY > r.top && e.clientY < r.bottom };
function ghostOf(it){
  const g = document.createElement("div"); g.className = "ghost"; g.innerHTML = itemSVG(it);
  document.body.appendChild(g); return g;
}
$("#wItems").addEventListener("pointerdown", e => {
  const el = e.target.closest(".item"); if (!el) return;
  e.preventDefault(); drag = {it: BY_ID[el.dataset.id], from: null, sx: e.clientX, sy: e.clientY, moved: false, el};
  el.classList.add("press");
});
$("#doll").addEventListener("pointerdown", e => {
  const g = e.target.closest("[data-slot]"); if (!g) return;
  e.preventDefault(); const slot = g.dataset.slot;
  drag = {it: BY_ID[worn[slot]], from: slot, sx: e.clientX, sy: e.clientY, moved: false};
});
addEventListener("pointermove", e => {
  if (!drag) return;
  if (!drag.moved && Math.hypot(e.clientX - drag.sx, e.clientY - drag.sy) > 10){
    drag.moved = true; drag.ghost = ghostOf(drag.it);
    if (drag.from) renderDoll(drag.from);
  }
  if (drag.ghost){
    drag.ghost.style.left = e.clientX + "px"; drag.ghost.style.top = e.clientY + "px";
    $("#stage").classList.toggle("glow", !drag.from && overStage(e));
  }
});
function endDrag(e, cancel){
  if (!drag) return; const d = drag; drag = null;
  if (d.ghost) d.ghost.remove();
  if (d.el) d.el.classList.remove("press");
  $("#stage").classList.remove("glow");
  if (cancel){ renderDoll(); return }
  const over = overStage(e);
  if (d.from){
    if (d.moved && !over) takeOff(d.from);
    else { renderDoll(); if (!d.moved){ popWord(d.it.en); stopAudio(); say("en_" + d.it.clip) } }
    return;
  }
  if (!d.moved || over) wear(d.it);
}
addEventListener("pointerup", e => endDrag(e));
addEventListener("pointercancel", e => endDrag(e, true));

/* ---------- botões ---------- */
$("#wRandom").onclick = () => {
  worn = {};
  const one = cat => pick(ITEMS.filter(i => i.cat === cat));
  const put = it => worn[CAT[it.cat].slot] = it.id;
  put(one("hair")); put(one(pick(["shoes", "boots", "sandals"])));
  if (Math.random() < .5) put(one("dress")); else { put(one("shirt")); put(one(pick(["pants", "shorts", "skirt"]))) }
  ["hat", "earrings", "glasses", "necklace", "bag"].forEach(c => { if (Math.random() < .45) put(one(c)) });
  store.set("outfit", worn); renderDoll(); sparkle(); sfx("win");
  stopAudio(); say(pick(["dress_wow1", "dress_wow2", "dress_wow3"]));
};
$("#wClear").onclick = () => { worn = {}; store.set("outfit", worn); renderDoll(); sfx("ops"); stopAudio(); say("dress_clean") };
$("#wPhoto").onclick = () => {
  const f = document.createElement("div"); f.className = "flash"; $("#stage").appendChild(f); setTimeout(() => f.remove(), 700);
  sfx("win"); confetti(); stopAudio(); say("dress_photo");
};

/* ---------- abrir o jogo ---------- */
window.startWardrobe = async function(){
  show("wardrobe"); renderTabs(); renderItems();
  await say("dress_in");
};
$("#goWardrobe").onclick = () => startWardrobe();
})();
