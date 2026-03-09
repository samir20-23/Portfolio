import data from "./data.json";

export interface KnowledgeItem {
    title: string;
    tags: string[];
    routeUrl: string;
    description?: string;
    images?: string[];
}

export const SAMIR_PERSONAL_INFO = {
    name: "Samir Aoulad Amar",
    role: "Full-Stack Developer",
    bio: "I'm a passionate full-stack developer specialized in building premium, high-performance web applications. I focus on creating seamless UI/UX experiences and robust backend systems using modern technologies like Next.js, Laravel, and Supabase.",
    location: "Tangier, Morocco",
};

export const GREETINGS = [
    "Hi! I'm Samir. How can I help you today?",
    "Hello! Salam! I'm Samir, ready to show you my work. What are you looking for?",
    "Hey there! It's Samir. Need a hand navigating my projects or skills?",
    "Greetings! I'm Samir Aoulad Amar. Feel free to ask me anything about my portfolio!",
    "Salam! I'm Samir. How's it going? Want to see some of my latest builds?",
];

export const FALLBACK_RESPONSES = [
    "I'm not exactly sure about that, but as a developer, I'm always learning! Maybe ask about my React, Next.js, or Laravel projects?",
    "I couldn't find a direct match. But did you know I specialize in Full-Stack development? Check out my TCF-Canada or Tusitala projects!",
    "Hmm, I don't have that info on hand. However, my skills range from Frontend (Tailwind, Framer Motion) to Backend (Node, PHP). Want to see those?",
    "I'm Samir, and while I might not know everything, I'm great at building web apps! Ask me about my tech stack or specific project details.",
    "That's a good question! I'm mainly focused on delivering premium UI/UX and scalable backends. Would you like to see my featured work?",
];

const BASE_KNOWLEDGE: KnowledgeItem[] = [
    {
        title: "Home",
        tags: ["home", "main", "start", "intro", "welcome"],
        routeUrl: "/",
    },
    {
        title: "About Me",
        tags: ["about", "who am i", "experience", "background", "bio", "samir", "who are you"],
        routeUrl: "/#about",
        description: SAMIR_PERSONAL_INFO.bio
    },
    {
        title: "Skills",
        tags: ["skills", "tools", "technologies", "languages", "stack", "frontend", "backend", "what do you use", "tech"],
        routeUrl: "/#skills",
    },
    {
        title: "Contact",
        tags: ["contact", "email", "get in touch", "hire", "message", "reach out", "location", "where are you"],
        routeUrl: "/#contact",
    },
];

// Dynamically generate project knowledge from data.json
const PROJECT_KNOWLEDGE: KnowledgeItem[] = data.projectsData.map((project) => ({
    title: project.title,
    tags: project.tags,
    routeUrl: `/projects/${project.slug}`,
    description: project.description,
    images: project.dynamicImages
}));

export const KNOWLEDGE_BASE: KnowledgeItem[] = [...BASE_KNOWLEDGE, ...PROJECT_KNOWLEDGE];
