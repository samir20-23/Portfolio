"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiEdit, FiPlus, FiX, FiGithub, FiExternalLink, FiImage,
  FiLoader, FiFolder, FiLayers, FiLink, FiCheck, FiTrash2
} from "react-icons/fi";
import { toast } from "react-hot-toast";
import { getTags, checkFolderExists, saveProject } from "@/actions/projects";

interface Project {
  title: string;
  slug: string;
  description: string;
  tags: string[];
  githubUrl: string;
  pageUrl: string;
  dynamicImages: string[];
}

interface ProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingIndex: number | null;
  projects: Project[];
  onSuccess: () => void;
  darkMode: boolean;
}

const GITHUB_URL_PREFIX = "https://raw.githubusercontent.com/samir20-23/Portfolio/refs/heads/main/main_Apps/Portfolio_nextJs/public";

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.9, y: 30 }
};

export default function ProjectFormModal({ isOpen, onClose, editingIndex, projects, onSuccess, darkMode }: ProjectFormModalProps) {
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
  const [isUploading, setIsUploading] = useState(false);

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

    setIsUploading(true);
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
        onSuccess();
      } else {
        toast.error(res.error || "Save failed");
      }
    } catch (error) {
      toast.error("Network error");
    } finally {
      setIsUploading(false);
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
          className={`w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl ${darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-white/20"}`}
        >
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.div
                  initial={{ rotate: -90, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  className="p-3 bg-white/20 backdrop-blur rounded-2xl"
                >
                  {editingIndex !== null ? <FiEdit size={24} className="text-white" /> : <FiPlus size={24} className="text-white" />}
                </motion.div>
                <div>
                  <h2 className="text-2xl font-black text-white">
                    {editingIndex !== null ? "Edit Project" : "New Portfolio Project"}
                  </h2>
                  <p className="text-white/70 text-sm">{editingIndex !== null ? "Update project details" : "Add a new project to your portfolio"}</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-xl transition-colors">
                <FiX size={24} className="text-white" />
              </button>
            </div>
          </div>

          <div className={`flex border-b ${darkMode ? "border-slate-800" : "border-slate-100"}`}>
            {tabs.map((tab, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`flex-1 py-4 flex items-center justify-center gap-2 font-bold text-sm transition-all relative ${
                  activeTab === idx ? "text-blue-600 dark:text-blue-400" : darkMode ? "text-slate-500" : "text-slate-400"
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
                {activeTab === idx && (
                  <motion.div
                    layoutId="activeFormTab"
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
                        className={`w-full mt-1 p-4 rounded-xl border ${darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-slate-50 border-slate-200"} outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Slug</label>
                      <input
                        type="text"
                        placeholder="auto-generated"
                        value={formData.slug}
                        onChange={e => setFormData({ ...formData, slug: e.target.value.replace(/\s+/g, "-") })}
                        className={`w-full mt-1 p-4 rounded-xl border ${darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-slate-50 border-slate-200"} outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
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
                      className={`w-full mt-1 p-4 rounded-xl border ${darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-slate-50 border-slate-200"} outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none`}
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
                          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg"
                        >
                          {tag}
                          <button type="button" onClick={() => handleToggleTag(tag)}><FiX size={12} /></button>
                        </motion.span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <select
                        onChange={(e) => { if (e.target.value) handleToggleTag(e.target.value); e.target.value = ""; }}
                        className={`flex-1 p-3.5 rounded-xl border ${darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-slate-50 border-slate-200"} outline-none`}
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
                        className={`w-36 p-3.5 rounded-xl border ${darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-slate-50 border-slate-200"} outline-none`}
                      />
                      <button type="button" onClick={handleAddNewTag} className="p-3.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:opacity-90 transition-opacity">
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
                      dragOver 
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
                        : darkMode ? "border-slate-700" : "border-slate-300"
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
                      <p className={`font-bold ${darkMode ? "text-slate-300" : "text-slate-700"}`}>Drop images here or click to upload</p>
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
                      className={`w-full mt-1 p-3.5 rounded-xl border ${darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-slate-50 border-slate-200"} outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
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
                      className={`w-full mt-1 p-4 rounded-xl border ${darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-slate-50 border-slate-200"} outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
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
                      className={`w-full mt-1 p-4 rounded-xl border ${darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-slate-50 border-slate-200"} outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className={`flex justify-end gap-3 pt-4 border-t ${darkMode ? "border-slate-800" : "border-slate-100"} sticky bottom-0 bg-inherit`}>
              <button
                type="button"
                onClick={onClose}
                className={`px-6 py-3 rounded-xl ${darkMode ? "text-slate-400 hover:bg-slate-800" : "text-slate-600 hover:bg-slate-100"} transition-colors font-bold`}
              >
                Cancel
              </button>
              <motion.button
                type="submit"
                disabled={isUploading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold transition-all shadow-xl flex items-center gap-2 disabled:opacity-50"
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
