export const navLinks = [
  { label: "Home", href: "#top" },
  { label: "Yachts", href: "#fleet" },
  { label: "Destinations", href: "#destinations" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#footer" },
];

export type HeroStage = {
  eyebrow: string;
  title: string;
  desc: string;
  primary: string;
  secondary: string;
};

export const heroStages: HeroStage[] = [
  {
    eyebrow: "BESPOKE PRIVATE CHARTERS",
    title: "Extraordinary Journeys",
    desc: "Curated maritime voyages handcrafted for those who demand the finest in luxury yachting.",
    primary: "Explore The Fleet",
    secondary: "Watch Story",
  },
  {
    eyebrow: "OCEANIC EXCELLENCE",
    title: "Unrivaled Freedom",
    desc: "Chart your own horizon across pristine archipelagos with Michelin-trained private crews.",
    primary: "View Destinations",
    secondary: "Inquire Now",
  },
  {
    eyebrow: "THE PINNACLE OF LUXURY",
    title: "Endless Horizons",
    desc: "Immerse yourself in timeless coastal elegance where world-class service meets absolute serenity.",
    primary: "Begin Journey",
    secondary: "Charter Guide",
  },
];

export const stats = [
  { target: 120, suffix: "+", label: "Fleet Vessels" },
  { target: 35, suffix: "+", label: "Global Destinations" },
  { target: 98, suffix: "%", label: "Client Satisfaction" },
  { target: 25, suffix: "", label: "Years of Excellence" },
];

export type Yacht = {
  name: string;
  category: "motor" | "sail" | "cat";
  tag: string;
  specs: string;
  rate: string;
  image: string;
};

export const yachts: Yacht[] = [
  {
    name: "The Meridian",
    category: "motor",
    tag: "Motor Yacht",
    specs: "164 FT / 50M • 12 GUESTS • 6 CABINS • CREW OF 11",
    rate: "$145,000",
    image: "/images/yacht_motor.jpg",
  },
  {
    name: "Ocean Breeze",
    category: "sail",
    tag: "Sailing Yacht",
    specs: "120 FT / 36M • 8 GUESTS • 4 CABINS • CREW OF 6",
    rate: "$85,000",
    image: "/images/yacht_sailing.jpg",
  },
  {
    name: "Aqua Vida",
    category: "cat",
    tag: "Luxury Catamaran",
    specs: "82 FT / 25M • 10 GUESTS • 5 CABINS • CREW OF 4",
    rate: "$65,000",
    image: "/images/yacht_catamaran.jpg",
  },
];

export const fleetTabs = [
  { id: "all", label: "All" },
  { id: "motor", label: "Motor Yachts" },
  { id: "sail", label: "Sailing Yachts" },
  { id: "cat", label: "Catamarans" },
] as const;

export const experienceFeatures = [
  {
    icon: "/images/icon_destination.svg",
    title: "Bespoke Itineraries",
    desc: "Custom routing to secluded bays, untouched anchorages, and private harbors.",
  },
  {
    icon: "/images/icon_luxury.svg",
    title: "Michelin-Trained Private Chefs",
    desc: "World-class culinary experiences tailored to your dietary palate.",
  },
  {
    icon: "/images/icon_charter.svg",
    title: "Curated Water Toys & Tenders",
    desc: "Seabobs, hydrofoils, jetskis, deep-sea diving gear, and high-speed chase tenders.",
  },
  {
    icon: "/images/icon_crew.svg",
    title: "Certified Master Captains",
    desc: "Highly credentialed navigators ensuring supreme safety and access.",
  },
];

export const destinations = [
  { name: "Newport", subtitle: "Rhode Island, USA", image: "/images/dest_newport.jpg" },
  { name: "The Bahamas", subtitle: "Caribbean", image: "/images/dest_bahamas.jpg" },
  { name: "Mediterranean", subtitle: "Europe", image: "/images/dest_mediterranean.jpg" },
];

export const testimonials = [
  {
    quote:
      "Sailing the Mediterranean with Aventis surpassed every expectation. The crew's discretion, the culinary artistry, and the vessel's immaculate finish made it an unforgettable journey.",
    name: "Lady Emily Vance",
    role: "Monaco Charter Client",
    avatar: "/images/avatar_emily.jpg",
  },
  {
    quote:
      "From the first consultation to the final sunset, every detail was anticipated. Aventis doesn't charter yachts — they compose experiences.",
    name: "Alexander Reid",
    role: "Private Client, London",
    avatar: "/images/avatar_emily.jpg",
  },
  {
    quote:
      "The most seamless luxury travel we have ever experienced. A fleet and a team without equal anywhere on the water.",
    name: "Sofia Marchetti",
    role: "Amalfi Coast Charter",
    avatar: "/images/avatar_emily.jpg",
  },
];

export const pressLogos = [
  "ARCHITECTURAL DIGEST",
  "ROBB REPORT",
  "YACHTING WORLD",
  "FORBES LIFE",
  "BOAT INTERNATIONAL",
];

export const searchChips = ["Bahamas", "50m+ Motor Yachts", "Summer in Greece", "Catamarans"];
