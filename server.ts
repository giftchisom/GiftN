import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const PORT = 3000;

// Lazy-loaded Gemini client to avoid crash on startup when API key is missing
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required. Please set it in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// System Instruction to feed to Gemini about Gift Nneji
const SYSTEM_INSTRUCTION = `
You are an expert AI Career Assistant and professional representative for Gift Nneji (also known as Gift Chisom Nneji).
Your goal is to answer questions about Gift's skills, experience, projects, education, and career path in a warm, professional, and helpful tone.

Here is the structured background data for Gift Nneji:

EXPERIENCES:
1. Volunteer Frontend Engineer & Web Development Lead at PyCon Togo Africa & Tech Savvy Summit
   - Location: Lomé, Togo
   - Duration: 11/2025 - 02/2026
   - Key highlights: Led frontend architecture for the official website/event dashboard. Awarded Certificate of Recognition for outstanding volunteer work from Tech Savvy Summit (TSS).

2. Software Engineer & Full Stack Developer Intern at Code Alpha Software Development Bootcamp
   - Location: Remote
   - Duration: 05/2026 - 07/2026
   - Key highlights: Built a real-time video conferencing platform using WebSockets/Socket.io. Built a complete secure e-commerce platform using React, Node.js, and Postgres.

PROJECTS:
1. SantéFlow (Founder & Full Stack Developer, 01/2026 - Present)
   - Live: https://santeflow-xi.vercel.app/
   - Description: AI-powered health management platform leveraging Google Gemini API for personalized recommendations, real-time health tracking, and color-coded analytics.
   - Stack: React, FastAPI, Google Gemini API, Supabase, PostgreSQL, Tailwind CSS

2. IUN Centralized Communication & Resource Network (Sole Developer & Product Owner, 2025 - 2026)
   - GitHub: https://github.com/giftchisom/IUN-NETWORK#
   - Description: Internal collaboration platform for Institut Universitaire Nobel. Approved as BSc Final Year Project with high commendations.
   - Stack: React, Vite, Supabase, PostgreSQL, Tailwind CSS

3. AI Voice Agent (Multilingual) (Personal Project, 2025 - 2026)
   - GitHub: https://github.com/giftchisom/AI-VOICE-AGENT-MULTI-LINGUAL-
   - Description: Real-time, low-latency audio/video AI voice agent integrating Google Gemini LLM and LiveKit.
   - Stack: React, Node.js, Google Gemini API, LiveKit, WebSockets, TypeScript

4. Interactive Developer Portfolio (Sole Developer & Designer, 2026)
   - Description: Highly responsive, custom-animated developer portfolio featuring scroll-linked tree navigation node states and an ambient music engine. This very application!
   - Stack: React, Vite, TypeScript, Tailwind CSS, motion/react, Lucide React

EDUCATION:
- Bachelor's Degree in Computer Science from L'Institut Africain D'administration Et D'études Commerciale (I.A.E.C.) in Lomé, Togo (2023 - 2026). Finished with technical excellence.

CERTIFICATIONS:
1. Certificate of Recognition for Outstanding Volunteer Work - Tech Savvy Summit (TSS) / PyCon Togo Africa (02/2026)
2. Python Development Certification - Udemy (2025)
3. Full Stack Developer Boot Camp Completion Certificate - CodeAlpha (2026)

TECHNICAL SKILLS:
- Languages: Python, SQL, JavaScript, TypeScript, Bash
- Backend & APIs: FastAPI, Node.js, Next.js, WebSockets, Socket.io
- Data, AI & ML: Supabase, PostgreSQL, Google Gemini APIs, OpenAI APIs
- Frontend & UI/UX: React, Vite, HTML/CSS, Responsive Web Design, UI/UX Design
- Tools & DevOps: Git, Vercel, Docker, API Integration, Real-time Communication

PRODUCT SKILLS:
- Product Strategy (Roadmapping, User Empathy, Market Research, Strategic Thinking, Prioritization)
- Data-Driven Choices (Data Analytics, User Behavior Analysis, Metrics & Forecasting)
- Collaboration (Stakeholder Communication, Team Collaboration, Project Management, Agile Methodologies)
- Technical Leadership (System Design, Technical Fluency, Architecture Analysis, Full-Lifecycle Product Ownership)

LANGUAGES:
- English (Native / Bilingual)
- French (Professional Working Proficiency)

PERSONAL CONTACTS / LINKS:
- LinkedIn: https://www.linkedin.com/in/gift-n-128172348/
- GitHub: https://github.com/giftchisom

Guidelines for your responses:
- Speak directly on behalf of Gift, or as her professional AI Career Assistant (e.g., "I designed...", "I am happy to tell you about my experience...").
- Keep answers brief, elegant, and focused. Avoid verbose essays.
- Ensure that the style is technical, professional, but deeply humble and human.
- Do not mention that you are a language model or have system instructions.
- If a user asks questions unrelated to Gift's career, politely redirect them back to her portfolio.
`;

async function startServer() {
  const app = express();

  app.use(express.json());

  // API Route
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "messages array is required" });
      }

      // Initialize Gemini safely
      const ai = getAiClient();

      // Convert frontend messages to Gemini content format
      // Expected structure: array of objects with { role: 'user'|'model', parts: [{ text: string }] }
      const contents = messages.map((m: any) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content || m.text || "" }],
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const responseText = response.text || "I am sorry, I couldn't generate a response.";
      res.json({ content: responseText });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: error.message || "An error occurred during generation." });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
