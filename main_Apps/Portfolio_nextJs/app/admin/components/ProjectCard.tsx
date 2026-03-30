"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiEdit, FiTrash2, FiGithub, FiExternalLink, FiImage, FiLayers, FiCode, FiChevronRight, FiCheck } from "react-icons/fi";

interface Project {
  title: string;
  slug: string;
  description: string;
  tags: string[];
  githubUrl: string;
  pageUrl: string;
  dynamicImages: string[];
}

interface ProjectCardProps {
  project: Project;
  index: number;
  onEdit: () => void;
  onDelete: () => void;
  deleteStep: { index: number; step: number } | null;
  onDeleteConfirm: () => void;
  darkMode: boolean;
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function ProjectCard({ project, index, onEdit, onDelete, deleteStep, onDeleteConfirm, darkMode }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isDeleting = deleteStep?.index === index;

  const gradients = [
    "from-blue-500 via-purple-500 to-pink-500",
    "from-emerald-500 via-teal-500 to-cyan-500",
    "from-orange-500 via-red-500 to-pink-500",
    "from-violet-500 via-purple-500 to-fuchsia-500",
    "from-amber-500 via-orange-500 to-red-500",
  ];
  const gradient = gradients[index % gradients.length];

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.05 * (index % 6) }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={isHovered ? { y: -6, scale: 1.01 } : { y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`${darkMode ? "bg-slate-900/80 border-slate-800/50" : "bg-white/90 border-white/50"} backdrop-blur-xl rounded-3xl border shadow-xl overflow-hidden`}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />
        
        <div className="relative p-6">
          <div className="absolute top-0 left-0 w-full h-1.5">
            <div className={`h-full bg-gradient-to-r ${gradient} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
          </div>
          
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-2.5 py-1 bg-gradient-to-br ${gradient} text-white text-[10px] font-black rounded-xl shadow-lg`}>
                  #{index + 1}
                </span>
                <h3 className={`text-xl font-black ${darkMode ? "text-white" : "text-slate-800"} group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${gradient} transition-all`}>
                  {project.title}
                </h3>
              </div>
              <p className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <FiCode size={12} /> {project.slug || 'no-slug-defined'}
              </p>
            </div>
            
            <motion.div
              animate={{ rotate: isHovered ? 90 : 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`p-2.5 rounded-xl ${darkMode ? "bg-slate-800" : "bg-slate-100"}`}
            >
              <FiLayers size={18} className="text-slate-400" />
            </motion.div>
          </div>

          <p className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-500"} line-clamp-2 mb-4 leading-relaxed`}>
            {project.description || "No description provided yet..."}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags?.slice(0, 3).map((tag, tIdx) => (
              <motion.span
                key={`${tag}-${tIdx}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: tIdx * 0.05 }}
                className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-lg ${darkMode ? "bg-slate-800 text-slate-300 border-slate-700" : "bg-slate-100 text-slate-600 border-slate-200"} border`}
              >
                {tag}
              </motion.span>
            ))}
            {(project.tags?.length || 0) > 3 && (
              <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${darkMode ? "bg-slate-800 text-blue-400" : "bg-slate-100 text-blue-500"}`}>
                +{(project.tags?.length || 0) - 3}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className={`p-2.5 rounded-xl transition-all ${darkMode ? "bg-slate-800 hover:bg-slate-700" : "bg-slate-100 hover:bg-slate-200"}`}
                >
                  <FiGithub size={16} className="text-slate-500" />
                </a>
              )}
              {project.pageUrl && (
                <a
                  href={project.pageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className={`p-2.5 rounded-xl transition-all ${darkMode ? "bg-slate-800 hover:bg-slate-700" : "bg-slate-100 hover:bg-slate-200"}`}
                >
                  <FiExternalLink size={16} className="text-slate-500" />
                </a>
              )}
              {project.dynamicImages && project.dynamicImages.length > 0 && (
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${darkMode ? "bg-slate-800" : "bg-slate-100"}`}>
                  <FiImage size={12} className="text-slate-400" />
                  <span className="text-[10px] font-bold text-slate-500">{project.dynamicImages.length}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={`/projects/${project.slug}`}
                onClick={(e) => e.stopPropagation()}
                className={`p-2.5 rounded-xl transition-all ${darkMode ? "bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-500"}`}
              >
                <FiChevronRight size={16} />
              </Link>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.stopPropagation(); onEdit(); }}
                className={`p-2.5 bg-gradient-to-br ${gradient} text-white rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-all`}
              >
                <FiEdit size={16} />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.stopPropagation(); onDelete(); }}
                className={`p-2.5 rounded-xl shadow-lg transition-all ${
                  isDeleting
                    ? "bg-red-600 text-white opacity-100"
                    : `bg-red-50 dark:bg-red-950/50 text-red-500 opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white`
                }`}
              >
                <FiTrash2 size={16} />
              </motion.button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isDeleting && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className={`h-1.5 bg-gradient-to-r from-red-500 to-red-600`} />
              <div className="px-6 py-4 bg-red-50 dark:bg-red-950/30 flex items-center justify-between">
                <span className={`font-bold text-sm ${darkMode ? "text-red-400" : "text-red-600"}`}>
                  {deleteStep?.step === 1 ? "⚠️ Delete this project?" : "🚫 Final confirmation!"}
                </span>
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => { e.stopPropagation(); onDeleteConfirm(); }}
                    className="px-4 py-1.5 bg-red-600 text-white rounded-lg font-bold text-xs shadow-lg flex items-center gap-1"
                  >
                    <FiCheck size={12} />
                    {deleteStep?.step === 1 ? "Yes, Delete" : "CONFIRM"}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => e.stopPropagation()}
                    className={`px-4 py-1.5 rounded-lg font-bold text-xs ${darkMode ? "bg-slate-800 text-slate-300" : "bg-white text-slate-600 border border-slate-200"}`}
                  >
                    Cancel
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
