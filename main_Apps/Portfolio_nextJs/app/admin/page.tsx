// File: app/admin/page.tsx
"use client";

import { useState, useEffect } from "react";

export default function AdminPage() {
  const [jsonStr, setJsonStr] = useState<string>(""); // holds the file text
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    // load raw JSON text from our API route
    fetch("/api/data")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then((text) => {
        setJsonStr(text);
      })
      .catch((err) => {
        setStatus("Error loading file: " + err.message);
      });
  }, []);

  const handleSave = async () => {
    // send whatever is in the textarea straight to the API
    const res = await fetch("/api/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: jsonStr,
    });

    if (res.ok) {
      setStatus("✅ Saved, no syntax check.");
    } else {
      const err = await res.json();
      setStatus("❌ Save failed: " + err.error);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Edit <code>public/data.json</code>
      </h1>

      <textarea
        style={{ color: "black" }}
        className="w-full h-[70vh] p-4 border rounded-lg font-mono text-sm"
        value={jsonStr}
        onChange={(e) => setJsonStr(e.target.value)}
      />

      <button
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        onClick={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        Save
      </button>

      {status && <p className="mt-3 text-sm">{status}</p>}
    </div>
  );
}
