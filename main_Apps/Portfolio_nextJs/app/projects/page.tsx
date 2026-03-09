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

    const categories = ["All", "React", "Next.js", "Fullstack", "Laravel", "WordPress", "Shopify", "UI/UX"];

    const filteredProjects = useMemo(() => {
        return projectsData.filter((project) => {
            const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase()) ||
                project.description.toLowerCase().includes(search.toLowerCase());

            const projectTags = project.tags.map(t => t.toLowerCase());
            const matchesCategory = activeTab === "All" ||
                projectTags.includes(activeTab.toLowerCase()) ||
                (activeTab === "Fullstack" && projectTags.some(tag => ["laravel", "next.js", "php", "supabase"].includes(tag))) ||
                (activeTab === "UI/UX" && projectTags.some(tag => ["figma", "tailwind", "responsive design"].includes(tag)));

            return matchesSearch && matchesCategory;
        });
    }, [search, activeTab]);

    return (
        <main className="min-h-screen bg-gray-950 text-white selection:bg-purple-500/30">
            <div className="pt-40 pb-20 px-4   mx-auto" style={{ width: "95%" }}> 
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <SectionHeading>All Projects</SectionHeading>
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                        A deep dive into my work across various technologies and platforms.
                    </p>
                </motion.div>

                {/* Search and Filter Bar */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-16 bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-md">
                    <div className="relative w-full lg:w-96">
                        <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search by name or tech..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all text-sm"
                        />
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveTab(cat)}
                                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all border ${activeTab === cat
                                        ? "bg-purple-600 border-purple-500 text-white shadow-[0_0_20px_rgba(147,51,234,0.4)] scale-105"
                                        : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Projects Grid */}
                {filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12 justify-items-center">
                        {filteredProjects.map((project, index) => (
                            <Project key={project.slug} {...project} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-32">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 mb-6">
                            <FaFilter className="text-gray-600 text-2xl" />
                        </div>
                        <p className="text-gray-500 text-xl font-medium">No projects found matching your criteria.</p>
                        <button
                            onClick={() => { setSearch(""); setActiveTab("All"); }}
                            className="mt-6 px-8 py-3 bg-purple-600/10 text-purple-400 rounded-full hover:bg-purple-600/20 transition-all font-bold"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}
