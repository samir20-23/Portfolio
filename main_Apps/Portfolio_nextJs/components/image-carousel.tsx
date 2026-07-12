"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface ImageCarouselProps {
    images: string[];
    autoplayDelay?: number;
}

export default function ImageCarousel({ images, autoplayDelay = 5000 }: ImageCarouselProps) {
    const [index, setIndex] = useState(0);
    const [loaded, setLoaded] = useState<boolean[]>(new Array(images.length).fill(false));
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Preload next image in background
    useEffect(() => {
        const nextIdx = (index + 1) % images.length;
        const img = new window.Image();
        img.src = images[nextIdx];
    }, [index, images]);

    // Autoplay
    useEffect(() => {
        if (images.length <= 1) return;
        timerRef.current = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, autoplayDelay);
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [images.length, autoplayDelay]);

    const next = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setIndex((prev) => (prev + 1) % images.length);
    };

    const prev = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const handleLoad = (i: number) => {
        setLoaded((prev) => {
            const next = [...prev];
            next[i] = true;
            return next;
        });
    };

    if (!images || images.length === 0) return null;

    return (
        <div className="relative w-full h-full group overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute inset-0"
                >
                    {/* Skeleton loader shown behind image while it loads */}
                    {!loaded[index] && (
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse rounded-[25px]" />
                    )}
                    {/* Use native <img> for everything — bypasses Next.js optimization overhead for remote/LFS images */}
                    <img
                        src={images[index]}
                        alt={`Project image ${index + 1}`}
                        onLoad={() => handleLoad(index)}
                        className="w-full h-full object-contain bg-slate-900/40"
                        loading={index === 0 ? "eager" : "lazy"}
                        decoding="async"
                    />
                </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={prev}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60 z-10"
                        aria-label="Previous image"
                    >
                        <FaChevronLeft size={12} />
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60 z-10"
                        aria-label="Next image"
                    >
                        <FaChevronRight size={12} />
                    </button>
                </>
            )}

            {/* Dots Indicator */}
            {images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            onClick={(e) => { e.stopPropagation(); e.preventDefault(); setIndex(i); }}
                            className={`h-1 rounded-full transition-all ${i === index ? "w-4 bg-purple-500" : "w-1 bg-white/40"}`}
                            aria-label={`Go to image ${i + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
