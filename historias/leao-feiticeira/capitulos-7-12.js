"use strict";
/* ============ O Leão, a Feiticeira e o Guarda-Roupa · capítulos 7 a 12 ============ (usa window.Narnia.leao, de capitulos-1-6.js) */
(function(){
const N = window.Narnia; if (!N || !N.leao) return;
const {peca, svg, tag, estrelas} = N;
const {coroa, emoji, poste} = N.parte2;
const {im, im1, P, capa, fim, dica, fala, placa, nota, neve, tumnus, castelo, represa, buracoGelo, tronos, DIR2} = N.leao;

/* ---------- desenhos ---------- */
const bigode = `<g class="risco r1"><path d="M30 64 q10 -8 20 0 q10 -8 20 0" stroke="#111" stroke-width="4" fill="none" stroke-linecap="round"/></g>
  <g class="risco r2"><circle cx="38" cy="44" r="9" fill="none" stroke="#111" stroke-width="3"/><circle cx="62" cy="44" r="9" fill="none" stroke="#111" stroke-width="3"/><path d="M47 44 h6" stroke="#111" stroke-width="3"/></g>`;
const presentes = [["#c0392b", "espada e escudo", `<path d="M30 70 v-50 l6 -8 l6 8 v50Z" fill="#d8dce0"/><rect x="24" y="68" width="24" height="5" fill="#a97a10"/><path d="M60 20 h34 v30 q0 20 -17 28 q-17 -8 -17 -28Z" fill="#c0392b" stroke="#d9b25a" stroke-width="3"/><text x="77" y="52" text-anchor="middle" font-size="18">🦁</text>`],
  ["#2a6a4a", "arco e trompa", `<path d="M20 10 q30 40 0 80" stroke="#8a5a2a" stroke-width="5" fill="none"/><path d="M20 10 v80" stroke="#ddd" stroke-width="1.5"/><path d="M56 60 q20 -40 44 -36 l-4 14 q-20 0 -30 30Z" fill="#e8dcc8" stroke="#a98a5a" stroke-width="2"/>`],
  ["#3a5aa0", "frasco e punhal", `<path d="M30 30 h20 v10 q12 6 12 24 q0 22 -22 22 q-22 0 -22 -22 q0 -18 12 -24Z" fill="#e8b0c0" stroke="#c9a24a" stroke-width="3"/><rect x="34" y="20" width="12" height="12" fill="#c9a24a"/><path d="M80 80 l6 -50 l6 50Z" fill="#d8dce0"/><rect x="78" y="78" width="16" height="5" fill="#a97a10"/>`]];
const presentesSvg = presentes.map(([c, nome, item], i) => `<g class="presente" data-i="${i}" transform="translate(${10 + i*130} 30)">
  <g class="item">${item}<text x="60" y="118" text-anchor="middle" font-family="IM Fell English, serif" font-size="13" fill="#3a2a1a">${nome}</text></g>
  <g class="caixa"><rect x="10" y="40" width="100" height="70" rx="4" fill="${c}"/><rect x="54" y="40" width="12" height="70" fill="#f2c94a"/><g class="tampa"><rect x="4" y="26" width="112" height="18" rx="4" fill="${c}"/><rect x="54" y="26" width="12" height="18" fill="#f2c94a"/><path d="M60 26 q-20 -22 -26 -4 q10 6 26 4 q16 2 26 -4 q-6 -18 -26 4Z" fill="#f2c94a"/></g></g></g>`).join("");
const degelo = `<rect width="400" height="240" fill="#8fbf5a"/>${Array.from({length: 9}, (_, i) => {
  const x = 30 + (i % 3)*130, y = 20 + Math.floor(i/3)*74, fl = ["🌼", "🌷", "🌸", "🌻", "🪻", "🌺", "🌼", "🌷", "🌸"][i];
  return `<text x="${x + 40}" y="${y + 52}" text-anchor="middle" font-size="40">${fl}</text><g class="mancha" data-i="${i}"><ellipse cx="${x + 40}" cy="${y + 36}" rx="58" ry="34" fill="#f4f8fc"/><ellipse cx="${x + 30}" cy="${y + 28}" rx="20" ry="8" fill="#fff"/></g>`}).join("")}`;
const trompa = `<path d="M20 60 q100 -10 200 -50 l20 10 l-6 70 l-20 6 q-90 -36 -194 -24Z" fill="#e8dcc8" stroke="#a98a5a" stroke-width="4"/><ellipse cx="234" cy="50" rx="14" ry="42" fill="#c9b08a" stroke="#a98a5a" stroke-width="4"/>
  <path d="M60 58 q20 10 40 -2 M120 46 q20 12 40 -4" stroke="#c9a24a" stroke-width="5" fill="none"/><g class="ondas-som"><path d="M260 20 q20 30 0 60 M280 6 q30 44 0 88 M300 -6 q40 56 0 112" stroke="#f2c94a" stroke-width="5" fill="none"/></g>`;
const tenda = `<rect width="400" height="240" fill="#bfe3f0"/><path d="M0 170 Q200 140 400 170 V240 H0Z" fill="#6aa04a"/><path d="M120 190 L200 40 L280 190Z" fill="#e8c46a"/><path d="M200 40 L240 190 L200 190Z" fill="#c9a24a"/><path d="M200 40 v-24" stroke="#6b4a2a" stroke-width="4"/><path d="M200 16 l24 8 l-24 8Z" fill="#c0392b"/>
  <path d="M180 190 q20 -50 40 0Z" fill="#7a2a2a"/>`;

/* ---------- Capítulo 7 ---------- */
const L7 = {id: "leao7", curto: "Um dia com os castores", mini: im("castor", {x: 0, y: 0, w: 100, e: "fade"}),
  paginas: [
  capa(7, "Um dia com os castores", ["O pisco levou os quatro irmãos pela floresta, e um bicho de bigodes os chamou: — Psiu! Por aqui!"], im("castor", {x: 4, y: 30, w: 56, e: "pop", t: .1, d: 3, z: 3}), "neve"),
  P("neve", neve() + im("castor", {x: 4, y: 20, w: 50, e: "pop", t: .0, d: 3, z: 3}) + peca(`<span class="bicho">🤍</span>`, {x: 60, y: 30, w: 12, e: "zoom", t: .3, z: 4, c: "emoji"}) + nota("o lencinho da Lúcia", {x: 50, y: 60, w: 40, r: 3, t: .4}),
    ["Era um <b>castor</b>! Para provar que era amigo, ele mostrou um lencinho: o mesmo que a Lúcia tinha dado ao Sr. Tumnus.", "— O fauno me entregou antes de ser preso — sussurrou o Sr. Castor. — Ele me pediu para ajudar vocês."]),
  P("magia", im1("aslam-rosto", {x: 30, y: 4, w: 40, e: "zoom", t: .1, d: 2, z: 2, c: "longe"}) + fala("— Aslam está a caminho!", {x: 10, y: 80, w: 56, r: -2, t: .4}),
    ["Então o castor cochichou uma coisa misteriosa: — Dizem que <b>Aslam está a caminho</b>.", "E aconteceu uma coisa curiosa: ao ouvir esse nome, cada criança sentiu algo diferente. O Pedro sentiu coragem. A Susana, um perfume gostoso. A Lúcia, a alegria de acordar nas férias. E o Edmundo... sentiu medo."]),
  P("neve", svg("0 0 320 200", represa, {x: 0, y: 6, w: 96, e: "pop", t: .0, d: 2, c: "moldura"}) + nota("a casa dos castores", {x: 30, y: 80, w: 44, r: -2, t: .4}),
    ["O Sr. Castor levou as crianças até a sua casa: uma casinha redonda em cima de uma represa, no meio de um rio congelado.", "Saía fumaça da chaminé. Lá dentro estava quentinho!"]),
  P("sala", im("castor", {x: 4, y: 20, w: 46, e: "pop", t: .0, d: 3, z: 3}) + nota("Sra. Castor", {x: 54, y: 20, w: 28, r: 3, t: .3}) + peca(`<span class="bicho">🧵</span>`, {x: 60, y: 44, w: 14, e: "zoom", t: .4, z: 4, c: "emoji"}),
    ["A <b>Sra. Castor</b> estava costurando numa máquina de costura, no cantinho.", "— Finalmente vocês chegaram! — disse ela, toda contente. — Vou fazer o jantar!"]),
  P("neve", peca(`<svg viewBox="0 0 320 200">${buracoGelo}</svg><span class="conta-peixe"></span>`, {x: 4, y: 10, w: 90, e: "pop", t: .0, d: 2, z: 3, a: "pesca", c: "pesca-peca"}) + im("pedro", {x: 70, y: 10, w: 16, e: "dir", t: .2, d: 4, z: 4}),
    ["O Pedro e o Sr. Castor foram pescar num buraco no gelo do rio.", "Em pouquinho tempo, já tinham uma porção de peixes fresquinhos para o jantar!", dica("toque no buraco do gelo para pescar")]),
  P("sala", peca(`<span class="bicho">🐟</span>`, {x: 10, y: 10, w: 16, e: "zoom", t: .0, z: 3, c: "emoji"}) + peca(`<span class="bicho">🥔</span>`, {x: 34, y: 20, w: 16, e: "zoom", t: .1, z: 3, c: "emoji"}) + peca(`<span class="bicho">🍰</span>`, {x: 58, y: 10, w: 16, e: "zoom", t: .2, z: 3, c: "emoji"}) + peca(`<span class="bicho">🫖</span>`, {x: 30, y: 50, w: 16, e: "zoom", t: .3, z: 3, c: "emoji"}),
    ["Que jantar gostoso! Peixe frito, batatas com manteiga, leite para as crianças, cerveja para o Sr. Castor...", "E de sobremesa, um rocambole de geleia quentinho, ainda fumegando."]),
  P("magia", im1("jadis", {x: 6, y: 0, w: 32, e: "pop", t: .0, d: 2, z: 2}) + nota("transforma em pedra", {x: 44, y: 30, w: 44, r: 3, t: .3}),
    ["Depois do jantar, o Sr. Castor contou sobre o Sr. Tumnus: — Ele foi levado para a casa da Feiticeira. E dizem que ela transforma seus inimigos em <b>estátuas de pedra</b>.", "As crianças ficaram tristíssimas."]),
  P("magia", im1("aslam", {x: 2, y: 16, w: 60, e: "pop", t: .0, d: 2, z: 2}) + placa("o Grande Leão", {x: 60, y: 70, w: 32, r: -3, t: .4}),
    ["— Mas quem é esse tal de Aslam? — perguntou Susana.", "— Aslam? Vocês não sabem? — o castor arregalou os olhos. — Ele é o Rei de Nárnia, o filho do Grande Imperador-de-Além-Mar. Ele é o Grande Leão."]),
  P("magia", im1("aslam-rosto", {x: 30, y: 4, w: 36, e: "zoom", t: .0, d: 2, z: 2}) + fala("— Ele é bom... mas não é manso!", {x: 6, y: 80, w: 60, r: -2, t: .3}),
    fim(["— Um leão? — disse Lúcia. — Ele é perigoso?", "— Perigoso? — riu o Sr. Castor. — Claro que é! Mas ele é <b>bom</b>. Ele é o Rei."], "leao8"), {final: true})
]};

/* ---------- Capítulo 8 ---------- */
const L8 = {id: "leao8", curto: "Os quatro tronos", mini: svg("0 0 120 90", coroa, {x: 0, y: 0, w: 100, e: "fade"}),
  paginas: [
  capa(8, "Os quatro tronos", ["Depois do jantar, o Sr. Castor começou a contar quem era Aslam."], svg("0 0 400 220", tronos, {x: 2, y: 30, w: 60, e: "pop", t: .1, d: 2, z: 2, c: "todos-coroados"}), "magia"),
  P("magia", im1("aslam-rosto", {x: 4, y: 4, w: 36, e: "zoom", t: .0, d: 2, z: 2}) + nota("uma profecia antiga", {x: 46, y: 20, w: 44, r: 3, t: .3}),
    ["O Sr. Castor contou uma profecia bem antiga, que todos em Nárnia conheciam:", "<p><i>Quando Aslam chegar, o que está errado vai ficar certo. Quando ele rugir, a tristeza vai embora. E quando ele sacudir a juba, a primavera vai voltar.</i></p>"]),
  P("papel", peca(`<svg viewBox="0 0 400 220">${tronos}</svg>`, {x: 0, y: 10, w: 100, e: "pop", t: .0, d: 2, z: 3, a: "trono", c: "tronos-peca"}) + placa("Cair Paravel!", {x: 34, y: 80, w: 32, r: -2, t: 1, c: "achou"}),
    ["— E tem mais — disse o castor. — No castelo de <b>Cair Paravel</b>, lá na beira do mar, existem quatro tronos vazios.", "Diz a lenda que, quando dois Filhos de Adão e duas Filhas de Eva se sentarem neles, o reinado da Feiticeira vai acabar!", dica("toque nos tronos para colocar as coroas")]),
  P("magia", im("tres", {x: 10, y: 30, w: 50, e: "pop", t: .0, d: 3, z: 3}) + im("susana", {x: 62, y: 22, w: 15, e: "dir", t: .1, d: 3, z: 3}) + nota("dois meninos e duas meninas...", {x: 20, y: 6, w: 60, r: -2, t: .3}),
    ["Os quatro irmãos se olharam. Dois meninos e duas meninas... Eram eles!", "— Por isso a Feiticeira tem tanto medo de humanos — disse a Sra. Castor. — Ela sabe que vocês podem acabar com o reinado dela."]),
  P("sala", im("castor", {x: 4, y: 20, w: 44, e: "pop", t: .0, d: 3, z: 3}) + fala("— Vamos encontrar Aslam na Mesa de Pedra!", {x: 30, y: 80, w: 66, r: -2, t: .3}),
    ["— Aslam marcou um encontro na <b>Mesa de Pedra</b> — disse o Sr. Castor. — Amanhã vamos levar vocês até lá. Só ele pode salvar o Sr. Tumnus."]),
  P("sala", im("tres", {x: 10, y: 30, w: 50, e: "pop", t: .0, d: 3, z: 3, c: "falta-um"}) + fala("— Cadê o Edmundo?!", {x: 50, y: 10, w: 40, r: 3, t: .3}),
    ["Foi aí que a Lúcia percebeu uma coisa:", "— Ué... cadê o Edmundo?"]),
  P("neve", neve() + `<div class="ceu">${estrelas()}</div>` + im("edmundo", {x: 60, y: 30, w: 18, e: "dir", t: .0, d: 4, z: 4, c: "longe"}) + svg("0 0 320 220", castelo, {x: 0, y: 10, w: 50, e: "esq", t: .2, d: 2}),
    ["O Edmundo tinha saído escondido no meio da conversa!", "— Ele foi até a casa da Feiticeira — disse o Sr. Castor, sério. — Ele nos traiu. Eu percebi pelo olhar dele: ele já tinha comido a comida dela."]),
  P("sala", im("tres", {x: 6, y: 30, w: 44, e: "pop", t: .0, d: 3, z: 3}) + peca(`<div class="lagrimas"><i></i><i></i></div>`, {x: 10, y: 34, w: 14, e: "fade", t: .3, z: 4, s: "height:30%"}) + fala("— Precisamos fugir, agora!", {x: 46, y: 70, w: 50, r: 2, t: .4}),
    ["As crianças ficaram tristes e preocupadas. Apesar de tudo, ele era o irmão delas.", "— Não dá para ir atrás dele — disse a Sra. Castor. — A Feiticeira logo vai mandar os lobos para cá. Precisamos fugir, agora!"]),
  P("sala", im("castor", {x: 10, y: 20, w: 40, e: "pop", t: .0, d: 3, z: 3}) + nota("pão · presunto · chá · lenços", {x: 50, y: 30, w: 44, r: 3, t: .3}),
    ["A Sra. Castor começou a arrumar a trouxa com toda a calma: pão, presunto, chá, açúcar, lenços...", "— Depressa, mulher! — dizia o Sr. Castor. E ela respondia: — Calma, já estou terminando!"]),
  P("neve", neve() + `<div class="ceu">${estrelas()}</div>` + im("castor", {x: 4, y: 40, w: 36, e: "esq", t: .0, d: 3, z: 3}) + im("tres", {x: 42, y: 40, w: 46, e: "dir", t: .2, d: 3, z: 3}),
    fim(["E todos saíram da casinha, pela noite escura e cheia de neve, rumo à Mesa de Pedra."], "leao9"), {final: true})
]};

/* ---------- Capítulo 9 ---------- */
const L9 = {id: "leao9", curto: "O castelo da Feiticeira", mini: svg("0 0 320 220", castelo, {x: 0, y: 0, w: 100, e: "fade"}),
  paginas: [
  capa(9, "O castelo da Feiticeira", ["Enquanto isso, o Edmundo andava sozinho pela neve, em direção à casa da Feiticeira."], svg("0 0 320 220", castelo, {x: 4, y: 20, w: 56, e: "pop", t: .1, d: 2, z: 2})),
  P("neve", neve() + `<div class="ceu">${estrelas()}</div>` + im("edmundo", {x: 30, y: 30, w: 20, e: "pop", t: .0, d: 4, z: 4}) + nota("brrrr...", {x: 56, y: 20, w: 20, r: 3, t: .3}),
    ["Coitado do Edmundo. Ele não tinha levado o casaco! Andava no escuro, tremendo, tropeçando na neve, caindo nos buracos.", "E só pensava no manjar turco e em virar príncipe."]),
  P("neve", neve() + svg("0 0 320 220", castelo, {x: 0, y: 4, w: 96, e: "pop", t: .0, d: 2}) + im("edmundo", {x: 44, y: 70, w: 12, e: "subir", t: .3, d: 4, z: 4}),
    ["Finalmente ele chegou ao castelo da Feiticeira: cheio de torres pontudas, como chapéus de bruxa, brilhando sob a lua."]),
  P("neve", neve() + im1("aslam", {x: 20, y: 20, w: 60, e: "pop", t: .0, d: 2, z: 2, c: "pedra"}) + fala("— Um leão!", {x: 6, y: 6, w: 24, r: -4, t: .3}),
    ["No pátio do castelo havia um <b>leão</b> enorme, parado. O Edmundo quase morreu de susto!", "Mas o leão não se mexia. Tinha neve na cabeça. Era um leão de pedra! Uma das estátuas da Feiticeira."]),
  P("neve", neve() + peca(`<img src="${N.DIR}aslam-rosto.webp" alt=""><svg class="rabiscos" viewBox="0 0 100 100">${bigode}</svg>`, {x: 20, y: 4, w: 46, e: "pop", t: .0, d: 2, z: 3, a: "bigode", c: "foto pedra leao-pedra"}),
    ["— Ha! É este o grande Aslam? — riu o Edmundo, que achou que era o Aslam transformado em pedra.", "E, para provocar, ele pegou um toco de lápis e desenhou um bigode e uns óculos na cara do leão. Que feio, Edmundo!", dica("toque no leão de pedra")]),
  P("neve", neve() + ["tres", "castor", "pedro", "lucia"].map((s, i) => im(s, {x: 4 + i*24, y: 20 + (i % 2)*16, w: 20, e: "pop", t: i*.08, d: 2 + i % 2, z: 2, c: "pedra"})).join("") + nota("um pátio de estátuas...", {x: 20, y: 80, w: 50, r: -2, t: .5}),
    ["O pátio estava cheio de estátuas: um gigante, raposas, um centauro, um dragão, faunos, anões...", "Todos eram criaturas de Nárnia que a Feiticeira tinha transformado em pedra. Que pátio mais triste e silencioso!"]),
  P("escuro", im("lobo", {x: 4, y: 16, w: 70, e: "pop", t: .0, d: 2, z: 2}) + fala("— Quem vem lá?", {x: 60, y: 6, w: 34, r: 3, t: .3}),
    ["Na porta do castelo, um lobo enorme estava deitado: era <b>Maugrim</b>, o chefe da polícia secreta.", "— Quem vem lá? — rosnou ele. — Eu vim ver a Rainha — disse Edmundo, com a voz tremendo."]),
  P("magia", im1("jadis", {x: 30, y: 0, w: 38, e: "pop", t: .0, d: 2, z: 2}) + im("edmundo", {x: 4, y: 40, w: 18, e: "esq", t: .2, d: 4, z: 4}) + fala("— Onde estão os outros?!", {x: 60, y: 80, w: 36, r: 3, t: .4}),
    ["A Feiticeira apareceu, terrível. — Você veio sozinho? — gritou ela. — Eu mandei trazer os quatro!", "— Eles estão na casa dos castores — disse o Edmundo. — E... Aslam chegou a Nárnia."]),
  P("magia", im1("jadis", {x: 4, y: 0, w: 34, e: "pop", t: .0, d: 2, z: 2}) + im("lobo", {x: 46, y: 30, w: 50, e: "dir", t: .2, d: 3, z: 3}) + fala("— Vão! Mais rápido que o vento!", {x: 30, y: 82, w: 60, r: -2, t: .4}),
    ["Quando ouviu o nome de Aslam, a Feiticeira ficou branca de raiva.", "— Maugrim! — gritou. — Pegue os lobos mais rápidos e corram até a casa dos castores! Peguem os humanos!"]),
  P("neve", neve() + im("treno", {x: 6, y: 30, w: 60, e: "esq", t: .0, d: 3, z: 3}) + im("edmundo", {x: 66, y: 20, w: 18, e: "dir", t: .2, d: 4, z: 4, c: "enjoado"}),
    fim(["E em vez de manjar turco, o Edmundo ganhou só pão duro e água.", "A Feiticeira mandou preparar o trenó, sem os sininhos, e levou o Edmundo junto, noite adentro, para chegar à Mesa de Pedra antes de todos..."], "leao10"), {final: true})
]};

/* ---------- Capítulo 10 ---------- */
const L10 = {id: "leao10", curto: "Papai Noel chegou!", mini: im("noel", {x: 0, y: 0, w: 70, e: "fade"}),
  paginas: [
  capa(10, "Papai Noel chegou!", ["Os castores e as três crianças fugiram de noite pela neve, rumo à Mesa de Pedra."], im("noel", {x: 10, y: 10, w: 34, e: "pop", t: .1, d: 3, z: 3}), "neve"),
  P("neve", neve() + `<div class="ceu">${estrelas()}</div>` + im("castor", {x: 4, y: 40, w: 36, e: "esq", t: .0, d: 3, z: 3}) + im("tres", {x: 44, y: 44, w: 46, e: "dir", t: .1, d: 3, z: 3}),
    ["Eles andaram a noite inteira, seguindo o rio congelado. Estavam cansadíssimos!", "Quando o dia estava quase nascendo, o Sr. Castor achou uma caverninha escondida para eles descansarem."]),
  P("escuro", svg("0 0 320 220", N.leao.caverna, {x: 0, y: 10, w: 96, e: "pop", t: .0, d: 2, c: "moldura"}) + nota("zzz...", {x: 60, y: 20, w: 18, r: 3, t: .3, c: "fala"}),
    ["Todos se apertaram lá dentro e dormiram um pouquinho, encolhidos, uns encostados nos outros."]),
  P("neve", neve() + im("treno", {x: 20, y: 30, w: 60, e: "dir", t: .0, d: 3, z: 3}) + fala("— Dlim, dlim, dlim...", {x: 10, y: 6, w: 40, r: -3, t: .3}),
    ["De manhã, ouviram sininhos: <i>dlim, dlim, dlim!</i> Todos tremeram de medo. Seria o trenó da Feiticeira?", "O Sr. Castor foi espiar... e voltou rindo e dançando: — Venham ver! Não é ela!"]),
  P("neve", neve() + im("noel", {x: 20, y: 4, w: 46, e: "subir", t: .0, d: 3, z: 3}) + fala("— Ho, ho, ho!", {x: 64, y: 10, w: 28, r: 4, t: .3}),
    ["Era o <b>Papai Noel</b>! Com a roupa vermelha, a barba branca enorme e um trenó cheio de presentes!", "— Ela me manteve longe por muito tempo — disse ele. — Mas agora Aslam está chegando, e a magia da Feiticeira está enfraquecendo!"]),
  P("papel", peca(`<svg viewBox="0 0 400 150">${presentesSvg}</svg>`, {x: 0, y: 20, w: 100, e: "pop", t: .0, d: 2, z: 3, a: "presente", c: "presentes-peca"}),
    ["E ele deu um presente para cada um. Não eram brinquedos: eram presentes importantes, para ajudar na aventura.", dica("toque nos presentes para abrir")]),
  P("magia", im("pedro", {x: 6, y: 20, w: 20, e: "pop", t: .0, d: 3, z: 3}) + nota("espada e escudo", {x: 30, y: 30, w: 34, r: 3, t: .3, c: "placa"}),
    ["Para o Pedro: uma <b>espada</b> e um <b>escudo</b> prateado, com um leão vermelho desenhado.", "— Use quando for preciso — disse o Papai Noel."]),
  P("magia", im("susana", {x: 10, y: 10, w: 16, e: "pop", t: .0, d: 3, z: 3}) + nota("arco, flechas e uma trompa", {x: 30, y: 30, w: 50, r: -3, t: .3, c: "placa"}),
    ["Para a Susana: um <b>arco</b> com flechas, e uma <b>trompa</b> de marfim.", "— Quando você soprar esta trompa, onde quer que esteja, alguém virá ajudá-la."]),
  P("magia", im("lucia", {x: 6, y: 20, w: 18, e: "pop", t: .0, d: 3, z: 3}) + nota("um frasquinho mágico", {x: 30, y: 30, w: 44, r: 3, t: .3, c: "placa"}),
    ["Para a Lúcia: um <b>frasquinho</b> de cristal com um remédio mágico, feito de suco de flores de fogo. Uma gotinha cura qualquer machucado.", "E também um pequeno punhal, só para se defender."]),
  P("neve", neve() + im("noel", {x: 60, y: 10, w: 30, e: "dir", t: .0, d: 3, z: 3}) + peca(`<span class="bicho">🫖</span>`, {x: 20, y: 30, w: 16, e: "zoom", t: .2, z: 4, c: "emoji"}) + fala("— Feliz Natal! Viva o verdadeiro Rei!", {x: 6, y: 80, w: 62, r: -2, t: .4}),
    fim(["Para os castores, ele deu uma bandeja com chá quentinho, açúcar e creme.", "— Feliz Natal! Viva o verdadeiro Rei! — gritou ele. E foi embora no trenó, antes que eles pudessem agradecer."], "leao11"), {final: true})
]};

/* ---------- Capítulo 11 ---------- */
const L11 = {id: "leao11", curto: "O degelo", mini: peca(`<span class="bicho">🌷</span>`, {x: 0, y: 0, w: 100, e: "fade", c: "emoji"}),
  paginas: [
  capa(11, "O degelo", ["O Papai Noel chegou a Nárnia! Sinal de que a magia da Feiticeira estava enfraquecendo."], peca(`<span class="bicho">🌷</span>`, {x: 20, y: 30, w: 20, e: "zoom", t: .2, z: 3, c: "emoji"}), "jardim"),
  P("neve", neve() + im("treno", {x: 10, y: 30, w: 60, e: "esq", t: .0, d: 3, z: 3}) + im("edmundo", {x: 66, y: 20, w: 16, e: "dir", t: .2, d: 4, z: 4, c: "enjoado"}),
    ["Enquanto isso, o pobre Edmundo ia no trenó da Feiticeira, com frio, com fome e muito arrependido.", "Agora ele já sabia: a Feiticeira não era nada boazinha."]),
  P("neve", neve() + im1("jadis", {x: 4, y: 0, w: 34, e: "pop", t: .0, d: 2, z: 2}) + nota("uma festinha de Natal", {x: 46, y: 20, w: 46, r: 3, t: .3}) + emoji("🐿️", {x: 50, y: 50, w: 12, e: "zoom", t: .4, d: 4, z: 4, c: "pedra"}),
    ["No caminho, encontraram uns bichinhos fazendo uma festinha de Natal, com pudim e tudo, presente do Papai Noel.", "A Feiticeira ficou furiosa e, com a varinha, transformou todos em pedra! O Edmundo, pela primeira vez, sentiu pena de alguém."]),
  P("neve", neve() + im("treno", {x: 20, y: 40, w: 60, e: "pop", t: .0, d: 3, z: 3, c: "atolado"}) + nota("o trenó atolou!", {x: 20, y: 10, w: 40, r: -3, t: .3, c: "placa"}),
    ["Então começou a acontecer uma coisa estranha: a neve foi ficando mole, molhada... O trenó começou a atolar na lama!", "<i>Ploc, ploc</i>, faziam as gotas pingando das árvores."]),
  P("jardim", peca(`<svg viewBox="0 0 400 240">${degelo}</svg>`, {x: 0, y: 0, w: 100, e: "fade", t: .0, z: 3, a: "degelo", s: "height:100%"}),
    ["A neve estava derretendo! Por toda parte apareciam manchas verdes de grama, e debaixo delas, flores!", dica("toque na neve para derretê-la")]),
  P("jardim", ["🌼", "🌷", "🌸", "🌻"].map((e, i) => emoji(e, {x: 6 + i*22, y: 60 - (i % 2)*16, w: 12, e: "pop", t: i*.08, d: 3, z: 3})).join("") + ["🐦", "🦋"].map((e, i) => emoji(e, {x: 20 + i*40, y: 10, w: 12, e: "zoom", t: .4 + i*.1, d: 4, z: 4})).join(""),
    ["Os passarinhos começaram a cantar, os riachos voltaram a correr, as árvores se encheram de folhas verdinhas.", "O céu ficou azul. Era a <b>primavera</b> chegando a Nárnia!"]),
  P("jardim", im1("jadis", {x: 30, y: 0, w: 34, e: "pop", t: .0, d: 2, z: 2, c: "fraca"}) + fala("— Isto é obra de Aslam!", {x: 6, y: 80, w: 50, r: -2, t: .3}),
    ["— O que está acontecendo? — perguntou o anão.", "— Isto é obra de Aslam — disse a Feiticeira, entre os dentes. — O inverno está acabando. Vamos a pé!"]),
  P("jardim", im("edmundo", {x: 30, y: 20, w: 22, e: "pop", t: .0, d: 3, z: 3}) + nota("primavera!", {x: 56, y: 30, w: 30, r: 3, t: .3, c: "placa"}),
    ["Eles tiveram que deixar o trenó e seguir a pé, empurrando o Edmundo com as mãos amarradas.", "Mas ele, mesmo cansado, não conseguia deixar de achar a primavera bonita."]),
  P("jardim", im("tres", {x: 10, y: 30, w: 50, e: "pop", t: .0, d: 3, z: 3}) + im("castor", {x: 60, y: 40, w: 34, e: "dir", t: .2, d: 3, z: 3}) + nota("tirando os casacos", {x: 30, y: 6, w: 40, r: -2, t: .4}),
    ["Do outro lado da floresta, as crianças e os castores também estavam maravilhados. Já fazia até calor! Eles tiraram os casacos de pele."]),
  P("jardim", im1("aslam", {x: 30, y: 30, w: 60, e: "dir", t: .0, d: 2, z: 2, c: "longe"}) + im("tres", {x: 4, y: 40, w: 36, e: "esq", t: .2, d: 3, z: 3}),
    fim(["— Não é a magia da Feiticeira — disse o Sr. Castor, sorrindo. — É Aslam. Ele já está aqui!", "E eles apressaram o passo para a Mesa de Pedra."], "leao12"), {final: true})
]};

/* ---------- Capítulo 12 ---------- */
const L12 = {id: "leao12", curto: "A primeira batalha de Pedro", mini: svg("0 0 260 120", trompa, {x: 0, y: 0, w: 100, e: "fade"}),
  paginas: [
  capa(12, "A primeira batalha de Pedro", ["A primavera chegou a Nárnia, e as crianças e os castores estavam quase na Mesa de Pedra."], im1("aslam-rosto", {x: 14, y: 10, w: 34, e: "zoom", t: .1, d: 2, z: 2}), "magia"),
  P("ceu", svg("0 0 400 240", tenda, {x: 0, y: 0, w: 100, e: "fade", t: .0, d: 1, s: "height:100%", c: "fundo-cena"}) + nota("a Mesa de Pedra", {x: 6, y: 6, w: 34, r: -2, t: .4}),
    ["No alto de uma colina, eles viram a <b>Mesa de Pedra</b>: uma laje de pedra enorme e antiga, cheia de letras misteriosas.", "E ao lado, uma tenda dourada com uma bandeira vermelha, e muitas criaturas em volta: dríades, centauros, unicórnios, um touro com cabeça de homem..."]),
  P("magia", im1("aslam", {x: 0, y: 16, w: 64, e: "pop", t: .0, d: 2, z: 2}) + im("tres", {x: 60, y: 50, w: 36, e: "dir", t: .2, d: 3, z: 3}),
    ["E no meio deles estava <b>Aslam</b>.", "As crianças ficaram sem saber o que fazer. Ele era tão bonito, tão forte e tão bom que dava vontade de olhar para ele e, ao mesmo tempo, de tremer."]),
  P("magia", im1("aslam-rosto", {x: 40, y: 4, w: 40, e: "zoom", t: .0, d: 2, z: 2}) + im("pedro", {x: 6, y: 24, w: 22, e: "pop", t: .2, d: 3, z: 3}) + fala("— Paz, Pedro.", {x: 40, y: 80, w: 28, r: -2, t: .4}),
    ["Pedro deu um passo à frente: — Nós viemos, Aslam.", "— Sejam bem-vindos, Filhos de Adão e Filhas de Eva — disse Aslam, com uma voz funda e boa. — Mas onde está o quarto?"]),
  P("magia", im1("aslam-rosto", {x: 30, y: 4, w: 36, e: "zoom", t: .0, d: 2, z: 2}) + peca(`<div class="lagrimas"><i></i><i></i></div>`, {x: 38, y: 34, w: 18, e: "fade", t: .2, z: 4, s: "height:30%"}),
    ["Pedro contou a verdade: — A culpa também foi minha. Eu briguei com ele.", "Aslam não disse nada. Só ficou olhando para longe, com tristeza. E as crianças entenderam que ele estava pensando no Edmundo."]),
  P("jardim", im("lucia", {x: 10, y: 20, w: 18, e: "pop", t: .0, d: 3, z: 3}) + im("susana", {x: 34, y: 10, w: 14, e: "pop", t: .1, d: 3, z: 3}) + nota("um rio · uma tenda · flores", {x: 52, y: 30, w: 44, r: 3, t: .3}),
    ["Enquanto preparavam um banquete, Susana e Lúcia foram passear perto do rio, felizes da vida."]),
  P("escuro", im("lobo", {x: 30, y: 30, w: 60, e: "dir", t: .0, d: 3, z: 3}) + im("susana", {x: 6, y: 10, w: 14, e: "esq", t: .2, d: 4, z: 4}) + nota("Maugrim!", {x: 4, y: 74, w: 26, r: -4, t: .3, c: "numero"}),
    ["De repente, apareceu um lobo enorme, rosnando, com os pelos arrepiados! Era Maugrim.", "A Susana correu e subiu numa árvore. E lembrou do presente do Papai Noel..."]),
  P("magia", peca(`<svg viewBox="0 0 320 120">${trompa}</svg>`, {x: 4, y: 20, w: 80, e: "pop", t: .0, d: 2, z: 3, a: "trompa", c: "trompa-peca"}) + im("pedro", {x: 70, y: 40, w: 20, e: "dir", t: 1, d: 4, z: 4, c: "pedro-vem"}),
    ["Ela soprou a trompa com toda a força: <i>Fuuuuuum!</i>", "E o som chamou ajuda, como o Papai Noel tinha prometido!", dica("toque na trompa para soprar")]),
  P("magia", im("pedro", {x: 6, y: 20, w: 22, e: "pop", t: .0, d: 3, z: 3}) + im("lobo", {x: 40, y: 40, w: 50, e: "dir", t: .1, d: 3, z: 3, c: "vencido"}) + nota("coragem!", {x: 34, y: 6, w: 26, r: 3, t: .3, c: "numero"}),
    ["O Pedro veio correndo com a espada. Ele estava com medo, mas foi assim mesmo. Isso é coragem!", "E ele lutou com o lobo e venceu, bem rápido. Maugrim nunca mais assustaria ninguém."]),
  P("magia", im1("aslam-rosto", {x: 40, y: 4, w: 40, e: "zoom", t: .0, d: 2, z: 2}) + im("pedro", {x: 6, y: 24, w: 22, e: "pop", t: .2, d: 3, z: 3}) + placa("Sir Pedro, Mata-Lobo", {x: 26, y: 80, w: 50, r: -2, t: .4}),
    fim(["Aslam encostou a espada no ombro do Pedro e disse: — Levante-se, <b>Sir Pedro, Mata-Lobo</b>!", "Depois mandou alguns bichos atrás dos outros lobos, para seguir a pista... e encontrar o Edmundo."], "leao13"), {final: true})
]};

[L7, L8, L9, L10, L11, L12].forEach(c => N.capitulo(c, "leao"));
window.Narnia.leao.trompa = trompa;
})();
