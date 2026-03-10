import { links } from "./data";

export type SectionName = (typeof links)[number]["name"];

export type ProjectData = {
    title: string;
    slug: string;
    description: string;
    tags: string[];
    imageUrl?: string;
    dynamicImages?: string[];
    pageUrl?: string;
    githubUrl?: string;
};
