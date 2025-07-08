import { Component } from "@angular/core"

interface Project {
  id: number
  title: string
  description: string
  image: string
  link: string
}

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.scss"],
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      id: 1,
      title: "E-commerce Candle Store",
      description: "Designed with Figma, then developed with HTML, CSS, and JS, and the backend with Laravel.",
      image: "assets/images/project1.jpg",
      link: "#",
    },
    {
      id: 2,
      title: "E-commerce Candle Store",
      description: "Designed with Figma, then developed with HTML, CSS, and JS, and the backend with Laravel.",
      image: "assets/images/project2.jpg",
      link: "#",
    },
    {
      id: 3,
      title: "E-commerce Candle Store",
      description: "Designed with Figma, then developed with HTML, CSS, and JS, and the backend with Laravel.",
      image: "assets/images/project3.jpg",
      link: "#",
    },
    {
      id: 4,
      title: "E-commerce Candle Store",
      description: "Designed with Figma, then developed with HTML, CSS, and JS, and the backend with Laravel.",
      image: "assets/images/project4.jpg",
      link: "#",
    },
  ]
}
