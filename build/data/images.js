/**
 * Every photo on the site, in one place.
 *
 * Sources are Unsplash CDN URLs. If a photo ID ever 404s the <img> flips to a
 * styled brand panel (see `img[data-fallback]` in the stylesheet) instead of a
 * broken-image icon, and the alt text still describes the slot.
 *
 * To swap a photo: replace `url` below and keep `alt` accurate. `search` is the
 * Unsplash query that matches the intent of the slot.
 */
const CDN = "https://images.unsplash.com/";
const q = (id, w, h) => `${CDN}${id}?auto=format&fit=crop&crop=entropy&w=${w}&h=${h}&q=72`;

const img = (id, w, h, alt, search) => ({ url: q(id, w, h), w, h, alt, search });

export const images = {
  heroCrew: img(
    "photo-1504307651254-35680f356dfd",
    1500, 1080,
    "Martinez Junk Removal crew loading construction debris into a dump truck at a commercial job site in Martinez, California",
    "construction workers dump truck debris"
  ),
  commercialHub: img(
    "photo-1497366754035-f200968a6e72",
    1400, 900,
    "Empty commercial office floor cleared of furniture and ready for its next tenant after a business cleanout",
    "empty office space commercial interior"
  ),
  residentialHub: img(
    "photo-1558618666-fcd25c85cd64",
    1400, 900,
    "Living room cleared of clutter and furniture after a residential junk removal appointment",
    "clean empty living room home interior"
  ),
  commercialCleanout: img(
    "photo-1521737604893-d14cc237f11d",
    1200, 840,
    "Two-person crew carrying office chairs and boxes out of a California business during a commercial cleanout",
    "office movers carrying furniture"
  ),
  officeFurniture: img(
    "photo-1497366811353-6870744d04b2",
    1200, 840,
    "Rows of office desks and cubicle partitions being broken down for removal and donation",
    "office cubicles desks workstations"
  ),
  appliances: img(
    "photo-1556911220-bff31c812dba",
    1200, 840,
    "Stainless commercial kitchen appliances staged for disconnection and haul-away from a restaurant",
    "commercial kitchen stainless appliances"
  ),
  propertyCleanout: img(
    "photo-1600585154340-be6161a56a0c",
    1200, 840,
    "Vacant rental unit cleared and swept during a tenant turnover cleanout for a property manager",
    "empty rental house interior vacant"
  ),
  estateCleanout: img(
    "photo-1600607687939-ce8a6c25118c",
    1200, 840,
    "Sorted boxes and household goods organized for donation during an estate cleanout",
    "packed moving boxes household"
  ),
  constructionCleanup: img(
    "photo-1541888946425-d81bb19240f5",
    1200, 840,
    "Active residential construction site with framing lumber and debris staged for a phase clean-up",
    "construction site framing lumber"
  ),
  demolitionDebris: img(
    "photo-1503387762-592deb58ef4e",
    1200, 840,
    "Drywall, tile and mixed demolition debris piled inside a gutted room awaiting removal",
    "demolition debris interior gut renovation"
  ),
  trailerRental: img(
    "photo-1519003722824-194d4455a60c",
    1200, 840,
    "Heavy-duty dump trailer parked at a job site ready for a contractor to load debris",
    "dump trailer truck job site"
  ),
  garageCleanout: img(
    "photo-1647299852821-40401c0b0976",
    1200, 840,
    "Cluttered garage packed with boxes, tools and stored items before a garage cleanout",
    "cluttered garage storage boxes"
  ),
  furnitureRemoval: img(
    "photo-1555041469-a586c61ea9bc",
    1200, 840,
    "Sofa and armchairs set aside for pickup and donation during a furniture removal job",
    "sofa living room furniture"
  ),
  hoardingCleanup: img(
    "photo-1581578731548-c64695cc6952",
    1200, 840,
    "Cleaning and sorting supplies staged before a compassionate hoarding cleanup begins",
    "cleaning supplies bucket gloves"
  ),
  eWaste: img(
    "photo-1550009158-9ebf69173e03",
    1200, 840,
    "Old computers, monitors and cables sorted for certified California e-waste recycling",
    "old electronics computers monitors pile"
  ),
  metalScrap: img(
    "photo-1611284446314-60a58ac0deb9",
    1200, 840,
    "Sorted steel and aluminum scrap loaded for delivery to a certified metal recycler",
    "scrap metal recycling pile"
  ),
  yardWaste: img(
    "photo-1416879595882-3373a0480b5b",
    1200, 840,
    "Branches, brush and landscaping debris piled at the curb for green waste removal",
    "tree branches brush yard debris"
  ),
  basementCleanout: img(
    "photo-1595246140625-573b715d11dc",
    1200, 840,
    "Basement storage room stacked with boxes and old equipment before a cleanout",
    "basement storage boxes clutter"
  ),
  atticCleanout: img(
    "photo-1600566752355-35792bedcfea",
    1200, 840,
    "Attic space with stored boxes and insulation being cleared through a pull-down hatch",
    "attic storage boxes roof space"
  ),
  teamTruck: img(
    "photo-1650535716978-eb644a8cf898",
    1400, 950,
    "A dump truck parked at the curb, loaded and ready for a Martinez junk removal run",
    "work crew standing in front of truck"
  ),
  martinezWaterfront: img(
    "photo-1449034446853-66c86144b0ad",
    1400, 800,
    "Waterfront view near the Carquinez Strait in Martinez, California, part of the Contra Costa County service area",
    "california waterfront bay bridge strait"
  ),
  dispatch: img(
    "photo-1568605114967-8130f3a36994",
    1200, 800,
    "Dump truck parked outside the Martinez Junk Removal yard on Arnold Industrial Way",
    "truck parked industrial yard"
  ),
  recycling: img(
    "photo-1532996122724-e3c354a0b15b",
    1200, 800,
    "Sorted recycling and salvaged materials separated from a junk removal load for diversion",
    "recycling sorting materials facility"
  ),
};

