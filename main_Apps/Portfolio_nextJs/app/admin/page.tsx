"use client";

import React, { useState, useEffect, useRef } from "react";
import { getProjects, saveProject, deleteProject, getTags, Project } from "@/actions/projects";
import { toast } from "react-hot-toast";
import { FiEdit, FiTrash2, FiPlus, FiX, FiGithub, FiExternalLink, FiImage, FiLoader, FiFolder } from "react-icons/fi";

export default function AdminPage() {
  const [isDev, setIsDev] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [projects, setProjects] = useState<Project[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [deleteStep, setDeleteStep] = useState<{ index: number; step: number } | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    tags: [] as string[],
    githubUrl: "",
    pageUrl: "",
    imageFolder: "",
  });
  const [newTag, setNewTag] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  const GITHUB_URL_PREFIX = "https://raw.githubusercontent.com/samir20-23/Portfolio/refs/heads/main/main_Apps/Portfolio_nextJs/public";

  const resolvePreviewUrl = (url: string) => {
    if (url.startsWith(GITHUB_URL_PREFIX)) {
      return url.replace(GITHUB_URL_PREFIX, "");
    }
    return url;
  };

  useEffect(() => {
    setIsDev(process.env.NODE_ENV === "development");
    const loggedIn = localStorage.getItem("portfolio_admin_logged_in");
    if (loggedIn === "true") setIsLoggedIn(true);
    fetchData();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.username === "samir" && loginData.password === "barca") {
      setIsLoggedIn(true);
      localStorage.setItem("portfolio_admin_logged_in", "true");
      toast.success("Welcome, Samir!");
    } else {
      toast.error("Invalid credentials");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("portfolio_admin_logged_in");
    toast.success("Logged out");
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const projs = await getProjects();
      const tags = await getTags();
      const defaultTags = ["Next.js", "TypeScript", "CSS Modules", "PHP", "Laravel"];
      const combinedTags = Array.from(new Set([...tags, ...defaultTags]));
      setProjects(projs);
      setAvailableTags(combinedTags);
    } catch (error) {
      toast.error("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingIndex(null);
    setFormData({
      title: "",
      slug: "",
      description: "",
      tags: [],
      githubUrl: "",
      pageUrl: "",
      imageFolder: "",
    });
    setSelectedFiles([]);
    setPreviewUrls([]);
    setExistingImages([]);
    setShowPopup(true);
  };

  const handleOpenEdit = (index: number) => {
    const p = projects[index];
    setEditingIndex(index);
    setFormData({
      title: p.title || "",
      slug: p.slug || "",
      description: p.description || "",
      tags: p.tags || [],
      githubUrl: p.githubUrl || "",
      pageUrl: p.pageUrl || "",
      imageFolder: "", 
    });
    setExistingImages(p.dynamicImages || []);
    setSelectedFiles([]);
    setPreviewUrls([]);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setEditingIndex(null);
  };

  const handleToggleTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) 
        ? prev.tags.filter(t => t !== tag) 
        : [...prev.tags, tag]
    }));
  };

  const handleAddNewTag = () => {
    if (newTag && !availableTags.includes(newTag)) {
      setAvailableTags(prev => [...prev, newTag]);
      setFormData(prev => ({ ...prev, tags: [...prev.tags, newTag] }));
      setNewTag("");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles(files);
      const urls = files.map(file => URL.createObjectURL(file));
      setPreviewUrls(urls);
    }
  };

  const handleRemoveExistingImage = (img: string) => {
    setExistingImages(prev => prev.filter(i => i !== img));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    const data = new FormData();
    if (editingIndex !== null) data.append("projectIndex", editingIndex.toString());
    data.append("title", formData.title);
    data.append("slug", formData.slug);
    data.append("description", formData.description);
    data.append("tags", JSON.stringify(formData.tags));
    data.append("githubUrl", formData.githubUrl);
    data.append("pageUrl", formData.pageUrl);
    data.append("imageFolder", formData.imageFolder || "random");
    data.append("keepImages", JSON.stringify(existingImages));
    
    selectedFiles.forEach(file => {
      data.append("images", file);
    });

    try {
      const res = await saveProject(data);
      if (res.success) {
        toast.success(editingIndex !== null ? "Project updated" : "Project created");
        setShowPopup(false);
        fetchData();
      } else {
        toast.error(res.error || "Save failed");
      }
    } catch (error) {
      toast.error("Network error or server crash");
    } finally {
      setIsUploading(false);
    }
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

  if (!isDev && loading === false) {
    return <div className="p-10 text-center font-medium">This page is only available in development mode.</div>;
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 dark:bg-slate-950">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-2xl w-full max-w-md border border-slate-200 dark:border-slate-700 animate-in zoom-in-95 duration-300">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/30">
              <FiLoader size={32} className="animate-spin-slow" />
            </div>
            <h2 className="text-2xl font-bold dark:text-white">Admin Login</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Please enter your credentials to manage your portfolio.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Username</label>
              <input 
                type="text"
                required
                value={loginData.username}
                onChange={e => setLoginData({ ...loginData, username: e.target.value })}
                className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Password</label>
              <input 
                type="password"
                required
                value={loginData.password}
                onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button 
              type="submit"
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-extrabold transition-all shadow-xl shadow-blue-500/30 active:scale-95"
            >
              LOG IN
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) return <div className="p-10 text-center text-slate-500 font-medium italic">Loading Samir's Dashboard...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8 dark:from-slate-950 dark:to-slate-900 transition-colors">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 bg-white/40 dark:bg-slate-800/40 backdrop-blur-md p-6 rounded-2xl border border-white/20 dark:border-slate-700 shadow-xl shadow-blue-500/5">
          <div className="flex items-center gap-4">
            <a href="/" className="group text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1 transition-all hover:translate-x-[-4px]">
              &larr; <span className="hidden sm:inline group-hover:underline">Back to </span>Site
            </a>
            <h1 className="text-2xl sm:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500 dark:from-white dark:to-slate-400">Admin Dashboard</h1>
            <button onClick={handleLogout} className="text-xs font-bold text-red-500 hover:text-red-600">Logout</button>
          </div>
          <button 
            onClick={handleOpenCreate}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98]"
          >
            <FiPlus /> New Project
          </button>
        </div>

        <div className="grid gap-6">
          {projects.map((project, idx) => (
            <div 
              key={idx} 
              className="group bg-white/70 dark:bg-slate-800/70 backdrop-blur-md p-5 rounded-2xl border border-white/20 dark:border-slate-700 hover:border-blue-400/50 dark:hover:border-blue-500/50 transition-all shadow-sm hover:shadow-xl hover:shadow-blue-500/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
            >
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{project.title}</h3>
                  <span className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded-md text-slate-500 dark:text-slate-400 font-mono">#{idx}</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <span className="opacity-60 italic">slug:</span> {project.slug}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags?.map((tag, tIdx) => (
                    <span key={`${tag}-${tIdx}`} className="text-[10px] uppercase tracking-wider font-bold bg-blue-50/50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 px-2.5 py-1 rounded-md border border-blue-100 dark:border-blue-800/50">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 self-end md:self-center">
                <button 
                  onClick={() => handleOpenEdit(idx)}
                  className="p-3 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all rounded-xl shadow-sm"
                  title="Edit"
                >
                  <FiEdit size={20} />
                </button>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleDelete(idx)}
                    className={`p-3 rounded-xl transition-all flex items-center gap-2 shadow-sm font-bold ${
                      deleteStep?.index === idx 
                        ? "bg-red-600 text-white px-4" 
                        : "bg-red-50 dark:bg-red-950 text-red-500 hover:bg-red-600 hover:text-white"
                    }`}
                    title="Delete"
                  >
                    {deleteStep?.index === idx ? (
                      deleteStep.step === 1 ? "Are you sure?" : "REALLY SURE?"
                    ) : <FiTrash2 size={20} />}
                  </button>
                  {deleteStep?.index === idx && (
                    <button 
                      onClick={() => setDeleteStep(null)}
                      className="p-3 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-all"
                    >
                      <FiX />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 w-full max-w-2xl max-h-[95vh] overflow-y-auto rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center sticky top-0 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/40 text-blue-600 rounded-xl">
                  {editingIndex !== null ? <FiEdit size={20} /> : <FiPlus size={20} />}
                </div>
                <h2 className="text-xl font-bold dark:text-white">
                  {editingIndex !== null ? "Edit Project" : "New Portfolio Project"}
                </h2>
              </div>
              <button onClick={handleClosePopup} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors text-slate-400 hover:text-slate-600">
                <FiX size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Title *</label>
                  <input 
                    required
                    type="text"
                    placeholder="E.g. My Awesome App"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-900/50 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all focus:bg-white dark:focus:bg-slate-900"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Slug (optional)</label>
                  <input 
                    type="text"
                    placeholder="auto-generated-slug"
                    value={formData.slug}
                    onChange={e => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-900/50 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Description</label>
                <textarea 
                  rows={4}
                  placeholder="Tell us about this project..."
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-900/50 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Tags & Skills</label>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, tIdx) => (
                    <span key={`${tag}-${tIdx}`} className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-md shadow-blue-500/20">
                      {tag}
                      <button type="button" onClick={() => handleToggleTag(tag)}><FiX size={12} /></button>
                    </span>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <select 
                    onChange={(e) => handleToggleTag(e.target.value)}
                    className="flex-1 p-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-900/50 dark:text-white outline-none"
                  >
                    <option value="">Choose standard tag...</option>
                    {availableTags.filter(t => !formData.tags.includes(t)).map(tag => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Add custom..."
                      value={newTag}
                      onChange={e => setNewTag(e.target.value)}
                      className="flex-1 sm:w-32 p-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-900/50 dark:text-white outline-none"
                    />
                    <button type="button" onClick={handleAddNewTag} className="p-3 bg-slate-200 dark:bg-slate-700 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
                      <FiPlus />
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1 flex items-center gap-1"><FiGithub size={12}/> Github URL</label>
                  <input 
                    type="url"
                    placeholder="https://github.com/..."
                    value={formData.githubUrl}
                    onChange={e => setFormData({ ...formData, githubUrl: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-900/50 dark:text-white outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1 flex items-center gap-1"><FiExternalLink size={12}/> Live Page URL</label>
                  <input 
                    type="url"
                    placeholder="https://example.com"
                    value={formData.pageUrl}
                    onChange={e => setFormData({ ...formData, pageUrl: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-900/50 dark:text-white outline-none"
                  />
                </div>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-700 pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Media Assets</label>
                </div>
                
                {/* Existing Images */}
                {existingImages.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase font-bold text-slate-400 ml-1">In Cloud/Existing:</p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                      {existingImages.map((img, i) => (
                        <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 group ring-offset-2 hover:ring-2 ring-blue-500 transition-all">
                          <img src={resolvePreviewUrl(img)} alt="" className="w-full h-full object-cover" />
                          <button 
                            type="button"
                            onClick={() => handleRemoveExistingImage(img)}
                            className="absolute inset-0 bg-red-600/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Previews of newly selected files */}
                {previewUrls.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase font-bold text-blue-500 ml-1">New Selection (Pending Upload):</p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 animate-in fade-in slide-in-from-bottom-2">
                      {previewUrls.map((url, i) => (
                        <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border-2 border-blue-400 dark:border-blue-500 p-0.5">
                          <img src={url} alt="" className="w-full h-full object-cover rounded-[14px]" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400 ml-1 flex items-center gap-1"><FiFolder size={12}/> Storage Folder</label>
                  <input 
                    type="text"
                    placeholder="E.g. my-app (if empty, saved in /public/random)"
                    value={formData.imageFolder}
                    onChange={e => setFormData({ ...formData, imageFolder: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50/80 dark:bg-slate-900/80 dark:text-white outline-none text-sm placeholder:italic"
                  />
                </div>

                <div className="relative group">
                  <input 
                    type="file" 
                    multiple 
                    onChange={handleFileChange}
                    className="hidden" 
                    id="image-upload" 
                  />
                  <label htmlFor="image-upload" className="cursor-pointer border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-3xl p-10 text-center block transition-all group-hover:border-blue-500 group-hover:bg-blue-50/50 dark:group-hover:bg-blue-900/10">
                    <FiImage size={48} className="mx-auto text-slate-400 group-hover:text-blue-500 mb-3 transition-colors" />
                    <p className="font-bold text-slate-600 dark:text-slate-300 group-hover:text-blue-600">Click to upload new images</p>
                    <p className="text-xs text-slate-400 mt-2">GIF, PNG, JPG, JPEG supported</p>
                    {selectedFiles.length > 0 && <span className="inline-block mt-3 px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 rounded-full text-xs font-bold">{selectedFiles.length} files selected</span>}
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 sticky bottom-0 bg-white dark:bg-slate-800 pb-2 border-t border-slate-100 dark:border-slate-700">
                <button 
                  type="button"
                  disabled={isUploading}
                  onClick={handleClosePopup}
                  className="px-6 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all font-bold disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isUploading}
                  className="px-10 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-xl shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 disabled:bg-slate-400 disabled:shadow-none"
                >
                   {isUploading ? <><FiLoader className="animate-spin" /> SUBMITTING...</> : (editingIndex !== null ? "SAVE CHANGES" : "CREATE PROJECT")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
