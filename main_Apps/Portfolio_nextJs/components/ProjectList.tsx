"use client";

import { projectsData } from "@/lib/data";
import Project from "./project";
import SectionHeading from "./section-heading";
import { useSectionInView } from "@/lib/hooks";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function ProjectList() {
  const { ref } = useSectionInView("Projects", 0.1);
  // Show up to 10 projects on landing page as requested
  const projects = projectsData.slice(0, 10);

  return (
    <section ref={ref} id="projects" className="scroll-mt-28 mb-28 w-full max-w-7xl px-4">
      <SectionHeading>Recent Projects</SectionHeading>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center mt-12 w-full">
        {projects.map((proj) => (
          <Project key={proj.slug} {...proj} />
        ))}
      </div>

      <div className="flex justify-center mt-20">
        <Link
          href="/projects"
          className="group relative px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-white overflow-hidden transition-all hover:bg-white/10 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(147,51,234,0.15)] flex items-center gap-3 active:scale-95"
        >
          <span className="relative z-10 text-lg">View All Projects</span>
          <FaArrowRight className="relative z-10 transition-transform group-hover:translate-x-1" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/5 to-purple-600/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </Link>
      </div>
    </section>
  );
}