/** Blog cover photos, keyed by post slug. */
export const postImages = {
  "junk-removal-cost-martinez": img(
    "photo-1554224155-6726b3ff858f",
    1200, 700,
    "Notepad and calculator used to estimate junk removal pricing by truck volume",
    "calculator invoice estimate desk"
  ),
  "dumpster-rental-vs-junk-removal": img(
    "photo-1590496793929-36417d3117de",
    1200, 700,
    "Roll-off dumpster sitting in a driveway next to a construction project",
    "roll off dumpster driveway construction"
  ),
  "california-e-waste-recycling-rules": img(
    "photo-1546435770-a3e426bf472b",
    1200, 700,
    "Stacked monitors and computer towers awaiting certified electronic waste recycling in California",
    "electronic waste monitors stacked"
  ),
  "contra-costa-solano-disposal-facilities": img(
    "photo-1611273426858-450d8e3c9fce",
    1200, 700,
    "Transfer station tipping floor where junk removal loads are sorted and weighed",
    "waste transfer station landfill sorting"
  ),
  "office-move-out-checklist": img(
    "photo-1524758631624-e2822e304c36",
    1200, 700,
    "Empty office with packed boxes ready for a move-out and furniture decommission",
    "office boxes moving out empty"
  ),
  "tenant-turnover-cleanout-guide": img(
    "photo-1560518883-ce09059eeffa",
    1200, 700,
    "Keys on a counter in a freshly cleared rental unit ready to be re-listed",
    "rental keys apartment turnover"
  ),
  "what-we-cannot-take": img(
    "photo-1618477388954-7852f32655ec",
    1200, 700,
    "Paint cans and household chemicals that require a household hazardous waste facility instead of a junk truck",
    "paint cans chemicals hazardous"
  ),
  "weekend-garage-cleanout-plan": img(
    "photo-1622372738946-62e02505feb3",
    1200, 700,
    "Tools and stored belongings sorted into zones on a garage floor during a weekend cleanout",
    "garage tools organized shelves"
  ),
};

/** Fallback used by the build when a slot is missing, so a page never breaks. */
export const placeholder = img(
  "photo-1504307651254-35680f356dfd",
  1200, 800,
  "Martinez Junk Removal dump truck at a job site",
  "junk removal truck"
);
