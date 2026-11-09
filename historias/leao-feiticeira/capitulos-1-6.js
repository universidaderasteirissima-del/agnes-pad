"use strict";
/* ============ O Leão, a Feiticeira e o Guarda-Roupa · peças, brincadeiras e capítulos 1 a 6 ============
   Usa o motor do livro (window.Narnia, em historias.js) e algumas peças do livro 1 (window.Narnia.parte2).
   Ilustrações antigas em domínio público: Kate Greenaway (as quatro crianças), Ivan Shishkin (bosques de inverno),
   Thomas Nast (Papai Noel, 1881), gravuras de castor, lobo, pisco, trenó e do cervo branco (Baldwin, 1888).
   Reaproveita Jadis (Dulac) e Aslam (Rosa Bonheur) do livro 1. O resto é desenhado aqui em SVG. */
(function(){
const N = window.Narnia; if (!N || !N.parte2) return;
const {peca, svg, tag, estrelas, coracao, botoesFim, ACOES, tom, farfalha} = N;
const {poste, guardaRoupa, coroa, emoji} = N.parte2;
const DIR2 = "historias/leao-feiticeira/";
const im = (src, o) => peca(`<img src="${DIR2}${src}.webp" alt="" draggable="false">`, Object.assign({}, o, {c: "foto " + (o.c || "")}));
const im1 = N.img;   /* imagens do livro 1: jadis, aslam, aslam-rosto, bosque... */
const P = (tema, cena, ps, extra = {}) => Object.assign({tema, cena, texto: ps.map(p => p.startsWith("<") ? p : `<p>${p}</p>`).join("")}, extra);
const capa = (n, nome, resumo, cena, tema = "noite") => P(tema, cena, [`<div class="sobre">As Crônicas de Nárnia · Livro 2</div><h1 class="h1-longo">O Leão, a Feiticeira e o Guarda-Roupa</h1><div class="cap">Capítulo ${n} · ${nome}</div>`, ...resumo, `<div class="dica">role devagarinho para baixo ↓</div>`], {layout: "capa"});
const fim = (ps, prox, extra) => [...ps, `<div class="continua">${extra || "Continua no próximo capítulo..."}</div>`, botoesFim(prox)];
const dica = txt => `<div class="dica-toque">✨ ${txt}</div>`;
const fala = (txt, o) => tag(txt, Object.assign({e: "zoom", z: 6}, o, {c: "fala " + (o.c || "")}));
const placa = (txt, o) => tag(txt, Object.assign({e: "cair", z: 5}, o, {c: "placa " + (o.c || "")}));
const nota = (txt, o) => tag(txt, Object.assign({e: "cair", z: 5}, o));
const neve = () => `<div class="neve-cai"></div>`;

/* ---------- desenhos ---------- */
const tumnus = `<path d="M20 40 Q70 -2 120 40Z" fill="#f4f4f8" stroke="#9aa" stroke-width="2"/><path d="M20 40 q12 -8 25 0 q12 -8 25 0 q13 -8 25 0 q12 -8 25 0" fill="none" stroke="#9aa" stroke-width="2"/><path d="M70 22 v52" stroke="#333" stroke-width="3"/>
  <path d="M48 168 Q42 200 48 222 L44 250 h12 l3 -28 Q63 200 62 168Z" fill="#7a4a2a"/><path d="M76 168 Q78 200 82 222 L80 250 h12 l1 -28 Q96 200 92 168Z" fill="#6b4024"/>
  <ellipse cx="50" cy="252" rx="9" ry="4" fill="#222"/><ellipse cx="86" cy="252" rx="9" ry="4" fill="#222"/>
  <path d="M44 100 Q70 90 96 100 L94 172 L46 172Z" fill="#e0a77a"/><path d="M44 158 q26 16 52 0 v18 q-26 12 -52 0Z" fill="#7a4a2a"/>
  <path d="M48 100 Q70 114 92 100 L92 112 Q70 126 48 112Z" fill="#c0392b"/><path d="M84 110 l6 42 l-10 -2 l-3 -38Z" fill="#c0392b"/>
  <path d="M46 106 Q30 130 40 150" stroke="#e0a77a" stroke-width="11" fill="none" stroke-linecap="round"/><path d="M94 106 Q92 80 74 74" stroke="#e0a77a" stroke-width="11" fill="none" stroke-linecap="round"/>
  <rect x="20" y="140" width="30" height="22" fill="#b08050" stroke="#6b4a2a" stroke-width="2"/><path d="M35 140 v22 M20 151 h30" stroke="#c0392b" stroke-width="2"/>
  <ellipse cx="70" cy="78" rx="16" ry="19" fill="#e8b48a"/>${[[56, 66], [62, 60], [70, 58], [78, 60], [84, 66], [58, 74], [82, 74]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6" fill="#3a2414"/>`).join("")}
  <path d="M58 60 q-8 -12 -2 -20 q3 10 8 14Z M82 60 q8 -12 2 -20 q-3 10 -8 14Z" fill="#d8c8a8"/><path d="M54 78 l-8 -6 l8 2Z M86 78 l8 -6 l-8 2Z" fill="#e8b48a"/>
  <circle cx="64" cy="78" r="2" fill="#222"/><circle cx="76" cy="78" r="2" fill="#222"/><path d="M64 88 q6 4 12 0" stroke="#8a4a3a" stroke-width="2" fill="none"/><path d="M64 94 q6 8 12 0 q-6 4 -12 0Z" fill="#3a2414"/>`;
const professor = `<path d="M30 96 Q60 84 90 96 L96 240 L24 240Z" fill="#7a6a52"/><path d="M48 92 L60 140 L72 92Z" fill="#f2ece0"/><rect x="44" y="236" width="13" height="30" fill="#3a3028"/><rect x="63" y="236" width="13" height="30" fill="#3a3028"/>
  <path d="M30 100 Q18 150 26 196" stroke="#7a6a52" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M90 100 Q102 150 94 196" stroke="#7a6a52" stroke-width="16" fill="none" stroke-linecap="round"/>
  <ellipse cx="60" cy="56" rx="18" ry="22" fill="#f0d2b4"/><path d="M38 52 Q34 24 60 22 Q86 24 82 52 Q80 34 60 32 Q40 34 38 52Z" fill="#f4f1ea"/><path d="M40 50 q-8 4 -4 14 M80 50 q8 4 4 14" stroke="#f4f1ea" stroke-width="7" fill="none" stroke-linecap="round"/>
  <path d="M44 64 Q44 100 60 106 Q76 100 76 64 Q70 76 60 74 Q50 76 44 64Z" fill="#f4f1ea"/><circle cx="53" cy="54" r="2.2" fill="#222"/><circle cx="67" cy="54" r="2.2" fill="#222"/>
  <path d="M47 47 l10 -2 M63 45 l10 2" stroke="#ddd" stroke-width="3"/><path d="M60 56 l4 9 l-6 1Z" fill="#e2b08e"/>`;
const casaGrande = `<rect width="320" height="200" fill="#9fb6c8"/><path d="M0 160 Q160 140 320 160 V200 H0Z" fill="#5a7a4a"/><rect x="40" y="70" width="240" height="100" fill="#c9b08a"/><path d="M30 72 L160 20 L290 72Z" fill="#6a4a3a"/>
  ${[60, 100, 200, 240].flatMap(x => [70, 120].map(y => `<rect x="${x}" y="${y + 14}" width="22" height="26" fill="#ffe08a" stroke="#6a4a3a" stroke-width="3"/>`)).join("")}<rect x="148" y="122" width="26" height="48" fill="#5a3a22"/>
  <rect x="80" y="30" width="12" height="30" fill="#6a4a3a"/><rect x="228" y="30" width="12" height="30" fill="#6a4a3a"/>${Array.from({length: 18}, (_, i) => `<path d="M${(i*37) % 320} ${(i*53) % 140} l3 12" stroke="#c8d8e8" stroke-width="2"/>`).join("")}`;
const casacos = `<g class="alem"><rect width="300" height="260" fill="#dfe8f2"/><path d="M0 200 Q150 170 300 200 V260 H0Z" fill="#fff"/>${[[30, 150], [240, 120], [70, 190], [210, 180]].map(([x, y]) => `<path d="M${x} ${y} l18 -60 l18 60Z" fill="#2f5a3a"/>`).join("")}
  <rect x="146" y="80" width="8" height="120" fill="#2a2a2e"/><rect x="140" y="64" width="20" height="18" fill="#ffe08a"/><circle cx="150" cy="73" r="30" fill="#ffe08a" opacity=".3"/></g>
  <rect x="0" y="0" width="300" height="14" fill="#5a3a22"/>
  ${[["#7a5a3a", 6], ["#8a8478", 76], ["#5a4430", 150], ["#9a7a5a", 222]].map(([c, x], k) => `<g class="casaco c${k}"><path d="M${x + 36} 14 v10" stroke="#333" stroke-width="3"/><path d="M${x + 10} 30 Q${x + 36} 18 ${x + 62} 30 L${x + 72} 250 L${x} 250Z" fill="${c}"/>
    <path d="M${x + 20} 30 Q${x + 36} 50 ${x + 52} 30" fill="#e8dcc8"/>${Array.from({length: 10}, (_, i) => `<path d="M${x + 8 + (i*7) % 58} ${60 + i*18} q3 6 6 0" stroke="#0003" stroke-width="2" fill="none"/>`).join("")}</g>`).join("")}`;
const flauta = `<rect x="10" y="40" width="380" height="26" rx="13" fill="#c99a5a" stroke="#7a5a2a" stroke-width="3"/><rect x="10" y="40" width="40" height="26" rx="13" fill="#a97a3a"/>
  ${[0, 1, 2, 3, 4, 5, 6].map(i => `<g class="furo" data-i="${i}"><circle cx="${110 + i*40}" cy="53" r="16" fill="#0000"/><circle cx="${110 + i*40}" cy="53" r="8" fill="#3a2414"/></g>`).join("")}`;
const cha = `<ellipse cx="160" cy="150" rx="150" ry="30" fill="#8a5a3a"/><ellipse cx="160" cy="144" rx="146" ry="26" fill="#f4ecd8"/>
  <path d="M60 140 q0 -50 40 -50 q40 0 40 50Z" fill="#c0392b"/><path d="M138 112 q22 -6 20 14" stroke="#c0392b" stroke-width="8" fill="none"/><path d="M62 112 q-22 -4 -26 -18" stroke="#c0392b" stroke-width="7" fill="none"/><circle cx="100" cy="86" r="6" fill="#c0392b"/>
  <path d="M180 140 h70 l-6 -24 h-58Z" fill="#e8c46a"/><path d="M186 116 h58 q-4 -14 -29 -14 q-25 0 -29 14Z" fill="#f4f0e8"/><circle cx="215" cy="98" r="5" fill="#c0392b"/>
  <ellipse cx="270" cy="138" rx="24" ry="8" fill="#fff"/>${[[256, 130], [270, 128], [284, 130]].map(([x, y]) => `<rect x="${x - 6}" y="${y - 8}" width="12" height="8" fill="#d9a35a"/>`).join("")}`;
const sinos = `<path d="M10 40 Q200 70 390 40" stroke="#9c2f2a" stroke-width="14" fill="none"/>${[0, 1, 2, 3, 4, 5, 6].map(i => `<g class="sininho" style="animation-delay:${i*.05}s"><circle cx="${40 + i*53}" cy="${58 + Math.sin(i/6*Math.PI)*14}" r="16" fill="#f2c94a" stroke="#a97a10" stroke-width="3"/><path d="M${30 + i*53} ${60 + Math.sin(i/6*Math.PI)*14} h20" stroke="#a97a10" stroke-width="3"/></g>`).join("")}`;
const manjar = `<rect x="10" y="40" width="280" height="150" rx="10" fill="#7a2a5a"/><rect x="20" y="50" width="260" height="130" rx="6" fill="#f4e8f0"/><path d="M10 40 l40 -36 h200 l40 36Z" fill="#9a3a7a"/><text x="150" y="30" text-anchor="middle" font-family="IM Fell English, serif" font-size="18" fill="#ffe08a">manjar turco</text>
  ${Array.from({length: 12}, (_, i) => `<g class="doce" data-i="${i}"><rect x="${34 + (i % 4)*62}" y="${62 + Math.floor(i/4)*38}" width="44" height="30" rx="6" fill="${i % 3 ? "#f2a0c0" : "#fff4f8"}" stroke="#d8809f" stroke-width="2"/><circle cx="${44 + (i % 4)*62}" cy="${70 + Math.floor(i/4)*38}" r="2" fill="#fff"/><circle cx="${62 + (i % 4)*62}" cy="${82 + Math.floor(i/4)*38}" r="2" fill="#fff"/></g>`).join("")}`;
const castelo = `<rect width="320" height="220" fill="#c8d8e8"/><path d="M0 200 Q160 170 320 200 V220 H0Z" fill="#fff"/><path d="M60 200 V80 l20 -40 l20 40 V200Z M220 200 V70 l20 -46 l20 46 V200Z" fill="#9ab0c8"/>
  <path d="M90 200 V110 h140 V200Z" fill="#b0c4d8"/><path d="M140 200 V80 l20 -50 l20 50 V200Z" fill="#a0b8d0"/><path d="M146 200 v-40 q14 -16 28 0 v40Z" fill="#4a5a7a"/>
  ${[[70, 100], [230, 92], [150, 100], [110, 140], [200, 140]].map(([x, y]) => `<rect x="${x}" y="${y}" width="10" height="16" rx="5" fill="#4a5a7a"/>`).join("")}`;
const caverna = `<rect width="320" height="220" fill="#d8e4ee"/><path d="M0 220 V80 Q60 20 160 30 Q260 20 320 80 V220Z" fill="#8a7a6a"/><path d="M100 220 V140 Q160 90 220 140 V220Z" fill="#3a2a22"/>
  <path d="M0 80 Q60 20 160 30 Q260 20 320 80 Q260 60 160 56 Q60 60 0 80Z" fill="#fff"/>`;
const tumnusVazia = `<rect width="320" height="220" fill="#5a4a3a"/><rect x="20" y="20" width="280" height="180" fill="#6a5a48"/>
  <path d="M40 180 l40 -20 l10 20Z M200 170 l60 10 l-30 10Z" fill="#8a6a4a"/><circle cx="120" cy="170" r="14" fill="#e8dcc8"/><path d="M114 170 l12 0" stroke="#5a4a3a" stroke-width="3"/>
  <rect x="220" y="40" width="50" height="80" fill="#4a3a2a" transform="rotate(14 245 80)"/><path d="M60 60 l50 40 M90 50 l-20 60" stroke="#3a2a1a" stroke-width="5"/>`;
const pegadas = Array.from({length: 7}, (_, i) => `<ellipse cx="${30 + i*45}" cy="${150 - (i % 2)*14}" rx="7" ry="11" fill="#a8b8c8" transform="rotate(${-20 + i*4} ${30 + i*45} ${150 - (i % 2)*14})"/>`).join("");
const represa = `<rect width="320" height="200" fill="#d8e4ee"/><rect x="0" y="120" width="320" height="80" fill="#b8d0e0"/><path d="M0 120 H320 V140 Q160 150 0 140Z" fill="#e8f0f8"/>
  <path d="M60 130 Q160 80 260 130Z" fill="#7a5a3a"/>${Array.from({length: 12}, (_, i) => `<path d="M${70 + i*16} ${130 - Math.sin(i/11*Math.PI)*40} l14 6" stroke="#5a3a22" stroke-width="5"/>`).join("")}
  <path d="M140 100 q20 -30 40 0 v20 h-40Z" fill="#6a4a2a"/><rect x="164" y="60" width="8" height="34" fill="#6a4a2a"/><path d="M168 54 q-6 -14 4 -22 q-2 10 8 14" fill="#ddd" opacity=".7"/>`;
const buracoGelo = `<rect width="320" height="200" fill="#e8f0f8"/><ellipse cx="160" cy="110" rx="90" ry="34" fill="#9ab8d0"/><ellipse cx="160" cy="112" rx="76" ry="26" fill="#2a4a6a"/>
  <ellipse class="onda" cx="160" cy="112" rx="30" ry="9" fill="none" stroke="#bfe6ff" stroke-width="2"/><path d="M160 20 v80" stroke="#5a3a22" stroke-width="3"/>`;
const tronos = `<rect width="400" height="220" fill="#e8d8b8"/><rect x="0" y="180" width="400" height="40" fill="#c9a87a"/>${[0, 1, 2, 3].map(i => `<g class="trono" data-i="${i}"><path d="M${30 + i*95} 190 V80 Q${65 + i*95} 40 ${100 + i*95} 80 V190Z" fill="#b8902a"/><rect x="${36 + i*95}" y="130" width="58" height="22" fill="#9c2f2a"/>
  <rect x="${30 + i*95}" y="150" width="70" height="40" fill="#a98022"/><g class="coroa-tr"><path d="M${45 + i*95} 60 l6 -20 l9 12 l5 -16 l5 16 l9 -12 l6 20Z" fill="#f2c94a" stroke="#a97a10" stroke-width="2"/></g></g>`).join("")}`;
const caso = `<rect width="320" height="200" fill="#c8b8a0"/><rect x="40" y="30" width="240" height="140" fill="#f4ecd8" stroke="#8a6a4a" stroke-width="4"/>`;

/* ---------- brincadeiras do livro 2 ---------- */
const notasL = [262, 294, 330, 392, 440, 523, 587];
ACOES.casacos = (el, ev, fo) => {
  const c = el.querySelector(".casaco:not(.aberto)");
  if (c){ c.classList.add("aberto"); farfalha(); tom(180 + Math.random()*40, .3, "triangle", .03) }
  if (!el.querySelector(".casaco:not(.aberto)")){ el.classList.add("revelado"); [523, 659, 784, 1046].forEach((f, k) => tom(f, 1.6, "sine", .05, .2 + k*.15)); fo.querySelector(".achou")?.classList.add("vem") }
};
ACOES.flauta = (el, ev) => {
  const f = ev.target.closest(".furo"); if (!f) return;
  const i = +f.dataset.i; f.classList.remove("toca"); void f.getBoundingClientRect(); f.classList.add("toca");
  tom(notasL[i]*1.5, 1.1, "sine", .09); tom(notasL[i]*3, .6, "sine", .015);
  const n = document.createElement("span"); n.className = "nota-voa"; n.textContent = ["♪", "♫", "♩"][i % 3]; n.style.left = (14 + i*11) + "%"; el.appendChild(n); setTimeout(() => n.remove(), 1600);
};
ACOES.sinos = el => {
  el.classList.remove("chacoalha"); void el.offsetWidth; el.classList.add("chacoalha");
  for (let k = 0; k < 8; k++) tom(1800 + Math.random()*1400, .25, "sine", .03, k*.05);
};
ACOES.manjar = (el, ev, fo) => {
  const d = ev.target.closest(".doce:not(.comido)"); if (!d) return;
  d.classList.add("comido"); const n = el.querySelectorAll(".comido").length;
  tom(500 + n*30, .15, "triangle", .05);
  const t = fo.querySelector(".aviso-manjar");
  t.textContent = n < 3 ? "Hum... mais um..." : n < 6 ? "E mais um... e mais outro..." : "É um feitiço! Quanto mais come, mais quer. Cuidado, Edmundo!";
  t.classList.remove("vem"); void t.offsetWidth; t.classList.add("vem");
};
ACOES.logica = (el, ev, fo) => {
  const b = ev.target.closest("button"); if (!b) return;
  const r = fo.querySelector(".resposta");
  r.textContent = {mentira: "— A Lúcia mente? — disse o professor. — Vocês mesmos dizem que ela é a mais sincera de todos!",
    maluca: "— Maluca? Basta olhar para ela: está perfeitamente bem!", verdade: "— Então, pela lógica, só sobra uma coisa: ela está dizendo a verdade! ✨"}[b.dataset.v];
  r.classList.remove("vem"); void r.offsetWidth; r.classList.add("vem");
  tom(b.dataset.v === "verdade" ? 784 : 330, .4, "triangle", .06);
};
ACOES.pisco = (el, ev, fo) => {
  const n = Math.min(4, (+el.dataset.n || 0) + 1); el.dataset.n = n;
  el.style.setProperty("--px", [0, 18, 40, 62, 84][n] + "%"); el.style.setProperty("--py", [0, -30, 10, -40, 0][n] + "%");
  [1568, 1760, 2093].forEach((f, k) => tom(f, .12, "sine", .04, k*.08));
  if (n === 4) fo.querySelector(".achou")?.classList.add("vem");
};
ACOES.pesca = (el, ev, fo) => {
  const n = (+el.dataset.n || 0) + 1; el.dataset.n = n;
  const p = document.createElement("span"); p.className = "peixe-pula"; p.textContent = "🐟"; el.appendChild(p); setTimeout(() => p.remove(), 1200);
  tom(700, .15, "sine", .06); tom(900, .15, "sine", .05, .1);
  fo.querySelector(".conta-peixe").textContent = n + (n === 1 ? " peixe!" : " peixes!");
};
ACOES.trono = (el, ev, fo) => {
  const t = ev.target.closest(".trono"); if (!t || t.classList.contains("coroado")) return;
  t.classList.add("coroado"); const n = el.querySelectorAll(".coroado").length;
  tom([523, 659, 784, 1046][n - 1], 1, "sine", .07);
  if (n === 4) fo.querySelector(".achou")?.classList.add("vem");
};
ACOES.bigode = el => {
  const n = Math.min(2, (+el.dataset.n || 0) + 1); el.dataset.n = n; el.classList.add("rabisco" + n);
  tom(260, .2, "square", .04); tom(200, .2, "square", .04, .1);
};
ACOES.presente = (el, ev, fo) => {
  const p = ev.target.closest(".presente"); if (!p || p.classList.contains("aberto")) return;
  p.classList.add("aberto"); [659, 784, 988].forEach((f, k) => tom(f, .6, "sine", .06, k*.1));
};
ACOES.degelo = (el, ev) => {
  const m = ev.target.closest(".mancha"); if (!m || m.classList.contains("derreteu")) return;
  m.classList.add("derreteu"); tom(notasL[+m.dataset.i % 7]*2, .7, "sine", .06);
};
ACOES.trompa = (el, ev, fo) => {
  el.classList.remove("sopra"); void el.offsetWidth; el.classList.add("sopra");
  [220, 330, 440].forEach((f, k) => tom(f, 1.2, "sawtooth", .03 - k*.008));
  fo.querySelector(".pedro-vem")?.classList.add("vem");
};
ACOES.runa = (el, ev) => {
  const r = ev.target.closest(".runa"); if (!r) return;
  r.classList.add("brilha-runa"); tom(110 + (+r.dataset.i)*22, 1.4, "sine", .08);
};
ACOES.juba = (el, ev, fo) => {
  tom(330 + Math.random()*120, 1.2, "sine", .04);
  const r = el.getBoundingClientRect();
  const c = document.createElement("span"); c.className = "coracao-voa"; c.textContent = "♥";
  c.style.left = ((ev.clientX - r.left)/r.width*100) + "%"; c.style.top = ((ev.clientY - r.top)/r.height*100) + "%"; el.appendChild(c); setTimeout(() => c.remove(), 1500);
};
ACOES.ratinhos = (el, ev, fo) => {
  const c = el.querySelector(".corda:not(.roida)"); if (!c) return;
  c.classList.add("roida"); el.querySelector(`.rato[data-i="${c.dataset.i}"]`)?.classList.add("vem");
  for (let k = 0; k < 4; k++) tom(1400 + k*90, .05, "square", .02, k*.06);
  if (!el.querySelector(".corda:not(.roida)")) fo.querySelector(".achou")?.classList.add("vem");
};
ACOES.sopro = el => {
  if (!el.classList.contains("pedra")) return;
  el.classList.remove("pedra"); el.classList.add("acorda");
  [392, 523, 659].forEach((f, k) => tom(f, .8, "sine", .05, k*.1));
};
ACOES.cervo = (el, ev, fo) => {
  const n = Math.min(4, (+el.dataset.n || 0) + 1); el.dataset.n = n;
  el.style.setProperty("--px", [0, 20, 40, 58, 70][n] + "%");
  tom(300 + n*60, .4, "triangle", .05);
  if (n === 4){ fo.querySelector(".achou")?.classList.add("vem"); fo.querySelector(".poste-acende")?.classList.add("vem") }
};

/* ---------- Capítulo 1 ---------- */
const L1 = {id: "leao1", curto: "Lúcia e o guarda-roupa", mini: svg("0 0 200 290", guardaRoupa, {x: 0, y: 0, w: 70, e: "fade"}),
  paginas: [
  capa(1, "Lúcia e o guarda-roupa", ["Lembra do guarda-roupa feito com a madeira da macieira do Digory? Pois esta história começa bem nele..."], svg("0 0 200 290", guardaRoupa, {x: 14, y: 6, w: 36, e: "pop", t: .1, d: 2, z: 2}) + im("tres", {x: 0, y: 60, w: 30, e: "esq", t: .4, d: 4, z: 4})),
  P("cinza", im("tres", {x: 4, y: 20, w: 54, e: "pop", t: .1, d: 3, z: 3}) + im("susana", {x: 58, y: 8, w: 16, e: "dir", t: .2, d: 3, z: 3}) + nota("Pedro · Susana · Edmundo · Lúcia", {x: 10, y: 84, w: 76, r: -2, t: .5}),
    ["Era uma vez quatro irmãos: <b>Pedro</b>, <b>Susana</b>, <b>Edmundo</b> e <b>Lúcia</b>, a caçula.", "Havia uma guerra na cidade grande, e por isso eles foram mandados para morar, por um tempo, na casa de um velho professor, lá no meio do campo."]),
  P("cinza", svg("0 0 320 200", casaGrande, {x: 0, y: 4, w: 96, e: "pop", t: .0, d: 2, z: 2, c: "moldura"}) + svg("0 0 120 270", professor, {x: 70, y: 40, w: 20, e: "dir", t: .3, d: 3, z: 3}),
    ["A casa era enorme, cheia de corredores, escadas e quartos que ninguém usava.", "O professor era um senhor bonzinho, de cabelo branco espetado e barba, que quase não falava. E sabe quem ele era? Era o <b>Digory</b>, já velhinho!"]),
  P("cinza", svg("0 0 320 200", casaGrande, {x: 0, y: 0, w: 70, e: "esq", t: .0, d: 1, c: "chuvoso"}) + im("tres", {x: 46, y: 46, w: 50, e: "dir", t: .2, d: 3, z: 3}) + nota("chuva, chuva, chuva...", {x: 4, y: 74, w: 40, r: -3, t: .4}),
    ["Na primeira manhã, choveu tanto que não dava para brincar lá fora.", "— Vamos explorar a casa! — disse Pedro. E lá foram eles, abrindo portas, descobrindo salas cheias de livros, armaduras e quadros antigos."]),
  P("sala", svg("0 0 200 290", guardaRoupa, {x: 26, y: 2, w: 40, e: "pop", t: .0, d: 2, z: 2}) + im("lucia", {x: 66, y: 34, w: 18, e: "dir", t: .3, d: 4, z: 4}),
    ["Até que entraram numa sala vazia. Vazia não: tinha só um <b>guarda-roupa</b> grande, de madeira, com um espelho na porta.", "Os irmãos foram embora. Mas a Lúcia ficou. Ela quis ver o que tinha lá dentro..."]),
  P("escuro", peca(`<svg viewBox="0 0 300 260">${casacos}</svg>`, {x: 2, y: 4, w: 94, e: "pop", t: .0, d: 2, z: 3, a: "casacos", c: "casacos-peca"}) + tag("neve?!", {x: 34, y: 80, w: 26, r: -4, e: "zoom", t: 1, z: 6, c: "numero achou"}),
    ["Dentro havia casacos de pele compridos e macios. Lúcia foi entrando, afastando os casacos... e o guarda-roupa não acabava nunca!", dica("toque nos casacos para afastá-los")]),
  P("neve", neve() + im("inverno", {x: 0, y: 4, w: 100, e: "pop", t: .0, d: 1}) + im("lucia", {x: 40, y: 40, w: 16, e: "subir", t: .3, d: 4, z: 4}),
    ["De repente, algo estalou debaixo dos pés dela: <i>crec, crec</i>. Era neve!", "E em vez de madeira, Lúcia sentiu galhos de árvore. Ela estava no meio de um bosque, de noite, com flocos de neve caindo devagarinho."]),
  P("noite", `<div class="ceu">${estrelas()}</div>` + neve() + svg("0 0 100 300", poste(true), {x: 40, y: 0, w: 16, e: "subir", t: .0, d: 2, s: "height:96%"}) + im("lucia", {x: 60, y: 46, w: 16, e: "dir", t: .3, d: 4, z: 4}),
    ["E no meio do bosque havia uma coisa muito estranha: um <b>poste de luz</b>, aceso.", "Sabe que poste é esse? É o mesmo que nasceu da barra de ferro da rainha, lá no começo de Nárnia!"]),
  P("neve", neve() + svg("0 0 100 300", poste(true), {x: 10, y: 0, w: 12, e: "pop", t: .0, d: 2, s: "height:90%"}) + peca(`<svg viewBox="0 0 140 260">${tumnus}</svg>`, {x: 38, y: 4, w: 34, e: "subir", t: .3, d: 3, z: 3}),
    ["Então ela ouviu passinhos: <i>pit-pat, pit-pat</i>. Debaixo do poste apareceu uma criatura muito esquisita.", "Da cintura para cima parecia um homem. Mas tinha pernas de bode, peludas, com cascos! E chifrinhos na cabeça, um cachecol vermelho e um guarda-chuva cheio de neve."]),
  P("neve", neve() + peca(`<svg viewBox="0 0 140 260">${tumnus}</svg>`, {x: 8, y: 4, w: 34, e: "pop", t: .0, d: 3, z: 3}) + im("lucia", {x: 58, y: 30, w: 18, e: "dir", t: .2, d: 4, z: 4}) + fala("— Ora, ora!", {x: 40, y: 4, w: 26, r: 3, t: .4}),
    fim(["A criatura levou um susto tão grande que deixou cair todos os pacotinhos que carregava.", "— Ora, ora, ora! — disse ela, olhando para Lúcia. — Ora, ora!"], "leao2"), {final: true})
]};

/* ---------- Capítulo 2 ---------- */
const L2 = {id: "leao2", curto: "O fauno Tumnus", mini: svg("0 0 140 260", tumnus, {x: 0, y: 0, w: 60, e: "fade"}),
  paginas: [
  capa(2, "O fauno Tumnus", ["Lúcia atravessou o guarda-roupa, chegou a um bosque de neve e encontrou uma criatura com pernas de bode."], peca(`<svg viewBox="0 0 140 260">${tumnus}</svg>`, {x: 14, y: 8, w: 30, e: "pop", t: .1, d: 3, z: 3})),
  P("neve", neve() + peca(`<svg viewBox="0 0 140 260">${tumnus}</svg>`, {x: 6, y: 4, w: 32, e: "pop", t: .0, d: 3, z: 3}) + im("lucia", {x: 50, y: 30, w: 18, e: "dir", t: .2, d: 4, z: 4}) + fala("— Você é uma Filha de Eva?", {x: 38, y: 82, w: 54, r: 2, t: .4}),
    ["— Boa noite — disse Lúcia. Ele era um <b>fauno</b>, e se chamava <b>Sr. Tumnus</b>.", "— Você é... uma menina? Uma Filha de Eva? — perguntou ele, espantadíssimo. Ele nunca tinha visto uma criança humana!"]),
  P("neve", neve() + im("inverno2", {x: 4, y: 0, w: 42, e: "pop", t: .0, d: 1}) + placa("Nárnia", {x: 50, y: 14, w: 28, r: 4, t: .3}) + nota("sempre inverno...", {x: 50, y: 50, w: 38, r: -3, t: .45}),
    ["— Bem-vinda a <b>Nárnia</b> — disse o fauno. — Tudo isto, desde o poste até o grande castelo de Cair Paravel, lá no mar, é Nárnia.", "— E por que está tudo coberto de neve? — perguntou Lúcia."]),
  P("neve", neve() + svg("0 0 320 220", caverna, {x: 0, y: 6, w: 96, e: "pop", t: .0, d: 2, c: "moldura"}) + peca(`<svg viewBox="0 0 140 260">${tumnus}</svg>`, {x: 62, y: 30, w: 22, e: "dir", t: .3, d: 3, z: 3}),
    ["— Venha tomar um chá na minha casa — convidou o Sr. Tumnus, abrindo o guarda-chuva sobre ela.", "A casa dele era uma caverninha de pedra avermelhada, quentinha, com um tapete, poltronas e uma lareira acesa."]),
  P("sala", svg("0 0 320 180", cha, {x: 0, y: 30, w: 96, e: "pop", t: .0, d: 2, z: 2}) + nota("torradas · sardinhas · bolo", {x: 20, y: 6, w: 60, r: -2, t: .4}),
    ["Que chá! Tinha um ovo cozido para cada um, torradas com manteiga, sardinhas, mel e um bolo coberto de açúcar.", "E o Sr. Tumnus contava histórias lindas de Nárnia: das festas na floresta, das ninfas dançando, dos verões de antigamente."]),
  P("sala", peca(`<svg viewBox="0 0 400 100">${flauta}</svg>`, {x: 0, y: 30, w: 100, e: "pop", t: .0, d: 2, z: 3, a: "flauta", c: "flauta-peca"}) + peca(`<svg viewBox="0 0 140 260">${tumnus}</svg>`, {x: 36, y: 50, w: 22, e: "subir", t: .2, d: 3, z: 2}),
    ["Depois, ele pegou uma flautinha estranha e começou a tocar.", "A música era tão bonita e tão calma que dava vontade de chorar, de rir e de dormir, tudo ao mesmo tempo...", dica("toque nos furinhos da flauta")]),
  P("sala", peca(`<svg viewBox="0 0 140 260">${tumnus}</svg>`, {x: 30, y: 4, w: 34, e: "pop", t: .0, d: 3, z: 3, c: "chora"}) + peca(`<div class="lagrimas"><i></i><i></i></div>`, {x: 40, y: 26, w: 14, e: "fade", t: .3, z: 4, s: "height:30%"}),
    ["De repente, o Sr. Tumnus começou a chorar. Chorou tanto que formou uma pocinha no chão!", "— Eu sou um fauno muito malvado — soluçou ele."]),
  P("magia", im1("jadis", {x: 6, y: 0, w: 36, e: "pop", t: .0, d: 2, z: 2}) + placa("a Feiticeira Branca", {x: 46, y: 20, w: 42, r: 3, t: .3}) + nota("sempre inverno, nunca Natal!", {x: 44, y: 60, w: 52, r: -3, t: .45}),
    ["Ele explicou: Nárnia estava nas mãos da <b>Feiticeira Branca</b>, que fazia ser <b>sempre inverno, e nunca Natal</b>.", "E ela tinha mandado o fauno avisar se algum dia aparecesse uma criança humana no bosque. Ele tinha que entregá-la para a Feiticeira!"]),
  P("sala", peca(`<svg viewBox="0 0 140 260">${tumnus}</svg>`, {x: 8, y: 4, w: 32, e: "pop", t: .0, d: 3, z: 3}) + im("lucia", {x: 54, y: 24, w: 20, e: "dir", t: .2, d: 4, z: 4}) + fala("— Eu não posso fazer isso com você.", {x: 30, y: 80, w: 62, r: 2, t: .4}),
    ["— Mas agora que eu conheço você — disse ele —, eu não consigo. Eu não vou entregar você. Vamos, rápido, antes que a Feiticeira descubra!"]),
  P("noite", `<div class="ceu">${estrelas()}</div>` + neve() + svg("0 0 100 300", poste(true), {x: 20, y: 0, w: 12, e: "pop", t: .0, d: 2, s: "height:92%"}) + svg("0 0 200 290", guardaRoupa, {x: 52, y: 20, w: 32, e: "dir", t: .3, d: 3, z: 3}),
    fim(["O fauno levou Lúcia de volta até o poste. Ela deu a ele o seu lencinho para enxugar as lágrimas.", "E Lúcia correu entre as árvores... e de repente estava de novo entre os casacos, dentro do guarda-roupa!"], "leao3"), {final: true})
]};

/* ---------- Capítulo 3 ---------- */
const L3 = {id: "leao3", curto: "Edmundo e o trenó", mini: im("treno", {x: 0, y: 0, w: 100, e: "fade"}),
  paginas: [
  capa(3, "Edmundo e o trenó", ["Lúcia voltou de Nárnia e foi correndo contar tudo aos irmãos."], im("treno", {x: 6, y: 30, w: 50, e: "esq", t: .1, d: 3, z: 3})),
  P("sala", im("tres", {x: 30, y: 26, w: 50, e: "dir", t: .1, d: 3, z: 3}) + im("lucia", {x: 4, y: 20, w: 18, e: "pop", t: .0, d: 4, z: 4}) + fala("— Eu fiquei horas fora!", {x: 4, y: 80, w: 46, r: -2, t: .4}),
    ["— Eu voltei! Estou bem! — gritou Lúcia.", "Mas os irmãos nem tinham sentido falta dela. Para eles, Lúcia tinha sumido só por um minutinho!"]),
  P("sala", svg("0 0 200 290", guardaRoupa, {x: 10, y: 2, w: 36, e: "pop", t: .0, d: 2, c: "fechado"}) + im("tres", {x: 48, y: 30, w: 46, e: "dir", t: .2, d: 3, z: 3}) + fala("— É só um guarda-roupa!", {x: 46, y: 8, w: 46, r: 3, t: .4}),
    ["Eles foram ver o guarda-roupa. Mas, dessa vez, lá no fundo, só tinha madeira. Madeira comum!", "— Você inventou tudo, Lúcia — disseram. E o Edmundo foi o pior: ficou caçoando dela o dia inteiro."]),
  P("sala", svg("0 0 200 290", guardaRoupa, {x: 30, y: 2, w: 36, e: "pop", t: .0, d: 2}) + im("edmundo", {x: 66, y: 30, w: 18, e: "dir", t: .2, d: 4, z: 4}) + nota("esconde-esconde", {x: 4, y: 20, w: 34, r: -3, t: .4}),
    ["Dias depois, brincando de esconde-esconde, Lúcia se escondeu de novo no guarda-roupa.", "E o Edmundo, querendo implicar com ela, entrou atrás."]),
  P("neve", neve() + im("inverno", {x: 0, y: 4, w: 100, e: "pop", t: .0, d: 1}) + im("edmundo", {x: 36, y: 36, w: 18, e: "subir", t: .3, d: 4, z: 4}) + fala("— Lúcia? Cadê você?", {x: 50, y: 80, w: 44, r: 3, t: .5}),
    ["Ele foi tateando no escuro... e saiu no bosque de neve! A Lúcia estava certa!", "— Lúcia? Lú! — chamou ele. Mas a Lúcia não estava ali."]),
  P("neve", neve() + peca(`<svg viewBox="0 0 400 100">${sinos}</svg>`, {x: 0, y: 14, w: 100, e: "pop", t: .0, d: 2, z: 3, a: "sinos", c: "sinos-peca"}) + im("treno", {x: 10, y: 44, w: 70, e: "esq", t: .2, d: 3, z: 2}),
    ["Então ele ouviu um som de sininhos: <i>dlim, dlim, dlim...</i>", "Vinha chegando um trenó puxado por renas, com sininhos nos arreios. Quem conduzia era um anão gordinho, todo de pele.", dica("toque nos sininhos do trenó")]),
  P("magia", im1("jadis", {x: 20, y: 0, w: 40, e: "subir", t: .0, d: 2, z: 2}) + im("treno", {x: 0, y: 64, w: 46, e: "esq", t: .2, d: 3, z: 3}),
    ["E sentada no trenó estava uma <b>dama altíssima</b>, toda de branco, com uma coroa de ouro e um rosto branco como a neve.", "Era a Feiticeira Branca. Mas o Edmundo não sabia disso."]),
  P("magia", im1("jadis", {x: 4, y: 0, w: 34, e: "pop", t: .0, d: 2, z: 2}) + im("edmundo", {x: 58, y: 24, w: 20, e: "dir", t: .2, d: 4, z: 4}) + fala("— O que você é?", {x: 34, y: 6, w: 32, r: 3, t: .3}) + fala("— Eu sou o Edmundo...", {x: 48, y: 82, w: 44, r: -3, t: .5}),
    ["— Quem é você? — perguntou ela, com uma voz fria. — Você é um Filho de Adão?", "— S-sim... eu sou o Edmundo — disse ele, tremendo de frio e de medo."]),
  P("magia", im1("jadis", {x: 30, y: 0, w: 38, e: "pop", t: .0, d: 2, z: 2}) + nota("— Sente aqui no trenó...", {x: 4, y: 74, w: 46, r: -3, t: .3}),
    ["Quando a dama soube que ele tinha dois irmãos e duas irmãs, os olhos dela brilharam de um jeito estranho.", "De repente, ela ficou toda simpática: — Pobrezinho! Venha, sente aqui no trenó, debaixo da minha capa."]),
  P("magia", im("treno", {x: 4, y: 40, w: 60, e: "esq", t: .0, d: 3, z: 3}) + im("edmundo", {x: 60, y: 20, w: 18, e: "subir", t: .2, d: 4, z: 4}),
    fim(["E o Edmundo subiu no trenó da Feiticeira...", "O que será que ela queria com ele?"], "leao4"), {final: true})
]};

/* ---------- Capítulo 4 ---------- */
const L4 = {id: "leao4", curto: "O manjar turco", mini: svg("0 0 300 200", manjar, {x: 0, y: 0, w: 100, e: "fade"}),
  paginas: [
  capa(4, "O manjar turco", ["Edmundo subiu no trenó da dama branca, sem saber que ela era a Feiticeira."], svg("0 0 300 200", manjar, {x: 6, y: 30, w: 50, e: "zoom", t: .2, d: 3, z: 3}), "magia"),
  P("magia", im1("jadis", {x: 6, y: 0, w: 34, e: "pop", t: .0, d: 2, z: 2}) + nota("uma gota mágica", {x: 50, y: 20, w: 36, r: 3, t: .3}) + peca(`<span class="bicho">☕</span>`, {x: 56, y: 40, w: 16, e: "zoom", t: .4, z: 4, c: "emoji"}),
    ["A Feiticeira pingou uma gotinha de um frasco na neve. <i>Fsss!</i> Apareceu uma taça de bebida quente e doce.", "— Agora diga: o que você mais gosta de comer? — perguntou ela."]),
  P("magia", peca(`<svg viewBox="0 0 300 200">${manjar}</svg>`, {x: 4, y: 10, w: 72, e: "pop", t: .0, d: 2, z: 3, a: "manjar", c: "manjar-peca"}) + tag("", {x: 6, y: 80, w: 70, r: -2, e: "zoom", t: 1, z: 6, c: "fala aviso-manjar"}),
    ["— Manjar turco! — respondeu Edmundo. E ela fez aparecer uma caixa cheia de docinhos macios e açucarados.", "Mas eram docinhos enfeitiçados: quem comia um queria mais, e mais, e mais...", dica("toque nos docinhos")]),
  P("magia", im1("jadis", {x: 4, y: 0, w: 32, e: "pop", t: .0, d: 2, z: 2}) + im("edmundo", {x: 58, y: 20, w: 20, e: "dir", t: .2, d: 4, z: 4}) + nota("Pedro, Susana, Lúcia...", {x: 40, y: 80, w: 52, r: 2, t: .4}),
    ["Enquanto Edmundo comia, a Feiticeira fazia perguntas, perguntas e mais perguntas.", "E ele contou tudo: que eram quatro irmãos, que a Lúcia já tinha vindo a Nárnia, que ela tinha conhecido um fauno..."]),
  P("magia", svg("0 0 120 90", coroa, {x: 50, y: 6, w: 26, e: "cair", t: .1, d: 4, z: 4}) + im("edmundo", {x: 10, y: 20, w: 22, e: "pop", t: .0, d: 3, z: 3}) + fala("— Você será príncipe... e depois rei!", {x: 34, y: 76, w: 60, r: 2, t: .4}),
    ["— Eu gostaria tanto de ter um menino como você para ser príncipe — disse a Feiticeira. — E um dia, rei de Nárnia!", "— Mas você precisa trazer seus irmãos até a minha casa. Todos os quatro!"]),
  P("neve", neve() + svg("0 0 320 220", castelo, {x: 2, y: 6, w: 70, e: "pop", t: .0, d: 2, c: "moldura"}) + nota("entre dois morros", {x: 50, y: 70, w: 36, r: 3, t: .3}),
    ["Ela mostrou onde morava: — Está vendo aqueles dois morros? A minha casa fica bem no meio deles. Volte com seus irmãos, e eu dou para você muito mais manjar turco.", "E foi embora no trenó, tlim, tlim, tlim, sumindo na neve."]),
  P("neve", neve() + im("lucia", {x: 20, y: 24, w: 18, e: "esq", t: .0, d: 4, z: 4}) + im("edmundo", {x: 56, y: 26, w: 20, e: "dir", t: .1, d: 4, z: 4}) + fala("— Edmundo! Você também entrou!", {x: 10, y: 4, w: 56, r: -2, t: .3}),
    ["Logo depois, quem apareceu correndo entre as árvores? A Lúcia!", "— Edmundo! Que bom! Você também entrou! — disse ela, feliz da vida."]),
  P("neve", neve() + im("lucia", {x: 6, y: 20, w: 20, e: "pop", t: .0, d: 4, z: 4}) + nota("a Feiticeira é má!", {x: 32, y: 30, w: 36, r: 3, t: .3}),
    ["Lúcia contou que tinha visitado o Sr. Tumnus de novo, e que ele tinha explicado tudo sobre a terrível Feiticeira Branca.", "Edmundo ficou quieto. Ele tinha um pressentimento de que a dama do trenó... era ela."]),
  P("cinza", im("edmundo", {x: 30, y: 10, w: 24, e: "pop", t: .0, d: 3, z: 3, c: "enjoado"}) + nota("enjoado de tanto doce", {x: 56, y: 40, w: 40, r: 3, t: .3}),
    ["Mas ele não falou nada. A boca dele ainda tinha gosto de manjar, e ele estava enjoado de tanto doce.", "E só pensava em comer mais."]),
  P("sala", svg("0 0 200 290", guardaRoupa, {x: 30, y: 2, w: 36, e: "pop", t: .0, d: 2}) + im("lucia", {x: 6, y: 34, w: 18, e: "esq", t: .2, d: 4, z: 4}) + im("edmundo", {x: 68, y: 34, w: 18, e: "dir", t: .3, d: 4, z: 4}),
    fim(["Os dois voltaram pelo guarda-roupa. — Agora o Pedro e a Susana vão acreditar em mim! — disse Lúcia.", "Será?"], "leao5"), {final: true})
]};

/* ---------- Capítulo 5 ---------- */
const L5 = {id: "leao5", curto: "O professor e a lógica", mini: svg("0 0 120 270", professor, {x: 0, y: 0, w: 60, e: "fade"}),
  paginas: [
  capa(5, "O professor e a lógica", ["Lúcia e Edmundo voltaram juntos de Nárnia. Agora todo mundo ia acreditar na Lúcia... não ia?"], svg("0 0 120 270", professor, {x: 18, y: 8, w: 22, e: "pop", t: .1, d: 3, z: 3}), "sepia"),
  P("sala", im("tres", {x: 30, y: 26, w: 52, e: "dir", t: .0, d: 3, z: 3}) + im("lucia", {x: 4, y: 20, w: 18, e: "pop", t: .1, d: 4, z: 4}) + fala("— O Edmundo também viu!", {x: 4, y: 80, w: 46, r: -2, t: .3}),
    ["— Pedro! Susana! — gritou Lúcia. — É verdade! O Edmundo também esteve em Nárnia!"]),
  P("sala", im("edmundo", {x: 30, y: 10, w: 22, e: "pop", t: .0, d: 3, z: 3}) + fala("— Era só brincadeira...", {x: 50, y: 20, w: 42, r: 3, t: .3}),
    ["Mas o Edmundo fez uma coisa muito feia. Ele deu uma risadinha e disse:", "— Ah, a gente estava só brincando de faz de conta. Não existe Nárnia nenhuma."]),
  P("sala", im("lucia", {x: 30, y: 10, w: 22, e: "pop", t: .0, d: 3, z: 3}) + peca(`<div class="lagrimas"><i></i><i></i></div>`, {x: 32, y: 20, w: 16, e: "fade", t: .3, z: 4, s: "height:30%"}),
    ["A Lúcia saiu correndo da sala, chorando muito.", "O Pedro ficou bravo com o Edmundo. Mas também não acreditava em Nárnia. E agora ele e a Susana estavam preocupados com a irmãzinha."]),
  P("sala", svg("0 0 300 300", N.estante(), {x: 0, y: 0, w: 30, e: "esq", t: .0, d: 1, s: "height:100%", c: "fundo-cena"}) + svg("0 0 120 270", professor, {x: 36, y: 6, w: 24, e: "pop", t: .1, d: 3, z: 3}) + im("susana", {x: 70, y: 16, w: 14, e: "dir", t: .2, d: 4, z: 4}),
    ["Pedro e Susana foram conversar com o professor.", "Ele ouviu tudo com muita atenção, mexendo na barba. E depois fez uma pergunta que eles não esperavam."]),
  P("sepia", svg("0 0 120 270", professor, {x: 2, y: 4, w: 22, e: "pop", t: .0, d: 3, z: 3}) +
    peca(`<div class="escolha"><button data-v="mentira">A Lúcia está mentindo</button><button data-v="maluca">A Lúcia está maluca</button><button data-v="verdade">A Lúcia diz a verdade</button></div><span class="resposta"></span>`, {x: 30, y: 10, w: 66, e: "zoom", t: .2, z: 6, a: "logica"}),
    ["— Só existem três possibilidades — disse o professor. — Ou a sua irmã está mentindo, ou ficou maluca, ou está dizendo a verdade.", dica("toque numa das respostas")]),
  P("sepia", svg("0 0 120 270", professor, {x: 30, y: 4, w: 24, e: "pop", t: .0, d: 3, z: 3}) + nota("Lógica!", {x: 60, y: 20, w: 22, r: 4, t: .3, c: "numero"}),
    ["— E o tempo? — perguntou Pedro. — Ela ficou horas lá, mas aqui não passou nem um minuto!", "— Se existe um outro mundo — respondeu o professor, sorrindo —, por que ele teria o mesmo tempo que o nosso? Lógica! O que é que ensinam nas escolas hoje em dia?"]),
  P("cinza", svg("0 0 320 200", casaGrande, {x: 0, y: 4, w: 70, e: "esq", t: .0, d: 1}) + nota("visitantes!", {x: 66, y: 20, w: 28, r: 4, t: .3}) + nota("— Fujam!", {x: 70, y: 50, w: 22, r: -4, t: .45}),
    ["Alguns dias depois, chegou um grupo de visitantes para conhecer a casa antiga do professor.", "As crianças não queriam ser encontradas pela governanta, que era bem rabugenta. Então correram para se esconder..."]),
  P("sala", svg("0 0 200 290", guardaRoupa, {x: 30, y: 2, w: 36, e: "pop", t: .0, d: 2}) + im("tres", {x: 0, y: 50, w: 36, e: "esq", t: .2, d: 4, z: 4}) + im("susana", {x: 70, y: 30, w: 14, e: "dir", t: .3, d: 4, z: 4}),
    ["...e onde vocês acham que eles se esconderam? Isso mesmo: no guarda-roupa! Os quatro juntos, empurrando os casacos."]),
  P("neve", neve() + im("inverno", {x: 0, y: 4, w: 100, e: "pop", t: .0, d: 1}) + im("tres", {x: 20, y: 46, w: 48, e: "subir", t: .3, d: 4, z: 4}) + im("susana", {x: 70, y: 40, w: 14, e: "subir", t: .4, d: 4, z: 4}),
    fim(["Foram entrando, entrando... e de repente sentiram frio nos pés. Neve!", "Os quatro irmãos estavam em Nárnia."], "leao6"), {final: true})
]};

/* ---------- Capítulo 6 ---------- */
const L6 = {id: "leao6", curto: "A floresta e o pisco", mini: im("pisco", {x: 0, y: 0, w: 100, e: "fade"}),
  paginas: [
  capa(6, "A floresta e o pisco", ["Os quatro irmãos se esconderam no guarda-roupa... e chegaram juntos a Nárnia!"], neve() + im("inverno2", {x: 6, y: 6, w: 40, e: "pop", t: .1, d: 2, z: 2}), "neve"),
  P("neve", neve() + im("tres", {x: 10, y: 30, w: 54, e: "pop", t: .0, d: 3, z: 3}) + im("susana", {x: 66, y: 22, w: 15, e: "dir", t: .1, d: 3, z: 3}) + fala("— Desculpe, Lúcia!", {x: 40, y: 6, w: 38, r: 3, t: .4}),
    ["— Lúcia, me desculpe por não ter acreditado em você — disse Pedro, envergonhado. E a Lúcia desculpou na hora."]),
  P("neve", neve() + svg("0 0 200 290", guardaRoupa, {x: 4, y: 2, w: 34, e: "pop", t: .0, d: 2, c: "aberto-gr"}) + im("tres", {x: 44, y: 40, w: 50, e: "dir", t: .2, d: 3, z: 3}) + nota("casacos de pele!", {x: 44, y: 10, w: 36, r: 3, t: .4}),
    ["Estava muito frio. Então eles pegaram os casacos de pele do guarda-roupa e vestiram. Ficaram enormes neles, arrastando no chão como capas de reis!"]),
  P("neve", neve() + im("inverno2", {x: 0, y: 0, w: 44, e: "pop", t: .0, d: 1}) + im("edmundo", {x: 60, y: 30, w: 18, e: "dir", t: .2, d: 4, z: 4}) + fala("— Ops...", {x: 56, y: 12, w: 18, r: 3, t: .4}),
    ["— Vamos visitar o Sr. Tumnus! — disse Lúcia.", "E, sem querer, o Edmundo deixou escapar: — Sim, vamos para o lado do poste... Todos olharam para ele. Ele já tinha estado ali! Tinha mentido para todos."]),
  P("escuro", svg("0 0 320 220", tumnusVazia, {x: 0, y: 6, w: 96, e: "pop", t: .0, d: 2, c: "moldura"}) + nota("a porta arrebentada...", {x: 10, y: 80, w: 46, r: -3, t: .4}),
    ["Mas, quando chegaram à caverna do fauno, levaram um susto: a porta estava arrebentada, as cadeiras quebradas, tudo jogado pelo chão e coberto de neve."]),
  P("papel", svg("0 0 320 200", caso, {x: 4, y: 4, w: 90, e: "pop", t: .0, d: 2, z: 2}) +
    peca(`<div class="aviso-papel">O fauno Tumnus foi preso por ajudar humanos e por ser amigo de Filhos de Eva.<br><br>Assinado: <b>Maugrim</b>, Capitão da Polícia Secreta.<br>VIVA A RAINHA!</div>`, {x: 14, y: 14, w: 70, e: "fade", t: .2, z: 3}),
    ["Pregado no chão havia um papel. Dizia que o Sr. Tumnus tinha sido preso pela polícia da Feiticeira, porque tinha ajudado a Lúcia."]),
  P("neve", neve() + im("lucia", {x: 30, y: 10, w: 22, e: "pop", t: .0, d: 3, z: 3}) + fala("— Temos que salvá-lo!", {x: 50, y: 30, w: 44, r: 3, t: .3}),
    ["— É tudo culpa minha — disse Lúcia, triste. — Ele me salvou, e agora foi preso por isso. Temos que ajudá-lo!", "Mas como? Eles não conheciam nada em Nárnia..."]),
  P("neve", neve() + peca(`<img src="${DIR2}pisco.webp" alt="">`, {x: 4, y: 30, w: 20, e: "zoom", t: .0, d: 4, z: 4, a: "pisco", c: "foto pisco-voa"}) + im1("bosque", {x: 50, y: 0, w: 46, e: "dir", t: .1, d: 1, c: "pedra"}) + nota("Siga o pisco!", {x: 40, y: 80, w: 40, r: 2, t: 1, c: "placa achou"}),
    ["Foi então que apareceu um <b>pisco-de-peito-ruivo</b>, um passarinho de peito vermelhinho. Ele olhava para eles e voava um pouquinho mais adiante, como quem diz: venham comigo!", dica("toque no pisco para segui-lo")]),
  P("neve", neve() + im("tres", {x: 10, y: 36, w: 48, e: "esq", t: .0, d: 3, z: 3}) + im("pisco", {x: 66, y: 10, w: 16, e: "zoom", t: .2, d: 4, z: 4}) + fala("— Será que podemos confiar?", {x: 50, y: 80, w: 46, r: -2, t: .4}),
    ["Eles seguiram o passarinho floresta adentro.", "— Será que podemos confiar nele? — cochichou o Edmundo. — Como saber de que lado ele está?"]),
  P("neve", neve() + im("castor", {x: 20, y: 30, w: 56, e: "subir", t: .1, d: 3, z: 3}) + fala("— Psiu!", {x: 64, y: 10, w: 18, r: 4, t: .4}),
    fim(["De repente, entre as árvores, alguma coisa se mexeu. Um bicho de focinho comprido e bigodes olhava para eles e fazia sinal:", "— Psiu! Por aqui!"], "leao7"), {final: true})
]};

[L1, L2, L3, L4, L5, L6].forEach(c => N.capitulo(c, "leao"));
window.Narnia.leao = {im, im1, P, capa, fim, dica, fala, placa, nota, neve, tumnus, professor, casaGrande, castelo, represa, buracoGelo, tronos, cha, caverna, DIR2};
})();
