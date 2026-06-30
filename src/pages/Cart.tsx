import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  ArrowRight, 
  MessageSquare, 
  Printer, 
  Plus, 
  Minus 
} from 'lucide-react';

// TYPES & INTERFACES
interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  cartItems: CartItem[];
  updateCartItem: (id: string | number, newQuantity: number) => void;
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
}

// COMPONENT MAIN: CART / KASIR
export default function Cart({ cartItems, updateCartItem, setCurrentView }: CartProps) {
  const [formData, setFormData] = useState({ 
    name: '', 
    address: '', 
    notes: '' 
  });

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckoutWA = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumber = "628126120165";
    let text = `Halo Admin Oriena! 👋\nSaya mau checkout pesanan dari Website nih:\n\n`;
    text += `🧾 *STRUK PESANAN*\n`;

    cartItems.forEach(item => {
      text += `- ${item.name} (${item.quantity}x) = Rp ${(item.price * item.quantity).toLocaleString('id-ID')}\n`;
    });

    text += `\n*SUBTOTAL: Rp ${subtotal.toLocaleString('id-ID')}*\n\n`;
    text += `📍 *INFO PENGIRIMAN:*\n`;
    text += `Nama: ${formData.name}\n`;
    text += `Alamat: ${formData.address}\n`;
    text += `Catatan: ${formData.notes || '-'}\n\n`;
    text += `Mohon info total ongkir dan nomor rekening pembayarannya ya Kak!`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-[80px] font-jakarta"
    >
      
      {/* SECTION: HEADER */}
      <div className="text-center mb-16">
        <h1 className="text-[42px] md:text-[56px] font-playfair font-bold text-[#2A1610] mb-4">
          Kasir Oriena.
        </h1>
        <p className="text-[16px] text-[#2A1610]/70 max-w-2xl mx-auto font-normal">
          {cartCount > 0 
            ? "Pesanan Anda sudah di meja kasir, silakan lengkapi informasi pengiriman." 
            : "Keranjang Anda masih kosong. Mari jelajahi koleksi rasa kami."}
        </p>
      </div>

      {cartCount === 0 ? (
        
        /* SECTION: EMPTY CART STATE */
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          className="bg-[#EFE5D5] p-10 md:p-16 rounded-[16px] shadow-[0px_4px_12px_rgba(0,0,0,0.05)] border border-[#7A1712] text-center flex flex-col items-center max-w-2xl mx-auto"
        >
          <div className="w-20 h-20 bg-[#FDFBF7] border border-[#7A1712]/20 text-[#7A1712] rounded-full flex items-center justify-center mb-6 shadow-sm">
            <ShoppingBag size={32} strokeWidth={1.5} />
          </div>
          <h3 className="text-[28px] font-playfair font-semibold text-[#2A1610] mb-3">
            Belum Ada Pesanan
          </h3>
          <p className="text-[#2A1610]/70 font-normal text-[15px] mb-8 max-w-sm">
            Temukan berbagai kreasi pastry dan cookies artisan dari oven kami.
          </p>
          <button 
            onClick={() => setCurrentView('katalog')} 
            className="bg-[#7A1712] text-[#FDFBF7] px-8 py-3.5 rounded-[8px] font-bold flex items-center gap-3 hover:bg-[#5E120E] hover:-translate-y-[2px] transition-all duration-300 shadow-[0px_4px_12px_rgba(122,23,18,0.2)]"
          >
            Lihat Katalog Produk <ArrowRight size={18} strokeWidth={2} />
          </button>
        </motion.div>
      ) : (
        
        /* SECTION: ACTIVE CART & CHECKOUT FORM */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* SISI KIRI: ANIMASI STRUK KASIR (DESAIN STRUK TIDAK DIUBAH, HANYA WARNA FRAME ATAS) */}
          <div className="lg:col-span-5 flex flex-col items-center overflow-hidden pt-4">
            <div className="w-full max-w-sm relative">
              {/* Frame printer disesuaikan warnanya ke Espresso Brown agar matching */}
              <div className="bg-[#2A1610] w-full h-16 rounded-t-3xl relative z-20 flex items-center justify-center border-b-4 border-black/40 shadow-xl">
                <Printer className="text-white/50" size={24} />
                <div className="absolute bottom-0 w-3/4 h-2 bg-black/50 rounded-t-lg"></div>
              </div>

              {/* KERTAS STRUK ASLI - TIDAK DIUBAH */}
              <motion.div
                initial={{ y: "-100%", opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                transition={{ type: "spring", stiffness: 50, damping: 15, delay: 0.2 }}
                className="bg-[#fdfbf7] w-11/12 mx-auto pb-12 pt-8 px-6 shadow-2xl relative z-10 font-mono text-[#333]"
                style={{ 
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 95% 98%, 90% 100%, 85% 98%, 80% 100%, 75% 98%, 70% 100%, 65% 98%, 60% 100%, 55% 98%, 50% 100%, 45% 98%, 40% 100%, 35% 98%, 30% 100%, 25% 98%, 20% 100%, 15% 98%, 10% 100%, 5% 98%, 0 100%)' 
                }}
              >
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-black uppercase tracking-widest">ORIENA.</h2>
                  <p className="text-xs mt-1">Artisan Bakery & Hampers</p>
                  <p className="text-xs">Sidoarjo, Jawa Timur</p>
                  <div className="border-b-2 border-dashed border-gray-400 mt-4"></div>
                </div>

                <div className="space-y-4 mb-6 text-sm">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex flex-col gap-1 border-b border-gray-200 pb-2">
                      <div className="flex justify-between items-start">
                        <p className="uppercase font-bold line-clamp-1 flex-1 pr-2">{item.name}</p>
                        <p className="font-bold">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</p>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500">@ Rp {item.price.toLocaleString('id-ID')}</span>
                        <div className="flex items-center gap-3 bg-gray-100 rounded-md px-2 py-1">
                          <button 
                            onClick={() => updateCartItem(item.id, item.quantity - 1)} 
                            className="hover:text-red-500"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="font-bold w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateCartItem(item.id, item.quantity + 1)} 
                            className="hover:text-green-500"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t-2 border-dashed border-gray-400 pt-4 space-y-2 text-sm font-bold">
                  <div className="flex justify-between">
                    <span>SUBTOTAL</span>
                    <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 font-normal">
                    <span>Tax & Ongkir</span>
                    <span>Dihitung di WA</span>
                  </div>
                </div>

                <div className="border-t-2 border-black mt-6 pt-4 text-center">
                  <p className="text-xs font-bold">TERIMA KASIH</p>
                  <p className="text-[10px] mt-1">Struk ini akan dikirim otomatis ke WA.</p>
                  <div className="h-10 w-full bg-[repeating-linear-gradient(90deg,#333_0,#333_2px,transparent_2px,transparent_4px,#333_4px,#333_5px,transparent_5px,transparent_8px)] mt-4 opacity-70"></div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* SISI KANAN: FORM CHECKOUT ELEGAN */}
          <motion.form 
            initial={{ opacity: 0, x: 50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }} 
            onSubmit={handleCheckoutWA} 
            className="lg:col-span-7 bg-[#EFE5D5] border border-[#7A1712] shadow-[0px_4px_12px_rgba(0,0,0,0.05)] rounded-[16px] p-8 md:p-10 relative"
          >
            <h3 className="text-[28px] md:text-[32px] font-playfair font-semibold text-[#2A1610] mb-8 leading-tight border-b border-[#C5A059]/20 pb-4">
              Informasi Pengiriman
            </h3>

            <div className="space-y-6 mb-10">
              <div className="space-y-2">
                <label className="text-[12px] font-semibold text-[#2A1610]/80 uppercase tracking-widest">
                  Nama Penerima *
                </label>
                <input 
                  required 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  type="text" 
                  placeholder="Masukkan nama lengkap..."
                  className="w-full bg-[#FDFBF7] border border-[#C5A059]/30 rounded-[8px] p-3.5 outline-none text-[#2A1610] font-normal text-[15px] focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-all placeholder:text-[#2A1610]/40" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-semibold text-[#2A1610]/80 uppercase tracking-widest">
                  Alamat Lengkap *
                </label>
                <textarea 
                  required 
                  name="address" 
                  value={formData.address} 
                  onChange={handleInputChange} 
                  rows={3} 
                  placeholder="Contoh: Jl. Mawar No. 12, Kelurahan, Kecamatan..."
                  className="w-full bg-[#FDFBF7] border border-[#C5A059]/30 rounded-[8px] p-3.5 outline-none text-[#2A1610] font-normal text-[15px] focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-all resize-none placeholder:text-[#2A1610]/40" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-semibold text-[#2A1610]/80 uppercase tracking-widest">
                  Catatan Pengiriman (Opsional)
                </label>
                <input 
                  name="notes" 
                  value={formData.notes} 
                  onChange={handleInputChange} 
                  type="text" 
                  placeholder="Titip di pos satpam / pagar warna hitam..."
                  className="w-full bg-[#FDFBF7] border border-[#C5A059]/30 rounded-[8px] p-3.5 outline-none text-[#2A1610] font-normal text-[15px] focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-all placeholder:text-[#2A1610]/40" 
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#7A1712] text-[#FDFBF7] py-3.5 rounded-[8px] font-bold text-[15px] flex items-center justify-center gap-3 hover:bg-[#5E120E] hover:-translate-y-[2px] transition-all duration-300 shadow-[0px_4px_12px_rgba(122,23,18,0.2)]"
            >
              <MessageSquare size={20} strokeWidth={2} /> Konfirmasi via WhatsApp
            </button>
          </motion.form>

        </div>
      )}
    </motion.div>
  );
}