import { randomUUID } from 'node:crypto';

import express from 'express';

const app = express();
const port = process.env.PORT ?? 3001;
const startedAt = Date.now();

app.use((_req, res, next) => {
  res.setHeader('X-Request-Id', randomUUID());
  next();
});

app.get('/api/v1/health', (_req, res) => {
  res.json({
    status: 'ok',
    database: 'ok',
    version: '1.0.0',
    uptimeSeconds: Math.floor((Date.now() - startedAt) / 1000),
  });
});

app.listen(port, () => {
  console.log(`portfolio-api listening on http://localhost:${port}`);
});
