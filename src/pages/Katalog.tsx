import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ShoppingBag, 
  X, 
  Star, 
  Plus, 
  Cookie, 
  MessageCircle
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
    }, 4000); 
    return () => clearInterval(timer);
  }, [filteredCarousel.length]);

  
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="pb-[80px] bg-[#FDFBF7] min-h-screen font-jakarta"
    >
      

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION 2: PENCARIAN & FILTER */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-col items-center gap-8 mb-[80px]">
          <div className="relative w-full max-w-lg pt-12">
            <Search className="absolute left-4 top-3/4 -translate-y-1/2 text-[#2A1610]/40" size={20} />
            <input 
              type="text" 
              placeholder="Cari nastar, roti sisir..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              className="w-full font-jakarta font-normal text-[16px] bg-[#FDFBF7] border border-[#EFE5D5] focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] rounded-[8px] py-3.5 pl-12 pr-4 outline-none text-[#2A1610] shadow-[0px_4px_12px_rgba(0,0,0,0.03)] transition-all placeholder:text-[#2A1610]/40" 
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {filters.map(filter => (
              <button 
                key={filter} 
                onClick={() => { setActiveFilter(filter); setCarouselIndex(0); }} 
                className={`px-5 py-2 rounded-[8px] font-jakarta font-semibold text-[14px] transition-all duration-300 ${
                  activeFilter === filter 
                    ? 'bg-[#7A1712] text-[#FDFBF7] shadow-[0px_4px_12px_rgba(122,23,18,0.2)] -translate-y-[2px]' 
                    : 'bg-transparent border-[1.5px] border-[#7A1712] text-[#7A1712] hover:bg-[#EFE5D5] hover:-translate-y-[2px]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>

        {/* LOADING INDICATOR */}
        {isLoading && (
          <div className="w-full py-24 flex flex-col items-center justify-center">
             <Cookie size={40} strokeWidth={1.5} className="text-[#C5A059] animate-spin mb-4" />
             <p className="font-jakarta font-medium text-[#2A1610]/60 tracking-widest uppercase text-[12px]">Menyiapkan adonan...</p>
          </div>
        )}

        {!isLoading && (
          <>
            {/* URUTAN 1: BEST SELLER (KOLEKSI UNGGULAN) */}
            {filteredCarousel.length > 0 && (
              <div className="mb-[80px]">
                <div className="flex items-center gap-3 mb-8">
                  <h2 className="text-[32px] font-playfair font-semibold text-[#2A1610]">Koleksi Unggulan</h2>
                </div>
                
                <div className="relative w-full h-[450px] md:h-[500px] rounded-[16px] shadow-[0px_4px_12px_rgba(0,0,0,0.05)] overflow-hidden bg-[#EFE5D5] border border-[#EFE5D5]">
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={carouselIndex}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}
                      className="absolute inset-0 w-full h-full cursor-pointer group"
                      onClick={() => setSelectedProduct(filteredCarousel[carouselIndex])}
                    >
                      <img src={filteredCarousel[carouselIndex].image} alt={filteredCarousel[carouselIndex].name} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[0.5s] ease-out" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2A1610]/90 via-[#2A1610]/40 to-transparent"></div>
                      
                      {filteredCarousel[carouselIndex].badge && (
                        <div className="absolute top-6 left-6 md:top-8 md:left-8 z-20">
                          <span className="bg-[#C5A059] text-[#FDFBF7] px-4 py-1.5 rounded-[4px] text-[12px] font-jakarta font-bold tracking-widest uppercase shadow-sm">
                            {filteredCarousel[carouselIndex].badge}
                          </span>
                        </div>
                      )}

                      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-20">
                        <p className="text-[#C5A059] font-jakarta font-medium text-[12px] tracking-widest uppercase mb-2">
                          {filteredCarousel[carouselIndex].category}
                        </p>
                        <h3 className="text-[36px] md:text-[48px] font-playfair font-bold text-[#FDFBF7] mb-3 leading-tight">
                          {filteredCarousel[carouselIndex].name}
                        </h3>
                        <p className="text-[#FDFBF7]/80 font-jakarta font-normal text-[15px] md:text-[16px] max-w-2xl line-clamp-2 md:line-clamp-none mb-6">
                          {filteredCarousel[carouselIndex].desc}
                        </p>
                        <div className="inline-flex items-center text-[#FDFBF7] font-playfair font-semibold text-[24px]">
                          Rp {Number(filteredCarousel[carouselIndex].price).toLocaleString('id-ID')}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Indicator Dots */}
                  <div className="absolute bottom-8 right-8 z-30 flex gap-2">
                    {filteredCarousel.map((_, idx) => (
                      <button 
                        key={idx} onClick={() => setCarouselIndex(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${carouselIndex === idx ? 'w-8 bg-[#C5A059]' : 'w-2 bg-[#FDFBF7]/50 hover:bg-[#FDFBF7]'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* URUTAN 2: KATALOG (SEMUA MENU) */}
            {filteredAll.length > 0 && (
              <div className="mb-[80px]">
                <div className="flex items-center justify-between mb-8 border-t border-[#EFE5D5] pt-12">
                  <h3 className="text-[32px] font-playfair font-semibold text-[#2A1610]">Semua Menu Kami</h3>
                </div>
                
                <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  <AnimatePresence>
                    {filteredAll.map((product) => (
                      <motion.div
                        layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} key={`all-${product.id}`} 
                        onClick={() => setSelectedProduct(product)}
                        className="group cursor-pointer bg-[#EFE5D5] border border-[#7A1712] rounded-[16px] p-5 shadow-[0px_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-[2px] hover:shadow-[0px_8px_24px_rgba(122,23,18,0.1)] transition-all duration-300 flex flex-col h-full"
                      >
                        <div className="aspect-square bg-[#FDFBF7] rounded-[8px] mb-4 overflow-hidden relative">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[0.5s] ease-out" />
                        </div>
                        <div className="flex flex-col flex-1">
                          <p className="text-[#C5A059] text-[11px] font-jakarta font-semibold uppercase tracking-widest mb-1.5">{product.category}</p>
                          <h4 className="font-playfair font-semibold text-[#2A1610] text-[18px] mb-2 leading-snug line-clamp-2">{product.name}</h4>
                          <span className="text-[#7A1712] font-jakarta font-bold text-[16px] mt-auto mb-4">Rp {Number(product.price).toLocaleString('id-ID')}</span>
                          
                          <button 
                            onClick={(e) => { e.stopPropagation(); if (addToCart) { addToCart({ id: product.id, name: product.name, price: product.price }); alert(`${product.name} masuk keranjang!`); } }} 
                            className="w-full py-2.5 bg-[#7A1712] text-[#FDFBF7] rounded-[8px] font-jakarta font-bold text-[14px] hover:bg-[#5E120E] flex justify-center items-center gap-2 transition-all"
                          >
                            <Plus size={16} strokeWidth={2} /> Tambah
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </div>
            )}

            {/* JIKA SUPABASE KOSONG */}
            {filteredCarousel.length === 0 && filteredAll.length === 0 && (
              <div className="mb-[80px] text-center py-24 bg-[#FDFBF7] border border-[#EFE5D5] rounded-[16px] shadow-sm">
                <Cookie size={48} strokeWidth={1.5} className="mx-auto text-[#C5A059]/40 mb-4" />
                <h3 className="text-[24px] font-playfair font-semibold text-[#2A1610] mb-2">Pencarian Tidak Ditemukan</h3>
                <p className="text-[#2A1610]/60 font-jakarta font-normal text-[15px]">Data katalog kosong atau coba gunakan kata kunci pencarian yang lain.</p>
              </div>
            )}
  
            {/* URUTAN 4: BANNER PESANAN PARTAI BESAR */}
            <div className="mb-[80px]">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[#EFE5D5] rounded-[16px] p-8 md:p-12 border border-[#C5A059]/30 shadow-[0px_4px_12px_rgba(0,0,0,0.05)] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#FDFBF7]/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="relative z-10 w-full md:w-2/3 text-center md:text-left">
                  <h2 className="text-[32px] md:text-[40px] font-playfair font-semibold text-[#2A1610] mb-4 leading-tight">Sempurnakan Momen <br className="hidden md:block"/> Istimewa Anda  </h2>
                  <p className="text-[#2A1610]/80 font-jakarta font-normal text-[15px] md:text-[16px] max-w-xl mx-auto md:mx-0 leading-[1.6]">Butuh suguhan elegan untuk acara keluarga, pernikahan, atau hampers instansi? Konsultasikan kebutuhan Anda untuk penawaran spesial.</p>
                </div>
                <div className="relative z-10 w-full md:w-1/3 flex justify-center md:justify-end">
                  <a href="https://wa.me/628126120165?text=Halo%20Admin%20Oriena,%20saya%20mau%20tanya%20untuk%20pesanan%20partai%20besar..." target="_blank" rel="noopener noreferrer" className="bg-[#7A1712] text-[#FDFBF7] px-8 py-3.5 rounded-[8px] font-jakarta font-bold text-[16px] flex items-center gap-3 hover:bg-[#5E120E] hover:-translate-y-[2px] transition-all shadow-[0px_4px_12px_rgba(122,23,18,0.2)]">
                    <MessageCircle size={20} /> Chat Admin
                  </a>
                </div>
              </motion.div>
            </div>
          </>
        )}

        {/* SECTION: MODAL DETAIL PRODUK */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-[#2A1610]/60 backdrop-blur-sm" onClick={() => setSelectedProduct(null)}>
              <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} transition={{ duration: 0.3, ease: "easeOut" }} className="bg-[#FDFBF7] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[16px] flex flex-col md:flex-row shadow-2xl relative custom-scrollbar" onClick={(e) => e.stopPropagation()}>
                
                <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 p-2 bg-[#FDFBF7] text-[#2A1610] rounded-full hover:bg-[#EFE5D5] transition-all z-30 shadow-sm"><X size={20} strokeWidth={2} /></button>
                
                <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-[500px]">
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="absolute inset-0 w-full h-full object-cover" />
                </div>
                
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center font-jakarta bg-[#FDFBF7]">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#EFE5D5] text-[#C5A059] rounded-sm text-[11px] font-semibold tracking-widest uppercase mb-4 w-max"><Star size={12} fill="currentColor" /> {selectedProduct.category}</span>
                  <h2 className="text-[32px] md:text-[40px] font-playfair font-semibold text-[#2A1610] mb-4 leading-tight">{selectedProduct.name}</h2>
                  <p className="text-[#2A1610]/70 mb-8 font-normal text-[15px] leading-[1.6]">{selectedProduct.desc}</p>
                  
                  <div className="border-t border-[#EFE5D5] pt-6 mt-auto">
                    <div className="text-[28px] font-playfair font-semibold text-[#7A1712] mb-6">Rp {Number(selectedProduct.price).toLocaleString('id-ID')}</div>
                    <button onClick={() => { if (addToCart) { addToCart({ id: selectedProduct.id, name: selectedProduct.name, price: selectedProduct.price }); alert(`${selectedProduct.name} masuk keranjang!`); } setSelectedProduct(null); }} className="w-full bg-[#7A1712] text-[#FDFBF7] py-3.5 rounded-[8px] font-bold text-[16px] flex items-center justify-center gap-2 hover:bg-[#5E120E] hover:-translate-y-[2px] transition-all shadow-[0px_4px_12px_rgba(122,23,18,0.2)]"><ShoppingBag size={20} strokeWidth={2} /> Masukkan Keranjang</button>
                  </div>
                </div>
                
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
}