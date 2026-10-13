import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { Router } from 'express';
import { z } from 'zod';

interface Technology {
  slug: string;
  name: string;
  group: string;
  primary?: boolean;
}

// Resolved relative to this module's own location, not process.cwd() --
// see profile.ts for why.
const technologies: Technology[] = JSON.parse(
  readFileSync(fileURLToPath(new URL('../../content/technologies.json', import.meta.url)), 'utf-8'),
);
const projects: { technologies: Technology[] }[] = JSON.parse(
  readFileSync(fileURLToPath(new URL('../../content/projects.json', import.meta.url)), 'utf-8'),
);

const techGroups = [
  'backend',
  'databases',
  'architecture',
  'frontend',
  'other_languages',
  'systems',
  'devops',
] as const;

const querySchema = z.object({
  group: z.enum(techGroups).optional(),
  usedInProjects: z.enum(['true', 'false']).optional().default('false'),
});

export const technologiesRouter: Router = Router();

technologiesRouter.get('/technologies', (req, res) => {
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

  const { group, usedInProjects } = parsed.data;

  let result = technologies;

  if (group) {
    result = result.filter((tech) => tech.group === group);
  }

  if (usedInProjects === 'true') {
    const usedSlugs = new Set(projects.flatMap((p) => p.technologies.map((t) => t.slug)));
    result = result.filter((tech) => usedSlugs.has(tech.slug));
  }

  // Ordered by group then original (sortOrder-equivalent) position.
  const orderedResult = [...result].sort(
    (a, b) =>
      techGroups.indexOf(a.group as (typeof techGroups)[number]) -
      techGroups.indexOf(b.group as (typeof techGroups)[number]),
  );

  res.json({ data: orderedResult });
});
