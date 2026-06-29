import { motion } from 'framer-motion';
import { MapPin, Phone, MessageSquare } from 'lucide-react';

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

interface FooterProps {
  setCurrentView: (view: string) => void;
}

export default function Footer({ setCurrentView }: FooterProps) {
  const handleNavigate = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const waNumber = "628126120165";
  const waLink = `https://wa.me/${waNumber}?text=Halo%20Admin%20Oriena,%20saya%20mau%20tanya-tanya%20dong!`;

  return (
    <footer className="bg-[#7A1712] text-[#FDFBF7] pt-[80px] pb-8 rounded-t-[32px] mt-[80px] relative overflow-hidden font-jakarta">
      {/* Subtle Pattern Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>
      
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Kolom 1 & 2: Branding */}
          <div className="md:col-span-2 space-y-6">
            <motion.div 
              whileHover={{ scale: 1.02, originX: 0 }}
              className="text-[32px] font-playfair font-bold tracking-tight text-[#C5A059] cursor-pointer w-max"
              onClick={() => handleNavigate('beranda')}
            >
              ORIENA.
            </motion.div>
            <p className="text-[#FDFBF7]/80 max-w-sm leading-[1.6] text-[15px] font-normal">
              Memadukan resep artisan klasik dengan pengalaman digital modern. Setiap toples adalah cerita hangat dari oven kami untuk Anda dan keluarga.
            </p>
            <div className="flex space-x-4 pt-4">
              <a 
                href="https://www.instagram.com/pastrystick.official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-[8px] bg-[#C5A059] text-[#7A1712] flex items-center justify-center hover:bg-[#FDFBF7] transition-all hover:-translate-y-[2px] shadow-sm"
              >
                <InstagramIcon />
              </a>
              <a 
                href={waLink}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-[8px] bg-[#C5A059] text-[#7A1712] flex items-center justify-center hover:bg-[#FDFBF7] transition-all hover:-translate-y-[2px] shadow-sm"
              >
                <MessageSquare size={20} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Kolom 3: Navigasi */}
          <div className="space-y-6">
            <h4 className="text-[18px] font-playfair font-semibold text-[#C5A059]">Jelajahi</h4>
            <ul className="space-y-4 text-[#FDFBF7]/80 text-[15px] font-medium">
              {['beranda', 'tentang', 'katalog', 'kolaborasi'].map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => handleNavigate(item)} 
                    className="hover:text-[#C5A059] hover:translate-x-1 transition-all capitalize"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 4: Kontak */}
          <div className="space-y-6">
            <h4 className="text-[18px] font-playfair font-semibold text-[#C5A059]">Sapa Kami</h4>
            <ul className="space-y-5 text-[#FDFBF7]/80 text-[14px] font-normal">
              <li className="flex items-start gap-3 group">
                <MapPin size={18} className="shrink-0 text-[#C5A059] mt-0.5" strokeWidth={1.5} />
                <span className="leading-[1.6]">
                  16/04 no, Jl. Tanjungsari No.4B, Penambangan, Krembangan, Kec. Taman, Kabupaten Sidoarjo, Jawa Timur 61257
                </span>
              </li>
              <a 
                href={waLink}
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 group hover:text-[#C5A059] transition-colors"
              >
                <Phone size={18} className="shrink-0 text-[#C5A059]" strokeWidth={1.5} />
                <span>+62 812-6120-165</span>
              </a>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-8 border-t border-[#C5A059]/20 flex flex-col md:flex-row justify-between items-center gap-4 text-[#FDFBF7]/60 text-[13px] font-normal">
          <p>© 2026 Oriena Artisan Bakery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}