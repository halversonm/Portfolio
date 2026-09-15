/** Placeholder portfolio projects. Replace with your real client work. */
export type Project = {
  slug: string;
  title: string;
  client: string;
  domain: string;
  trade: string;
  year: number;
  summary: string;
  services: string[];
  /** Screenshot path (put files in public/work/). Leave empty for a placeholder frame. */
  screenshot?: string;
  accent: string;
  results: { label: string; value: string }[];
};

export const projects: Project[] = [
  {
    slug: "northline-excavating",
    title: "A dig-ready site for a growing excavation crew",
    client: "Northline Excavating",
    domain: "northlineexcavating.com",
    trade: "Excavation & site prep",
    year: 2025,
    summary:
      "Replaced a Facebook page with a real website. Service-area pages, a photo gallery from the field, and a quote form that lands in the owner's inbox.",
    services: ["Design", "Astro build", "Local SEO"],
    accent: "#2d5a3d",
    results: [
      { label: "Quote requests / mo", value: "1 → 12" },
      { label: "Loads on 4G", value: "under 1s" },
    ],
  },
  {
    slug: "hedberg-landscaping",
    title: "Seasonal work booked out through spring",
    client: "Hedberg Landscaping & Snow",
    domain: "hedberglandscaping.com",
    trade: "Landscaping & snow removal",
    year: 2025,
    summary:
      "A site built around two seasons. Clear service split, before/after sliders, and a contract signup that fills the winter route.",
    services: ["Design", "Webflow build", "Copywriting"],
    accent: "#3f5e2f",
    results: [
      { label: "Snow contracts signed", value: "+38%" },
      { label: "Time on site", value: "+61%" },
    ],
  },
  {
    slug: "carlson-hvac",
    title: "Emergency calls that actually reach a person",
    client: "Carlson Heating & Air",
    domain: "carlsonheatingair.com",
    trade: "HVAC",
    year: 2024,
    summary:
      "Rebuilt a slow template site into a fast one with click-to-call everywhere, financing info up front, and a maintenance-plan page.",
    services: ["Design", "Astro build", "Local SEO"],
    accent: "#1f4029",
    results: [
      { label: "Mobile call taps", value: "2.3x" },
      { label: "Google PageSpeed", value: "98" },
    ],
  },
  {
    slug: "twin-ports-electric",
    title: "A licensed shop that finally looks licensed",
    client: "Twin Ports Electric",
    domain: "twinportselectric.com",
    trade: "Electrical contracting",
    year: 2024,
    summary:
      "Brand refresh and a five-page site: residential, commercial, panel upgrades, EV chargers, and a hiring page that keeps the pipeline full.",
    services: ["Brand", "Design", "Astro build"],
    accent: "#2d5a3d",
    results: [
      { label: "Résumés received / mo", value: "0 → 6" },
      { label: "Commercial leads", value: "+45%" },
    ],
  },
];
