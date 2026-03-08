"use client";

import React, { useState } from "react";
import { BsChatDots, BsX } from "react-icons/bs";

export default function ChatAi() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    // You can also trigger your chatAi logic here
  };

  return (
    <button
      className="fixed    bg-white w-[100] h-[100] bg-opacity-80 backdrop-blur-[0.5rem] border border-white border-opacity-40 shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all dark:bg-gray-950 dark:border-gray-800 z-50"
      style={{ bottom: "68px" }}
      onClick={toggleChat}
      aria-label="Toggle Chat"
    >
      {isOpen ? (
        <BsX className="text-2xl text-gray-800 dark:text-gray-200" />
      ) : (
        <BsChatDots className="text-xl text-gray-800 dark:text-gray-200" />
      )}
    </button>
  );
}