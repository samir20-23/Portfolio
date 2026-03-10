"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface ImageCarouselProps {
    images: string[];
    autoplayDelay?: number;
}

export default function ImageCarousel({ images, autoplayDelay = 5000 }: ImageCarouselProps) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (images.length <= 1) return;
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, autoplayDelay);
        return () => clearInterval(timer);
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

    if (!images || images.length === 0) return null;

    return (
        <div className="relative w-full h-full group overflow-hidden" >
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0"
                    style={{ width: "100%" }}
                >
                    <Image
                        src={images[index]}
                        alt={`Project image ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 100%) 100vw, (max-width: 100%) 50vw, (max-width: 100%) 33vw"
                        style={{ width: "100%", borderRadius: "25px" }}
                    />
                </motion.div>
            </AnimatePresence>

            {/* Manual Navigation Arrows */}
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
                        <div
                            key={i}
                            className={`h-1 rounded-full transition-all ${i === index ? "w-4 bg-purple-500" : "w-1 bg-white/40"
                                }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
