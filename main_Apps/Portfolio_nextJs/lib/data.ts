import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import Desky from "@/public/Desky.png";
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
    title: "Desky: Private Call for bids.",
    description:
      "Desky aims to bridge the gap between startups and markets in the Moroccan Business landscape.",
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Zustand",
      "Express",
      "MongoDB",
    ],
    imageUrl: Desky,
    pageUrl: "https://desky-eight.vercel.app/en",
  },
  {
    title: "CarHub",
    description:
      "Car Showcase website presents various car types, showcasing comprehensive information in a well-designed format with advanced filtering and pagination support for an enhanced user experience.",
    tags: ["React", "TypeScript", "Next.js", "Tailwind", "API"],
    imageUrl: CarHub,
    pageUrl: "https://carhub-lovat.vercel.app/",
  },
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
