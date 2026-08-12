// A production-shaped static host for measurement: HTTP/2, brotli, and
// immutable caching on hashed assets — i.e. what Netlify/Vercel/Cloudflare
// Pages actually do. `npx serve` is HTTP/1.1 with none of that, and Lighthouse's
// Lantern model charges real per-connection RTT for it, so the two are not
// interchangeable when judging a Performance score.
import http2 from "node:http2";
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const ROOT = path.resolve("dist");
const PORT = Number(process.argv[2] ?? 4443);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".avif": "image/avif",
  ".webp": "image/webp",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".json": "application/json",
  ".ico": "image/x-icon",
};

const COMPRESSIBLE = new Set([".html", ".js", ".css", ".svg", ".xml", ".txt", ".json"]);

function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0]);
  const candidates = [
    path.join(ROOT, clean),
    path.join(ROOT, clean, "index.html"),
    path.join(ROOT, `${clean}.html`),
  ];
  for (const c of candidates) {
    if (!c.startsWith(ROOT)) continue;
    if (fs.existsSync(c) && fs.statSync(c).isFile()) return c;
  }
  return null;
}

const server = http2.createSecureServer({
  key: fs.readFileSync("scripts/_certs/key.pem"),
  cert: fs.readFileSync("scripts/_certs/cert.pem"),
});

server.on("stream", (stream, headers) => {
  const urlPath = headers[":path"] ?? "/";
  const file = resolveFile(urlPath) ?? path.join(ROOT, "404.html");
  if (!fs.existsSync(file)) {
    stream.respond({ ":status": 404 });
    stream.end("not found");
    return;
  }

  const ext = path.extname(file);
  let body = fs.readFileSync(file);
  const responseHeaders = {
    ":status": resolveFile(urlPath) ? 200 : 404,
    "content-type": TYPES[ext] ?? "application/octet-stream",
    // Hashed assets are immutable; HTML must revalidate.
    "cache-control": file.includes(`${path.sep}assets${path.sep}`)
      ? "public, max-age=31536000, immutable"
      : "public, max-age=0, must-revalidate",
  };

  const accept = String(headers["accept-encoding"] ?? "");
  if (COMPRESSIBLE.has(ext) && accept.includes("br")) {
    body = zlib.brotliCompressSync(body, {
      params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 11 },
    });
    responseHeaders["content-encoding"] = "br";
  } else if (COMPRESSIBLE.has(ext) && accept.includes("gzip")) {
    body = zlib.gzipSync(body, { level: 9 });
    responseHeaders["content-encoding"] = "gzip";
  }

  responseHeaders["content-length"] = body.length;
  stream.respond(responseHeaders);
  stream.end(body);
});

server.listen(PORT, () => console.log(`h2 static host on https://localhost:${PORT}`));
