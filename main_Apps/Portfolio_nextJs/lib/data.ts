import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import Desky from "@/public/Desky.png";
import SoliLMS from "@/public/SoliLMS.png";

import CarHub from "@/public/CarHub.png";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const projectsData = [ 
  {
    title: "DevStore: Electronic Products Store",
    description:
      "DevStore is an online store offering a wide range of electronic products, including AirPods, smartphones, and more, with a focus on quality and customer satisfaction.",
    tags: [
      "laravel",
      "bootstrap",
      "JavaScript",
      "Responsive Design",
      "E-commerce",
    ],
    imageUrl: Desky,
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
 imageUrl: SoliLMS,   //   your imported SoliLMS logo asset

  pageUrl: "https://github.com/samir20-23/FileRouge_v2",
}
,
] as const;

export const skillsData = [
  "HTML",
  "CSS",
  "Tailwind",
  "BootStrap",
  "SASS",
  "JavaScript",
  "TypeScript",
  "React.js",
  "Next.js",
  "Node.js",
  "Express.js",
  "PHP",
  "MongoDB",
  "MySQL",
  "WordPress",
  "Framer Motion",
  "Git",
  "Figma",
  "Framer",
] as const;
