// config.js
// Loads .env and exports a validated configuration object.
// Every other module imports from here — no raw process.env calls elsewhere.

import "dotenv/config";

// List every variable the app requires.
const REQUIRED_VARS = [
  "SENDER_EMAIL",
  "GMAIL_APP_PASSWORD",
  "RECIPIENT_EMAIL",
  "TARGET_DATE",
  "GEMINI_API_KEY",
  "TIMEZONE",
];

// Fail fast: if any required variable is missing, log which ones and exit.
const missing = REQUIRED_VARS.filter((key) => !process.env[key]);
if (missing.length > 0) {
  console.error(
    `[config] Missing required environment variables:\n  ${missing.join("\n  ")}\n` +
      `Copy .env.example to .env and fill in the values.`
  );
  process.exit(1);
}

// Parse and validate TARGET_DATE into a real Date object (midnight UTC).
const targetDate = new Date(`${process.env.TARGET_DATE}T00:00:00.000Z`);
if (isNaN(targetDate.getTime())) {
  console.error(
    `[config] TARGET_DATE "${process.env.TARGET_DATE}" is not a valid date. ` +
      `Use YYYY-MM-DD format.`
  );
  process.exit(1);
}

// Export a single frozen config object so nothing can mutate it at runtime.
const config = Object.freeze({
  senderEmail: process.env.SENDER_EMAIL,
  gmailAppPassword: process.env.GMAIL_APP_PASSWORD,
  recipientEmail: process.env.RECIPIENT_EMAIL,
  targetDate,                          // JS Date object, midnight UTC
  geminiApiKey: process.env.GEMINI_API_KEY,
  timezone: process.env.TIMEZONE,
});

export default config;
