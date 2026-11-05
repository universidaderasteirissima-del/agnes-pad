"use strict";
/* ============ Histórias para dormir: livro de colagens que vira com a rolagem ============
   Identidade própria (não é a do sapinho): livro antigo à noite, papel envelhecido, tinta, dourado.
   Rolar para baixo = a folha atual vira / levanta / voa e as peças da próxima folha se montam
   (pop-up de papel, recortes caindo, deslizando). Tudo é "esfregado" pela rolagem: rolar para cima desfaz.
   Ilustrações antigas em domínio público: Kate Greenaway (1879/1885) e Gustave Doré (1872).
   As outras peças (vigas, vela, porta, lareira, anéis...) são recortes desenhados aqui em SVG. */
(function(){
const DIR = "historias/sobrinho-do-mago/";
const PASSO = 1.35;                      // quantas telas de rolagem cada folha ocupa
const VIRADAS = ["virar", "levantar", "voar"];

/* ---------- peças de colagem ---------- */
/* o: {x, y, w (em % da cena), r (giro), e (entrada), t (atraso 0..1), d (profundidade p/ parallax), z, c (classe), s (estilo extra)} */
function peca(html, o){
  return `<div class="peca ${o.c || ""}" data-e="${o.e || "pop"}" data-t="${o.t || 0}" data-d="${o.d || 0}"
    style="left:${o.x}%;top:${o.y}%;width:${o.w}%;--r:${o.r || 0}deg;z-index:${o.z || 1};${o.s || ""}">${html}</div>`;
}
const img = (src, o) => peca(`<img src="${DIR}${src}.webp" alt="" draggable="false">`, Object.assign({c: "foto"}, o, {c: "foto " + (o.c || "")}));
const svg = (vb, body, o) => peca(`<svg viewBox="${vb}" ${/fundo-cena/.test(o.c || "") ? 'preserveAspectRatio="xMidYMid slice"' : ""} xmlns="http://www.w3.org/2000/svg">${body}</svg>`, o);
const tag = (txt, o) => peca(`<span>${txt}</span>`, Object.assign({}, o, {c: "etiqueta " + (o.c || "")}));

/* ---------- desenhos de papel recortado ---------- */
const nuvem = (cor = "#8f97a8") => `<path d="M20 70 Q5 70 8 55 Q4 38 24 36 Q28 14 52 18 Q66 2 86 16 Q108 6 118 28 Q142 26 140 48 Q156 56 146 70 Z" fill="${cor}" stroke="#fff8" stroke-width="2"/>`;
const chuva = () => `<div class="chuva"></div>`;
const lua = `<circle cx="50" cy="50" r="40" fill="#f3e2a9"/><circle cx="66" cy="40" r="34" fill="#16244a"/>`;
const vela = `<defs><radialGradient id="vg"><stop offset="0" stop-color="#ffd970" stop-opacity=".9"/><stop offset="1" stop-color="#ffb347" stop-opacity="0"/></radialGradient></defs>
  <circle class="halo" cx="50" cy="40" r="46" fill="url(#vg)"/>
  <path class="chama" d="M50 14 Q60 32 54 44 Q50 50 46 44 Q40 32 50 14Z" fill="#ffcf4a"/>
  <path class="chama" d="M50 26 Q55 36 52 43 Q50 46 48 43 Q45 36 50 26Z" fill="#fff4c2"/>
  <rect x="42" y="46" width="16" height="58" rx="3" fill="#f6efe0"/><path d="M42 50 q8 6 16 0" fill="#e8dcc3"/>
  <ellipse cx="50" cy="108" rx="28" ry="8" fill="#8a6a3a"/><rect x="24" y="104" width="52" height="6" rx="3" fill="#a9824a"/>
  <path d="M76 106 q14 -4 12 8 q-2 6 -8 2" fill="none" stroke="#a9824a" stroke-width="5"/>`;
const garrafas = `<g><rect x="6" y="40" width="22" height="64" rx="8" fill="#7a5a2a"/><rect x="12" y="22" width="10" height="22" rx="3" fill="#6b4c22"/><rect x="8" y="62" width="18" height="16" fill="#efe1bd"/></g>
  <g transform="translate(34 8)"><rect x="6" y="40" width="22" height="64" rx="8" fill="#5f7a3a"/><rect x="12" y="22" width="10" height="22" rx="3" fill="#4d6630"/><rect x="8" y="62" width="18" height="16" fill="#efe1bd"/></g>
  <g transform="translate(68 0) rotate(8 17 70)"><rect x="6" y="40" width="22" height="64" rx="8" fill="#8a6a2a"/><rect x="12" y="22" width="10" height="22" rx="3" fill="#6b4c22"/><rect x="8" y="62" width="18" height="16" fill="#efe1bd"/></g>`;
const caixaDagua = `<rect x="6" y="20" width="148" height="104" rx="18" fill="#7d8796"/><rect x="6" y="20" width="148" height="20" rx="10" fill="#9aa4b2"/>
  <path d="M20 60 h120 M20 88 h120" stroke="#6a7482" stroke-width="4"/><circle cx="30" cy="50" r="4" fill="#5c6573"/><circle cx="130" cy="50" r="4" fill="#5c6573"/>
  <path d="M150 50 h20 v-40" stroke="#6a7482" stroke-width="10" fill="none"/>`;
const caderno = `<rect x="4" y="6" width="92" height="66" rx="4" fill="#b54a3a" transform="rotate(-6 50 40)"/><rect x="10" y="10" width="80" height="58" fill="#f4ecd8" transform="rotate(-6 50 40)"/>
  <path d="M18 24 h60 M18 34 h56 M18 44 h62 M18 54 h40" stroke="#7b6a55" stroke-width="2.4" transform="rotate(-6 50 40)"/>`;
function vigas(cor = "#6b4426"){
  let s = `<rect width="400" height="240" fill="#2b1d14"/>`;
  for (let i = 0; i < 7; i++){                    /* vigas do teto em perspectiva, vindo até nós */
    const x = 200 + (i - 3)*20, X = 200 + (i - 3)*150;
    s += `<path d="M${x-3} 70 L${x+3} 70 L${X+16} 240 L${X-16} 240Z" fill="${i % 2 ? cor : "#7a4f2c"}"/>`;
  }
  for (let j = 0; j < 6; j++){                    /* travessas */
    const y = 70 + Math.pow(j/5, 1.7)*170, h = 3 + j*3;
    s += `<rect x="${200 - (80 + j*60)}" y="${y}" width="${2*(80 + j*60)}" height="${h}" fill="#4a2f1a"/>`;
  }
  s += `<path d="M0 0 L400 0 L280 70 L120 70Z" fill="#3a2718"/>`;
  return s;
}
const porta = `<rect x="10" y="8" width="100" height="168" rx="6" fill="#5b3a22"/><rect x="18" y="16" width="84" height="152" fill="#7b5232"/>
  <rect x="26" y="26" width="68" height="56" fill="#6b4529"/><rect x="26" y="94" width="68" height="64" fill="#6b4529"/>
  <circle cx="88" cy="96" r="6" fill="#d9b25a"/><rect class="fresta" x="18" y="166" width="84" height="7" fill="#ffd27a"/>`;
function estante(){
  const cores = ["#7a2f2a", "#2f4a6b", "#3f5a2f", "#8a6a2a", "#4b2e4a", "#a04a2a", "#2a3a3a", "#6b5a3a"];
  let s = `<rect width="300" height="300" fill="#4a2e1b"/>`, k = 0;
  for (let r = 0; r < 5; r++){
    const y = 10 + r*58; let x = 10;
    while (x < 284){
      const w = 9 + ((k*7) % 9), h = 40 + ((k*13) % 12), deit = (k % 11 === 5);
      if (x + w > 290) break;
      s += deit ? `<rect x="${x}" y="${y + 52 - 10}" width="34" height="10" fill="${cores[k % 8]}"/>` :
                  `<rect x="${x}" y="${y + 52 - h}" width="${w}" height="${h}" fill="${cores[k % 8]}"/><rect x="${x}" y="${y + 52 - h + 6}" width="${w}" height="3" fill="#d9b25a" opacity=".7"/>`;
      x += deit ? 36 : w + 1; k++;
    }
    s += `<rect x="0" y="${y + 52}" width="300" height="7" fill="#2e1c10"/>`;
  }
  return s;
}
const lareira = `<rect x="0" y="0" width="200" height="22" rx="4" fill="#6b5a4a"/><rect x="10" y="22" width="180" height="150" fill="#8a7663"/>
  <rect x="40" y="56" width="120" height="116" rx="50" ry="50" fill="#1e140e"/><rect x="40" y="110" width="120" height="62" fill="#1e140e"/>
  <g class="fogo"><path d="M60 170 Q62 120 80 100 Q78 130 92 120 Q96 92 110 78 Q112 118 126 106 Q138 130 140 170Z" fill="#e8622a"/>
  <path d="M74 170 Q78 136 92 124 Q94 146 106 138 Q112 120 118 112 Q126 140 128 170Z" fill="#ffb53b"/>
  <path d="M88 170 Q92 150 100 142 Q104 156 112 170Z" fill="#fff0a8"/></g>
  <rect x="56" y="164" width="88" height="10" rx="4" fill="#5a3a22"/>`;
const poltrona = `<path d="M30 30 Q30 6 70 6 Q110 6 110 30 L112 120 L28 120Z" fill="#7a2a2a"/><path d="M38 34 Q40 16 70 16 Q100 16 102 34 L104 110 L36 110Z" fill="#8c3532"/>
  <rect x="14" y="70" width="26" height="62" rx="12" fill="#6b2424"/><rect x="100" y="70" width="26" height="62" rx="12" fill="#6b2424"/>
  <rect x="22" y="122" width="96" height="16" rx="6" fill="#5c1f1f"/><rect x="28" y="138" width="8" height="18" fill="#3a2414"/><rect x="104" y="138" width="8" height="18" fill="#3a2414"/>`;
const gaiola = `<path d="M10 100 V40 Q10 6 50 6 Q90 6 90 40 V100Z" fill="none" stroke="#c9a24a" stroke-width="3"/>
  ${[22, 34, 46, 58, 70, 82].map(x => `<path d="M${x} 100 V${x < 50 ? 40 - (50 - x)/3 : 40 - (x - 50)/3}" stroke="#c9a24a" stroke-width="2"/>`).join("")}
  <ellipse cx="50" cy="86" rx="22" ry="13" fill="#c98a4a"/><ellipse cx="40" cy="82" rx="9" ry="8" fill="#f2e6d0"/><circle cx="66" cy="80" r="2.4" fill="#222"/><circle cx="70" cy="76" r="4" fill="#e6a77a"/>
  <rect x="6" y="100" width="88" height="8" rx="3" fill="#8a6a2a"/>`;
const casaVazia = `<path d="M10 70 L80 14 L150 70Z" fill="#4a4a5a"/><rect x="22" y="66" width="116" height="104" fill="#6a6a7a"/>
  <rect x="38" y="84" width="26" height="30" fill="#1d2233"/><rect x="96" y="84" width="26" height="30" fill="#1d2233"/><path d="M96 84 L122 114 M122 84 L110 98" stroke="#6a6a7a" stroke-width="3"/>
  <rect x="68" y="124" width="24" height="46" fill="#3a2a22"/><path d="M38 84 q8 10 0 20 M64 84 q-10 4 -6 12" stroke="#d9d9e6" stroke-width="1.2" fill="none" opacity=".8"/>
  <rect x="110" y="24" width="14" height="30" fill="#4a4a5a"/>`;
const telhadosSil = `<path d="M0 120 V70 L20 70 L20 50 L30 50 L30 70 L60 40 L90 70 L110 70 L110 30 L122 30 L122 70 L150 70 L180 44 L210 70 L230 70 L230 54 L240 54 L240 70 L270 36 L300 70 L330 70 L330 46 L342 46 L342 70 L370 50 L400 70 V120Z" fill="#0b1430"/>
  ${[[42, 86], [76, 92], [160, 88], [196, 94], [284, 86], [356, 92]].map(([x, y]) => `<rect class="janela" x="${x}" y="${y}" width="10" height="12" fill="#f5c96a"/>`).join("")}`;
function anel(cor, cor2, id){
  return `<defs><radialGradient id="g${id}"><stop offset=".5" stop-color="${cor}" stop-opacity=".0"/><stop offset=".68" stop-color="${cor}" stop-opacity=".5"/><stop offset="1" stop-color="${cor}" stop-opacity="0"/></radialGradient>
    <linearGradient id="l${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${cor2}"/><stop offset=".5" stop-color="${cor}"/><stop offset="1" stop-color="${cor2}"/></linearGradient></defs>
    <circle class="brilho" cx="50" cy="50" r="48" fill="url(#g${id})"/>
    <ellipse cx="50" cy="56" rx="24" ry="14" fill="none" stroke="#0005" stroke-width="7"/><ellipse cx="50" cy="52" rx="24" ry="14" fill="none" stroke="url(#l${id})" stroke-width="6.5"/>
    <ellipse cx="38" cy="44" rx="7" ry="2.4" fill="#fff" opacity=".7" transform="rotate(-18 38 44)"/>`;
}
const bandeja = `<ellipse cx="200" cy="120" rx="190" ry="92" fill="#6b1f1f"/><ellipse cx="200" cy="112" rx="176" ry="80" fill="#9c2f2a"/><ellipse cx="200" cy="112" rx="150" ry="62" fill="#b8423a" opacity=".5"/>`;
const casaTio = `<rect x="20" y="40" width="100" height="160" fill="#7a5a4a"/><path d="M14 44 L70 6 L126 44Z" fill="#4a3a3a"/><rect x="92" y="10" width="14" height="26" fill="#5a4440"/>
  <rect class="janela-magica" x="56" y="22" width="28" height="18" rx="9" fill="#b98cff"/>
  ${[[34, 60], [86, 60], [34, 108], [86, 108]].map(([x, y]) => `<rect x="${x}" y="${y}" width="20" height="28" fill="#f5c96a"/><path d="M${x+10} ${y} v28 M${x} ${y+14} h20" stroke="#7a5a4a" stroke-width="2"/>`).join("")}
  <rect x="58" y="156" width="24" height="44" fill="#3a2a22"/><circle cx="76" cy="180" r="2" fill="#d9b25a"/><rect x="14" y="198" width="112" height="6" fill="#4a3a3a"/>`;
const tio = `<path d="M10 140 Q12 92 50 86 L70 86 Q108 92 110 140Z" fill="#0b0710"/><rect x="48" y="66" width="24" height="24" fill="#0b0710"/>
  <ellipse cx="60" cy="50" rx="22" ry="26" fill="#0b0710"/><path d="M80 52 l12 6 l-12 4Z" fill="#0b0710"/>
  <path d="M38 40 q-12 -14 -2 -24 q4 10 10 8 q-2 -14 12 -18 q0 10 8 10 q4 -12 16 -8 q-8 8 -2 14 q10 -2 12 6 q-10 2 -12 10Z" fill="#0b0710"/>
  <circle cx="68" cy="46" r="2.2" fill="#ffe08a" class="olho"/>`;
const coracao = `<path d="M50 88 C10 60 6 30 28 20 C42 14 50 26 50 32 C50 26 58 14 72 20 C94 30 90 60 50 88Z" fill="#c9524a"/>`;
const colina = `<rect width="200" height="140" fill="#cfe3e6"/><circle cx="160" cy="30" r="16" fill="#f3d27a"/><path d="M0 90 Q50 50 100 80 Q150 50 200 76 V140 H0Z" fill="#7aa35a"/><path d="M0 110 Q60 84 120 104 Q160 92 200 100 V140 H0Z" fill="#5a8a44"/>
  <path d="M40 104 q10 -14 20 0" fill="#3a6a2e"/><path d="M14 126 Q90 116 200 128" stroke="#8fbfd6" stroke-width="6" fill="none"/>
  <g transform="translate(120 82)"><rect x="0" y="6" width="26" height="12" rx="6" fill="#7a5a3a"/><rect x="20" y="0" width="8" height="12" rx="3" fill="#7a5a3a"/><rect x="2" y="16" width="3" height="10" fill="#5a3a22"/><rect x="20" y="16" width="3" height="10" fill="#5a3a22"/></g>`;
const folhas = (cor) => `<path d="M10 50 Q30 6 70 10 Q60 50 10 50Z" fill="${cor}"/><path d="M12 48 Q40 30 66 12" stroke="#2f4a22" stroke-width="2" fill="none"/>`;
const estrelas = () => Array.from({length: 26}, (_, i) => `<i style="left:${(i*37) % 100}%;top:${(i*53) % 62}%;animation-delay:${(i % 7)*.4}s;transform:scale(${.5 + (i % 4)*.25})"></i>`).join("");

/* ---------- O Sobrinho do Mago · Capítulo 1: A porta errada ---------- */
const CAP1 = {
  id: "sobrinho1", livro: "As Crônicas de Nárnia", titulo: "O Sobrinho do Mago", capitulo: "Capítulo 1 · A porta errada",
  paginas: [
  { /* 1 · capa */
    tema: "noite", layout: "capa",
    cena: `<div class="ceu">${estrelas()}</div>` +
      svg("0 0 100 100", lua, {x: 76, y: 2, w: 16, e: "cair", t: .05, d: 2}) +
      svg("0 0 400 120", telhadosSil, {x: -2, y: 74, w: 104, e: "pop", t: .0, d: 1, z: 2}) +
      img("polly-correndo", {x: 16, y: 56, w: 21, r: -4, e: "pop", t: .25, d: 3, z: 3}) +
      img("digory-correndo", {x: 36, y: 50, w: 25, r: 3, e: "pop", t: .32, d: 3, z: 3}) +
      svg("0 0 100 100", anel("#f2c230", "#a97a10", "c1"), {x: 70, y: 52, w: 12, r: -10, e: "zoom", t: .5, d: 4, z: 4, c: "anel"}) +
      svg("0 0 100 100", anel("#3fbf6a", "#1d7a3e", "c2"), {x: 80, y: 58, w: 11, r: 12, e: "zoom", t: .58, d: 4, z: 4, c: "anel"}),
    texto: `<div class="sobre">As Crônicas de Nárnia</div><h1>O Sobrinho<br>do Mago</h1><div class="cap">Capítulo 1 · A porta errada</div>
      <p>Esta história aconteceu há muito, muito tempo, quando os vovôs dos nossos vovôs ainda eram crianças.</p>
      <p>É a história de como tudo começou: de como alguém descobriu, pela primeira vez, o caminho entre o nosso mundo e a terra mágica de Nárnia.</p>
      <div class="dica">role devagarinho para baixo ↓</div>`
  },
  { /* 2 · Londres */
    tema: "cinza",
    cena: img("ludgate", {x: 60, y: 4, w: 34, r: 5, e: "dir", t: .0, d: 1}) +
      img("londres", {x: 3, y: 12, w: 66, r: -3, e: "pop", t: .1, d: 2, z: 2}) +
      peca(chuva(), {x: 0, y: 0, w: 100, e: "fade", t: .45, z: 5, c: "chuvisco", s: "height:100%"}) +
      svg("0 0 160 80", nuvem("#7b8396"), {x: 0, y: -2, w: 34, e: "esq", t: .35, d: 4, z: 6}) +
      svg("0 0 160 80", nuvem("#99a1b2"), {x: 44, y: -4, w: 30, e: "dir", t: .42, d: 5, z: 6}) +
      svg("0 0 160 80", nuvem("#868ea0"), {x: 72, y: 66, w: 28, e: "dir", t: .5, d: 3, z: 6}) +
      tag("Londres, há muito tempo", {x: 8, y: 80, w: 44, r: -2, e: "cair", t: .6, z: 7}),
    texto: `<p>Naquele tempo, em Londres, as casas eram todas grudadinhas umas nas outras, em fileiras compridas, compridas. Cada casa tinha seu jardinzinho nos fundos e uma chaminé soltando fumaça.</p>
      <p>E aquele verão foi o mais chuvoso de todos: chovia, chovia e chovia... e as crianças tinham que inventar brincadeiras dentro de casa.</p>`
  },
  { /* 3 · o muro */
    tema: "jardim",
    cena: svg("0 0 80 60", folhas("#5a8a44"), {x: -4, y: 60, w: 18, r: -20, e: "esq", t: .3, d: 4, z: 4}) +
      svg("0 0 80 60", folhas("#7aa35a"), {x: 84, y: 8, w: 16, r: 140, e: "dir", t: .35, d: 4, z: 4}) +
      img("muro", {x: 6, y: 6, w: 84, r: 2, e: "pop", t: .0, d: 2, z: 2}) +
      tag("— Oi! Quem é você?", {x: 4, y: 2, w: 38, r: -5, e: "zoom", t: .45, z: 6, c: "fala"}) +
      tag("— Eu sou o Digory.", {x: 58, y: 76, w: 38, r: 4, e: "zoom", t: .6, z: 6, c: "fala"}),
    texto: `<p>Numa dessas casas morava uma menina chamada <b>Polly</b>.</p>
      <p>Um dia, brincando no jardim, ela viu uma cabeça aparecer por cima do muro. Era um menino! Ele estava com o rosto todo sujo de terra... e de choro, porque tinha acabado de chorar.</p>
      <p>— Quem é você? — perguntou Polly.<br>— Eu sou o <b>Digory</b>.</p>`
  },
  { /* 4 · Digory e a família */
    tema: "sepia",
    cena: svg("0 0 200 140", colina, {x: 44, y: 2, w: 52, r: 4, e: "dir", t: .2, d: 2, c: "moldura"}) +
      tag("saudade do campo...", {x: 52, y: 36, w: 40, r: 3, e: "cair", t: .45, z: 5}) +
      img("digory", {x: 4, y: 10, w: 36, r: -2, e: "pop", t: .0, d: 3, z: 3}) +
      svg("0 0 100 100", coracao, {x: 8, y: 74, w: 14, r: -8, e: "zoom", t: .5, d: 4, z: 4, c: "pulsa"}) +
      tag("mamãe", {x: 18, y: 86, w: 18, r: 6, e: "cair", t: .56, z: 5}) +
      svg("0 0 140 206", casaTio, {x: 56, y: 46, w: 32, r: -2, e: "pop", t: .3, d: 2, z: 3}) +
      tag("Tia Leta & Tio André", {x: 46, y: 90, w: 50, r: -3, e: "esq", t: .65, z: 5}) +
      tag("?", {x: 84, y: 44, w: 10, r: 10, e: "zoom", t: .72, z: 6, c: "numero"}),
    texto: `<p>Digory tinha vindo do campo, onde havia cavalinhos, um riacho e muito verde. Agora ele morava em Londres com a <b>tia Leta</b> e o <b>tio André</b>, porque a mamãe dele estava muito doentinha, de cama.</p>
      <p>— E o tio André é muito esquisito — cochichou Digory. — Ele fica trancado num quarto lá no alto da casa, onde ninguém pode entrar. Acho que ele é... um mago!</p>`
  },
  { /* 5 · a caverna da Polly */
    tema: "escuro",
    cena: svg("0 0 180 130", caixaDagua, {x: 50, y: 6, w: 48, e: "pop", t: .0, d: 1}) +
      img("polly-cadeira", {x: 6, y: 6, w: 32, r: 0, e: "pop", t: .15, d: 3, z: 3}) +
      svg("0 0 100 120", vela, {x: 40, y: 46, w: 16, e: "zoom", t: .35, d: 4, z: 4, c: "luz"}) +
      svg("0 0 110 110", garrafas, {x: 62, y: 60, w: 22, r: 3, e: "cair", t: .45, d: 3, z: 3}) +
      svg("0 0 100 80", caderno, {x: 80, y: 74, w: 18, r: 8, e: "cair", t: .55, d: 4, z: 4}) +
      tag("Caverna dos Contrabandistas", {x: 46, y: 0, w: 50, r: 3, e: "cair", t: .62, z: 6, c: "placa"}),
    texto: `<p>Polly tinha um segredo: no sótão da casa dela, atrás de uma portinha, ficava um cantinho escuro, bem ao lado da enorme caixa d'água.</p>
      <p>Ela chamava aquele lugar de <b>Caverna dos Contrabandistas</b>. Lá ela guardava uma caixa velha, garrafinhas de refresco de gengibre, uma vela e um caderno onde escrevia suas histórias.</p>`
  },
  { /* 6 · o túnel */
    tema: "escuro",
    cena: svg("0 0 400 240", vigas(), {x: 0, y: 0, w: 100, e: "fade", t: .0, d: 0, c: "fundo-cena", s: "height:100%"}) +
      img("telhados", {x: 54, y: 2, w: 42, r: 3, e: "dir", t: .2, d: 2, z: 2}) +
      img("polly-correndo", {x: 12, y: 30, w: 22, r: -3, e: "esq", t: .35, d: 4, z: 4}) +
      img("digory-correndo", {x: 36, y: 22, w: 26, r: 2, e: "esq", t: .45, d: 3, z: 3}) +
      tag("Cuidado! Pise só nas vigas!", {x: 50, y: 78, w: 46, r: -3, e: "cair", t: .6, z: 6, c: "placa"}),
    texto: `<p>E Polly descobriu uma coisa incrível: o sótão não acabava ali! Ele continuava, como um túnel comprido e escuro, por cima de todas as casas da fileira.</p>
      <p>Mas era preciso tomar cuidado: tinha que pisar só nas vigas de madeira. No meio delas havia só um gesso fininho... e quem pisasse ali cairia direto no quarto da casa de baixo!</p>`
  },
  { /* 7 · o plano */
    tema: "sepia",
    cena: svg("0 0 160 175", casaVazia, {x: 52, y: 4, w: 46, r: 2, e: "pop", t: .1, d: 2}) +
      tag("a casa vazia", {x: 56, y: 54, w: 36, r: -4, e: "cair", t: .3, z: 5}) +
      svg("0 0 100 120", vela, {x: 40, y: 50, w: 14, e: "zoom", t: .35, d: 4, z: 4, c: "luz"}) +
      img("polly-digory", {x: 2, y: 6, w: 46, r: -2, e: "pop", t: .0, d: 3, z: 3}) +
      ["1", "2", "3", "4", "5"].map((n, i) => tag(n, {x: 36 + i*12, y: 84 - (i % 2)*8, w: 8, r: (i % 2 ? 8 : -8), e: "cair", t: .4 + i*.06, z: 6, c: "numero"})).join(""),
    texto: `<p>No fim da fileira havia uma casa vazia, onde ninguém morava fazia muitos anos.</p>
      <p>— Vamos até lá pelo túnel? — disse Digory, com os olhos brilhando. — Dizem que ela é mal-assombrada!</p>
      <p>Então eles combinaram tudo: iam levar a vela e contar as vigas, passo por passo, para saber direitinho quando tinham chegado lá.</p>`
  },
  { /* 8 · a porta */
    tema: "escuro",
    cena: svg("0 0 400 240", vigas("#5a3820"), {x: 0, y: 0, w: 100, e: "fade", t: .0, c: "fundo-cena", s: "height:100%"}) +
      svg("0 0 120 180", porta, {x: 58, y: 14, w: 26, e: "pop", t: .15, d: 2, z: 2, c: "porta"}) +
      img("digory-correndo", {x: 20, y: 30, w: 26, r: 0, e: "esq", t: .35, d: 4, z: 4}) +
      svg("0 0 100 120", vela, {x: 6, y: 56, w: 14, e: "zoom", t: .45, d: 5, z: 5, c: "luz"}) +
      tag("— Será que é aqui?", {x: 48, y: 76, w: 40, r: 3, e: "zoom", t: .6, z: 6, c: "fala"}),
    texto: `<p>Um, dois, três... Eles foram andando no escurinho, de viga em viga, sentindo o cheiro de poeira e ouvindo a chuva no telhado.</p>
      <p>Até que, na parede, apareceu uma portinha. Por baixo dela escapava um fiozinho de luz...</p>
      <p>— Será que é aqui? — sussurrou Polly. Os dois respiraram fundo e empurraram a porta.</p>`
  },
  { /* 9 · a sala secreta */
    tema: "sala",
    cena: svg("0 0 300 300", estante(), {x: 0, y: 0, w: 40, e: "esq", t: .0, d: 1, s: "height:100%", c: "fundo-cena"}) +
      svg("0 0 200 176", lareira, {x: 42, y: 26, w: 34, e: "pop", t: .1, d: 2, z: 2, c: "lareira"}) +
      svg("0 0 140 160", poltrona, {x: 70, y: 40, w: 28, e: "pop", t: .25, d: 3, z: 3}) +
      svg("0 0 100 110", gaiola, {x: 46, y: 2, w: 14, e: "cair", t: .4, d: 3, z: 3}) +
      img("polly-digory", {x: 4, y: 22, w: 34, r: -2, e: "pop", t: .5, d: 4, z: 5}) +
      tag("a sala secreta do tio André!", {x: 48, y: 86, w: 48, r: -2, e: "cair", t: .7, z: 7, c: "placa"}),
    texto: `<p>Mas... não era a casa vazia!</p>
      <p>Era uma sala de verdade, quentinha, com livros do chão até o teto, um fogo estalando na lareira e uma poltrona de encosto bem alto, virada para o fogo. Num canto, numa gaiola, um porquinho-da-índia mexia o narizinho.</p>
      <p>Polly e Digory se olharam. Eles tinham contado errado... e entrado na <b>sala secreta do tio André</b>!</p>`
  },
  { /* 10 · os anéis */
    tema: "magia", final: true,
    cena: svg("0 0 120 140", tio, {x: 64, y: -1, w: 31, e: "subir", t: .62, z: 1, c: "sombra"}) +
      svg("0 0 140 160", poltrona, {x: 60, y: 14, w: 38, e: "dir", t: .0, d: 1, z: 2, c: "poltrona-escura"}) +
      svg("0 0 400 230", bandeja, {x: 0, y: 46, w: 90, e: "pop", t: .1, d: 2, z: 3}) +
      [[6, 52, "a", 0], [24, 49, "v", 1], [42, 48, "a", 2], [60, 51, "v", 3], [14, 69, "v", 4], [32, 68, "a", 5], [50, 68, "v", 6], [68, 66, "a", 7]].map(([x, y, c, i]) =>
        svg("0 0 100 100", c === "a" ? anel("#f2c230", "#a97a10", "r" + i) : anel("#3fbf6a", "#1d7a3e", "r" + i),
          {x, y, w: 16, r: (i*23) % 30 - 15, e: "zoom", t: .25 + i*.04, d: 4, z: 4, c: "anel toca " + (c === "a" ? "amarelo" : "verde")})).join("") +
      peca(`<span>z</span><span>z</span><span>z</span>`, {x: 14, y: 34, w: 30, e: "fade", t: .6, z: 5, c: "zumbido"}) +
      tag("— Ora, ora... visitas!", {x: 56, y: 84, w: 42, r: -3, e: "zoom", t: .78, z: 7, c: "fala"}),
    texto: `<p>Em cima da mesa havia uma bandeja vermelha. E nela, brilhando, estavam <b>anéis</b>! Arrumados em pares: um <b class="am">amarelo</b> e um <b class="vd">verde</b>, um amarelo e um verde...</p>
      <p>Eles faziam um zumbido baixinho — zzzzz — como uma abelha lá longe. Eram tão bonitos que Polly sentiu uma vontade enorme de tocar num deles...</p>
      <p>Foi então que a poltrona se mexeu. Alguém estava sentado ali o tempo todo! E uma voz disse:<br><b>— Ora, ora... visitas!</b></p>
      <div class="continua">Continua no próximo capítulo... <span>toque nos anéis ✨</span></div>
      <button class="fim">Boa noite 🌙</button>`
  }]
};
const HISTORIAS = [CAP1];

/* ---------- estilo (identidade própria do livro) ---------- */
const css = `
#livro{position:fixed; inset:0; z-index:50; display:none; overflow-y:auto; overflow-x:hidden; -webkit-overflow-scrolling:touch; touch-action:pan-y;
  --tinta:#2b2118; --ouro:#c9a24a; --noite:#0d1530; --cera:#8c2f2b; --papel:#efe3c8;
  background:radial-gradient(120% 80% at 50% 0%, #1b2a55, var(--noite) 60%, #070b1a); color:var(--tinta);
  font-family:"EB Garamond", Georgia, "Times New Roman", serif; -webkit-user-select:none; user-select:none}
#livro.on{display:block}
#livro{scrollbar-width:none} #livro::-webkit-scrollbar{display:none}
#livro .trilho{position:relative}
#livro .palco{position:sticky; top:0; height:100vh; height:100dvh; display:flex; align-items:center; justify-content:center; perspective:2400px; overflow:hidden}
#livro .poeira{position:absolute; inset:0; pointer-events:none; background:radial-gradient(60% 50% at 50% 55%, rgba(255,214,140,.12), transparent 70%)}
#livro .folha{position:absolute; width:min(94vw, calc(88dvh * 1.38)); aspect-ratio:1.38; border-radius:6px 14px 14px 6px;
  background:var(--papel) url(${DIR}papel.jpg); background-size:340px; box-shadow:0 1px 0 #fff6 inset, 0 30px 60px rgba(0,0,0,.55), 0 4px 10px rgba(0,0,0,.4);
  will-change:transform; visibility:hidden; overflow:hidden;}
#livro .folha.vis{visibility:visible}
#livro .folha.costas .cena, #livro .folha.costas .texto, #livro .folha.costas .lombada{visibility:hidden}   /* verso da folha: papel em branco */
#livro .folha::after{content:""; position:absolute; inset:0; pointer-events:none; border-radius:inherit;
  box-shadow:inset 0 0 calc(var(--u)*6) rgba(110,70,20,.35), inset calc(var(--u)*1.2) 0 calc(var(--u)*2) calc(var(--u)*-1) rgba(0,0,0,.25)}
#livro .lombada{position:absolute; left:0; top:0; bottom:0; width:calc(var(--u)*2.4); background:linear-gradient(90deg, rgba(60,30,10,.35), transparent); pointer-events:none; z-index:20}
#livro .vira{position:absolute; inset:0; pointer-events:none; z-index:30; opacity:0; border-radius:inherit}
#livro .escuro{position:absolute; inset:0; pointer-events:none; z-index:31; background:#000; opacity:0; border-radius:inherit}
#livro .cena{position:absolute; left:3%; top:5%; width:58%; height:90%; perspective:1000px}
#livro .texto{position:absolute; right:3%; top:6%; width:35%; height:88%; display:flex; flex-direction:column; justify-content:center; gap:calc(var(--u)*1.2);
  font-size:calc(var(--u)*1.95); line-height:1.42; font-weight:500; z-index:10}
#livro .texto p{margin:0; text-wrap:pretty}
#livro .texto b{font-weight:700; color:#5a2a14}
#livro .texto b.am{color:#a5760c} #livro .texto b.vd{color:#1f7a42}
#livro .texto .linha{will-change:transform, opacity}
#livro h1{font-family:"IM Fell English", Georgia, serif; font-weight:400; font-size:calc(var(--u)*5.4); line-height:.98; margin:0; color:#f1dc9a; text-shadow:0 2px 0 #0006}
#livro .sobre{font-family:"IM Fell English", serif; font-style:italic; letter-spacing:.06em; font-size:calc(var(--u)*1.8); color:var(--ouro)}
#livro .cap{font-family:"IM Fell English", serif; font-size:calc(var(--u)*2.1); color:#e9d9b0; border-top:1px solid #c9a24a88; border-bottom:1px solid #c9a24a88; padding:.2em 0; align-self:flex-start}
#livro .dica{font-style:italic; color:#c9b88a; font-size:calc(var(--u)*1.6); animation:dica 2.2s ease-in-out infinite}
@keyframes dica{50%{transform:translateY(calc(var(--u)*.8)); opacity:.6}}
#livro .continua{font-family:"IM Fell English", serif; font-style:italic; color:var(--cera); font-size:calc(var(--u)*2)}
#livro .continua span{display:block; font-family:"EB Garamond", serif; font-style:normal; font-size:calc(var(--u)*1.45); color:#7a6a50}
#livro .fim{align-self:flex-start; font-family:"IM Fell English", serif; font-size:calc(var(--u)*2.1); color:#f6e7c1; background:var(--cera); border:0; border-radius:99px;
  padding:.35em 1.1em; box-shadow:0 4px 0 #5a1a18, 0 8px 18px rgba(0,0,0,.3); cursor:pointer}
#livro .fim:active{transform:translateY(3px); box-shadow:0 1px 0 #5a1a18}

/* temas das folhas */
#livro .t-noite{background:#14214a url(${DIR}papel.jpg); background-blend-mode:multiply; color:#efe3c8}
#livro .t-noite .texto{color:#ece0c2}
#livro .t-noite .cena{left:0; top:0; width:62%; height:100%}
#livro .t-cinza{background-color:#e3ddd0}
#livro .t-jardim{background-color:#eae6cc}
#livro .t-escuro{background:#3b2a1d url(${DIR}papel.jpg); background-blend-mode:multiply}
#livro .t-escuro .texto{color:#f1e4c6} #livro .t-escuro .texto b{color:#ffd27a}
#livro .t-sala{background-color:#e8d6b4}
#livro .t-magia{background:#2a1a30 url(${DIR}papel.jpg); background-blend-mode:multiply}
#livro .t-magia .texto{color:#f3e6c8} #livro .t-magia .texto b{color:#ffe08a} #livro .t-magia .texto b.vd{color:#7fe3a0}
#livro .t-magia .continua{color:#ffb4a0} #livro .t-magia .continua span{color:#c9b8a0}

/* peças */
#livro .peca{position:absolute; transform-origin:50% 100%; will-change:transform, opacity}
#livro .peca img, #livro .peca svg{display:block; width:100%; height:auto; pointer-events:none}
#livro .peca.fundo-cena svg{height:100%; object-fit:cover}
#livro .foto img{filter:drop-shadow(0 calc(var(--u)*.5) calc(var(--u)*.6) rgba(0,0,0,.38))}
#livro .peca > svg{filter:drop-shadow(0 calc(var(--u)*.4) calc(var(--u)*.5) rgba(0,0,0,.32))}
#livro .fundo-cena > svg{filter:none; border-radius:4px}
#livro .moldura svg{border:calc(var(--u)*.7) solid #f8f1e0; box-sizing:border-box}
#livro .etiqueta{display:flex; justify-content:center}
#livro .etiqueta span{display:inline-block; background:#f8f0dc; padding:.25em .7em; font-family:"IM Fell English", Georgia, serif; font-size:calc(var(--u)*1.75);
  color:#3a2a1a; box-shadow:0 calc(var(--u)*.3) calc(var(--u)*.6) rgba(0,0,0,.3); position:relative; white-space:nowrap}
#livro .etiqueta span::before{content:""; position:absolute; left:50%; top:-.45em; width:2.6em; height:.9em; transform:translateX(-50%) rotate(-3deg); background:rgba(235,220,170,.75); box-shadow:0 1px 2px rgba(0,0,0,.15)}
#livro .etiqueta.fala span{background:#fff; border-radius:1.2em; font-style:italic}
#livro .etiqueta.fala span::before{display:none}
#livro .etiqueta.fala span::after{content:""; position:absolute; left:18%; bottom:-.5em; border:.35em solid transparent; border-top:.6em solid #fff}
#livro .etiqueta.placa span{background:#6b4426; color:#f6e3b4; border:2px dashed #c9a24a88}
#livro .etiqueta.numero span{font-size:calc(var(--u)*2.8); padding:.05em .4em; background:#f3d77a; border-radius:.2em}
#livro .ceu{position:absolute; inset:0}
#livro .ceu i{position:absolute; width:calc(var(--u)*.7); height:calc(var(--u)*.7); background:#f3e2a9; clip-path:polygon(50% 0,62% 38%,100% 50%,62% 62%,50% 100%,38% 62%,0 50%,38% 38%); animation:pisca 3s ease-in-out infinite}
@keyframes pisca{50%{opacity:.25}}
#livro .chuva{position:absolute; inset:0; background-image:repeating-linear-gradient(105deg, transparent 0 calc(var(--u)*1.6), rgba(70,90,130,.5) calc(var(--u)*1.6) calc(var(--u)*1.75));
  background-size:100% calc(var(--u)*14); animation:chove .5s linear infinite; mask-image:linear-gradient(transparent, #000 15%, #000 85%, transparent); -webkit-mask-image:linear-gradient(transparent, #000 15%, #000 85%, transparent)}
#livro .chuvisco{pointer-events:none}
@keyframes chove{to{background-position:calc(var(--u)*-3.5) calc(var(--u)*14)}}
#livro .chama{transform-origin:50% 90%; transform-box:fill-box; animation:chama .18s ease-in-out infinite alternate}
#livro .halo{animation:halo 1.6s ease-in-out infinite alternate; transform-origin:center; transform-box:fill-box}
@keyframes chama{to{transform:scale(.9,1.08) skewX(3deg)}}
@keyframes halo{to{opacity:.6; transform:scale(.92)}}
#livro .fogo{transform-origin:50% 100%; transform-box:fill-box; animation:chama .22s ease-in-out infinite alternate}
#livro .fresta{animation:halo 1.2s ease-in-out infinite alternate}
#livro .pulsa svg{animation:pulsa 1.4s ease-in-out infinite}
@keyframes pulsa{30%{transform:scale(1.12)}}
#livro .anel .brilho{animation:brilho 1.8s ease-in-out infinite alternate; transform-origin:center; transform-box:fill-box}
@keyframes brilho{to{opacity:.5; transform:scale(.85)}}
#livro .anel.toca{pointer-events:auto; cursor:pointer}
#livro .anel.zumbe svg{animation:zumbe .08s linear 10}
@keyframes zumbe{50%{transform:translate(1px,-1px) rotate(2deg)}}
#livro .zumbido{display:flex; gap:12%; justify-content:center; font-family:"IM Fell English", serif; font-style:italic; font-size:calc(var(--u)*2.6); color:#ffe08a}
#livro .zumbido span{animation:zz 1.6s ease-in-out infinite}
#livro .zumbido span:nth-child(2){animation-delay:.3s} #livro .zumbido span:nth-child(3){animation-delay:.6s}
@keyframes zz{50%{transform:translateY(-40%); opacity:.4}}
#livro .poltrona-escura svg{filter:brightness(.6) drop-shadow(0 0 calc(var(--u)*2) #000)}
#livro .sombra svg{filter:none} #livro .olho{animation:pisca 2.6s ease-in-out infinite}
#livro .janela-magica{animation:magica 1.8s ease-in-out infinite alternate}
@keyframes magica{to{fill:#7fe3a0}}
#livro .sombra-tio{width:100%; height:100%; background:#0b0710; border-radius:45% 45% 10% 10% / 30% 30% 6% 6%;
  clip-path:polygon(30% 0,70% 0,74% 22%,64% 30%,100% 44%,100% 100%,0 100%,0 44%,36% 30%,26% 22%); opacity:.92}
#livro .faisca{position:absolute; width:calc(var(--u)*1); height:calc(var(--u)*1); pointer-events:none; z-index:60;
  clip-path:polygon(50% 0,62% 38%,100% 50%,62% 62%,50% 100%,38% 62%,0 50%,38% 38%); animation:faisca .9s ease-out forwards}
@keyframes faisca{to{transform:translate(var(--dx), var(--dy)) scale(.2) rotate(180deg); opacity:0}}
.ativa-nao *{animation-play-state:paused !important}

/* capa: texto à direita, sobre o céu */
#livro .capa .texto{width:34%}

/* controles discretos (não atrapalham a leitura) */
#livro .ctl{position:fixed; z-index:60; display:flex; gap:10px; top:max(12px, env(safe-area-inset-top)); right:max(12px, env(safe-area-inset-right))}
#livro .ctl button{width:48px; height:48px; border-radius:50%; border:1px solid #c9a24a66; background:rgba(13,21,48,.6); color:#e9d9b0; font-size:22px; cursor:pointer; -webkit-backdrop-filter:blur(6px); backdrop-filter:blur(6px)}
#livro .pag{position:fixed; z-index:60; left:50%; transform:translateX(-50%); bottom:max(10px, env(safe-area-inset-bottom)); display:flex; gap:8px; align-items:center;
  font-family:"IM Fell English", serif; color:#c9b88a; font-size:16px}
#livro .pag i{width:8px; height:8px; border-radius:50%; background:#c9a24a44; transition:background .3s, transform .3s}
#livro .pag i.on{background:#e9c766; transform:scale(1.4)}
#livro.penumbra .palco{filter:brightness(.72) sepia(.15)}

@media (orientation:portrait){
  #livro .folha{width:min(94vw, calc(86dvh * .72)); aspect-ratio:.72}
  #livro .cena, #livro .t-noite .cena{left:4%; top:3%; width:92%; height:56%}
  #livro .texto, #livro .capa .texto{left:7%; right:7%; top:auto; bottom:4%; width:auto; height:38%; font-size:calc(var(--u)*3.1); gap:calc(var(--u)*1.6)}
  #livro h1{font-size:calc(var(--u)*7.6)} #livro .sobre{font-size:calc(var(--u)*2.8)} #livro .cap{font-size:calc(var(--u)*3.2)}
  #livro .dica{font-size:calc(var(--u)*2.6)} #livro .continua{font-size:calc(var(--u)*3)} #livro .continua span{font-size:calc(var(--u)*2.4)} #livro .fim{font-size:calc(var(--u)*3.2)}
  #livro .etiqueta span{font-size:calc(var(--u)*2.5)} #livro .etiqueta.numero span{font-size:calc(var(--u)*3.8)} #livro .zumbido{font-size:calc(var(--u)*4)}
}
@media (prefers-reduced-motion:reduce){ #livro *{animation:none !important} }
`;

/* ---------- montagem ---------- */
const fontes = document.createElement("link");
fontes.rel = "stylesheet";
fontes.href = "https://fonts.googleapis.com/css2?family=EB+Garamond:wght@500;700&family=IM+Fell+English:ital@0;1&display=swap";
const st = document.createElement("style"); st.textContent = css;
let L = null, folhas$ = [], pecas = [], hist = null, N = 0, raf = 0, ultimaPag = -1, aberto = false, intro = 1;

function monta(h){
  hist = h; N = h.paginas.length;
  const palco = L.querySelector(".palco");
  palco.querySelectorAll(".folha").forEach(f => f.remove());
  folhas$ = h.paginas.map((p, i) => {
    const f = document.createElement("section");
    f.className = `folha t-${p.tema || "papel"} ${p.layout || ""}`;
    f.style.zIndex = 100 - i;
    f.innerHTML = `<div class="cena">${p.cena}</div><div class="texto">${p.texto}</div><div class="lombada"></div><div class="vira"></div><div class="escuro"></div>`;
    /* cada parágrafo do texto entra como uma tirinha de papel */
    [...f.querySelector(".texto").children].forEach((el, k, a) => { el.classList.add("linha"); el.dataset.t = (.35 + k*(.4/Math.max(1, a.length - 1))).toFixed(2) });
    palco.appendChild(f);
    return f;
  });
  pecas = folhas$.map(f => [...f.querySelectorAll(".peca, .linha")].map(el => ({el, e: el.dataset.e || "sobe", t: +el.dataset.t || 0, d: +el.dataset.d || 0, r: parseFloat(el.style.getPropertyValue("--r")) || 0})));
  L.querySelector(".pag").innerHTML = h.paginas.map(() => "<i></i>").join("");
  folhas$[N - 1].querySelector(".fim").onclick = fecha;
  folhas$[N - 1].querySelectorAll(".anel.toca").forEach(a => a.addEventListener("pointerdown", e => { e.stopPropagation(); tocaAnel(a, e) }));
  medida();
}

const cl = v => v < 0 ? 0 : v > 1 ? 1 : v;
const suave = t => t*t*(3 - 2*t);
const sai = t => 1 - Math.pow(1 - t, 3);
const mola = t => { const c = 1.6; return 1 + (c + 1)*Math.pow(t - 1, 3) + c*Math.pow(t - 1, 2) };   /* passa um pouquinho e volta: papel assentando */

/* entrada de cada peça (e = 0 escondida → 1 no lugar) */
function poe(it, e, par){
  const {el, r} = it, k = it.e, q = mola(e), o = cl(e*3);
  let tr;
  if (k === "pop") tr = `rotateX(${(1 - sai(e))*-92}deg) rotate(${r}deg)`;                               /* livro pop-up: levanta do papel */
  else if (k === "cair") tr = `translateY(${(1 - q)*-70}%) rotate(${r + (1 - e)*-25}deg)`;                /* recorte caindo na mesa */
  else if (k === "esq") tr = `translateX(${(1 - q)*-60}%) rotate(${r + (1 - e)*-12}deg)`;
  else if (k === "dir") tr = `translateX(${(1 - q)*60}%) rotate(${r + (1 - e)*12}deg)`;
  else if (k === "zoom") tr = `scale(${.2 + .8*q}) rotate(${r + (1 - e)*40}deg)`;
  else if (k === "subir") tr = `translateY(${(1 - sai(e))*60}%) rotate(${r}deg)`;
  else if (k === "sobe") tr = `translateY(${(1 - sai(e))*1.2}em) rotate(${(1 - e)*-1.5}deg)`;            /* linhas do texto */
  else tr = `rotate(${r}deg)`;
  if (par && it.d) tr = `translate3d(0, ${par*it.d*-6}px, 0) ` + tr;                                    /* parallax enquanto lê */
  el.style.transform = tr;
  el.style.opacity = k === "pop" ? cl(e*5) : o;
}

/* ---------- a mágica: tudo depende só da posição da rolagem ---------- */
function quadro(){
  raf = 0; if (!aberto) return;
  const H = innerHeight, p = Math.max(0, Math.min(N - 1, L.scrollTop/(PASSO*H)));
  const atual = Math.floor(p), f = p - atual;
  for (let i = 0; i < N; i++){
    const fo = folhas$[i], vis = i >= atual - 0 && i <= atual + 1;
    fo.classList.toggle("vis", vis);
    fo.classList.toggle("ativa-nao", !(i === atual || (i === atual + 1 && f > .5)));
    if (!vis) continue;
    /* a folha de cima vai embora na segunda metade da rolagem dela */
    const sair = i === atual ? suave(cl((f - .5)/.5)) : 0, tipo = VIRADAS[i % VIRADAS.length];
    let tr = "", ori = "50% 50%";
    if (sair > 0){
      if (tipo === "virar"){ ori = "0% 50%"; tr = `rotateY(${-sair*178}deg) translateZ(${Math.sin(sair*Math.PI)*40}px)` }
      else if (tipo === "levantar"){ ori = "50% 0%"; tr = `rotateX(${sair*170}deg) translateZ(${Math.sin(sair*Math.PI)*30}px)` }
      else { ori = "30% 100%"; tr = `translate(${-sair*45}vw, ${-sair*115}vh) rotate(${-sair*38}deg) rotateY(${sair*40}deg) scale(${1 - sair*.25})` }   /* folha ao vento */
    }
    fo.style.transformOrigin = ori;
    fo.classList.toggle("costas", tipo !== "voar" && sair > .5);
    /* a de baixo "acorda": sai da sombra e cresce um tiquinho */
    const chega = i === atual + 1 ? suave(cl((f - .45)/.55)) : 1;
    fo.style.transform = tr || `scale(${.955 + .045*chega}) translateZ(0)`;
    fo.querySelector(".escuro").style.opacity = i === atual + 1 ? (1 - chega)*.55 : 0;
    const v = fo.querySelector(".vira");
    v.style.opacity = sair > 0 ? (sair > .5 ? .25 + (sair - .5)*.8 : Math.sin(sair*Math.PI)*.9) : 0;
    v.style.background = tipo === "virar" ? `linear-gradient(90deg, rgba(0,0,0,.05), rgba(0,0,0,${.15 + sair*.4}) ${60 + sair*30}%, rgba(255,250,235,.5))`
                      : `linear-gradient(${tipo === "levantar" ? 180 : 135}deg, rgba(255,250,235,.45), rgba(0,0,0,.35))`;
    /* as peças desta folha se montam (a primeira já começa montada um pouco) */
    const ent = i === 0 ? intro : cl((p - i + .55)/.95);       /* começa embaixo da folha que vira e termina já na nova */
    const par = p - i - .25;
    for (const it of pecas[i]) poe(it, cl((ent - it.t*.55)/.45), par);
  }
  if (atual !== ultimaPag){
    if (ultimaPag >= 0) farfalha();
    ultimaPag = atual;
    L.querySelectorAll(".pag i").forEach((d, k) => d.classList.toggle("on", k === atual));
    try{ localStorage.setItem("agnespad:historia:" + hist.id, String(atual)) }catch(e){}
  }
}
const pede = () => { if (!raf) raf = requestAnimationFrame(quadro) };
function medida(){
  if (!folhas$.length) return;
  const w = folhas$[0].getBoundingClientRect().width || innerWidth*.9;
  L.style.setProperty("--u", (w/100).toFixed(2) + "px");
  L.querySelector(".trilho").style.height = ((N - 1)*PASSO*innerHeight + innerHeight) + "px";
  pede();
}

/* ---------- sons suaves (Web Audio do app) ---------- */
function farfalha(){
  try{
    if (typeof AC === "undefined" || AC.state !== "running") return;
    const n = AC.sampleRate*.35, b = AC.createBuffer(1, n, AC.sampleRate), d = b.getChannelData(0);
    for (let i = 0; i < n; i++){ const t = i/n; d[i] = (Math.random()*2 - 1)*Math.pow(Math.sin(t*Math.PI), 2)*(.6 + .4*Math.sin(t*40)) }
    const s = AC.createBufferSource(), f = AC.createBiquadFilter(), g = AC.createGain();
    s.buffer = b; f.type = "bandpass"; f.frequency.value = 2400; f.Q.value = .6; g.gain.value = .18;
    s.connect(f); f.connect(g); g.connect(master); s.start();
  }catch(e){}
}
function tocaAnel(a, ev){
  a.classList.remove("zumbe"); void a.offsetWidth; a.classList.add("zumbe");
  const am = a.classList.contains("amarelo");
  try{
    if (typeof AC !== "undefined"){
      AC.resume().catch(() => {});
      const t = AC.currentTime, g = AC.createGain(); g.connect(master);
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.12, t + .08); g.gain.exponentialRampToValueAtTime(.001, t + 1.6);
      [1, 1.5, 2.01].forEach((m, k) => { const o = AC.createOscillator(); o.type = k ? "sine" : "triangle"; o.frequency.value = (am ? 220 : 196)*m; o.connect(g); o.start(t); o.stop(t + 1.7) });
    }
  }catch(e){}
  const r = L.getBoundingClientRect(), cor = am ? "#ffd84a" : "#5fe08a";
  for (let k = 0; k < 10; k++){
    const s = document.createElement("i"); s.className = "faisca";
    const ang = Math.random()*Math.PI*2, dist = 40 + Math.random()*70;
    s.style.cssText = `left:${ev.clientX - r.left}px; top:${ev.clientY - r.top + L.scrollTop}px; background:${cor}; --dx:${Math.cos(ang)*dist}px; --dy:${Math.sin(ang)*dist}px`;
    L.appendChild(s); setTimeout(() => s.remove(), 950);
  }
}

/* ---------- abrir / fechar ---------- */
document.head.appendChild(fontes);
function cria(){
  document.head.appendChild(st);
  L = document.createElement("div"); L.id = "livro";
  L.innerHTML = `<div class="trilho"><div class="palco"><div class="poeira"></div></div></div>
    <div class="ctl"><button class="lua" aria-label="Luz baixinha">🌙</button><button class="topo" aria-label="Voltar ao começo">↺</button><button class="sai" aria-label="Fechar o livro">✕</button></div>
    <div class="pag"></div>`;
  document.body.appendChild(L);
  L.addEventListener("scroll", pede, {passive: true});
  addEventListener("resize", () => { if (aberto) medida() });
  L.querySelector(".sai").onclick = fecha;
  L.querySelector(".topo").onclick = () => L.scrollTo({top: 0, behavior: "smooth"});
  L.querySelector(".lua").onclick = () => { L.classList.toggle("penumbra"); try{ localStorage.setItem("agnespad:penumbra", L.classList.contains("penumbra") ? "1" : "") }catch(e){} };
  try{ if (localStorage.getItem("agnespad:penumbra")) L.classList.add("penumbra") }catch(e){}
}
window.abreHistoria = function(id){
  if (!L) cria();
  if (typeof show === "function") show("menu");
  if (typeof stopAudio === "function") stopAudio();
  const h = HISTORIAS.find(x => x.id === id) || HISTORIAS[0];
  if (hist !== h) monta(h);
  aberto = true; ultimaPag = -1; L.classList.add("on");
  let pg = 0; try{ pg = +localStorage.getItem("agnespad:historia:" + h.id) || 0 }catch(e){}
  if (pg >= N - 1) pg = 0;                           /* terminou da última vez: começa de novo */
  intro = pg === 0 ? 0 : 1;
  requestAnimationFrame(() => {
    medida(); L.scrollTop = pg*PASSO*innerHeight; quadro();
    if (intro < 1){                                      /* a capa se monta sozinha ao abrir o livro */
      const t0 = performance.now(), anda = now => { intro = cl((now - t0)/1800); quadro(); if (intro < 1 && aberto) requestAnimationFrame(anda) };
      requestAnimationFrame(anda);
    }
  });
};
function fecha(){ aberto = false; if (L) L.classList.remove("on") }
window.fechaHistoria = fecha;

const bt = document.getElementById("goStory");
if (bt) bt.onclick = () => abreHistoria("sobrinho1");
})();
