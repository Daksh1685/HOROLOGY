import { motion } from 'framer-motion';
import Link from 'next/link';

const LUXURY_IMAGES = [
  "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=800",
  "https://images.unsplash.com/photo-1587836374828-cb433947ca7f?q=80&w=800",
  "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=800",
  "https://images.unsplash.com/photo-1524592094714-cb9c5a4d5d34?q=80&w=800",
  "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?q=80&w=800",
  "https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=800",
];

export default function WatchCard({ watch, index }: { watch: any, index: number }) {
  // If the backend watch doesn't have an image, cycle through our gorgeous high-res luxury fallbacks
  const displayImage = watch.image || LUXURY_IMAGES[index % LUXURY_IMAGES.length];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass rounded-2xl overflow-hidden group cursor-pointer border border-black/5 hover:border-[#cfa864]/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
    >
      <div className="relative h-96 w-full overflow-hidden bg-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={displayImage} 
          alt={watch.name || 'Luxury Watch'} 
          onError={(e) => { e.currentTarget.src = LUXURY_IMAGES[0] }}
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-50" />
      </div>
      <div className="p-8 relative bg-transparent">
        <div className="text-[10px] text-[#cfa864] uppercase tracking-[0.3em] font-semibold mb-3">
          {watch.brand || 'Exclusive'}
        </div>
        <h3 className="text-xl font-light text-[#1a1a1a] mb-2 tracking-widest">
          {watch.name || 'Chronograph Series'}
        </h3>
        <p className="text-gray-500 text-sm font-light mb-6">
          {watch.price ? `$${watch.price.toLocaleString('en-US')}` : 'Price on Request'}
        </p>
        <div className="h-[1px] w-full bg-gray-200 mb-5 group-hover:bg-[#cfa864]/50 transition-colors duration-500" />
        <div className="flex justify-between items-center relative z-10">
          <Link href="/collection" className="inline-flex text-[10px] uppercase tracking-[0.2em] text-gray-500 group-hover:text-[#1a1a1a] items-center gap-2 transition-colors duration-300">
            View Collection <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <Link href={`/inquire?watch=${encodeURIComponent(watch.name || watch.brand || 'Luxury Watch')}`} className="inline-flex text-[10px] uppercase tracking-[0.2em] font-semibold text-[#cfa864] hover:text-[#1a1a1a] items-center gap-2 transition-colors duration-300 bg-[#cfa864]/10 hover:bg-[#cfa864]/20 px-3 py-1.5 rounded-full">
            Inquire
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
