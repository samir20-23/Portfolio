"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { useSectionInView } from "@/lib/hooks";

export default function Skills() {
  const { ref } = useSectionInView("Skills");

  return (
    <section
      id="skills"
      ref={ref}
      className="mb-24 max-w-[53rem] scroll-mt-28 text-center sm:mb-24"
    >
      <SectionHeading>My skills</SectionHeading>
      
      <div className="flex flex-col items-center space-y-4">
        <img
          src="https://skillicons.dev/icons?i=laravel,bootstrap,html,css,vscode,github,vue,figma,tailwind,git"
          alt="Skills Set 1"
        />
        <img
          src="https://skillicons.dev/icons?i=nodejs,javascript,angular,linux,md,react,python,npm"
          alt="Skills Set 2"
        />
        <img
          src="https://skillicons.dev/icons?i=php,androidstudio,kotlin,arduino,kali,mysql"
          alt="Skills Set 3"
        />
        <img
          src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=700&size=50&duration=4&pause=20&color=9B31FE&center=true&vCenter=true&width=482&lines=..."
          alt="Samir Aoulad Amar"
        />
        <img
          src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=700&size=17&duration=4000&pause=1000&color=6D26BFFF&center=true&vCenter=true&width=482&lines=If+you+fail+get+up+and+try+again"
          alt="Typing SVG"
        />
      </div>
    </section>
  );
}
