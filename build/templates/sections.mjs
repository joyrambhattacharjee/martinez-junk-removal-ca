/**
 * Reusable page sections. Every page is assembled from these so the visual
 * language stays identical across 54 pages.
 */
import { site, loadTiers, trustPoints, yearsInBusiness } from "../data/site.js";
import { services, serviceBySlug } from "../data/services.js";
import { cities, countyGroups } from "../data/cities.js";
import { images } from "../data/images.js";
import { postsByDate } from "../data/posts.js";
import { esc, inline, image, mapEmbed, cx, longDate, listSentence } from "./util.mjs";
import { ui } from "./icons.mjs";

/* ── small parts ──────────────────────────────────────────────────────── */

export function breadcrumbs(trail) {
  return `<nav aria-label="Breadcrumb" class="border-b hairline bg-concrete-2">
    <div class="wrap">
      <ol class="flex flex-wrap items-center gap-x-2 gap-y-1 py-3 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-slate">
        ${trail
          .map((b, i) => {
            const last = i === trail.length - 1;
            const label = esc(b.label);
            return `<li class="flex items-center gap-2">${
              last
                ? `<span class="text-ink" aria-current="page">${label}</span>`
                : `<a href="${b.href}" class="hover:text-hivis-deep hover:underline">${label}</a><span aria-hidden="true" class="text-ink/25">/</span>`
            }</li>`;
          })
          .join("")}
      </ol>
    </div>
  </nav>`;
}

export function sectionHead({ eyebrow, h2, intro, align = "left", onDark = false, level = "h2" }) {
  const centered = align === "center";
  return `<div class="${cx("max-w-[62ch]", centered && "mx-auto text-center")}">
    ${eyebrow ? `<p class="eyebrow ${centered ? "justify-center" : ""}">${esc(eyebrow)}</p>` : ""}
    <${level} class="mt-3">${esc(h2)}</${level}>
    ${intro ? `<p class="mt-4 text-[1.06rem] leading-relaxed ${onDark ? "text-white/70" : "text-slate"}">${inline(intro)}</p>` : ""}
  </div>`;
}

/** The signature element: a truck bed marked in eighths. */
export function gauge({ fill, size = "", moss = false, label = "" } = {}) {
  return `<div class="gauge ${size}"${label ? ` role="img" aria-label="${esc(label)}"` : ' aria-hidden="true"'}>
    <div class="gauge-fill${moss ? " gauge-fill-moss" : ""}" style="--fill:${fill}%"></div>
  </div>`;
}

export function callButtons({ primary = "Call for a firm quote", onDark = false, compact = false } = {}) {
  const sm = compact ? " btn-sm" : "";
  return `<div class="flex flex-wrap gap-2.5">
    <a href="${site.phoneHref}" class="btn btn-primary${sm}">${ui.phone(17)} ${esc(primary)}</a>
    <a href="${site.smsHref}" class="btn ${onDark ? "btn-outline" : "btn-outline"}${sm}">${ui.message(16)} Text a photo</a>
  </div>`;
}

export function tickrule(onDark = false) {
  return `<div class="tickrule ${onDark ? "text-white" : "text-ink"}" aria-hidden="true"></div>`;
}

/* ── the load line: pricing made legible ──────────────────────────────── */

export function loadLine({
  eyebrow = "How pricing works",
  h2 = "You pay for the space you fill",
  intro = "Our beds hold 15 cubic yards. We mark them in eighths, quote the mark before anything is loaded, and the number includes labor, hauling and disposal. No weight surcharges, no hourly meter.",
  note = "Heavy material — concrete, dirt, tile, roofing — is quoted by the cubic yard instead, because it reaches the truck's legal weight limit long before it fills the bed. We will tell you which applies to your job on the phone.",
  bg = "bg-white",
} = {}) {
  return `<section class="${bg}">
    <div class="wrap py-14 lg:py-18">
      ${sectionHead({ eyebrow, h2, intro })}

      <div class="mt-9 grid gap-2.5" role="table" aria-label="Junk removal pricing by truck volume">
        <div class="hidden grid-cols-[8rem_1fr_10rem] gap-5 border-b hairline pb-2 font-mono text-[0.64rem] uppercase tracking-[0.13em] text-slate lg:grid" role="row">
          <span role="columnheader">Load</span><span role="columnheader">Bed filled</span><span role="columnheader" class="text-right">Price range</span>
        </div>
        ${loadTiers
          .map(
            (t) => `<div class="grid items-center gap-x-5 gap-y-3 border-b hairline py-3.5 lg:grid-cols-[8rem_1fr_10rem]" role="row">
          <div class="flex items-baseline justify-between gap-3 lg:block" role="cell">
            <span class="display block text-[1.02rem]">${esc(t.label)}</span>
            <span class="font-mono text-[0.68rem] uppercase tracking-[0.09em] text-slate">${esc(t.yards)}</span>
          </div>
          <div role="cell">
            ${gauge({ fill: t.fill, label: `${t.label} — ${t.yards}` })}
            <p class="mt-2 text-[0.86rem] leading-snug text-slate">${esc(t.example)}</p>
          </div>
          <p class="display text-[1.15rem] lg:text-right" role="cell">${esc(t.price)}</p>
        </div>`
          )
          .join("")}
      </div>

      <div class="mt-7 grid gap-6 border-l-2 border-hivis bg-concrete-2 p-5 sm:grid-cols-[1fr_auto] sm:items-center">
        <p class="max-w-[68ch] text-[0.92rem] leading-relaxed text-ink/80">${inline(note)}</p>
        <a href="${site.phoneHref}" class="btn btn-dark btn-sm">${ui.phone(16)} ${esc(site.phoneDisplay)}</a>
      </div>
    </div>
  </section>`;
}

