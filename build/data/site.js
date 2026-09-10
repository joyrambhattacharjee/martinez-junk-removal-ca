/**
 * Single source of truth for name/address/phone, canonical origin and socials.
 * Change a value here and every page, sitemap entry and schema node follows.
 */
export const site = {
  name: "Martinez Junk Removal",
  legalName: "Martinez Junk Removal CA",
  // Canonical origin — apex, no www. Every internal URL is built from this.
  origin: "https://martinezjunkremovalca.com",
  tagline: "Junk removal & construction site clean-up in Contra Costa and Solano County",
  founded: 2014,

  phoneDisplay: "(877) 744-5791",
  phoneHref: "tel:+18777445791",
  smsHref: "sms:+18777445791",
  email: "info@martinezjunkremovalca.com",

  address: {
    street: "1230 Arnold Industrial Way",
    city: "Martinez",
    region: "CA",
    regionName: "California",
    postalCode: "94553",
    country: "US",
  },
  geo: { lat: 38.0194, lng: -122.1341 },
  mapQuery: "1230 Arnold Industrial Way, Martinez, CA 94553",

  hours: [
    { label: "Monday – Friday", value: "7:00 AM – 6:00 PM", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], open: "07:00", close: "18:00" },
    { label: "Saturday", value: "7:00 AM – 4:00 PM", days: ["Saturday"], open: "07:00", close: "16:00" },
    { label: "Sunday", value: "By appointment", days: ["Sunday"], open: "08:00", close: "14:00" },
  ],

  stats: {
    diversion: 65,
    jobs: "4,800+",
    cities: 16,
    trucks: 6,
  },

  // Same handle across every network, per the brand's naming convention.
  handle: "martinezjunkremovalca",
  socials: [
    { network: "Facebook", url: "https://www.facebook.com/martinezjunkremoveca", icon: "facebook" },
    { network: "Instagram", url: "https://martinezjunkremovalca.com/", icon: "instagram" },
    { network: "Pinterest", url: "https://www.pinterest.com/martinezjunkremovalca", icon: "pinterest" },
    { network: "X", url: "https://x.com/martjunkremoval", icon: "x" },
    { network: "YouTube", url: "https://www.youtube.com/@martinezjunkremovalca", icon: "youtube" },
    { network: "Threads", url: "https://www.threads.net/@martinezjunkremovalca", icon: "threads" },
    { network: "LinkedIn", url: "https://www.linkedin.com/company/martinezjunkremovalca", icon: "linkedin" },
  ],
};

export const yearsInBusiness = new Date().getFullYear() - site.founded;

/** Volume tiers removed from public output. */
export const loadTiers = [];

export const trustPoints = [
  { title: "Licensed & insured", body: "General liability and workers' comp on every job. COIs and W-9s emailed the same day you ask." },
  { title: "Firm written quotes", body: "Labor, hauling and disposal in one number, confirmed before anything moves. No weight surcharges." },
  { title: "Same-day & next-day", body: "Six trucks dispatched from Arnold Industrial Way. Most of the region sees us within 24 hours." },
  { title: "Donation-first disposal", body: "65% of the average load is donated or recycled. You get the diversion paperwork for your records." },
];

