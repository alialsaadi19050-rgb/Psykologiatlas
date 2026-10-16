/* Psykologiatlas – gemensam motor. Kapitlen är bara data (data.js). */
(() => {
  "use strict";
  const A = window.ATLAS;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const app = $("#app");

  /* ---------- Sparning (en nyckel för allt, tål att localStorage saknas) ---------- */
  const KEY = "psykatlas_v1";
  let S = {};
  try { S = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { S = {}; }
  S.cards = S.cards || {}; S.wrong = S.wrong || {}; S.essay = S.essay || {}; S.crit = S.crit || {};
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };

  /* ---------- Hjälpfunktioner ---------- */
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const strip = h => String(h).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const slug = s => s.toLowerCase().replace(/[åä]/g, "a").replace(/ö/g, "o").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const emLast = t => esc(t).replace(/(\S+)$/, "<em>$1</em>");
  // "Bok s. 171–172 · PPT ..." → "s.171–172", annars "PPT"
  const pages = src => { const m = /s\. ?([\d–,\s]+\d)/.exec(src); return m ? "s." + m[1].split(",")[0].trim() : "PPT"; };
  const DAY = 864e5;
  const IV = [0, 1 * DAY, 3 * DAY, 7 * DAY, 16 * DAY, 35 * DAY]; // repetition med intervall: låda 0–5
  let keyHandler = null, spy = null;
  document.addEventListener("keydown", e => {
    if (!keyHandler) return;
    if (/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
    keyHandler(e);
  });

  /* ---------- Förbered data ---------- */
  const CH = A.chapters;
  const READY = CH.filter(c => c.ready);
  CH.forEach(c => {
    (c.terms || []).forEach(t => { t.id = c.id + ":" + slug(t.t); t.ch = c; });
    (c.quiz || []).forEach((q, i) => { q.id = c.id + "-q" + i; q.ch = c; });
    (c.essays || []).forEach((q, i) => { q.id = c.id + "-e" + i; });
    (c.sections || []).forEach((s, i) => { s.n = i + 1; });
  });
  const ALL_TERMS = READY.flatMap(c => c.terms || []);
  const chap = id => CH.find(c => c.id === id);
  const known = t => { const c = S.cards[t.id]; return c && c.b >= 1; };
  const pct = terms => terms.length ? Math.round(100 * terms.filter(known).length / terms.length) : 0;

  /* ---------- Tema ---------- */
  const applyTheme = () => {
    if (S.theme) document.documentElement.setAttribute("data-theme", S.theme);
    else document.documentElement.removeAttribute("data-theme");
    const b = $("#theme");
    b.textContent = S.theme === "dark" ? "☾" : S.theme === "light" ? "☀" : "◐";
    b.title = S.theme === "dark" ? "Mörkt tema" : S.theme === "light" ? "Ljust tema" : "Tema efter enheten";
  };
  $("#theme").addEventListener("click", () => { S.theme = !S.theme ? "dark" : S.theme === "dark" ? "light" : undefined; save(); applyTheme(); });
  applyTheme();
  $("#reset").addEventListener("click", () => {
    if (!confirm("Vill du nollställa alla flashcards, quizfel och dina provsvar?")) return;
    S.cards = {}; S.wrong = {}; S.essay = {}; S.crit = {}; save(); render();
  });

  /* ---------- Flikar ---------- */
  function tabs(active) {
    const items = CH.filter(c => c.ready).map(c => [`#/k/${c.id}`, c.short, c.id, `c-${c.id}`])
      .concat([["#/studier", "Studier", "studier", ""], ["#/begrepp", "Alla begrepp", "begrepp", ""]]);
    $("#tabs").innerHTML = items.map(([h, l, id, cls]) =>
      `<a href="${h}" class="${cls} ${id === active ? "on" : ""}" ${id === active ? 'aria-current="page"' : ""}>${cls ? "<i></i>" : ""}${esc(l)}</a>`).join("");
    const on = $("#tabs a.on"); if (on) on.scrollIntoView({ block: "nearest", inline: "center" });
  }

  /* ---------- Router ---------- */
  function render() {
    keyHandler = null; if (spy) { spy.disconnect(); spy = null; }
    $("#sres").classList.remove("open");
    const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
    const [p0, p1, p2, p3] = parts;
    if (p0 === "k" && chap(p1) && chap(p1).ready) { tabs(p1); chapterPage(chap(p1), p2 || "las", p3); }
    else if (p0 === "studier") { tabs("studier"); studiesPage(p1); }
    else if (p0 === "begrepp") { tabs("begrepp"); termsPage(p1 || "kort"); }
    else { tabs("start"); home(); }
    if (!(p0 === "k" && p3)) window.scrollTo({ top: 0, behavior: "instant" });
  }
  window.addEventListener("hashchange", render);

  /* ---------- Startsida ---------- */
  function home() {
    const cards = READY.map((c, i) => {
      const p = pct(c.terms);
      return `<a class="card c-${c.id}" style="--i:${i}" href="#/k/${c.id}">
        <span class="mono">${esc(c.label)}</span><b class="t">${esc(c.short)}</b>
        <p>${esc(c.desc)}</p>
        <span class="prog"><span class="bar"><i style="width:${p}%"></i></span>${p} %</span>
        <span class="go">Öppna →</span></a>`;
    }).join("");
    const nStud = Object.values(A.studies).filter(s => chap(s.ch) && chap(s.ch).ready).length;
    app.innerHTML = `<div class="home">
      <span class="mono">Psykologi · Du och samhället · kap 10–11</span>
      <h1>Psykologi<em>atlas</em></h1>
      <p class="lead">Sex kapitel, alla studier och alla begrepp på ett ställe. Välj ett kapitel nedan eller i flikarna högst upp. Varje kapitel har sin egen meny, klickbara figurer, flashcards, quiz och provfrågor med modellsvar.</p>
      <div class="cards">${cards}
        <a class="card c-alla" style="--i:${READY.length}" href="#/studier"><span class="mono">Alla kapitel · ${nStud} studier</span><b class="t">Studier</b><p>Alla studier som kort: syfte, försökspersoner, metod, resultat och hur du värderar dem.</p><span class="go">Öppna →</span></a>
        <a class="card c-alla" style="--i:${READY.length + 1}" href="#/begrepp"><span class="mono">Flashcards · hela atlasen</span><b class="t">Alla begrepp</b><p>Alla ${ALL_TERMS.length} begrepp som flashcards och sökbar ordlista. Välj kapitel eller kör allt.</p>
          <span class="prog"><span class="bar"><i style="width:${pct(ALL_TERMS)}%"></i></span>${pct(ALL_TERMS)} %</span><span class="go">Öppna →</span></a>
      </div>
      <p class="tip"><b>Tips:</b> Kort du kan kommer tillbaka efter 1, 3, 7, 16 och 35 dagar. Kör <b>Att repetera</b> varje dag så räcker några minuter. Allt sparas i den här webbläsaren.</p></div>`;
  }

  /* ---------- Kapitel ---------- */
  function chapterPage(c, view, target) {
    const practice = [["kort", "Flashcards", c.terms.length], ["quiz", "Quiz", c.quiz.length], ["prov", "Provfrågor", c.essays.length]];
    const rail = c.sections.map(s => `<a href="#/k/${c.id}/las/${s.id}" data-sec="${s.id}"><span>${pages(s.src)}</span>${esc((A.nav[c.id] || {})[s.id] || s.title)}</a>`).join("") +
      `<div class="sep"></div>` +
      practice.map(([v, l, n]) => `<a href="#/k/${c.id}/${v}" class="${view === v ? "on" : ""}"><span>▸ ${n}</span>${l}</a>`).join("");
    const lab = c.label.replace(/s\. /, "sidorna ");
    app.innerHTML = `<div class="chap c-${c.id}">
      <nav class="rail" aria-label="Kapitlets delar">${rail}</nav>
      <div class="main">
        <header class="hero">
          <span class="mono">Psykologi · ${esc(lab)}</span>
          <h1>${emLast(c.title)}</h1>
          ${view === "las" ? `<p class="lead">${esc(c.desc)}</p>
          <div class="howto"><div><b>1. Läs kapitlet</b>Gula rutor är minnesknep. Blå rutor är förklaringar som inte står i boken.</div>
            <div><b>2. Klicka i figurerna</b>Tryck på delarna i figurerna och öppna kontrollfrågorna.</div>
            <div><b>3. Testa dig</b>Kör flashcards tills allt sitter, sedan quiz och provfrågor.</div></div>
          ${A.tricks[c.id] ? `<div class="trick"><span class="mono">Minnesknep för hela kapitlet</span>${A.tricks[c.id]}</div>` : ""}`
          : `<p class="lead">${view === "kort" ? "Flashcards med repetition." : view === "quiz" ? "Quiz med förklaringar och sidhänvisningar." : "Provfrågor med modellsvar och checklista."}</p>`}
        </header>
        <div id="view"></div>
      </div></div>`;
    const el = $("#view");
    if (view === "kort") flash(el, c.terms, c.id);
    else if (view === "quiz") quiz(el, c.quiz);
    else if (view === "prov") essays(el, c.essays);
    else {
      read(el, c);
      if (target) { const s = document.getElementById(target); if (s) { s.scrollIntoView(); s.classList.add("hl"); setTimeout(() => s.scrollIntoView(), 250); } }
      scrollSpy();
    }
  }

  function scrollSpy() {
    const links = $$("nav.rail a[data-sec]");
    if (!("IntersectionObserver" in window) || !links.length) return;
    spy = new IntersectionObserver(es => {
      es.forEach(e => {
        if (!e.isIntersecting) return;
        links.forEach(a => a.classList.toggle("on", a.dataset.sec === e.target.id));
        const on = $("nav.rail a.on[data-sec]"); if (on && innerWidth <= 900) on.scrollIntoView({ block: "nearest", inline: "center" });
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    $$(".sec").forEach(s => spy.observe(s));
  }

  function read(el, c) {
    el.innerHTML = c.sections.map(s => `<section class="sec" id="${s.id}">
        <div class="head"><span class="num">${String(s.n).padStart(2, "0")}</span><h2>${esc(s.title)}</h2><span class="mono pg">${pages(s.src)}</span></div>
        <p class="why">${s.why}</p>
        ${expand(s.html)}
        ${s.check && s.check.length ? `<div class="checks"><h4>Kontrollfrågor</h4>${s.check.map(q => `<details><summary>${q.q}</summary><p>${q.a}</p></details>`).join("")}</div>` : ""}
        <span class="src">Källa: ${esc(s.src)}</span>
      </section>`).join("") +
      `<div class="row" style="margin-top:40px"><a class="btn" href="#/k/${c.id}/kort">Kör flashcards →</a><a class="btn ghost" href="#/k/${c.id}/quiz">Gör quizet</a></div>`;
    wireFigs(el);
  }

  // [[study:id]] och [[fig:id]] i texten byts mot studiekort och figurer
  const expand = h => h.replace(/\[\[study:([\w-]+)\]\]/g, (m, id) => studyCard(A.studies[id])).replace(/\[\[fig:([\w-]+)\]\]/g, (m, id) => figure(id));

  function figure(id) {
    const f = A.figs[id];
    return `<figure class="fig" data-fig="${id}" aria-label="${esc(f.label)}"><div class="svgwrap">${f.svg}</div>
      <p class="hint">Klicka på delarna i figuren. I mobilen kan du svepa åt sidan.</p>
      <div class="fig-info" aria-live="polite">${f.start || ""}</div></figure>`;
  }
  function wireFigs(root) {
    $$(".fig", root).forEach(fig => {
      const f = A.figs[fig.dataset.fig];
      $$("[data-k]", fig).forEach(g => {
        g.setAttribute("tabindex", "0"); g.setAttribute("role", "button");
        const show = () => {
          $$("[data-k]", fig).forEach(x => x.classList.remove("on"));
          g.classList.add("on");
          $(".fig-info", fig).innerHTML = f.info[g.dataset.k] || "";
        };
        g.addEventListener("click", show);
        g.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); show(); } });
      });
    });
  }

  function studyCard(s) {
    if (!s) return "";
    const rows = [["Syfte", s.syfte], ["Försökspersoner", s.fp], ["Metod", s.metod], ["Resultat", s.resultat], ["Slutsats", s.slutsats]]
      .filter(r => r[1]).map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join("");
    return `<article class="study"><header><span>${esc(s.who)} (${esc(s.year)})</span>${s.tag ? `<span class="tag">${esc(s.tag)}</span>` : ""}</header>
      <dl>${rows}<dt>Källa</dt><dd>${esc(s.src)}</dd></dl>
      ${s.crit ? `<details class="crit"><summary>Värdera studien (kritiskt tänkande)</summary><div class="note">${s.crit}</div></details>` : ""}</article>`;
  }

  /* ---------- Flashcards med repetition ---------- */
  function flash(el, terms, scope) {
    let queue = [], cur = null, back = false, failed = new Set(), done = 0, again = 0, total = 0;
    S.dir = S.dir || "td";
    const card = id => S.cards[id] || (S.cards[id] = { b: 0, d: 0 });
    const due = t => { const c = S.cards[t.id]; return !c || c.b === 0 || c.d <= Date.now(); };
    const byId = id => terms.find(t => t.id === id);
    const pools = { due: () => terms.filter(due), all: () => terms, star: () => terms.filter(t => S.cards[t.id] && S.cards[t.id].s) };

    function menu() {
      keyHandler = null;
      const nd = pools.due().length, ns = pools.star().length, p = pct(terms);
      el.innerHTML = `<div class="panel">
        <h2>Flashcards</h2>
        <div class="stat"><div><b>${p} %</b>kan du</div><div><b>${nd}</b>att repetera</div><div><b>${ns}</b>stjärnmärkta</div><div><b>${terms.length}</b>kort</div></div>
        <div class="bar"><i style="width:${p}%"></i></div>
        <p class="muted">Du kör tills du kan alla kort i omgången. <b>Igen</b> gör att kortet kommer tillbaka strax, och <b>Kan</b> gör att det kommer tillbaka om några dagar.</p>
        <div class="row"><span class="muted">Visa först:</span>
          <span class="seg"><button data-dir="td" class="${S.dir === "td" ? "on" : ""}">Begrepp</button><button data-dir="dt" class="${S.dir === "dt" ? "on" : ""}">Förklaring</button></span></div>
        <div class="row">
          <button class="btn" data-go="due" ${nd ? "" : "disabled"}>Att repetera (${nd})</button>
          <button class="btn ghost" data-go="all">Alla kort (${terms.length})</button>
          <button class="btn ghost" data-go="star" ${ns ? "" : "disabled"}>★ Stjärnmärkta (${ns})</button>
        </div>
        ${nd ? "" : `<p class="muted">Inget att repetera just nu. Bra jobbat! Kör alla kort om du vill öva ändå.</p>`}
      </div>`;
      $$("[data-dir]", el).forEach(b => b.onclick = () => { S.dir = b.dataset.dir; save(); menu(); });
      $$("[data-go]", el).forEach(b => b.onclick = () => start(b.dataset.go));
    }
    function start(m) { queue = shuffle(pools[m]().map(t => t.id)); total = queue.length; failed = new Set(); done = 0; again = 0; next(); }
    function next() { back = false; cur = queue.shift(); cur ? draw() : summary(); }
    function draw() {
      const t = byId(cur), c = S.cards[cur] || {};
      const chip = scope === "all" ? esc(t.ch.short) : "Begrepp";
      const front = S.dir === "td" ? `<span class="q">${esc(t.t)}</span>` : `<span class="a">${t.d}</span>`;
      el.innerHTML = `<div class="fc-meta"><span>${done} av ${total} klara · ${queue.length + 1} kvar</span><span>Igen: ${again}</span></div>
        <div class="bar" style="margin:6px 0"><i style="width:${total ? 100 * done / total : 0}%"></i></div>
        <div class="card3d ${scope === "all" ? "c-" + t.ch.id : ""}"><div class="flash ${back ? "flip" : ""}" id="fcc" role="button" tabindex="0" aria-label="Vänd kortet">
          <div class="face"><span class="mono">${chip}</span>${front}</div>
          <div class="face back"><span class="mono">${chip}</span><span class="q">${esc(t.t)}</span><span class="a">${t.d}</span><span class="srcm">${esc(t.src)}</span></div>
        </div></div>
        <button class="btn ghost ${c.s ? "on" : ""}" id="star" aria-label="Stjärnmärk till senare" title="Stjärnmärk till senare (S)"><span class="st">★</span> <small>${c.s ? "Stjärnmärkt" : "Spara till senare"}</small></button>
        <div class="row">
          <button class="btn bad" id="no" ${back ? "" : "hidden"}>Igen <span class="kbd">1</span></button>
          <button class="btn good" id="yes" ${back ? "" : "hidden"}>Kan <span class="kbd">2</span></button>
          <button class="btn" id="flip" ${back ? "hidden" : ""}>Vänd <span class="kbd">mellanslag</span></button>
          <button class="btn ghost" id="stop" style="margin-left:auto">Avsluta</button></div>
        <p class="fc-hint">Tryck på kortet för att vända det.</p>`;
      $("#fcc").onclick = flip;
      $("#fcc").onkeydown = e => { if (e.key === "Enter") flip(); };
      $("#star").onclick = toggleStar;
      $("#flip").onclick = flip;
      $("#yes").onclick = () => answer(true); $("#no").onclick = () => answer(false);
      $("#stop").onclick = menu;
      keyHandler = e => {
        if (e.key === " ") { e.preventDefault(); flip(); }
        else if (back && e.key === "1") answer(false);
        else if (back && e.key === "2") answer(true);
        else if (e.key.toLowerCase() === "s") toggleStar();
      };
    }
    function flip() {
      back = !back;
      $("#fcc").classList.toggle("flip", back);
      $("#flip").hidden = back; $("#yes").hidden = !back; $("#no").hidden = !back;
    }
    function toggleStar() {
      const c = card(cur); c.s = !c.s; save();
      $("#star").classList.toggle("on", c.s); $("#star small").textContent = c.s ? "Stjärnmärkt" : "Spara till senare";
    }
    function answer(ok) {
      const c = card(cur);
      if (ok) { c.b = failed.has(cur) ? Math.max(c.b, 1) : Math.min(c.b + 1, 5); c.d = Date.now() + IV[c.b]; done++; }
      else { c.b = 0; c.d = 0; failed.add(cur); again++; queue.splice(Math.min(3, queue.length), 0, cur); }
      save(); next();
    }
    function summary() {
      keyHandler = null;
      el.innerHTML = `<div class="fc-done"><p>Klart! Du kan alla ${total} kort i omgången. ${again ? `Du behövde ${again} extra försök.` : "Allt rätt på första försöket!"}</p>
        <button class="btn" id="back">Tillbaka</button></div>
        <div class="row"><span class="bar"><i style="width:${pct(terms)}%"></i></span><span class="muted">${pct(terms)} % av begreppen kan du nu</span></div>`;
      $("#back").onclick = menu;
    }
    menu();
  }

  /* ---------- Quiz ---------- */
  function quiz(el, qs) {
    let list = [], i = 0, score = 0;
    function menu() {
      const nw = qs.filter(q => S.wrong[q.id]).length;
      el.innerHTML = `<div class="panel"><h2>Quiz</h2>
        <p class="muted">Blandade frågetyper: flerval, sant eller falskt, para ihop och sätt i ordning. Efter varje svar får du en förklaring och var det står i boken.</p>
        <div class="row"><button class="btn" id="all">Alla frågor (${qs.length})</button>
        <button class="btn ghost" id="wr" ${nw ? "" : "disabled"}>Bara de jag haft fel på (${nw})</button></div></div>`;
      $("#all").onclick = () => start(qs);
      $("#wr").onclick = () => start(qs.filter(q => S.wrong[q.id]));
    }
    function start(set) { list = shuffle(set); i = 0; score = 0; ask(); }
    function ask() {
      if (i >= list.length) return end();
      const q = list[i];
      el.innerHTML = `<div class="qq"><div class="fc-meta"><span class="mono">Fråga ${i + 1} av ${list.length}</span><span class="score">${score} rätt</span></div>
        <div class="bar" style="margin:8px 0 14px"><i style="width:${100 * i / list.length}%"></i></div>
        <p class="q">${q.q}</p><div id="qa"></div><div id="fb"></div></div>`;
      const qa = $("#qa");
      ({ mc, tf, match, order })[q.t](qa, q);
    }
    function result(q, ok) {
      if (ok) { score++; delete S.wrong[q.id]; } else S.wrong[q.id] = true;
      save();
      $("#fb").innerHTML = `<div class="fb ${ok ? "ok" : "no"}"><b>${ok ? "Rätt!" : "Inte riktigt."}</b>${q.why}<br><span class="src">${esc(q.src)}</span></div>
        <div class="row"><button class="btn" id="nx">${i + 1 < list.length ? "Nästa fråga →" : "Se resultat"}</button></div>`;
      $("#nx").onclick = () => { i++; ask(); };
      $("#nx").focus({ preventScroll: true });
    }
    function mc(qa, q) {
      const o = shuffle(q.o.map((t, k) => ({ t, k })));
      qa.innerHTML = `<div class="opts">${o.map(x => `<button class="opt" data-k="${x.k}">${x.t}</button>`).join("")}</div>`;
      $$(".opt", qa).forEach(b => b.onclick = () => {
        const ok = +b.dataset.k === q.a;
        $$(".opt", qa).forEach(x => { x.disabled = true; if (+x.dataset.k === q.a) x.classList.add("right"); });
        if (!ok) b.classList.add("wrong");
        result(q, ok);
      });
    }
    function tf(qa, q) {
      qa.innerHTML = `<p class="muted">Sant eller falskt? Tänk ut en motivering innan du svarar.</p><div class="opts">
        <button class="opt" data-v="1">Sant</button><button class="opt" data-v="0">Falskt</button></div>`;
      $$(".opt", qa).forEach(b => b.onclick = () => {
        const ok = (b.dataset.v === "1") === q.a;
        $$(".opt", qa).forEach(x => { x.disabled = true; if ((x.dataset.v === "1") === q.a) x.classList.add("right"); });
        if (!ok) b.classList.add("wrong");
        result(q, ok);
      });
    }
    function match(qa, q) {
      const rights = shuffle(q.pairs.map(p => p[1]));
      qa.innerHTML = q.pairs.map((p, k) => `<div class="match-row"><b>${p[0]}</b>
        <select data-k="${k}" aria-label="Välj för ${esc(strip(p[0]))}"><option value="">Välj …</option>${rights.map(r => `<option>${esc(r)}</option>`).join("")}</select><span class="mk"></span></div>`).join("") +
        `<div class="row"><button class="btn" id="chk">Kontrollera</button></div>`;
      $("#chk").onclick = () => {
        let ok = true;
        $$("select", qa).forEach(s => {
          const r = s.value === q.pairs[+s.dataset.k][1];
          ok = ok && r; s.disabled = true;
          s.nextElementSibling.innerHTML = r ? `<span class="ok-mark">✓</span>` : `<span class="no-mark">✗</span> <small>${esc(q.pairs[+s.dataset.k][1])}</small>`;
        });
        $("#chk").remove(); result(q, ok);
      };
    }
    function order(qa, q) {
      let cur = shuffle(q.items);
      if (cur.join() === q.items.join()) cur.reverse();
      const draw = () => {
        qa.innerHTML = `<ol class="order-list">${cur.map((t, k) => `<li><b>${k + 1}.</b><span>${t}</span>
          <button class="mini" data-u="${k}" aria-label="Flytta upp" ${k ? "" : "disabled"}>↑</button><button class="mini" data-d="${k}" aria-label="Flytta ner" ${k < cur.length - 1 ? "" : "disabled"}>↓</button></li>`).join("")}</ol>
          <div class="row"><button class="btn" id="chk">Kontrollera</button></div>`;
        $$("[data-u]", qa).forEach(b => b.onclick = () => { const k = +b.dataset.u; [cur[k - 1], cur[k]] = [cur[k], cur[k - 1]]; draw(); });
        $$("[data-d]", qa).forEach(b => b.onclick = () => { const k = +b.dataset.d; [cur[k + 1], cur[k]] = [cur[k], cur[k + 1]]; draw(); });
        $("#chk").onclick = () => {
          const ok = cur.join() === q.items.join();
          $$(".order-list li", qa).forEach((li, k) => { li.classList.add(cur[k] === q.items[k] ? "right" : "wrong"); $$("button", li).forEach(b => b.remove()); });
          $("#chk").remove();
          if (!ok) $("#fb").insertAdjacentHTML("beforebegin", `<p class="muted">Rätt ordning: ${q.items.map((t, k) => (k + 1) + ". " + t).join(" · ")}</p>`);
          result(q, ok);
        };
      };
      draw();
    }
    function end() {
      const nw = qs.filter(q => S.wrong[q.id]).length;
      el.innerHTML = `<div class="panel"><span class="mono">Resultat</span><h2>${score} av ${list.length} rätt</h2>
        <div class="bar" style="margin:10px 0"><i style="width:${100 * score / list.length}%"></i></div>
        <p class="muted">${score === list.length ? "Fullt! Snyggt." : "Frågorna du hade fel på sparas, så du kan köra bara dem."}</p>
        <div class="row"><button class="btn" id="wr" ${nw ? "" : "disabled"}>Kör felen (${nw})</button><button class="btn ghost" id="mn">Tillbaka</button></div></div>`;
      $("#wr").onclick = () => start(qs.filter(q => S.wrong[q.id]));
      $("#mn").onclick = menu;
    }
    menu();
  }

  /* ---------- Provfrågor med modellsvar ---------- */
  function essays(el, list) {
    el.innerHTML = `<p class="muted">Skriv ditt svar först (det sparas i webbläsaren). Öppna sedan modellsvaret och bocka av vad ditt svar innehåller. Nivåerna visar ungefär vad som brukar skilja ett E-, C- och A-svar.</p>` +
      list.map(e => `<article class="essay" id="${e.id}">
        <span class="badge">${esc(e.kind)}</span>
        <p class="q">${e.q}</p>
        <textarea aria-label="Ditt svar" placeholder="Skriv ditt svar här …">${esc(S.essay[e.id] || "")}</textarea>
        <details><summary>Visa modellsvar och checklista</summary>
          <div class="model">${e.model}</div>
          <div class="levels">${["E", "C", "A"].map(L => `<div><h4>${L}-nivå</h4>${e.levels[L].map((x, k) => {
            const key = e.id + L + k;
            return `<label><input type="checkbox" data-c="${key}" ${S.crit[key] ? "checked" : ""}> ${x}</label>`;
          }).join("")}</div>`).join("")}</div>
          <span class="src">Källa: ${esc(e.src)}</span>
        </details></article>`).join("");
    $$("textarea", el).forEach(t => t.addEventListener("input", () => { S.essay[t.closest(".essay").id] = t.value; save(); }));
    $$("[data-c]", el).forEach(c => c.addEventListener("change", () => { S.crit[c.dataset.c] = c.checked; save(); }));
  }

  /* ---------- Studier ---------- */
  function studiesPage(filter) {
    const ids = Object.keys(A.studies).filter(k => chap(A.studies[k].ch) && chap(A.studies[k].ch).ready);
    const chs = READY.filter(c => ids.some(k => A.studies[k].ch === c.id));
    const shown = ids.filter(k => !filter || A.studies[k].ch === filter);
    app.innerHTML = `<div class="page"><span class="mono">Psykologi · alla kapitel</span><h1>Alla <em>studier</em></h1>
      <p class="lead">På provet ska du kunna beskriva studierna och värdera dem. Öppna "Värdera studien" på varje kort.</p>
      <div class="chips"><a class="chip ${!filter ? "on" : ""}" href="#/studier">Alla</a>${chs.map(c => `<a class="chip c-${c.id} ${filter === c.id ? "on" : ""}" href="#/studier/${c.id}"><i></i>${esc(c.short)}</a>`).join("")}</div>
      ${shown.map(k => `<div class="c-${A.studies[k].ch}">${studyCard(A.studies[k])}<a class="mono" href="#/k/${A.studies[k].ch}/las/${A.studies[k].sec}">Läs i kapitlet →</a></div>`).join("")}</div>`;
  }

  /* ---------- Alla begrepp ---------- */
  function termsPage(view) {
    S.sel = (S.sel || []).filter(id => READY.some(c => c.id === id));
    const sel = S.sel.length ? S.sel : READY.map(c => c.id);
    const terms = ALL_TERMS.filter(t => sel.includes(t.ch.id));
    app.innerHTML = `<div class="page"><span class="mono">Flashcards · hela atlasen</span><h1>Alla <em>begrepp</em></h1>
      <p class="lead">Välj vilka kapitel du vill öva på, eller kör allt.</p>
      <div class="chips">${READY.map(c => `<button class="chip c-${c.id} ${sel.includes(c.id) ? "on" : ""}" data-ch="${c.id}"><i></i>${esc(c.short)}</button>`).join("")}</div>
      <nav class="subnav"><a href="#/begrepp/kort" class="${view === "kort" ? "on" : ""}">Flashcards (${terms.length})</a>
      <a href="#/begrepp/lista" class="${view === "lista" ? "on" : ""}">Ordlista</a></nav><div id="view"></div></div>`;
    $$("[data-ch]", app).forEach(b => b.onclick = () => {
      const id = b.dataset.ch; let s = sel.slice();
      s = s.includes(id) ? s.filter(x => x !== id) : s.concat(id);
      S.sel = s.length === READY.length ? [] : s; save(); termsPage(view);
    });
    const el = $("#view");
    if (view === "lista") {
      el.innerHTML = `<input class="filter" id="flt" type="search" placeholder="Filtrera ordlistan" aria-label="Filtrera ordlistan"><div class="gloss" id="gl"></div>`;
      const draw = () => {
        const f = $("#flt").value.toLowerCase();
        const list = terms.filter(t => !f || (t.t + " " + strip(t.d)).toLowerCase().includes(f)).sort((a, b) => a.t.localeCompare(b.t, "sv"));
        $("#gl").innerHTML = list.map(t => `<div class="c-${t.ch.id}"><b>${esc(t.t)}</b>${t.d}<br><span class="src">${esc(t.ch.short)} · ${esc(t.src)}</span></div>`).join("") || `<p class="muted">Inga träffar.</p>`;
      };
      $("#flt").oninput = draw; draw();
    } else flash(el, terms, "all");
  }

  /* ---------- Sök i hela atlasen ---------- */
  const IDX = [];
  READY.forEach(c => {
    c.sections.forEach(s => IDX.push({ title: s.title, sub: c.short + " · avsnitt " + s.n, text: strip(s.title + " " + s.html.replace(/\[\[[^\]]+\]\]/g, "")), href: `#/k/${c.id}/las/${s.id}` }));
    c.terms.forEach(t => IDX.push({ title: t.t, sub: c.short + " · begrepp", text: strip(t.t + " " + t.d), href: `#/begrepp/lista`, term: t.t }));
  });
  Object.values(A.studies).forEach(s => {
    const c = chap(s.ch); if (!c || !c.ready) return;
    IDX.push({ title: `${s.who} (${s.year})`, sub: c.short + " · studie", text: strip([s.who, s.syfte, s.metod, s.resultat, s.slutsats].join(" ")), href: `#/k/${c.id}/las/${s.sec}` });
  });
  const qIn = $("#q"), sres = $("#sres");
  let selI = -1;
  const norm = s => s.toLowerCase();
  function search() {
    const v = norm(qIn.value.trim());
    if (v.length < 2) { sres.classList.remove("open"); return; }
    const words = v.split(/\s+/);
    const hits = IDX.map(r => {
      const t = norm(r.text), ti = norm(r.title);
      if (!words.every(w => t.includes(w))) return null;
      return { r, score: (ti.includes(v) ? 10 : 0) + (ti.startsWith(v) ? 5 : 0) + (r.sub.includes("begrepp") ? 2 : 0) };
    }).filter(Boolean).sort((a, b) => b.score - a.score).slice(0, 12);
    const mark = s => esc(s).replace(new RegExp("(" + words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") + ")", "gi"), "<mark>$1</mark>");
    const snip = r => { const t = r.text, k = norm(t).indexOf(words[0]); return (k > 40 ? "…" : "") + t.slice(Math.max(0, k - 40), k + 90) + "…"; };
    sres.innerHTML = hits.length ? hits.map((h, k) => `<a href="${h.r.href}" data-i="${k}" ${h.r.term ? `data-term="${esc(h.r.term)}"` : ""}><small class="where">${esc(h.r.sub)}</small><b>${mark(h.r.title)}</b><small>${mark(snip(h.r))}</small></a>`).join("")
      : `<div class="empty">Inga träffar på "${esc(qIn.value)}".</div>`;
    sres.classList.add("open"); selI = -1;
    $$("a", sres).forEach(a => a.addEventListener("click", () => {
      const term = a.dataset.term; close();
      if (term) setTimeout(() => { const f = $("#flt"); if (f) { f.value = term; f.oninput(); } }, 60);
    }));
  }
  const close = () => { sres.classList.remove("open"); qIn.value = ""; qIn.blur(); };
  qIn.addEventListener("input", search);
  qIn.addEventListener("keydown", e => {
    const items = $$("a", sres);
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault(); if (!items.length) return;
      selI = (selI + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length;
      items.forEach((a, k) => a.classList.toggle("sel", k === selI));
    } else if (e.key === "Enter" && items.length) { e.preventDefault(); (items[selI] || items[0]).click(); }
    else if (e.key === "Escape") close();
  });
  document.addEventListener("click", e => { if (!e.target.closest(".search")) sres.classList.remove("open"); });

  render();
})();
