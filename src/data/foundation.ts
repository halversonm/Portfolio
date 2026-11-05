/** The non-negotiables listed on the home page. Edit freely — reorder, add, cut. */
export type FoundationItem = {
  title: string;
  description: string;
  /** Which illustration the homepage card shows (see FoundationCard.astro). */
  graphic: "convert" | "speed" | "mobile" | "seo" | "trust";
};

export const foundation: FoundationItem[] = [
  {
    title: "Built to convert",
    graphic: "convert",
    description:
      "Your site should never leave a visitor guessing. Every page is professionally designed so customers understand what you offer, move through your site with ease, and know exactly what to do next.",
  },
  {
    title: "Fast load speeds",
    graphic: "speed",
    description:
      "Speed isn't optional — it's built in from the start, so no one leaves before your site even loads.",
  },
  {
    title: "Mobile optimization",
    graphic: "mobile",
    description:
      "Mobile devices account for over half of all global website traffic. We ensure your site looks just as great on your phone as it does your desktop.",
  },
  {
    title: "Search Engine Optimization (SEO)",
    graphic: "seo",
    description:
      "Search engines favor fast, well-structured, mobile-friendly sites — which is exactly what you'll be getting. Every site also comes with a Launch & SEO report, so you can see how it's set up.",
  },
  {
    title: "Trust & Credibility",
    graphic: "trust",
    description:
      "People don't choose businesses they don't trust. Every site is designed to look professional and showcase real reviews and real work.",
  },
];
