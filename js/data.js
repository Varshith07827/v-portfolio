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
    "tags": "Node.js · Express · Playwright · SQLite",
    "blurb": "Turns browser actions into repeatable automation: record a session once, then replay it as a parameterised workflow with scheduling, retries and an audit trail.",
    "stack": [
      "NODE.JS",
      "EXPRESS",
      "PLAYWRIGHT",
      "SOCKET.IO",
      "SQLITE + SEQUELIZE",
      "CODEGEN",
      "PDF EXTRACTION"
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
          "An Express server fronts it with a dashboard, Socket.IO streams run progress live, and SQLite through Sequelize keeps the run history, audit log and analytics — so the platform can be operated rather than just executed."
        ]
      }
    ],
    "now": [
      "SESSION RECORD / REPLAY",
      "GENERATED TEST CASES",
      "PARAMETERISED INPUTS",
      "LIVE RUN STREAMING",
      "RETRIES + FALLBACKS",
      "PDF EXTRACTION + UPLOAD",
      "AUDIT LOGS",
      "RUN ANALYTICS"
    ],
    "gallery": [
      {
        "src": "assets/mantis-console.jpg",
        "alt": "Mantis console: sidebar navigation, summary cards, the SDS automation form and saved product lists",
        "cap": "The Mantis console — batch SDS automation with saved product lists"
      },
      {
        "src": "assets/mantis-schedules.jpg",
        "alt": "Mantis console: active schedules with their product lists and times",
        "cap": "Schedules: recurring runs against a saved product list"
      },
      {
        "src": "assets/mantis-stats.jpg",
        "alt": "Mantis console: system statistics for test cases, downloads, logs and disk usage",
        "cap": "System statistics for the platform"
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
      "SPACY NLP",
      "REGEX",
      "BATCH / CLI",
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
          "The web app is a React and TypeScript frontend (Tailwind, Base UI, Motion) over the Flask JSON API: a risk gauge, in-place highlights you can filter by type, and masked output that updates as you change the style. It is bundled into Flask's static folder, so the app still runs offline with no Node at runtime."
        ]
      }
    ],
    "now": [
      "PDF / DOCX / CSV / XLSX / TXT",
      "REGEX DETECTION",
      "OPTIONAL SPACY PASS",
      "RISK SCORING",
      "AUTOMATED MASKING",
      "BATCH + CLI PROCESSING"
    ],
    "gallery": [
      {
        "src": "assets/pii-scan.jpg",
        "alt": "PII Detector: a sample document with names, dates, email, phone, PAN, Aadhaar and IP highlighted, a critical risk score of 100 and GDPR, DPDP and HIPAA flags",
        "cap": "A scan of fictional sample data — every identifier highlighted, risk scored, compliance flagged"
      },
      {
        "src": "assets/pii-masked.jpg",
        "alt": "PII Detector: the masked output tab, with partial masking applied to the same document",
        "cap": "The same document, masked"
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
  }
];
