"use strict";
/* ============ Castelo encantado: aventurinha em pixels, vista de cima ============
   Toque no chão = a Agnes anda até lá. Toque num amigo = ela vai até ele e conversa.
   Missões em sequência (a joaninha e uma setinha mostram para onde ir):
   cavalinho com fome → maçã → dar a maçã (ela passa a andar a cavalo) → Lola perdeu a chave
   → achar a chave → abrir a porta do castelo → trono (ganha a coroa). Pedrinhas brilhantes espalhadas. */
(function(){
const cv = $("#rpgBoard"), ctx = cv.getContext("2d");
const MW = 36, MH = 28;
let G = null, raf = 0, last = 0, mapCv = null, view = null;

/* ---------- utilidades de cor ---------- */
function shade(hex, f){
  const n = parseInt(hex.slice(1), 16), c = [n >> 16, n >> 8 & 255, n & 255].map(v => Math.max(0, Math.min(255, Math.round(f > 1 ? v + (255 - v)*(f - 1) : v*f))));
  return "#" + c.map(v => v.toString(16).padStart(2, "0")).join("");
}
let seed = 7;
const rand = () => (seed = (seed*16807) % 2147483647) / 2147483647;
const mk = (w, h) => { const c = document.createElement("canvas"); c.width = w; c.height = h; return c };

/* ---------- desenho em pixels a partir de "grades" de letras ---------- */
function sprite(rows, pal, outline = "#3b1d4a"){
  const h = rows.length, w = Math.max(...rows.map(r => r.length));
  const c = mk(w + 2, h + 2), g = c.getContext("2d");
  const filled = (x, y) => y >= 0 && y < h && x >= 0 && x < w && rows[y][x] && rows[y][x] !== "." && pal[rows[y][x]];
  if (outline){
    g.fillStyle = outline;
    for (let y = -1; y <= h; y++) for (let x = -1; x <= w; x++)
      if (!filled(x, y) && (filled(x-1, y) || filled(x+1, y) || filled(x, y-1) || filled(x, y+1))) g.fillRect(x + 1, y + 1, 1, 1);
  }
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (filled(x, y)){
    const col = pal[rows[y][x]];
    g.fillStyle = typeof col === "function" ? col(x, y) : col; g.fillRect(x + 1, y + 1, 1, 1);
  }
  return c;
}
const flip = c => { const f = mk(c.width, c.height), g = f.getContext("2d"); g.translate(c.width, 0); g.scale(-1, 1); g.drawImage(c, 0, 0); return f };

/* ---------- vaqueira (usa as cores que a Agnes escolheu na corrida) ---------- */
const BODY = {
  down: ["....HHHH....", "...HHHHHH...", ".hhhhhhhhhh.", "..RRSSSSRR..", "..RSESSESR..", "..RSSmmSSR..", ".RR.SSSS.RR.", ".R.KKKKKK.R.", "...VCCCCV...", "..SVCCCCVS..", "..SVCCCCVS.."],
  up:   ["....HHHH....", "...HHHHHH...", ".hhhhhhhhhh.", "..RRRRRRRR..", "..RRRRRRRR..", "..RRRRRRRR..", ".RR.RRRR.RR.", ".R.KKKKKK.R.", "...VVVVVV...", "..SVVVVVVS..", "..SVVVVVVS.."],
  side: ["....HHHH....", "...HHHHHH...", "..hhhhhhhhh.", "...RRSSSS...", "..RRRSSES...", "..RRRSSSm...", ".RR.RSSS....", ".R..KKKK....", "....VCCV....", "....VCCSS...", "....VCCV...."]
};
const LEGS = {
  front: [["...PPPPPP...", "...PP..PP...", "...PP..PP...", "...BB..BB...", "..BBB..BBB.."],
          ["...PPPPPP...", "...PP..PP...", "...PP..BB...", "...BB.BBB...", "..BBB......."],
          ["...PPPPPP...", "...PP..PP...", "...BB..PP...", "...BBB.BB...", ".......BBB.."]],
  side:  [["....PPPP....", "....PPPP....", "....PP.PP...", "....BB.BB...", "....BBBBBB.."],
          ["....PPPP....", "...PPP.PP...", "..PP....PP..", "..BB....BB..", ".BBB....BBB."],
          ["....PPPP....", "....PPPP....", "....PP.PP...", "....BB.BB...", "....BBBBBB.."]]
};
const CROWN = ["Y..Y..Y", "YY.Y.YY", "YYYYYYY", "YpYcYpY"];
let GIRL = {}, HORSE_S = {}, LOLA_S = [], BUG_S = null, ITEMS = {};

function buildSprites(){
  const L = Object.assign({hairC: "#6b3e26", hat: "#ff4d8d", shirt: "#ff7eb6", vest: "#8b5cf6", scarf: "#5ec8ff", pants: "#4a6fd1", boots: "#7a4a24"}, store.get("vaqueira", {}));
  const H = Object.assign({coat: "#b07a45", marks: "pintas", mane: "#5a3418", saddle: "#ff4d8d"}, store.get("cavalinho", {}));
  const pal = {H: L.hat, h: shade(L.hat, .8), R: L.hairC, S: "#f6c9a8", E: "#3a2340", m: "#e0607e", K: L.scarf === "none" ? L.shirt : L.scarf,
               V: L.vest === "none" ? L.shirt : L.vest, C: L.shirt, P: L.pants, B: L.boots, Y: "#ffd84d", p: "#ff4d8d", c: "#5ec8ff"};
  GIRL = {};
  for (const d of ["down", "up", "side"]) for (let f = 0; f < 3; f++){
    const legs = (d === "side" ? LEGS.side : LEGS.front)[f];
    GIRL[d + f] = sprite(BODY[d].concat(legs), pal);
    GIRL[d + f + "c"] = sprite(BODY[d].map((r, i) => i < 4 ? (i === 0 ? "..." + CROWN[0] + ".." : "..." + CROWN[Math.min(i, 3)] + "..") : r).concat(legs), pal);
  }
  GIRL.ride = sprite(BODY.side.concat(["....PPPP....", ".....PP.....", ".....BB....."]), pal);
  GIRL.ridec = sprite(BODY.side.map((r, i) => i < 4 ? "..." + CROWN[i] + ".." : r).concat(["....PPPP....", ".....PP.....", ".....BB....."]), pal);

  /* cavalinho visto de lado (no mundo de cima ele fica de perfil, como nos joguinhos antigos) */
  const coat = H.coat, mark = (coat === "#ffffff" || coat === "#d9d9d9") ? "#8a7a70" : "#ffffff";
  const rb = ["#ef4444", "#f97316", "#facc15", "#22c55e", "#3b82f6", "#a855f7"];
  const hp = {C: coat, c: "#4a3428", e: "#222", n: shade(coat, .75), S: H.saddle, s: shade(H.saddle, .75), X: mark,
              M: H.mane === "rainbow" ? (x, y) => rb[(x + y) % 6] : H.mane};
  const body = ["...............MM...", "..............MMCC..", ".............MMCCCC.", ".............MCCCeCC", ".............MCCCCCn",
                ".......SSSS..MCCC...", ".M...CSssssSCCCC....", "MM.CCCCCCCCCCCCC....", "M..CCCCCCCCCCCCC....", "M..CCCCCCCCCCCC....."];
  const marked = body.map((r, y) => r.split("").map((ch, x) => {
    if (ch !== "C") return ch;
    if (H.marks === "pintas" && ((x*7 + y*3) % 11 === 0)) return "X";
    if (H.marks === "manchas" && ((x > 4 && x < 9 && y > 6) || (x > 14 && y < 3))) return "X";
    return ch;
  }).join(""));
  const legsH = [["...CC.CC....CC.CC...", "...CC.CC....CC.CC...", "...cc.cc....cc.cc..."],
                 ["...CC..CC..CC..CC...", "..CC....CC..CC...CC.", "..cc....cc..cc...cc."]];
  const sock = l => H.marks === "meias" ? l.map((r, i) => i === 1 ? r.replace(/C/g, "X") : r) : l;
  for (let f = 0; f < 2; f++){ HORSE_S["r" + f] = sprite(marked.concat(sock(legsH[f])), hp); HORSE_S["l" + f] = flip(HORSE_S["r" + f]) }

  /* Lola, a sapinha, com lacinho */
  const lp = {G: "#7ad16a", g: "#4fa847", w: "#fff", k: "#222", p: "#ff9cc4", M: "#7a2d4a", L: "#c8f0a8", b: "#ff4d8d"};
  const lola = [".gGGg.bb.gGGg.", "gGwwGgbbgGwwGg", "gGwkGGGGGGwkGg", "gGGGGGGGGGGGGg", "GGpGGGGGGGGpGG", "GGGMGGGGGGMGGG",
                ".GGGMMMMMMGGG.", ".GLLLLLLLLLLG.", "..GLLLLLLLLG..", ".GG.GLLLLG.GG.", "GGG..GGGG..GGG"];
  LOLA_S = [sprite(lola, lp), sprite(lola.map((r, i) => i === 1 || i === 2 ? r.replace(/w|k/g, "g") : r), lp)];

  /* joaninha cor-de-rosa da Agnes */
  BUG_S = sprite(["..k...k..", "...kkk...", "..kkkkk..", ".PPPdPPP.", "PPkPdPkPP", "PPPPdPPPP", "PkPPdPPkP", ".PPPdPPP.", "..PPdPP.."],
                 {P: "#ff8fc0", k: "#3a2340", d: "#c2417a"});

  ITEMS = {
    apple: sprite(["...gg...", "..g.....", ".RRRRRR.", "RRRwRRRR", "RRwRRRRR", "RRRRRRRR", ".RRRRRR.", "..RRRR.."], {g: "#3f9b3a", R: "#e33b5b", w: "#ffb3c4"}),
    key:   sprite([".YYY.......", "Y...Y......", "Y...YYYYYYY", "Y...Y...Y.Y", ".YYY.......", ], {Y: "#ffd84d"}),
    crown: sprite(CROWN, {Y: "#ffd84d", p: "#ff4d8d", c: "#5ec8ff"}),
    arrow: sprite(["YYYYYYY", ".YYYYY.", "..YYY..", "...Y..."], {Y: "#ffd84d"}),
    heart: sprite([".pp.pp.", "ppppppp", "ppppppp", ".ppppp.", "..ppp..", "...p..."], {p: "#ff4d8d"}, "#7a1d4a")
  };
  ITEMS.gems = ["#ff7eb6", "#5ec8ff", "#c084fc", "#7ae0a0"].map(c =>
    sprite(["..ccc..", ".cwccc.", "cwcccdc", "ccccddc", ".ccddd.", "..cdd..", "...d..."], {c, d: shade(c, .7), w: "#fff"}));
}

/* ---------- mapa ---------- */
const SOLID = new Set("TAb~FhWOPKD");
function buildMap(){
  seed = 7;
  const m = Array.from({length: MH}, () => Array(MW).fill("."));
  const put = (x, y, ch) => { if (x >= 0 && y >= 0 && x < MW && y < MH) m[y][x] = ch };
  const rect = (x0, y0, x1, y1, ch) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) put(x, y, ch) };
  for (let y = 0; y < MH; y++) for (let x = 0; x < MW; x++) if (rand() < .12) m[y][x] = ",";
  for (let x = 0; x < MW; x++){ put(x, 0, "T"); put(x, MH-1, "T") }
  for (let y = 0; y < MH; y++){ put(0, y, "T"); put(MW-1, y, "T") }
  /* castelo */
  rect(11, 2, 25, 10, "W"); rect(12, 3, 24, 9, "f");
  [[11, 2], [25, 2], [11, 10], [25, 10]].forEach(([x, y]) => put(x, y, "O"));
  rect(18, 4, 18, 9, "c"); put(18, 3, "K"); put(18, 10, "D");
  [[14, 5], [22, 5], [14, 8], [22, 8]].forEach(([x, y]) => put(x, y, "P"));
  /* caminhos e chafariz */
  rect(18, 11, 18, 24, "="); rect(9, 18, 28, 18, "=");
  rect(16, 13, 20, 16, "="); rect(17, 14, 19, 15, "~");
  /* estábulo */
  rect(2, 14, 9, 22, "F"); rect(3, 15, 8, 21, "d"); put(9, 18, "="); put(3, 15, "h"); put(4, 15, "h"); put(3, 16, "h");
  /* pomar */
  [[28, 13], [32, 13], [34, 16], [27, 21], [31, 22], [34, 20], [29, 25]].forEach(([x, y]) => put(x, y, "T"));
  put(30, 16, "A"); put(33, 18, "A");
  /* jardim secreto (chave) */
  [[2, 4], [3, 3], [5, 3], [6, 4], [6, 6], [5, 7], [2, 6], [3, 7]].forEach(([x, y]) => put(x, y, "b"));
  rect(3, 4, 5, 6, ","); put(4, 5, ".");
  /* lago */
  rect(29, 3, 32, 6, "~"); put(29, 3, "."); put(32, 6, ".");
  /* árvores soltas */
  [[8, 2], [2, 10], [9, 10], [27, 9], [33, 9], [24, 22], [12, 22], [14, 25], [5, 25], [22, 25], [9, 6]].forEach(([x, y]) => put(x, y, "T"));
  return m;
}
const START = {x: 18, y: 22}, HORSE_POS = {x: 5, y: 18}, LOLA_POS = {x: 15, y: 14}, DOOR = {x: 18, y: 10}, THRONE = {x: 18, y: 3};
const APPLE_POS = {x: 31, y: 17}, KEY_POS = {x: 4, y: 5};
const GEM_POS = [[2, 2], [7, 9], [14, 21], [22, 20], [33, 14], [27, 2], [34, 7], [6, 24], [26, 25], [15, 4], [21, 7], [3, 12]];

