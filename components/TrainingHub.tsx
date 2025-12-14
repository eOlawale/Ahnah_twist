import React, { useState, useRef, useEffect } from 'react';
import { getFashionAdvice } from '../services/geminiService';
import { MessageSquare, Play, Book, Send, User, Bot, Plus, X, Upload, Youtube, ExternalLink, Link } from 'lucide-react';

// Custom TikTok Icon
const TiktokIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Tutorial {
  id: string;
  title: string;
  duration: string;
  level: string;
  image: string;
  platform?: 'youtube' | 'tiktok' | 'internal';
  link?: string;
}

const INITIAL_TUTORIALS: Tutorial[] = [
    { id: '1', title: 'Pattern Making Basics', duration: '45 min', level: 'Beginner', image: 'https://picsum.photos/300/200?random=10', platform: 'internal' },
    { id: '2', title: 'Draping on the Stand', duration: '1h 20m', level: 'Intermediate', image: 'https://picsum.photos/300/200?random=11', platform: 'youtube', link: '#' },
    { id: '3', title: 'Textile Science', duration: '30 min', level: 'All Levels', image: 'https://picsum.photos/300/200?random=12', platform: 'internal' },
    { id: '4', title: 'Haute Couture Finishing', duration: '2h', level: 'Advanced', image: 'https://picsum.photos/300/200?random=13', platform: 'tiktok', link: '#' },
];

