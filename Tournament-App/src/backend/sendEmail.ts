import emailjs from 'emailjs-com';

const SERVICE_ID = 'service_98z4rbg';
const TEMPLATE_ID = 'template_kpqr8y6';
const USER_ID = '_-m7JKw2MP37CM5TC';

export default async function sendEmail(
  to: string,
  { subject, message }: { subject: string; message: string }
): Promise<void> {
  if (typeof window === 'undefined') {
    console.error("❌ emailjs called in server context");
    return;
  }

  try {
    const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
      to_email: to,
      subject,
      message
    }, USER_ID);

    console.log("✅ emailjs response:", response);
  } catch (err) {
    console.error("❌ emailjs failed:", err);
    throw err;
  }
}
