import React from 'react';
import { ViewState } from '../types';
import { Home, Ruler, PenTool, ShoppingBag, BookOpen, Menu, X, Users, Instagram, Twitter, Facebook } from 'lucide-react';

interface NavigationProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: ViewState.HOME, label: 'Home', icon: <Home size={20} /> },
    { id: ViewState.SOCIAL, label: 'Community', icon: <Users size={20} /> },
    { id: ViewState.MEASUREMENTS, label: 'Measurements', icon: <Ruler size={20} /> },
    { id: ViewState.DESIGN_STUDIO, label: 'Design Studio', icon: <PenTool size={20} /> },
    { id: ViewState.MARKETPLACE, label: 'Showroom', icon: <ShoppingBag size={20} /> },
    { id: ViewState.TRAINING, label: 'Training', icon: <BookOpen size={20} /> },
  ];

  const handleNavClick = (view: ViewState) => {
    setView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="hidden md:flex flex-col w-64 h-screen bg-dark-surface border-r border-gray-800 fixed left-0 top-0 z-50">
        <div className="p-6">
          <h1 className="text-2xl font-serif font-bold text-gold">Ahnah Twist</h1>
          <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest leading-tight">Couture, Design & Marketplace</p>
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
        
        {/* Social Media Footer */}
        <div className="p-6 border-t border-gray-800">
          <p className="text-xs font-semibold text-gray-500 mb-4 uppercase tracking-wider">Follow Us</p>
          <div className="flex gap-4 mb-4">
             <a href="#" className="text-gray-400 hover:text-gold transition-colors"><Instagram size={20} /></a>
             <a href="#" className="text-gray-400 hover:text-gold transition-colors"><Twitter size={20} /></a>
             <a href="#" className="text-gray-400 hover:text-gold transition-colors"><Facebook size={20} /></a>
          </div>
          <div className="text-xs text-gray-600">
            © 2025 Ahnah Twist
          </div>
        </div>
      </nav>

      {/* Mobile Header & Bottom Nav */}
      <div className="md:hidden fixed top-0 w-full bg-dark-surface z-50 border-b border-gray-800 px-4 py-3 flex justify-between items-center">
        <div>
            <h1 className="text-xl font-serif font-bold text-gold">Ahnah Twist</h1>
            <p className="text-[9px] text-gray-400 uppercase tracking-widest">Couture & Marketplace</p>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
            {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

       {/* Mobile Menu Overlay */}
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
            
            <div className="mt-8 border-t border-gray-800 pt-8">
               <h4 className="text-gold font-bold mb-4">Join the Conversation</h4>
               <div className="flex gap-6 justify-center">
                  <a href="#" className="p-3 bg-gray-800 rounded-full text-white hover:bg-gold hover:text-dark"><Instagram /></a>
                  <a href="#" className="p-3 bg-gray-800 rounded-full text-white hover:bg-gold hover:text-dark"><Twitter /></a>
                  <a href="#" className="p-3 bg-gray-800 rounded-full text-white hover:bg-gold hover:text-dark"><Facebook /></a>
               </div>
            </div>
           </div>
        </div>
       )}
    </>
  );
};

export default Navigation;