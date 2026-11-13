export const profile = {
  name: "Sameera Jayakodi",
  first: "Sameera",
  last: "Jayakodi",
  role: "Software Engineer",
  tagline: "Full-stack & AI automation",
  location: "Homagama, Sri Lanka",
  timezone: "Asia/Colombo",
  email: "sameerajayakodi456@gmail.com",
  github: "https://github.com/sameerajayakodi",
  linkedin: "https://www.linkedin.com/in/sameera-jayakodi-6a3a81226/",
  cv: `${import.meta.env.BASE_URL}Sameera_Jayakodi_CV.pdf`,
  intro:
    "I design, build and ship production software end-to-end — from requirements and system design to APIs, interfaces, deployment and support. Right now I'm deep in applied AI: OAuth-secured MCP servers, LLM chatbots and n8n automation.",
  about: [
    "I'm a full-stack software engineer at Adeona Technologies, where I've spent the last 1.5 years shipping fleet management, consent & compliance, HR, e-learning, bidding and real-estate platforms used by real teams every day.",
    "I work across React, Next.js, Node.js and Spring Boot on relational and NoSQL databases, and deploy with Docker on AWS and Vercel. I care about the unglamorous parts too — access control, data protection, tests and the support that comes after launch.",
    "I graduated with First Class Honours in Computer Science from NSBM Green University (GPA 3.79 / 4.00).",
  ],
};

export const stats = [
  { value: 1.5, suffix: " yrs", label: "Shipping production software", decimals: 1 },
  { value: 5, suffix: "+", label: "Production systems delivered", decimals: 0 },
  { value: 30, suffix: "+", label: "REST API endpoints designed", decimals: 0 },
  { value: 3.79, suffix: "", label: "First Class GPA / 4.00", decimals: 2 },
];

export type Role = { title: string; period: string };

export const experience = {
  company: "Adeona Technologies (Pvt) Ltd",
  place: "Sri Lanka",
  period: "Aug 2025 — Present",
  roles: [
    { title: "Software Engineer (Trainee)", period: "Feb 2026 — Present" },
    { title: "Full-Stack Developer Intern", period: "Aug 2025 — Feb 2026" },
  ] as Role[],
  highlights: [
    {
      k: "Delivery",
      v: "Delivered full-stack features end-to-end across five+ production systems — fleet management, consent & compliance, e-learning, HR and bidding — each used by teams of 15–20.",
    },
    {
      k: "APIs & cloud",
      v: "Designed and built 30+ REST endpoints in Node.js/Express and Spring Boot over MySQL, SQL Server and MongoDB; containerised with Docker and deployed to AWS (EC2, S3).",
    },
    {
      k: "Security",
      v: "Implemented authentication and role-based access control across 4 user roles, plus PDPA-aligned handling of HR records for 100+ employees.",
    },
    {
      k: "AI automation",
      v: "Shipped OAuth-secured MCP servers for ADA Digital Reach and Dialog eSMS, an n8n-powered WhatsApp CRM and a drag-and-drop builder for Meta chatbot flows.",
    },
    {
      k: "Team",
      v: "Worked in a 6-person agile team on 2-week sprints with QA, design and product; prototyped internal automation and computer-vision proofs of concept (OpenCV, n8n).",
    },
  ],
};

export type Category = "Production" | "AI & Automation" | "Personal";

export type Project = {
  id: string;
  title: string;
  kicker: string;
  summary: string;
  points: string[];
  stack: string[];
  category: Category;
  year: string;
  art: "gps" | "consent" | "estate" | "mcp" | "whatsapp" | "hr" | "torva" | "hirelink";
  image?: string;
  live?: string;
  repo?: string;
  context: string;
};

const base = import.meta.env.BASE_URL;

