import { readFileSync } from 'node:fs';
import path from 'node:path';

import { Router } from 'express';
import { z } from 'zod';

interface Experience {
  id: string;
  kind: string;
  organization: string;
  role: string;
  location: string | null;
  startDate: string;
  endDate: string | null;
  highlights: string[];
}

const experience: Experience[] = JSON.parse(
  readFileSync(path.join(process.cwd(), 'content', 'experience.json'), 'utf-8'),
);

const querySchema = z.object({
  lang: z.enum(['en', 'ar']).optional().default('en'),
  kind: z.enum(['work', 'education', 'volunteer', 'training']).optional(),
});

export const experienceRouter: Router = Router();

experienceRouter.get('/experience', (req, res) => {
  const requestId = res.locals.requestId as string;
  const parsed = querySchema.safeParse(req.query);

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

  const { kind } = parsed.data;

  let result = experience;
  if (kind) {
    result = result.filter((entry) => entry.kind === kind);
  }

  // Newest first.
  const sorted = [...result].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
  );

  // Only English content exists right now -- falls back to English either way.
  res.setHeader('Content-Language', 'en');
  res.json({ data: sorted });
});
