window.PROJECTS = [
  {
    "id": "digitwin",
    "num": "01",
    "roman": "I",
    "name": "DigiTwin",
    "title": "City-scale digital twin & infrastructure simulation",
    "short": "A 3D twin of central London built on real OpenStreetMap geometry, with the water network modelled as a graph you can break, isolate and repair to watch failure propagate.",
    "tags": "Cesium / Resium · FastAPI · NetworkX",
    "blurb": "A 3D twin of central London built on real OpenStreetMap geometry, with the water network modelled as a graph you can break, isolate and repair to watch failure propagate through the city.",
    "stack": [
      "REACT 18",
      "TYPESCRIPT",
      "VITE",
      "CESIUM / RESIUM",
      "TAILWIND",
      "PYTHON",
      "FASTAPI",
      "PYDANTIC",
      "NETWORKX",
      "SCIPY",
      "OVERPASS API"
    ],
    "links": [],
    "gallery": [
      {
        "src": "assets/digitwin-burst.jpg",
        "alt": "DigiTwin: a burst trunk main in Central London, with buildings coloured by water pressure and an impact panel",
        "cap": "A burst trunk main: pressure falls around it and 183 buildings lose supply"
      },
      {
        "src": "assets/digitwin-city.jpg",
        "alt": "DigiTwin: Central London as 3D buildings and terrain in the light theme, with the layers panel",
        "cap": "Central London from local OpenStreetMap data — no token, no internet needed"
      },
      {
        "src": "assets/digitwin-bridge.jpg",
        "alt": "DigiTwin: Blackfriars Bridge closed to traffic, with rerouted journeys and an impact panel",
        "cap": "Closing Blackfriars Bridge reroutes 79 trips and lengthens the average journey"
      },
      {
        "src": "assets/digitwin-street.jpg",
        "alt": "DigiTwin: street view standing on the closed Blackfriars Bridge with simulated traffic",
        "cap": "Street view on the closed bridge, with simulated traffic"
      },
      {
        "src": "assets/digitwin-storm.jpg",
        "alt": "DigiTwin: a design storm over Central London, with flooded streets and a rainfall hydrograph",
        "cap": "A 50 mm-in-an-hour storm: flooded streets, impassable roads and full drains"
      }
    ],
    "sections": [
      {
        "h": "WHAT IT IS",
        "body": [
          "A browser-based digital twin of central London. Cesium renders the terrain and building footprints; on top of that sit OpenStreetMap road and water layers pulled through the Overpass API, so the geometry is the real city rather than a stand-in."
        ]
      },
      {
        "h": "WHY IT MATTERS",
        "body": [
          "Infrastructure failures are hard to reason about because they cascade. A single broken pipe is not one event — it is a set of buildings without supply, a road that has to close, and a repair sequence that has to be chosen. A twin makes that chain visible before it happens."
        ]
      },
      {
        "h": "WHAT I BUILT",
        "body": [
          "A FastAPI backend fetches OSM roads and water through the Overpass API, converts the result to GeoJSON, and builds a NetworkX graph of the water segments. Pressure propagates from source nodes through that graph, so passing a set of broken pipe IDs returns new per-segment pressures — which the viewer colourises in place.",
          "Most of the engineering is in the middle: caching and falling back to local GeoJSON when Overpass is unreachable, reconciling messy map data into a graph clean enough to simulate, and keeping the Cesium scene in step with simulation state without re-rendering the city.",
          "The model has since grown past water: a traffic layer that reroutes trips around closed roads, an incident timeline that plays a burst through isolation, repair and the road reopening, storm drainage and flooding from rainfall to street-level depth, A* routing for the repair crew, and a street-view mode to stand on the road you just closed."
        ]
      }
    ],
    "now": [
      "3D BUILDINGS + TERRAIN, OFFLINE",
      "WATER PRESSURE (HAZEN-WILLIAMS)",
      "BURST / ISOLATE / REPAIR",
      "TRAFFIC + ROAD CLOSURES",
      "INCIDENT TIMELINE",
      "STORM DRAINAGE + FLOODING",
      "A* ROUTING",
      "LANE-CLOSURE MICROSIMULATION",
      "STREET VIEW",
      "SCENARIO COMPARE + CSV EXPORT"
    ],
    "next": [
      "ELECTRICITY LAYER",
      "WEATHER",
      "IOT SENSORS"
    ]
  },
  {
    "id": "mantis",
    "num": "02",
    "roman": "II",
    "name": "Mantis",
    "title": "Browser automation platform",
    "short": "Records a browser session once, then replays it as a parameterised workflow — scheduled, retried, logged and monitored from one dashboard.",
    "tags": "Node.js · Express · Playwright · React",
    "blurb": "Turns browser actions into repeatable automation: record a session once, then replay it as a parameterised workflow with scheduling, retries and an audit trail.",
    "stack": [
      "NODE.JS",
      "EXPRESS",
      "PLAYWRIGHT",
      "SOCKET.IO",
      "SQLITE + SEQUELIZE",
      "REACT 19",
      "TYPESCRIPT",
      "VITE",
      "TAILWIND",
      "BASE UI"
    ],
    "links": [],
    "sections": [
      {
        "h": "WHAT IT IS",
        "body": [
          "An automation platform built on Playwright. You record a browser session, Mantis generates the workflow from it, and from then on that workflow is a first-class object: parameterised, scheduled, monitored and re-runnable."
        ]
      },
      {
        "h": "WHY IT MATTERS",
        "body": [
          "A one-off browser script is fragile and invisible. The interesting problem is not driving a browser — it is making the result durable: knowing which runs failed and why, retrying without duplicating work, and handing the thing to someone who did not write it."
        ]
      },
      {
        "h": "WHAT I BUILT",
        "body": [
          "A Playwright codegen wrapper turns a recorded session into a runnable test case, parameterised so one recording serves many inputs, with fallback and retry behaviour for the selectors that inevitably drift. A PDF extraction and upload step handles the documents these workflows tend to end at.",
          "An Express server fronts it with a dashboard, Socket.IO streams run progress live, and SQLite through Sequelize keeps the run history, audit log and analytics — so the platform can be operated rather than just executed.",
          "The console itself is a React and TypeScript app (Tailwind, Base UI, Motion) built into the Express static folder, so the server runs it with no Node tooling in production. It plots schedules on a live 24-hour timeline, hides routine scheduler noise from the activity feed, and has a command palette and dark theme. Rebuilding it also exposed two request-contract bugs in the old page (the run-test call sent the wrong field names, and the test list read the wrong response key); both are fixed."
        ]
      }
    ],
    "now": [
      "SESSION RECORD / REPLAY",
      "GENERATED TEST CASES",
      "SAVED PRODUCT LISTS",
      "SCHEDULES ON A LIVE DAY TIMELINE",
      "NEXT-RUN COUNTDOWN",
      "PDF EXTRACTION + UPLOAD",
      "FILTERABLE ACTIVITY LOG",
      "LIVE FILE SEARCH",
      "COMMAND PALETTE"
    ],
    "gallery": [
      {
        "src": "assets/mantis-console.jpg",
        "alt": "Mantis console overview: summary tiles, a 24-hour schedule timeline with a live now marker and next-run countdown, quick actions and recent activity",
        "cap": "Overview: a live day timeline with a next-run countdown, and the activity feed"
      },
      {
        "src": "assets/mantis-sds.jpg",
        "alt": "Mantis SDS automation page: products typed into the run form shown as removable chips beside saved product lists",
        "cap": "SDS automation: paste products, or run a saved list"
      },
      {
        "src": "assets/mantis-schedules.jpg",
        "alt": "Mantis schedules page: the day timeline above a new-schedule form and the active schedules sorted by next run",
        "cap": "Schedules: sorted by next run, plotted on the day timeline"
      }
    ]
  },
  {
    "id": "winspark",
    "num": "03",
    "roman": "III",
    "name": "WinSpark",
    "title": "Desktop automation engine",
    "short": "Software controlling software: drives WhatsApp Desktop through the Windows accessibility tree, routes every message through a webhook, and persists state before each irreversible step so a crash can be recovered from.",
    "tags": "Python · Windows UI Automation · MongoDB · PySide6",
    "blurb": "Software controlling software. It drives WhatsApp Desktop entirely through the Windows UI Automation tree — discovering chats, POSTing each incoming message to that chat's webhook, and sending back whatever the endpoint replies.",
    "stack": [
      "PYTHON",
      "WINDOWS UI AUTOMATION",
      "PYWIN32",
      "PYSIDE6",
      "MONGODB",
      "WEBHOOKS",
      "PYTEST"
    ],
    "links": [
      {
        "label": "GITHUB ↗",
        "href": "https://github.com/Varshith07827/Winsparkpro"
      }
    ],
    "sections": [
      {
        "h": "WHAT IT IS",
        "body": [
          "A desktop automation engine for Windows, built as a single-purpose tool: it watches the WhatsApp Desktop chat list through the accessibility tree, registers what it finds, and runs a webhook loop for the chats you switch on. No OCR, no screenshots, no model in the loop."
        ]
      },
      {
        "h": "WHY IT MATTERS",
        "body": [
          "Plenty of real work still lives in desktop software with no API. Driving it means working against interfaces that were never meant to be automated — and getting the failure behaviour right, because the cost of a duplicate message is higher than the cost of a missed one."
        ]
      },
      {
        "h": "WHAT I BUILT",
        "body": [
          "A 3-second poll loop with a single worker: persist → webhook → persist → send → verify. Every UIA call is owned by one STA thread; reading is fully headless, and a send only counts as sent once WhatsApp clears the compose box as proof.",
          "The reliability work is the substance. State is written before each irreversible step, so restart recovery can tell what the outside world has already seen — a crash mid-webhook parks the message rather than retrying it. MongoDB is authoritative, with an atomically-written JSON mirror so a database outage degrades instead of stopping.",
          "121 pytest tests cover the row parser against strings captured from a live window, the webhook retry policy, storage guarantees, the pipeline against a real HTTP server, and restart recovery."
        ]
      }
    ],
    "now": [
      "UIA CHAT DISCOVERY",
      "HEADLESS READING",
      "PER-CHAT WEBHOOKS",
      "VERIFIED SENDS",
      "MONGODB + JSON MIRROR",
      "CRASH-POINT RECOVERY",
      "INBOUND SEND API",
      "POLLED RELAY MODE",
      "121 PYTEST TESTS"
    ],
    "gallery": [
      {
        "src": "assets/winspark-light.jpg",
        "alt": "WinSpark main window in the light theme: chat list with automation badges, per-chat webhook settings and activity",
        "cap": "The main window — demo contacts, from the project’s own docs"
      }
    ]
  },
  {
    "id": "signalops",
    "num": "04",
    "roman": "IV",
    "name": "SignalOps",
    "title": "Voice-of-Store engine — messy feedback into weekly actions",
    "short": "Turns 40k messy multilingual store-feedback records into routed weekly actions and early-warning flags per region.",
    "tags": "Python · scikit-learn · FastAPI · Leaflet",
    "blurb": "Turns tens of thousands of messy, multilingual store-feedback records into a prioritised weekly action list per region, routes each issue to the team that owns it, and flags a store’s problem while it is still small.",
    "stack": [
      "PYTHON",
      "SCIKIT-LEARN",
      "PANDAS",
      "SCIPY",
      "FASTAPI",
      "LEAFLET",
      "TOML CONFIG",
      "PYTEST"
    ],
    "links": [
      {
        "label": "GITHUB ↗",
        "href": "https://github.com/Varshith07827/SignalOps"
      }
    ],
    "gallery": [
      {
        "src": "assets/signalops-overview.jpg",
        "alt": "SignalOps dashboard for the South region: this week's message counts, top five issues to act on and early warnings",
        "cap": "The weekly view for one region — shown on a synthetic demo dataset"
      },
      {
        "src": "assets/signalops-teams.jpg",
        "alt": "SignalOps: who must act this week, per team, with escalation rules and deadlines",
        "cap": "Who must act this week, and when to escalate"
      },
      {
        "src": "assets/signalops-map.jpg",
        "alt": "SignalOps: a store selected on the map, with its problems this week and the last one solved",
        "cap": "Stores on the map: this week’s problems, and the last one solved"
      }
    ],
    "sections": [
      {
        "h": "WHAT IT IS",
        "body": [
          "A grocery chain with 60 stores in five regions gets about 1,500 messages a week — online reviews, app comments, staff shift notes and call-centre transcripts — in English, Hinglish and transliterated Tamil and Marathi, with typos, emojis and shorthand. SignalOps reads all of it and answers one question: what should each team do this week?"
        ]
      },
      {
        "h": "WHY IT MATTERS",
        "body": [
          "Real store problems — a broken freezer, a mislabelled allergen, a rude billing counter — are buried in that noise and reach head office weeks late. The value is in turning the noise into a short, owned, time-boxed action list, and in catching the small-but-rising problem before it is chain-wide."
        ]
      },
      {
        "h": "WHAT I BUILT",
        "body": [
          "A pipeline that labels every message with an issue type, a severity and whether anyone can act on it; routes each actionable issue to its owning team with an escalation level and deadline; merges the same incident reported through several channels; and writes a one-page brief per region per week with the top five issues, evidence quotes and a trend arrow.",
          "The early-warning detector is causal: for any week it uses only feedback up to that Sunday, compares each store with its own baseline pulled toward the chain average, and flags a small, sharp rise with at least two messages as evidence. On the hackathon pack, cross-validated classification scored 0.945 against a 0.579 baseline, and 97% of the messages marked actionable truly were.",
          "A FastAPI dashboard with a Leaflet store map sits on top; the web layer holds no analysis logic. Every threshold, window, weight and deadline lives in one config file, and 64 tests run on small synthetic data."
        ]
      }
    ],
    "now": [
      "ISSUE TYPE + SEVERITY + ACTIONABLE",
      "OWNER ROUTING WITH DEADLINES",
      "WEEK-BY-WEEK EARLY WARNINGS",
      "CROSS-CHANNEL DE-DUPLICATION",
      "ONE-PAGE REGIONAL BRIEFS",
      "STORE MAP + CASE LISTS",
      "CHECK-A-NEW-REVIEW FORM",
      "ALL THRESHOLDS IN ONE CONFIG",
      "64 TESTS"
    ]
  },
  {
    "id": "pii",
    "num": "05",
    "roman": "V",
    "name": "AI PII Detector",
    "title": "Privacy detection & data masking",
    "short": "Finds sensitive information before it becomes a problem. A hybrid regex and spaCy NLP pipeline reads PDF, DOCX, CSV, XLSX and TXT files, scores risk, then masks what it finds — in batch, from the CLI or the web app.",
    "tags": "Python · Flask · React · TypeScript",
    "blurb": "Finds sensitive information before it becomes a problem. A hybrid regex and spaCy pipeline reads five file formats, scores risk, and masks what it finds.",
    "stack": [
      "PYTHON",
      "FLASK",
      "REACT 19",
      "TYPESCRIPT",
      "VITE",
      "TAILWIND",
      "BASE UI",
      "MOTION",
      "SPACY NLP",
      "REGEX + LUHN",
      "PYTEST"
    ],
    "links": [
      {
        "label": "GITHUB ↗",
        "href": "https://github.com/Varshith07827/AI-PII-Detector"
      }
    ],
    "sections": [
      {
        "h": "WHAT IT IS",
        "body": [
          "A Flask application and CLI that detects personally identifiable information across PDF, DOCX, CSV, XLSX and TXT files, assigns a risk score, and produces a masked copy of the document."
        ]
      },
      {
        "h": "WHY IT MATTERS",
        "body": [
          "Sensitive data leaks through ordinary files — an exported spreadsheet, an attached PDF. Catching it needs to be cheap enough to run over everything, not a manual review."
        ]
      },
      {
        "h": "WHAT I BUILT",
        "body": [
          "A hybrid detection pipeline: regex catches the structured identifiers reliably, and an optional spaCy NLP pass picks up names and entities that patterns miss. Results are scored so a reviewer can triage rather than read everything.",
          "Batch processing and a CLI make it usable over directories of files, and the detection logic is covered by tests — a pipeline that silently stops matching is worse than none.",
          "The web app is a React and TypeScript workspace (Tailwind, Base UI, Motion) over the Flask JSON API: findings highlight in place in the editor, a risk gauge breaks exposure down by sensitivity, an inspector explains each detection against GDPR, DPDP, HIPAA and PCI DSS, and a side-by-side view shows exactly which lines masking changes. There is a command palette, a privacy mode that blurs values, a dark theme, and exports that keep values redacted. It is bundled into Flask's static folder, so it still runs offline with no Node at runtime.",
          "Building the interface surfaced a real detector bug: any 16-digit number matched a blanket 'placeholder' pattern, so genuine card numbers were silently dropped from the risk score. Card detection now accepts grouped numbers and requires a valid Luhn checksum, with well-known test cards still treated as placeholders, and the fix ships with regression tests."
        ]
      }
    ],
    "now": [
      "PDF / DOCX / CSV / XLSX / TXT",
      "REGEX + OPTIONAL SPACY PASS",
      "LUHN-VALIDATED CARDS",
      "RISK SCORE + COMPLIANCE FLAGS",
      "LIVE IN-PLACE HIGHLIGHTS",
      "ENTITY INSPECTOR + MINIMAP",
      "SIDE-BY-SIDE MASKING",
      "COMMAND PALETTE",
      "REDACTED EXPORTS"
    ],
    "gallery": [
      {
        "src": "assets/pii-scan.jpg",
        "alt": "PII Detector workspace: editor with highlighted identifiers on the left; on the right a critical risk score of 100 with GDPR, DPDP, HIPAA and PCI DSS flags and cards per data type",
        "cap": "The workspace after a scan of fictional sample data: highlights in the editor, risk score 100, regulation flags and per-type cards"
      },
      {
        "src": "assets/pii-masked.jpg",
        "alt": "PII Detector compare view: original text and partially masked text side by side, with the changed lines highlighted",
        "cap": "Compare: the original beside the masked copy, with changed lines marked"
      }
    ]
  },
  {
    "id": "atlas",
    "num": "06",
    "roman": "VI",
    "name": "Atlas",
    "title": "Personal productivity system",
    "short": "Tasks, notes and time in one calm surface. The engineering sits underneath: one store abstraction serving either local storage or Supabase, optimistic mutations, realtime sync, and a PWA shell that works offline.",
    "tags": "React · Zustand · Supabase · PWA",
    "blurb": "Tasks, notes and time in one calm surface — with a store abstraction underneath that serves either local storage or Supabase without the UI knowing which.",
    "stack": [
      "REACT 19",
      "TYPESCRIPT",
      "VITE",
      "ZUSTAND",
      "SUPABASE",
      "TAILWIND",
      "RADIX UI",
      "DND-KIT",
      "FULLCALENDAR",
      "PWA"
    ],
    "links": [
      {
        "label": "GITHUB ↗",
        "href": "https://github.com/Varshith07827/atlas"
      }
    ],
    "sections": [
      {
        "h": "WHAT IT IS",
        "body": [
          "A second brain for tasks, notes and time. Deliberately quiet: keyboard-first, no notifications competing for attention, and fast enough that capturing something costs nothing."
        ]
      },
      {
        "h": "WHY IT MATTERS",
        "body": [
          "The interesting part is not the todo list. It is that the same app runs entirely on-device with no account, or backed by Supabase with realtime sync — and the interface is identical either way."
        ]
      },
      {
        "h": "WHAT I BUILT",
        "body": [
          "One store abstraction over two backends, with Zustand holding UI state. Mutations apply optimistically so the app never waits on a round trip, then reconcile against the server; realtime subscriptions keep other sessions current.",
          "The surface is built from Radix primitives with dnd-kit for reordering and FullCalendar for the time views. A PWA shell makes it installable and usable offline, and keyboard shortcuts cover the paths used most."
        ]
      }
    ],
    "now": [
      "TASKS · NOTES · TIME",
      "LOCAL STORAGE MODE",
      "SUPABASE CLOUD MODE",
      "OPTIMISTIC MUTATIONS",
      "REALTIME SYNC",
      "DRAG REORDERING",
      "CALENDAR VIEWS",
      "INSTALLABLE PWA",
      "KEYBOARD SHORTCUTS"
    ],
    "gallery": [
      {
        "src": "assets/atlas-today.jpg",
        "alt": "Atlas Today view with tasks, the next seven days and habits",
        "cap": "Today — local mode, seeded with example data"
      },
      {
        "src": "assets/atlas-board.jpg",
        "alt": "Atlas Board view with Inbox, Today, Doing and Done columns",
        "cap": "The board"
      },
      {
        "src": "assets/atlas-calendar.jpg",
        "alt": "Atlas Calendar week view with an unscheduled task tray",
        "cap": "The calendar, with the unscheduled tray"
      }
    ]
  },
  {
    "id": "quantum",
    "num": "07",
    "roman": "VII",
    "name": "Quantum Axiona",
    "title": "Quantum circuit playground",
    "short": "Drag gates onto qubit wires and watch the state evolve: probabilities, phases, Bloch spheres, density matrices and noisy measurements.",
    "tags": "Python · Qiskit · Flask · React",
    "blurb": "A quantum circuit playground. Drag gates onto qubit wires and watch the state evolve: measurement probabilities, the statevector with phases, a draggable Bloch sphere per qubit, density-matrix heatmaps, noisy measurements and a PDF report.",
    "stack": [
      "PYTHON",
      "FLASK",
      "QISKIT",
      "QISKIT AER",
      "NUMPY",
      "REPORTLAB",
      "REACT 19",
      "TYPESCRIPT",
      "VITE",
      "TAILWIND 4",
      "RADIX UI",
      "RECHARTS",
      "MOTION",
      "PYTEST"
    ],
    "links": [],
    "gallery": [
      {
        "src": "assets/quantum-circuit.jpg",
        "alt": "Quantum Axiona: a three-qubit circuit with H, rotation and CNOT gates, a step slider, the state written as a sum of kets, and purity and entanglement readouts",
        "cap": "A three-qubit circuit with its live state: kets with phases, purity and entanglement"
      },
      {
        "src": "assets/quantum-measure.jpg",
        "alt": "Quantum Axiona: exact probabilities beside 1024 sampled shots with 2 percent gate noise, and the statevector table",
        "cap": "Exact probabilities against a noisy 1024-shot measurement"
      },
      {
        "src": "assets/quantum-bloch.jpg",
        "alt": "Quantum Axiona: one Bloch sphere per qubit marking q0 as pure and q1 and q2 as entangled, above a density-matrix heatmap",
        "cap": "A Bloch sphere per qubit: pure states sit on the surface, entangled ones inside"
      }
    ],
    "sections": [
      {
        "h": "WHAT IT IS",
        "body": [
          "A browser-based playground for building small quantum circuits, up to six qubits and 200 gates. You drag a gate onto a wire (or pick one and click), and the whole picture updates at once: measurement probabilities, the statevector written as a sum of kets with phases, a Bloch sphere for each qubit, and the density matrix as a hoverable heatmap, along with purity and entanglement."
        ]
      },
      {
        "h": "WHY IT MATTERS",
        "body": [
          "Quantum states are hard to build intuition for from equations alone. Seeing a CNOT turn two independent Bloch spheres into two dots sitting inside their spheres, with the entanglement readout rising from 0 to 1, makes the idea concrete. Stepping through the circuit one gate at a time shows exactly where each change happens."
        ]
      },
      {
        "h": "WHAT I BUILT",
        "body": [
          "A Flask JSON API over Qiskit: every mutation (add or remove a gate, undo, import, load an example) returns the full new circuit state, which keeps the frontend a thin view. Each browser gets its own circuit through a signed session, and inputs are validated at the boundary: qubit ranges, duplicate qubits, angle expressions parsed without eval, shot and noise limits, upload size.",
          "The React 19 frontend adds drag-and-drop with a click-to-place fallback, a step-through slider that replays the circuit gate by gate, a measurement lab that samples 256 to 16k shots with optional depolarizing noise, OpenQASM 2.0 import and export, shareable links that keep the circuit in the URL hash rather than on a server, a PDF report, a command palette and a phone layout with a bottom sheet.",
          "Auditing it before adding it here turned up two real defects, now fixed: an absurd rotation angle such as 1e308 was accepted and then crashed the PDF report with a server error, and a stats label was clipped. Angles are now limited to ±100π for typed gates and imported QASM alike, with regression tests; the API suite is at 19 tests."
        ]
      }
    ],
    "now": [
      "DRAG-AND-DROP + CLICK-TO-PLACE",
      "STEP-THROUGH REPLAY",
      "STATEVECTOR WITH PHASES",
      "BLOCH SPHERE PER QUBIT",
      "DENSITY-MATRIX HEATMAP",
      "PURITY + ENTANGLEMENT",
      "NOISY MEASUREMENT LAB",
      "OPENQASM 2.0 IMPORT / EXPORT",
      "SHARE LINKS IN THE URL HASH",
      "PDF REPORT"
    ]
  }
];
