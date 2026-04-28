"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    
    // Check if logged in
    const checkAuth = () => {
      setIsLoggedIn(document.cookie.includes("horology_auth=true"));
    };
    checkAuth();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = () => {
    document.cookie = "horology_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "glass py-4 shadow-sm" : "bg-transparent py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-light tracking-widest text-[#1a1a1a] hover:text-[#cfa864] transition-colors">
          HOROLOGY
        </Link>
        
        <nav className="hidden md:flex items-center gap-10 text-xs font-medium uppercase tracking-[0.2em] text-gray-600 font-outfit">
          <Link href="/featured" className="hover:text-[#1a1a1a] transition-colors duration-300">Featured</Link>
          <Link href="/houses" className="hover:text-[#1a1a1a] transition-colors duration-300">Houses</Link>
          <Link href="/philosophy" className="hover:text-[#1a1a1a] transition-colors duration-300">Philosophy</Link>
          <Link href="/journal" className="hover:text-[#1a1a1a] transition-colors duration-300">Journal</Link>
          <Link href="/contact" className="hover:text-[#1a1a1a] transition-colors duration-300">Contact</Link>
          {isLoggedIn ? (
            <Link 
              href="/profile"
              className="flex items-center gap-2 hover:text-[#cfa864] text-gray-600 transition-colors duration-300 ml-4 border border-black/10 px-6 py-2 rounded-full uppercase tracking-[0.2em]"
            >
              <User size={14} />
              My Profile
            </Link>
          ) : (
            <Link href="/login" className="hover:text-[#cfa864] text-[#cfa864] transition-colors duration-300 ml-4 border border-[#cfa864]/30 px-6 py-2 rounded-full">Sign In</Link>
          )}
        </nav>

        <button 
          className="md:hidden text-[#1a1a1a]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            className="absolute top-full left-0 w-full glass flex flex-col p-6 gap-4 md:hidden border-b border-black/5 font-outfit"
          >
            <Link onClick={() => setMobileMenuOpen(false)} href="/featured" className="hover:text-[#cfa864] text-[#1a1a1a] text-sm tracking-[0.2em] uppercase py-3 border-b border-black/5">Featured</Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="/houses" className="hover:text-[#cfa864] text-[#1a1a1a] text-sm tracking-[0.2em] uppercase py-3 border-b border-black/5">Houses</Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="/philosophy" className="hover:text-[#cfa864] text-[#1a1a1a] text-sm tracking-[0.2em] uppercase py-3 border-b border-black/5">Philosophy</Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="/journal" className="hover:text-[#cfa864] text-[#1a1a1a] text-sm tracking-[0.2em] uppercase py-3 border-b border-black/5">Journal</Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="/contact" className="hover:text-[#cfa864] text-[#1a1a1a] text-sm tracking-[0.2em] uppercase py-3 border-b border-black/5">Contact</Link>
            {isLoggedIn ? (
              <Link 
                onClick={() => setMobileMenuOpen(false)} 
                href="/profile" 
                className="flex items-center gap-3 hover:text-[#cfa864] text-[#1a1a1a] text-sm tracking-[0.2em] uppercase py-3 border-b border-black/5"
              >
                <User size={16} />
                My Profile
              </Link>
            ) : (
              <Link onClick={() => setMobileMenuOpen(false)} href="/login" className="hover:text-[#cfa864] text-[#cfa864] font-semibold text-sm tracking-[0.2em] uppercase py-3">Sign In</Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
