# Remove Pricing System - Implementation Plan

## Goal
Remove all pricing tables and pricing-related content from the entire website while keeping the Instagram URL as-is (already correct).

## Scope
- **35 pages** with "How pricing works" sections containing pricing tables
- **54 pages** with schema.org `priceRange":"$$"` in JSON-LD
- Instagram URL is already `https://instagram.com/martinezjunkremovalca` - no change needed

## Files to Modify

### Pages with "How pricing works" pricing tables (35 pages)
1. `index.html` (main homepage) - lines 376-451
2. `services/index.html` - lines 380+
3. `faq/index.html` - lines 297+
4. `commercial-junk-removal/index.html` - lines 361+
5. `residential-junk-removal/index.html` - lines 381+
6. All 15 service pages under `services/`:
   - `yard-waste-removal/index.html` - lines 298+
   - `trailer-rental/index.html` - lines 298+
   - `property-cleanout/index.html` - lines 298+
   - `estate-cleanout/index.html` - lines 298+
   - `office-furniture-removal/index.html` - lines 298+
   - `metal-scrap-removal/index.html` - lines 298+
   - `construction-site-cleanup/index.html` - lines 298+
   - `demolition-debris-removal/index.html` - lines 298+
   - `garage-cleanout/index.html` - lines 298+
   - `furniture-removal/index.html` - lines 298+
   - `e-waste-removal/index.html` - lines 298+
   - `hoarding-cleanup/index.html` - lines 298+
   - `basement-cleanout/index.html` - lines 298+
   - `attic-cleanout/index.html` - lines 298+
   - `appliance-equipment-removal/index.html` - lines 298+
7. All 16 area pages under `areas-we-serve/`:
   - `martinez-ca/index.html`, `concord-ca/index.html`, `walnut-creek-ca/index.html`, `pleasant-hill-ca/index.html`, `pittsburg-ca/index.html`, `antioch-ca/index.html`, `richmond-ca/index.html`, `lafayette-ca/index.html`, `brentwood-ca/index.html`, `danville-ca/index.html`, `clayton-ca/index.html`, `benicia-ca/index.html`, `vacaville-ca/index.html`, `fairfield-ca/index.html`, `vallejo-ca/index.html`, `suisun-city-ca/index.html` - all at line 353+

### Pages with schema.org `priceRange` (54 pages - all pages have this)
All HTML files have JSON-LD with `"priceRange":"$$"` that should be removed from the LocalBusiness schema.

### Disclaimer page
`disclaimer/index.html` has a dedicated "Pricing is indicative until we quote it" section (lines 219-232) that should be removed.

## Implementation Approach

For each page with "How pricing works" section:
1. Remove the entire section from `<p class="eyebrow ">How pricing works</p>` through the closing `</section>` of that pricing table section
2. Keep surrounding content intact

For schema.org JSON-LD:
1. Remove `"priceRange":"$$",` from the LocalBusiness object in the JSON-LD script

For disclaimer page:
1. Remove the entire "Pricing is indicative until we quote it" section (h2 + following p)

## Validation
- Verify no "How pricing works" text remains in any HTML file
- Verify no `priceRange` in any JSON-LD
- Verify Instagram URLs unchanged
- Verify no broken HTML structure after removals