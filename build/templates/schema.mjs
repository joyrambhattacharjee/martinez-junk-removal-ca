/**
 * JSON-LD builder. One `@graph` per page, with stable `@id`s so the same
 * business/organization/website nodes are referenced rather than duplicated.
 *
 * Deliberately NOT emitted: `Review` and `aggregateRating`. The testimonials
 * shipped with this site are written placeholder copy, and marking up invented
 * ratings violates Google's structured data policy. Once real reviews exist,
 * set REVIEWS_ARE_REAL = true in build/data/testimonials.js and the rating
 * block below starts emitting.
 */
import { site } from "../data/site.js";
import { services } from "../data/services.js";
import { cities } from "../data/cities.js";
import { images } from "../data/images.js";
import { REVIEWS_ARE_REAL, testimonials } from "../data/testimonials.js";
import { url, id } from "./util.mjs";

const ORG = id("/", "organization");
const BIZ = id("/", "business");
const WEB = id("/", "website");
const PLACE = id("/", "place");

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: site.address.street,
  addressLocality: site.address.city,
  addressRegion: site.address.region,
  postalCode: site.address.postalCode,
  addressCountry: site.address.country,
};

const geoCoordinates = {
  "@type": "GeoCoordinates",
  latitude: site.geo.lat,
  longitude: site.geo.lng,
};

/**
 * Sunday is appointment-only. It is included because every job on this site is
 * scheduled rather than walk-in, so the window is genuinely bookable.
 */
const openingHours = site.hours.map((h) => ({
  "@type": "OpeningHoursSpecification",
  dayOfWeek: h.days.map((d) => `https://schema.org/${d}`),
  opens: h.open,
  closes: h.close,
}));

const areaServed = cities.map((c) => ({
  "@type": "City",
  "@id": id(`/areas-we-serve/${c.slug}/`, "city"),
  name: `${c.name}, ${site.address.region}`,
  containedInPlace: { "@type": "AdministrativeArea", name: c.county },
}));

const offerCatalog = {
  "@type": "OfferCatalog",
  "@id": id("/services/", "catalog"),
  name: "Junk Removal & Site Clean-Up Services",
  itemListElement: services.map((s) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      "@id": id(`/services/${s.slug}/`, "service"),
      name: s.name,
      url: url(`/services/${s.slug}/`),
    },
  })),
};

/** Organization — the brand entity that owns the socials. */
function organizationNode() {
  return {
    "@type": "Organization",
    "@id": ORG,
    name: site.name,
    legalName: site.legalName,
    url: url("/"),
    telephone: site.phoneHref.replace("tel:", ""),
    email: site.email,
    foundingDate: String(site.founded),
    address: postalAddress,
    sameAs: site.socials.map((s) => s.url),
    logo: {
      "@type": "ImageObject",
      "@id": id("/", "logo"),
      url: url("/assets/img/logo.svg"),
      caption: `${site.name} logo`,
    },
    image: { "@id": id("/", "logo") },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.phoneHref.replace("tel:", ""),
      contactType: "customer service",
      email: site.email,
      areaServed: "US-CA",
      availableLanguage: ["English", "Spanish"],
    },
  };
}

/** The local entity Google actually ranks for map results. */
function businessNode() {
  const node = {
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": BIZ,
    name: site.name,
    legalName: site.legalName,
    description: site.tagline,
    url: url("/"),
    telephone: site.phoneHref.replace("tel:", ""),
    email: site.email,
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Check, Credit Card, ACH, Invoice",
    address: postalAddress,
    geo: geoCoordinates,
    hasMap: `https://maps.google.com/maps?q=${encodeURIComponent(site.mapQuery)}`,
    openingHoursSpecification: openingHours,
    areaServed,
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: geoCoordinates,
      geoRadius: "48000",
    },
    hasOfferCatalog: offerCatalog,
    knowsAbout: [
      "Junk removal",
      "Construction site clean-up",
      "Estate cleanouts",
      "E-waste recycling",
      "Demolition debris removal",
    ],
    sameAs: site.socials.map((s) => s.url),
    parentOrganization: { "@id": ORG },
    location: { "@id": PLACE },
    image: {
      "@type": "ImageObject",
      url: images.teamTruck.url,
      width: images.teamTruck.w,
      height: images.teamTruck.h,
      caption: images.teamTruck.alt,
    },
  };

  if (REVIEWS_ARE_REAL) {
    node.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: String(testimonials.length),
      bestRating: "5",
      worstRating: "1",
    };
  }
  return node;
}

function placeNode() {
  return {
    "@type": "Place",
    "@id": PLACE,
    name: `${site.name} — Martinez yard`,
    address: postalAddress,
    geo: geoCoordinates,
  };
}

function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": WEB,
    url: url("/"),
    name: site.name,
    description: site.tagline,
    inLanguage: "en-US",
    publisher: { "@id": ORG },
    about: { "@id": BIZ },
  };
}

