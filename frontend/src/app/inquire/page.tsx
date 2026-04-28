"use client";

import { motion } from "framer-motion";
import { MoveRight, Loader2 } from "lucide-react";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { API_BASE_URL } from "@/lib/api";

function InquireForm() {
  const searchParams = useSearchParams();
  const watchParam = searchParams.get("watch") || "";

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      timepiece: formData.get("timepiece"),
      details: formData.get("details"),
    };

    try {
      const res = await fetch(`${API_BASE_URL}/inquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      const result = await res.json();
      
      if (res.ok && result.success) {
        setSubmitted(true);
      } else {
        setError(result.message || `The vault returned an error (${res.status}). Please try again later.`);
      }
    } catch (err) {
      console.error("Submission error:", err);
      setError("Unable to connect to the advisory vault. Please ensure the backend server is running on port 5005.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl mx-auto glass rounded-3xl p-16 text-center border border-black/5 shadow-2xl mt-12"
      >
        <div className="w-16 h-16 rounded-full bg-[#cfa864]/20 flex items-center justify-center mx-auto mb-8">
          <div className="w-8 h-8 rounded-full bg-[#cfa864] flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h2 className="text-3xl font-light tracking-widest text-[#1a1a1a] mb-4 uppercase">Request Received</h2>
        <p className="text-gray-600 font-light leading-loose tracking-wide">
          Our private advisory team will review your acquisition request and contact you shortly to arrange a consultation.
          We appreciate your interest in Horology.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      onSubmit={handleSubmit}
      className="w-full max-w-3xl mx-auto mt-16 glass rounded-3xl p-8 md:p-12 border border-black/5 shadow-xl"
    >
      {error && (
        <div className="mb-8 p-4 bg-red-50 text-red-500 rounded-xl text-xs uppercase tracking-widest text-center border border-red-100">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-6">
          <div>
            <label className="block text-[10px] text-gray-600 uppercase tracking-[0.2em] mb-2 font-semibold">First Name *</label>
            <input name="firstName" required type="text" className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-[#1a1a1a] text-sm focus:outline-none focus:border-[#cfa864] transition-colors shadow-sm" placeholder="First Name" />
          </div>
          <div>
            <label className="block text-[10px] text-gray-600 uppercase tracking-[0.2em] mb-2 font-semibold">Last Name *</label>
            <input name="lastName" required type="text" className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-[#1a1a1a] text-sm focus:outline-none focus:border-[#cfa864] transition-colors shadow-sm" placeholder="Last Name" />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-[10px] text-gray-600 uppercase tracking-[0.2em] mb-2 font-semibold">Email Address *</label>
            <input name="email" required type="email" className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-[#1a1a1a] text-sm focus:outline-none focus:border-[#cfa864] transition-colors shadow-sm" placeholder="Email Address" />
          </div>
          <div>
            <label className="block text-[10px] text-gray-600 uppercase tracking-[0.2em] mb-2 font-semibold">Phone Number</label>
            <input name="phone" type="tel" className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-[#1a1a1a] text-sm focus:outline-none focus:border-[#cfa864] transition-colors shadow-sm" placeholder="Enter phone number" />
          </div>
        </div>
      </div>

      <div className="mb-8">
        <label className="block text-[10px] text-gray-600 uppercase tracking-[0.2em] mb-2 font-semibold">Timepiece of Interest *</label>
        <input
          name="timepiece"
          required
          type="text"
          defaultValue={watchParam}
          className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-[#1a1a1a] text-sm focus:outline-none focus:border-[#cfa864] transition-colors shadow-sm"
          placeholder="e.g. Royal Oak Offshore, Reference 15400ST"
        />
      </div>

      <div className="mb-10">
        <label className="block text-[10px] text-gray-600 uppercase tracking-[0.2em] mb-2 font-semibold">Additional Details or Inquiries</label>
        <textarea
          name="details"
          rows={4}
          className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-[#1a1a1a] text-sm focus:outline-none focus:border-[#cfa864] transition-colors shadow-sm resize-none"
          placeholder="Please share any specific requirements, boutique preferences, or questions regarding the acquisition."
        />
      </div>

      <div className="text-center">
        <button 
          disabled={loading}
          type="submit" 
          className="bg-[#1a1a1a] text-white hover:bg-[#cfa864] disabled:bg-gray-400 transition-all duration-500 py-4 px-12 rounded-full text-xs uppercase tracking-[0.2em] font-semibold inline-flex items-center gap-3 group shadow-lg"
        >
          {loading ? (
            <>Encrypting Inquiry <Loader2 size={16} className="animate-spin" /></>
          ) : (
            <>Submit Inquiry <MoveRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
          )}
        </button>
        <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-6">
          Your information is secure and confidential.
        </p>
      </div>
    </motion.form>
  );
}

export default function InquirePage() {
  return (
    <div className="min-h-screen pt-36 pb-24 px-6 bg-[#fdfbf7] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full bg-[#cfa864]/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extralight tracking-widest text-[#1a1a1a] mb-4 uppercase"
          >
            Acquisition <span className="font-normal text-[#cfa864]">Advisory</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600 font-light text-sm tracking-widest uppercase max-w-2xl mx-auto leading-relaxed"
          >
            Register your interest to acquire a distinguished timepiece.
            Our advisors will assist you through the private allocation process.
          </motion.p>
        </div>

        <Suspense fallback={<div className="text-center mt-20 text-[#cfa864] uppercase tracking-widest text-xs">Loading Secure Form...</div>}>
          <InquireForm />
        </Suspense>
      </div>
    </div>
  );
}
