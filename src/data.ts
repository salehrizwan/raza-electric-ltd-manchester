import modernLed from "./assets/images/modern_led_lighting_1783189899723.jpg";
import evCharger from "./assets/images/ev_charger_installation_1783189883200.jpg";
import { ServiceItem, WhyChooseUsItem, WorkStep, ProjectItem, TestimonialItem } from "./types";

// Business details
export const COMPANY_DETAILS = {
  name: "Raza Electric LTD Manchester",
  tagline: "Professional Electrical Services Across Manchester",
  phone: "+44 7723 522948",
  phoneFormatted: "+44 7723 522948",
  email: "info@razaelectric.co.uk", // Premium placeholder
  address: "Manchester, United Kingdom",
  googleRating: "5.0",
  reviewsCount: "19+",
};

// Trust Badges
export const TRUST_BADGES = [
  { id: "google", label: "★★★★★ 5.0 Google Rating", icon: "fa-brands fa-google" },
  { id: "reviews", label: "19+ Customer Reviews", icon: "fa-solid fa-comments" },
  { id: "qualified", label: "Qualified Electricians", icon: "fa-solid fa-user-shield" },
  { id: "local", label: "Reliable Local Service", icon: "fa-solid fa-map-location-dot" },
  { id: "workmanship", label: "Quality Workmanship", icon: "fa-solid fa-award" },
];

// About Us Section
export const ABOUT_US_CONTENT = {
  title: "About Raza Electric LTD Manchester",
  paragraphs: [
    "Raza Electric LTD Manchester provides professional electrical services for residential and commercial properties. From complete house rewiring and lighting installations to EV charger installations, fault finding and electrical maintenance, every project is completed with attention to detail, safety and reliability.",
    "We are committed to delivering quality workmanship, honest advice and excellent customer satisfaction. As local Manchester electrical experts, we focus on safety standards, transparent communication, and premium delivery.",
  ],
};

// Our Services
export const SERVICES: ServiceItem[] = [
  {
    id: "installations",
    title: "Electrical Installations",
    description: "Comprehensive installation services for residential and commercial spaces, ensuring safety and standard compliance.",
    icon: "fa-solid fa-circle-check",
  },
  {
    id: "rewiring",
    title: "House Rewiring",
    description: "Complete and partial property rewiring, replacement of old cabling with safe, durable modern standards.",
    icon: "fa-solid fa-network-wired",
  },
  {
    id: "consumer-upgrades",
    title: "Consumer Unit Upgrades",
    description: "Upgrading outdated consumer units to modern RCD-protected boards, enhancing overall electrical safety.",
    icon: "fa-solid fa-bolt",
  },
  {
    id: "fuse-replacement",
    title: "Fuse Board Replacement",
    description: "Upgrades for older fuse boxes to guarantee compliance with current UK wiring regulations.",
    icon: "fa-solid fa-box",
  },
  {
    id: "lighting-install",
    title: "Lighting Installation",
    description: "Bespoke indoor and outdoor lighting design, installation, and energy-efficient retrofitting.",
    icon: "fa-solid fa-lightbulb",
  },
  {
    id: "indoor-outdoor-light",
    title: "Indoor & Outdoor Lighting",
    description: "Aesthetic garden lighting, ambient spotlights, functional task light fittings, and security illumination.",
    icon: "fa-solid fa-house-laptop",
  },
  {
    id: "sockets-switches",
    title: "Socket & Switch Installation",
    description: "Professional relocation, addition, and premium faceplate installation for switches and sockets.",
    icon: "fa-solid fa-plug",
  },
  {
    id: "fault-finding",
    title: "Fault Finding",
    description: "Advanced diagnostic testing to trace, identify, and safely rectify persistent electrical faults.",
    icon: "fa-solid fa-magnifying-glass-power",
  },
  {
    id: "repairs",
    title: "Electrical Repairs",
    description: "Fast-response repairs for circuits, outlets, appliances, and fixtures to secure peace of mind.",
    icon: "fa-solid fa-wrench",
  },
  {
    id: "ev-charging",
    title: "EV Charger Installation",
    description: "Certified, smart electric vehicle charging unit installations for modern domestic and commercial settings.",
    icon: "fa-solid fa-car-battery",
  },
  {
    id: "eicr",
    title: "Electrical Inspection (EICR)",
    description: "Thorough testing and landlord safety certificates (EICR) verifying complete property compliance.",
    icon: "fa-solid fa-clipboard-check",
  },
  {
    id: "commercial-services",
    title: "Commercial Electrical Services",
    description: "Tailored installations, upgrades, emergency light systems, and safety checks for commercial entities.",
    icon: "fa-solid fa-building",
  },
  {
    id: "residential-services",
    title: "Residential Electrical Services",
    description: "Full suite of domestic care from minor repairs to smart home lighting integration.",
    icon: "fa-solid fa-house",
  },
  {
    id: "emergency-repairs",
    title: "Emergency Electrical Repairs",
    description: "Quick-response troubleshooting and repairs for power outages and urgent safety issues.",
    icon: "fa-solid fa-triangle-exclamation",
  },
];

