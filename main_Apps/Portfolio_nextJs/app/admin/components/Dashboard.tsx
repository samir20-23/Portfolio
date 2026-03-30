"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiLayers, FiTag, FiGithub, FiExternalLink, FiPlus, FiTrendingUp, FiActivity, FiCode } from "react-icons/fi";

interface Project {
  title: string;
  slug: string;
  description: string;
  tags: string[];
  githubUrl: string;
  pageUrl: string;
  dynamicImages: string[];
}

interface StatCardProps {
  icon: any;
  label: string;
  value: number;
  color: string;
  delay: number;
  darkMode: boolean;
}

function StatCard({ icon: Icon, label, value, color, delay, darkMode }: StatCardProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;
    const duration = 1500;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`${darkMode ? "bg-slate-900/80 border-slate-800/50" : "bg-white/90 border-white/50"} backdrop-blur-xl rounded-3xl p-6 border shadow-xl`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className={`text-sm font-medium ${darkMode ? "text-slate-400" : "text-slate-500"} mb-1`}>{label}</p>
          <p className="text-4xl font-black" style={{ color }}>{count}</p>
        </div>
        <div 
          className="p-3 rounded-2xl shadow-lg"
          style={{ background: `${color}20`, color }}
        >
          <Icon size={24} />
        </div>
      </div>
      <div className="mt-4 h-1.5 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: delay + 0.3, duration: 1, ease: "easeOut" }}
          style={{ transformOrigin: "left", background: `linear-gradient(90deg, ${color}, ${color}80)` }}
          className="h-full rounded-full"
        />
      </div>
    </motion.div>
  );
}

interface QuickProjectProps {
  project: Project;
  index: number;
  darkMode: boolean;
}

function QuickProject({ project, index, darkMode }: QuickProjectProps) {
  const gradients = [
    "from-blue-500 to-purple-500",
    "from-emerald-500 to-teal-500",
    "from-orange-500 to-red-500",
    "from-violet-500 to-fuchsia-500",
  ];
  const gradient = gradients[index % gradients.length];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 * index }}
      whileHover={{ x: 4 }}
      className={`flex items-center gap-4 p-4 rounded-2xl ${darkMode ? "bg-slate-900/50 hover:bg-slate-900" : "bg-white/80 hover:bg-white"} transition-all border ${darkMode ? "border-slate-800/50" : "border-white/50"}`}
    >
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
        {index + 1}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className={`font-bold text-sm truncate ${darkMode ? "text-white" : "text-slate-800"}`}>{project.title}</h4>
        <div className="flex items-center gap-2 mt-1">
          <FiCode size={10} className="text-slate-400" />
          <span className="text-[10px] text-slate-400 truncate">{project.slug || 'no-slug'}</span>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        {project.githubUrl && <div className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center"><FiGithub size={12} className="text-slate-400" /></div>}
        {project.pageUrl && <div className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center"><FiExternalLink size={12} className="text-slate-400" /></div>}
      </div>
    </motion.div>
  );
}

interface DashboardProps {
  projects: Project[];
  darkMode: boolean;
  onOpenCreate: () => void;
}

