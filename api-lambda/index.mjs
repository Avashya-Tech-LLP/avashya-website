import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const sesClient = new SESClient({ region: process.env.SES_AWS_REGION || 'us-east-1' });

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitizeInput(input) {
  return input.trim().replace(/[<>]/g, '').substring(0, 5000);
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

export const handler = async (event) => {
  if (event.requestContext?.http?.method === 'OPTIONS' || event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: CORS_HEADERS, body: '' };
  }

  try {
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    const { name, email, company, message } = body;

    if (!email || !company) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: 'Email and company are required.' }),
      };
    }

    if (!EMAIL_REGEX.test(email)) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: 'Please provide a valid email address.' }),
      };
    }

    const safeName = sanitizeInput(name || '');
    const safeEmail = sanitizeInput(email);
    const safeCompany = sanitizeInput(company);
    const safeMessage = sanitizeInput(message || '');

    const ip = event.requestContext?.http?.sourceIp || event.requestContext?.identity?.sourceIp || 'unknown';
    const timestamp = new Date().toISOString();
    const isDemo = !safeName && safeMessage.startsWith('Team size:');

    const subject = isDemo
      ? `Demo Request - ${safeCompany} (${safeEmail})`
      : `New Contact - ${safeName} (${safeCompany})`;

    const emailBody = isDemo
      ? `New Demo Request\n\nEmail: ${safeEmail}\nCompany: ${safeCompany}\n${safeMessage}\n\n---\nSubmitted at: ${timestamp}\nSource: Avashya Website - Book a Call\nIP Address: ${ip}`
      : `New Contact Form Submission\n\nFrom: ${safeName}\nEmail: ${safeEmail}\nCompany: ${safeCompany}\n\nMessage:\n${safeMessage}\n\n---\nSubmitted at: ${timestamp}\nSource: Avashya Website Contact Form\nIP Address: ${ip}`;

    const command = new SendEmailCommand({
      Source: process.env.SES_FROM_EMAIL,
      Destination: { ToAddresses: [process.env.SES_TO_EMAIL] },
      Message: {
        Subject: { Data: subject, Charset: 'UTF-8' },
        Body: { Text: { Data: emailBody, Charset: 'UTF-8' } },
      },
      ReplyToAddresses: [safeEmail],
    });

    await sesClient.send(command);

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ success: true, message: 'Message sent successfully!' }),
    };
  } catch (error) {
    console.error('Contact form error:', error);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Failed to send message. Please try again or email us directly at hello@avashya.com' }),
    };
  }
};