/* ---------- ladrilhos (16×16) ---------- */
function tileCanvas(ch, x, y, frame = 0){
  const c = mk(16, 16), g = c.getContext("2d");
  const p = (a, b, w, h, col) => { g.fillStyle = col; g.fillRect(a, b, w, h) };
  const v = (x*7 + y*13) % 5;
  const grass = () => {
    p(0, 0, 16, 16, "#dcbdf3");
    const r = (a) => ((x*31 + y*17 + a*13) % 16);
    for (let i = 0; i < 5; i++){ p(r(i), r(i + 5), 1, 2, "#c7a0e8"); p(r(i + 9), r(i + 2), 1, 1, "#ecd6fb") }
  };
  const circle = (cx, cy, rad, col) => { for (let yy = -rad; yy <= rad; yy++) for (let xx = -rad; xx <= rad; xx++) if (xx*xx + yy*yy <= rad*rad + rad*.6) p(cx + xx, cy + yy, 1, 1, col) };
  switch (ch){
    case ",": grass();
      [[3 + v, 4], [11 - v, 10], [6, 12 - v]].forEach(([a, b], i) => { const fc = ["#ff7eb6", "#fff", "#ffd84d"][(i + v) % 3]; p(a - 1, b, 3, 1, fc); p(a, b - 1, 1, 3, fc); p(a, b, 1, 1, i === 2 ? "#ff4d8d" : "#ffd84d") });
      break;
    case "=": p(0, 0, 16, 16, "#f6c7de");
      [[1, 1, 6, 6], [9, 1, 6, 5], [1, 9, 5, 6], [8, 8, 7, 7]].forEach(([a, b, w, h]) => { p(a, b, w, h, "#fbe0ee"); p(a, b + h - 1, w, 1, "#eab1cf"); p(a, b, w, 1, "#fff2f8") });
      break;
    case "d": p(0, 0, 16, 16, "#ecd0bd"); for (let i = 0; i < 6; i++) p((x*5 + i*7) % 16, (y*3 + i*5) % 16, 1, 1, "#d8b49c"); break;
    case "T": case "A": grass();
      p(5, 12, 6, 2, "rgba(80,30,110,.25)"); p(7, 11, 2, 4, "#8a5a7a");
      circle(8, 7, 6, "#b065d6"); circle(7, 6, 5, "#d48cf0"); circle(6, 5, 2, "#f0b8ff");
      if (ch === "A") [[4, 8], [10, 5], [9, 10], [5, 3]].forEach(([a, b]) => { p(a, b, 2, 2, "#e33b5b"); p(a, b, 1, 1, "#ffb3c4") });
      else [[4, 8], [10, 5], [9, 10]].forEach(([a, b]) => p(a, b, 1, 1, "#fff"));
      break;
    case "b": grass(); p(3, 12, 10, 2, "rgba(80,30,110,.2)"); circle(8, 8, 5, "#a86ad8"); circle(7, 7, 3, "#c58cf0"); p(5, 5, 1, 1, "#ff9cc4"); p(10, 9, 1, 1, "#ff9cc4"); break;
    case "~": p(0, 0, 16, 16, "#a9b4ff");
      for (let i = 0; i < 3; i++){ const a = (x*5 + i*6 + frame*2) % 16, b = (y*7 + i*5) % 16; p(a, b, 4, 1, "#d2d8ff") }
      if (frame === 1) p((x*3) % 14, (y*5) % 14, 1, 1, "#fff");
      break;
    case "F": p(0, 0, 16, 16, "#ecd0bd"); p(0, 5, 16, 2, "#fff0f8"); p(0, 10, 16, 2, "#fff0f8"); p(0, 7, 16, 1, "#e9b6d3"); p(0, 12, 16, 1, "#e9b6d3");
      p(1, 3, 3, 12, "#fbe3f1"); p(12, 3, 3, 12, "#fbe3f1"); p(1, 14, 3, 1, "#d99bbf"); p(12, 14, 3, 1, "#d99bbf"); break;
    case "h": p(0, 0, 16, 16, "#ecd0bd"); p(1, 3, 14, 11, "#f6d365"); p(1, 13, 14, 1, "#d9a93a"); for (let i = 0; i < 5; i++) p(2 + i*3, 4, 1, 8, "#e5bb45"); p(1, 7, 14, 1, "#c98f2c"); break;
    case "W": p(0, 0, 16, 16, "#9b6be0");
      for (let r = 0; r < 4; r++){ p(0, 3 + r*4, 16, 1, "#7d4fc4"); for (let k = 0; k < 3; k++) p(((r % 2)*4 + k*8) % 16, 3 + r*4 - 3, 1, 3, "#7d4fc4") }
      p(0, 0, 16, 3, "#c8a8f5"); p(0, 0, 16, 1, "#e4d4fb"); for (let k = 0; k < 4; k++) p(k*4 + 1, 0, 2, 1, "#9b6be0");
      break;
    case "O": p(0, 0, 16, 16, "#9b6be0"); circle(8, 8, 7, "#7d4fc4"); circle(8, 8, 6, "#f472b6"); circle(8, 8, 4, "#f9a8d4"); circle(8, 8, 2, "#fbcfe8"); p(8, 1, 1, 7, "#5b2a86"); p(9, 1, 4, 3, "#ffd84d"); break;
    case "f": case "P": case "K": case "c": case "D":
      for (let yy = 0; yy < 2; yy++) for (let xx = 0; xx < 2; xx++) p(xx*8, yy*8, 8, 8, (xx + yy + x + y) % 2 ? "#f9c5df" : "#fde3f0");
      if (ch === "c" || ch === "K" || ch === "D"){ p(1, 0, 14, 16, "#c026d3"); p(1, 0, 1, 16, "#fcd34d"); p(14, 0, 1, 16, "#fcd34d"); for (let i = 0; i < 4; i++) p(7, i*4 + 1, 2, 2, "#e879f9") }
      if (ch === "P"){ p(3, 12, 11, 3, "rgba(80,30,110,.25)"); circle(8, 8, 5, "#c4b5fd"); circle(7, 7, 3, "#e9d5ff"); p(6, 5, 1, 1, "#fff") }
      if (ch === "K"){ p(2, 1, 12, 13, "#f5c542"); p(3, 2, 10, 6, "#ec4899"); p(4, 3, 8, 1, "#f9a8d4"); p(3, 9, 10, 4, "#db2777"); p(2, 0, 2, 3, "#ffe58a"); p(12, 0, 2, 3, "#ffe58a"); p(7, 0, 2, 2, "#5ec8ff") }
      if (ch === "D"){ p(0, 0, 16, 16, "#9b6be0"); p(2, 1, 12, 15, "#6d28d9"); p(3, 2, 10, 14, "#7c3aed"); for (let i = 0; i < 3; i++) p(5 + i*3, 2, 1, 14, "#6d28d9"); p(7, 8, 3, 4, "#ffd84d"); p(8, 10, 1, 1, "#7a5600") }
      break;
    default: grass();
  }
  return c;
}
function renderMap(){
  mapCv = mk(MW*16, MH*16); const g = mapCv.getContext("2d");
  for (let y = 0; y < MH; y++) for (let x = 0; x < MW; x++) g.drawImage(tileCanvas(G.map[y][x], x, y), x*16, y*16);
  G.water = [];
  for (let y = 0; y < MH; y++) for (let x = 0; x < MW; x++) if (G.map[y][x] === "~") G.water.push([x, y, tileCanvas("~", x, y, 0), tileCanvas("~", x, y, 1)]);
}

