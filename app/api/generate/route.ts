import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import fs from 'fs';
import path from 'path';

const CSV_PATH = path.join(process.cwd(), 'data', 'proposals.csv');

function logToCSV(user: string, jobDescription: string, proposal: string, ip: string) {
  const timestamp = new Date().toISOString();
  const escape = (s: string) => `"${s.replace(/"/g, '""').replace(/\n/g, '\\n')}"`;

  // Create CSV with headers if it doesn't exist
  if (!fs.existsSync(CSV_PATH)) {
    fs.writeFileSync(CSV_PATH, 'timestamp,user,ip,job_description,proposal\n');
  }

  const row = `${timestamp},${escape(user)},${escape(ip)},${escape(jobDescription)},${escape(proposal)}\n`;
  fs.appendFileSync(CSV_PATH, row);
}

const PROFILES: Record<string, { name: string; profile: string }> = {
  muddasir: {
    name: 'Muhammad Muddasir',
    profile: `Muhammad Muddasir Rafique — Full Stack Developer & AI/ML Expert
Location: Lahore, Pakistan

KEY STATS: $50K+ earned on Upwork | 100% Job Success Rate | 2,538+ hours worked | 6+ years experience | 57+ projects delivered

TECH STACK:
Frontend: React, Next.js, Angular, TypeScript, Tailwind CSS, Three.js
Mobile: React Native, Expo
Backend: Node.js, Express, NestJS, HapiJS, FastAPI, Golang
Databases: PostgreSQL, PostGIS, MongoDB, MySQL, DynamoDB, Redis
AI/ML: Python, TensorFlow, scikit-learn, LangChain, OpenAI, Groq, NLP, RAG
GIS: Mapbox, Leaflet, OSRM, Cesium, GeoJSON, Sentinel-2, NDVI
Cloud: AWS (Lambda, S3, SQS, SAM, DynamoDB, Aurora), Vercel
Voice AI: Pipecat, Twilio, Whisper STT, Cartesia TTS
Auth: Clerk, NextAuth | Other: Docker, Stripe, Cloudinary, Shopify Liquid

KEY PROJECTS:

GIS/MAPS:
- Farmdar: Agricultural GIS with Mapbox, NDVI satellite imagery, PostGIS (current employer)
- Billboards America: B2B SaaS, 400K+ billboards, Mapbox clustering, 14 states, Next.js/PostGIS/Redis
- BC Land Parcel Intelligence: 10,000+ parcels, 3D terrain, AI investment summaries, Claude API
- EnergyWake: Geospatial energy analytics, NestJS, Mapbox GL, WebSockets
- Indoor Wayfinding: Turn-by-turn indoor navigation, multi-floor routing, Angular/Mapbox
- Texas Communities Real Estate: Interactive SVG map, dynamic filters

AI/VOICE/ML:
- Kombea/ProtoCall: Enterprise AI call center, 9 clients, 3,000+ calls/day, React/Python/AWS Lambda
- Hotel Voice Bot: AI phone agent, ~1.2s latency, Pipecat/Twilio/Groq, multi-hotel
- DocuBot: AI documentation SaaS, RAG with ChromaDB, multi-tenant, Stripe billing
- ResellAI: AI-powered reselling OS, photo to listing automation
- Anylytics.ai: Natural language to charts, conversational analytics
- RealifyAI: AI image generation, diffusion models
- Arco: AI music lesson assistant, App Store live

SAAS/WEB:
- CloudPOS: Cloud POS, offline-first, multi-location, Next.js/NestJS/WebSockets
- VeriHealth: Healthcare credentialing, Canadian market, React/NestJS/PostgreSQL
- Diversalytics: Pay equity compliance for Spain
- Nearo: Student hostel platform (nearo.pk), 2,500+ hostels, AI chat, HMS
- Boostify: Sales intelligence, AI-powered ecommerce analytics

MOBILE:
- TreeQuest: Gamified plant ID app, both app stores, React Native/NestJS
- Pawdopt: Pet care & adoption, React Native/Firebase
- Nearo Mobile: Expo/React Native, full hostel discovery with owner HMS

MOBILE:
- DietLens: AI nutrition app, food recognition, React Native
- Rishta Pakistan: Matrimony app with PostGIS location matching, React Native
- Paradox Members Lounge: Membership app for Florida cafe, React Native, Stripe
- Stock App: Inventory & sales manager, React Native/Node.js
- Delivery App: React Native/TypeScript/Node.js/MongoDB
- Mobile Field Data Collector: React Native/TypeScript/SQLite/Mapbox
- E-Commerce Mobile App: React Native/TypeScript/Node.js/PostgreSQL

CONSTRUCTION/OTHER:
- Precise Builder: Construction PM, Kanban boards, React/TypeScript/PostgreSQL
- CrewFlow: Union labor staffing, crew scheduling, payroll compliance
- Proline 3D Configurator: Angular, Three.js, WebGL
- CelloBello: Cello education, WordPress/Elasticsearch, 200+ hours of lessons
- Nishat Husain: Luxury Shopify, custom Liquid theme
- QCMS: Quranic research tool, Elasticsearch
- Solar Sizing Calculator: Angular, French market
- Dentapp: Dental practice management, European clinics, Next.js/AWS S3
- Techgoat: Marketing site, Next.js, 95+ Lighthouse scores
- SOMOS: Social platform for Latin American expats, React/Mapbox/WebSockets
- Chefo: Course marketplace for chefs, Angular/Node.js/MySQL
- Wish My Day: Celebration and booking platform, Next.js/MongoDB
- Optevo: AI-native hybrid workspace, Node.js/gRPC/PostgreSQL/.NET

AI/DATA SCIENCE:
- NLP Text Classifier: Python/scikit-learn/FastAPI/React
- Sentiment Analysis Engine: Python/LangChain/FastAPI/PostgreSQL
- Supervised ML Regression Model: Python/scikit-learn/Pandas/NumPy
- LLM Chatbot Integration: Python/LangChain/OpenAI/React

PLATFORMS/DASHBOARDS:
- LMS/Campus Management System: Angular/Node.js/MongoDB — students, courses, grades, exams
- QuickFixa: Turborepo monorepo services platform
- Traffic Management App: React Native + Node.js backend + admin panel
- Uniscope: University platform, Next.js/Prisma
- Field Boundary Manager: React/Mapbox/PostGIS/Node.js (live)
- Location-Based Services API: Node.js/PostGIS/TypeScript/Docker
- Design System & Component Kit: React/TypeScript/Storybook
- Admin Analytics Dashboard: React/TypeScript/Node.js/PostgreSQL
- HR Management System: Angular/TypeScript/Node.js/MySQL
- Inventory & Supply Chain App: React/Node.js/MySQL/TypeScript
- Event Booking Platform: React/Node.js/PostgreSQL/TypeScript
- Real Estate Listing Platform: React/Node.js/PostgreSQL/Mapbox
- SaaS Web Tool Suite: React/Node.js/PostgreSQL/TypeScript — 1,346 hours billed

EDUCATION/ACADEMIC:
- MS Data Science at PUCIT (thesis: Sugarcane Pest Prediction using Satellite Remote Sensing + GNN)
- 18 Coursera certifications (Angular, AWS, Generative AI)
- AI lecture: "AI — From Brain Cells to Farming Fields" (3-hour lecture)
- Zero to Developer course: Programming fundamentals to React/Angular`,
  },
  ahtisham: {
    name: 'Ahtisham Manzoor',
    profile: `Ahtisham Manzoor — AI & GIS Full-Stack Developer
Location: Muridke, Pakistan | GitHub: https://github.com/ahtisham-ali663 | LinkedIn: https://linkedin.com/in/ahtisham-ali-0b7369186

UPWORK STATS: 100% Job Success | Top Rated Plus | 8 jobs completed | 1,197 hours worked | 7+ years experience | 5.0 rating across all jobs | $30/hr rate

EDUCATION: BS Computer Science, Superior University (2015-2019)

UPWORK CLIENT REVIEWS:
- "top-tier developer who delivers exceptional value"
- "solved lots of different challenges and showed lots of commitment. Great dev, only commits quality work"
- "Absolutely excellent experience... quickly understood the codebase, identified hidden issues"
- "did an excellent job on our Real Estate Marketplace project"

TECH STACK:
Frontend: React, Next.js, Angular, Vue.js, Nuxt.js, TypeScript, Tailwind CSS, Material UI, Ant Design, Shadcn/UI, Three.js, D3.js
Mobile: React Native, Expo, Capacitor
Backend: Node.js, NestJS, Express, Golang, GraphQL, WebSockets, Microservices
Databases: PostgreSQL, PostGIS, MongoDB, MySQL, Redis, Elasticsearch, Firebase
AI/ML: OpenAI, Anthropic Claude, Gemini, LangChain, LangGraph, RAG, Pinecone, Weaviate, ChromaDB, MCP, AI Agents
GIS: Mapbox GL JS, MapLibre GL JS, CesiumJS, Leaflet, PostGIS, Vector Tiles, MBTiles, Satellite Imagery
Cloud: AWS, GCP, Azure, Docker, Kubernetes, GitHub Actions, Vercel, Railway
Voice AI: Pipecat, Twilio, Groq Whisper, Cartesia TTS
Auth: JWT, OAuth, RBAC, NextAuth, Clerk

KEY PROJECTS:

GIS/MAPS:
- Billboards America: AI-Powered Billboard Advertising Marketplace, 400K+ billboards, Mapbox clustering, 14 states, Next.js/PostGIS/Redis
- Farmdar/Crop Intelligence Platform: Agricultural GIS with Mapbox, NDVI satellite imagery, PostGIS, precision agriculture
- Demographic Overlay for Mapbox: Interactive demographic data layers on Mapbox maps
- BC Land Parcel Intelligence: 10,000+ parcels, 3D terrain, AI investment summaries
- EnergyWake: Geospatial energy analytics, NestJS, Mapbox GL, WebSockets
- Indoor Wayfinding: Turn-by-turn indoor navigation, multi-floor routing
- Texas Communities Real Estate: Interactive SVG map, dynamic filters
- Soccer-Fitness Map: Interactive Mapbox GL mapping for sports facilities
- Real Estate Marketplace with Mapbox: MERN stack, MongoDB geolocation queries
- Web-Based Real-Time Location Tracking System

AI/VOICE/ML:
- Hotel Voice Bot: AI phone agent, ~1.2s latency, Pipecat/Twilio/Groq, multi-hotel, real-time booking
- Kombea/ProtoCall: Enterprise AI call center, 9 clients, 3,000+ calls/day, React/Python/AWS Lambda
- DocuBot: AI documentation SaaS, RAG with ChromaDB, multi-tenant, Stripe billing
- ResellAI: AI-powered reselling OS, photo to listing automation
- AI Document Processing & Workflow Automation Platform
- AI Customer Support Assistant: OpenAI, LangChain, Pinecone
- AI-Powered Chrome Extension
- Anylytics.ai: Natural language to charts, conversational analytics
- RealifyAI: AI image generation, diffusion models
- Arco: AI music lesson assistant, App Store live
- Simulation Software Specification Document

SAAS/WEB:
- CloudPOS: Cloud POS, offline-first, multi-location, Next.js/NestJS/WebSockets
- VeriHealth: Healthcare credentialing, Canadian market, React/NestJS/PostgreSQL
- Diversalytics: Pay equity compliance for Spain
- Boostify: Sales intelligence, AI-powered ecommerce analytics
- YupUp: Local deals discovery app, React/Ant Design/NestJS/MongoDB
- Anova.ai: Marketer-focused AI platform, React/TypeScript/Generative AI
- Frontier: Fiber optic internet plans, Next.js/Material UI/Storybook/SSR
- Viral Solution: COVID-19 testing/vaccination scheduling, React/Node.js/MySQL

MOBILE:
- TreeQuest: Gamified plant ID app, both app stores, React Native/NestJS
- MAS EM Systems: Maintenance management, Vue 3/Capacitor cross-platform
- Pawdopt: Pet care & adoption, React Native/Firebase

CONSTRUCTION/OTHER:
- Enterprise Construction Management Platform: Angular/Node.js/PostgreSQL
- Precise Builder: Construction PM, Kanban boards, React/TypeScript/PostgreSQL
- CrewFlow: Union labor staffing, crew scheduling, payroll compliance
- Proline 3D Configurator: Angular, Three.js, WebGL
- SaaS Admin Dashboard with Real-Time Analytics`,
  },
};

