import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const SERVICES = [
  "AI Website Development",
  "Full Stack Web Development",
  "UI/UX Design & Branding",
  "SEO & Google Ranking",
  "Digital Marketing & Ads",
  "AI Agents & Automation",
  "App Development",
  "Website Maintenance & Support",
  "Business Growth Solutions",
  "Other / General Enquiry",
];

export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({ configured: Boolean(process.env.RESEND_API_KEY) });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, company, address, subject, services, message } =
    req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "Required fields missing." });
  }

  const selectedServices = Array.isArray(services)
    ? services.join(", ")
    : services || "Not specified";

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width"/>
</head>
<body style="margin:0;padding:0;background:#0A1633;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A1633;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#111D40;border-radius:12px;overflow:hidden;border:1px solid rgba(14,165,233,0.2);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#0A1633 0%,#1E3A8A 100%);padding:32px 40px;border-bottom:2px solid #0EA5E9;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <span style="font-size:22px;font-weight:700;color:#fff;letter-spacing:0.5px;">NK Digital Craft</span>
                  <span style="display:inline-block;width:7px;height:7px;background:#0EA5E9;border-radius:1px;margin-left:4px;vertical-align:middle;"></span>
                </td>
                <td align="right">
                  <span style="background:rgba(14,165,233,0.15);border:1px solid rgba(14,165,233,0.4);color:#0EA5E9;font-size:11px;font-weight:600;padding:4px 12px;border-radius:20px;letter-spacing:1px;">NEW ENQUIRY</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 40px;">
            <p style="margin:0 0 24px;font-size:16px;color:rgba(255,255,255,0.7);">
              A new contact form submission has arrived on your portfolio.
            </p>

            <!-- Caller info card -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(14,165,233,0.06);border:1px solid rgba(14,165,233,0.18);border-radius:8px;margin-bottom:24px;">
              <tr><td style="padding:20px 24px;">
                <p style="margin:0 0 4px;font-size:11px;color:#0EA5E9;letter-spacing:1.5px;font-weight:600;">FROM</p>
                <p style="margin:0 0 16px;font-size:20px;font-weight:700;color:#fff;">${name}</p>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td width="50%" style="padding-bottom:10px;">
                      <p style="margin:0 0 2px;font-size:11px;color:rgba(255,255,255,0.4);letter-spacing:1px;">EMAIL</p>
                      <p style="margin:0;font-size:14px;color:#38BDF8;">${email}</p>
                    </td>
                    <td width="50%" style="padding-bottom:10px;">
                      <p style="margin:0 0 2px;font-size:11px;color:rgba(255,255,255,0.4);letter-spacing:1px;">PHONE</p>
                      <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.75);">${phone || "Not provided"}</p>
                    </td>
                  </tr>
                  <tr>
                    <td width="50%">
                      <p style="margin:0 0 2px;font-size:11px;color:rgba(255,255,255,0.4);letter-spacing:1px;">COMPANY</p>
                      <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.75);">${company || "Not provided"}</p>
                    </td>
                    <td width="50%">
                      <p style="margin:0 0 2px;font-size:11px;color:rgba(255,255,255,0.4);letter-spacing:1px;">ADDRESS</p>
                      <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.75);">${address || "Not provided"}</p>
                    </td>
                  </tr>
                </table>
              </td></tr>
            </table>

            <!-- Subject -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(30,58,138,0.3);border-left:3px solid #0EA5E9;border-radius:0 6px 6px 0;margin-bottom:20px;">
              <tr><td style="padding:14px 20px;">
                <p style="margin:0 0 3px;font-size:11px;color:#0EA5E9;letter-spacing:1.5px;font-weight:600;">SUBJECT</p>
                <p style="margin:0;font-size:15px;color:#fff;font-weight:600;">${subject}</p>
              </td></tr>
            </table>

            <!-- Services -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
              <tr><td style="padding:14px 20px;background:rgba(255,255,255,0.04);border-radius:6px;">
                <p style="margin:0 0 8px;font-size:11px;color:#0EA5E9;letter-spacing:1.5px;font-weight:600;">INTERESTED IN</p>
                <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.8);">${selectedServices}</p>
              </td></tr>
            </table>

            <!-- Message -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
              <tr><td style="padding:18px 20px;background:rgba(255,255,255,0.04);border-radius:6px;border:1px solid rgba(255,255,255,0.08);">
                <p style="margin:0 0 10px;font-size:11px;color:#0EA5E9;letter-spacing:1.5px;font-weight:600;">MESSAGE</p>
                <p style="margin:0;font-size:15px;color:rgba(255,255,255,0.85);line-height:1.7;white-space:pre-wrap;">${message}</p>
              </td></tr>
            </table>

            <!-- Reply CTA -->
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:#0EA5E9;border-radius:6px;padding:0;">
                  <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" style="display:inline-block;padding:14px 28px;color:#fff;font-size:14px;font-weight:600;text-decoration:none;letter-spacing:0.5px;">
                    Reply to ${name} &rarr;
                  </a>
                </td>
                <td width="12"></td>
                <td style="background:rgba(14,165,233,0.1);border:1px solid rgba(14,165,233,0.3);border-radius:6px;padding:0;">
                  <a href="https://wa.me/918260999311" style="display:inline-block;padding:14px 24px;color:#0EA5E9;font-size:14px;font-weight:600;text-decoration:none;">
                    Open WhatsApp
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:rgba(0,0,0,0.3);padding:20px 40px;border-top:1px solid rgba(255,255,255,0.06);">
            <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.3);text-align:center;">
              NK Digital Craft · Puri, Odisha, India · nkbusinessout@gmail.com
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const text = `New enquiry from ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Company: ${company || "Not provided"}
Address: ${address || "Not provided"}
Subject: ${subject}
Services: ${selectedServices}

Message:
${message}`;

  try {
    const { data, error } = await resend.emails.send({
      from: "NK Digital Craft <onboarding@resend.dev>",
      to: ["nkbusinessout@gmail.com"],
      replyTo: email,
      subject: `[Portfolio Enquiry] ${subject} — ${name}`,
      html,
      text,
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(500).json({ error: "Failed to send email." });
    }

    return res.status(200).json({ success: true, id: data?.id });
  } catch (err) {
    console.error("API error:", err);
    return res.status(500).json({ error: "Server error." });
  }
}
