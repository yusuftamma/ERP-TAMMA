import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { Rental, RentalStatus } from '../types';
import { Plus, Search, Calendar } from 'lucide-react';
import { formatCurrency, formatDate, generateId, getStatusColor } from '../utils';
import { differenceInDays, parseISO } from 'date-fns';

const Rentals = () => {
  const { rentals, cars, customers, addRental, updateRentalStatus } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // New Rental Form State
  const [customerId, setCustomerId] = useState('');
  const [carId, setCarId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [deposit, setDeposit] = useState(500000);

  const filteredRentals = rentals.filter(r => 
    r.nama_pelanggan.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.kode_booking.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const availableCars = cars.filter(c => c.status === 'Tersedia');

  const calculateTotal = () => {
    if (!startDate || !endDate || !carId) return 0;
    const car = cars.find(c => c.id === carId);
    if (!car) return 0;
    const diff = differenceInDays(new Date(endDate), new Date(startDate));
    const days = diff > 0 ? diff : 1;
    return days * car.harga_sewa;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const car = cars.find(c => c.id === carId);
    const customer = customers.find(c => c.id === customerId);
    
    if (!car || !customer) return;

    const diff = differenceInDays(new Date(endDate), new Date(startDate));
    const days = diff > 0 ? diff : 1;
    const total = days * car.harga_sewa;

    const newRental: Rental = {
      id: generateId(),
      kode_booking: `TR-${Math.floor(Math.random() * 10000)}`,
      pelanggan_id: customer.id,
      nama_pelanggan: customer.nama,
      no_telepon_pelanggan: customer.no_telepon,
      mobil_id: car.id,
      plat_nomor: car.plat_nomor,
      merk_model: `${car.merk} ${car.model}`,
      tanggal_sewa: startDate,
      tanggal_kembali: endDate,
      durasi: days,
      harga_per_hari: car.harga_sewa,
      total_biaya: total,
      status: 'Berjalan',
      deposit: deposit,
      denda: 0,
      catatan: ''
    };

    addRental(newRental);
    setIsModalOpen(false);
    // Reset form
    setCustomerId(''); setCarId(''); setStartDate(''); setEndDate('');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-900">Penyewaan</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm"
        >
          <Plus size={18} /> Sewa Baru
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari kode booking atau nama pelanggan..." 
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">Kode Booking</th>
                <th className="px-6 py-4">Pelanggan</th>
                <th className="px-6 py-4">Mobil</th>
                <th className="px-6 py-4">Tanggal</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRentals.map((rental) => (
                <tr key={rental.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-blue-600">{rental.kode_booking}</td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900">{rental.nama_pelanggan}</p>
                    <p className="text-xs text-slate-500">{rental.no_telepon_pelanggan}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium">{rental.merk_model}</p>
                    <p className="text-xs text-slate-500 bg-slate-100 inline-block px-1 rounded">{rental.plat_nomor}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-slate-400" />
                      <span>{formatDate(rental.tanggal_sewa)} - {formatDate(rental.tanggal_kembali)}</span>
                    </div>
                    <span className="text-xs text-slate-500">({rental.durasi} Hari)</span>
                  </td>
                  <td className="px-6 py-4 font-medium">{formatCurrency(rental.total_biaya)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(rental.status)}`}>
                      {rental.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {rental.status === 'Berjalan' && (
                       <button 
                       onClick={() => updateRentalStatus(rental.id, 'Selesai')}
                       className="text-xs bg-green-50 text-green-600 border border-green-200 px-3 py-1 rounded hover:bg-green-100"
                     >
                       Selesaikan
                     </button>
                    )}
                    {rental.status === 'Reservasi' && (
                       <button 
                       onClick={() => updateRentalStatus(rental.id, 'Berjalan')}
                       className="text-xs bg-blue-50 text-blue-600 border border-blue-200 px-3 py-1 rounded hover:bg-blue-100"
                     >
                       Mulai
                     </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Rental Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold">Buat Penyewaan Baru</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                   <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Pelanggan</label>
                     <select required className="w-full border rounded-lg p-2 bg-white" value={customerId} onChange={e => setCustomerId(e.target.value)}>
                       <option value="">Pilih Pelanggan</option>
                       {customers.map(c => (
                         <option key={c.id} value={c.id}>{c.nama} - {c.no_ktp}</option>
                       ))}
                     </select>
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Mobil Tersedia</label>
                     <select required className="w-full border rounded-lg p-2 bg-white" value={carId} onChange={e => setCarId(e.target.value)}>
                       <option value="">Pilih Mobil</option>
                       {availableCars.map(c => (
                         <option key={c.id} value={c.id}>{c.merk} {c.model} - {formatCurrency(c.harga_sewa)}/hari</option>
                       ))}
                     </select>
                   </div>
                </div>
                
                <div className="space-y-4">
                   <div className="grid grid-cols-2 gap-2">
                     <div>
                       <label className="block text-sm font-medium text-slate-700 mb-1">Tanggal Ambil</label>
                       <input required type="date" className="w-full border rounded-lg p-2" value={startDate} onChange={e => setStartDate(e.target.value)} />
                     </div>
                     <div>
                       <label className="block text-sm font-medium text-slate-700 mb-1">Tanggal Kembali</label>
                       <input required type="date" className="w-full border rounded-lg p-2" value={endDate} onChange={e => setEndDate(e.target.value)} />
                     </div>
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Deposit (Rp)</label>
                      <input type="number" className="w-full border rounded-lg p-2" value={deposit} onChange={e => setDeposit(parseInt(e.target.value))} />
                   </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-100 flex justify-between items-center">
                 <div>
                   <p className="text-sm text-slate-500">Estimasi Total Biaya</p>
                   <p className="text-xs text-slate-400">Belum termasuk deposit</p>
                 </div>
                 <p className="text-2xl font-bold text-blue-600">{formatCurrency(calculateTotal())}</p>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">Batal</button>
                <button type="submit" disabled={!carId || !customerId} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">Buat Reservasi</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rentals;