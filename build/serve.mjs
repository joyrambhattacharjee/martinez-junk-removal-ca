/**
 * Local preview server. Dependency-free, ~100 lines, and only for looking at
 * the site on your own machine — the built output is plain files, so any static
 * host (or even opening index.html) works too.
 *
 * The one thing it does that `file://` cannot: resolve the root-relative,
 * trailing-slash URLs the site actually uses in production (/services/ →
 * services/index.html), so what you preview is what you deploy.
 *
 * Run: node build/serve.mjs [port]     (or `npm run serve`)
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PORT = Number(process.argv[2] || process.env.PORT || 4173);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

/** Resolve a URL path to a file inside ROOT, or null if it escapes / is absent. */
function resolve(urlPath) {
  let rel = decodeURIComponent(urlPath.split("?")[0].split("#")[0]);
  if (rel.endsWith("/")) rel += "index.html";
  const file = path.resolve(ROOT, "." + rel);
  if (!file.startsWith(ROOT)) return null; // path traversal
  if (fs.existsSync(file) && fs.statSync(file).isFile()) return file;
  // A trailing slash was forgotten: /services → /services/
  const asDir = path.resolve(ROOT, "." + rel, "index.html");
  if (asDir.startsWith(ROOT) && fs.existsSync(asDir)) return { redirect: rel + "/" };
  return null;
}

const server = http.createServer((req, res) => {
  const started = Date.now();
  const found = resolve(req.url || "/");

  const log = (code) => {
    const mark = code >= 400 ? "✗" : "·";
    process.stdout.write(`  ${mark} ${code}  ${req.url}  ${Date.now() - started}ms\n`);
  };

  if (found && found.redirect) {
    // Mirrors the trailing-slash redirect you want configured on the real host.
    res.writeHead(301, { Location: found.redirect });
    res.end();
    return log(301);
  }

  if (!found) {
    const notFound = path.join(ROOT, "404.html");
    const body = fs.existsSync(notFound)
      ? fs.readFileSync(notFound)
      : "404 Not Found\n";
    res.writeHead(404, {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Length": Buffer.byteLength(body),
    });
    res.end(req.method === "HEAD" ? undefined : body);
    return log(404);
  }

  const body = fs.readFileSync(found);
  res.writeHead(200, {
    "Content-Type": TYPES[path.extname(found).toLowerCase()] || "application/octet-stream",
    "Content-Length": body.length,
    "Cache-Control": "no-store", // always see the last build
  });
  res.end(req.method === "HEAD" ? undefined : body);
  log(200);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`\n  Port ${PORT} is busy. Try: node build/serve.mjs ${PORT + 1}\n`);
    process.exit(1);
  }
  throw err;
});

server.listen(PORT, () => {
  if (!fs.existsSync(path.join(ROOT, "index.html"))) {
    console.log("\n  No index.html at the repo root yet — run `npm run build` first.");
  }
  console.log(`\n  Martinez Junk Removal — serving ${ROOT}`);
  console.log(`  http://localhost:${PORT}/\n`);
});
