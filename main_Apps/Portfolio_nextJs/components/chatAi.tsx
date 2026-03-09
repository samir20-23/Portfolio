"use client";

import React, { useState, useRef, useEffect } from "react";
import { BsChatDots, BsX } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { getAIResponse, ChatMessage } from "@/lib/chat-logic";
import { KnowledgeItem } from "@/lib/chat-data";

export default function ChatAi() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "ai",
      content: "Hi! I'm your Portfolio Guide. How can I help you explore my work today?",
      timestamp: new Date(),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");

    // Simulate AI thinking
    setTimeout(() => {
      const response = getAIResponse(currentInput);
      const aiMessage: ChatMessage = {
        role: "ai",
        content: (
          <span>
            {response.text}
            {response.link && (
              <Link
                href={response.link.routeUrl}
                className="text-blue-500 hover:underline font-semibold ml-1"
                onClick={() => setIsOpen(false)}
              >
                {response.link.title}
              </Link>
            )}
          </span>
        ),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 600);
  };

  return (
    <div className="fixed bottom-10 right-10 z-[999] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-white bg-opacity-80 dark:bg-gray-950 dark:bg-opacity-80 backdrop-blur-lg border border-white border-opacity-40 dark:border-gray-800 shadow-2xl rounded-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <h3 className="font-bold text-gray-800 dark:text-gray-100 italic">Portfolio Guide</h3>
              </div>
              <button
                onClick={toggleChat}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                aria-label="Close Chat"
              >
                <BsX size={24} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 custom-scrollbar-hide">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: msg.role === "user" ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === "user"
                        ? "bg-blue-600 text-white rounded-tr-none"
                        : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none"
                      } shadow-md`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 border-t border-gray-200 dark:border-gray-800 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-200"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors flex items-center justify-center"
                aria-label="Send Message"
              >
                <IoSend />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        className="bg-blue-600 w-14 h-14 bg-opacity-90 backdrop-blur-md border border-white border-opacity-20 shadow-2xl rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all text-white active:bg-blue-700 relative group"
        onClick={toggleChat}
        aria-label="Toggle AI Assistant"
      >
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-gray-950 flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-300">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
        </div>
        {isOpen ? <BsX size={28} /> : <BsChatDots size={24} />}
      </button>
    </div>
  );
}
