export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString: string) => {
  if (!dateString) return '-';
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};

export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

export const getStatusColor = (status: string) => {
  switch (status) {
    // Car Status
    case 'Tersedia': return 'bg-green-100 text-green-700 border-green-200';
    case 'Disewa': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'Perawatan': return 'bg-orange-100 text-orange-700 border-orange-200';
    
    // Rental Status
    case 'Reservasi': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'Berjalan': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'Selesai': return 'bg-green-100 text-green-700 border-green-200';
    case 'Batal': return 'bg-red-100 text-red-700 border-red-200';

    // Payment Status
    case 'Lunas': return 'bg-green-100 text-green-700 border-green-200';
    case 'DP': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'Pending': return 'bg-slate-100 text-slate-700 border-slate-200';

    default: return 'bg-slate-100 text-slate-700';
  }
};