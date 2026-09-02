/**
 * Shared render helpers. Everything that touches HTML goes through here so
 * escaping is consistent and canonical URLs are built one way only.
 */
import { site } from "../data/site.js";

const HTML_ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

/** Escape for text nodes and attribute values alike. */
export const esc = (s) => String(s).replace(/[&<>"']/g, (c) => HTML_ESCAPES[c]);

/**
 * Root-relative path → absolute canonical URL.
 * Enforces the two rules the whole site depends on: apex origin, trailing slash.
 */
export function url(path = "/") {
  if (/^https?:/i.test(path)) return path;
  let p = path.startsWith("/") ? path : `/${path}`;
  if (!p.endsWith("/") && !/\.[a-z0-9]+$/i.test(p)) p += "/";
  return site.origin + p;
}

/** Stable schema @id — one node per concept, referenced everywhere else. */
export const id = (path, frag) => `${url(path)}#${frag}`;

/** Minified, safely embedded JSON-LD. */
export function jsonld(graph) {
  const json = JSON.stringify(graph).replace(/</g, "\\u003c").replace(/>/g, "\\u003e");
  return `<script type="application/ld+json">${json}</script>`;
}

/**
 * Inline markdown links only: [label](/path/) and [label](https://…).
 * Text is escaped first, so nothing else in the copy can inject markup.
 */
export function inline(text) {
  return esc(text).replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) => {
    const external = /^https?:/i.test(href);
    const rel = external ? ' rel="noopener" target="_blank"' : "";
    return `<a href="${href}"${rel}>${label}</a>`;
  });
}

/**
 * <img> with intrinsic dimensions (CLS stays at zero) and a graceful failure
 * path: if the CDN photo 404s, `data-fallback` flips it to a styled brand
 * panel via CSS instead of showing a broken-image icon.
 */
export function image(im, { className = "", sizes = "", eager = false, priority = false } = {}) {
  if (!im) return "";
  const loading = eager ? "" : ' loading="lazy" decoding="async"';
  const fetchpriority = priority ? ' fetchpriority="high"' : "";
  const sizesAttr = sizes ? ` sizes="${esc(sizes)}"` : "";
  return (
    `<img src="${esc(im.url)}" alt="${esc(im.alt)}" width="${im.w}" height="${im.h}"` +
    `${loading}${fetchpriority}${sizesAttr} class="${esc(className)}"` +
    ` onerror="this.setAttribute('data-fallback','');this.removeAttribute('onerror')">`
  );
}

/** Keyless Google Maps embed. Swap `maps.google.com` for OSM if you prefer. */
export function mapEmbed(query, title, className = "") {
  const q = encodeURIComponent(query);
  return (
    `<iframe src="https://maps.google.com/maps?q=${q}&z=13&output=embed"` +
    ` title="${esc(title)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"` +
    ` class="${esc(className)}" width="600" height="450"></iframe>`
  );
}

/** Join class lists, dropping falsy entries. */
export const cx = (...parts) => parts.filter(Boolean).join(" ");

/** 2026-02-11 → February 11, 2026 */
export function longDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return `${months[m - 1]} ${d}, ${y}`;
}

/** Oxford-comma list: ["a","b","c"] → "a, b and c" */
export function listSentence(items) {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}
