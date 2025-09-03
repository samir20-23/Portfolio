import carHub from "@/public/stor/CarHub.png";
import desky from "@/public/stor/Desky.png";
import soliLMS from "@/public/Solilms/SoliLMS.png";
import soliLMS2 from "@/public/Solilms/SoliLMS2.png";
import fiveSystem0 from "@/public/fiveSystems/fivesystem0.png";
import fiveSystem1 from "@/public/fiveSystems/fivesystem1.png";
import fiveSystem2 from "@/public/fiveSystems/fivesystem2.png";
import fiveSystems from "@/public/fiveSystems/FiveSystems.png";
import tiktokFlow1 from "@/public/tiktok-flow/tiktokflow1.png";
import tiktokFlow2 from "@/public/tiktok-flow/tiktokflow2.png";
import tiktokFlow3 from "@/public/tiktok-flow/tiktokflow3.png";
import tiktokFlow4 from "@/public/tiktok-flow/tiktokflow4.png";
import tiktokFlow5 from "@/public/tiktok-flow/tiktokflow5.png";
import kanKids1 from "@/public/kan-kids/kan1.png";
import kanKids2 from "@/public/kan-kids/kan2.png";
import kanKids3 from "@/public/kan-kids/kan3.png";
import kanKids4 from "@/public/kan-kids/kan4.png";
import kanKids5 from "@/public/kan-kids/kan5.png";
import kanKids6 from "@/public/kan-kids/kan6.png";
import kanKids7 from "@/public/kan-kids/kan7.png";

export const projectsData = [
  {
    title: "DevStore: Electronic Products Store",
    description:
      "DevStore is an online store offering a wide range of electronic products, including AirPods, smartphones, and more, with a focus on quality and customer satisfaction.",
    tags: ["laravel", "bootstrap", "JavaScript", "Responsive Design", "E-commerce"],
    dynamicImages: [carHub, desky],
    pageUrl: "",
  },
  {
    title: "SoliLMS: Centralized Educational Resource Management",
    description:
      "SoliLMS is a secure, Laravel-powered platform for organizing, sharing, and tracking pedagogical documents and resources. It features intuitive categorization, role-based access, real-time usage dashboards, and automatic notifications for updates or new materials.",
    tags: [
      "Laravel",
      "PHP",
      "Blade",
      "Vue.js",
      "MySQL",
      "Resource Sharing",
      "Role-Based Access",
      "Dashboard",
    ],
    dynamicImages: [soliLMS, soliLMS2],
    pageUrl: "https://github.com/samir20-23/FileRouge_v2",
  },
  {
    title: "Five Systems: Technical Installations & Maintenance",
    description:
      "Five Systems is a Moroccan company based in Tangier specializing in the design, installation, and maintenance of high-quality electrical, HVAC, plumbing, and fire safety systems for residential and commercial projects.",
    tags: ["Next.js", "React", "TypeScript", "SCSS", "Tailwind CSS", "Responsive Design"],
    dynamicImages: [fiveSystem0, fiveSystem1, fiveSystem2, fiveSystems],
    pageUrl: "https://five-systems.vercel.app",
  },
  {
    title: "TikTok-Flow: Social Video Sharing App",
    description:
      "TikTok-Flow is a social media platform that allows users to upload, view, and interact with short-form videos. Features include user authentication, video uploading, likes, comments, and real-time updates powered by Firebase Firestore.",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Firebase",
      "Firestore",
      "supabase",
      "Authentication",
      "Responsive Design",
    ],
    dynamicImages: [tiktokFlow1, tiktokFlow2, tiktokFlow3, tiktokFlow4, tiktokFlow5],
    pageUrl: "https://tiktok-flow.vercel.app",
  },
  {
    title: "Kan-Kids: Kids Clothing E-commerce Store",
    description:
      "Kan-Kids is an online store for children's clothing with multilingual support (Arabic/English). Features include product catalog with size & age filters, multiple images per product, cart & checkout, WhatsApp ordering integration, admin dashboard for inventory and orders, responsive design and performance optimizations.",
    tags: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Laravel API",
      "Firebase",
      "Stripe",
      "i18n",
      "Responsive Design",
      "E-commerce",
      "Admin Panel",
    ],
    dynamicImages: [kanKids1, kanKids2, kanKids3, kanKids4, kanKids5, kanKids6, kanKids7],
    pageUrl: "https://kan-kids-ecommerce.vercel.app/",
  },
];
