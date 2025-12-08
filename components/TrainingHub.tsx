import React, { useState, useRef, useEffect } from 'react';
import { getFashionAdvice } from '../services/geminiService';
import { MessageSquare, Play, Book, Send, User, Bot } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const TrainingHub: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I am your AI Fashion Tutor. Ask me anything about sewing techniques, fabric choices, or fashion history.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="max-w-6xl mx-auto pb-20 space-y-8 animate-fade-in h-[calc(100vh-100px)] flex flex-col">
       <header>
          <h2 className="text-3xl font-serif font-bold text-white mb-2">Training Hub</h2>
          <p className="text-gray-400">Master the art of fashion design with expert tutorials and AI assistance.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 min-h-0">
             {/* Tutorials Section */}
             <div className="lg:col-span-1 space-y-6 overflow-y-auto no-scrollbar pr-2">
                <h3 className="text-lg font-bold text-gold border-b border-gray-800 pb-2">Featured Courses</h3>
                
                {[
                    { title: 'Pattern Making Basics', duration: '45 min', level: 'Beginner', image: 'https://picsum.photos/300/200?random=10' },
                    { title: 'Draping on the Stand', duration: '1h 20m', level: 'Intermediate', image: 'https://picsum.photos/300/200?random=11' },
                    { title: 'Textile Science', duration: '30 min', level: 'All Levels', image: 'https://picsum.photos/300/200?random=12' },
                    { title: 'Haute Couture Finishing', duration: '2h', level: 'Advanced', image: 'https://picsum.photos/300/200?random=13' },
                ].map((course, idx) => (
                    <div key={idx} className="bg-dark-surface rounded-xl overflow-hidden border border-gray-800 hover:border-gold/50 cursor-pointer group transition-all">
                        <div className="relative h-32">
                            <img src={course.image} alt={course.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                                <div className="w-10 h-10 rounded-full bg-gold/90 flex items-center justify-center text-dark">
                                    <Play size={16} fill="currentColor" className="ml-1" />
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                            <h4 className="font-bold text-white mb-1 group-hover:text-gold transition-colors">{course.title}</h4>
                            <div className="flex gap-3 text-xs text-gray-400">
                                <span>{course.duration}</span>
                                <span>•</span>
                                <span>{course.level}</span>
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
    </div>
  );
};

export default TrainingHub;
