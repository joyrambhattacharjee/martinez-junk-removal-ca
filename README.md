# Martinez Junk Removal — static website

A hand-built static site for a junk removal company serving Martinez, CA and 15
surrounding cities across Contra Costa and Solano County.

**54 HTML pages, no framework, no runtime.** The deliverable is plain `.html`
files at the repo root, plus one CSS file, one 4 KB JS file and three SVGs. There
is no React, no Next.js, no server, no database, and nothing to install on the
host — upload the folder and it works.

```bash
npm install     # once, for the Tailwind CLI
npm run build   # compile CSS, then render every page
npm run serve   # preview at http://localhost:4173
```

---

## Before you launch — the swap list

Everything below is placeholder content from the research brief. Each item names
the one file to edit.

| # | What | Where | Why |
|---|------|-------|-----|
| 1 | **Phone `(925) 555-0142`** | `build/data/site.js` | `555` numbers are reserved for fiction and **will not dial**. This is the single highest-priority fix — every CTA on 54 pages points at it. |
| 2 | **"4,800+ jobs completed"** | `build/data/site.js` → `stats.jobs` | Invented figure. |
| 3 | **"65% diversion rate"** | `build/data/site.js` → `stats.diversion` | Invented figure. Appears in copy, the footer, and the moss-green gauge on the home and about pages. |
| 4 | **All 16 testimonials** | `build/data/testimonials.js` | Written as placeholders. Publishing invented customer quotes is a legal and trust problem, not just an SEO one. |
| 5 | **Street address & geo coordinates** | `build/data/site.js` → `address`, `geo` | Verify against the real yard. The coordinates feed `LocalBusiness` schema and the `geo.position` meta tags. |
| 6 | **Social profile URLs** | `build/data/site.js` → `socials` | All seven use the handle `martinez.junkremovalca`. Confirm each profile exists before launch — `sameAs` pointing at a 404 is a weak signal. |
| 7 | **Disposal facility names, hours and fees** | `build/data/cities.js`, `build/data/posts.js` | Transfer stations and their tipping fees change. The blog post `/blog/contra-costa-solano-disposal-facilities/` is the most exposed page. |
| 8 | **Founded year 2014 / "11+ years"** | `build/data/site.js` → `founded` | Derived, not hardcoded — `yearsInBusiness` computes from `founded`, so fixing the year fixes every mention. |
| 9 | **Logo wordmark** | `assets/img/logo.svg` | Live SVG text, so it renders with Archivo only where Archivo is installed. Export it with the text converted to outlines, and add a 512×512 PNG if you want maximum compatibility with Google's logo guidelines. |
| 10 | **Images** | `build/data/images.js` | See below. |

---

## Images

All 32 photos are hotlinked from `images.unsplash.com` and defined in exactly one
place — `build/data/images.js`. Change a URL there and every page using it
updates on the next build.

```js
heroCrew: img(
  "photo-1504307651254-35680f356dfd",  // ← the Unsplash photo ID
  1500, 1080,                          // ← intrinsic w/h, holds CLS at zero
  "Descriptive alt text for screen readers and image search",
  "short keyword phrase"
),
```

**Every URL was loaded in a real browser and verified to return an image.** Two
of the original IDs were dead and have been replaced with verified ones:

| Key | Dead ID | Replaced with |
|---|---|---|
| `garageCleanout` | `photo-1558618047-3c8c76ca7d13` | `photo-1647299852821-40401c0b0976` — "a garage filled with lots of clutter and tools" |
| `teamTruck` | `photo-1595246140520-3d3a58c1a1e7` | `photo-1650535716978-eb644a8cf898` — "a dump truck parked on the side of the road" |

The remaining 30 all load. If you swap in your own photos and one 404s, the
`onerror` handler on every `<img>` sets `data-fallback`, and CSS renders
`assets/img/fallback.svg` — an on-brand steel-and-hi-vis panel — instead of a
torn-page icon.

Alt text is written per image, not generated. If you change a photo, change its
alt text to match what the new photo actually shows.

