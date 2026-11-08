"use strict";
/* ============ O Sobrinho do Mago · capítulos 10 a 15 ============ (usa window.Narnia e as peças de capitulos-4-9.js) */
(function(){
const N = window.Narnia; if (!N || !N.parte2) return;
const {peca, img, svg, tag, estrelas, laguinho, arvore, tioAndre, coracao, tufo} = N;
const {P, capa, fim, dica, emoji, AM, VD, poste, coroa, montanhas, vale, arvoreBala, jardimPortao, macaPrata, arvorePrata, guardaRoupa, casaCampo, regador, tioPlantado, grama} = N.parte2;
const fundo = (vb, d, o = {}) => svg(vb, d, Object.assign({x: 0, y: 0, w: 100, e: "fade", t: 0, d: 1, s: "height:100%", c: "fundo-cena"}, o));

/* ---------- Capítulo 10 ---------- */
const CAP10 = {id: "sobrinho10", curto: "A primeira piada", mini: peca(`<span class="bicho">🐦</span>`, {x: 0, y: 0, w: 100, e: "fade", c: "emoji"}),
  paginas: [
  capa(10, "A primeira piada", ["O Leão escolheu alguns animais, de dois em dois, e soprou sobre eles um sopro quente e comprido..."], img("aslam-rosto", {x: 16, y: 10, w: 40, e: "zoom", t: .1, d: 2, z: 2}), "magia"),
  P("magia", img("aslam-rosto", {x: 4, y: 4, w: 40, e: "pop", t: .0, d: 2, z: 2}) + tag("“Nárnia, Nárnia, Nárnia, desperta!”", {x: 40, y: 70, w: 56, r: -2, e: "zoom", t: .4, z: 6, c: "fala"}),
    ["E então, pela primeira vez, o Leão falou. Sua voz era forte e funda como um trovão bem baixinho:", "<p><b>— Nárnia, Nárnia, Nárnia, desperta! Ame. Pense. Fale. Sejam árvores que andam. Sejam animais que falam.</b></p>"]),
  P("jardim", fundo("0 0 400 240", grama) + ["🦌", "🐻", "🦉", "🐇", "🐘"].map((e, i) => emoji(e, {x: 6 + i*19, y: 30 + (i % 2)*20, w: 13, e: "pop", t: i*.08, d: 3, z: 3})).join("") + tag("— Salve, Aslam!", {x: 26, y: 4, w: 44, r: 2, e: "zoom", t: .5, z: 6, c: "fala"}),
    ["E os animais responderam, com vozes de verdade:", "— Salve, Aslam! Nós ouvimos e obedecemos. Nós estamos acordados!", "Das árvores saíram moças das árvores, das águas saíram deuses dos rios. Apareceram faunos, sátiros e anões."]),
  P("magia", img("aslam", {x: 2, y: 14, w: 60, e: "pop", t: .0, d: 2, z: 2}) + img("jadis", {x: 70, y: 10, w: 20, e: "dir", t: .3, d: 3, z: 3, c: "longe"}) + tag("cuidado...", {x: 64, y: 70, w: 28, r: 3, e: "cair", t: .45, z: 5}),
    ["— Eu dou a vocês esta terra, Nárnia — disse Aslam. — Cuidem dela e sejam bondosos uns com os outros.", "— Mas cuidado — continuou ele. — Uma maldade já entrou neste mundo novinho, no mesmo dia em que ele nasceu."]),
  P("jardim", fundo("0 0 400 240", grama) + peca(`<span class="balao-bicho"></span>` + ["🐦", "🐘", "🦉", "🐇", "🐻", "🦌", "🐸"].map((e, i) => `<span class="emoji-solto emoji" style="left:${6 + (i % 4)*24}%;top:${22 + Math.floor(i/4)*38}%"><span class="bicho">${e}</span></span>`).join(""), {x: 0, y: 0, w: 100, e: "fade", t: .1, z: 3, a: "fala", s: "height:100%"}),
    ["Os animais estavam tão felizes de poder falar que não paravam de conversar!", "Até que uma gralha, toda atrapalhada, falou alto bem na hora do silêncio... e todo mundo caiu na risada. Foi a <b>primeira piada</b> de Nárnia!", dica("toque nos bichos para eles falarem")]),
  P("sepia", img("polly-digory", {x: 4, y: 10, w: 34, e: "pop", t: .0, d: 3, z: 3}) + ["🐻", "🦔"].map((e, i) => emoji(e, {x: 50 + i*20, y: 20 + i*10, w: 14, e: "dir", t: .2 + i*.1, d: 4, z: 4})).join("") + tag("— O que são esses bichos?", {x: 40, y: 72, w: 54, r: 2, e: "zoom", t: .45, z: 6, c: "fala"}),
    ["Aí os animais viram as pessoas.", "— O que são essas coisas? — perguntou um urso. — Será que são bichos? Será que são plantas? Será que dá para comer?", "— Nós somos crianças! — riu a Polly."]),
  P("sala", svg("0 0 120 280", tioAndre, {x: 30, y: 4, w: 28, r: -4, e: "pop", t: .0, d: 3, z: 3, c: "tremendo"}) + tag("ROAAAR!", {x: 60, y: 20, w: 30, r: 6, e: "zoom", t: .3, z: 6, c: "numero"}),
    ["E o tio André? Para ele, a voz dos animais era só rugido, latido e uivo. Ele não entendia nada!", "Ele tinha tanto medo, e tanta vontade de não ouvir, que os ouvidos dele só escutavam barulho."]),
  P("jardim", fundo("0 0 400 240", grama) + svg("0 0 120 280", tioAndre, {x: 34, y: 20, w: 22, r: 80, e: "cair", t: .1, d: 2, z: 2}) + ["🐘", "🐻", "🦡"].map((e, i) => emoji(e, {x: 8 + i*28, y: 10 + (i % 2)*14, w: 14, e: "zoom", t: .3 + i*.08, d: 4, z: 4})).join(""),
    ["De tanto medo, o tio André desmaiou. Pof!", "Os animais fizeram uma roda em volta dele, cheirando, cutucando e discutindo o que seria aquela coisa esquisita deitada na grama."]),
  P("sepia", img("digory-correndo", {x: 10, y: 6, w: 30, e: "esq", t: .0, d: 4, z: 4}) + img("aslam", {x: 46, y: 26, w: 50, e: "dir", t: .2, d: 2, z: 2}),
    ["Enquanto isso, Digory só pensava numa coisa: a mamãe.", "Ele tomou coragem e correu na direção do Leão."]),
  P("magia", img("aslam-rosto", {x: 40, y: 4, w: 40, e: "zoom", t: .0, d: 2, z: 2}) + img("digory", {x: 6, y: 20, w: 26, e: "pop", t: .2, d: 3, z: 3}) + svg("0 0 100 100", coracao, {x: 24, y: 72, w: 14, e: "zoom", t: .4, d: 4, z: 4, c: "pulsa"}),
    fim(["— Por favor, senhor Leão... Aslam... — disse Digory, com a voz tremendo. — A minha mãe está muito doente. O senhor podia me dar alguma coisa mágica para curar ela?"], "sobrinho11"), {final: true})
]};

/* ---------- Capítulo 11 ---------- */
const CAP11 = {id: "sobrinho11", curto: "O tio vira planta", mini: svg("0 0 140 110", regador, {x: 0, y: 0, w: 100, e: "fade"}),
  paginas: [
  capa(11, "O tio vira planta", ["Digory pediu ajuda a Aslam para curar a mamãe... e os animais continuavam discutindo sobre o tio André."], svg("0 0 140 110", regador, {x: 14, y: 30, w: 34, e: "zoom", t: .2, d: 3, z: 3}), "jardim"),
  P("jardim", fundo("0 0 400 240", grama) + svg("0 0 120 280", tioAndre, {x: 36, y: 20, w: 22, r: 80, e: "cair", t: .1, d: 2, z: 2}) + tag("— É uma árvore!", {x: 4, y: 10, w: 34, r: -3, e: "zoom", t: .3, z: 6, c: "fala"}) + tag("— Então vamos plantar!", {x: 50, y: 74, w: 44, r: 3, e: "zoom", t: .45, z: 6, c: "fala"}),
    ["Os animais olharam bem para o tio André e decidiram: — Isso deve ser uma árvore!", "— Se é uma árvore — disse um texugo —, então precisa ser plantada!"]),
  P("jardim", fundo("0 0 400 240", grama) + svg("0 0 120 240", tioPlantado, {x: 26, y: 6, w: 28, e: "pop", t: .0, d: 2, z: 2, c: "tio-planta"}) + peca(`<svg viewBox="0 0 140 110">${regador}</svg>`, {x: 56, y: 10, w: 30, e: "dir", t: .2, d: 3, z: 3, a: "regar", c: "regador"}) +
    tag("Atchim!", {x: 4, y: 4, w: 24, r: -6, e: "zoom", t: 1, z: 6, c: "numero atchim"}),
    ["E plantaram mesmo! Cavaram um buraco, puseram o tio André lá dentro até os joelhos e apertaram a terra em volta.", "Depois, o elefante encheu a tromba de água e regou o tio André da cabeça aos pés!", dica("toque no regador para regar o tio André")]),
  P("magia", img("aslam-rosto", {x: 50, y: 4, w: 40, e: "zoom", t: .0, d: 2, z: 2}) + img("digory", {x: 8, y: 20, w: 26, e: "pop", t: .2, d: 3, z: 3}) + tag("— Fui eu...", {x: 6, y: 80, w: 28, r: -3, e: "zoom", t: .45, z: 6, c: "fala"}),
    ["Aslam olhou bem nos olhos de Digory e perguntou: — Filho de Adão, quem trouxe a rainha para este mundo?", "Digory quis inventar uma desculpa. Mas, diante do Leão, só conseguiu dizer a verdade: — Fui eu. Eu toquei o sino."]),
  P("magia", img("aslam", {x: 2, y: 14, w: 60, e: "pop", t: .0, d: 2, z: 2}) + ["🦌", "🐻", "🦉"].map((e, i) => emoji(e, {x: 64 + (i % 2)*16, y: 14 + i*22, w: 12, e: "dir", t: .2 + i*.08, d: 3, z: 3})).join(""),
    ["Aslam se virou para os animais: — Uma maldade entrou em Nárnia por causa deste menino. Mas não tenham medo.", "— Eu vou cuidar para que o pior caia sobre mim. E esse menino vai me ajudar a consertar o que fez."]),
  P("magia", img("aslam-rosto", {x: 20, y: 4, w: 46, e: "zoom", t: .0, d: 2, z: 2}) + peca(`<div class="lagrimas"><i></i><i></i></div>`, {x: 30, y: 44, w: 26, e: "fade", t: .3, z: 4, s: "height:30%"}),
    ["— Mas e a minha mãe? — perguntou Digory, baixinho.", "Ele olhou para o rosto do Leão... e viu que os olhos de Aslam estavam cheios de lágrimas, enormes e brilhantes.", "Aslam ficava ainda mais triste com a dor da mamãe do que o próprio Digory. Digory não se sentiu mais sozinho."]),
  P("papel", img("carruagem", {x: 4, y: 30, w: 50, e: "esq", t: .0, d: 3, z: 3}) + tag("Frank, o cocheiro", {x: 52, y: 30, w: 40, r: 3, e: "cair", t: .3, z: 5}) + tag("Helena, a esposa", {x: 52, y: 54, w: 40, r: -3, e: "cair", t: .4, z: 5}),
    ["Aslam chamou o cocheiro, que se chamava <b>Frank</b>. E, com uma palavra, trouxe de Londres a esposa dele, <b>Helena</b>, que apareceu ainda com o avental da cozinha!"]),
  P("magia", svg("0 0 120 90", coroa, {x: 20, y: 14, w: 30, e: "cair", t: .0, d: 3, z: 3}) + svg("0 0 120 90", coroa, {x: 54, y: 20, w: 26, e: "cair", t: .15, d: 3, z: 3}) + tag("o primeiro rei e a primeira rainha", {x: 10, y: 70, w: 80, r: -2, e: "zoom", t: .4, z: 6, c: "placa"}),
    ["— Vocês serão o primeiro rei e a primeira rainha de Nárnia — disse Aslam. — Cuidem dos animais com justiça e bondade.", "Frank, que era um homem simples e bom, ficou vermelho de emoção."]),
  P("magia", img("aslam", {x: 2, y: 14, w: 56, e: "pop", t: .0, d: 2, z: 2}) + svg("0 0 400 240", montanhas, {x: 58, y: 30, w: 40, e: "dir", t: .2, d: 3, z: 3}) + svg("0 0 100 100", macaPrata, {x: 70, y: 6, w: 16, e: "zoom", t: .4, d: 4, z: 4}),
    ["Então Aslam deu uma missão para Digory:", "— Lá longe, depois das montanhas, existe um jardim no alto de um morro verde. No meio dele há uma árvore. Traga para mim uma maçã dessa árvore."]),
  P("sepia", img("digory", {x: 10, y: 10, w: 28, e: "pop", t: .0, d: 3, z: 3}) + img("carruagem", {x: 44, y: 40, w: 50, e: "dir", t: .2, d: 3, z: 3}) + tag("?", {x: 40, y: 10, w: 10, r: 8, e: "zoom", t: .4, z: 6, c: "numero"}),
    fim(["— Mas é tão longe! Como eu vou chegar lá? — perguntou Digory.", "Aslam sorriu e olhou para o cavalo Morango..."], "sobrinho12"), {final: true})
]};

/* ---------- Capítulo 12 ---------- */
const CAP12 = {id: "sobrinho12", curto: "O cavalo com asas", mini: img("morango-asas", {x: 0, y: 0, w: 100, e: "fade"}),
  paginas: [
  capa(12, "O cavalo com asas", ["Aslam deu a Digory a missão de buscar uma maçã num jardim muito longe... e olhou para o cavalo Morango."], img("morango-asas", {x: 4, y: 20, w: 56, e: "pop", t: .1, d: 3, z: 3}), "magia"),
  P("magia", img("carruagem", {x: 4, y: 30, w: 42, e: "esq", t: .0, d: 2}) + img("morango-asas", {x: 44, y: 14, w: 52, e: "zoom", t: .3, d: 4, z: 4}),
    ["— Você gostaria de ter asas? — perguntou Aslam ao Morango.", "— Se o senhor quiser, Aslam — respondeu o cavalo, que agora também falava.", "E nos ombros dele começaram a brotar asas, grandes e brilhantes, cor de castanha e de cobre!"]),
  P("papel", img("morango-asas", {x: 10, y: 10, w: 56, e: "pop", t: .0, d: 3, z: 3}) + img("polly-digory", {x: 66, y: 36, w: 30, e: "dir", t: .3, d: 4, z: 4}) + tag("— A Polly vai junto!", {x: 4, y: 80, w: 44, r: -3, e: "zoom", t: .45, z: 6, c: "fala"}),
    ["Aslam deixou a Polly ir junto. Os dois subiram nas costas do cavalo alado.", "— Sigam para o oeste, depois das montanhas — disse Aslam. — Vocês vão achar um vale verde com um lago azul, e um morro com um jardim no alto."]),
  P("ceu", peca(`<img src="${N.DIR}morango-asas.webp" alt="">`, {x: 22, y: 40, w: 50, e: "subir", t: .0, d: 3, z: 4, a: "voar", c: "foto voador"}) + svg("0 0 400 240", montanhas, {x: 0, y: 60, w: 100, e: "fade", t: .1, z: 2, s: "height:40%"}) +
    tag("lá em cima!", {x: 36, y: 2, w: 28, r: -3, e: "cair", t: 1, z: 6, c: "placa chegou"}),
    ["Morango abriu as asas e — vuuush! — subiu para o céu!", "Lá embaixo, Nárnia ficava cada vez menor: os rios, as florestas, os animais pequenininhos como formiguinhas.", dica("toque no cavalo para bater as asas e subir")]),
  P("ceu", svg("0 0 400 240", vale, {x: 0, y: 0, w: 100, e: "fade", t: .0, d: 1, s: "height:100%", c: "fundo-cena"}) + img("morango-asas", {x: 30, y: 2, w: 30, e: "dir", t: .2, d: 4, z: 4}),
    ["Que lindo era Nárnia visto lá de cima! Florestas verdinhas, rios brilhando, e lá longe, no horizonte, o mar.", "O vento assobiava nas orelhas das crianças."]),
  P("ceu", svg("0 0 400 240", montanhas, {x: 0, y: 30, w: 100, e: "pop", t: .0, d: 2, s: "height:70%"}) + img("morango-asas", {x: 50, y: 4, w: 30, e: "dir", t: .2, d: 4, z: 4}) + tag("brrr, que frio!", {x: 6, y: 6, w: 30, r: -3, e: "cair", t: .4, z: 5}),
    ["Passaram por cima de montanhas enormes, com neve nos picos. Que frio!", "A tarde foi acabando, e o céu ficou cor-de-rosa."]),
  P("noite", `<div class="ceu">${estrelas()}</div>` + svg("0 0 100 50", tufo, {x: 10, y: 74, w: 80, e: "pop", t: .0, d: 1}) + img("polly-digory", {x: 12, y: 30, w: 30, e: "pop", t: .2, d: 3, z: 3}) + tag("só balinhas no bolso...", {x: 48, y: 30, w: 44, r: 3, e: "cair", t: .4, z: 5}),
    ["De noite, eles pousaram num vale para descansar. Estavam com uma fome!", "Mas a única coisa que tinham era um saquinho de balas de caramelo no bolso da Polly. Ela teve uma ideia: plantou uma bala na terra, só para ver o que acontecia."]),
  P("noite", `<div class="ceu">${estrelas()}</div>` + img("jadis", {x: 66, y: 10, w: 20, e: "dir", t: .2, d: 2, c: "sombra-escura"}) + img("digory", {x: 10, y: 24, w: 24, e: "pop", t: .0, d: 3, z: 3}) + tag("o que foi isso?", {x: 36, y: 70, w: 34, r: -3, e: "zoom", t: .4, z: 5, c: "fala"}),
    ["No meio da noite, Digory acordou com um barulhinho.", "Pareceu ver uma sombra alta passando entre as árvores... Mas logo sumiu, e ele achou que tinha sido um sonho."]),
  P("jardim", svg("0 0 100 140", arvoreBala, {x: 20, y: 6, w: 50, e: "pop", t: .0, d: 2, z: 2}) + tag("uma árvore de balas!", {x: 50, y: 76, w: 44, r: -2, e: "zoom", t: .4, z: 6, c: "placa"}),
    ["De manhã, uma surpresa: onde a Polly tinha plantado a bala, nasceu uma <b>arvorezinha de balas de caramelo</b>!", "As frutinhas eram docinhas e moles. Que café da manhã gostoso!"]),
  P("ceu", svg("0 0 400 240", jardimPortao, {x: 30, y: 30, w: 66, e: "pop", t: .0, d: 2, z: 2}) + img("morango-asas", {x: 0, y: 4, w: 34, e: "esq", t: .2, d: 4, z: 4}),
    fim(["Eles voaram de novo. E então, lá adiante, viram: um vale verde, um lago azul... e um morro com um jardim lá no topo, cercado por um muro verde."], "sobrinho13"), {final: true})
]};

/* ---------- Capítulo 13 ---------- */
const CAP13 = {id: "sobrinho13", curto: "A maçã de prata", mini: svg("0 0 100 100", macaPrata, {x: 0, y: 0, w: 100, e: "fade"}),
  paginas: [
  capa(13, "A maçã de prata", ["Polly, Digory e o cavalo alado chegaram ao morro com o jardim no topo."], svg("0 0 100 100", macaPrata, {x: 16, y: 20, w: 34, e: "zoom", t: .2, d: 3, z: 3}), "magia"),
  P("jardim", fundo("0 0 400 240", jardimPortao) + tag("“Entre pelos portões de ouro, ou não entre...”", {x: 6, y: 4, w: 88, r: -1, e: "cair", t: .3, z: 5, c: "placa"}),
    ["O jardim tinha portões de ouro, bem fechados. Neles estavam escritas umas palavras, mais ou menos assim:", "<p><i>“Entre pelos portões de ouro, ou não entre. Pegue o fruto para os outros, ou não pegue. Quem roubar ou pular o muro vai ter o que deseja... e também muita tristeza.”</i></p>"]),
  P("jardim", fundo("0 0 400 240", jardimPortao, {c: "fundo-cena aberto"}) + img("digory", {x: 40, y: 34, w: 20, e: "subir", t: .2, d: 3, z: 3}),
    ["Os portões se abriram sozinhos para Digory. Ele entrou sozinho, porque sentiu que aquilo era coisa só dele.", "Lá dentro era tudo silencioso e cheiroso, ainda mais calmo que o Bosque entre os Mundos."]),
  P("jardim", svg("0 0 200 240", arvorePrata, {x: 20, y: 0, w: 46, e: "pop", t: .0, d: 2, z: 2, c: "f1 f2 f3 f4"}) + svg("0 0 100 100", macaPrata, {x: 60, y: 30, w: 18, e: "zoom", t: .3, d: 4, z: 4}),
    ["No meio do jardim havia uma árvore cheia de <b>maçãs de prata</b>, que brilhavam com a luz do sol.", "Digory pegou uma e colocou no bolso. Mas o cheiro era tão gostoso, tão gostoso, que ele ficou com uma vontade enorme de comer...", "Ele lembrou da promessa e não comeu."]),
  P("jardim", svg("0 0 200 240", arvorePrata, {x: 30, y: 0, w: 40, e: "pop", t: .0, d: 1, c: "f1 f2 f3 f4"}) + peca(`<span class="bicho">🦅</span>`, {x: 46, y: 6, w: 12, e: "zoom", t: .3, d: 3, z: 3, c: "emoji"}) + tag("um pássaro observava...", {x: 56, y: 70, w: 40, r: 3, e: "cair", t: .5, z: 5}),
    ["Num galho, um pássaro lindo, maior que uma águia, com penas cor de fogo e de ouro, olhava para ele com um olho meio aberto.", "Parecia que estava ali para vigiar a árvore."]),
  P("magia", img("jadis", {x: 30, y: 0, w: 34, e: "subir", t: .0, d: 2, z: 2}) + svg("0 0 100 100", macaPrata, {x: 62, y: 30, w: 16, e: "zoom", t: .3, d: 4, z: 4, c: "mordida"}),
    ["E então Digory levou um susto: a rainha Jadis estava ali! Ela tinha pulado o muro.", "Ela tinha acabado de <b>comer</b> uma das maçãs. E estava mais forte e mais pálida do que nunca."]),
  P("magia", img("jadis", {x: 4, y: 0, w: 34, e: "pop", t: .0, d: 2, z: 2}) + tag("— Coma, e viva para sempre...", {x: 40, y: 20, w: 54, r: 3, e: "zoom", t: .3, z: 6, c: "fala"}),
    ["— Coma você também — disse a rainha, com uma voz bem docinha. — Quem come essa maçã nunca fica velho e nunca morre. Nós dois seremos rei e rainha para sempre!", "— Não, obrigado — disse Digory. — Eu não quero viver para sempre."]),
  P("magia", img("jadis", {x: 2, y: 0, w: 30, e: "pop", t: .0, d: 2, z: 2}) + svg("0 0 100 100", macaPrata, {x: 36, y: 6, w: 18, e: "zoom", t: .2, d: 4, z: 4, c: "maca-tent"}) +
    peca(`<div class="escolha"><button data-v="comer">🍎 Levar para a mamãe escondido</button><button data-v="guardar">🦁 Guardar para Aslam</button></div><span class="resposta"></span>`, {x: 34, y: 46, w: 64, e: "zoom", t: .35, z: 6, a: "escolha", c: "escolha-peca"}),
    ["Então ela tentou outro truque: — E a sua mãe? Leve a maçã para ela! Ela vai sarar na hora. Ninguém precisa saber. Deixe a menina aqui e vá embora.", "Digory ficou balançado... Era tudo o que ele mais queria.", dica("o que o Digory deve fazer?")]),
  P("sepia", img("digory", {x: 10, y: 10, w: 28, e: "pop", t: .0, d: 3, z: 3}) + tag("— NÃO!", {x: 44, y: 20, w: 26, r: 6, e: "zoom", t: .3, z: 6, c: "numero"}) + img("polly-cadeira", {x: 66, y: 26, w: 26, e: "dir", t: .4, d: 3, z: 3}),
    ["Mas aí ele percebeu o truque: a rainha queria que ele <b>deixasse a Polly sozinha</b> para trás! Uma rainha que pede isso não pode estar dizendo coisas boas.", "— Não! — gritou Digory. — Eu vou levar a maçã para Aslam, como prometi!"]),
  P("ceu", img("morango-asas", {x: 10, y: 10, w: 50, e: "dir", t: .0, d: 3, z: 3}) + svg("0 0 100 100", macaPrata, {x: 64, y: 50, w: 16, e: "zoom", t: .3, d: 4, z: 4}),
    fim(["Digory saiu correndo do jardim, subiu no cavalo com a Polly e voaram de volta para Nárnia.", "Ele estava triste, pensando na mamãe. Mas sabia, lá no fundo, que tinha feito a coisa certa."], "sobrinho14"), {final: true})
]};

/* ---------- Capítulo 14 ---------- */
const CAP14 = {id: "sobrinho14", curto: "A árvore de prata", mini: svg("0 0 200 240", arvorePrata, {x: 0, y: 0, w: 100, e: "fade", c: "f1 f2 f3 f4"}),
  paginas: [
  capa(14, "A árvore de prata", ["Digory voltou com a maçã de prata, sem comer nenhum pedacinho."], svg("0 0 200 240", arvorePrata, {x: 10, y: 10, w: 40, e: "pop", t: .2, d: 2, z: 2, c: "f1 f2 f3 f4"}), "magia"),
  P("magia", img("aslam-rosto", {x: 40, y: 4, w: 40, e: "zoom", t: .0, d: 2, z: 2}) + img("digory", {x: 6, y: 20, w: 24, e: "pop", t: .2, d: 3, z: 3}) + svg("0 0 100 100", macaPrata, {x: 26, y: 60, w: 14, e: "zoom", t: .35, d: 4, z: 4}) + tag("— Muito bem!", {x: 44, y: 80, w: 30, r: 3, e: "zoom", t: .5, z: 6, c: "fala"}),
    ["Quando eles pousaram, Digory entregou a maçã para Aslam.", "— Muito bem — disse o Leão, com uma voz que fez o coração do Digory ficar quentinho. — Muito bem, filho de Adão."]),
  P("jardim", fundo("0 0 400 240", grama) + peca(`<svg viewBox="0 0 200 240">${arvorePrata}</svg>`, {x: 30, y: 0, w: 40, e: "pop", t: .0, d: 2, z: 3, a: "plantar", c: "planta-arvore f0"}),
    ["— Jogue a maçã ali, na beira do rio, onde a terra é macia — disse Aslam.", "Digory jogou. E, na frente de todo mundo, algo incrível começou a acontecer...", dica("toque na terra para a árvore crescer")]),
  P("magia", svg("0 0 120 90", coroa, {x: 14, y: 10, w: 30, e: "cair", t: .0, d: 3, z: 3}) + svg("0 0 120 90", coroa, {x: 50, y: 14, w: 26, e: "cair", t: .1, d: 3, z: 3}) + ["🦌", "🐻", "🐇", "🦉"].map((e, i) => emoji(e, {x: 6 + i*22, y: 66, w: 12, e: "pop", t: .3 + i*.06, d: 3, z: 3})).join(""),
    ["Enquanto a árvore crescia, os anões fizeram coroas de ouro para Frank e Helena.", "E todos os animais fizeram festa: Frank e Helena foram coroados <b>rei e rainha de Nárnia</b>!"]),
  P("magia", svg("0 0 200 240", arvorePrata, {x: 20, y: 0, w: 50, e: "pop", t: .0, d: 2, z: 2, c: "f1 f2 f3 f4"}) + img("jadis", {x: 76, y: 20, w: 16, e: "dir", t: .3, d: 3, c: "longe"}) + tag("ela tem medo do cheiro", {x: 50, y: 80, w: 46, r: -3, e: "cair", t: .5, z: 5}),
    ["— Esta árvore vai proteger Nárnia — explicou Aslam. — A rainha tem horror do cheiro dessas maçãs. Enquanto a árvore estiver de pé, ela não vai chegar perto."]),
  P("magia", img("jadis", {x: 20, y: 0, w: 34, e: "pop", t: .0, d: 2, z: 2, c: "fraca"}) + tag("para sempre... mas infeliz", {x: 50, y: 50, w: 46, r: 3, e: "cair", t: .3, z: 5}),
    ["— Mas a rainha comeu a maçã — disse Polly. — Ela vai viver para sempre?", "— Vai — disse Aslam. — Mas quem pega o fruto na hora errada e do jeito errado ganha uma vida comprida... e cheia de tristeza."]),
  P("sepia", img("digory", {x: 10, y: 10, w: 28, e: "pop", t: .0, d: 3, z: 3}) + svg("0 0 100 100", coracao, {x: 46, y: 20, w: 16, e: "zoom", t: .2, d: 4, z: 4, c: "pulsa"}),
    ["— Se eu tivesse levado a maçã escondido, a minha mãe ficaria boa? — perguntou Digory.", "— Ficaria — disse Aslam, bem baixinho. — Mas um dia vocês dois iriam desejar que ela não tivesse ficado. Uma coisa roubada não traz alegria de verdade."]),
  P("jardim", fundo("0 0 400 240", grama) + svg("0 0 120 240", tioPlantado, {x: 30, y: 4, w: 26, e: "pop", t: .0, d: 2, z: 2, c: "tio-planta b0 b1 b2 b3 b4 b5"}) + ["🐿️", "🐻"].map((e, i) => emoji(e, {x: 60 + i*16, y: 40 + i*14, w: 12, e: "dir", t: .2 + i*.1, d: 3, z: 3})).join("") + tag("zzz...", {x: 4, y: 10, w: 20, r: -3, e: "zoom", t: .4, z: 5, c: "fala"}),
    ["E o tio André? Continuava plantado! Os animais traziam nozes e mel para ele, todos carinhosos.", "Aslam teve pena dele e o fez dormir um sono bem gostoso, para descansar de tanto susto."]),
  P("magia", img("aslam-rosto", {x: 30, y: 4, w: 40, e: "zoom", t: .0, d: 2, z: 2}) + svg("0 0 100 100", macaPrata, {x: 40, y: 64, w: 20, e: "zoom", t: .3, d: 4, z: 4}),
    ["Então Aslam mandou Digory colher uma maçã daquela árvore nova.", "— Esta é para a sua mãe — disse o Leão. — Agora, sim, ela vai trazer alegria."]),
  P("magia", svg("0 0 100 100", macaPrata, {x: 20, y: 10, w: 36, e: "zoom", t: .0, d: 3, z: 3}) + svg("0 0 100 100", coracao, {x: 58, y: 40, w: 20, e: "zoom", t: .3, d: 4, z: 4, c: "pulsa"}),
    fim(["Digory segurou a maçã com as duas mãos, tremendo de alegria.", "Agora, era hora de voltar para casa."], "sobrinho15"), {final: true})
]};

/* ---------- Capítulo 15 ---------- */
const CAP15 = {id: "sobrinho15", curto: "O começo de todas as histórias", mini: svg("0 0 200 290", guardaRoupa, {x: 0, y: 0, w: 70, e: "fade"}),
  paginas: [
  capa(15, "O começo de todas as histórias", ["Digory ganhou de Aslam uma maçã de prata para a mamãe. Agora era hora de voltar para casa."], img("aslam-rosto", {x: 10, y: 8, w: 36, e: "zoom", t: .1, d: 2, z: 2}) + svg("0 0 100 100", macaPrata, {x: 48, y: 50, w: 16, e: "zoom", t: .3, d: 4, z: 4}), "magia"),
  P("bosque", N.raios + img("bosque", {x: 2, y: 0, w: 52, e: "pop", t: .0, d: 1}) + img("aslam-rosto", {x: 54, y: 10, w: 34, e: "zoom", t: .2, d: 3, z: 3}) + svg("0 0 200 80", laguinho, {x: 50, y: 74, w: 40, e: "pop", t: .3, d: 2, z: 2, c: "seco"}),
    ["Aslam levou todos de volta ao Bosque entre os Mundos, sem precisar de anel nenhum.", "Lá, ele mostrou um buraco vazio, sem água: — Ali era o laguinho de Charn. Aquele mundo acabou. Cuidem para que o mundo de vocês nunca fique assim."]),
  P("magia", img("aslam-rosto", {x: 30, y: 4, w: 40, e: "zoom", t: .0, d: 2, z: 2}) + svg("0 0 100 100", AM("c15a"), {x: 10, y: 70, w: 16, e: "zoom", t: .3, d: 4, z: 4}) + svg("0 0 100 100", VD("c15b"), {x: 70, y: 70, w: 16, e: "zoom", t: .35, d: 4, z: 4}) + tag("enterrem os anéis", {x: 28, y: 80, w: 40, r: -2, e: "cair", t: .45, z: 5}),
    ["— E os anéis — disse Aslam — precisam ser enterrados, para que ninguém mais use.", "Então ele olhou para as crianças com tanto amor que elas souberam que nunca iam esquecer aquele olhar."]),
  P("sala", svg("0 0 300 300", N.estante(), {x: 0, y: 0, w: 30, e: "esq", t: .0, d: 1, s: "height:100%", c: "fundo-cena"}) + img("polly-digory", {x: 38, y: 6, w: 36, e: "pop", t: .2, d: 3, z: 3}) + tag("só passaram uns minutinhos!", {x: 40, y: 80, w: 54, r: 2, e: "cair", t: .4, z: 5}),
    ["E — puf! — eles estavam de volta em Londres, bem na rua da casa.", "O mais engraçado: apesar de tantas aventuras, no nosso mundo tinham passado só alguns minutos!"]),
  P("sepia", img("digory", {x: 8, y: 10, w: 26, e: "pop", t: .0, d: 3, z: 3}) + svg("0 0 100 100", macaPrata, {x: 38, y: 30, w: 18, e: "zoom", t: .2, d: 4, z: 4}) + svg("0 0 100 100", coracao, {x: 62, y: 20, w: 18, e: "zoom", t: .4, d: 4, z: 4, c: "pulsa"}) + tag("mamãe", {x: 64, y: 44, w: 20, r: 3, e: "cair", t: .5, z: 5}),
    ["Digory subiu correndo até o quarto da mamãe e deu a maçã para ela.", "O quarto inteiro se encheu de um cheiro bom e de uma luz bonita. A mamãe comeu, sorriu... e dormiu um sono tranquilo, o primeiro em muito tempo."]),
  P("papel", svg("0 0 300 200", casaCampo, {x: 30, y: 4, w: 64, e: "pop", t: .0, d: 2, z: 2, c: "moldura"}) + img("digory-correndo", {x: 4, y: 40, w: 26, e: "esq", t: .3, d: 4, z: 4}),
    ["E sabe o que aconteceu? A mamãe <b>sarou</b>! Ficou boa de verdade.", "O papai voltou de viagem, rico com uma herança, e eles todos foram morar numa casa enorme no campo, cheia de cavalos e riachos."]),
  P("jardim", fundo("0 0 400 240", grama) + svg("0 0 100 100", AM("c15c"), {x: 20, y: 60, w: 14, e: "cair", t: .1, d: 3, z: 3}) + svg("0 0 100 100", VD("c15d"), {x: 36, y: 64, w: 14, e: "cair", t: .2, d: 3, z: 3}) + svg("0 0 100 200", arvore, {x: 60, y: 6, w: 26, e: "pop", t: .4, d: 2, z: 2}),
    ["Antes de se mudar, Digory e Polly enterraram os anéis no quintal, junto com o miolo da maçã mágica.", "Dali nasceu uma macieira linda. Ela não era mágica como a de Nárnia... mas às vezes seus galhos se mexiam sem vento nenhum."]),
  P("sala", svg("0 0 120 280", tioAndre, {x: 30, y: 6, w: 26, e: "pop", t: .0, d: 3, z: 3}) + tag("— Ah, que mulher magnífica...", {x: 54, y: 30, w: 42, r: 3, e: "zoom", t: .3, z: 6, c: "fala"}),
    ["E o tio André? Nunca mais fez mágica. Ficou mais bonzinho e foi morar com a família do Digory.", "Às vezes, quando ninguém estava ouvindo, ele suspirava contando para as visitas sobre uma rainha magnífica que um dia conheceu..."]),
  P("noite", `<div class="ceu">${estrelas()}</div>` + svg("0 0 100 200", arvore, {x: 10, y: 10, w: 30, r: 70, e: "cair", t: .0, d: 2}) + svg("0 0 200 290", guardaRoupa, {x: 52, y: 6, w: 34, e: "pop", t: .3, d: 3, z: 3}),
    ["Muitos anos depois, Digory cresceu e virou um professor sábio, de cabelo branco. Numa noite de tempestade, a macieira caiu.", "Ele não quis jogar a madeira fora. Com ela, mandou fazer um <b>guarda-roupa</b>."]),
  P("magia", peca(`<svg viewBox="0 0 200 290">${guardaRoupa}</svg><div class="neve"></div>`, {x: 24, y: 0, w: 42, e: "pop", t: .0, d: 3, z: 3, a: "guardaRoupa", c: "guarda-roupa"}) +
    tag("Em breve: O Leão, a Feiticeira e o Guarda-Roupa", {x: 4, y: 88, w: 92, r: -1, e: "zoom", t: 1, z: 6, c: "placa em-breve-tag"}),
    fim(["Um guarda-roupa comum, de madeira... ou será que não?", "Porque, muitos anos depois, quatro crianças iam abrir a porta dele. E aí começaria uma outra aventura.", dica("toque no guarda-roupa para abrir")], "", "Fim de “O Sobrinho do Mago”. 🦁"), {final: true})
]};

[CAP10, CAP11, CAP12, CAP13, CAP14, CAP15].forEach(c => N.capitulo(c));
})();
