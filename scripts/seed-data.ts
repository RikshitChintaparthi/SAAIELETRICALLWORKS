import { connectToDatabase } from "@/lib/db";
import type { Service, Project, Company, ContactDetails } from "@/lib/types";

const services: Service[] = [
  {
    id: "service-1",
    title: "Solar Plant Electrification",
    description: "Complete solar power plant electrical installation and commissioning services.",
    price: "Contact for Quote",
    icon: "⚡",
    images: [],
    published: true,
    order: 1,
  },
  {
    id: "service-2",
    title: "33KV & 11KV Sub Stations",
    description: "Design, engineering, and installation of high voltage substations up to 33KV.",
    price: "Contact for Quote",
    icon: "🔌",
    images: [],
    published: true,
    order: 2,
  },
  {
    id: "service-3",
    title: "HT Switchgear Up to 33 KV",
    description: "High tension switchgear installation and commissioning for industrial applications.",
    price: "Contact for Quote",
    icon: "⚙️",
    images: [],
    published: true,
    order: 3,
  },
  {
    id: "service-4",
    title: "Cable Trunkings & Cable Trays",
    description: "Professional cable management systems for HT & LT installations.",
    price: "Contact for Quote",
    icon: "🔗",
    images: [],
    published: true,
    order: 4,
  },
  {
    id: "service-5",
    title: "LT Switchgear Panels & Bus-Ducts",
    description: "Low tension electrical distribution panels and bus duct systems.",
    price: "Contact for Quote",
    icon: "🔲",
    images: [],
    published: true,
    order: 5,
  },
  {
    id: "service-6",
    title: "LT 415V DG Sets",
    description: "Diesel generator installation in acoustic enclosures with complete automation.",
    price: "Contact for Quote",
    icon: "🔄",
    images: [],
    published: true,
    order: 6,
  },
];

const projects: Project[] = [
  {
    id: "project-1",
    title: "Pharma Manufacturing Plant",
    summary: "Pharmaceutical Industry - Hyderabad, Telangana",
    description: "Complete Electrical Infrastructure - 11KV Substation & Clean Room Power",
    cover_image: "",
    process_steps: [],
    status: "in-progress",
    related_services: ["service-2", "service-5"],
    company: "Pharma Manufacturing Plant",
    published: true,
    order: 1,
  },
  {
    id: "project-2",
    title: "IT Corporate Campus",
    summary: "Commercial Complex - Gachibowli, Hyderabad",
    description: "Smart Building Electrical Systems - 33KV Distribution & Automation",
    cover_image: "",
    process_steps: [],
    status: "in-progress",
    related_services: ["service-2", "service-5"],
    company: "IT Corporate Campus",
    published: true,
    order: 2,
  },
  {
    id: "project-3",
    title: "Food Processing Unit",
    summary: "Food Industry - Warangal, Telangana",
    description: "Industrial Power Distribution - LT Panels & Process Control",
    cover_image: "",
    process_steps: [],
    status: "in-progress",
    related_services: ["service-5"],
    company: "Food Processing Unit",
    published: true,
    order: 3,
  },
  {
    id: "project-4",
    title: "Solar Power Plant",
    summary: "Renewable Energy - Karimnagar, Telangana",
    description: "Solar Plant Electrification - 5MW Solar Installation",
    cover_image: "",
    process_steps: [],
    status: "in-progress",
    related_services: ["service-1"],
    company: "Solar Power Plant",
    published: true,
    order: 4,
  },
  {
    id: "project-5",
    title: "Trident Sugars Limited",
    summary: "Sugar Industry - Zaheerabad, Telangana",
    description: "Complete HT & LT Electrical Installation - 33KV Substation & Power Distribution",
    cover_image: "",
    process_steps: [],
    status: "completed",
    related_services: ["service-2", "service-3"],
    company: "Trident Sugars Limited",
    published: true,
    order: 5,
  },
  {
    id: "project-6",
    title: "Vishnu Chemicals Limited",
    summary: "Chemical Industry - JN Pharma City, Visakhapatnam",
    description: "Electrical Infrastructure & Automation - 11KV Distribution & Control Systems",
    cover_image: "",
    process_steps: [],
    status: "completed",
    related_services: ["service-2", "service-5"],
    company: "Vishnu Chemicals Limited",
    published: true,
    order: 6,
  },
  {
    id: "project-7",
    title: "100 Bed Super Speciality Hospital",
    summary: "Healthcare - Chandanagar, Hyderabad",
    description: "Hospital Electrical Systems & Emergency Power - LT Panels, DG Sets & UPS Systems",
    cover_image: "",
    process_steps: [],
    status: "completed",
    related_services: ["service-5", "service-6"],
    company: "100 Bed Super Speciality Hospital",
    published: true,
    order: 7,
  },
];

