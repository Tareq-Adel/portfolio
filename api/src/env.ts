// Side-effect only, imported first so env vars are available before any
// other module (e.g. config.ts) reads process.env at load time.
try {
  process.loadEnvFile();
} catch {
  // No .env file -- fine in production, where real env vars are set directly
  // rather than through a file.
}