/* ---------- estado salvo ---------- */
const SAVE_DEF = {talkedHorse: false, apple: 0, talkedLola: false, key: 0, crown: false, gems: [], x: START.x, y: START.y};
const save = () => { if (G) store.set("castelo", {talkedHorse: G.s.talkedHorse, apple: G.s.apple, talkedLola: G.s.talkedLola, key: G.s.key, crown: G.s.crown, gems: G.s.gems, x: Math.round(G.px), y: Math.round(G.py)}) };

function blocked(x, y){
  if (x < 0 || y < 0 || x >= MW || y >= MH) return true;
  const ch = G.map[y][x];
  if (ch === "D" && G.s.key === 2) return false;
  if (SOLID.has(ch)) return true;
  if (G.s.apple < 2 && (x === HORSE_POS.x || x === HORSE_POS.x + 1) && y === HORSE_POS.y) return true;
  if (x === LOLA_POS.x && y === LOLA_POS.y) return true;
  return false;
}
function bfs(sx, sy, goals){
  const key = (x, y) => y*MW + x, prev = new Map([[key(sx, sy), -1]]), q = [[sx, sy]];
  while (q.length){
    const [x, y] = q.shift();
    if (goals.has(key(x, y))){
      const path = []; let k = key(x, y);
      while (k !== -1){ path.unshift({x: k % MW, y: Math.floor(k / MW)}); k = prev.get(k) }
      return path.slice(1);
    }
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]){
      const nx = x + dx, ny = y + dy, k = key(nx, ny);
      if (!prev.has(k) && !blocked(nx, ny)){ prev.set(k, key(x, y)); q.push([nx, ny]) }
    }
  }
  return null;
}