const TrainingHub: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I am your AI Fashion Tutor. Ask me anything about sewing techniques, fabric choices, or fashion history.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Tutorial State
  const [tutorials, setTutorials] = useState<Tutorial[]>(INITIAL_TUTORIALS);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [newTutorial, setNewTutorial] = useState<Partial<Tutorial>>({
      title: '',
      duration: '',
      level: 'Beginner',
      platform: 'internal',
      link: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getFashionAdvice(input);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewTutorial(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePublishTutorial = () => {
      if (!newTutorial.title || !newTutorial.duration || !newTutorial.image) {
          alert("Please fill in the required fields (Title, Duration, Image).");
          return;
      }
      const tutorial: Tutorial = {
          id: Date.now().toString(),
          title: newTutorial.title!,
          duration: newTutorial.duration!,
          level: newTutorial.level || 'Beginner',
          image: newTutorial.image!,
          platform: newTutorial.platform as any,
          link: newTutorial.link
      };
      setTutorials([tutorial, ...tutorials]);
      setIsUploadOpen(false);
      setNewTutorial({ title: '', duration: '', level: 'Beginner', platform: 'internal', link: '', image: '' });
  };

  return (
    <div className="max-w-6xl mx-auto pb-20 space-y-8 animate-fade-in h-[calc(100vh-100px)] flex flex-col relative">
       <header className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-serif font-bold text-white mb-2">Training Hub</h2>
            <p className="text-gray-400">Master the art of fashion design with expert tutorials and AI assistance.</p>
          </div>
          <button 
             onClick={() => setIsUploadOpen(true)}
             className="bg-gray-800 text-white border border-gray-700 px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center gap-2 transition-colors"
          >
             <Upload size={16} /> Upload Tutorial
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 min-h-0">
             {/* Tutorials Section */}
             <div className="lg:col-span-1 space-y-6 overflow-y-auto no-scrollbar pr-2">
                <h3 className="text-lg font-bold text-gold border-b border-gray-800 pb-2">Featured Courses</h3>
                
                {tutorials.map((course) => (
                    <div key={course.id} className="bg-dark-surface rounded-xl overflow-hidden border border-gray-800 hover:border-gold/50 cursor-pointer group transition-all">
                        <div className="relative h-32">
                            <img src={course.image} alt={course.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                                <div className="w-10 h-10 rounded-full bg-gold/90 flex items-center justify-center text-dark relative">
                                    <Play size={16} fill="currentColor" className="ml-1" />
                                </div>
                            </div>
                            {course.platform !== 'internal' && (
                                <div className="absolute top-2 right-2 px-2 py-1 bg-black/70 rounded flex items-center gap-1 text-[10px] font-bold uppercase text-white backdrop-blur-sm">
                                    {course.platform === 'youtube' && <Youtube size={12} className="text-red-500" />}
                                    {course.platform === 'tiktok' && <TiktokIcon size={12} className="text-pink-400" />}
                                    {course.platform}
                                </div>
                            )}
                        </div>
                        <div className="p-4">
                            <h4 className="font-bold text-white mb-1 group-hover:text-gold transition-colors">{course.title}</h4>
                            <div className="flex gap-3 text-xs text-gray-400 items-center justify-between">
                                <div className="flex gap-2">
                                    <span>{course.duration}</span>
                                    <span>•</span>
                                    <span>{course.level}</span>
                                </div>
                                {course.link && (
                                    <a href={course.link} target="_blank" rel="noreferrer" className="text-gold hover:underline flex items-center gap-1">
                                        View <ExternalLink size={10} />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
             </div>

             {/* Chat Interface */}
             <div className="lg:col-span-2 bg-dark-surface rounded-2xl border border-gray-800 flex flex-col overflow-hidden shadow-2xl">
                 <div className="p-4 bg-gray-900 border-b border-gray-800 flex items-center justify-between">
                     <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gold to-yellow-600 flex items-center justify-center text-dark font-bold">
                             <Bot size={24} />
                         </div>
                         <div>
                             <h3 className="font-bold text-white">AI Mentor</h3>
                             <p className="text-xs text-green-400 flex items-center gap-1">
                                 <span className="w-2 h-2 rounded-full bg-green-400"></span> Online
                             </p>
                         </div>
                     </div>
                 </div>

                 <div className="flex-1 overflow-y-auto p-6 space-y-6">
                     {messages.map((msg, idx) => (
                         <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                             <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-gray-700' : 'bg-gold text-dark'}`}>
                                 {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                             </div>
                             <div className={`max-w-[80%] rounded-2xl p-4 ${
                                 msg.role === 'user' 
                                 ? 'bg-blue-600 text-white rounded-tr-none' 
                                 : 'bg-gray-800 text-gray-200 rounded-tl-none border border-gray-700'
                             }`}>
                                 <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                             </div>
                         </div>
                     ))}
                     {isLoading && (
                         <div className="flex gap-4">
                             <div className="w-8 h-8 rounded-full bg-gold text-dark flex items-center justify-center shrink-0">
                                 <Bot size={16} />
                             </div>
                             <div className="bg-gray-800 rounded-2xl rounded-tl-none p-4 border border-gray-700 flex gap-2 items-center">
                                 <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                                 <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-75"></div>
                                 <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></div>
                             </div>
                         </div>
                     )}
                     <div ref={messagesEndRef} />
                 </div>

                 <div className="p-4 bg-gray-900 border-t border-gray-800">
                     <div className="relative">
                         <input
                             type="text"
                             value={input}
                             onChange={(e) => setInput(e.target.value)}
                             onKeyDown={handleKeyDown}
                             placeholder="Ask about fabrics, stitching, or design theory..."
                             className="w-full bg-black/50 border border-gray-700 rounded-xl pl-4 pr-12 py-4 text-white focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all"
                         />
                         <button 
                             onClick={handleSendMessage}
                             disabled={!input.trim() || isLoading}
                             className="absolute right-2 top-2 p-2 bg-gold rounded-lg text-dark hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                         >
                             <Send size={20} />
                         </button>
                     </div>
                 </div>
             </div>
        </div>

        {/* Upload Tutorial Modal */}
        {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-fade-in">
          <div className="bg-dark-surface border border-gray-700 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700 flex justify-between items-center bg-gray-900 sticky top-0">
                <h3 className="text-xl font-serif font-bold text-white">Upload Tutorial</h3>
                <button onClick={() => setIsUploadOpen(false)} className="text-gray-400 hover:text-white"><X /></button>
            </div>
            <div className="p-6 space-y-6">
                
                {/* Thumbnail Upload */}
                <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full aspect-video bg-black/50 border-2 border-dashed border-gray-700 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-gold hover:bg-black/70 transition-all relative overflow-hidden"
                >
                    {newTutorial.image ? (
                        <img src={newTutorial.image} className="w-full h-full object-cover" />
                    ) : (
                        <>
                            <Upload size={32} className="text-gray-500 mb-2" />
                            <span className="text-sm text-gray-400">Click to upload thumbnail</span>
                        </>
                    )}
                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="text-xs text-gray-400 uppercase font-bold block mb-1">Title</label>
                        <input 
                            type="text" 
                            className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:border-gold focus:outline-none"
                            placeholder="e.g. Master Class: Silk Stitching"
                            value={newTutorial.title}
                            onChange={e => setNewTutorial({...newTutorial, title: e.target.value})}
                        />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs text-gray-400 uppercase font-bold block mb-1">Duration</label>
                            <input 
                                type="text" 
                                className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:border-gold focus:outline-none"
                                placeholder="e.g. 15 min"
                                value={newTutorial.duration}
                                onChange={e => setNewTutorial({...newTutorial, duration: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="text-xs text-gray-400 uppercase font-bold block mb-1">Level</label>
                            <select 
                                className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:border-gold focus:outline-none"
                                value={newTutorial.level}
                                onChange={e => setNewTutorial({...newTutorial, level: e.target.value})}
                            >
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="text-xs text-gray-400 uppercase font-bold block mb-1">Platform Source</label>
                        <div className="grid grid-cols-3 gap-2 mb-2">
                             {['internal', 'youtube', 'tiktok'].map(p => (
                                 <button
                                    key={p}
                                    onClick={() => setNewTutorial({...newTutorial, platform: p as any})}
                                    className={`py-2 rounded-lg text-xs font-bold uppercase border ${
                                        newTutorial.platform === p 
                                        ? 'bg-gold text-dark border-gold' 
                                        : 'bg-transparent text-gray-400 border-gray-700'
                                    }`}
                                 >
                                     {p}
                                 </button>
                             ))}
                        </div>
                        <div className="relative">
                            <Link size={16} className="absolute left-3 top-3.5 text-gray-500" />
                            <input 
                                type="text" 
                                className="w-full bg-black/50 border border-gray-700 rounded-lg pl-10 pr-3 py-3 text-white focus:border-gold focus:outline-none"
                                placeholder={newTutorial.platform === 'internal' ? "File URL (optional)" : "Paste video link here"}
                                value={newTutorial.link}
                                onChange={e => setNewTutorial({...newTutorial, link: e.target.value})}
                            />
                        </div>
                    </div>
                </div>

                <button 
                    onClick={handlePublishTutorial}
                    className="w-full bg-gold text-dark font-bold py-4 rounded-xl hover:bg-white transition-colors"
                >
                    Publish Content
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingHub;