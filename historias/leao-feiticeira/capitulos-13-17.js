"use strict";
/* ============ O Leão, a Feiticeira e o Guarda-Roupa · capítulos 13 a 17 ============
   O capítulo 14 (a noite triste) é contado com delicadeza, sem detalhes assustadores, pensando na hora de dormir. */
(function(){
const N = window.Narnia; if (!N || !N.leao) return;
const {peca, svg, tag, estrelas, coracao} = N;
const {coroa, emoji, poste, guardaRoupa} = N.parte2;
const {im, im1, P, capa, fim, dica, fala, placa, nota, neve, tumnus, castelo, tronos} = N.leao;

/* ---------- desenhos ---------- */
const mesaPedra = (runas = false, rachada = false) => `<rect x="20" y="150" width="40" height="70" fill="#8a8478"/><rect x="340" y="150" width="40" height="70" fill="#8a8478"/><rect x="10" y="100" width="380" height="56" rx="6" fill="#a8a294"/><rect x="10" y="100" width="380" height="14" rx="6" fill="#bab4a6"/>
  ${runas ? Array.from({length: 8}, (_, i) => `<text class="runa" data-i="${i}" x="${40 + i*45}" y="140" text-anchor="middle" font-family="serif" font-size="26" fill="#6a6458">${"ᚠᚢᚦᚨᚱᚲᚷᚹ"[i]}</text>`).join("") : `<path d="M40 134 h40 M100 128 h30 M160 136 h50 M240 130 h40 M300 134 h50" stroke="#6a6458" stroke-width="3"/>`}
  ${rachada ? `<path d="M200 100 L190 120 L210 136 L196 156" stroke="#2a2620" stroke-width="5" fill="none"/>` : ""}`;
const cordas = [0, 1, 2, 3].map(i => `<g class="corda" data-i="${i}"><path d="M${70 + i*80} 96 q20 30 0 64" stroke="#8a6a3a" stroke-width="9" fill="none"/><path d="M${70 + i*80} 96 q20 30 0 64" stroke="#b08a5a" stroke-width="3" fill="none" stroke-dasharray="6 6"/></g>
  <text class="rato" data-i="${i}" x="${84 + i*80}" y="94" font-size="30">🐭</text>`).join("");
const cairParavel = `<rect width="400" height="240" fill="#bfe3f0"/><rect x="0" y="170" width="400" height="70" fill="#4a8ab0"/><path d="M0 180 q20 -6 40 0 q20 -6 40 0 q20 -6 40 0 q20 -6 40 0 q20 -6 40 0 q20 -6 40 0 q20 -6 40 0 q20 -6 40 0 q20 -6 40 0 q20 -6 40 0" stroke="#e8f6ff" stroke-width="3" fill="none"/>
  <path d="M200 172 L230 120 L380 120 L400 172Z" fill="#8a7a5a"/><g fill="#e8dcc0"><rect x="250" y="60" width="110" height="64"/><rect x="236" y="30" width="30" height="94"/><rect x="344" y="30" width="30" height="94"/><rect x="290" y="14" width="34" height="110"/></g>
  <g fill="#c0392b"><path d="M236 30 l15 -24 l15 24Z"/><path d="M344 30 l15 -24 l15 24Z"/><path d="M290 14 l17 -26 l17 26Z"/></g>${[[300, 80], [262, 70], [350, 70], [302, 40]].map(([x, y]) => `<rect x="${x}" y="${y}" width="10" height="16" rx="5" fill="#5a4a3a"/>`).join("")}
  <path d="M307 -12 v-20 l16 6 l-16 6" fill="#f2c94a" stroke="#6b4a2a" stroke-width="2"/>`;

/* ---------- Capítulo 13 ---------- */
const L13 = {id: "leao13", curto: "A Magia Profunda", mini: svg("0 0 400 230", mesaPedra(true), {x: 0, y: 0, w: 100, e: "fade"}),
  paginas: [
  capa(13, "A Magia Profunda", ["Pedro venceu o lobo, e Aslam mandou seus bichos à procura do Edmundo."], svg("0 0 400 230", mesaPedra(true), {x: 4, y: 40, w: 56, e: "pop", t: .1, d: 2, z: 2})),
  P("escuro", im1("jadis", {x: 30, y: 0, w: 34, e: "pop", t: .0, d: 2, z: 2}) + im("edmundo", {x: 4, y: 40, w: 18, e: "esq", t: .2, d: 4, z: 4, c: "enjoado"}),
    ["Num vale escuro, a Feiticeira e o anão pararam para descansar, com o Edmundo amarrado a uma árvore.", "Ela estava com pressa e com raiva. Queria acabar com o Edmundo antes que a profecia se cumprisse."]),
  P("jardim", ["🦌", "🦅", "🐆", "🐻"].map((e, i) => emoji(e, {x: 4 + i*24, y: 20 + (i % 2)*20, w: 14, e: "esq", t: i*.08, d: 4, z: 4})).join("") + fala("— Salvem o menino!", {x: 30, y: 80, w: 40, r: -2, t: .4}),
    ["Bem na hora, chegaram os bichos que Aslam tinha mandado: centauros, unicórnios, veados, aves! Eles salvaram o Edmundo.", "A Feiticeira e o anão se esconderam... e ninguém viu para onde foram."]),
  P("magia", im1("aslam", {x: 0, y: 20, w: 60, e: "pop", t: .0, d: 2, z: 2}) + im("edmundo", {x: 62, y: 30, w: 20, e: "dir", t: .2, d: 3, z: 3}),
    ["De manhã cedinho, os irmãos viram o Edmundo conversando sozinho com Aslam, num cantinho do campo.", "Ninguém sabe o que eles conversaram. Mas o Edmundo nunca mais esqueceu aquela conversa."]),
  P("magia", im("tres", {x: 4, y: 30, w: 52, e: "pop", t: .0, d: 3, z: 3}) + im("susana", {x: 58, y: 22, w: 14, e: "dir", t: .1, d: 3, z: 3}) + fala("— Me desculpem.", {x: 60, y: 80, w: 32, r: 2, t: .3}) + svg("0 0 100 100", coracao, {x: 76, y: 40, w: 14, e: "zoom", t: .4, d: 4, z: 4, c: "pulsa"}),
    ["— Aqui está o irmão de vocês — disse Aslam. — Não precisam falar com ele sobre o que já passou.", "O Edmundo apertou a mão de cada um e disse: — Me desculpem. E todos o abraçaram."]),
  P("magia", im1("jadis", {x: 30, y: 0, w: 34, e: "subir", t: .0, d: 2, z: 2}) + fala("— Vim falar com Aslam.", {x: 4, y: 80, w: 44, r: -2, t: .3}),
    ["Pouco depois, um anão chegou dizendo que a Feiticeira queria conversar com Aslam.", "E ela apareceu, toda pálida, no alto da colina. Todo mundo se encolheu de medo."]),
  P("magia", peca(`<svg viewBox="0 0 400 230">${mesaPedra(true)}</svg>`, {x: 0, y: 20, w: 100, e: "pop", t: .0, d: 2, z: 3, a: "runa", c: "mesa-peca"}),
    ["— Você conhece a <b>Magia Profunda</b>? — perguntou a Feiticeira. — Ela está escrita na Mesa de Pedra desde o começo de Nárnia.", "— A lei diz que todo traidor pertence a mim. O Edmundo é um traidor. Ele é meu!", dica("toque nas letras da Mesa de Pedra")]),
  P("magia", im1("aslam-rosto", {x: 20, y: 4, w: 40, e: "zoom", t: .0, d: 2, z: 2}) + fala("— Afastem-se todos.", {x: 50, y: 80, w: 40, r: 2, t: .3}),
    ["Todo mundo olhou para Aslam. A Susana cochichou: — Aslam, não dá para fazer alguma coisa?", "— Afastem-se todos — disse ele. — Vou conversar com ela a sós."]),
  P("escuro", im1("aslam", {x: 0, y: 20, w: 50, e: "esq", t: .0, d: 2, z: 2}) + im1("jadis", {x: 62, y: 0, w: 30, e: "dir", t: .1, d: 2, z: 2}) + nota("uma conversa muito longa...", {x: 20, y: 80, w: 56, r: -2, t: .4}),
    ["Os dois conversaram por muito tempo, em voz baixa, enquanto todos esperavam em silêncio. O Edmundo não tirava os olhos de Aslam."]),
  P("magia", im1("aslam-rosto", {x: 30, y: 4, w: 40, e: "zoom", t: .0, d: 2, z: 2}) + fala("— Está resolvido.", {x: 6, y: 80, w: 34, r: -2, t: .3}),
    fim(["Finalmente Aslam voltou e disse: — Está tudo resolvido. Ela desistiu do sangue do seu irmão.", "E a Feiticeira foi embora com uma alegria estranha no rosto... Todos comemoraram. Mas o que será que Aslam tinha prometido a ela?"], "leao14"), {final: true})
]};

/* ---------- Capítulo 14 ---------- */
const L14 = {id: "leao14", curto: "A noite triste", mini: peca(`<span class="bicho">🌙</span>`, {x: 0, y: 0, w: 100, e: "fade", c: "emoji"}),
  paginas: [
  capa(14, "A noite triste", ["Aslam fez um acordo com a Feiticeira, e o Edmundo foi salvo. Mas Aslam estava triste..."], `<div class="ceu">${estrelas()}</div>` + im1("aslam-rosto", {x: 14, y: 14, w: 34, e: "zoom", t: .1, d: 2, z: 2})),
  P("noite", `<div class="ceu">${estrelas()}</div>` + im1("aslam", {x: 10, y: 30, w: 60, e: "pop", t: .0, d: 2, z: 2}),
    ["Naquela noite, Aslam ficou muito quieto e triste. Ele mal falou com ninguém.", "Todos foram dormir. Mas Susana e Lúcia não conseguiam pegar no sono. Tinham um aperto no coração."]),
  P("noite", `<div class="ceu">${estrelas()}</div>` + im1("aslam", {x: 40, y: 30, w: 54, e: "dir", t: .0, d: 2, z: 2, c: "longe"}) + im("lucia", {x: 4, y: 36, w: 16, e: "esq", t: .2, d: 4, z: 4}) + im("susana", {x: 20, y: 30, w: 12, e: "esq", t: .3, d: 4, z: 4}),
    ["Elas viram Aslam saindo sozinho do acampamento, devagar, com a cabeça baixa. E foram atrás dele, escondidinhas."]),
  P("noite", `<div class="ceu">${estrelas()}</div>` + im1("aslam-rosto", {x: 30, y: 4, w: 40, e: "zoom", t: .0, d: 2, z: 2}) + fala("— Podem vir comigo.", {x: 6, y: 80, w: 40, r: -2, t: .3}),
    ["Aslam percebeu e disse, bem baixinho: — Podem vir comigo até um pedaço do caminho. Eu fico feliz de ter companhia esta noite."]),
  P("noite", peca(`<img src="${N.DIR}aslam-rosto.webp" alt="">`, {x: 20, y: 4, w: 50, e: "pop", t: .0, d: 2, z: 3, a: "juba", c: "foto juba-peca"}),
    ["As meninas andaram ao lado dele, enfiando as mãos na juba macia, fazendo carinho para ele se sentir menos sozinho.", dica("toque na juba de Aslam para fazer carinho")]),
  P("noite", `<div class="ceu">${estrelas()}</div>` + svg("0 0 400 230", mesaPedra(), {x: 0, y: 40, w: 100, e: "pop", t: .0, d: 2}) + nota("— Fiquem aqui escondidas.", {x: 20, y: 6, w: 56, r: -2, t: .3}),
    ["Perto da Mesa de Pedra, Aslam parou: — Agora fiquem aqui, escondidas. Aconteça o que acontecer, não deixem que vejam vocês."]),
  P("escuro", im1("jadis", {x: 30, y: 0, w: 34, e: "pop", t: .0, d: 2, z: 2}) + svg("0 0 400 230", mesaPedra(), {x: 0, y: 60, w: 100, e: "fade", t: .1, d: 1}),
    ["Lá estava a Feiticeira, com todos os seres malvados de Nárnia.", "E Aslam, o grande Leão, deixou que eles o amarrassem na Mesa de Pedra. Ele não lutou. Ele não rugiu. Ele tinha escolhido aquilo."]),
  P("noite", `<div class="ceu">${estrelas()}</div>` + svg("0 0 100 100", coracao, {x: 40, y: 30, w: 20, e: "zoom", t: .0, d: 3, z: 3, c: "pulsa"}) + nota("no lugar do Edmundo", {x: 26, y: 70, w: 48, r: -2, t: .3, c: "placa"}),
    ["Era esse o acordo: Aslam ia dar a própria vida <b>no lugar do Edmundo</b>. Para o irmão delas poder viver.", "Aslam fez isso por amor."]),
  P("noite", `<div class="ceu">${estrelas()}</div>` + im("lucia", {x: 20, y: 30, w: 18, e: "pop", t: .0, d: 3, z: 3}) + im("susana", {x: 42, y: 24, w: 14, e: "pop", t: .1, d: 3, z: 3}) + peca(`<div class="lagrimas"><i></i><i></i></div>`, {x: 24, y: 34, w: 30, e: "fade", t: .2, z: 4, s: "height:30%"}),
    ["Quando todos foram embora, as meninas correram até a Mesa e ficaram ao lado de Aslam, que agora estava parado, sem vida.", "Elas choraram, abraçadas à juba dele, a noite inteirinha."]),
  P("noite", `<div class="ceu">${estrelas()}</div>` + svg("0 0 400 230", mesaPedra(), {x: 0, y: 40, w: 100, e: "fade", t: .0, d: 1}) + nota("mas a história não acaba aqui...", {x: 10, y: 6, w: 70, r: -2, t: .3, c: "placa"}),
    fim(["Foi a noite mais triste de Nárnia.", "Mas, querida, a história não acaba aqui. Aslam conhecia uma magia ainda mais antiga... Amanhã, o sol vai nascer."], "leao15", "Continua no próximo capítulo... 🌅"), {final: true})
]};

/* ---------- Capítulo 15 ---------- */
const L15 = {id: "leao15", curto: "Aslam vive!", mini: im1("aslam-rosto", {x: 0, y: 0, w: 70, e: "fade"}),
  paginas: [
  capa(15, "Aslam vive!", ["Susana e Lúcia passaram a noite inteira ao lado de Aslam, na Mesa de Pedra."], im1("aslam-rosto", {x: 14, y: 14, w: 34, e: "zoom", t: .1, d: 2, z: 2}), "magia"),
  P("noite", peca(`<svg viewBox="0 0 400 230">${mesaPedra()}${cordas}</svg>`, {x: 0, y: 24, w: 100, e: "pop", t: .0, d: 2, z: 3, a: "ratinhos", c: "ratinhos-peca"}) + placa("Aslam está livre das cordas!", {x: 16, y: 6, w: 64, r: -2, t: 1, c: "achou"}),
    ["Quando o céu começou a clarear, as meninas viram uns bichinhos se mexendo em cima da Mesa: eram <b>ratinhos</b>!", "Eles estavam roendo as cordas que amarravam Aslam, uma por uma.", dica("toque nas cordas para os ratinhos roerem")]),
  P("ceu", svg("0 0 400 240", `<rect width="400" height="240" fill="url(#am)"/><defs><linearGradient id="am" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a9ad0"/><stop offset="1" stop-color="#ffd8a0"/></linearGradient></defs><circle cx="200" cy="230" r="60" fill="#fff0a8"/>`, {x: 0, y: 0, w: 100, e: "fade", t: .0, d: 1, s: "height:100%", c: "fundo-cena"}) + im("lucia", {x: 20, y: 40, w: 16, e: "pop", t: .2, d: 3, z: 3}) + im("susana", {x: 40, y: 34, w: 12, e: "pop", t: .3, d: 3, z: 3}),
    ["O sol nasceu. As meninas, com frio e cansadas, foram andar um pouquinho para esquentar."]),
  P("ceu", svg("0 0 400 230", mesaPedra(false, true), {x: 0, y: 30, w: 100, e: "pop", t: .0, d: 2}) + tag("CRAAAC!", {x: 30, y: 4, w: 36, r: -6, e: "zoom", t: .3, z: 6, c: "numero"}),
    ["De repente: <b>CRAAAC!</b> Um barulho enorme, como uma montanha se partindo!", "Elas correram de volta. A Mesa de Pedra estava rachada ao meio... e Aslam não estava mais lá!"]),
  P("magia", im1("aslam", {x: 0, y: 14, w: 70, e: "zoom", t: .0, d: 2, z: 2}) + fala("— ASLAM!", {x: 60, y: 6, w: 30, r: 5, t: .3}),
    ["E então, atrás delas, uma voz conhecida disse: — Estou aqui.", "Era Aslam! <b>Vivo!</b> Maior, mais brilhante e mais bonito do que nunca, com a juba balançando ao sol!"]),
  P("magia", im1("aslam-rosto", {x: 30, y: 4, w: 40, e: "zoom", t: .0, d: 2, z: 2}) + nota("uma magia mais antiga ainda", {x: 6, y: 74, w: 60, r: -2, t: .3, c: "placa"}),
    ["— Mas como? — perguntou Susana, rindo e chorando ao mesmo tempo.", "— A Feiticeira conhecia a Magia Profunda — explicou Aslam. — Mas existe uma Magia ainda mais antiga: quando alguém que não fez nada de errado dá a vida no lugar de um traidor, a Mesa se quebra... e a própria morte começa a andar para trás."]),
  P("jardim", im1("aslam", {x: 20, y: 30, w: 60, e: "pop", t: .0, d: 2, z: 2, c: "pula"}) + im("lucia", {x: 4, y: 20, w: 16, e: "esq", t: .2, d: 4, z: 4}) + im("susana", {x: 80, y: 20, w: 12, e: "dir", t: .3, d: 4, z: 4}) + fala("— Vamos brincar!", {x: 40, y: 6, w: 30, r: 3, t: .4}),
    ["E aí começou a brincadeira mais feliz do mundo: Aslam saiu correndo, pulando, rolando na grama com as meninas.", "Ele as jogava para o alto e pegava com as patas macias. Elas riam tanto que perdiam o fôlego!"]),
  P("magia", im1("aslam-rosto", {x: 20, y: 4, w: 46, e: "zoom", t: .0, d: 2, z: 2}) + tag("ROOOAR!", {x: 60, y: 30, w: 34, r: 6, e: "zoom", t: .3, z: 6, c: "numero"}),
    ["Depois, Aslam rugiu. Um rugido tão forte que fez as árvores se curvarem, como se uma ventania tivesse passado pela floresta inteira."]),
  P("jardim", im1("aslam", {x: 10, y: 30, w: 62, e: "esq", t: .0, d: 2, z: 2}) + im("lucia", {x: 30, y: 16, w: 14, e: "subir", t: .2, d: 4, z: 4}) + im("susana", {x: 48, y: 14, w: 10, e: "subir", t: .3, d: 4, z: 4}),
    ["— Subam nas minhas costas — disse ele. — Temos muito o que fazer!", "E Aslam correu mais rápido que um cavalo, mais rápido que o vento, com as duas meninas agarradas na juba."]),
  P("neve", neve() + svg("0 0 320 220", castelo, {x: 0, y: 6, w: 96, e: "pop", t: .0, d: 2}) + im1("aslam", {x: 30, y: 60, w: 40, e: "subir", t: .3, d: 3, z: 3}),
    fim(["Eles cruzaram montanhas e vales e chegaram... ao castelo da Feiticeira!", "Aslam pulou por cima do muro, direto para o pátio das estátuas."], "leao16"), {final: true})
]};

/* ---------- Capítulo 16 ---------- */
const L16 = {id: "leao16", curto: "O sopro de Aslam", mini: peca(`<img src="${N.leao.DIR2}castor.webp" alt="">`, {x: 0, y: 0, w: 100, e: "fade", c: "foto pedra"}),
  paginas: [
  capa(16, "O sopro de Aslam", ["Aslam vive! E chegou com Susana e Lúcia ao pátio das estátuas, no castelo da Feiticeira."], im1("aslam", {x: 4, y: 30, w: 56, e: "pop", t: .1, d: 2, z: 2})),
  P("neve", neve() + ["castor", "pedro", "lucia", "lobo"].map((s, i) => im(s, {x: 2 + i*24, y: 20 + (i % 2)*20, w: s === "lobo" ? 24 : 18, e: "pop", t: i*.08, d: 2 + i % 2, z: 2, c: "pedra"})).join(""),
    ["O pátio estava cheio de estátuas, todas paradas e cinzentas. Que silêncio!"]),
  P("magia", im1("aslam-rosto", {x: 4, y: 4, w: 34, e: "zoom", t: .0, d: 2, z: 2}) +
    [["castor", 44, 10, 22], ["pedro", 70, 6, 14], ["edmundo", 46, 50, 14], ["lucia", 64, 50, 14], ["susana", 82, 44, 10]].map(([s, x, y, w], i) => im(s, {x, y, w, e: "pop", t: .1 + i*.06, d: 3, z: 3, a: "sopro", c: "pedra"})).join(""),
    ["Então Aslam começou a andar entre elas e a soprar sobre cada estátua um sopro quentinho.", "E as cores voltavam! Primeiro um pouquinho de dourado, depois de vermelho, de verde... e as estátuas se mexiam!", dica("toque nas estátuas para o sopro de Aslam acordá-las")]),
  P("jardim", ["🦁", "🦊", "🐻", "🦄", "🐿️", "🦅"].map((e, i) => emoji(e, {x: 4 + (i % 3)*30, y: 10 + Math.floor(i/3)*40, w: 14, e: "zoom", t: i*.07, d: 3, z: 3})).join(""),
    ["O pátio ficou cheio de vida! Leões, centauros, raposas, anões, ursos, unicórnios... Todos pulando, rindo e falando ao mesmo tempo."]),
  P("jardim", peca(`<svg viewBox="0 0 140 260">${tumnus}</svg>`, {x: 20, y: 4, w: 30, e: "pop", t: .0, d: 3, z: 3}) + im("lucia", {x: 54, y: 30, w: 18, e: "dir", t: .2, d: 4, z: 4}) + fala("— Sr. Tumnus!", {x: 50, y: 6, w: 32, r: 3, t: .4}),
    ["E quem estava lá? O <b>Sr. Tumnus</b>! A Lúcia correu e deu o abraço mais apertado do mundo no seu amigo fauno."]),
  P("jardim", peca(`<span class="bicho">🧌</span>`, {x: 20, y: 0, w: 40, e: "subir", t: .0, d: 2, z: 2, c: "emoji gigante"}) + tag("PUM! PUM!", {x: 60, y: 20, w: 30, r: 6, e: "zoom", t: .3, z: 6, c: "numero"}),
    ["Um gigante bonzinho, que também tinha sido estátua, ajudou a derrubar o portão do castelo com sua clava: PUM! PUM! CRASH!", "E todos saíram para fora, livres!"]),
  P("jardim", im1("aslam", {x: 4, y: 30, w: 50, e: "pop", t: .0, d: 2, z: 2}) + nota("ao castelo, à floresta...", {x: 50, y: 20, w: 46, r: 3, t: .3}),
    ["Aslam mandou procurar em todo o castelo, nas torres, nos porões. Encontraram mais e mais estátuas, e ele soprou em todas."]),
  P("jardim", im1("aslam-rosto", {x: 30, y: 4, w: 40, e: "zoom", t: .0, d: 2, z: 2}) + fala("— Pedro precisa de nós!", {x: 6, y: 80, w: 46, r: -2, t: .3}),
    ["— E agora — disse Aslam —, precisamos correr. O Pedro e o Edmundo estão lutando contra a Feiticeira, e precisam de ajuda!"]),
  P("jardim", ["🦁", "🐆", "🦄", "🐻", "🦅"].map((e, i) => emoji(e, {x: 4 + i*19, y: 50 - (i % 2)*16, w: 14, e: "esq", t: i*.07, d: 3 + i % 2, z: 3})).join("") + nota("todos correndo!", {x: 30, y: 6, w: 36, r: -2, t: .4}),
    ["E todos saíram correndo atrás de Aslam: os que corriam rápido, os que voavam, os que galopavam. Até os gigantes, com passos enormes."]),
  P("magia", im("pedro", {x: 6, y: 20, w: 20, e: "pop", t: .0, d: 3, z: 3}) + im("edmundo", {x: 28, y: 22, w: 18, e: "pop", t: .1, d: 3, z: 3}) + im1("aslam", {x: 50, y: 30, w: 46, e: "dir", t: .3, d: 2, z: 2}),
    fim(["Lá longe, num vale, eles viram a batalha: o Pedro e o Edmundo, com o exército de Aslam, lutando com toda a coragem contra os seres da Feiticeira...", "E Aslam deu um rugido e correu para ajudá-los!"], "leao17"), {final: true})
]};

/* ---------- Capítulo 17 ---------- */
const L17 = {id: "leao17", curto: "O cervo branco", mini: im("cervo", {x: 0, y: 0, w: 70, e: "fade"}),
  paginas: [
  capa(17, "O cervo branco", ["Aslam chegou com todos os bichos libertados para ajudar Pedro e Edmundo na batalha."], im1("aslam-rosto", {x: 12, y: 12, w: 34, e: "zoom", t: .1, d: 2, z: 2}), "magia"),
  P("magia", im1("aslam", {x: 0, y: 20, w: 60, e: "pop", t: .0, d: 2, z: 2}) + im1("jadis", {x: 66, y: 10, w: 22, e: "dir", t: .2, d: 3, z: 3, c: "fraca"}) + placa("a Feiticeira foi vencida!", {x: 20, y: 80, w: 56, r: -2, t: .4}),
    ["Aslam pulou sobre a Feiticeira, e foi o fim dela. Ela nunca mais faria mal a ninguém.", "Quando os seres malvados viram isso, fugiram correndo. A batalha estava ganha!"]),
  P("jardim", im("edmundo", {x: 20, y: 20, w: 20, e: "pop", t: .0, d: 3, z: 3}) + im("lucia", {x: 50, y: 24, w: 16, e: "dir", t: .2, d: 4, z: 4}) + nota("uma gotinha...", {x: 50, y: 70, w: 34, r: 3, t: .4}),
    ["O Edmundo tinha lutado com muita coragem, mas estava muito machucado.", "A Lúcia correu com o seu frasquinho mágico e pingou uma gotinha na boca dele. E o Edmundo sarou na hora! Aliás, ficou melhor do que nunca: bom, alegre, e de olhos brilhantes."]),
  P("jardim", ["🦁", "🦊", "🐻", "🦄"].map((e, i) => emoji(e, {x: 4 + i*22, y: 60, w: 12, e: "pop", t: i*.06, d: 3, z: 3})).join("") + nota("um banquete!", {x: 30, y: 10, w: 30, r: -2, t: .3}),
    ["Naquela noite, houve um grande banquete no campo, com todos os bichos e criaturas de Nárnia comemorando juntos."]),
  P("ceu", svg("0 0 400 240", cairParavel, {x: 0, y: 0, w: 100, e: "fade", t: .0, d: 1, s: "height:100%", c: "fundo-cena"}) + nota("Cair Paravel", {x: 6, y: 6, w: 30, r: -2, t: .3, c: "placa"}),
    ["Depois, Aslam levou todos até <b>Cair Paravel</b>, o castelo à beira do mar, com gaivotas voando e ondas batendo nas pedras."]),
  P("magia", svg("0 0 400 220", tronos, {x: 0, y: 30, w: 100, e: "pop", t: .0, d: 2, z: 2, c: "todos-coroados"}) + placa("Rei Pedro · Rainha Susana · Rei Edmundo · Rainha Lúcia", {x: 2, y: 4, w: 96, r: -1, t: .4}),
    ["E lá, nos quatro tronos, Aslam coroou os quatro irmãos: <b>Rei Pedro, o Magnífico</b>; <b>Rainha Susana, a Gentil</b>; <b>Rei Edmundo, o Justo</b>; e <b>Rainha Lúcia, a Destemida</b>.", "A profecia tinha se cumprido!"]),
  P("magia", im1("aslam", {x: 30, y: 30, w: 50, e: "dir", t: .0, d: 2, z: 2, c: "longe"}) + nota("ele vem e vai...", {x: 4, y: 20, w: 34, r: -2, t: .3}),
    ["No meio da festa, Aslam foi embora, quietinho. — Ele vai e vem — disse o Sr. Castor. — Ele não é um leão domesticado, sabe? Mas um dia ele volta."]),
  P("ceu", svg("0 0 400 240", cairParavel, {x: 0, y: 0, w: 100, e: "fade", t: .0, d: 1, s: "height:100%", c: "fundo-cena"}) + nota("muitos e muitos anos...", {x: 10, y: 6, w: 50, r: -2, t: .3}),
    ["Os quatro reinaram em Nárnia por muitos e muitos anos, com justiça e bondade. Eles cresceram, viraram adultos, e Nárnia foi feliz como nunca."]),
  P("jardim", peca(`<img src="${N.leao.DIR2}cervo.webp" alt="">`, {x: 2, y: 10, w: 30, e: "pop", t: .0, d: 3, z: 4, a: "cervo", c: "foto cervo-corre"}) + svg("0 0 100 300", poste(true), {x: 82, y: 0, w: 12, e: "pop", t: .2, d: 2, z: 2, s: "height:90%", c: "poste-acende"}) + placa("o poste!", {x: 66, y: 80, w: 24, r: 3, t: 1, c: "achou"}),
    ["Um dia, os quatro reis saíram para caçar o <b>cervo branco</b>, um animal mágico que realiza desejos de quem o pega.", "Eles seguiram o cervo pela floresta, até um lugar onde havia... um poste de luz.", dica("toque no cervo para segui-lo")]),
  P("noite", peca(`<svg viewBox="0 0 200 290">${guardaRoupa}</svg><div class="neve"></div>`, {x: 24, y: 0, w: 42, e: "pop", t: .0, d: 3, z: 3, a: "guardaRoupa", c: "guarda-roupa"}) + tag("Fim", {x: 30, y: 88, w: 30, r: -2, e: "zoom", t: 1, z: 6, c: "placa em-breve-tag"}),
    fim(["Eles foram passando entre galhos... que viraram casacos... e — pof! — saíram do guarda-roupa, na casa do professor!", "Eram crianças de novo, e no nosso mundo não tinha passado nem um minutinho.", "O professor acreditou em tudo. — Um dia vocês voltarão a Nárnia — disse ele, piscando o olho. — Mas não pelo guarda-roupa. Quando menos esperarem.", dica("toque no guarda-roupa")], "", "Fim de “O Leão, a Feiticeira e o Guarda-Roupa”. 🦁👑"), {final: true})
]};

[L13, L14, L15, L16, L17].forEach(c => N.capitulo(c, "leao"));
})();
