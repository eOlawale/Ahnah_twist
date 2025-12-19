import React, { useState } from 'react';
import { ScrollText, Info, Camera, Share2, Heart, Award } from 'lucide-react';
import { UserRole } from '../types';

const FABRICS = [
    { name: 'Kente', origin: 'Ghana', desc: 'A royal and sacred cloth traditionally worn during extreme importance. Every color and pattern has specific meaning.', image: 'https://images.unsplash.com/photo-1596751303335-ca42b3ca50c1?q=80&w=1000&auto=format&fit=crop' },
    { name: 'Ankara', origin: 'West Africa', desc: 'Vibrant wax print patterns that have become the hallmark of modern African couture.', image: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=1000&auto=format&fit=crop' },
    { name: 'Adire', origin: 'Nigeria', desc: 'Indigo-dyed cloth made by Yoruba women using various resist-dyeing techniques.', image: 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?q=80&w=1000&auto=format&fit=crop' },
];

const FabricGuide: React.FC<{ userRole?: UserRole }> = ({ userRole }) => {
  const isGuest = userRole === 'GUEST';

  const handleAction = () => {
    if (isGuest) {
      alert("Please login to share your fabric designs or engage with the community.");
      return;
    }
    alert("Opening community upload...");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-fade-in pb-20">
      <header className="text-center space-y-4">
        <div className="inline-flex p-3 bg-gold/10 rounded-full text-gold mb-2">
           <Award size={32} />
        </div>
        <h2 className="text-4xl md:text-6xl font-serif font-bold text-white">The African Fabric Guide</h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Preserving tradition while powering innovation. Explore the textures, histories, and patterns that define the continent's sartorial legacy.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {FABRICS.map((fabric, i) => (
          <div key={i} className="bg-dark-surface border border-gray-800 rounded-3xl overflow-hidden group hover:border-gold transition-all duration-500">
            <div className="aspect-[4/5] relative">
              <img src={fabric.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={fabric.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs font-bold text-gold uppercase tracking-widest">{fabric.origin}</span>
                <h3 className="text-2xl font-serif font-bold text-white mt-1">{fabric.name}</h3>
              </div>
            </div>
            <div className="p-6">
                <p className="text-gray-400 text-sm leading-relaxed mb-6">{fabric.desc}</p>
                <div className="flex justify-between items-center">
                    <button className="text-gold text-xs font-bold flex items-center gap-2 hover:underline"><Info size={14} /> View History</button>
                    <button onClick={handleAction} className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"><Heart size={18} /></button>
                </div>
            </div>
          </div>
        ))}
      </section>

      <section className="bg-gradient-to-r from-gold/20 to-transparent border border-gold/30 p-10 rounded-3xl flex flex-col md:flex-row items-center gap-8 justify-between">
          <div className="max-w-lg space-y-4">
              <h3 className="text-3xl font-serif font-bold">Showcase Your Heritage</h3>
              <p className="text-gray-300">
                  Are you working with unique local textiles? Share your process, the models you work with, and the stories behind your fabrics.
              </p>
          </div>
          <button 
            onClick={handleAction}
            className="whitespace-nowrap bg-gold text-dark font-bold px-10 py-5 rounded-full hover:bg-white transition-all transform hover:scale-105 flex items-center gap-2"
          >
              <Camera size={20} /> Share My Fabric
          </button>
      </section>
    </div>
  );
};

export default FabricGuide;