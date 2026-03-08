"use client";

import { projectsData } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaCalendarAlt, FaTag } from "react-icons/fa";

export default function ProjectDetails({ params }: { params: { slug: string } }) {
    const project = projectsData.find((p) => p.slug === params.slug);

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-gray-950 text-white selection:bg-purple-500/30">
            <div className="pt-32 pb-20 px-4 max-w-5xl mx-auto">
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-8"
                >
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                    >
                        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                        Back to Projects
                    </Link>
                </motion.div>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-purple-400 mb-6">
                        {project.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm">
                        <div className="flex items-center gap-2">
                            <FaTag className="text-purple-500" />
                            <span>{project.tags[0]}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaCalendarAlt className="text-purple-500" />
                            <span>Project Overview</span>
                        </div>
                    </div>
                </motion.div>

                {/* Featured Image / Carousel (Static for detail page for now or simple grid) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative aspect-video w-full rounded-3xl overflow-hidden border border-white/10 mb-16 shadow-2xl"
                >
                    <Image
                        src={project.dynamicImages?.[0] || ""}
                        alt={project.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Main Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-2 space-y-8"
                    >
                        <section>
                            <h2 className="text-2xl font-bold mb-4">About the Project</h2>
                            <p className="text-gray-400 leading-relaxed text-lg">
                                {project.description}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">Core Technologies</h2>
                            <div className="flex flex-wrap gap-3">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </section>

                        {/* Gallery (Small preview of other images) */}
                        {project.dynamicImages && project.dynamicImages.length > 1 && (
                            <section>
                                <h2 className="text-2xl font-bold mb-6">Visual Overview</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {project.dynamicImages.slice(1).map((img, i) => (
                                        <div key={i} className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 group">
                                            <Image
                                                src={img}
                                                alt={`${project.title} screenshot ${i + 2}`}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </motion.div>

                    {/* Sidebar / Links */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-8"
                    >
                        <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm sticky top-32">
                            <h3 className="text-xl font-bold mb-6">Links & Resources</h3>

                            <div className="space-y-4">
                                {project.pageUrl && (
                                    <Link
                                        href={project.pageUrl}
                                        target="_blank"
                                        className="flex items-center justify-center gap-3 w-full py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-bold transition-all shadow-[0_10px_20px_rgba(147,51,234,0.2)] active:scale-95"
                                    >
                                        <FaExternalLinkAlt /> Live Preview
                                    </Link>
                                )}

                                <Link
                                    href="https://github.com/samir20-23/"
                                    target="_blank"
                                    className="flex items-center justify-center gap-3 w-full py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-bold transition-all active:scale-95"
                                >
                                    <FaGithub /> View Source Code
                                </Link>
                            </div>

                            <div className="mt-8 pt-8 border-t border-white/10">
                                <p className="text-gray-500 text-sm text-center italic">
                                    Interested in this project? Let's discuss how I can help with yours.
                                </p>
                                <Link
                                    href="/#contact"
                                    className="block text-center mt-4 text-purple-400 font-bold hover:underline"
                                >
                                    Get in touch
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
