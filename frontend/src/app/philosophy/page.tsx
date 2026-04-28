"use client";

import { motion } from "framer-motion";

const HISTORIES = [
  {
    name: "Cartier Tank",
    year: "1917",
    history: "Inspired by the Renault tanks of WWI, Louis Cartier revolutionized horology by moving away from round pocket watches to create the first purely rectangular wristwatch, defining elegance for a century."
  },
  {
    name: "Rolex Daytona",
    year: "1963",
    history: "Conceived for racing drivers with a highly legible tachymetric bezel. It languished in obscurity until embraced by Paul Newman, cementing its status as the holy grail of sports chronographs."
  },
  {
    name: "AP Royal Oak",
    year: "1972",
    history: "Designed by Gérald Genta overnight. It birthed the 'luxury steel sports watch' category with its exposed octagonal screws and integrated bracelet, shocking the quartz-crisis era."
  },
  {
    name: "Patek Nautilus",
    year: "1976",
    history: "Also penned by Genta to rival the Royal Oak. Modeled after a ship's porthole, its exquisite finishing elevated stainless steel to the price of gold, creating an endless waitlist phenomenon."
  }
];

export default function PhilosophyPage() {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-transparent overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Intro */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-32 relative"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full bg-[#cfa864]/5 blur-[120px] pointer-events-none" />
          <h2 className="text-xs font-semibold tracking-[0.5em] uppercase mb-8 text-[#cfa864] relative z-10 block">Our Ethos</h2>
          <h1 className="text-5xl md:text-7xl font-extralight tracking-widest text-[#1a1a1a] mb-10 uppercase relative z-10">The Art of <span className="font-normal text-gold-gradient">Horology</span></h1>
          <p className="text-gray-600 font-light text-base leading-loose max-w-2xl mx-auto tracking-widest relative z-10 uppercase text-xs">
            A timepiece is not merely an instrument. It is history anchored to the wrist.
          </p>
        </motion.div>

        {/* History timeline */}
        <div className="w-full flex flex-col gap-12 relative">
          <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[1px] bg-gray-300 -translate-x-1/2" />
          
          {HISTORIES.map((item, index) => (
            <motion.div 
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`flex flex-col md:flex-row gap-8 md:gap-20 relative w-full items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
            >
              {/* Dot */}
              <div className="absolute left-[15px] md:left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#cfa864] shadow-[0_0_15px_#cfa864]/50 z-10 hidden md:block" />
              
              <div className={`w-full md:w-1/2 p-10 glass rounded-3xl border border-black/5 hover:border-[#cfa864]/30 hover:shadow-xl transition-all ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                <div className={`text-[#cfa864] font-semibold tracking-[0.3em] uppercase text-[10px] mb-4 ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"} flex items-center gap-3`}>
                  {index % 2 !== 0 && <span className="h-[1px] w-6 bg-[#cfa864]/50" />}
                  {item.year}
                  {index % 2 === 0 && <span className="h-[1px] w-6 bg-[#cfa864]/50" />}
                </div>
                <h3 className="text-2xl font-light tracking-widest text-[#1a1a1a] mb-6 uppercase">{item.name}</h3>
                <p className="text-gray-600 font-light text-sm leading-loose tracking-wide">
                  {item.history}
                </p>
              </div>
              <div className="hidden md:block w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
