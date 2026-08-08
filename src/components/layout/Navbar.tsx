import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  cartCount: number;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

export default function Navbar({
  currentView,
  setCurrentView,
  cartCount,
  isMobileMenuOpen,
  setIsMobileMenuOpen
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'tentang', label: 'Tentang' },
    { id: 'katalog', label: 'Katalog' },
    { id: 'kolaborasi', label: 'Kolaborasi' },
  ];

  return (
    <>
      <div 
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-out ${
          isScrolled ? 'px-4 sm:px-6 lg:px-8 pt-4' : 'px-0 pt-0'
        }`}
      >
        <motion.nav 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className={`w-full transition-all duration-500 ease-out ${
            isScrolled 
              ? 'max-w-[1200px] bg-[#FDFBF7]/90 backdrop-blur-lg shadow-[0px_4px_12px_rgba(0,0,0,0.05)] rounded-[16px] border border-[#EFE5D5] py-2' 
              : 'max-w-full bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#EFE5D5] rounded-none py-0'
          }`}
        >
          <div className="px-6 md:px-8">
            <div className="flex justify-between items-center h-20">
              
              {/* LOGO */}
              <div 
                className="text-[28px] font-playfair font-bold tracking-tight text-[#7A1712] cursor-pointer hover:-translate-y-[2px] transition-transform duration-300 drop-shadow-[1px_1px_0px_#2A1610] hover:drop-shadow-[1.5px_1.5px_0px_#2A1610]"
                onClick={() => handleNavigate('beranda')}
              >
                ORIENA.
              </div>

              {/* DESKTOP MENU */}
              <div className="hidden md:flex space-x-8 items-center font-jakarta font-medium text-[15px] uppercase tracking-widest">
                {navLinks.map((link) => (
                  <button 
                    key={link.id}
                    onClick={() => handleNavigate(link.id)} 
                    className={`hover:text-[#7A1712] transition-colors relative py-2 ${
                      currentView === link.id ? 'text-[#7A1712] font-bold' : 'text-[#2A1610]'
                    }`}
                  >
                    {link.label}
                    {currentView === link.id && (
                      <motion.span 
                        layoutId="activeNavLine"
                        className="absolute bottom-0 left-0 w-full h-[2px] bg-[#7A1712] rounded-t-full"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* CART & MOBILE TOGGLE */}
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => handleNavigate('cart')}
                  className="relative p-2 text-[#2A1610] hover:text-[#7A1712] transition-all duration-300 hover:-translate-y-[2px]"
                >
                  <ShoppingBag size={24} strokeWidth={1.5} />
                  <AnimatePresence>
                    {cartCount > 0 && (
                      <motion.span 
                        initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} key={cartCount}
                        className="absolute top-0 right-0 bg-[#7A1712] text-[#FDFBF7] text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm"
                      >
                        {cartCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
                
                {/* Mobile Menu Button */}
                <button 
                  className="md:hidden p-2 text-[#2A1610] hover:text-[#7A1712] transition-colors" 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
                </button>
              </div>

            </div>
          </div>
        </motion.nav>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden fixed top-24 left-4 right-4 z-40 bg-[#FDFBF7]/95 backdrop-blur-xl border border-[#EFE5D5] rounded-[16px] shadow-[0px_8px_24px_rgba(0,0,0,0.08)] overflow-hidden font-jakarta"
          >
            <div className="flex flex-col px-6 py-8 space-y-2 font-medium text-[16px] uppercase tracking-wide">
              {navLinks.map((link) => (
                <button 
                  key={link.id}
                  onClick={() => handleNavigate(link.id)} 
                  className={`text-left py-3 px-4 rounded-[8px] transition-colors ${
                    currentView === link.id ? 'bg-[#EFE5D5] text-[#7A1712] font-bold' : 'text-[#2A1610] hover:text-[#7A1712] hover:bg-[#EFE5D5]/50'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              
              <div className="h-px bg-[#EFE5D5] my-4"></div>
              
              <button 
                onClick={() => handleNavigate('cart')} 
                className="text-left py-3.5 text-[#FDFBF7] flex items-center gap-3 bg-[#7A1712] px-5 rounded-[8px] w-full shadow-sm hover:bg-[#5E120E] transition-colors"
              >
                <ShoppingBag size={20} strokeWidth={2} />
                Keranjang Belanja ({cartCount})
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}