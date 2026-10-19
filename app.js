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
  if (!S.known) { // flytta över från den gamla kortleken med lådor
    S.known = {}; S.star = S.star || {};
    Object.entries(S.cards).forEach(([k, c]) => { if (c.b >= 1) S.known[k] = true; if (c.s) S.star[k] = true; });
  }
  S.star = S.star || {};
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };

  /* ---------- Hjälpfunktioner ---------- */
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const strip = h => String(h).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const slug = s => s.toLowerCase().replace(/[åä]/g, "a").replace(/ö/g, "o").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const emLast = t => esc(t).replace(/(\S+)$/, "<em>$1</em>");
  // "Bok s. 171–172 · PPT ..." → "s.171–172", annars "PPT"
  const pages = src => { const m = /s\. ?([\d–,\s]+\d)/.exec(src); return m ? "s." + m[1].split(",")[0].trim() : "PPT"; };
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
  const known = t => !!S.known[t.id];
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
    S.cards = {}; S.known = {}; S.star = {}; S.wrong = {}; S.essay = {}; S.crit = {}; save(); render();
  });

  /* ---------- Flikar ---------- */
  function tabs(active) {
    const items = CH.filter(c => c.ready).map(c => [`#/k/${c.id}`, c.short, c.id, `c-${c.id}`])
      .concat([["#/modeller", "Träna modeller", "modeller", ""], ["#/studier", "Studier", "studier", ""], ["#/begrepp", "Alla begrepp", "begrepp", ""]]);
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
    else if (p0 === "modeller") { tabs("modeller"); modelsPage(p1); }
    else if (p0 === "studier") { tabs("studier"); studiesPage(p1); }
    else if (p0 === "begrepp") { tabs("begrepp"); termsPage(p1 || "kort"); }
    else { tabs("start"); home(); }
    if (!((p0 === "k" && p3) || (p0 === "modeller" && p1))) window.scrollTo({ top: 0, behavior: "instant" });
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
        <a class="card c-alla" style="--i:${READY.length}" href="#/modeller"><span class="mono">Öva · ${(A.models || []).length} modeller</span><b class="t">Träna modellerna</b><p>Fyll i tomma modeller, sätt stegen i ordning och kör snabbquiz: Stern, Marcia, Bowlby, Tuckman, Hersey & Blanchard och fler.</p><span class="go">Öppna →</span></a>
        <a class="card c-alla" style="--i:${READY.length}" href="#/studier"><span class="mono">Alla kapitel · ${nStud} studier</span><b class="t">Studiernas röda tråd</b><p>Alla studier i den ordning de hänger ihop: teori, sedan studier som stödjer eller säger emot, och sist slutsatsen.</p><span class="go">Öppna →</span></a>
        <a class="card c-alla" style="--i:${READY.length + 1}" href="#/begrepp"><span class="mono">Flashcards · hela atlasen</span><b class="t">Alla begrepp</b><p>Alla ${ALL_TERMS.length} begrepp som flashcards och sökbar ordlista. Välj kapitel eller kör allt.</p>
          <span class="prog"><span class="bar"><i style="width:${pct(ALL_TERMS)}%"></i></span>${pct(ALL_TERMS)} %</span><span class="go">Öppna →</span></a>
      </div>
      <p class="tip"><b>Tips:</b> Det du markerar som "Jag kan den" i flashcards sparas för varje kapitel, även när du byter flik. Kör "Kör tills jag kan alla" inför provet och markera svåra kort med ★.</p></div>`;
  }

  /* ---------- Kapitel ---------- */
  function chapterPage(c, view, target) {
    const practice = [["kort", "Flashcards", c.terms.length], ["quiz", "Quiz", c.quiz.length], ["prov", "Provfrågor", c.essays.length]]
      .concat(modelsOf(c.id).length ? [["modeller", "Träna modeller", modelsOf(c.id).length]] : []);
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
          : `<p class="lead">${view === "kort" ? "Vänd korten, markera det du kan och kör tills du kan alla." : view === "modeller" ? "Fyll i de tomma modellerna, sätt stegen i ordning och kör snabbquiz." : view === "quiz" ? "Quiz med förklaringar och sidhänvisningar." : "Provfrågor med modellsvar och checklista."}</p>`}
        </header>
        <div id="view"></div>
      </div></div>`;
    const el = $("#view");
    if (view === "kort") flash(el, c.terms, c.id);
    else if (view === "quiz") quiz(el, c.quiz);
    else if (view === "prov") essays(el, c.essays);
    else if (view === "modeller" && modelsOf(c.id).length) modelsView(el, modelsOf(c.id), target, id => `#/k/${c.id}/modeller/${id}`);
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
      <p class="hint">Klicka på delarna i figuren. I mobilen kan du svepa åt sidan.${(A.models || []).some(m => m.id === id) ? ` <a class="train" href="#/k/${A.models.find(m => m.id === id).ch}/modeller/${id}">Träna på modellen →</a>` : ""}</p>
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

  /* ---------- Animationer för flashcards (samma som i Biologiatlas) ---------- */
  const FX = (() => {
    let reduce = false; try { reduce = matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}
    const canAnim = !reduce && !!Element.prototype.animate;
    const EI = "cubic-bezier(.55,0,1,.45)", SPR = "cubic-bezier(.34,1.4,.55,1)";
    const css = v => { try { return getComputedStyle(document.documentElement).getPropertyValue(v).trim(); } catch (e) { return ""; } };
    const OUT = { next: "translateX(-70px) rotate(-5deg)", prev: "translateX(70px) rotate(5deg)", know: "translate(90px,-14px) rotate(8deg)", again: "translate(-90px,10px) rotate(-8deg)", restart: "translateY(26px) scale(.86)", shuffle: "scale(.9) rotate(-3deg)", mode: "translateY(10px) scale(.96)" };
    const IN = { next: "translateX(70px) rotate(4deg)", prev: "translateX(-70px) rotate(-4deg)", know: "translateX(70px) rotate(4deg)", again: "translateX(70px) rotate(4deg)", restart: "translateY(-30px) scale(.9)", shuffle: "scale(.9) rotate(3deg)", mode: "translateY(10px) scale(.96)" };
    let busy = null, wasDone = false, t0 = 0;
    const resetFlip = f => { f.style.transition = "none"; f.classList.remove("flip"); void f.offsetWidth; f.style.transition = ""; };
    function swap(flash, dir, update) {
      const box = flash.parentElement;
      if (!canAnim) { update(); return; }
      if (busy) { busy.cancel(); busy = null; }
      const glow = dir === "know" ? css("--good") : dir === "again" ? css("--bad-btn") : "";
      const k0 = { transform: "none", opacity: 1 }, k1 = { transform: OUT[dir] || OUT.next, opacity: 0 };
      if (glow) { k0.boxShadow = "0 0 0 0 transparent"; k1.boxShadow = "0 0 0 6px " + glow; }
      const a = box.animate([k0, k1], { duration: dir === "restart" ? 240 : 190, easing: EI });
      busy = a; let done = false;
      const fin = () => {
        if (done) return; done = true; busy = null; resetFlip(flash); update();
        box.animate([{ transform: IN[dir] || IN.next, opacity: 0 }, { transform: "none", opacity: 1 }], { duration: dir === "restart" ? 620 : 460, easing: SPR });
      };
      a.onfinish = fin; a.oncancel = fin;
      setTimeout(fin, (dir === "restart" ? 240 : 190) + 120); // om animationer är pausade (dold flik) byts kortet ändå
    }
    function confetti(el) {
      if (!canAnim || !el) return;
      const r = el.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const layer = document.createElement("div"); layer.className = "fx-confetti"; document.body.appendChild(layer);
      const cols = ["#D9A42B", "#3C6BD0", "#2E8A57", "#C4473D", "#7B4FC4"];
      for (let i = 0; i < 36; i++) {
        const p = document.createElement("i"); p.style.left = cx + "px"; p.style.top = cy + "px"; p.style.background = cols[i % cols.length];
        if (i % 3 === 0) { p.style.borderRadius = "50%"; p.style.width = p.style.height = "9px"; }
        layer.appendChild(p);
        const ang = Math.random() * Math.PI * 2, sp = 120 + Math.random() * 220, dx = Math.cos(ang) * sp, dy = Math.sin(ang) * sp - 140, rot = Math.random() * 720 - 360;
        p.animate([{ transform: "translate(-50%,-50%) rotate(0)", opacity: 1 },
          { transform: `translate(calc(-50% + ${dx * .7}px),calc(-50% + ${dy * .7}px)) rotate(${rot * .6}deg)`, opacity: 1, offset: .45 },
          { transform: `translate(calc(-50% + ${dx}px),calc(-50% + ${dy + 260}px)) rotate(${rot}deg)`, opacity: 0 }],
          { duration: 1300 + Math.random() * 700, easing: "cubic-bezier(.2,.7,.4,1)", fill: "forwards" });
      }
      setTimeout(() => layer.remove(), 2300);
    }
    function menu(btn, box, choose) {
      const close = focus => { box.hidden = true; btn.setAttribute("aria-expanded", "false"); if (focus) btn.focus(); };
      const open = () => { box.hidden = false; btn.setAttribute("aria-expanded", "true"); const f = box.querySelector("button"); if (f) f.focus(); };
      btn.addEventListener("click", e => { e.stopPropagation(); box.hidden ? open() : close(); });
      box.addEventListener("click", e => { const b = e.target.closest("button[data-r]"); if (!b) return; close(false); choose(b.dataset.r); });
      box.addEventListener("keydown", e => {
        const bs = [...box.querySelectorAll("button")], i = bs.indexOf(document.activeElement);
        if (e.key === "Escape") { e.preventDefault(); close(true); }
        else if (e.key === "ArrowDown") { e.preventDefault(); bs[(i + 1) % bs.length].focus(); }
        else if (e.key === "ArrowUp") { e.preventDefault(); bs[(i - 1 + bs.length) % bs.length].focus(); }
      });
    }
    document.addEventListener("click", e => $$(".fc-menu:not([hidden])").forEach(m => {
      if (!m.parentElement.contains(e.target)) { m.hidden = true; m.previousElementSibling.setAttribute("aria-expanded", "false"); }
    }));
    const prog = v => { const i = $("#fcProg i"); if (i) i.style.width = Math.max(0, Math.min(1, v)) * 100 + "%"; };
    function finish(on, text) {
      const row = $("#fcDone"); if (!row) return;
      if (text) row.querySelector("p").textContent = text;
      row.hidden = !on;
      if (on && !wasDone && Date.now() - t0 > 1200) confetti($("#flash"));
      wasDone = on;
    }
    const start = () => { wasDone = false; t0 = Date.now(); };
    return { swap, menu, prog, finish, start };
  })();

  /* ---------- Flashcards (samma kortlek och knappar som Biologiatlas) ---------- */
  function flash(el, terms, scope) {
    let order = terms.map((_, i) => i), pos = 0, mode = "all", round = 1;
    const isKnown = i => !!S.known[terms[i].id], isStar = i => !!S.star[terms[i].id];
    const nKnown = () => terms.filter(t => S.known[t.id]).length, nStar = () => terms.filter(t => S.star[t.id]).length;
    el.innerHTML = `<section class="sec fcsec">
      <div class="head"><h2>Flashcards</h2><span class="mono pg">klicka på kortet för att vända det</span></div>
      <div class="fcbar"><div class="seg" id="deckMode"><button type="button" data-v="all" aria-pressed="true">Alla kort</button><button type="button" data-v="left" aria-pressed="false">Bara de jag inte kan</button><button type="button" data-v="until" aria-pressed="false">Kör tills jag kan alla</button><button type="button" data-v="star" aria-pressed="false">★ Markerade</button></div></div>
      <div class="row"><button class="btn ghost" id="fcShuffle" type="button">Blanda</button><div class="fc-restart"><button class="btn ghost" id="fcRestart" type="button" aria-haspopup="true" aria-expanded="false" aria-controls="fcRestartMenu">↺ Börja om</button><div class="fc-menu" id="fcRestartMenu" role="menu" hidden><button type="button" role="menuitem" data-r="soft"><b>Börja om från första kortet</b><span>Samma kortlek i ursprunglig ordning. Det du kan och dina ★-markerade kort sparas.</span></button><button type="button" role="menuitem" data-r="hard" class="danger"><b>Nollställ allt</b><span>Rensar vad du kan och filtren (★-markerade kort sparas) och visar alla kort från början.</span></button></div></div><span class="mono" id="fcStat"></span></div>
      <div class="card3d"><div class="flash" id="flash" tabindex="0" role="button" aria-label="Vänd kortet">
        <div class="face front"><span class="mono" id="fcTag"></span><div class="q" id="fcQ"></div></div>
        <div class="face back"><span class="mono" id="fcSrc">Svar</span><div class="a" id="fcA"></div></div>
      </div></div>
      <div class="fcprog" id="fcProg" aria-hidden="true"><i></i></div>
      <div class="row">
        <button class="btn ghost" id="fcPrev" type="button">← Förra</button>
        <button class="btn" id="fcKnow" type="button">Jag kan den ✓</button>
        <button class="btn" id="fcAgain" type="button">Öva mer</button>
        <button class="btn ghost" id="fcStar" type="button" aria-pressed="false" title="Markera kortet för att plugga det senare (M)">☆ Markera</button>
        <button class="btn ghost" id="fcNext" type="button">Nästa →</button>
      </div>
      <div class="fc-done" id="fcDone" hidden><p>Varvet klart!</p><button class="btn" id="fcDoneRestart" type="button">↺ Kör igen</button><button class="btn ghost" id="fcDoneLeft" type="button">Kör tills jag kan alla</button></div>
      <p class="mono fc-hint">Tangentbord: mellanslag vänder · ← → bläddrar · M markerar · R börjar om</p>
    </section>`;
    const fl = $("#flash", el);
    FX.start();
    const deck = () => order.filter(i => mode === "all" || (mode === "star" ? isStar(i) : !isKnown(i)));
    const setSeg = v => $$("#deckMode button", el).forEach(o => o.setAttribute("aria-pressed", o.dataset.v === v));
    const mix = () => { for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; } };
    const setCard = (tag, q, a, src) => { $("#fcTag").textContent = tag; $("#fcQ").textContent = q; $("#fcA").textContent = a; $("#fcSrc").textContent = src || "Svar"; };
    function starUI(i) {
      const b = $("#fcStar"); b.disabled = i < 0;
      const on = i >= 0 && isStar(i);
      b.textContent = on ? "★ Markerad" : "☆ Markera"; b.setAttribute("aria-pressed", String(on));
    }
    function render() {
      const d = deck();
      $("#fcStat").textContent = `Kan: ${nKnown()} av ${terms.length} · ★ ${nStar()}`;
      fl.classList.remove("flip"); starUI(-1);
      $("#fcDoneLeft").hidden = mode !== "all" || nKnown() === terms.length;
      if (!d.length && mode === "star") { setCard("", "Inga markerade kort än.", "Tryck på ☆ Markera (eller M) på ett kort du vill plugga senare."); FX.prog(0); FX.finish(false); return; }
      if (!d.length) { setCard("", "Du kan alla kort här!", "Tryck på Börja om för att köra igen, eller gör quizet."); FX.prog(1); FX.finish(true, "Du kan alla kort här!"); return; }
      if (pos < 0) pos = d.length - 1;
      if (pos >= d.length && mode === "until") { round++; pos = 0; mix(); return render(); }
      if (pos >= d.length) {
        pos = d.length;
        setCard("Klart", "Varvet är klart!", `Du har gått igenom alla ${d.length} kort. Kan: ${nKnown()} av ${terms.length}.`);
        FX.prog(1); FX.finish(true, `Varvet klart! Kan: ${nKnown()} av ${terms.length}`); return;
      }
      FX.finish(false);
      const i = d[pos], t = terms[i];
      let tag = `${scope === "all" ? t.ch.short : "Begrepp"} · ${pos + 1}/${d.length}${isKnown(i) ? " · ✓" : ""}`;
      if (mode === "until") tag += ` · Varv ${round} · ${d.length} kvar`;
      setCard(tag, t.t, strip(t.d), "Svar · " + t.src);
      FX.prog((pos + 1) / d.length);
      starUI(i);
    }
    const atEnd = () => pos >= deck().length;
    function toggleStar() {
      const d = deck(); if (!d.length || pos < 0 || pos >= d.length) return;
      const i = d[pos], k = terms[i].id;
      if (S.star[k]) delete S.star[k]; else S.star[k] = true;
      save();
      if (mode === "star" && !S.star[k]) FX.swap(fl, "next", render);
      else { starUI(i); $("#fcStat").textContent = $("#fcStat").textContent.replace(/★ \d+/, "★ " + nStar()); }
    }
    function restart(hard) {
      FX.swap(fl, "restart", () => {
        order = terms.map((_, i) => i); pos = 0; round = 1;
        if (hard) { terms.forEach(t => delete S.known[t.id]); save(); mode = "all"; setSeg("all"); }
        render();
      });
    }
    const next = () => { if (atEnd()) return restart(false); FX.swap(fl, "next", () => { pos++; render(); }); };
    const prev = () => FX.swap(fl, "prev", () => { pos--; render(); });
    const flip = () => { if (!atEnd() && deck().length) fl.classList.toggle("flip"); };
    fl.addEventListener("click", flip);
    keyHandler = e => {
      if (e.target.closest && e.target.closest(".fc-menu")) return;
      if (e.key === " " || (e.key === "Enter" && e.target === fl)) { e.preventDefault(); flip(); }
      else if (e.key === "ArrowRight") { e.preventDefault(); next(); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
      else if (e.key === "m" || e.key === "M") { e.preventDefault(); toggleStar(); }
      else if (e.key === "r" || e.key === "R") { e.preventDefault(); restart(false); }
    };
    $("#fcNext").onclick = next; $("#fcPrev").onclick = prev; $("#fcStar").onclick = toggleStar;
    $("#fcKnow").onclick = () => {
      if (atEnd() || !deck().length) return;
      FX.swap(fl, "know", () => { const d = deck(); S.known[terms[d[pos]].id] = true; save(); if (mode === "all" || mode === "star") pos++; render(); });
    };
    $("#fcAgain").onclick = () => {
      if (atEnd() || !deck().length) return;
      FX.swap(fl, "again", () => { const d = deck(); delete S.known[terms[d[pos]].id]; save(); pos++; render(); });
    };
    $("#fcShuffle").onclick = () => FX.swap(fl, "shuffle", () => { mix(); pos = 0; render(); });
    $$("#deckMode button", el).forEach(b => b.onclick = () => FX.swap(fl, "mode", () => { setSeg(b.dataset.v); mode = b.dataset.v; round = 1; if (mode === "until") mix(); pos = 0; render(); }));
    FX.menu($("#fcRestart"), $("#fcRestartMenu"), r => restart(r === "hard"));
    $("#fcDoneRestart").onclick = () => restart(false);
    $("#fcDoneLeft").onclick = () => FX.swap(fl, "mode", () => { mode = "until"; round = 1; mix(); setSeg("until"); pos = 0; render(); });
    render();
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

  /* ---------- Träna modeller: fyll i, sätt i ordning, snabbquiz ---------- */
  const MODELS = A.models || [];
  const modelsOf = ch => MODELS.filter(m => m.ch === ch);
  S.models = S.models || {};

  function modelsPage(active) {
    const groups = READY.filter(c => modelsOf(c.id).length);
    app.innerHTML = `<div class="page c-alla"><span class="mono">Psykologi · alla kapitel · ${MODELS.length} modeller</span><h1>Träna <em>modellerna</em></h1>
      <p class="lead">Fyll i de tomma modellerna, skriv själv och jämför med facit, sätt stegen i rätt ordning och kör snabbquiz. Så lär du dig Sterns stadier, Marcias statusar, Tuckman och alla andra modeller utantill.</p>
      <div id="mview"></div></div>`;
    modelsView($("#mview"), MODELS, active, id => `#/modeller/${id}`, groups);
  }

  function modelsView(el, list, activeId, hrefFor, groups) {
    const m = list.find(x => x.id === activeId) || list[0];
    const chip = x => {
      const best = S.models[x.id];
      return `<a class="chip c-${x.ch} ${x.id === m.id ? "on" : ""}" href="${hrefFor(x.id)}"><i></i>${esc(x.title.replace(/ \(.*\)$/, ""))}${best === 100 ? " ✓" : ""}</a>`;
    };
    el.innerHTML = (groups
      ? groups.map(c => `<div class="mx-group"><span class="mono">${esc(c.short)}</span><div class="chips">${modelsOf(c.id).map(chip).join("")}</div></div>`).join("")
      : `<div class="chips">${list.map(chip).join("")}</div>`) +
      `<div class="mx c-${m.ch}" id="mx"></div>`;
    renderModel($("#mx", el), m);
    if (activeId) [0, 350].forEach(t => setTimeout(() => { const x = $("#mx", el); if (x) x.scrollIntoView({ block: "start", behavior: t ? "instant" : "smooth" }); }, t));
  }

  function renderModel(box, m) {
    const modes = [["fyll", "Fyll i modellen"], ["skriv", "Skriv själv"], ["beskr", "Para ihop beskrivningar"]]
      .concat(m.ordered ? [["ordning", "Sätt i ordning"]] : []).concat([["quiz", "Snabbquiz"]]);
    let mode = modes.some(x => x[0] === S.mmode) ? S.mmode : "fyll";
    const best = S.models[m.id];
    box.innerHTML = `<div class="mx-head"><span class="mono">Modell · ${esc(m.src)}${best != null ? ` · bästa: ${best} %` : ""}</span><h2>${esc(m.title)}</h2>
        <a class="mono" href="#/k/${m.ch}/las/${m.sec}">Se modellen i kapitlet →</a></div>
      <div class="seg mx-modes">${modes.map(([v, l]) => `<button type="button" data-v="${v}" aria-pressed="${v === mode}">${l}</button>`).join("")}</div>
      <div id="mxBody"></div>`;
    $$(".mx-modes button", box).forEach(b => b.onclick = () => {
      S.mmode = mode = b.dataset.v; save();
      $$(".mx-modes button", box).forEach(o => o.setAttribute("aria-pressed", o === b));
      run();
    });
    const body = $("#mxBody", box);
    const record = pc => { S.models[m.id] = Math.max(S.models[m.id] || 0, pc); save(); };
    const run = () => mode === "ordning" ? orderModel(body, m, record) : mode === "quiz" ? quizModel(body, m, record) : mode === "skriv" ? writeModel(body, m, record) : fillModel(body, m, mode === "beskr", record);
    run();
  }

  // Fyll i: tryck på ett ord och sedan på en tom ruta (eller dra ordet dit)
  function fillModel(body, m, byDesc, record) {
    const n = m.steps.length;
    const slotOrder = byDesc || !m.ordered ? shuffle([...Array(n).keys()]) : [...Array(n).keys()];
    let placed = Array(n).fill(null), sel = null, checked = false, bank = shuffle([...Array(n).keys()]);
    const draw = () => {
      const free = bank.filter(k => !placed.includes(k));
      body.innerHTML = `<p class="muted">${byDesc ? "Läs beskrivningen och placera rätt namn i varje ruta." : m.qa ? "Varje ruta är en fråga. Placera rätt svar i varje ruta." : `Varje ruta visar en ledtråd (${esc(m.hintName.toLowerCase())}). Placera rätt namn i varje ruta.`} Tryck på ett namn och sedan på en ruta, eller dra namnet dit.</p>
        <div class="slots ${m.ordered && !byDesc ? "ordered" : ""}">${slotOrder.map((s, k) => {
          const p = placed[s], st = m.steps[s];
          const cls = checked ? (p === s ? "ok" : "no") : p != null ? "filled" : "";
          return `<div class="slot ${cls}" data-s="${s}">
            ${m.ordered && !byDesc ? `<span class="num">${k + 1}</span>` : ""}
            <span class="mono">${byDesc ? esc(m.hintName) + " · ?" : esc(st.hint) + (m.qa ? "?" : "")}</span>
            ${byDesc ? `<p class="sd">${esc(st.desc)}</p>` : ""}
            <button type="button" class="drop" data-s="${s}" aria-label="Ruta: ${esc(byDesc ? st.desc : st.hint)}">${p != null ? esc(m.steps[p].label) : sel != null ? "Placera här" : "Tom ruta"}</button>
            ${checked && p !== s ? `<span class="fix">Rätt: <b>${esc(st.label)}</b></span>` : ""}
          </div>`;
        }).join("")}</div>
        <div class="bank" aria-label="Ordbank">${free.map(k => `<button type="button" class="word ${sel === k ? "sel" : ""}" draggable="true" data-k="${k}">${esc(m.steps[k].label)}</button>`).join("") || (checked ? "" : `<span class="muted">Alla namn är placerade. Tryck Kontrollera.</span>`)}</div>
        <div class="row">${checked
          ? `<button class="btn" type="button" id="mxAgain">↺ Försök igen</button>`
          : `<button class="btn" type="button" id="mxCheck" ${placed.includes(null) ? "disabled" : ""}>Kontrollera</button><button class="btn ghost" type="button" id="mxShow">Visa svar</button><button class="btn ghost" type="button" id="mxReset">Töm</button>`}
          <span class="score" id="mxScore"></span></div>`;
      $$(".word", body).forEach(w => {
        w.onclick = () => { sel = sel === +w.dataset.k ? null : +w.dataset.k; draw(); };
        w.ondragstart = e => { e.dataTransfer.setData("text/plain", w.dataset.k); sel = +w.dataset.k; };
      });
      $$(".drop", body).forEach(d => {
        const s = +d.dataset.s;
        const place = k => { if (checked) return; const old = placed.indexOf(k); if (old > -1) placed[old] = null; placed[s] = k; sel = null; draw(); };
        d.onclick = () => { if (checked) return; if (sel != null) place(sel); else if (placed[s] != null) { placed[s] = null; draw(); } };
        d.ondragover = e => { e.preventDefault(); d.classList.add("over"); };
        d.ondragleave = () => d.classList.remove("over");
        d.ondrop = e => { e.preventDefault(); place(+e.dataTransfer.getData("text/plain")); };
      });
      if ($("#mxCheck", body)) {
        $("#mxCheck", body).onclick = () => {
          checked = true; const right = placed.filter((p, s) => p === s).length, pc = Math.round(100 * right / n);
          record(pc); draw();
          $("#mxScore", body).textContent = `${right} av ${n} rätt${right === n ? " 🎉" : ""}`;
        };
        $("#mxShow", body).onclick = () => { placed = [...Array(n).keys()]; checked = true; draw(); $("#mxScore", body).textContent = "Facit visas"; };
        $("#mxReset", body).onclick = () => { placed = Array(n).fill(null); sel = null; draw(); };
      } else $("#mxAgain", body).onclick = () => fillModel(body, m, byDesc, record);
    };
    draw();
  }

  // Skriv själv: skriv namnet (och gärna vad som händer) i tomma rutor och jämför med facit
  const STOP = new Set(["det", "den", "och", "med", "sig", "mot", "andras", "själv", "självet", "fasen", "fas", "ledarstil", "ledare", "identitet", "anknytning", "perspektiv", "vid", "om", "en", "ett", "att", "till"]);
  const words = t => t.toLowerCase().replace(/[^a-zåäöéü0-9 ]+/g, " ").split(/\s+/).filter(Boolean);
  const lev = (a, b) => {
    const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
    for (let j = 1; j <= b.length; j++) d[0][j] = j;
    for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[a.length][b.length];
  };
  // Svaret jämförs med alla steg i modellen. Det räknas som rätt om det passar bäst ihop med
  // just det här steget och minst hälften av stegets viktiga ord finns med (små stavfel är okej).
  const sigWords = t => words(t).filter(w => !STOP.has(w) && w.length >= 3);
  // 0 = exakt, 0.5 = del av sammansatt ord eller samma början, annars antal bokstäver som skiljer
  const near = (w, k) => w === k ? 0 : (w.length >= 5 && (k.startsWith(w) || k.endsWith(w) || (k.startsWith(w.slice(0, 5)) && Math.abs(w.length - k.length) <= 3))) ? .5 : lev(w, k);
  const tol = k => k.length > 7 ? 2 : 1;
  function match(mine, label, all) {
    const keys = sigWords(label).length ? sigWords(label) : words(label);
    const dist = k => Math.min(...mine.map(w => near(w, k)));
    let score = keys.reduce((sum, k) => sum + (dist(k) === 0 ? 1 : dist(k) === .5 ? .9 : dist(k) <= tol(k) ? .8 : 0), 0) / keys.length;
    const main = [...keys].sort((x, y) => y.length - x.length)[0];
    const unique = !all.some(l => l !== label && sigWords(l).some(k2 => near(main, k2) <= tol(main)));
    if (unique && dist(main) <= tol(main)) score = Math.max(score, dist(main) ? .65 : .7);
    return { score, typo: keys.some(k => dist(k) >= 1 && dist(k) <= tol(k)) };
  }
  function gradeName(answer, label, all) {
    const mine = words(answer).filter(w => !STOP.has(w));
    if (!words(answer).length) return "tom";
    if (!mine.length) return "fel";
    all = all || [label];
    const same = l => { const x = sigWords(l), y = sigWords(label); return x.length === y.length && x.every((w, i) => w.startsWith(y[i]) || y[i].startsWith(w)); };
    const me = match(mine, label, all);
    const rival = Math.max(0, ...all.filter(l => !same(l)).map(l => match(mine, l, all).score));
    if (me.score < .5 || rival > me.score) return "fel";
    return me.typo && me.score < 1 ? "nara" : "ok";
  }

  // Bästa betyget av facit och eventuella godkända alternativ (alt) för steget
  const RANK = { ok: 3, nara: 2, fel: 1, tom: 0 };
  const gradeStep = (answer, st, labels) => [st.label, ...(st.alt || [])]
    .map(l => gradeName(answer, l, labels.map(x => x === st.label ? l : x)))
    .sort((x, y) => RANK[y] - RANK[x])[0];

  function writeModel(body, m, record) {
    const n = m.steps.length;
    const order = m.ordered ? [...Array(n).keys()] : shuffle([...Array(n).keys()]);
    const ans = {}, expl = {}, own = {}, labels = m.steps.map(x => x.label);
    let compared = false;
    const draw = () => {
      body.innerHTML = `<p class="muted">Skriv namnet på varje steg i den tomma rutan. Vill du träna mer kan du också skriva vad som händer i steget. Tryck sedan <b>Jämför</b> och se ditt svar bredvid facit.</p>
        <div class="wslots">${order.map((s, k) => {
          const st = m.steps[s], g = compared ? (own[s] ? "ok" : gradeStep(ans[s] || "", st, labels)) : "";
          return `<div class="wslot ${g}" data-s="${s}">
            <span class="mono">${m.ordered ? `${k + 1} · ` : ""}${esc(st.hint)}${m.qa ? "?" : ""}</span>
            ${compared ? `
              <div class="wcmp"><div><small class="mono">Ditt svar</small><p>${ans[s] ? esc(ans[s]) : "<i class='muted'>(tomt)</i>"}</p>${expl[s] ? `<p class="muted">${esc(expl[s])}</p>` : ""}</div>
              <div><small class="mono">Facit</small><p><b>${esc(st.label)}</b></p><p class="muted">${esc(st.desc)}</p></div></div>
              <div class="wverdict">${g === "ok" ? "✓ Rätt" : g === "nara" ? "✓ Rätt, men kolla stavningen" : g === "tom" ? "Inget svar" : "✗ Inte rätt"}
                ${g === "fel" || g === "tom" ? `<button type="button" class="mini" data-own="${s}">Jag hade rätt</button>` : own[s] ? `<button type="button" class="mini" data-own="${s}">Ångra</button>` : ""}</div>`
            : `<input class="win" type="text" data-s="${s}" value="${esc(ans[s] || "")}" placeholder="${m.qa ? "Skriv svaret …" : "Skriv namnet …"}" autocomplete="off" autocapitalize="sentences" aria-label="Namn för ${esc(st.hint)}">
              <textarea class="wex" data-s="${s}" rows="2" placeholder="Vad händer här? (valfritt)" aria-label="Förklaring för ${esc(st.hint)}">${esc(expl[s] || "")}</textarea>`}
          </div>`;
        }).join("")}</div>
        <div class="row">${compared
          ? `<button class="btn" type="button" id="mxAgain">↺ Skriv igen</button><button class="btn ghost" type="button" id="mxEdit">Ändra mina svar</button>`
          : `<button class="btn" type="button" id="mxCmp">Jämför med facit</button>`}<span class="score" id="mxScore"></span></div>`;
      if (compared) {
        const right = order.filter(s => own[s] || ["ok", "nara"].includes(gradeStep(ans[s] || "", m.steps[s], labels))).length;
        $("#mxScore", body).textContent = `${right} av ${n} rätt${right === n ? " 🎉" : ""}`;
        record(Math.round(100 * right / n));
        $$("[data-own]", body).forEach(b => b.onclick = () => { const s = +b.dataset.own; own[s] = !own[s]; draw(); });
        $("#mxAgain", body).onclick = () => writeModel(body, m, record);
        $("#mxEdit", body).onclick = () => { compared = false; draw(); };
      } else {
        const ins = $$(".win", body);
        ins.forEach((inp, k) => {
          inp.oninput = () => { ans[+inp.dataset.s] = inp.value; };
          inp.onkeydown = e => { if (e.key === "Enter") { e.preventDefault(); (ins[k + 1] || $("#mxCmp", body)).focus(); } };
        });
        $$(".wex", body).forEach(t => t.oninput = () => { expl[+t.dataset.s] = t.value; });
        $("#mxCmp", body).onclick = () => { compared = true; draw(); };
      }
    };
    draw();
  }

  // Sätt i ordning med pilar
  function orderModel(body, m, record) {
    const n = m.steps.length;
    let cur = shuffle([...Array(n).keys()]);
    if (cur.every((v, i) => v === i)) cur.reverse();
    let checked = false;
    const draw = () => {
      body.innerHTML = `<p class="muted">Flytta stegen med pilarna så att de kommer i rätt ordning, från början till slut.</p>
        <ol class="order-list">${cur.map((s, k) => `<li class="${checked ? (s === k ? "right" : "wrong") : ""}"><b>${k + 1}.</b><span>${esc(m.steps[s].label)}${checked ? ` <small class="muted">(${esc(m.steps[s].hint)})</small>` : ""}</span>
          ${checked ? "" : `<button class="mini" data-u="${k}" aria-label="Flytta upp" ${k ? "" : "disabled"}>↑</button><button class="mini" data-d="${k}" aria-label="Flytta ner" ${k < n - 1 ? "" : "disabled"}>↓</button>`}</li>`).join("")}</ol>
        <div class="row">${checked ? `<button class="btn" type="button" id="mxAgain">↺ Försök igen</button>` : `<button class="btn" type="button" id="mxCheck">Kontrollera</button>`}<span class="score" id="mxScore"></span></div>
        ${checked && !cur.every((v, i) => v === i) ? `<p class="muted">Rätt ordning: ${m.steps.map((s, i) => `${i + 1}. ${esc(s.label)}`).join(" · ")}</p>` : ""}`;
      $$("[data-u]", body).forEach(b => b.onclick = () => { const k = +b.dataset.u; [cur[k - 1], cur[k]] = [cur[k], cur[k - 1]]; draw(); });
      $$("[data-d]", body).forEach(b => b.onclick = () => { const k = +b.dataset.d; [cur[k + 1], cur[k]] = [cur[k], cur[k + 1]]; draw(); });
      if ($("#mxCheck", body)) $("#mxCheck", body).onclick = () => {
        checked = true; const right = cur.filter((v, i) => v === i).length; record(Math.round(100 * right / n)); draw();
        $("#mxScore", body).textContent = `${right} av ${n} på rätt plats${right === n ? " 🎉" : ""}`;
      };
      else $("#mxAgain", body).onclick = () => orderModel(body, m, record);
    };
    draw();
  }

  // Snabbquiz: beskrivning eller ledtråd → vilket steg?
  function quizModel(body, m, record) {
    const n = m.steps.length;
    const qs = shuffle([...Array(n).keys()].flatMap(s => [{ s, by: "desc" }, { s, by: "hint" }])).slice(0, Math.min(8, 2 * n));
    let i = 0, score = 0;
    const ask = () => {
      if (i >= qs.length) {
        const pc = Math.round(100 * score / qs.length); record(pc);
        body.innerHTML = `<div class="fc-done"><p>${score} av ${qs.length} rätt${score === qs.length ? " 🎉" : ""}</p><button class="btn" type="button" id="mxAgain">↺ Kör igen</button></div>`;
        $("#mxAgain", body).onclick = () => quizModel(body, m, record);
        return;
      }
      const q = qs[i], st = m.steps[q.s];
      const opts = shuffle([q.s, ...shuffle([...Array(n).keys()].filter(k => k !== q.s)).slice(0, 3)]);
      body.innerHTML = `<div class="qq"><div class="fc-meta"><span class="mono">Fråga ${i + 1} av ${qs.length}</span><span class="score">${score} rätt</span></div>
        <div class="bar" style="margin:8px 0 14px"><i style="width:${100 * i / qs.length}%"></i></div>
        <p class="q">${q.by === "desc" ? `${m.qa ? "Vilket svar passar beskrivningen?" : "Vilket steg i modellen beskrivs?"}<br><span class="muted">"${esc(st.desc)}"</span>` : m.qa ? `${esc(st.hint)}?` : `${esc(m.hintName)}: <b>${esc(st.hint)}</b>. Vad heter steget?`}</p>
        <div class="opts">${opts.map(k => `<button class="opt" data-k="${k}">${esc(m.steps[k].label)}</button>`).join("")}</div><div id="mxFb"></div></div>`;
      $$(".opt", body).forEach(b => b.onclick = () => {
        const ok = +b.dataset.k === q.s; if (ok) score++;
        $$(".opt", body).forEach(x => { x.disabled = true; if (+x.dataset.k === q.s) x.classList.add("right"); });
        if (!ok) b.classList.add("wrong");
        $("#mxFb", body).innerHTML = `<div class="fb ${ok ? "ok" : "no"}"><b>${ok ? "Rätt!" : "Inte riktigt."}</b>${esc(st.label)} (${esc(st.hint)}): ${esc(st.desc)}</div>
          <div class="row"><button class="btn" id="mxNext">${i + 1 < qs.length ? "Nästa →" : "Se resultat"}</button></div>`;
        $("#mxNext", body).onclick = () => { i++; ask(); };
      });
    };
    ask();
  }

  /* ---------- Studier: en röd tråd från teori till studie till slutsats ---------- */
  function studiesPage(filter) {
    const groups = (A.thread || []).filter(g => chap(g.ch) && chap(g.ch).ready);
    const shown = groups.filter(g => !filter || g.ch === filter);
    const step = (st, g) => {
      const link = st.link ? `<div class="t-link"><span>${esc(st.link)}</span>${st.rel ? `<b class="rel">${esc(st.rel)}</b>` : ""}</div>` : "";
      if (st.study) {
        const s = A.studies[st.study];
        return `${link}<div class="t-node t-study">${studyCard(s)}<a class="mono" href="#/k/${s.ch}/las/${s.sec}">Läs i kapitlet →</a></div>`;
      }
      return `${link}<div class="t-node t-${st.type === "slutsats" ? "end" : st.type === "händelse" ? "event" : "theory"}">
        <span class="mono">${st.type === "slutsats" ? "Slutsats" : st.type === "händelse" ? "Händelse" : "Teori"} · ${esc(st.src)}</span>
        ${st.title ? `<b>${esc(st.title)}</b>` : ""}<p>${st.text}</p></div>`;
    };
    app.innerHTML = `<div class="page c-ledarskap"><span class="mono">Psykologi · alla kapitel · ${Object.keys(A.studies).length} studier</span><h1>Studiernas <em>röda tråd</em></h1>
      <p class="lead">Varje studie svarar på en fråga om en teori. Följ den röda linjen: först teorin, sedan studierna som stödjer den, säger emot den eller bygger vidare, och sist slutsatsen. Så kan du också bygga upp ett provsvar.</p>
      <div class="chips"><a class="chip ${!filter ? "on" : ""}" href="#/studier">Hela tråden</a>${groups.map(g => `<a class="chip c-${g.ch} ${filter === g.ch ? "on" : ""}" href="#/studier/${g.ch}"><i></i>${esc(chap(g.ch).short)}</a>`).join("")}</div>
      ${shown.map((g, i) => `<section class="thread c-${g.ch}">
        <div class="t-q"><span class="mono">Fråga ${groups.indexOf(g) + 1} · ${esc(chap(g.ch).short)}</span><h2>${esc(g.q)}</h2></div>
        <div class="t-line">${g.steps.map(st => step(st, g)).join("")}</div>
      </section>${!filter && i < shown.length - 1 ? `<div class="t-bridge">↓ <span>Nästa fråga</span></div>` : ""}`).join("")}
      <p class="note">Ordningen och övergångarna ("stödjer", "säger emot", "bygger vidare") är min sammanställning av hur boken kopplar ihop teorierna och studierna. Fakta i varje kort kommer från boken.</p></div>`;
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
