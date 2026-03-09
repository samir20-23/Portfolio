"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BsArrowRight, BsLinkedin, BsCpu, BsCodeSlash } from "react-icons/bs";
import { HiDownload, HiOutlineSparkles, HiOutlineLightningBolt } from "react-icons/hi";
import { FaGithubSquare, FaHeadset, FaTerminal, FaLayerGroup } from "react-icons/fa";
import { RiRocketLine } from "react-icons/ri";
import { LuBrainCircuit } from "react-icons/lu";
import { useSectionInView } from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";
import "../app/intro.css";
import Modal from "./modal";
import ContactForm from "./contact-form";

const techIcons = [
  <BsCodeSlash key="code" />,
  <RiRocketLine key="rocket" />,
  <HiOutlineSparkles key="sparkle" />,
  <LuBrainCircuit key="brain" />,
  <FaTerminal key="terminal" />,
  <HiOutlineLightningBolt key="bolt" />,
  <BsCpu key="cpu" />,
  <FaLayerGroup key="stack" />,
];

export default function Intro() {
  const { ref } = useSectionInView("Home", 0.5);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

  const [iconIndex, setIconIndex] = useState(0);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIconIndex((prev) => (prev + 1) % techIcons.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // --- YOUR SCRIPT INTEGRATED HERE ---
  useEffect(() => {
    // 1. Text circle logic
    const text = document.querySelector(".textcircletext");
    if (text) {
      text.innerHTML = (text as HTMLElement).innerText
        .split("")
        .map(
          (char, i) => `<span style="transform:rotate(${i * 10}deg)">${char}</span>`
        )
        .join("");
    }

    // 2. Cursor logic
    const cursor = document.querySelector(".cursor");
    
    const moveCursor = (e: MouseEvent) => {
      if (!cursor) return;
      const x = e.pageX;
      const y = e.pageY;

      // move main custom cursor
      (cursor as HTMLElement).style.left = `${x}px`;
      (cursor as HTMLElement).style.top = `${y}px`;

      // particle
      const particle = document.createElement("div");
      particle.classList.add("particle");
      document.body.appendChild(particle);
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;

      setTimeout(() => {
        particle.remove();
      }, 500);
    };

    document.addEventListener("mousemove", moveCursor);

    // Cleanup to prevent performance issues
    return () => {
      document.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <section
      ref={ref}
      id="home"
      className="mb-28 max-w-[50rem] text-center sm:mb-0 scroll-mt-[100rem] relative"
      style={{ marginTop: "88px" }}
    >
      {/* Ensure this div exists for your script to find */}
      <div className="cursor hidden md:block" />

      <div className="flex items-center justify-center">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 125, duration: 0.5 }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 blur-2xl opacity-20 animate-pulse pointer-events-none" />
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-30 blur animate-[spin_8s_linear_infinite] pointer-events-none" />

            <div className="layla-thumb layla-thumbtwo m-auto text-center mt-4 mb-13 relative z-10">
              <Image
                src="/samir.jpg"
                alt="Aoulad Amar Samir"
                width="150"
                height="150"
                quality={100}
                priority
                id="profile-img"
                className="rounded-full object-cover border-[4px] border-white/10 shadow-2xl transition-transform hover:scale-105 duration-500"
              />
              <div className="textcircle"> 
                {/* Your script targets this class */}
                <div className="textcircletext">
                  fullstack developer frontEnd backEnd 
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            key={iconIndex}
            className="absolute bottom-2 right-2 w-5 h-5 md:w-8 md:h-8 border border-white/20 rounded-full flex items-center justify-center text-white text-xl z-20 shadow-xl bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            {techIcons[iconIndex]}
          </motion.div>
        </div>
      </div>

      <div id="badges" className="flex justify-center items-center w-full mt-8">
        <img
          src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=700&size=40&duration=4&pause=20&color=A855F7&center=true&vCenter=true&width=482&lines=Samir+Aoulad+Amar"
          alt="Samir Aoulad Amar"
        />
      </div>

      <motion.h1
        className="mb-10 mt-8 px-4 text-2xl font-medium !leading-[1.5] sm:text-4xl text-gray-200"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="font-bold text-white">Hi, I'm Samir.</span> I'm a
        <span className="font-bold text-purple-400"> full-stack developer</span>.
      </motion.h1>

      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4 text-lg font-medium"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <button
          onClick={() => setIsCVModalOpen(true)}
          className="group bg-white/10 text-white px-7 py-3 flex items-center gap-2 rounded-full border border-white/10 hover:bg-white/20 transition-all"
        >
          Get My CV <HiDownload className="opacity-60 group-hover:translate-y-1 transition" />
        </button>

        <button
          onClick={() => setIsContactModalOpen(true)}
          className="group bg-purple-600 text-white px-7 py-3 flex items-center gap-2 rounded-full hover:bg-purple-700 transition-all"
        >
          Get in Touch <BsArrowRight className="opacity-70 group-hover:translate-x-1 transition" />
        </button>

        <div className="flex gap-4">
          <a
            className="bg-white/5 p-4 text-gray-400 flex items-center gap-2 rounded-full hover:text-white border border-white/10 transition-all"
            href="https://www.linkedin.com/in/samir-aoulad-amar-a238a9334/"
            target="_blank"
          >
            <BsLinkedin />
          </a>
          <a
            className="bg-white/5 p-4 text-gray-400 flex items-center gap-2 rounded-full hover:text-white border border-white/10 transition-all"
            href="https://github.com/samir20-23"
            target="_blank"
          >
            <FaGithubSquare />
          </a>
        </div>
      </motion.div>

      {/* Modals */}
      <Modal isOpen={isCVModalOpen} onClose={() => setIsCVModalOpen(false)} title="Curriculum Vitae">
        <div className="flex flex-col gap-6 h-full min-h-[650px]">
          <iframe src="/aouladAmarSamir.pdf#toolbar=0" className="w-full h-full min-h-[550px]" title="CV Viewer" />
        </div>
      </Modal>

      <Modal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} title="Send a Message">
        <ContactForm />
      </Modal>
    </section>
  );
}