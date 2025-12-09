import React, { createContext, useContext, useState, useEffect } from 'react';
import { Car, Customer, Rental, Payment, Maintenance, DashboardStats } from '../types';
import { mockCars, mockCustomers, mockRentals, mockPayments, mockMaintenance } from '../data/mockData';

interface DataContextType {
  cars: Car[];
  customers: Customer[];
  rentals: Rental[];
  payments: Payment[];
  maintenance: Maintenance[];
  addCar: (car: Car) => void;
  updateCar: (car: Car) => void;
  addCustomer: (customer: Customer) => void;
  updateCustomer: (customer: Customer) => void;
  addRental: (rental: Rental) => void;
  updateRentalStatus: (id: string, status: string) => void;
  addPayment: (payment: Payment) => void;
  addMaintenance: (maintenance: Maintenance) => void;
  stats: DashboardStats;
  refreshStats: () => void;
  importData: (data: any) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cars, setCars] = useState<Car[]>(mockCars);
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [rentals, setRentals] = useState<Rental[]>(mockRentals);
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [maintenance, setMaintenance] = useState<Maintenance[]>(mockMaintenance);
  const [stats, setStats] = useState<DashboardStats>({
    total_mobil: 0,
    mobil_tersedia: 0,
    sedang_disewa: 0,
    pendapatan_bulan_ini: 0,
    penyewaan_hari_ini: 0,
    utilisasi: 0,
    perlu_perawatan: 0
  });

  const calculateStats = () => {
    const total_mobil = cars.length;
    const mobil_tersedia = cars.filter(c => c.status === 'Tersedia').length;
    const sedang_disewa = rentals.filter(r => r.status === 'Berjalan').length;
    
    // Revenue current month
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const pendapatan_bulan_ini = payments
      .filter(p => {
        const d = new Date(p.tanggal_bayar);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear && p.status === 'Lunas';
      })
      .reduce((sum, p) => sum + p.jumlah, 0);
    
    const today = new Date().toISOString().split('T')[0];
    const penyewaan_hari_ini = rentals.filter(r => r.tanggal_sewa.startsWith(today)).length;
    
    const utilisasi = total_mobil > 0 ? (sedang_disewa / total_mobil) * 100 : 0;
    const perlu_perawatan = cars.filter(c => c.status === 'Perawatan').length;

    setStats({
      total_mobil,
      mobil_tersedia,
      sedang_disewa,
      pendapatan_bulan_ini,
      penyewaan_hari_ini,
      utilisasi,
      perlu_perawatan
    });
  };

  useEffect(() => {
    calculateStats();
  }, [cars, rentals, payments, maintenance]);

  const addCar = (car: Car) => setCars([...cars, car]);
  const updateCar = (updatedCar: Car) => {
    setCars(cars.map(c => c.id === updatedCar.id ? updatedCar : c));
  };
  
  const addCustomer = (customer: Customer) => setCustomers([...customers, customer]);
  const updateCustomer = (updatedCustomer: Customer) => {
    setCustomers(customers.map(c => c.id === updatedCustomer.id ? updatedCustomer : c));
  };

  const addRental = (rental: Rental) => {
    setRentals([rental, ...rentals]);
    // Auto update car status
    const car = cars.find(c => c.id === rental.mobil_id);
    if (car) {
      updateCar({ ...car, status: 'Disewa' });
    }
  };

  const updateRentalStatus = (id: string, status: any) => {
    setRentals(rentals.map(r => r.id === id ? { ...r, status } : r));
    const rental = rentals.find(r => r.id === id);
    if (rental && (status === 'Selesai' || status === 'Batal')) {
      const car = cars.find(c => c.id === rental.mobil_id);
      if (car) updateCar({ ...car, status: 'Tersedia' });
    }
  };

  const addPayment = (payment: Payment) => setPayments([payment, ...payments]);
  
  const addMaintenance = (item: Maintenance) => {
    setMaintenance([item, ...maintenance]);
    const car = cars.find(c => c.id === item.mobil_id);
    if (car) updateCar({ ...car, status: 'Perawatan' });
  };

  const importData = (data: any) => {
    // Simple mock implementation
    if (data.cars) setCars([...cars, ...data.cars]);
    if (data.customers) setCustomers([...customers, ...data.customers]);
  };

  return (
    <DataContext.Provider value={{
      cars, customers, rentals, payments, maintenance, stats,
      addCar, updateCar, addCustomer, updateCustomer,
      addRental, updateRentalStatus, addPayment, addMaintenance, refreshStats: calculateStats, importData
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};