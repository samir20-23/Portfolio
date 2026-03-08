"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ProjectData } from "@/lib/types";
import ImageCarousel from "./image-carousel";
import { FaExternalLinkAlt, FaGithub, FaArrowRight } from "react-icons/fa";

export default function Project({
  title,
  description,
  tags,
  dynamicImages,
  slug,
}: ProjectData) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });

  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ scale: scaleProgress, opacity: opacityProgress }}
      className="group mb-8 last:mb-0 w-full max-w-[45rem]"
    >
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col sm:flex-row h-full sm:min-h-[22rem]">

        {/* Left Side: Images/Carousel */}
        <div className="relative w-full sm:w-[50%] h-[200px] sm:h-auto overflow-hidden">
          <ImageCarousel
            images={dynamicImages || []}
            title={title}
          />
        </div>

        {/* Right Side: Content */}
        <div className="flex flex-col p-6 sm:p-8 w-full sm:w-[50%] h-full">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
              {title}
            </h3>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 group-hover:text-gray-300 transition-colors">
            {description}
          </p>

          <div className="mt-auto">
            <ul className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="bg-purple-500/10 border border-purple-500/20 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-wider text-purple-300 rounded-full"
                >
                  {tag}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4">
              <Link
                href={`/projects/${slug}`}
                className="flex items-center gap-2 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all active:scale-95"
              >
                View Details <FaArrowRight className="text-xs opacity-70" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

