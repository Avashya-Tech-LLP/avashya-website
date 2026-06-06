import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const sesClient = new SESClient({ region: process.env.SES_AWS_REGION || 'us-east-1' });
const s3Client = new S3Client({ region: 'us-east-1' });

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(input) {
  return (input || '').trim().replace(/[<>]/g, '').substring(0, 2000);
}

export const handler = async (event) => {
  if (event.requestContext?.http?.method === 'OPTIONS' || event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: CORS_HEADERS, body: '' };
  }

  try {
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    const { action } = body;

    if (action === 'get-upload-url') {
      const { fileName, contentType } = body;
      if (!fileName) {
        return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ error: 'fileName required' }) };
      }

      const timestamp = Date.now();
      const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
      const key = `applications/${timestamp}_${safeName}`;

      const command = new PutObjectCommand({
        Bucket: process.env.RESUME_BUCKET,
        Key: key,
        ContentType: contentType || 'application/pdf',
      });

      const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 });

      return {
        statusCode: 200,
        headers: CORS_HEADERS,
        body: JSON.stringify({ uploadUrl, key }),
      };
    }

    if (action === 'submit-application') {
      const { name, email, role, linkedin, message, resumeKey } = body;

      if (!name || !email || !role) {
        return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Name, email, and role are required.' }) };
      }
      if (!EMAIL_REGEX.test(email)) {
        return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Invalid email address.' }) };
      }

      const safeName = sanitize(name);
      const safeEmail = sanitize(email);
      const safeRole = sanitize(role);
      const safeLinkedin = sanitize(linkedin);
      const safeMessage = sanitize(message);
      const timestamp = new Date().toISOString();
      const ip = event.requestContext?.http?.sourceIp || 'unknown';

      let resumeUrl = 'No resume uploaded';
      if (resumeKey) {
        const getCommand = new GetObjectCommand({
          Bucket: process.env.RESUME_BUCKET,
          Key: resumeKey,
        });
        resumeUrl = await getSignedUrl(s3Client, getCommand, { expiresIn: 604800 });
      }

      const emailBody = `New Job Application

Name: ${safeName}
Email: ${safeEmail}
Role: ${safeRole}
LinkedIn: ${safeLinkedin || 'Not provided'}

Message:
${safeMessage || 'No additional message'}

Resume: ${resumeUrl}

---
Submitted at: ${timestamp}
Source: Avashya Website - Join Us
IP Address: ${ip}`;

      const command = new SendEmailCommand({
        Source: process.env.SES_FROM_EMAIL,
        Destination: { ToAddresses: [process.env.SES_TO_EMAIL] },
        Message: {
          Subject: { Data: `Job Application: ${safeRole} — ${safeName}`, Charset: 'UTF-8' },
          Body: { Text: { Data: emailBody, Charset: 'UTF-8' } },
        },
        ReplyToAddresses: [safeEmail],
      });

      await sesClient.send(command);

      return {
        statusCode: 200,
        headers: CORS_HEADERS,
        body: JSON.stringify({ success: true, message: 'Application submitted successfully!' }),
      };
    }

    return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Invalid action' }) };
  } catch (error) {
    console.error('Apply handler error:', error);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Something went wrong. Please try again.' }),
    };
  }
};
