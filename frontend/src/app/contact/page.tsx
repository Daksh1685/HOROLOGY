"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, MoveRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { API_BASE_URL } from "@/lib/api";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call for now, or use the same inquiry endpoint
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      firstName: formData.get("name")?.toString().split(" ")[0] || "Client",
      lastName: formData.get("name")?.toString().split(" ")[1] || "Contact",
      email: formData.get("email"),
      phone: "N/A",
      timepiece: "General Inquiry",
      details: formData.get("message"),
    };

    try {
      const res = await fetch(`/api/inquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      
      if (res.ok && result.success) {
        setSubmitted(true);
      } else {
        alert(result.message || "Failed to send message. Please try again later.");
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to send message. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-36 pb-24 px-6 bg-[#fdfbf7] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[60vw] h-[60vw] rounded-full bg-[#cfa864]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#cfa864] text-[10px] uppercase tracking-[0.4em] font-bold mb-4 block"
          >
            Get in Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extralight tracking-widest text-[#1a1a1a] uppercase"
          >
            Contact <span className="font-normal text-[#cfa864]">US</span>
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-12"
          >
            <div className="glass p-10 rounded-[2.5rem] border border-black/5 shadow-xl">
              <h2 className="text-xl font-light tracking-[0.2em] uppercase text-[#1a1a1a] mb-8 border-b border-black/5 pb-6">Headquarters</h2>
              <div className="space-y-8">
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-black/5 flex items-center justify-center text-[#cfa864] shadow-sm">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Visit Us</p>
                    <p className="text-[#1a1a1a] font-light leading-relaxed">
                      Park Street, <br />
                      Kolkata, West Bengal, India
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-black/5 flex items-center justify-center text-[#cfa864] shadow-sm">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Direct Email</p>
                    <p className="text-[#1a1a1a] font-light">dakshchaurasia18@gmail.com</p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-black/5 flex items-center justify-center text-[#cfa864] shadow-sm">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Private Line</p>
                    <p className="text-[#1a1a1a] font-light">+91 9330344975</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass p-10 rounded-[2.5rem] border border-black/5 shadow-xl">
              <h2 className="text-xl font-light tracking-[0.2em] uppercase text-[#1a1a1a] mb-8 border-b border-black/5 pb-6">Consultation Hours</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-light uppercase tracking-widest">Monday - Friday</span>
                  <span className="text-[#1a1a1a] font-medium">09:00 - 18:00 IST</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-light uppercase tracking-widest">Saturday</span>
                  <span className="text-[#1a1a1a] font-medium">10:00 - 16:00 IST</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-light uppercase tracking-widest">Sunday</span>
                  <span className="text-[#cfa864] font-medium italic">By Private Appointment Only</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {submitted ? (
              <div className="glass p-16 rounded-[2.5rem] border border-black/5 shadow-2xl text-center h-full flex flex-col justify-center items-center">
                <div className="w-20 h-20 rounded-full bg-[#cfa864]/20 flex items-center justify-center mb-8">
                  <div className="w-10 h-10 rounded-full bg-[#cfa864] flex items-center justify-center">
                    <CheckIcon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h2 className="text-3xl font-light tracking-widest text-[#1a1a1a] mb-4 uppercase">Message Sent</h2>
                <p className="text-gray-600 font-light leading-loose tracking-wide">
                  Your message has been received. Our concierge team will reach out to you within 24 business hours.
                </p>
              </div>
            ) : (
              <div className="glass p-10 md:p-12 rounded-[3rem] border border-black/5 shadow-2xl">
                <h2 className="text-2xl font-light tracking-[0.2em] uppercase text-[#1a1a1a] mb-10">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div>
                    <label className="block text-[10px] text-gray-600 uppercase tracking-[0.3em] mb-3 font-semibold">Full Name</label>
                    <input
                      name="name"
                      required
                      type="text"
                      className="w-full bg-white border border-black/10 rounded-2xl px-6 py-4 text-[#1a1a1a] focus:outline-none focus:border-[#cfa864] transition-all shadow-sm"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-600 uppercase tracking-[0.3em] mb-3 font-semibold">Email Address</label>
                    <input
                      name="email"
                      required
                      type="email"
                      className="w-full bg-white border border-black/10 rounded-2xl px-6 py-4 text-[#1a1a1a] focus:outline-none focus:border-[#cfa864] transition-all shadow-sm"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-600 uppercase tracking-[0.3em] mb-3 font-semibold">Message</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      className="w-full bg-white border border-black/10 rounded-2xl px-6 py-4 text-[#1a1a1a] focus:outline-none focus:border-[#cfa864] transition-all shadow-sm resize-none"
                      placeholder="How can we assist you today?"
                    />
                  </div>
                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full bg-[#1a1a1a] text-white hover:bg-[#cfa864] transition-all duration-700 py-5 rounded-2xl text-[10px] uppercase tracking-[0.4em] font-bold flex justify-center items-center gap-4 group shadow-xl"
                  >
                    {loading ? (
                      <>Processing <Loader2 size={18} className="animate-spin" /></>
                    ) : (
                      <>Send Message <MoveRight size={18} className="group-hover:translate-x-2 transition-transform" /></>
                    )}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