/* ---------- começar / parar ---------- */
window.stopCastle = function(){
  if (raf){ cancelAnimationFrame(raf); raf = 0 }
  if (G){ save(); G = null }
};
window.startCastle = async function(fresh){
  show("rpg"); const tok = session;
  await new Promise(requestAnimationFrame);
  buildSprites();
  const s = fresh ? Object.assign({}, SAVE_DEF, {gems: []}) : Object.assign({}, SAVE_DEF, store.get("castelo", {}));
  if (s.crown && !fresh && s.gems.length >= GEM_POS.length) Object.assign(s, SAVE_DEF, {gems: []});     // tudo feito: começa de novo
  G = {s, map: buildMap(), t: 0, path: [], dir: "down", walk: 0, moving: false, act: null, idle: 0,
       px: s.x, py: s.y, bug: {x: s.x - .6, y: s.y - .8, away: 0}, bubbles: [], parts: [], words: [], blink: 0};
  if (s.key === 2) G.map[DOOR.y][DOOR.x] = "c";
  if (blocked(Math.round(G.px), Math.round(G.py))){ G.px = START.x; G.py = START.y }
  renderMap(); size(); hud();
  const c = stats.castelo || (stats.castelo = {partidas: 0, coroas: 0, pedras: 0});
  c.partidas++; const d = day(); d.castelo = (d.castelo || 0) + 1; saveStats();
  last = performance.now(); raf = requestAnimationFrame(frame);
  if (tok === session) await say(s.crown ? "rpg_hi" : "rpg_in");
};
function size(){
  const r = cv.getBoundingClientRect(), dpr = devicePixelRatio || 1;
  cv.width = Math.round(r.width*dpr); cv.height = Math.round(r.height*dpr);
  const S = Math.max(2, Math.round(Math.min(r.height, r.width*.8) / (10*16)));
  view = {w: r.width, h: r.height, dpr, S, T: S*16};
}
addEventListener("resize", () => { if (G) size() });
function hud(){
  if (!G) return;
  $("#rpgGems").textContent = `💎 ${G.s.gems.length}/${GEM_POS.length}`;
  $("#rpgBag").textContent = (G.s.apple === 1 ? "🍎" : "") + (G.s.key === 1 ? "🔑" : "") + (G.s.crown ? "👑" : "");
  $("#rpgBag").style.display = $("#rpgBag").textContent ? "" : "none";
}

