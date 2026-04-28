"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const ARTICLES = [
  {
    slug: "mastering-the-tourbillon",
    title: "Mastering the Tourbillon",
    date: "May 10, 2026",
    excerpt: "An exploration into one of the most mesmerizing and complex horological inventions created by Abraham-Louis Breguet in 1801, defying gravity itself.",
    image: "/breguet-tourbillon.jpg"
  },
  {
    slug: "the-art-of-guilloche",
    title: "The Art of Guilloché",
    date: "May 18, 2026",
    excerpt: "Discover the painstaking centuries-old engine-turning technique used to create the incredibly intricate, textured dials of Haute Horlogerie.",
    image: "/art-of-guilloche.jpg"
  },
  {
    slug: "independent-watchmaking",
    title: "Independent Watchmaking",
    date: "June 2, 2026",
    excerpt: "How modern artisanal watchmakers are preserving the soul of hand-finished watchmaking against industrial mass-production.",
    image: "/independent-watchmaking.jpg"
  }
];

export default function JournalPage() {
  return (
    <div className="pt-36 pb-24 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extralight tracking-widest text-[#1a1a1a] uppercase"
          >
            The <span className="text-[#cfa864] font-normal">Journal</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-500 tracking-widest text-xs mt-6 uppercase"
          >
            Articles, News, and Essays on Timekeeping
          </motion.p>
        </div>

        <div className="flex flex-col gap-12 max-w-5xl mx-auto">
          {ARTICLES.map((item, i) => (
            <Link key={item.title} href={`/journal/${item.slug}`}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-6 md:p-10 rounded-3xl hover:border-[#cfa864]/40 transition-all cursor-pointer flex flex-col md:flex-row gap-10 items-center group shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="w-full md:w-5/12 h-64 bg-gray-100 rounded-2xl overflow-hidden relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-6 left-6 text-[10px] text-[#cfa864] font-semibold uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/90 px-3 py-1 rounded-full shadow-sm">Read Article →</div>
                </div>
                <div className="w-full md:w-7/12">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-[1px] w-8 bg-gray-300 group-hover:w-16 group-hover:bg-[#cfa864] transition-all duration-500" />
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">{item.date}</p>
                  </div>
                  <h2 className="text-3xl font-light text-[#1a1a1a] mb-6 tracking-widest uppercase">{item.title}</h2>
                  <p className="text-gray-600 font-light text-sm md:text-base leading-loose mb-6">
                    {item.excerpt}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
