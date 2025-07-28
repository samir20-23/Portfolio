import About from "@/components/about";
import Contact from "@/components/contact";
import Intro from "@/components/intro";
import ProjectList from "@/components/ProjectList";
import SectionDivider from "@/components/section-divider";
import Skills from "@/components/skills";

export default function Home() {
  return (
    <main className="flex flex-col items-center px-4">
      <Intro />
      <SectionDivider />
      <About />
      <Skills />
      <ProjectList />
      <Contact />
    </main>
  );
}
