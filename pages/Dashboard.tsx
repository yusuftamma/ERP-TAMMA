import React from 'react';
import { useData } from '../context/DataContext';
import { Car, CreditCard, Users, Activity, ArrowUpRight, ArrowDownRight, Clock, AlertCircle } from 'lucide-react';
import { formatCurrency, getStatusColor } from '../utils';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, trend, color }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"
  >
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="text-2xl font-bold mt-1 text-slate-900">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
    {trend && (
      <div className="flex items-center mt-4 text-sm">
        <span className="text-green-600 flex items-center font-medium">
          <ArrowUpRight size={16} className="mr-1" />
          {trend}
        </span>
        <span className="text-slate-400 ml-2">vs bulan lalu</span>
      </div>
    )}
  </motion.div>
);

const Dashboard = () => {
  const { stats, rentals, cars } = useData();
  const recentRentals = rentals.slice(0, 5);
  const maintenanceCars = cars.filter(c => c.status === 'Perawatan');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500">Ringkasan aktivitas Tamma Rental hari ini.</p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Pendapatan (Bulan Ini)" 
          value={formatCurrency(stats.pendapatan_bulan_ini)} 
          icon={CreditCard}
          color="bg-blue-600"
          trend="+12%"
        />
        <StatCard 
          title="Mobil Tersedia" 
          value={stats.mobil_tersedia} 
          icon={Car}
          color="bg-green-500"
        />
        <StatCard 
          title="Sedang Disewa" 
          value={stats.sedang_disewa} 
          icon={Activity}
          color="bg-orange-500"
        />
        <StatCard 
          title="Utilisasi Armada" 
          value={`${stats.utilisasi.toFixed(1)}%`} 
          icon={Users}
          color="bg-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Clock size={20} className="text-blue-600" />
              Penyewaan Terkini
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="px-4 py-3 rounded-l-lg">Pelanggan</th>
                    <th className="px-4 py-3">Mobil</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 rounded-r-lg">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentRentals.map(rental => (
                    <tr key={rental.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-medium">{rental.nama_pelanggan}</td>
                      <td className="px-4 py-3">{rental.merk_model} <span className="text-xs text-slate-400 block">{rental.plat_nomor}</span></td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(rental.status)}`}>
                          {rental.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-medium">{formatCurrency(rental.total_biaya)}</td>
                    </tr>
                  ))}
                  {recentRentals.length === 0 && (
                    <tr>
                      <td colSpan={4} className="text-center py-4 text-slate-500">Belum ada data penyewaan.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <AlertCircle size={20} className="text-orange-500" />
              Perlu Perawatan ({maintenanceCars.length})
            </h3>
            <div className="space-y-4">
              {maintenanceCars.length > 0 ? maintenanceCars.map(car => (
                <div key={car.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-slate-200 rounded-md overflow-hidden">
                      <img src={car.image_url} alt={car.model} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{car.merk} {car.model}</p>
                      <p className="text-xs text-slate-500">{car.plat_nomor}</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded">Servis</span>
                </div>
              )) : (
                <p className="text-sm text-slate-500 text-center py-4">Semua armada dalam kondisi prima.</p>
              )}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 text-white">
            <h3 className="text-lg font-bold mb-2">Aksi Cepat</h3>
            <p className="text-blue-100 text-sm mb-4">Buat reservasi baru dengan cepat.</p>
            <button 
              onClick={() => window.location.hash = '#/rentals'}
              className="w-full bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors"
            >
              + Tambah Sewa Baru
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;