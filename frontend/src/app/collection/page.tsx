"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import WatchCard from "@/components/WatchCard";
import { ChevronDown } from "lucide-react";

const FALLBACK_WATCHES = [
  { id: 1, name: "Speedmaster Moonwatch Professional", brand: "Omega", price: 72000, image: "/omega-speedmaster.jpg" },
  { id: 2, name: "Nautilus Heritage", brand: "Patek Philippe", price: 145000, image: "/patek-nautilus.png" },
  { id: 3, name: "Submariner 'Diamond' Date", brand: "Rolex", price: 68500, image: "/rolex-submariner.jpg" },
  { id: 5, name: "Lange 1", brand: "A. Lange & Söhne", price: 42000, image: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?q=80&w=800" },
  { id: 6, name: "Tank Louis", brand: "Cartier", price: 13500, image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=800" },
];

const SORT_OPTIONS = [
  { label: "Newest Arrivals", value: "newest" },
  { label: "Price: High to Low", value: "price-high" },
  { label: "Price: Low to High", value: "price-low" },
];

export default function CollectionPage() {
  const [watches, setWatches] = useState(FALLBACK_WATCHES);
  const [filteredWatches, setFilteredWatches] = useState(FALLBACK_WATCHES);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All Makes");
  const [sortBy, setSortBy] = useState(SORT_OPTIONS[0]);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("http://localhost:5005/watches")
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.length > 0) {
          const apiWatches = data.data.map((w: any) => ({
            ...w,
            image: w.name?.toLowerCase().includes('speedmaster') 
              ? "/omega-speedmaster.jpg" 
              : w.name?.toLowerCase().includes('nautilus')
              ? "/patek-nautilus.png"
              : w.name?.toLowerCase().includes('submariner')
              ? "/rolex-submariner.jpg"
              : w.image || w.images?.[0]?.url
          }));
          setWatches(apiWatches);
        }
      })
      .catch(err => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let updated = [...watches];

    // Filter
    if (activeCategory !== "All Makes") {
      updated = updated.filter(w => {
        if (activeCategory === "AP") return w.brand === "Audemars Piguet";
        if (activeCategory === "Patek") return w.brand === "Patek Philippe";
        return w.brand === activeCategory;
      });
    }

    // Sort
    if (sortBy.value === "price-high") {
      updated.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy.value === "price-low") {
      updated.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else {
      updated.sort((a, b) => (b.id || 0) - (a.id || 0));
    }

    setFilteredWatches(updated);
  }, [activeCategory, sortBy, watches]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="pt-36 pb-24 px-6 min-h-screen bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-extralight tracking-tight text-[#1a1a1a] uppercase font-cormorant"
          >
            The Full <span className="text-[#cfa864] font-normal">Collection</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-500 tracking-widest uppercase text-xs mt-6"
          >
            Explore our vast curation of heritage timepieces
          </motion.p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-16 border-b border-black/10 pb-6 gap-6 relative z-50">
          <div className="flex gap-10 text-sm uppercase tracking-[0.1em] font-medium text-gray-400 font-outfit">
            {["All Makes", "Rolex", "Patek", "AP"].map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`transition-all duration-500 relative pb-1 ${
                  activeCategory === cat ? "text-[#1a1a1a]" : "hover:text-[#1a1a1a]"
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.div 
                    layoutId="activeCategory"
                    className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-[#cfa864]"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4" ref={sortRef}>
            <span className="text-xs uppercase tracking-[0.05em] text-gray-400 font-medium font-outfit">Sort By:</span>
            <div className="relative min-w-[200px]">
              <button 
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="w-full glass border border-black/5 rounded-xl px-6 py-4 text-sm uppercase tracking-[0.05em] text-[#1a1a1a] flex justify-between items-center hover:border-[#cfa864]/30 transition-all duration-300 shadow-sm font-medium font-outfit"
              >
                {sortBy.label}
                <ChevronDown size={14} className={`transition-transform duration-500 ${isSortOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isSortOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-2 w-full glass border border-black/5 rounded-2xl p-2 shadow-2xl overflow-hidden z-50"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => { setSortBy(opt); setIsSortOpen(false); }}
                        className={`w-full text-left px-4 py-4 rounded-xl text-sm uppercase tracking-[0.05em] transition-all duration-300 font-outfit ${
                          sortBy.value === opt.value 
                            ? "bg-[#cfa864] text-white font-semibold" 
                            : "text-gray-500 hover:bg-black/5 hover:text-[#1a1a1a]"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        
        {loading ? (
             <div className="flex justify-center items-center h-48">
               <div className="text-[#cfa864] tracking-[0.3em] uppercase text-xs animate-pulse">Accessing Vault...</div>
             </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full"
          >
            <AnimatePresence mode="popLayout">
              {filteredWatches.map((watch, i) => (
                <motion.div
                  key={watch.id || i}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <WatchCard watch={watch} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