/* ---------- toque ---------- */
function onTap(e){
  if (!G || !view) return;
  AC.resume().catch(() => {});
  const r = cv.getBoundingClientRect(), {T} = view;
  const wx = (e.clientX - r.left + G.camX) / T, wy = (e.clientY - r.top + G.camY) / T;
  const tx = Math.floor(wx), ty = Math.floor(wy);
  const near = (p, w = 1) => tx >= p.x - (w > 1 ? 0 : 0) && tx <= p.x + w - 1 && Math.abs(ty - p.y) <= (ty < p.y ? 1 : 0);
  let act = null, tiles = [];
  if (G.s.apple < 2 && (near(HORSE_POS, 2))){ act = "horse"; tiles = [HORSE_POS, {x: HORSE_POS.x + 1, y: HORSE_POS.y}] }
  else if (tx === LOLA_POS.x && (ty === LOLA_POS.y || ty === LOLA_POS.y - 1)){ act = "lola"; tiles = [LOLA_POS] }
  else if (tx === DOOR.x && ty === DOOR.y && G.s.key < 2){ act = "door"; tiles = [DOOR] }
  else if (tx === THRONE.x && ty === THRONE.y){ act = "throne"; tiles = [THRONE] }
  const goals = new Set();
  const sx = Math.round(G.px), sy = Math.round(G.py);
  if (act){
    for (const t of tiles) for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (!blocked(t.x + dx, t.y + dy)) goals.add((t.y + dy)*MW + t.x + dx);
  } else if (!blocked(tx, ty)) goals.add(ty*MW + tx);
  else for (const [dx, dy] of [[0, 1], [1, 0], [-1, 0], [0, -1]]) if (!blocked(tx + dx, ty + dy)) goals.add((ty + dy)*MW + tx + dx);
  if (!goals.size) return;
  const path = goals.has(sy*MW + sx) ? [] : bfs(sx, sy, goals);
  if (!path) return;
  G.path = path; G.act = act; G.idle = 0; G.bug.away = 0;
  G.mark = {x: tx, y: ty, t: .6};
  if (!path.length && act) interact(act);
}
cv.addEventListener("pointerdown", onTap);

