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
      "HTTPX",
      "NETWORKX",
      "OVERPASS API"
    ],
    "links": [],
    "gallery": [
      {
        "src": "assets/digitwin-network.jpeg",
        "alt": "DigiTwin: 3D London buildings with road and water-network overlays and the water simulation panel",
        "cap": "The water network drawn over the OSM road graph, running locally"
      },
      {
        "src": "assets/digitwin-skyline.jpeg",
        "alt": "DigiTwin: extruded OpenStreetMap buildings across the City of London over real terrain",
        "cap": "OSM buildings extruded over real terrain"
      },
      {
        "src": "assets/digitwin-buildings.jpeg",
        "alt": "DigiTwin: a single landmark highlighted among translucent building volumes",
        "cap": "A single structure picked out of the city"
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
          "Most of the engineering is in the middle: caching and falling back to local GeoJSON when Overpass is unreachable, reconciling messy map data into a graph clean enough to simulate, and keeping the Cesium scene in step with simulation state without re-rendering the city."
        ]
      }
    ],
    "now": [
      "3D BUILDINGS + TERRAIN",
      "OSM ROAD + WATER OVERLAY",
      "WATER PRESSURE SIMULATION",
      "PIPE BREAK / REPAIR",
      "BUILDING ISOLATION",
      "ROAD CLOSURE STATE",
      "LOCAL GEOJSON FALLBACK"
    ],
    "next": [
      "ELECTRICITY LAYER",
      "TRAFFIC",
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
        "src": "assets/mantis-sds.jpg",
        "alt": "Mantis dashboard: SDS automation tab with a product list and the start button, under summary counters",
        "cap": "The Mantis dashboard — batch SDS automation"
      },
      {
        "src": "assets/mantis-stats.jpg",
        "alt": "Mantis dashboard: system statistics tab showing test cases, downloads, logs and disk usage",
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
        "src": "assets/winspark-dark.jpg",
        "alt": "WinSpark main window in dark theme: chat list on the left, per-chat automation, webhook URL and activity on the right",
        "cap": "The main window, dark theme — demo contacts"
      },
      {
        "src": "assets/winspark-light.jpg",
        "alt": "WinSpark main window in light theme",
        "cap": "The same window, light theme"
      }
    ]
  },
  {
    "id": "green-ring",
    "num": "04",
    "roman": "IV",
    "name": "Green Ring",
    "title": "WhatsApp automation & messaging infrastructure",
    "short": "A FastAPI bridge over WhatsApp messaging rather than a chat client: authenticated send and media operations, validated configuration, and MongoDB Atlas archival of everything that passes through.",
    "tags": "Python · FastAPI · MongoDB Atlas",
    "blurb": "Messaging infrastructure rather than a WhatsApp client: a FastAPI bridge exposing authenticated send and media operations, with every message archived to MongoDB Atlas.",
    "stack": [
      "PYTHON",
      "FASTAPI",
      "UVICORN",
      "PYDANTIC",
      "HTTPX",
      "PYMONGO",
      "MONGODB ATLAS"
    ],
    "links": [
      {
        "label": "GITHUB ↗",
        "href": "https://github.com/Varshith07827/green-ring"
      }
    ],
    "sections": [
      {
        "h": "WHAT IT IS",
        "body": [
          "An HTTP layer that exposes WhatsApp messaging as ordinary infrastructure — authenticate, send, attach media — so other systems can treat it as a service instead of an app someone has to sit in front of."
        ]
      },
      {
        "h": "WHY IT MATTERS",
        "body": [
          "Messaging is where a lot of operational work actually happens. Once it is behind an API with authentication and a durable record, it can be automated, audited and joined to everything else."
        ]
      },
      {
        "h": "WHAT I BUILT",
        "body": [
          "A FastAPI bridge over an OpenWA session: authenticated endpoints for sending text and uploaded media, httpx for the calls out, and Pydantic settings so configuration is validated at startup rather than discovered at runtime.",
          "Every message passing through is archived to MongoDB Atlas through pymongo, which makes the system debuggable and gives downstream tools something to read. Shell installers register it as a service, so it runs as infrastructure rather than a script someone starts."
        ]
      }
    ],
    "now": [
      "AUTH + SESSION HANDLING",
      "SEND ENDPOINT",
      "MULTIPART MEDIA UPLOAD",
      "MONGODB ATLAS ARCHIVAL",
      "VALIDATED CONFIG",
      "SERVICE INSTALL SCRIPTS",
      "POSTMAN COLLECTION"
    ],
    "gallery": [
      {
        "src": "assets/greenring-docs.jpg",
        "alt": "OpenWA Bridge API reference served by the running FastAPI app, listing send, reply, react, forward, location, contact, poll, edit, delete and star endpoints",
        "cap": "The bridge’s live API reference, served by the running FastAPI app"
      }
    ]
  },
  {
    "id": "pii",
    "num": "05",
    "roman": "V",
    "name": "AI PII Detector",
    "title": "Privacy detection & data masking",
    "short": "Finds sensitive information before it becomes a problem. A hybrid regex and spaCy NLP pipeline reads PDF, DOCX, CSV, XLSX and TXT files, scores risk, then masks what it finds — in batch, from the CLI or the web app.",
    "tags": "Python · Flask · Regex + spaCy",
    "blurb": "Finds sensitive information before it becomes a problem. A hybrid regex and spaCy pipeline reads five file formats, scores risk, and masks what it finds.",
    "stack": [
      "PYTHON",
      "FLASK",
      "REGEX",
      "SPACY NLP",
      "BATCH / CLI",
      "TESTING"
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
          "Batch processing and a CLI make it usable over directories of files, and the detection logic is covered by tests — a pipeline that silently stops matching is worse than none."
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
        "alt": "AI PII Detector: sample text with names, email, PAN, Aadhaar, date of birth and IP address highlighted as detections, with a critical risk assessment",
        "cap": "A scan of fake sample data — detections highlighted and risk scored"
      },
      {
        "src": "assets/pii-masked.jpg",
        "alt": "AI PII Detector: the same text with its sanitised, partially masked output alongside",
        "cap": "The same text, masked"
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
