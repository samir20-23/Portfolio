"use client"; // Mark as client component

import { projectsData } from "@/lib/projects";
import Project from "./project";
import { useState } from "react";

export default function ProjectList() {
  const projects = projectsData;
  const [visibleCount, setVisibleCount] = useState(
    projects.length > 10 ? 10 : projects.length
  );

  // Determine layout: vertical list if <=6, grid wrap if >6
  const containerClass =
    projects.length > 6
      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      : "space-y-8";

  return (
    <div>
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
    </div>
  );
}
