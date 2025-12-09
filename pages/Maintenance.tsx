import React from 'react';
import { useData } from '../context/DataContext';
import { Wrench } from 'lucide-react';
import { formatCurrency, formatDate, getStatusColor } from '../utils';

const Maintenance = () => {
  const { maintenance } = useData();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Perawatan Armada</h1>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
         <table className="w-full text-sm text-left">
           <thead className="bg-slate-50 text-slate-500">
             <tr>
               <th className="px-6 py-4">Plat Nomor</th>
               <th className="px-6 py-4">Jenis Perawatan</th>
               <th className="px-6 py-4">Tanggal</th>
               <th className="px-6 py-4">Biaya</th>
               <th className="px-6 py-4">Status</th>
               <th className="px-6 py-4">Deskripsi</th>
             </tr>
           </thead>
           <tbody className="divide-y divide-slate-100">
             {maintenance.map(m => (
               <tr key={m.id} className="hover:bg-slate-50">
                 <td className="px-6 py-4 font-medium flex items-center gap-2">
                   <Wrench size={14} className="text-slate-400" />
                   {m.plat_nomor}
                 </td>
                 <td className="px-6 py-4">{m.jenis_perawatan}</td>
                 <td className="px-6 py-4">{formatDate(m.tanggal_mulai)}</td>
                 <td className="px-6 py-4">{formatCurrency(m.biaya)}</td>
                 <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${m.status === 'Selesai' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-orange-100 text-orange-700 border-orange-200'}`}>
                      {m.status}
                    </span>
                 </td>
                 <td className="px-6 py-4 text-slate-500">{m.deskripsi}</td>
               </tr>
             ))}
             {maintenance.length === 0 && (
               <tr><td colSpan={6} className="text-center py-6 text-slate-500">Tidak ada riwayat perawatan.</td></tr>
             )}
           </tbody>
         </table>
      </div>
    </div>
  );
};

export default Maintenance;