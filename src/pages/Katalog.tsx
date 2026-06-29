import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ShoppingBag, 
  X, 
  Star, 
  Plus, 
  Cookie, 
  MessageCircle,
} from 'lucide-react';
// IMPORT CLIENT SUPABASE LU DI SINI (Sesuaikan foldernya)
import { supabase } from '../lib/supabase'; 

interface KatalogProps {
  setCartCount: any; 
  addToCart: (product: { id: string | number; name: string; price: number }) => void;
}

export default function Katalog({ addToCart }: KatalogProps) {
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  
  // STATE DATA SUPABASE
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [carouselProducts, setCarouselProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const filters = ['Semua', 'Cookies', 'Bakery', 'Snack', 'Lain-lain'];

  // LOGIC TARIK DATA DARI DATABASE SUPABASE
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('id', { ascending: true }); 

        if (error) {
          console.error("Error fetching products:", error);
          return;
        }

        if (data) {
          setAllProducts(data);
          const bestSellers = data.filter((item) => item.badge === 'BEST SELLER');
          setCarouselProducts(bestSellers.length > 0 ? bestSellers : data.slice(0, 3));
        }
      } catch (err) {
        console.error("Unknown error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filterLogic = (product: any) => {
    const matchCategory = activeFilter === 'Semua' || product.category === activeFilter;
    const matchSearch = product.name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  };

  const filteredCarousel = carouselProducts.filter(filterLogic);
  const filteredAll = allProducts.filter(filterLogic);

  // Auto-play Carousel
  useEffect(() => {
    if (filteredCarousel.length <= 1) return;
    const timer = setInterval(() => {
      setCarouselIndex((prevIndex) => (prevIndex + 1) % filteredCarousel.length);
    }, 3000); 
    return () => clearInterval(timer);
  }, [filteredCarousel.length]);

  const heroImage = "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=2000";

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="pb-24 bg-[#F7F3EB] min-h-screen"
    >
      
      {/* SECTION 1: HERO */}
      <div className="relative w-full h-[300px] md:h-[400px] mb-16 flex items-center justify-center overflow-hidden border-b-8 border-[#4A3022]">
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt="Katalog Oriena" className="w-full h-full object-cover opacity-90" />
          <div className="absolute inset-0 bg-[#4A3022]/60 mix-blend-multiply"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto mt-16 md:mt-0">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} 
            className="bg-[#FAF5E9] border-4 border-[#4A3022] px-8 py-6 rounded-3xl shadow-[8px_8px_0px_#4A3022]"
          >
            <h1 className="text-4xl md:text-6xl font-playfair font-black text-[#4A3022] mb-2">
              Koleksi <span className="text-[#D97736]">Rasa.</span>
            </h1>
            <p className="text-md font-jakarta text-[#4A3022]/80 font-bold">
              Eksplorasi mahakarya oven kami untuk teman ngopimu.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION 2: PENCARIAN & FILTER */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-col items-center gap-6 mb-16">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4A3022]" size={24} strokeWidth={3} />
            <input 
              type="text" 
              placeholder="Cari nastar, roti sisir..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              className="w-full font-jakarta font-bold bg-white border-4 border-[#4A3022] focus:border-[#D97736] rounded-2xl py-4 pl-14 pr-4 outline-none text-[#4A3022] shadow-[6px_6px_0px_#4A3022] transition-colors placeholder:text-[#4A3022]/40" 
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {filters.map(filter => (
              <button 
                key={filter} 
                onClick={() => { setActiveFilter(filter); setCarouselIndex(0); }} 
                className={`px-6 py-2.5 rounded-xl font-jakarta font-black text-sm transition-all duration-300 border-4 ${
                  activeFilter === filter 
                    ? 'bg-[#4A3022] text-[#FAF5E9] border-[#4A3022] shadow-[4px_4px_0px_#D97736] translate-y-1' 
                    : 'bg-white text-[#4A3022] border-[#4A3022] hover:bg-[#FAF5E9] shadow-[4px_4px_0px_#4A3022] hover:-translate-y-1'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>

        {/* LOADING INDICATOR */}
        {isLoading && (
          <div className="w-full py-20 flex flex-col items-center justify-center">
             <Cookie size={48} className="text-[#4A3022] animate-spin mb-4" />
             <p className="font-jakarta font-bold text-[#4A3022]">Menyiapkan adonan dari database...</p>
          </div>
        )}

        {!isLoading && (
          <>
            {/* URUTAN 1: BEST SELLER (KOLEKSI UNGGULAN) */}
            {filteredCarousel.length > 0 && (
              <div className="mb-24">
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-3xl font-playfair font-black text-[#4A3022]">Koleksi Unggulan</h2>
                </div>
                
                <div className="relative w-full h-[450px] md:h-[550px] rounded-[2rem] border-4 border-[#4A3022] shadow-[12px_12px_0px_#4A3022] overflow-hidden bg-[#E0D0BB]">
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={carouselIndex}
                      initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="absolute inset-0 w-full h-full cursor-pointer group"
                      onClick={() => setSelectedProduct(filteredCarousel[carouselIndex])}
                    >
                      <img src={filteredCarousel[carouselIndex].image} alt={filteredCarousel[carouselIndex].name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#4A3022] via-[#4A3022]/60 to-transparent opacity-90"></div>
                      
                      {filteredCarousel[carouselIndex].badge && (
                        <div className="absolute top-6 left-6 md:top-8 md:left-8 z-20">
                          <span className="bg-[#D97736] border-2 border-[#4A3022] text-[#FAF5E9] px-4 py-2 rounded-full text-xs md:text-sm font-jakarta font-black tracking-widest shadow-[4px_4px_0px_#4A3022]">
                            {filteredCarousel[carouselIndex].badge}
                          </span>
                        </div>
                      )}

                      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-20">
                        <p className="text-[#D97736] font-jakarta font-black text-sm md:text-base tracking-widest uppercase mb-2 drop-shadow-[2px_2px_0px_#4A3022]">
                          {filteredCarousel[carouselIndex].category}
                        </p>
                        <h3 className="text-4xl md:text-6xl font-playfair font-black text-[#FAF5E9] mb-4 drop-shadow-[4px_4px_0px_#4A3022] leading-tight">
                          {filteredCarousel[carouselIndex].name}
                        </h3>
                        <p className="text-white/90 font-jakarta font-bold text-base md:text-lg max-w-2xl line-clamp-2 md:line-clamp-none mb-6">
                          {filteredCarousel[carouselIndex].desc}
                        </p>
                        <div className="inline-flex items-center bg-[#FAF5E9] border-4 border-[#4A3022] text-[#D97736] px-6 py-3 rounded-2xl font-jakarta font-black text-xl shadow-[6px_6px_0px_#4A3022] group-hover:bg-[#D97736] group-hover:text-[#FAF5E9] transition-colors">
                          Rp {Number(filteredCarousel[carouselIndex].price).toLocaleString('id-ID')}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="absolute bottom-8 right-8 z-30 flex gap-2">
                    {filteredCarousel.map((_, idx) => (
                      <button 
                        key={idx} onClick={() => setCarouselIndex(idx)}
                        className={`h-3 rounded-full border-2 border-[#4A3022] shadow-[2px_2px_0px_#4A3022] transition-all duration-300 ${carouselIndex === idx ? 'w-10 bg-[#D97736]' : 'w-3 bg-[#FAF5E9]'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* URUTAN 2: KATALOG (SEMUA MENU) */}
            {filteredAll.length > 0 && (
              <div className="mb-24">
                <div className="flex items-center justify-between mb-8 border-t-4 border-[#4A3022] pt-8">
                  <h3 className="text-3xl font-playfair font-black text-[#4A3022]">Semua Menu Kami</h3>
                </div>
                
                <motion.div layout className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
                  <AnimatePresence>
                    {filteredAll.map((product) => (
                      <motion.div
                        layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} key={`all-${product.id}`} 
                        onClick={() => setSelectedProduct(product)}
                        className="group cursor-pointer bg-white rounded-2xl p-3 border-4 border-[#4A3022] shadow-[6px_6px_0px_#4A3022] hover:-translate-y-1 hover:shadow-[8px_8px_0px_#D97736] transition-all duration-300 flex flex-col h-full"
                      >
                        <div className="aspect-square bg-[#E0D0BB] rounded-xl mb-3 border-2 border-[#4A3022] relative overflow-hidden">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="flex flex-col flex-1 px-1">
                          <p className="text-[#829079] text-[10px] font-jakarta font-black uppercase tracking-wider mb-1">{product.category}</p>
                          <h4 className="font-playfair font-black text-[#4A3022] mb-1 line-clamp-2 leading-tight text-sm md:text-base">{product.name}</h4>
                          <span className="text-[#D97736] font-jakarta font-black text-sm mt-auto mb-3">Rp {Number(product.price).toLocaleString('id-ID')}</span>
                          
                          <button 
                            onClick={(e) => { e.stopPropagation(); if (addToCart) { addToCart({ id: product.id, name: product.name, price: product.price }); alert(`${product.name} masuk keranjang!`); } }} 
                            className="w-full py-2 bg-[#FAF5E9] group-hover:bg-[#D97736] border-2 border-[#4A3022] text-[#4A3022] group-hover:text-white rounded-xl font-jakarta font-black text-xs transition-colors flex justify-center items-center gap-2 shadow-[2px_2px_0px_#4A3022] active:translate-y-0.5 active:shadow-none"
                          >
                            <Plus size={16} strokeWidth={3} /> Tambah
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </div>
            )}

            {/* JIKA SUPABASE KOSONG (Menggantikan posisi Urutan 1 & 2) */}
            {filteredCarousel.length === 0 && filteredAll.length === 0 && (
              <div className="mb-24 text-center py-24 bg-white border-4 border-[#4A3022] rounded-3xl shadow-[8px_8px_0px_#4A3022]">
                <Cookie size={64} className="mx-auto text-[#4A3022]/30 mb-4" />
                <h3 className="text-2xl font-playfair font-black text-[#4A3022] mb-2">Waduh, kuenya nggak ketemu!</h3>
                <p className="text-[#4A3022]/60 font-jakarta font-bold">Data katalog di Supabase masih kosong atau coba cari pakai kata kunci lain.</p>
              </div>
            )}
  

            {/* URUTAN 4: BANNER PESANAN PARTAI BESAR */}
            <div className="mb-12">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[#E0D0BB] rounded-[3rem] p-8 md:p-12 border-4 border-[#4A3022] shadow-[12px_12px_0px_#4A3022] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #4A3022 25%, transparent 25%, transparent 75%, #4A3022 75%, #4A3022)', backgroundSize: '20px 20px' }}></div>
                <div className="relative z-10 w-full md:w-2/3 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#D97736] text-[#FAF5E9] border-2 border-[#4A3022] rounded-full text-xs font-jakarta font-black tracking-widest uppercase shadow-[4px_4px_0px_#4A3022] mb-4">Pesan Jumlah Banyak?</div>
                  <h2 className="text-3xl md:text-5xl font-playfair font-black text-[#4A3022] mb-4 leading-tight">Terima Pesanan Partai Besar & Acara.</h2>
                  <p className="text-[#4A3022]/90 font-jakarta font-bold text-base md:text-lg max-w-xl mx-auto md:mx-0">Butuh suguhan untuk acara keluarga, pernikahan, atau hampers instansi? Konsultasikan kebutuhanmu langsung dengan admin kami untuk mendapatkan penawaran harga spesial!</p>
                </div>
                <div className="relative z-10 w-full md:w-1/3 flex justify-center md:justify-end">
                  <a href="https://wa.me/628126120165?text=Halo%20Admin%20Oriena,%20saya%20mau%20tanya%20untuk%20pesanan%20partai%20besar..." target="_blank" rel="noopener noreferrer" className="bg-[#FAF5E9] text-[#4A3022] border-4 border-[#4A3022] px-8 py-4 rounded-2xl font-jakarta font-black text-xl flex items-center gap-3 hover:bg-[#D97736] hover:text-[#FAF5E9] transition-colors shadow-[8px_8px_0px_#4A3022] active:translate-y-1 active:shadow-none group">
                    <MessageCircle className="group-hover:animate-bounce" size={28} /> Chat Admin
                  </a>
                </div>
              </motion.div>
            </div>
          </>
        )}

        {/* SECTION: MODAL DETAIL PRODUK */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#4A3022]/80 backdrop-blur-sm" onClick={() => setSelectedProduct(null)}>
              <motion.div initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }} className="bg-[#FAF5E9] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2rem] border-4 border-[#4A3022] flex flex-col md:flex-row shadow-[12px_12px_0px_#D97736] relative custom-scrollbar" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 p-2 bg-white border-4 border-[#4A3022] text-[#4A3022] rounded-xl hover:bg-[#D97736] hover:text-white transition-all z-30 shadow-[4px_4px_0px_#4A3022] active:translate-y-1 active:shadow-none"><X size={24} strokeWidth={3} /></button>
                <div className="w-full md:w-1/2 relative min-h-[300px] border-b-4 md:border-b-0 md:border-r-4 border-[#4A3022]">
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center font-jakarta bg-[#FAF5E9]">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border-2 border-[#4A3022] text-[#4A3022] rounded-full text-xs font-black tracking-widest uppercase mb-4 w-max shadow-[2px_2px_0px_#4A3022]"><Star size={14} fill="currentColor" /> {selectedProduct.category}</span>
                  <h2 className="text-3xl md:text-5xl font-playfair font-black text-[#4A3022] mb-4">{selectedProduct.name}</h2>
                  <p className="text-[#4A3022]/80 mb-8 font-bold text-base leading-relaxed">{selectedProduct.desc}</p>
                  <div className="text-4xl font-black text-[#D97736] mb-8 bg-white border-4 border-[#4A3022] px-6 py-3 rounded-2xl w-max shadow-[4px_4px_0px_#4A3022]">Rp {Number(selectedProduct.price).toLocaleString('id-ID')}</div>
                  <button onClick={() => { if (addToCart) { addToCart({ id: selectedProduct.id, name: selectedProduct.name, price: selectedProduct.price }); alert(`${selectedProduct.name} masuk keranjang!`); } setSelectedProduct(null); }} className="w-full bg-[#D97736] text-white border-4 border-[#4A3022] py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-[#c46a2b] active:translate-y-1 transition-all shadow-[6px_6px_0px_#4A3022] active:shadow-none"><ShoppingBag size={20} strokeWidth={3} /> Masukkan Keranjang</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
}