/* ---------- conversas e missões ---------- */
function bubble(at, emoji, t = 2.6){ G.bubbles = G.bubbles.filter(b => b.at !== at); G.bubbles.push({at, emoji, t}) }
function word(txt, x, y){ G.words.push({txt, x, y, t: 1.8}) }
function hearts(x, y, n = 8){ for (let i = 0; i < n; i++) G.parts.push({x: x + (Math.random() - .5)*.8, y, vx: (Math.random() - .5)*1.2, vy: -1.5 - Math.random(), t: 1.4, k: "heart"}) }
function sparks(x, y, n = 12, col){ for (let i = 0; i < n; i++){ const a = Math.random()*6.28, v = 1 + Math.random()*2; G.parts.push({x, y, vx: Math.cos(a)*v, vy: Math.sin(a)*v, t: .8, k: "spark", col: col || pick(["#ffd84d", "#fff", "#ff7eb6", "#5ec8ff"])}) } }
async function talk(...ids){ stopAudio(); const tok = session; for (const id of ids){ if (tok !== session) return; await say(id) } }

function interact(act){
  const s = G.s;
  if (act === "horse"){
    if (s.apple === 1){
      s.apple = 2; sfx("win"); hearts(HORSE_POS.x + .5, HORSE_POS.y - .5, 12); word("horse!", HORSE_POS.x + .5, HORSE_POS.y - 1);
      G.px = HORSE_POS.x; G.py = HORSE_POS.y + 1; G.dir = "side"; G.face = 1;
      talk("rpg_horse_ok", "en_horse"); addStar();
    } else { s.talkedHorse = true; bubble("horse", "🍎"); talk("rpg_horse") }
  } else if (act === "lola"){
    G.lolaJump = .6;
    if (s.key === 1){ bubble("lola", "🚪"); talk("rpg_key_ok") }
    else if (s.apple === 2 && s.key === 0){ s.talkedLola = true; bubble("lola", "🔑"); talk("rpg_key") }
    else if (s.crown){ bubble("lola", "👑"); talk("rpg_end") }
    else { bubble("lola", "💚"); talk("rpg_hi") }
  } else if (act === "door"){
    if (s.key === 1){
      s.key = 2; G.map[DOOR.y][DOOR.x] = "c"; renderMap(); sfx("win"); sparks(DOOR.x + .5, DOOR.y + .5, 20); word("castle!", DOOR.x + .5, DOOR.y - .3);
      talk("rpg_door", "en_castle");
    } else { sfx("ops"); bubble("door", "🔑") }
  } else if (act === "throne"){
    if (!s.crown){
      s.crown = true; sfx("win"); confetti(); sparks(THRONE.x + .5, THRONE.y + .5, 30); word("crown!", G.px, G.py - 1.2);
      addStar(); addStar(); addStar();
      const c = stats.castelo; c.coroas++; saveStats();
      talk("en_crown", "rpg_end");
    } else { sparks(THRONE.x + .5, THRONE.y + .5, 10); bubble("throne", "✨") }
  }
  hud(); save();
}
function pickups(){
  const s = G.s, tx = Math.round(G.px), ty = Math.round(G.py);
  if (s.apple === 0 && tx === APPLE_POS.x && ty === APPLE_POS.y){
    s.apple = 1; sfx("eat"); sparks(tx + .5, ty + .5); word("apple!", tx + .5, ty - .5); talk("en_apple", "rpg_apple"); hud(); save();
  }
  if (s.key === 0 && tx === KEY_POS.x && ty === KEY_POS.y){
    s.key = 1; sfx("eat"); sparks(tx + .5, ty + .5); word("key!", tx + .5, ty - .5); talk("en_key", "rpg_key_ok"); hud(); save();
  }
  GEM_POS.forEach(([x, y], i) => {
    if (tx === x && ty === y && !s.gems.includes(i)){
      s.gems.push(i); sfx("eat"); sparks(x + .5, y + .5, 14); stats.castelo.pedras++; saveStats();
      if (s.gems.length === GEM_POS.length){ addStar(); addStar(); confetti(); word("gem!", x + .5, y - .5); talk("en_gem", "rpg_gems") }
      else if (s.gems.length === 1 || s.gems.length % 4 === 0){ word("gem!", x + .5, y - .5); talk("en_gem") }
      hud(); save();
    }
  });
}
/* para onde a joaninha e a setinha apontam */
function goal(){
  const s = G.s;
  if (s.apple < 2){
    if (s.apple === 0 && s.talkedHorse) return APPLE_POS;
    return {x: HORSE_POS.x + .5, y: HORSE_POS.y};
  }
  if (s.key < 2){
    if (s.key === 0 && !s.talkedLola) return LOLA_POS;
    if (s.key === 0) return KEY_POS;
    return DOOR;
  }
  if (!s.crown) return THRONE;
  return null;
}

