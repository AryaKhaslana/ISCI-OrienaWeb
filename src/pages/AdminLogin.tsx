import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase'; 

export default function AdminLogin({ setCurrentView }: { setCurrentView: React.Dispatch<React.SetStateAction<string>> }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setErrorMsg('Akses ditolak: Email atau Kata Sandi tidak sesuai.');
    } else if (data.user) {
      setCurrentView('dashboard-rahasia');
    }
    
    setLoading(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="min-h-[80vh] flex items-center justify-center bg-[#FDFBF7] p-4 font-jakarta"
    >
      <div className="w-full max-w-md bg-white border-[1.5px] border-[#2A1610]/10 rounded-[16px] p-8 shadow-[0px_8px_24px_rgba(42,22,16,0.04)]">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#FDFBF7] text-[#C5A059] rounded-[16px] flex items-center justify-center mx-auto mb-4 border-[1.5px] border-[#C5A059]/30">
            <Lock size={32} strokeWidth={1.5} />
          </div>
          <h2 className="text-3xl font-playfair font-bold text-[#2A1610]">Pintu Ruang Ganti</h2>
          <p className="text-[#A86360] font-medium text-sm mt-2">Masuk untuk mengelola etalase Oriena.</p>
        </div>

        {errorMsg && (
          <div className="bg-[#7A1712]/10 border-[1.5px] border-[#7A1712]/30 text-[#7A1712] p-3 rounded-[8px] mb-6 font-medium text-center text-sm">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#2A1610] uppercase tracking-wider">Alamat Email</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2A1610]/50" size={20} strokeWidth={1.5} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@oriena.com"
                className="w-full bg-[#EFE5D5]/50 border-[1.5px] border-transparent rounded-[8px] py-3 pl-12 pr-4 outline-none font-medium text-[#2A1610] focus:border-[#C5A059] focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#2A1610] uppercase tracking-wider">Kata Sandi</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2A1610]/50" size={20} strokeWidth={1.5} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-[#EFE5D5]/50 border-[1.5px] border-transparent rounded-[8px] py-3 pl-12 pr-4 outline-none font-medium text-[#2A1610] focus:border-[#C5A059] focus:bg-white transition-all"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#7A1712] text-[#FDFBF7] font-bold py-3.5 rounded-[8px] hover:bg-[#5E120E] hover:-translate-y-0.5 shadow-[0px_4px_12px_rgba(122,23,18,0.2)] transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Memverifikasi...' : <>Masuk Sekarang <ArrowRight size={18} /></>}
          </button>
        </form>
      </div>
    </motion.div>
  );
}