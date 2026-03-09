export interface KnowledgeItem {
    title: string;
    tags: string[];
    routeUrl: string;
    description?: string;
}

export const GREETINGS = [
    "Hi! I'm your Portfolio Guide. How can I help you today?",
    "Hello! Ready to explore my work? Ask me about my projects or skills!",
    "Hey there! I can help you find specific projects or sections. What are you looking for?",
    "Greetings! I'm an AI assistant designed to guide you through this portfolio. What's on your mind?",
];

export const FALLBACK_RESPONSES = [
    "I'm not exactly sure about that, but you can ask me about my projects, skills, or how to contact me!",
    "I couldn't find a direct match for that. Try asking about 'React', 'Shopify', or 'Next.js' projects!",
    "Hmm, I don't have information on that specifically. Would you like to see my featured projects instead?",
    "I'm still learning! Feel free to ask about my technical background or specific work examples.",
];

export const KNOWLEDGE_BASE: KnowledgeItem[] = [
    {
        title: "Home",
        tags: ["home", "main", "start", "intro", "welcome"],
        routeUrl: "/",
    },
    {
        title: "About Me",
        tags: ["about", "who am i", "experience", "background", "bio", "samir"],
        routeUrl: "/#about",
    },
    {
        title: "Skills",
        tags: ["skills", "tools", "technologies", "languages", "stack", "frontend", "backend"],
        routeUrl: "/#skills",
    },
    {
        title: "Contact",
        tags: ["contact", "email", "get in touch", "hire", "message", "reach out"],
        routeUrl: "/#contact",
    },
    {
        title: "Tusitala: Luxury Napa Valley Estate Platform",
        tags: ["tusitala", "napa", "estate", "luxury", "real estate", "wordpress", "aws", "lightsail", "elementor"],
        routeUrl: "/projects/tusitala-napa-estate",
        description: "A high-end real estate and hospitality platform built for a private Napa Valley residence."
    },
    {
        title: "TCF-Canada: Exam Simulation & Training Platform",
        tags: ["tcf", "canada", "exam", "simulation", "test", "nextjs", "supabase", "stripe", "study"],
        routeUrl: "/projects/tcf-canada",
        description: "A technical simulation platform built to replicate the TCF Canada exam environment."
    },
    {
        title: "Five Systems: Technical Installations & Maintenance",
        tags: ["five systems", "electrical", "hvac", "maintenance", "installation", "construction", "nextjs"],
        routeUrl: "/projects/five-systems",
        description: "Technical installation and maintenance service platform."
    },
    {
        title: "Atelier Duré: Artisanal E-commerce Store",
        tags: ["atelier", "dure", "shopify", "ecommerce", "ceramics", "handcrafted", "artisanal", "store"],
        routeUrl: "/projects/atelier-dure-shopify",
        description: "A premium e-commerce platform built on Shopify for a handcrafted ceramics brand."
    },
    {
        title: "SoliLMS: Educational Management",
        tags: ["solilms", "lms", "education", "laravel", "php", "documents", "management"],
        routeUrl: "/projects/solilms",
        description: "Laravel-powered platform for organizing and sharing pedagogical documents."
    },
    {
        title: "TikTok-Flow: Social Video Sharing",
        tags: ["tiktok", "flow", "video", "social", "firebase", "sharing", "nextjs"],
        routeUrl: "/projects/tiktok-flow",
        description: "Social media platform for short-form video sharing."
    },
    {
        title: "Kan-Kids: Kids Clothing Store",
        tags: ["kan", "kids", "clothing", "ecommerce", "children", "laravel", "stripe"],
        routeUrl: "/projects/kan-kids",
        description: "Multilingual online store for children's clothing."
    },
];
