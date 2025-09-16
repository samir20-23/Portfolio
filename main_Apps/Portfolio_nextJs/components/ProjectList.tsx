"use client"; // Mark as client component

import { projectsData } from "@/lib/data";
import Project from "./project";
import { useState } from "react";
import SectionHeading from "./section-heading";
import { useSectionInView } from "@/lib/hooks";

export default function ProjectList() {
  const { ref } = useSectionInView("Projects", 0.5);
  const projects = projectsData;
  const [visibleCount, setVisibleCount] = useState(
    projects.length > 10 ? 10 : projects.length
  );

  // Determine layout: vertical list if <=6, grid wrap if >6
  const containerClass = "flex flex-wrap justify-center gap-8";

  return (
    <section ref={ref} id="projects" className="scroll-mt-28 mb-28">
      <SectionHeading>projects</SectionHeading>
      <div className={containerClass}>
        {projects.slice(0, visibleCount).map((proj) => (
          <Project key={proj.title + proj.pageUrl} {...proj} />
        ))}
      </div>

      {projects.length > 10 && visibleCount < projects.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setVisibleCount(projects.length)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            See more...
          </button>
        </div>
      )}
    </section>
  );
}