> Hotlinking Unsplash is fine for a staging build. For production, download the
> photos, compress them to WebP/AVIF, and serve them from your own domain — it
> removes a third-party dependency from your Largest Contentful Paint.

---

## How the build works

The site is static. The **generator** is not part of the site.

```
build/            ← author-time tooling. Runs on your machine. Never ships.
  build.mjs         renders every page, then audits its own output
  serve.mjs         local preview server
  data/*.js         content: NAP, 15 services, 16 cities, 8 posts, images
  templates/*.mjs   one header, one footer, one schema builder, 37 sections
src/styles/       ← Tailwind source
assets/           ← shipped: compiled CSS, 4 KB JS, 3 SVGs
index.html        ← shipped: the site itself
services/…        ← 16 files
areas-we-serve/…  ← 17 files
blog/…            ← 9 files
```

**Why generate instead of hand-writing 54 files?** One header, one footer and one
schema builder serve all 54 pages. Hand-maintained, a nav change means 54 edits
and the 55th page silently drifts. The generator is a find-and-replace machine
that runs once, at author time — the same role a code formatter plays. Delete
`build/` and the website still works, because the website *is* the `.html` files.

To change a service description, edit `build/data/services.js` and run
`npm run build`. To change one page's markup by hand, edit the `.html` directly —
just know the next build overwrites it.

### Scripts

| Command | Does |
|---|---|
| `npm run css` | Tailwind CLI → `assets/css/site.css` (minified, ~40 KB) |
| `npm run html` | `node build/build.mjs` → 54 pages + `robots.txt` + `sitemap.xml` |
| `npm run build` | both, in order |
| `npm run serve` | preview on `:4173` with production-style trailing-slash URLs |
| `npm run dev` | build then serve |
| `npm run css:watch` | recompile CSS on save |

### The build audits itself

`build.mjs` fails the build rather than shipping a broken page. It checks:

- exactly one `<h1>` per page
- a self-referencing canonical that matches the page's own route
- `<title>` and meta description present, unique across all 54 pages, and within
  display length (entity-decoded first, so `&amp;` counts as one character)
- every `application/ld+json` block `JSON.parse`s
- every internal `href`/`src` resolves to a real generated route or known asset,
  with a specific error for a missing trailing slash
- no link to the `www.` version of our own host, and no `index.html` in any URL
- no `undefined`, `NaN`, `${` or `[object Object]` leaking into output
- `alt` on every image, `title` on every iframe, explicit width/height on images

A green build prints `Audit passed: canonicals, JSON-LD, headings, links, alt text.`

---

## Host configuration

A folder of static files cannot issue a redirect. Configure these on the host —
without them you will have duplicate-content problems the canonicals only
partly mitigate.

1. **`www` → apex.** Every canonical, `og:url` and sitemap entry uses
   `https://martinezjunkremovalca.com` with no `www`. 301 the `www` host to it.
2. **`http` → `https`.** 301, plus HSTS once you are confident.
3. **Trailing slashes.** `/services` should 301 to `/services/`. Most static
   hosts (Netlify, Cloudflare Pages, Vercel, S3+CloudFront with a rewrite
   function) do this by default. `build/serve.mjs` mirrors the behaviour locally.
4. **404.** Point the error page at `/404.html`.

Change the domain in one place: `build/data/site.js` → `origin`.

---

## SEO notes

**Two doors, no cannibalization.** `/commercial-junk-removal/` and
`/residential-junk-removal/` are the money-keyword pages for their audiences.
The 15 services live only at `/services/<slug>/` — there is no duplicate
"commercial garage cleanout" page competing with "garage cleanout". Services
tagged `audience: "both"` appear under both hubs by design.

**Schema.** One `@graph` per page with stable `@id`s: `Organization`,
`LocalBusiness`/`HomeAndConstructionBusiness` (address, geo, telephone, opening
hours, `priceRange`, 16 `City` nodes in `areaServed`, `hasOfferCatalog`, all
seven socials in `sameAs`), `WebSite`, `WebPage`, `BreadcrumbList`, plus `Service`
on service and city pages, `FAQPage` where FAQs render, `BlogPosting` on posts,
and `AboutPage`/`ContactPage`/`CollectionPage` where they apply.