const companies: Company[] = [
  {
    id: "company-1",
    name: "Trident Sugars Limited",
    logo: "",
    website: "",
    description: "Sugar Industry",
    projects_list: ["project-5"],
    order: 1,
  },
  {
    id: "company-2",
    name: "Vishnu Chemicals Limited",
    logo: "",
    website: "",
    description: "Chemical Industry",
    projects_list: ["project-6"],
    order: 2,
  },
  {
    id: "company-3",
    name: "EMRI",
    logo: "",
    website: "",
    description: "Emergency Services",
    projects_list: [],
    order: 3,
  },
  {
    id: "company-4",
    name: "Ramky Group",
    logo: "",
    website: "",
    description: "Infrastructure",
    projects_list: [],
    order: 4,
  },
  {
    id: "company-5",
    name: "PRK Hospitals",
    logo: "",
    website: "",
    description: "Healthcare",
    projects_list: [],
    order: 5,
  },
  {
    id: "company-6",
    name: "Lanco",
    logo: "",
    website: "",
    description: "Infrastructure",
    projects_list: [],
    order: 6,
  },
  {
    id: "company-7",
    name: "Blue Ocean Biotech",
    logo: "",
    website: "",
    description: "Biotechnology",
    projects_list: [],
    order: 7,
  },
  {
    id: "company-8",
    name: "Krebs",
    logo: "",
    website: "",
    description: "Industrial",
    projects_list: [],
    order: 8,
  },
  {
    id: "company-9",
    name: "Avra",
    logo: "",
    website: "",
    description: "Healthcare",
    projects_list: [],
    order: 9,
  },
  {
    id: "company-10",
    name: "AT",
    logo: "",
    website: "",
    description: "Technology",
    projects_list: [],
    order: 10,
  },
  {
    id: "company-11",
    name: "Sri Sai Electrical",
    logo: "",
    website: "",
    description: "Electrical Services",
    projects_list: [],
    order: 11,
  },
  {
    id: "company-12",
    name: "RK",
    logo: "",
    website: "",
    description: "Industrial",
    projects_list: [],
    order: 12,
  },
];

const contactDetails: ContactDetails = {
  company_name: "SAAI ELECTRICAL WORKS",
  emails: ["saaielectricalworks1@gmail.com", "rk.saaielectricalworks@gmail.com"],
  phones: ["+91 75692 34922", "+91 79972 75089"],
  address: "4-35-563/6, Papa Rayudu Nagar Kukatpally, Hyderabad - 500 072",
  map: "",
  social_links: {},
};

async function seedData() {
  try {
    console.log("Connecting to database...");
    const { db } = await connectToDatabase();

    // Clear existing data
    console.log("Clearing existing data...");
    await db.collection("services").deleteMany({});
    await db.collection("projects").deleteMany({});
    await db.collection("companies").deleteMany({});
    await db.collection("contact").deleteMany({});

    // Insert services
    console.log("Inserting services...");
    await db.collection("services").insertMany(services);

    // Insert projects
    console.log("Inserting projects...");
    await db.collection("projects").insertMany(projects);

    // Insert companies
    console.log("Inserting companies...");
    await db.collection("companies").insertMany(companies);

    // Insert contact details
    console.log("Inserting contact details...");
    await db.collection("contact").insertOne(contactDetails);

    console.log("✅ Data seeded successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
}

seedData();

