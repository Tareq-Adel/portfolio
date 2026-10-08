interface ContactMessage {
  name: string;
  email: string;
  inquiryType: 'job' | 'freelance' | 'other';
  message: string;
  locale: 'en' | 'ar';
}

const RESEND_API_URL = 'https://api.resend.com/emails';

/**
 * Sends the owner a notification email via Resend (FR-5.3). Falls back to
 * logging instead of sending when RESEND_API_KEY isn't configured, so local
 * dev works without requiring a real account.
 */
export async function sendContactEmail(message: ContactMessage): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.log(
      '[contact] RESEND_API_KEY/CONTACT_TO_EMAIL/CONTACT_FROM_EMAIL not set -- would send:',
      message,
    );
    return;
  }

  const response = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: message.email,
      subject: `Portfolio contact: ${message.inquiryType} from ${message.name}`,
      text: `From: ${message.name} <${message.email}>\nType: ${message.inquiryType}\nLocale: ${message.locale}\n\n${message.message}`,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    // The message is already accepted (201 to the visitor) per the
    // documented order in openapi.yaml -- a failed send is logged for
    // retry, not surfaced as an error to whoever submitted the form.
    console.error(`[contact] Resend send failed: ${response.status} ${body}`);
  }
}
