import React, { useState } from 'react';
import { Sparkles, ArrowRight, UserPlus, Handshake, UserCircle } from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
  onGuestEnter: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter, onGuestEnter }) => {
  const [activeTab, setActiveTab] = useState<'HOME' | 'TRAINING' | 'PARTNERSHIP'>('HOME');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNav = (tab: 'HOME' | 'TRAINING' | 'PARTNERSHIP') => {
    setActiveTab(tab);
    if (tab === 'HOME') {
      onEnter(); // Go to login
    } else if (tab === 'TRAINING') {
      scrollToSection('training-section');
    } else if (tab === 'PARTNERSHIP') {
      scrollToSection('partnership-section');
    }
  };

  return (
    <div className="min-h-screen bg-dark text-white font-sans overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
        <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-8 py-4 flex gap-8 pointer-events-auto shadow-2xl">
          <button onClick={() => handleNav('HOME')} className="text-sm font-bold tracking-widest hover:text-gold transition-colors">HOME</button>
          <button onClick={() => handleNav('TRAINING')} className="text-sm font-bold tracking-widest hover:text-gold transition-colors">TRAINING</button>
          <button onClick={() => handleNav('PARTNERSHIP')} className="text-sm font-bold tracking-widest hover:text-gold transition-colors">PARTNERSHIP</button>
        </div>
      </nav>

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581338834647-b0fb40704e21?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative z-10 text-center space-y-6 max-w-4xl px-4 animate-fade-in">
          <div className="inline-block px-4 py-2 bg-gold/20 border border-gold text-gold rounded-full text-sm font-bold uppercase tracking-[0.2em] mb-4">Welcome to</div>
          <h1 className="text-6xl md:text-9xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">Ahnah_twistz</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">The nexus of AI-driven couture, precise digital fitting, and a global marketplace.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button 
              onClick={() => onEnter()}
              className="px-10 py-5 bg-gold text-dark font-bold text-lg rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_40px_-10px_rgba(212,175,55,0.6)] flex items-center gap-2 justify-center"
            >
              Start Creating <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => onGuestEnter()}
              className="px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-lg rounded-full hover:bg-white/20 transition-all duration-300 flex items-center gap-2 justify-center"
            >
              <UserCircle size={20} /> Guest Preview
            </button>
          </div>
        </div>
      </section>

      {/* Rest of sections... */}
      <footer className="bg-dark border-t border-gray-800 py-10 text-center text-gray-500 text-sm">
          <p>© 2025 Ahnah_twistz. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;