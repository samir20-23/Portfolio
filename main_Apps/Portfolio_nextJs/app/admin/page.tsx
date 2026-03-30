"use client";

import React, { useState, useEffect, useRef } from "react";
import { getProjects, saveProject, deleteProject, getTags, checkFolderExists, Project } from "@/actions/projects";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiEdit, FiTrash2, FiPlus, FiX, FiGithub, FiExternalLink, FiImage,
  FiLoader, FiFolder, FiGrid, FiLayers, FiTag, FiLogOut, FiChevronLeft,
  FiChevronRight, FiSearch, FiFilter, FiTrendingUp, FiClock, FiStar,
  FiZap, FiMoon, FiSun, FiActivity, FiTrash, FiCheck, FiCode, FiLink,
  FiMenu, FiMaximize2, FiMinimize2
} from "react-icons/fi";
import { BsStars } from "react-icons/bs";

const fadeIn: Record<string, any> = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const cardHover = {
  rest: { scale: 1, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" },
  hover: { scale: 1.02, boxShadow: "0 12px 40px rgba(59,130,246,0.15)" }
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

const modalVariants: Record<string, any> = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.9, y: 30 }
};

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
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

  return <span>{count}{suffix}</span>;
}

function StatCard({ icon: Icon, label, value, suffix, color, delay }: {
  icon: any; label: string; value: number; suffix?: string; color: string; delay: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
      className="relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        variants={cardHover}
        initial="rest"
        animate={isHovered ? "hover" : "rest"}
        className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-6 border border-white/20 dark:border-slate-700/50 shadow-lg shadow-slate-200/50 dark:shadow-slate-950/50"
      >
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 blur-3xl" style={{ background: color }} />
        
        <div className="relative flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{label}</p>
            <p className="text-4xl font-black tracking-tight" style={{ color }}>
              <AnimatedCounter value={value} suffix={suffix} />
            </p>
          </div>
          <div 
            className="p-3 rounded-2xl shadow-lg"
            style={{ background: `${color}20`, color }}
          >
            <Icon size={24} />
          </div>
        </div>
        
        <motion.div 
          className="mt-4 h-1.5 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-700"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: delay + 0.3, duration: 0.8, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
        >
          <div 
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${color}, ${color}80)` }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({ project, index, onEdit, onDelete, deleteStep, onDeleteConfirm }: {
  project: Project; index: number; onEdit: () => void; onDelete: () => void;
  deleteStep: { index: number; step: number } | null;
  onDeleteConfirm: () => void; onDeleteCancel: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const isDeleting = deleteStep?.index === index;

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.1 * (index % 4) }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setShowDetails(!showDetails)}
    >
      <motion.div
        variants={cardHover}
        animate={isHovered ? { scale: 1.02, y: -4 } : { scale: 1, y: 0 }}
        className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl border border-white/30 dark:border-slate-700/50 shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50 overflow-hidden cursor-pointer"
      >
        <div className="relative p-6">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2.5 py-1 bg-gradient-to-br from-blue-500 to-blue-600 text-white text-xs font-black rounded-xl shadow-lg shadow-blue-500/30">
                  #{index + 1}
                </span>
                <h3 className="text-xl font-black text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
              </div>
              <p className="text-xs font-mono text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                <FiCode size={12} /> {project.slug || 'no-slug'}
              </p>
            </div>
            
            <motion.div
              animate={{ rotate: isHovered ? 90 : 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="p-2 bg-slate-50 dark:bg-slate-700/50 rounded-xl"
            >
              <FiLayers size={18} className="text-slate-400" />
            </motion.div>
          </div>

          <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
            {project.description || "No description provided yet..."}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags?.slice(0, 4).map((tag, tIdx) => (
              <motion.span
                key={`${tag}-${tIdx}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: tIdx * 0.05 }}
                className="text-[10px] uppercase tracking-wider font-bold bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-700 dark:to-slate-600 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-600"
              >
                {tag}
              </motion.span>
            ))}
            {(project.tags?.length || 0) > 4 && (
              <span className="text-[10px] font-bold text-blue-500 px-2 py-1">
                +{(project.tags?.length || 0) - 4}
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
                  className="p-2 bg-slate-100 dark:bg-slate-700 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                >
                  <FiGithub size={16} className="text-slate-600 dark:text-slate-400" />
                </a>
              )}
              {project.pageUrl && (
                <a
                  href={project.pageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 bg-slate-100 dark:bg-slate-700 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                >
                  <FiExternalLink size={16} className="text-slate-600 dark:text-slate-400" />
                </a>
              )}
              {project.dynamicImages && project.dynamicImages.length > 0 && (
                <div className="flex items-center gap-1 px-2 py-1 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <FiImage size={12} className="text-slate-400" />
                  <span className="text-[10px] font-bold text-slate-500">{project.dynamicImages.length}</span>
                </div>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }}
              className="flex items-center gap-2"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.stopPropagation(); onEdit(); }}
                className="p-2.5 bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-500/30 hover:bg-blue-600 transition-colors"
              >
                <FiEdit size={16} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.stopPropagation(); onDelete(); }}
                className={`p-2.5 rounded-xl shadow-lg transition-all ${
                  isDeleting
                    ? "bg-red-600 text-white shadow-red-500/30"
                    : "bg-red-50 dark:bg-red-950 text-red-500 hover:bg-red-500 hover:text-white shadow-red-200/50 dark:shadow-red-900/30"
                }`}
              >
                <FiTrash2 size={16} />
              </motion.button>
            </motion.div>
          </div>
        </div>

        <AnimatePresence>
          {isDeleting && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden bg-gradient-to-r from-red-500 to-red-600"
            >
              <div className="px-6 py-4 flex items-center justify-between">
                <span className="text-white font-bold text-sm">
                  {deleteStep?.step === 1 ? "⚠️ Delete this project?" : "🚫 Final confirmation!"}
                </span>
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => { e.stopPropagation(); onDeleteConfirm(); }}
                    className="px-4 py-1.5 bg-white text-red-600 rounded-lg font-bold text-xs shadow-lg"
                  >
                    {deleteStep?.step === 1 ? "Yes, delete" : "CONFIRM DELETE"}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => e.stopPropagation()}
                    className="px-4 py-1.5 bg-white/20 text-white rounded-lg font-bold text-xs"
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

