// Minimal static server with a gallery endpoint. No dependencies.
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const PUBLIC = path.join(__dirname, "public");
const IMAGES = path.join(PUBLIC, "images");
const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
};

function titleCase(slug) {
  return slug.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");
}

// Builds { category: [ "/images/<category>/<file>", ... ] } from the folders on disk.
function gallery() {
  const out = {};
  if (!fs.existsSync(IMAGES)) return out;
  for (const dir of fs.readdirSync(IMAGES, { withFileTypes: true })) {
    if (!dir.isDirectory()) continue;
    const files = fs
      .readdirSync(path.join(IMAGES, dir.name))
      .filter((f) => IMAGE_EXT.has(path.extname(f).toLowerCase()))
      .sort()
      .map((f) => `/images/${dir.name}/${f}`);
    out[dir.name] = { title: titleCase(dir.name), images: files };
  }
  return out;
}

function send(res, status, body, type) {
  res.writeHead(status, { "Content-Type": type, "Cache-Control": status === 200 ? "public, max-age=300" : "no-store" });
  res.end(body);
}

http
  .createServer((req, res) => {
    const url = new URL(req.url, "http://localhost");
    if (url.pathname === "/health") return send(res, 200, "ok", MIME[".txt"]);
    if (url.pathname === "/api/gallery") return send(res, 200, JSON.stringify(gallery()), MIME[".json"]);

    let rel = decodeURIComponent(url.pathname);
    if (rel.endsWith("/")) rel += "index.html";
    const file = path.normalize(path.join(PUBLIC, rel));
    if (!file.startsWith(PUBLIC)) return send(res, 403, "Forbidden", MIME[".txt"]);

    fs.readFile(file, (err, data) => {
      if (err) return send(res, 404, "Not found", MIME[".txt"]);
      send(res, 200, data, MIME[path.extname(file).toLowerCase()] || "application/octet-stream");
    });
  })
  .listen(PORT, () => console.log(`Nails by Elliot listening on ${PORT}`));
