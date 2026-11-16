/* Shared runtime: smooth scroll, page transitions, nav, cursor, clocks, helpers. */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasG = !!(window.gsap && window.ScrollTrigger);
  const SV = (window.SV = { $, $$, RM, hasG, lenis: null });
  if (hasG) gsap.registerPlugin(ScrollTrigger);

  /* ── smooth scrolling (Lenis driven by the GSAP ticker) ── */
  if (hasG && window.Lenis && !RM) {
    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true, wheelMultiplier: 0.95 });
    SV.lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  SV.scrollTo = (target, opts = {}) => {
    if (SV.lenis) SV.lenis.scrollTo(target, Object.assign({ duration: 1.5, easing: (t) => 1 - Math.pow(1 - t, 4) }, opts));
    else if (typeof target === "number") window.scrollTo(0, target);
    else if (target && target.scrollIntoView) target.scrollIntoView({ behavior: RM ? "auto" : "smooth" });
  };
  SV.lock = (on) => { if (SV.lenis) on ? SV.lenis.stop() : SV.lenis.start(); };

  /* ── text splitting (words, optionally masked) ── */
  SV.split = (el, mask = true) => {
    const words = [];
    (function walk(node) {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.append(" "); return; }
            const w = document.createElement("span"); w.className = "w" + (mask ? " mask" : "");
            const i = document.createElement("span"); i.className = "wi"; i.textContent = part;
            w.append(i); frag.append(w); words.push(i);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) walk(n);
      });
    })(el);
    return words;
  };
  SV.esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ── page-transition curtain ── */
  const curtain = $(".curtain");
  SV.cover = () => new Promise((res) => {
    if (!hasG || RM || !curtain) return res();
    curtain.style.pointerEvents = "auto";
    gsap.fromTo(curtain, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.85, ease: "power3.inOut", onComplete: res });
    gsap.fromTo(".curtain-mono", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.3, ease: "power3.out" });
  });
  SV.uncover = () => new Promise((res) => {
    const done = () => {
      document.documentElement.classList.remove("arriving");
      try { sessionStorage.removeItem("sv_curtain"); } catch (e) {}
      res();
    };
    if (!hasG || RM || !curtain) { if (curtain) curtain.style.clipPath = "inset(100% 0 0 0)"; return done(); }
    gsap.to(curtain, {
      clipPath: "inset(0% 0% 100% 0%)", duration: 1, ease: "power3.inOut",
      onComplete: () => { gsap.set(curtain, { clipPath: "inset(100% 0% 0% 0%)" }); curtain.style.pointerEvents = "none"; done(); },
    });
  });
  window.addEventListener("pageshow", (e) => {
    if (e.persisted && curtain && hasG) { gsap.set(curtain, { clipPath: "inset(100% 0% 0% 0%)" }); curtain.style.pointerEvents = "none"; document.documentElement.classList.remove("arriving"); }
  });

  /* ── menu (mobile) ── */
  const menu = $("#menu");
  const openMenu = () => {
    if (!menu) return;
    menu.style.visibility = "visible";
    if (hasG) {
      gsap.to(menu, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.85, ease: "power3.inOut" });
      gsap.fromTo("#menu a span", { yPercent: 110 }, { yPercent: 0, duration: 1, stagger: 0.06, delay: 0.3, ease: "power4.out" });
    } else menu.style.clipPath = "none";
    SV.lock(true);
  };
  const closeMenu = (instant) => {
    if (!menu || menu.style.visibility !== "visible") return;
    SV.lock(false);
    if (hasG && !instant) gsap.to(menu, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.7, ease: "power3.inOut", onComplete: () => (menu.style.visibility = "hidden") });
    else { menu.style.clipPath = "inset(0 0 100% 0)"; menu.style.visibility = "hidden"; }
  };
  $("#menuBtn") && $("#menuBtn").addEventListener("click", openMenu);
  $("#menuClose") && $("#menuClose").addEventListener("click", () => closeMenu());

  /* ── link handling: in-page anchors scroll smoothly; internal pages go through the curtain ── */
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || a.target === "_blank") return;
    const href = a.getAttribute("href");
    if (!href) return;
    if (href.startsWith("#")) {
      const t = href === "#top" ? 0 : $(href);
      if (t !== null && t !== undefined) { e.preventDefault(); closeMenu(); setTimeout(() => SV.scrollTo(t), menu && menu.style.visibility === "visible" ? 350 : 0); }
      return;
    }
    if (/^(https?:|mailto:|tel:)/.test(href)) return;
    e.preventDefault();
    try { sessionStorage.setItem("sv_curtain", "1"); } catch (err) {}
    SV.cover().then(() => { location.href = href; });
  });
  const toTop = $("#toTop"); toTop && toTop.addEventListener("click", () => SV.scrollTo(0));

  /* ── nav: hide on scroll down, theme follows the section underneath ── */
  const nav = $("#nav");
  SV.navDark = new Set();
  SV.syncNav = () => nav && nav.classList.toggle("on-dark", SV.navDark.size > 0);
  if (nav) {
    let last = window.scrollY;
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      if (Math.abs(y - last) > 6) { nav.classList.toggle("hide", y > last && y > 240); last = y; }
    }, { passive: true });
  }
  SV.watchDark = () => {
    if (!hasG) return;
    $$("[data-nav]").forEach((sec, i) => {
      ScrollTrigger.create({
        trigger: sec, start: "top 44px", end: "bottom 44px",
        onToggle: (self) => { self.isActive ? SV.navDark.add(i) : SV.navDark.delete(i); SV.syncNav(); },
      });
    });
  };

  /* ── progress bar ── */
  SV.progress = () => {
    if (hasG && $(".progress")) gsap.to(".progress", { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });
  };

  /* ── custom cursor label ── */
  if (hasG && matchMedia("(hover: hover) and (pointer: fine)").matches && $(".cursor")) {
    const c = $(".cursor");
    const xTo = gsap.quickTo(c, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(c, "y", { duration: 0.5, ease: "power3" });
    window.addEventListener("mousemove", (e) => { xTo(e.clientX); yTo(e.clientY); }, { passive: true });
    let shown = false;
    document.addEventListener("mouseover", (e) => {
      const t = e.target.closest && e.target.closest("[data-cursor]");
      if (t && !shown) { c.textContent = t.dataset.cursor; shown = true; gsap.to(c, { scale: 1, opacity: 1, duration: 0.45, ease: "power3.out" }); }
      else if (!t && shown) { shown = false; gsap.to(c, { scale: 0, opacity: 0, duration: 0.3, ease: "power2.in" }); }
    });
  }

  /* ── world clocks ── */
  const fmts = {};
  const tick = () => {
    const now = new Date();
    $$("[data-clock]").forEach((el) => {
      const tz = el.dataset.clock;
      fmts[tz] = fmts[tz] || new Intl.DateTimeFormat("en-GB", { timeZone: tz, hour: "2-digit", minute: "2-digit", hour12: false });
      el.textContent = fmts[tz].format(now);
    });
  };
  tick(); setInterval(tick, 1000);
})();