function LoginPage({ onLogin }: { onLogin: (e: React.FormEvent) => void }) {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setIsLoading(false);
    
    if (loginData.username === "samir" && loginData.password === "barca" ||
        loginData.username === "admin" && loginData.password === "admin" ||
        loginData.username === "samir" && loginData.password === "samir") {
      onLogin(e);
    } else {
      setShake(true);
      toast.error("Invalid credentials");
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(ellipse at 20% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
            "radial-gradient(ellipse at 80% 80%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)",
            "radial-gradient(ellipse at 20% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
          ]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-md"
      >
        <motion.div
          animate={shake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="bg-white/10 backdrop-blur-2xl rounded-[2rem] p-1 border border-white/20 shadow-2xl"
        >
          <div className="bg-slate-900/90 backdrop-blur-xl rounded-[1.9rem] p-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/30"
            >
              <FiLoader size={36} className="text-white animate-spin" style={{ animationDuration: "3s" }} />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-black text-white text-center mb-2"
            >
              Welcome Back
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-slate-400 text-center text-sm mb-8"
            >
              Access your portfolio management dashboard
            </motion.p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Username</label>
                <motion.div whileFocus={{ scale: 1.02 }} className="relative mt-1">
                  <input
                    type="text"
                    required
                    value={loginData.username}
                    onChange={e => setLoginData({ ...loginData, username: e.target.value })}
                    className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    placeholder="Enter username..."
                  />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Password</label>
                <motion.div whileFocus={{ scale: 1.02 }} className="relative mt-1">
                  <input
                    type="password"
                    required
                    value={loginData.password}
                    onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                    className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    placeholder="Enter password..."
                  />
                </motion.div>
              </motion.div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl font-extrabold transition-all shadow-xl shadow-blue-500/30 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <FiLoader className="animate-spin" />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <FiZap />
                    <span>LOG IN</span>
                  </>
                )}
              </motion.button>
            </form>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center text-slate-500 text-xs mt-6"
            >
              Secure access only • Development mode
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function ProjectFormModal({ isOpen, onClose, editingIndex, projects, onSubmit, isUploading }: {
  isOpen: boolean; onClose: () => void; editingIndex: number | null; projects: Project[];
  onSubmit: (e: React.FormEvent) => void; isUploading: boolean;
}) {
  const [formData, setFormData] = useState({
    title: "", slug: "", description: "", tags: [] as string[], githubUrl: "", pageUrl: "", imageFolder: "",
  });
  const [newTag, setNewTag] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [dragOver, setDragOver] = useState(false);

  const GITHUB_URL_PREFIX = "https://raw.githubusercontent.com/samir20-23/Portfolio/refs/heads/main/main_Apps/Portfolio_nextJs/public";

  useEffect(() => {
    const loadTags = async () => {
      const tags = await getTags();
      const defaultTags = ["Next.js", "TypeScript", "CSS Modules", "PHP", "Laravel"];
      setAvailableTags(Array.from(new Set([...tags, ...defaultTags])));
    };
    loadTags();
  }, []);

  useEffect(() => {
    if (isOpen && editingIndex !== null) {
      const p = projects[editingIndex];
      let currentFolder = "";
      if (p.dynamicImages && p.dynamicImages.length > 0) {
        const firstImg = p.dynamicImages[0];
        if (firstImg.startsWith(GITHUB_URL_PREFIX)) {
          const parts = firstImg.split("/");
          currentFolder = parts[parts.length - 2];
        } else if (firstImg.startsWith("/")) {
          const parts = firstImg.split("/");
          currentFolder = parts[1];
        }
      }
      setFormData({
        title: p.title || "", slug: p.slug || "", description: p.description || "",
        tags: p.tags || [], githubUrl: p.githubUrl || "", pageUrl: p.pageUrl || "", imageFolder: currentFolder,
      });
      setExistingImages(p.dynamicImages || []);
    } else if (isOpen) {
      setFormData({ title: "", slug: "", description: "", tags: [], githubUrl: "", pageUrl: "", imageFolder: "" });
      setExistingImages([]);
    }
    setSelectedFiles([]);
    setPreviewUrls([]);
    setNewTag("");
    setActiveTab(0);
  }, [isOpen, editingIndex, projects]);

  const handleToggleTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags.filter(t => t !== tag) : [...prev.tags, tag]
    }));
  };

  const handleAddNewTag = () => {
    if (newTag && !availableTags.includes(newTag)) {
      setAvailableTags(prev => [...prev, newTag]);
    }
    if (newTag) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, newTag] }));
      setNewTag("");
    }
  };

  const handleFileChange = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files);
      setSelectedFiles(prev => [...prev, ...newFiles]);
      const urls = newFiles.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...urls]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileChange(e.dataTransfer.files);
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFiles.length > 0 && !formData.imageFolder) {
      toast.error("Please enter a folder name for images");
      return;
    }
    if (formData.imageFolder && /\s/.test(formData.imageFolder)) {
      toast.error("Folder name cannot contain spaces");
      return;
    }

    const currentFolder = (formData.imageFolder || formData.slug || formData.title.toLowerCase().replace(/\s+/g, "")).replace(/\s+/g, "-");
    
    if (selectedFiles.length > 0) {
      let folderChanged = true;
      if (editingIndex !== null) {
        const p = projects[editingIndex];
        let oldFolder = "";
        if (p.dynamicImages && p.dynamicImages.length > 0) {
          const parts = p.dynamicImages[0].split("/");
          oldFolder = parts[parts.length - 2];
        }
        if (oldFolder === currentFolder) folderChanged = false;
      }

      if (folderChanged) {
        const exists = await checkFolderExists(currentFolder);
        if (exists) {
          toast.error(`Folder "${currentFolder}" already exists. Choose a different name.`);
          return;
        }
      }
    }

    const data = new FormData();
    if (editingIndex !== null) data.append("projectIndex", editingIndex.toString());
    data.append("title", formData.title);
    data.append("slug", formData.slug);
    data.append("description", formData.description);
    data.append("tags", JSON.stringify(formData.tags));
    data.append("githubUrl", formData.githubUrl);
    data.append("pageUrl", formData.pageUrl);
    data.append("imageFolder", formData.imageFolder);
    data.append("keepImages", JSON.stringify(existingImages));
    selectedFiles.forEach(file => data.append("images", file));

    try {
      const res = await saveProject(data);
      if (res.success) {
        toast.success(editingIndex !== null ? "Project updated successfully!" : "Project created successfully!");
        onClose();
      } else {
        toast.error(res.error || "Save failed");
      }
    } catch (error) {
      toast.error("Network error");
    }
  };

  const tabs = [
    { label: "Basic Info", icon: FiLayers },
    { label: "Media", icon: FiImage },
    { label: "Links", icon: FiLink },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={e => e.stopPropagation()}
          className="bg-white dark:bg-slate-900 w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700"
        >
          <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 backdrop-blur rounded-2xl">
                  {editingIndex !== null ? <FiEdit size={24} className="text-white" /> : <FiPlus size={24} className="text-white" />}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white">
                    {editingIndex !== null ? "Edit Project" : "New Portfolio Project"}
                  </h2>
                  <p className="text-blue-100 text-sm">{editingIndex !== null ? "Update project details" : "Add a new project to your portfolio"}</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-xl transition-colors">
                <FiX size={24} className="text-white" />
              </button>
            </div>
          </div>

          <div className="flex border-b border-slate-100 dark:border-slate-700">
            {tabs.map((tab, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`flex-1 py-4 flex items-center justify-center gap-2 font-bold text-sm transition-all relative ${
                  activeTab === idx ? "text-blue-600 dark:text-blue-400" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
                {activeTab === idx && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                  />
                )}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmitForm} className="p-6 space-y-6 overflow-y-auto max-h-[60vh]">
            <AnimatePresence mode="wait">
              {activeTab === 0 && (
                <motion.div
                  key="tab1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Title *</label>
                      <input
                        required
                        type="text"
                        placeholder="Project name"
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value.replace(/\s+/g, "") })}
                        className="w-full mt-1 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Slug</label>
                      <input
                        type="text"
                        placeholder="auto-generated"
                        value={formData.slug}
                        onChange={e => setFormData({ ...formData, slug: e.target.value.replace(/\s+/g, "-") })}
                        className="w-full mt-1 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Description</label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about this project..."
                      value={formData.description}
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                      className="w-full mt-1 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Tags & Skills</label>
                    <div className="flex flex-wrap gap-2 mt-2 mb-3">
                      {formData.tags.map((tag, tIdx) => (
                        <motion.span
                          key={`${tag}-${tIdx}`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-blue-500/20"
                        >
                          {tag}
                          <button type="button" onClick={() => handleToggleTag(tag)}><FiX size={12} /></button>
                        </motion.span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <select
                        onChange={(e) => { if (e.target.value) handleToggleTag(e.target.value); e.target.value = ""; }}
                        className="flex-1 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white outline-none"
                      >
                        <option value="">Choose tag...</option>
                        {availableTags.filter(t => !formData.tags.includes(t)).map(tag => (
                          <option key={tag} value={tag}>{tag}</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        placeholder="Custom tag..."
                        value={newTag}
                        onChange={e => setNewTag(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && (e.preventDefault(), handleAddNewTag())}
                        className="w-36 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white outline-none"
                      />
                      <button type="button" onClick={handleAddNewTag} className="p-3.5 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors">
                        <FiPlus />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 1 && (
                <motion.div
                  key="tab2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  {existingImages.length > 0 && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1 mb-3">Current Images ({existingImages.length})</p>
                      <div className="grid grid-cols-4 gap-3">
                        {existingImages.map((img, i) => (
                          <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 group">
                            <img src={img.startsWith("http") ? img.replace(GITHUB_URL_PREFIX, "") : img} alt="" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => setExistingImages(prev => prev.filter((_, idx) => idx !== i))}
                              className="absolute inset-0 bg-red-600/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <FiTrash2 size={20} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    className={`relative border-2 border-dashed rounded-3xl p-10 text-center transition-all ${
                      dragOver ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-slate-300 dark:border-slate-600"
                    }`}
                  >
                    <input
                      type="file"
                      multiple
                      onChange={(e) => handleFileChange(e.target.files)}
                      className="hidden"
                      id="modal-image-upload"
                    />
                    <label htmlFor="modal-image-upload" className="cursor-pointer">
                      <motion.div
                        animate={dragOver ? { scale: 1.1 } : { scale: 1 }}
                        className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center"
                      >
                        <FiImage size={28} className="text-white" />
                      </motion.div>
                      <p className="font-bold text-slate-700 dark:text-slate-300">Drop images here or click to upload</p>
                      <p className="text-xs text-slate-400 mt-1">GIF, PNG, JPG, JPEG supported</p>
                      {selectedFiles.length > 0 && (
                        <span className="inline-block mt-3 px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 rounded-full text-xs font-bold">
                          {selectedFiles.length} files selected
                        </span>
                      )}
                    </label>
                  </div>

                  {previewUrls.length > 0 && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-blue-500 ml-1 mb-3">New Selection ({previewUrls.length})</p>
                      <div className="grid grid-cols-4 gap-3">
                        {previewUrls.map((url, i) => (
                          <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border-2 border-blue-400">
                            <img src={url} alt="" className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1 flex items-center gap-1">
                      <FiFolder size={12} /> Target Folder {selectedFiles.length > 0 && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type="text"
                      required={selectedFiles.length > 0}
                      placeholder="e.g. my-project (no spaces)"
                      value={formData.imageFolder}
                      onChange={e => setFormData({ ...formData, imageFolder: e.target.value.replace(/\s+/g, '-') })}
                      className="w-full mt-1 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </motion.div>
              )}

              {activeTab === 2 && (
                <motion.div
                  key="tab3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1 flex items-center gap-1">
                      <FiGithub size={12} /> Github URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://github.com/username/repo"
                      value={formData.githubUrl}
                      onChange={e => setFormData({ ...formData, githubUrl: e.target.value })}
                      className="w-full mt-1 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1 flex items-center gap-1">
                      <FiExternalLink size={12} /> Live Page URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://yourproject.com"
                      value={formData.pageUrl}
                      onChange={e => setFormData({ ...formData, pageUrl: e.target.value })}
                      className="w-full mt-1 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-700 sticky bottom-0 bg-white dark:bg-slate-900">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-bold"
              >
                Cancel
              </button>
              <motion.button
                type="submit"
                disabled={isUploading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl font-bold transition-all shadow-xl shadow-blue-500/30 flex items-center gap-2 disabled:opacity-50"
              >
                {isUploading ? (
                  <>
                    <FiLoader className="animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <FiCheck size={18} />
                    <span>{editingIndex !== null ? "SAVE CHANGES" : "CREATE PROJECT"}</span>
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function AdminPage() {
  const [isDev, setIsDev] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [deleteStep, setDeleteStep] = useState<{ index: number; step: number } | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDev(process.env.NODE_ENV === "development");
    const loggedIn = localStorage.getItem("portfolio_admin_logged_in");
    if (loggedIn === "true") setIsLoggedIn(true);
    
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (mounted) fetchData();
  }, [mounted]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const projs = await getProjects();
      setProjects(projs);
    } catch (error) {
      toast.error("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    localStorage.setItem("portfolio_admin_logged_in", "true");
    toast.success("Welcome back, Samir!");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("portfolio_admin_logged_in");
    toast.success("Logged out successfully");
  };

  const handleOpenCreate = () => {
    setEditingIndex(null);
    setShowPopup(true);
  };

  const handleOpenEdit = (index: number) => {
    setEditingIndex(index);
    setShowPopup(true);
  };

  const handleDelete = async (index: number) => {
    if (deleteStep?.index === index && deleteStep.step === 2) {
      try {
        await deleteProject(index);
        toast.success("Project deleted");
        setDeleteStep(null);
        fetchData();
      } catch (error) {
        toast.error("Delete failed");
      }
    } else if (deleteStep?.index === index && deleteStep.step === 1) {
      setDeleteStep({ index, step: 2 });
    } else {
      setDeleteStep({ index, step: 1 });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const allTags = Array.from(new Set(projects.flatMap(p => p.tags || [])));
  
  const filteredProjects = projects.filter(p => {
    const matchesSearch = !searchQuery || 
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || p.tags?.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  if (!isDev && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-300">Access Denied</h2>
          <p className="text-slate-500 mt-2">This page is only available in development mode.</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? "bg-slate-950" : "bg-slate-50"}`}>
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950 flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex">
        <motion.aside
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`fixed top-0 left-0 h-full z-40 transition-all duration-300 ${
            sidebarOpen ? "w-64" : "w-20"
          }`}
        >
          <div className={`h-full ${darkMode ? "bg-slate-900" : "bg-white"} border-r ${darkMode ? "border-slate-800" : "border-slate-200"} flex flex-col`}>
            <div className="p-5 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 flex-shrink-0">
                  <FiGrid className="text-white" />
                </div>
                <AnimatePresence>
                  {sidebarOpen && (
                    <motion.div
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                    >
                      <h2 className="font-black text-lg text-slate-800 dark:text-white whitespace-nowrap">Portfolio Admin</h2>
                      <p className="text-[10px] text-slate-400">v2.0 Dashboard</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <nav className="flex-1 p-4 space-y-2">
              {[
                { icon: FiGrid, label: "Dashboard", active: true },
                { icon: FiLayers, label: "Projects", active: false },
                { icon: FiTag, label: "Tags", active: false },
                { icon: FiActivity, label: "Activity", active: false },
              ].map((item, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all ${
                    item.active
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30"
                      : darkMode
                      ? "text-slate-400 hover:bg-slate-800 hover:text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <item.icon size={20} />
                  <AnimatePresence>
                    {sidebarOpen && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        className="whitespace-nowrap overflow-hidden"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </nav>

            <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <motion.button
                whileHover={{ x: 4 }}
                onClick={() => setDarkMode(!darkMode)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all ${
                  darkMode ? "text-slate-400 hover:bg-slate-800" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
                <AnimatePresence>
                  {sidebarOpen && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="whitespace-nowrap">
                      {darkMode ? "Light Mode" : "Dark Mode"}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
              <motion.button
                whileHover={{ x: 4 }}
                onClick={handleLogout}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30`}
              >
                <FiLogOut size={20} />
                <AnimatePresence>
                  {sidebarOpen && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="whitespace-nowrap">
                      Logout
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`absolute -right-3 top-20 w-6 h-6 bg-white dark:bg-slate-800 border ${darkMode ? "border-slate-700" : "border-slate-200"} rounded-full flex items-center justify-center shadow-lg`}
            >
              {sidebarOpen ? <FiChevronLeft size={12} /> : <FiChevronRight size={12} />}
            </button>
          </div>
        </motion.aside>

        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"}`}>
          <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-8 ${darkMode ? "bg-slate-900/50" : "bg-white/80"} backdrop-blur-xl rounded-3xl p-6 border ${darkMode ? "border-slate-800" : "border-white/20"} shadow-xl`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-1">
                    <FiClock size={14} />
                    <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-black text-slate-800 dark:text-white">
                    Welcome back, <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">Samir</span>
                  </h1>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleOpenCreate}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-6 py-3 rounded-2xl font-bold shadow-xl shadow-blue-500/30 transition-all"
                >
                  <FiPlus size={20} />
                  <span>New Project</span>
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8"
            >
              <StatCard icon={FiLayers} label="Total Projects" value={projects.length} color="#3b82f6" delay={0} />
              <StatCard icon={FiTag} label="Technologies" value={allTags.length} color="#8b5cf6" delay={0.1} />
              <StatCard icon={FiGithub} label="With GitHub" value={projects.filter(p => p.githubUrl).length} color="#10b981" delay={0.2} />
              <StatCard icon={FiExternalLink} label="Live Projects" value={projects.filter(p => p.pageUrl).length} color="#f59e0b" delay={0.3} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`mb-6 ${darkMode ? "bg-slate-900/50" : "bg-white/80"} backdrop-blur-xl rounded-3xl p-4 border ${darkMode ? "border-slate-800" : "border-white/20"} shadow-xl`}
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border ${darkMode ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500" : "bg-slate-50 border-slate-200"} outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                  />
                </div>
                <div className="flex gap-3">
                  <select
                    value={selectedTag}
                    onChange={e => setSelectedTag(e.target.value)}
                    className={`px-4 py-3 rounded-xl border ${darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-slate-50 border-slate-200"} outline-none`}
                  >
                    <option value="">All Tags</option>
                    {allTags.map(tag => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))}
                  </select>
                  <button className={`px-4 py-3 rounded-xl border ${darkMode ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-200"} flex items-center gap-2 font-bold text-sm`}>
                    <FiFilter size={16} />
                    <span>Filter</span>
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-between mb-5"
            >
              <div>
                <h2 className="text-xl font-black text-slate-800 dark:text-white">
                  {filteredProjects.length} Project{filteredProjects.length !== 1 ? "s" : ""}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {searchQuery || selectedTag ? "Filtered results" : "All portfolio projects"}
                </p>
              </div>
            </motion.div>

            {filteredProjects.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`text-center py-20 rounded-3xl ${darkMode ? "bg-slate-900/50" : "bg-white/80"} backdrop-blur-xl border ${darkMode ? "border-slate-800" : "border-white/20"} shadow-xl`}
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                  <FiLayers size={32} className="text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">No projects found</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-4">
                  {searchQuery || selectedTag ? "Try adjusting your filters" : "Create your first project to get started"}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOpenCreate}
                  className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg"
                >
                  <FiPlus /> Create Project
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
              >
                {filteredProjects.map((project, idx) => (
                  <ProjectCard
                    key={idx}
                    project={project}
                    index={projects.indexOf(project)}
                    onEdit={() => handleOpenEdit(projects.indexOf(project))}
                    onDelete={() => handleDelete(projects.indexOf(project))}
                    deleteStep={deleteStep}
                    onDeleteConfirm={() => handleDelete(projects.indexOf(project))}
                    onDeleteCancel={() => setDeleteStep(null)}
                  />
                ))}
              </motion.div>
            )}

            <motion.footer
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12 text-center text-sm text-slate-400 dark:text-slate-500"
            >
              <p>Portfolio Admin Dashboard v2.0 • Built with Next.js & Framer Motion</p>
            </motion.footer>
          </div>
        </main>
      </div>

      <ProjectFormModal
        isOpen={showPopup}
        onClose={() => { setShowPopup(false); setEditingIndex(null); fetchData(); }}
        editingIndex={editingIndex}
        projects={projects}
        onSubmit={handleFormSubmit}
        isUploading={isUploading}
      />
    </div>
  );
}
