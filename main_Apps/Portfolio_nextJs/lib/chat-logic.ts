import { KNOWLEDGE_BASE, GREETINGS, FALLBACK_RESPONSES, KnowledgeItem } from "./chat-data";

export interface ChatMessage {
    role: "user" | "ai";
    content: string | React.ReactNode;
    timestamp: Date;
}

export function getAIResponse(input: string): { text: string; link?: KnowledgeItem } {
    const sanitizedInput = input.toLowerCase().trim();

    // 1. Check for greetings
    const greetingKeywords = ["hi", "hello", "hey", "greetings", "good morning", "good afternoon"];
    if (greetingKeywords.some(keyword => sanitizedInput.includes(keyword))) {
        const randomIndex = Math.floor(Math.random() * GREETINGS.length);
        return { text: GREETINGS[randomIndex] };
    }

    // 2. Check for matches in Knowledge Base
    // Score matches based on how many tags are present in the input
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
        return {
            text: `I found something related to that! Click here to explore: `,
            link: bestMatch
        };
    }

    // 3. Fallback
    const randomFallbackIndex = Math.floor(Math.random() * FALLBACK_RESPONSES.length);
    return { text: FALLBACK_RESPONSES[randomFallbackIndex] };
}
