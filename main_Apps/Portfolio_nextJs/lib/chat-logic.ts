import { KNOWLEDGE_BASE, GREETINGS, FALLBACK_RESPONSES, KnowledgeItem, SAMIR_PERSONAL_INFO } from "./chat-data";

export interface ChatMessage {
    role: "user" | "ai";
    content: string | React.ReactNode;
    timestamp: Date;
    images?: string[];
}

export function getAIResponse(input: string): { text: string; link?: KnowledgeItem; images?: string[] } {
    const sanitizedInput = input.toLowerCase().trim();

    // 1. Check for greetings
    const greetingKeywords = ["hi", "hello", "hey", "greetings", "salam", "good morning", "good afternoon"];
    if (greetingKeywords.some(keyword => sanitizedInput.includes(keyword))) {
        const randomIndex = Math.floor(Math.random() * GREETINGS.length);
        return { text: GREETINGS[randomIndex] };
    }

    // 2. Personal Questions "Who are you?"
    const personalKeywords = ["who are you", "what is your name", "who is samir", "about you", "your background"];
    if (personalKeywords.some(keyword => sanitizedInput.includes(keyword))) {
        return {
            text: `I'm ${SAMIR_PERSONAL_INFO.name}, a ${SAMIR_PERSONAL_INFO.role}. ${SAMIR_PERSONAL_INFO.bio} I'm based in ${SAMIR_PERSONAL_INFO.location}.`,
            link: KNOWLEDGE_BASE.find(k => k.title === "About Me")
        };
    }

    // 3. Skills Questions
    const skillKeywords = ["skill", "tech", "stack", "react", "next", "laravel", "tailwind", "css", "js", "typescript"];
    if (skillKeywords.some(keyword => sanitizedInput.includes(keyword)) && !KNOWLEDGE_BASE.some(k => sanitizedInput.includes(k.title.toLowerCase()))) {
        return {
            text: "I have a diverse technical stack including React, Next.js, Laravel, and more. I love building high-quality, responsive applications.",
            link: KNOWLEDGE_BASE.find(k => k.title === "Skills")
        };
    }

    // 4. Check for matches in Knowledge Base
    let bestMatch: KnowledgeItem | null = null;
    let maxScore = 0;

    for (const item of KNOWLEDGE_BASE) {
        let score = 0;
        // Check title match
        if (sanitizedInput.includes(item.title.toLowerCase())) score += 5;

        // Check tags match
        for (const tag of item.tags) {
            if (sanitizedInput.includes(tag.toLowerCase())) {
                score += 2;
            }
        }

        if (score > maxScore) {
            maxScore = score;
            bestMatch = item;
        }
    }

    if (bestMatch && maxScore >= 2) {
        let responseText = `I found something related to that! `;
        if (bestMatch.description) {
            responseText += `${bestMatch.description} `;
        }
        responseText += `Click here to explore: `;

        return {
            text: responseText,
            link: bestMatch,
            images: bestMatch.images
        };
    }

    // 5. Fallback
    const randomFallbackIndex = Math.floor(Math.random() * FALLBACK_RESPONSES.length);
    return { text: FALLBACK_RESPONSES[randomFallbackIndex] };
}
