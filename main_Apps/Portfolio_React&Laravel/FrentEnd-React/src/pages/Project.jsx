// src/pages/Project.jsx
import { useState, useEffect } from "react";
import axiosClient from "../lib/api";

export default function Project() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
    repo_url: "",
    tech_stack: "",
    image: null,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  function fetchProjects() {
    axiosClient
      .get("/api/projects")
      .then(res => setItems(res.data))
      .catch(() => setError("Could not load projects"));
  }

  function handleChange(e) {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData(f => ({ ...f, image: files[0] }));
    } else {
      setFormData(f => ({ ...f, [name]: value }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const payload = new FormData();
    Object.entries(formData).forEach(([k, v]) => {
      if (v !== null && v !== "") {
        payload.append(k, v);
      }
    });

    const request = editing
      ? axiosClient.put(`/api/projects/${editing.id}`, payload, {
          headers: { "Content-Type": "multipart/form-data" }
        })
      : axiosClient.post("/api/projects", payload, {
          headers: { "Content-Type": "multipart/form-data" }
        });

    request
      .then(() => {
        setFormData({ title: "", description: "", url: "", repo_url: "", tech_stack: "", image: null });
        setEditing(null);
        fetchProjects();
      })
      .catch(() => setError("Save failed"));
  }

  function startEdit(item) {
    setEditing(item);
    setFormData({
      title: item.title,
      description: item.description,
      url: item.url || "",
      repo_url: item.repo_url || "",
      tech_stack: item.tech_stack || "",
      image: null,
    });
  }

  function handleDelete(id) {
    if (!confirm("Delete this project?")) return;
    axiosClient.delete(`/api/projects/${id}`).then(fetchProjects);
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Project CRUD</h1>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 mb-8 border p-4 rounded-lg bg-gray-50">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Project title"
            className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Brief description"
            rows="3"
            className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Live URL</label>
          <input
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="https://example.com"
            className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Repo URL</label>
          <input
            name="repo_url"
            value={formData.repo_url}
            onChange={handleChange}
            placeholder="https://github.com/you/project"
            className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Tech Stack</label>
          <input
            name="tech_stack"
            value={formData.tech_stack}
            onChange={handleChange}
            placeholder="React, Laravel, Tailwind"
            className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Project Image</label>
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="mt-1 block"
          />
          {editing && items.find(i => i.id === editing.id)?.image_path && (
            <img
              src={`${import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "")}/storage/${
                items.find(i => i.id === editing.id).image_path
              }`}
              alt="Current"
              className="mt-2 h-24 w-24 object-cover rounded-lg"
            />
          )}
        </div>
        <div className="flex justify-center space-x-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {editing ? "Update" : "Create"}
          </button>
          {editing && (
            <button
              type="button"
              onClick={() => {
                setEditing(null);
                setFormData({ title: "", description: "", url: "", repo_url: "", tech_stack: "", image: null });
              }}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <ul className="space-y-6">
        {items.map(proj => (
          <li key={proj.id} className="border p-4 rounded-lg flex items-center space-x-4">
            {proj.image_path && (
              <img
                src={`${import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "")}/storage/${proj.image_path}`}
                alt={proj.title}
                className="h-24 w-24 object-cover rounded-lg"
              />
            )}
            <div className="flex-1">
              <h2 className="font-semibold text-lg">{proj.title}</h2>
              <p className="text-gray-700">{proj.description}</p>
              <p className="text-sm">
                {proj.url && <a href={proj.url} target="_blank" className="text-blue-500">Live</a>}{" "}
                {proj.repo_url && <a href={proj.repo_url} target="_blank" className="text-blue-500">Repo</a>}
              </p>
              <p className="text-sm text-gray-500">Tech: {proj.tech_stack}</p>
            </div>
            <div className="flex flex-col space-y-2">
              <button onClick={() => startEdit(proj)} className="text-yellow-600">Edit</button>
              <button onClick={() => handleDelete(proj.id)} className="text-red-600">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
