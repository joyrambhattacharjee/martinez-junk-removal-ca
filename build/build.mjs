#!/usr/bin/env node
/**
 * Author-time static site generator.
 *
 * Everything in build/ is tooling: it runs once, on your machine, and writes
 * plain .html files to the repo root. Nothing here ships and nothing runs at
 * request time — delete build/ and the site still works, because the site IS
 * the .html files. The generator exists only so one header, one footer and one
 * schema builder can serve 55 pages without 55 copies drifting apart.
 *
 * Run: node build/build.mjs   (or `npm run build`, which compiles CSS first)
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { site, loadTiers, yearsInBusiness } from "./data/site.js";
import { services, serviceBySlug, commercialServices, residentialServices, featuredServices } from "./data/services.js";
import { cities, cityBySlug, countyGroups } from "./data/cities.js";
import { images, postImages } from "./data/images.js";
import { posts, postBySlug, postsByDate } from "./data/posts.js";
import {
  testimonialsByService,
  commercialTestimonials,
  residentialTestimonials,
  testimonialFor,
  testimonials,
} from "./data/testimonials.js";
import { hubs, commercialHub, residentialHub, aboutPage, contactPage, reviewsPage, faqPage, legalPages } from "./data/pages.js";

import { layout } from "./templates/layout.mjs";
import * as S from "./templates/sections.mjs";
import { esc, inline, image, mapEmbed, longDate, url } from "./templates/util.mjs";
import { ui } from "./templates/icons.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/** Every page we generate, collected first so the audit can see all of them. */
const pages = [];

/**
 * @param {string} route root-relative, trailing slash (or a literal filename)
 * @param {string} html
 */
