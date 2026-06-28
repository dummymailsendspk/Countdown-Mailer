// aiService.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import config from "./config.js";

const genAI = new GoogleGenerativeAI(config.geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function withRetry(fn, maxAttempts = 4) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      const isOverload =
        err.message.includes("503") ||
        err.message.toLowerCase().includes("service unavailable") ||
        err.message.toLowerCase().includes("high demand");
      if (!isOverload || attempt === maxAttempts) throw err;
      const waitMs = attempt * 5000;
      console.warn(`[aiService] Gemini overloaded (attempt ${attempt}/${maxAttempts}). Retrying in ${waitMs / 1000}s...`);
      await sleep(waitMs);
    }
  }
}

export async function generateCountdownMessage(daysRemaining) {
  const isToday = daysRemaining === 0;
  const context = isToday
    ? "Today is finally the day — the moment has arrived!"
    : `There are exactly ${daysRemaining} day${daysRemaining === 1 ? "" : "s"} left until the special date.`;

  const prompt = `
Write a warm, heartfelt daily countdown message for someone who is very special to me.

Context: ${context}

The message should feel:
- Loving and genuine.
- Simple and easy to read.
- Encouraging and positive.
- Personal, like it's written by someone who truly cares.

Talk about things like:
- How special they are.
- How the world is better because they exist.
- How they deserve happiness and love.
- How their smile can brighten someone's day.
- How excited I am to meet them soon.
- The countdown should feel natural and meaningful.

You MUST respond with EXACTLY these 4 lines, no more, no less:

GREETING: <one warm opening sentence>

BODY: <80-100 words mentioning "${daysRemaining} day${daysRemaining === 1 ? "" : "s"}" naturally>

THOUGHT: <one short meaningful sentence>

CLOSING: <one warm sign-off>

Additionally:
- Include exactly ONE short Tamil phrase (2-6 words) naturally somewhere in the GREETING, BODY, THOUGHT, or CLOSING.
- The Tamil phrase should be written in Tamil script, not English transliteration.
- Use a different Tamil phrase each day.
- Keep it cute, affectionate, and natural.
- Do not force it into every sentence.

Rules:
- Each section must be on its own line and start with its label followed by a colon.
- Mention the countdown naturally in the BODY.
- Use simple English.
- Make every day's message different.
- Don't repeat the same ideas or phrases from previous messages.
- Don't use quotes, markdown, bullet points, or emojis.
- Don't sound robotic or overly poetic.
- Don't use clichés like "you light up my world", "my heart skips a beat", or "meant to be".
- Keep it sincere, warm, and authentic.
- Plain text only.
`;

  const result = await withRetry(() => model.generateContent(prompt));
  const raw = result.response.text().trim();

  console.log("[aiService] Raw response:\n" + raw); // helpful for debugging

  // Parse each labelled line
  const lines = raw.split("\n").map(l => l.trim()).filter(Boolean);

  const extract = (label) => {
    const line = lines.find(l => l.toUpperCase().startsWith(label + ":"));
    return line ? line.slice(label.length + 1).trim() : "";
  };

  const parsed = {
    greeting: extract("GREETING"),
    body:     extract("BODY"),
    thought:  extract("THOUGHT"),
    closing:  extract("CLOSING"),
  };

  // Fallback: if parsing still fails, use the raw text as the body
  if (!parsed.greeting && !parsed.body) {
    console.warn("[aiService] Could not parse sections — using raw text as body.");
    return {
      greeting: "Hey you,",
      body: raw,
      thought: "Every day that passes is one day closer to something worth waiting for.",
      closing: "Counting down, just for you 💌",
    };
  }

  return parsed;
}