**There is deliberately no `aggregateRating` or `Review` markup.** The
testimonials are placeholder copy, and marking up ratings you did not receive
violates Google's structured-data policies and risks a manual action. The
builder has it ready behind one flag — set `REVIEWS_ARE_REAL = true` in
`build/data/testimonials.js` and the `aggregateRating` node starts emitting.
Turn it on when you have real, verifiable reviews. `/reviews/` explains the
absence on-page rather than leaving a gap.

**Internal linking.** Every page is reachable from the mega footer. Service pages
link to all 16 cities; city pages link to all 15 services; blog posts link down
into both. Crawl depth from the home page is never more than two clicks.

---

## Accessibility

Targets WCAG 2.2 AA. Skip link, visible `:focus-visible` rings, `aria-current`
on active nav, titled iframes, alt on every image, a focus-trapped mobile nav
with Escape-to-close and focus restoration, and `prefers-reduced-motion` honoured
throughout. Verified: no horizontal overflow at 360 px or 1440 px.

Contrast was measured, not eyeballed, and two palette values were changed as a
result:

| Pair | Ratio | Note |
|---|---|---|
| ink on hi-vis amber (every primary CTA) | **9.75:1** | Amber is a surface colour. White on amber is 1.87:1, so button text is always ink, never white. |
| `hivis-deep` accent text/arrows on white | **6.16:1** | Was `#D98A00` at 2.77:1 — an AA failure on links, chevrons and list ticks. Now `#8A5600`; the old value survives as `hivis-press` for the button hover *fill*, where only ink sits on top. |
| `slate` muted text on `concrete-2` | **4.81:1** | Was `#5B6B79` at 4.41:1. Nudged to `#566573`. |
| white/45 — the lightest text on ink | 4.51:1 | The floor for alpha text on dark; every heavier weight is 6:1+. |
| ink/70 — the lightest text on light | 6.09:1 | Worst case, over `concrete-2`. |

The nav mega panels open on `:hover` **and** `:focus-within`, so they work with
JavaScript disabled. FAQ accordions are native `<details>`/`<summary>`. Scroll
reveals are gated on a `data-js` attribute set synchronously in `<head>`, so with
JS off the content is simply visible rather than stuck at `opacity: 0`.

Known limitations are documented on `/accessibility/`: the Google Maps frames and
the Unsplash CDN are third-party and outside our control.

---

## Maps

City pages and `/contact/` embed keyless Google Maps:
`https://maps.google.com/maps?q=<City>%2C%20CA&z=13&output=embed`. No API key, no
billing account, no quota.

To switch to OpenStreetMap, change one line in `build/templates/util.mjs`
(`mapEmbed`) to
`https://www.openstreetmap.org/export/embed.html?bbox=<bbox>&layer=mapnik`.

Per the brief, maps appear on area pages and the contact page — not sitewide.

---

## Design

Not a template. The identity is drawn from the trade's own artifacts — dump beds,
hi-vis, weight tickets, cubic yards.

- **Palette:** `ink #10161C`, `steel #26333F`, `slate #5B6B79`,
  `concrete #EDF0F2`, `hivis #FFAD1F`, `moss #3F5D34` (diversion story only).
  Tokens live in `@theme` in `src/styles/tailwind.css`.
- **Type:** Archivo (display, width 112, 700–800), IBM Plex Sans (body),
  IBM Plex Mono (eyebrows, phone numbers, measurements). One Google Fonts request,
  preconnected, `display=swap`.
- **The Load Line:** a measured gauge with ticks at eighths of a 15-yard bed. It
  encodes the actual pricing mechanic — you pay for the truck space you fill — so
  it carries information instead of decorating. It recurs as the pricing module,
  the diversion gauge, and a tick-rule section divider. Numbered markers appear
  only on the 3-step process, where order is real.

One accent colour, flat cards, no gradient meshes, no floating blobs. Motion is
one hero sequence and one scroll reveal, both behind `prefers-reduced-motion`.
