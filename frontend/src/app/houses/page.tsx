"use client";

import { motion } from "framer-motion";

const HOUSES_DATA = [
  { 
    name: 'Patek Philippe', 
    year: 1839, 
    desc: 'Considered by many to be the most prestigious watchmaker in the world. The last family-owned independent Genevan watch manufacturer, renowned for its mastery of traditional watchmaking complications.',
    flagship: 'The Nautilus Series',
    image: '/patek-house.jpg'
  },
  { 
    name: 'Rolex', 
    year: 1905, 
    desc: 'The benchmark of luxury. Pioneers of the wristwatch, Rolex has registered over 500 patents and produced iconic models that define achievement, robust engineering, and timeless prestige.',
    flagship: 'Daytona Cosmograph',
    image: '/rolex-house.jpg'
  },
  { 
    name: 'Audemars Piguet', 
    year: 1875, 
    desc: 'Still in the hands of its founding families, AP is celebrated for shattering conventions. They famously introduced the first luxury sports watch in stainless steel.',
    flagship: 'Royal Oak Offshore',
    image: '/ap-house.jpg'
  },
  { 
    name: 'Vacheron Constantin', 
    year: 1755, 
    desc: 'The oldest watch manufacturer in continuous operation. A true paragon of Haute Horlogerie, passing down the art of watchmaking across generations without interruption.',
    flagship: 'Patrimony Collection',
    image: '/vc-house.jpg'
  }
];

export default function HousesPage() {
  return (
    <div className="pt-36 pb-24 px-6 min-h-screen bg-transparent">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="text-center mb-32">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extralight tracking-widest text-[#1a1a1a] uppercase"
          >
            The Great <span className="text-[#cfa864] font-normal">Houses</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-500 tracking-widest text-xs mt-6 uppercase"
          >
            Legacy. Craftsmanship. Eternity.
          </motion.p>
        </div>

        <div className="flex flex-col gap-20 w-full">
          {HOUSES_DATA.map((house, i) => (
            <motion.div 
              key={house.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="glass rounded-3xl border border-black/5 overflow-hidden flex flex-col md:flex-row shadow-xl hover:shadow-2xl hover:border-[#cfa864]/30 transition-all hover:-translate-y-1"
            >
              <div className="w-full md:w-5/12 h-64 md:h-auto relative bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={house.image} 
                  alt={house.name}
                  className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-700 filter grayscale hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#fdfbf7]/80 md:to-[#fdfbf7]" />
              </div>
              <div className="w-full md:w-7/12 p-10 md:p-16 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[#cfa864] text-xs tracking-[0.3em] font-semibold">EST. {house.year}</span>
                  <div className="h-[1px] w-12 bg-gray-300" />
                </div>
                <h2 className="text-4xl font-light tracking-widest text-[#1a1a1a] mb-6 uppercase">{house.name}</h2>
                <p className="text-gray-600 font-light text-sm md:text-base leading-loose mb-8">
                  {house.desc}
                </p>
                <div>
                  <span className="text-gray-500 uppercase tracking-widest text-[10px] font-semibold block mb-2">Flagship Silhouette</span>
                  <span className="text-[#1a1a1a] text-lg tracking-widest font-light">{house.flagship}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