// Why Choose Us
export const WHY_CHOOSE_US: WhyChooseUsItem[] = [
  {
    id: "experience",
    title: "Experienced Electricians",
    description: "Highly skilled, fully certified and fully insured professionals handling every job.",
    icon: "fa-solid fa-user-tie",
  },
  {
    id: "quality",
    title: "High Quality Work",
    description: "Meticulous attention to detail, durable premium materials and outstanding workmanship.",
    icon: "fa-solid fa-gem",
  },
  {
    id: "reliability",
    title: "Reliable Service",
    description: "Punctual, friendly, and dedicated to completing every task strictly on schedule.",
    icon: "fa-solid fa-calendar-check",
  },
  {
    id: "pricing",
    title: "Honest Pricing",
    description: "Clear, transparent quotes with zero hidden fees. Fair and straightforward pricing.",
    icon: "fa-solid fa-sterling-sign",
  },
  {
    id: "cleanliness",
    title: "Clean & Tidy Work",
    description: "We clean as we work and respect your property, leaving it spotlessly neat and tidy.",
    icon: "fa-solid fa-sparkles",
  },
  {
    id: "satisfaction",
    title: "Customer Satisfaction",
    description: "Exceptional local reputation with numerous 5-star reviews and repeat clientele.",
    icon: "fa-solid fa-heart",
  },
];

// How We Work
export const HOW_WE_WORK_STEPS: WorkStep[] = [
  {
    step: 1,
    title: "Contact Us",
    description: "Reach out via call, message or online form with your details.",
    icon: "fa-solid fa-phone-volume",
  },
  {
    step: 2,
    title: "Free Consultation",
    description: "We evaluate your requirements and deliver a clear, honest quote.",
    icon: "fa-solid fa-comments-dollar",
  },
  {
    step: 3,
    title: "Professional Installation or Repair",
    description: "Our certified experts carry out the work with premium materials.",
    icon: "fa-solid fa-screwdriver-wrench",
  },
  {
    step: 4,
    title: "Safety Tested & Job Completed",
    description: "We safety-test, clean up, and hand over the certified installation.",
    icon: "fa-solid fa-shield-halved",
  },
];

// Featured Projects with premium placeholder assets and our generated images!
export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: "rewire",
    title: "Complete House Rewiring",
    category: "Full Rewire",
    image: "https://images.unsplash.com/photo-1558211583-d26f610c1eb1?auto=format&fit=crop&q=80&w=600",
    description: "Complete restoration of domestic wiring with high-end designer faceplates and integrated modern electrical panels.",
  },
  {
    id: "led-lighting",
    title: "Modern LED Lighting",
    category: "Bespoke Lighting",
  image: evCharger, // Generated!
    description: "Sleek, integrated linear task lighting and dimmable accent downlights inside a luxury kitchen and living space.",
  },
  {
    id: "consumer-unit",
    title: "Consumer Unit Upgrade",
    category: "Safety Systems",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=600",
    description: "Replacing ancient fuseboards with fully surge-protected and dual-RCD consumer units to meet the 18th edition regulations.",
  },
  {
    id: "garden-lighting",
    title: "Outdoor Garden Lighting",
    category: "Landscape Lighting",
    image: "https://images.unsplash.com/photo-1565538810844-1e1191b20c07?auto=format&fit=crop&q=80&w=600",
    description: "Architectural pathway uplighting, wall washers, and smart timer-controlled ambient lighting for premium gardens.",
  },
  {
    id: "ev-charging-project",
    title: "EV Charger Installation",
    category: "Eco Mobility",
   image: modernLed, // Generated!
    description: "Installation of a wall-mounted smart fast-charging dock synced with home automation systems for electric vehicles.",
  },
  {
    id: "commercial-install",
    title: "Commercial Electrical Installation",
    category: "Commercial Fit-out",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600",
    description: "High-spec electrical distribution, decorative track lighting, and safety data cabling for a luxury boutique office space.",
  },
];

// Customer Testimonials
export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "t1",
    rating: 5,
    text: "Professional, friendly and completed all our lighting and socket installations exactly as requested.",
    author: "Sarah Jenkins",
    location: "Didsbury, Manchester",
  },
  {
    id: "t2",
    rating: 5,
    text: "Excellent workmanship on a full property rewiring project. Highly recommended.",
    author: "David Crompton",
    location: "Altrincham, Manchester",
  },
  {
    id: "t3",
    rating: 5,
    text: "Very knowledgeable electrician who explained every option clearly before starting the work.",
    author: "Amara Raza",
    location: "Chorlton, Manchester",
  },
  {
    id: "t4",
    rating: 5,
    text: "Reliable, tidy and completed everything to an exceptionally high standard.",
    author: "Mark Sutherland",
    location: "Salford Quays, Manchester",
  },
];

// Area Coverage
export const SERVICE_AREAS = [
  "Manchester City Centre",
  "Salford",
  "Didsbury",
  "Chorlton",
  "Altrincham",
  "Sale",
  "Stockport",
  "Prestwich",
  "Whitefield",
  "Stretford",
  "Worsley",
  "Urmston",
  "Bury",
  "Bolton",
  "Oldham",
  "Rochdale",
];
