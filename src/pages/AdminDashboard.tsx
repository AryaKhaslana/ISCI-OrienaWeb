import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Plus, Trash2, Package, RefreshCw, X, Cookie, BarChart2, Upload, Edit2, Search, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AdminDashboardProps {
  setCurrentView: React.Dispatch<React.SetStateAction<string>>;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  desc: string;
  image: string;
  badge: string; 
}

export default function AdminDashboard({ setCurrentView }: AdminDashboardProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('Cookies');
  const [newPrice, setNewPrice] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newBadge, setNewBadge] = useState(''); 
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [currentImage, setCurrentImage] = useState<string>(''); 

  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // SATPAM KEAMANAN FRONTEND
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // Kalau ga punya sesi (belum login), paksa balik ke halaman utama/login
        setCurrentView('beranda'); 
      }
    };
    checkAuth();
  }, [setCurrentView]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 3000); 
  };

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('products').select('*').order('id', { ascending: false });
    if (!error) setProducts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEditClick = (product: Product) => {
    setEditingId(product.id);
    setNewName(product.name);
    setNewCategory(product.category);
    setNewPrice(product.price.toString());
    setNewDesc(product.desc);
    setNewBadge(product.badge || '');
    setCurrentImage(product.image); 
    setImageFile(null); 
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setNewName(''); setNewCategory('Cookies'); setNewPrice(''); 
    setNewDesc(''); setNewBadge(''); setImageFile(null);
    setEditingId(null); setCurrentImage('');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm(); 
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let finalImageUrl = currentImage; 

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`; 
        
        const { error: uploadError } = await supabase.storage
          .from('product-images') 
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('product-images')
          .getPublicUrl(fileName);

        finalImageUrl = publicUrlData.publicUrl;

        if (editingId && currentImage) {
           const oldFileName = currentImage.split('/').pop();
           if (oldFileName) {
             await supabase.storage.from('product-images').remove([oldFileName]);
           }
        }
      } else if (!editingId) {
        showToast("⚠️ Pilih foto kuenya dulu, Ibu!", 'error');
        setUploading(false);
        return;
      }

      const productData = { 
        name: newName, 
        category: newCategory, 
        price: parseInt(newPrice), 
        desc: newDesc, 
        image: finalImageUrl,
        badge: newBadge === '' ? null : newBadge 
      };

      if (editingId) {
        const { error: updateError } = await supabase.from('products').update(productData).eq('id', editingId);
        if (updateError) throw updateError;
        showToast('Data etalase berhasil diperbarui.');
      } else {
        const { error: insertError } = await supabase.from('products').insert([productData]);
        if (insertError) throw insertError;
        showToast('Menu baru berhasil ditambahkan.');
      }

      handleCloseModal();
      fetchProducts();
      
    } catch (error: any) {
      showToast('Gagal memproses: ' + error.message, 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: number, imageUrl: string) => {
    if (window.confirm('Hapus produk ini secara permanen dari etalase?')) {
      setLoading(true);
      await supabase.from('products').delete().eq('id', id);
      
      const fileName = imageUrl.split('/').pop();
      if (fileName) {
        await supabase.storage.from('product-images').remove([fileName]);
      }
      
      fetchProducts();
      setLoading(false);
      showToast('Menu telah dihapus dari sistem.');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setCurrentView('beranda');
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-4 md:p-8 font-jakarta relative overflow-hidden">
      
      {/* TOAST NOTIFICATION */}
      <AnimatePresence>
        {toast.show && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            exit={{ opacity: 0, y: 50, scale: 0.9 }} 
            className={`fixed bottom-8 right-8 z-[100] px-6 py-4 rounded-[16px] border-[1.5px] shadow-[0px_8px_24px_rgba(42,22,16,0.08)] flex items-center gap-3 font-medium text-sm ${toast.type === 'error' ? 'bg-[#7A1712]/10 border-[#7A1712]/30 text-[#7A1712]' : 'bg-white border-[#4A5E42]/20 text-[#4A5E42]'}`}
          >
            {toast.type === 'error' ? <X size={20} /> : <CheckCircle size={20} />}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Dashboard */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white border-[1.5px] border-[#2A1610]/10 p-6 rounded-[16px] shadow-[0px_4px_12px_rgba(0,0,0,0.02)] gap-4">
          <div>
            <h1 className="text-3xl font-playfair font-bold text-[#2A1610]">Kelola Etalase</h1>
            <p className="text-[#A86360] font-medium mt-1">Sistem Manajemen Konten Oriena.</p>
          </div>
          <button onClick={handleLogout} className="w-full md:w-auto bg-transparent text-[#7A1712] border-[1.5px] border-[#7A1712] px-5 py-2.5 rounded-[8px] font-semibold flex items-center justify-center gap-2 hover:bg-[#EFE5D5]/50 hover:-translate-y-0.5 transition-all">
            <LogOut size={18} strokeWidth={1.5} /> Keluar
          </button>
        </div>

        {/* Kartu Statistik */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border-[1.5px] border-[#2A1610]/10 p-6 rounded-[16px] shadow-[0px_4px_12px_rgba(0,0,0,0.02)] flex items-center gap-4">
            <div className="p-4 bg-[#EFE5D5] text-[#C5A059] rounded-[12px]"><Package size={28} strokeWidth={1.5} /></div>
            <div>
              <p className="text-xs font-semibold text-[#A86360] uppercase tracking-wider">Total Menu</p>
              <h2 className="text-3xl font-playfair font-bold text-[#2A1610]">{products.length}</h2>
            </div>
          </div>
          <div className="bg-white border-[1.5px] border-[#2A1610]/10 p-6 rounded-[16px] shadow-[0px_4px_12px_rgba(0,0,0,0.02)] flex flex-col justify-center">
            <p className="text-xs font-semibold text-[#A86360] uppercase tracking-wider mb-3">Distribusi Kategori</p>
            <div className="flex gap-2 flex-wrap">
              <span className="bg-[#EFE5D5] text-[#2A1610] px-3 py-1 rounded-full text-xs font-medium border-[1.5px] border-transparent">Cookies: {products.filter(p => p.category === 'Cookies').length}</span>
              <span className="bg-[#EFE5D5] text-[#2A1610] px-3 py-1 rounded-full text-xs font-medium border-[1.5px] border-transparent">Bakery: {products.filter(p => p.category === 'Bakery').length}</span>
              <span className="bg-[#EFE5D5] text-[#2A1610] px-3 py-1 rounded-full text-xs font-medium border-[1.5px] border-transparent">Snack: {products.filter(p => p.category === 'Snack').length}</span>
            </div>
          </div>
          <div className="bg-white border-[1.5px] border-[#2A1610]/10 p-6 rounded-[16px] shadow-[0px_4px_12px_rgba(0,0,0,0.02)] flex items-center gap-4">
            <div className="p-4 bg-[#EFE5D5] text-[#4A5E42] rounded-[12px]"><BarChart2 size={28} strokeWidth={1.5} /></div>
            <div>
              <p className="text-xs font-semibold text-[#A86360] uppercase tracking-wider">Sistem Server</p>
              <h2 className="text-lg mt-1 font-jakarta font-semibold text-[#4A5E42]">{loading ? 'Memuat...' : 'Terhubung'}</h2>
            </div>
          </div>
        </div>

        {/* Tabel Utama */}
        <div className="bg-white border-[1.5px] border-[#2A1610]/10 p-6 md:p-8 rounded-[16px] shadow-[0px_4px_12px_rgba(0,0,0,0.02)]">
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4 border-b-[1.5px] border-[#2A1610]/10 pb-6">
            <h2 className="text-2xl font-playfair font-bold text-[#2A1610] w-full lg:w-auto">Inventaris Produk</h2>
            
            <div className="flex flex-col md:flex-row gap-3 w-full lg:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2A1610]/40" size={18} strokeWidth={1.5} />
                <input 
                  type="text" 
                  placeholder="Cari menu..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#EFE5D5]/50 border-[1.5px] border-transparent rounded-[8px] pl-10 pr-4 py-2 outline-none font-medium text-[#2A1610] focus:border-[#C5A059] focus:bg-white transition-colors text-sm" 
                />
              </div>

              <button onClick={fetchProducts} className="p-2.5 bg-transparent border-[1.5px] border-[#2A1610]/20 text-[#2A1610] rounded-[8px] hover:bg-[#EFE5D5]/50 transition-colors flex justify-center">
                <RefreshCw size={18} strokeWidth={1.5} className={loading ? 'animate-spin' : ''} />
              </button>
              
              <button onClick={() => setIsModalOpen(true)} className="bg-[#7A1712] text-[#FDFBF7] px-5 py-2.5 rounded-[8px] font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#5E120E] transition-colors shadow-[0px_4px_12px_rgba(122,23,18,0.2)] hover:-translate-y-0.5 w-full md:w-auto">
                <Plus size={18} strokeWidth={2} /> Tambah Menu
              </button>
            </div>
          </div>

          {loading && products.length === 0 ? (
            <div className="text-center py-16 font-medium text-[#A86360] animate-pulse">Menarik data dari server...</div>
          ) : (
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b-[1.5px] border-[#2A1610]/10 text-xs font-semibold text-[#A86360] uppercase tracking-wider">
                    <th className="pb-4 w-24">Foto</th>
                    <th className="pb-4">Informasi Produk</th>
                    <th className="pb-4">Harga Unit</th>
                    <th className="pb-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filteredProducts.map((p) => (
                      <motion.tr 
                        layout
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        key={p.id} 
                        className="border-b-[1.5px] border-[#2A1610]/5 hover:bg-[#EFE5D5]/30 transition-colors"
                      >
                        <td className="py-4">
                          <img src={p.image} alt={p.name} className="w-16 h-16 rounded-[12px] object-cover border-[1.5px] border-[#2A1610]/10 shadow-[0px_4px_12px_rgba(0,0,0,0.05)]" />
                        </td>
                        <td className="py-4 pr-4">
                          <div className="font-semibold text-base text-[#2A1610] mb-1 flex items-center gap-2">
                            {p.name}
                            {p.badge && (
                              <span className="bg-[#EFE5D5] text-[#C5A059] border-[1px] border-[#C5A059]/30 text-[10px] px-2 py-0.5 rounded-full font-bold tracking-wider">
                                {p.badge}
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-[#A86360]">{p.category}</div>
                        </td>
                        <td className="py-4 font-semibold text-[#2A1610]">Rp {p.price.toLocaleString('id-ID')}</td>
                        <td className="py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button onClick={() => handleEditClick(p)} className="p-2 text-[#C5A059] hover:bg-[#C5A059]/10 rounded-[8px] transition-colors" title="Edit">
                              <Edit2 size={18} strokeWidth={1.5} />
                            </button>
                            <button onClick={() => handleDelete(p.id, p.image)} className="p-2 text-[#7A1712] hover:bg-[#7A1712]/10 rounded-[8px] transition-colors" title="Hapus">
                              <Trash2 size={18} strokeWidth={1.5} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                  
                  {filteredProducts.length === 0 && products.length > 0 && (
                    <tr>
                      <td colSpan={4} className="text-center py-16">
                         <Search size={32} strokeWidth={1.5} className="mx-auto text-[#A86360]/50 mb-3" />
                         <p className="font-medium text-[#A86360]">Produk "{searchTerm}" tidak ditemukan di etalase.</p>
                      </td>
                    </tr>
                  )}
                  {products.length === 0 && <tr><td colSpan={4} className="text-center py-16 font-medium text-[#A86360]">Etalase masih kosong. Tambahkan menu pertama Anda.</td></tr>}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* POPUP MODAL TAMBAH/EDIT MENU */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2A1610]/40 backdrop-blur-sm">
              <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="bg-white w-full max-w-lg rounded-[16px] shadow-[0px_12px_32px_rgba(0,0,0,0.1)] overflow-hidden">
                <div className="bg-[#FDFBF7] border-b-[1.5px] border-[#2A1610]/10 p-6 flex justify-between items-center">
                  <h2 className="text-xl font-playfair font-bold text-[#2A1610] flex items-center gap-2">
                    <Cookie size={20} strokeWidth={1.5} className="text-[#C5A059]" /> {editingId ? 'Ubah Informasi Menu' : 'Tambah Menu Baru'}
                  </h2>
                  <button onClick={handleCloseModal} className="p-2 text-[#A86360] hover:bg-[#7A1712]/10 hover:text-[#7A1712] rounded-full transition-colors">
                    <X size={20} strokeWidth={1.5} />
                  </button>
                </div>

                <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="text-xs font-semibold text-[#2A1610] uppercase tracking-wider">Nama Produk</label>
                      <input type="text" required value={newName} onChange={e => setNewName(e.target.value)} className="w-full mt-1.5 bg-[#EFE5D5]/50 border-[1.5px] border-transparent rounded-[8px] px-4 py-2.5 outline-none font-medium text-[#2A1610] focus:border-[#C5A059] focus:bg-white transition-colors text-sm" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-[#2A1610] uppercase tracking-wider">Kategori</label>
                        <select value={newCategory} onChange={e => setNewCategory(e.target.value)} className="w-full mt-1.5 bg-[#EFE5D5]/50 border-[1.5px] border-transparent rounded-[8px] px-4 py-2.5 outline-none font-medium text-[#2A1610] focus:border-[#C5A059] focus:bg-white transition-colors text-sm appearance-none">
                          <option value="Cookies">Cookies</option>
                          <option value="Bakery">Bakery</option>
                          <option value="Snack">Snack</option>
                          <option value="Lain-lain">Lain-lain</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-[#2A1610] uppercase tracking-wider">Harga Unit (Rp)</label>
                        <input type="number" required value={newPrice} onChange={e => setNewPrice(e.target.value)} className="w-full mt-1.5 bg-[#EFE5D5]/50 border-[1.5px] border-transparent rounded-[8px] px-4 py-2.5 outline-none font-medium text-[#2A1610] focus:border-[#C5A059] focus:bg-white transition-colors text-sm" />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#2A1610] uppercase tracking-wider">Label Etalase</label>
                      <select value={newBadge} onChange={e => setNewBadge(e.target.value)} className="w-full mt-1.5 bg-[#EFE5D5]/50 border-[1.5px] border-transparent rounded-[8px] px-4 py-2.5 outline-none font-medium text-[#2A1610] focus:border-[#C5A059] focus:bg-white transition-colors text-sm appearance-none">
                        <option value="">-- Tanpa Label --</option>
                        <option value="BEST SELLER">BEST SELLER</option>
                      </select>
                      <p className="text-[11px] text-[#A86360] mt-1.5">Opsi "BEST SELLER" akan menaikkan posisi produk ke puncak katalog.</p>
                    </div>
                    
                    <div>
                      <label className="text-xs font-semibold text-[#2A1610] uppercase tracking-wider">
                        {editingId ? 'Perbarui Foto (Abaikan jika tidak diubah)' : 'Unggah Foto Produk'}
                      </label>
                      <div className="mt-1.5 relative">
                        <input 
                          type="file" 
                          accept="image/*" 
                          required={!editingId} 
                          onChange={e => setImageFile(e.target.files?.[0] || null)} 
                          className="w-full bg-[#EFE5D5]/50 border-[1.5px] border-transparent rounded-[8px] px-3 py-2 outline-none font-medium text-[#2A1610] text-sm focus:border-[#C5A059] transition-colors file:mr-4 file:py-1.5 file:px-4 file:rounded-[6px] file:border-0 file:text-xs file:font-semibold file:bg-[#EFE5D5] file:text-[#2A1610] hover:file:bg-[#C5A059]/20" 
                        />
                      </div>
                      {editingId && !imageFile && currentImage && (
                         <div className="mt-3 flex items-center gap-3 bg-[#FDFBF7] p-2 rounded-[8px] border-[1.5px] border-[#2A1610]/5">
                           <img src={currentImage} alt="Current" className="w-10 h-10 rounded-[6px] object-cover" />
                           <span className="text-[11px] font-medium text-[#A86360]">Foto yang digunakan saat ini.</span>
                         </div>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#2A1610] uppercase tracking-wider">Deskripsi Singkat</label>
                      <textarea required value={newDesc} onChange={e => setNewDesc(e.target.value)} rows={3} className="w-full mt-1.5 bg-[#EFE5D5]/50 border-[1.5px] border-transparent rounded-[8px] px-4 py-2.5 outline-none font-medium text-[#2A1610] focus:border-[#C5A059] focus:bg-white transition-colors text-sm"></textarea>
                    </div>
                    <div className="pt-2">
                      <button type="submit" disabled={uploading} className="w-full bg-[#7A1712] text-[#FDFBF7] py-3 rounded-[8px] font-bold text-sm shadow-[0px_4px_12px_rgba(122,23,18,0.2)] hover:bg-[#5E120E] active:-translate-y-0 hover:-translate-y-0.5 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                        {uploading ? <RefreshCw className="animate-spin" size={18} /> : <Upload size={18} />}
                        {uploading ? 'Memproses Data...' : (editingId ? 'Simpan Perubahan' : 'Terbitkan Produk')}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}