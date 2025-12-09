import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Car, Users, CalendarDays, 
  CreditCard, Wrench, BarChart3, Upload 
} from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/cars', label: 'Armada Mobil', icon: Car },
    { path: '/rentals', label: 'Penyewaan', icon: CalendarDays },
    { path: '/customers', label: 'Pelanggan', icon: Users },
    { path: '/payments', label: 'Keuangan', icon: CreditCard },
    { path: '/maintenance', label: 'Perawatan', icon: Wrench },
    { path: '/reports', label: 'Laporan', icon: BarChart3 },
    { path: '/import', label: 'Import Data', icon: Upload },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <motion.aside 
        className={`fixed top-0 left-0 z-30 h-screen w-64 bg-slate-900 text-white shadow-xl lg:static lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300`}
        initial={false}
      >
        <div className="flex h-16 items-center justify-center border-b border-slate-800">
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
              TR
            </div>
            <span>Tamma Rental</span>
          </div>
        </div>

        <nav className="mt-6 px-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 
                      ${isActive 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                      }`}
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className="absolute bottom-0 w-full p-4 border-t border-slate-800 bg-slate-900">
          <div className="flex items-center gap-3">
             <img src="https://ui-avatars.com/api/?name=Admin+User&background=2563eb&color=fff" className="h-10 w-10 rounded-full" alt="Admin" />
             <div>
               <p className="text-sm font-semibold text-white">Admin Tamma</p>
               <p className="text-xs text-slate-500">Administrator</p>
             </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;