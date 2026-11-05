"use strict";
/* ============ Corrida da Agnes vaqueira e do cavalinho Pipoca ============
   Ela corre sozinha; toque na tela = pular (dá para pular 2 vezes no ar).
   A ferradura brilhante chama o Pipoca: ela monta, corre mais rápido e pula sozinha os obstáculos.
   Medidas em "u" (1 u = 1% da altura da tela). Ninguém perde: se bater, ela só tropeça. */
(function(){
const cv = $("#runBoard"), mainCtx = cv.getContext("2d");
let ctx = mainCtx;

/* ---------- visual escolhido pela Agnes ---------- */
const LOOK_DEF = {hair: "chiquinha", hairC: "#6b3e26", hat: "#ff4d8d", deco: "estrela", shirt: "#ff7eb6", vest: "#8b5cf6", scarf: "#5ec8ff", pants: "#4a6fd1", boots: "#7a4a24"};
const HORSE_DEF = {name: "pipoca", coat: "#b07a45", marks: "pintas", mane: "#5a3418", saddle: "#ff4d8d"};
let LOOK = Object.assign({}, LOOK_DEF, store.get("vaqueira", {}));
let HORSE = Object.assign({}, HORSE_DEF, store.get("cavalinho", {}));
function shade(hex, f){
  const n = parseInt(hex.slice(1), 16), c = [n >> 16, n >> 8 & 255, n & 255].map(v => Math.max(0, Math.min(255, Math.round(f > 1 ? v + (255 - v)*(f - 1) : v*f))));
  return "#" + c.map(v => v.toString(16).padStart(2, "0")).join("");
}
const light = hex => { const n = parseInt(hex.slice(1), 16); return ((n >> 16) + (n >> 8 & 255) + (n & 255))/3 > 200 };
const GROUND = 84, G = 300, JUMP = 116, JUMP_HORSE = 128, PXF = .24;
let R = null, raf = 0, last = 0;
const rnd = (a, b) => a + Math.random()*(b - a);

function size(){
  const r = cv.getBoundingClientRect(), dpr = devicePixelRatio || 1;
  cv.width = r.width*dpr; cv.height = r.height*dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return {w: r.width, h: r.height, u: r.height/100};
}

/* ---------- começar / parar ---------- */
window.stopRun = function(){
  if (raf){ cancelAnimationFrame(raf); raf = 0 }
  if (R && R.started && !R.saved){
    R.saved = true;
    const c = stats.corrida || (stats.corrida = {partidas: 0, recorde: 0, estrelas: 0});
    c.partidas++; c.estrelas += R.stars; c.recorde = Math.max(c.recorde, R.stars);
    const d = day(); d.corrida = (d.corrida || 0) + 1; saveStats();
  }
};
window.startRun = async function(){
  show("run"); const tok = session;
  await new Promise(requestAnimationFrame);
  const g = size();
  R = {g, W: g.w/g.u, t: 0, dist: 0, base: 52, stars: 0, horse: 0, hurt: 0, slow: 0, lastOps: -99, started: false,
       p: {y: GROUND, vy: 0, ground: true, jumps: 0, ph: 0}, objs: [], parts: [], bug: {x: g.w/g.u*PXF - 10, y: GROUND - 34, tgt: null},
       next: {obs: 70, plat: 130, star: 30, shoe: 260}};
  for (let x = 40; x < R.W + 10; x += 9) R.objs.push({type: "star", x, y: GROUND - 8, bob: x});
  $("#runScore").textContent = "⭐ 0"; $("#runMsg").classList.add("on"); $("#runHorse").style.width = "0";
  last = performance.now(); raf = requestAnimationFrame(frame);
  await say("run_in");
};

/* ---------- pular ---------- */
function jump(){
  if (!R) return;
  if (!R.started){ R.started = true; $("#runMsg").classList.remove("on") }
  const P = R.p;
  if (P.ground || P.jumps < 2){
    P.vy = -(R.horse > 0 ? JUMP_HORSE : JUMP); P.jumps = P.ground ? 1 : P.jumps + 1; P.ground = false;
    sfx("jump"); puff(PX(), P.y, 4);
  }
}
cv.addEventListener("pointerdown", e => { e.preventDefault(); jump() });
addEventListener("keydown", e => { if ((e.key === " " || e.key === "ArrowUp") && $("#run").classList.contains("on")){ e.preventDefault(); jump() } });
const PX = () => R.W*PXF;

/* ---------- partículas ---------- */
function puff(x, y, n, col = "rgba(222,184,135,.9)"){
  for (let i = 0; i < n; i++) R.parts.push({x, y, vx: rnd(-14, -4), vy: rnd(-10, -2), r: rnd(1, 2.2), life: .6, max: .6, col});
}
function shine(x, y){
  for (let i = 0; i < 6; i++){ const a = i*Math.PI/3; R.parts.push({x, y, vx: Math.cos(a)*22, vy: Math.sin(a)*22, r: 1.1, life: .4, max: .4, col: "#fff6a8"}) }
}

/* ---------- mundo ---------- */
function spawn(){
  const n = R.next, x = R.W + 12;
  if (R.dist >= n.obs){
    const kind = ["cactus", "rock", "barrel", "hay"][Math.floor(Math.random()*4)];
    const dim = {cactus: [7, 12], rock: [9, 6], barrel: [7, 9], hay: [10, 7]}[kind];
    R.objs.push({type: "obs", kind, x, w: dim[0], h: dim[1]});
    n.obs = R.dist + rnd(60, 115);
  }
  if (R.dist >= n.plat){
    const y = GROUND - pick([19, 27]), w = rnd(26, 40);
    R.objs.push({type: "plat", x, y, w});
    for (let i = 0; i < Math.floor(w/8); i++) R.objs.push({type: "star", x: x + 4 + i*8, y: y - 6, bob: i});
    n.plat = R.dist + rnd(150, 230);
    if (n.obs - R.dist < 30) n.obs = R.dist + 45;
  }
  if (R.dist >= n.star){
    const lift = Math.random() < .5;
    for (let i = 0; i < 5; i++) R.objs.push({type: "star", x: x + i*7, y: GROUND - 7 - (lift ? Math.sin(i/4*Math.PI)*15 : 0), bob: i});
    n.star = R.dist + rnd(55, 95);
  }
  if (R.dist >= n.shoe){
    if (R.horse <= 0) R.objs.push({type: "shoe", x, y: GROUND - 17});
    n.shoe = R.dist + rnd(480, 680);
  }
}

function frame(now){
  raf = requestAnimationFrame(frame);
  const dt = Math.min(.05, (now - last)/1000); last = now;
  if (R.started) update(dt);
  draw();
}

function update(dt){
  R.t += dt;
  R.base = Math.min(78, 52 + R.t*.35);
  if (R.slow > 0) R.slow -= dt;
  if (R.hurt > 0) R.hurt -= dt;
  const riding = R.horse > 0;
  const speed = R.base*(riding ? 1.45 : 1)*(R.slow > 0 ? .55 + .45*(1 - R.slow/1.2) : 1);
  R.dist += speed*dt;
  spawn();
  for (const o of R.objs) o.x -= speed*dt;
  R.objs = R.objs.filter(o => o.x + (o.w || 4) > -10 && !o.gone);

  // cavalinho
  if (riding){
    R.horse -= dt;
    $("#runHorse").style.width = Math.max(0, R.horse/9*100) + "%";
    // pula sozinho os obstáculos
    const ahead = R.objs.find(o => o.type === "obs" && o.x > PX() + 6 && o.x < PX() + 18);
    if (ahead && R.p.ground){ R.p.vy = -JUMP_HORSE*.9; R.p.ground = false; R.p.jumps = 1 }
    if (R.horse <= 0){ R.p.vy = -70; R.p.ground = false; puff(PX(), R.p.y - 6, 10); sfx("eat") }
  }

  // física
  const P = R.p, prev = P.y;
  P.vy += G*dt; P.y += P.vy*dt; P.ph += dt*speed*.22;
  let landed = false;
  if (P.vy >= 0) for (const o of R.objs){
    if (o.type === "plat" && PX() + 2 > o.x && PX() - 2 < o.x + o.w && prev <= o.y + .5 && P.y >= o.y){ P.y = o.y; P.vy = 0; landed = true }
  }
  if (P.y >= GROUND){ P.y = GROUND; P.vy = 0; landed = true }
  if (landed && !P.ground) puff(PX(), P.y, riding ? 8 : 5);
  P.ground = landed; if (landed) P.jumps = 0;

  // encostar nas coisas
  const half = riding ? 10 : 2.6, top = P.y - (riding ? 30 : 25), cy = P.y - (riding ? 18 : 12);
  for (const o of R.objs){
    if (o.type === "star" && !o.gone){
      const d = Math.hypot(o.x - PX(), o.y - cy);
      if (riding && d < 26){ o.x += (PX() - o.x)*Math.min(1, dt*6); o.y += (cy - o.y)*Math.min(1, dt*6) }   // o laço puxa as estrelas
      if (d < (riding ? 10 : 7)) collect(o);
    }
    if (o.type === "shoe" && Math.abs(o.x - PX()) < 7 && Math.abs(o.y - cy) < 12){
      o.gone = true; R.horse = 9; sfx("win"); puff(PX(), P.y - 6, 14, "rgba(255,255,255,.9)");
      popWord("horse!"); stopAudio(); say("run_horse_" + HORSE.name).then(() => say("en_horse")).then(() => say("run_lasso"));
    }
    if (o.type === "obs" && !o.hit && o.x < PX() + half && o.x + o.w > PX() - half && P.y > GROUND - o.h + 1 && top < GROUND){
      o.hit = true;
      if (riding){ o.fly = true; o.vy = -60; puff(o.x, GROUND - 3, 8); sfx("eat") }
      else if (R.hurt <= 0){
        R.hurt = 1.4; R.slow = 1.2; P.vy = -45; P.ground = false; sfx("ops");
        if (R.t - R.lastOps > 8){ R.lastOps = R.t; stopAudio(); say("run_ops") }
      }
    }
    if (o.fly){ o.vy += G*dt; o.y0 = (o.y0 || 0) + o.vy*dt; o.spin = (o.spin || 0) + dt*10 }
  }
  // joaninha: segue a vaqueira e às vezes voa buscar uma estrela
  const B = R.bug, homeX = PX() - 10, homeY = P.y - (riding ? 42 : 34) + Math.sin(R.t*3)*2;
  if (B.tgt && (B.tgt.gone || B.tgt.x < PX() - 6)) B.tgt = null;
  if (!B.tgt && Math.random() < dt*.7) B.tgt = R.objs.find(o => o.type === "star" && !o.gone && o.x > PX() + 6 && o.x < PX() + 38 && o.y < GROUND - 11) || null;
  const k = Math.min(1, dt*(B.tgt ? 5 : 3));
  B.x += ((B.tgt ? B.tgt.x : homeX) - B.x)*k; B.y += ((B.tgt ? B.tgt.y : homeY) - B.y)*k;
  if (B.tgt && Math.hypot(B.tgt.x - B.x, B.tgt.y - B.y) < 3){ collect(B.tgt); B.tgt = null }
  // partículas
  for (const q of R.parts){ q.x += q.vx*dt; q.y += q.vy*dt; q.life -= dt }
  R.parts = R.parts.filter(q => q.life > 0);
  if (P.ground && Math.random() < dt*(riding ? 18 : 8)) puff(PX() - (riding ? 9 : 1), P.y, 1);
}

function collect(o){
  o.gone = true; R.stars++; shine(o.x, o.y); sfx("eat");
  $("#runScore").textContent = "⭐ " + R.stars;
  if (R.stars % 10 === 0){ popWord("star!"); stopAudio(); say("en_star") }
  if (R.stars % 30 === 0){ addStar(); confetti(); say("run_wow") }
}
function popWord(w){
  const p = document.createElement("div"); p.className = "wordpop"; p.textContent = w;
  p.style.left = (PX()*R.g.u) + "px"; p.style.top = ((R.p.y - 40)*R.g.u) + "px";
  $("#run").appendChild(p); setTimeout(() => p.remove(), 1300);
}

/* ---------- desenho ---------- */
let U = 1;
const X = v => v*U;
function rr(x, y, w, h, r, f){
  x = X(x); y = X(y); w = X(w); h = X(h); r = Math.min(X(r), w/2, h/2);
  ctx.fillStyle = f; ctx.beginPath();
  ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); ctx.fill();
}
function circ(x, y, r, f){ ctx.fillStyle = f; ctx.beginPath(); ctx.arc(X(x), X(y), X(r), 0, 7); ctx.fill() }
function ell(x, y, rx, ry, f, rot = 0){ ctx.fillStyle = f; ctx.beginPath(); ctx.ellipse(X(x), X(y), X(rx), X(ry), rot, 0, 7); ctx.fill() }
function line(x1, y1, x2, y2, w, s){ ctx.strokeStyle = s; ctx.lineWidth = X(w); ctx.lineCap = "round"; ctx.beginPath(); ctx.moveTo(X(x1), X(y1)); ctx.lineTo(X(x2), X(y2)); ctx.stroke() }
function starShape(x, y, r, f){
  ctx.fillStyle = f; ctx.beginPath();
  for (let i = 0; i < 10; i++){ const a = -Math.PI/2 + i*Math.PI/5, q = i % 2 ? r*.45 : r; ctx.lineTo(X(x + q*Math.cos(a)), X(y + q*Math.sin(a))) }
  ctx.closePath(); ctx.fill();
}

function background(){
  const W = R.W, d = R.dist;
  const sky = ctx.createLinearGradient(0, 0, 0, X(GROUND));
  sky.addColorStop(0, "#6ec3ff"); sky.addColorStop(1, "#ffe4b5");
  ctx.fillStyle = sky; ctx.fillRect(0, 0, X(W), X(GROUND));
  circ(W*.8, 18, 9, "#fff3a3"); circ(W*.8, 18, 6.5, "#ffd84d");
  // nuvens
  for (let i = 0; i < 4; i++){ const x = ((i*55 - d*.05) % (W + 40) + W + 40) % (W + 40) - 20, y = 12 + (i % 2)*8;
    ell(x, y, 8, 3, "rgba(255,255,255,.9)"); ell(x + 5, y - 2, 5, 3, "rgba(255,255,255,.9)") }
  // montanhas (mesas) ao fundo
  ctx.fillStyle = "#e9a873";
  for (let k = -1; k < W/60 + 2; k++){
    const x = k*60 - (d*.12 % 60);
    ctx.beginPath(); ctx.moveTo(X(x), X(GROUND)); ctx.lineTo(X(x + 8), X(52)); ctx.lineTo(X(x + 30), X(50)); ctx.lineTo(X(x + 38), X(GROUND)); ctx.fill();
  }
  ctx.fillStyle = "#d98a55";
  for (let k = -1; k < W/45 + 2; k++){
    const x = k*45 - (d*.3 % 45);
    ctx.beginPath(); ctx.moveTo(X(x), X(GROUND)); ctx.quadraticCurveTo(X(x + 22), X(62), X(x + 45), X(GROUND)); ctx.fill();
    rr(x + 30, 66, 2, 12, 1, "#7aa35a"); rr(x + 27.5, 69, 1.6, 5, .8, "#7aa35a");
  }
  // chão
  ctx.fillStyle = "#e2a35f"; ctx.fillRect(0, X(GROUND), X(W), X(100 - GROUND));
  ctx.fillStyle = "#c98a4b"; ctx.fillRect(0, X(GROUND), X(W), X(1.2));
  for (let k = -1; k < W/12 + 2; k++){ const x = k*12 - (d % 12); circ(x, GROUND + 6 + (k % 3), .7, "#c8894d"); circ(x + 6, GROUND + 11, .5, "#f0bd7d") }
}

function obstacle(o){
  const x = o.x, y = GROUND + (o.y0 || 0);
  ctx.save();
  if (o.fly){ ctx.translate(X(x + o.w/2), X(y - o.h/2)); ctx.rotate(o.spin); ctx.translate(-X(x + o.w/2), -X(y - o.h/2)) }
  if (o.kind === "cactus"){
    rr(x + 2, y - 12, 3, 12, 1.5, "#3f9b3a"); rr(x, y - 9, 2, 4.5, 1, "#3f9b3a"); rr(x + 5, y - 10, 2, 5, 1, "#3f9b3a");
    circ(x + 3.5, y - 12.2, 1, "#ff6fae"); circ(x + 3, y - 8, .3, "#1b1b1b"); circ(x + 4.2, y - 8, .3, "#1b1b1b");
  } else if (o.kind === "rock"){
    ell(x + 4.5, y - 3, 4.6, 3.2, "#9aa3ad"); ell(x + 3.5, y - 4.2, 1.6, .8, "#c4cbd3");
  } else if (o.kind === "barrel"){
    rr(x, y - 9, 7, 9, 2, "#a0612f"); rr(x, y - 7.5, 7, 1, .3, "#6b3e1e"); rr(x, y - 2.5, 7, 1, .3, "#6b3e1e");
  } else {
    rr(x, y - 7, 10, 7, 1.5, "#e7c25a"); line(x + 1, y - 4.5, x + 9, y - 4.5, .4, "#c99a2e"); line(x + 1, y - 2.5, x + 9, y - 2.5, .4, "#c99a2e");
  }
  ctx.restore();
}

function heartC(x, y, sz, f){
  ctx.fillStyle = f; ctx.beginPath(); ctx.moveTo(X(x), X(y + sz*.9));
  ctx.bezierCurveTo(X(x - sz*1.7), X(y - sz*.2), X(x - sz*.6), X(y - sz*1.4), X(x), X(y - sz*.4));
  ctx.bezierCurveTo(X(x + sz*.6), X(y - sz*1.4), X(x + sz*1.7), X(y - sz*.2), X(x), X(y + sz*.9)); ctx.fill();
}
function girl(x, y, ph, air, seated, L = LOOK){
  const swing = air ? .5 : Math.sin(ph)*.7, hurt = R && R.hurt > 0 && Math.floor(R.t*12) % 2;
  if (hurt) ctx.globalAlpha = .45;
  const hipY = y - 10, pd = shade(L.pants, .82), hc = L.hairC;
  if (!seated){
    for (const s of [-1, 1]){
      const a = s*swing, fx = x + Math.sin(a)*9, fy = hipY + Math.cos(a)*9;
      line(x, hipY, fx, fy, 2.6, s < 0 ? pd : L.pants);
      rr(fx - 1.4, fy - 1.6, 3.6, 2.8, 1, s < 0 ? shade(L.boots, .85) : L.boots);
    }
  } else {
    line(x, hipY, x + 3.5, hipY + 2, 2.6, L.pants); line(x + 3.5, hipY + 2, x + 3, hipY + 7, 2.4, L.pants);
    rr(x + 1.8, hipY + 6, 3.4, 2.8, 1, L.boots);
  }
  // braço de trás
  line(x, y - 17, x - Math.sin(swing)*5 - 1, y - 12.5, 1.8, shade(L.shirt, .9));
  // corpo: blusa + colete com estrela + cinto
  rr(x - 3.2, y - 19, 6.4, 9.5, 2, L.shirt);
  rr(x - 3.2, y - 19, 2.2, 9.5, 1, L.vest); rr(x + 1, y - 19, 2.2, 9.5, 1, L.vest);
  starShape(x - 2.1, y - 15, 1.1, "#ffd84d");
  rr(x - 3.3, y - 10.8, 6.6, 1.3, .5, "#7a4a24"); rr(x - .5, y - 10.9, 1.6, 1.5, .3, "#ffd84d");
  // lenço no pescoço
  if (L.scarf !== "none"){
    ctx.fillStyle = L.scarf; ctx.beginPath(); ctx.moveTo(X(x - 2.8), X(y - 18.8)); ctx.lineTo(X(x + 3.4), X(y - 18.8)); ctx.lineTo(X(x + .9), X(y - 15.6)); ctx.fill();
    circ(x + .4, y - 18.4, .8, shade(L.scarf, .8));
  }
  // braço da frente
  const hx = x + Math.sin(swing)*5 + 1.5, hy = y - 12.5 - (air ? 4 : 0);
  line(x + .5, y - 17, hx, hy, 1.9, L.shirt); circ(hx, hy, 1.1, "#f3c9a0");
  // cabelo (atrás)
  if (L.hair === "chiquinha"){ circ(x - 4.6, y - 21, 2, hc); circ(x - 5.6, y - 19.4, 1.5, hc) }
  if (L.hair === "rabo"){ ctx.strokeStyle = hc; ctx.lineWidth = X(2.6); ctx.lineCap = "round"; ctx.beginPath(); ctx.moveTo(X(x - 3), X(y - 24)); ctx.quadraticCurveTo(X(x - 9.5), X(y - 22), X(x - 8.4), X(y - 15)); ctx.stroke() }
  if (L.hair === "solto") rr(x - 5.3, y - 25.6, 6, 11.6, 2.6, hc);
  if (L.hair === "black"){ circ(x - .6, y - 24.6, 5.6, hc); circ(x - 4.6, y - 21.4, 3.4, hc) }
  if (L.hair === "curto") circ(x - 1.1, y - 22.4, 5, hc);
  // cabeça
  circ(x + .4, y - 22.5, 4.3, "#f3c9a0");
  ctx.fillStyle = hc; ctx.beginPath(); ctx.arc(X(x + .2), X(y - 23), X(4.4), Math.PI*1.02, Math.PI*1.95); ctx.fill();
  if (L.hair === "chiquinha") circ(x - 3.6, y - 21.8, .8, "#ff4d8d");
  if (L.hair === "rabo") circ(x - 3.4, y - 23.6, .8, "#ff4d8d");
  circ(x + 2.2, y - 23, .55, "#1b1b1b"); circ(x + 2.4, y - 23.2, .2, "#fff");
  circ(x + 2.6, y - 21, .9, "rgba(255,120,150,.5)");
  ctx.strokeStyle = "#8a3b2a"; ctx.lineWidth = X(.45); ctx.beginPath(); ctx.arc(X(x + 2.5), X(y - 21.6), X(1.2), .3, 1.9); ctx.stroke();
  // chapéu de vaqueira + enfeite
  const band = L.hat === "#ffd84d" ? "#ff4d8d" : "#ffd84d";
  ell(x + .5, y - 26.2, 7, 1.4, L.hat);
  ctx.fillStyle = L.hat; ctx.beginPath();
  ctx.moveTo(X(x - 3.6), X(y - 26)); ctx.lineTo(X(x - 3.2), X(y - 30.5)); ctx.quadraticCurveTo(X(x + .4), X(y - 29), X(x + 4), X(y - 30.5)); ctx.lineTo(X(x + 4.4), X(y - 26)); ctx.fill();
  ell(x + .5, y - 26.4, 6.6, .5, shade(L.hat, .85));
  rr(x - 3.5, y - 27.8, 7.9, 1.2, .4, band);
  const dx = x + .4, dy = y - 28.9;
  if (L.deco === "estrela") starShape(dx, dy, 1.1, "#fff");
  if (L.deco === "coracao") heartC(dx, dy, .9, "#ff3d6e");
  if (L.deco === "flor"){ for (let i = 0; i < 5; i++){ const a = i*1.256; circ(dx + Math.cos(a)*.75, dy + Math.sin(a)*.75, .55, "#fff") } circ(dx, dy, .45, "#ffd84d") }
  if (L.deco === "laco"){ ctx.fillStyle = "#ff3d8f"; ctx.beginPath(); ctx.moveTo(X(dx), X(dy)); ctx.lineTo(X(dx - 1.6), X(dy - 1)); ctx.lineTo(X(dx - 1.6), X(dy + 1)); ctx.moveTo(X(dx), X(dy)); ctx.lineTo(X(dx + 1.6), X(dy - 1)); ctx.lineTo(X(dx + 1.6), X(dy + 1)); ctx.fill(); circ(dx, dy, .45, "#ff3d8f") }
  ctx.globalAlpha = 1;
}

function horse(x, y, ph, air, H = HORSE){
  const g = air ? .6 : 1, coat = H.coat, dark = shade(coat, .86), mark = light(coat) ? "#b38b62" : "#ffffff";
  const maneC = i => H.mane === "rainbow" ? ["#ef4444", "#f97316", "#facc15", "#22c55e", "#3b82f6", "#a855f7"][i % 6] : H.mane;
  // pernas (galope)
  [[-6, 0], [-4, 2.2], [5, 1.1], [7, 3.3]].forEach(([dx, o], i) => {
    const a = air ? (i < 2 ? -.7 : .7) : Math.sin(ph*1.3 + o)*.6;
    const fx = x + dx + Math.sin(a)*8*g, fy = y - 8 + Math.cos(a)*8;
    line(x + dx, y - 9, fx, fy, 2.3, i % 2 ? dark : coat);
    if (H.marks === "meias") line(x + dx + Math.sin(a)*5.5*g, y - 8 + Math.cos(a)*5.5, fx, fy, 2.4, mark === "#ffffff" ? "#fff" : "#f5f0e8");
    rr(fx - 1.3, fy - .6, 2.6, 1.6, .5, "#3b2416");
  });
  // rabo
  ctx.strokeStyle = maneC(0); ctx.lineWidth = X(2.2); ctx.lineCap = "round"; ctx.beginPath();
  ctx.moveTo(X(x - 9.5), X(y - 13)); ctx.quadraticCurveTo(X(x - 15), X(y - 13 + Math.sin(ph)*2), X(x - 14), X(y - 7)); ctx.stroke();
  // corpo + desenho do pelo
  ell(x, y - 12, 10.5, 5, coat);
  if (H.marks === "pintas"){ ell(x - 4, y - 13, 2.2, 1.5, mark); ell(x + 3, y - 10.5, 1.6, 1.1, mark); ell(x - 7, y - 10.5, 1.2, .9, mark) }
  if (H.marks === "manchas"){ ell(x - 3.5, y - 12.5, 4.2, 3, mark, .3); ell(x + 5, y - 11, 2.6, 2.2, mark, -.4) }
  // pescoço e cabeça
  ctx.fillStyle = coat; ctx.beginPath();
  ctx.moveTo(X(x + 6), X(y - 15)); ctx.lineTo(X(x + 10.5), X(y - 22)); ctx.lineTo(X(x + 13), X(y - 19)); ctx.lineTo(X(x + 10), X(y - 10)); ctx.fill();
  ell(x + 13.5, y - 20.5, 4.2, 2.5, coat, .35); ell(x + 16.2, y - 19.3, 1.9, 1.6, shade(coat, 1.25), .35);
  if (H.marks === "meias" || H.marks === "manchas") ell(x + 14, y - 21.2, 2.4, .6, mark, .35);
  ctx.fillStyle = coat; ctx.beginPath(); ctx.moveTo(X(x + 11), X(y - 23)); ctx.lineTo(X(x + 11.8), X(y - 26.5)); ctx.lineTo(X(x + 13), X(y - 23)); ctx.fill();
  circ(x + 13.4, y - 21.4, .55, "#1b1b1b"); circ(x + 13.6, y - 21.6, .18, "#fff"); circ(x + 17, y - 19.2, .3, shade(coat, .6));
  for (let i = 0; i < 4; i++) circ(x + 7 + i*1.3, y - 16 - i*1.8, 1.4, maneC(i + 1));   // crina
  // sela
  rr(x - 3.5, y - 17.2, 6.5, 2.6, 1.2, H.saddle); rr(x - 1, y - 14.8, 1.4, 4, .6, shade(H.saddle, .75));
}

/* a joaninha da Agnes voando junto */
function ladybug(x, y, t){
  const f = Math.abs(Math.sin(t*28));
  ctx.globalAlpha = .55; ell(x - .8, y - 2.4, 1.6, .7 + f*1.2, "#ffffff", -.5); ell(x + .6, y - 2.6, 1.6, .7 + f*1.2, "#ffffff", .5); ctx.globalAlpha = 1;
  ell(x, y, 2.6, 2.2, "#ec4f9c");
  line(x - 2.2, y - .3, x + 2.2, y + .2, .35, "#2b1419"); line(x - 1.8, y + 1.2, x + 1.8, y + 1.5, .35, "#2b1419");
  circ(x + 2.3, y - 1.5, 1.7, "#2b1419"); circ(x + 2.5, y - 1.4, 1.3, "#f1d6b6"); circ(x + 3.1, y - 1.2, .35, "#e889b5");
  circ(x - .6, y + 2.2, .5, "#2b1419"); circ(x + 1, y + 2.3, .5, "#2b1419");
}

function draw(){
  const g = R.g; U = g.u;
  ctx.clearRect(0, 0, g.w, g.h);
  background();
  for (const o of R.objs){
    if (o.type === "plat"){
      rr(o.x, o.y, o.w, 3, 1.2, "#a0612f"); rr(o.x, o.y, o.w, 1, .6, "#c98a4b");
      for (let k = 2; k < o.w; k += 6) circ(o.x + k, o.y + 1.8, .3, "#6b3e1e");
    } else if (o.type === "star"){
      const b = Math.sin(R.t*4 + o.bob)*.8;
      starShape(o.x, o.y + b, 2.6, "#c99a10"); starShape(o.x, o.y + b - .2, 2.2, "#ffd84d");
    } else if (o.type === "shoe"){
      const b = Math.sin(R.t*3)*1.5;
      circ(o.x, o.y + b, 5.5, "rgba(255,255,255,.45)");
      ctx.strokeStyle = "#8a96a3"; ctx.lineWidth = X(1.8); ctx.lineCap = "round"; ctx.beginPath();
      ctx.arc(X(o.x), X(o.y + b), X(3), Math.PI*.95, Math.PI*2.05, true); ctx.stroke();
      starShape(o.x + 4, o.y + b - 4, 1.2, "#fff");
    } else obstacle(o);
  }
  const P = R.p, x = PX(), air = !P.ground;
  if (R.horse > 0){
    horse(x, P.y, P.ph, air); girl(x - .5, P.y - 7, P.ph, air, true);
    // laço girando
    const gy = P.y - 7, rx = 5 + Math.sin(R.t*9)*1.2;
    line(x + 1.6, gy - 13, x + 3, gy - 33, .5, "#c8894d");
    ctx.strokeStyle = "#c8894d"; ctx.lineWidth = X(.6); ctx.beginPath(); ctx.ellipse(X(x + 3), X(gy - 34), X(rx), X(1.7), Math.sin(R.t*9)*.2, 0, 7); ctx.stroke();
  } else girl(x, P.y, P.ph, air, false);
  ladybug(R.bug.x, R.bug.y, R.t);
  for (const q of R.parts){ ctx.globalAlpha = Math.max(0, q.life/q.max); circ(q.x, q.y, q.r, q.col) }
  ctx.globalAlpha = 1;
}

addEventListener("resize", () => { if (R && $("#run").classList.contains("on")){ R.g = size(); R.W = R.g.w/R.g.u } });
/* ---------- montar a vaqueira e o cavalinho ---------- */
const GIRL_ROWS = [
  {k: "hair",  t: "Cabelo", kind: "girl", opts: ["chiquinha", "rabo", "solto", "black", "curto"]},
  {k: "hairC", t: "Cor do cabelo", opts: ["#6b3e26", "#222222", "#f4c542", "#c8532a", "#ff8cc6", "#8b5cf6"]},
  {k: "hat",   t: "Chapéu", opts: ["#ff4d8d", "#8b5cf6", "#5ec8ff", "#ffffff", "#ffd84d", "#8b5a2b"]},
  {k: "deco",  t: "Enfeite do chapéu", kind: "girl", opts: ["estrela", "laco", "flor", "coracao"]},
  {k: "shirt", t: "Blusa", opts: ["#ff7eb6", "#ffffff", "#5ec8ff", "#7ad16a", "#c4b5fd"]},
  {k: "vest",  t: "Colete", opts: ["#8b5cf6", "#ff4d8d", "#1d74d8", "#22c55e", "#8b5a2b", "#222222"]},
  {k: "scarf", t: "Lenço", opts: ["none", "#5ec8ff", "#ffd84d", "#ff4d8d", "#22c55e", "#ffffff"]},
  {k: "pants", t: "Calça", opts: ["#4a6fd1", "#ff8cc6", "#a78bfa", "#333333", "#22c55e"]},
  {k: "boots", t: "Botas", opts: ["#7a4a24", "#ff4d8d", "#ffffff", "#222222", "#8b5cf6", "#ffd84d"]}
];
const NAMES = {pipoca: "Pipoca", biscoito: "Biscoito", estrela: "Estrela", trovao: "Trovão", algodao: "Algodão", caramelo: "Caramelo"};
const HORSE_ROWS = [
  {k: "name",   t: "Nome", kind: "name", opts: Object.keys(NAMES)},
  {k: "coat",   t: "Pelo", opts: ["#b07a45", "#d9a05b", "#f5f0e8", "#3a2a22", "#9aa3ad", "#f9a8d4", "#c4b5fd"]},
  {k: "marks",  t: "Desenho no pelo", kind: "horse", opts: ["pintas", "manchas", "meias", "nada"]},
  {k: "mane",   t: "Crina", opts: ["#5a3418", "#f4c542", "#ffffff", "#ff4d8d", "#222222", "rainbow"]},
  {k: "saddle", t: "Sela", opts: ["#ff4d8d", "#8b5cf6", "#1d74d8", "#ffd84d", "#22c55e"]}
];
let tab = "girl", prevRaf = 0, hop = 0;
function withCtx(c2, u, fn){ const oc = ctx, ou = U; ctx = c2; U = u; fn(); ctx = oc; U = ou }
function thumb(canvas, row, opt){
  const dpr = devicePixelRatio || 1, px = 64; canvas.width = px*dpr; canvas.height = px*dpr;
  const c2 = canvas.getContext("2d"); c2.setTransform(dpr, 0, 0, dpr, 0, 0);
  if (row.kind === "girl") withCtx(c2, px/16, () => girl(7.6, 32, 0, false, false, {...LOOK, [row.k]: opt}));
  else withCtx(c2, px/31, () => horse(13.5, 29, 0, false, {...HORSE, [row.k]: opt}));
}
function renderOpts(){
  const rows = tab === "girl" ? GIRL_ROWS : HORSE_ROWS, obj = tab === "girl" ? LOOK : HORSE;
  document.querySelectorAll(".rs-tabs button").forEach(b => b.classList.toggle("on", b.dataset.t === tab));
  $("#rsOpts").innerHTML = rows.map((r, ri) => `<div class="rs-row"><b>${r.t}</b><div class="sw">${r.opts.map(o => {
    const on = obj[r.k] === o ? " on" : "";
    if (r.kind === "name") return `<button class="opt name${on}" data-r="${ri}" data-o="${o}">${NAMES[o]}</button>`;
    if (r.kind) return `<button class="opt thumb${on}" data-r="${ri}" data-o="${o}"><canvas></canvas></button>`;
    const bg = o === "none" ? "#fff" : o === "rainbow" ? "conic-gradient(#ef4444,#f97316,#facc15,#22c55e,#3b82f6,#a855f7,#ef4444)" : o;
    return `<button class="opt${on}${o === "none" ? " none" : ""}" data-r="${ri}" data-o="${o}" style="background:${bg}"></button>`;
  }).join("")}</div></div>`).join("");
  $("#rsOpts").querySelectorAll(".opt.thumb").forEach(b => thumb(b.querySelector("canvas"), rows[+b.dataset.r], b.dataset.o));
}
$("#rsOpts").addEventListener("click", e => {
  const b = e.target.closest(".opt"); if (!b) return;
  const rows = tab === "girl" ? GIRL_ROWS : HORSE_ROWS, row = rows[+b.dataset.r], o = b.dataset.o;
  if (tab === "girl"){ LOOK[row.k] = o; store.set("vaqueira", LOOK) } else { HORSE[row.k] = o; store.set("cavalinho", HORSE) }
  hop = .35; sfx("eat");
  const top = $("#rsOpts").scrollTop; renderOpts(); $("#rsOpts").scrollTop = top;
  if (row.k === "name"){ stopAudio(); say("run_horse_" + o) }
});
document.querySelectorAll(".rs-tabs button").forEach(b => b.onclick = () => { tab = b.dataset.t; renderOpts(); $("#rsOpts").scrollTop = 0; sfx("eat") });
$("#rsDice").onclick = () => {
  for (const r of GIRL_ROWS) LOOK[r.k] = pick(r.opts);
  for (const r of HORSE_ROWS) HORSE[r.k] = pick(r.opts);
  store.set("vaqueira", LOOK); store.set("cavalinho", HORSE); hop = .35; sfx("win"); renderOpts();
};
$("#rsGo").onclick = () => startRun();
function preview(){
  prevRaf = requestAnimationFrame(preview);
  const pc = $("#runPrev"), r = pc.getBoundingClientRect(), dpr = devicePixelRatio || 1;
  if (pc.width !== Math.round(r.width*dpr)){ pc.width = Math.round(r.width*dpr); pc.height = Math.round(r.height*dpr) }
  const c2 = pc.getContext("2d"); c2.setTransform(dpr, 0, 0, dpr, 0, 0);
  const u = Math.min(r.height/44, r.width/50), W = r.width/u, t = performance.now()/1000;
  hop = Math.max(0, hop - 1/60); const h = Math.sin(hop/.35*Math.PI)*3;
  withCtx(c2, u, () => {
    const sky = c2.createLinearGradient(0, 0, 0, X(36)); sky.addColorStop(0, "#6ec3ff"); sky.addColorStop(1, "#ffe4b5");
    c2.fillStyle = sky; c2.fillRect(0, 0, r.width, r.height);
    circ(W*.85, 7, 4, "#ffd84d");
    c2.fillStyle = "#e2a35f"; c2.fillRect(0, X(36), r.width, r.height);
    const gx = W/2 - 15, hx = W/2 + 8;
    girl(gx, 36 - h, 0, false, false);
    horse(hx, 36 - (tab === "horse" ? h : 0), Math.sin(t*2)*.3, false);
    ladybug(gx + 9, 8 + Math.sin(t*3)*1.5, t);
  });
}
window.openRunSetup = function(){
  show("runSetup"); tab = "girl"; renderOpts();
  prevRaf = requestAnimationFrame(preview);
  say("run_setup");
};
const oldStop = window.stopRun;
window.stopRun = function(){ if (prevRaf){ cancelAnimationFrame(prevRaf); prevRaf = 0 } oldStop() };
$("#goRun").onclick = () => openRunSetup();
window.__corrida = () => ({R, PX});   // só para testes
})();
