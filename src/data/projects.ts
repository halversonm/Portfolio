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