/* ── trust + proof ────────────────────────────────────────────────────── */

export function trustStrip() {
  const icons = [ui.shield, ui.check, ui.truck, ui.recycle];
  return `<section class="border-y hairline bg-concrete-2">
    <div class="wrap grid gap-x-8 gap-y-7 py-11 sm:grid-cols-2 lg:grid-cols-4">
      ${trustPoints
        .map(
          (p, i) => `<div class="reveal" data-reveal>
        <span class="flex h-10 w-10 items-center justify-center bg-ink text-hivis">${icons[i](19)}</span>
        <h3 class="mt-3.5">${esc(p.title)}</h3>
        <p class="mt-2 text-[0.9rem] leading-relaxed text-slate">${esc(p.body)}</p>
      </div>`
        )
        .join("")}
    </div>
  </section>`;
}

/* ── the two doors ────────────────────────────────────────────────────── */

export function doorFork() {
  const door = (href, im, eyebrow, title, body, points) => `<a href="${href}"
    class="card card-link group relative flex flex-col overflow-hidden">
    <div class="aspect-[16/9] overflow-hidden">${image(im, { className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]", sizes: "(min-width:768px) 44vw, 100vw" })}</div>
    <div class="flex flex-1 flex-col p-6 lg:p-7">
      <p class="eyebrow">${esc(eyebrow)}</p>
      <h3 class="mt-3 text-[1.35rem]">${esc(title)}</h3>
      <p class="mt-2.5 text-[0.95rem] leading-relaxed text-slate">${esc(body)}</p>
      <ul class="ticklist mt-4 text-[0.9rem] text-ink/80">${points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
      <span class="mt-6 inline-flex items-center gap-2 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.11em] text-hivis-deep">
        ${esc(title.startsWith("For") ? "See how it works" : "See how it works")} <span class="card-arrow">${ui.arrow(15)}</span>
      </span>
    </div>
  </a>`;

  return `<section class="bg-concrete">
    <div class="wrap py-14 lg:py-18">
      ${sectionHead({
        eyebrow: "Two ways in",
        h2: "Pick the door that matches your job",
        intro:
          "A tenant turnover and a garage cleanout are not the same work, so they do not get the same page. Start where you actually are and the pricing, paperwork and scheduling all match.",
      })}
      <div class="mt-9 grid gap-5 md:grid-cols-2">
        ${door(
          "/commercial-junk-removal/",
          images.commercialHub,
          "Businesses, contractors & property managers",
          "For businesses",
          "Offices, retail, restaurants, job sites and rental portfolios. Insurance paperwork, net-30 terms and after-hours dock windows are all normal here.",
          ["COIs and W-9s the same day you ask", "Recurring and standing schedules", "Photo-documented before and after", "Net-30 invoicing on account"]
        )}
        ${door(
          "/residential-junk-removal/",
          images.residentialHub,
          "Homeowners & families",
          "For homeowners",
          "Garages, estates, single rooms, furniture and the things nobody wants to carry down stairs. One visit, one number, swept up after.",
          ["We do every stair trip, you do none", "Donation-first, receipts provided", "Firm quote before anything moves", "Same-day slots most weeks"]
        )}
      </div>
    </div>
  </section>`;
}


/* ── heroes ───────────────────────────────────────────────────────────── */

/** Home hero: split, photo carries a live load gauge overlay. */
export function homeHero() {
  return `<section class="on-dark relative overflow-hidden bg-ink text-white">
    <div class="wrap grid items-center gap-10 py-14 lg:grid-cols-[1.06fr_1fr] lg:gap-14 lg:py-20">
      <div class="reveal" data-reveal>
        <p class="eyebrow">Martinez, CA · Contra Costa &amp; Solano</p>
        <h1 class="mt-4">Junk hauled, sites cleared,<br><span class="text-hivis">the same week you call.</span></h1>
        <p class="mt-5 max-w-[52ch] text-[1.08rem] leading-relaxed text-white/72">
          ${site.stats.trucks} trucks out of one Martinez yard, serving ${site.stats.cities} cities across two counties. Firm written quotes, licensed and insured crews, and ${site.stats.diversion}% of the average load donated or recycled instead of buried.
        </p>
        <div class="mt-7">${callButtons()}</div>
        <p class="mt-4 font-mono text-[0.72rem] uppercase tracking-[0.1em] text-white/45">
          Same-day &amp; next-day service · No weight surcharges · COIs emailed on request
        </p>

        <dl class="mt-9 grid grid-cols-2 gap-x-6 gap-y-5 border-t hairline pt-7 sm:grid-cols-4">
          ${[
            [site.stats.jobs, "Jobs completed"],
            [`${yearsInBusiness} yrs`, "Family-run"],
            [`${site.stats.diversion}%`, "Diverted"],
            [site.stats.cities, "Cities served"],
          ]
            .map(
              ([v, k]) => `<div>
            <dt class="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-white/45">${esc(k)}</dt>
            <dd class="display mt-1 text-[1.65rem] text-hivis">${esc(v)}</dd>
          </div>`
            )
            .join("")}
        </dl>
      </div>

      <div class="relative">
        <div class="relative aspect-[4/3] overflow-hidden border hairline">
          ${image(images.heroCrew, { className: "h-full w-full object-cover", eager: true, priority: true, sizes: "(min-width:1024px) 46vw, 100vw" })}
        </div>
        <div class="absolute inset-x-4 bottom-4 border border-white/15 bg-ink/92 p-4 backdrop-blur-sm sm:inset-x-6 sm:bottom-6 sm:p-5">
          <div class="flex items-baseline justify-between gap-4">
            <p class="font-mono text-[0.66rem] uppercase tracking-[0.13em] text-white/55">Today's load · 15 cu yd bed</p>
            <p class="display text-[0.95rem] text-hivis">3/4 FULL</p>
          </div>
          <div class="mt-2.5">${gauge({ fill: 75, size: "gauge-sm", label: "Truck bed three quarters full" })}</div>
          <p class="mt-2.5 text-[0.8rem] leading-snug text-white/55">You pay for the space you fill — eighths of a bed, quoted before we load.</p>
        </div>
      </div>
    </div>
    ${tickrule(true)}
  </section>`;
}

