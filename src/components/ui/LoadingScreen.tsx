import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [pct, setPct] = useState(0);

  // 1. LOGIKA NGITUNG PERSENAN (Bug-free)
  useEffect(() => {
    const iv = setInterval(() => {
      setPct(p => {
        if (p >= 100) return 100;
        const next = p + (p < 60 ? 2.5 : p < 85 ? 1.2 : 0.6);
        return next >= 100 ? 100 : next;
      });
    }, 25);
    return () => clearInterval(iv);
  }, []);

  // 2. LOGIKA PINDAH HALAMAN (Aman dari infinite loop)
  useEffect(() => {
    if (pct >= 100) {
      const timer = setTimeout(() => {
        onComplete();
      }, 800); // Dijeda sebentar biar customer bisa lihat angka 100%
      return () => clearTimeout(timer);
    }
  }, [pct, onComplete]);

  const msgs = [
    'Memanaskan Oven...',
    'Menguleni Adonan...',
    'Menyiapkan Etalase...',
    'Sajian Segera Hadir...',
  ];
  
  const msgIdx = pct < 30 ? 0 : pct < 55 ? 1 : pct < 80 ? 2 : 3;

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#FDFBF7] overflow-hidden font-jakarta"
    >
      {/* Elemen Dekorasi Latar Belakang Minimalis */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full border border-[#EFE5D5] opacity-60 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[700px] md:h-[700px] rounded-full border border-[#EFE5D5] opacity-30 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        
        {/* Segel Ikon Estetik */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-20 h-20 flex items-center justify-center rounded-full bg-[#EFE5D5] border border-[#C5A059]/30 shadow-[0px_8px_24px_rgba(42,22,16,0.04)] mb-8"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 6, ease: "linear", repeat: Infinity }}
            className="text-[#7A1712]"
          >
            <Cookie size={32} strokeWidth={1.5} />
          </motion.div>
        </motion.div>

        {/* Tipografi Mewah */}
        <div className="text-center overflow-hidden mb-12">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="font-playfair text-[40px] md:text-[56px] font-semibold text-[#2A1610] tracking-widest mb-2 leading-none"
          >
            ORIENA.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="font-jakarta text-[11px] uppercase tracking-[0.3em] text-[#C5A059] font-medium"
          >
            Artisan Bakery & Hampers
          </motion.p>
        </div>

        {/* Progress Bar & Teks Dinamis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="w-64 md:w-80"
        >
          <div className="flex justify-between items-end text-[#2A1610]/60 text-[10px] font-semibold mb-3 tracking-widest uppercase h-4">
            {/* Animasi Crossfade untuk Teks Loading */}
            <AnimatePresence mode="wait">
              <motion.span
                key={msgIdx}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3 }}
                className="inline-block"
              >
                {msgs[msgIdx]}
              </motion.span>
            </AnimatePresence>
            <span className="text-[#C5A059]">{Math.round(pct)}%</span>
          </div>
          
          <div className="h-[2px] bg-[#EFE5D5] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#7A1712] rounded-full transition-all duration-100 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}