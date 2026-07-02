import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cookie } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [pct, setPct] = useState(0);

  // ngitung persenan loading
  useEffect(() => {
    const iv = setInterval(() => {
      setPct(p => {
        const next = p + (p < 60 ? 2.5 : p < 85 ? 1.2 : 0.6);
        if (next >= 100) {
          clearInterval(iv);
          setTimeout(onComplete, 600);
          return 100;
        }
        return next;
      });
    }, 25);
    return () => clearInterval(iv);
  }, [onComplete]);

  const msgs = [
    'Memanaskan Oven...',
    'Menguleni Adonan...',
    'Menyiapkan Etalase...',
    'Hampir Siap...',
  ];
  
  // ganti teks sesuai persen
  const msgIdx = pct < 30 ? 0 : pct < 55 ? 1 : pct < 80 ? 2 : 3;

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      // Menggunakan Vanilla Cream sesuai aturan design.md
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#FDFBF7] overflow-hidden"
    >
      
      <div className="relative z-10 flex flex-col items-center gap-6">
        
        {/* Icon minimalis berputar elegan (Champagne Gold) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, ease: "linear", repeat: Infinity }}
          className="text-[#C5A059]"
        >
          <Cookie size={48} strokeWidth={1.2} />
        </motion.div>

        {/* Typografi Mewah */}
        <div className="overflow-hidden text-center">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-playfair text-4xl md:text-5xl font-bold text-[#2A1610] tracking-wide mb-1"
          >
            ORIENA.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-[#A86360] font-medium tracking-[0.2em] uppercase text-[10px] md:text-xs"
          >
            Artisan Bakery & Hampers
          </motion.p>
        </div>

        {/* Progress Bar Tipis & Elegan */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="w-64 md:w-80 mt-4"
        >
          <div className="flex justify-between text-[#A86360] text-[10px] font-semibold mb-2 tracking-wider uppercase">
            <span>{msgs[msgIdx]}</span>
            <span>{Math.round(pct)}%</span>
          </div>
          
          {/* Track menggunakan Soft Biscuit, Bar menggunakan Deep Crimson */}
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