import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, MessageSquare } from 'lucide-react';
import { getFitSupport } from '../services/geminiService';

const FitAgent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
      { role: 'assistant', content: 'Hi! I\'m Ahnah, your personal fit specialist. Need help measuring or finding your size?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
        const reply = await getFitSupport(userMsg);
        setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (e) {
        setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-[60] p-4 rounded-full shadow-2xl transition-all duration-300 ${isOpen ? 'bg-gray-800 text-white rotate-90' : 'bg-gold text-dark hover:scale-110'}`}
      >
        {isOpen ? <X size={24} /> : <Bot size={28} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
          <div className="fixed bottom-24 right-6 z-[60] w-80 md:w-96 bg-dark-surface border border-gray-700 rounded-2xl shadow-2xl overflow-hidden animate-slide-up flex flex-col max-h-[500px]">
              <div className="bg-gold p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-dark rounded-full flex items-center justify-center text-gold">
                      <Bot size={20} />
                  </div>
                  <div>
                      <h3 className="font-bold text-dark leading-tight">Ahnah Fit Agent</h3>
                      <p className="text-xs text-dark/70">Interactive Measurement Support</p>
                  </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/40 h-80">
                  {messages.map((msg, i) => (
                      <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-gold text-dark rounded-br-none' : 'bg-gray-800 text-gray-200 rounded-bl-none'}`}>
                              {msg.content}
                          </div>
                      </div>
                  ))}
                  {isLoading && (
                      <div className="flex justify-start">
                          <div className="bg-gray-800 p-3 rounded-2xl rounded-bl-none flex gap-1">
                              <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                              <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-75"></span>
                              <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></span>
                          </div>
                      </div>
                  )}
                  <div ref={endRef} />
              </div>

              <div className="p-3 bg-gray-900 border-t border-gray-800 flex gap-2">
                  <input 
                    type="text" 
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                    placeholder="Ask about sizing..."
                    className="flex-1 bg-black/50 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:border-gold outline-none"
                  />
                  <button 
                    onClick={handleSend}
                    className="p-2 bg-gold text-dark rounded-lg hover:bg-white transition-colors"
                  >
                      <Send size={18} />
                  </button>
              </div>
          </div>
      )}
    </>
  );
};

export default FitAgent;