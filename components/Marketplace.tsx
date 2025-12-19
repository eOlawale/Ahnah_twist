import React, { useState, useRef } from 'react';
import { ShoppingCart, Heart, Tag, Plus, Upload, X, Trash2, CreditCard, CheckCircle, Store, History, Package, Clock, LayoutDashboard, TrendingUp, DollarSign, PackageOpen, ArrowLeft, Settings, Landmark, Globe, Megaphone, Send, Mail, Edit, Save, FileText, Users, Shield, RefreshCw, Home, ChevronRight, Lock } from 'lucide-react';
import { Product, ProductHistory, User, UserRole, ViewState } from '../types';

const INITIAL_PRODUCTS: Product[] = [
  { id: '1', name: 'Atelier Midnight Gown', price: 1200, category: 'Women', image: 'https://picsum.photos/400/600?random=1', description: 'Stunning midnight blue velvet gown.', vendorId: 'system', stockStatus: 'IN_STOCK', history: [] },
  { id: '2', name: 'Urban Tech Jacket', price: 450, category: 'Men', image: 'https://picsum.photos/400/600?random=2', description: 'Waterproof tech fabric.', vendorId: 'system', stockStatus: 'IN_STOCK', history: [] },
  { id: '5', name: 'Gold Leaf Cocktail Dress', price: 850, category: 'Women', image: 'https://picsum.photos/400/600?random=5', description: 'Hand-applied gold leaf on tulle.', vendorId: 'user', stockStatus: 'IN_STOCK', history: [] }
];

interface CartItem extends Product { quantity: number; }
interface Order { id: string; date: string; items: CartItem[]; total: number; status: string; paymentMethod: string; }
interface VendorSale { id: string; date: string; productName: string; amount: number; status: string; }

interface MarketplaceProps {
    setView?: (view: ViewState) => void;
    userRole?: UserRole;
}

const EXCHANGE_RATE = 1500;

const Marketplace: React.FC<MarketplaceProps> = ({ setView, userRole }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const [vendorSales, setVendorSales] = useState<VendorSale[]>([]);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'SHOPPER' | 'VENDOR'>('SHOPPER');
  const [currency, setCurrency] = useState<'USD' | 'NGN'>('USD');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const isGuest = userRole === 'GUEST';

  const formatPrice = (priceInUSD: number) => {
      if (currency === 'USD') return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(priceInUSD);
      return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(priceInUSD * EXCHANGE_RATE);
  };

  const addToCart = (product: Product) => {
    if (isGuest) {
        alert("Authentication required. Please create an account or login to purchase items.");
        return;
    }
    if (product.stockStatus === 'SOLD_OUT') return;
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const activeProduct = products.find(p => p.id === selectedProductId);
  const filteredProducts = categoryFilter === 'All' ? products : products.filter(p => p.category === categoryFilter);

  if (selectedProductId && activeProduct) {
      return (
          <div className="max-w-7xl mx-auto pb-20 space-y-8 animate-fade-in relative min-h-screen">
               <header className="flex justify-between items-center mb-6">
                   <div className="flex gap-4 items-center">
                        <button onClick={() => setSelectedProductId(null)} className="flex items-center gap-2 text-gold border border-gold/50 rounded-lg px-3 py-2 bg-gray-900"><ArrowLeft size={18} /> Back</button>
                   </div>
               </header>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-gray-800 bg-gray-900">
                       <img src={activeProduct.image} alt={activeProduct.name} className="w-full h-full object-cover" />
                   </div>
                   <div className="space-y-8">
                       <div>
                           <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">{activeProduct.name}</h1>
                           <p className="text-2xl text-gold font-bold mb-6">{formatPrice(activeProduct.price)}</p>
                           <p className="text-gray-300 leading-relaxed text-lg">{activeProduct.description}</p>
                       </div>
                       <button 
                            onClick={() => addToCart(activeProduct)}
                            className="w-full py-5 rounded-xl text-lg font-bold flex items-center justify-center gap-3 bg-gold text-dark hover:bg-white transition-all shadow-lg"
                        >
                            <ShoppingCart size={24} /> {isGuest ? 'Login to Buy' : 'Add to Cart'}
                        </button>
                   </div>
               </div>
          </div>
      )
  }

  return (
    <div className="max-w-7xl mx-auto pb-20 space-y-8 animate-fade-in relative">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-serif font-bold text-white mb-2">The Showroom</h2>
          <p className="text-gray-400">Curated pieces from top independent designers.</p>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
             {isGuest && <div className="text-xs bg-gold/10 text-gold px-3 py-1 rounded-full border border-gold flex items-center gap-1 mr-2"><Lock size={12}/> Guest Preview</div>}
             {setView && <button onClick={() => setView(ViewState.HOME)} className="text-gray-400 hover:text-white border border-gray-700 rounded-lg px-3 py-2 bg-gray-900 mr-2"><Home size={16} /> Home</button>}
             <button onClick={() => setCurrency(currency === 'USD' ? 'NGN' : 'USD')} className="bg-gray-800 text-gold font-bold px-4 py-2 rounded-lg border border-gray-700">{currency}</button>
             <button onClick={() => setViewMode(viewMode === 'SHOPPER' ? 'VENDOR' : 'SHOPPER')} className="bg-transparent border border-gold text-gold px-4 py-2 rounded-lg hover:bg-gold hover:text-dark transition-all">Dashboard</button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} onClick={() => setSelectedProductId(product.id)} className="group bg-dark-surface rounded-xl overflow-hidden border border-gray-800 hover:border-gold/50 transition-all cursor-pointer relative">
            <div className="aspect-[3/4] relative overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-serif font-semibold text-white mb-1">{product.name}</h3>
              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-bold text-white">{formatPrice(product.price)}</span>
                <button onClick={(e) => { e.stopPropagation(); addToCart(product); }} className="p-2 bg-white/10 rounded-lg hover:bg-gold hover:text-dark"><ShoppingCart size={16} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;