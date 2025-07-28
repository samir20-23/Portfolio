// File: app/admin/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [jsonStr, setJsonStr] = useState<string>(""); // holds the file text
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    const club = localStorage.getItem("clubName");
    const clubExpiry = localStorage.getItem("clubExpiry");

    // check if value exists and not expired
    if (!club || !clubExpiry || new Date().getTime() > Number(clubExpiry)) {
      const answer = prompt("What is your club?");
      if (answer?.toLowerCase() === "barca") {
        const oneDayLater = new Date().getTime() + 24 * 60 * 60 * 1000;
        localStorage.setItem("clubName", "barca");
        localStorage.setItem("clubExpiry", oneDayLater.toString());
      } else {
        router.push("/"); // redirect to home
        return;
      }
    }

    // fetch JSON content
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
  }, [router]);

  const handleSave = async () => {
    if (confirm("Are you sure you want to save?")) {
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
