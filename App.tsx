import React, { useState } from 'react';
import Navigation from './components/Navigation';
import MeasurementTool from './components/MeasurementTool';
import DesignStudio from './components/DesignStudio';
import Marketplace from './components/Marketplace';
import TrainingHub from './components/TrainingHub';
import SocialHub from './components/SocialHub';
import Auth from './components/Auth';
import LandingPage from './components/LandingPage';
import FitAgent from './components/FitAgent';
import AdminPanel from './components/AdminPanel';
import FabricGuide from './components/FabricGuide';
import { ViewState, User, UserRole } from './types';
import { Sparkles, Scissors, ShoppingBag, ArrowRight, Users, Settings } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<'LANDING' | 'AUTH' | 'APP'>('LANDING');
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);

  // Site configuration that Super Admin can edit
  const [siteConfig, setSiteConfig] = useState({
    heroImage: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=2069&auto=format&fit=crop',
    heroAspectRatio: 'aspect-video',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=1974&auto=format&fit=crop', ratio: 'aspect-square' },
      { url: 'https://images.unsplash.com/photo-1522512115668-c09775d6f424?q=80&w=1974&auto=format&fit=crop', ratio: 'aspect-square' },
      { url: 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?q=80&w=1974&auto=format&fit=crop', ratio: 'aspect-square' }
    ]
  });

  const handleLogin = (userData: any) => {
    // Mock Super Admin Check
    const role: UserRole = userData.email === 'admin@ahnah.com' ? 'SUPER_ADMIN' : 'USER';
    setUser({ ...userData, id: '1', role });
    setAppState('APP');
  };

  const handleGuestEnter = () => {
    setUser({ id: 'guest', name: 'Guest', email: 'guest@ahnah.com', role: 'GUEST' });
    setAppState('APP');
  };

  if (appState === 'LANDING') {
    return <LandingPage onEnter={() => setAppState('AUTH')} onGuestEnter={handleGuestEnter} />;
  }

  if (appState === 'AUTH') {
    return <Auth onLogin={handleLogin} />;
  }

  const renderView = () => {
    switch (currentView) {
      case ViewState.MEASUREMENTS:
        return <MeasurementTool />;
      case ViewState.DESIGN_STUDIO:
        return <DesignStudio userRole={user?.role} />;
      case ViewState.MARKETPLACE:
        return <Marketplace setView={setCurrentView} userRole={user?.role} />;
      case ViewState.TRAINING:
        return <TrainingHub />;
      case ViewState.SOCIAL:
        return <SocialHub userRole={user?.role} />;
      case ViewState.ADMIN_PANEL:
        return <AdminPanel config={siteConfig} setConfig={setSiteConfig} />;
      case ViewState.FABRIC_GUIDE:
        return <FabricGuide userRole={user?.role} />;
      case ViewState.HOME:
      default:
        return <HomeView setView={setCurrentView} config={siteConfig} userRole={user?.role} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-dark text-white font-sans selection:bg-gold selection:text-dark">
      <Navigation currentView={currentView} setView={setCurrentView} userRole={user?.role} />
      
      <main className="flex-1 md:ml-64 relative">
        <div className="min-h-screen w-full p-4 md:p-8 pt-20 md:pt-8 bg-gradient-to-br from-dark to-gray-900">
          {renderView()}
        </div>
      </main>

      <FitAgent />
    </div>
  );
};

const HomeView: React.FC<{ setView: (view: ViewState) => void; config: any; userRole?: UserRole }> = ({ setView, config, userRole }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-fade-in pb-12">
      {userRole === 'SUPER_ADMIN' && (
        <div className="bg-gold/10 border border-gold p-4 rounded-xl flex items-center justify-between">
           <div className="flex items-center gap-2">
             <Settings className="text-gold" />
             <span className="font-bold text-gold">Super Admin Mode Active</span>
           </div>
           <button onClick={() => setView(ViewState.ADMIN_PANEL)} className="bg-gold text-dark px-4 py-2 rounded-lg font-bold hover:bg-white transition-colors">Manage Site</button>
        </div>
      )}

      {/* Hero Section */}
      <section className={`relative rounded-3xl overflow-hidden min-h-[500px] flex items-center ${config.heroAspectRatio}`}>
        <div className="absolute inset-0">
          <img src={config.heroImage} className="w-full h-full object-cover" alt="Hero" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        </div>
        
        <div className="relative z-10 p-8 md:p-16 max-w-2xl space-y-6">
          <div className="inline-block px-3 py-1 bg-gold/20 text-gold border border-gold rounded-full text-xs font-bold tracking-widest uppercase">
            Ahnah_twistz
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
               onClick={() => setView(ViewState.FABRIC_GUIDE)}
               className="px-8 py-4 bg-transparent border border-white/30 text-white font-bold rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all"
            >
              Fabric Guide
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard icon={<Scissors size={32} />} title="Smart Measure" desc="AI body analysis for bespoke fit." onClick={() => setView(ViewState.MEASUREMENTS)} />
        <FeatureCard icon={<Sparkles size={32} />} title="Design Studio" desc="AI sketching from text." onClick={() => setView(ViewState.DESIGN_STUDIO)} />
        <FeatureCard icon={<ShoppingBag size={32} />} title="Showroom" desc="Shop exclusive pieces." onClick={() => setView(ViewState.MARKETPLACE)} />
        <FeatureCard icon={<Users size={32} />} title="Community" desc="Share and connect." onClick={() => setView(ViewState.SOCIAL)} />
      </section>

      {/* Gallery */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {config.gallery.map((img: any, i: number) => (
          <div key={i} className={`relative rounded-2xl overflow-hidden group ${i === 0 ? 'col-span-2 row-span-2' : ''} ${img.ratio}`}>
             <img src={img.url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={`Gallery ${i}`} />
          </div>
        ))}
      </section>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; desc: string; onClick: () => void }> = ({ icon, title, desc, onClick }) => (
  <div onClick={onClick} className="group bg-dark-surface border border-gray-800 p-8 rounded-2xl hover:border-gold/50 hover:bg-gray-900 transition-all cursor-pointer relative overflow-hidden">
    <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center text-gold mb-6 group-hover:shadow-lg group-hover:shadow-gold/20">{icon}</div>
    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gold transition-colors">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
  </div>
);

export default App;