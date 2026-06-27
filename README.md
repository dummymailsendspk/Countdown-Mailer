# Countdown Mailer

A beginner-friendly Node.js app that sends you (or someone you care about) a daily AI-generated countdown email every day at midnight — until a target date arrives.

---

## Features

- **Daily scheduling** via `node-cron` — fires at midnight in your timezone.
- **AI-generated messages** via Google Gemini — every email is unique and warm.
- **Gmail delivery** via Nodemailer + App Password — no OAuth complexity.
- **Clean project structure** — one file per concern, easy to read and extend.
- **Graceful stop** — once the target date passes, no more emails are sent.

---

## Project Structure

```
countdown-mailer/
├── index.js          # Entry point — starts the scheduler
├── scheduler.js      # Cron job logic and daily task orchestration
├── emailService.js   # Nodemailer transport and sendEmail()
├── aiService.js      # Gemini API client and prompt
├── config.js         # Loads and validates .env variables
├── .env.example      # Template — copy to .env and fill in your values
├── package.json
└── README.md
```

---

## Prerequisites

| Requirement | Notes |
|---|---|
| Node.js ≥ 18 | Uses ES Modules (`import`/`export`) |
| A Gmail account | Free |
| A Gmail App Password | See instructions below |
| A Gemini API key | Free tier available |

---

## Setup

### 1. Clone / download the project

```bash
git clone <your-repo-url>
cd countdown-mailer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create your `.env` file

```bash
cp .env.example .env
```

Open `.env` and fill in every value:

```env
SENDER_EMAIL=you@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
RECIPIENT_EMAIL=friend@example.com
TARGET_DATE=2025-12-31
GEMINI_API_KEY=your_gemini_api_key_here
TIMEZONE=Asia/Kolkata
```

### 4. Generate a Gmail App Password

1. Visit [Google Account Security]
2. Enable **2-Step Verification** if you haven't already.
3. Go to [App Passwords](https://myaccount.google.com/apppasswords).
4. Select **Mail** → **Other (custom name)** → name it "Countdown Mailer".
5. Copy the 16-character password into `GMAIL_APP_PASSWORD` (spaces are fine).

### 5. Get a Gemini API key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Click **Create API Key**.
3. Paste it into `GEMINI_API_KEY`.

---

## Running the App

```bash
node index.js
```

By default (`RUN_NOW = true` in `index.js`) the app:

1. Starts the midnight cron job.
2. **Immediately** sends one test email so you can verify everything works.

You should see output like:

```
============================================================
  Countdown Mailer — starting up
============================================================
[scheduler] Cron job registered — will fire daily at midnight (Asia/Kolkata).
[scheduler] Target date: 2025-12-31
[scheduler] Days remaining today: 187

[index] RUN_NOW=true — sending a test email immediately...

[2025-06-27T00:00:00.000Z] ▶ Running daily task...
[scheduler] Generating AI message for 187 days remaining...
[scheduler] AI message generated (94 words).
[scheduler] ✓ Email sent successfully. Message-ID: <abc123@smtp.gmail.com>
```

---

## Disabling the Immediate Test Email

Once you've confirmed your credentials work, open `index.js` and set:

```js
const RUN_NOW = false;
```

The app will then only send emails at midnight.

---

## Running in the Background (Production)

Use a process manager so the app survives reboots and restarts on crash:

```bash
npm install -g pm2
pm2 start index.js --name countdown-mailer
pm2 save
pm2 startup   # follow the printed command to enable auto-start on boot
```

---

## Timezone Reference

Use an [IANA timezone string](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones):

| Location | Timezone string |
|---|---|
| New York | `America/New_York` |
| London | `Europe/London` |
| Mumbai | `Asia/Kolkata` |
| Tokyo | `Asia/Tokyo` |
| UTC | `UTC` |

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `Missing required environment variables` | Check your `.env` file exists and all keys are filled in. |
| `Invalid login` from Nodemailer | Confirm you're using an App Password, not your Gmail login password. |
| `GEMINI_API_KEY` errors | Check the key is correct and has not exceeded free-tier quota. |
| Emails arriving at the wrong time | Double-check your `TIMEZONE` value is a valid IANA string. |
| Email lands in spam | Add the sender to your contacts, or use a custom domain sender. |
