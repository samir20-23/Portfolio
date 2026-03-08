"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";

const skillGroups = {
  Frontend: ["html", "css", "js", "ts", "react", "nextjs", "tailwind", "bootstrap", "sass"],
  Backend: ["nodejs", "express", "php", "laravel", "mysql", "mongodb", "supabase", "firebase"],
  Tools: ["git", "github", "vercel", "figma", "vscode", "wordpress", "postman"]
};

export default function Skills() {
  const { ref } = useSectionInView("Skills");

  return (
    <section
      id="skills"
      ref={ref}
      className="mb-28 max-w-[65rem] scroll-mt-28 text-center sm:mb-40"
    >
      <SectionHeading>Technical Skills</SectionHeading>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 px-4">
        {Object.entries(skillGroups).map(([category, items], catIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: catIndex * 0.1 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm hover:bg-white/10 transition-all group"
          >
            <h3 className="text-xl font-bold mb-8 text-purple-400 group-hover:text-purple-300 transition-colors">
              {category}
            </h3>
            <div className="flex flex-center justify-center">
              <img
                src={`https://skillicons.dev/icons?i=${items.join(",")}&perline=5`}
                alt={`${category} Skills`}
                className="max-w-full"
              />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-16"
      >
        <img
          src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=700&size=18&duration=4000&pause=1000&color=A855F7&center=true&vCenter=true&width=482&lines=Continuous+learning.+Constant+evolving."
          alt="Typing SVG"
          className="mx-auto"
        />
      </motion.div>
    </section>
  );
}


