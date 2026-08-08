import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion'; 

// IMPORT SUPABASE (Penting buat ngecek login)
import { supabase } from './lib/supabase'; 

// Import Layout & UI
import LoadingScreen from './components/ui/LoadingScreen'; 
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FloatingWA from './components/ui/FloatingWA';

// Import Pages
import Beranda from './pages/Beranda';
import Tentang from './pages/Tentang';
import Katalog from './pages/Katalog';
import Kolaborasi from './pages/Kolaborasi';
import Cart from './pages/Cart';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

// Definisikan tipe untuk item di keranjang
export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
}

export default function App() {
  const [currentView, setCurrentView] = useState<string>(
    window.location.search.includes('rahasia') ? 'kelola-oriena' : 'beranda'
  );
  
  // ==========================================
  // SATPAM PENGECEK LOGIN (BIAR GAK KEPENTAL PAS REFRESH)
  // ==========================================
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      // Kalau masih punya sesi aktif, paksa tetap di dashboard admin
      if (session) {
        setCurrentView('dashboard-rahasia');
      }
    };
    
    checkSession();

    // Dengerin perubahan kalau misal admin sengaja klik LogOut
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session && currentView === 'dashboard-rahasia') {
        setCurrentView('beranda');
      }
    });

    return () => subscription.unsubscribe();
  }, [currentView]);
  // ==========================================

  // State untuk menyimpan detail barang di keranjang
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  // cartCount otomatis dihitung dari total quantity semua barang
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => { setIsLoading(false); }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Fungsi sakti buat nambah barang ke keranjang
  const addToCart = (product: {id: string | number, name: string, price: number}) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Fungsi buat update jumlah atau hapus barang di keranjang
  const updateCartItem = (id: string | number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    } else {
      setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
    }
  };

  const renderView = () => {
    switch(currentView) {
      case 'beranda': return <Beranda key="beranda" setCurrentView={setCurrentView} setCartCount={() => {}} addToCart={addToCart} />;
      case 'tentang': return <Tentang key="tentang" />;
      case 'katalog': return <Katalog key="katalog" setCartCount={() => {}} addToCart={addToCart} />;
      case 'kolaborasi': return <Kolaborasi key="kolaborasi" />;
      case 'cart': return <Cart key="cart" cartItems={cartItems} updateCartItem={updateCartItem} setCurrentView={setCurrentView} />;
      
      // INI JALUR RAHASIA BUAT LOGIN BU ENDAH:
      case 'kelola-oriena': return <AdminLogin key="admin-login" setCurrentView={setCurrentView} />;
      case 'dashboard-rahasia': return <AdminDashboard key="admin-dashboard" setCurrentView={setCurrentView} />;
      
      default: return <Beranda key="default" setCurrentView={setCurrentView} setCartCount={() => {}} addToCart={addToCart} />;
    }
  };

  const isAdminPage = currentView === 'kelola-oriena' || currentView === 'dashboard-rahasia';

  return (
    <div className="min-h-screen bg-[#FAF5E9] text-[#4A3022] font-jakarta selection:bg-[#D97736] selection:text-[#FAF5E9] overflow-x-hidden relative flex flex-col">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #D97736; border-radius: 10px; }
      `}</style>

      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          {/* Navbar disembunyiin kalau lagi di halaman admin */}
          {!isAdminPage && <Navbar currentView={currentView} setCurrentView={setCurrentView} cartCount={cartCount} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />}
          
          {/* Padding top dihilangin kalau lagi di halaman admin */}
          <main className={`${isAdminPage ? '' : 'pt-20'} flex-grow`}>
            <AnimatePresence mode="wait">
              {renderView()}
            </AnimatePresence>
          </main>

          {/* Footer & WA disembunyiin kalau lagi di halaman admin */}
          {!isAdminPage && <Footer setCurrentView={setCurrentView} />}
          {!isAdminPage && <FloatingWA />} 
        </>
      )}
    </div>
  );
}