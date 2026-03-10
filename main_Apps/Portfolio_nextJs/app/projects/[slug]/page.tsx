"use client";

import { projectsData } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import Modal from "@/components/modal";
import ContactForm from "@/components/contact-form";
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaCalendarAlt, FaTag, FaHeadset } from "react-icons/fa";

export default function ProjectDetails({ params }: { params: { slug: string } }) {
    const project = projectsData.find((p) => p.slug === params.slug);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-gray-950 text-white selection:bg-purple-500/30">
            <div className="pt-40 pb-20 px-4 mx-auto" style={{ width: "95%" }}>
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
                    <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-purple-400 mb-6 tracking-tight">
                        {project.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm">
                        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                            <FaTag className="text-purple-500" />
                            <span>{project.tags[0]}</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                            <FaCalendarAlt className="text-purple-500" />
                            <span>Project Review</span>
                        </div>
                    </div>
                </motion.div>

                {/* Featured Image */}
             {/* Featured Image */}
<motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="relative aspect-video w-full rounded-[2rem] overflow-hidden border border-white/10 mb-16 shadow-2xl group cursor-zoom-in"
    // Update the modal state with the fallback as well
    onClick={() => setSelectedImage(
        project.dynamicImages?.[0] || "https://raw.githubusercontent.com/samir20-23/Portfolio/refs/heads/main/src/demo.gif"
    )}
>
    <Image
        // If the first image doesn't exist, use the demo.gif
        src={project.dynamicImages?.[0] || "https://raw.githubusercontent.com/samir20-23/Portfolio/refs/heads/main/src/demo.gif"}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        priority
    />
    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-xs font-bold">
            Click to Enlarge
        </span>
    </div>
</motion.div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Main Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-2 space-y-12"
                    >
                        <section>
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <span className="w-8 h-[2px] bg-purple-500"></span>
                                Project Overview
                            </h2>
                            <p className="text-gray-400 leading-relaxed text-lg">
                                {project.description}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <span className="w-8 h-[2px] bg-purple-500"></span>
                                Technologies Used
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-medium hover:bg-white/10 hover:border-purple-500/30 transition-all cursor-default"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </section>

                        {/* Gallery */}
                        {project.dynamicImages && project.dynamicImages.length > 1 && (
                            <section>
                                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                    <span className="w-8 h-[2px] bg-purple-500"></span>
                                    Visual Gallery
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {project.dynamicImages.slice(1).map((img, i) => (
                                        <div
                                            key={i}
                                            className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 group cursor-zoom-in shadow-lg"
                                            onClick={() => setSelectedImage(img)}
                                        >
                                            <Image
                                                src={img}
                                                alt={`${project.title} screenshot ${i + 2}`}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </motion.div>

                    {/* Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-8"
                    >
                        <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] backdrop-blur-md sticky top-32 shadow-xl">
                            <h3 className="text-xl font-bold mb-8 tracking-tight">Project Resources</h3>

                            <div className="space-y-4">
                                {project.pageUrl && (
                                    <Link
                                        href={project.pageUrl}
                                        target="_blank"
                                        className="flex items-center justify-center gap-3 w-full py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-bold transition-all shadow-[0_10px_20px_rgba(147,51,234,0.3)] active:scale-95 group"
                                    >
                                        <FaExternalLinkAlt className="group-hover:rotate-12 transition-transform" /> Live Project
                                    </Link>
                                )}
                                {project.githubUrl && (
                                    <Link
                                        href={project.githubUrl}
                                        target="_blank"
                                        className="flex items-center justify-center gap-3 w-full py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-bold transition-all active:scale-95 border border-white/5 hover:border-white/10"
                                    >
                                        <FaGithub /> Source Code
                                    </Link>
                                )}

                            </div>

                            <div className="mt-10 pt-8 border-t border-white/5 text-center">
                                <p className="text-gray-500 text-sm italic mb-6">
                                    Have a similar project in mind? Let's talk about it.
                                </p>
                                <button
                                    onClick={() => setIsContactModalOpen(true)}
                                    className="text-purple-400 font-bold hover:text-purple-300 transition-colors flex items-center gap-2 mx-auto decoration-2 underline-offset-4 hover:underline"
                                >
                                    <FaHeadset /> Get in touch
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Lightbox Modal */}
            <Modal
                isOpen={!!selectedImage}
                onClose={() => setSelectedImage(null)}
                title="Image Preview"
            >
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black/40 border border-white/5">
                    {selectedImage && (
                        <Image
                            src={selectedImage}
                            alt="Enlarged view"
                            fill
                            className="object-contain"
                            quality={100}
                        />
                    )}
                </div>
            </Modal>

            {/* Contact Modal */}
            <Modal
                isOpen={isContactModalOpen}
                onClose={() => setIsContactModalOpen(false)}
                title="Start a Conversation"
            >
                <div className="max-w-2xl mx-auto py-4">
                    <div className="flex items-center gap-4 mb-10 bg-purple-500/10 p-6 rounded-[1.5rem] border border-purple-500/20 shadow-inner">
                        <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white text-xl shadow-lg">
                            <FaHeadset />
                        </div>
                        <div>
                            <h4 className="font-bold text-white text-lg tracking-tight">Ready to collaborate?</h4>
                            <p className="text-gray-400 text-sm">Send me a message and I'll get back to you within 24 hours.</p>
                        </div>
                    </div>
                    <ContactForm />
                </div>
            </Modal>
        </main>
    );
}
