import React, { useState } from 'react';
import { Sparkles, ArrowRight, UserPlus, Handshake } from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
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
      {/* Top Center Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
        <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-8 py-4 flex gap-8 pointer-events-auto shadow-2xl">
          <button 
            onClick={() => handleNav('HOME')}
            className="text-sm font-bold tracking-widest hover:text-gold transition-colors"
          >
            HOME
          </button>
          <button 
             onClick={() => handleNav('TRAINING')}
             className="text-sm font-bold tracking-widest hover:text-gold transition-colors"
          >
            TRAINING
          </button>
          <button 
             onClick={() => handleNav('PARTNERSHIP')}
             className="text-sm font-bold tracking-widest hover:text-gold transition-colors"
          >
            PARTNERSHIP
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative z-10 text-center space-y-6 max-w-4xl px-4 animate-fade-in">
          <div className="inline-block px-4 py-2 bg-gold/20 border border-gold text-gold rounded-full text-sm font-bold uppercase tracking-[0.2em] mb-4">
            Welcome to
          </div>
          <h1 className="text-6xl md:text-9xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
            Ahnah_twistz
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            The nexus of AI-driven couture, precise digital fitting, and a global marketplace.
          </p>
          <button 
            onClick={() => onEnter()}
            className="mt-8 px-10 py-5 bg-gold text-dark font-bold text-lg rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_40px_-10px_rgba(212,175,55,0.6)]"
          >
            Enter Experience
          </button>
        </div>
      </section>

      {/* Training Section */}
      <section id="training-section" className="min-h-screen bg-dark-surface relative py-20 px-4 md:px-20 flex items-center">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
           <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-white">Master the Craft</h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                  Join our elite training program. Learn digital pattern making, 3D draping, and sustainable fashion business strategies.
              </p>
              <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-gold"><Sparkles size={20} /> <span>AI-Powered Design Tools</span></li>
                  <li className="flex items-center gap-3 text-gold"><Sparkles size={20} /> <span>Expert Masterclasses</span></li>
                  <li className="flex items-center gap-3 text-gold"><Sparkles size={20} /> <span>Certification upon completion</span></li>
              </ul>
           </div>
           
           <div className="bg-black/30 p-8 rounded-3xl border border-gray-800">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <UserPlus className="text-gold" /> Enroll Now
              </h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label>
                      <input type="text" className="w-full bg-dark border border-gray-700 rounded-xl p-3 focus:border-gold outline-none" placeholder="John Doe" />
                  </div>
                  <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email Address</label>
                      <input type="email" className="w-full bg-dark border border-gray-700 rounded-xl p-3 focus:border-gold outline-none" placeholder="john@example.com" />
                  </div>
                  <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Interest Area</label>
                      <select className="w-full bg-dark border border-gray-700 rounded-xl p-3 focus:border-gold outline-none text-gray-400">
                          <option>Digital Fashion Design</option>
                          <option>Pattern Making</option>
                          <option>Fashion Business</option>
                      </select>
                  </div>
                  <button className="w-full py-4 bg-gold text-dark font-bold rounded-xl hover:bg-white transition-colors">
                      Request Syllabus
                  </button>
              </form>
           </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section id="partnership-section" className="min-h-screen bg-black relative py-20 px-4 md:px-20 flex items-center">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
         
         <div className="max-w-4xl mx-auto text-center relative z-10 space-y-12">
            <div className="space-y-4">
                <h2 className="text-4xl md:text-6xl font-serif font-bold text-white">Partner With Us</h2>
                <p className="text-xl text-gray-400">
                    Are you a brand, institution, or independent designer looking to scale? Let's build the future of fashion together.
                </p>
            </div>

            <div className="bg-dark-surface/80 backdrop-blur-lg p-10 rounded-3xl border border-gray-800 text-left max-w-2xl mx-auto">
               <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Handshake className="text-gold" /> Partnership Inquiry
              </h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Company Name</label>
                          <input type="text" className="w-full bg-dark border border-gray-700 rounded-xl p-3 focus:border-gold outline-none" placeholder="Brand Inc." />
                      </div>
                      <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Contact Person</label>
                          <input type="text" className="w-full bg-dark border border-gray-700 rounded-xl p-3 focus:border-gold outline-none" placeholder="Jane Smith" />
                      </div>
                  </div>
                  <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email Address</label>
                      <input type="email" className="w-full bg-dark border border-gray-700 rounded-xl p-3 focus:border-gold outline-none" placeholder="partner@brand.com" />
                  </div>
                  <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Proposal</label>
                      <textarea className="w-full bg-dark border border-gray-700 rounded-xl p-3 focus:border-gold outline-none h-32 resize-none" placeholder="Describe how you'd like to partner..." />
                  </div>
                  <button className="w-full py-4 bg-white text-dark font-bold rounded-xl hover:bg-gold transition-colors">
                      Submit Proposal
                  </button>
              </form>
            </div>
         </div>
      </section>

      <footer className="bg-dark border-t border-gray-800 py-10 text-center text-gray-500 text-sm">
          <p>© 2025 Ahnah_twistz. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;