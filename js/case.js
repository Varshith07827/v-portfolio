/* Case-study page: renders one project dossier from the shared data, hash-routed. */
(function () {
  const SV = window.SV, { $, $$, RM, hasG, esc } = SV;
  const P = window.PROJECTS || [];
  let ctx = null;

  function titleLines(name) {
    const parts = name.split(" ");
    return parts.length > 2 ? [parts.slice(0, -1).join(" "), parts[parts.length - 1]] : parts;
  }

  function render() {
    const id = location.hash.replace("#", "") || P[0].id;
    const i = Math.max(0, P.findIndex((p) => p.id === id));
    const p = P[i], next = P[(i + 1) % P.length];
    if (ctx) ctx.revert();
    SV.navDark.clear(); SV.syncNav();

    document.title = p.name + " — Venkata Sai Varshith";
    $("#counter").textContent = p.num + " / 0" + P.length;

    const lines = titleLines(p.name).map((l) => `<span class="line"><span class="inner">${esc(l)}</span></span>`).join("");
    const stack = p.stack.map((t) => `<li>${esc(t)}</li>`).join("");
    const links = (p.links || []).length ? p.links.map((l) => `<a class="btn" href="${esc(l.href)}" target="_blank" rel="noopener">${esc(l.label.replace("↗", "").trim())} ↗</a>`).join("") : "";
    const figs = p.gallery.map((g, n) => `
      <figure class="fig" data-fig>
        <div class="fig-media"><img src="${esc(g.src)}" alt="${esc(g.alt)}" ${n === 0 ? "" : 'loading="lazy"'}></div>
        <figcaption class="fig-cap"><span>Fig. ${n + 1}</span><span>${esc(g.cap)}</span></figcaption>
      </figure>`).join("");
    const sects = p.sections.map((s, n) => `
      <section class="c-sect" data-fade>
        <h2><span>${["I", "II", "III", "IV"][n]}.</span>${esc(s.h.charAt(0) + s.h.slice(1).toLowerCase())}</h2>
        <div class="body">${s.body.map((t) => `<p>${esc(t)}</p>`).join("")}</div>
      </section>`).join("");
    const now = p.now.map((t) => `<li>${esc(t)}</li>`).join("");
    const nxt = (p.next || []).length ? `<h3 class="eyebrow next-h">On the horizon</h3><ul class="now-list next">${p.next.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : "";
    const all = P.map((q) => `<a href="case.html#${q.id}" class="${q.id === p.id ? "cur" : ""}">${esc(q.name)}</a>`).join("");

    $("#case-main").innerHTML = `
      <section class="case-hero">
        <div class="wrap">
          <div class="case-top"><span class="case-roman">Pièce ${p.roman}</span><span class="eyebrow">Dossier · ${p.num} / 0${P.length}</span></div>
          <h1 class="case-title" aria-label="${esc(p.name)}">${lines}</h1>
          <p class="case-dek" data-fade>${esc(p.title)}</p>
          <div class="case-meta" data-fade>
            <p class="blurb dropcap">${esc(p.blurb)}</p>
            <aside>
              <p class="eyebrow">Built with</p>
              <ul class="stackl">${stack}</ul>
              ${links}
            </aside>
          </div>
        </div>
      </section>
      <section class="sec" style="padding-top:clamp(20px,4vh,40px)"><div class="wrap"><div class="case-gallery">${figs}</div></div></section>
      <section class="wrap" style="padding-bottom:clamp(40px,8vh,90px)">
        ${sects}
        <section class="c-sect" data-fade>
          <h2><span>${["I", "II", "III", "IV", "V"][p.sections.length]}.</span>Working today</h2>
          <div><ul class="now-list" style="margin-top:0">${now}</ul>${nxt}</div>
        </section>
      </section>
      <section class="dark" data-nav>
        <div class="wrap">
          <a class="case-next" href="case.html#${next.id}" data-cursor="Suivant">
            <span class="eyebrow">Next piece — ${next.roman}</span>
            <b>${esc(next.name)}</b>
            <span class="sub">${esc(next.title)}</span>
          </a>
          <nav class="case-all" aria-label="All projects"><a href="index.html#work">← All work</a>${all}</nav>
        </div>
      </section>`;

    window.scrollTo(0, 0);
    if (SV.lenis) SV.lenis.scrollTo(0, { immediate: true });
    if (!hasG) return;

    ctx = gsap.context(() => {
      SV.watchDark();
      if (RM) return;
      gsap.from(".case-title .inner", { yPercent: 115, duration: 1.6, ease: "power4.out", stagger: 0.12, delay: 0.15 });
      gsap.from(".case-top > *", { opacity: 0, y: 14, duration: 1, stagger: 0.1, delay: 0.3, ease: "power2.out" });
      $$("[data-fade]").forEach((el) => gsap.from(el, { y: 44, opacity: 0, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } }));
      $$("[data-fig]").forEach((fig) => {
        const media = $(".fig-media", fig), img = $("img", media);
        gsap.from(media, { clipPath: "inset(0% 0% 100% 0%)", duration: 1.5, ease: "power4.inOut", scrollTrigger: { trigger: fig, start: "top 88%", once: true } });
        gsap.fromTo(img, { yPercent: -5 }, { yPercent: 5, ease: "none", scrollTrigger: { trigger: fig, start: "top bottom", end: "bottom top", scrub: true } });
        gsap.from(img, { scale: 1.18, duration: 1.8, ease: "power3.out", scrollTrigger: { trigger: fig, start: "top 88%", once: true } });
      });
      gsap.from(".case-next b", { yPercent: 40, opacity: 0, duration: 1.3, ease: "power3.out", scrollTrigger: { trigger: ".case-next", start: "top 85%", once: true } });
    });
    ScrollTrigger.refresh();
  }

  SV.progress();
  render();
  SV.uncover();
  window.addEventListener("hashchange", () => { render(); SV.uncover(); });
  if (hasG) window.addEventListener("load", () => ScrollTrigger.refresh());
})();
