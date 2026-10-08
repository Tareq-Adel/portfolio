import { createHash, randomUUID } from 'node:crypto';

import { Router } from 'express';
import { z } from 'zod';

import { allowedOrigins } from '../config.js';
import { sendContactEmail } from '../email.js';

const contactRequestSchema = z
  .object({
    name: z.string().min(2).max(100),
    email: z.string().email().max(254),
    inquiryType: z.enum(['job', 'freelance', 'other']),
    message: z.string().min(10).max(2000),
    locale: z.enum(['en', 'ar']),
    website: z.string().max(200).optional(),
  })
  .strict();

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

// In-memory, single-instance only -- matches DB_SCHEMA.md's own reasoning
// for avoiding Redis on a free tier. Resets on restart; fine for a low
// traffic contact form, not fine if this ever runs on more than one instance.
const submissionsByIpHash = new Map<string, number[]>();

function hashIp(ip: string): string {
  const salt = process.env.CONTACT_IP_SALT ?? 'dev-salt-change-in-production';
  return createHash('sha256').update(`${salt}:${ip}`).digest('hex');
}

function isRateLimited(ipHash: string): boolean {
  const now = Date.now();
  const recent = (submissionsByIpHash.get(ipHash) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );
  submissionsByIpHash.set(ipHash, recent);
  return recent.length >= RATE_LIMIT_MAX;
}

function recordSubmission(ipHash: string): void {
  const recent = submissionsByIpHash.get(ipHash) ?? [];
  recent.push(Date.now());
  submissionsByIpHash.set(ipHash, recent);
}

export const contactRouter: Router = Router();

contactRouter.post('/contact', async (req, res) => {
  const requestId = res.locals.requestId as string;
  const origin = req.headers.origin;

  if (origin && !allowedOrigins.includes(origin)) {
    res.status(403).json({
      code: 'ORIGIN_NOT_ALLOWED',
      message: 'This origin may not call this endpoint.',
      requestId,
    });
    return;
  }

  const ipHash = hashIp(req.ip ?? 'unknown');

  if (isRateLimited(ipHash)) {
    res.status(429).json({
      code: 'RATE_LIMITED',
      message: 'Too many messages from this IP. Try again later.',
      requestId,
    });
    return;
  }

  const parsed = contactRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(422).json({
      code: 'VALIDATION_FAILED',
      message: 'Some fields need attention.',
      requestId,
      details: parsed.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        issue: issue.code,
      })),
    });
    return;
  }

  const { website, ...contact } = parsed.data;

  if (website) {
    // Honeypot filled -- silently accept and discard, no signal to the bot.
    res.status(202).json({ requestId });
    return;
  }

  recordSubmission(ipHash);
  await sendContactEmail(contact);

  res.status(201).json({ id: randomUUID(), requestId });
});