/* ---------- laço principal ---------- */
function frame(now){
  raf = requestAnimationFrame(frame);
  const dt = Math.min(.05, (now - last) / 1000); last = now;
  if (!G) return;
  G.t += dt;
  /* andar */
  const riding = G.s.apple === 2, speed = riding ? 6 : 3.8;
  if (G.path.length){
    const n = G.path[0], dx = n.x - G.px, dy = n.y - G.py, d = Math.hypot(dx, dy), st = speed*dt;
    if (Math.abs(dx) > .01) G.face = dx > 0 ? 1 : -1;
    G.dir = Math.abs(dx) > Math.abs(dy) ? "side" : dy < 0 ? "up" : "down";
    if (d <= st){ G.px = n.x; G.py = n.y; G.path.shift(); pickups() }
    else { G.px += dx/d*st; G.py += dy/d*st }
    G.walk += dt*(riding ? 9 : 7); G.moving = true; G.idle = 0;
    if (!G.path.length && G.act){ const a = G.act; G.act = null; interact(a) }
  } else { G.moving = false; G.idle += dt }
  /* joaninha: acompanha a Agnes; se ela ficar parada, voa até o lugar certo para mostrar o caminho */
  const tgt = goal(), B = G.bug;
  let bx = G.px - .8*(G.face || 1), by = G.py - .9;
  if (tgt && G.idle > 3.5){ bx = tgt.x; by = tgt.y - 1.1 }
  const k = Math.min(1, dt*(G.idle > 3.5 ? 1.6 : 4));
  B.x += (bx - B.x)*k; B.y += (by - B.y)*k;
  /* efeitos */
  G.parts = G.parts.filter(p => (p.t -= dt) > 0); G.parts.forEach(p => { p.x += p.vx*dt; p.y += p.vy*dt; if (p.k === "spark") p.vy += 3*dt });
  G.bubbles = G.bubbles.filter(b => (b.t -= dt) > 0);
  G.words = G.words.filter(w => (w.t -= dt) > 0);
  if (G.mark && (G.mark.t -= dt) <= 0) G.mark = null;
  if (G.lolaJump) G.lolaJump = Math.max(0, G.lolaJump - dt);
  draw(tgt);
}

