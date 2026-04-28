"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { MoveRight, Eye, EyeOff, Check, Lock } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import { API_BASE_URL } from "@/lib/api";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [needsPassword, setNeedsPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [setupToken, setSetupToken] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = (e.target as any).email.value;
    const password = (e.target as any).password.value;

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        document.cookie = `horology_token=${data.data.token}; path=/; max-age=2592000`;
        document.cookie = "horology_auth=true; path=/; max-age=2592000";
        const callbackUrl = searchParams.get("callbackUrl") || "/collection";
        router.push(callbackUrl);
        setTimeout(() => window.location.reload(), 100);
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Connection to vault failed.");
    }
  };

  const handlePasswordSetup = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/user/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${setupToken}`
        },
        body: JSON.stringify({ password: newPassword }),
      });
      const data = await res.json();
      if (data.success) {
        document.cookie = `horology_token=${setupToken}; path=/; max-age=2592000`;
        document.cookie = "horology_auth=true; path=/; max-age=2592000";
        const callbackUrl = searchParams.get("callbackUrl") || "/collection";
        router.push(callbackUrl);
        setTimeout(() => window.location.reload(), 100);
      }
    } catch (err) {
      alert("Security setup failed.");
    }
  };

  const handleGoogleCallback = async (response: any) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: response.credential }),
      });
      const data = await res.json();
      if (data.success) {
        if (data.data.needsPassword) {
          setSetupToken(data.data.token);
          setNeedsPassword(true);
        } else {
          document.cookie = `horology_token=${data.data.token}; path=/; max-age=2592000`;
          document.cookie = "horology_auth=true; path=/; max-age=2592000";
          const callbackUrl = searchParams.get("callbackUrl") || "/collection";
          router.push(callbackUrl);
          setTimeout(() => window.location.reload(), 100);
        }
      }
    } catch (err) {
      alert("Google sync failed.");
    }
  };

  useEffect(() => {
    const initGoogle = () => {
      if ((window as any).google) {
        (window as any).google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
          callback: handleGoogleCallback,
        });
        (window as any).google.accounts.id.renderButton(
          document.getElementById("googleSignInButton"),
          { theme: "outline", size: "large", text: "continue_with", width: 350 }
        );
      }
    };

    // Try immediately
    initGoogle();

    // Also set an interval in case it loads later
    const interval = setInterval(() => {
      if ((window as any).google) {
        initGoogle();
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <AnimatePresence>
        {needsPassword && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-[2.5rem] p-12 max-w-md w-full shadow-2xl border border-black/5"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[#cfa864]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lock className="text-[#cfa864]" size={32} />
                </div>
                <h2 className="text-2xl font-light tracking-tight text-[#1a1a1a] mb-2 uppercase">Secure Your Vault</h2>
                <p className="text-gray-500 text-xs tracking-widest leading-relaxed">Create a password to allow future access via email ID.</p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-3">New Password</label>
                  <input 
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-black/5 border border-black/5 rounded-xl px-6 py-4 text-[#1a1a1a] focus:outline-none focus:border-[#cfa864] transition-all shadow-inner"
                  />
                </div>
                <button 
                  onClick={handlePasswordSetup}
                  className="w-full bg-[#1a1a1a] text-white py-5 rounded-xl text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[#cfa864] transition-all duration-500 shadow-xl flex items-center justify-center gap-3"
                >
                  <Check size={16} />
                  Complete Account Setup
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md glass rounded-3xl p-10 relative z-10 border border-black/5 shadow-2xl"
      >
      <div className="text-center mb-10">
        <h1 className="text-3xl font-light tracking-widest text-[#1a1a1a] mb-2 uppercase">Welcome Back</h1>
        <p className="text-gray-600 text-xs tracking-widest uppercase">Access your collection</p>
      </div>

      <form className="flex flex-col gap-6" onSubmit={handleLogin}>
        <div>
          <label className="block text-[10px] text-gray-600 uppercase tracking-[0.2em] mb-2 font-semibold">Email Address</label>
          <input 
            type="email" 
            name="email"
            required
            className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-[#1a1a1a] text-sm focus:outline-none focus:border-[#cfa864] transition-colors shadow-sm"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className="block text-[10px] text-gray-600 uppercase tracking-[0.2em] mb-2 font-semibold">Password</label>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              name="password"
              required
              className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-[#1a1a1a] text-sm focus:outline-none focus:border-[#cfa864] transition-colors shadow-sm pr-12"
              placeholder="••••••••"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#cfa864] transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="accent-[#cfa864]" />
            <span className="text-xs text-gray-600 tracking-wider">Remember me</span>
          </label>
          <Link href="#" className="text-xs text-[#cfa864] hover:text-[#1a1a1a] transition-colors tracking-wider">Forgot Password?</Link>
        </div>

        <button className="w-full bg-[#1a1a1a] text-white hover:bg-[#cfa864] transition-all duration-500 py-4 rounded-xl text-xs uppercase tracking-[0.2em] font-semibold flex justify-center items-center gap-2 group mt-2 shadow-md">
          Sign In <MoveRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </form>

      <div className="my-8 flex items-center gap-4">
        <div className="h-[1px] flex-1 bg-black/10" />
        <span className="text-xs text-gray-500 uppercase tracking-widest">Or</span>
        <div className="h-[1px] flex-1 bg-black/10" />
      </div>

      <div id="googleSignInButton" className="w-full flex justify-center" />

      <div className="mt-8 text-center">
        <p className="text-xs text-gray-500 tracking-wider">
          Don't have an account? <Link href="/signup" className="text-[#1a1a1a] hover:text-[#cfa864] transition-colors ml-1 uppercase font-semibold">Sign Up</Link>
        </p>
      </div>
    </motion.div>
    </>
  );
}

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-12 px-6 relative overflow-hidden bg-transparent">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full bg-[#cfa864]/5 blur-[120px] pointer-events-none" />
      <Suspense fallback={<div className="text-[#cfa864] uppercase tracking-widest text-xs">Loading Security...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
