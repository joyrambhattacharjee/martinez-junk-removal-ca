/**
 * Single source of truth for name/address/phone, canonical origin and socials.
 * Change a value here and every page, sitemap entry and schema node follows.
 */
export const site = {
  name: "Martinez Junk Removal",
  legalName: "Martinez Junk Removal LLC",
  // Canonical origin — apex, no www. Every internal URL is built from this.
  origin: "https://martinezjunkremovalca.com",
  tagline: "Junk removal & construction site clean-up in Contra Costa and Solano County",
  founded: 2014,

  phoneDisplay: "(925) 555-0142",
  phoneHref: "tel:+19255550142",
  smsHref: "sms:+19255550142",
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
  handle: "martinez.junkremovalca",
  socials: [
    { network: "Facebook", url: "https://www.facebook.com/martinez.junkremovalca", icon: "facebook" },
    { network: "Instagram", url: "https://www.instagram.com/martinez.junkremovalca", icon: "instagram" },
    { network: "Pinterest", url: "https://www.pinterest.com/martinez.junkremovalca", icon: "pinterest" },
    { network: "X", url: "https://x.com/martinez.junkremovalca", icon: "x" },
    { network: "YouTube", url: "https://www.youtube.com/@martinez.junkremovalca", icon: "youtube" },
    { network: "Threads", url: "https://www.threads.net/@martinez.junkremovalca", icon: "threads" },
    { network: "LinkedIn", url: "https://www.linkedin.com/company/martinez.junkremovalca", icon: "linkedin" },
  ],
};

export const yearsInBusiness = new Date().getFullYear() - site.founded;

/** Volume tiers — the load line. Fill % is literal: eighths of a 15-yd bed. */
export const loadTiers = [
  {
    fill: 12.5,
    label: "1/8 truck",
    yards: "~2 cu yd",
    price: "$135 – $185",
    example: "A few appliances, one office's worth of e-waste, a single mattress.",
  },
  {
    fill: 25,
    label: "1/4 truck",
    yards: "~4 cu yd",
    price: "$225 – $315",
    example: "Cubicle teardown, small garage corner, a pickup bed of demo debris.",
  },
  {
    fill: 50,
    label: "1/2 truck",
    yards: "~7.5 cu yd",
    price: "$420 – $565",
    example: "Studio apartment, retail back-of-house, one-room remodel debris.",
  },
  {
    fill: 75,
    label: "3/4 truck",
    yards: "~11 cu yd",
    price: "$610 – $780",
    example: "Two-car garage, tenant turnover, kitchen gut-out.",
  },
  {
    fill: 100,
    label: "Full truck",
    yards: "15 cu yd",
    price: "$795 – $995",
    example: "Whole-house cleanout, full office floor, multi-phase site clean-up.",
  },
];

export const trustPoints = [
  { title: "Licensed & insured", body: "General liability and workers' comp on every job. COIs and W-9s emailed the same day you ask." },
  { title: "Firm written quotes", body: "Labor, hauling and disposal in one number, confirmed before anything moves. No weight surcharges." },
  { title: "Same-day & next-day", body: "Six trucks dispatched from Arnold Industrial Way. Most of the region sees us within 24 hours." },
  { title: "Donation-first disposal", body: "65% of the average load is donated or recycled. You get the diversion paperwork for your records." },
];

