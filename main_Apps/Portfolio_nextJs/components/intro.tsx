"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { HiDownload, HiEye } from "react-icons/hi";
import { FaGithubSquare, FaHeadset } from "react-icons/fa";
import { useSectionInView } from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";
import "../app/intro.css";
import Modal from "./modal";
import ContactForm from "./contact-form";

export default function Intro() {
  const { ref } = useSectionInView("Home", 0.5);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

  const icons = ["🔥", "✨", "🚀", "👨‍💻", "🎯", "💡", "⚡️", "🌟", "🧠", "🛠", "📦", "🎉"];
  const [randomIcon, setRandomIcon] = useState("🚀");
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    const pick = () => {
      const idx = Math.floor(Math.random() * icons.length);
      setRandomIcon(icons[idx]);
    };

    pick();
    const interval = setInterval(pick, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={ref}
      id="home"
      className="mb-28 max-w-[50rem] text-center sm:mb-0 scroll-mt-[100rem] relative"
    >
      <div className="flex items-center justify-center">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 125, duration: 0.5 }}
            className="relative"
          >
            {/* Spinning/Pulse Background Effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 blur-2xl opacity-20 animate-pulse pointer-events-none" />
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-30 blur animate-[spin_8s_linear_infinite] pointer-events-none" />

            <div
              className="layla-thumb layla-thumbtwo m-auto text-center mt-4 mb-13 relative z-10"
              data-aos="fade-up"
              data-aos-duration="2000"
            >
              <Image
                src="/samir.jpg"
                alt="Aoulad Amar Samir"
                width="160"
                height="160"
                quality={100}
                priority
                id="profile-img"
                className="rounded-full object-cover border-[4px] border-white/10 shadow-2xl transition-transform hover:scale-105 duration-500"
              />
              <div className="textcircle">
                <div className="textcircletext">
                  <p>fullstack developer frontEnd backEnd</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.span
            className="absolute bottom-0 right-0 text-3xl z-20"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 125, delay: 0.1, duration: 0.7 }}
          >
            {randomIcon}
          </motion.span>
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
        <span className="font-bold text-purple-400"> full-stack developer</span> based
        in Tangier. I specialize in crafting{" "}
        <span className="italic underline decoration-purple-500/30">premium web experiences</span>.
      </motion.h1>

      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4 text-lg font-medium"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <button
          onClick={() => setIsCVModalOpen(true)}
          className="group bg-white/10 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-105 hover:scale-110 active:scale-105 transition-all cursor-pointer border border-white/10 hover:bg-white/20 shadow-lg"
        >
          Get My CV <HiDownload className="opacity-60 group-hover:translate-y-1 transition" />
        </button>

        <button
          onClick={() => setIsContactModalOpen(true)}
          className="group bg-purple-600 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-105 hover:scale-110 hover:bg-purple-700 active:scale-105 transition-all shadow-lg active:shadow-purple-500/20"
        >
          Get in Touch <BsArrowRight className="opacity-70 group-hover:translate-x-1 transition" />
        </button>

        <div className="flex gap-4">
          <a
            className="bg-white/5 p-4 text-gray-400 flex items-center gap-2 rounded-full hover:text-white hover:bg-white/10 border border-white/10 transition-all active:scale-95"
            href="https://www.linkedin.com/in/samir-aoulad-amar-a238a9334/"
            target="_blank"
          >
            <BsLinkedin />
          </a>
          <a
            className="bg-white/5 p-4 text-gray-400 flex items-center gap-2 rounded-full hover:text-white hover:bg-white/10 border border-white/10 transition-all active:scale-95"
            href="https://github.com/samir20-23"
            target="_blank"
          >
            <FaGithubSquare />
          </a>
        </div>
      </motion.div>

      {/* CV Modal */}
      <Modal
        isOpen={isCVModalOpen}
        onClose={() => setIsCVModalOpen(false)}
        title="Curriculum Vitae"
      >
        <div className="flex flex-col gap-6 h-[70vh]">
          <div className="flex-1 w-full bg-black/20 rounded-2xl overflow-hidden relative border border-white/5">
            <iframe
              src="/aouladAmarSamir.pdf#toolbar=0"
              className="w-full h-full"
              title="CV Viewer"
            />
          </div>
          <div className="flex justify-center gap-4">
            <a
              href="/aouladAmarSamir.pdf"
              download
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-all"
            >
              <HiDownload /> Download PDF
            </a>
          </div>
        </div>
      </Modal>

      {/* Contact Modal */}
      <Modal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        title="Send a Message"
      >
        <div className="max-w-2xl mx-auto py-4">
          <div className="flex items-center gap-4 mb-8 bg-purple-500/10 p-6 rounded-2xl border border-purple-500/20">
            <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white text-xl">
              <FaHeadset />
            </div>
            <div>
              <h4 className="font-bold text-white text-lg">Let's work together!</h4>
              <p className="text-gray-400 text-sm">I'm currently available for full-time or freelance opportunities.</p>
            </div>
          </div>
          <ContactForm />
        </div>
      </Modal>
    </section>
  );
}
