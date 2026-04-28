"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock database for articles
const ARTICLES_DB: Record<string, any> = {
  "mastering-the-tourbillon": {
    title: "Mastering the Tourbillon",
    date: "May 10, 2026",
    author: "Jean-Claude Biver",
    image: "/breguet-tourbillon.jpg",
    content: [
      "The tourbillon, patented by Abraham-Louis Breguet in 1801, was originally designed to counter the effects of gravity on the escapement in pocket watches. Today, it stands as one of the most prestigious complications in haute horlogerie.",
      "A tourbillon houses the balance wheel and escapement in a rotating cage, typically completing one full rotation per minute. This constant rotation averages out positional errors, theoretically improving chronometric performance.",
      "However, in modern wristwatches, the tourbillon serves less as a functional necessity and more as a breathtaking display of micro-mechanical virtuosity. Crafting a tourbillon cage, which often weighs less than half a gram yet comprises over 70 meticulously hand-finished components, remains a true test of a master watchmaker's skill."
    ]
  },
  "the-art-of-guilloche": {
    title: "The Art of Guilloché",
    date: "May 18, 2026",
    author: "Kari Voutilainen",
    image: "/art-of-guilloche.jpg",
    content: [
      "Guilloché, or engine turning, is a decorative technique in which a very precise, intricate and repetitive pattern is mechanically engraved into an underlying material via engine turning.",
      "The technique uses a rose engine lathe, a machine that is entirely manually operated. The artisan uses their left hand to guide the piece against the cutting tool, while their right hand applies exactly the right amount of pressure.",
      "The resulting dials play with light in a way that no stamped dial ever could. From traditional Clous de Paris to complex moiré patterns, hand-guilloché remains a hallmark of true independent watchmaking."
    ]
  },
  "independent-watchmaking": {
    title: "Independent Watchmaking",
    date: "June 2, 2026",
    author: "Maximilian Büsser",
    image: "/independent-watchmaking.jpg",
    content: [
      "The horological landscape has seen a profound shift over the last two decades. While massive luxury conglomerates continue to dominate market share, the true soul of watchmaking is arguably being preserved by the independents.",
      "Freed from corporate constraints and shareholder expectations, independent watchmakers like F.P. Journe, Rexhep Rexhepi, and MB&F have pushed the boundaries of both mechanical innovation and artistic expression.",
      "Collectors are increasingly drawn to these artisans not just for the exclusivity of their extremely low production numbers, but for the uncompromising hand-finishing and personal philosophy imbued in every timepiece."
    ]
  }
};

export default function ArticlePage() {
  const params = useParams();
  const slug = params.id as string;
  const article = ARTICLES_DB[slug];

  if (!article) {
    return (
      <div className="min-h-screen pt-40 px-6 text-center">
        <h1 className="text-3xl font-light tracking-widest text-[#1a1a1a]">Article Not Found</h1>
        <Link href="/journal" className="text-[#cfa864] mt-8 inline-block hover:text-[#b38b4d]">← Return to Journal</Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#fdfbf7]">
      {/* Hero Image */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full h-[50vh] relative mb-16"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#fdfbf7] via-transparent to-black/20" />
      </motion.div>

      {/* Content Container */}
      <div className="max-w-3xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-gray-300" />
            <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">{article.date}</p>
            <div className="h-[1px] w-12 bg-gray-300" />
          </div>
          <h1 className="text-4xl md:text-6xl font-light text-[#1a1a1a] mb-6 tracking-widest uppercase leading-tight">
            {article.title}
          </h1>
          <p className="text-sm tracking-[0.2em] uppercase text-[#cfa864] font-semibold">
            By {article.author}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="prose prose-lg prose-gray max-w-none"
        >
          {article.content.map((paragraph: string, i: number) => (
            <p key={i} className="text-gray-600 font-light leading-loose mb-8 text-lg">
              {paragraph}
            </p>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 pt-12 border-t border-gray-200 text-center"
        >
          <Link href="/journal" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#1a1a1a] hover:text-[#cfa864] transition-colors">
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Journal
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