/** Inner-page hero, used by every service, city, hub and utility page. */
export function pageHero({ eyebrow, h1, lead, im, bullets = [], dark = true, ctaNote = "" }) {
  return `<section class="${dark ? "on-dark bg-steel text-white" : "bg-white"}">
    <div class="wrap grid gap-9 py-11 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-12 lg:py-14">
      <div>
        ${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ""}
        <h1 class="mt-3">${esc(h1)}</h1>
        <p class="mt-5 max-w-[56ch] text-[1.06rem] leading-relaxed ${dark ? "text-white/72" : "text-slate"}">${inline(lead)}</p>
        ${bullets.length ? `<ul class="ticklist mt-6 max-w-[54ch] text-[0.94rem] ${dark ? "text-white/78" : "text-ink/80"}">${bullets.map((b) => `<li>${inline(b)}</li>`).join("")}</ul>` : ""}
        <div class="mt-7">${callButtons({ onDark: dark })}</div>
        ${ctaNote ? `<p class="mt-3.5 font-mono text-[0.7rem] uppercase tracking-[0.1em] ${dark ? "text-white/45" : "text-slate"}">${esc(ctaNote)}</p>` : ""}
      </div>
      ${im ? `<div class="aspect-[4/3] overflow-hidden border hairline lg:aspect-[5/4]">${image(im, { className: "h-full w-full object-cover", eager: true, priority: true, sizes: "(min-width:1024px) 38vw, 100vw" })}</div>` : ""}
    </div>
  </section>`;
}

/* ── service listings ─────────────────────────────────────────────────── */

