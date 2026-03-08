"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";

const skills = {
  Frontend: ["HTML", "CSS", "JavaScript", "TypeScript", "React.js", "Next.js", "Tailwind", "Bootstrap", "SASS", "Framer Motion"],
  Backend: ["Node.js", "Express.js", "PHP", "Laravel", "MySQL", "MongoDB", "Supabase", "Firebase"],
  Tools: ["Git", "GitHub", "Vercel", "Figma", "VS Code", "WordPress", "Postman"]
};

const fadeInAnimationVariants = {
  initial: { opacity: 0, y: 20 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.05 * index }
  })
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 px-4">
        {Object.entries(skills).map(([category, items], catIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: catIndex * 0.1 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm hover:bg-white/10 transition-all group"
          >
            <h3 className="text-xl font-bold mb-6 text-purple-400 group-hover:text-purple-300 transition-colors">
              {category}
            </h3>
            <ul className="flex flex-wrap justify-center gap-3">
              {items.map((skill, index) => (
                <motion.li
                  key={skill}
                  variants={fadeInAnimationVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  custom={index}
                  className="bg-gray-900 border border-white/10 px-4 py-2 rounded-xl text-sm text-gray-300 hover:text-white hover:border-purple-500/50 transition-all cursor-default"
                >
                  {skill}
                </motion.li>
              ))}
            </ul>
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

