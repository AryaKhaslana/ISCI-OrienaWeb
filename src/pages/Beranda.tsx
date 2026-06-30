import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, 
  Coffee, 
  MonitorPlay, 
  Cookie, 
  CakeSlice, 
  CheckCircle, 
  MessageSquare,
  Quote,
  Star
} from 'lucide-react';

interface BerandaProps {
  setCurrentView: (view: string) => void;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
  addToCart?: (product: { id: string | number; name: string; price: number }) => void;
}

interface TasteMatcherProps {
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
  addToCart?: (product: { id: string | number; name: string; price: number }) => void;
}

function TasteMatcher({ addToCart }: TasteMatcherProps) {
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const questions = [
    { id: 'q1', title: "Lagi pengen rasa yang kayak gimana nih?", options: [{ label: "Manis Legit", value: "manis", icon: <CakeSlice size={28} strokeWidth={1.5} /> }, { label: "Gurih Keju", value: "gurih", icon: <Cookie size={28} strokeWidth={1.5} /> }] },
    { id: 'q2', title: "Biasanya buat temen apa?", options: [{ label: "Ngopi Pagi", value: "ngopi", icon: <Coffee size={28} strokeWidth={1.5} /> }, { label: "Nonton Netflix", value: "netflix", icon: <MonitorPlay size={28} strokeWidth={1.5} /> }] },
    { id: 'q3', title: "Tekstur favorit kamu?", options: [{ label: "Lumer di Mulut", value: "lumer", icon: <MessageSquare size={28} strokeWidth={1.5} /> }, { label: "Garing Kress", value: "garing", icon: <CheckCircle size={28} strokeWidth={1.5} /> }] }
  ];

  const handleAnswer = (questionId: string, value: string) => { setAnswers(prev => ({ ...prev, [questionId]: value })); setStep(prev => prev + 1); };

  const getResult = () => {
    if (answers.q1 === 'gurih') return { name: "Kastengel Royal", desc: "Gurihnya keju edam asli, renyah di luar lumer di dalam.", price: 95000 };
    if (answers.q1 === 'manis' && answers.q3 === 'lumer') return { name: "Nastar Classic", desc: "Selai nanas homemade yang lumer berpadu dengan adonan butter premium.", price: 85000 };
    return { name: "Almond Crispy", desc: "Tipis, renyah, manis yang pas buat nemenin maraton series favoritmu.", price: 65000 };
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative bg-[#EFE5D5] p-8 md:p-10 rounded-2xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] overflow-hidden">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="intro" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="flex flex-col items-center text-center space-y-6 relative z-10">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="w-16 h-16 bg-[#FDFBF7] text-[#C5A059] rounded-2xl flex items-center justify-center mb-2 shadow-[0px_4px_12px_rgba(0,0,0,0.05)]">
              <Cookie size={32} strokeWidth={1.5} />
            </motion.div>
            <h3 className="text-[24px] md:text-[32px] font-playfair font-semibold text-[#2A1610] leading-snug">Temukan Teman<br/>Nyemilmu!</h3>
            <p className="text-[#2A1610]/80 font-jakarta font-normal text-base">Bingung milih kue? Jawab 3 pertanyaan singkat ini dan biarkan oven kami merekomendasikan.</p>
            <button onClick={() => setStep(1)} className="mt-4 bg-[#7A1712] text-[#FDFBF7] px-6 py-3 rounded-lg font-jakarta font-bold text-base w-full flex items-center justify-center gap-2 hover:bg-[#5E120E] hover:-translate-y-[2px] hover:shadow-[0px_4px_12px_rgba(122,23,18,0.2)] transition-all duration-300 ease-out">
              Mulai Kuis <ArrowRight size={20} strokeWidth={2} />
            </button>
          </motion.div>
        )}
        
        {step > 0 && step <= questions.length && (
          <motion.div key={`question-${step}`} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.4 }} className="space-y-8 relative z-10">
            <div className="flex items-center gap-2 mb-6 bg-[#FDFBF7] p-1.5 rounded-lg">
              {[1, 2, 3].map((num) => (<div key={num} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${num <= step ? 'bg-[#7A1712]' : 'bg-[#EFE5D5]'}`} />))}
            </div>
            <h3 className="text-xl md:text-2xl font-playfair font-semibold text-[#2A1610] text-center leading-tight">{questions[step - 1].title}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {questions[step - 1].options.map((opt, idx) => (
                <button key={idx} onClick={() => handleAnswer(questions[step - 1].id, opt.value)} className="group flex flex-col items-center justify-center p-6 bg-[#FDFBF7] rounded-xl hover:-translate-y-[2px] hover:shadow-[0px_4px_12px_rgba(0,0,0,0.05)] border border-transparent hover:border-[#C5A059]/30 transition-all duration-300">
                  <div className="text-[#C5A059] mb-4">{opt.icon}</div>
                  <span className="font-jakarta font-medium text-[#2A1610]">{opt.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
        
        {step > questions.length && (
          <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="text-center space-y-6 relative z-10">
            <div className="inline-block px-4 py-1 bg-[#C5A059]/10 text-[#C5A059] rounded-md text-xs font-jakarta font-bold mb-2 uppercase tracking-widest border border-[#C5A059]/20">Perfect Match</div>
            {(() => {
              const res = getResult();
              return (
                <>
                  <h3 className="text-[24px] md:text-[32px] font-playfair font-semibold text-[#2A1610]">{res.name}</h3>
                  <p className="text-[#2A1610]/80 font-jakarta font-normal text-base">{res.desc}</p>
                  <div className="text-2xl font-jakarta font-bold text-[#7A1712]">Rp {res.price.toLocaleString('id-ID')}</div>
                  <div className="pt-4 flex flex-col gap-3">
                    <button onClick={() => { if (addToCart) { addToCart({ id: `kuis-${res.name}`, name: res.name, price: res.price }); } setStep(0); setAnswers({}); alert(`${res.name} masuk keranjang!`); }} className="bg-[#7A1712] text-[#FDFBF7] px-6 py-3 rounded-lg font-jakarta font-bold text-base w-full hover:bg-[#5E120E] hover:-translate-y-[2px] hover:shadow-[0px_4px_12px_rgba(122,23,18,0.2)] transition-all duration-300 ease-out">Langsung Bungkus!</button>
                    <button onClick={() => { setStep(0); setAnswers({}); }} className="text-[#2A1610]/60 font-jakarta font-medium text-sm hover:text-[#7A1712] transition-colors mt-2">Ulangi Kuis</button>
                  </div>
                </>
              )
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Beranda({ setCurrentView, setCartCount, addToCart }: BerandaProps) {
  const { scrollYProgress } = useScroll();
  const yParallax1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yParallax2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-[#FDFBF7]">
      
      {/* SECTION: HERO */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24 flex flex-col-reverse md:flex-row items-center gap-12 min-h-[85vh]">
        <div className="w-full md:w-1/2 space-y-8">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-[42px] md:text-[64px] font-playfair font-bold leading-[1.1] tracking-[-1px] text-[#2A1610]">
            Bawa Hangatnya <br/>
            <span className="text-[#7A1712] italic">Oven Kami</span> <br/>
            ke Meja Anda.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-[16px] md:text-[18px] font-jakarta font-normal text-[#2A1610]/80 leading-[1.6] max-w-lg">
            Nastar lumer, kastengel garing, dan berbagai kreasi pastry yang dibuat dengan tangan untuk menyempurnakan momen Anda bersama keluarga tercinta.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="flex flex-col sm:flex-row gap-4 pt-4">
            <button onClick={() => setCurrentView('katalog')} className="bg-[#7A1712] text-[#FDFBF7] px-6 py-3 rounded-lg font-jakarta font-bold text-[16px] flex items-center justify-center gap-3 hover:bg-[#5E120E] hover:-translate-y-[2px] hover:shadow-[0px_4px_12px_rgba(122,23,18,0.2)] transition-all duration-300 ease-out">
              Lihat Menu Katalog
            </button>
          </motion.div>
        </div>
        <div className="w-full md:w-1/2">
          <TasteMatcher setCartCount={setCartCount} addToCart={addToCart} />
        </div>
      </section>

      {/* SECTION: HIGHLIGHT PRODUK */}
      <section className="bg-[#EFE5D5] py-20 md:py-[80px]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-[32px] md:text-[48px] font-playfair font-bold text-[#2A1610] mb-4">
              Langsung dari Oven.
            </motion.h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="md:col-span-2 group relative bg-[#FDFBF7] rounded-[16px] p-8 overflow-hidden shadow-[0px_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-[2px] transition-all duration-500 cursor-pointer" onClick={() => setCurrentView('katalog')}>
              <div className="absolute right-0 bottom-0 w-64 h-64 bg-[#EFE5D5] rounded-tl-full opacity-50 group-hover:scale-110 transition-transform duration-700 ease-out"></div>
              <div className="relative z-10 w-full md:w-2/3 flex flex-col h-full justify-between min-h-[280px]">
                <div className="inline-block px-3 py-1 bg-[#C5A059]/10 border border-[#C5A059]/20 text-[#C5A059] rounded-md text-[12px] font-jakarta font-medium tracking-wide uppercase mb-4 w-max">Signature Edition</div>
                <div>
                  <h3 className="text-[24px] md:text-[32px] font-playfair font-semibold text-[#2A1610] mb-3">Kastengel Royal</h3>
                  <p className="text-[#2A1610]/80 font-jakarta font-normal text-[16px] leading-[1.6] mb-6">Garing di luar, keju edam yang pecah dan lumer di gigitan pertama. Dibuat dengan mentega pilihan tanpa bahan pengawet buatan.</p>
                  <div className="flex items-center text-[#7A1712] font-jakarta font-bold text-[14px] group-hover:translate-x-2 transition-transform duration-300">Pesan Sekarang <ArrowRight size={16} className="ml-2" /></div>
                </div>
              </div>
            </motion.div>

            <div className="flex flex-col gap-6 md:gap-8">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="group flex-1 bg-[#7A1712] rounded-[16px] p-8 shadow-[0px_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-[2px] hover:shadow-[0px_4px_12px_rgba(122,23,18,0.2)] transition-all duration-500 cursor-pointer relative overflow-hidden" onClick={() => setCurrentView('hampers')}>
                <div className="absolute -right-4 -bottom-4 opacity-10 text-[#FDFBF7] group-hover:scale-110 transition-transform duration-500"><CakeSlice size={100} strokeWidth={1} /></div>
                <div className="relative z-10 flex flex-col justify-end h-full min-h-[140px]">
                  <h3 className="text-[20px] md:text-[24px] font-playfair font-semibold text-[#FDFBF7] mb-2">Roti Sisir Klasik</h3>
                  <p className="font-jakarta text-[14px] font-normal text-[#FDFBF7]/80">Lembut dengan mentega manis khas Oriena.</p>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="group flex-1 bg-[#FDFBF7] rounded-[16px] p-8 shadow-[0px_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-[2px] transition-all duration-500 cursor-pointer relative overflow-hidden" onClick={() => setCurrentView('katalog')}>
                <div className="relative z-10 flex flex-col justify-end h-full min-h-[140px]">
                  <h3 className="text-[20px] md:text-[24px] font-playfair font-semibold text-[#2A1610] mb-2">Nastar Classic</h3>
                  <p className="font-jakarta text-[14px] font-normal text-[#2A1610]/80">Resep rahasia keluarga sejak 2008.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: CERITA DAPUR */}
      <section className="bg-[#FDFBF7] py-[80px] overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 space-y-6"> 
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-[32px] md:text-[48px] font-playfair font-semibold text-[#2A1610] leading-[1.2]">
              Tanpa Pengawet.<br/><span className="italic text-[#7A1712]">Penuh Perasaan.</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-[#2A1610]/80 font-jakarta font-normal text-[16px] leading-[1.6] max-w-md">
              Kami percaya bahwa rasa terbaik datang dari bahan yang jujur. Mentega pilihan, keju asli, dan proses panggangan artisan yang dijaga suhunya secara presisi untuk menghadirkan kualitas premium di setiap toples.
            </motion.p>
          </div>
          
          <div className="w-full md:w-1/2 grid grid-cols-2 gap-6 relative">
            <motion.div style={{ y: yParallax1 }} className="pt-12">
              <div className="bg-[#EFE5D5] rounded-[16px] overflow-hidden shadow-[0px_8px_24px_rgba(42,22,16,0.04)] hover:-translate-y-[2px] group transition-all duration-500">
                <div className="aspect-[3/4] w-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#2A1610]/70 z-10 opacity-60"></div>
                  <img src="https://i.pinimg.com/1200x/8b/ca/86/8bca86af3169e15ef1dcb7a5ffd150b6.jpg" alt="Premium Butter" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[0.5s] ease-out" />
                  <p className="absolute bottom-4 left-4 z-20 font-jakarta font-medium text-[#FDFBF7] tracking-wider text-[12px] uppercase">Premium Butter</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div style={{ y: yParallax2 }}>
              <div className="bg-[#EFE5D5] rounded-[16px] overflow-hidden shadow-[0px_8px_24px_rgba(42,22,16,0.04)] hover:-translate-y-[2px] group transition-all duration-500">
                <div className="aspect-[3/4] w-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#2A1610]/70 z-10 opacity-60"></div>
                  <img src="https://i.pinimg.com/736x/06/a5/25/06a525f631c5e2d058b06c15228eb296.jpg" alt="Keju Edam Asli" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[0.5s] ease-out" />
                  <p className="absolute bottom-4 left-4 z-20 font-jakarta font-medium text-[#C5A059] tracking-wider text-[12px] uppercase">Keju Edam Asli</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION: TESTIMONIAL */}
      <section className="bg-[#EFE5D5] py-[80px]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-[32px] md:text-[48px] font-playfair font-semibold text-[#2A1610]">
              Manisnya Kata Mereka.
            </motion.h2>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (<Star key={i} size={24} className="text-[#C5A059] fill-[#C5A059]" />))}
            </motion.div>
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Siska P.", role: "Pecinta Kastengel", text: "Gila sih, beneran lumer banget di mulut! Kejunya berasa banget gak pelit, beda dari yang ada di pasaran." },
              { name: "Bapak Tono", role: "Corporate Client", text: "Pesanan hampers 50 box aman. Packaging sangat elegan, klien dan bos pada suka semua. Sukses terus Oriena!" },
              { name: "Dina M.", role: "Customer Setia", text: "Nastarnya the best! Selainya kerasa buatan rumah banget, manis asamnya pas, nggak bikin enek sama sekali." }
            ].map((review, idx) => (
              <motion.div key={idx} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }} className="bg-[#FDFBF7] p-8 rounded-[16px] shadow-[0px_4px_12px_rgba(0,0,0,0.05)] flex flex-col justify-between hover:-translate-y-[2px] transition-transform duration-300">
                <div>
                  <Quote size={32} className="text-[#C5A059]/40 mb-4" strokeWidth={2} />
                  <p className="text-[#2A1610]/80 font-jakarta font-normal text-[16px] mb-8 leading-[1.6]">"{review.text}"</p>
                </div>
                <div className="flex items-center gap-4 pt-6 border-t border-[#EFE5D5]">
                  <div className="w-10 h-10 bg-[#EFE5D5] text-[#7A1712] rounded-full flex items-center justify-center font-playfair font-bold text-lg">{review.name.charAt(0)}</div>
                  <div>
                    <h4 className="font-semibold font-jakarta text-[#2A1610] text-[16px]">{review.name}</h4>
                    <p className="text-[12px] font-jakarta text-[#2A1610]/60 font-medium">{review.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}