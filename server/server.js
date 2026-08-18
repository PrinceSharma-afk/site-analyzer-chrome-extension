require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

app.get("/", (req, res) => {
  res.send("SiteAnalyzer AI server is running");
});

app.post("/analyze", async (req, res) => {
  try {
    const pageData = req.body;

    const prompt = `
You are an AI website analysis assistant.
Analyze the following website data collected by SiteAnalyzer.

${JSON.stringify(pageData, null, 2)}

Return ONLY valid JSON in exactly this structure:
{
    "overview": "Brief overview of the page.",
    "structure": "Analysis of the page structure and heading hierarchy.",
    "accessibility": "Analysis of accessibility based only on the provided data.",
    "issues": "Potential issues found in the provided data.",
    "suggestions": "Useful suggestions for improving the page."
}

Rules:
- Keep each field concise.
- Do not use Markdown.
- Do not add any fields.
- Do not wrap the JSON in a code block.
- Only make observations supported by the provided data.
- Do not invent information about the page.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt
    });

    const text = response.text.trim();
    const analysis = JSON.parse(text);

    res.json(analysis);
  } catch (error) {
    console.error("GEMINI ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