function buildSystemPrompt(profile: string, signOffName: string) {
  return `You are an expert Upwork proposal writer for ${signOffName}. Your job is to write personalized, winning proposals.

ZERO TOLERANCE ANTI-HALLUCINATION POLICY:
You MUST ONLY reference projects, technologies, and results that are EXPLICITLY listed in the developer profile below.
- If a project is listed as "Kombea/ProtoCall: Enterprise AI call center, 9 clients, 3,000+ calls/day, React/Python/AWS Lambda" then you can ONLY mention those exact details. You CANNOT add "Stable Diffusion", "video models", "marketing clips", or ANY detail not written in the profile.
- If the job requires experience you do NOT have in the profile (e.g., n8n, video generation, Stable Diffusion), do NOT pretend you have it. Instead, mention the closest related experience and transferable skills.
- NEVER invent percentages like "boosted by 30%" or "reduced by 40%" unless the profile explicitly states that number.
- NEVER add technologies or features to a project that are not listed in the profile.
- If caught between lying and being honest, ALWAYS be honest. A proposal that honestly says "I haven't built this exact thing but I have closely related experience" wins more than a fabricated claim that falls apart in the interview.

DEVELOPER PROFILE:
${profile}

RULES:
1. Keep cover letter under 200 words — clients don't read long proposals
2. NEVER use generic phrases like "I am excited", "I am passionate", "I would love to"
3. ABSOLUTELY NO markdown formatting — no asterisks, no hashes, no code blocks, no link syntax. Write 100% plain text. No bold text anywhere. No section headers with colons like "Relevant work:" — just flow naturally
4. Start with the client's problem, not about yourself
5. CLIENT NAME DETECTION (CRITICAL): Before writing ANYTHING, scan the ENTIRE input for the client's first name. Check these locations:
   - Freelancer reviews: "[Name] was a great client", "working with [Name]", "[Name] is excellent"
   - Client responses: "Thanks [Name]", signed "[Name]"
   - Job description: "I'm [Name]", "My name is [Name]"
   - Any mention of a person's first name in context of being the client
   For example: "Michael was a great client" = client name is Michael. "Jim is a wonderful client" = client name is Jim.
   If found, the VERY FIRST LINE must be "Hi [Name]," — if not found, start with "Hi,"
6. Mention 2-3 SPECIFIC project names from the profile that are closest to the job. Only state facts exactly as written in the profile. Do not add details.
7. Include a brief technical approach (3-5 bullets using - dashes) — this is YOUR plan for their project, not fake past results
8. End with a specific question about their project
9. Do NOT add stats like "$50K earned" or "100% JSS" or "2,538 hours" — the client can see these on the Upwork profile already
10. Do NOT include portfolio link, GitHub link, or any external URLs — Upwork may flag proposals with external links. Only include them if the client specifically asks for portfolio/GitHub in the job post
11. Sign off with just: ${signOffName}
12. Match the client's tone — formal for enterprise, casual for startups
13. NEVER list all skills — only mention what's relevant to THIS job
14. Write like a senior developer, not a salesperson
15. IMPORTANT: If the job post contains a hidden test word/phrase (like "start your proposal with X" or "include the word Y" or "write Z at the beginning"), you MUST detect and include that exact word/phrase as instructed by the client

OUTPUT FORMAT:
You MUST follow this EXACT structure:

1. Cover letter MUST start with "Hi [ClientName]," if name was found, otherwise start with "Hi,"
2. Cover letter MUST end with a blank line then the full sign-off name on its own line: ${signOffName}
3. NEVER truncate or shorten the sign-off name

[greeting line]
[cover letter body]
[closing question]

${signOffName}

---SCREENING QUESTIONS---

[If the job has screening questions, answer each one separately:]
Q1: [question text]
A: [your answer — concise, specific, referencing real projects]

Q2: [question text]
A: [your answer]

[If no screening questions found, just output the cover letter without the separator]`;
}

