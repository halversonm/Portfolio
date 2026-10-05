/** Placeholder portfolio projects. Replace with your real client work. */
export type Project = {
  slug: string;
  title: string;
  client: string;
  domain: string;
  trade: string;
  year: number;
  summary: string;
  /** Short emphasis points shown under the company name on the case-study page. */
  highlights: string[];
  services: string[];
  /** Screenshot path (put files in public/work/). Leave empty for a placeholder frame. */
  screenshot?: string;
  accent: string;
  results: { label: string; value: string }[];
  /** If set, the case-study page links out to this live site instead of showing stats/case-study copy. */
  liveUrl?: string;
  /** Flags this as a demo/sample build, not a real client — shown as a disclosure badge. */
  sample?: boolean;
};

export const projects: Project[] = [
  {
    slug: "elmberg-properties",
    title: "A site that turns landowners into cash-offer requests",
    client: "Elmberg Properties",
    domain: "elmbergproperties.com",
    trade: "Land buying",
    year: 2026,
    summary:
      "A conversion-focused site for a land-buying company: a fast cash-offer form and click-to-call up front, a simple three-step process, and a side-by-side comparison showing sellers why a direct sale beats listing with a realtor.",
    highlights: [
      "Modernized redesign of their website",
      "Stronger trust signals",
      "Clear call to actions",
    ],
    services: ["Design", "Astro build", "Copywriting"],
    screenshot: "/work/elmberg-properties.png",
    accent: "#c9a14a",
    results: [],
    liveUrl: "https://elmbergproperties.com/",
  },
  {
    slug: "red-oak-land-clearing",
    title: "A site that turns overgrown acreage into booked jobs",
    client: "Red Oak Land Clearing",
    domain: "redoaklandclearing.com",
    trade: "Land clearing & forestry mulching",
    year: 2025,
    summary:
      "A trust-first site for a family-owned land clearing crew: free on-site estimates front and center, a recent-work photo gallery showing real cleared land, and a clear service-area list across East Texas.",
    highlights: [
      "Free on-site estimates with a written quote in 48 hours",
      "Recent-work photo gallery showing real cleared land",
      "Clear service-area list across East Texas",
    ],
    services: ["Design", "Astro build", "Copywriting"],
    screenshot: "/work/red-oak-land-clearing.png",
    accent: "#8a2e22",
    results: [
      { label: "Estimate requests / mo", value: "5 → 14" },
      { label: "Avg. job size", value: "+22%" },
    ],
    liveUrl: "https://halverson-land-clear-demo.netlify.app/",
    sample: true,
  },
  {
    slug: "ironwood-plumbing-heating-cooling",
    title: "A site built to get the phone ringing, day or night",
    client: "Ironwood Plumbing, Heating & Cooling",
    domain: "ironwoodphc.com",
    trade: "Plumbing, heating & cooling",
    year: 2025,
    summary:
      "A trust-first site for a family-owned home services company: click-to-call and free-quote buttons on every page, real reviews and guarantees up front, and a clear service-area list for a 24/7 emergency business.",
    highlights: [
      "Click-to-call and free-quote buttons on every page",
      "Trust signals up front — reviews, ratings, licensing, flat-rate pricing",
      "Clear service-area list so people know if they're covered",
    ],
    services: ["Design", "Astro build", "Copywriting"],
    screenshot: "/work/ironwood-phc.png",
    accent: "#c2531f",
    results: [
      { label: "Missed-call rate", value: "−40%" },
      { label: "Free-quote requests / mo", value: "3 → 11" },
    ],
    liveUrl: "https://halverson-hvac-demo.netlify.app/",
    sample: true,
  },
  {
    slug: "cedar-stone-landscape",
    title: "A website that sells design quality before the first site walk",
    client: "Cedar & Stone Landscape Co.",
    domain: "cedarandstonelandscape.com",
    trade: "Landscape design & build",
    year: 2025,
    summary:
      "A design-led landscaping company: a site-plan diagram for every project, a clear four-phase process, and a site-walk request form that keeps the pipeline full through the off-season.",
    highlights: [
      "Showcase real, completed projects with before/after photos",
      "Communicate their design-to-build process in a way that's easy to follow",
      "Clearly display company service area",
    ],
    services: ["Design", "Astro build", "Copywriting"],
    screenshot: "/work/cedar-stone-landscape.png",
    accent: "#3f5e2f",
    results: [
      { label: "Site walk requests / mo", value: "4 → 15" },
      { label: "Avg. project value", value: "+30%" },
    ],
    liveUrl: "https://halverson-landscape-demo.netlify.app/#top",
    sample: true,
  },
];

/**
 * How many "Coming soon" placeholder cards to show alongside real projects
 * (on the homepage and /work) until more real client work is added.
 */
export const comingSoonSlots = 3;
