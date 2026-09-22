import nodemailer from "nodemailer";

export interface EmailNotificationPayload {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  service?: string;
  message?: string;
  source?: string;
  details?: Record<string, any>;
}

function getTransporter() {
  const user = process.env.ZOHO_USER || "eva@stellrit.com";
  const pass = process.env.ZOHO_PASS || process.env.ZOHO_APP_PASSWORD || "SEMBLgJhbAes";
  const host = process.env.ZOHO_HOST || "smtp.zoho.com";
  const port = parseInt(process.env.ZOHO_PORT || "465", 10);
  const secure = process.env.ZOHO_SECURE !== "false"; // true for 465, false for 587

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
}

/**
 * Generate a responsive HTML email template for Brown Lawn Care & Cleaning Service
 */
function buildHtmlEmail(payload: EmailNotificationPayload, recipient: string): string {
  const customerName = payload.name || "Website Visitor";
  const customerEmail = payload.email || "Not provided";
  const customerPhone = payload.phone || "Not provided";
  const service = payload.service || "General Inquiry";
  const source = payload.source || "Website Form";
  const message = payload.message || "";
  const submissionTime = new Date().toLocaleString("en-US", {
    timeZone: "America/Chicago",
    dateStyle: "full",
    timeStyle: "short",
  });

  // Extract key-value pairs from details or payload
  const detailsList: { label: string; value: string }[] = [];

  if (payload.name) detailsList.push({ label: "Full Name", value: payload.name });
  if (payload.phone) detailsList.push({ label: "Phone Number", value: payload.phone });
  if (payload.email) detailsList.push({ label: "Email Address", value: payload.email });
  if (payload.service) detailsList.push({ label: "Service Requested", value: payload.service });
  if (payload.source) detailsList.push({ label: "Form Source", value: payload.source });

  if (payload.details && typeof payload.details === "object") {
    for (const [key, val] of Object.entries(payload.details)) {
      if (
        val !== undefined &&
        val !== null &&
        val !== "" &&
        !["name", "email", "phone", "service", "source", "message", "to_email", "access_key"].includes(key.toLowerCase())
      ) {
        const formattedKey = key
          .replace(/_/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase());
        detailsList.push({ label: formattedKey, value: String(val) });
      }
    }
  }

  const rowsHtml = detailsList
    .map(
      (item, idx) => `
      <tr style="background-color: ${idx % 2 === 0 ? "#ffffff" : "#f8fafc"};">
        <td style="padding: 10px 14px; font-weight: 700; color: #1e293b; font-size: 13px; border-bottom: 1px solid #e2e8f0; width: 35%;">${item.label}</td>
        <td style="padding: 10px 14px; color: #334155; font-size: 13px; border-bottom: 1px solid #e2e8f0;">${item.value}</td>
      </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Website Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; color: #0f172a;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #e2e8f0;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%); padding: 28px 24px; text-align: left; border-bottom: 3px solid #D97706;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span style="display: inline-block; background-color: rgba(217, 119, 6, 0.2); border: 1px solid #D97706; color: #F59E0B; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; padding: 4px 10px; border-radius: 20px; margin-bottom: 8px;">
                      ⚡ New Storm Shelter Lead
                    </span>
                    <h1 style="color: #ffffff; font-size: 22px; font-weight: 800; margin: 6px 0 2px 0; letter-spacing: -0.5px;">
                      Southern Storm Shelters LLC
                    </h1>
                    <p style="color: #cbd5e1; font-size: 13px; margin: 0;">
                      Nashville, TN &bull; 615-991-2361 &bull; Delivered to ${recipient}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Summary Alert Box -->
          <tr>
            <td style="padding: 24px 24px 12px 24px;">
              <div style="background-color: #fffbeb; border-left: 4px solid #d97706; padding: 14px 16px; border-radius: 0 8px 8px 0;">
                <p style="margin: 0; font-size: 14px; font-weight: 700; color: #92400e;">
                  ${customerName} submitted a form via <em>${source}</em>
                </p>
                <p style="margin: 4px 0 0 0; font-size: 12px; color: #b45309;">
                  Received on ${submissionTime} (Central Time)
                </p>
              </div>
            </td>
          </tr>

          <!-- Lead Details Table -->
          <tr>
            <td style="padding: 12px 24px;">
              <h2 style="font-size: 15px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: #0f172a; margin: 0 0 12px 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px;">
                📋 Submission Details
              </h2>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; border-collapse: collapse;">
                ${rowsHtml}
              </table>
            </td>
          </tr>

          <!-- Message Box (if present) -->
          ${
            message
              ? `
          <tr>
            <td style="padding: 12px 24px;">
              <h2 style="font-size: 15px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: #0f172a; margin: 0 0 8px 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px;">
                💬 Message / Project Description
              </h2>
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px 16px; font-size: 14px; color: #334155; line-height: 1.6; white-space: pre-wrap;">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
            </td>
          </tr>`
              : ""
          }

          <!-- Quick Action Buttons -->
          <tr>
            <td style="padding: 16px 24px 28px 24px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  ${
                    payload.email
                      ? `
                  <td align="left" style="padding-right: 8px;">
                    <a href="mailto:${payload.email}?subject=Regarding%20Your%20Inquiry%20-%20Southern%20Storm%20Shelters" style="display: inline-block; background-color: #dc2626; color: #ffffff; font-size: 13px; font-weight: 700; text-decoration: none; padding: 10px 18px; border-radius: 8px; text-align: center;">
                      ✉️ Reply to ${payload.name || "Client"}
                    </a>
                  </td>`
                      : ""
                  }
                  ${
                    payload.phone
                      ? `
                  <td align="left">
                    <a href="tel:${payload.phone.replace(/[^0-9+]/g, "")}" style="display: inline-block; background-color: #0f172a; color: #ffffff; font-size: 13px; font-weight: 700; text-decoration: none; padding: 10px 18px; border-radius: 8px; text-align: center;">
                      📞 Call ${payload.phone}
                    </a>
                  </td>`
                      : ""
                  }
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0F172A; padding: 20px 24px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                This notification was sent automatically from <strong style="color: #F59E0B;">Southern Storm Shelters LLC</strong>.
              </p>
              <p style="margin: 4px 0 0 0; font-size: 11px; color: #64748b;">
                Serving Nashville, TN &amp; a 100-Mile Radius &bull; Fully Insured Installation Crews
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Dispatch an email via Zoho SMTP transporter
 */
export async function sendZohoNotification(payload: EmailNotificationPayload): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const toEmail = process.env.NOTIFICATION_TO_EMAIL || "eva@stellrit.com";
  const user = process.env.ZOHO_USER || "eva@stellrit.com";
  const fromName = process.env.EMAIL_FROM_NAME || "Southern Storm Shelters LLC";

  const customerName = payload.name || "Website Lead";
  const source = payload.source || "Website Form";
  const subject = payload.subject || `New Lead from ${customerName} (${source}) - Southern Storm Shelters LLC`;

  const html = buildHtmlEmail(payload, toEmail);
  const text = `
NEW WEBSITE SUBMISSION - SOUTHERN STORM SHELTERS LLC
============================================================
Source: ${source}
Date: ${new Date().toLocaleString()}

Customer Name: ${payload.name || "Not provided"}
Phone: ${payload.phone || "Not provided"}
Email: ${payload.email || "Not provided"}
Service: ${payload.service || "Storm Shelter Inquiry"}

Message:
${payload.message || "No message content"}

------------------------------------------------------------
Southern Storm Shelters LLC
Nashville, TN | 615-991-2361
  `.trim();

  try {
    const transporter = getTransporter();

    const info = await transporter.sendMail({
      from: `"${fromName}" <${user}>`,
      to: toEmail,
      replyTo: payload.email && payload.email.includes("@") ? payload.email : user,
      subject,
      text,
      html,
    });

    console.log(`✅ Zoho SMTP Email sent successfully to ${toEmail}! MessageId: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error("❌ Zoho SMTP Error sending email:", error);

    // Fallback: If port 465 SSL failed, attempt port 587 TLS
    try {
      console.log("🔄 Retrying Zoho email via port 587 STARTTLS...");
      const fallbackTransporter = nodemailer.createTransport({
        host: "smtp.zoho.com",
        port: 587,
        secure: false,
        auth: {
          user,
          pass: process.env.ZOHO_PASS || process.env.ZOHO_APP_PASSWORD || "SEMBLgJhbAes",
        },
        connectionTimeout: 10000,
      });

      const fallbackInfo = await fallbackTransporter.sendMail({
        from: `"${fromName}" <${user}>`,
        to: toEmail,
        replyTo: payload.email && payload.email.includes("@") ? payload.email : user,
        subject,
        text,
        html,
      });

      console.log(`✅ Fallback Zoho SMTP Email sent successfully! MessageId: ${fallbackInfo.messageId}`);
      return { success: true, messageId: fallbackInfo.messageId };
    } catch (fallbackError: any) {
      console.error("❌ Fallback Zoho SMTP also failed:", fallbackError);
      return { success: false, error: fallbackError?.message || error?.message || "Failed to send email via Zoho SMTP" };
    }
  }
}
