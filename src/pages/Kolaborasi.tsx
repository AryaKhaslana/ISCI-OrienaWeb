import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Coffee, 
  Handshake, 
  MessageCircle, 
  Send, 
  UploadCloud,
  ArrowDownRight,
} from 'lucide-react';

export default function Kolaborasi() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    date: '',
    quantity: '',
    message: ''
  });

  // Warna khusus card dihapus, diganti jadi standar elegan
  const collabOptions = [
    { 
      id: 'corporate', 
      title: 'Hampers Kantor', 
      desc: 'Sajian untuk karyawan atau klien. kirim ke seluruh Indonesia.', 
      icon: <Building2 size={28} strokeWidth={1.5} />
    },
    { 
      id: 'cafe', 
      title: 'Kemitraan Cafe', 
      desc: 'Suplai camilan premium secara rutin untuk mendampingi sajian kopi di tempat Anda.', 
      icon: <Coffee size={28} strokeWidth={1.5} />
    },
    { 
      id: 'collab', 
      title: 'Kolaborasi Event', 
      desc: 'Bikin menu bundling eksklusif atau pop-up event bersama. wujudkan ide kreatif Anda!.', 
      icon: <Handshake size={28} strokeWidth={1.5} />
    },
    { 
      id: 'casual', 
      title: 'Sapa Kami', 
      desc: 'Punya pertanyaan khusus, kritik, atau saran? Pintu dapur kami selalu terbuka.', 
      icon: <MessageCircle size={28} strokeWidth={1.5} />
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSendWA = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumber = "628126120165";
    let text = `Halo Admin Oriena! 👋\n\n`;

    if (selectedType === 'corporate') {
      text += `Saya tertarik berdiskusi mengenai *Hampers Kantor*.\n\n`;
      text += `🏢 Instansi: ${formData.company || '-'}\n`;
      text += `📦 Estimasi: ${formData.quantity || '-'} box\n`;
      text += `📅 Tanggal: ${formData.date || '-'}\n`;
    } else if (selectedType === 'cafe') {
      text += `Saya ingin berdiskusi mengenai *Suplai Cafe*.\n\n`;
      text += `☕ Nama Cafe: ${formData.company || '-'}\n`;
      text += `📦 Kebutuhan Harian: ${formData.quantity || '-'}\n`;
    } else if (selectedType === 'collab') {
      text += `Saya ada ide untuk *Kolaborasi Event*!\n\n`;
      text += `🤝 Nama Brand/Acara: ${formData.company || '-'}\n`;
    } else {
      text += `Saya ingin *Menyapa Oriena*.\n\n`;
    }

    text += `👤 Dari: ${formData.name || '-'}\n`;
    text += `💬 Pesan: ${formData.message || '-'}\n\n`;
    text += `Ditunggu balasan hangatnya, terima kasih!`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#FDFBF7] font-jakarta overflow-hidden relative"
    >
      

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-48 md:pt-10 relative z-10">
        
        {/* ==========================================
        // SECTION: HEADER
        // ========================================== */}
        <div className="text-center mb-[80px] space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[42px] md:text-[64px] font-playfair font-bold text-[#2A1610] tracking-tight leading-[1.1]"
          >
            Wujudkan Ide Anda <br className="hidden md:block" />
            <span className="italic text-[#7A1712]">Bersama Kami.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[16px] md:text-[18px] text-[#2A1610]/80 font-normal max-w-2xl mx-auto leading-[1.6]"
          >
            Kami mendengarkan setiap kebutuhan Anda. Mari diskusikan peluang kolaborasi untuk menghadirkan kehangatan Oriena di setiap acara dan tempat Anda.
          </motion.p>
        </div>

        {/* ==========================================
        // SECTION: CARDS PILIHAN
        // ========================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-[80px]">
          {collabOptions.map((opt, idx) => (
            <motion.button
              key={opt.id}
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: idx * 0.1, duration: 0.6, ease: "easeOut" }}
              onClick={() => {
                setSelectedType(opt.id);
                setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 100);
              }}
              className="group text-left"
            >
              <div 
                className={`h-full border border-[#7A1712] rounded-[16px] p-8 bg-[#EFE5D5] flex flex-col z-10 relative transition-all duration-300 ${
                  selectedType === opt.id 
                    ? 'shadow-[0px_8px_24px_rgba(122,23,18,0.15)] -translate-y-[4px] ring-1 ring-[#7A1712]' 
                    : 'shadow-[0px_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-[2px] hover:shadow-[0px_8px_24px_rgba(0,0,0,0.08)]'
                }`}
              >
                <div 
                  className={`w-14 h-14 rounded-full flex items-center justify-center text-[#7A1712] bg-[#FDFBF7] mb-6 border border-[#C5A059]/30 shadow-sm group-hover:scale-110 group-hover:bg-[#7A1712] group-hover:text-[#FDFBF7] transition-all duration-300`}
                >
                  {opt.icon}
                </div>
                <h3 className="font-playfair font-semibold text-[20px] text-[#2A1610] mb-3 leading-tight group-hover:text-[#7A1712] transition-colors">
                  {opt.title}
                </h3>
                <p className="text-[#2A1610]/70 font-normal text-[14px] leading-[1.6] mt-auto">
                  {opt.desc}
                </p>
                
                {selectedType === opt.id && (
                  <div className="absolute top-6 right-6 text-[#7A1712]">
                    <ArrowDownRight size={24} strokeWidth={2} />
                  </div>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        {/* ==========================================
        // SECTION: FORM DINAMIS
        // ========================================== */}
        <AnimatePresence mode="wait">
          {selectedType && (
            <motion.div
              key={selectedType}
              initial={{ opacity: 0, height: 0, y: 20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <form 
                onSubmit={handleSendWA} 
                className="bg-[#EFE5D5] p-8 md:p-12 rounded-[16px] border border-[#7A1712] shadow-[0px_4px_12px_rgba(0,0,0,0.05)] relative z-10 mb-8"
              >
                <div className="mb-12 text-center md:text-left border-b border-[#C5A059]/20 pb-6">
                  <h3 className="text-[28px] md:text-[32px] font-playfair font-semibold text-[#2A1610] mb-2">
                    Formulir {collabOptions.find(o => o.id === selectedType)?.title}
                  </h3>
                  <p className="text-[#2A1610]/70 font-normal text-[15px]">
                    Mohon lengkapi detail berikut agar kami dapat melayani Anda dengan maksimal.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <div className="space-y-2">
                    <label className="text-[12px] font-semibold text-[#2A1610]/80 uppercase tracking-widest">Nama Lengkap *</label>
                    <input 
                      required 
                      name="name" 
                      onChange={handleInputChange} 
                      type="text" 
                      className="w-full bg-[#FDFBF7] border border-[#C5A059]/30 rounded-[8px] p-3.5 outline-none text-[#2A1610] font-normal text-[15px] focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-all" 
                      placeholder="Masukkan nama Anda..." 
                    />
                  </div>

                  {selectedType === 'corporate' && (
                    <>
                      <div className="space-y-2">
                        <label className="text-[12px] font-semibold text-[#2A1610]/80 uppercase tracking-widest">Perusahaan / Instansi *</label>
                        <input 
                          required 
                          name="company" 
                          onChange={handleInputChange} 
                          type="text" 
                          className="w-full bg-[#FDFBF7] border border-[#C5A059]/30 rounded-[8px] p-3.5 outline-none text-[#2A1610] font-normal text-[15px] focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-all" 
                          placeholder="Nama perusahaan..." 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[12px] font-semibold text-[#2A1610]/80 uppercase tracking-widest">Estimasi Jumlah Box</label>
                        <input 
                          name="quantity" 
                          onChange={handleInputChange} 
                          type="text" 
                          className="w-full bg-[#FDFBF7] border border-[#C5A059]/30 rounded-[8px] p-3.5 outline-none text-[#2A1610] font-normal text-[15px] focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-all" 
                          placeholder="Contoh: 50 Box" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[12px] font-semibold text-[#2A1610]/80 uppercase tracking-widest">Tanggal Acara</label>
                        <input 
                          name="date" 
                          onChange={handleInputChange} 
                          type="date" 
                          className="w-full bg-[#FDFBF7] border border-[#C5A059]/30 rounded-[8px] p-3.5 outline-none text-[#2A1610] font-normal text-[15px] focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-all" 
                        />
                      </div>
                      
                      <div className="space-y-2 md:col-span-2 mt-4">
                        <label className="text-[12px] font-semibold text-[#2A1610]/80 uppercase tracking-widest">Logo Instansi (Opsional)</label>
                        <label className="w-full bg-[#FDFBF7] border border-dashed border-[#C5A059] hover:bg-[#C5A059]/5 rounded-[8px] p-8 flex flex-col items-center justify-center cursor-pointer transition-all group">
                          <UploadCloud className="text-[#C5A059] group-hover:-translate-y-1 transition-transform mb-3" size={32} strokeWidth={1.5} />
                          <p className="text-[15px] text-[#2A1610] font-medium mb-1">
                            {fileName ? fileName : 'Klik untuk unggah logo'}
                          </p>
                          <p className="text-[13px] text-[#2A1610]/60 font-normal text-center">
                            {fileName ? 'Logo siap dilampirkan via WhatsApp' : 'Untuk dicetak pada pita/kartu. Format PNG/JPG max 5MB.'}
                          </p>
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*" 
                            onChange={handleFileChange} 
                          />
                        </label>
                      </div>
                    </>
                  )}

                  {selectedType === 'cafe' && (
                    <>
                      <div className="space-y-2">
                        <label className="text-[12px] font-semibold text-[#2A1610]/80 uppercase tracking-widest">Nama Tempat / Cafe *</label>
                        <input 
                          required 
                          name="company" 
                          onChange={handleInputChange} 
                          type="text" 
                          className="w-full bg-[#FDFBF7] border border-[#C5A059]/30 rounded-[8px] p-3.5 outline-none text-[#2A1610] font-normal text-[15px] focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-all" 
                          placeholder="Nama cafe Anda..." 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[12px] font-semibold text-[#2A1610]/80 uppercase tracking-widest">Estimasi Kebutuhan Harian</label>
                        <input 
                          name="quantity" 
                          onChange={handleInputChange} 
                          type="text" 
                          className="w-full bg-[#FDFBF7] border border-[#C5A059]/30 rounded-[8px] p-3.5 outline-none text-[#2A1610] font-normal text-[15px] focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-all" 
                          placeholder="Contoh: 20 pcs roti/hari" 
                        />
                      </div>
                    </>
                  )}

                  {selectedType === 'collab' && (
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-[12px] font-semibold text-[#2A1610]/80 uppercase tracking-widest">Nama Brand / Acara *</label>
                      <input 
                        required 
                        name="company" 
                        onChange={handleInputChange} 
                        type="text" 
                        className="w-full bg-[#FDFBF7] border border-[#C5A059]/30 rounded-[8px] p-3.5 outline-none text-[#2A1610] font-normal text-[15px] focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-all" 
                        placeholder="Nama brand atau acara..." 
                      />
                    </div>
                  )}

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[12px] font-semibold text-[#2A1610]/80 uppercase tracking-widest">Pesan / Detail Kebutuhan *</label>
                    <textarea 
                      required 
                      name="message" 
                      onChange={handleInputChange} 
                      rows={4} 
                      className="w-full bg-[#FDFBF7] border border-[#C5A059]/30 rounded-[8px] p-3.5 outline-none text-[#2A1610] font-normal text-[15px] focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-all resize-none" 
                      placeholder="Ceritakan detail ide Anda di sini..." 
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
                  <p className="text-[13px] text-[#2A1610]/60 font-medium w-full sm:w-1/2">
                    *Formulir ini akan diteruskan secara otomatis ke WhatsApp Official Oriena.
                  </p>
                  <button 
                    type="submit"
                    className="w-full sm:w-auto bg-[#7A1712] text-[#FDFBF7] px-8 py-3.5 rounded-[8px] font-jakarta font-bold text-[15px] flex items-center justify-center gap-3 hover:bg-[#5E120E] hover:-translate-y-[2px] transition-all shadow-[0px_4px_12px_rgba(122,23,18,0.2)] shrink-0"
                  >
                    <Send size={18} strokeWidth={2} /> Kirim via WhatsApp
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
}