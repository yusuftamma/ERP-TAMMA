import { Car, Customer, Rental, Payment, Maintenance } from '../types';

export const mockCars: Car[] = [
  {
    id: 'c1',
    plat_nomor: 'B 1234 ABC',
    merk: 'Toyota',
    model: 'Avanza',
    tahun: 2022,
    jenis: 'MPV',
    harga_sewa: 350000,
    status: 'Tersedia',
    garasi: 'Pusat',
    kilometer: 15000,
    terakhir_servis: '2023-10-01',
    deskripsi: 'Kondisi prima, AC dingin, hemat bbm.',
    image_url: 'https://images.unsplash.com/photo-1594958614488-661d90442387?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'c2',
    plat_nomor: 'B 5678 DEF',
    merk: 'Honda',
    model: 'Brio',
    tahun: 2021,
    jenis: 'Sedan',
    harga_sewa: 300000,
    status: 'Disewa',
    garasi: 'Cabang Barat',
    kilometer: 25000,
    terakhir_servis: '2023-09-15',
    deskripsi: 'Lincah untuk dalam kota.',
    image_url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'c3',
    plat_nomor: 'B 9012 GHI',
    merk: 'Toyota',
    model: 'Hiace',
    tahun: 2023,
    jenis: 'Hiace',
    harga_sewa: 1200000,
    status: 'Perawatan',
    garasi: 'Pusat',
    kilometer: 50000,
    terakhir_servis: '2023-10-20',
    deskripsi: 'Kapasitas 15 orang, cocok untuk wisata.',
    image_url: 'https://images.unsplash.com/photo-1632245889029-e413142718e2?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'c4',
    plat_nomor: 'D 3344 XYZ',
    merk: 'Mitsubishi',
    model: 'Pajero Sport',
    tahun: 2023,
    jenis: 'SUV',
    harga_sewa: 1500000,
    status: 'Tersedia',
    garasi: 'Pusat',
    kilometer: 10000,
    terakhir_servis: '2023-10-25',
    deskripsi: 'Gagah dan nyaman untuk perjalanan jauh.',
    image_url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80'
  }
];

export const mockCustomers: Customer[] = [
  {
    id: 'cust1',
    nama: 'Budi Santoso',
    no_ktp: '3171234567890001',
    alamat: 'Jl. Sudirman No. 1, Jakarta',
    no_telepon: '081234567890',
    email: 'budi@example.com'
  },
  {
    id: 'cust2',
    nama: 'Siti Aminah',
    no_ktp: '3171234567890002',
    alamat: 'Jl. Thamrin No. 45, Jakarta',
    no_telepon: '081298765432',
    email: 'siti@example.com'
  }
];

export const mockRentals: Rental[] = [
  {
    id: 'r1',
    kode_booking: 'TR-001',
    pelanggan_id: 'cust1',
    nama_pelanggan: 'Budi Santoso',
    no_telepon_pelanggan: '081234567890',
    mobil_id: 'c2',
    plat_nomor: 'B 5678 DEF',
    merk_model: 'Honda Brio',
    tanggal_sewa: '2023-10-25',
    tanggal_kembali: '2023-10-28',
    durasi: 3,
    harga_per_hari: 300000,
    total_biaya: 900000,
    status: 'Berjalan',
    deposit: 500000,
    denda: 0,
    catatan: ''
  },
  {
    id: 'r2',
    kode_booking: 'TR-002',
    pelanggan_id: 'cust2',
    nama_pelanggan: 'Siti Aminah',
    no_telepon_pelanggan: '081298765432',
    mobil_id: 'c1',
    plat_nomor: 'B 1234 ABC',
    merk_model: 'Toyota Avanza',
    tanggal_sewa: '2023-10-20',
    tanggal_kembali: '2023-10-22',
    durasi: 2,
    harga_per_hari: 350000,
    total_biaya: 700000,
    status: 'Selesai',
    deposit: 500000,
    denda: 0,
    catatan: 'Mobil kembali bersih'
  }
];

export const mockPayments: Payment[] = [
  {
    id: 'p1',
    penyewaan_id: 'r1',
    kode_booking: 'TR-001',
    jumlah: 900000,
    metode: 'Transfer',
    status: 'Lunas',
    tanggal_bayar: '2023-10-25',
    keterangan: 'Pembayaran penuh di awal'
  },
  {
    id: 'p2',
    penyewaan_id: 'r2',
    kode_booking: 'TR-002',
    jumlah: 700000,
    metode: 'Tunai',
    status: 'Lunas',
    tanggal_bayar: '2023-10-20',
    keterangan: ''
  }
];

export const mockMaintenance: Maintenance[] = [
  {
    id: 'm1',
    mobil_id: 'c3',
    plat_nomor: 'B 9012 GHI',
    jenis_perawatan: 'Ganti Oli',
    tanggal_mulai: '2023-10-26',
    tanggal_selesai: '2023-10-27',
    biaya: 500000,
    deskripsi: 'Ganti oli mesin dan gardan',
    status: 'Dalam Pengerjaan'
  }
];