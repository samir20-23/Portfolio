"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaFileDownload } from "react-icons/fa";
import { HiOutlineChatAlt2 } from "react-icons/hi";

const socialLinks = [
    {
        name: "GitHub",
        icon: <FaGithub />,
        href: "https://github.com/samir20-23",
        color: "hover:text-white"
    },
    {
        name: "LinkedIn",
        icon: <FaLinkedin />,
        href: "https://www.linkedin.com/in/samir-aoulad-amar-a238a9334/",
        color: "hover:text-blue-400"
    },
    {
        name: "Email",
        icon: <FaEnvelope />,
        href: "mailto:aouladamarsamir@gmail.com",
        color: "hover:text-purple-400"
    }
];

export default function SocialDock() {
    return (
        <motion.div
            initial={{ y: 100, x: "-50%", opacity: 0 }}
            animate={{ y: 0, x: "-50%", opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 bg-gray-900/60 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-6"
        >
            {socialLinks.map((link, i) => (
                <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-400 text-xl transition-all duration-300 hover:scale-125 ${link.color} relative group`}
                >
                    {link.icon}
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/5">
                        {link.name}
                    </span>
                </a>
            ))}

            <div className="w-[1px] h-6 bg-white/10 mx-2" />

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                    } else {
                        window.location.href = '/#contact';
                    }
                }}
                className="text-purple-400 text-xl hover:text-purple-300 transition-colors relative group"
            >
                <HiOutlineChatAlt2 />
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/5">
                    Let's Talk
                </span>
            </motion.button>
        </motion.div>
    );
}
