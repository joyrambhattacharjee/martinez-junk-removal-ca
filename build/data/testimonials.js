/**
 * PLACEHOLDER TESTIMONIALS — replace before launch.
 *
 * These are written copy, not collected reviews. That is why the schema builder
 * does NOT emit `Review` or `aggregateRating` nodes anywhere on the site:
 * marking up invented ratings is a Google structured-data violation and risks a
 * manual action. Once you have real reviews, drop them in here with real names
 * and dates, then flip `REVIEWS_ARE_REAL` in build/templates/schema.mjs.
 *
 * `city` must be a slug from cities.js; `service` a slug from services.js.
 */
export const REVIEWS_ARE_REAL = false;

export const testimonials = [
  {
    name: "Dana R.",
    role: "Property manager, 40 doors",
    city: "concord-ca",
    audience: "commercial",
    service: "property-cleanout",
    quote:
      "We turn units on a five-day clock and they have never been the reason we missed it. Before and after photos land in my inbox the same afternoon, which has ended two deposit arguments for me already.",
  },
  {
    name: "Miguel S.",
    role: "General contractor",
    city: "walnut-creek-ca",
    audience: "commercial",
    service: "construction-site-cleanup",
    quote:
      "I stopped renting roll-offs for remodels. They clear the site between trades and I am not paying for a container to sit in the client's driveway for ten days collecting the neighbours' furniture.",
  },
  {
    name: "Karen L.",
    role: "Homeowner",
    city: "martinez-ca",
    audience: "residential",
    service: "garage-cleanout",
    quote:
      "Two guys, three hours, and I can park in my own garage for the first time since we moved in. They swept the slab and pointed out which of the old paint had to go to the county site instead.",
  },
  {
    name: "Priya N.",
    role: "Office manager",
    city: "pleasant-hill-ca",
    audience: "commercial",
    service: "office-furniture-removal",
    quote:
      "Forty workstations out over a weekend, the good chairs donated with a receipt, and the COI was in our building's hands before I had to chase it. That last part is rarer than it should be.",
  },
  {
    name: "Tom B.",
    role: "Executor, family estate",
    city: "benicia-ca",
    audience: "residential",
    service: "estate-cleanout",
    quote:
      "They worked at my pace through my mother's house, set aside anything that looked like paperwork or photographs, and never once made me feel rushed. I was expecting a hauling company and got something kinder.",
  },
  {
    name: "Elena V.",
    role: "Restaurant owner",
    city: "vallejo-ca",
    audience: "commercial",
    service: "appliance-equipment-removal",
    quote:
      "Walk-in cooler, two fryers and a dead ice machine, disconnected and out through a back door I would have sworn was too narrow. Quoted Tuesday, gone Thursday.",
  },
  {
    name: "Greg H.",
    role: "Homeowner",
    city: "clayton-ca",
    audience: "residential",
    service: "yard-waste-removal",
    quote:
      "We cleared the hillside for defensible space and had a brush pile the size of a car. Green bin would have taken until Christmas. They took it in one load and it went to compost.",
  },
  {
    name: "Sandra M.",
    role: "Realtor",
    city: "antioch-ca",
    audience: "commercial",
    service: "property-cleanout",
    quote:
      "I use them on every listing that needs clearing before photos. Broom-clean means broom-clean, and I have never had to send anyone back for a second pass.",
  },
  {
    name: "Ray T.",
    role: "IT director",
    city: "fairfield-ca",
    audience: "commercial",
    service: "e-waste-removal",
    quote:
      "Sixty machines decommissioned with a certificate of destruction listing every serial number. My auditor asked one question and I had the answer in a folder.",
  },
  {
    name: "Nicole A.",
    role: "Homeowner",
    city: "lafayette-ca",
    audience: "residential",
    service: "furniture-removal",
    quote:
      "A sectional down a switchback staircase without a single mark on the wall. They took the good armchair to a nonprofit and emailed me the donation slip.",
  },
  {
    name: "David O.",
    role: "Family member",
    city: "pittsburg-ca",
    audience: "residential",
    service: "hoarding-cleanup",
    quote:
      "This was a hard situation and they handled it with more decency than I expected. Unmarked truck, no comments, and they found my uncle's wedding ring in a coffee tin and set it aside.",
  },
  {
    name: "Alicia W.",
    role: "Landscaper",
    city: "brentwood-ca",
    audience: "commercial",
    service: "trailer-rental",
    quote:
      "The trailer is the whole reason I use them. My crew loads as we cut, they collect it full, flat rate, no weight surprises at the end of the month.",
  },
  {
    name: "Marcus J.",
    role: "Homeowner",
    city: "richmond-ca",
    audience: "residential",
    service: "basement-cleanout",
    quote:
      "Forty years of a previous owner's storage carried up a stair I can barely get a laundry basket down. They flagged some old duct wrap as possible asbestos instead of just bagging it, which I appreciated.",
  },
  {
    name: "Hannah K.",
    role: "Homeowner",
    city: "vacaville-ca",
    audience: "residential",
    service: "attic-cleanout",
    quote:
      "It was over a hundred degrees up there and they did not blink. Everything down through the hatch, hallway covered, and the space swept out ready for new insulation.",
  },
  {
    name: "Frank D.",
    role: "Facilities lead",
    city: "danville-ca",
    audience: "commercial",
    service: "demolition-debris-removal",
    quote:
      "Tenant improvement demo on a tight inspection date. They hauled three loads in two days and sorted the metal out of it, which knocked real money off the bill.",
  },
  {
    name: "Joyce P.",
    role: "Homeowner",
    city: "suisun-city-ca",
    audience: "residential",
    service: "metal-scrap-removal",
    quote:
      "An old shed's worth of steel and a dead water heater. They weighed in the clean metal and credited it against the haul instead of quietly pocketing it.",
  },
];

/** Slug lookups used by city pages and the two audience hubs. */
export const testimonialsByCity = testimonials.reduce((acc, t) => {
  (acc[t.city] ||= []).push(t);
  return acc;
}, {});

export const testimonialsByService = testimonials.reduce((acc, t) => {
  (acc[t.service] ||= []).push(t);
  return acc;
}, {});

export const commercialTestimonials = testimonials.filter((t) => t.audience === "commercial");
export const residentialTestimonials = testimonials.filter((t) => t.audience === "residential");

/**
 * Deterministic pick so a given city always shows the same quote across builds
 * (stable HTML diffs), falling back to the audience pool when a city has none.
 */
export function testimonialFor(citySlug, audience = "residential") {
  const local = testimonialsByCity[citySlug];
  if (local && local.length) return local[0];
  const pool = audience === "commercial" ? commercialTestimonials : residentialTestimonials;
  let h = 0;
  for (let i = 0; i < citySlug.length; i++) h = (h * 31 + citySlug.charCodeAt(i)) % 9973;
  return pool[h % pool.length];
}
