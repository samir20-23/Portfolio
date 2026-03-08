"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ProjectImageProps {
    src: string;
    alt: string;
    className?: string;
    priority?: boolean;
}

export default function ProjectImage({ src, alt, className = "", priority = false }: ProjectImageProps) {
    const [isTall, setIsTall] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const { naturalWidth, naturalHeight } = e.currentTarget;
        // If height is 1.2x width, we consider it "tall"
        if (naturalHeight > naturalWidth * 1.2) {
            setIsTall(true);
        }
    };

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden bg-gray-900 border border-white/10 group ${className}`}
        >
            <img
                ref={imgRef}
                src={src}
                alt={alt}
                onLoad={handleImageLoad}
                className={`w-full h-auto absolute top-0 left-0 transition-transform duration-[12s] ease-in-out ${isTall ? "group-hover:translate-y-[calc(-100%+100%)]" : "h-full object-cover"
                    }`}
            />

            {isTall && (
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <p className="text-[10px] text-white font-bold uppercase tracking-widest">Auto Scrolling</p>
                </div>
            )}
        </div>
    );
}