export const projects: Project[] = [
  {
    id: "mcp",
    title: "MCP servers for messaging",
    kicker: "OAuth-secured Model Context Protocol",
    summary:
      "MCP servers for ADA Digital Reach and Dialog eSMS that let AI assistants send and manage messaging campaigns safely.",
    points: [
      "OAuth-secured tool access so AI agents act on behalf of the right account",
      "Exposes messaging operations as typed MCP tools for AI-driven workflows",
    ],
    stack: ["Node.js", "Express", "Prisma", "MCP", "OAuth"],
    category: "AI & Automation",
    year: "2026",
    art: "mcp",
    context: "Adeona Technologies",
  },
  {
    id: "estate",
    title: "Real-estate sales platform",
    kicker: "Website + admin console",
    summary:
      "A real-estate developer's public sales site and the console their team runs it from.",
    points: [
      "Unit inventory, leads, reservations & sales, customer records and CMS",
      "A 360° virtual-tour editor with a floor-plan minimap",
      "Covered by Playwright end-to-end tests",
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Playwright"],
    category: "Production",
    year: "2026",
    art: "estate",
    context: "Adeona Technologies · client work",
  },
  {
    id: "flow",
    title: "FlowCraft no-code builder",
    kicker: "Drag-and-drop chatbot flows",
    summary:
      "A visual builder that lets non-technical users design Meta chatbot flows, with live analytics for every flow.",
    points: [
      "Drag-and-drop canvas for WhatsApp, Messenger and Instagram flows",
      "Dashboard for sessions, completion rate and drop-off points",
    ],
    stack: ["React", "TypeScript", "React Flow", "Tailwind"],
    category: "AI & Automation",
    year: "2026",
    art: "mcp",
    image: `${base}work/flow-builder.jpg`,
    live: "https://visual-flow-builder.vercel.app",
    repo: "https://github.com/sameerajayakodi/visual-flow-builder",
    context: "Adeona Technologies",
  },
  {
    id: "whatsapp",
    title: "WhatsApp CRM",
    kicker: "n8n-powered lead automation",
    summary:
      "A WhatsApp CRM that captures leads from conversations and automates the follow-ups.",
    points: [
      "n8n workflows turn incoming chats into qualified CRM leads",
      "Automated, scheduled follow-ups so no lead goes cold",
    ],
    stack: ["n8n", "Express", "Prisma", "React", "TypeScript"],
    category: "AI & Automation",
    year: "2026",
    art: "whatsapp",
    context: "Adeona Technologies",
  },
  {
    id: "gps",
    title: "Vehicle Management System",
    kicker: "Real-time fleet tracking",
    summary:
      "The real-time GPS tracking and live vehicle-status module of a fleet management platform.",
    points: [
      "Live positions and vehicle status streamed to the dashboard",
      "Role-based access across operational teams",
    ],
    stack: ["React", "TypeScript", "Express", "Prisma"],
    category: "Production",
    year: "2025",
    art: "gps",
    context: "Adeona Technologies",
  },
  {
    id: "adgree",
    title: "AdGree",
    kicker: "Consent management platform",
    summary:
      "A PDPA-aligned platform for audit-ready consent collection and storage.",
    points: [
      "Captures, versions and stores consent records for audit",
      "Built around Sri Lanka's Personal Data Protection Act",
    ],
    stack: ["React", "TypeScript", "Express", "MongoDB"],
    category: "Production",
    year: "2025",
    art: "consent",
    context: "Adeona Technologies",
  },
  {
    id: "hr",
    title: "Adeona HR Management",
    kicker: "Leave, timesheets & attendance",
    summary:
      "The leave, timesheet and attendance modules of the company's HR system, covering 100+ employees.",
    points: [
      "Approval workflows across 4 user roles",
      "PDPA-aligned handling of personal HR data",
    ],
    stack: ["Node.js", "Express", "Prisma", "Swagger"],
    category: "Production",
    year: "2025",
    art: "hr",
    context: "Adeona Technologies",
  },
  {
    id: "govimart",
    title: "GoviMart",
    kicker: "Full-stack grocery delivery",
    summary:
      "A grocery delivery platform with separate customer and admin dashboards for catalogue, cart, checkout and orders.",
    points: [
      "Stripe payments end-to-end; Cloudinary/Multer for product media",
      "JWT-based role access for customer and admin areas",
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "Stripe", "Tailwind"],
    category: "Personal",
    year: "2025",
    art: "estate",
    image: `${base}work/govimart.jpg`,
    live: "https://govimart-client.vercel.app",
    repo: "https://github.com/sameerajayakodi/govimart-client",
    context: "Personal project",
  },
  {
    id: "hirelink",
    title: "HireLink",
    kicker: "Jobs & skills platform with AI",
    summary:
      "A multi-role platform for job seekers, employers and trainers, with a Gemini assistant for job matching and skill pathways.",
    points: [
      "Role-specific dashboards and permissions on a Spring Boot + MySQL API",
      "Gemini chatbot that guides users to jobs and learning paths; deployed on AWS",
    ],
    stack: ["React", "Spring Boot", "MySQL", "AWS", "Gemini"],
    category: "Personal",
    year: "2025",
    art: "hirelink",
    repo: "https://github.com/sameerajayakodi/hirelink-server",
    context: "Personal project",
  },
  {
    id: "torva",
    title: "Torva",
    kicker: "Real-world treasure hunt game",
    summary:
      "A cross-platform mobile game built around GPS treasure hunts and puzzles.",
    points: [
      "Multiplayer, leaderboards, user roles and real-time notifications",
      "Firebase Auth, Firestore and Cloud Functions with Google Maps",
    ],
    stack: ["Flutter", "Firebase", "Google Maps"],
    category: "Personal",
    year: "2024",
    art: "torva",
    repo: "https://github.com/sameerajayakodi/Torva",
    context: "Personal project",
  },
  {
    id: "techtoolhub",
    title: "TechToolHub",
    kicker: "Independent tech reviews",
    summary:
      "A fast, SEO-first review site for AI, developer and productivity tools — written, built and run solo.",
    points: [
      "Next.js + MDX content with site-wide search",
      "Side-by-side comparisons and editor's picks",
    ],
    stack: ["Next.js", "Tailwind", "MDX"],
    category: "Personal",
    year: "2026",
    art: "consent",
    image: `${base}work/techtoolhub.jpg`,
    live: "https://www.techtoolhub.online",
    repo: "https://github.com/sameerajayakodi/techtoolhub",
    context: "Side project",
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["JavaScript", "TypeScript", "Java", "Python", "SQL", "Dart"] },
  { group: "Frontend & Mobile", items: ["React", "Next.js", "React Native", "Flutter", "Tailwind CSS", "HTML/CSS", "Figma"] },
  { group: "Backend", items: ["Node.js", "Express", "Spring Boot", "ASP.NET", "PHP", "REST API design"] },
  { group: "Databases", items: ["MySQL", "PostgreSQL", "SQL Server", "MongoDB", "Firestore"] },
  { group: "Cloud & DevOps", items: ["AWS EC2 / S3", "Docker", "Linux", "Vercel", "Git", "GitHub / GitLab", "CI/CD"] },
  { group: "AI & Automation", items: ["MCP servers", "Gemini API", "LLM chatbots", "n8n", "OpenCV"] },
  { group: "Practices", items: ["System design", "JWT · OAuth · RBAC", "Playwright E2E", "Agile / Scrum", "Requirements"] },
];

export const marquee = [
  "React", "Next.js", "TypeScript", "Node.js", "Spring Boot", "PostgreSQL", "MongoDB",
  "Docker", "AWS", "MCP", "n8n", "Gemini", "Flutter", "Playwright", "Tailwind",
];

export const education = {
  degree: "BSc (Hons) Computer Science",
  honours: "First Class Honours",
  school: "NSBM Green University",
  period: "2022 — 2026",
  gpa: "3.79 / 4.00",
  coursework: [
    "Software Engineering", "Data Structures & Algorithms", "Database Systems",
    "Artificial Intelligence", "Cloud Computing", "Cybersecurity",
  ],
};

export const training = [
  { title: "Advanced Full-Stack Developer Program", org: "Academy of Computer Programming and Training (ACPT)", year: "2024" },
  { title: "Short courses: Python, Angular, Node.js", org: "University of Moratuwa", year: "2022 — 2023" },
];

export const leadership = [
  { title: "Executive Committee Member", org: "CSSL GenZ Chapter — NSBM", year: "2024 — 2025" },
  { title: "Event Organiser", org: "Nexora — NSBM CS & Data Science circle", year: "" },
  { title: "Volunteer", org: "National IT Conference (NITC) Sri Lanka", year: "" },
];
