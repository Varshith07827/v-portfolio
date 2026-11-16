/* Home page: dial, loader, hero scene, scroll choreography, live stats. */
(function () {
  const { $, $$, RM, hasG, esc } = window.SV;
  const SV = window.SV;
  const P = window.PROJECTS || [];
  const delay = (ms) => new Promise((r) => setTimeout(r, ms));
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";

  /* ───────────── work list + hover previews ───────────── */
  function renderWork() {
    const list = $("#workList"), peek = $("#peek");
    list.innerHTML = P.map((p, i) => `
      <li class="work-item" data-i="${i}">
        <a class="work-row" href="case.html#${p.id}" aria-label="${esc(p.name)} — case study">
          <span class="w-num">N° ${p.num}</span>
          <span class="w-title">${esc(p.name)}</span>
          <span class="w-info"><span class="w-sub">${esc(p.title)}</span><span class="w-tags">${esc(p.tags)}</span></span>
          <span class="w-arrow" aria-hidden="true">↗</span>
          <span class="w-thumb"><img src="${p.gallery[0].src}" alt="" loading="lazy"></span>
        </a>
      </li>`).join("");
    peek.innerHTML = P.map((p) => `<div class="peek-card"><img src="${p.gallery[0].src}" alt=""></div>`).join("");
  }

  function setupPeek() {
    if (!hasG || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const peek = $("#peek"), cards = $$(".peek-card", peek), list = $("#workList");
    const xTo = gsap.quickTo(peek, "x", { duration: 0.7, ease: "power3" });
    const yTo = gsap.quickTo(peek, "y", { duration: 0.7, ease: "power3" });
    const rTo = gsap.quickTo(peek, "rotation", { duration: 0.6, ease: "power3" });
    let lastX = 0;
    list.addEventListener("mouseenter", (e) => gsap.set(peek, { x: e.clientX + 36, y: e.clientY - peek.offsetHeight / 2 }));
    list.addEventListener("mousemove", (e) => {
      xTo(e.clientX + 36); yTo(e.clientY - peek.offsetHeight / 2);
      rTo(gsap.utils.clamp(-8, 8, (e.clientX - lastX) * 0.3)); lastX = e.clientX;
    }, { passive: true });
    $$(".work-item", list).forEach((li, i) => {
      li.addEventListener("mouseenter", () => {
        li.classList.add("on"); list.classList.add("hovering");
        cards.forEach((c, j) => gsap.to(c, { opacity: j === i ? 1 : 0, scale: j === i ? 1 : 1.06, duration: 0.6, ease: "power3.out", overwrite: true }));
        gsap.to(peek, { opacity: 1, duration: 0.4, overwrite: "auto" });
      });
      li.addEventListener("mouseleave", () => li.classList.remove("on"));
    });
    list.addEventListener("mouseleave", () => { list.classList.remove("hovering"); gsap.to(peek, { opacity: 0, duration: 0.4, overwrite: "auto" }); });
  }

  /* ───────────── the watch dial ───────────── */
  const hands = {};
  function buildDial() {
    const svg = $("#dial");
    const NS = "http://www.w3.org/2000/svg";
    const el = (n, a = {}, p) => { const e = document.createElementNS(NS, n); for (const k in a) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; };
    svg.setAttribute("viewBox", "-300 -300 600 600");
    const defs = el("defs", {}, svg);
    const lg = (id, stops, a = {}) => { const g = el("linearGradient", Object.assign({ id, x1: 0, y1: 0, x2: 1, y2: 1 }, a), defs); stops.forEach(([o, c, op]) => el("stop", { offset: o, "stop-color": c, "stop-opacity": op == null ? 1 : op }, g)); };
    lg("gBrass", [[0, "#F6E6B4"], [0.25, "#B8913F"], [0.5, "#7A5A22"], [0.75, "#E3C987"], [1, "#8C6A2A"]]);
    lg("gShine", [[0, "#fff", 0.34], [0.55, "#fff", 0]], { x2: 0.55, y2: 1 });
    const rg = el("radialGradient", { id: "gFace", cx: 0.42, cy: 0.36, r: 0.85 }, defs);
    [[0, "#F9F2E0"], [0.65, "#ECDFC2"], [1, "#D4C29B"]].forEach(([o, c]) => el("stop", { offset: o, "stop-color": c }, rg));
    const pat = el("pattern", { id: "clou", width: 12, height: 12, patternUnits: "userSpaceOnUse", patternTransform: "rotate(45)" }, defs);
    el("path", { d: "M0 0H12M0 0V12", stroke: "rgba(110,80,30,.34)", "stroke-width": 0.8, fill: "none" }, pat);
    const f = el("filter", { id: "hs", x: "-30%", y: "-30%", width: "160%", height: "160%" }, defs);
    el("feDropShadow", { dx: 2, dy: 5, stdDeviation: 3.5, "flood-color": "#1D140F", "flood-opacity": 0.38 }, f);
    el("path", { id: "bezPath", d: "M0,-277 a277,277 0 1,1 -0.01,0" }, defs);

    // bezel (rotates with scroll)
    const bez = el("g", { id: "dialBezel" }, svg);
    el("circle", { r: 298, fill: "url(#gBrass)" }, bez);
    el("circle", { r: 293, fill: "none", stroke: "#4A3512", "stroke-opacity": 0.45, "stroke-width": 8, "stroke-dasharray": "1.4 3.2" }, bez);
    el("circle", { r: 288, fill: "none", stroke: "#5C4318", "stroke-opacity": 0.5 }, bez);
    const bt = el("text", { "font-size": 11.5, fill: "#2E1F0A", "letter-spacing": 3, "font-weight": 500 }, bez);
    const tp = el("textPath", { href: "#bezPath", textLength: 1735, lengthAdjust: "spacing" }, bt);
    tp.textContent = "VENKATA SAI VARSHITH · AI · SYSTEMS · AUTOMATION · VISAKHAPATNAM · PARIS · MMXXVI · EN GARDE · ";
    el("circle", { r: 268, fill: "none", stroke: "#4A3512", "stroke-opacity": 0.6 }, bez);

    // face
    const face = el("g", {}, svg);
    el("circle", { r: 262, fill: "url(#gFace)" }, face);
    el("circle", { r: 190, fill: "url(#clou)" }, face);
    el("circle", { r: 190, fill: "none", stroke: "#8C6A2A", "stroke-opacity": 0.7 }, face);
    el("circle", { r: 262, fill: "none", stroke: "#5C4318", "stroke-opacity": 0.5 }, face);
    for (let i = 0; i < 60; i++) {
      const a = (i * 6 * Math.PI) / 180, big = i % 5 === 0, r1 = 258, r2 = big ? 243 : 248;
      el("line", { x1: Math.sin(a) * r1, y1: -Math.cos(a) * r1, x2: Math.sin(a) * r2, y2: -Math.cos(a) * r2, stroke: "#1D140F", "stroke-width": big ? 2.4 : 0.9 }, face);
    }
    ["XII", "I", "II", null, "IIII", "V", "VI", "VII", "VIII", "IX", "X", "XI"].forEach((n, i) => {
      if (!n) return;
      const a = (i * 30 * Math.PI) / 180, r = 218;
      const t = el("text", { x: Math.sin(a) * r, y: -Math.cos(a) * r, "text-anchor": "middle", "dominant-baseline": "central", "font-size": n === "IIII" ? 27 : 33, "font-weight": 500, fill: "#1D140F" }, face);
      t.textContent = n;
    });
    const brand = el("text", { x: 0, y: -128, "text-anchor": "middle", "font-size": 16, "letter-spacing": 7, fill: "#1D140F", "font-weight": 500 }, face); brand.textContent = "VARSHITH";
    const sub = el("text", { x: 0, y: -106, "text-anchor": "middle", "font-size": 8.5, "letter-spacing": 4.5, fill: "#6A1B25", "font-style": "italic" }, face); sub.textContent = "AUTOMATIQUE";
    // date window at III
    el("rect", { x: 181, y: -17, width: 50, height: 34, fill: "#F6EEDA", stroke: "#1D140F", "stroke-width": 1.2 }, face);
    hands.date = el("text", { x: 206, y: 1, "text-anchor": "middle", "dominant-baseline": "central", "font-size": 23, fill: "#1D140F", "font-weight": 500 }, face);
    // Paris sub-dial at VI
    const sd = el("g", { transform: "translate(0 108)" }, face);
    el("circle", { r: 52, fill: "#F0E6CC", stroke: "#1D140F", "stroke-width": 0.9 }, sd);
    el("circle", { r: 46, fill: "none", stroke: "#8C6A2A", "stroke-opacity": 0.6 }, sd);
    for (let i = 0; i < 12; i++) { const a = (i * 30 * Math.PI) / 180; el("line", { x1: Math.sin(a) * 46, y1: -Math.cos(a) * 46, x2: Math.sin(a) * 40, y2: -Math.cos(a) * 40, stroke: "#1D140F", "stroke-width": i % 3 === 0 ? 1.8 : 0.8 }, sd); }
    const pl = el("text", { x: 0, y: -22, "text-anchor": "middle", "font-size": 8, "letter-spacing": 3.2, fill: "#6A1B25", "font-weight": 500 }, sd); pl.textContent = "PARIS";
    hands.pH = el("line", { x1: 0, y1: 4, x2: 0, y2: -24, stroke: "#1D140F", "stroke-width": 2.6, "stroke-linecap": "round" }, sd);
    hands.pM = el("line", { x1: 0, y1: 5, x2: 0, y2: -37, stroke: "#1D140F", "stroke-width": 1.5, "stroke-linecap": "round" }, sd);
    el("circle", { r: 2.6, fill: "#6A1B25" }, sd);

    // hands
    const hg = el("g", { filter: "url(#hs)" }, svg);
    hands.h = el("path", { d: "M0,18 L-10,2 L0,-122 L10,2 Z", fill: "#1D140F", stroke: "#B8913F", "stroke-width": 0.8 }, hg);
    hands.m = el("path", { d: "M0,22 L-6.5,2 L0,-196 L6.5,2 Z", fill: "#1D140F", stroke: "#B8913F", "stroke-width": 0.8 }, hg);
    hands.s = el("g", {}, hg);
    el("line", { x1: 0, y1: 44, x2: 0, y2: -232, stroke: "#6A1B25", "stroke-width": 1.7 }, hands.s);
    el("circle", { cx: 0, cy: 34, r: 7, fill: "#6A1B25" }, hands.s);
    el("circle", { r: 11, fill: "url(#gBrass)", stroke: "#4A3512", "stroke-width": 0.8 }, hg);
    el("circle", { r: 3.2, fill: "#1D140F" }, hg);
    // crystal glare
    const g = el("circle", { r: 262, fill: "url(#gShine)", "pointer-events": "none" }, svg);
    g.setAttribute("opacity", "0.9");

    const parisFmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Paris", hour: "numeric", minute: "numeric", hour12: false });
    let pSec = -1, pH = 0, pM = 0, lastDay = -1, running = true, visible = true;
    const frame = () => {
      if (running && visible && !document.hidden) {
        const now = Date.now(), ist = (now + 19800000) % 86400000;
        const h = ist / 3600000, m = (ist / 60000) % 60, s = (ist / 1000) % 60;
        hands.h.setAttribute("transform", `rotate(${(h % 12) * 30})`);
        hands.m.setAttribute("transform", `rotate(${m * 6})`);
        hands.s.setAttribute("transform", `rotate(${s * 6})`);
        const sec = Math.floor(now / 1000);
        if (sec !== pSec) {
          pSec = sec;
          const parts = parisFmt.formatToParts(now); pH = +parts.find((x) => x.type === "hour").value; pM = +parts.find((x) => x.type === "minute").value;
          hands.pH.setAttribute("transform", `rotate(${(pH % 12) * 30 + pM * 0.5})`); hands.pM.setAttribute("transform", `rotate(${pM * 6})`);
          const day = new Date(now + 19800000).getUTCDate(); if (day !== lastDay) { lastDay = day; hands.date.textContent = day; }
        }
      }
      requestAnimationFrame(frame);
    };
    frame();
    if ("IntersectionObserver" in window) new IntersectionObserver((e) => (visible = e[0].isIntersecting), { threshold: 0 }).observe($(".hero"));
  }

  /* ───────────── loader & intro ───────────── */
  function runLoader(show, built) {
    const loader = $("#loader");
    if (!loader) return built;
    if (!show) { loader.remove(); return built; }
    const ticks = $(".loader .ticks");
    for (let i = 0; i < 60; i++) {
      const a = (i * 6 * Math.PI) / 180, r1 = 100 - 0.5, r2 = i % 5 === 0 ? 86 : 91;
      const l = document.createElementNS("http://www.w3.org/2000/svg", "line");
      l.setAttribute("x1", 100 + Math.sin(a) * 82); l.setAttribute("y1", 100 - Math.cos(a) * 82);
      l.setAttribute("x2", 100 + Math.sin(a) * (i % 5 === 0 ? 72 : 77)); l.setAttribute("y2", 100 - Math.cos(a) * (i % 5 === 0 ? 72 : 77));
      l.setAttribute("opacity", 0); ticks.appendChild(l);
    }
    const o = { v: 0 }, count = $("#lc");
    const anim = new Promise((res) => {
      const tl = gsap.timeline({ onComplete: res });
      tl.to(o, { v: 100, duration: 2.3, ease: "power2.inOut", onUpdate: () => (count.textContent = Math.round(o.v)) }, 0)
        .to(".loader .draw", { strokeDashoffset: 0, duration: 2.3, ease: "power2.inOut" }, 0)
        .to(".loader .ticks line", { opacity: 0.8, duration: 0.05, stagger: 2.2 / 60 }, 0.1)
        .from(".loader-mono", { opacity: 0, y: 22, duration: 1.2, ease: "power3.out" }, 0.2)
        .from(".loader-tag", { opacity: 0, y: 10, duration: 1, ease: "power2.out" }, 0.5);
    });
    return Promise.all([anim, built]).then(() => new Promise((res) => {
      const tl = gsap.timeline();
      tl.to(".loader-inner, .loader-tag, .loader-count", { opacity: 0, y: -24, duration: 0.55, ease: "power2.in", stagger: 0.04 })
        .to(loader, { clipPath: "inset(0% 0% 100% 0%)", duration: 1.25, ease: "power4.inOut", onComplete: () => loader.remove() }, "-=0.1")
        .add(res, "-=0.75");
    }));
  }

  function intro() {
    if (RM) return;
    gsap.from(".hero-title .inner", { yPercent: 115, duration: 1.7, ease: "power4.out", stagger: 0.14 });
    gsap.from(".dial-in", { scale: 0.78, rotate: -16, opacity: 0, duration: 2.2, ease: "power3.out" });
    gsap.from(".hero .rv", { opacity: 0, y: 18, duration: 1.2, stagger: 0.12, delay: 0.7, ease: "power2.out" });
  }

  /* ───────────── scroll choreography ───────────── */
  function setupScroll() {
    SV.watchDark(); SV.progress();
    if (RM) { drawGauges(); return; }

    // hero: pin, then the dial opens into the espresso credo section like an iris
    const stage = $(".hero-stage"), dialWrap = $(".hero-dial"), iris = $(".iris");
    const ir = { r: 0 }; let cx = 0, cy = 0, maxR = 0;
    const calc = () => { cx = dialWrap.offsetLeft + dialWrap.offsetWidth / 2; cy = dialWrap.offsetTop + dialWrap.offsetHeight / 2; maxR = Math.hypot(stage.offsetWidth, stage.offsetHeight) + 40; };
    const paint = () => { iris.style.clipPath = `circle(${ir.r}px at ${cx}px ${cy}px)`; };
    calc(); paint();
    ScrollTrigger.addEventListener("refreshInit", () => { calc(); paint(); });
    const hero = gsap.timeline({
      scrollTrigger: { trigger: ".hero", start: "top top", end: "+=230%", pin: ".hero-stage", scrub: 0.7, anticipatePin: 1, invalidateOnRefresh: true },
      defaults: { ease: "none" },
      onUpdate() { dialWrap.style.visibility = hero.progress() > 0.985 ? 'hidden' : 'visible'; const dark = hero.progress() > 0.72; dark ? SV.navDark.add("hero") : SV.navDark.delete("hero"); SV.syncNav(); },
    });
    hero.to(".hero-title", { xPercent: -6, opacity: 0, duration: 0.34 }, 0)
      .to(".hero-meta, .hero-dek, .hero-cue", { opacity: 0, y: -26, duration: 0.24 }, 0)
      .to(dialWrap, { scale: 1.55, duration: 1 }, 0)
      .to("#dialBezel", { rotation: 80, svgOrigin: "0 0", duration: 1 }, 0)
      .to(ir, { r: () => maxR, duration: 0.72, ease: "power2.in", onUpdate: paint }, 0.3);

    // credo: words light up as you read
    const credo = $("#credo");
    const cw = SV.split(credo, false);
    gsap.set(cw, { opacity: 0.14 });
    gsap.to(cw, { opacity: 1, stagger: 0.12, ease: "none", scrollTrigger: { trigger: credo, start: "top 82%", end: "bottom 48%", scrub: 0.4 } });

    marquee($("#mq"));

    $$("[data-split]").forEach((el) => {
      const words = SV.split(el, true);
      gsap.from(words, { yPercent: 118, duration: 1.3, stagger: 0.07, ease: "power4.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } });
    });
    $$("[data-fade]").forEach((el) => gsap.from(el, { y: 50, opacity: 0, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } }));
    $$("[data-stagger]").forEach((l) => gsap.from(l.children, { y: 54, opacity: 0, duration: 1.1, stagger: 0.09, ease: "power3.out", scrollTrigger: { trigger: l, start: "top 86%", once: true } }));
    $$(".work-item").forEach((li) => gsap.from(li, { y: 70, opacity: 0, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: li, start: "top 92%", once: true } }));
    $$(".job").forEach((j) => gsap.from($(".job-org", j), { yPercent: 40, opacity: 0, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: j, start: "top 80%", once: true } }));

    $$("[data-count]").forEach((el) => {
      const end = +el.dataset.count, o = { v: 0 }; el.textContent = "0";
      ScrollTrigger.create({ trigger: el, start: "top 90%", once: true, onEnter: () => gsap.to(o, { v: end, duration: 2.2, ease: "power2.out", onUpdate: () => (el.textContent = Math.round(o.v)) }) });
    });

    ScrollTrigger.create({ trigger: "#gauges", start: "top 85%", once: true, onEnter: () => { gaugesIn = true; drawGauges(); } });

    const merci = $("#merci"), txt = merci.textContent;
    merci.innerHTML = [...txt].map((c) => `<span class="ch">${c}</span>`).join("");
    gsap.from("#merci .ch", { yPercent: 105, duration: 1.5, stagger: 0.08, ease: "power4.out", scrollTrigger: { trigger: merci, start: "top 92%", once: true } });

    // gentle depth on the crest
    gsap.fromTo(".crest svg", { rotate: -14 }, { rotate: 14, ease: "none", scrollTrigger: { trigger: ".portrait", start: "top bottom", end: "bottom top", scrub: 0.6 } });
  }

  function marquee(root) {
    if (!root) return;
    const track = $(".mq-track", root), group = $(".mq-group", track);
    while (track.scrollWidth < innerWidth * 2.6) track.appendChild(group.cloneNode(true));
    const gw = () => group.offsetWidth;
    let x = 0, skew = 0;
    gsap.ticker.add((t, dt) => {
      const v = SV.lenis ? SV.lenis.velocity : 0;
      x -= (0.055 + Math.min(Math.abs(v), 45) * 0.011) * dt;
      if (x <= -gw()) x += gw();
      skew += (gsap.utils.clamp(-6, 6, -v * 0.12) - skew) * 0.1;
      track.style.transform = `translate3d(${x}px,0,0) skewX(${skew}deg)`;
    });
  }

  /* ───────────── gauges & live stats ───────────── */
  let gaugesIn = false;
  function drawGauges() {
    $$(".gauge .arc").forEach((a) => {
      const to = 100 - (+a.dataset.pct || 0);
      if (hasG && !RM) gsap.to(a, { strokeDashoffset: to, duration: 2, ease: "power3.out" });
      else a.style.strokeDashoffset = to;
    });
  }
  const fmtDate = (iso) => {
    if (!iso) return "";
    const d = new Date(iso + "T00:00:00Z"); if (isNaN(d)) return "";
    return String(d.getUTCDate()).padStart(2, "0") + " " + ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][d.getUTCMonth()] + " " + d.getUTCFullYear();
  };
  function stats() {
    const setText = (id, v) => { const e = document.getElementById(id); if (e && v != null) e.textContent = v; };
    fetch("assets/stats.json", { cache: "no-store" })
      .then((r) => { if (!r.ok) throw 0; return r.json(); })
      .then((d) => {
        const lc = d.leetcode || {}, cc = d.codechef || {};
        $$("[data-stat]").forEach((el) => { const v = el.dataset.stat.split(".").reduce((o, k) => o && o[k], d); if (v != null) el.textContent = v; });
        const total = (lc.easySolved || 0) + (lc.mediumSolved || 0) + (lc.hardSolved || 0);
        $$(".gauge").forEach((g) => {
          const v = lc[g.dataset.k]; if (v == null || !total) return;
          $("b", g).textContent = v; $(".arc", g).dataset.pct = Math.round((v / total) * 100);
        });
        if (gaugesIn) drawGauges();
        if (cc.stars) { setText("cc-stars", "★".repeat(cc.stars)); setText("tile-cc-meta", cc.stars + "★ · " + cc.currentRating + " · " + cc.contestsAttended + " contests"); }
        setText("tile-lc-meta", lc.contestRating + " · " + lc.contestsAttended + " contests");
        const a = lc.mostRecentContest, b = cc.mostRecentContest;
        const best = a && b ? (a.date >= b.date ? ["LeetCode", a] : ["CodeChef", b]) : a ? ["LeetCode", a] : b ? ["CodeChef", b] : null;
        if (best) { setText("mrc-title", best[0] + " · " + best[1].title); setText("mrc-meta", fmtDate(best[1].date) + " · rank " + best[1].rank); }
        const l = lc.contestsAttended || 0, c = cc.contestsAttended || 0, n = l + c;
        if (n) { const pct = Math.round((l / n) * 100); $("#cbp-lc-bar").style.width = pct + "%"; $("#cbp-cc-bar").style.width = 100 - pct + "%"; }
        setText("cbp-lc-count", l); setText("cbp-cc-count", c);
        if (d.generatedAt) setText("stats-updated", "LeetCode + CodeChef live · updated " + fmtDate(new Date(d.generatedAt).toISOString().slice(0, 10)));
      })
      .catch(() => { /* stats.json unavailable (e.g. file:// preview): keep the static numbers in the markup */ });
  }

  /* ───────────── hidden: Konami code shows the visit counter ───────────── */
  function easterEgg() {
    const NS = "saiv-me-varshith07827", KEY = "visits", base = "https://abacus.jasoncameron.dev";
    let visits = null, counted = false;
    try { counted = !!sessionStorage.getItem("sv_visit_counted"); } catch (e) {}
    fetch(base + (counted ? "/get/" : "/hit/") + NS + "/" + KEY).then((r) => r.json()).then((d) => { visits = d.value; try { sessionStorage.setItem("sv_visit_counted", "1"); } catch (e) {} }).catch(() => {});
    const seq = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"]; let prog = 0;
    document.addEventListener("keydown", (e) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      prog = k === seq[prog] ? prog + 1 : k === seq[0] ? 1 : 0;
      if (prog === seq.length) { prog = 0; toast(); }
    });
    function toast() {
      const old = document.getElementById("visit-toast"); if (old) old.remove();
      const t = document.createElement("div"); t.id = "visit-toast";
      t.style.cssText = "position:fixed;bottom:24px;right:24px;z-index:9999;background:#1A100B;border:1px solid #CDA960;padding:22px 26px;color:#EADFC8;opacity:0;transform:translateY(8px);transition:opacity .4s,transform .4s;max-width:280px;";
      t.innerHTML = '<p style="font:italic 400 54px/1 \'Bodoni Moda\',Georgia,serif;color:#CDA960;margin:0">' + (visits === null ? "—" : visits.toLocaleString()) + '</p><p style="margin:10px 0 0;font:500 10px/1.4 \'EB Garamond\',Georgia,serif;letter-spacing:.26em;text-transform:uppercase;color:#A39177">Visitors since launch</p>';
      document.body.appendChild(t);
      requestAnimationFrame(() => { t.style.opacity = 1; t.style.transform = "none"; });
      setTimeout(() => { t.style.opacity = 0; t.style.transform = "translateY(8px)"; setTimeout(() => t.remove(), 400); }, 4200);
    }
  }

  /* ───────────── boot ───────────── */
  function init() {
    renderWork(); buildDial(); stats(); easterEgg();
    const arriving = document.documentElement.classList.contains("arriving");
    let seen = false; try { seen = sessionStorage.getItem("sv_seen") === "1"; } catch (e) {}
    const loader = $("#loader");

    if (!hasG) { loader && loader.remove(); document.body.classList.remove("is-loading"); drawGauges(); $("#merci"); return; }
    window.__svReady = true;
    SV.lock(true);
    setupPeek();

    const fontsLoaded = Promise.all([document.fonts ? document.fonts.ready : 0, document.readyState === "complete" ? 0 : new Promise((r) => addEventListener("load", r))]);
    const ready = Promise.race([fontsLoaded, delay(4500)]);
    const built = ready.then(() => { setupScroll(); ScrollTrigger.refresh(); });

    const finish = () => {
      document.body.classList.remove("is-loading");
      try { sessionStorage.setItem("sv_seen", "1"); } catch (e) {}
      SV.lock(false);
      if (location.hash && $(location.hash)) SV.scrollTo($(location.hash), { immediate: true }); else window.scrollTo(0, 0);
      intro();
      if (arriving) SV.uncover();
    };
    runLoader(!RM && !seen && !arriving, built).then(finish).catch(() => { loader && loader.remove(); finish(); });
  }
  init();
})();
