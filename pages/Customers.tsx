import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Customer } from '../types';
import { Plus, Search, Mail, Phone, MapPin } from 'lucide-react';
import { generateId } from '../utils';

const Customers = () => {
  const { customers, addCustomer, updateCustomer } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  
  const [formData, setFormData] = useState<Partial<Customer>>({});

  const filtered = customers.filter(c => 
    c.nama.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.no_ktp.includes(searchTerm)
  );

  const handleOpenModal = (c?: Customer) => {
    if (c) {
      setEditingCustomer(c);
      setFormData(c);
    } else {
      setEditingCustomer(null);
      setFormData({});
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCustomer) {
      updateCustomer({ ...editingCustomer, ...formData } as Customer);
    } else {
      addCustomer({ id: generateId(), ...formData } as Customer);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-900">Pelanggan</h1>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm"
        >
          <Plus size={18} /> Tambah Pelanggan
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
         <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari nama atau No KTP..." 
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(customer => (
          <div key={customer.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
               <div>
                 <h3 className="font-bold text-lg text-slate-900">{customer.nama}</h3>
                 <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-500">KTP: {customer.no_ktp}</span>
               </div>
               <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                  {customer.nama.charAt(0)}
               </div>
            </div>
            <div className="space-y-2 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-slate-400" /> {customer.no_telepon}
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-slate-400" /> {customer.email}
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-slate-400 mt-0.5" /> <span className="flex-1">{customer.alamat}</span>
              </div>
            </div>
            <button 
              onClick={() => handleOpenModal(customer)}
              className="mt-4 w-full py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Edit Data
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
           <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
             <div className="p-6 border-b border-slate-100">
               <h2 className="text-xl font-bold">{editingCustomer ? 'Edit Pelanggan' : 'Pelanggan Baru'}</h2>
             </div>
             <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
                  <input required type="text" className="w-full border rounded-lg p-2" value={formData.nama || ''} onChange={e => setFormData({...formData, nama: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">No. KTP</label>
                  <input required type="text" className="w-full border rounded-lg p-2" value={formData.no_ktp || ''} onChange={e => setFormData({...formData, no_ktp: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">No. Telepon</label>
                     <input required type="text" className="w-full border rounded-lg p-2" value={formData.no_telepon || ''} onChange={e => setFormData({...formData, no_telepon: e.target.value})} />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                     <input required type="email" className="w-full border rounded-lg p-2" value={formData.email || ''} onChange={e => setFormData({...formData, email: e.target.value})} />
                   </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Alamat</label>
                  <textarea required className="w-full border rounded-lg p-2" rows={3} value={formData.alamat || ''} onChange={e => setFormData({...formData, alamat: e.target.value})} />
                </div>
                <div className="flex justify-end gap-3 mt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">Batal</button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Simpan</button>
                </div>
             </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default Customers;