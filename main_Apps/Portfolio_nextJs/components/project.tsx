"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

type ProjectProps = {
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  dynamicImages?: string[];
  pageUrl: string;
};

export default function Project({
  title,
  description,
  tags,
  imageUrl,
  dynamicImages,
  pageUrl,
}: ProjectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  const [currentImage, setCurrentImage] = useState(
    dynamicImages?.[0] || imageUrl || ""
  );

  useEffect(() => {
    if (!dynamicImages?.length) return;
    const interval = setInterval(() => {
      const i = Math.floor(Math.random() * dynamicImages.length);
      setCurrentImage(dynamicImages[i]);
    }, 3600);
    return () => clearInterval(interval);
  }, [dynamicImages]);

  return (
    <motion.div
      ref={ref}
      style={{ scale: scaleProgress, opacity: opacityProgress }}
      className="group mb-3 sm:mb-8 last:mb-0"
    >
      <section className="bg-gray-100 max-w-[42rem] border border-black/5 rounded-lg overflow-hidden sm:pr-8 relative sm:h-[20rem] hover:bg-gray-200 transition sm:group-even:pl-8 dark:text-white dark:bg-white/10 dark:hover:bg-white/20">
        <Link href={pageUrl} target="_blank">
          <div
            className="pt-4 pb-7 px-5 sm:pl-10 sm:pr-2 sm:pt-10 sm:max-w-[50%] flex flex-col h-full sm:group-even:ml-[18rem] overflow-y-auto max-h-[18rem] scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-white/30 scroll-hidden"
            style={{ scrollBehavior: "smooth" }}
          >
            <h3 className="text-2xl font-semibold">{title}</h3>
            <p className="mt-2 leading-relaxed text-gray-700 dark:text-white/70">
              {description}
            </p>
            <ul className="flex flex-wrap mt-4 gap-2 sm:mt-auto">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white rounded-full dark:text-white/70 hover:bg-gray-200 dark:hover:bg-white/20"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          <Image
            src={currentImage}
            alt={`Screenshot of ${title}`}
            width={600}
            height={400}
            quality={95}
            className={`
              absolute hidden sm:block top-16 -right-40 w-[28.25rem] rounded-t-lg shadow-2xl
              transition
              group-hover:scale-[1.04]
              group-hover:-translate-x-3
              group-hover:translate-y-3
              group-hover:-rotate-2
              group-even:group-hover:translate-x-3
              group-even:group-hover:translate-y-3
              group-even:group-even:rotate-2
              group-even:right-[initial] group-even:-left-40
            `}
          />
        </Link>
      </section>
    </motion.div>
  );
}