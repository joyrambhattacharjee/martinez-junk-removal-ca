/**
 * Site header: utility strip, sticky main bar with the phone always visible,
 * CSS-only mega panels (open on :hover and :focus-within, so they work with
 * JavaScript disabled), and a JS-driven full-screen panel on small screens.
 */
import { site } from "../data/site.js";
import { services } from "../data/services.js";
import { countyGroups } from "../data/cities.js";
import { esc, cx } from "./util.mjs";

export const NAV = [
  { label: "Services", href: "/services/", mega: "services" },
  { label: "Commercial", href: "/commercial-junk-removal/" },
  { label: "Residential", href: "/residential-junk-removal/" },
  { label: "Areas We Serve", href: "/areas-we-serve/", mega: "areas" },
  { label: "Blog", href: "/blog/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
];

/** True when `href` is the current page or an ancestor of it. */
const isActive = (href, path) => path === href || (href !== "/" && path.startsWith(href));

export function brandMark(size = 38) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 40 40" aria-hidden="true" focusable="false" class="flex-none">
      <rect width="40" height="40" rx="2" fill="#10161C"></rect>
      <rect x="7" y="8" width="10" height="5.5" fill="#FFAD1F" opacity=".42"></rect>
      <rect x="7" y="17.25" width="18" height="5.5" fill="#FFAD1F" opacity=".72"></rect>
      <rect x="7" y="26.5" width="26" height="5.5" fill="#FFAD1F"></rect>
    </svg>`;
}

export function logoLockup({ onDark = false, size = 38 } = {}) {
  const sub = onDark ? "text-white/55" : "text-slate";
  return `<span class="flex items-center gap-2.5">
      ${brandMark(size)}
      <span class="leading-none">
        <span class="display block text-[1.02rem] tracking-tight ${onDark ? "text-white" : "text-ink"}">MARTINEZ</span>
        <span class="block font-mono text-[0.585rem] font-semibold uppercase tracking-[0.2em] ${sub}">Junk Removal</span>
      </span>
    </span>`;
}

function megaServices() {
  const col = (items) =>
    `<ul class="grid gap-1.5">${items
      .map(
        (s) =>
          `<li><a href="/services/${s.slug}/" class="block py-1 text-[0.9rem] text-ink/80 hover:text-hivis-deep">${esc(s.name)}</a></li>`
      )
      .join("")}</ul>`;
  const third = Math.ceil(services.length / 3);
  return `<div class="grid gap-7 md:grid-cols-[1fr_1fr_1fr_0.9fr]">
      ${col(services.slice(0, third))}
      ${col(services.slice(third, third * 2))}
      ${col(services.slice(third * 2))}
      <div class="border-l hairline pl-6">
        <p class="eyebrow eyebrow-plain mb-2">Start here</p>
        <a href="/commercial-junk-removal/" class="block py-1 text-[0.9rem] font-semibold text-ink hover:text-hivis-deep">For businesses &amp; contractors</a>
        <a href="/residential-junk-removal/" class="block py-1 text-[0.9rem] font-semibold text-ink hover:text-hivis-deep">For homeowners</a>
        <a href="/services/" class="mt-3 inline-flex font-mono text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-hivis-deep">All 15 services →</a>
      </div>
    </div>`;
}

function megaAreas() {
  return `<div class="grid gap-7 md:grid-cols-[1fr_1fr_0.9fr]">
      ${countyGroups
        .map(
          (g) => `<div>
        <p class="eyebrow eyebrow-plain mb-2">${esc(g.county)}</p>
        <ul class="grid gap-1.5 sm:grid-cols-2 md:grid-cols-1">${g.cities
          .map(
            (c) =>
              `<li><a href="/areas-we-serve/${c.slug}/" class="block py-1 text-[0.9rem] text-ink/80 hover:text-hivis-deep">${esc(c.name)}</a></li>`
          )
          .join("")}</ul>
      </div>`
        )
        .join("")}
      <div class="border-l hairline pl-6">
        <p class="eyebrow eyebrow-plain mb-2">Dispatch</p>
        <p class="text-[0.875rem] leading-relaxed text-slate">Six trucks out of ${esc(site.address.street)}, ${esc(site.address.city)}. Most of ${esc(site.stats.cities)} cities see us inside 24 hours.</p>
        <a href="/areas-we-serve/" class="mt-3 inline-flex font-mono text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-hivis-deep">Full service area →</a>
      </div>
    </div>`;
}

const MEGA = { services: megaServices, areas: megaAreas };

function deskNav(path) {
  return NAV.map((item) => {
    const active = isActive(item.href, path);
    const link = `<a href="${item.href}"${active ? ' aria-current="page"' : ""}
        class="${cx(
          "relative flex h-full items-center px-3 font-mono text-[0.735rem] font-semibold uppercase tracking-[0.09em] transition-colors",
          active ? "text-ink" : "text-ink/70 hover:text-ink"
        )}">
        ${esc(item.label)}${item.mega ? '<span class="ml-1.5 text-hivis-deep" aria-hidden="true">▾</span>' : ""}
        <span class="${cx("absolute inset-x-2 bottom-0 h-[3px]", active ? "bg-hivis" : "bg-transparent")}"></span>
      </a>`;

    if (!item.mega) return `<li class="flex">${link}</li>`;

    return `<li class="group flex" data-mega>
        ${link}
        <div class="invisible absolute inset-x-0 top-full z-40 border-y hairline bg-white opacity-0 shadow-lift transition-[opacity,visibility] duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
          <div class="wrap py-7">${MEGA[item.mega]()}</div>
        </div>
      </li>`;
  }).join("");
}

function mobilePanel(path) {
  const group = (title, items) => `<div class="border-t hairline pt-5">
      <p class="eyebrow mb-3">${esc(title)}</p>
      <ul class="grid gap-0.5 sm:grid-cols-2">${items
        .map(
          (i) =>
            `<li><a href="${i.href}"${isActive(i.href, path) ? ' aria-current="page"' : ""} class="block py-2 text-[0.95rem] text-white/80 hover:text-hivis">${esc(i.label)}</a></li>`
        )
        .join("")}</ul>
    </div>`;

  return `<div id="navpanel" class="navpanel on-dark" data-open="false" aria-hidden="true">
      <div class="wrap flex h-[4.4rem] items-center justify-between border-b hairline">
        <a href="/" class="flex items-center">${logoLockup({ onDark: true, size: 34 })}</a>
        <button type="button" data-nav-close class="-mr-2 flex h-11 w-11 items-center justify-center text-white/80 hover:text-white" aria-label="Close menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg>
        </button>
      </div>
      <nav class="wrap grid gap-6 py-7" aria-label="Mobile">
        <div class="grid gap-2">
          <a href="/commercial-junk-removal/" class="btn btn-primary w-full">For businesses</a>
          <a href="/residential-junk-removal/" class="btn btn-outline w-full">For homeowners</a>
        </div>
        ${group(
          "Main",
          NAV.filter((n) => !["/commercial-junk-removal/", "/residential-junk-removal/"].includes(n.href))
        )}
        ${group("Services", services.map((s) => ({ label: s.name, href: `/services/${s.slug}/` })))}
        ${countyGroups
          .map((g) => group(g.county, g.cities.map((c) => ({ label: c.name, href: `/areas-we-serve/${c.slug}/` }))))
          .join("")}
        <div class="border-t hairline pt-5">
          <a href="${site.phoneHref}" class="display block text-[1.6rem] text-hivis">${esc(site.phoneDisplay)}</a>
          <p class="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-white/55">Mon–Fri 7–6 · Sat 7–4 · Sun by appointment</p>
        </div>
      </nav>
    </div>`;
}

export function header(path) {
  return `<a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-3 focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest focus:text-white">Skip to content</a>

  <div class="on-dark hidden bg-ink text-white lg:block">
    <div class="wrap flex h-9 items-center justify-between font-mono text-[0.68rem] uppercase tracking-[0.1em]">
      <p class="text-white/60">Licensed &amp; insured · ${esc(site.stats.trucks)} trucks · Same-day service across Contra Costa &amp; Solano</p>
      <p class="flex items-center gap-5 text-white/60">
        <span>Mon–Fri 7:00–6:00</span>
        <a href="${site.smsHref}" class="text-hivis hover:underline">Text a photo for a quote</a>
      </p>
    </div>
  </div>

  <header class="sticky top-0 z-50 border-b hairline bg-white/95 backdrop-blur-sm">
    <div class="wrap relative flex h-[4.4rem] items-center justify-between gap-4 lg:h-[4.9rem]">
      <a href="/" class="flex flex-none items-center" aria-label="${esc(site.name)} home">${logoLockup()}</a>

      <nav class="hidden h-full lg:block" aria-label="Primary">
        <ul class="flex h-full items-stretch">${deskNav(path)}</ul>
      </nav>

      <div class="flex flex-none items-center gap-2">
        <a href="${site.phoneHref}" class="hidden text-right sm:block lg:mr-1">
          <span class="block font-mono text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-slate">Call for a firm quote</span>
          <span class="display block text-[1.12rem] text-ink">${esc(site.phoneDisplay)}</span>
        </a>
        <a href="${site.phoneHref}" class="btn btn-primary btn-sm sm:hidden">Call now</a>
        <a href="/contact/" class="btn btn-dark btn-sm hidden lg:inline-flex">Get a quote</a>
        <button type="button" data-nav-open aria-expanded="false" aria-controls="navpanel"
          class="-mr-2 flex h-11 w-11 items-center justify-center text-ink lg:hidden" aria-label="Open menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
        </button>
      </div>
    </div>
  </header>

  ${mobilePanel(path)}`;
}
