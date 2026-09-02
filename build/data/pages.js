/**
 * Copy for the pages that aren't generated from a service/city/post loop:
 * the two audience hubs, the three index hubs, about, contact, reviews, FAQ,
 * and the four legal pages.
 *
 * Legal `blocks` use the same block format as build/data/posts.js, so they go
 * through the same `prose()` renderer.
 */

export const hubs = {
  services: {
    title: "Junk Removal Services | Martinez Junk Removal",
    description:
      "All 15 junk removal services we run out of Martinez, CA — cleanouts, construction debris, appliances, e-waste, furniture, scrap metal and trailer rental.",
    h1: "Every kind of load we haul",
    lead: "Fifteen services, one crew, one number that covers labor, hauling and disposal. If your pile does not fit a category, call it in and we will tell you which one it is closest to.",
    bullets: ["Firm quotes before anything moves", "Same-day slots most weekdays", "65% of the average load diverted"],
  },
  areas: {
    title: "Areas We Serve | Contra Costa & Solano County Junk Removal",
    description:
      "Junk removal across 16 cities in Contra Costa and Solano County, dispatched from our Martinez yard. Find your city and typical response window.",
    h1: "16 cities, two counties, one yard",
    lead: "Six trucks run out of Arnold Industrial Way in Martinez. Highway 4, I-680 and I-780 put most of Contra Costa and southern Solano inside a thirty-minute drive, which is why same-day is normal here rather than a promotion.",
    bullets: ["Contra Costa & Solano County", "Most cities served within 24 hours", "Local transfer stations, local donation partners"],
  },
  blog: {
    title: "Junk Removal Guides & Local Disposal Rules | Martinez, CA",
    description:
      "Cost breakdowns, California e-waste rules, Contra Costa and Solano disposal facilities, cleanout checklists and what haulers legally cannot take.",
    h1: "Answers before you call",
    lead: "What things cost, what the state does and does not let us take, and how to get a cleanout done without paying twice. Written from the truck, not from a keyword list.",
    bullets: [],
  },
};

export const commercialHub = {
  title: "Commercial Junk Removal in Martinez & Contra Costa County",
  description:
    "Commercial junk removal for offices, retail, property managers and contractors across Contra Costa and Solano County. COIs, scheduled windows, net terms.",
  h1: "Commercial junk removal built around your building's rules",
  lead: "Offices, retail back-of-house, medical suites, warehouses, tenant turnovers and active job sites. We arrive with the certificate of insurance already on file, work the window the property manager gave you, and leave the space broom-clean for the walkthrough.",
  bullets: ["COI naming your property manager", "After-hours & weekend windows", "Net-30 and consolidated invoicing"],
  intro: [
    "Commercial work is a scheduling problem more than a hauling problem. A retail center wants the dock at 6 AM before deliveries start. A downtown high-rise will only give up the freight elevator after 6 PM. A general contractor needs the debris gone before the inspector walks the site on Thursday, not sometime this week. We build the quote around those constraints instead of asking you to work around ours.",
    "The paperwork side is handled the same way. General liability and workers' comp certificates go out the same day you ask, naming whoever the lease requires as additional insured. Recurring accounts get a standing slot and one invoice a month. Disposal is documented, so when a tenant improvement allowance or a LEED submittal needs diversion numbers, you already have them.",
  ],
  audiences: [
    {
      t: "Property managers",
      b: "Tenant turnovers, abandoned unit contents, common-area dumping and post-eviction cleanouts. Photo-documented before and after, scheduled between showings.",
    },
    {
      t: "General contractors",
      b: "Demolition debris, framing offcuts, drywall, flooring and packaging cleared between trades so the next crew is not working around a pile.",
    },
    {
      t: "Offices & medical suites",
      b: "Decommissions and refits: cubicles broken down, casework pulled, e-waste separated for certified recycling with data destruction on request.",
    },
    {
      t: "Retail & restaurants",
      b: "Back-of-house clear-outs, fixture and shelving removal, appliance and cooler hauling, all inside your center's dock window.",
    },
  ],
  proof: [
    "Certificates of insurance emailed same day, naming your entity as additional insured",
    "Uniformed crews, floor runners in corridors, elevator pads where the building requires them",
    "Recurring service agreements with a standing slot and one monthly invoice",
    "Diversion documentation for tenant-improvement and sustainability reporting",
  ],
};

