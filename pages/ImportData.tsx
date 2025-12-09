import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import { useData } from '../context/DataContext';

const ImportData = () => {
  const { importData } = useData();
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setStatus('idle');
    }
  };

  const handleUpload = () => {
    if (!file) return;
    setStatus('processing');
    
    // Simulate processing delay
    setTimeout(() => {
      // Mock parsing logic
      try {
        // In a real app, parse CSV here using PapaParse
        // importData({ cars: [], customers: [] });
        setStatus('success');
      } catch (err) {
        setStatus('error');
      }
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 mt-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Import Data</h1>
        <p className="text-slate-500">Upload file CSV untuk menambahkan data mobil atau pelanggan secara massal.</p>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 text-center">
        <div className="border-2 border-dashed border-slate-300 rounded-xl p-10 flex flex-col items-center justify-center bg-slate-50">
           <div className="h-16 w-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
             <Upload size={32} />
           </div>
           
           <input 
             type="file" 
             accept=".csv" 
             onChange={handleFileChange} 
             className="hidden" 
             id="file-upload" 
           />
           
           {!file ? (
             <label htmlFor="file-upload" className="cursor-pointer">
               <span className="text-blue-600 font-medium hover:underline">Klik untuk upload</span>
               <span className="text-slate-500"> atau drag and drop</span>
               <p className="text-xs text-slate-400 mt-2">CSV, max 10MB</p>
             </label>
           ) : (
             <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg border shadow-sm">
               <FileText size={20} className="text-slate-400" />
               <span className="font-medium text-slate-700">{file.name}</span>
               <button onClick={() => setFile(null)} className="text-red-500 hover:text-red-700 text-sm ml-2">Hapus</button>
             </div>
           )}
        </div>

        <div className="mt-6 flex justify-center">
           <button 
             onClick={handleUpload}
             disabled={!file || status === 'processing'}
             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
           >
             {status === 'processing' ? 'Memproses...' : 'Proses Import'}
           </button>
        </div>

        {status === 'success' && (
          <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg flex items-center justify-center gap-2">
            <CheckCircle size={20} /> Data berhasil diimport!
          </div>
        )}
        
        {status === 'error' && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg flex items-center justify-center gap-2">
            <AlertTriangle size={20} /> Gagal memproses file.
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h3 className="font-bold text-lg mb-4">Format Template CSV</h3>
        <p className="text-sm text-slate-500 mb-4">Pastikan header CSV anda sesuai dengan format berikut:</p>
        
        <div className="space-y-4">
           <div>
             <h4 className="font-medium text-sm text-slate-700 mb-1">Mobil</h4>
             <code className="block bg-slate-900 text-slate-200 p-3 rounded text-xs font-mono">
               plat_nomor,merk,model,tahun,jenis,harga_sewa,garasi
             </code>
           </div>
           <div>
             <h4 className="font-medium text-sm text-slate-700 mb-1">Pelanggan</h4>
             <code className="block bg-slate-900 text-slate-200 p-3 rounded text-xs font-mono">
               nama,no_ktp,alamat,no_telepon,email
             </code>
           </div>
        </div>
        
        <button className="mt-4 text-sm text-blue-600 font-medium hover:underline">
          Download Template CSV
        </button>
      </div>
    </div>
  );
};

export default ImportData;