"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MoveRight, Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import { API_BASE_URL } from "@/lib/api";

function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const firstName = (e.target as any).firstName.value;
    const lastName = (e.target as any).lastName.value;
    const email = (e.target as any).email.value;
    const password = (e.target as any).password.value;

    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: `${firstName} ${lastName}`, email, password }),
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
      alert("Registration failed.");
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
        document.cookie = `horology_token=${data.data.token}; path=/; max-age=2592000`;
        document.cookie = "horology_auth=true; path=/; max-age=2592000";
        const callbackUrl = searchParams.get("callbackUrl") || "/collection";
        router.push(callbackUrl);
        setTimeout(() => window.location.reload(), 100);
      }
    } catch (err) {
      alert("Google sync failed.");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).google) {
      (window as any).google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID, 
        callback: handleGoogleCallback,
      });
      (window as any).google.accounts.id.renderButton(
        document.getElementById("googleSignUpButton"),
        { theme: "outline", size: "large", text: "signup_with", width: 400 }
      );
    }
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-md glass rounded-3xl p-10 relative z-10 border border-black/5 shadow-2xl"
    >
      <div className="text-center mb-10">
        <h1 className="text-3xl font-light tracking-widest text-[#1a1a1a] mb-2 uppercase">Create Account</h1>
        <p className="text-gray-600 text-xs tracking-widest uppercase">Join our exclusive society</p>
      </div>

      <form className="flex flex-col gap-5" onSubmit={handleSignUp}>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-[10px] text-gray-600 uppercase tracking-[0.2em] mb-2 font-semibold">First Name</label>
            <input 
              type="text" 
              name="firstName"
              required
              className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-[#1a1a1a] text-sm focus:outline-none focus:border-[#cfa864] transition-colors shadow-sm"
              placeholder="First"
            />
          </div>
          <div className="flex-1">
            <label className="block text-[10px] text-gray-600 uppercase tracking-[0.2em] mb-2 font-semibold">Last Name</label>
            <input 
              type="text" 
              name="lastName"
              required
              className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-[#1a1a1a] text-sm focus:outline-none focus:border-[#cfa864] transition-colors shadow-sm"
              placeholder="Last"
            />
          </div>
        </div>
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
        
        <button className="w-full bg-[#1a1a1a] text-white hover:bg-[#cfa864] transition-all duration-500 py-4 rounded-xl text-xs uppercase tracking-[0.2em] font-semibold flex justify-center items-center gap-2 group mt-4 shadow-md">
          Sign Up <MoveRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </form>

      <div className="my-6 flex items-center gap-4">
        <div className="h-[1px] flex-1 bg-black/10" />
        <span className="text-xs text-gray-500 uppercase tracking-widest">Or</span>
        <div className="h-[1px] flex-1 bg-black/10" />
      </div>

      <div id="googleSignUpButton" className="w-full flex justify-center" />

      <div className="mt-8 text-center">
        <p className="text-xs text-gray-500 tracking-wider">
          Already have an account? <Link href="/login" className="text-[#1a1a1a] hover:text-[#cfa864] transition-colors ml-1 uppercase font-semibold">Sign In</Link>
        </p>
      </div>
    </motion.div>
  );
}

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-12 px-6 relative overflow-hidden bg-transparent">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full bg-[#cfa864]/5 blur-[120px] pointer-events-none" />
      <Suspense fallback={<div className="text-[#cfa864] uppercase tracking-widest text-xs">Loading Security...</div>}>
        <SignUpForm />
      </Suspense>
    </div>
  );
}
