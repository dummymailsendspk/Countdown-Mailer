// emailService.js
// Sends a rich HTML email with an inline SVG hero illustration.
// No external images needed — everything renders in any email client.

import nodemailer from "nodemailer";
import config from "./config.js";

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.senderEmail,
    pass: config.gmailAppPassword,
  },
});

function buildHtml(daysRemaining, message) {
  const isToday = daysRemaining === 0;

  // Countdown ring math
  const radius = 46;
  const circ   = Math.round(2 * Math.PI * radius); // ~289
  const pct    = isToday ? 1 : Math.min(1, daysRemaining <= 30 ? (30 - daysRemaining) / 30 : 0.05);
  const filled = Math.round(pct * circ);
  const offset = Math.round(circ * 0.25); // start at 12 o'clock

 const dateStr = new Date().toLocaleDateString("en-IN", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "Asia/Kolkata"
});

  const headerTitle = isToday
    ? "Happy Birthday Jayapriya..!! 😍❤️"
    : `💌 ${daysRemaining} Day${daysRemaining === 1 ? "" : "s"} to Go!!!🥳⌛`;

  const ringLabel = isToday
    ? `<text x="55" y="68" text-anchor="middle" font-size="10" fill="#b07090" font-family="Arial,sans-serif" letter-spacing="1">TODAY!</text>`
    : `<text x="55" y="68" text-anchor="middle" font-size="10" fill="#b07090" font-family="Arial,sans-serif" letter-spacing="1">DAYS TO GO</text>`;

  const ringNumber = isToday
    ? `<text x="55" y="56" text-anchor="middle" font-size="22" fill="#d4679a" font-family="Georgia,serif">&#x1F389;</text>`
    : `<text x="55" y="52" text-anchor="middle" font-size="30" font-weight="700" fill="#d4679a" font-family="Georgia,serif">${daysRemaining}</text>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${daysRemaining} Days to Go 💌</title>
</head>
<body style="margin:0;padding:0;background:#f9f0f5;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f0f5;padding:32px 16px;">
<tr><td align="center">

<table width="520" cellpadding="0" cellspacing="0"
  style="max-width:520px;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #ecd5e3;">

  <!-- ── HERO ILLUSTRATION ── -->
  <tr><td style="background:#fce8f3;padding:0;line-height:0;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding:36px 32px 20px;text-align:center;background:linear-gradient(160deg,#fce8f3 0%,#f3d6ee 55%,#ead4f0 100%);">

        <!--[if !mso]><!-->
        <svg width="100%" viewBox="0 0 480 160" xmlns="http://www.w3.org/2000/svg"
          style="display:block;max-width:480px;margin:0 auto 14px;" role="img" aria-label="Illustration of an envelope surrounded by flowers and hearts under a crescent moon">
          <!-- stars -->
          <circle cx="38" cy="22" r="2"   fill="#e8a0c8" opacity=".7"/>
          <circle cx="442" cy="16" r="1.5" fill="#d48fc0" opacity=".6"/>
          <circle cx="378" cy="38" r="1"   fill="#c97ab5" opacity=".5"/>
          <circle cx="102" cy="48" r="1.5" fill="#e8a0c8" opacity=".6"/>
          <circle cx="460" cy="52" r="2"   fill="#d48fc0" opacity=".5"/>
          <circle cx="20"  cy="70" r="1"   fill="#e8a0c8" opacity=".4"/>
          <circle cx="465" cy="80" r="1.5" fill="#d48fc0" opacity=".4"/>
          <!-- crescent moon -->
          <path d="M432 18 Q448 28 437 44 Q421 36 426 18 Q429 16 432 18Z" fill="#f9d4e8" opacity=".85"/>
          <!-- rolling hills -->
          <ellipse cx="240" cy="188" rx="285" ry="62" fill="#f7e0ef" opacity=".5"/>
          <ellipse cx="55"  cy="184" rx="125" ry="52" fill="#edd5ea" opacity=".4"/>
          <ellipse cx="425" cy="186" rx="115" ry="50" fill="#edd5ea" opacity=".4"/>
          <!-- left tree trunk + foliage -->
          <rect x="54" y="98" width="6" height="42" rx="3" fill="#c97ab5" opacity=".5"/>
          <ellipse cx="57" cy="90" rx="19" ry="23" fill="#e8a0c8" opacity=".45"/>
          <ellipse cx="47" cy="99" rx="13" ry="16" fill="#d48fc0" opacity=".35"/>
          <!-- right tree -->
          <rect x="418" y="104" width="6" height="36" rx="3" fill="#c97ab5" opacity=".5"/>
          <ellipse cx="421" cy="96" rx="17" ry="21" fill="#e8a0c8" opacity=".45"/>
          <ellipse cx="411" cy="104" rx="11" ry="14" fill="#d48fc0" opacity=".35"/>
          <!-- small bush left -->
          <ellipse cx="130" cy="130" rx="22" ry="14" fill="#f0b8d0" opacity=".4"/>
          <!-- small bush right -->
          <ellipse cx="350" cy="132" rx="20" ry="13" fill="#f0b8d0" opacity=".4"/>
          <!-- floating hearts -->
          <path d="M182 54 C182 51,178 47,174 51 C170 47,166 51,166 54 C166 59,174 67,174 67 C174 67,182 59,182 54Z"
                fill="#e07ba0" opacity=".6"/>
          <path d="M320 40 C320 37,316 34,313 37 C310 34,306 37,306 40 C306 44,313 51,313 51 C313 51,320 44,320 40Z"
                fill="#d068b0" opacity=".55"/>
          <path d="M142 72 C142 70,139 68,137 70 C135 68,132 70,132 72 C132 75,137 80,137 80 C137 80,142 75,142 72Z"
                fill="#e07ba0" opacity=".45"/>
          <!-- center envelope body -->
          <rect x="193" y="50" width="94" height="68" rx="9" fill="#ffffff" opacity=".92"/>
          <!-- envelope flap / V line -->
          <path d="M193 60 L240 90 L287 60" stroke="#f0b8d0" stroke-width="2" fill="none"/>
          <!-- envelope bottom fold lines -->
          <path d="M193 118 L222 96" stroke="#f5cfe0" stroke-width="1.5" fill="none"/>
          <path d="M287 118 L258 96" stroke="#f5cfe0" stroke-width="1.5" fill="none"/>
          <!-- small flower left of envelope -->
          <circle cx="176" cy="104" r="5" fill="#f9d0e8"/>
          <ellipse cx="169" cy="100" rx="5" ry="3" fill="#f4b8d4" opacity=".8" transform="rotate(-40 169 100)"/>
          <ellipse cx="183" cy="100" rx="5" ry="3" fill="#f4b8d4" opacity=".8" transform="rotate(40 183 100)"/>
          <ellipse cx="176" cy="96"  rx="5" ry="3" fill="#f4b8d4" opacity=".8"/>
          <ellipse cx="176" cy="112" rx="5" ry="3" fill="#f4b8d4" opacity=".8"/>
          <!-- small flower right of envelope -->
          <circle cx="304" cy="104" r="5" fill="#f9d0e8"/>
          <ellipse cx="297" cy="100" rx="5" ry="3" fill="#f4b8d4" opacity=".8" transform="rotate(-40 297 100)"/>
          <ellipse cx="311" cy="100" rx="5" ry="3" fill="#f4b8d4" opacity=".8" transform="rotate(40 311 100)"/>
          <ellipse cx="304" cy="96"  rx="5" ry="3" fill="#f4b8d4" opacity=".8"/>
          <ellipse cx="304" cy="112" rx="5" ry="3" fill="#f4b8d4" opacity=".8"/>
        </svg>
        <!--<![endif]-->

        <div style="font-size:11px;letter-spacing:3px;color:#a05888;
                    margin-bottom:7px;font-family:Arial,sans-serif;">Hey Jayapriyaa...❤️😍</div>
        <h1 style="margin:0;font-size:22px;color:#6b2d56;font-weight:normal;line-height:1.3;">
          ${headerTitle}
        </h1>
      </td></tr>
    </table>
  </td></tr>

  <!-- ── COUNTDOWN RING ── -->
  <tr><td style="padding:24px 32px 6px;text-align:center;">
    <svg width="110" height="110" viewBox="0 0 110 110" xmlns="http://www.w3.org/2000/svg">
      <circle cx="55" cy="55" r="${radius}" fill="none" stroke="#f2dde8" stroke-width="8"/>
      <circle cx="55" cy="55" r="${radius}" fill="none" stroke="#d4679a" stroke-width="8"
        stroke-dasharray="${filled} ${circ}"
        stroke-dashoffset="${offset}"
        stroke-linecap="round"
        transform="rotate(-90 55 55)"/>
      ${ringNumber}
      ${ringLabel}
    </svg>
  </td></tr>

  <!-- ── THIN DIVIDER ── -->
  <tr><td style="padding:2px 32px 18px;">
    <div style="height:1px;background:linear-gradient(to right,transparent,#f0c0d8,transparent);"></div>
  </td></tr>

  <!-- ── GREETING ── -->
  <tr><td style="padding:0 32px 12px;">
    <p style="margin:0;font-size:19px;color:#c05080;font-style:italic;line-height:1.5;">
      ${message.greeting}
    </p>
  </td></tr>

  <!-- ── BODY ── -->
  <tr><td style="padding:0 32px 20px;">
    <p style="margin:0;font-size:15px;color:#4a3040;line-height:1.95;">
      ${message.body}
    </p>
  </td></tr>

  <!-- ── PULL-QUOTE ── -->
  <tr><td style="padding:0 32px 20px;">
    <div style="border-left:3px solid #f0b8d0;padding:12px 18px;background:#fff7fb;border-radius:0 10px 10px 0;">
      <p style="margin:0;font-size:14px;color:#9e6080;font-style:italic;line-height:1.8;">
        &ldquo;${message.thought}&rdquo;
      </p>
    </div>
  </td></tr>

  <!-- ── CLOSING ── -->
  <tr><td style="padding:0 32px 26px;">
    <p style="margin:0;font-size:15px;color:#4a3040;line-height:1.7;">
      ${message.closing}
    </p>
  </td></tr>

  <!-- ── PETAL ROW ── -->
  <tr><td style="text-align:center;padding:0 0 12px;font-size:18px;letter-spacing:8px;color:#f0b8d0;">
    &#x1F338; &#x1F337; &#x1F338;
  </td></tr>

  <!-- ── FOOTER ── -->
  <tr><td style="background:#fef5fa;border-top:1px solid #f0d0e4;padding:16px 32px;text-align:center;">
    <p style="margin:0;font-size:11px;color:#b090a0;font-family:Arial,sans-serif;line-height:1.8;">
      Sent with care, every single day 💌<br/>
      <span style="opacity:0.7;">${dateStr}</span>
    </p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

function buildText(daysRemaining, message) {
  return [
    message.greeting,
    "",
    message.body,
    "",
    `"${message.thought}"`,
    "",
    message.closing,
    "",
    `— Sent with care · ${daysRemaining} days to go 💌`,
  ].join("\n");
}

export async function sendEmail({ subject, daysRemaining, message }) {
  const info = await transport.sendMail({
    from: `"Your Daily Countdown 💌" <${config.senderEmail}>`,
    to: config.recipientEmail,
    cc: config.senderEmail,
    subject,
    text: buildText(daysRemaining, message),
    html: buildHtml(daysRemaining, message),
  });
  return info.messageId;
}