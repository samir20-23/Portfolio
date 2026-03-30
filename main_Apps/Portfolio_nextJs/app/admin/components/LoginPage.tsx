"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiLoader, FiZap, FiLock } from "react-icons/fi";
import { toast } from "react-hot-toast";

interface LoginPageProps {
  onLogin: (e: React.FormEvent) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setIsLoading(false);
    
    if (
      loginData.username === "samir" && loginData.password === "barca" ||
      loginData.username === "admin" && loginData.password === "admin" ||
      loginData.username === "samir" && loginData.password === "samir"
    ) {
      onLogin(e);
    } else {
      setShake(true);
      toast.error("Invalid credentials, please try again");
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(ellipse at 20% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
            "radial-gradient(ellipse at 80% 80%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)",
            "radial-gradient(ellipse at 50% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)",
            "radial-gradient(ellipse at 20% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
          ]
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative w-full max-w-md"
      >
        <motion.div
          animate={shake ? { x: [0, -15, 15, -15, 15, 0] } : {}}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-2xl rounded-[2rem] p-1 border border-white/20 shadow-2xl"
        >
          <div className="bg-slate-900/95 backdrop-blur-xl rounded-[1.9rem] p-8">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/30"
            >
              <FiLock size={36} className="text-white" />
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
                    placeholder="Enter your username..."
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
                    placeholder="Enter your password..."
                  />
                </motion.div>
              </motion.div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-extrabold transition-all shadow-xl shadow-blue-500/30 flex items-center justify-center gap-2 disabled:opacity-50"
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

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/10"
            >
              <p className="text-center text-slate-400 text-xs mb-2">Development Mode Access</p>
              <div className="flex justify-center gap-4 text-[10px] text-slate-500 font-mono">
                <span>samir / barca</span>
                <span>•</span>
                <span>admin / admin</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
