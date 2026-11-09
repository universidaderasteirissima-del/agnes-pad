"use strict";
/* ============ O Sobrinho do Mago · capítulos 4 a 9 ============
   Usa as peças do livro (window.Narnia, em historias.js). Cada capítulo tem 10 folhas e uma brincadeira de toque.
   Ilustrações antigas em domínio público: Piranesi (Charn), Edmund Dulac (Jadis), Rosa Bonheur (Aslam),
   gravura de Pégaso do Rijksmuseum (Morango alado) e uma carruagem de aluguel em traço. O resto é desenhado aqui. */
(function(){
const N = window.Narnia; if (!N) return;
const {peca, img, svg, tag, anel, vela, estrelas, porta, lareira, poltrona, laguinho, arvore, tioAndre, botoesFim, raios, tufo, coracao, ACOES, tom} = N;
const AM = id => anel("#f2c230", "#a97a10", id), VD = id => anel("#3fbf6a", "#1d7a3e", id);
const P = (tema, cena, ps, extra = {}) => Object.assign({tema, cena, texto: ps.map(p => p.startsWith("<") ? p : `<p>${p}</p>`).join("")}, extra);
const capa = (n, nome, resumo, cena, tema = "noite") => P(tema, cena, [`<div class="sobre">As Crônicas de Nárnia</div><h1>O Sobrinho<br>do Mago</h1><div class="cap">Capítulo ${n} · ${nome}</div>`, ...resumo, `<div class="dica">role devagarinho para baixo ↓</div>`], {layout: "capa"});
const fim = (ps, prox, extra) => [...ps, `<div class="continua">${extra || "Continua no próximo capítulo..."}</div>`, botoesFim(prox, prox && prox.startsWith("leao") ? "Livro 2" : "")];
const dica = txt => `<div class="dica-toque">✨ ${txt}</div>`;
const emoji = (e, o) => peca(`<span class="bicho">${e}</span>`, Object.assign({}, o, {c: "emoji " + (o.c || "")}));

/* ---------- desenhos novos ---------- */
const solVermelho = `<defs><radialGradient id="sv"><stop offset=".55" stop-color="#d9442a"/><stop offset=".75" stop-color="#a8261a" stop-opacity=".6"/><stop offset="1" stop-color="#7a1010" stop-opacity="0"/></radialGradient></defs><circle cx="100" cy="100" r="98" fill="url(#sv)"/>`;
const sino = `<path d="M20 200 V70 Q20 10 100 10 Q180 10 180 70 V200" fill="none" stroke="#d9b25a" stroke-width="12"/><path d="M14 200 h172" stroke="#b08a3a" stroke-width="10"/>
  <g class="badalo"><path d="M100 40 v14" stroke="#b08a3a" stroke-width="5"/><path d="M70 110 Q70 56 100 56 Q130 56 130 110 L138 124 H62Z" fill="#f2c94a" stroke="#a97a10" stroke-width="3"/><circle cx="100" cy="128" r="7" fill="#a97a10"/><path d="M80 80 q6 -14 16 -16" stroke="#fff6c8" stroke-width="4" fill="none" opacity=".7"/></g>
  <g class="martelo"><rect x="140" y="150" width="8" height="44" rx="3" fill="#8a5a2a" transform="rotate(-35 144 172)"/><rect x="126" y="140" width="34" height="14" rx="4" fill="#d9b25a" transform="rotate(-35 144 172)"/></g>`;
const rachaduras = `<path d="M10 0 L40 60 L30 90 L60 140 M40 60 L90 70 L120 40 M200 0 L180 50 L210 90 L190 150 M180 50 L140 60 M300 0 L280 40 L300 80" stroke="#1a0a06" stroke-width="3" fill="none"/>`;
const estatua = (cor, coroa = true, cara = 0) => `<rect x="10" y="110" width="80" height="16" fill="#5a3a3a"/><path d="M22 110 V64 Q50 52 78 64 V110Z" fill="${cor}"/><rect x="18" y="40" width="64" height="70" rx="6" fill="#4a2a2a" opacity=".5"/>
  <circle cx="50" cy="40" r="14" fill="#e8d0c0"/>${coroa ? `<path d="M36 28 l4 -12 l5 8 l5 -10 l5 10 l5 -8 l4 12Z" fill="#d9b25a"/>` : ""}
  <path d="M44 38 h3 M53 38 h3" stroke="#222" stroke-width="2"/><path d="${["M44 47 q6 5 12 0", "M44 48 h12", "M44 50 q6 -5 12 0"][cara]}" stroke="#7a3a3a" stroke-width="2" fill="none"/>
  <path d="M30 70 h40 M30 84 h40" stroke="#d9b25a" stroke-width="2" opacity=".6"/>`;
const janelasCharn = Array.from({length: 9}, (_, i) => `<rect class="jan" data-i="${i}" x="${30 + (i % 3)*110 + (i > 5 ? 20 : 0)}" y="${30 + Math.floor(i/3)*70}" width="34" height="42" rx="16" fill="#1a0a08" stroke="#5a2a1a" stroke-width="3"/>`).join("");
const tioChique = tioAndre + `<g class="ext e1"><circle cx="78" cy="112" r="7" fill="#e85a7a"/><circle cx="78" cy="112" r="3" fill="#ffd84a"/><path d="M78 119 v10" stroke="#3a7a3a" stroke-width="3"/></g>
  <g class="ext e2"><rect x="38" y="-6" width="44" height="30" rx="3" fill="#1a1420"/><rect x="30" y="20" width="60" height="7" rx="3" fill="#1a1420"/><rect x="38" y="14" width="44" height="5" fill="#7a2a3a"/></g>
  <g class="ext e3"><circle cx="24" cy="202" r="9" fill="#f6f1e4"/><circle cx="96" cy="202" r="9" fill="#f6f1e4"/></g>
  <g class="ext e4"><rect x="98" y="150" width="5" height="96" fill="#2a1d14"/><circle cx="100" cy="150" r="7" fill="#d9b25a"/></g>`;
const poste = (aceso = true) => `<rect x="44" y="40" width="12" height="250" fill="#2a2a2e"/><rect x="34" y="282" width="32" height="14" rx="3" fill="#2a2a2e"/><path d="M30 40 h40 l-6 -26 h-28Z" fill="#2a2a2e"/>
  <rect x="38" y="16" width="24" height="22" fill="${aceso ? "#ffe08a" : "#555"}" class="${aceso ? "lampada" : ""}"/><path d="M34 14 h32 l-16 -12Z" fill="#2a2a2e"/>${aceso ? `<circle cx="50" cy="27" r="34" fill="#ffe08a" opacity=".18" class="halo"/>` : ""}`;
const colinasSol = `<rect width="400" height="240" fill="url(#ceuAm)"/><defs><linearGradient id="ceuAm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a3a7a"/><stop offset=".55" stop-color="#f3a86a"/><stop offset="1" stop-color="#ffe2a0"/></linearGradient></defs>
  <circle class="sol-nasce" cx="200" cy="200" r="50" fill="#fff0a8"/><path d="M0 190 Q80 140 160 180 Q240 130 320 170 Q370 150 400 160 V240 H0Z" fill="#6a8a4a"/><path d="M0 210 Q100 180 200 210 Q300 190 400 205 V240 H0Z" fill="#4f7a3a"/>`;
const montinhos = Array.from({length: 6}, (_, i) => `<g class="monte" data-i="${i}" transform="translate(${20 + (i % 3)*130 + (i > 2 ? 60 : 0)} ${i > 2 ? 150 : 70})"><ellipse cx="40" cy="40" rx="44" ry="26" fill="#7a5a3a"/><ellipse cx="40" cy="34" rx="36" ry="18" fill="#9a7a4a"/><path d="M20 30 q6 -8 12 0 M48 26 q6 -8 12 0" stroke="#5a8a3a" stroke-width="3" fill="none"/></g>`).join("");
const grama = `<rect width="400" height="240" fill="#8fbf5a"/><path d="M0 0 H400 V60 Q300 90 200 60 Q100 30 0 70Z" fill="#bfe08a"/>${Array.from({length: 40}, (_, i) => `<path d="M${(i*53) % 400} ${80 + (i*37) % 160} q3 -10 6 0" stroke="#5a8a3a" stroke-width="2" fill="none"/>`).join("")}`;
const regador = `<path d="M20 40 h60 v50 q0 10 -10 10 h-40 q-10 0 -10 -10Z" fill="#6a8fa0"/><path d="M80 52 L126 26" stroke="#6a8fa0" stroke-width="10" stroke-linecap="round"/><ellipse cx="128" cy="24" rx="10" ry="6" fill="#4f6f80" transform="rotate(-30 128 24)"/>
  <path d="M30 40 q20 -36 40 0" stroke="#4f6f80" stroke-width="6" fill="none"/><g class="gotas">${[0, 1, 2, 3].map(k => `<ellipse cx="${134 + k*4}" cy="${40 + k*12}" rx="3" ry="5" fill="#8fd0f0"/>`).join("")}</g>`;
const tioPlantado = `<rect x="0" y="170" width="120" height="60" fill="#7a5a3a"/>` + `<g transform="translate(0 -40)">${tioAndre}</g>` + `<rect x="0" y="196" width="120" height="44" fill="#7a5a3a"/><path d="M0 196 q60 -16 120 0" fill="#8a6a4a"/>
  ${[[30, 110], [92, 120], [60, 0], [20, 60], [100, 70], [70, 150]].map(([x, y], k) => `<g class="broto b${k}"><path d="M${x} ${y} q-10 -8 -14 4 q8 4 14 -4Z M${x} ${y} q10 -10 16 2 q-8 6 -16 -2Z" fill="#5aa04a"/></g>`).join("")}`;
const coroa = `<path d="M10 70 L20 20 L40 50 L60 10 L80 50 L100 20 L110 70Z" fill="#f2c94a" stroke="#a97a10" stroke-width="3"/><rect x="10" y="66" width="100" height="14" fill="#d9a92a"/><circle cx="60" cy="40" r="6" fill="#c0392b"/><circle cx="32" cy="58" r="4" fill="#3a7ac0"/><circle cx="88" cy="58" r="4" fill="#3a9a5a"/>`;
const montanhas = `<path d="M0 240 L70 110 L120 170 L190 60 L260 160 L320 90 L400 200 V240Z" fill="#6a7a9a"/><path d="M190 60 L210 96 L196 92 L180 104 L172 92Z M320 90 L336 120 L322 116 L308 124Z M70 110 L84 136 L70 132 L58 140Z" fill="#fff"/><path d="M0 240 L60 190 L140 220 L220 180 L300 214 L400 186 V240Z" fill="#4a5a7a"/>`;
const vale = `<rect width="400" height="240" fill="#bfe3f0"/><path d="M0 120 Q100 80 200 120 Q300 90 400 116 V240 H0Z" fill="#7ab05a"/><path d="M60 170 Q200 130 340 176" stroke="#5aa0d0" stroke-width="14" fill="none"/><path d="M0 200 Q120 170 240 200 Q320 186 400 196 V240 H0Z" fill="#5a9a44"/>
  ${[[40, 110], [90, 130], [300, 104], [350, 124], [180, 150]].map(([x, y]) => `<path d="M${x} ${y} l10 -24 l10 24Z" fill="#2f6a2e"/>`).join("")}`;
const arvoreBala = `<rect x="44" y="70" width="12" height="60" fill="#7a4a2a"/><circle cx="50" cy="56" r="40" fill="#7ab05a"/>${[[30, 40, "#e85a7a"], [62, 34, "#f2c94a"], [44, 66, "#5aa0e8"], [70, 62, "#e88a3a"], [26, 66, "#b05ae8"]].map(([x, y, c]) => `<g transform="translate(${x} ${y})"><rect x="-6" y="-4" width="12" height="8" rx="3" fill="${c}"/><path d="M-6 0 l-4 -4 v8Z M6 0 l4 -4 v8Z" fill="${c}"/></g>`).join("")}`;
const jardimPortao = `<rect width="400" height="240" fill="#2f5a2e"/><rect x="0" y="40" width="400" height="200" fill="#3f7a3a"/><path d="M0 40 Q200 10 400 40" fill="#4f8a44"/>
  <g class="portao"><rect x="140" y="70" width="58" height="170" fill="none" stroke="#f2c94a" stroke-width="6"/><rect x="202" y="70" width="58" height="170" fill="none" stroke="#f2c94a" stroke-width="6"/>
  ${[0, 1, 2, 3, 4].map(k => `<path d="M${152 + k*10} 70 v170 M${214 + k*10} 70 v170" stroke="#f2c94a" stroke-width="3"/>`).join("")}<path d="M140 70 Q200 30 260 70" stroke="#f2c94a" stroke-width="8" fill="none"/></g>
  <circle cx="200" cy="70" r="12" fill="#d9b25a"/>`;
const macaPrata = `<defs><radialGradient id="mp" cx=".35" cy=".35"><stop offset="0" stop-color="#ffffff"/><stop offset=".5" stop-color="#cfd8e0"/><stop offset="1" stop-color="#8a98a8"/></radialGradient></defs>
  <circle class="halo" cx="50" cy="56" r="46" fill="#e8f0ff" opacity=".35"/><path d="M50 30 Q24 20 18 46 Q14 80 40 90 Q50 94 60 90 Q86 80 82 46 Q76 20 50 30Z" fill="url(#mp)"/><path d="M50 30 q-2 -14 6 -22" stroke="#6b4a2a" stroke-width="4" fill="none"/><path d="M54 14 q14 -8 22 4 q-12 6 -22 -4Z" fill="#5aa04a"/>`;
const arvorePrata = `<g class="fase f0"><path d="M90 230 q10 -10 20 0" stroke="#5a3a1a" stroke-width="5" fill="none"/><ellipse cx="100" cy="226" rx="6" ry="4" fill="#cfd8e0"/></g>
  <g class="fase f1"><path d="M100 230 v-40" stroke="#4a7a3a" stroke-width="5"/><path d="M100 200 q-16 -10 -20 4 q10 6 20 -4Z M100 194 q16 -12 22 2 q-12 6 -22 -2Z" fill="#6ab05a"/></g>
  <g class="fase f2"><path d="M100 230 v-120 M100 160 l-34 -30 M100 140 l30 -34" stroke="#6b4a2a" stroke-width="12" stroke-linecap="round"/><circle cx="100" cy="110" r="44" fill="#5a9a4a"/><circle cx="66" cy="128" r="28" fill="#4f8a44"/><circle cx="132" cy="104" r="30" fill="#6ab05a"/></g>
  <g class="fase f3"><path d="M100 230 v-150 M100 170 l-60 -50 M100 140 l56 -56" stroke="#6b4a2a" stroke-width="18" stroke-linecap="round"/><circle cx="100" cy="80" r="66" fill="#4f8a44"/><circle cx="46" cy="110" r="42" fill="#5a9a4a"/><circle cx="156" cy="88" r="44" fill="#6ab05a"/></g>
  <g class="fase f4">${[[70, 60], [120, 50], [150, 96], [46, 104], [96, 108], [130, 130], [60, 140]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9" fill="#e8f0ff" stroke="#9aa8b8" stroke-width="2" class="pisca-prata"/>`).join("")}</g>
  <rect x="0" y="228" width="200" height="12" rx="4" fill="#5a3a1a"/>`;
const guardaRoupa = `<rect x="10" y="10" width="180" height="270" rx="6" fill="#6b3f1c"/><path d="M10 10 h180 l-10 -10 h-160Z" fill="#8a5a2a"/>
  <g class="neve-dentro"><rect x="20" y="22" width="160" height="246" fill="#dfe8f2"/><rect x="92" y="90" width="8" height="140" fill="#2a2a2e"/><rect x="86" y="74" width="20" height="18" fill="#ffe08a"/><circle cx="96" cy="83" r="26" fill="#ffe08a" opacity=".25"/>
  <path d="M20 210 Q100 190 180 214 V268 H20Z" fill="#fff"/>${[[40, 120], [150, 100], [60, 160], [130, 150], [40, 230]].map(([x, y]) => `<path d="M${x} ${y} l10 -30 l10 30Z" fill="#2f5a3a"/>`).join("")}</g>
  <g class="porta-gr pe"><rect x="20" y="22" width="80" height="246" fill="#7a4a24" stroke="#4a2a12" stroke-width="3"/><rect x="32" y="40" width="56" height="90" rx="20" fill="#6b3f1c"/><rect x="32" y="150" width="56" height="100" fill="#6b3f1c"/><circle cx="90" cy="150" r="5" fill="#d9b25a"/></g>
  <g class="porta-gr pd"><rect x="100" y="22" width="80" height="246" fill="#7a4a24" stroke="#4a2a12" stroke-width="3"/><rect x="112" y="40" width="56" height="90" rx="20" fill="#6b3f1c"/><rect x="112" y="150" width="56" height="100" fill="#6b3f1c"/><circle cx="110" cy="150" r="5" fill="#d9b25a"/></g>
  <rect x="20" y="276" width="20" height="10" fill="#4a2a12"/><rect x="160" y="276" width="20" height="10" fill="#4a2a12"/>`;
const casaCampo = `<rect width="300" height="200" fill="#cfe8f0"/><path d="M0 150 Q150 120 300 150 V200 H0Z" fill="#7ab05a"/><rect x="80" y="70" width="140" height="90" fill="#e8d8b8"/><path d="M70 72 L150 20 L230 72Z" fill="#a04a3a"/>
  ${[[96, 90], [176, 90]].map(([x, y]) => `<rect x="${x}" y="${y}" width="28" height="26" fill="#ffe08a"/>`).join("")}<rect x="138" y="114" width="24" height="46" fill="#6b3f1c"/><circle cx="250" cy="40" r="16" fill="#ffd84a"/>`;

/* ---------- brincadeiras ---------- */
const notas = [262, 294, 330, 392, 440, 523, 587, 659, 784];
ACOES.sino = (el, ev, fo) => {
  const n = (+el.dataset.n || 0) + 1; el.dataset.n = n;
  el.classList.remove("bate"); void el.offsetWidth; el.classList.add("bate");
  [523, 1046, 1568].forEach((f, k) => tom(f*(1 - n*.02), 2.6 + n*.6, "sine", (.05 + n*.025)/(k + 1)));
  if (n >= 3){ fo.classList.remove("treme"); void fo.offsetWidth; fo.classList.add("treme"); fo.querySelector(".rachas")?.classList.add("vis"); tom(70, 1.4, "sawtooth", .05) }
};
ACOES.janela = (el, ev, fo) => {
  const j = ev.target.closest(".jan"); if (!j) return;
  j.classList.toggle("acesa");
  const lembra = ["um mercado cheio", "crianças brincando", "um jardim", "uma festa", "músicos tocando", "uma família jantando", "um poeta escrevendo", "padeiros assando pão", "um casamento"];
  const t = fo.querySelector(".lembranca"); t.textContent = j.classList.contains("acesa") ? "antes: " + lembra[+j.dataset.i] : ""; t.classList.remove("vem"); void t.offsetWidth; t.classList.add("vem");
  tom(notas[+j.dataset.i % notas.length], .8, "triangle", .06);
};
ACOES.tio = el => {
  const n = ((+el.dataset.n || 0) % 5) + 1; el.dataset.n = n;
  el.classList.remove("e1", "e2", "e3", "e4"); for (let k = 1; k <= Math.min(n, 4); k++) el.classList.add("e" + k);
  if (n === 5){ el.dataset.n = 0; el.classList.remove("e1", "e2", "e3", "e4") }
  el.querySelector(".fala-tio").textContent = ["", "Uma flor na lapela...", "A cartola!", "Luvas brancas!", "E a bengala. Que elegância!", "Hum... melhor começar de novo."][n];
  tom(440 + n*60, .25, "triangle", .06);
};
ACOES.galope = el => {
  if (el.classList.contains("corre")) return;
  el.classList.add("corre"); setTimeout(() => el.classList.remove("corre"), 2600);
  for (let k = 0; k < 10; k++) tom(k % 2 ? 180 : 140, .08, "square", .05, k*.22);
};
ACOES.estrela = (el, ev) => {
  const e = ev.target.closest(".est"); if (!e) return;
  e.classList.add("acesa"); e.classList.remove("canta"); void e.getBoundingClientRect(); e.classList.add("canta");
  const i = +e.dataset.i; tom(notas[i % notas.length], 1.8, "sine", .08); tom(notas[i % notas.length]*2, 1.2, "sine", .02);
};
const BICHOS = ["🐘", "🦌", "🐻", "🐇", "🐸", "🦫", "🐿️", "🦉", "🐎", "🐕", "🐆", "🦔"];
ACOES.monte = (el, ev) => {
  const m = ev.target.closest(".monte"); if (!m || m.classList.contains("aberto")) return;
  m.classList.add("aberto");
  const k = (+el.dataset.n || 0); el.dataset.n = k + 1;
  const r = el.getBoundingClientRect(), b = m.getBoundingClientRect();
  const s = document.createElement("span"); s.className = "bicho-pula"; s.textContent = BICHOS[k % BICHOS.length];
  s.style.left = ((b.left + b.width/2 - r.left)/r.width*100) + "%"; s.style.top = ((b.top - r.top)/r.height*100) + "%";
  el.appendChild(s); tom(200 + k*40, .3, "triangle", .08); tom(400 + k*60, .3, "sine", .05, .12);
};
ACOES.fala = (el, ev, fo) => {
  const b = ev.target.closest(".emoji"); if (!b) return;
  const frases = {"🐘": "Que nariz comprido eu tenho!", "🦉": "Eu sou a coruja e penso muito.", "🐇": "Olá! Eu sei falar!", "🐻": "Hum... tem mel por aqui?", "🐦": "Ha! Fui eu que contei a primeira piada!", "🦌": "Salve, Aslam!", "🐸": "Croac! Quer dizer... boa tarde!"};
  const fala = el.querySelector(".balao-bicho") || fo.querySelector(".balao-bicho");
  const e = b.textContent.trim(); fala.textContent = frases[e] || "Nárnia, desperta!";
  const rb = b.getBoundingClientRect(), rc = fala.parentElement.getBoundingClientRect();
  fala.style.left = ((rb.left - rc.left)/rc.width*100) + "%"; fala.style.top = ((rb.top - rc.top)/rc.height*100 - 12) + "%";
  fala.classList.remove("vem"); void fala.offsetWidth; fala.classList.add("vem");
  tom(300 + (e.codePointAt(0) % 9)*50, .2, "square", .04); tom(380 + (e.codePointAt(0) % 7)*50, .2, "square", .04, .12);
};
ACOES.regar = (el, ev, fo) => {
  const n = (+fo.dataset.agua || 0) + 1; fo.dataset.agua = n;
  el.classList.remove("rega"); void el.offsetWidth; el.classList.add("rega");
  const t = fo.querySelector(".tio-planta"); for (let k = 0; k < Math.min(n, 6); k++) t.classList.add("b" + k);
  for (let k = 0; k < 5; k++) tom(1200 + Math.random()*800, .05, "sine", .03, k*.07);
  if (n === 6 || n === 12){ const a = fo.querySelector(".atchim"); a.classList.remove("vem"); void a.offsetWidth; a.classList.add("vem"); tom(220, .4, "sawtooth", .06) }
};
ACOES.voar = (el, ev, fo) => {
  const n = Math.min(8, (+el.dataset.n || 0) + 1); el.dataset.n = n;
  el.style.setProperty("--alto", n);
  el.classList.remove("bate-asa"); void el.offsetWidth; el.classList.add("bate-asa");
  tom(160, .25, "sine", .08); tom(120, .3, "sine", .05, .1);
  if (n === 8){ const c = fo.querySelector(".chegou"); c.classList.add("vem") }
};
ACOES.escolha = (el, ev, fo) => {
  const b = ev.target.closest("button"); if (!b) return;
  const r = fo.querySelector(".resposta");
  if (b.dataset.v === "comer"){ r.textContent = "Não, Digory! Ele prometeu levar a maçã para Aslam."; fo.querySelector(".maca-tent")?.classList.add("treme"); tom(180, .4, "sawtooth", .05) }
  else { r.textContent = "Isso! Digory guardou a maçã no bolso e não comeu nem um pedacinho. ✨"; fo.querySelector(".maca-tent")?.classList.add("guardada"); [523, 659, 784, 1046].forEach((f, k) => tom(f, .5, "triangle", .07, k*.12)) }
  r.classList.remove("vem"); void r.offsetWidth; r.classList.add("vem");
};
ACOES.plantar = el => {
  const n = Math.min(4, (+el.dataset.n || 0) + 1); el.dataset.n = n;
  el.classList.add("f" + n);
  tom([262, 330, 392, 523][n - 1], .9, "sine", .08);
  if (n === 4) [784, 988, 1175].forEach((f, k) => tom(f, 1.4, "sine", .05, .2 + k*.15));
};
ACOES.guardaRoupa = (el, ev, fo) => {
  el.classList.toggle("aberto");
  if (el.classList.contains("aberto")){ [392, 494, 587, 784].forEach((f, k) => tom(f, 1.5, "sine", .06, k*.18)); fo.querySelector(".em-breve-tag")?.classList.add("vem") }
  else tom(196, .4, "triangle", .05);
};

/* ---------- Capítulo 4 ---------- */
const CAP4 = {id: "sobrinho4", curto: "O sino e o martelo", mini: svg("0 0 200 210", sino, {x: 0, y: 0, w: 100, e: "fade"}),
  paginas: [
  capa(4, "O sino e o martelo", ["Polly e Digory colocaram os anéis verdes, deram as mãos e pularam num laguinho novo. Para onde será que eles foram?"],
    svg("0 0 200 200", solVermelho, {x: 46, y: 4, w: 40, e: "zoom", t: .0, d: 1}) + img("charn", {x: 2, y: 36, w: 62, r: -2, e: "pop", t: .15, d: 2, z: 2}) +
    svg("0 0 200 210", sino, {x: 64, y: 54, w: 24, e: "zoom", t: .45, d: 4, z: 4}), "magia"),
  P("ruina", img("charn", {x: 0, y: 4, w: 96, r: 1, e: "pop", t: .0, d: 1}) + svg("0 0 200 200", solVermelho, {x: 64, y: -6, w: 34, e: "cair", t: .2, d: 3, z: 3}) +
    tag("um sol enorme e vermelho", {x: 40, y: 82, w: 50, r: -3, e: "cair", t: .5, z: 5}),
    ["Quando os pés deles tocaram o chão, estavam num pátio de pedra enorme, todo vazio.", "O céu era de um azul tão escuro que parecia quase preto. E lá no alto havia um sol grande, velho e vermelho, cansado de tanto brilhar.", "Não havia vento, nem passarinho, nem uma plantinha sequer. Era uma cidade morta."]),
  P("ruina", img("charn", {x: 2, y: 2, w: 60, r: -3, e: "esq", t: .0, d: 2}) + img("polly-digory", {x: 58, y: 14, w: 36, r: 2, e: "pop", t: .25, d: 4, z: 4}) +
    tag("— Que lugar estranho...", {x: 4, y: 74, w: 46, r: 2, e: "zoom", t: .5, z: 6, c: "fala"}),
    ["Eles andaram por corredores gigantes, portas altíssimas e escadarias que não acabavam mais. Os passos faziam eco: toc... toc... toc...", "— Não estou gostando daqui — sussurrou Polly. — Vamos embora?", "— Só mais um pouquinho — disse Digory, curioso como sempre."]),
  P("ruina", [0, 1, 2, 3].map(i => svg("0 0 100 130", estatua(["#6a2a5a", "#2a4a6a", "#5a3a2a", "#4a2a4a"][i], true, i < 2 ? 0 : i < 3 ? 1 : 2), {x: 2 + i*24, y: 20 + (i % 2)*6, w: 22, e: "pop", t: i*.1, d: 2 + (i % 2), z: 2})).join("") +
    tag("o salão das figuras", {x: 30, y: 2, w: 40, r: -2, e: "cair", t: .5, z: 5, c: "placa"}),
    ["Até que entraram num salão imenso, cheio de figuras sentadas em tronos, todas com roupas lindas e coroas. Pareciam estátuas de cera, de tão paradas.", "Eram reis e rainhas antigos. Os primeiros tinham rostos bondosos. Mas, quanto mais eles andavam, mais os rostos ficavam orgulhosos... depois bravos... depois cruéis."]),
  P("ruina", img("jadis", {x: 20, y: 0, w: 40, r: 0, e: "pop", t: .0, d: 2, z: 2}) + tag("a última rainha", {x: 52, y: 70, w: 34, r: 3, e: "cair", t: .4, z: 5}),
    ["A última figura era a mais impressionante de todas: uma mulher muito, muito alta, com uma coroa e um olhar tão feroz que dava frio na barriga.", "— Ela é linda — disse Digory.", "— Eu não acho — respondeu Polly. — Ela parece malvada."]),
  P("ruina", svg("0 0 200 210", sino, {x: 18, y: 6, w: 50, e: "pop", t: .0, d: 2, z: 2}) + tag("Escolha, viajante...", {x: 50, y: 78, w: 40, r: -2, e: "cair", t: .4, z: 5, c: "placa"}),
    ["No meio do salão havia um arco pequeno de ouro. Pendurado nele, um sininho dourado. E ao lado, um martelinho de ouro.", "Numa pedra, letras estranhas, que de algum jeito eles conseguiam ler. Diziam mais ou menos assim:", "<p><i>“Escolha, viajante: toque o sino e enfrente o perigo... ou passe a vida inteira imaginando o que teria acontecido.”</i></p>"]),
  P("ruina", img("polly-digory", {x: 4, y: 6, w: 40, r: -2, e: "pop", t: .0, d: 3, z: 3}) +
    tag("— Não toque, Digory!", {x: 46, y: 14, w: 44, r: 3, e: "zoom", t: .3, z: 6, c: "fala"}) + tag("— Eu preciso saber!", {x: 46, y: 60, w: 40, r: -3, e: "zoom", t: .5, z: 6, c: "fala"}),
    ["— Não toque! — pediu Polly. — Não sabemos o que pode acontecer!", "— Mas eu vou ficar louco de curiosidade para sempre! — disse Digory.", "Os dois discutiram. Polly quis ir embora. E Digory, sem pensar direito, segurou o braço dela com força... e pegou o martelinho."]),
  P("ruina", svg("0 0 200 210", sino, {x: 10, y: 4, w: 60, e: "pop", t: .0, d: 2, z: 2, a: "sino"}) + svg("0 0 320 160", rachaduras, {x: 0, y: 0, w: 100, e: "fade", z: 6, c: "rachas", s: "height:60%"}),
    ["Digory bateu no sino. Um som doce e baixinho começou: <i>blim...</i>", "Mas o som não parava. Ia ficando mais forte, mais forte, cada vez mais forte...", dica("toque no sino com o martelinho, três vezes")]),
  P("ruina", img("charn", {x: 0, y: 6, w: 100, r: 0, e: "fade", t: .0, d: 1, c: "racha-img"}) + svg("0 0 320 160", rachaduras, {x: 0, y: 0, w: 100, e: "zoom", t: .2, z: 3, s: "height:70%"}) +
    tag("CRAAASH!", {x: 30, y: 60, w: 40, r: -6, e: "zoom", t: .45, z: 6, c: "numero"}),
    ["O som virou um barulho tão grande que o salão inteiro começou a tremer. Pedaços do teto caíram, as paredes racharam, a poeira subiu...", "E então, de repente... silêncio."]),
  P("magia", img("jadis", {x: 22, y: 0, w: 42, r: 0, e: "subir", t: .1, d: 3, z: 3}) + svg("0 0 100 100", AM("c4a"), {x: 2, y: 72, w: 16, e: "zoom", t: .3, d: 4, z: 4, c: "anel toca amarelo"}) + svg("0 0 100 100", VD("c4b"), {x: 72, y: 74, w: 15, e: "zoom", t: .35, d: 4, z: 4, c: "anel toca verde"}),
    fim(["No meio da poeira, alguém se mexeu.", "A última figura, a rainha alta e feroz... <b>se levantou do trono</b>.", "Ela abriu os olhos e olhou direto para as duas crianças."], "sobrinho5"), {final: true})
]};

/* ---------- Capítulo 5 ---------- */
const CAP5 = {id: "sobrinho5", curto: "A palavra execrável", mini: img("jadis", {x: 0, y: 0, w: 100, e: "fade"}),
  paginas: [
  capa(5, "A palavra execrável", ["O sino tocou, o salão desabou... e a rainha alta e feroz acordou."], img("jadis", {x: 14, y: 6, w: 38, e: "pop", t: .1, d: 2, z: 2}) + svg("0 0 200 200", solVermelho, {x: 52, y: 10, w: 30, e: "zoom", t: .3, d: 1}), "magia"),
  P("ruina", img("jadis", {x: 4, y: 0, w: 40, e: "pop", t: .0, d: 2, z: 2}) + img("digory", {x: 62, y: 30, w: 22, r: 3, e: "dir", t: .3, d: 4, z: 4}) +
    tag("— Quem me acordou?", {x: 40, y: 4, w: 40, r: 3, e: "zoom", t: .45, z: 6, c: "fala"}) + tag("— F-fui eu...", {x: 58, y: 84, w: 30, r: -3, e: "zoom", t: .6, z: 6, c: "fala"}),
    ["— Quem me acordou? Quem é o mago? — perguntou a rainha, com uma voz que fazia tudo tremer.", "— F-fui eu — disse Digory. — Mas eu não sou mago. Foi o meu tio que fez os anéis.", "A rainha segurou a mão de cada um com uma força de ferro. — Venham comigo."]),
  P("ruina", img("charn", {x: 0, y: 4, w: 70, e: "esq", t: .0, d: 1}) + img("jadis", {x: 60, y: 6, w: 32, r: 2, e: "dir", t: .2, d: 3, z: 3}) +
    tag("Jadis, rainha de Charn", {x: 6, y: 78, w: 48, r: -2, e: "cair", t: .5, z: 5, c: "placa"}),
    ["Ela os levou por corredores e escadas. Atrás deles, o salão desabava de vez.", "— Eu sou <b>Jadis</b>, a última rainha de <b>Charn</b> — disse ela, com orgulho.", "E foi assim que eles descobriram o nome daquela cidade morta."]),
  P("ruina", img("charn", {x: 0, y: 2, w: 100, e: "pop", t: .0, d: 1}) + svg("0 0 400 220", janelasCharn, {x: 4, y: 8, w: 92, e: "fade", t: .3, z: 3, a: "janela"}) +
    peca(`<span class="lembranca"></span>`, {x: 10, y: 84, w: 80, e: "fade", t: .4, z: 6, c: "etiqueta"}),
    ["Do alto do terraço, a rainha mostrou a cidade inteira: torres, palácios, pontes... tudo enorme, tudo vazio, debaixo daquele sol vermelho.", "— Isto era Charn, a maior cidade de todos os mundos.", dica("toque nas janelas para ver como era a cidade antes")]),
  P("ruina", svg("0 0 100 130", estatua("#4a2a4a", true, 2), {x: 6, y: 10, w: 28, e: "esq", t: .0, d: 2}) + svg("0 0 100 130", estatua("#2a4a6a", true, 1), {x: 64, y: 10, w: 28, e: "dir", t: .1, d: 2}) +
    tag("as duas irmãs", {x: 34, y: 2, w: 32, r: -2, e: "cair", t: .3, z: 5}) + tag("guerra!", {x: 38, y: 50, w: 22, r: 6, e: "zoom", t: .5, z: 6, c: "numero"}),
    ["A rainha contou que tinha uma irmã, e que as duas brigavam para ver quem mandaria em Charn. Houve uma guerra enorme.", "A irmã estava ganhando. Mas Jadis guardava um segredo terrível: uma palavra mágica, a <b>Palavra Execrável</b>."]),
  P("magia", img("jadis", {x: 22, y: 2, w: 36, e: "pop", t: .0, d: 2, z: 2}) + svg("0 0 200 200", solVermelho, {x: 0, y: 0, w: 30, e: "zoom", t: .2, d: 1}) +
    tag("shhhh...", {x: 60, y: 20, w: 22, r: 4, e: "zoom", t: .4, z: 5, c: "fala"}),
    ["Quem dissesse aquela palavra apagaria todos os seres vivos do mundo, menos a si mesmo.", "E foi isso que ela fez. Ela disse a palavra... e todas as pessoas, os bichos e as plantas de Charn desapareceram para sempre.", "Depois, ela se fez dormir no salão, esperando alguém tocar o sino."]),
  P("sepia", img("polly-digory", {x: 4, y: 6, w: 40, e: "pop", t: .0, d: 3, z: 3}) + svg("0 0 100 100", coracao, {x: 56, y: 30, w: 18, r: 10, e: "zoom", t: .3, d: 4, z: 4, c: "pulsa"}) +
    tag("— Mas e as pessoas?!", {x: 46, y: 70, w: 44, r: -3, e: "zoom", t: .5, z: 6, c: "fala"}),
    ["— Mas e as pessoas? — perguntou Polly, assustada.", "— Eram o <i>meu</i> povo — disse a rainha. — Eu faço o que eu quiser.", "Foi aí que Digory entendeu: aquela rainha não era só bonita. Ela era muito, muito má."]),
  P("magia", img("jadis", {x: 6, y: 2, w: 36, e: "pop", t: .0, d: 2, z: 2}) + svg("0 0 400 120", N.telhadosSil, {x: 44, y: 60, w: 54, e: "dir", t: .2, d: 3, z: 3}) +
    tag("o mundo das crianças", {x: 48, y: 40, w: 46, r: 3, e: "cair", t: .4, z: 5}),
    ["Quando a rainha descobriu que existia um outro mundo, o das crianças, os olhos dela brilharam.", "— Então vocês vão me levar até lá — disse ela. — Eu serei rainha do seu mundo também!", "Polly e Digory se olharam. Precisavam fugir, e rápido!"]),
  P("ruina", img("polly-correndo", {x: 8, y: 14, w: 26, r: -4, e: "esq", t: .0, d: 4, z: 4}) + img("digory-correndo", {x: 34, y: 8, w: 30, r: 3, e: "esq", t: .1, d: 4, z: 4}) +
    svg("0 0 100 100", AM("c5a"), {x: 70, y: 30, w: 18, e: "zoom", t: .3, d: 5, z: 5, c: "anel toca amarelo"}) + tag("— Agora!", {x: 62, y: 76, w: 24, r: -4, e: "zoom", t: .5, z: 6, c: "fala"}),
    ["— Os anéis amarelos! — cochichou Digory. — Agora!", "Os dois enfiaram a mão no bolso e tocaram os anéis amarelos, que levam de volta ao bosque..."]),
  P("bosque", N.raios + img("bosque", {x: 2, y: 0, w: 52, e: "pop", t: .0, d: 1}) + img("jadis", {x: 50, y: 4, w: 30, e: "subir", t: .3, d: 3, z: 3}) +
    tag("— Solte o meu cabelo!", {x: 46, y: 80, w: 46, r: -3, e: "zoom", t: .5, z: 6, c: "fala"}),
    fim(["Eles sentiram que estavam subindo... e saíram de novo no bosque calminho dos laguinhos.", "Mas não estavam sozinhos. Bem no último segundo, a rainha tinha agarrado o cabelo da Polly...", "E veio junto com eles!"], "sobrinho6"), {final: true})
]};

/* ---------- Capítulo 6 ---------- */
const CAP6 = {id: "sobrinho6", curto: "Os problemas do tio André", mini: svg("0 0 120 280", tioChique, {x: 0, y: 0, w: 100, e: "fade", c: "e2"}),
  paginas: [
  capa(6, "Os problemas do tio André", ["A rainha Jadis agarrou o cabelo da Polly e veio junto para o Bosque entre os Mundos."], img("bosque", {x: 4, y: 4, w: 50, e: "pop", t: .0, d: 1}) + img("jadis", {x: 40, y: 10, w: 28, e: "subir", t: .3, d: 3, z: 3}), "bosque"),
  P("bosque", N.raios + img("jadis", {x: 8, y: 6, w: 34, e: "pop", t: .0, d: 2, z: 2, c: "fraca"}) + svg("0 0 200 80", laguinho, {x: 46, y: 70, w: 50, e: "pop", t: .2, d: 3, z: 3}),
    ["No bosque, a rainha ficou pálida e fraca. Ela mal conseguia respirar! A magia dela não funcionava ali.", "— Que lugar horrível — disse ela, com medo. Era a primeira vez que ela sentia medo."]),
  P("bosque", svg("0 0 200 80", laguinho, {x: 4, y: 50, w: 70, e: "pop", t: .0, d: 2}) + svg("0 0 100 50", tufo, {x: 50, y: 42, w: 22, r: 6, e: "cair", t: .2, d: 3, z: 3}) +
    img("polly-digory", {x: 56, y: 2, w: 36, e: "pop", t: .3, d: 4, z: 4}) + svg("0 0 100 100", VD("c6a"), {x: 4, y: 10, w: 16, e: "zoom", t: .45, d: 5, z: 5, c: "anel"}),
    ["— Rápido, para o nosso laguinho! — disse Digory. Eles acharam o tufinho de grama, colocaram os anéis verdes e pularam.", "Mas a rainha, mesmo fraca, agarrou a orelha do Digory..."]),
  P("sala", svg("0 0 300 300", N.estante(), {x: 0, y: 0, w: 32, e: "esq", t: .0, d: 1, s: "height:100%", c: "fundo-cena"}) + img("jadis", {x: 34, y: 0, w: 36, e: "subir", t: .15, d: 3, z: 3}) +
    svg("0 0 120 280", tioAndre, {x: 72, y: 20, w: 22, r: 8, e: "dir", t: .35, d: 2, z: 2, c: "tremendo"}),
    ["...e — puf! — todos apareceram na sala do tio André, em Londres.", "No nosso mundo, a rainha ficou forte de novo. E ainda mais alta, mais bonita e mais assustadora.", "O tio André começou a tremer feito vara verde."]),
  P("sala", img("jadis", {x: 4, y: 0, w: 38, e: "pop", t: .0, d: 2, z: 2}) + svg("0 0 120 280", tioAndre, {x: 60, y: 14, w: 26, r: 4, e: "dir", t: .2, d: 3, z: 3}) +
    tag("— Escravo! Uma carruagem!", {x: 34, y: 82, w: 54, r: -3, e: "zoom", t: .45, z: 6, c: "fala"}),
    ["A rainha olhou para o tio André de cima a baixo.", "— Então você é o mago? Que mago mais fraquinho! — disse ela. — Agora você será meu escravo. Quero uma carruagem, agora!", "O tio André fez uma reverência tão grande que quase caiu."]),
  P("sala", peca(`<svg viewBox="0 0 120 280">${tioChique}</svg><span class="fala-tio"></span>`, {x: 30, y: 0, w: 36, e: "pop", t: .0, d: 2, z: 3, a: "tio", c: "tio-chique"}) +
    img("jadis", {x: 70, y: 10, w: 22, e: "dir", t: .2, d: 1, z: 1, c: "longe"}),
    ["E sabe o que o bobo do tio André fez? Ele achou a rainha a mulher mais maravilhosa do mundo e foi correndo se arrumar para impressioná-la.", dica("toque no tio André para arrumá-lo")]),
  P("papel", img("jadis", {x: 4, y: 4, w: 30, e: "pop", t: .0, d: 2}) + svg("0 0 120 280", tioChique, {x: 34, y: 14, w: 22, e: "pop", t: .1, d: 3, c: "e1 e2 e3"}) + img("carruagem", {x: 50, y: 50, w: 48, r: -2, e: "dir", t: .3, d: 3, z: 3}),
    ["Todo elegante, o tio André saiu com a rainha para buscar uma carruagem.", "A rainha andava pela rua como se Londres inteira já fosse dela."]),
  P("sepia", img("digory", {x: 10, y: 10, w: 30, e: "pop", t: .0, d: 3, z: 3}) + svg("0 0 100 100", coracao, {x: 50, y: 20, w: 16, e: "zoom", t: .2, d: 4, z: 4, c: "pulsa"}) +
    tag("mamãe", {x: 64, y: 30, w: 20, r: 4, e: "cair", t: .3, z: 5}) + tag("uma fruta mágica?", {x: 46, y: 64, w: 42, r: -3, e: "cair", t: .45, z: 5}),
    ["Digory ficou sozinho, pensando na mamãe, doentinha lá em cima.", "— E se em algum outro mundo existir uma fruta mágica que cure a mamãe? — pensou ele. Esse pensamento não saiu mais da cabeça dele."]),
  P("sepia", img("polly-cadeira", {x: 10, y: 6, w: 32, e: "pop", t: .0, d: 3, z: 3}) + tag("de castigo!", {x: 50, y: 30, w: 30, r: 5, e: "zoom", t: .3, z: 5, c: "numero"}),
    ["A Polly teve que voltar correndo para casa. Ela tinha sumido a manhã inteira, e a família estava preocupadíssima!", "Coitada: ficou de castigo, sem sobremesa e indo cedo para a cama."]),
  P("noite", `<div class="ceu">${estrelas()}</div>` + svg("0 0 400 120", N.telhadosSil, {x: -2, y: 72, w: 104, e: "pop", t: .0, d: 1, z: 2}) + img("digory", {x: 34, y: 34, w: 18, e: "pop", t: .3, d: 3, z: 3}),
    fim(["Digory ficou na janela, esperando, olhando a rua...", "Onde estaria a rainha? E o que ela estaria aprontando em Londres?"], "sobrinho7"), {final: true})
]};

/* ---------- Capítulo 7 ---------- */
const CAP7 = {id: "sobrinho7", curto: "Na porta da frente", mini: img("carruagem", {x: 0, y: 0, w: 100, e: "fade"}),
  paginas: [
  capa(7, "Na porta da frente", ["A rainha Jadis saiu pelas ruas de Londres com o tio André, todo arrumado."], img("carruagem", {x: 4, y: 30, w: 60, e: "esq", t: .1, d: 3, z: 3}) + svg("0 0 400 120", N.telhadosSil, {x: -2, y: 74, w: 104, e: "pop", t: .0, d: 1, z: 2})),
  P("sepia", img("digory", {x: 6, y: 8, w: 28, e: "pop", t: .0, d: 3, z: 3}) + tag("“uma fruta da terra da juventude...”", {x: 38, y: 30, w: 56, r: 2, e: "cair", t: .3, z: 5}),
    ["Lá dentro, a tia Leta conversava com uma visita sobre a mamãe do Digory.", "— Só uma fruta da terra da juventude poderia curá-la — disse a visita, suspirando.", "Digory arregalou os olhos. Será?"]),
  P("cinza", img("londres", {x: 0, y: 0, w: 100, e: "fade", t: .0, d: 1, c: "fundo-foto"}) + peca(`<img src="${N.DIR}carruagem.webp" alt=""><img class="na-carruagem" src="${N.DIR}jadis.webp" alt="">`, {x: 4, y: 40, w: 56, e: "esq", t: .2, d: 4, z: 4, a: "galope", c: "foto galopa"}),
    ["De repente: um barulho enorme na rua! Lá vinha uma carruagem a toda velocidade, com a rainha <b>em pé lá em cima</b>, chicoteando o cavalo.", "Lá dentro, o tio André se segurava, com a cartola amassada.", dica("toque na carruagem para ela galopar")]),
  P("cinza", img("ludgate", {x: 4, y: 4, w: 46, r: -2, e: "pop", t: .0, d: 2}) + tag("— Pega ladra!", {x: 52, y: 10, w: 34, r: 4, e: "zoom", t: .3, z: 6, c: "fala"}) + tag("— Polícia!", {x: 56, y: 56, w: 26, r: -4, e: "zoom", t: .45, z: 6, c: "fala"}),
    ["Atrás dela vinha uma multidão: um joalheiro gritando que ela tinha pegado as joias da loja, um policial, gente curiosa, crianças correndo...", "Que confusão!"]),
  P("cinza", svg("0 0 100 300", poste(false), {x: 8, y: 0, w: 14, e: "pop", t: .0, d: 2, s: "height:96%"}) + img("carruagem", {x: 22, y: 50, w: 46, r: 14, e: "dir", t: .2, d: 3, z: 3}) + tag("CATAPLOFT!", {x: 54, y: 20, w: 36, r: -6, e: "zoom", t: .45, z: 6, c: "numero"}),
    ["A carruagem bateu num poste de luz bem na frente da casa! O tio André saiu engatinhando, tonto.", "E a rainha pulou lá de cima, sem nenhum arranhão."]),
  P("cinza", img("jadis", {x: 20, y: 0, w: 36, e: "pop", t: .0, d: 2, z: 2}) + svg("0 0 100 300", poste(false), {x: 64, y: 0, w: 12, r: 8, e: "dir", t: .2, d: 3, s: "height:96%"}) +
    tag("a barra de ferro", {x: 56, y: 82, w: 36, r: -3, e: "cair", t: .45, z: 5}),
    ["As pessoas riam dela. Furiosa, a rainha arrancou a barra de ferro do poste com uma mão só, como se fosse um galhinho!", "E ficou balançando a barra no ar, ameaçando todo mundo."]),
  P("sepia", img("carruagem", {x: 4, y: 20, w: 54, e: "esq", t: .0, d: 3, z: 3}) + tag("o cocheiro e o cavalo Morango", {x: 40, y: 76, w: 56, r: 2, e: "cair", t: .3, z: 5}),
    ["No meio da confusão, o dono da carruagem, um cocheiro muito bondoso, só queria acalmar o seu cavalo, o <b>Morango</b>.", "— Calma, Morango, calma, meu velho — dizia ele, fazendo carinho no pescoço do cavalo."]),
  P("sepia", img("digory", {x: 8, y: 10, w: 28, e: "pop", t: .0, d: 3, z: 3}) + svg("0 0 100 100", AM("c7a"), {x: 42, y: 30, w: 16, e: "zoom", t: .2, d: 4, z: 4, c: "anel"}) +
    tag("o plano", {x: 60, y: 14, w: 22, r: 4, e: "cair", t: .3, z: 5, c: "placa"}),
    ["Digory pensou rápido: — Preciso tirar a rainha do nosso mundo!", "Ele pôs a mão no anel amarelo e esperou a hora certa. E aí... quem apareceu? A Polly! Ela tinha escapado do castigo para ver a confusão."]),
  P("sepia", img("jadis", {x: 30, y: 0, w: 32, e: "pop", t: .0, d: 2, z: 2}) + img("polly-digory", {x: 4, y: 30, w: 30, e: "esq", t: .2, d: 4, z: 4}) +
    tag("agarra o pé!", {x: 62, y: 70, w: 30, r: -4, e: "zoom", t: .45, z: 6, c: "numero"}),
    ["Digory se jogou e agarrou o calcanhar da rainha. A Polly segurou a mão do Digory.", "E, bem nessa hora, o tio André também se segurou... e o cocheiro também, e o cavalo Morango também!"]),
  P("magia", `<div class="redemoinho"></div>` + svg("0 0 100 100", AM("c7b"), {x: 30, y: 30, w: 26, e: "zoom", t: .1, d: 4, z: 4, c: "anel toca amarelo"}),
    fim(["Digory tocou no anel amarelo.", "E todos — a rainha, o tio André, o cocheiro, o cavalo, a Polly e o Digory — sumiram da rua de Londres de uma vez só!"], "sobrinho8"), {final: true})
]};

/* ---------- Capítulo 8 ---------- */
const ceuEstrelas = `<div class="estrelas-canto">${Array.from({length: 14}, (_, i) => `<i class="est" data-i="${i}" style="left:${(i*41) % 92 + 3}%;top:${(i*29) % 70 + 6}%"></i>`).join("")}</div>`;
const CAP8 = {id: "sobrinho8", curto: "A canção das estrelas", mini: svg("0 0 100 100", `<circle cx="50" cy="50" r="46" fill="#0d1530"/>${[[30, 30], [60, 24], [72, 60], [40, 66], [52, 46]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#fff6c8"/>`).join("")}`, {x: 0, y: 0, w: 100, e: "fade"}),
  paginas: [
  capa(8, "A canção das estrelas", ["A rainha, o tio André, o cocheiro, o cavalo Morango, Polly e Digory sumiram de Londres..."], `<div class="ceu">${estrelas()}</div>` + img("aslam-rosto", {x: 18, y: 18, w: 34, e: "zoom", t: .2, d: 3, z: 3})),
  P("bosque", N.raios + img("bosque", {x: 2, y: 0, w: 50, e: "pop", t: .0, d: 1}) + img("carruagem", {x: 46, y: 50, w: 48, e: "dir", t: .2, d: 3, z: 3}) + svg("0 0 200 80", laguinho, {x: 10, y: 74, w: 40, e: "pop", t: .3, d: 2, z: 2}),
    ["Todos apareceram no Bosque entre os Mundos. O cavalo Morango, com sede, foi logo beber água num laguinho.", "— Rápido, os anéis verdes! — gritou Digory. E, na pressa, eles pularam... num laguinho diferente!"]),
  P("escuro", `<div class="breu"></div>` + tag("…", {x: 40, y: 40, w: 20, e: "zoom", t: .3, z: 5, c: "fala"}),
    ["Tudo ficou escuro. Escuro de verdade. Não tinha nada: nem chão de terra, nem céu, nem vento, nem frio, nem calor.", "— Este é um mundo vazio — disse a rainha. — Um mundo que ainda não começou.", "Para espantar o medo, o cocheiro começou a cantar baixinho."]),
  P("escuro", `<div class="breu"></div>` + peca(`<div class="ondas-voz"><i></i><i></i><i></i></div>`, {x: 20, y: 30, w: 60, e: "fade", t: .2, z: 3, s: "height:40%"}),
    ["E então, lá longe, no escuro, uma <b>voz</b> começou a cantar.", "Era a voz mais bonita que alguém já ouviu. Tão bonita que quase não dava para aguentar de tanta alegria.", "Ela não cantava palavras. Era uma melodia que parecia vir de todos os lados ao mesmo tempo."]),
  P("noite", peca(ceuEstrelas, {x: 0, y: 0, w: 100, e: "fade", t: .0, z: 3, a: "estrela", s: "height:100%"}),
    ["De repente — pim! — o céu se encheu de estrelas. Elas apareceram todas de uma vez...", "E as estrelas também <b>cantavam</b>, junto com a voz!", dica("toque nas estrelas para elas cantarem")]),
  P("noite", svg("0 0 400 240", colinasSol, {x: 0, y: 0, w: 100, e: "fade", t: .0, d: 1, s: "height:100%", c: "fundo-cena amanhece"}),
    ["Aos poucos, o céu lá no fundo foi clareando. Primeiro cinza, depois rosa, depois dourado.", "Começaram a aparecer montanhas e colinas no horizonte. Um ventinho fresco soprou."]),
  P("papel", svg("0 0 400 240", colinasSol, {x: 0, y: 0, w: 100, e: "fade", t: .0, d: 1, s: "height:100%", c: "fundo-cena"}) + tag("o sol nasceu rindo", {x: 30, y: 8, w: 40, r: -3, e: "cair", t: .3, z: 5}),
    ["E o sol nasceu! Mas não era um sol velho e cansado como o de Charn. Era um sol novinho, que parecia rir de alegria.", "Pela primeira vez, eles viram onde estavam: num vale enorme, com um rio, mas ainda sem nenhuma plantinha."]),
  P("magia", img("aslam", {x: 4, y: 14, w: 66, e: "pop", t: .0, d: 2, z: 2}) + tag("Aslam", {x: 60, y: 80, w: 26, r: -3, e: "zoom", t: .4, z: 6, c: "placa"}),
    ["E então eles viram quem estava cantando.", "Era um <b>Leão</b>. Enorme, dourado, brilhante. Ele andava devagar pelo vale vazio, cantando.", "O nome dele era <b>Aslam</b>."]),
  P("sepia", img("polly-digory", {x: 4, y: 8, w: 34, e: "pop", t: .0, d: 3, z: 3}) + svg("0 0 120 280", tioAndre, {x: 44, y: 14, w: 20, r: -6, e: "dir", t: .2, d: 3, c: "tremendo"}) + img("jadis", {x: 70, y: 6, w: 24, e: "dir", t: .3, d: 2}),
    ["Polly, Digory e o cocheiro ficaram encantados. Eles queriam ouvir aquela canção para sempre.", "O tio André tremia de medo e queria fugir.", "E a rainha? Ela odiou a canção. Porque entendeu que ali havia uma magia muito mais forte do que a dela."]),
  P("magia", img("aslam-rosto", {x: 4, y: 6, w: 40, e: "zoom", t: .0, d: 2, z: 2}) + img("jadis", {x: 60, y: 6, w: 28, e: "dir", t: .2, d: 3, z: 3}) + svg("0 0 100 300", poste(false), {x: 46, y: 0, w: 10, r: -40, e: "zoom", t: .4, d: 4, z: 4, s: "height:70%"}),
    fim(["O Leão chegou mais perto, sempre cantando uma canção nova.", "Furiosa, a rainha levantou a barra de ferro que tinha arrancado do poste... e jogou com toda a força na cabeça do Leão!"], "sobrinho9"), {final: true})
]};

/* ---------- Capítulo 9 ---------- */
const CAP9 = {id: "sobrinho9", curto: "Nárnia nasce", mini: svg("0 0 100 300", poste(true), {x: 0, y: 0, w: 60, e: "fade"}),
  paginas: [
  capa(9, "Nárnia nasce", ["A rainha jogou a barra de ferro na cabeça do Leão que cantava..."], img("aslam-rosto", {x: 14, y: 10, w: 40, e: "zoom", t: .1, d: 2, z: 2}), "magia"),
  P("papel", img("aslam", {x: 30, y: 10, w: 64, e: "pop", t: .0, d: 2, z: 2}) + svg("0 0 100 300", poste(false), {x: 10, y: 50, w: 8, r: 80, e: "cair", t: .2, d: 3, z: 3, s: "height:40%"}),
    ["A barra bateu bem no meio da testa do Leão... e caiu na grama, sem fazer nadinha com ele.", "O Leão nem parou de cantar. Era como se nem tivesse percebido."]),
  P("jardim", svg("0 0 400 240", grama, {x: 0, y: 0, w: 100, e: "fade", t: .0, d: 1, s: "height:100%", c: "fundo-cena"}) + img("aslam", {x: 20, y: 30, w: 56, e: "pop", t: .2, d: 3, z: 3}),
    ["Enquanto ele cantava, a grama começou a nascer. Espalhava-se pelo vale como água verde escorrendo morro abaixo.", "Depois vieram as árvores, os arbustos, as flores. Tudo brotava ao som da canção!"]),
  P("jardim", ["#5a9a4a", "#4f8a44", "#6ab05a"].map((c, i) => svg("0 0 100 200", arvore, {x: 4 + i*30, y: 4 + (i % 2)*8, w: 24, e: "pop", t: i*.12, d: 2 + i, z: 2})).join("") +
    tag("flores!", {x: 66, y: 76, w: 22, r: 5, e: "zoom", t: .5, z: 5, c: "numero"}),
    ["As árvores cresciam tão depressa que dava para ver os galhos se esticando. Abriam-se flores de todas as cores: amarelas, roxas, vermelhas.", "Tinha cheiro de terra molhada e de primavera."]),
  P("noite", svg("0 0 100 300", poste(true), {x: 36, y: 0, w: 20, e: "subir", t: .0, d: 3, s: "height:98%"}) + tag("o poste de Nárnia", {x: 54, y: 70, w: 40, r: -2, e: "cair", t: .4, z: 5, c: "placa"}),
    ["E sabe a barra de ferro que caiu na grama? Ela também cresceu! Virou um <b>poste de luz</b> inteirinho, com a lâmpada acesa.", "Esse poste ia ficar ali por muitos e muitos anos... Guarde bem esse poste na memória!"]),
  P("sala", svg("0 0 120 280", tioAndre, {x: 20, y: 6, w: 28, e: "pop", t: .0, d: 3, z: 3}) + tag("— Vou ficar rico!", {x: 50, y: 20, w: 40, r: 4, e: "zoom", t: .3, z: 6, c: "fala"}),
    ["O tio André, em vez de achar aquilo bonito, só pensava em dinheiro:", "— Se um pedaço de ferro vira poste... eu posso plantar sucata e colher trens! Vou ficar rico!", "Que bobo!"]),
  P("papel", img("jadis", {x: 60, y: 10, w: 20, r: 6, e: "dir", t: .0, d: 3, z: 3, c: "longe"}) + tag("ela fugiu...", {x: 30, y: 30, w: 30, r: -3, e: "cair", t: .3, z: 5}),
    ["A rainha, com raiva e medo do Leão, saiu correndo e desapareceu ao longe, no meio das árvores.", "Mas ela não foi embora de vez. Ela ainda vai aparecer nessa história..."]),
  P("jardim", svg("0 0 400 240", grama, {x: 0, y: 0, w: 100, e: "fade", t: .0, d: 1, s: "height:100%", c: "fundo-cena"}) + svg("0 0 420 240", montinhos, {x: 0, y: 12, w: 100, e: "fade", t: .2, z: 3, a: "monte"}),
    ["Então a canção mudou. Ficou mais forte, mais selvagem.", "O chão começou a borbulhar, e por todo lado apareceram montinhos de terra, que cresciam, cresciam... e estouravam!", dica("toque nos montinhos de terra")]),
  P("jardim", ["🦋", "🐝", "🐦", "🦜"].map((e, i) => emoji(e, {x: 10 + i*22, y: 10 + (i % 2)*20, w: 14, e: "zoom", t: i*.1, d: 3 + i % 2, z: 3})).join("") + svg("0 0 100 200", arvore, {x: 70, y: 20, w: 24, e: "pop", t: .2, d: 2}),
    ["De dentro dos montinhos saíram bichos de todo tipo: toupeiras, cachorros, veados, sapos, panteras, até elefantes!", "Das árvores saíram passarinhos, borboletas e abelhas. O vale se encheu de vida e de barulhinhos."]),
  P("magia", img("aslam-rosto", {x: 20, y: 4, w: 40, e: "zoom", t: .0, d: 2, z: 2}) + ["🐘", "🦌", "🐇", "🐻"].map((e, i) => emoji(e, {x: 4 + i*22, y: 72, w: 12, e: "pop", t: .3 + i*.06, d: 3, z: 3})).join(""),
    fim(["O Leão andou entre os animais, escolhendo alguns de dois em dois e tocando o nariz deles com o seu nariz.", "Então, ele parou de cantar. Tudo ficou em silêncio.", "E o Leão soprou um sopro quente e comprido sobre todos..."], "sobrinho10"), {final: true})
]};

window.Narnia.capitulo(CAP4); window.Narnia.capitulo(CAP5); window.Narnia.capitulo(CAP6);
window.Narnia.capitulo(CAP7); window.Narnia.capitulo(CAP8); window.Narnia.capitulo(CAP9);
window.Narnia.parte2 = {P, capa, fim, dica, emoji, AM, VD, solVermelho, poste, coroa, montanhas, vale, arvoreBala, jardimPortao, macaPrata, arvorePrata, guardaRoupa, casaCampo, regador, tioPlantado, tioChique, grama};
})();
