import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-black/5 py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="text-center md:text-left">
          <div className="text-3xl font-light tracking-widest text-[#1a1a1a] mb-2">HOROLOGY</div>
          <div className="text-xs text-gray-500 uppercase tracking-widest">The art of fine timepieces</div>
        </div>

        <div className="flex gap-8 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
          <Link href="#" className="hover:text-[#1a1a1a] transition-colors duration-300">Instagram</Link>
          <Link href="#" className="hover:text-[#1a1a1a] transition-colors duration-300">Twitter</Link>
          <Link href="/contact" className="hover:text-[#1a1a1a] transition-colors duration-300">Contact</Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-black/5 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Horology Inc. All rights reserved.
        <br></br>
        Created by Daksh Chaurasia
      </div>

    </footer>
  );
}
