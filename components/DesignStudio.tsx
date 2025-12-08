import React, { useState } from 'react';
import { generateFashionDesign, generateSocialCaption } from '../services/geminiService';
import { Sparkles, Download, Share2, Palette, RefreshCw, Instagram, Twitter, Copy, Check } from 'lucide-react';

const DesignStudio: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  
  // Sharing state
  const [showShareModal, setShowShareModal] = useState(false);
  const [caption, setCaption] = useState('');
  const [isGeneratingCaption, setIsGeneratingCaption] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setGeneratedImage(null);
    try {
      const base64Image = await generateFashionDesign(prompt);
      setGeneratedImage(base64Image);
    } catch (error) {
      alert("Failed to generate design. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShareClick = async () => {
     setShowShareModal(true);
     if (prompt && !caption) {
         setIsGeneratingCaption(true);
         try {
             const aiCaption = await generateSocialCaption(prompt);
             setCaption(aiCaption);
         } catch (e) {
             console.error(e);
         } finally {
             setIsGeneratingCaption(false);
         }
     }
  };

  const copyToClipboard = () => {
      navigator.clipboard.writeText(caption);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleGenerate();
      }
  }

  return (
    <div className="max-w-6xl mx-auto pb-20 space-y-8 animate-fade-in relative">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-serif font-bold text-white mb-2">Design Studio</h2>
          <p className="text-gray-400">Describe your dream garment and let our AI sketch it for you.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-200px)] min-h-[600px]">
        {/* Input Panel */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <div className="bg-dark-surface p-6 rounded-2xl border border-gray-800 flex-1 flex flex-col">
            <label className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
              <Sparkles size={16} />
              DESIGN PROMPT
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="E.g., A floor-length emerald green silk evening gown with a high slit, asymmetrical neckline, and gold embroidery details..."
              className="w-full bg-black/40 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-600 focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none resize-none flex-1 mb-4 transition-all"
            />
            
            <div className="space-y-3">
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt}
                className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all ${
                  isGenerating || !prompt
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-gold to-yellow-600 text-dark hover:from-yellow-400 hover:to-yellow-700'
                }`}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="animate-spin" /> Generating...
                  </>
                ) : (
                  <>
                    <Palette size={20} /> Create Sketch
                  </>
                )}
              </button>
            </div>
            
            <div className="mt-6">
                <p className="text-xs text-gray-500 font-semibold mb-2">TRY THESE PROMPTS</p>
                <div className="flex flex-wrap gap-2">
                    {['Summer floral sundress', 'Avant-garde leather jacket', 'Cyberpunk kimono'].map(p => (
                        <button 
                            key={p} 
                            onClick={() => setPrompt(p)}
                            className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded-full transition-colors"
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="lg:col-span-2 bg-dark-surface rounded-2xl border border-gray-800 p-2 relative flex items-center justify-center overflow-hidden">
          {generatedImage ? (
            <div className="relative w-full h-full flex items-center justify-center bg-black/20 rounded-xl">
              <img 
                src={generatedImage} 
                alt="Generated Design" 
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <button className="p-3 bg-black/60 backdrop-blur-md rounded-full text-white hover:bg-gold hover:text-dark transition-all">
                  <Download size={20} />
                </button>
                <button 
                  onClick={handleShareClick}
                  className="p-3 bg-black/60 backdrop-blur-md rounded-full text-white hover:bg-gold hover:text-dark transition-all"
                >
                  <Share2 size={20} />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-600 max-w-md p-6">
              <div className="w-24 h-24 rounded-full bg-gray-800/50 flex items-center justify-center mx-auto mb-6">
                 <Palette size={40} className="text-gray-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-400 mb-2">Canvas Empty</h3>
              <p>Your creativity is the limit. Describe your vision to see it come to life.</p>
            </div>
          )}
          
          {/* Loading Overlay */}
          {isGenerating && (
             <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                 <div className="relative w-24 h-24 mb-6">
                     <div className="absolute inset-0 border-4 border-gray-800 rounded-full"></div>
                     <div className="absolute inset-0 border-4 border-gold rounded-full border-t-transparent animate-spin"></div>
                 </div>
                 <h3 className="text-2xl font-serif text-gold animate-pulse">Sketching...</h3>
                 <p className="text-gray-400 mt-2">Our AI artists are at work</p>
             </div>
          )}
        </div>
      </div>

      {/* Social Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
            <div className="bg-dark-surface border border-gray-700 rounded-2xl w-full max-w-md p-6 relative animate-fade-in">
                <button 
                    onClick={() => setShowShareModal(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                    ✕
                </button>
                
                <h3 className="text-2xl font-serif font-bold text-gold mb-4">Share Your Creation</h3>
                
                <div className="mb-6">
                    <img src={generatedImage!} alt="Design to share" className="w-full h-48 object-cover rounded-xl mb-4 opacity-70" />
                    
                    <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">AI Suggested Caption</label>
                    <div className="relative">
                        <textarea 
                            value={isGeneratingCaption ? "Generating catchy caption..." : caption}
                            onChange={(e) => setCaption(e.target.value)}
                            className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-sm text-gray-300 h-24 resize-none focus:border-gold focus:outline-none"
                            disabled={isGeneratingCaption}
                        />
                        <button 
                            onClick={copyToClipboard}
                            className="absolute bottom-2 right-2 p-1.5 bg-gray-700 rounded-md text-white hover:bg-gray-600 transition-colors"
                            title="Copy caption"
                        >
                            {isCopied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                        </button>
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-2 py-3 bg-pink-600 rounded-lg font-semibold hover:bg-pink-700 transition-colors">
                        <Instagram size={18} /> Instagram
                    </button>
                    <button className="flex items-center justify-center gap-2 py-3 bg-blue-500 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                        <Twitter size={18} /> Twitter
                    </button>
                    <button className="col-span-2 flex items-center justify-center gap-2 py-3 bg-gold text-dark rounded-lg font-bold hover:bg-white transition-colors">
                        <Share2 size={18} /> Post to Community
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default DesignStudio;