export const residentialHub = {
  title: "Residential Junk Removal in Martinez, CA | Same-Day Hauling",
  description:
    "Residential junk removal in Martinez and across Contra Costa County. Garages, furniture, appliances, estates and whole-house cleanouts. Firm quotes, no weight fees.",
  h1: "Residential junk removal without the guesswork",
  lead: "Garages, spare rooms, patios, sheds, estates and whole houses. We do the carrying, the loading and the disposal — you point at what goes. The price you hear before we start is the price you pay.",
  bullets: ["We do all the lifting and carrying", "No weight surcharges, ever", "Donation receipts on request"],
  intro: [
    "Most homeowners call us for one of two reasons: something heavy needs to leave and there is no truck for it, or a room has quietly filled up over a decade and the job stopped being a weekend project. Either way the mechanics are the same. Tell us what is going, get a firm number that includes labor and dump fees, and pick a window. Nothing moves until you have agreed to the price.",
    "We work the way you would want a crew to work in your own house. Doorways and stair treads get protected, we ask before anything ambiguous goes on the truck, and we sweep the space when the last item is loaded. Anything with life left in it goes to a local donation partner rather than the landfill, and we will bring you the receipt.",
  ],
  audiences: [
    {
      t: "Garages & storage rooms",
      b: "The classic: a decade of boxes, broken furniture, paint-adjacent clutter and a bike nobody has ridden since 2016. One visit, floor visible again.",
    },
    {
      t: "Downsizing & estates",
      b: "Patient, discreet work with families. We sort as we go, set keepsakes aside, and route usable furniture to donation with paperwork.",
    },
    {
      t: "Furniture & appliances",
      b: "Sectionals through tight stairwells, mattresses, treadmills, fridges, water heaters. Disconnected, carried out and recycled properly.",
    },
    {
      t: "Yard, deck & shed debris",
      b: "Storm limbs, fence panels, old decking, pavers and dirt from a landscaping project, plus the shed it was all stored in.",
    },
  ],
  proof: [
    "Firm quote by phone or from a photo before the crew is dispatched",
    "All labor included — we carry from wherever the item sits, upstairs or down",
    "Floors and door frames protected, space swept before we leave",
    "Donation-first sorting with receipts for anything given away",
  ],
};

