import { NextRequest, NextResponse } from 'next/server';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

// Rate limiting storage (in-memory for MVP)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

// Clean up old entries every hour
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of rateLimitMap.entries()) {
    if (now > data.resetAt) {
      rateLimitMap.delete(ip);
    }
  }
}, 60 * 60 * 1000);

// Initialize SES client
const sesClient = new SESClient({
  region: process.env.SES_AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.SES_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.SES_AWS_SECRET_ACCESS_KEY!,
  },
});

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Input sanitization
function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove angle brackets to prevent HTML injection
    .substring(0, 5000); // Limit length
}

// Rate limiting check
function checkRateLimit(ip: string): { allowed: boolean; resetAt?: number } {
  const now = Date.now();
  const hourInMs = 60 * 60 * 1000;
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetAt) {
    // Reset or create new limit
    rateLimitMap.set(ip, { count: 1, resetAt: now + hourInMs });
    return { allowed: true };
  }

  if (limit.count >= 5) {
    return { allowed: false, resetAt: limit.resetAt };
  }

  // Increment count
  limit.count += 1;
  return { allowed: true };
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
               request.headers.get('x-real-ip') ||
               'unknown';

    // Check rate limit
    const rateCheck = checkRateLimit(ip);
    if (!rateCheck.allowed) {
      const minutesLeft = Math.ceil((rateCheck.resetAt! - Date.now()) / 60000);
      return NextResponse.json(
        {
          error: `Too many submissions. Please try again in ${minutesLeft} minute${minutesLeft > 1 ? 's' : ''}.`
        },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { name, email, company, message } = body;

    // Validate required fields
    if (!email || !company) {
      return NextResponse.json(
        { error: 'Email and company are required.' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const safeName = sanitizeInput(name || '');
    const safeEmail = sanitizeInput(email);
    const safeCompany = sanitizeInput(company);
    const safeMessage = sanitizeInput(message || '');

    // Prepare email content
    const timestamp = new Date().toISOString();
    const isDemo = !safeName && safeMessage.startsWith('Team size:');
    const subject = isDemo
      ? `Demo Request - ${safeCompany} (${safeEmail})`
      : `New Contact - ${safeName} (${safeCompany})`;

    const emailBody = isDemo
      ? `
New Demo Request

Email: ${safeEmail}
Company: ${safeCompany}
${safeMessage}

---
Submitted at: ${timestamp}
Source: Avashya Website - Request Demo
IP Address: ${ip}
      `.trim()
      : `
New Contact Form Submission

From: ${safeName}
Email: ${safeEmail}
Company: ${safeCompany}

Message:
${safeMessage}

---
Submitted at: ${timestamp}
Source: Avashya Website Contact Form
IP Address: ${ip}
      `.trim();

    // Send email via SES
    const command = new SendEmailCommand({
      Source: process.env.SES_FROM_EMAIL!,
      Destination: {
        ToAddresses: [process.env.SES_TO_EMAIL!],
      },
      Message: {
        Subject: {
          Data: subject,
          Charset: 'UTF-8',
        },
        Body: {
          Text: {
            Data: emailBody,
            Charset: 'UTF-8',
          },
        },
      },
      ReplyToAddresses: [safeEmail],
    });

    await sesClient.send(command);

    return NextResponse.json(
      { success: true, message: 'Message sent successfully!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);

    // Don't expose internal errors to client
    return NextResponse.json(
      { error: 'Failed to send message. Please try again or email us directly at varun.k@avashya.tech' },
      { status: 500 }
    );
  }
}
