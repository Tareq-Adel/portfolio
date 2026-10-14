import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { Router } from 'express';
import { z } from 'zod';

// Resolved relative to this module's own location (not process.cwd()) so it
// works the same under tsx (src/routes/*.ts), the compiled build
// (dist/routes/*.js), and serverless bundlers like Vercel's, which trace
// static join(__dirname, ...) expressions to include the file.
const profile: unknown = JSON.parse(
  readFileSync(join(__dirname, '../../content/profile.json'), 'utf-8'),
);

const langQuerySchema = z.object({
  lang: z.enum(['en', 'ar']).optional().default('en'),
});

export const profileRouter: Router = Router();

profileRouter.get('/profile', (req, res) => {
  const requestId = res.locals.requestId as string;
  const parsed = langQuerySchema.safeParse(req.query);

  if (!parsed.success) {
    res.status(400).json({
      code: 'VALIDATION_FAILED',
      message: 'Some parameters are invalid.',
      requestId,
      details: parsed.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        issue: issue.code,
      })),
    });
    return;
  }

  // Only English content exists right now -- any other requested locale
  // falls back to English, and Content-Language reports what was actually
  // returned (FR-1.5).
  res.setHeader('Content-Language', 'en');
  res.json(profile);
});
