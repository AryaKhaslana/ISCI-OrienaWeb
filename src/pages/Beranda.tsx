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
  Star,
  Flame,
  Award,
  Gift,     
  Heart,
  Tag
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
            Bukan sekedar  <br/>
            <span className="text-[#7A1712] italic">Kue, Ada cerita</span> <br/>
            di setiap rasa
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-[16px] md:text-[18px] font-jakarta font-normal text-[#2A1610]/80 leading-[1.6] max-w-lg">
            Oriena menghadirkan cookies, Bakery,  Pastry dan aneka snack yang dibuat dari bahan pilihan dengan rasa yang selalu dirindukan
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


{/* SECTION: CERITA DAPUR (Kenapa Memilih Oriena?) */}
      <section className="bg-[#FDFBF7] py-[80px] overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 space-y-8"> 
            <div>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-[32px] md:text-[48px] font-playfair font-semibold text-[#2A1610] leading-[1.2]">
                Kenapa Memilih <br/><span className="italic text-[#7A1712]">Oriena?</span>
              </motion.h2>
            </div>
            
            {/* Editorial Icon Grid */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 pt-2"
            >
              {[
                { text: "Dibuat Fresh Setiap Hari", icon: <Flame size={20} strokeWidth={1.5} /> },
                { text: "Bahan Pilihan Berkualitas", icon: <Award size={20} strokeWidth={1.5} /> },
                { text: "Cocok untuk Hampers", icon: <Gift size={20} strokeWidth={1.5} /> },
                { text: "Teman Ngopi Favorit", icon: <Coffee size={20} strokeWidth={1.5} /> },
                { text: "Dipercaya Sejak 2008", icon: <Heart size={20} strokeWidth={1.5} /> },
                { text: "Harga Ramah di Kantong", icon: <Tag size={20} strokeWidth={1.5} /> }
              ].map((item, idx) => (
                <motion.div 
                  key={idx} 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                  }}
                  className="flex items-center gap-4 group cursor-default"
                >
                  <div className="w-12 h-12 rounded-full bg-[#EFE5D5] border border-[#C5A059]/20 text-[#7A1712] flex items-center justify-center shrink-0 shadow-[0px_4px_12px_rgba(0,0,0,0.03)] group-hover:bg-[#7A1712] group-hover:text-[#FDFBF7] group-hover:-translate-y-1 transition-all duration-300">
                    {item.icon}
                  </div>
                  <span className="font-jakarta font-semibold text-[#2A1610]/80 text-[15px] leading-snug">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* Gambar Parallax (Tidak Diubah) */}
          <div className="w-full md:w-1/2 grid grid-cols-2 gap-6 relative">
            <motion.div style={{ y: yParallax1 }} className="pt-12">
              <div className="bg-[#EFE5D5] rounded-[16px] overflow-hidden shadow-[0px_8px_24px_rgba(42,22,16,0.04)] hover:-translate-y-[2px] group transition-all duration-500">
                <div className="aspect-[3/4] w-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#2A1610]/70 z-10 opacity-60"></div>
                  <img src="https://github.com/user-attachments/assets/932268c1-e49b-4e8c-a8b4-8d4bdbaf65de" alt="Premium Butter" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[0.5s] ease-out" />
                </div>
              </div>
            </motion.div>
            
            <motion.div style={{ y: yParallax2 }}>
              <div className="bg-[#EFE5D5] rounded-[16px] overflow-hidden shadow-[0px_8px_24px_rgba(42,22,16,0.04)] hover:-translate-y-[2px] group transition-all duration-500">
                <div className="aspect-[3/4] w-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#2A1610]/70 z-10 opacity-60"></div>
                  <img src="https://github.com/user-attachments/assets/5061b2ba-d0cf-4a49-9d52-24fb19137238" alt="Keju Edam Asli" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[0.5s] ease-out" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION: TESTIMONIAL (Scroll Horizontal) */}
      <section className="bg-[#EFE5D5] py-[80px]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-[32px] md:text-[48px] font-playfair font-semibold text-[#2A1610] mb-2">
                Manisnya Kata Mereka.
              </h2>
              <p className="text-[14px] font-jakarta text-[#2A1610]/70 uppercase tracking-widest">
                Geser untuk melihat semua ulasan
              </p>
            </div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (<Star key={i} size={24} className="text-[#C5A059] fill-[#C5A059]" />))}
            </motion.div>
          </div>
          
          <div className="flex gap-6 overflow-x-auto pb-8 pt-4 hide-scrollbar snap-x">
            {[
              { id: 1, name: "Rina Sari", text: "Kuenya enak banget, nastarnya lumer di mulut. Selalu repeat order tiap mau lebaran!", rating: 5, time: "2 bulan lalu" },
              { id: 2, name: "Budi Santoso", text: "Langganan dari jaman namanya masih Paspastry. Kastengelnya juara tebel kejunya.", rating: 5, time: "3 bulan lalu" },
              { id: 3, name: "Siti Aisyah", text: "Harganya terjangkau tapi rasanya premium. Cocok banget buat hampers atau ngemil sendiri.", rating: 5, time: "1 minggu lalu" },
              { id: 4, name: "Andi Wijaya", text: "Brownies kepingnya nagih, ga bisa berhenti ngunyah. Packaging juga aman banget.", rating: 5, time: "1 bulan lalu" },
              { id: 5, name: "Sarah Jessica", text: "Adminnya ramah, pengiriman aman sampai Jakarta. Kuenya utuh ga ada yang hancur.", rating: 5, time: "4 bulan lalu" },
              { id: 6, name: "Joko Susilo", text: "Roti sisirnya lembut banget, menteganya wangi. Cocok buat temen ngopi pagi.", rating: 5, time: "2 minggu lalu" },
              { id: 7, name: "Ayu Lestari", text: "Sagu kejunya beneran ngeprul. Terbaik di Sidoarjo pokoknya!", rating: 5, time: "5 bulan lalu" },
              { id: 8, name: "Dedi Setiawan", text: "Selalu pesen di sini tiap ada acara keluarga, ga pernah mengecewakan. Tamu pada suka.", rating: 5, time: "1 bulan lalu" }
            ].map((review) => (
              <motion.div 
                key={review.id} 
                className="min-w-[280px] md:min-w-[320px] bg-[#FDFBF7] shadow-[0px_4px_12px_rgba(0,0,0,0.05)] border border-[#EFE5D5] rounded-[16px] p-6 snap-start flex flex-col hover:-translate-y-[2px] transition-transform duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-playfair font-semibold text-[#2A1610] text-[18px]">{review.name}</h4>
                    <p className="font-jakarta font-normal text-[12px] text-[#2A1610]/50">{review.time}</p>
                  </div>
                  <div className="flex gap-0.5 text-[#C5A059]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} fill="currentColor" size={14} />
                    ))}
                  </div>
                </div>
                <p className="font-jakarta font-normal text-[#2A1610]/80 text-[14px] leading-[1.6] mb-2 italic flex-grow">
                  "{review.text}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
