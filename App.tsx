import React, { useState } from 'react';
import Navigation from './components/Navigation';
import MeasurementTool from './components/MeasurementTool';
import DesignStudio from './components/DesignStudio';
import Marketplace from './components/Marketplace';
import TrainingHub from './components/TrainingHub';
import SocialHub from './components/SocialHub';
import { ViewState } from './types';
import { Sparkles, Scissors, ShoppingBag, ArrowRight, Users } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);

  const renderView = () => {
    switch (currentView) {
      case ViewState.MEASUREMENTS:
        return <MeasurementTool />;
      case ViewState.DESIGN_STUDIO:
        return <DesignStudio />;
      case ViewState.MARKETPLACE:
        return <Marketplace />;
      case ViewState.TRAINING:
        return <TrainingHub />;
      case ViewState.SOCIAL:
        return <SocialHub />;
      case ViewState.HOME:
      default:
        return <HomeView setView={setCurrentView} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-dark text-white font-sans selection:bg-gold selection:text-dark">
      <Navigation currentView={currentView} setView={setCurrentView} />
      
      <main className="flex-1 md:ml-64 relative">
        <div className="min-h-screen w-full p-4 md:p-8 pt-20 md:pt-8 bg-gradient-to-br from-dark to-gray-900">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

// Home View Component
const HomeView: React.FC<{ setView: (view: ViewState) => void }> = ({ setView }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-fade-in pb-12">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden min-h-[500px] flex items-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        </div>
        
        <div className="relative z-10 p-8 md:p-16 max-w-2xl space-y-6">
          <div className="inline-block px-3 py-1 bg-gold/20 text-gold border border-gold rounded-full text-xs font-bold tracking-widest uppercase">
            Ahnah Twist
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight">
            Couture. <br/>
            Design. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-200">Marketplace.</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-lg">
            The ultimate fashion tech ecosystem. Create with AI, measure with precision, and trade in our global showroom.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button 
              onClick={() => setView(ViewState.DESIGN_STUDIO)}
              className="px-8 py-4 bg-gold text-dark font-bold rounded-xl hover:bg-white transition-all transform hover:scale-105 shadow-lg shadow-gold/20 flex items-center gap-2"
            >
              Start Designing <ArrowRight size={20} />
            </button>
            <button 
               onClick={() => setView(ViewState.MARKETPLACE)}
               className="px-8 py-4 bg-transparent border border-white/30 text-white font-bold rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all"
            >
              Visit Showroom
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard 
          icon={<Scissors size={32} />}
          title="Smart Measure"
          desc="AI-powered body analysis for the perfect bespoke fit."
          onClick={() => setView(ViewState.MEASUREMENTS)}
        />
        <FeatureCard 
          icon={<Sparkles size={32} />}
          title="Design Studio"
          desc="Generate sketches from simple text descriptions instantly."
          onClick={() => setView(ViewState.DESIGN_STUDIO)}
        />
        <FeatureCard 
          icon={<ShoppingBag size={32} />}
          title="Showroom"
          desc="Shop exclusive pieces from independent designers."
          onClick={() => setView(ViewState.MARKETPLACE)}
        />
        <FeatureCard 
          icon={<Users size={32} />}
          title="Community"
          desc="Share your work and connect with fellow creators."
          onClick={() => setView(ViewState.SOCIAL)}
        />
      </section>

      {/* Bento Grid Gallery */}
      <section className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-4 h-[500px]">
        <div 
          onClick={() => setView(ViewState.SOCIAL)}
          className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden group cursor-pointer"
        >
            <img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Fashion 1" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-end p-6">
                <div>
                   <span className="text-gold text-xs font-bold uppercase tracking-wider mb-2 block">Trending Now</span>
                   <h3 className="text-2xl font-serif font-bold">Community Looks</h3>
                </div>
            </div>
        </div>
        <div className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden group cursor-pointer">
            <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Fashion 2" />
        </div>
        <div className="col-span-1 row-span-2 relative rounded-2xl overflow-hidden group cursor-pointer">
             <img src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Fashion 3" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <h3 className="text-xl font-serif font-bold">Sustainable Materials</h3>
            </div>
        </div>
        <div 
          onClick={() => setView(ViewState.MARKETPLACE)}
          className="col-span-1 row-span-1 bg-gold rounded-2xl p-6 flex flex-col justify-between group cursor-pointer hover:bg-white transition-colors"
        >
            <h3 className="text-dark font-bold text-2xl font-serif">Start <br/>Selling</h3>
            <div className="self-end w-10 h-10 rounded-full bg-dark text-gold flex items-center justify-center group-hover:bg-gold group-hover:text-dark transition-colors">
                <ArrowRight />
            </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; desc: string; onClick: () => void }> = ({ icon, title, desc, onClick }) => (
  <div 
    onClick={onClick}
    className="group bg-dark-surface border border-gray-800 p-8 rounded-2xl hover:border-gold/50 hover:bg-gray-900 transition-all cursor-pointer relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity text-gold">
        <ArrowRight />
    </div>
    <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center text-gold mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-lg group-hover:shadow-gold/20">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gold transition-colors">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
  </div>
);

export default App;