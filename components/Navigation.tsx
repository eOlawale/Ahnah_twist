import React from 'react';
import { ViewState, UserRole } from '../types';
import { Home, Ruler, PenTool, ShoppingBag, BookOpen, Menu, X, Users, Settings, ScrollText } from 'lucide-react';

interface NavigationProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  userRole?: UserRole;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView, userRole }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: ViewState.HOME, label: 'Home', icon: <Home size={20} /> },
    { id: ViewState.FABRIC_GUIDE, label: 'Fabric Guide', icon: <ScrollText size={20} /> },
    { id: ViewState.SOCIAL, label: 'Community', icon: <Users size={20} /> },
    { id: ViewState.MEASUREMENTS, label: 'Measurements', icon: <Ruler size={20} /> },
    { id: ViewState.DESIGN_STUDIO, label: 'Design Studio', icon: <PenTool size={20} /> },
    { id: ViewState.MARKETPLACE, label: 'Showroom', icon: <ShoppingBag size={20} /> },
    { id: ViewState.TRAINING, label: 'Training', icon: <BookOpen size={20} /> },
  ];

  if (userRole === 'SUPER_ADMIN') {
    navItems.push({ id: ViewState.ADMIN_PANEL, label: 'Super Admin', icon: <Settings size={20} /> });
  }

  const handleNavClick = (view: ViewState) => {
    setView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="hidden md:flex flex-col w-64 h-screen bg-dark-surface border-r border-gray-800 fixed left-0 top-0 z-50">
        <div className="p-6">
          <h1 className="text-2xl font-serif font-bold text-gold">Ahnah_twistz</h1>
          <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest leading-tight">Couture & Marketplace</p>
        </div>
        <div className="flex-1 flex flex-col gap-2 px-4 overflow-y-auto no-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                currentView === item.id
                  ? 'bg-gold text-dark font-semibold shadow-lg shadow-gold/20'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        <div className="p-6 border-t border-gray-800 text-xs text-gray-600">
            © 2025 Ahnah_twistz
        </div>
      </nav>

      <div className="md:hidden fixed top-0 w-full bg-dark-surface z-50 border-b border-gray-800 px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-serif font-bold text-gold">Ahnah_twistz</h1>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
            {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

       {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/95 z-40 pt-24 px-6 animate-fade-in overflow-y-auto">
           <div className="flex flex-col gap-4">
            {navItems.map((item) => (
                <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-4 px-4 py-4 rounded-xl text-lg ${
                    currentView === item.id
                    ? 'bg-gold text-dark font-bold'
                    : 'text-gray-300 border border-gray-800'
                }`}
                >
                {item.icon}
                <span>{item.label}</span>
                </button>
            ))}
           </div>
        </div>
       )}
    </>
  );
};

export default Navigation;