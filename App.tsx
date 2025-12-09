import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { DataProvider } from './context/DataContext';
import { Menu } from 'lucide-react';

// Pages
import Dashboard from './pages/Dashboard';
import Cars from './pages/Cars';
import Rentals from './pages/Rentals';
import Customers from './pages/Customers';
import Payments from './pages/Payments';
import Maintenance from './pages/Maintenance';
import Reports from './pages/Reports';
import ImportData from './pages/ImportData';

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <DataProvider>
      <Router>
        <div className="flex h-screen overflow-hidden bg-slate-50">
          <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
          
          <div className="flex-1 flex flex-col overflow-hidden">
            <header className="flex h-16 items-center justify-between bg-white px-6 shadow-sm lg:hidden">
              <button onClick={() => setSidebarOpen(true)} className="text-slate-500 hover:text-slate-700">
                <Menu size={24} />
              </button>
              <span className="font-bold text-lg text-slate-800">Tamma Rental</span>
              <div className="w-6" /> {/* Spacer */}
            </header>

            <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 lg:p-8">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/cars" element={<Cars />} />
                <Route path="/rentals" element={<Rentals />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/payments" element={<Payments />} />
                <Route path="/maintenance" element={<Maintenance />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/import" element={<ImportData />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </DataProvider>
  );
};

export default App;