function draw(tgt){
  const {w, h, dpr, S, T} = view;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.imageSmoothingEnabled = false;
  const mw = MW*T, mh = MH*T;
  G.camX = mw <= w ? (mw - w)/2 : Math.max(0, Math.min(mw - w, (G.px + .5)*T - w/2));
  G.camY = mh <= h ? (mh - h)/2 : Math.max(0, Math.min(mh - h, (G.py + .5)*T - h/2));
  const cx = Math.round(G.camX), cy = Math.round(G.camY);
  ctx.fillStyle = "#c7a0e8"; ctx.fillRect(0, 0, w, h);
  ctx.drawImage(mapCv, 0, 0, MW*16, MH*16, -cx, -cy, mw, mh);
  const wf = Math.floor(G.t*2) % 2;
  for (const [x, y, a, b] of G.water){ const sx = x*T - cx, sy = y*T - cy; if (sx > -T && sx < w && sy > -T && sy < h) ctx.drawImage(wf ? b : a, sx, sy, T, T) }
  const at = (x, y) => [Math.round(x*T - cx), Math.round(y*T - cy)];
  const spr = (img, x, y, ax = .5, ay = 1) => { const [sx, sy] = at(x, y); ctx.drawImage(img, Math.round(sx - img.width*S*ax), Math.round(sy - img.height*S*ay), img.width*S, img.height*S) };
  const shadow = (x, y, rw) => { const [sx, sy] = at(x, y); ctx.fillStyle = "rgba(70,20,100,.22)"; ctx.beginPath(); ctx.ellipse(sx, sy, rw*T, rw*T*.35, 0, 0, 7); ctx.fill() };
  /* marca do toque */
  if (G.mark){ const [sx, sy] = at(G.mark.x + .5, G.mark.y + .5); ctx.strokeStyle = `rgba(255,255,255,${G.mark.t/0.6})`; ctx.lineWidth = S; ctx.beginPath(); ctx.ellipse(sx, sy, T*.4*(1.4 - G.mark.t), T*.2*(1.4 - G.mark.t), 0, 0, 7); ctx.stroke() }
  /* itens no chão */
  const bob = Math.sin(G.t*3)*.06;
  GEM_POS.forEach(([x, y], i) => { if (!G.s.gems.includes(i)){ shadow(x + .5, y + .8, .22); spr(ITEMS.gems[i % 4], x + .5, y + .7 + bob*(i % 2 ? 1 : -1)); if ((G.t + i) % 1.6 < .15) sparks(x + .5, y + .3, 1, "#fff") } });
  if (G.s.apple === 0){ shadow(APPLE_POS.x + .5, APPLE_POS.y + .8, .22); spr(ITEMS.apple, APPLE_POS.x + .5, APPLE_POS.y + .75 + bob) }
  if (G.s.key === 0){ shadow(KEY_POS.x + .5, KEY_POS.y + .8, .25); spr(ITEMS.key, KEY_POS.x + .5, KEY_POS.y + .72 + bob) }
  if (!G.s.crown) spr(ITEMS.crown, THRONE.x + .5, THRONE.y + .35 + bob);
  /* personagens, do fundo para a frente */
  const ents = [];
  const riding = G.s.apple === 2, wf2 = Math.floor(G.walk) % 2;
  if (!riding) ents.push({y: HORSE_POS.y, d(){ shadow(HORSE_POS.x + 1, HORSE_POS.y + .95, .55); spr(HORSE_S["l" + (Math.floor(G.t*1.5) % 2 && G.s.talkedHorse ? 1 : 0)], HORSE_POS.x + 1, HORSE_POS.y + 1) }});
  ents.push({y: LOLA_POS.y, d(){
    const j = G.lolaJump ? Math.sin((.6 - G.lolaJump)/.6*Math.PI)*.4 : Math.abs(Math.sin(G.t*2))*.05;
    shadow(LOLA_POS.x + .5, LOLA_POS.y + .9, .35); spr(LOLA_S[(G.t % 4) > 3.85 ? 1 : 0], LOLA_POS.x + .5, LOLA_POS.y + .9 - j) }});
  ents.push({y: G.py, d(){
    if (riding){
      const side = G.face === -1 ? "l" : "r", f = G.moving ? wf2 : 0, hop = G.moving ? (wf2 ? .05 : 0) : 0;
      shadow(G.px + .5, G.py + .95, .6);
      spr(HORSE_S[side + f], G.px + .5, G.py + 1 - hop);
      const rk = G.s.crown ? "ridec" : "ride", img = side === "l" ? flipCache(rk) : GIRL[rk];
      spr(img, G.px + .5 + (side === "l" ? .12 : -.12), G.py + .25 - hop);
    } else {
      const f = G.moving ? 1 + wf2 : 0, d = G.dir, key = d + f + (G.s.crown ? "c" : "");
      let img = GIRL[key]; if (d === "side" && G.face === -1) img = flipCache(key);
      shadow(G.px + .5, G.py + .95, .3); spr(img, G.px + .5, G.py + .98 - (G.moving && f === 1 ? .03 : 0));
    }
  }});
  ents.sort((a, b) => a.y - b.y).forEach(e => e.d());
  /* joaninha voando */
  const B = G.bug, fl = Math.sin(G.t*30) > 0;
  shadow(B.x + .5, B.y + 1.4, .15);
  const [bx, by] = at(B.x + .5, B.y + .5 + Math.sin(G.t*4)*.08);
  ctx.fillStyle = "rgba(255,255,255,.75)";
  ctx.beginPath(); ctx.ellipse(bx - 4.5*S, by - 3*S, (fl ? 3 : 2)*S, (fl ? 1.6 : 2.4)*S, -.5, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.ellipse(bx + 4.5*S, by - 3*S, (fl ? 3 : 2)*S, (fl ? 1.6 : 2.4)*S, .5, 0, 7); ctx.fill();
  ctx.drawImage(BUG_S, bx - BUG_S.width*S/2, by - BUG_S.height*S/2, BUG_S.width*S, BUG_S.height*S);
  /* setinha mostrando o caminho */
  if (tgt){
    const ax = tgt.x + .5, ay = tgt.y - .55 - Math.abs(Math.sin(G.t*4))*.3;
    const [sx, sy] = at(ax, ay);
    if (sx > -T && sx < w + T && sy > -T && sy < h + T) spr(ITEMS.arrow, ax, ay);
    else {     /* fora da tela: setinha na borda apontando para lá */
      const px = (G.px + .5)*T - cx, py = (G.py + .5)*T - cy, ang = Math.atan2(sy - py, sx - px);
      const ex = Math.max(T*.6, Math.min(w - T*.6, px + Math.cos(ang)*w)), ey = Math.max(T*.6, Math.min(h - T*.6, py + Math.sin(ang)*h));
      ctx.save(); ctx.translate(ex, ey); ctx.rotate(ang - Math.PI/2);
      ctx.drawImage(ITEMS.arrow, -ITEMS.arrow.width*S/2, -ITEMS.arrow.height*S/2, ITEMS.arrow.width*S, ITEMS.arrow.height*S); ctx.restore();
    }
  }
  /* partículas */
  for (const p of G.parts){
    if (p.k === "heart") spr(ITEMS.heart, p.x, p.y);
    else { const [sx, sy] = at(p.x, p.y); ctx.fillStyle = p.col; ctx.fillRect(sx - S, sy - S, 2*S, 2*S) }
  }
  /* balõezinhos */
  const posOf = {horse: [HORSE_POS.x + 1, HORSE_POS.y - .4], lola: [LOLA_POS.x + .5, LOLA_POS.y - .2], door: [DOOR.x + .5, DOOR.y - .2], throne: [THRONE.x + .5, THRONE.y - .1]};
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  for (const b of G.bubbles){
    const p = posOf[b.at]; if (!p) continue;
    const [sx, sy] = at(p[0], p[1]), r = T*.42, yy = sy - r*1.2;
    ctx.fillStyle = "#fff"; ctx.strokeStyle = "#3b1d4a"; ctx.lineWidth = S;
    ctx.beginPath(); ctx.roundRect(sx - r, yy - r, r*2, r*2, r*.5); ctx.moveTo(sx - r*.25, yy + r); ctx.lineTo(sx, yy + r*1.4); ctx.lineTo(sx + r*.25, yy + r); ctx.fill(); ctx.stroke();
    ctx.font = `${Math.round(r*1.2)}px system-ui`; ctx.fillStyle = "#000"; ctx.fillText(b.emoji, sx, yy + r*.06);
  }
  /* palavras em inglês subindo */
  for (const wd of G.words){
    const [sx, sy] = at(wd.x, wd.y - (1.8 - wd.t)*.6);
    ctx.globalAlpha = Math.min(1, wd.t*2);
    ctx.font = `800 ${Math.round(T*.5)}px Nunito, system-ui`; ctx.lineWidth = S*2; ctx.strokeStyle = "#7a1d6a"; ctx.strokeText(wd.txt, sx, sy);
    ctx.fillStyle = "#fff"; ctx.fillText(wd.txt, sx, sy); ctx.globalAlpha = 1;
  }
}
const flipped = {};
function flipCache(key){ if (!flipped[key] || flipped[key].src !== GIRL[key]){ flipped[key] = flip(GIRL[key]); flipped[key].src = GIRL[key] } return flipped[key] }

$("#rpgReset").onclick = e => { e.stopPropagation(); startCastle(true) };
$("#goCastle").onclick = () => startCastle(false);
window.__castelo = () => G;
})();
