// src/pages/About.jsx
import { useEffect, useState } from "react";
import axiosClient from "../lib/api";

export default function About() {
  const [abouts, setAbouts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchList();
  }, []);

  function fetchList() {
    setLoading(true);
    axiosClient
      .get("/api/about")
      .then(res => setAbouts(res.data))
      .catch(() => setError("Failed to load entries."))
      .finally(() => setLoading(false));
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const req = editing
      ? axiosClient.put(`/api/about/${editing.id}`, form)
      : axiosClient.post("/api/about", form);

    req
      .then(() => {
        setForm({ title: "", description: "" });
        setEditing(null);
        fetchList();
      })
      .catch(() => setError("Save failed."));
  }

  function handleEdit(item) {
    setEditing(item);
    setForm({ title: item.title, description: item.description });
  }

  function handleDelete(id) {
    if (!confirm("Are you sure you want to delete?")) return;
    axiosClient.delete(`/api/about/${id}`).then(fetchList);
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">About Management</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        {error && <p className="text-red-600 text-center">{error}</p>}

        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter title"
            className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="3"
            placeholder="Enter description"
            className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 p-2"
          />
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
                setForm({ title: "", description: "" });
              }}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
 
      {loading ? (
        <p className="text-center">Loading…</p>
      ) : (
        <ul className="space-y-4">
          {abouts.map(a => (
            <li
              key={a.id}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow"
            >
              <div>
                <h2 className="text-xl font-semibold">{a.title}</h2>
                <p className="text-gray-700">{a.description}</p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleEdit(a)}
                  className="px-4 py-1 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(a.id)}
                  className="px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