export const aboutPage = {
  title: "About Martinez Junk Removal | Family-Run Since 2014",
  description:
    "A family-run hauling company on Arnold Industrial Way in Martinez, CA. Six trucks, 16 cities, and 65% of the average load kept out of the landfill.",
  h1: "A Martinez hauling company, not a franchise",
  lead: "One truck, one trailer and a Contra Costa County business license in 2014. Six trucks and sixteen cities later, the yard is still on Arnold Industrial Way and the phone still gets answered by someone who has been on a job site this week.",
  blocks: [
    {
      t: "p",
      x: "Martinez Junk Removal started because a contractor kept getting quoted one price on the phone and charged another at the curb. That is a small problem with a simple fix: quote the whole job, include the dump fees, and do not move a thing until the customer has agreed to the number. Every process we have since built sits on top of that one rule.",
    },
    { t: "h2", x: "Why the load line exists" },
    {
      t: "p",
      x: "Junk removal is priced by volume, not weight, because volume is the thing you can actually see. A 15-cubic-yard dump body holds a predictable amount, so we marked ours in eighths and quote against those marks. You can look at the same line we do and understand why a garage is three-quarters and a mattress is an eighth. It also means a load of broken concrete and a load of cardboard cost the same to haul — no weight surcharges after the fact.",
    },
    { t: "h2", x: "Where the load actually goes" },
    {
      t: "p",
      x: "About 65% of an average load never reaches a landfill. Metal goes to scrap, electronics go to a certified e-waste processor because [California law does not allow them in the trash](/blog/california-e-waste-recycling-rules/), clean wood and green waste get chipped, and furniture with life left in it goes to a local donation partner. What is left is the genuine remainder, and it goes to the transfer station with a receipt we will hand you if you want it.",
    },
    {
      t: "note",
      x: "We are licensed and insured, and we carry general liability plus workers' comp on every job. Certificates go out the same day you ask — property managers and general contractors never have to chase us for paperwork.",
    },
    { t: "h2", x: "How we work" },
    {
      t: "ul",
      x: [
        "Quote first. Labor, hauling and disposal in one number, confirmed before anything moves.",
        "Two people minimum on every job, so nothing gets dragged across a floor that should be carried.",
        "We ask before anything ambiguous goes on the truck. Nobody has ever been happy about a keepsake that got loaded by accident.",
        "The space gets swept. A cleanout that leaves a ring of debris is not finished.",
      ],
    },
    { t: "h2", x: "The area we cover" },
    {
      t: "p",
      x: "From the yard we can be almost anywhere in central Contra Costa in twenty minutes, and across the Benicia–Martinez Bridge into southern Solano in about the same. That geography is the whole reason same-day works here. The full list is on the [areas we serve](/areas-we-serve/) page, county by county, with the response window we can realistically hold for each city.",
    },
  ],
  values: [
    { t: "Firm numbers", b: "The quote includes dump fees. If the pile grows before we arrive, we requote out loud rather than adjusting the invoice quietly." },
    { t: "Local dispatch", b: "Six trucks from one Martinez yard. Nobody is driving in from another county and billing you for the fuel." },
    { t: "Donation first", b: "Usable furniture, appliances and building materials go to local nonprofits before they go anywhere else." },
    { t: "Paperwork that keeps up", b: "COIs, W-9s, diversion documentation and consolidated invoices, sent the day you ask for them." },
  ],
  milestones: [
    { year: "2014", t: "One truck, one trailer", b: "Started with residential garage cleanouts around Martinez and Pleasant Hill." },
    { year: "2017", t: "First commercial accounts", b: "Retail back-of-house and property-management turnovers in Concord and Walnut Creek." },
    { year: "2020", t: "Construction division", b: "Added job-site clean-up and demolition debris for general contractors along the Highway 4 corridor." },
    { year: "2023", t: "Across the strait", b: "Regular service into Benicia, Vallejo, Fairfield, Suisun City and Vacaville." },
  ],
};

export const contactPage = {
  title: "Contact Martinez Junk Removal | Call or Text a Photo",
  description:
    "Call (925) 555-0142 or text a photo for a firm junk removal quote in Martinez, CA. Hours, yard address, service area and a map to our Arnold Industrial Way yard.",
  h1: "Get a firm quote in one call",
  lead: "Tell us what needs to go and roughly where it sits. You get a number that covers labor, hauling and disposal — and in most of the service area, a truck within 24 hours.",
  blocks: [
    { t: "h2", x: "What to have ready" },
    {
      t: "ul",
      x: [
        "A rough idea of volume — a corner, a room, a garage, a whole house.",
        "Anything heavy or awkward: safes, pianos, treadmills, hot tubs, appliances.",
        "Where it sits: ground floor, second floor, behind a gate, up a long driveway.",
        "For commercial work: the building's insurance requirements and access window.",
      ],
    },
    {
      t: "p",
      x: "A photo answers most of that in one message. Text one to the number above and you will usually have a price back inside the hour on a weekday.",
    },
  ],
};

