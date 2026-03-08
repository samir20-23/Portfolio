"use client";

import React, { useMemo } from "react";
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
  pageUrl,
}: ProjectData) {
  // Randomize autoplay delay between 3000 and 7000ms
  const randomDelay = useMemo(() => Math.floor(Math.random() * 4000) + 3000, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col h-[550px] w-full max-w-[550px]"
    >
      {/* Image Section */}
      <div className="relative h-64 w-full shrink-0 overflow-hidden">
        <ImageCarousel images={dynamicImages || []} autoplayDelay={randomDelay} />

        {/* Hover Overlay for Carousel Nav Instruction */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity flex items-center justify-between px-4">
          <span className="text-white/20 text-xs">Scroll/Click Arrows</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8 flex flex-col flex-1 min-h-0">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
            {title}
          </h3>
          <div className="flex gap-3 text-gray-400">
            {pageUrl && (
              <a href={pageUrl} target="_blank" className="hover:text-white transition-colors">
                <FaExternalLinkAlt size={18} />
              </a>
            )}
            <a href="https://github.com/samir20-23" target="_blank" className="hover:text-white transition-colors">
              <FaGithub size={20} />
            </a>
          </div>
        </div>

        {/* Scrollable Description Box */}
        <div className="flex-1 overflow-y-auto pr-2 mb-6 custom-scrollbar-hide">
          <p className="text-gray-400 leading-relaxed text-sm">
            {description}
          </p>
        </div>

        {/* Bottom Section: Tags and Link */}
        <div className="mt-auto pt-6 border-t border-white/10">
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-[10px] font-medium text-purple-300 uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>

          <Link
            href={`/projects/${slug}`}
            className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-purple-400 transition-colors group/link"
          >
            Explore Project Details
            <span className="block w-4 h-[1px] bg-white group-hover/link:bg-purple-400 group-hover/link:translate-x-1 transition-all" />
          </Link>
        </div>
      </div>

      {/* Glass Shine Effect */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </motion.div>
  );
}