export function serviceCard(s, { compact = false } = {}) {
  return `<a href="/services/${s.slug}/" class="card card-link group flex flex-col overflow-hidden">
    ${compact ? "" : `<div class="aspect-[16/10] overflow-hidden">${image(images[s.image], { className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]", sizes: "(min-width:1024px) 30vw, (min-width:640px) 45vw, 100vw" })}</div>`}
    <div class="flex flex-1 flex-col p-5">
      <div class="flex items-start justify-between gap-3">
        <h3 class="text-[1.08rem]">${esc(s.name)}</h3>
        <span class="card-arrow mt-0.5 flex-none text-hivis-deep">${ui.arrow(16)}</span>
      </div>
      <p class="mt-2 flex-1 text-[0.89rem] leading-relaxed text-slate">${esc(s.card)}</p>
      <p class="mt-4 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-slate">${s.audience === "both" ? "Homes &amp; businesses" : s.audience === "commercial" ? "Businesses &amp; contractors" : "Homeowners"}</p>
    </div>
  </a>`;
}

export function serviceGrid(list, { eyebrow = "What we haul", h2 = "Services", intro = "", bg = "bg-white", cta = null, compact = false } = {}) {
  return `<section class="${bg}">
    <div class="wrap py-14 lg:py-18">
      ${sectionHead({ eyebrow, h2, intro })}
      <div class="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        ${list.map((s) => serviceCard(s, { compact })).join("")}
      </div>
      ${cta ? `<div class="mt-9"><a href="${cta.href}" class="btn btn-dark">${esc(cta.label)} ${ui.arrow(15)}</a></div>` : ""}
    </div>
  </section>`;
}

/** Plain link list — used low on city pages where 15 cards would be noise. */
export function serviceLinkStrip({ h2 = "Every service, available here", intro = "", cityName = "" } = {}) {
  return `<section class="border-y hairline bg-concrete-2">
    <div class="wrap py-12 lg:py-14">
      ${sectionHead({ eyebrow: "Full service list", h2, intro })}
      <ul class="mt-7 grid gap-x-8 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
        ${services
          .map(
            (s) => `<li class="border-b hairline">
          <a href="/services/${s.slug}/" class="group flex items-center justify-between gap-3 py-3 text-[0.94rem] text-ink/85 hover:text-hivis-deep">
            <span>${esc(s.name)}${cityName ? ` <span class="text-slate">in ${esc(cityName)}</span>` : ""}</span>
            <span class="card-arrow flex-none text-hivis-deep opacity-0 transition-opacity group-hover:opacity-100">${ui.arrow(15)}</span>
          </a>
        </li>`
          )
          .join("")}
      </ul>
    </div>
  </section>`;
}

/* ── process ──────────────────────────────────────────────────────────── */

export function processSteps(steps, { eyebrow = "How it works", h2 = "Three steps, no surprises", intro = "", bg = "bg-ink", onDark = true } = {}) {
  return `<section class="${onDark ? "on-dark text-white " : ""}${bg}">
    <div class="wrap py-14 lg:py-18">
      ${sectionHead({ eyebrow, h2, intro, onDark })}
      <ol class="mt-10 grid gap-8 md:grid-cols-3 md:gap-7">
        ${steps
          .map(
            (s, i) => `<li class="reveal border-t-2 ${onDark ? "border-hivis" : "border-ink"} pt-5" data-reveal>
          <span class="display block text-[2.6rem] leading-none ${onDark ? "text-hivis" : "text-hivis-deep"}">${String(i + 1).padStart(2, "0")}</span>
          <h3 class="mt-3">${esc(s.t)}</h3>
          <p class="mt-2.5 text-[0.93rem] leading-relaxed ${onDark ? "text-white/65" : "text-slate"}">${esc(s.b)}</p>
        </li>`
          )
          .join("")}
      </ol>
    </div>
  </section>`;
}

/* ── about + diversion story ──────────────────────────────────────────── */

export function aboutPreview() {
  return `<section class="bg-white">
    <div class="wrap grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-14 lg:py-18">
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="aspect-[4/5] overflow-hidden border hairline">${image(images.teamTruck, { className: "h-full w-full object-cover", sizes: "(min-width:1024px) 24vw, 45vw" })}</div>
        <div class="grid gap-4">
          <div class="aspect-square overflow-hidden border hairline">${image(images.recycling, { className: "h-full w-full object-cover", sizes: "(min-width:1024px) 24vw, 45vw" })}</div>
          <div class="aspect-square overflow-hidden border hairline">${image(images.dispatch, { className: "h-full w-full object-cover", sizes: "(min-width:1024px) 24vw, 45vw" })}</div>
        </div>
      </div>

      <div>
        ${sectionHead({
          eyebrow: `Family-run since ${site.founded}`,
          h2: "We would rather find your junk a second owner",
          intro: `We started with one truck and a Martinez phone number. ${site.stats.trucks} trucks later the job is the same: show up when we said, quote what we said, and take the time to sort the load instead of tipping all of it.`,
        })}

        <div class="mt-7 border hairline p-5">
          <div class="flex items-baseline justify-between gap-4">
            <p class="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-slate">Average load, diverted from landfill</p>
            <p class="display text-[1.35rem] text-moss">${site.stats.diversion}%</p>
          </div>
          <div class="mt-3">${gauge({ fill: site.stats.diversion, moss: true, label: `${site.stats.diversion} percent of the average load is donated or recycled` })}</div>
          <p class="mt-3 text-[0.88rem] leading-relaxed text-slate">Metal to a certified recycler, green waste to composting, electronics to a certified processor, usable furniture to local nonprofits. You get the diversion paperwork for your records.</p>
        </div>

        <div class="mt-6 flex flex-wrap gap-2.5">
          <a href="/about/" class="btn btn-dark btn-sm">Our story ${ui.arrow(15)}</a>
          <a href="/reviews/" class="btn btn-outline btn-sm">Read reviews</a>
        </div>
      </div>
    </div>
  </section>`;
}

/* ── areas ────────────────────────────────────────────────────────────── */

export function areasSection({ eyebrow = "Where we work", h2 = "16 cities, two counties, one yard", intro = "", showMap = false, currentSlug = null, bg = "bg-concrete" } = {}) {
  return `<section class="${bg}">
    <div class="wrap py-14 lg:py-18">
      ${sectionHead({ eyebrow, h2, intro })}
      <div class="mt-9 grid gap-9 ${showMap ? "lg:grid-cols-[1fr_1fr] lg:gap-12" : ""}">
        <div class="grid gap-7 sm:grid-cols-2">
          ${countyGroups
            .map(
              (g) => `<div>
            <p class="eyebrow eyebrow-plain border-b hairline pb-2">${esc(g.county)}</p>
            <ul class="mt-3 grid gap-0.5">
              ${g.cities
                .map(
                  (c) => `<li><a href="/areas-we-serve/${c.slug}/"
                class="flex items-baseline justify-between gap-3 py-1.5 text-[0.94rem] ${c.slug === currentSlug ? "text-hivis-deep" : "text-ink/85 hover:text-hivis-deep"}"${c.slug === currentSlug ? ' aria-current="page"' : ""}>
                <span>${esc(c.name)}${c.hq ? ' <span class="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-hivis-deep">HQ</span>' : ""}</span>
                <span class="font-mono text-[0.64rem] uppercase tracking-[0.08em] text-slate">${esc(c.response)}</span>
              </a></li>`
                )
                .join("")}
            </ul>
          </div>`
            )
            .join("")}
        </div>
        ${
          showMap
            ? `<div>
          <div class="aspect-[4/3] overflow-hidden border hairline bg-concrete-2">${mapEmbed(site.mapQuery, `Map of ${site.name} in ${site.address.city}, ${site.address.region}`, "h-full w-full")}</div>
          <p class="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.09em] text-slate">${esc(site.address.street)}, ${esc(site.address.city)} ${esc(site.address.postalCode)} · Dispatch yard</p>
        </div>`
            : ""
        }
      </div>
      ${showMap ? "" : `<div class="mt-8"><a href="/areas-we-serve/" class="btn btn-dark btn-sm">Full service area ${ui.arrow(15)}</a></div>`}
    </div>
  </section>`;
}

/** City-page map. Deliberately only on area pages, per the brief. */
export function cityMap(city) {
  const q = `${city.name}, ${site.address.region}`;
  return `<section class="bg-white">
    <div class="wrap grid gap-9 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12 lg:py-18">
      <div>
        ${sectionHead({
          eyebrow: "Local logistics",
          h2: `Working in ${city.name}`,
          intro: city.logistics,
        })}
        <dl class="mt-7 grid gap-0">
          ${[
            ["Drive from our yard", city.drive],
            ["Typical response", city.response],
            ["County", city.county],
            ["ZIP codes served", city.zips.join(", ")],
          ]
            .map(
              ([k, v]) => `<div class="flex flex-wrap justify-between gap-x-6 gap-y-1 border-b hairline py-2.5">
            <dt class="font-mono text-[0.68rem] uppercase tracking-[0.11em] text-slate">${esc(k)}</dt>
            <dd class="text-[0.92rem] text-ink/85">${esc(v)}</dd>
          </div>`
            )
            .join("")}
        </dl>
        <div class="mt-7">${callButtons({ compact: true })}</div>
      </div>
      <div>
        <div class="aspect-[4/3] overflow-hidden border hairline bg-concrete-2">
          ${mapEmbed(q, `Map of our ${city.name}, ${site.address.region} junk removal service area`, "h-full w-full")}
        </div>
        <p class="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.09em] text-slate">Neighborhoods: ${esc(city.neighborhoods.join(" · "))}</p>
      </div>
    </div>
  </section>`;
}

export function nearbyCities(city, cityBySlug) {
  const list = city.nearby.map((s) => cityBySlug[s]).filter(Boolean);
  return `<section class="border-t hairline bg-concrete">
    <div class="wrap py-12 lg:py-14">
      ${sectionHead({ eyebrow: "Nearby", h2: `We also serve these cities near ${city.name}` })}
      <div class="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        ${list
          .map(
            (c) => `<a href="/areas-we-serve/${c.slug}/" class="card card-link group flex items-center justify-between gap-3 p-4">
          <span>
            <span class="display block text-[1.02rem]">${esc(c.name)}</span>
            <span class="font-mono text-[0.64rem] uppercase tracking-[0.09em] text-slate">${esc(c.county.replace(" County", ""))} · ${esc(c.response)}</span>
          </span>
          <span class="card-arrow flex-none text-hivis-deep">${ui.arrow(16)}</span>
        </a>`
          )
          .join("")}
      </div>
    </div>
  </section>`;
}

/* ── testimonials ─────────────────────────────────────────────────────── */

export function testimonialCard(t, cityBySlug) {
  const c = cityBySlug[t.city];
  const s = serviceBySlug[t.service];
  return `<figure class="card flex h-full flex-col p-5">
    <span class="text-hivis" aria-hidden="true">${ui.quote(24)}</span>
    <blockquote class="mt-2 flex-1 text-[0.97rem] leading-relaxed text-ink/85">${esc(t.quote)}</blockquote>
    <figcaption class="mt-4 border-t hairline pt-3.5">
      <span class="display block text-[0.98rem]">${esc(t.name)}</span>
      <span class="mt-0.5 block font-mono text-[0.64rem] uppercase tracking-[0.1em] text-slate">
        ${esc(t.role)}${c ? ` · <a href="/areas-we-serve/${c.slug}/" class="hover:text-hivis-deep hover:underline">${esc(c.name)}, ${esc(site.address.region)}</a>` : ""}
      </span>
      ${s ? `<a href="/services/${s.slug}/" class="mt-2 inline-flex font-mono text-[0.64rem] uppercase tracking-[0.1em] text-hivis-deep hover:underline">${esc(s.name)}</a>` : ""}
    </figcaption>
  </figure>`;
}

export function testimonialSection(list, cityBySlug, { eyebrow = "In their words", h2 = "What customers say", intro = "", bg = "bg-white" } = {}) {
  return `<section class="${bg}">
    <div class="wrap py-14 lg:py-18">
      ${sectionHead({ eyebrow, h2, intro })}
      <div class="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        ${list.map((t) => testimonialCard(t, cityBySlug)).join("")}
      </div>
    </div>
  </section>`;
}

/* ── blog ─────────────────────────────────────────────────────────────── */

export function postCard(p, postImages, { featured = false } = {}) {
  return `<a href="/blog/${p.slug}/" class="card card-link group flex flex-col overflow-hidden">
    <div class="${featured ? "aspect-[16/9]" : "aspect-[16/10]"} overflow-hidden">
      ${image(postImages[p.slug], { className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]", sizes: featured ? "(min-width:1024px) 60vw, 100vw" : "(min-width:1024px) 30vw, (min-width:640px) 45vw, 100vw" })}
    </div>
    <div class="flex flex-1 flex-col p-5">
      <p class="flex items-center gap-2.5 font-mono text-[0.63rem] uppercase tracking-[0.11em] text-slate">
        <span class="text-hivis-deep">${esc(p.category)}</span><span aria-hidden="true" class="text-ink/20">/</span>
        <time datetime="${p.date}">${longDate(p.date)}</time><span aria-hidden="true" class="text-ink/20">/</span><span>${p.readMins} min</span>
      </p>
      <h3 class="mt-2.5 ${featured ? "text-[1.4rem]" : "text-[1.05rem]"}">${esc(p.h1)}</h3>
      <p class="mt-2 flex-1 text-[0.89rem] leading-relaxed text-slate">${esc(p.excerpt)}</p>
      <span class="mt-4 inline-flex items-center gap-2 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.11em] text-hivis-deep">Read it <span class="card-arrow">${ui.arrow(15)}</span></span>
    </div>
  </a>`;
}

export function blogPreview(postImages, { count = 3, eyebrow = "From the blog", h2 = "Answers before you call", intro = "", bg = "bg-concrete" } = {}) {
  return `<section class="${bg}">
    <div class="wrap py-14 lg:py-18">
      ${sectionHead({ eyebrow, h2, intro })}
      <div class="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        ${postsByDate.slice(0, count).map((p) => postCard(p, postImages)).join("")}
      </div>
      <div class="mt-8"><a href="/blog/" class="btn btn-dark btn-sm">All articles ${ui.arrow(15)}</a></div>
    </div>
  </section>`;
}

/* ── FAQ ──────────────────────────────────────────────────────────────── */

export function faqSection(faqs, { eyebrow = "Common questions", h2 = "Questions we get every week", intro = "", bg = "bg-white", cta = true } = {}) {
  return `<section class="${bg}">
    <div class="wrap grid gap-9 py-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14 lg:py-18">
      <div class="lg:sticky lg:top-28 lg:self-start">
        ${sectionHead({ eyebrow, h2, intro })}
        ${cta ? `<div class="mt-6">${callButtons({ compact: true })}</div>` : ""}
      </div>
      <div>
        ${faqs
          .map(
            (f) => `<details class="qa">
          <summary>${esc(f.q)}<span class="qa-sign" aria-hidden="true"></span></summary>
          <div class="qa-body">${inline(f.a)}</div>
        </details>`
          )
          .join("")}
      </div>
    </div>
  </section>`;
}

/* ── closing call band ────────────────────────────────────────────────── */

export function callBand({ h2 = "Tell us what needs to go", body = "Send a photo or describe the pile. You get a firm number that includes labor, hauling and disposal — and a truck, usually within 24 hours.", note = "" } = {}) {
  return `<section class="on-dark bg-ink text-white">
    ${tickrule(true)}
    <div class="wrap grid gap-8 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-16">
      <div>
        <p class="eyebrow">Get a quote</p>
        <h2 class="mt-3">${esc(h2)}</h2>
        <p class="mt-4 max-w-[54ch] text-[1.04rem] leading-relaxed text-white/70">${inline(body)}</p>
        ${note ? `<p class="mt-3.5 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-white/45">${esc(note)}</p>` : ""}
      </div>
      <div class="border hairline p-6">
        <a href="${site.phoneHref}" class="display block text-[2.05rem] leading-none text-hivis hover:underline">${esc(site.phoneDisplay)}</a>
        <p class="mt-2 font-mono text-[0.68rem] uppercase tracking-[0.11em] text-white/45">Mon–Fri 7–6 · Sat 7–4 · Sun by appointment</p>
        <div class="mt-5 grid gap-2">
          <a href="${site.smsHref}" class="btn btn-primary w-full">${ui.message(16)} Text a photo for a quote</a>
          <a href="mailto:${esc(site.email)}" class="btn btn-outline w-full">${ui.mail(16)} ${esc(site.email)}</a>
        </div>
      </div>
    </div>
  </section>`;
}

/* ── service-page parts ───────────────────────────────────────────────── */

/** Two-column "what we take" list. The `takes` array is always 10 items. */
export function whatWeTake(s) {
  const half = Math.ceil(s.takes.length / 2);
  const col = (items) =>
    `<ul class="grid gap-2.5">${items
      .map(
        (t) =>
          `<li class="flex items-start gap-2.5 text-[0.95rem] leading-relaxed text-ink/85"><span class="mt-0.5 flex-none text-hivis-deep">${ui.check(17)}</span><span>${esc(t)}</span></li>`
      )
      .join("")}</ul>`;

  return `<section class="bg-white">
    <div class="wrap grid gap-9 py-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 lg:py-18">
      <div>
        ${sectionHead({ eyebrow: "On the truck", h2: `What we haul on a ${s.name.toLowerCase()} job` })}
        <p class="mt-4 text-[0.95rem] leading-relaxed text-slate">If it is not on the list, it is still worth asking. The short list of things we genuinely cannot take — wet paint, solvents, asbestos, medical waste — is on the <a href="/faq/">FAQ page</a>.</p>
      </div>
      <div class="grid gap-x-9 gap-y-2.5 sm:grid-cols-2">
        ${col(s.takes.slice(0, half))}
        ${col(s.takes.slice(half))}
      </div>
    </div>
  </section>`;
}

/** Four flat benefit tiles. Icons cycle so no two adjacent tiles match. */
const BENEFIT_ICONS = ["truck", "shield", "recycle", "clock"];

/**
 * Tiles, for benefits that come as { t, b } pairs (the audience hubs, about).
 * One-line benefits use `benefitStrip` instead — a headline-less tile looks
 * like a rendering bug.
 */
export function benefitGrid(list, { eyebrow = "Why crews get called back", h2 = "What you are actually paying for", bg = "bg-concrete" } = {}) {
  return `<section class="${bg}">
    <div class="wrap py-14 lg:py-18">
      ${sectionHead({ eyebrow, h2 })}
      <div class="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        ${list
          .map(
            (b, i) => `<div class="card p-5">
          <span class="flex h-10 w-10 items-center justify-center bg-hivis/15 text-hivis-deep">${ui[BENEFIT_ICONS[i % BENEFIT_ICONS.length]](19)}</span>
          <h3 class="mt-3.5 text-[1.02rem]">${esc(b.t)}</h3>
          <p class="mt-2 text-[0.89rem] leading-relaxed text-slate">${esc(b.b)}</p>
        </div>`
          )
          .join("")}
      </div>
    </div>
  </section>`;
}

/**
 * Benefits that arrive as plain one-liners. Numbered, ruled, no invented
 * headings — reads like a spec sheet rather than four empty cards.
 */
export function benefitStrip(list, { eyebrow = "Why it goes smoothly", h2 = "What you are actually paying for", intro = "", bg = "bg-concrete" } = {}) {
  return `<section class="${bg}">
    <div class="wrap py-14 lg:py-18">
      ${sectionHead({ eyebrow, h2, intro })}
      <ul class="mt-9 grid gap-x-9 gap-y-0 md:grid-cols-2">
        ${list
          .map(
            (b, i) => `<li class="flex items-start gap-4 border-b hairline py-4">
          <span class="display flex-none text-[1.25rem] leading-none text-hivis-deep">${String(i + 1).padStart(2, "0")}</span>
          <span class="text-[0.97rem] leading-relaxed text-ink/85">${inline(b)}</span>
        </li>`
          )
          .join("")}
      </ul>
    </div>
  </section>`;
}

/** Related services rail. Keeps every service page one click from three others. */
export function relatedServices(slugs, { h2 = "Often booked with this", bg = "bg-white" } = {}) {
  const list = slugs.map((slug) => serviceBySlug[slug]).filter(Boolean);
  if (!list.length) return "";
  return `<section class="${bg}">
    <div class="wrap py-14 lg:py-18">
      ${sectionHead({ eyebrow: "Related", h2 })}
      <div class="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        ${list.map((s) => serviceCard(s, { compact: true })).join("")}
      </div>
      <div class="mt-8"><a href="/services/" class="btn btn-outline btn-sm">All ${services.length} services ${ui.arrow(15)}</a></div>
    </div>
  </section>`;
}

/* ── long-form prose ──────────────────────────────────────────────────── */

/** Slug a heading so the post ToC can link to it. */
const anchor = (s) =>
  String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/**
 * Renders the tiny block format documented in build/data/posts.js. Every text
 * value goes through `inline()`, which escapes first and only then converts
 * `[label](/path/)` — so copy can never inject markup.
 */
export function prose(blocks) {
  return blocks
    .map((b) => {
      switch (b.t) {
        case "h2":
          return `<h2 id="${anchor(b.x)}">${inline(b.x)}</h2>`;
        case "h3":
          return `<h3 id="${anchor(b.x)}">${inline(b.x)}</h3>`;
        case "ul":
          return `<ul>${b.x.map((i) => `<li>${inline(i)}</li>`).join("")}</ul>`;
        case "ol":
          return `<ol>${b.x.map((i) => `<li>${inline(i)}</li>`).join("")}</ol>`;
        case "table":
          return `<div class="table-scroll"><table>
            <thead><tr>${b.head.map((h) => `<th scope="col">${inline(h)}</th>`).join("")}</tr></thead>
            <tbody>${b.rows
              .map(
                (r) =>
                  `<tr>${r.map((c, i) => (i === 0 ? `<th scope="row">${inline(c)}</th>` : `<td>${inline(c)}</td>`)).join("")}</tr>`
              )
              .join("")}</tbody>
          </table></div>`;
        case "note":
          return `<aside class="callout"><span class="callout-mark" aria-hidden="true">${ui.shield(18)}</span><p>${inline(b.x)}</p></aside>`;
        case "quote":
          return `<blockquote>${inline(b.x)}</blockquote>`;
        default:
          return `<p>${inline(b.x)}</p>`;
      }
    })
    .join("\n");
}

/** In-page contents built from the post's own h2 blocks. */
export function tableOfContents(blocks) {
  const heads = blocks.filter((b) => b.t === "h2");
  if (heads.length < 3) return "";
  return `<nav class="toc" aria-label="On this page">
    <p class="eyebrow eyebrow-plain mb-2.5">On this page</p>
    <ol class="grid gap-1.5">${heads
      .map(
        (h, i) =>
          `<li><a href="#${anchor(h.x)}" class="flex gap-2.5 text-[0.87rem] leading-snug text-ink/75 hover:text-hivis-deep"><span class="font-mono text-[0.7rem] text-hivis-deep">${String(i + 1).padStart(2, "0")}</span><span>${esc(h.x)}</span></a></li>`
      )
      .join("")}</ol>
  </nav>`;
}

/** Sidebar rail on post pages: services and cities the post points at. */
export function postLinkRail(links, cityBySlug) {
  const svc = (links.services || []).map((s) => serviceBySlug[s]).filter(Boolean);
  const cty = (links.cities || []).map((c) => cityBySlug[c]).filter(Boolean);
  const block = (title, items) =>
    items.length
      ? `<div class="border-t hairline pt-4">
      <p class="eyebrow eyebrow-plain mb-2.5">${esc(title)}</p>
      <ul class="grid gap-1.5">${items
        .map(
          (i) =>
            `<li><a href="${i.href}" class="text-[0.87rem] text-ink/75 hover:text-hivis-deep hover:underline">${esc(i.label)}</a></li>`
        )
        .join("")}</ul>
    </div>`
      : "";

  return `<div class="grid gap-4">
    ${block("Services in this piece", svc.map((s) => ({ label: s.name, href: `/services/${s.slug}/` })))}
    ${block("Areas mentioned", cty.map((c) => ({ label: `${c.name}, CA`, href: `/areas-we-serve/${c.slug}/` })))}
  </div>`;
}

/* ── city-page parts ──────────────────────────────────────────────────── */

/**
 * Local knowledge band. Names the actual neighborhoods and landmarks so a city
 * page describes a place instead of swapping a token. The response window, ZIPs
 * and drive time live in `cityMap` alongside the embed, so they aren't repeated.
 */
export function cityLocal(city) {
  return `<section class="bg-white">
    <div class="wrap grid gap-9 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:py-18">
      <div>
        ${sectionHead({ eyebrow: esc(city.county), h2: `What we haul in ${esc(city.name)}` })}
        <p class="mt-5 text-[1.04rem] leading-relaxed text-ink/80">${inline(city.intro)}</p>
      </div>
      <div class="grid content-start gap-7 border-l-2 border-hivis pl-6">
        <div>
          <p class="eyebrow eyebrow-plain mb-2.5">Neighborhoods we cover</p>
          <ul class="flex flex-wrap gap-1.5">${city.neighborhoods.map((n) => `<li class="chip">${esc(n)}</li>`).join("")}</ul>
        </div>
        <div>
          <p class="eyebrow eyebrow-plain mb-2.5">Landmarks we work around</p>
          <p class="text-[0.92rem] leading-relaxed text-slate">${esc(listSentence(city.landmarks))}.</p>
        </div>
        <div>
          <p class="eyebrow eyebrow-plain mb-2.5">Response</p>
          <p class="display text-[1.15rem] text-ink">${esc(city.response)}</p>
          <p class="mt-1 font-mono text-[0.66rem] uppercase tracking-[0.1em] text-slate">${esc(city.drive)}</p>
        </div>
      </div>
    </div>
  </section>`;
}


/* ── contact-page parts ───────────────────────────────────────────────── */

export function hoursTable({ onDark = false } = {}) {
  const line = onDark ? "border-white/12" : "hairline";
  const key = onDark ? "text-white/45" : "text-slate";
  const val = onDark ? "text-white/85" : "text-ink";
  return `<dl class="grid gap-0 font-mono text-[0.74rem] uppercase tracking-[0.08em]">
    ${site.hours
      .map(
        (h) => `<div class="flex justify-between gap-4 border-b ${line} py-2.5 first:pt-0 last:border-0 last:pb-0">
      <dt class="${key}">${esc(h.label)}</dt><dd class="${val}">${esc(h.value)}</dd>
    </div>`
      )
      .join("")}
  </dl>`;
}

/** Three ways to reach a human, ranked by how fast they get you a number. */
export function contactMethods() {
  const cards = [
    {
      icon: "phone",
      k: "Call",
      v: site.phoneDisplay,
      href: site.phoneHref,
      note: "Fastest route to a firm price. A person answers during business hours; after hours, leave a message and we call back the next morning.",
    },
    {
      icon: "message",
      k: "Text a photo",
      v: site.phoneDisplay,
      href: site.smsHref,
      note: "Snap the pile, the garage or the pallet stack and send it. Most photo quotes come back inside the hour on a weekday.",
    },
    {
      icon: "mail",
      k: "Email",
      v: site.email,
      href: `mailto:${site.email}`,
      note: "Best for property managers and contractors who need a written scope, a COI, or a multi-unit schedule on paper.",
    },
  ];
  return `<div class="grid gap-4 sm:grid-cols-3">
    ${cards
      .map(
        (c) => `<a href="${c.href}" class="card card-link p-5">
      <span class="flex h-10 w-10 items-center justify-center bg-hivis/15 text-hivis-deep">${ui[c.icon](19)}</span>
      <p class="mt-3.5 eyebrow eyebrow-plain">${esc(c.k)}</p>
      <p class="mt-1.5 break-words text-[1.02rem] font-semibold text-ink">${esc(c.v)}</p>
      <p class="mt-2 text-[0.87rem] leading-relaxed text-slate">${esc(c.note)}</p>
    </a>`
      )
      .join("")}
  </div>`;
}

/* ── misc ─────────────────────────────────────────────────────────────── */

/** Numbers band. Reads as a weight ticket rather than a marketing counter. */
export function statsBand({ onDark = true } = {}) {
  const rows = [
    { n: `${yearsInBusiness}`, k: "Years hauling", s: `Since ${site.founded}` },
    { n: site.stats.jobs, k: "Jobs completed", s: "Homes, offices, job sites" },
    { n: `${site.stats.diversion}%`, k: "Kept from landfill", s: "Average load, recycled or donated" },
    { n: `${site.stats.cities}`, k: "Cities served", s: "Contra Costa & Solano" },
  ];
  const wrapCls = onDark ? "on-dark bg-steel text-white" : "bg-concrete-2";
  const keyCls = onDark ? "text-white/85" : "text-ink";
  const subCls = onDark ? "text-white/45" : "text-slate";
  return `<section class="${wrapCls}">
    <div class="wrap grid gap-7 py-11 sm:grid-cols-2 lg:grid-cols-4 lg:py-12">
      ${rows
        .map(
          (r) => `<div>
        <p class="display text-[2.3rem] leading-none ${onDark ? "text-hivis" : "text-ink"}">${esc(r.n)}</p>
        <p class="mt-2 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.11em] ${keyCls}">${esc(r.k)}</p>
        <p class="mt-1 text-[0.82rem] ${subCls}">${esc(r.s)}</p>
      </div>`
        )
        .join("")}
    </div>
  </section>`;
}

/**
 * Legal-page body. Same block format as the blog, wrapped in the prose scope
 * and given a "last updated" line, because a policy with no date reads stale.
 */
export function legalBody(blocks, { updated }) {
  return `<section class="bg-white">
    <div class="wrap py-12 lg:py-16">
      <div class="mx-auto max-w-[72ch]">
        <p class="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-slate">Last updated ${longDate(updated)}</p>
        <div class="prose mt-7">${prose(blocks)}</div>
        <div class="mt-10 border-t hairline pt-7">
          <p class="text-[0.92rem] leading-relaxed text-slate">Questions about this page? Call <a href="${site.phoneHref}" class="font-semibold text-ink hover:text-hivis-deep">${esc(site.phoneDisplay)}</a> or email <a href="mailto:${esc(site.email)}" class="font-semibold text-ink hover:text-hivis-deep">${esc(site.email)}</a>.</p>
        </div>
      </div>
    </div>
  </section>`;
}



