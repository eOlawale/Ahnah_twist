import React, { useState, useRef } from 'react';
import { Camera, Upload, Info, Check, Loader2, Save } from 'lucide-react';
import { analyzeBodyImage } from '../services/geminiService';
import { MeasurementProfile } from '../types';

const MeasurementTool: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string>('');
  const [measurements, setMeasurements] = useState<MeasurementProfile>({
    bust: '', waist: '', hips: '', height: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setSelectedImage(base64String);
        // Remove data URL prefix for API
        const base64Data = base64String.split(',')[1];
        performAnalysis(base64Data);
      };
      reader.readAsDataURL(file);
    }
  };

  const performAnalysis = async (base64Data: string) => {
    setIsAnalyzing(true);
    try {
      const result = await analyzeBodyImage(base64Data);
      setAnalysisResult(result);
    } catch (error) {
      setAnalysisResult("Failed to analyze image. Please try again with a clearer photo.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMeasurements(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-20">
      <header>
        <h2 className="text-3xl font-serif font-bold text-white mb-2">Smart Measurements</h2>
        <p className="text-gray-400">Upload a full-body photo for AI shape analysis and personalized sizing advice.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Image & Upload */}
        <div className="space-y-6">
          <div className="bg-dark-surface border-2 border-dashed border-gray-700 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden group hover:border-gold transition-colors">
            {selectedImage ? (
              <img src={selectedImage} alt="User analysis" className="absolute inset-0 w-full h-full object-cover opacity-80" />
            ) : (
              <div className="text-center space-y-4 z-10">
                <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto text-gold">
                  <Camera size={40} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Upload or Capture</h3>
                  <p className="text-sm text-gray-500 mt-2 max-w-xs mx-auto">Stand straight, wear fitted clothes, and ensure good lighting.</p>
                </div>
              </div>
            )}
            
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer z-20"
              onChange={handleImageUpload}
              ref={fileInputRef}
            />
            
            {isAnalyzing && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-30">
                <div className="text-center">
                  <Loader2 size={48} className="animate-spin text-gold mx-auto mb-4" />
                  <p className="text-gold font-medium">Analyzing body structure...</p>
                </div>
              </div>
            )}
          </div>

           {/* Manual Measurements Form */}
           <div className="bg-dark-surface p-6 rounded-xl border border-gray-800">
            <div className="flex items-center gap-2 mb-4 text-gold">
              <RulerIcon />
              <h3 className="font-semibold">Manual Inputs (cm/in)</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {['Bust', 'Waist', 'Hips', 'Height'].map((field) => (
                <div key={field}>
                  <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">{field}</label>
                  <input
                    type="text"
                    name={field.toLowerCase()}
                    value={(measurements as any)[field.toLowerCase()]}
                    onChange={handleInputChange}
                    placeholder="0.0"
                    className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-gold focus:outline-none transition-colors"
                  />
                </div>
              ))}
            </div>
            <button className="w-full mt-6 bg-gold text-dark font-bold py-3 rounded-lg hover:bg-gold-light transition-colors flex items-center justify-center gap-2">
              <Save size={18} />
              Save Profile
            </button>
          </div>
        </div>

        {/* Right Column: Results & Analysis */}
        <div className="space-y-6">
          {analysisResult ? (
            <div className="bg-dark-surface rounded-2xl p-6 border border-gray-800 h-full overflow-y-auto max-h-[800px]">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800">
                <div className="p-2 bg-gold/10 rounded-lg">
                   <Info className="text-gold" size={24} />
                </div>
                <h3 className="text-xl font-serif font-bold">AI Analysis Report</h3>
              </div>
              <div className="prose prose-invert prose-gold max-w-none">
                <div className="whitespace-pre-wrap text-gray-300 leading-relaxed text-sm md:text-base">
                  {analysisResult}
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-blue-900/20 border border-blue-900/50 rounded-lg flex gap-3">
                 <Info className="text-blue-400 shrink-0" size={20} />
                 <p className="text-xs text-blue-200">
                   This analysis is an estimation based on computer vision. Always verify with a measuring tape for precise tailoring.
                 </p>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-600 border border-gray-800 rounded-2xl p-10 bg-dark-surface/50 border-dashed">
              <Upload size={48} className="mb-4 opacity-50" />
              <p className="text-center">Upload a photo to see your body shape analysis and styling tips here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const RulerIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.4 2.4 0 0 1 0-3.4l2.6-2.6a2.4 2.4 0 0 1 3.4 0l12.6 12.6z"/>
        <path d="m5 6 1.7 1.7"/>
        <path d="m11 12 1.7 1.7"/>
        <path d="m17 18 1.7 1.7"/>
        <path d="m8 9 1.7 1.7"/>
        <path d="m14 15 1.7 1.7"/>
    </svg>
)

export default MeasurementTool;
