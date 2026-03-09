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

    // 5. Smarter Fallback (Less repetitive)
    const randomFallbacks = [
        ...FALLBACK_RESPONSES,
        "It seems I don't have a direct answer for that. But I can tell you all about my web development projects if you're interested!",
        "Hmm, that's not in my immediate database. Maybe try asking about 'Tusitala' or 'TCF-Canada'?",
        "I'm still learning! Ask me about my tech stack or see my 'About' section to know me better.",
        "Could you be more specific? I have several projects involving E-commerce, Real Estate, and Education.",
    ];
    const uniqueFallback = randomFallbacks[Math.floor(Date.now() % randomFallbacks.length)];
    return { text: uniqueFallback };
}
