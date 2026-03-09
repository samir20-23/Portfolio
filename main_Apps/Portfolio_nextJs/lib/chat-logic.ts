import { KNOWLEDGE_BASE, GREETINGS, FALLBACK_RESPONSES, KnowledgeItem, SAMIR_PERSONAL_INFO } from "./chat-data";

export interface ChatMessage {
    role: "user" | "ai";
    content: string | React.ReactNode;
    timestamp: Date;
    images?: string[];
}

/**
 * Normalizes text for better matching: lowercase, remove special characters, split into unique words.
 */
function normalizeAndSplit(text: string): string[] {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "") // Remove special characters but keep hyphens
        .split(/\s+/)
        .filter(word => word.length > 1);
}

export function getAIResponse(input: string): { text: string; link?: KnowledgeItem; images?: string[] } {
    const sanitizedInput = input.toLowerCase().trim();
    const inputWords = normalizeAndSplit(sanitizedInput);

    // Handle specific commands
    if (sanitizedInput === "/skills") {
        const { SKILLS_LIST } = require("./chat-data");
        return {
            text: `Here are my technical skills and tools:\n\n${SKILLS_LIST.map((s: string) => `• ${s}`).join("\n")}`,
            link: KNOWLEDGE_BASE.find(k => k.title === "Skills")
        };
    }

    if (sanitizedInput === "/projects" || sanitizedInput.includes("projects")) {
        const projects = KNOWLEDGE_BASE.filter(item => item.routeUrl.startsWith("/projects/")).slice(0, 3);
        const projectsText = projects.map(p => `**${p.title}**\n${p.description?.substring(0, 100)}...`).join("\n\n");
        return {
            text: `I've built several exciting projects! Here are a few:\n\n${projectsText}\n\nYou can see all of them in my projects section.`,
            link: { title: "All Projects", routeUrl: "/#projects", tags: [] } as any,
            images: projects.flatMap(p => (p.images || []).slice(0, 1))
        };
    }

    if (sanitizedInput === "/about") {
        return {
            text: `I'm ${SAMIR_PERSONAL_INFO.name}, a ${SAMIR_PERSONAL_INFO.role}. ${SAMIR_PERSONAL_INFO.bio}`,
            link: KNOWLEDGE_BASE.find(k => k.title === "About Me")
        };
    }

    // 3. Skills Questions (Keyword based)
    const skillKeywords = ["skill", "tech", "stack", "react", "next", "laravel", "tailwind", "css", "js", "typescript", "php", "aws", "languages", "tools"];
    if (skillKeywords.some(keyword => sanitizedInput.includes(keyword)) && !KNOWLEDGE_BASE.slice(4).some(k => sanitizedInput.includes(k.title.toLowerCase()))) {
        const { SKILLS_LIST } = require("./chat-data");
        return {
            text: `I specialize in a wide range of technologies including React, Next.js, and Laravel. My full tech stack: ${SKILLS_LIST.join(", ")}.`,
            link: KNOWLEDGE_BASE.find(k => k.title === "Skills")
        };
    }

    // 4. Advanced Matcher
    let bestMatch: KnowledgeItem | null = null;
    let maxScore = 0;

    for (const item of KNOWLEDGE_BASE) {
        let score = 0;
        const itemTitle = item.title.toLowerCase();
        const itemTags = item.tags.map(t => t.toLowerCase());
        const itemDesc = (item.description || "").toLowerCase();

        // Exact Title Match (Highest priority)
        if (sanitizedInput === itemTitle) score += 50;
        else if (itemTitle.includes(sanitizedInput)) score += 20;

        // Word-based scoring
        for (const word of inputWords) {
            if (itemTitle.includes(word)) score += 10;
            if (itemTags.some(tag => tag.includes(word))) score += 5;
            if (itemDesc.includes(word)) score += 2;
        }

        if (score > maxScore) {
            maxScore = score;
            bestMatch = item;
        }
    }

    // Threshold for a good match
    if (bestMatch && maxScore >= 5) {
        // If it's a project match, link it to the main projects list if preferred
        const isProject = bestMatch.routeUrl.startsWith("/projects/");

        return {
            text: `**${bestMatch.title}**\n${bestMatch.description || ""}`,
            link: isProject ? { title: "See All Projects", routeUrl: "/#projects", tags: [] } as any : bestMatch,
            images: bestMatch.images
        };
    }

    // 5. Smarter Fallback
    const projectItems = KNOWLEDGE_BASE.filter(item => item.routeUrl.startsWith("/projects/"));
    const shuffled = [...projectItems].sort(() => 0.5 - Math.random());
    const randomProjects = shuffled.slice(0, 2);

    return {
        text: "I'm not exactly sure about that, but feel free to explore my projects or skills! I've built everything from luxury estate platforms to exam simulation systems.",
        link: { title: "View Projects", routeUrl: "/#projects", tags: [] } as any,
        images: [
            ...(randomProjects[0]?.images || []).slice(0, 1),
            ...(randomProjects[1]?.images || []).slice(0, 1)
        ]
    };
}