export default function Dashboard({ projects, darkMode, onOpenCreate }: DashboardProps) {
  const allTags = Array.from(new Set(projects.flatMap(p => p.tags || [])));
  
  const recentProjects = [...projects].slice(0, 5);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl lg:text-4xl font-black text-slate-800 dark:text-white">
            Welcome back, <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">Samir</span>
          </h1>
          <p className={`mt-1 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
            Here's what's happening with your portfolio today.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onOpenCreate}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-3 rounded-2xl font-bold shadow-xl shadow-purple-500/30 transition-all"
        >
          <FiPlus size={20} />
          <span>New Project</span>
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        <StatCard icon={FiLayers} label="Total Projects" value={projects.length} color="#3b82f6" delay={0.1} darkMode={darkMode} />
        <StatCard icon={FiTag} label="Technologies" value={allTags.length} color="#8b5cf6" delay={0.2} darkMode={darkMode} />
        <StatCard icon={FiGithub} label="With GitHub" value={projects.filter(p => p.githubUrl).length} color="#10b981" delay={0.3} darkMode={darkMode} />
        <StatCard icon={FiExternalLink} label="Live Projects" value={projects.filter(p => p.pageUrl).length} color="#f59e0b" delay={0.4} darkMode={darkMode} />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className={`${darkMode ? "bg-slate-900/80 border-slate-800/50" : "bg-white/90 border-white/50"} backdrop-blur-xl rounded-3xl p-6 border shadow-xl`}
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <FiLayers size={20} className="text-white" />
              </div>
              <div>
                <h3 className={`font-bold ${darkMode ? "text-white" : "text-slate-800"}`}>Recent Projects</h3>
                <p className="text-xs text-slate-400">Latest additions to your portfolio</p>
              </div>
            </div>
            <a href="/admin/projects" className="text-sm font-bold text-blue-500 hover:text-blue-600 transition-colors">View All</a>
          </div>
          <div className="space-y-2">
            <AnimatePresence>
              {recentProjects.length > 0 ? (
                recentProjects.map((project, idx) => (
                  <QuickProject key={idx} project={project} index={idx} darkMode={darkMode} />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-10"
                >
                  <p className={`${darkMode ? "text-slate-400" : "text-slate-500"}`}>No projects yet. Create your first one!</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className={`${darkMode ? "bg-slate-900/80 border-slate-800/50" : "bg-white/90 border-white/50"} backdrop-blur-xl rounded-3xl p-6 border shadow-xl`}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
              <FiTag size={20} className="text-white" />
            </div>
            <div>
              <h3 className={`font-bold ${darkMode ? "text-white" : "text-slate-800"}`}>Top Technologies</h3>
              <p className="text-xs text-slate-400">Skills used across your portfolio</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <AnimatePresence>
              {allTags.slice(0, 12).map((tag, idx) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-3 py-1.5 bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:shadow-md transition-all"
                >
                  {tag}
                </motion.span>
              ))}
            </AnimatePresence>
            {allTags.length > 12 && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400 text-xs font-bold rounded-xl"
              >
                +{allTags.length - 12} more
              </motion.span>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className={`lg:col-span-2 ${darkMode ? "bg-slate-900/80 border-slate-800/50" : "bg-white/90 border-white/50"} backdrop-blur-xl rounded-3xl p-6 border shadow-xl`}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
              <FiActivity size={20} className="text-white" />
            </div>
            <div>
              <h3 className={`font-bold ${darkMode ? "text-white" : "text-slate-800"}`}>Portfolio Overview</h3>
              <p className="text-xs text-slate-400">Quick stats about your work</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className={`p-4 rounded-2xl ${darkMode ? "bg-slate-800/50" : "bg-slate-50"}`}>
              <p className={`text-2xl font-black ${darkMode ? "text-white" : "text-slate-800"}`}>{projects.length}</p>
              <p className="text-xs text-slate-400 mt-1">Projects</p>
            </div>
            <div className={`p-4 rounded-2xl ${darkMode ? "bg-slate-800/50" : "bg-slate-50"}`}>
              <p className={`text-2xl font-black ${darkMode ? "text-white" : "text-slate-800"}`}>{allTags.length}</p>
              <p className="text-xs text-slate-400 mt-1">Technologies</p>
            </div>
            <div className={`p-4 rounded-2xl ${darkMode ? "bg-slate-800/50" : "bg-slate-50"}`}>
              <p className={`text-2xl font-black ${darkMode ? "text-white" : "text-slate-800"}`}>{projects.filter(p => p.githubUrl).length}</p>
              <p className="text-xs text-slate-400 mt-1">Open Source</p>
            </div>
            <div className={`p-4 rounded-2xl ${darkMode ? "bg-slate-800/50" : "bg-slate-50"}`}>
              <p className={`text-2xl font-black ${darkMode ? "text-white" : "text-slate-800"}`}>{projects.filter(p => p.dynamicImages && p.dynamicImages.length > 0).length}</p>
              <p className="text-xs text-slate-400 mt-1">With Images</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
