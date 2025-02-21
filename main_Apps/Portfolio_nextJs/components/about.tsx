"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-24 max-w-[45rem] text-center leading-8 sm:mb-24 scroll-mt-24"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      <p className="mb-3">
        I am a <span className="font-medium">Full-Stack Developer</span> from{" "}
        <span className="font-medium">Tanger, Morocco</span>. I specialize in
        creating innovative, user-friendly applications using modern technologies
        like <span className="font-medium">React, laravel , angular , Node.js, MySQL, PHP</span>, and{" "}
        <span className="font-medium">Laravel</span>. I have experience in both backend and frontend
        development, with a focus on delivering seamless user experiences and
        optimized solutions.
      </p>
      <p>
        I am always eager to learn and grow, and currently, I'm interested in
        mobile development with <span className="font-medium">Kotlin</span> and{" "}
        <span className="font-medium">Jetpack Compose</span>. My passion for programming is driven by the
        challenge of solving complex problems and continuously improving myself.
      </p>
      <p>
        <span className="italic">When I'm not coding</span>, I enjoy playing football, reading, and traveling.
        I’m fluent in <span className="font-medium">Arabic</span> (native), with a basic level of{" "}
        <span className="font-medium">English</span> and school-level{" "}
        <span className="font-medium">French</span>.
      </p>
      <p> 
      </p>
    </motion.section>
  );
}
