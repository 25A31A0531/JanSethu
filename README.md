# JANSETU — Citizen Government Service Navigator

> **“From ‘What do I need?’ to ‘What do I do next?’”**  
> AI-powered, rule-grounded civic service navigator for Indian citizens. Converts complex everyday life events into personalized, dependency-aware action plans and verified government scheme recommendations.

---

## 🌟 Overview

Navigating government welfare schemes and public services in India can often be overwhelming due to fragmented departments, conflicting eligibility rules, and complex jurisdictional criteria across 28 States and 8 Union Territories.

**JANSETU** bridges this gap by acting as an intelligent, transparent civic co-pilot. Instead of requiring citizens to know specific administrative schemes beforehand, JANSETU takes their natural situation (e.g., *"My crops were destroyed by cyclone floods"*, *"I need funds for higher education in another state"*, *"Starting a small shop"*) and generates a deterministic, verified roadmap.

### Key Architectural Pillars

- **13 Official Indian Languages Supported Natively**:
  Full native interface and chatbot response support for English (`en`), Telugu (`te`), Hindi (`hi`), Tamil (`ta`), Kannada (`kn`), Malayalam (`ml`), Marathi (`mr`), Bengali (`bn`), Gujarati (`gu`), Punjabi (`pa`), Odia (`od`), Assamese (`as`), and Urdu (`ur`).
- **Independent 6-Location Jurisdiction Engine**:
  Independent evaluation of **Residence State**, **Study State**, **Employment State**, **Property State**, **Agricultural Land State**, and **Business Enterprise State** without silent fallbacks. Supports interstate citizens (e.g., resident in Tamil Nadu, studying in Andhra Pradesh, farm parcel in Telangana).
- **Nationwide Coverage (Central + 28 States + 8 Union Territories)**:
  Curated and verified database of central and state-specific welfare schemes across all 36 Indian regions.
- **Official Government Source Verification**:
  All active schemes are strictly verified against official government portals (`.gov.in`, `.nic.in`, `mudra.org.in`, `jansamarth.in`) with direct links separated into *Official Information* and *Apply Online*.
- **Client-Side Privacy First**:
  Zero mandatory cloud storage or server-side telemetry. Citizen profiles, document checklist statuses, and active roadmaps remain encrypted in the citizen's browser local storage.
- **Dependency-Aware Roadmaps & Document Readiness**:
  Sequences prerequisites (e.g., obtaining an Income Certificate before applying for fee reimbursement) and calculates certificate readiness gauges.

---

## 🛠 Required Software & Environment

Before setting up and running JANSETU, ensure your environment meets these requirements:

| Requirement | Recommended Version | Note |
| :--- | :--- | :--- |
| **Node.js** | `v18.18.0` or higher (`v20.x` or `v22.x` recommended) | Download from [nodejs.org](https://nodejs.org/) |
| **Package Manager** | `npm` (v9+ or v10+), `pnpm`, or `yarn` | Included with Node.js |
| **Web Browser** | Modern Chromium (Chrome/Edge/Brave), Firefox, or Safari | Requires ES2020 & LocalStorage support |
| **Operating System** | Windows, macOS, or Linux | Cross-platform compatible |

---

## 🚀 Installation Instructions

### 1. Extract or Clone Project
Extract the `JANSETU_Final.zip` archive or navigate into your project folder:

```bash
cd JANSETU_Final
```

### 2. Install Dependencies
Install all required production and development dependencies using `npm`:

```bash
npm install
```

*(Alternatively, you may use `pnpm install` or `yarn install` if preferred).*

---

## 💻 Running the Application Locally

### Development Server
Launch the local Next.js development server:

```bash
npm run dev
```

Once started, open your browser and navigate to:
```
http://localhost:3000
```

The development server supports hot module replacement (Fast Refresh), allowing immediate updates upon editing.

---

## 📦 Creating a Production Build

To build and run the optimized production version of JANSETU:

### 1. Build the Application
```bash
npm run build
```
This compiles the TypeScript code, bundles CSS via Tailwind CSS, and optimizes static pages and server components.

### 2. Start the Production Server
```bash
npm start
```
The optimized production server will be running at `http://localhost:3000`.

---

## 🧭 Application Routes & Feature Tour

| Route | Feature Description |
| :--- | :--- |
| `/` | **Landing Page / Hero**: Natural language prompt input, platform capabilities, quick access to 7 pre-configured prototype demonstrations. |
| `/ask` | **Ask JANSETU (AI Assistant)**: Grounded conversational civic navigator supporting 13 languages, family context switching, and real-time eligibility explanations. |
| `/discover` | **Discover Government Services**: Search and filter across Central schemes and all 36 Indian States/UTs by keyword, category, jurisdiction level, or state domicile. |
| `/journey` | **Citizen Journey Tracker**: View saved personalized action plans, progress percentages, and launch roadmaps. |
| `/journey/[id]` | **Action Plan Roadmap**: Interactive step-by-step timeline, dependency graph, document prerequisites, and "Why Was This Not Shown?" exclusion inspector. |
| `/documents` | **Document Readiness Vault**: Client-side encrypted certificate checklist with readiness percentage gauges and simulated verification. |
| `/profile` | **Citizen Profile & Family Context**: Configure independent residence and interstate study/employment/property/agriculture/business locations, social category, and family members. |
| `/learn` | **Civic Literacy & Process Guide**: Step-by-step explainer articles on income certificates, DigiLocker, caste validation, DBT bank seeding, and direct government links. |

---

## 📂 Project Structure

```text
JANSETU_Final/
├── app/                        # Next.js App Router routes & pages
│   ├── ask/                    # Conversational chatbot interface
│   ├── discover/               # Service repository search & filters
│   ├── documents/              # Document readiness center
│   ├── journey/                # Personalized action plan & roadmaps
│   ├── learn/                  # Civic literacy guides
│   ├── profile/                # Citizen profile & interstate manager
│   ├── start/                  # Situation analyzer & clarification form
│   ├── layout.tsx              # Root application layout & global language wrapper
│   └── page.tsx                # Homepage hero entrypoint
├── components/                 # React UI components
│   ├── ui/                     # Modular interface components (cards, navbar, modals)
│   └── LanguageProvider.tsx    # Unified 13-language state provider
├── lib/                        # Core civic intelligence engines & data
│   ├── demoData/               # Central & 36 States/UTs verified scheme database
│   ├── government/             # Live official source verification service
│   ├── i18n/                   # Multilingual dictionaries & detection (13 languages)
│   ├── rulesEngine/            # Intent classifier & candidate retrieval
│   ├── eligibilityEngine.ts    # Income, age, category, & qualification evaluator
│   ├── jurisdictionEngine.ts   # Interstate 6-location jurisdiction matcher
│   ├── storage.ts              # LocalStorage persistence helpers
│   └── types.ts                # Strict TypeScript interfaces & schemas
├── public/                     # Static assets (favicons, logos)
├── next.config.ts              # Next.js runtime configuration
├── tailwind.config.ts          # Tailwind CSS styling configuration
├── tsconfig.json               # TypeScript compiler configuration
├── package.json                # Project dependencies & build scripts
└── README.md                   # Complete documentation and setup guide
```

---

## 🛡 Disclaimer

JANSETU is an independent prototype designed for civic service navigation assistance. It is **not** an official government portal of the Government of India or any State Government. All statutory welfare sanctions and formal submissions must be completed on designated official ministry and state portals (`.gov.in` / `.nic.in`).

---

## 📄 License

MIT License — free for educational, demonstration, and non-commercial public research use.
