import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.RESEND_API_KEY;
if (!apiKey) {
  console.error('Error: RESEND_API_KEY environment variable is not defined.');
  process.exit(1);
}

const resend = new Resend(apiKey);

async function main() {
  console.log('Sending test email via Resend SDK...');
  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.INQUIRY_ALERT_EMAIL || 'agnextechnology@gmail.com',
      subject: 'Hello World',
      html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
    });

    if (error) {
      console.error('Resend returned error:', error);
      process.exit(1);
    }

    console.log('Success! Email sent. ID:', data.id);
  } catch (err) {
    console.error('Execution error:', err.message);
    process.exit(1);
  }
}

main();
