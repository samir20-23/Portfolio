"use client";

import React, { useState, useRef, useEffect } from "react";
import { BsChatDots, BsX, BsPersonCircle } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { getAIResponse, ChatMessage } from "@/lib/chat-logic";

export default function ChatAi() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "ai",
      content: "Salam! I'm Samir. How can I help you explore my work today?",
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
        images: response.images,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 600);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed  right-4 sm:right-7 z-[1000] w-[calc(100vw-32px)] sm:w-[400px] h-[500px] max-h-[70vh] bg-white bg-opacity-80 dark:bg-gray-950 dark:bg-opacity-90 backdrop-blur-xl border border-white border-opacity-40 dark:border-gray-800 shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-3xl flex flex-col overflow-hidden"
            style={{ zIndex: "33", bottom: "93px" }}
          >
            {/* Header */}
            <div className="p-4 bg-gray-100/50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500">
                    <Image src="/samir.jpg" alt="Samir" width={40} height={40} className="object-cover" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-gray-100 text-sm">Samir Aoulad Amar</h3>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">Online Portfolio Guide</p>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors bg-gray-200/50 dark:bg-gray-800/50 p-1.5 rounded-full"
                aria-label="Close Chat"
              >
                <BsX size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 custom-scrollbar-hide bg-transparent">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: msg.role === "user" ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex flex-col gap-2 max-w-[85%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                    <div
                      className={`p-3 rounded-2xl text-sm ${msg.role === "user"
                        ? "bg-blue-600 text-white rounded-tr-none"
                        : "bg-white/50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none"
                        } shadow-sm backdrop-blur-sm`}
                    >
                      {msg.content}
                    </div>
                    {msg.images && msg.images.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-1">
                        {msg.images.slice(0, 2).map((img, i) => (
                          <div key={i} className="relative w-32 h-20 rounded-lg overflow-hidden border border-white/20 shadow-md">
                            <Image src={img} alt="Project image" fill className="object-cover" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 border-t border-gray-200 dark:border-gray-800 flex gap-2 bg-gray-50/50 dark:bg-gray-900/50">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Samir something..."
                className="flex-1 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-200 shadow-inner"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-full transition-all flex items-center justify-center shadow-lg  "
                aria-label="Send Message"
              >
                <IoSend size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        className="fixed bg-white w-[2rem] h-[2rem] bg-opacity-80 backdrop-blur-[0.5rem] border border-white border-opacity-40 shadow-2xl rounded-full flex items-center justify-center  transition-all dark:bg-gray-950 z-[1001]"
        style={{
          bottom: "61px",
          right: "7px"
        }}
        onClick={toggleChat}
        aria-label="Toggle AI Assistant"
      >
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-gray-950 flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-300">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
        </div>
        {isOpen ? <BsX size={28} className="text-gray-800 dark:text-gray-200" /> : <BsChatDots size={24} className="text-gray-800 dark:text-gray-200" />}
      </button>
    </>
  );
}

