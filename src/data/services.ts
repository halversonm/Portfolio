/** Placeholder service offerings and packages. */
export type Service = {
  name: string;
  blurb: string;
  includes: string[];
};

export const services: Service[] = [
  {
    name: "Consult & Design",
    blurb:
      "This is where I'll learn about your company and we'll figure out what your site needs and how it will look.",
    includes: [
      "Company questionnaire and optional call or virtual meet",
      "Decision on your site's look and direction",
      "Service plan discussion",
    ],
  },
  {
    name: "Build & Refine",
    blurb:
      "I'll build a draft of your site and share it with you. From there, we'll refine it together — up to 2 rounds of revisions are included, with more available if needed — until it's ready to go live.",
    includes: [
      "First website draft is created",
      "Up to 2 rounds of revisions (more available for purchase)",
      "Final review before launch",
    ],
  },
  {
    name: "Launch",
    blurb:
      "Your site is published and made live — ready to bring in calls and new customers.",
    includes: [
      "Site published and made live",
      "Domain and hosting connected",
      "Final quality check",
    ],
  },
];

export const packages = [
  {
    name: "Website Only",
    price: "$1,500",
    fit: "You're comfortable handling your own hosting and updates — I just build the site. ",
    points: ["Fully custom website, built for your business"],
  },
  {
    name: "Full Service (recommended)",
    price: "$1000 creation fee + $150 a month",
    fit: "You don't want to worry about hosting or updates, let me handle them for you.",
    points: ["Fully custom website, built for your business", "Website hosting", "Ongoing monthly support — up to 3 simple updates per month (each typically under 30 minutes); larger requests quoted separately", "No committment, cancel anytime"],
    featured: true,
  },
];
