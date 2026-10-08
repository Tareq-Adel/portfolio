// NFR-6: only the site's own origins may call this API from a browser.
export const allowedOrigins: string[] = (
  process.env.ALLOWED_ORIGINS ?? 'http://localhost:5173,http://localhost:5175'
).split(',');
