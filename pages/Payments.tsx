import React from 'react';
import { useData } from '../context/DataContext';
import { formatCurrency, formatDate, getStatusColor } from '../utils';

const Payments = () => {
  const { payments } = useData();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Riwayat Pembayaran</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
             <thead className="bg-slate-50 text-slate-500">
               <tr>
                 <th className="px-6 py-4">Kode Booking</th>
                 <th className="px-6 py-4">Tanggal</th>
                 <th className="px-6 py-4">Metode</th>
                 <th className="px-6 py-4">Jumlah</th>
                 <th className="px-6 py-4">Status</th>
                 <th className="px-6 py-4">Keterangan</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-slate-100">
               {payments.map(payment => (
                 <tr key={payment.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-blue-600">{payment.kode_booking}</td>
                    <td className="px-6 py-4">{formatDate(payment.tanggal_bayar)}</td>
                    <td className="px-6 py-4">{payment.metode}</td>
                    <td className="px-6 py-4 font-bold">{formatCurrency(payment.jumlah)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(payment.status)}`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 italic">{payment.keterangan || '-'}</td>
                 </tr>
               ))}
             </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payments;