export async function POST(request: Request) {
  const { jobDescription, user = 'muddasir' } = await request.json();

  if (!jobDescription?.trim()) {
    return NextResponse.json({ error: 'Job description is required' }, { status: 400 });
  }

  const userData = PROFILES[user];
  if (!userData) {
    return NextResponse.json({ error: `Unknown user: ${user}` }, { status: 400 });
  }

  // Extract client name from job description before sending to AI
  const namePatterns = [
    /(\w+) was a great client/i,
    /(\w+) was a wonderful client/i,
    /(\w+) is a wonderful client/i,
    /(\w+) is a great client/i,
    /(\w+) is an excellent client/i,
    /great working with (\w+)/i,
    /working with (\w+)[,!.]/i,
    /thanks (\w+)[,!.]/i,
    /thank you (\w+)[,!.]/i,
    /Hi (\w+)[,!.]/i,
    /my name is (\w+)/i,
    /I'm (\w+)[,. ]/i,
    /(?:client|employer|poster)[:\s]+(\w+)/i,
  ];

  let clientName = '';
  for (const pattern of namePatterns) {
    const match = jobDescription.match(pattern);
    if (match && match[1] && match[1].length > 2 && match[1][0] === match[1][0].toUpperCase()) {
      clientName = match[1];
      break;
    }
  }

  const systemPrompt = buildSystemPrompt(userData.profile, userData.name);
  const nameInstruction = clientName
    ? `\n\nDETECTED CLIENT NAME: "${clientName}". You MUST start the proposal with "Hi ${clientName},"`
    : '\n\nNo client name detected. Start with "Hi,"';

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'openai/gpt-oss-120b',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Write a personalized Upwork proposal for this job:${nameInstruction}\n\n${jobDescription}` },
      ],
      max_tokens: 4000,
      temperature: 0.7,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    return NextResponse.json({ error: `Groq API error: ${error}` }, { status: 500 });
  }

  const data = await res.json();
  const proposal = data.choices?.[0]?.message?.content || 'Failed to generate proposal';

  // Log to CSV for future AI retraining
  try {
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';
    logToCSV(user, jobDescription, proposal, ip);
  } catch {
    // Non-critical — don't fail the request if logging fails
  }

  return NextResponse.json({ proposal });
}
