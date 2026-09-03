/**
 * Footer: NAP block, company links and legal links.
 *
 * The service and city silos are reached from the header mega panels and from
 * their own hub pages, not from here — so this stays a contact-and-trust block
 * rather than a link farm.
 */
import { site, yearsInBusiness } from "../data/site.js";
import { esc } from "./util.mjs";
import { socialIcons, ui } from "./icons.mjs";
import { logoLockup } from "./header.mjs";

const COMPANY = [
  { label: "About us", href: "/about/" },
  { label: "Contact us", href: "/contact/" },
  { label: "Reviews", href: "/reviews/" },
  { label: "FAQ", href: "/faq/" },
  { label: "For businesses", href: "/commercial-junk-removal/" },
  { label: "For homeowners", href: "/residential-junk-removal/" },
];

export const LEGAL = [
  { label: "Privacy policy", href: "/privacy-policy/" },
  { label: "Terms of service", href: "/terms-of-service/" },
  { label: "Disclaimer", href: "/disclaimer/" },
  { label: "Accessibility", href: "/accessibility/" },
];

const linkList = (items, cls = "sm:grid-cols-1") =>
  `<ul class="grid gap-1.5 ${cls}">${items
    .map(
      (i) =>
        `<li><a href="${i.href}" class="text-[0.875rem] text-white/65 transition-colors hover:text-hivis">${esc(i.label)}</a></li>`
    )
    .join("")}</ul>`;

function socialRow() {
  return `<ul class="flex flex-wrap gap-2">${site.socials
    .map(
      (s) => `<li><a href="${s.url}" rel="me noopener" target="_blank"
        class="flex h-10 w-10 items-center justify-center border border-white/18 text-white/70 transition-colors hover:border-hivis hover:bg-hivis hover:text-ink"
        aria-label="${esc(site.name)} on ${esc(s.network)}"
        title="${esc(s.network)} — @${esc(site.handle)}">${socialIcons[s.icon](17)}</a></li>`
    )
    .join("")}</ul>`;
}

export function footer() {
  const year = new Date().getFullYear();
  return `<footer class="on-dark bg-ink text-white">
    <div class="stripes h-2.5" aria-hidden="true"></div>

    <div class="wrap grid gap-11 py-14 lg:grid-cols-[1.25fr_0.75fr_0.75fr] lg:gap-9 lg:py-16">

      <div>
        <a href="/" class="inline-flex" aria-label="${esc(site.name)} home">${logoLockup({ onDark: true, size: 40 })}</a>
        <p class="mt-4 max-w-[34ch] text-[0.9rem] leading-relaxed text-white/60">
          ${esc(site.tagline)}. Family-run out of Martinez since ${site.founded} — ${yearsInBusiness} years, ${esc(site.stats.jobs)} jobs, ${site.stats.diversion}% of the average load kept out of landfill.
        </p>

        <address class="mt-6 grid gap-2.5 not-italic">
          <a href="https://maps.google.com/maps?q=${encodeURIComponent(site.mapQuery)}" target="_blank" rel="noopener"
             class="flex items-start gap-2.5 text-[0.875rem] text-white/65 hover:text-hivis">
            <span class="mt-0.5 flex-none text-hivis">${ui.pin(16)}</span>
            <span>${esc(site.address.street)}<br>${esc(site.address.city)}, ${esc(site.address.region)} ${esc(site.address.postalCode)}</span>
          </a>
          <a href="${site.phoneHref}" class="flex items-center gap-2.5 hover:text-hivis">
            <span class="flex-none text-hivis">${ui.phone(16)}</span>
            <span class="display text-[1.22rem] leading-none">${esc(site.phoneDisplay)}</span>
          </a>
          <a href="${site.smsHref}" class="flex items-center gap-2.5 text-[0.875rem] text-white/65 hover:text-hivis">
            <span class="flex-none text-hivis">${ui.message(16)}</span><span>Text a photo for a quote</span>
          </a>
          <a href="mailto:${esc(site.email)}" class="flex items-center gap-2.5 text-[0.875rem] text-white/65 hover:text-hivis">
            <span class="flex-none text-hivis">${ui.mail(16)}</span><span>${esc(site.email)}</span>
          </a>
        </address>

        <dl class="mt-6 grid max-w-[21rem] gap-1.5 font-mono text-[0.72rem] uppercase tracking-[0.08em]">
          ${site.hours
            .map(
              (h) => `<div class="flex justify-between gap-4 border-b border-white/10 pb-1.5">
            <dt class="text-white/45">${esc(h.label)}</dt><dd class="text-white/80">${esc(h.value)}</dd>
          </div>`
            )
            .join("")}
        </dl>

        <div class="mt-6">
          <p class="eyebrow mb-2.5">@${esc(site.handle)}</p>
          ${socialRow()}
        </div>
      </div>

      <div>
        <h2 class="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white">Company</h2>
        <div class="mt-4">${linkList(COMPANY)}</div>
      </div>

      <div>
        <h2 class="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white">Legal</h2>
        <div class="mt-4">${linkList(LEGAL)}</div>
      </div>
    </div>

    <div class="border-t border-white/12">
      <div class="wrap flex flex-col gap-3 py-6 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-white/40 md:flex-row md:items-center md:justify-between">
        <p>&copy; <span data-year>${year}</span> ${esc(site.legalName)}. All rights reserved.</p>
        <p class="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span>Licensed &amp; insured</span><span aria-hidden="true" class="text-white/20">/</span>
          <span>${site.stats.diversion}% diversion rate</span><span aria-hidden="true" class="text-white/20">/</span>
          <a href="/sitemap.xml" class="hover:text-hivis">Sitemap</a>
        </p>
      </div>
    </div>
  </footer>`;
}
