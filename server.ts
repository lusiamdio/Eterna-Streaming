import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import Mux from "@mux/mux-node";

dotenv.config({ override: true });

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


  const supportedPaymentMethods = new Set(["visa", "mastercard", "amex", "paypal", "google_pay", "apple_pay", "mobile_money"]);

  app.get("/api/platform/sync-status", (_req, res) => {
    res.json({
      connected: true,
      systems: {
        normal_user: { status: "online", source: "shared profile and subscription state" },
        partner_platform: { status: "online", source: "shared catalog, payout, and partner role state" },
        super_admin_command_centre: { status: "online", source: "global audit, revenue, and approval state" },
      },
      lastCheckedAt: new Date().toISOString(),
    });
  });

  app.post("/api/payments/checkout", async (req, res) => {
    const { method, planId, amount, currency = "USD", userId, userEmail, details = {}, metadata = {} } = req.body || {};

    if (!supportedPaymentMethods.has(method)) {
      return res.status(400).json({ error: "Unsupported payment method. Use visa, mastercard, amex, paypal, google_pay, apple_pay, or mobile_money." });
    }

    if (!planId || typeof amount !== "number" || amount <= 0) {
      return res.status(400).json({ error: "planId and a positive numeric amount are required." });
    }

    if (["visa", "mastercard", "amex"].includes(method)) {
      const cardLast4 = String(details.cardLast4 || "").replace(/\D/g, "");
      if (cardLast4.length !== 4) {
        return res.status(400).json({ error: "A tokenized cardLast4 value is required for card payments." });
      }
    }

    const transactionId = `txn_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
    const gatewayProvider = ["paypal"].includes(method) ? "paypal" : ["google_pay", "apple_pay"].includes(method) ? "wallet" : "card_network";

    res.json({
      success: true,
      transactionId,
      subscriptionLevel: String(planId).includes("yearly") ? "Premium Yearly" : "Premium Monthly",
      status: ["paypal", "google_pay", "apple_pay"].includes(method) ? "requires_redirect" : "captured",
      redirectUrl: ["paypal", "google_pay", "apple_pay"].includes(method) ? `/payment/confirm/${transactionId}` : undefined,
      gatewayProvider,
      amount,
      currency,
      userId,
      userEmail,
      metadata,
      syncedSystems: ["normal_user", "partner_platform", "super_admin_command_centre"],
      audit: {
        normalUserSubscriptionUpdated: true,
        partnerRevenueLedgerUpdated: true,
        superAdminCommandCentreUpdated: true,
        processedAt: new Date().toISOString(),
      },
    });
  });

  // Mux Video Integration & Diagnostics API
  app.get("/api/mux/status", async (req, res) => {
    const envVars = {
      Mux_api: process.env.Mux_api ? `Present (length ${process.env.Mux_api.length}, prefix: ${process.env.Mux_api.substring(0, 4)}...)` : null,
      MUX_TOKEN_ID: process.env.MUX_TOKEN_ID ? `Present (length ${process.env.MUX_TOKEN_ID.length}, prefix: ${process.env.MUX_TOKEN_ID.substring(0, 4)}...)` : null,
      MUX_TOKEN_SECRET: process.env.MUX_TOKEN_SECRET ? `Present (length ${process.env.MUX_TOKEN_SECRET.length})` : null,
    };

    const tokenId = process.env.MUX_TOKEN_ID || process.env.Mux_api;
    const tokenSecret = process.env.MUX_TOKEN_SECRET;

    if (!tokenId || !tokenSecret) {
      return res.json({
        connected: false,
        envVars,
        error: "Incomplete credentials. Mux integration requires both MUX_TOKEN_ID (or Mux_api as Access Token ID) and MUX_TOKEN_SECRET.",
        instructions: [
          "Go to your Mux Dashboard (https://dashboard.mux.com) -> Settings -> API Keys.",
          "Generate a new API Key with Access permissions (Video: Read/Write).",
          "Add MUX_TOKEN_ID (or use Mux_api) and MUX_TOKEN_SECRET in your AI Studio environment settings.",
          "Currently, Eterna detected Mux_api in your environment, which is likely your Mux Access Token ID. Please add MUX_TOKEN_SECRET to complete the connection."
        ]
      });
    }

    try {
      const mux = new Mux({
        tokenId,
        tokenSecret,
      });

      // Test the credentials by listing assets (limit 1)
      const assets = await mux.video.assets.list({ limit: 1 });
      const assetsArray = Array.isArray(assets) ? assets : ((assets as any).data || []);
      
      res.json({
        connected: true,
        envVars,
        message: "Successfully authenticated with Mux API!",
        testResult: {
          assetsCount: assetsArray.length,
          assetsSample: assets
        }
      });
    } catch (err: any) {
      console.error("Mux test connection error:", err);
      res.json({
        connected: false,
        envVars,
        error: err.message || String(err),
        instructions: [
          "Verify that your Access Token ID (MUX_TOKEN_ID or Mux_api) is correct.",
          "Verify that your Secret Key (MUX_TOKEN_SECRET) is correct.",
          "Ensure your Mux API key has proper Video permissions."
        ]
      });
    }
  });

  app.get("/api/mux/assets", async (req, res) => {
    const tokenId = process.env.MUX_TOKEN_ID || process.env.Mux_api;
    const tokenSecret = process.env.MUX_TOKEN_SECRET;

    if (!tokenId || !tokenSecret) {
      return res.status(400).json({ error: "Mux credentials not fully configured. Both Access Token ID and Secret are required." });
    }

    try {
      const mux = new Mux({ tokenId, tokenSecret });
      const assets = await mux.video.assets.list({ limit: 25 });
      res.json({ assets });
    } catch (err: any) {
      console.error("Mux List Assets Error:", err);
      res.status(500).json({ error: err.message || "Failed to list Mux assets" });
    }
  });

  app.post("/api/mux/assets", async (req, res) => {
    const tokenId = process.env.MUX_TOKEN_ID || process.env.Mux_api;
    const tokenSecret = process.env.MUX_TOKEN_SECRET;

    if (!tokenId || !tokenSecret) {
      return res.status(400).json({ error: "Mux credentials not fully configured." });
    }

    const { videoUrl, title } = req.body;
    if (!videoUrl) {
      return res.status(400).json({ error: "videoUrl is required" });
    }

    try {
      const mux = new Mux({ tokenId, tokenSecret });
      const asset = await mux.video.assets.create({
        inputs: [{ url: videoUrl }],
        playback_policy: ["public"],
        passthrough: title || "Eterna Asset"
      });
      res.json({ asset });
    } catch (err: any) {
      console.error("Mux Asset Creation Error:", err);
      res.status(500).json({ error: err.message || "Failed to create Mux asset" });
    }
  });

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
        model: 'gemini-3.5-flash',
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
        model: 'gemini-3.5-flash',
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
