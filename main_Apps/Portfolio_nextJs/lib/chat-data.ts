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

export const KNOWLEDGE_BASE: KnowledgeItem[] = [
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
    {
        title: "Tusitala: Luxury Napa Valley Estate Platform",
        tags: ["tusitala", "napa", "estate", "luxury", "real estate", "wordpress", "aws", "lightsail", "elementor"],
        routeUrl: "/projects/tusitala-napa-estate",
        images: [
            "https://media.githubusercontent.com/media/samir20-23/Portfolio/main/main_Apps/Portfolio_nextJs/public/napa_tusitala/homePage/section1.png",
            "https://media.githubusercontent.com/media/samir20-23/Portfolio/main/main_Apps/Portfolio_nextJs/public/napa_tusitala/fullpagegallery.png"
        ]
    },
    {
        title: "TCF-Canada: Exam Simulation & Training Platform",
        tags: ["tcf", "canada", "exam", "simulation", "test", "nextjs", "supabase", "stripe", "study"],
        routeUrl: "/projects/tcf-canada",
        images: [
            "https://media.githubusercontent.com/media/samir20-23/Portfolio/main/main_Apps/Portfolio_nextJs/public/tcf_canada/landingPageHeroSection.png",
            "https://media.githubusercontent.com/media/samir20-23/Portfolio/main/main_Apps/Portfolio_nextJs/public/tcf_canada/studentDashboard.png"
        ]
    },
    {
        title: "Five Systems: Technical Installations & Maintenance",
        tags: ["five systems", "electrical", "hvac", "maintenance", "installation", "construction", "nextjs"],
        routeUrl: "/projects/five-systems",
        images: [
            "https://media.githubusercontent.com/media/samir20-23/Portfolio/main/main_Apps/Portfolio_nextJs/public/fiveSystems/fivesystem0.png",
            "https://media.githubusercontent.com/media/samir20-23/Portfolio/main/main_Apps/Portfolio_nextJs/public/fiveSystems/FiveSystems.png"
        ]
    },
    {
        title: "Atelier Duré: Artisanal E-commerce Store",
        tags: ["atelier", "dure", "shopify", "ecommerce", "ceramics", "handcrafted", "artisanal", "store"],
        routeUrl: "/projects/atelier-dure-shopify",
        images: [
            "https://media.githubusercontent.com/media/samir20-23/Portfolio/main/main_Apps/Portfolio_nextJs/public/shopify_atelierdure/fullhomepage.png",
            "https://media.githubusercontent.com/media/samir20-23/Portfolio/main/main_Apps/Portfolio_nextJs/public/shopify_atelierdure/section1.png"
        ]
    },
    {
        title: "SoliLMS: Educational Management",
        tags: ["solilms", "lms", "education", "laravel", "php", "documents", "management"],
        routeUrl: "/projects/solilms",
        images: [
            "https://media.githubusercontent.com/media/samir20-23/Portfolio/main/main_Apps/Portfolio_nextJs/public/Solilms/SoliLMS.png",
            "https://media.githubusercontent.com/media/samir20-23/Portfolio/main/main_Apps/Portfolio_nextJs/public/Solilms/SoliLMS2.png"
        ]
    },
    {
        title: "TikTok-Flow: Social Video Sharing",
        tags: ["tiktok", "flow", "video", "social", "firebase", "sharing", "nextjs"],
        routeUrl: "/projects/tiktok-flow",
        images: [
            "https://media.githubusercontent.com/media/samir20-23/Portfolio/main/main_Apps/Portfolio_nextJs/public/tiktok-flow/tiktokflow1.png",
            "https://media.githubusercontent.com/media/samir20-23/Portfolio/main/main_Apps/Portfolio_nextJs/public/tiktok-flow/tiktokflow2.png"
        ]
    },
    {
        title: "Kan-Kids: Kids Clothing Store",
        tags: ["kan", "kids", "clothing", "ecommerce", "children", "laravel", "stripe"],
        routeUrl: "/projects/kan-kids",
        images: [
            "https://media.githubusercontent.com/media/samir20-23/Portfolio/main/main_Apps/Portfolio_nextJs/public/kan-kids/kan1.png",
            "https://media.githubusercontent.com/media/samir20-23/Portfolio/main/main_Apps/Portfolio_nextJs/public/kan-kids/kan2.png"
        ]
    },
];
