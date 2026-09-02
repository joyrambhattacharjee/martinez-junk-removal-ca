/**
 * Service-area cities. Each entry carries genuinely local detail — real
 * neighborhoods, landmarks, ZIPs, drive time from the Arnold Industrial Way
 * yard — so city pages describe an actual place instead of swapping a name.
 */
export const cities = [
  {
    slug: "martinez-ca",
    name: "Martinez",
    county: "Contra Costa County",
    zips: ["94553"],
    drive: "0 mi — our home yard",
    response: "Same-day in most cases",
    hq: true,
    neighborhoods: ["Downtown Martinez", "Alhambra Valley", "Vine Hill", "Morello Heights", "Franklin Hills", "Virginia Hills", "Mountain View"],
    landmarks: ["Martinez Marina", "John Muir National Historic Site", "Contra Costa County Courthouse", "Amtrak Capitol Corridor station", "Carquinez Strait waterfront"],
    intro:
      "Martinez is home base. Our yard sits on Arnold Industrial Way, minutes from the county courthouse, the marina and the Highway 4 corridor, which is why Martinez jobs usually get a same-day slot. We work the full spread of the city: downtown storefronts and second-floor offices with no loading dock, Alhambra Valley properties with long private driveways, refinery-adjacent industrial tenants on Waterbird Way, and hillside homes in Franklin Hills and Virginia Hills where the garage is the only staging area.",
    logistics:
      "Downtown Martinez has metered street parking and narrow one-ways around Main and Ferry, so we send the smaller truck and stage the load rather than blocking a lane. For county and courthouse-area buildings we can schedule before 8 AM or after 5 PM to stay out of tenant traffic. Loads go to the Contra Costa transfer and recovery facility on Waterbird Way, with donations routed to Martinez-area nonprofits.",
    faqs: [
      {
        q: "Can you handle downtown Martinez buildings without a loading dock?",
        a: "Yes. Most of our downtown work is walk-out: we carry through the front or a rear alley door, protect stair treads and door frames, and stage the load on the truck so we are never parked across a lane longer than necessary. If the building requires a certificate of insurance or a specific elevator reservation window, send us the requirements and we will have the paperwork over before the crew rolls.",
      },
      {
        q: "Do you serve Alhambra Valley and the hillside neighborhoods?",
        a: "Regularly. Long private drives, tight turnarounds and steep approaches are normal for us — we bring the truck that fits the driveway and shuttle from the house if the grade is too tight for the dump body. Tell us roughly how far the carry is when you call so the quote reflects it.",
      },
    ],
    nearby: ["pleasant-hill-ca", "concord-ca", "benicia-ca", "walnut-creek-ca"],
  },
  {
    slug: "concord-ca",
    name: "Concord",
    county: "Contra Costa County",
    zips: ["94518", "94519", "94520", "94521"],
    drive: "8 mi via Highway 4",
    response: "Same-day slots most weekdays",
    neighborhoods: ["Downtown Concord", "Ygnacio Valley", "Clayton Valley", "Monument Corridor", "Dana Estates", "Sun Terrace"],
    landmarks: ["Todos Santos Plaza", "Sunvalley Shopping Center", "Concord Pavilion", "Concord BART", "the former Concord Naval Weapons Station"],
    intro:
      "Concord is our busiest city outside Martinez, and most of the volume is commercial. We clear retail back-of-house at Sunvalley, restaurant kitchens around Todos Santos Plaza, medical and dental suites along Willow Pass and Clayton Road, and warehouse tenants in the industrial pocket off Highway 4. On the residential side, the ranch homes in Dana Estates and Sun Terrace generate a steady stream of garage, patio and estate cleanouts.",
    logistics:
      "Shopping-center work almost always means a dock or compactor area with a scheduled window, and we plan around delivery traffic rather than fighting it. Concord's larger office parks want a COI naming the property manager as additional insured — send the requirements and we will have it filed before the appointment. Highway 4 and 242 put our truck in Concord in about fifteen minutes, so same-day calls before noon usually get served the same afternoon.",
    faqs: [
      {
        q: "Do you work with Concord shopping centers and multi-tenant retail?",
        a: "Yes, and we schedule around the center's rules rather than yours. That means dock or compactor-area access at an agreed window, crews in uniform, a COI naming the property management company, and a broom-clean finish so the space passes a walkthrough. Recurring retail accounts get a standing slot and one consolidated monthly invoice.",
      },
      {
        q: "Can you clear a warehouse or industrial unit off Highway 4?",
        a: "That is routine work for us — pallet racking, mixed inventory, broken pallets, old shelving, office furniture from the front suite, and scrap metal all in one visit. Racking and heavy steel get quoted by the cubic yard, and sellable scrap can be credited against the haul to bring the total down.",
      },
    ],
    nearby: ["pleasant-hill-ca", "martinez-ca", "clayton-ca", "walnut-creek-ca"],
  },
  {
    slug: "walnut-creek-ca",
    name: "Walnut Creek",
    county: "Contra Costa County",
    zips: ["94595", "94596", "94597", "94598"],
    drive: "10 mi via I-680",
    response: "Same-day or next morning",
    neighborhoods: ["Downtown Walnut Creek", "Rossmoor", "Northgate", "Saranap", "The Woodlands", "Walnut Heights"],
    landmarks: ["Broadway Plaza", "Lesher Center for the Arts", "Iron Horse Regional Trail", "Walnut Creek BART", "Mount Diablo foothills"],
    intro:
      "Walnut Creek splits neatly into two kinds of work. Downtown and the Broadway Plaza district give us professional-office decommissions, medical suite refits and retail turnovers, usually in buildings with a freight elevator, a reserved dock and a strict insurance file. North of downtown, Rossmoor and the Northgate neighborhoods bring downsizing and estate cleanouts where families need patience, discretion and donation receipts more than they need speed.",
    logistics:
      "Downtown high-rises require elevator reservations and after-hours windows, and Rossmoor has its own gate check-in and contractor rules that we are used to following. We arrive with a COI already on file, keep the corridor protected with floor runners, and haul out through the route the building manager specifies. I-680 puts us in Walnut Creek in about twenty minutes outside commute hours.",
    faqs: [
      {
        q: "Can you work inside Rossmoor?",
        a: "Yes. We check in at the gate, follow the community's contractor hours, and keep crews and trucks where they are supposed to be. Rossmoor jobs are usually downsizing moves, so we sort as we go, set aside anything the family wants to keep, and route quality furniture to donation with a receipt.",
      },
      {
        q: "Do you handle downtown office decommissions after hours?",
        a: "Regularly. Evening and weekend windows are often the only way to get a freight elevator, so we build the quote around your building's reservation slot. Cubicles get broken down, e-waste is separated for certified recycling with data destruction on request, and the floor is left broom-clean for the landlord walkthrough.",
      },
    ],
    nearby: ["pleasant-hill-ca", "lafayette-ca", "danville-ca", "concord-ca"],
  },
  {
    slug: "pleasant-hill-ca",
    name: "Pleasant Hill",
    county: "Contra Costa County",
    zips: ["94523"],
    drive: "5 mi via Contra Costa Blvd",
    response: "Same-day, often within hours",
    neighborhoods: ["Gregory Gardens", "Poets Corner", "Sherman Acres", "Golf Club Road corridor", "Downtown Pleasant Hill"],
    landmarks: ["Diablo Valley College", "Pleasant Hill BART", "Downtown Pleasant Hill", "Paso Nogal Park", "Contra Costa Boulevard retail corridor"],
    intro:
      "Pleasant Hill is close enough that we often clear a job the same morning it is booked. The Contra Costa Boulevard corridor keeps us busy with retail and restaurant turnovers, the Diablo Valley College area brings student-housing and rental cleanouts every summer, and the mid-century tracts in Gregory Gardens and Poets Corner produce garage, shed and yard-waste hauls where the driveway is the only workspace.",
    logistics:
      "Most of Pleasant Hill is single-story with a real driveway, which keeps carries short and prices predictable. Around the BART station and Downtown Pleasant Hill we deal with shared parking structures and posted height limits, so we send the truck that clears the deck instead of getting stuck at the entrance. Summer rental turnovers book out fast — give us a few days if your unit list is long.",
    faqs: [
      {
        q: "How fast can you get to Pleasant Hill?",
        a: "Faster than almost anywhere else we serve. The yard is about ten minutes up Contra Costa Boulevard, so a call before noon frequently gets a same-afternoon crew, and emergency clean-ups after a leak or a break-in can often be covered the same day.",
      },
      {
        q: "Do you handle student rental and multi-unit turnovers near DVC?",
        a: "Yes, and we price them per unit so you can hand us a list. Furniture, mattresses, abandoned electronics and the contents of a packed storage closet all go in one visit, and we can bill the whole batch to one property-management account with net-30 terms.",
      },
    ],
    nearby: ["martinez-ca", "concord-ca", "walnut-creek-ca", "lafayette-ca"],
  },
  {
    slug: "pittsburg-ca",
    name: "Pittsburg",
    county: "Contra Costa County",
    zips: ["94565"],
    drive: "17 mi via Highway 4",
    response: "Same-day or next-day",
    neighborhoods: ["Old Town Pittsburg", "San Marco", "Vista Del Mar", "Woodhill", "Highlands Ranch"],
    landmarks: ["Pittsburg Marina", "California Theatre", "Los Medanos College", "Pittsburg Center BART", "Delta View Golf Course"],
    intro:
      "Pittsburg work skews industrial. The waterfront and the Highway 4 frontage are lined with fabrication shops, contractor yards and light manufacturing, so we haul a lot of scrap steel, pallets, machinery and shop clutter here. Old Town brings storefront and restaurant turnovers along Railroad Avenue, while the newer San Marco and Vista Del Mar subdivisions generate garage cleanouts, construction debris from remodels, and post-move furniture hauls.",
    logistics:
      "Because so much Pittsburg material is metal, it is often worth separating: sellable ferrous and non-ferrous scrap gets credited against your haul, which can meaningfully cut an industrial invoice. Regional disposal and recovery facilities sit close to this end of the county, so heavy loads out of Pittsburg tip quickly and we can turn a second truck the same day on large jobs.",
    faqs: [
      {
        q: "Do you buy or credit scrap metal from Pittsburg shops?",
        a: "We credit it. Tell us what you have — steel offcuts, aluminum, copper, wire, old machinery — and we quote the haul with the scrap value applied against it. You get weight tickets from the certified recycler for your records, which matters if you are tracking material off a job.",
      },
      {
        q: "Can you clear a contractor yard or fabrication shop?",
        a: "Yes. Yard clean-outs are one visit for mixed material: scrap, broken pallets, cracked totes, old racking, tires we can route properly, and the office furniture nobody has used in years. We work around your production schedule and can come after hours if the yard has to stay clear during the day.",
      },
    ],
    nearby: ["antioch-ca", "concord-ca", "martinez-ca", "brentwood-ca"],
  },
  {
    slug: "antioch-ca",
    name: "Antioch",
    county: "Contra Costa County",
    zips: ["94509", "94531"],
    drive: "22 mi via Highway 4",
    response: "Next-day, same-day when routing allows",
    neighborhoods: ["Rivertown", "Sycamore", "Mira Vista", "Lone Tree Valley", "Deer Valley"],
    landmarks: ["Antioch Marina", "historic Rivertown", "Somersville Towne Center", "Contra Loma Regional Park", "Antioch BART"],
    intro:
      "Antioch gives us the widest mix in East County. Rivertown's older housing stock and storefronts mean tight lots, back stairs and basements that have not been opened in years. The Lone Tree and Deer Valley subdivisions bring newer-construction remodel debris, hot tub and playset removals, and garage cleanouts. Rental turnover volume here is high, so a lot of our Antioch schedule belongs to property managers and realtors prepping units to re-list.",
    logistics:
      "We batch Antioch and Brentwood on the same run, which is how a 22-mile city still gets next-day service at a fair price — ask about grouping if you have more than one address in East County. Highway 4 congestion is real in the afternoon, so morning windows are cheaper on your time and ours. Foreclosure and eviction cleanouts get photo documentation before and after for the file.",
    faqs: [
      {
        q: "Can you clear a foreclosure or eviction in Antioch on short notice?",
        a: "Yes, and we document it. Crews photograph the unit before and after, sort anything that looks like personal papers or valuables so you can follow your notice requirements, then haul everything and leave it broom-clean. Most single-family turnovers are one day; a heavily packed property may need two.",
      },
      {
        q: "Do you take hot tubs, sheds and playsets in the newer subdivisions?",
        a: "All three. Hot tubs get drained, cut down and carried out in sections, sheds are dismantled on site, and metal or plastic playsets come apart the same way. Give us a photo and the gate width when you call and the quote will be firm.",
      },
    ],
    nearby: ["pittsburg-ca", "brentwood-ca", "concord-ca", "martinez-ca"],
  },
  {
    slug: "richmond-ca",
    name: "Richmond",
    county: "Contra Costa County",
    zips: ["94801", "94804", "94805", "94806"],
    drive: "20 mi via I-80",
    response: "Next-day, same-day for commercial accounts",
    neighborhoods: ["Point Richmond", "Marina Bay", "Hilltop", "Richmond Annex", "North & East"],
    landmarks: ["Rosie the Riveter WWII Home Front National Historical Park", "Craneway Pavilion", "Richmond Ferry Terminal", "Richmond Parkway", "Point Richmond village"],
    intro:
      "Richmond is a working waterfront city and the jobs reflect it. Along the Richmond Parkway and the old shipyard corridor we clear warehouses, studios, film and event spaces around Craneway, and light industrial tenants with pallets, racking and scrap. Point Richmond and the Annex are older, denser and steeper — narrow streets, detached garages, basements with exterior stairs. Marina Bay adds condo and townhome turnovers where the HOA sets the access rules.",
    logistics:
      "Point Richmond's streets are tight enough that we plan the truck position before we plan the load, and in Marina Bay we check the HOA's contractor window and dumpster restrictions first. Richmond sits at the far west edge of our area, so we schedule it in blocks: booking a day or two out gets you a better window than an emergency call.",
    faqs: [
      {
        q: "Do you serve Point Richmond's narrow streets and hillside homes?",
        a: "Yes, with the right truck. We scout the street on arrival, park where we are not blocking a lane, and shuttle from the house if the grade or the turn is too tight for the dump body. Long carries are quoted up front so nothing changes on the day.",
      },
      {
        q: "Can you clear a warehouse or studio space near the Richmond Parkway?",
        a: "Regularly. Set builds, event gear, pallet racking, scrap steel and mixed shop debris go in one visit, with recyclable streams separated so the disposal cost stays down. We can work evenings or weekends if the space has to be usable during business hours.",
      },
    ],
    nearby: ["martinez-ca", "pleasant-hill-ca", "vallejo-ca", "lafayette-ca"],
  },
  {
    slug: "lafayette-ca",
    name: "Lafayette",
    county: "Contra Costa County",
    zips: ["94549"],
    drive: "13 mi via Highway 24",
    response: "Same-day or next morning",
    neighborhoods: ["Downtown Lafayette", "Happy Valley", "Burton Valley", "Reliez Valley", "Trail neighborhood"],
    landmarks: ["Lafayette Reservoir", "Lafayette-Moraga Regional Trail", "Lafayette BART", "Mount Diablo Boulevard", "Lafayette Plaza Park"],
    intro:
      "Lafayette is mostly residential and mostly hillside. Happy Valley and Reliez Valley homes sit on steep lots with long drives, decks and detached structures, so the work is often carry-heavy: deck furniture, old spas, storage from a crawl space, or a full estate cleanout in a house that has not changed hands in forty years. Along Mount Diablo Boulevard we handle professional offices, small medical suites and boutique retail turnovers.",
    logistics:
      "Steep, narrow driveways are the norm, and a large dump body cannot always make the turn — we send a smaller truck or shuttle the load, and we quote the carry honestly up front. Downtown Lafayette parking is metered and limited, so office work gets an early or late window. Highway 24 keeps drive time under half an hour outside commute.",
    faqs: [
      {
        q: "My driveway is steep and narrow. Can your truck get in?",
        a: "Usually, and when it cannot we shuttle. Send a photo of the approach when you call and we will tell you which truck we are bringing and whether the carry adds anything to the price. We would rather solve it in the quote than discover it with your gate post.",
      },
      {
        q: "Do you do estate cleanouts for Lafayette homes?",
        a: "Frequently, often for families working with a realtor on a deadline. We sort room by room, set aside documents, photographs and anything that looks valuable for the family to review, route quality furniture and household goods to donation with receipts, and leave the house clean enough to photograph.",
      },
    ],
    nearby: ["walnut-creek-ca", "pleasant-hill-ca", "martinez-ca", "danville-ca"],
  },
  {
    slug: "brentwood-ca",
    name: "Brentwood",
    county: "Contra Costa County",
    zips: ["94513"],
    drive: "30 mi via the Highway 4 Bypass",
    response: "Next-day, batched with East County runs",
    neighborhoods: ["Downtown Brentwood", "Brentwood Hills", "Shadow Lakes", "Deer Ridge", "Rose Garden"],
    landmarks: ["The Streets of Brentwood", "Brentwood City Park", "Marsh Creek Trail", "the u-pick orchards and farm stands", "Brentwood Family Aquatic Complex"],
    intro:
      "Brentwood is newer, flatter and still building, so a large share of our work here is construction and remodel related: framing offcuts, drywall, tile, packaging from a whole-house appliance install, and landscape debris from putting in a first yard. The orchard and farm belt on the edges of town adds agricultural clean-ups — old irrigation line, shade cloth, pallets, wire and equipment. Downtown and The Streets of Brentwood bring retail and restaurant turnovers.",
    logistics:
      "Brentwood is the far end of our range, so we run it on scheduled East County days alongside Antioch, Oakley and Discovery Bay work. Book a day ahead and the price is better than an emergency dispatch. New subdivisions often have HOA rules about where a truck may park and for how long; tell us the community and we will plan around it.",
    faqs: [
      {
        q: "Do you haul construction debris from Brentwood new builds and remodels?",
        a: "Yes, including phase clean-ups on active sites. We come between trades, clear the framing offcuts, drywall scrap, packaging and tile, sweep the work area, and stage the site for the next crew. Clean wood and concrete are separated for recycling, which lowers the disposal portion of your bill.",
      },
      {
        q: "Can you clear farm and orchard property debris?",
        a: "We can. Irrigation line, shade cloth, bins, pallets, fence wire, scrap metal and old equipment all go in one haul, with metal routed to a certified recycler and green material to composting. For very large volumes we bring the dump trailer and leave it while your crew loads.",
      },
    ],
    nearby: ["antioch-ca", "pittsburg-ca", "concord-ca", "clayton-ca"],
  },
  {
    slug: "danville-ca",
    name: "Danville",
    county: "Contra Costa County",
    zips: ["94506", "94526"],
    drive: "19 mi via I-680",
    response: "Next-day, same-day when routing allows",
    neighborhoods: ["Downtown Danville", "Blackhawk", "Westside", "Sycamore Valley", "Greenbrook", "Diablo"],
    landmarks: ["Eugene O'Neill Tao House National Historic Site", "Iron Horse Regional Trail", "Blackhawk Plaza", "Museum of the San Ramon Valley", "Mount Diablo State Park trailheads"],
    intro:
      "Danville jobs are larger than average and the standards are higher. Blackhawk and Diablo properties mean gated entries, guard check-ins and long approaches, plus the kind of volume that comes with a five-bedroom house: whole-garage cleanouts, wine cellar and gym equipment removals, spa and outdoor kitchen tear-outs. Downtown Danville and the Hartz Avenue corridor add small professional offices and boutique retail, usually with limited alley access.",
    logistics:
      "Gated communities want the crew name, truck plate and insurance on file before the appointment, so we send that ahead. Blackhawk and Diablo have contractor hour restrictions we follow to the minute. Large properties often justify a two-truck day, which finishes the job in one visit instead of stretching it across two.",
    faqs: [
      {
        q: "Can you get into Blackhawk and other gated communities?",
        a: "Yes. We provide the crew list, truck information and a certificate of insurance in advance so the gate has us cleared, and we stay inside the community's posted contractor hours. If the association requires a specific route or staging spot, tell us and that is where the truck sits.",
      },
      {
        q: "Do you remove gym equipment, spas and pool tables?",
        a: "All three, and they are all disassembly jobs rather than lifting jobs. Treadmills and multi-station machines come apart, spas get drained and cut into carryable sections, and slate pool tables are separated before anything moves. Doorway and stair dimensions are the only thing we need to know in advance.",
      },
    ],
    nearby: ["walnut-creek-ca", "lafayette-ca", "clayton-ca", "concord-ca"],
  },
  {
    slug: "clayton-ca",
    name: "Clayton",
    county: "Contra Costa County",
    zips: ["94517"],
    drive: "15 mi via Ygnacio Valley Road",
    response: "Same-day or next morning",
    neighborhoods: ["Downtown Clayton", "Oakhurst", "Peacock Creek", "Regency Woods", "Diablo Estates"],
    landmarks: ["Clayton Historical Museum", "Clayton Community Park", "Mount Diablo State Park trailheads", "Endeavour Hall", "the Oakhurst Country Club"],
    intro:
      "Clayton is small, quiet and almost entirely residential, sitting right against Mount Diablo. Work here is homeowner work: garage and attic cleanouts, hillside yard-waste hauls after brush clearing for defensible space, hot tub and deck removals, and downsizing cleanouts in the Oakhurst and Peacock Creek neighborhoods. The little downtown core around Main Street brings the occasional storefront or restaurant turnover.",
    logistics:
      "Fire-season brush clearing drives a real spike in Clayton green-waste volume every summer, and we route all of it to composting rather than the landfill. Streets are quiet and narrow with few sidewalks, so we keep the truck tight to the curb and out of the neighbors' way. Ygnacio Valley Road puts us in Clayton in about twenty-five minutes.",
    faqs: [
      {
        q: "Do you haul brush and green waste from defensible-space clearing?",
        a: "That is one of our busiest Clayton services. Branches, brush, cut limbs, dry grass and cleared undergrowth go out by the truckload with no green-bin volume limit, and it all goes to a composting or green-waste facility. If you are clearing a large hillside, the dump trailer can sit on site while your crew works.",
      },
      {
        q: "Can you clear a Clayton garage or attic in one visit?",
        a: "Almost always. A packed two-car garage is typically a three-quarter to full truck, and an attic depends more on the hatch than the volume. We carry everything down and out, sort for donation and recycling as we go, and sweep the space before we leave.",
      },
    ],
    nearby: ["concord-ca", "walnut-creek-ca", "danville-ca", "pittsburg-ca"],
  },
  {
    slug: "vacaville-ca",
    name: "Vacaville",
    county: "Solano County",
    zips: ["95687", "95688"],
    drive: "34 mi via I-680 and I-80",
    response: "Scheduled Solano days, next-day standard",
    secondBase: true,
    neighborhoods: ["Downtown Vacaville", "Browns Valley", "North Village", "Leisure Town", "Cheyenne", "Alamo Drive corridor"],
    landmarks: ["Vacaville Premium Outlets", "Nut Tree Plaza", "Lagoon Valley Park", "the Kaiser and NorthBay medical campuses", "the I-80 / I-505 junction"],
    intro:
      "Vacaville is our second core market and our anchor in Solano County. The I-80 corridor here is dense with distribution, biotech and medical tenants, which means pallet racking, lab and office furniture, packaging waste and equipment decommissions. The outlets and Nut Tree retail districts bring fixture swaps and back-of-house clear-outs. Residentially, Browns Valley and Leisure Town generate steady downsizing, garage and estate work, and the newer North Village tracts keep us in remodel debris.",
    logistics:
      "We run Solano County on scheduled days so a 34-mile drive does not turn into a premium price — book a day or two ahead and you get a firm window at standard rates. Distribution tenants along Vaca Valley Parkway and Allison Drive usually need a dock appointment and a COI, both of which we handle before arrival. For medical and lab clients we separate e-waste and confirm what we are not permitted to take.",
    faqs: [
      {
        q: "Do you really serve Vacaville, or just Contra Costa County?",
        a: "Vacaville is a core market, not an edge case. We hold scheduled Solano County days every week and a substantial share of our commercial accounts are in Vacaville and Fairfield. Booking a day ahead gets you a firm arrival window at the same rates a Martinez customer pays.",
      },
      {
        q: "Can you decommission a warehouse or distribution space?",
        a: "Yes. Racking, conveyor sections, pallets, shrink-wrap and packaging, broken totes, office furniture from the front suite and the e-waste from the IT closet can all go in one coordinated project. Large decommissions get a written scope, a phased schedule and one consolidated invoice.",
      },
    ],
    nearby: ["fairfield-ca", "suisun-city-ca", "vallejo-ca", "benicia-ca"],
  },
  {
    slug: "fairfield-ca",
    name: "Fairfield",
    county: "Solano County",
    zips: ["94533", "94534"],
    drive: "24 mi via I-680",
    response: "Scheduled Solano days, next-day standard",
    neighborhoods: ["Downtown Fairfield", "Green Valley", "Cordelia", "Rancho Solano", "Paradise Valley", "Suisun Valley"],
    landmarks: ["the Solano County government center", "the Jelly Belly factory", "Travis Air Force Base", "Solano Town Center", "Rockville Hills Regional Park"],
    intro:
      "Fairfield is the Solano County seat, so a good share of our work here is institutional and professional: county and civic offices, medical and dental suites along North Texas Street, and the office parks around Cordelia and Green Valley. The industrial and distribution belt near the I-80 / I-680 interchange adds warehouse and manufacturing clean-outs. Travis Air Force Base drives constant residential turnover — families moving in and out on orders, often on short notice.",
    logistics:
      "PCS season means we get a lot of Fairfield calls with a hard deadline attached, and we keep slack in the Solano schedule for exactly that. Cordelia and Green Valley office parks want a COI naming the property manager. Suisun Valley properties are agricultural, so expect wire, irrigation line, bins and scrap metal rather than household junk, all of which we route to the right facility.",
    faqs: [
      {
        q: "Can you clear a rental or home before a Travis AFB move?",
        a: "Yes, and we understand the deadline is not negotiable. Tell us the date you have to be out and what needs to go, and we will schedule to beat it — furniture, appliances, garage contents, playsets and the pile of packing material afterward. Quality items are donated with receipts.",
      },
      {
        q: "Do you serve Green Valley, Cordelia and Rancho Solano?",
        a: "All of them, on the same scheduled Solano days. Cordelia and Green Valley are mostly commercial and office work for us; Rancho Solano and Green Valley residential jobs tend to be garage, patio and downsizing cleanouts on larger lots with good truck access.",
      },
    ],
    nearby: ["suisun-city-ca", "vacaville-ca", "vallejo-ca", "benicia-ca"],
  },
  {
    slug: "vallejo-ca",
    name: "Vallejo",
    county: "Solano County",
    zips: ["94589", "94590", "94591", "94592"],
    drive: "14 mi via I-680 and the Carquinez Bridge",
    response: "Same-day or next-day",
    neighborhoods: ["Downtown Vallejo", "Mare Island", "Glen Cove", "Hiddenbrooke", "Springstowne", "St. Vincent's Hill"],
    landmarks: ["Mare Island Naval Shipyard", "Six Flags Discovery Kingdom", "the Vallejo Ferry Terminal", "the Empress Theatre", "the Carquinez Bridge"],
    intro:
      "Vallejo has the oldest and most varied building stock in our Solano coverage, and the jobs match. Mare Island's converted industrial and warehouse space produces heavy commercial hauls — racking, machinery, scrap steel, mixed shop debris. Downtown and St. Vincent's Hill are full of Victorians and early-century homes with basements, attics, detached garages and steep exterior stairs. Glen Cove and Hiddenbrooke are newer and easier, mostly garage, patio and remodel work.",
    logistics:
      "Vallejo is close as the crow flies, and once we are over the Carquinez Bridge it is a short run, so Vallejo often gets same-day service. Older neighborhoods mean narrow streets, no driveway and long carries up or down exterior stairs — send a photo and we will price the carry honestly. Mare Island tenants sometimes need site access clearance, which we arrange in advance.",
    faqs: [
      {
        q: "Do you work on Mare Island?",
        a: "Yes, including the converted warehouse and shop spaces. Those are heavy loads — steel, racking, machinery, pallets, mixed industrial debris — and we quote them by the cubic yard with sellable scrap credited back. If the site requires access clearance or an escort, tell us when you book and we will arrange it before the crew arrives.",
      },
      {
        q: "Can you clear an older Vallejo home with a basement and exterior stairs?",
        a: "Regularly. Full-height basements, attic crawl spaces and back stairs are ordinary work for us. We protect the stair treads and door frames, carry everything out by hand, and sort for donation and recycling as we load. Damp or musty basement contents are handled with the right protective gear.",
      },
    ],
    nearby: ["benicia-ca", "martinez-ca", "fairfield-ca", "richmond-ca"],
  },
  {
    slug: "benicia-ca",
    name: "Benicia",
    county: "Solano County",
    zips: ["94510"],
    drive: "8 mi across the Benicia-Martinez Bridge",
    response: "Same-day in most cases",
    neighborhoods: ["Downtown Benicia", "Southampton", "the Benicia Industrial Park", "the Arsenal", "Waterfront"],
    landmarks: ["Benicia Capitol State Historic Park", "the Benicia Arsenal and Clock Tower", "Benicia State Recreation Area", "First Street shops", "the Benicia-Martinez Bridge"],
    intro:
      "Benicia is the closest city to our yard that is not Martinez — one bridge and about fifteen minutes — so same-day service is normal here. The Benicia Industrial Park is the volume driver: manufacturing, fabrication and logistics tenants with scrap metal, pallets, racking and equipment. The Arsenal district's artist studios and converted warehouses bring a different kind of clear-out. Downtown's First Street storefronts and the Victorian housing stock around it round out the mix.",
    logistics:
      "Industrial Park work is straightforward — real docks, real turning room, and material worth separating for scrap credit. Downtown First Street is the opposite: metered parking, short blocks and busy weekends, so we schedule storefront work early in the morning. Because we cross the bridge rather than fight traffic, an emergency Benicia call is one of the few we can often cover within hours.",
    faqs: [
      {
        q: "How quickly can you reach the Benicia Industrial Park?",
        a: "Usually within the hour during business days. It is one bridge crossing from our yard, so unplanned clean-ups — a production line change, a damaged shipment, a tenant walkout — are the kind of thing we can often cover the same day.",
      },
      {
        q: "Do you clear artist studios and Arsenal-district warehouses?",
        a: "Yes, and they need a careful eye rather than a fast truck. We sort materials, salvage and finished work from genuine debris, ask before anything ambiguous goes on the truck, and route metal, wood and e-waste to the right recyclers. Studio clear-outs are usually quoted after a short walkthrough.",
      },
    ],
    nearby: ["martinez-ca", "vallejo-ca", "fairfield-ca", "pleasant-hill-ca"],
  },
  {
    slug: "suisun-city-ca",
    name: "Suisun City",
    county: "Solano County",
    zips: ["94585"],
    drive: "27 mi via I-680 and Highway 12",
    response: "Scheduled Solano days, next-day standard",
    neighborhoods: ["Old Town Suisun", "Victorian Harbor", "Lawler Ranch", "Suisun Waterfront", "Peterson Ranch"],
    landmarks: ["the Suisun Harbor waterfront promenade", "the Suisun Marsh", "the Suisun City Amtrak station", "Grizzly Island Wildlife Area", "Old Town Suisun's Main Street"],
    intro:
      "Suisun City is compact, waterfront-oriented and sits right against the largest brackish marsh on the West Coast. Old Town's older cottages and the Victorian Harbor townhomes give us garage, shed and attic cleanouts in tight quarters, often with alley access only. The waterfront and marina area brings dock gear, boat clutter and marine scrap. Lawler Ranch and the newer tracts inland are standard suburban work: garages, patios, remodel debris and downsizing hauls.",
    logistics:
      "Because of the marsh, disposal discipline matters here more than most places — nothing gets left curbside, and anything with fluids, fuel or oil is separated and routed to the proper facility rather than a tipping floor. Suisun City rides on our Solano schedule with Fairfield and Vacaville, so booking a day ahead gets a firm window. Old Town alleys are narrow; we bring the smaller truck.",
    faqs: [
      {
        q: "Do you handle marina and boat-related junk?",
        a: "Yes — dock boxes, old canvas, line and rigging, fiberglass panels, marine batteries and scrap aluminum. Batteries, fuel containers and anything with oil in it get separated and taken to the correct facility, never to a general tipping floor. Full vessel disposal is a different process, so call and we will tell you honestly whether we are the right company for it.",
      },
      {
        q: "Can you work in Old Town Suisun's alleys and small lots?",
        a: "That is what the smaller truck is for. We stage in the alley or at the curb, keep the walkway clear, and carry rather than drag. If the property has no off-street access at all we plan the load order so the truck spends the least time in the lane.",
      },
    ],
    nearby: ["fairfield-ca", "vacaville-ca", "vallejo-ca", "benicia-ca"],
  },
];

export const cityBySlug = Object.fromEntries(cities.map((c) => [c.slug, c]));
export const countyGroups = [
  { county: "Contra Costa County", cities: cities.filter((c) => c.county === "Contra Costa County") },
  { county: "Solano County", cities: cities.filter((c) => c.county === "Solano County") },
];
