export type CarType = 'Sedan' | 'MPV' | 'Hiace' | 'SUV' | 'Luxury';
export type CarStatus = 'Tersedia' | 'Disewa' | 'Perawatan';

export interface Car {
  id: string;
  plat_nomor: string;
  merk: string;
  model: string;
  tahun: number;
  jenis: CarType;
  harga_sewa: number;
  status: CarStatus;
  garasi: string;
  kilometer: number;
  terakhir_servis: string; // ISO date string
  deskripsi: string;
  image_url?: string;
}

export interface Customer {
  id: string;
  nama: string;
  no_ktp: string;
  alamat: string;
  no_telepon: string;
  email: string;
}

export type RentalStatus = 'Reservasi' | 'Berjalan' | 'Selesai' | 'Batal';

export interface Rental {
  id: string;
  kode_booking: string;
  pelanggan_id: string;
  nama_pelanggan: string;
  no_telepon_pelanggan: string;
  mobil_id: string;
  plat_nomor: string;
  merk_model: string;
  tanggal_sewa: string; // ISO date string
  tanggal_kembali: string; // ISO date string
  durasi: number; // hari
  harga_per_hari: number;
  total_biaya: number;
  status: RentalStatus;
  deposit: number;
  denda: number;
  catatan: string;
}

export type PaymentMethod = 'Tunai' | 'Transfer' | 'Kartu Kredit';
export type PaymentStatus = 'Pending' | 'Lunas' | 'DP';

export interface Payment {
  id: string;
  penyewaan_id: string;
  kode_booking: string;
  jumlah: number;
  metode: PaymentMethod;
  status: PaymentStatus;
  tanggal_bayar: string;
  keterangan: string;
}

export type MaintenanceType = 'Servis Rutin' | 'Perbaikan' | 'Ganti Ban' | 'Ganti Oli' | 'Lainnya';
export type MaintenanceStatus = 'Dijadwalkan' | 'Dalam Pengerjaan' | 'Selesai';

export interface Maintenance {
  id: string;
  mobil_id: string;
  plat_nomor: string;
  jenis_perawatan: MaintenanceType;
  tanggal_mulai: string;
  tanggal_selesai: string;
  biaya: number;
  deskripsi: string;
  status: MaintenanceStatus;
}

// Stats types
export interface DashboardStats {
  total_mobil: number;
  mobil_tersedia: number;
  sedang_disewa: number;
  pendapatan_bulan_ini: number;
  penyewaan_hari_ini: number;
  utilisasi: number;
  perlu_perawatan: number;
}