"use client";

import { useState, useMemo } from "react";
import { projectsData, skillsData } from "@/lib/data";
import Project from "@/components/project";
import SectionHeading from "@/components/section-heading";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { FaSearch, FaFilter } from "react-icons/fa";

export default function ProjectsPage() {
    const [search, setSearch] = useState("");
    const [activeTab, setActiveTab] = useState("All");

    const categories = ["All", "React", "Next.js", "Fullstack", "Laravel"];

    const filteredProjects = useMemo(() => {
        return projectsData.filter((project) => {
            const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase()) ||
                project.description.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = activeTab === "All" ||
                project.tags.some(tag => tag.toLowerCase() === activeTab.toLowerCase()) ||
                (activeTab === "Fullstack" && project.tags.some(tag => ["laravel", "next.js", "php"].includes(tag.toLowerCase())));

            return matchesSearch && matchesCategory;
        });
    }, [search, activeTab]);

    return (
        <main className="min-h-screen bg-gray-950 text-white selection:bg-purple-500/30">
            <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <SectionHeading>All Projects</SectionHeading>
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                        A comprehensive list of my work, ranging from small experiments to full-scale applications.
                    </p>
                </motion.div>

                {/* Search and Filter Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <div className="relative w-full md:w-96">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-purple-500/50 transition-all text-sm"
                        />
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveTab(cat)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === cat
                                        ? "bg-purple-600 text-white shadow-[0_0_20px_rgba(147,51,234,0.3)]"
                                        : "bg-white/5 text-gray-400 hover:bg-white/10"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Projects Grid */}
                {filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 justify-items-center">
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.slug}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="w-full flex justify-center"
                            >
                                <Project {...project} />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No projects found matching your criteria.</p>
                        <button
                            onClick={() => { setSearch(""); setActiveTab("All"); }}
                            className="mt-4 text-purple-400 hover:underline"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}
