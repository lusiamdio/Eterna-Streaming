import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API endpoints
  app.get("/api/movies/titles/:id/main_actors", async (req, res) => {
    try {
      const apiKey = process.env.RAPIDAPI_KEY || '17f45de316msh2d6f6e091858c7bp19a1e6jsn6c70b05dbc06';
      const response = await fetch(`https://moviesdatabase.p.rapidapi.com/titles/${req.params.id}/main_actors`, {
        headers: {
          'x-rapidapi-host': 'moviesdatabase.p.rapidapi.com',
          'x-rapidapi-key': apiKey
        }
      });
      if (!response.ok) throw new Error(`Status ${response.status}`);
      const data = await response.json();
      res.json(data);
    } catch (error: any) {
      console.error("RapidAPI movies Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/movies/actors/news/:id", async (req, res) => {
    try {
      const apiKey = process.env.RAPIDAPI_KEY || '17f45de316msh2d6f6e091858c7bp19a1e6jsn6c70b05dbc06';
      const response = await fetch(`https://imdb232.p.rapidapi.com/api/actors/get-related-news?limit=25&nm=${req.params.id}`, {
        headers: {
          'x-rapidapi-host': 'imdb232.p.rapidapi.com',
          'x-rapidapi-key': apiKey
        }
      });
      if (!response.ok) throw new Error(`Status ${response.status}`);
      const data = await response.json();
      res.json(data);
    } catch (error: any) {
      console.error("RapidAPI imdb Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/gemini/chat", async (req, res) => {
    try {
      const { prompt } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: prompt,
        config: {
          systemInstruction: 'You are an AI Executive Command Center for a Streaming Operating System called Eterna. Respond in concise, professional business intel and keep responses short, using bullet points where appropriate.',
        }
      });
      
      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate AI response" });
    }
  });

  app.post("/api/gemini/generate-license", async (req, res) => {
    try {
      const { metadata, partnerCountry, saJurisdiction } = req.body;
      if (!metadata) {
        return res.status(400).json({ error: "Missing metadata" });
      }

      const prompt = `Generate a Film Licensing Agreement for the following asset. Make sure to adhere to both South African jurisdiction (${saJurisdiction}) and the Partner's country of operation jurisdiction (${partnerCountry}).

Asset Details:
Title: ${metadata.title}
Rights: ${metadata.rights || 'Exclusive SVOD'}
Duration: ${metadata.duration || '2 Years'}
Offer: ${metadata.offer || '$1,200,000'}

Format the output as a professional legal document in markdown. Include signature blocks and standard legal clauses for indemnification, warranties, and severability. Return ONLY the markdown.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: prompt,
      });
      
      res.json({ agreement: response.text });
    } catch (error: any) {
      console.error("Gemini API Error (License):", error);
      res.status(500).json({ error: error.message || "Failed to generate AI License Agreement" });
    }
  });

  app.post("/api/gemini/recommend", async (req, res) => {
    try {
      const { history, catalog } = req.body;
      if (!history || !catalog) {
        return res.status(400).json({ error: "Missing history or catalog" });
      }

      const prompt = `Analyze the user's viewing history and suggest personalized content from the provided catalog.
      
      User's History and Preferences (IDs and Titles):
      ${JSON.stringify(history)}
      
      Available Catalog:
      ${JSON.stringify(catalog.map((c: any) => ({ id: c.id, title: c.title, genres: c.genres, desc: c.desc })))}
      
      Return ONLY a JSON array of up to 4 integer IDs of the recommended catalog items that are NOT in the user's history. Do not return anything else.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          systemInstruction: "You are an AI recommendation engine. Return a JSON array of integers.",
        }
      });
      
      let idsStr = response.text || "[]";
      let ids = JSON.parse(idsStr);
      
      res.json({ recommendedIds: ids });
    } catch (error: any) {
      console.error("Gemini API Error (Recommend):", error);
      res.status(500).json({ error: error.message || "Failed to generate AI recommendations" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
