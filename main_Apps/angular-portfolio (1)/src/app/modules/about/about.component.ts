import { Component } from "@angular/core"

interface EducationItem {
  title: string
  period: string
  institution: string
  location: string
}

interface ExperienceItem {
  title: string
  period: string
  company: string
  description: string
}

interface SkillItem {
  name: string
  icon: string
}

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss"],
})
export class AboutComponent {
  activeTab = "education"

  education: EducationItem[] = [
    {
      title: "Baccalauréat SVT",
      period: "2021-2022",
      institution: "Lycée Ibn El Khattab",
      location: "Tangier",
    },
    {
      title: "Faculty of Economics",
      period: "2022-2025",
      institution: "Abdelmalek Essaâdi University",
      location: "Tangier",
    },
    {
      title: "Full-Stack Web Development",
      period: "2023-2024",
      institution: "Prometheus",
      location: "Salé, Tangier",
    },
    {
      title: "Mobile Development",
      period: "2024-2025",
      institution: "Prometheus",
      location: "Salé, Tangier",
    },
    {
      title: "WordPress Formation",
      period: "2024-2025",
      institution: "Institut RS",
      location: "",
    },
    {
      title: "UI Design",
      period: "2024-2025",
      institution: "At Home",
      location: "",
    },
  ]

  skills: SkillItem[] = [
    { name: "HTML", icon: "html" },
    { name: "CSS", icon: "css" },
    { name: "JS", icon: "javascript" },
    { name: "MySQL", icon: "mysql" },
    { name: "PHP", icon: "php" },
    { name: "Bootstrap", icon: "bootstrap" },
    { name: "Vue.js", icon: "vue" },
    { name: "React.js", icon: "react" },
    { name: "Next.js", icon: "next" },
    { name: "Laravel", icon: "laravel" },
    { name: "Figma", icon: "figma" },
    { name: "Git", icon: "git" },
    { name: "GitHub", icon: "github" },
    { name: "Canva", icon: "canva" },
    { name: "VS Code", icon: "vscode" },
  ]

  experience: ExperienceItem[] = [
    {
      title: "Frontend Developer",
      period: "2023-Present",
      company: "Freelance",
      description: "Developing responsive websites for clients using modern frontend technologies.",
    },
    {
      title: "UI/UX Designer",
      period: "2023-Present",
      company: "Self-employed",
      description: "Creating user interfaces and experiences for web and mobile applications.",
    },
    {
      title: "WordPress Developer",
      period: "2024-Present",
      company: "Freelance",
      description: "Building and customizing WordPress websites for small businesses.",
    },
    {
      title: "Web Development Intern",
      period: "2023",
      company: "Tech Agency",
      description: "Assisted in developing websites and web applications for clients.",
    },
  ]

  setActiveTab(tab: string) {
    this.activeTab = tab
  }
}
