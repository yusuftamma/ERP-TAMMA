import React from 'react';
import { useData } from '../context/DataContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { formatCurrency } from '../utils';

const COLORS = ['#2563eb', '#16a34a', '#f59e0b', '#dc2626', '#9333ea'];

const Reports = () => {
  const { payments, maintenance, cars, rentals, customers } = useData();

  // Calculate Revenue per day (last 7 entries for demo)
  const revenueData = payments.slice(0, 7).map(p => ({
    name: new Date(p.tanggal_bayar).toLocaleDateString('id-ID', {day: 'numeric', month: 'short'}),
    amount: p.jumlah
  }));

  // Calculate Maintenance Breakdown
  const maintenanceData = maintenance.reduce((acc: any, curr) => {
    const found = acc.find((x: any) => x.name === curr.jenis_perawatan);
    if (found) found.value++;
    else acc.push({ name: curr.jenis_perawatan, value: 1 });
    return acc;
  }, []);

  // Top Cars (by rental count)
  const topCars = cars.map(car => {
    const count = rentals.filter(r => r.mobil_id === car.id).length;
    return { ...car, rentalCount: count };
  }).sort((a, b) => b.rentalCount - a.rentalCount).slice(0, 5);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Laporan & Analitik</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold mb-6">Pendapatan Harian</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Bar dataKey="amount" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Maintenance Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold mb-6">Komposisi Perawatan</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={maintenanceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {maintenanceData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-3 justify-center mt-4">
             {maintenanceData.map((entry: any, index: number) => (
               <div key={index} className="flex items-center gap-1 text-xs">
                 <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                 <span>{entry.name} ({entry.value})</span>
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* Top Lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold mb-4">Top 5 Mobil Menguntungkan</h3>
            <div className="space-y-4">
              {topCars.map((car, idx) => (
                <div key={car.id} className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <span className="font-bold text-slate-300">#{idx + 1}</span>
                     <div>
                       <p className="font-medium">{car.merk} {car.model}</p>
                       <p className="text-xs text-slate-500">{car.rentalCount} kali disewa</p>
                     </div>
                   </div>
                   <div className="text-right">
                      <p className="font-medium text-blue-600">{formatCurrency(car.harga_sewa * car.rentalCount)}</p>
                   </div>
                </div>
              ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default Reports;