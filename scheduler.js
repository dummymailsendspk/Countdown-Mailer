// scheduler.js
// Orchestrates the daily task: days → AI → email → log.
// When run via GitHub Actions, node-cron is not needed — index.js calls
// runDailyTask() directly and the process exits. The cron schedule lives
// in the GitHub Actions workflow file instead.

import config from "./config.js";
import { generateCountdownMessage } from "./aiService.js";
import { sendEmail } from "./emailService.js";

function calculateDaysRemaining() {
  const now = new Date();
  const todayMidnight = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((config.targetDate.getTime() - todayMidnight.getTime()) / msPerDay);
}

export async function runDailyTask() {
  const timestamp = new Date().toISOString();
  console.log(`\n[${timestamp}] ▶ Running daily task...`);

  // 1. Days remaining
  const daysRemaining = calculateDaysRemaining();

  // 2. Stop if past target date
  if (daysRemaining < 0) {
    console.log(`[scheduler] Target date has passed (${Math.abs(daysRemaining)} day(s) ago). No email sent.`);
    return;
  }

  // 3. Generate AI message (structured object)
  let message;
  try {
    console.log(`[scheduler] Generating AI message for ${daysRemaining} days remaining...`);
    message = await generateCountdownMessage(daysRemaining);
    console.log(`[scheduler] AI message generated.`);
    console.log(`  Greeting : ${message.greeting}`);
    console.log(`  Thought  : ${message.thought}`);
  } catch (err) {
    console.error(`[scheduler] ✗ AI generation failed: ${err.message}`);
    return;
  }

  // 4. Subject line
  const subject = daysRemaining === 0
    ? "🎉 Today's finally the day!"
    : `💌 ${daysRemaining} Day${daysRemaining === 1 ? "" : "s"} to Go!`;

  // 5. Send email
  try {
    const messageId = await sendEmail({ subject, daysRemaining, message });
    console.log(`[scheduler] ✓ Email sent! Message-ID: ${messageId}`);
  } catch (err) {
    console.error(`[scheduler] ✗ Email send failed: ${err.message}`);
  }
}