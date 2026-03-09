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

    // 1. Check for greetings
    const greetingKeywords = ["hi", "hello", "hey", "greetings", "salam", "morning", "evening"];
    if (greetingKeywords.some(keyword => sanitizedInput.includes(keyword))) {
        const randomIndex = Math.floor(Math.random() * GREETINGS.length);
        return { text: GREETINGS[randomIndex] };
    }

    // 2. Personal Questions
    const personalKeywords = ["who are you", "what is your name", "who is samir", "about you", "your background", "biography"];
    if (personalKeywords.some(keyword => sanitizedInput.includes(keyword))) {
        return {
            text: `I'm ${SAMIR_PERSONAL_INFO.name}, a ${SAMIR_PERSONAL_INFO.role}. ${SAMIR_PERSONAL_INFO.bio} I'm currently based in ${SAMIR_PERSONAL_INFO.location}.`,
            link: KNOWLEDGE_BASE.find(k => k.title === "About Me")
        };
    }

    // 3. Skills Questions
    const skillKeywords = ["skill", "tech", "stack", "react", "next", "laravel", "tailwind", "css", "js", "typescript", "php", "aws"];
    if (skillKeywords.some(keyword => sanitizedInput.includes(keyword)) && !KNOWLEDGE_BASE.some(k => sanitizedInput.includes(k.title.toLowerCase()))) {
        return {
            text: "I specialize in modern technologies like React, Next.js, and Laravel. I'm also proficient in cloud services like AWS and database management with Supabase. Want to see my specific skills?",
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
            // Check title words
            if (itemTitle.includes(word)) score += 10;

            // Check tags
            if (itemTags.some(tag => tag.includes(word))) score += 5;

            // Check description (Deep search)
            if (itemDesc.includes(word)) score += 2;
        }

        if (score > maxScore) {
            maxScore = score;
            bestMatch = item;
        }
    }

    // Threshold for a good match
    if (bestMatch && maxScore >= 5) {
        let responsePrefix = "I found something relevant! ";
        if (maxScore > 30) responsePrefix = "I have exactly what you're looking for! ";

        let responseText = `${responsePrefix}${bestMatch.description || ""} `;
        responseText += `Explore more here: `;

        return {
            text: responseText,
            link: bestMatch,
            images: bestMatch.images
        };
    }

    // 5. Smarter Fallback with Random Project Suggestions
    const projectItems = KNOWLEDGE_BASE.filter(item => item.routeUrl.startsWith("/projects/"));
    const shuffled = [...projectItems].sort(() => 0.5 - Math.random());
    const randomProjects = shuffled.slice(0, 2);

    const fallbackTexts = [
        "I'm not exactly sure about that, but check out some of my other work!",
        "Hmm, I didn't find a direct match. How about these instead?",
        "I'm still learning! But here are a few projects I'm particularly proud of:",
        "That's a bit outside my current database. Would you like to explore these projects?",
        "I couldn't find exactly that, but as a full-stack dev, I've built some cool things like these:"
    ];

    const randomText = fallbackTexts[Math.floor(Math.random() * fallbackTexts.length)];

    // We'll return the first random project as a "link" and combine images if possible, 
    // or just return a rich response structure.
    return {
        text: randomText,
        link: randomProjects[0], // Suggest the first one as a primary link
        images: [
            ...(randomProjects[0]?.images || []).slice(0, 1),
            ...(randomProjects[1]?.images || []).slice(0, 1)
        ]
    };
}
