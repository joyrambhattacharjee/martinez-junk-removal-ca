/**
 * The document shell. Every page on the site is rendered through here, so
 * canonical rules, schema, fonts and the call bar can only be defined once.
 */
import { site } from "../data/site.js";
import { esc, url, jsonld } from "./util.mjs";
import { header } from "./header.mjs";
import { footer } from "./footer.mjs";
import { buildGraph } from "./schema.mjs";
import { ui } from "./icons.mjs";

const FONTS =
  "https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@100..125,600..900" +
  "&family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600&display=swap";

/** Fixed bottom call bar, small screens only. Revealed on scroll by site.js. */
function callBar() {
  return `<div class="callbar on-dark" data-callbar data-show="false">
    <a href="${site.phoneHref}" class="flex items-center justify-center gap-2 bg-hivis px-3 py-3.5 font-mono text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-ink">
      ${ui.phone(17)}<span>${esc(site.phoneDisplay)}</span>
    </a>
    <a href="${site.smsHref}" class="flex items-center justify-center gap-2 bg-ink px-3 py-3.5 font-mono text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-white">
      ${ui.message(16)}<span>Text a photo</span>
    </a>
  </div>`;
}

/**
 * @param {object} o
 * @param {string} o.path         root-relative, trailing slash
 * @param {string} o.title        <title> — keep under ~62 chars
 * @param {string} o.description  meta description
 * @param {string} o.body         page HTML (inside <main>)
 * @param {object} [o.image]      OG image + primaryImageOfPage
 * @param {Array}  [o.breadcrumbs]
 * @param {Array}  [o.faqs]
 * @param {string} [o.pageType]   extra schema @type for the WebPage node
 * @param {string} [o.ogType]     defaults to website / article for posts
 * @param {boolean}[o.noindex]    404 only
 */
export function layout(o) {
  const canonical = url(o.path);
  const og = o.image || null;
  const graph = buildGraph(o);

  return `<!doctype html>
<html lang="en-US">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(o.title)}</title>
<meta name="description" content="${esc(o.description)}">
<link rel="canonical" href="${canonical}">
${o.noindex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">'}

<meta property="og:type" content="${esc(o.ogType || "website")}">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:locale" content="en_US">
<meta property="og:title" content="${esc(o.title)}">
<meta property="og:description" content="${esc(o.description)}">
<meta property="og:url" content="${canonical}">
${og ? `<meta property="og:image" content="${esc(og.url)}">\n<meta property="og:image:width" content="${og.w}">\n<meta property="og:image:height" content="${og.h}">\n<meta property="og:image:alt" content="${esc(og.alt)}">` : ""}
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(o.title)}">
<meta name="twitter:description" content="${esc(o.description)}">
${og ? `<meta name="twitter:image" content="${esc(og.url)}">` : ""}

<meta name="geo.region" content="US-CA">
<meta name="geo.placename" content="${esc(site.address.city)}, ${esc(site.address.regionName)}">
<meta name="geo.position" content="${site.geo.lat};${site.geo.lng}">
<meta name="ICBM" content="${site.geo.lat}, ${site.geo.lng}">
<meta name="theme-color" content="#10161c">

<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/img/favicon.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://images.unsplash.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<link rel="stylesheet" href="/assets/css/site.css">
<script>document.documentElement.dataset.js="1"</script>
${jsonld(graph)}
</head>
<body class="min-h-screen">
${header(o.path)}
<main id="main">
${o.body}
</main>
${footer()}
${callBar()}
<script src="/assets/js/site.js" defer></script>
</body>
</html>
`;
}