function emit(route, html) {
  const file = route.endsWith("/") ? path.join(route.slice(1), "index.html") : route.replace(/^\//, "");
  pages.push({ route, file, html });
}

/** Breadcrumb trail helper — home is implicit on every page. */
const crumbs = (...rest) => [{ label: "Home", href: "/" }, ...rest];

/* ── home ─────────────────────────────────────────────────────────────── */

function homePage() {
  const faqs = faqPage.groups[0].faqs.slice(0, 4);
  const body = [
    S.homeHero(),
    S.trustStrip(),
    S.doorFork(),
    S.serviceGrid(featuredServices, {
      eyebrow: "What we haul",
      h2: "Six of the fifteen things we get called for most",
      intro: "Cleanouts, construction debris, appliances, furniture and electronics make up most of our week. The full list runs to fifteen services.",
      cta: { href: "/services/", label: `All ${services.length} services` },
      bg: "bg-concrete",
    }),
    S.loadLine({}),
    S.processSteps([
      { t: "Call or text a photo", b: "Describe the pile or send a picture. We ask about access, weight and anything awkward — stairs, gates, a hot tub on a deck." },
      { t: "Get a firm number", b: "Labor, hauling and disposal in one price, tied to how much of the bed you fill. You approve it before a truck is dispatched." },
      { t: "We load, sweep and divert", b: "Two-person minimum, floors protected. Metal, electronics, wood and donatable goods split off before the remainder goes to the transfer station." },
    ], {}),
    S.aboutPreview(),
    S.statsBand({}),
    S.areasSection({
      h2: `${site.stats.cities} cities across Contra Costa and Solano`,
      intro: `Six trucks run out of one yard on ${site.address.street}. Response windows below are what we can realistically hold, not best-case marketing.`,
      showMap: true,
    }),
    S.testimonialSection(
      [residentialTestimonials[0], commercialTestimonials[0], residentialTestimonials[1]],
      cityBySlug,
      { h2: "Homeowners, property managers and contractors", bg: "bg-white" }
    ),
    S.blogPreview(postImages, { count: 3 }),
    S.faqSection(faqs, { bg: "bg-white" }),
    S.callBand({}),
  ].join("\n");

  emit(
    "/",
    layout({
      path: "/",
      title: `Junk Removal in Martinez, CA | Same-Day Hauling | ${site.stats.cities} Cities`,
      description: `Family-run junk removal and construction site clean-up in Martinez, CA since ${site.founded}. Firm quotes, no weight fees, same-day service in Contra Costa & Solano.`,
      body,
      image: images.heroCrew,
      faqs,
      itemList: { name: "Junk removal services", items: services.map((s) => ({ name: s.name, url: `/services/${s.slug}/` })) },
    })
  );
}

/* ── the two doors ────────────────────────────────────────────────────── */

/** Shared shape for /commercial-junk-removal/ and /residential-junk-removal/. */
function audienceHub(hub, { route, im, list, quotes, faqKeys, altHref, altLabel }) {
  const faqs = faqPage.groups
    .filter((g) => faqKeys.includes(g.title))
    .flatMap((g) => g.faqs);

  const body = [
    S.breadcrumbs(crumbs({ label: hub.h1.split(" ").slice(0, 2).join(" "), href: route })),
    S.pageHero({ eyebrow: route === "/commercial-junk-removal/" ? "For businesses" : "For homeowners", h1: hub.h1, lead: hub.lead, im, bullets: hub.bullets }),
    `<section class="bg-white">
      <div class="wrap grid gap-9 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:py-18">
        <div class="prose-tight">${hub.intro.map((p) => `<p>${inline(p)}</p>`).join("")}</div>
        <div class="border-l-2 border-hivis pl-6">
          <p class="eyebrow eyebrow-plain mb-3">What comes with it</p>
          <ul class="ticklist text-[0.94rem] text-ink/80">${hub.proof.map((p) => `<li>${inline(p)}</li>`).join("")}</ul>
          <div class="mt-6">${S.callButtons({ compact: true })}</div>
        </div>
      </div>
    </section>`,
    S.benefitGrid(hub.audiences, { eyebrow: "Who calls us", h2: "The four jobs we get asked for most" }),
    S.serviceGrid(list, {
      eyebrow: "Services",
      h2: `${list.length} services on this side of the business`,
      intro: "Every one of these is handled the same way — send a photo or a quick job note and we will match the right crew and setup for it.",
      cta: { href: altHref, label: altLabel },
      bg: "bg-white",
    }),
    S.loadLine({ bg: "bg-concrete" }),
    S.testimonialSection(quotes, cityBySlug, { bg: "bg-white" }),
    S.areasSection({ intro: `We run this work across all ${site.stats.cities} cities in our service area.` }),
    S.faqSection(faqs, { bg: "bg-white" }),
    S.callBand({}),
  ].join("\n");

  emit(
    route,
    layout({
      path: route,
      title: hub.title,
      description: hub.description,
      body,
      image: im,
      faqs,
      breadcrumbs: crumbs({ label: hub.h1, href: route }),
      pageType: "CollectionPage",
      itemList: { name: hub.h1, items: list.map((s) => ({ name: s.name, url: `/services/${s.slug}/` })) },
    })
  );
}

function audienceHubs() {
  audienceHub(commercialHub, {
    route: "/commercial-junk-removal/",
    im: images.commercialHub,
    list: commercialServices,
    quotes: commercialTestimonials.slice(0, 3),
    faqKeys: ["Commercial, insurance & paperwork", "Pricing & quotes"],
    altHref: "/residential-junk-removal/",
    altLabel: "Homeowner? Start here instead",
  });
  audienceHub(residentialHub, {
    route: "/residential-junk-removal/",
    im: images.residentialHub,
    list: residentialServices,
    quotes: residentialTestimonials.slice(0, 3),
    faqKeys: ["Pricing & quotes", "What we take — and what we can't"],
    altHref: "/commercial-junk-removal/",
    altLabel: "Business or contractor? Start here",
  });
}

/* ── services ─────────────────────────────────────────────────────────── */

function servicesHub() {
  const h = hubs.services;
  const trail = crumbs({ label: "Services", href: "/services/" });
  const body = [
    S.breadcrumbs(trail),
    S.pageHero({ eyebrow: "Services", h1: h.h1, lead: h.lead, im: images.teamTruck, bullets: h.bullets }),
    S.serviceGrid(services, {
      eyebrow: "The full list",
      h2: `All ${services.length} services available`,
      intro: "Grouped by nothing in particular — most jobs are a mix. Pick the closest match and the page will tell you what we take and what kind of crew and schedule fits the work.",
      bg: "bg-white",
    }),
    S.loadLine({ bg: "bg-concrete" }),
    S.doorFork(),
    S.areasSection({ bg: "bg-white", intro: `Every service on this page is available in all ${site.stats.cities} cities we cover.` }),
    S.faqSection(faqPage.groups[1].faqs, { bg: "bg-concrete" }),
    S.callBand({}),
  ].join("\n");

  emit(
    "/services/",
    layout({
      path: "/services/",
      title: h.title,
      description: h.description,
      body,
      image: images.teamTruck,
      breadcrumbs: trail,
      pageType: "CollectionPage",
      faqs: faqPage.groups[1].faqs,
      itemList: { name: "Junk removal services", items: services.map((s) => ({ name: s.name, url: `/services/${s.slug}/` })) },
    })
  );
}

function servicePage(s) {
  const route = `/services/${s.slug}/`;
  const trail = crumbs({ label: "Services", href: "/services/" }, { label: s.name, href: route });
  const quotes = (testimonialsByService[s.slug] || []).slice(0, 3);
  const im = images[s.image];

  const body = [
    S.breadcrumbs(trail),
    S.pageHero({
      eyebrow: s.audience === "commercial" ? "For businesses" : s.audience === "residential" ? "For homeowners" : "Homes & businesses",
      h1: s.h1,
      lead: s.lead,
      im,
      bullets: ["Clear-out and hauling handled in one visit", "Firm quote before anything moves", `Available in all ${site.stats.cities} cities we serve`],
    }),
    `<section class="bg-white">
      <div class="wrap grid gap-9 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:py-18">
        <div class="prose-tight">${s.body.map((p) => `<p>${inline(p)}</p>`).join("")}</div>
        <div class="card p-6">
          <p class="eyebrow eyebrow-plain">Need a quote?</p>
          <p class="mt-3 text-[0.95rem] leading-relaxed text-ink/80">Send a photo or a short description of the pile and we will tell you the right next step and the next available window.</p>
          <div class="mt-5 border-t hairline pt-5">
            <a href="${site.phoneHref}" class="display block text-[1.75rem] leading-none text-ink hover:text-hivis-deep">${esc(site.phoneDisplay)}</a>
            <p class="mt-1.5 font-mono text-[0.66rem] uppercase tracking-[0.1em] text-slate">Call or text us</p>
            <div class="mt-4">${S.callButtons({ compact: true })}</div>
          </div>
        </div>
      </div>
    </section>`,
    S.whatWeTake(s),
    S.benefitStrip(s.benefits, { h2: `What you get on a ${s.name.toLowerCase()} job`, bg: "bg-concrete" }),
    S.processSteps(s.steps, { h2: "How the job runs", bg: "bg-ink" }),
    S.loadLine({ bg: "bg-white" }),
    quotes.length ? S.testimonialSection(quotes, cityBySlug, { bg: "bg-concrete", h2: "People who booked this service" }) : "",
    S.relatedServices(s.related, { bg: "bg-white" }),
    S.areasSection({ h2: `${s.name} across ${site.stats.cities} cities`, intro: `Dispatched from Martinez. Pick your city for local response windows and disposal notes.` }),
    S.faqSection(s.faqs, { h2: `${s.name} questions`, bg: "bg-white" }),
    S.callBand({ h2: `Need ${s.name.toLowerCase()}?` }),
  ].join("\n");

  emit(
    route,
    layout({
      path: route,
      title: s.title,
      description: s.description,
      body,
      image: im,
      breadcrumbs: trail,
      faqs: s.faqs,
      service: s,
    })
  );
}

/* ── areas ────────────────────────────────────────────────────────────── */

function areasHub() {
  const h = hubs.areas;
  const trail = crumbs({ label: "Areas we serve", href: "/areas-we-serve/" });
  const body = [
    S.breadcrumbs(trail),
    S.pageHero({ eyebrow: "Service area", h1: h.h1, lead: h.lead, im: images.dispatch, bullets: h.bullets }),
    S.areasSection({
      eyebrow: "Pick your city",
      h2: "Every city we cover, with its real response window",
      intro: "Cities marked HQ are where our yard sits. Everything else is a drive time we can actually hold.",
      showMap: true,
      bg: "bg-white",
    }),
    `<section class="border-y hairline bg-concrete-2">
      <div class="wrap grid gap-9 py-14 lg:grid-cols-2 lg:gap-14 lg:py-16">
        <div>
          ${S.sectionHead({ eyebrow: "Why the geography matters", h2: "Two counties, one bridge, one yard" })}
          <p class="mt-5 text-[1.02rem] leading-relaxed text-ink/80">Our yard sits where Highway 4 meets the Carquinez Strait, which is an unusually good place to run trucks from. I-680 takes us south through Pleasant Hill, Walnut Creek, Lafayette and Danville. Highway 4 runs east through Concord, Pittsburg, Antioch and Brentwood. The Benicia&ndash;Martinez Bridge puts Benicia, Vallejo, Fairfield, Suisun City and Vacaville within the same half-hour. That is why same-day is normal here rather than a promotion.</p>
          <p class="mt-4 text-[1.02rem] leading-relaxed text-ink/80">It also decides where your load goes. Contra Costa jobs are tipped and sorted inside Contra Costa; Solano jobs go to Solano facilities. Shorter hauls mean lower disposal cost, and that shows up in the quote rather than in our margin. The facilities themselves are listed in our <a href="/blog/contra-costa-solano-disposal-facilities/">county disposal guide</a>.</p>
        </div>
        <div class="grid content-start gap-4">
          ${countyGroups
            .map(
              (g) => `<div class="card p-5">
            <p class="eyebrow eyebrow-plain">${esc(g.county)}</p>
            <p class="display mt-2 text-[1.6rem] leading-none">${g.cities.length} cities</p>
            <p class="mt-2 text-[0.9rem] leading-relaxed text-slate">${esc(g.cities.map((c) => c.name).join(" · "))}</p>
          </div>`
            )
            .join("")}
        </div>
      </div>
    </section>`,
    S.serviceLinkStrip({ h2: `All ${services.length} services, available in every city listed above` }),
    S.testimonialSection([testimonialFor("concord-ca", "commercial"), testimonialFor("vallejo-ca"), testimonialFor("walnut-creek-ca")], cityBySlug, { bg: "bg-white" }),
    S.callBand({ h2: "Not sure if you're in the area?", body: "If you are anywhere near Contra Costa or southern Solano, call and ask. We would rather tell you no in thirty seconds than have you fill in a form and wait." }),
  ].join("\n");

  emit(
    "/areas-we-serve/",
    layout({
      path: "/areas-we-serve/",
      title: h.title,
      description: h.description,
      body,
      image: images.dispatch,
      breadcrumbs: trail,
      pageType: "CollectionPage",
      itemList: { name: "Cities served", items: cities.map((c) => ({ name: `${c.name}, ${site.address.region}`, url: `/areas-we-serve/${c.slug}/` })) },
    })
  );
}

function cityPage(c) {
  const route = `/areas-we-serve/${c.slug}/`;
  const trail = crumbs({ label: "Areas we serve", href: "/areas-we-serve/" }, { label: `${c.name}, ${site.address.region}`, href: route });
  const quote = testimonialFor(c.slug);

  const body = [
    S.breadcrumbs(trail),
    S.pageHero({
      eyebrow: c.county,
      h1: `Junk Removal in ${c.name}, ${site.address.region}`,
      lead: `Same crew, dispatched from our Martinez yard — ${c.drive.toLowerCase()}. ${c.response} for most ${c.name} jobs, residential or commercial.`,
      im: images[c.hq ? "martinezWaterfront" : "teamTruck"],
      bullets: [`${c.response} in ${c.name}`, "Labor, hauling and disposal handled in one visit", `ZIP codes: ${c.zips.join(", ")}`],
    }),
    S.cityLocal(c),
    S.serviceGrid(featuredServices, {
      eyebrow: `In ${c.name}`,
      h2: `What we get called for in ${c.name}`,
      intro: "These six cover most of the volume. The full fifteen are listed below.",
      bg: "bg-concrete",
      cta: { href: "/services/", label: "All services" },
    }),
    S.cityMap(c),
    S.loadLine({ bg: "bg-concrete", h2: `Need service in ${c.name}?` }),
    S.testimonialSection([quote], cityBySlug, { h2: `From a ${c.name} customer`, bg: "bg-white" }),
    S.serviceLinkStrip({ h2: `Every service we offer in ${c.name}`, cityName: c.name }),
    S.nearbyCities(c, cityBySlug),
    S.faqSection(c.faqs, { h2: `${c.name} questions`, bg: "bg-white" }),
    S.callBand({ h2: `Book a ${c.name} pickup`, body: `Call or text a photo and we will give you a firm number for the load, plus the next available ${c.name} slot.` }),
  ].join("\n");

  emit(
    route,
    layout({
      path: route,
      title: `Junk Removal in ${c.name}, CA | Same-Day Hauling`,
      description: `Junk removal in ${c.name}, ${site.address.region} — ${c.response.toLowerCase()}. Garages, furniture, appliances, construction debris and cleanouts. Firm quotes.`,
      body,
      image: images[c.hq ? "martinezWaterfront" : "teamTruck"],
      breadcrumbs: trail,
      faqs: c.faqs,
      city: c,
      pageType: "CollectionPage",
    })
  );
}

/* ── blog ─────────────────────────────────────────────────────────────── */

function blogHub() {
  const h = hubs.blog;
  const trail = crumbs({ label: "Blog", href: "/blog/" });
  const [lead, ...rest] = postsByDate;
  const body = [
    S.breadcrumbs(trail),
    S.pageHero({ eyebrow: "Blog", h1: h.h1, lead: h.lead, im: postImages[lead.slug], dark: true }),
    `<section class="bg-white">
      <div class="wrap py-14 lg:py-18">
        ${S.sectionHead({ eyebrow: "Latest", h2: "Most recent" })}
        <div class="mt-9 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          ${S.postCard(lead, postImages, { featured: true })}
          <div class="grid content-start gap-4">${rest.slice(0, 2).map((p) => S.postCard(p, postImages, {})).join("")}</div>
        </div>
        <div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          ${rest.slice(2).map((p) => S.postCard(p, postImages, {})).join("")}
        </div>
      </div>
    </section>`,
    S.serviceLinkStrip({ h2: "Or skip the reading and pick a service" }),
    S.callBand({ h2: "Rather just ask a person?", body: "Every article on this site started as a question somebody asked on the phone. Call and ask yours." }),
  ].join("\n");

  emit(
    "/blog/",
    layout({
      path: "/blog/",
      title: h.title,
      description: h.description,
      body,
      image: postImages[lead.slug],
      breadcrumbs: trail,
      pageType: "CollectionPage",
      itemList: { name: "Articles", items: postsByDate.map((p) => ({ name: p.h1, url: `/blog/${p.slug}/` })) },
    })
  );
}

function postPage(p) {
  const route = `/blog/${p.slug}/`;
  const trail = crumbs({ label: "Blog", href: "/blog/" }, { label: p.h1, href: route });
  const im = postImages[p.slug];
  const related = p.related.map((slug) => postBySlug[slug]).filter(Boolean);
  const wordCount = p.blocks.reduce((n, b) => n + String(Array.isArray(b.x) ? b.x.join(" ") : b.x || "").split(/\s+/).length, 0);

  const body = [
    S.breadcrumbs(trail),
    `<article>
      <header class="on-dark bg-ink text-white">
        <div class="wrap max-w-[74ch] py-11 lg:py-14">
          <p class="flex flex-wrap items-center gap-2.5 font-mono text-[0.66rem] uppercase tracking-[0.11em] text-white/50">
            <span class="text-hivis">${esc(p.category)}</span><span aria-hidden="true">/</span>
            <time datetime="${p.date}">${longDate(p.date)}</time><span aria-hidden="true">/</span>
            <span>${p.readMins} min read</span>${p.updated ? `<span aria-hidden="true">/</span><span>Updated ${longDate(p.updated)}</span>` : ""}
          </p>
          <h1 class="mt-4">${esc(p.h1)}</h1>
          <p class="mt-5 max-w-[62ch] text-[1.08rem] leading-relaxed text-white/72">${esc(p.excerpt)}</p>
          <p class="mt-6 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-white/45">By ${esc(p.author)}</p>
        </div>
      </header>

      <div class="border-b hairline bg-white">
        <div class="wrap aspect-[16/7] max-w-[96rem] overflow-hidden py-0">
          ${image(im, { className: "h-full w-full object-cover", eager: true, priority: true, sizes: "100vw" })}
        </div>
      </div>

      <div class="bg-white">
        <div class="wrap grid gap-11 py-12 lg:grid-cols-[minmax(0,72ch)_18rem] lg:gap-14 lg:py-16">
          <div class="prose">${S.prose(p.blocks)}</div>
          <aside class="grid content-start gap-7 lg:sticky lg:top-28 lg:self-start">
            ${S.tableOfContents(p.blocks)}
            <div class="card p-5">
              <p class="eyebrow eyebrow-plain">Get a firm quote</p>
              <a href="${site.phoneHref}" class="display mt-2 block text-[1.5rem] leading-none text-ink hover:text-hivis-deep">${esc(site.phoneDisplay)}</a>
              <p class="mt-2 text-[0.86rem] leading-relaxed text-slate">Labor, hauling and disposal in one number. ${site.stats.cities} cities, most inside 24 hours.</p>
              <div class="mt-4">${S.callButtons({ compact: true })}</div>
            </div>
            ${S.postLinkRail(p.links, cityBySlug)}
          </aside>
        </div>
      </div>
    </article>`,
    related.length
      ? `<section class="border-t hairline bg-concrete">
      <div class="wrap py-14 lg:py-16">
        ${S.sectionHead({ eyebrow: "Keep reading", h2: "Related guides" })}
        <div class="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">${related.map((r) => S.postCard(r, postImages, {})).join("")}</div>
      </div>
    </section>`
      : "",
    S.callBand({}),
  ].join("\n");

  emit(
    route,
    layout({
      path: route,
      title: p.title,
      description: p.description,
      body,
      image: im,
      breadcrumbs: trail,
      ogType: "article",
      post: p,
      wordCount,
    })
  );
}

/* ── about / contact / reviews / faq ──────────────────────────────────── */

function aboutPageRender() {
  const a = aboutPage;
  const trail = crumbs({ label: "About", href: "/about/" });
  const body = [
    S.breadcrumbs(trail),
    S.pageHero({ eyebrow: `Family-run since ${site.founded}`, h1: a.h1, lead: a.lead, im: images.teamTruck, bullets: [`${yearsInBusiness} years in Contra Costa County`, `${site.stats.trucks} trucks, one Martinez yard`, `${site.stats.diversion}% of the average load diverted`] }),
    `<section class="bg-white">
      <div class="wrap grid gap-11 py-14 lg:grid-cols-[minmax(0,70ch)_1fr] lg:gap-14 lg:py-18">
        <div class="prose">${S.prose(a.blocks)}</div>
        <aside class="grid content-start gap-4 lg:sticky lg:top-28 lg:self-start">
          <div class="card p-5">
            <p class="eyebrow eyebrow-plain">Diversion rate</p>
            <p class="display mt-2 text-[2.4rem] leading-none text-moss">${site.stats.diversion}%</p>
            <p class="mt-2 text-[0.86rem] leading-relaxed text-slate">of the average load is recycled, scrapped or donated instead of landfilled.</p>
            <div class="mt-4">${S.gauge({ fill: site.stats.diversion, moss: true, label: `${site.stats.diversion} percent of the average load diverted from landfill` })}</div>
          </div>
          <div class="card p-5">
            <p class="eyebrow eyebrow-plain">Our yard</p>
            <p class="mt-2 text-[0.92rem] leading-relaxed text-ink/80">${esc(site.address.street)}<br>${esc(site.address.city)}, ${esc(site.address.region)} ${esc(site.address.postalCode)}</p>
            <a href="${site.phoneHref}" class="display mt-3 block text-[1.4rem] leading-none text-ink hover:text-hivis-deep">${esc(site.phoneDisplay)}</a>
            <div class="mt-4">${S.callButtons({ compact: true })}</div>
          </div>
        </aside>
      </div>
    </section>`,
    `<section class="border-y hairline bg-concrete-2">
      <div class="wrap py-14 lg:py-16">
        ${S.sectionHead({ eyebrow: "How we got here", h2: `${yearsInBusiness} years, four turning points` })}
        <ol class="mt-9 grid gap-7 md:grid-cols-4 md:gap-6">
          ${a.milestones
            .map(
              (m) => `<li class="border-t-2 border-hivis pt-4">
            <span class="display block text-[1.5rem] leading-none text-hivis-deep">${esc(m.year)}</span>
            <h3 class="mt-2.5 text-[1.02rem]">${esc(m.t)}</h3>
            <p class="mt-2 text-[0.89rem] leading-relaxed text-slate">${esc(m.b)}</p>
          </li>`
            )
            .join("")}
        </ol>
      </div>
    </section>`,
    S.benefitGrid(a.values, { eyebrow: "What we hold to", h2: "Four rules that decide how a job runs", bg: "bg-white" }),
    S.statsBand({}),
    S.doorFork(),
    S.testimonialSection([commercialTestimonials[1], residentialTestimonials[2], commercialTestimonials[2]], cityBySlug, { bg: "bg-white" }),
    S.areasSection({}),
    S.callBand({}),
  ].join("\n");

  emit("/about/", layout({ path: "/about/", title: a.title, description: a.description, body, image: images.teamTruck, breadcrumbs: trail, pageType: "AboutPage" }));
}

function contactPageRender() {
  const c = contactPage;
  const trail = crumbs({ label: "Contact", href: "/contact/" });
  const body = [
    S.breadcrumbs(trail),
    S.pageHero({ eyebrow: "Contact", h1: c.h1, lead: c.lead, im: images.dispatch, bullets: ["Call, text a photo, or email", `Same-day slots across ${site.stats.cities} cities`, "No forms, no callback queue"] }),
    `<section class="bg-white">
      <div class="wrap py-14 lg:py-16">
        ${S.sectionHead({ eyebrow: "Three ways in", h2: "Reach a person, not a ticket" })}
        <div class="mt-9">${S.contactMethods()}</div>
      </div>
    </section>`,
    `<section class="border-y hairline bg-concrete-2">
      <div class="wrap grid gap-9 py-14 lg:grid-cols-[1fr_1fr] lg:gap-14 lg:py-16">
        <div>
          ${S.sectionHead({ eyebrow: "Our yard", h2: "Where the trucks live" })}
          <address class="mt-6 not-italic">
            <p class="text-[1.05rem] leading-relaxed text-ink/85">${esc(site.address.street)}<br>${esc(site.address.city)}, ${esc(site.address.region)} ${esc(site.address.postalCode)}</p>
            <a href="https://maps.google.com/maps?q=${encodeURIComponent(site.mapQuery)}" target="_blank" rel="noopener" class="mt-2 inline-flex items-center gap-2 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.11em] text-hivis-deep hover:underline">${ui.pin(15)} Get directions</a>
          </address>
          <p class="mt-5 text-[0.92rem] leading-relaxed text-slate">This is a dispatch yard, not a drop-off site or a retail counter. Please call before coming by — we would rather send a truck to you.</p>
          <div class="mt-7">
            <p class="eyebrow eyebrow-plain mb-3">Hours</p>
            ${S.hoursTable({})}
          </div>
          <div class="mt-7 prose-tight">${S.prose(c.blocks)}</div>
        </div>
        <div>
          <div class="aspect-[4/3] overflow-hidden border hairline bg-white lg:aspect-square">
            ${mapEmbed(site.mapQuery, `Map to ${site.name}, ${site.address.street}, ${site.address.city}, ${site.address.region}`, "h-full w-full")}
          </div>
        </div>
      </div>
    </section>`,
    S.areasSection({ bg: "bg-white", h2: "Cities we dispatch to" }),
    S.faqSection(faqPage.groups[2].faqs, { bg: "bg-concrete" }),
    S.callBand({}),
  ].join("\n");

  emit("/contact/", layout({ path: "/contact/", title: c.title, description: c.description, body, image: images.dispatch, breadcrumbs: trail, pageType: "ContactPage", faqs: faqPage.groups[2].faqs }));
}

function reviewsPageRender() {
  const r = reviewsPage;
  const trail = crumbs({ label: "Reviews", href: "/reviews/" });
  const body = [
    S.breadcrumbs(trail),
    S.pageHero({ eyebrow: "Reviews", h1: r.h1, lead: r.lead, im: images.heroCrew, bullets: [`${site.stats.jobs} jobs since ${site.founded}`, `${site.stats.cities} cities in two counties`, "Homeowners, property managers and GCs"] }),
    S.testimonialSection(residentialTestimonials, cityBySlug, {
      eyebrow: "Homeowners",
      h2: "Garages, estates, furniture and appliances",
      intro: "Residential work is mostly about doing the lifting and not making a mess of the house on the way out.",
      bg: "bg-white",
    }),
    S.testimonialSection(commercialTestimonials, cityBySlug, {
      eyebrow: "Businesses & contractors",
      h2: "Offices, retail, turnovers and job sites",
      intro: "Commercial work is mostly about hitting the window the building gave you and having the paperwork already filed.",
      bg: "bg-concrete",
    }),
    `<section class="bg-white">
      <div class="wrap max-w-[74ch] py-14 lg:py-16">
        ${S.sectionHead({ eyebrow: "About these reviews", h2: "Why there is no star rating on this page" })}
        <p class="mt-5 text-[1.02rem] leading-relaxed text-ink/80">You will notice this page shows no aggregate score and emits no rating markup to search engines. That is deliberate. A star rating in search results has to come from verified reviews on the platform that collected them &mdash; publishing a self-reported average is against Google&rsquo;s structured data policies and it is the kind of thing that gets a site penalized rather than promoted.</p>
        <p class="mt-4 text-[1.02rem] leading-relaxed text-ink/80">If you want to see what people say in public, look us up on the platforms linked in the footer. If you want to talk to a recent customer in your own city, ask when you call &mdash; we will put you in touch with one.</p>
        <div class="mt-7">${S.callButtons({})}</div>
      </div>
    </section>`,
    S.areasSection({}),
    S.callBand({}),
  ].join("\n");

  emit("/reviews/", layout({ path: "/reviews/", title: r.title, description: r.description, body, image: images.heroCrew, breadcrumbs: trail, pageType: "CollectionPage" }));
}

function faqPageRender() {
  const f = faqPage;
  const trail = crumbs({ label: "FAQ", href: "/faq/" });
  const all = f.groups.flatMap((g) => g.faqs);
  const body = [
    S.breadcrumbs(trail),
    S.pageHero({ eyebrow: "FAQ", h1: f.h1, lead: f.lead, im: images.recycling, bullets: [`${all.length} straight answers`, "Pricing, prohibited items, scheduling, paperwork"] }),
    `<section class="bg-white">
      <div class="wrap grid gap-11 py-14 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-14 lg:py-18">
        <nav class="toc lg:sticky lg:top-28 lg:self-start" aria-label="FAQ sections">
          <p class="eyebrow eyebrow-plain mb-2.5">Jump to</p>
          <ol class="grid gap-1.5">${f.groups
            .map(
              (g, i) =>
                `<li><a href="#faq-${i + 1}" class="flex gap-2.5 text-[0.87rem] leading-snug text-ink/75 hover:text-hivis-deep"><span class="font-mono text-[0.7rem] text-hivis-deep">${String(i + 1).padStart(2, "0")}</span><span>${esc(g.title)}</span></a></li>`
            )
            .join("")}</ol>
        </nav>
        <div class="grid gap-11">
          ${f.groups
            .map(
              (g, i) => `<section id="faq-${i + 1}">
            <h2 class="border-b hairline pb-3">${esc(g.title)}</h2>
            <div class="mt-5">${g.faqs
              .map(
                (q) => `<details class="qa">
              <summary>${esc(q.q)}<span class="qa-sign" aria-hidden="true"></span></summary>
              <div class="qa-body">${inline(q.a)}</div>
            </details>`
              )
              .join("")}</div>
          </section>`
            )
            .join("")}
        </div>
      </div>
    </section>`,
    S.loadLine({ bg: "bg-concrete" }),
    S.serviceLinkStrip({ h2: "Still not sure which service you need?" }),
    S.callBand({ h2: "Ask us the one that isn't listed", body: "A two-minute call beats twenty minutes of reading. Call, or text a photo and let the picture do the describing." }),
  ].join("\n");

  emit("/faq/", layout({ path: "/faq/", title: f.title, description: f.description, body, image: images.recycling, breadcrumbs: trail, faqs: all }));
}

/* ── legal + 404 ──────────────────────────────────────────────────────── */

function legalPageRender(p) {
  const route = `/${p.slug}/`;
  const trail = crumbs({ label: p.h1, href: route });
  const body = [
    S.breadcrumbs(trail),
    S.pageHero({ eyebrow: "Legal", h1: p.h1, lead: p.lead, dark: true }),
    S.legalBody(p.blocks, { updated: p.updated }),
  ].join("\n");

  emit(route, layout({ path: route, title: p.title, description: p.description, body, breadcrumbs: trail, image: images.teamTruck }));
}

function notFoundPage() {
  const body = `<section class="on-dark bg-ink text-white">
    <div class="wrap max-w-[62ch] py-20 lg:py-28">
      <p class="display text-[4.5rem] leading-none text-hivis">404</p>
      <h1 class="mt-4">That page isn't on the truck</h1>
      <p class="mt-5 text-[1.06rem] leading-relaxed text-white/72">The link is broken or the page moved. Nothing you did wrong. Here is where most people were heading:</p>
      <ul class="mt-8 grid gap-2.5">
        ${[
          ["All 15 services", "/services/"],
          ["Areas we serve", "/areas-we-serve/"],
          ["For businesses &amp; contractors", "/commercial-junk-removal/"],
          ["For homeowners", "/residential-junk-removal/"],
          ["Pricing questions", "/faq/"],
          ["Contact us", "/contact/"],
        ]
          .map(
            ([label, href]) =>
              `<li><a href="${href}" class="flex items-center justify-between gap-4 border-b border-white/12 py-3 text-[1rem] text-white/85 hover:text-hivis"><span>${label}</span><span class="text-hivis">${ui.arrow(16)}</span></a></li>`
          )
          .join("")}
      </ul>
      <div class="mt-9">${S.callButtons({ onDark: true })}</div>
    </div>
  </section>`;

  emit(
    "/404.html",
    layout({ path: "/404.html", title: `Page not found | ${site.name}`, description: "That page could not be found. Browse our junk removal services or call for a quote.", body, noindex: true })
  );
}

/* ── robots + sitemap ─────────────────────────────────────────────────── */

function robots() {
  return `# ${site.name}
User-agent: *
Allow: /

# One canonical host: the apex, over https, with trailing slashes.
Sitemap: ${site.origin}/sitemap.xml
`;
}

function sitemap() {
  const lastmodFor = (route) => {
    const m = route.match(/^\/blog\/(.+)\/$/);
    const p = m && postBySlug[m[1]];
    return p ? p.updated || p.date : null;
  };

  const urls = pages
    .filter((p) => p.route.endsWith("/"))
    .map((p) => {
      const lastmod = lastmodFor(p.route);
      return `  <url>\n    <loc>${url(p.route)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}\n  </url>`;
    })
    .join("\n");

  const ns = "http://www.sitemaps.org/schemas/sitemap/0.9";
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="${ns}">\n${urls}\n</urlset>\n`;
}

/* ── self-audit ───────────────────────────────────────────────────────── */

/** Files that must exist on disk but are not generated by this script. */
const STATIC_ASSETS = ["/assets/css/site.css", "/assets/js/site.js", "/assets/img/favicon.svg", "/assets/img/logo.svg", "/sitemap.xml", "/robots.txt"];

/** Entity-decode before measuring, so `&amp;` counts as the one character
 *  a search engine will actually display. */
const displayLength = (s) =>
  s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").length;

function audit() {
  const errors = [];
  const warnings = [];
  const routes = new Set(pages.map((p) => p.route));
  const titles = new Map();
  const descs = new Map();

  for (const { route, html } of pages.filter((p) => p.file.endsWith(".html"))) {
    const at = (msg) => `${route} — ${msg}`;

    // exactly one h1
    const h1s = (html.match(/<h1[\s>]/g) || []).length;
    if (h1s !== 1) errors.push(at(`${h1s} <h1> elements, expected exactly 1`));

    // canonical present and self-referencing
    const canon = html.match(/<link rel="canonical" href="([^"]+)"/);
    if (!canon) errors.push(at("no canonical link"));
    else if (canon[1] !== url(route)) errors.push(at(`canonical is ${canon[1]}, expected ${url(route)}`));

    // title + description present and unique
    const title = (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1];
    const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1];
    if (!title) errors.push(at("no <title>"));
    if (!desc) errors.push(at("no meta description"));
    if (title) {
      if (titles.has(title)) errors.push(at(`duplicate <title> — also on ${titles.get(title)}`));
      else titles.set(title, route);
      const n = displayLength(title);
      if (n > 65) warnings.push(at(`title is ${n} chars (>65)`));
    }
    if (desc) {
      if (descs.has(desc)) errors.push(at(`duplicate meta description — also on ${descs.get(desc)}`));
      else descs.set(desc, route);
      const n = displayLength(desc);
      if (n > 165) warnings.push(at(`description is ${n} chars (>165)`));
    }

    // every JSON-LD block must parse
    for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      try {
        JSON.parse(m[1]);
      } catch (e) {
        errors.push(at(`JSON-LD does not parse: ${e.message}`));
      }
    }

    // canonical hygiene — our own host must never appear with a www. prefix
    const host = site.origin.replace(/^https?:\/\//, "");
    if (new RegExp(`https?://www\\.${host.replace(/\./g, "\\.")}`).test(html)) errors.push(at("references the www. version of our own host"));
    if (/href="[^"]*index\.html/.test(html)) errors.push(at("links to index.html"));

    // internal links must resolve
    for (const m of html.matchAll(/(?:href|src)="(\/[^"#?]*)"/g)) {
      const target = m[1];
      if (routes.has(target) || STATIC_ASSETS.includes(target)) continue;
      if (routes.has(target.endsWith("/") ? target : `${target}/`)) {
        errors.push(at(`link to ${target} is missing its trailing slash`));
        continue;
      }
      errors.push(at(`link to ${target} has no generated page`));
    }

    // template leakage
    for (const leak of ["undefined", "NaN", "${", "[object Object]"]) {
      if (html.includes(leak)) errors.push(at(`output contains "${leak}"`));
    }

    // images must carry alt text and intrinsic size
    for (const m of html.matchAll(/<img\b[^>]*>/g)) {
      const tag = m[0];
      if (!/\salt="/.test(tag)) errors.push(at("an <img> has no alt attribute"));
      if (!/\swidth="/.test(tag) || !/\sheight="/.test(tag)) warnings.push(at("an <img> has no width/height"));
    }

    // iframes must be titled
    for (const m of html.matchAll(/<iframe\b[^>]*>/g)) {
      if (!/\stitle="/.test(m[0])) errors.push(at("an <iframe> has no title attribute"));
    }
  }

  return { errors, warnings };
}

/* ── main ─────────────────────────────────────────────────────────────── */

async function writeAll() {
  let bytes = 0;
  for (const { file, html } of pages) {
    const abs = path.join(ROOT, file);
    await mkdir(path.dirname(abs), { recursive: true });
    await writeFile(abs, html, "utf8");
    bytes += Buffer.byteLength(html);
  }
  return bytes;
}

async function main() {
  const t0 = Date.now();

  homePage();
  audienceHubs();
  servicesHub();
  services.forEach(servicePage);
  areasHub();
  cities.forEach(cityPage);
  blogHub();
  posts.forEach(postPage);
  aboutPageRender();
  contactPageRender();
  reviewsPageRender();
  faqPageRender();
  legalPages.forEach(legalPageRender);
  notFoundPage();

  // robots.txt and sitemap.xml are emitted last so the sitemap sees every page.
  emit("/robots.txt", robots());
  emit("/sitemap.xml", sitemap());

  const { errors, warnings } = audit();
  const bytes = await writeAll();

  const htmlPages = pages.filter((p) => p.file.endsWith(".html")).length;
  console.log(`\n  ${site.name} — static build`);
  console.log(`  ${htmlPages} HTML pages + robots.txt + sitemap.xml`);
  console.log(`  ${(bytes / 1024).toFixed(0)} KB written to ${ROOT}`);
  console.log(`  ${services.length} services · ${cities.length} cities · ${posts.length} posts · ${testimonials.length} testimonials\n`);

  if (warnings.length) {
    console.log(`  ${warnings.length} warning${warnings.length === 1 ? "" : "s"}:`);
    for (const w of warnings.slice(0, 25)) console.log(`    ~ ${w}`);
    if (warnings.length > 25) console.log(`    ~ …and ${warnings.length - 25} more`);
    console.log("");
  }

  if (errors.length) {
    console.error(`  BUILD FAILED — ${errors.length} error${errors.length === 1 ? "" : "s"}:`);
    for (const e of errors.slice(0, 40)) console.error(`    ✗ ${e}`);
    if (errors.length > 40) console.error(`    ✗ …and ${errors.length - 40} more`);
    console.error("");
    process.exitCode = 1;
    return;
  }

  console.log(`  Audit passed: canonicals, JSON-LD, headings, links, alt text.`);
  console.log(`  Done in ${Date.now() - t0} ms.\n`);
}

await main();








