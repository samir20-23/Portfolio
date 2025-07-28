import data from "../public/data.json";
import Project from "./project";

export default function ProjectList() {
  const projects = data.projectsData; // exactly N items

  return (
    <div className="space-y-8">
      {projects.map((proj) => (
        <Project
          key={proj.title + proj.pageUrl}
          {...proj}
        />
      ))}
    </div>
  );
}