export const reviewsPage = {
  title: "Reviews | Martinez Junk Removal, Martinez CA",
  description:
    "What homeowners, property managers and contractors across Contra Costa and Solano County say about working with Martinez Junk Removal.",
  h1: "What customers say",
  lead: "Sixteen cities' worth of jobs, from a single mattress in Pleasant Hill to a full office floor in Walnut Creek. Here is the kind of feedback we get, grouped by who was doing the calling.",
};

export const faqPage = {
  title: "Junk Removal FAQ | Pricing, Items & Scheduling",
  description:
    "How junk removal pricing works, what we can and cannot take, how fast we can get there, and how commercial insurance and scheduling are handled.",
  h1: "Questions we get every week",
  lead: "Pricing, prohibited items, timing, access and paperwork. If your question is not here, call — you will get a straight answer rather than a callback form.",
  groups: [
    {
      title: "Pricing & quotes",
      faqs: [
        {
          q: "How much does junk removal cost?",
          a: "Price follows volume — how much of the 15-cubic-yard truck bed your load fills. An eighth of a truck runs $135–$185, a half is $420–$565, and a full truck is $795–$995. Labor, hauling and disposal fees are inside that number. Heavy single items like a hot tub, a safe or a concrete slab are quoted separately because they need equipment rather than space. The full breakdown is in our [Martinez junk removal cost guide](/blog/junk-removal-cost-martinez/).",
        },
        {
          q: "Is the quote firm, or does it change on the day?",
          a: "It is firm for the load you described. If the pile has grown between the quote and the appointment — which happens, people keep finding things — we requote out loud before we start loading and you decide. Nothing gets added to an invoice after the fact, and we never charge by weight, so a load of tile costs the same as a load of cardboard.",
        },
        {
          q: "Can you quote from a photo?",
          a: "Yes, and it is the fastest route. Text a photo of the pile, the garage or the pallet stack to (925) 555-0142 with your city and a note about access — ground floor, second floor, behind a gate. Most photo quotes come back inside the hour on a weekday.",
        },
        {
          q: "Do you charge for the estimate or the drive?",
          a: "No. Quotes, on-site walkthroughs for larger commercial jobs, and travel inside our 16-city service area are all free. You pay for the load, not for us showing up to look at it.",
        },
      ],
    },
    {
      title: "What we take — and what we can't",
      faqs: [
        {
          q: "What items do you take?",
          a: "Furniture, mattresses, appliances, electronics, scrap metal, construction and demolition debris, yard waste, garage and attic clutter, office furniture and cubicles, retail fixtures, hot tubs, pianos, playsets and sheds. If it is not hazardous and two people with a truck can move it, we can almost certainly haul it.",
        },
        {
          q: "What can't you take?",
          a: "Wet paint, solvents, motor oil, pesticides, propane tanks, batteries in bulk, asbestos-containing material, medical and biohazard waste, and ammunition. These are regulated separately and a general hauler is not licensed for them. We tell you which county household-hazardous-waste facility takes each one — the details are in [what we cannot take](/blog/what-we-cannot-take/).",
        },
        {
          q: "Do you take appliances with refrigerant?",
          a: "Yes. Fridges, freezers, window units and dehumidifiers all go to a processor that recovers the refrigerant before the shell is recycled, which is what the law requires. We handle the disconnection of the appliance itself; a plumber or electrician has to handle anything hard-plumbed or hard-wired.",
        },
        {
          q: "Can you take electronics and computers?",
          a: "Electronics are banned from California landfills, so we route every item to a certified e-waste processor. Business drives and servers can be wiped or physically destroyed with a certificate on request. See [California e-waste recycling rules](/blog/california-e-waste-recycling-rules/) for what that covers.",
        },
      ],
    },
    {
      title: "Scheduling & access",
      faqs: [
        {
          q: "How fast can you get here?",
          a: "Same-day is normal for Martinez, Pleasant Hill, Concord and Walnut Creek if you call before noon. Everywhere else in our 16 cities is usually next-day. The per-city response window is listed on each [service area page](/areas-we-serve/).",
        },
        {
          q: "Do I need to be there?",
          a: "For most residential jobs, yes — someone should point at what goes and approve the final load. For property managers and repeat commercial accounts we work from a written scope, a photo set and a lockbox or access code, then send before-and-after photos.",
        },
        {
          q: "Do I have to move anything to the curb?",
          a: "No. The quote assumes we do the carrying, from wherever the item currently sits — a second-floor bedroom, the back of a shed, the bottom of a basement stairwell. If the carry is unusually long, mention it when you call so the estimate reflects it.",
        },
        {
          q: "Can you work evenings or weekends?",
          a: "Saturdays run 7 AM to 4 PM as standard. Sundays are by appointment. Evening and after-hours windows are common on commercial work, because that is often the only time a freight elevator or a loading dock is available.",
        },
      ],
    },
    {
      title: "Commercial, insurance & paperwork",
      faqs: [
        {
          q: "Are you licensed and insured?",
          a: "Yes — general liability and workers' compensation on every job. We email the certificate the same day you ask and can name your entity or property management company as additional insured, which is what most commercial leases require before a vendor is allowed on site.",
        },
        {
          q: "Do you offer recurring commercial service?",
          a: "Yes. Retail centers, offices and property managers can hold a standing weekly or monthly slot with one consolidated invoice. Net-30 terms are available for established accounts. Start on the [commercial junk removal](/commercial-junk-removal/) page.",
        },
        {
          q: "Can you provide diversion or disposal documentation?",
          a: "We can. Tenant-improvement allowances, LEED submittals and municipal C&D ordinances often require proof of where the debris went, so we keep transfer-station and recycler receipts and can summarize the diversion rate for a specific job.",
        },
      ],
    },
    {
      title: "Disposal & recycling",
      faqs: [
        {
          q: "Where does my stuff actually go?",
          a: "Metal goes to scrap, electronics to a certified e-waste processor, clean wood and green waste to a chipper, and usable furniture and building materials to local nonprofits. The genuine remainder goes to a Contra Costa or Solano transfer station. On average about 65% of a load never sees a landfill; the facilities we use are listed in our [county disposal facilities guide](/blog/contra-costa-solano-disposal-facilities/).",
        },
        {
          q: "Can I get a donation receipt?",
          a: "Yes, when the receiving nonprofit issues one. Tell us at the quote stage that donation matters to you and we will sort accordingly and bring the paperwork back rather than deciding at the truck.",
        },
        {
          q: "Should I rent a dumpster instead?",
          a: "If your project runs for days and you want to load at your own pace, a dumpster or one of our trailers is often cheaper. If you want it gone today without doing the lifting, a crew is faster and usually costs less overall once permits and driveway damage are considered. The trade-offs are laid out in [dumpster rental vs. junk removal](/blog/dumpster-rental-vs-junk-removal/).",
        },
      ],
    },
  ],
};

