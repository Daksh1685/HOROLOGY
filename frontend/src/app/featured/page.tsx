"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import WatchCard from "@/components/WatchCard";

const FALLBACK_WATCHES = [
  { id: 1, name: "Speedmaster Moonwatch Professional", brand: "Omega", price: 72000, image: "/omega-speedmaster.jpg" },
  { id: 2, name: "Nautilus Heritage", brand: "Patek Philippe", price: 145000, image: "/patek-nautilus.png" },
  { id: 3, name: "Submariner 'Diamond' Date", brand: "Rolex", price: 68500, image: "/rolex-submariner.jpg" },
  { id: 4, name: "Royal Oak 'Jumbo' Extra-Thin", brand: "Audemars Piguet", price: 85000, image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=800" },
  { id: 5, name: "Overseas Dual Time", brand: "Vacheron Constantin", price: 32000, image: "https://images.unsplash.com/photo-1524592094714-cb9c5a4d5d34?q=80&w=800" },
  { id: 6, name: "RM 67-02 High Jump", brand: "Richard Mille", price: 245000, image: "https://images.unsplash.com/photo-1547996160-81dfa63595ee?q=80&w=800" },
];

const PREFERRED_ORDER = ["Omega", "Patek Philippe", "Rolex", "Audemars Piguet", "Vacheron Constantin", "Richard Mille"];

export default function FeaturedPage() {
  const [watches, setWatches] = useState(FALLBACK_WATCHES);
  const [loading, setLoading] = useState(true);

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
                : w.brand === 'Audemars Piguet'
                  ? "/ap-jumbo.jpg"
                  : w.brand === 'Vacheron Constantin'
                    ? "/vc-overseas.jpg"
                    : w.brand === 'Richard Mille'
                      ? "/rm-67.jpg"
                      : w.image || w.images?.[0]?.url
          }));

          // Force the preferred order
          const sorted = [...apiWatches].sort((a, b) => {
            const indexA = PREFERRED_ORDER.indexOf(a.brand);
            const indexB = PREFERRED_ORDER.indexOf(b.brand);
            return (indexA === -1 ? 99 : indexA) - (indexB === -1 ? 99 : indexB);
          });

          setWatches(sorted);
        }
      })
      .catch(err => console.log("Backend not reachable or empty. Using fallback watches.", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="pt-36 pb-24 px-6 min-h-screen bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[30vw] rounded-full bg-[#cfa864]/5 blur-[100px] pointer-events-none" />
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extralight tracking-widest text-[#1a1a1a] uppercase relative z-10"
          >
            Featured <span className="text-[#cfa864] font-normal">Exclusives</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-500 tracking-widest uppercase text-xs mt-6 relative z-10"
          >
            This month's highly sought-after acquisitions
          </motion.p>
          <div className="flex justify-center mt-12">
            <div className="h-px w-24 bg-gray-300" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#cfa864] mx-4" />
            <div className="h-px w-24 bg-gray-300" />
          </div>
        </div>
        
        {loading ? (
           <div className="flex justify-center items-center h-48">
             <div className="text-[#cfa864] tracking-[0.3em] uppercase text-xs animate-pulse">Curating Exclusives...</div>
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {watches.map((watch, i) => (
              <WatchCard key={watch.id || i} watch={watch} index={i} />
            ))}
          </div>
        )}

        {/* Editorial Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mt-32 p-12 md:p-20 glass border border-black/5 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#cfa864]/5 blur-[80px]" />
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#cfa864] mb-6">Curator's Note</p>
            <h2 className="text-3xl font-light tracking-widest text-[#1a1a1a] uppercase mb-8 leading-relaxed">
              "An acquisition is not merely a transaction. It is the beginning of a stewardship."
            </h2>
            <p className="text-gray-600 font-light text-sm leading-loose tracking-wide">
              The timepieces featured above represent the pinnacle of horological achievement. These are not watches you simply wear; they are mechanical marvels that tell a story of dedication, precision, and artistry. Each piece has been authenticated, inspected, and curated by our master horologists to ensure absolute perfection before it enters your vault.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
