import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Car, CarStatus, CarType } from '../types';
import { Plus, Search, Filter, Gauge, Calendar, DollarSign } from 'lucide-react';
import { formatCurrency, generateId, getStatusColor } from '../utils';
import { motion } from 'framer-motion';

const Cars = () => {
  const { cars, addCar, updateCar } = useData();
  const [filter, setFilter] = useState<'All' | CarStatus>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Car>>({
    jenis: 'MPV',
    status: 'Tersedia',
    harga_sewa: 350000,
    tahun: new Date().getFullYear(),
  });

  const filteredCars = cars.filter(car => {
    const matchesFilter = filter === 'All' || car.status === filter;
    const matchesSearch = car.merk.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          car.plat_nomor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleOpenModal = (car?: Car) => {
    if (car) {
      setEditingCar(car);
      setFormData(car);
    } else {
      setEditingCar(null);
      setFormData({
        jenis: 'MPV',
        status: 'Tersedia',
        harga_sewa: 350000,
        tahun: new Date().getFullYear(),
        image_url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80'
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCar) {
      updateCar({ ...editingCar, ...formData } as Car);
    } else {
      addCar({
        id: generateId(),
        ...formData
      } as Car);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h1 className="text-3xl font-bold text-slate-900">Armada Mobil</h1>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm transition-colors"
        >
          <Plus size={18} /> Tambah Mobil
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Cari merk, model, atau plat nomor..." 
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="text-slate-400" size={20} />
          <select 
            className="border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
          >
            <option value="All">Semua Status</option>
            <option value="Tersedia">Tersedia</option>
            <option value="Disewa">Disewa</option>
            <option value="Perawatan">Perawatan</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCars.map((car) => (
          <motion.div 
            key={car.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow group"
          >
            <div className="relative h-48 bg-slate-200 overflow-hidden">
              <img 
                src={car.image_url} 
                alt={`${car.merk} ${car.model}`} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium border bg-white/90 backdrop-blur-sm ${getStatusColor(car.status)}`}>
                  {car.status}
                </span>
              </div>
            </div>
            
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{car.merk} {car.model}</h3>
                  <p className="text-sm text-slate-500 font-mono">{car.plat_nomor}</p>
                </div>
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">{car.jenis}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-y-2 text-sm text-slate-600 mt-4 mb-4">
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-slate-400" />
                  <span>{car.tahun}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Gauge size={14} className="text-slate-400" />
                  <span>{car.kilometer.toLocaleString()} km</span>
                </div>
                <div className="col-span-2 flex items-center gap-1.5 font-medium text-blue-600">
                  <DollarSign size={14} />
                  <span>{formatCurrency(car.harga_sewa)}/hari</span>
                </div>
              </div>

              <button 
                onClick={() => handleOpenModal(car)}
                className="w-full mt-2 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Edit Detail
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold">{editingCar ? 'Edit Mobil' : 'Tambah Mobil Baru'}</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Merk</label>
                  <input required type="text" className="w-full border rounded-lg p-2" value={formData.merk || ''} onChange={e => setFormData({...formData, merk: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Model</label>
                  <input required type="text" className="w-full border rounded-lg p-2" value={formData.model || ''} onChange={e => setFormData({...formData, model: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Plat Nomor</label>
                  <input required type="text" className="w-full border rounded-lg p-2" value={formData.plat_nomor || ''} onChange={e => setFormData({...formData, plat_nomor: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tahun</label>
                  <input required type="number" className="w-full border rounded-lg p-2" value={formData.tahun || ''} onChange={e => setFormData({...formData, tahun: parseInt(e.target.value)})} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Jenis</label>
                  <select className="w-full border rounded-lg p-2 bg-white" value={formData.jenis} onChange={e => setFormData({...formData, jenis: e.target.value as CarType})}>
                    <option value="Sedan">Sedan</option>
                    <option value="MPV">MPV</option>
                    <option value="Hiace">Hiace</option>
                    <option value="SUV">SUV</option>
                    <option value="Luxury">Luxury</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select className="w-full border rounded-lg p-2 bg-white" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as CarStatus})}>
                    <option value="Tersedia">Tersedia</option>
                    <option value="Disewa">Disewa</option>
                    <option value="Perawatan">Perawatan</option>
                  </select>
                </div>
              </div>
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">Harga Sewa (Rp)</label>
                 <input required type="number" className="w-full border rounded-lg p-2" value={formData.harga_sewa || ''} onChange={e => setFormData({...formData, harga_sewa: parseInt(e.target.value)})} />
              </div>
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">Image URL (Unsplash)</label>
                 <input type="text" className="w-full border rounded-lg p-2" value={formData.image_url || ''} onChange={e => setFormData({...formData, image_url: e.target.value})} />
              </div>
              <div className="flex justify-end gap-3 mt-6">
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

export default Cars;