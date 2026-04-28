"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, User, Mail, Shield, Clock, Edit2, Check, X, Camera, Lock, Eye, EyeOff, Heart, ExternalLink } from "lucide-react";
import Link from 'next/link';
import { API_BASE_URL } from "@/lib/api";

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatar: "",
    password: ""
  });
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showPassword, setShowPassword] = useState(false);

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
  };

  const fetchProfile = async () => {
    const token = getCookie("horology_token");

    if (!token) {
      router.push("/login?callbackUrl=/profile");
      return;
    }

    try {
      // Fetch Identity
      const userRes = await fetch(`${API_BASE_URL}/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userData = await userRes.json();
      
      if (userData.success) {
        setUserData(userData.data);
        setFormData({
          name: userData.data.name,
          email: userData.data.email,
          avatar: userData.data.avatar || "",
          password: ""
        });

        // Fetch Favorites
        const favRes = await fetch(`${API_BASE_URL}/user/favorites`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const favData = await favRes.json();
        if (favData.success) {
          setFavorites(favData.data);
        }
      } else {
        router.push("/login");
      }
    } catch (err) {
      // Profile fetch failed silently
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getCookie("horology_token");

    try {
      const body: any = { ...formData };
      if (!body.password) delete body.password;

      const res = await fetch(`${API_BASE_URL}/user/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.success) {
        setUserData(data.data);
        setIsEditing(false);
        setMessage({ type: "success", text: "Identity updated in the vault" });
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      } else {
        setMessage({ type: "error", text: data.message });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Security update failed" });
    }
  };

  const handleSignOut = () => {
    document.cookie = "horology_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "horology_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <div className="flex flex-col items-center gap-6">
          <div className="w-12 h-12 border-t-2 border-[#cfa864] rounded-full animate-spin" />
          <div className="text-[#cfa864] tracking-[0.4em] uppercase text-[10px] animate-pulse">Accessing Personal Vault...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-36 pb-24 px-6 min-h-screen bg-transparent">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-[3rem] p-10 md:p-16 border border-black/5 shadow-2xl relative overflow-hidden mb-12"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#cfa864]/5 blur-[120px] -z-10" />
          
          <AnimatePresence>
            {message.text && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`absolute top-6 left-1/2 -translate-x-1/2 px-8 py-3 rounded-full text-[10px] uppercase tracking-widest font-bold shadow-2xl z-50 ${
                  message.type === "success" ? "bg-black text-[#cfa864] border border-[#cfa864]/30" : "bg-red-500 text-white"
                }`}
              >
                {message.text}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
            <div className="relative group">
              <div className="w-44 h-44 rounded-full border-2 border-[#cfa864]/30 p-2 group-hover:border-[#cfa864] transition-all duration-700">
                <div className="w-full h-full rounded-full bg-black/5 flex items-center justify-center overflow-hidden relative shadow-inner">
                  {formData.avatar || userData?.avatar ? (
                    <img src={formData.avatar || userData.avatar} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User size={72} className="text-[#cfa864]/40" />
                  )}
                  {isEditing && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="text-white" size={24} />
                    </div>
                  )}
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-white p-3 rounded-full shadow-xl border border-black/5 text-[#cfa864]">
                <Shield size={20} />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <span className="text-[10px] uppercase tracking-[0.5em] text-[#cfa864] font-bold mb-4 block">Identity Core</span>
              {!isEditing ? (
                <>
                  <h1 className="text-4xl md:text-6xl font-extralight tracking-tight text-[#1a1a1a] mb-2 uppercase">
                    {userData?.name || "Member"}
                  </h1>
                  <p className="text-gray-500 tracking-[0.3em] uppercase text-[10px]">Status: <span className="text-[#1a1a1a] font-bold">{userData?.role || "Collector"}</span></p>
                </>
              ) : (
                <div className="space-y-4">
                  <input 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Full Name"
                    className="text-4xl md:text-5xl font-light bg-transparent border-b border-[#cfa864]/30 w-full focus:outline-none focus:border-[#cfa864] text-[#1a1a1a] uppercase transition-colors"
                  />
                </div>
              )}
            </div>
          </div>

          <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-black/5 pt-12">
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold">Encrypted Email</label>
              {!isEditing ? (
                <div className="flex items-center gap-4 text-[#1a1a1a] glass-light p-4 rounded-2xl border border-black/5">
                  <Mail size={18} className="text-[#cfa864]" />
                  <span className="tracking-wide text-sm font-medium">{userData?.email}</span>
                </div>
              ) : (
                <input 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-black/5 border border-black/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-[#cfa864] text-[#1a1a1a] text-sm"
                />
              )}
            </div>
            
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold">Security Shield</label>
              {!isEditing ? (
                <div className="flex items-center gap-4 text-[#1a1a1a] glass-light p-4 rounded-2xl border border-black/5">
                  <Lock size={18} className="text-[#cfa864]" />
                  <span className="tracking-wide text-xs text-gray-500 uppercase italic">
                    {userData?.passwordSet ? "Protected by Private Key" : "Linked via Google Identity"}
                  </span>
                </div>
              ) : (
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="New Secure Password"
                    className="w-full bg-black/5 border border-black/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-[#cfa864] text-[#1a1a1a] text-sm pr-12"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#cfa864] transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              )}
            </div>

            <div className="mt-8 md:col-span-2 flex flex-col md:flex-row gap-6 pt-8">
              {!isEditing ? (
                <button 
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="flex-1 bg-[#1a1a1a] text-white py-5 rounded-2xl text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-[#cfa864] transition-all duration-700 shadow-2xl flex items-center justify-center gap-4 group"
                >
                  <Edit2 size={16} className="group-hover:rotate-12 transition-transform" />
                  Modify Credentials
                </button>
              ) : (
                <>
                  <button 
                    type="submit"
                    className="flex-1 bg-[#cfa864] text-white py-5 rounded-2xl text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-[#1a1a1a] transition-all duration-700 shadow-2xl flex items-center justify-center gap-4"
                  >
                    <Check size={16} />
                    Save Changes
                  </button>
                  <button 
                    type="button"
                    onClick={() => { setIsEditing(false); setFormData({...formData, ...userData}); }}
                    className="px-12 border border-black/10 py-5 rounded-2xl text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-black/5 transition-all duration-300 flex items-center justify-center gap-4"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </>
              )}
              {!isEditing && (
                <button 
                  type="button"
                  onClick={handleSignOut}
                  className="px-12 border border-red-200 text-red-500 py-5 rounded-2xl text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-red-50 hover:border-red-300 transition-all duration-500 flex items-center justify-center gap-4"
                >
                  <LogOut size={18} />
                  Sign Out
                </button>
              )}
            </div>
          </form>
        </motion.div>

        {/* Favorites Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-8 px-4">
            <h2 className="text-xl md:text-2xl font-light tracking-[0.3em] uppercase text-[#1a1a1a]">My <span className="text-[#cfa864] font-normal">Collection</span></h2>
            <div className="flex items-center gap-2 text-gray-400 text-[10px] uppercase tracking-[0.2em] font-bold">
              <Heart size={14} className="text-[#cfa864]" />
              {favorites.length} Saved Pieces
            </div>
          </div>

          {favorites.length === 0 ? (
            <div className="glass rounded-[2rem] p-20 text-center border border-black/5">
              <p className="text-gray-400 tracking-widest text-xs uppercase mb-8 leading-relaxed">Your personal gallery is currently empty.<br />Explore the vault to curate your dream collection.</p>
              <Link 
                href="/collection" 
                className="inline-flex items-center gap-4 text-[#cfa864] text-[10px] uppercase tracking-[0.4em] font-bold hover:text-[#1a1a1a] transition-colors group"
              >
                Access Full Collection <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {favorites.map((fav, i) => (
                <motion.div 
                  key={fav._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-3xl overflow-hidden group border border-black/5 hover:border-[#cfa864]/30 transition-all duration-700 shadow-xl"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={fav.watch.images?.[0]?.url || fav.watch.image} 
                      alt={fav.watch.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Link href={`/watches/${fav.watch._id}`} className="bg-white/90 backdrop-blur-md px-6 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold text-[#1a1a1a] shadow-2xl">View Piece</Link>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-[9px] uppercase tracking-[0.3em] text-[#cfa864] font-bold mb-1">{fav.watch.brand}</p>
                    <h3 className="text-sm font-light tracking-widest text-[#1a1a1a] uppercase truncate">{fav.watch.name}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
