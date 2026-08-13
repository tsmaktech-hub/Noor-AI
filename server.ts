import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini AI lazily
let aiInstance: GoogleGenAI | null = null;
function getAI() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      aiInstance = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
  }
  return aiInstance;
}

// API Routes
app.post("/api/chat", async (req, res) => {
  try {
    const { question, category } = req.body;

    if (!question || typeof question !== "string") {
      return res.status(400).json({ error: "Question is required." });
    }

    const ai = getAI();

    const systemInstruction = `You are "Islamic AI", an authentic, balanced, respectful, and highly knowledgeable Islamic AI Assistant and scholar companion.
Your mission is to answer questions strictly supported by clear evidences from the Holy Quran and authentic Sunnah/Hadith.

For every user question, return a structured JSON object with the following schema:
{
  "directAnswer": "Clear, concise, and respectful overall explanation addressing the question directly in English.",
  "quranEvidences": [
    {
      "surahName": "e.g., Al-Baqarah",
      "surahNumber": 2,
      "ayahNumber": 255,
      "arabicText": "Arabic Uthmani text with full vowel diacritics",
      "transliteration": "Phonetic transliteration in English letters",
      "englishTranslation": "Accurate English translation (e.g. Sahih International / Clear Quran)",
      "explanation": "Brief contextual explanation or Tafsir point related to the verse."
    }
  ],
  "hadithEvidences": [
    {
      "collection": "e.g., Sahih al-Bukhari / Sahih Muslim / Sunan Abu Dawud",
      "hadithNumber": "e.g., 52 or Book 2, Hadith 14",
      "grade": "e.g., Sahih / Hasan / Muttafaq 'Alayh",
      "arabicText": "Arabic text of the Hadith",
      "englishTranslation": "Accurate English translation of the Prophet's (pbuh) statement/action",
      "lesson": "Key Islamic principle or lesson derived from this Hadith."
    }
  ],
  "scholarlySummary": "A balanced, well-structured summary providing practical advice or jurisprudential consensus/etiquettes.",
  "keyTakeaways": ["Point 1", "Point 2", "Point 3"],
  "closingReflection": "Closing dua or Islamic phrase (e.g., وَاللَّهُ أَعْلَمُ - And Allah knows best)."
}

IMPORTANT INSTRUCTIONS:
1. Always provide authentic Arabic text for BOTH Quran verses and Hadith texts with full diacritical marks (tashkeel).
2. Ensure Quran references list exact Surah name, Surah number, and Ayah number.
3. Ensure Hadith citations mention respected canonical collections (Bukhari, Muslim, Abu Dawud, Tirmidhi, An-Nasa'i, Ibn Majah, Nawawi 40) with authenticity grade.
4. If a question is broad, select the 2-3 most relevant and direct Quranic verses and 1-2 authentic Hadiths.
5. Return ONLY valid JSON matching the specified structure without markdown wrappers if possible, or clean JSON formatting.`;

    if (!ai) {
      // Fallback response if GEMINI_API_KEY is not configured
      return res.json({
        directAnswer: `Thank you for asking: "${question}". Here is Islamic knowledge from authentic texts.`,
        quranEvidences: [
          {
            surahName: "Al-Baqarah",
            surahNumber: 2,
            ayahNumber: 186,
            arabicText: "وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ ۖ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ ۖ فَلْيَسْتَجِيبُوا لِي وَلْيُؤْمِنُوا بِي لَعَلَّهُمْ يَرْشُدُونَ",
            transliteration: "Wa idha sa'alaka 'ibadi 'anni fa'inni qareeb, ujeebu da'wata ad-da'i idha da'an",
            englishTranslation: "And when My servants ask you, [O Muhammad], concerning Me - indeed I am near. I respond to the invocation of the supplicant when he calls upon Me.",
            explanation: "Allah encourages His servants to make Dua directly to Him, assuring us of His closeness and immediate response."
          }
        ],
        hadithEvidences: [
          {
            collection: "Sahih al-Bukhari",
            hadithNumber: "1",
            grade: "Sahih",
            arabicText: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
            englishTranslation: "Actions are judged by intentions, and every person will get what was intended.",
            lesson: "Sincerity (Ikhlas) is the bedrock of all acts of worship and daily living in Islam."
          }
        ],
        scholarlySummary: "In Islam, seeking knowledge with sincere intentions and turning to Allah in worship and daily etiquette brings barakah and peace.",
        keyTakeaways: [
          "Always verify intentions before performing good deeds.",
          "Allah is near and responds to those who call upon Him in prayer.",
          "Seek knowledge from authentic sources of Quran and Sunnah."
        ],
        closingReflection: "وَاللَّهُ أَعْلَمُ (And Allah knows best)"
      });
    }

    const userPrompt = `Question: "${question}" ${category ? `[Category: ${category}]` : ''}\nPlease provide authentic Quranic and Hadith evidences with both Arabic text and English translations in JSON format.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.2,
        responseMimeType: "application/json",
      },
    });

    const responseText = response.text || "";
    try {
      const parsedData = JSON.parse(responseText);
      return res.json(parsedData);
    } catch (parseError) {
      // Clean up json block markers if returned
      const cleanJson = responseText.replace(/^```json/g, "").replace(/```$/g, "").trim();
      const parsedData = JSON.parse(cleanJson);
      return res.json(parsedData);
    }
  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    res.status(500).json({
      error: "An error occurred while retrieving Islamic evidence. Please try again.",
      message: error.message,
    });
  }
});

// Authentication simulated endpoints
app.post("/api/auth/google", (req, res) => {
  res.json({
    success: true,
    user: {
      id: "usr_google_" + Date.now(),
      name: "Muslim Servant",
      email: "user@gmail.com",
      authProvider: "google",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Muslim%20Servant",
    },
  });
});

app.post("/api/auth/login", (req, res) => {
  const { email } = req.body;
  res.json({
    success: true,
    user: {
      id: "usr_" + Date.now(),
      name: email ? email.split("@")[0] : "Learner of Knowledge",
      email: email || "user@islamic.ai",
      authProvider: "email",
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${email || "User"}`,
    },
  });
});

app.post("/api/auth/phone", (req, res) => {
  const { phoneNumber } = req.body;
  res.json({
    success: true,
    user: {
      id: "usr_phone_" + Date.now(),
      name: "Phone User (" + (phoneNumber || "+123456789") + ")",
      phoneNumber: phoneNumber || "+123456789",
      authProvider: "phone",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=PhoneUser",
    },
  });
});

// Vite server setup
async function startServer() {
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
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
