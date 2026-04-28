"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import WatchCard from "@/components/WatchCard";
import ThreeHeroBackground from "@/components/ThreeHeroBackground";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { API_BASE_URL } from "@/lib/api";

// Local image map — always use these for homepage featured watches
const BRAND_IMAGE_MAP: Record<string, string> = {
  "Omega": "/omega-speedmaster.jpg",
  "Patek Philippe": "/patek-nautilus.png",
  "Rolex": "/rolex-submariner.jpg",
  "Audemars Piguet": "/ap-jumbo.jpg",
  "Vacheron Constantin": "/vc-overseas.jpg",
  "Richard Mille": "/rm-67.jpg",
};

// Static fallback data in case API is unreachable
const FALLBACK_WATCHES = [
  { id: 1, name: "Speedmaster Moonwatch Professional", brand: "Omega", price: 72000, image: "/omega-speedmaster.jpg" },
  { id: 2, name: "Nautilus Heritage", brand: "Patek Philippe", price: 145000, image: "/patek-nautilus.png" },
  { id: 3, name: "Submariner 'Diamond' Date", brand: "Rolex", price: 68500, image: "/rolex-submariner.jpg" },
];

const PREFERRED_ORDER = ["Omega", "Patek Philippe", "Rolex"];

export default function Home() {
  const router = useRouter();
  const [watches, setWatches] = useState(FALLBACK_WATCHES);

  useEffect(() => {
    fetch(`${API_BASE_URL}/watches`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.length > 0) {
          const apiWatches = data.data.map((w: any) => ({
            ...w,
            // Always use local image map — never rely on external URLs
            image: BRAND_IMAGE_MAP[w.brand] || FALLBACK_WATCHES[0].image,
          }));

          // Sort to show Omega, Patek, Rolex first
          const sorted = [...apiWatches].sort((a, b) => {
            const indexA = PREFERRED_ORDER.indexOf(a.brand);
            const indexB = PREFERRED_ORDER.indexOf(b.brand);
            return (indexA === -1 ? 99 : indexA) - (indexB === -1 ? 99 : indexB);
          });

          setWatches(sorted.slice(0, 3));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#fdfbf7] via-[#fdfbf7] to-[#f4f2eb] z-0" />
        <ThreeHeroBackground />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[60vw] md:h-[60vw] rounded-full bg-[#cfa864]/10 blur-[120px] z-0 pointer-events-none" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-8xl font-extralight tracking-widest text-[#1a1a1a] mb-6 uppercase leading-tight">
              Time is the <br /><span className="text-gold-gradient font-normal">Ultimate Luxury</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-gray-600 text-sm md:text-base mb-12 max-w-xl mx-auto font-light tracking-widest leading-relaxed uppercase"
          >
            Explore the world's most exquisite timepieces. Crafted with precision, designed for eternity.
          </motion.p>

          <motion.button
            onClick={() => router.push('/collection')}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="glass rounded-full hover:bg-[#1a1a1a] hover:text-white transition-all duration-500 text-[#1a1a1a] px-10 py-4 uppercase tracking-[0.2em] text-xs font-semibold shadow-xl"
          >
            Discover Collection
          </motion.button>
        </div>
      </section>

      {/* Featured Section */}
      <section id="featured" className="py-32 px-6 min-h-screen bg-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-24">
            <h2 className="text-xs font-semibold tracking-[0.4em] uppercase mb-4 text-[#cfa864]">Curated</h2>
            <h3 className="text-3xl md:text-5xl font-light tracking-widest uppercase text-[#1a1a1a]">Featured Timepieces</h3>
            <div className="w-12 h-[1px] bg-gray-300 mt-8" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {watches.map((watch, i) => (
              <WatchCard key={watch.id || i} watch={watch} index={i} />
            ))}
          </div>

          <div className="flex justify-center mt-20">
            <button
              onClick={() => router.push('/featured')}
              className="border-b border-black/20 pb-2 text-xs text-[#1a1a1a] uppercase tracking-[0.2em] hover:text-[#cfa864] hover:border-[#cfa864] transition-all duration-300"
            >
              View All Watches
            </button>
          </div>
        </div>
      </section>

      {/* Houses Section */}
      <section id="houses" className="py-32 px-6 bg-[#f4f2eb] relative overflow-hidden border-y border-black/5">
        <div className="max-w-7xl mx-auto relative z-10 w-full flex flex-col items-center">
          <div className="flex flex-col items-center mb-24">
            <h2 className="text-xs font-semibold tracking-[0.4em] uppercase mb-4 text-[#cfa864]">Heritage</h2>
            <h3 className="text-3xl md:text-5xl font-light tracking-widest uppercase text-[#1a1a1a]">The Great Houses</h3>
            <div className="w-12 h-[1px] bg-black/20 mt-8" />
          </div>

          <div className="w-full flex flex-wrap justify-center gap-16 md:gap-32 items-center opacity-80">
            {['Patek Philippe', 'Rolex', 'Audemars Piguet', 'Vacheron Constantin'].map((house, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                onClick={() => router.push('/houses')}
                className="text-xl md:text-3xl font-light tracking-widest text-gray-500 hover:text-[#cfa864] transition-colors duration-500 cursor-pointer"
              >
                {house}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy / Journal Section */}
      <section id="philosophy" className="py-32 px-6 bg-transparent relative">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            onClick={() => router.push('/philosophy')}
            className="order-2 md:order-1 relative h-[600px] w-full cursor-pointer group"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/patek-grandmaster.png"
              alt="Grandmaster Chime"
              className="w-full h-full object-cover rounded-3xl"
            />
            <div className="absolute inset-0 bg-white/10 rounded-3xl overflow-hidden pointer-events-none" />
            <div className="absolute bottom-8 right-8 glass rounded-2xl p-8 max-w-[300px] border border-black/5 shadow-2xl bg-white/80 backdrop-blur-xl">
              <p className="text-xs tracking-[0.2em] font-light italic leading-loose text-gray-800">
                "We do not merely trace the passage of time; we aim to capture its very essence."
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="order-1 md:order-2 flex flex-col items-start"
          >
            <h2 className="text-xs font-semibold tracking-[0.4em] uppercase mb-4 text-[#cfa864]">Philosophy</h2>
            <h3 className="text-3xl md:text-5xl font-light tracking-widest uppercase text-[#1a1a1a] mb-8">The Art of Horology</h3>
            <p className="text-gray-600 font-light leading-loose mb-10 text-sm tracking-wide">
              True luxury is found in the meticulous attention to detail. Our philosophy is rooted in the preservation of traditional horological craftsmanship, while embracing the forefront of mechanical innovation. Each piece is an heirloom, a testament to human ingenuity.
            </p>
            <button
              onClick={() => router.push('/journal')}
              className="border border-black/20 text-[#1a1a1a] rounded-full hover:bg-[#1a1a1a] hover:text-white px-8 py-4 text-xs uppercase tracking-[0.2em] transition-all duration-500 shadow-lg"
            >
              Read Our Journal
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
