"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { FaGithubSquare } from "react-icons/fa";
import { useSectionInView } from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";
import "../app/intro.css";
export default function Intro() {
  const { ref } = useSectionInView("Home", 0.5);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

  // Random Icon Logic
  const icons = [
    "💻",
    "🚀",
    "🦾",
    "🎉",
    "🔥",
    "👨‍💻",
    "⚡",
    "✨",
    "😃",
    "✅",
    "🌟",
    "🏆",
  ];
  const [randomIcon, setRandomIcon] = useState("🚀");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * icons.length);
    setRandomIcon(icons[randomIndex]);

    // Change the icon every 3 seconds
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * icons.length);
      setRandomIcon(icons[randomIndex]);
    }, 3000);

    return () => clearInterval(interval); // Cleanup interval when the component unmounts
  }, []);

  return (
    <section
      ref={ref}
      id="home"
      className="mb-28 max-w-[50rem] text-center sm:mb-0 scroll-mt-[100rem]"
    >
      <div className="flex items-center justify-center">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "tween",
              duration: 0.2,
            }}
            id="mg-container"
          >
            <Image
              src="/samir.jpg"
              alt="Aoulad Amar Samir"
              width="150"
              height="150"
              quality="100"
              priority={true}
              id="profile-img"
              style={{ borderRadius: "50px", border: "2px solid white" }}
              className="h-30 w-30 rounded-xl object-cover border-[0.15rem] rounded-[200px] border-white shadow-xl"
            />
          </motion.div>
          <motion.span
            className="absolute bottom-0 right-0 text-4xl animate-pulse"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 125,
              delay: 0.1,
              duration: 0.7,
            }}
            id="randomIcon"
          >
            {randomIcon}
          </motion.span>
        </div>
      </div>
      <div id="badges" className="flex justify-center items-center w-full mt-4">
        <h1>
          <img
            src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=700&size=40&duration=4&pause=20&color=6D26BFFF&center=true&vCenter=true&width=482&lines=Samir+Aoulad+Amar"
            alt="Samir Aoulad Amar"
          />
        </h1>
      </div>
      <motion.h1
        className="mb-10 mt-8 px-4 text-2xl font-medium !leading-[1.5] sm:text-4xl"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="font-bold">Hi, I'm Samir Aoulad Amar.</span> I'm a
        <span className="font-bold"> passionate full-stack developer</span> from
        Tanger, Morocco. I specialize in crafting{" "}
        <span className="italic">scalable web applications</span>.
      </motion.h1>
      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center gap-2 px-4 text-lg font-medium"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
        }}
      >
        <a
          className="group bg-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-105 hover:scale-105 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10"
          href="/aouladAmarSamir.pdf"
          download
        >
          Get My CV{" "}
          <HiDownload className="opacity-60 group-hover:translate-y-0.5 transition" />
        </a>
        <Link
          href="#contact"
          className="group bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none dark:bg-gray-300 dark:text-black focus:scale-105 hover:scale-105 hover:bg-gray-950 active:scale-105 transition"
          onClick={() => {
            setActiveSection("Contact");
            setTimeOfLastClick(Date.now());
          }}
        >
          Get in Touch
          <BsArrowRight className="opacity-70 group-hover:translate-x-1 transition" />
        </Link>
        <div className="flex gap-2 ">
          <a
            className="bg-white p-4 text-gray-700 flex items-center gap-2 text-[1.35rem] rounded-full focus:scale-110 hover:scale-110 hover:text-gray-950 active:scale-110 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
            href="https://www.linkedin.com/in/samir-aoulad-amar-a238a9334/"
            target="_blank"
          >
            <BsLinkedin />
          </a>
          <a
            className="bg-white p-4 text-gray-700 flex items-center gap-2 text-[1.35rem] rounded-full focus:scale-110 hover:scale-110 hover:text-gray-950 active:scale-110 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
            href="https://github.com/samir20-23"
            target="_blank"
          >
            <FaGithubSquare />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
