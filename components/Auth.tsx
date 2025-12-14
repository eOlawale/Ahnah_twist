import React, { useState } from 'react';
import { User, Lock, Mail, ArrowRight } from 'lucide-react';

interface AuthProps {
  onLogin: (user: any) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate authentication
    setTimeout(() => {
      onLogin({ email, name: name || email.split('@')[0] });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4 bg-[url('https://images.unsplash.com/photo-1537832816519-0439447f0d53?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
      
      <div className="relative z-10 w-full max-w-md bg-dark-surface border border-gray-800 p-8 rounded-2xl shadow-2xl animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-gold mb-2">Ahnah_twistz</h1>
          <p className="text-gray-400">Welcome to the future of fashion.</p>
        </div>

        <div className="flex gap-4 mb-8 bg-black/40 p-1 rounded-xl">
          <button 
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${isLogin ? 'bg-gold text-dark shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            Login
          </button>
          <button 
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${!isLogin ? 'bg-gold text-dark shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-500" size={18} />
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black/50 border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-white focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  placeholder="Jane Doe"
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-500" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/50 border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-white focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                placeholder="name@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-500" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/50 border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-white focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-gold text-dark font-bold py-4 rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2 mt-6"
          >
            {isLogin ? 'Log In' : 'Create Account'} <ArrowRight size={18} />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-gray-500">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </div>
      </div>
    </div>
  );
};

export default Auth;