function breadcrumbNode(path, trail) {
  return {
    "@type": "BreadcrumbList",
    "@id": id(path, "breadcrumb"),
    itemListElement: trail.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.label,
      item: url(b.href),
    })),
  };
}

function faqEntities(faqs) {
  return faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  }));
}

/**
 * Build the page graph.
 *
 * @param {object} o
 * @param {string} o.path        root-relative path, trailing slash
 * @param {string} o.title
 * @param {string} o.description
 * @param {string} [o.pageType]  extra @type for the WebPage node
 * @param {Array}  [o.breadcrumbs] [{label, href}] including Home
 * @param {Array}  [o.faqs]      [{q,a}] — adds FAQPage + Question nodes
 * @param {object} [o.image]     image record for primaryImageOfPage
 * @param {object} [o.service]   service record → Service node
 * @param {object} [o.city]      city record → area-scoped Service node
 * @param {object} [o.post]      post record → BlogPosting node
 * @param {Array}  [o.itemList]  [{name, url}] → ItemList for hub pages
 */
export function buildGraph(o) {
  const pageId = id(o.path, "webpage");
  const types = ["WebPage"];
  if (o.pageType) types.push(o.pageType);
  if (o.faqs && o.faqs.length) types.push("FAQPage");

  const webpage = {
    "@type": types.length === 1 ? "WebPage" : types,
    "@id": pageId,
    url: url(o.path),
    name: o.title,
    description: o.description,
    inLanguage: "en-US",
    isPartOf: { "@id": WEB },
    about: { "@id": BIZ },
    ...(o.breadcrumbs ? { breadcrumb: { "@id": id(o.path, "breadcrumb") } } : {}),
    ...(o.image ? { primaryImageOfPage: { "@type": "ImageObject", url: o.image.url, width: o.image.w, height: o.image.h, caption: o.image.alt } } : {}),
    ...(o.faqs && o.faqs.length ? { mainEntity: faqEntities(o.faqs) } : {}),
  };

  const graph = [organizationNode(), businessNode(), placeNode(), websiteNode(), webpage];
  if (o.breadcrumbs) graph.push(breadcrumbNode(o.path, o.breadcrumbs));

  if (o.service) {
    const s = o.service;
    graph.push({
      "@type": "Service",
      "@id": id(o.path, "service"),
      name: o.city ? `${s.name} in ${o.city.name}, ${site.address.region}` : s.name,
      serviceType: s.name,
      description: s.description,
      url: url(o.path),
      provider: { "@id": BIZ },
      areaServed: o.city
        ? { "@type": "City", "@id": id(`/areas-we-serve/${o.city.slug}/`, "city"), name: `${o.city.name}, ${site.address.region}` }
        : areaServed,
      ...(o.image ? { image: o.image.url } : {}),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `${s.name} — what we handle`,
        itemListElement: s.takes.map((t) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: t } })),
      },
    });
  }

  if (o.city && !o.service) {
    graph.push({
      "@type": "Service",
      "@id": id(o.path, "service"),
      name: `Junk Removal in ${o.city.name}, ${site.address.region}`,
      serviceType: "Junk removal",
      description: o.description,
      url: url(o.path),
      provider: { "@id": BIZ },
      areaServed: {
        "@type": "City",
        "@id": id(o.path, "city"),
        name: `${o.city.name}, ${site.address.region}`,
        containedInPlace: { "@type": "AdministrativeArea", name: o.city.county },
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `Services available in ${o.city.name}`,
        itemListElement: services.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", "@id": id(`/services/${s.slug}/`, "service"), name: s.name, url: url(`/services/${s.slug}/`) },
        })),
      },
    });
  }

  if (o.post) {
    const p = o.post;
    graph.push({
      "@type": "BlogPosting",
      "@id": id(o.path, "post"),
      headline: p.h1,
      alternativeHeadline: p.title,
      description: p.description,
      url: url(o.path),
      datePublished: p.date,
      dateModified: p.updated || p.date,
      inLanguage: "en-US",
      articleSection: p.category,
      wordCount: o.wordCount,
      timeRequired: `PT${p.readMins}M`,
      author: { "@id": ORG },
      publisher: { "@id": ORG },
      isPartOf: { "@id": id("/blog/", "webpage") },
      mainEntityOfPage: { "@id": pageId },
      ...(o.image ? { image: { "@type": "ImageObject", url: o.image.url, width: o.image.w, height: o.image.h } } : {}),
      about: { "@id": BIZ },
    });
  }

  if (o.itemList && o.itemList.length) {
    graph.push({
      "@type": "ItemList",
      "@id": id(o.path, "itemlist"),
      name: o.title,
      numberOfItems: o.itemList.length,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      itemListElement: o.itemList.map((it, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: it.name,
        url: url(it.url),
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
