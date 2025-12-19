import React, { useState } from 'react';
import { Save, Image as ImageIcon, Layout, RefreshCw, Smartphone, Monitor, Globe, ShieldCheck } from 'lucide-react';

interface AdminPanelProps {
  config: any;
  setConfig: (config: any) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ config, setConfig }) => {
  const [localConfig, setLocalConfig] = useState(config);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setConfig(localConfig);
      setIsSaving(false);
      alert("Site configuration updated successfully!");
    }, 1000);
  };

  const RATIOS = ['aspect-square', 'aspect-video', 'aspect-[4/5]', 'aspect-[3/4]', 'aspect-[16/10]'];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-gray-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="text-gold" size={32} />
            <h2 className="text-3xl font-serif font-bold text-white">Super Admin Console</h2>
          </div>
          <p className="text-gray-400">Global site overrides, layout management, and operational controls.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-gold text-dark font-bold px-8 py-3 rounded-xl hover:bg-white transition-all flex items-center gap-2"
        >
          {isSaving ? <RefreshCw className="animate-spin" /> : <Save size={18} />} Save Changes
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Hero Configuration */}
        <div className="bg-dark-surface p-8 rounded-2xl border border-gray-800 space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2"><Layout className="text-gold" /> Hero Section</h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Hero Image URL</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={localConfig.heroImage}
                  onChange={(e) => setLocalConfig({...localConfig, heroImage: e.target.value})}
                  className="flex-1 bg-black/50 border border-gray-700 rounded-lg p-3 text-white text-sm focus:border-gold outline-none" 
                />
              </div>
            </div>
            
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Aspect Ratio</label>
              <div className="flex flex-wrap gap-2">
                {RATIOS.map(r => (
                  <button 
                    key={r}
                    onClick={() => setLocalConfig({...localConfig, heroAspectRatio: r})}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${localConfig.heroAspectRatio === r ? 'bg-gold text-dark border-gold' : 'border-gray-700 text-gray-400'}`}
                  >
                    {r.split('-')[1]}
                  </button>
                ))}
              </div>
            </div>

            <div className={`mt-4 rounded-xl overflow-hidden border border-gray-700 ${localConfig.heroAspectRatio} bg-gray-900`}>
                <img src={localConfig.heroImage} className="w-full h-full object-cover opacity-50" alt="Preview" />
                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold uppercase text-gray-500">Live Preview</div>
            </div>
          </div>
        </div>

        {/* Gallery Configuration */}
        <div className="bg-dark-surface p-8 rounded-2xl border border-gray-800 space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2"><ImageIcon className="text-gold" /> Featured Gallery</h3>
          
          <div className="space-y-4">
            {localConfig.gallery.map((img: any, i: number) => (
              <div key={i} className="p-4 bg-black/30 rounded-xl border border-gray-700 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-gold uppercase">Item {i + 1}</span>
                  <select 
                    value={img.ratio}
                    onChange={(e) => {
                      const newG = [...localConfig.gallery];
                      newG[i].ratio = e.target.value;
                      setLocalConfig({...localConfig, gallery: newG});
                    }}
                    className="bg-dark border border-gray-700 text-[10px] rounded px-1 text-gray-400"
                  >
                    {RATIOS.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <input 
                  type="text" 
                  value={img.url}
                  onChange={(e) => {
                    const newG = [...localConfig.gallery];
                    newG[i].url = e.target.value;
                    setLocalConfig({...localConfig, gallery: newG});
                  }}
                  className="w-full bg-black/50 border border-gray-700 rounded-lg p-2 text-xs text-white outline-none"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-blue-900/20 border border-blue-900/50 p-6 rounded-2xl flex items-start gap-4">
          <Monitor className="text-blue-400 shrink-0" />
          <div>
            <h4 className="font-bold text-blue-200">System Information</h4>
            <p className="text-sm text-blue-300 mt-1">
              Changes saved here will propagate across the CDN immediately. For CI/CD triggers, use the Deployment Hook in the "Advanced" tab. 
              Always ensure image aspect ratios match the intended UI container to prevent layout shifts (CLS).
            </p>
          </div>
      </div>
    </div>
  );
};

export default AdminPanel;