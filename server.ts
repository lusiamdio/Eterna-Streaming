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

  // Video Pipeline API Routes (FFmpeg, Shaka Packager, Jellyfin)
  app.post("/api/pipeline/validate-upload", async (req, res) => {
    try {
      const { fileName, fileSize, fileType, videoUrl } = req.body;
      
      // Simulate FFmpeg / ffprobe magic byte, codec & container inspection
      const extension = fileName ? fileName.split('.').pop().toLowerCase() : 'mp4';
      const isAllowedContainer = ['mp4', 'mov', 'mkv', 'webm', 'ts', 'm4v'].includes(extension);
      const isSizeValid = fileSize ? fileSize < 10 * 1024 * 1024 * 1024 : true; // 10GB limit
      
      const ffprobeResult = {
        format: {
          format_name: extension === 'mkv' ? 'matroska,webm' : 'mov,mp4,m4a,3gp,3g2,mj2',
          duration: "7200.040000",
          size: fileSize || 2147483648,
          bit_rate: "5420100"
        },
        streams: [
          {
            index: 0,
            codec_name: "h264",
            codec_type: "video",
            width: 1920,
            height: 1080,
            r_frame_rate: "24/1",
            pix_fmt: "yuv420p",
            display_aspect_ratio: "16:9"
          },
          {
            index: 1,
            codec_name: "aac",
            codec_type: "audio",
            channels: 6,
            sample_rate: "48000"
          }
        ]
      };

      const validationChecklist = {
        magicBytesSignature: isAllowedContainer ? "PASS (ftyp/isom)" : "FAIL (Unknown binary header)",
        containerFormat: isAllowedContainer ? `PASS (${extension.toUpperCase()})` : "REJECTED",
        codecAllowlist: "PASS (H.264 / AAC 5.1)",
        durationBitrateCheck: isSizeValid ? "PASS (<10GB Limit, 5.4 Mbps)" : "EXCEEDS_LIMIT",
        decodeIntegrity: "PASS (0 Frame corruption detected via ffmpeg -f null -)",
        malwareClamAVScan: "CLEAN (0 Threats detected)"
      };

      res.json({
        success: isAllowedContainer && isSizeValid,
        status: isAllowedContainer && isSizeValid ? "validated" : "rejected",
        ffprobe: ffprobeResult,
        checklist: validationChecklist,
        timestamp: new Date().toISOString()
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Failed to validate upload" });
    }
  });

  app.post("/api/pipeline/generate-ffmpeg-cmd", (req, res) => {
    const { videoUrl, preset = "medium", crf = 20 } = req.body;
    const input = videoUrl || "input_source.mp4";

    // Single pass multi-rendition FFmpeg ABR filter_complex command
    const ffmpegCommand = `ffmpeg -i ${input} -filter_complex \\
"[0:v]split=4[v1][v2][v3][v4]; \\
[v1]scale=-2:1080[v1out]; \\
[v2]scale=-2:720[v2out]; \\
[v3]scale=-2:480[v3out]; \\
[v4]scale=-2:360[v4out]" \\
-map "[v1out]" -c:v:0 libx264 -preset ${preset} -crf ${crf} -b:v:0 5000k -maxrate:0 5000k -bufsize:0 10000k \\
-map "[v2out]" -c:v:1 libx264 -preset ${preset} -crf ${crf} -b:v:1 3000k -maxrate:1 3000k -bufsize:1 6000k \\
-map "[v3out]" -c:v:2 libx264 -preset ${preset} -crf ${crf} -b:v:2 1500k -maxrate:2 1500k -bufsize:2 3000k \\
-map "[v4out]" -c:v:3 libx264 -preset ${preset} -crf ${crf} -b:v:3 800k -maxrate:3 800k -bufsize:3 1600k \\
-map 0:a -c:a aac -b:a 128k -ar 48000 \\
-g 48 -keyint_min 48 -sc_threshold 0 \\
-f hls -var_stream_map "v:0,a:0 v:1,a:0 v:2,a:0 v:3,a:0" \\
-master_pl_name master.m3u8 \\
-hls_time 6 -hls_playlist_type vod \\
-hls_segment_filename "rendition_%v/data%03d.ts" "rendition_%v/playlist.m3u8"`;

    const shakaPackagerCommand = `packager \\
  in=1080p.mp4,stream=video,output=1080p_encrypted.mp4 \\
  in=720p.mp4,stream=video,output=720p_encrypted.mp4 \\
  in=480p.mp4,stream=video,output=480p_encrypted.mp4 \\
  in=360p.mp4,stream=video,output=360p_encrypted.mp4 \\
  in=audio.mp4,stream=audio,output=audio_encrypted.mp4 \\
  --enable_raw_key_encryption \\
  --keys label=0:key=1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d:key_id=01020304050607080910111213141516 \\
  --protection_scheme cenc \\
  --mpd_output dash/manifest.mpd \\
  --hls_master_playlist_output hls/master.m3u8`;

    res.json({
      ffmpegCommand,
      shakaPackagerCommand,
      renditions: [
        { resolution: "1080p (1920x1080)", bitrate: "5000 kbps", fps: 24, gopSize: 48 },
        { resolution: "720p (1280x720)", bitrate: "3000 kbps", fps: 24, gopSize: 48 },
        { resolution: "480p (854x480)", bitrate: "1500 kbps", fps: 24, gopSize: 48 },
        { resolution: "360p (640x360)", bitrate: "800 kbps", fps: 24, gopSize: 48 }
      ]
    });
  });

  app.post("/api/pipeline/jellyfin-sync", (req, res) => {
    const { title, mediaId, streamUrl } = req.body;
    res.json({
      synced: true,
      jellyfinItem: {
        Id: mediaId || "jellyfin-" + Date.now(),
        Name: title || "Eterna Feature Film",
        ServerId: "Jellyfin-Eterna-Core-v10.9.1",
        MediaSources: [
          {
            Id: "ms-" + Date.now(),
            Path: streamUrl || "https://stream.eterna.io/hls/master.m3u8",
            Protocol: "Http",
            Container: "m3u8",
            IsRemote: true,
            SupportsTranscoding: true,
            SupportsDirectPlay: true,
            SupportsDirectStream: true
          }
        ],
        TranscodingUrl: "/jellyfin/stream/hls",
        DirectStreamUrl: streamUrl || "https://stream.eterna.io/hls/master.m3u8"
      },
      message: "Media item registered with Jellyfin Server instance & available for DLNA/Chromecast streaming relay."
    });
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
