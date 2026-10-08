import { randomUUID } from 'node:crypto';

import express from 'express';

import { allowedOrigins } from './config.js';
import { contactRouter } from './routes/contact.js';

const app = express();
const port = process.env.PORT ?? 3001;
const startedAt = Date.now();

app.use((req, res, next) => {
  res.locals.requestId = randomUUID();
  res.setHeader('X-Request-Id', res.locals.requestId as string);

  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }
  next();
});

app.use(express.json({ limit: '16kb' }));

app.use(
  (err: unknown, _req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!(err instanceof Error) || !('type' in err)) {
      next(err);
      return;
    }
    const requestId = res.locals.requestId as string;
    if (err.type === 'entity.too.large') {
      res
        .status(413)
        .json({ code: 'PAYLOAD_TOO_LARGE', message: 'Request body is too large.', requestId });
      return;
    }
    res
      .status(400)
      .json({ code: 'MALFORMED_JSON', message: 'Request body is not valid JSON.', requestId });
  },
);

app.get('/api/v1/health', (_req, res) => {
  res.json({
    status: 'ok',
    database: 'ok',
    version: '1.0.0',
    uptimeSeconds: Math.floor((Date.now() - startedAt) / 1000),
  });
});

app.use('/api/v1', contactRouter);

app.listen(port, () => {
  console.log(`portfolio-api listening on http://localhost:${port}`);
});