/**
 * Legal pages. These are plain-language starting points that describe how this
 * particular site and business actually operate — they are not a substitute for
 * review by a California attorney before launch. Each page says so in print.
 */
const LEGAL_UPDATED = "2026-08-01";

export const legalPages = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy | Martinez Junk Removal",
    description: "What Martinez Junk Removal collects when you call, text or email us, how long we keep it, who we share it with, and your California privacy rights.",
    h1: "Privacy policy",
    lead: "This site has no forms, no accounts and no advertising trackers. The information we hold about you is almost entirely what you told us on the phone.",
    updated: LEGAL_UPDATED,
    blocks: [
      { t: "note", x: "This policy describes our actual practices in plain language. It is not legal advice, and it should be reviewed by a California attorney before you rely on it for compliance." },
      { t: "h2", x: "Who we are" },
      { t: "p", x: "Martinez Junk Removal LLC, 1230 Arnold Industrial Way, Martinez, CA 94553. You can reach us at (925) 555-0142 or info@martinezjunkremovalca.com about anything on this page." },
      { t: "h2", x: "What we collect" },
      { t: "ul", x: ["Contact details you give us — name, phone number, email address and service address — when you call, text or email for a quote.", "Job details: what needs removing, photos you send, access notes, and the price we quoted.", "Payment records for completed work, retained for tax and accounting purposes.", "Standard web server logs, which may include your IP address, browser type and the pages requested."] },
      { t: "p", x: "There are no contact forms on this site. Nothing is collected from you by this website beyond ordinary server logs unless you choose to call, text or email us." },
      { t: "h2", x: "What we do not do" },
      { t: "ul", x: ["We do not sell or rent your personal information. Ever, to anyone.", "We do not run advertising or cross-site tracking pixels on this site.", "We do not require an account, a login or a password.", "We do not knowingly collect information from anyone under 13."] },
      { t: "h2", x: "Third parties this site touches" },
      { t: "p", x: "Two external services load on some pages: Google Fonts serves the typefaces, and Google Maps supplies the embedded maps on the contact page and each city page. Your browser contacts Google directly for those, and Google's own privacy policy governs that request. Photographs are served from Unsplash's image CDN. None of these receive any information you have given us." },
      { t: "h2", x: "How long we keep things" },
      { t: "p", x: "Quote enquiries that do not become jobs are cleared out within roughly two years. Records tied to completed, invoiced work are kept as long as California tax and business record requirements demand, typically seven years." },
      { t: "h2", x: "Your California rights" },
      { t: "p", x: "Under the California Consumer Privacy Act, as amended, you can ask us what personal information we hold about you, ask for a copy of it, ask us to correct it, and ask us to delete it. Because we do not sell personal information, there is nothing to opt out of. Call (925) 555-0142 or email info@martinezjunkremovalca.com and we will verify who you are and respond within 45 days. We will not treat you differently for asking." },
      { t: "h2", x: "Security" },
      { t: "p", x: "Job records live in access-controlled business systems and are seen only by the people who need them to schedule, complete or invoice work. No system is perfectly secure, and we do not claim otherwise." },
      { t: "h2", x: "Changes" },
      { t: "p", x: "If this policy changes we update the date at the top of the page. Material changes will be described here rather than slipped in silently." },
    ],
  },
  {
    slug: "terms-of-service",
    title: "Terms of Service | Martinez Junk Removal",
    description: "Quotes, scheduling, payment, cancellations, prohibited items and liability terms for junk removal work performed by Martinez Junk Removal LLC.",
    h1: "Terms of service",
    lead: "The working agreement between us: how quotes are given, what happens if the load changes, what we cannot legally take, and who is responsible for what.",
    updated: LEGAL_UPDATED,
    blocks: [
      { t: "note", x: "These terms describe how we operate. They are a plain-language starting point, not legal advice, and should be reviewed by a California attorney before you rely on them." },
      { t: "h2", x: "Scope" },
      { t: "p", x: "These terms cover junk removal, hauling, cleanout, debris removal and trailer rental services performed by Martinez Junk Removal LLC, and your use of this website. Booking a job means you accept them. A signed written agreement for commercial or recurring work overrides anything here that conflicts with it." },
      { t: "h2", x: "Quotes" },
      { t: "p", x: "Quotes are based on the volume, contents and access you describe. A quote covers labor, hauling and standard disposal fees for that described load. Quotes given by phone, text or email are valid for 30 days." },
      { t: "p", x: "If the actual load is materially larger than described, or contains heavy or restricted material we were not told about, we will requote before loading and you may accept it, reduce the load, or cancel at no charge. We do not add charges to an invoice after work is complete." },
      { t: "h2", x: "Scheduling and access" },
      { t: "p", x: "Appointment windows are estimates. Traffic, transfer-station queues and preceding jobs move them, and we will call if we are running late. You are responsible for providing safe, legal access to the items — gate codes, elevator reservations, parking, and a path our crew can actually walk." },
      { t: "h2", x: "Items we cannot accept" },
      { t: "p", x: "We are not licensed to transport hazardous waste. We cannot take wet paint, solvents, fuels, motor oil, pesticides, propane or pressurized tanks, bulk batteries, asbestos-containing material, medical or biohazard waste, or ammunition and explosives. If prohibited material is discovered mid-job we will stop, leave it in place, and tell you which county facility accepts it." },
      { t: "h2", x: "Ownership and authority" },
      { t: "p", x: "By pointing at an item you confirm you own it or are authorized to have it removed. Removal is final: we cannot retrieve items once a load has been tipped or delivered to a recycler. Check boxes, drawers, safes and pockets before we arrive." },
      { t: "h2", x: "Payment" },
      { t: "p", x: "Residential work is due on completion. Commercial accounts may be invoiced on agreed terms, typically net 30. We accept cash, card and business check. Past-due balances may accrue interest at the maximum rate California law allows." },
      { t: "h2", x: "Cancellation" },
      { t: "p", x: "Cancel or reschedule any time before the crew is dispatched at no charge. If a crew arrives at a confirmed appointment and cannot access the items or nobody is present to authorize the work, a trip fee may apply." },
      { t: "h2", x: "Liability" },
      { t: "p", x: "We carry general liability and workers' compensation insurance and we work carefully — floor protection, door-frame padding, two-person carries. We are responsible for damage our crew causes through negligence. We are not responsible for pre-existing damage, wear revealed when a heavy item is moved off a floor or wall, damage to items you asked us to remove, or damage arising from access routes you directed us to use against our advice. Report any concern within 48 hours so we can inspect it." },
      { t: "p", x: "Nothing in these terms limits liability that cannot be limited under California law." },
      { t: "h2", x: "Trailer rental" },
      { t: "p", x: "Rented trailers stay our property. You are responsible for loading within the stated weight and fill limits, keeping prohibited material out, and not moving the trailer once it is placed. Overweight, over-filled or contaminated loads may incur additional disposal charges, which we will document." },
      { t: "h2", x: "Governing law" },
      { t: "p", x: "These terms are governed by the laws of the State of California, and any dispute belongs to the state or federal courts serving Contra Costa County." },
    ],
  },
  {
    slug: "disclaimer",
    title: "Disclaimer | Martinez Junk Removal",
    description: "Limits on the pricing estimates, disposal guidance and third-party facility information published on the Martinez Junk Removal website.",
    h1: "Disclaimer",
    lead: "What the numbers and guidance on this site are, and what they are not. Short version: the prices are ranges, the disposal rules change, and only a quote is a quote.",
    updated: LEGAL_UPDATED,
    blocks: [
      { t: "note", x: "This page is a plain-language disclaimer, not legal advice. Have a California attorney review it before launch." },
      { t: "h2", x: "Pricing is indicative until we quote it" },
      { t: "p", x: "Every price range on this site — the load-line tiers, the cost guide, the per-service notes — reflects typical jobs in our service area. Your job is priced on its own volume, contents and access. Only a quote given to you directly by phone, text or email is binding, and it is binding for the load we were told about." },
      { t: "h2", x: "Third-party facilities and hours" },
      { t: "p", x: "We name transfer stations, recycling centers, household-hazardous-waste sites and donation partners as a convenience. We do not operate any of them. Their hours, accepted materials, residency requirements and fees change without telling us, so confirm directly with the facility before you drive there with a trailer." },
      { t: "h2", x: "Regulatory information" },
      { t: "p", x: "Our articles describe California and county disposal rules as we understand them at the time of writing — e-waste bans, refrigerant handling, construction-and-demolition diversion ordinances. Regulations change, and interpretation varies by jurisdiction. Nothing here is legal, environmental-compliance or engineering advice. If a permit, an abatement contractor or a licensed hazardous-waste hauler is required for your situation, engage one." },
      { t: "h2", x: "Statistics on this site" },
      { t: "p", x: "Figures such as our diversion rate and completed-job count are internal operational numbers, rounded, and describe past averages. They are not a guarantee of the outcome on any individual job." },
      { t: "h2", x: "Testimonials" },
      { t: "p", x: "Testimonials describe the experience of individual customers on specific jobs. They are not a promise that your job will go the same way. We deliberately publish no aggregate star rating on this site." },
      { t: "h2", x: "External links" },
      { t: "p", x: "Links to other websites are provided for reference. We do not control their content and are not responsible for it." },
      { t: "h2", x: "No professional relationship" },
      { t: "p", x: "Reading this site does not create a contractor–client relationship. That begins when we agree on a scope and a price for actual work." },
    ],
  },
  {
    slug: "accessibility",
    title: "Accessibility Statement | Martinez Junk Removal",
    description: "How this site is built for accessibility, the WCAG 2.2 AA standard we target, known limitations, and how to tell us about a barrier you hit.",
    h1: "Accessibility statement",
    lead: "This site is built to be usable with a keyboard, a screen reader, a magnifier, or with JavaScript switched off entirely. If something blocks you, we want to hear about it and we will fix it.",
    updated: LEGAL_UPDATED,
    blocks: [
      { t: "h2", x: "The standard we target" },
      { t: "p", x: "We aim for the Web Content Accessibility Guidelines (WCAG) 2.2 at Level AA. That is the benchmark referenced by the Americans with Disabilities Act in practice and by California state accessibility requirements." },
      { t: "h2", x: "What we have actually done" },
      { t: "ul", x: ["Every page starts with a skip link straight to the main content.", "The whole site is navigable by keyboard, with a visible high-contrast focus ring on every interactive element.", "Navigation menus open on focus as well as hover, so they work without a mouse and without JavaScript.", "FAQ accordions use native HTML details and summary elements, which screen readers and keyboards already understand.", "Body text meets or exceeds a 4.5:1 contrast ratio; the amber used for buttons carries dark text on top rather than white.", "Every image has descriptive alternative text, and decorative graphics are hidden from assistive technology.", "Images and embedded maps declare their dimensions, so the page does not jump around as it loads.", "Animation is limited, and it is switched off entirely for anyone whose system requests reduced motion.", "Page structure uses one H1 and a real heading hierarchy, so screen-reader users can navigate by heading.", "Text reflows without horizontal scrolling down to a 320-pixel-wide viewport and at 200% zoom."] },
      { t: "h2", x: "Known limitations" },
      { t: "ul", x: ["The embedded Google Maps frames are third-party content. They are labelled with a title, and every address and phone number in them is also available as plain text elsewhere on the page, but we do not control their internal accessibility.", "Photographs are served from a third-party image CDN. If it is unreachable, a styled placeholder panel appears in place of the photo; no information is lost, because photos on this site are illustrative rather than informational."] },
      { t: "h2", x: "Alternatives, if the site is not working for you" },
      { t: "p", x: "You never have to use this website to do business with us. Call (925) 555-0142 during business hours and a person will take the whole job down over the phone. You can also text a photo to the same number, or email info@martinezjunkremovalca.com. We will read a quote aloud, send it in large print, or send it in plain text without formatting — whichever works for you." },
      { t: "h2", x: "Tell us about a barrier" },
      { t: "p", x: "If you hit something on this site you cannot use, call or email us and describe what happened, which page you were on, and what you were using — browser, screen reader, magnifier. We treat accessibility bugs as real bugs and aim to respond within three business days." },
    ],
  },
];
