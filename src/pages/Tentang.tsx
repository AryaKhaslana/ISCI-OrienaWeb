import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Home,        // Icon 2008
  MapPin,      // Icon 2011 / Lokasi
  CakeSlice,   // Icon 2012
  Store,       // Icon 2016
  Cookie,      // Icon 2018
  Sparkles,    // Icon 2019 / Keunggulan
  Rocket,      // Icon 2026
  Heart,
  Star,
  MessageCircle,
  ExternalLink,
  Ribbon
} from 'lucide-react';

const FotoOwner = "https://github.com/user-attachments/assets/4ffc326f-5533-4676-95a6-3e90b1054554";

const InstagramIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

export default function Tentang() {
  // DATA TIMELINE BARU SESUAI REQUEST
  const timeline = [
    { 
      year: "2008", 
      title: "Berawal dari Dapur Keluarga", 
      desc: "Perjalanan kami dimulai dari membuat aneka camilan untuk keluarga. Seiring waktu, produk kami mulai dipercaya untuk memenuhi kebutuhan kantin pabrik dan dijual di pasar tradisional di Batam.", 
      icon: <Home size={24} strokeWidth={1.5} /> 
    },
    { 
      year: "2011", 
      title: "Babak Baru di Sidoarjo", 
      desc: "Kami melanjutkan perjalanan dengan pindah ke Sidoarjo, membawa semangat untuk terus berkembang dan menjangkau lebih banyak pelanggan.", 
      icon: <MapPin size={24} strokeWidth={1.5} /> 
    },
    { 
      year: "2012", 
      title: "Mengembangkan Ragam Produk", 
      desc: "Mulai memproduksi snack box, birthday cake, serta cookies Lebaran untuk melayani berbagai momen spesial pelanggan.", 
      icon: <CakeSlice size={24} strokeWidth={1.5} /> 
    },
    { 
      year: "2016", 
      title: "Lahirnya Brand PasPastry", 
      desc: "Resmi meluncurkan brand PasPastry sebagai identitas usaha dengan komitmen menghadirkan produk berkualitas dan bercita rasa istimewa.", 
      icon: <Store size={24} strokeWidth={1.5} /> 
    },
    { 
      year: "2018", 
      title: "Inovasi Pastry Stick", 
      desc: "Meluncurkan Pastry Stick, camilan renyah yang menjadi salah satu produk andalan.", 
      icon: <Cookie size={24} strokeWidth={1.5} /> 
    },
    { 
      year: "2019", 
      title: "Hadirnya Sustik", 
      desc: "Menambah lini produk melalui peluncuran Sustik, sebagai bagian dari inovasi untuk memenuhi selera pelanggan.", 
      icon: <Sparkles size={24} strokeWidth={1.5} /> 
    },
    { 
      year: "2026", 
      title: "Lahirnya Oriena Cookies & Bakery", 
      desc: "Memasuki babak baru melalui rebranding menjadi Oriena Cookies & Bakery. Transformasi ini menjadi langkah kami untuk terus bertumbuh, berinovasi, dan menghadirkan produk yang lebih berkualitas bagi setiap keluarga.", 
      icon: <Rocket size={24} strokeWidth={1.5} /> 
    }
  ];

  const socialLinks = [
    { icon: InstagramIcon, url: "https://www.instagram.com/oriena_cookiesandbakery?igsh=dXdna21weXF4ZGE2" },
    { icon: FacebookIcon, url: "https://www.facebook.com/share/1ChkNfD55Z/" }
  ];

  const galleryItems = [
    { id: 1, image: "https://github.com/user-attachments/assets/f7569899-58df-4a0b-9fd2-d4d2b4b1fbb9" },
    { id: 2, image: "https://github.com/user-attachments/assets/352c2d55-6799-4921-bddb-8e631567fd1e" },
    { id: 3, image: "https://github.com/user-attachments/assets/fbfa90cc-0861-4129-90b0-bbd0dbfbd927" },
    { id: 4, image: "https://github.com/user-attachments/assets/805b9772-0a3e-4f75-812c-118f70d4f00c" },
  ];

  const customerReviews = [
    { id: 1, name: "Rina Sari", text: "Kuenya enak banget, nastarnya lumer di mulut. Selalu repeat order tiap mau lebaran!", rating: 5, time: "2 bulan lalu" },
    { id: 2, name: "Budi Santoso", text: "Langganan dari jaman namanya masih Paspastry. Kastengelnya juara tebel kejunya.", rating: 5, time: "3 bulan lalu" },
    { id: 3, name: "Siti Aisyah", text: "Harganya terjangkau tapi rasanya premium. Cocok banget buat hampers atau ngemil sendiri.", rating: 5, time: "1 minggu lalu" },
    { id: 4, name: "Andi Wijaya", text: "Brownies kepingnya nagih, ga bisa berhenti ngunyah. Packaging juga aman banget.", rating: 5, time: "1 bulan lalu" },
    { id: 5, name: "Sarah Jessica", text: "Adminnya ramah, pengiriman aman sampai Jakarta. Kuenya utuh ga ada yang hancur.", rating: 5, time: "4 bulan lalu" },
    { id: 6, name: "Joko Susilo", text: "Roti sisirnya lembut banget, menteganya wangi. Cocok buat temen ngopi pagi.", rating: 5, time: "2 minggu lalu" },
    { id: 7, name: "Ayu Lestari", text: "Sagu kejunya beneran ngeprul. Terbaik di Sidoarjo pokoknya!", rating: 5, time: "5 bulan lalu" },
    { id: 8, name: "Dedi Setiawan", text: "Selalu pesen di sini tiap ada acara keluarga, ga pernah mengecewakan. Tamu pada suka.", rating: 5, time: "1 bulan lalu" },
  ];

  const titleWords = "Cerita dari Dapur Kami.".split(" ");

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="bg-[#FDFBF7] min-h-screen pt-12 pb-24 overflow-hidden relative"
    >
      
      {/* Section: Hero */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6 pt-16 md:pt-24 mb-[80px]">
        <h1 className="text-[42px] md:text-[64px] font-playfair font-bold text-[#2A1610] tracking-[-1px] leading-[1.1] flex flex-wrap justify-center gap-x-3 md:gap-x-4 overflow-hidden">
          {titleWords.map((word, idx) => (
            <motion.span
              key={idx}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
              className={`inline-block ${word === 'Kami.' ? 'text-[#7A1712] italic' : ''}`}
            >
              {word}
            </motion.span>
          ))}
        </h1>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-[16px] md:text-[18px] font-jakarta font-normal text-[#2A1610]/80 leading-[1.6] max-w-2xl mx-auto"
        >
          Lebih dari sekadar bahan baku premium, Oriena adalah tentang merawat tradisi dan menciptakan momen manis di setiap gigitan.
        </motion.p>
      </section>

      {/* Section: Sejarah */}
      <section className="max-w-5xl mx-auto px-4 mb-[80px]">
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, margin: "-100px" }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-[#EFE5D5] shadow-[0px_4px_12px_rgba(0,0,0,0.05)] border border-[#7A1712] rounded-[16px] p-8 md:p-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A059]/10 rounded-bl-full pointer-events-none"></div>

          <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
            <div className="w-full md:w-1/3">
              <h2 className="text-[32px] md:text-[40px] font-playfair font-bold text-[#2A1610] leading-[1.2]">
                Bagaimana <br className="hidden md:block" />Dapur Ini <br className="hidden md:block" /><span className="italic text-[#7A1712] font-semibold">Bermula.</span>
              </h2>
            </div>
            
            <div className="w-full md:w-2/3 border-l-0 md:border-l border-[#C5A059]/30 md:pl-8 pt-4 md:pt-0 space-y-6">
              <p className="text-[#2A1610]/80 font-jakarta font-normal text-[16px] leading-[1.6]">
                Oriena bermula dari sebuah dapur keluarga sederhana—berawal dari hobi membuat camilan untuk orang-orang tercinta yang kemudian berkembang menjadi impian untuk menyajikan produk berkualitas bagi lebih banyak keluarga. Perjalanan panjang ini dimulai dengan nama PasPastry "Lezatnya Pas", hingga kini kami resmi bertransformasi dan melangkah lebih jauh sebagai Oriena Cookies & Bakery.
              </p>
              <p className="text-[#2A1610]/80 font-jakarta font-normal text-[16px] leading-[1.6]">
                Dengan membawa semangat baru melalui tagline "Setiap Rasa Punya Cerita", kami meyakini bahwa setiap sajian kami bukan sekadar tentang cita rasa, melainkan ikut menjadi bagian dari momen-momen berharga Pelanggan kami. Perjalanan ini tidak akan berarti tanpa dukungan para pelanggan, sahabat, dan keluarga yang terus mempercayai serta mendukung kami hingga hari ini.
              </p>
              <p className="text-[#2A1610]/80 font-jakarta font-normal text-[16px] leading-[1.6]">
                Salam hangat dari kami, <br /> <span className="italic font-bold text-[#7A1712]">Oriena Cookies & Bakery.</span>
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Section: Founder */}
      <section className="max-w-[1200px] mx-auto px-4 mb-[80px]">
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, margin: "-100px" }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-[#EFE5D5] rounded-[16px] p-8 md:p-12 border border-[#7A1712] shadow-[0px_4px_12px_rgba(0,0,0,0.05)] flex flex-col md:flex-row items-center gap-12"
        >
         <div className="bg-[#FDFBF7] border border-[#7A1712]/20 rounded-[16px] p-4 shadow-sm relative group w-full md:w-2/5">
          <div className="aspect-[4/5] rounded-[8px] overflow-hidden relative flex items-center justify-center">
            <img 
              src={FotoOwner} 
              alt="Bu Endah Pujiastuti" 
              className="w-full h-full object-cover relative z-10 group-hover:scale-[1.03] transition-transform duration-[0.5s] ease-out" 
            />
          </div>
          <div className="mt-4 text-center">
             <span className="font-jakarta font-medium text-[#2A1610] text-[12px] tracking-widest uppercase">
               Owner Oriena
             </span>
          </div>
        </div>
          <div className="w-full md:w-3/5 text-center md:text-left space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              className="inline-block px-4 py-1.5 border border-[#7A1712] text-[#7A1712] rounded-full text-[12px] font-jakarta font-bold tracking-widest uppercase"
            >
              SOSOK DI BALIK DAPUR
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-[36px] md:text-[48px] font-playfair font-semibold text-[#2A1610] mb-2">Endah Puji Astuti</h2>
              <p className="text-[#C5A059] font-jakarta font-medium tracking-widest uppercase text-[12px]">Founder Oriena Cookies & Bakery</p>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, x: 20 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: 0.2 }}
              className="text-[#2A1610]/80 leading-[1.6] font-jakarta font-normal text-[18px] relative py-4 italic"
            >
              "Bagi saya, Oriena bukan sekadar sebuah brand makanan. Oriena adalah wujud dari mimpi dan semangat untuk menghadirkan camilan yang dibuat dengan sepenuh hati, sehingga setiap orang dapat merasakan kehangatan, kebahagiaan, dan cinta dalam setiap gigitan."
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, x: 20 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: 0.2 }}
              className="text-[#2A1610]/80 leading-[1.6] font-jakarta font-normal text-[14px] relative py-4"
            >
              <span className="italic font-bold text-[#7A1712]">— Endah Puji Astuti</span> <br />Founder Oriena Cookies & Bakery
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: 0.3 }}
              className="flex justify-center md:justify-start gap-4 pt-4"
            >
              {socialLinks.map((social, i) =>(
                <motion.a 
                  key={i} 
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-[8px] bg-[#FDFBF7] border border-[#7A1712]/20 flex items-center justify-center text-[#7A1712] hover:bg-[#7A1712] hover:text-[#FDFBF7] hover:-translate-y-[2px] transition-all duration-300 shadow-sm"
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Section: Filosofi */}
      <section className="max-w-[1200px] mx-auto px-4 mb-[80px]">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="text-[32px] md:text-[48px] font-playfair font-semibold text-[#2A1610]"
          >
            Nilai yang Kami Jaga
          </motion.h2>
        </div>

        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {[
            { icon: <Heart size={28} strokeWidth={1.5} />, title: "Bukan Sekadar Kue", desc: "Setiap sajian kami racik dengan ketulusan dan doa. Kami percaya, makanan yang dibuat dari hati akan membawa kebahagiaan dan berkah bagi yang menikmatinya." },
            { icon: <Ribbon size={28} strokeWidth={1.5} />, title: "Bahan Berkualitas", desc: "Kami hanya menggunakan bahan baku pilihan berkualitas tinggi yang 100% halal, sehingga aman dan nyaman dinikmati oleh seluruh keluarga." },
            { icon: <Sparkles size={28} strokeWidth={1.5} />, title: "Proses Produksi yang Baik", desc: "Diproses menggunakan resep standar yang konsisten serta peralatan yang bersih, kami berkomitmen menghadirkan produk yang selalu lezat, aman, dan higienis di setiap gigitan." }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              variants={{ 
                hidden: { opacity: 0, y: 30 }, 
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } 
              }}
              className="bg-[#EFE5D5] p-8 md:p-10 rounded-[16px] shadow-[0px_4px_12px_rgba(0,0,0,0.05)] border border-[#7A1712] text-center hover:-translate-y-[2px] transition-all duration-300"
            >
              <div className="w-16 h-16 bg-[#FDFBF7] text-[#7A1712] border border-[#7A1712]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                {item.icon}
              </div>
              <h3 className="text-[20px] font-playfair font-semibold text-[#2A1610] mb-3">{item.title}</h3>
              <p className="text-[#2A1610]/80 font-jakarta font-normal text-[15px] leading-[1.6]">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Section: Timeline */}
      <section className="max-w-4xl mx-auto px-4 mb-[100px] overflow-hidden">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="text-[32px] md:text-[48px] font-playfair font-semibold text-[#2A1610]"
          >
            Perjalanan Waktu
          </motion.h2>
        </div>

        <div className="relative space-y-12 md:space-y-16 py-8">
          {/* Garis Tengah */}
          <div className="absolute top-0 bottom-0 left-[39px] md:left-1/2 w-px bg-[#7A1712]/30 md:-translate-x-1/2 z-0"></div>

          {timeline.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 40 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true, margin: "-100px" }} 
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`relative flex flex-col md:flex-row items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              <motion.div 
                initial={{ scale: 0 }} 
                whileInView={{ scale: 1 }} 
                viewport={{ once: true }} 
                transition={{ delay: 0.2, type: "spring" }}
                className="absolute left-[16px] md:left-1/2 md:-translate-x-1/2 w-[48px] h-[48px] bg-[#EFE5D5] border border-[#7A1712] rounded-full flex items-center justify-center text-[#7A1712] shadow-sm z-10"
              >
                {item.icon}
              </motion.div>

              <div className="hidden md:block md:w-1/2"></div>

              {/* md:text-right DIHAPUS DARI SINI BIAR SEMUA RATA KIRI */}
              <div className={`pl-24 md:pl-0 w-full md:w-1/2 ${idx % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                <div className="bg-[#EFE5D5] p-8 rounded-[16px] shadow-[0px_4px_12px_rgba(0,0,0,0.05)] border border-[#7A1712] hover:-translate-y-[2px] transition-all duration-300 text-left">
                  
                  {/* LOGIKA PERATAAN TAHUN DIHAPUS, JADI DEFAULT RATA KIRI */}
                  <div className="text-[#7A1712] font-jakarta font-bold text-[14px] mb-2">
                    {item.year}
                  </div>
                  
                  <h3 className="text-[20px] font-playfair font-semibold text-[#2A1610] mb-2">{item.title}</h3>
                  <p className="text-[#2A1610]/80 font-jakarta font-normal text-[15px] leading-[1.6]">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION: LOKASI & REVIEW GOOGLE MAPS */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 mb-[80px]">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="text-[32px] md:text-[48px] font-playfair font-semibold text-[#2A1610]"
          >
            Outlet Oriena
          </motion.h2>
        </div>

        {/* Wrapper Google Maps Iframe */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="lg:col-span-2 w-full h-[350px] rounded-[16px] shadow-[0px_4px_12px_rgba(0,0,0,0.05)] border border-[#7A1712] overflow-hidden relative bg-[#EFE5D5]"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.017414012944!2d112.66942945323046!3d-7.351940355189639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7e32ad651b145%3A0xa215afe6733ecf47!2sORIENA%20(PasPastry)!5e0!3m2!1sid!2sid!4v1782451929338!5m2!1sid!2sid" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute inset-0 opacity-90 hover:opacity-100 transition-opacity duration-500"
            ></iframe>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 bg-[#EFE5D5] p-8 rounded-[16px] shadow-[0px_4px_12px_rgba(0,0,0,0.05)] h-full flex flex-col justify-center border border-[#7A1712]"
          >
            <div className="text-center mb-6">
              <h3 className="text-[56px] font-playfair font-semibold text-[#2A1610] leading-none mb-2">4.8</h3>
              <div className="flex justify-center gap-1 text-[#C5A059] mb-2">
                <Star fill="currentColor" size={20} />
                <Star fill="currentColor" size={20} />
                <Star fill="currentColor" size={20} />
                <Star fill="currentColor" size={20} />
                <Star fill="currentColor" size={20} />
              </div>
              <p className="text-[#2A1610]/60 font-jakarta font-medium uppercase text-[12px] tracking-widest">Rating Rata-rata</p>
            </div>
            <p className="text-[#2A1610]/80 font-jakarta font-normal text-center mb-8 text-[14px] leading-[1.6]">
              16/04 no, Jl. Tanjungsari No.4B, Penambangan, Krembangan, Kec. Taman, Kabupaten Sidoarjo, Jawa Timur 61257
            </p>
            <a 
              href="https://maps.app.goo.gl/oXTKd8x8dncXZ6eV8" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-[#7A1712] text-[#FDFBF7] w-full py-3 rounded-[8px] font-jakarta font-bold text-[14px] flex items-center justify-center gap-2 hover:bg-[#5E120E] transition-all duration-300 ease-out shadow-[0px_4px_12px_rgba(122,23,18,0.2)]"
            >
              <MapPin size={18} /> Buka di Maps
            </a>
          </motion.div>
        </div>

        {/* Wrapper Reviews Berjejer */}
        <div>
          <div className="flex justify-between items-end mb-6">
            <h3 className="font-jakarta font-medium text-[#2A1610]/60 uppercase tracking-widest text-[12px] flex items-center gap-2">
              <MessageCircle size={16} className="text-[#7A1712]" /> Sorotan Ulasan Pelanggan
            </h3>
          </div>
          
          <div className="flex gap-6 overflow-x-auto pb-8 pt-2 hide-scrollbar snap-x">
            {customerReviews.map((review) => (
              <div 
                key={review.id} 
                className="min-w-[280px] md:min-w-[320px] bg-[#EFE5D5] shadow-[0px_4px_12px_rgba(0,0,0,0.05)] border border-[#7A1712] rounded-[16px] p-6 snap-start flex flex-col hover:-translate-y-[2px] transition-transform duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-playfair font-semibold text-[#2A1610] text-[18px]">{review.name}</h4>
                    <p className="font-jakarta font-normal text-[12px] text-[#2A1610]/60">{review.time}</p>
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
              </div>
            ))}
          </div>

          {/* TOMBOL REDIRECT */}
          <div className="mt-4">
             <a 
               href="https://maps.app.goo.gl/oXTKd8x8dncXZ6eV8" 
               target="_blank" 
               rel="noopener noreferrer"
               className="w-full bg-[#EFE5D5] border border-[#7A1712] rounded-[16px] p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-[0px_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-[2px] transition-all duration-300 group"
             >
               <div className="flex items-center gap-4 text-left">
                  <div className="w-12 h-12 bg-[#FDFBF7] rounded-full flex items-center justify-center text-[#C5A059] border border-[#C5A059]/20">
                     <Star fill="currentColor" size={20} />
                  </div>
                  <div>
                    <h4 className="font-playfair font-semibold text-[18px] md:text-[20px] text-[#2A1610] mb-1">Lebih dari 50+ Pelanggan Telah Membuktikan</h4>
                    <p className="font-jakarta font-normal text-[14px] text-[#2A1610]/70">Baca seluruh ulasan jujur mereka di Google Maps.</p>
                  </div>
               </div>
               <div className="text-[#FDFBF7] bg-[#7A1712] px-6 py-2.5 rounded-[8px] font-jakarta font-bold text-[14px] flex items-center gap-2 group-hover:bg-[#5E120E] transition-all duration-300 shadow-sm">
                 Lihat Semua Ulasan <ExternalLink size={18} />
               </div>
             </a>
          </div>
        </div>
      </section>

      {/* SECTION: GALLERY */}
      <section className="bg-[#FDFBF7] py-[80px] overflow-hidden">
        <div className="text-center mb-12 px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="text-[32px] md:text-[48px] font-playfair font-semibold text-[#2A1610] mb-4"
          >
            Mengintip Dapur Oriena
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.1 }} 
            className="text-[12px] font-jakarta font-medium text-[#2A1610]/60 uppercase tracking-widest border border-[#2A1610]/20 inline-block px-4 py-1.5 rounded-full"
          >
            Geser atau Tahan untuk melihat
          </motion.p>
        </div>

        <AutoScrollGallery items={galleryItems} />
      </section>
    </motion.div>
  );
}

// ==========================================
// COMPONENT: AUTO SCROLL GALLERY
// ==========================================
function AutoScrollGallery({ items }: { items: any[] }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  
  const isDownRef = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const displayPhotos = [...items, ...items, ...items];

  useEffect(() => {
    let animationId: number;
    
    const autoScroll = () => {
      if (carouselRef.current && !isDownRef.current) {
        carouselRef.current.scrollLeft += 1; 
        
        const oneThird = carouselRef.current.scrollWidth / 3;
        
        if (carouselRef.current.scrollLeft >= oneThird * 2) {
          carouselRef.current.scrollLeft -= oneThird;
        } else if (carouselRef.current.scrollLeft <= 0) {
          carouselRef.current.scrollLeft += oneThird;
        }
      }
      animationId = requestAnimationFrame(autoScroll);
    };
    
    animationId = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDownRef.current = true;
    setIsDown(true);
    if (carouselRef.current) {
      startX.current = e.pageX - carouselRef.current.offsetLeft;
      scrollLeft.current = carouselRef.current.scrollLeft;
    }
  };
  
  const handleMouseLeave = () => {
    isDownRef.current = false;
    setIsDown(false);
  };
  
  const handleMouseUp = () => {
    isDownRef.current = false;
    setIsDown(false);
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDownRef.current || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    carouselRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDownRef.current = true;
    setIsDown(true);
    if (carouselRef.current) {
      startX.current = e.touches[0].pageX - carouselRef.current.offsetLeft;
      scrollLeft.current = carouselRef.current.scrollLeft;
    }
  };
  
  const handleTouchEnd = () => {
    isDownRef.current = false;
    setIsDown(false);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDownRef.current || !carouselRef.current) return;
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    carouselRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div
      ref={carouselRef}
      className={`flex gap-6 overflow-x-hidden px-4 md:px-8 pb-12 pt-4 hide-scrollbar ${isDown ? 'cursor-grabbing' : 'cursor-grab'}`}
      onMouseDown={handleMouseDown} 
      onMouseLeave={handleMouseLeave} 
      onMouseUp={handleMouseUp} 
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart} 
      onTouchEnd={handleTouchEnd} 
      onTouchMove={handleTouchMove}
    >
      {displayPhotos.map((item, idx) => (
        <motion.div
          key={idx}
          className="min-w-[280px] md:min-w-[340px] bg-[#EFE5D5] border border-[#7A1712] shadow-[0px_4px_12px_rgba(0,0,0,0.05)] rounded-[16px] overflow-hidden relative group flex-shrink-0 transition-transform duration-300 flex flex-col hover:-translate-y-[2px]"
        >
          <div className="aspect-[4/5] overflow-hidden relative pointer-events-none">
            <img 
              src={item.image} 
              alt={item.title} 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[0.5s] ease-out" 
            />
          </div>
          
        </motion.div>
      ))}
    </div>
  );
}