# v-portfolio

Portfolio of Venkata Sai Varshith — AI, systems and automation. An editorial site in the spirit of an old-money almanac: parchment and espresso grounds, bordeaux and brass accents, Bodoni Moda + EB Garamond, a working wristwatch dial as the hero.

Plain static HTML/CSS/JS — no build step.

| Path | What it is |
| --- | --- |
| `index.html` | Home: loader, pinned watch-dial hero that opens into the credo, the work index, experience, craft, live competitive-programming certificate, portrait, correspondence |
| `case.html` | Case-study dossiers, hash-routed (`case.html#winspark`), rendered from `js/data.js` |
| `style.css` | The whole design system (tokens at the top) |
| `js/data.js` | Single source of truth for the seven projects: copy, stack, screenshots |
| `js/common.js` | Smooth scroll (Lenis), page-transition curtain, nav, cursor, clocks |
| `js/home.js` | The dial, loader, hero scene, scroll choreography, live stats |
| `js/case.js` | Case-study page |
| `assets/` | Project screenshots (captured from the running projects) and `stats.json` |
| `scripts/`, `.github/workflows/` | Action that refreshes `assets/stats.json` (LeetCode + CodeChef) |

Libraries load from CDNs: GSAP + ScrollTrigger (cdnjs) and Lenis (jsDelivr). If they fail to load, the page falls back to a plain, readable static layout.

## Run locally

```bash
python3 -m http.server 8000
```

then open <http://localhost:8000>.

## Notes

- Respects `prefers-reduced-motion`: no smooth scroll, pinning or loader.
- The loader plays once per browser session; navigating between pages uses a curtain transition.
- Hidden: the Konami code shows the visit counter.
- Screenshots: DigiTwin, Mantis, the AI PII Detector and SignalOps were captured from the running projects in their light themes (the PII scan uses fictional sample data; SignalOps runs the real engine on a clearly-labelled synthetic dataset because the hackathon pack isn't public). Mantis and the PII Detector screenshots use their rebuilt React UIs. Atlas is dark-only, so its captures are dark. WinSpark is Windows-only, so its capture comes from the project's own docs.
