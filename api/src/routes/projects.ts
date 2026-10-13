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

interface Project {
  slug: string;
  title: string;
  summary: string;
  typeLabel?: string;
  year: number | null;
  coverImageUrl: string | null;
  featured: boolean;
  technologies: Technology[];
  problem: string;
  role: string | null;
  teamSize: number | null;
  decisions: string[];
  outcome: string | null;
  repoUrl: string | null;
  liveUrl: string | null;
  publishedAt: string | null;
}

// Resolved relative to this module's own location, not process.cwd() --
// see profile.ts for why.
const projects: Project[] = JSON.parse(
  readFileSync(fileURLToPath(new URL('../../content/projects.json', import.meta.url)), 'utf-8'),
);

const slugSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  .max(80);

const listQuerySchema = z.object({
  lang: z.enum(['en', 'ar']).optional().default('en'),
  tag: slugSchema.optional(),
  featured: z.enum(['true', 'false']).optional(),
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(50).optional().default(12),
});

function toSummary(project: Project) {
  const { slug, title, summary, typeLabel, year, coverImageUrl, featured, technologies } = project;
  return { slug, title, summary, typeLabel, year, coverImageUrl, featured, technologies };
}

export const projectsRouter: Router = Router();

projectsRouter.get('/projects', (req, res) => {
  const requestId = res.locals.requestId as string;
  const parsed = listQuerySchema.safeParse(req.query);

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

  const { tag, featured, page, limit } = parsed.data;

  let result = projects;
  if (tag) {
    result = result.filter((p) => p.technologies.some((t) => t.slug === tag));
  }
  if (featured === 'true') {
    result = result.filter((p) => p.featured);
  }

  const total = result.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;
  const pageItems = result.slice(start, start + limit).map(toSummary);

  res.setHeader('Content-Language', 'en');
  res.json({ data: pageItems, meta: { page, limit, total, totalPages } });
});

projectsRouter.get('/projects/:slug', (req, res) => {
  const requestId = res.locals.requestId as string;
  const slugParsed = slugSchema.safeParse(req.params.slug);
  const langParsed = z.enum(['en', 'ar']).optional().default('en').safeParse(req.query.lang);

  if (!slugParsed.success || !langParsed.success) {
    res.status(400).json({
      code: 'VALIDATION_FAILED',
      message: 'Some parameters are invalid.',
      requestId,
    });
    return;
  }

  const project = projects.find((p) => p.slug === slugParsed.data);
  if (!project) {
    res.status(404).json({ code: 'NOT_FOUND', message: 'Project not found.', requestId });
    return;
  }

  res.setHeader('Content-Language', 'en');
  res.json(project);
});
