// index.js
// Entry point — runs the daily task once and exits.
// For local testing: node index.js
// In production: GitHub Actions calls this on schedule.

import { runDailyTask } from "./scheduler.js";

console.log("=".repeat(55));
console.log("  Countdown Mailer");
console.log("=".repeat(55));

runDailyTask()
  .then(() => {
    console.log("\n[index] Done. Exiting.");
    process.exit(0);
  })
  .catch((err) => {
    console.error(`\n[index] Fatal error: ${err.message}`);
    process.exit(1);
  });