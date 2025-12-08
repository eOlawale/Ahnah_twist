import React, { useState, useRef } from 'react';
import { ShoppingCart, Heart, Tag, Plus, Upload, X, Trash2, CreditCard, CheckCircle, Store, History, Package, Clock, LayoutDashboard, TrendingUp, DollarSign, PackageOpen, ArrowLeft, Settings } from 'lucide-react';
import { Product } from '../types';

const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Atelier Midnight Gown',
    price: 1200,
    category: 'Evening Wear',
    image: 'https://picsum.photos/400/600?random=1',
    description: 'A stunning midnight blue velvet gown with hand-stitched detailing.',
    vendorId: 'system'
  },
  {
    id: '2',
    name: 'Urban Tech Jacket',
    price: 450,
    category: 'Outerwear',
    image: 'https://picsum.photos/400/600?random=2',
    description: 'Waterproof, breathable technical fabric with a modern cyberpunk cut.',
    vendorId: 'system'
  },
  {
    id: '3',
    name: 'Silk Kimono Wrap',
    price: 320,
    category: 'Loungewear',
    image: 'https://picsum.photos/400/600?random=3',
    description: '100% Mulberry silk with custom gold embroidery.',
    vendorId: 'system'
  },
  {
    id: '4',
    name: 'Structured Blazer',
    price: 580,
    category: 'Formal',
    image: 'https://picsum.photos/400/600?random=4',
    description: 'Sharp shoulders and a cinched waist for a powerful silhouette.',
    vendorId: 'system'
  },
  {
    id: '5',
    name: 'Gold Leaf Cocktail Dress',
    price: 850,
    category: 'Evening Wear',
    image: 'https://picsum.photos/400/600?random=5',
    description: 'My signature piece featuring real gold leaf detailing.',
    vendorId: 'user'
  }
];

interface CartItem extends Product {
  quantity: number;
}

interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
}

interface VendorSale {
  id: string;
  date: string;
  productName: string;
  amount: number;
  status: string;
}

const Marketplace: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const [vendorSales, setVendorSales] = useState<VendorSale[]>([
      { id: 'SALE-101', date: '10/12/2024', productName: 'Gold Leaf Cocktail Dress', amount: 850, status: 'Completed' }
  ]);
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  // View Modes
  const [viewMode, setViewMode] = useState<'SHOPPER' | 'VENDOR'>('SHOPPER');
  
  // UI States
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // New Product Form State
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    price: 0,
    category: 'Evening Wear',
    description: '',
    image: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Cart Logic ---
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // --- Vendor Logic ---
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePublishProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      alert("Please fill in all required fields and upload an image.");
      return;
    }
    const productToAdd: Product = {
      id: Date.now().toString(),
      name: newProduct.name!,
      price: Number(newProduct.price),
      category: newProduct.category || 'Custom',
      description: newProduct.description || '',
      image: newProduct.image!,
      vendorId: 'user'
    };
    setProducts([productToAdd, ...products]);
    setIsUploadOpen(false);
    setNewProduct({ name: '', price: 0, category: 'Evening Wear', description: '', image: '' });
  };

  const deleteProduct = (id: string) => {
      if(confirm('Are you sure you want to delete this listing?')) {
          setProducts(prev => prev.filter(p => p.id !== id));
      }
  };

  // --- Payment & Sales Logic ---
  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const processPayment = () => {
    setIsPaymentProcessing(true);
    setTimeout(() => {
      setIsPaymentProcessing(false);
      setPaymentSuccess(true);
      
      const dateStr = new Date().toLocaleDateString();

      // 1. Create Buyer Order Record
      const newOrder: Order = {
          id: Math.random().toString(36).substr(2, 9).toUpperCase(),
          date: dateStr,
          items: [...cart],
          total: cartTotal,
          status: 'Processing'
      };
      setOrderHistory(prev => [newOrder, ...prev]);

      // 2. Simulate Vendor Sales (if buying user's own items or just tracking)
      // In a real app, this would filter by vendorId. Here we simulate for 'user' vendorId.
      const newSales: VendorSale[] = cart
        .filter(item => item.vendorId === 'user')
        .map(item => ({
            id: `SALE-${Math.floor(Math.random() * 10000)}`,
            date: dateStr,
            productName: item.name,
            amount: item.price * item.quantity,
            status: 'Pending'
        }));
      
      if (newSales.length > 0) {
          setVendorSales(prev => [...newSales, ...prev]);
      }

      setCart([]);
      setTimeout(() => {
        setPaymentSuccess(false);
        setIsCheckoutOpen(false);
        setIsCartOpen(false);
      }, 3000);
    }, 2000);
  };

  // Dashboard Calculations
  const vendorListings = products.filter(p => p.vendorId === 'user');
  const totalRevenue = vendorSales.reduce((sum, sale) => sum + sale.amount, 0);

  const filteredProducts = categoryFilter === 'All' 
    ? products 
    : products.filter(p => p.category === categoryFilter);

  // --- VENDOR DASHBOARD RENDER ---
  if (viewMode === 'VENDOR') {
      return (
        <div className="max-w-7xl mx-auto pb-20 space-y-8 animate-fade-in relative">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-gray-800 pb-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <LayoutDashboard className="text-gold" size={28} />
                        <h2 className="text-3xl font-serif font-bold text-white">Vendor Dashboard</h2>
                    </div>
                    <p className="text-gray-400">Manage your designs, track sales, and analyze performance.</p>
                </div>
                <div className="flex gap-3">
                    <button 
                        onClick={() => setIsUploadOpen(true)}
                        className="bg-gold text-dark font-bold px-6 py-3 rounded-xl hover:bg-white transition-colors flex items-center gap-2"
                    >
                        <Plus size={18} /> Create Listing
                    </button>
                    <button 
                        onClick={() => setViewMode('SHOPPER')}
                        className="bg-gray-800 text-white border border-gray-700 px-6 py-3 rounded-xl hover:bg-gray-700 transition-colors flex items-center gap-2"
                    >
                        <ArrowLeft size={18} /> Back to Store
                    </button>
                </div>
            </header>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-dark-surface p-6 rounded-2xl border border-gray-800 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center">
                        <DollarSign size={24} />
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm font-bold uppercase">Total Revenue</p>
                        <p className="text-2xl font-bold text-white">${totalRevenue.toFixed(2)}</p>
                    </div>
                </div>
                <div className="bg-dark-surface p-6 rounded-2xl border border-gray-800 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center">
                        <TrendingUp size={24} />
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm font-bold uppercase">Total Sales</p>
                        <p className="text-2xl font-bold text-white">{vendorSales.length} Orders</p>
                    </div>
                </div>
                <div className="bg-dark-surface p-6 rounded-2xl border border-gray-800 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-purple-500/20 text-purple-500 flex items-center justify-center">
                        <PackageOpen size={24} />
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm font-bold uppercase">Active Listings</p>
                        <p className="text-2xl font-bold text-white">{vendorListings.length} Items</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* My Listings */}
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Tag size={20} className="text-gold" /> My Listings
                    </h3>
                    {vendorListings.length === 0 ? (
                        <div className="bg-dark-surface border border-gray-800 rounded-2xl p-10 text-center text-gray-500">
                            <p>You haven't listed any designs yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {vendorListings.map(product => (
                                <div key={product.id} className="bg-dark-surface border border-gray-800 rounded-xl p-4 flex gap-4 hover:border-gold/30 transition-colors">
                                    <img src={product.image} alt={product.name} className="w-20 h-24 object-cover rounded-lg bg-gray-900" />
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h4 className="font-bold text-white line-clamp-1">{product.name}</h4>
                                            <p className="text-xs text-gray-400">{product.category}</p>
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <span className="text-gold font-bold">${product.price}</span>
                                            <div className="flex gap-2">
                                                <button className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
                                                    <Settings size={14} />
                                                </button>
                                                <button 
                                                    onClick={() => deleteProduct(product.id)}
                                                    className="p-2 bg-red-900/20 rounded-lg text-red-500 hover:bg-red-900/40 transition-colors"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Recent Sales */}
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <History size={20} className="text-gold" /> Recent Orders
                    </h3>
                    <div className="bg-dark-surface border border-gray-800 rounded-2xl overflow-hidden">
                        {vendorSales.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">
                                <p>No sales yet.</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-800">
                                {vendorSales.map(sale => (
                                    <div key={sale.id} className="p-4 hover:bg-gray-800/50 transition-colors">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="font-bold text-white text-sm">{sale.productName}</span>
                                            <span className="text-green-400 font-bold text-sm">+${sale.amount}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs text-gray-500">
                                            <span>{sale.date}</span>
                                            <span className="bg-blue-900/30 text-blue-400 px-2 py-0.5 rounded border border-blue-900/50">{sale.status}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Reusing Upload Modal for Dashboard */}
            {isUploadOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-fade-in">
                <div className="bg-dark-surface border border-gray-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                    <div className="p-6 border-b border-gray-700 flex justify-between items-center bg-gray-900 sticky top-0">
                        <h3 className="text-2xl font-serif font-bold text-white">List New Design</h3>
                        <button onClick={() => setIsUploadOpen(false)} className="text-gray-400 hover:text-white"><X /></button>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Image Upload Area */}
                            <div 
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full md:w-1/2 aspect-[3/4] bg-black/50 border-2 border-dashed border-gray-700 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-gold hover:bg-black/70 transition-all relative overflow-hidden"
                            >
                                {newProduct.image ? (
                                    <img src={newProduct.image} className="w-full h-full object-cover" />
                                ) : (
                                    <>
                                        <Upload size={40} className="text-gray-500 mb-2" />
                                        <span className="text-sm text-gray-400">Click to upload image</span>
                                    </>
                                )}
                                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                            </div>

                            {/* Form Fields */}
                            <div className="w-full md:w-1/2 space-y-4">
                                <div>
                                    <label className="text-xs text-gray-400 uppercase font-bold block mb-1">Product Name</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:border-gold focus:outline-none"
                                        placeholder="e.g. Summer Breeze Dress"
                                        value={newProduct.name}
                                        onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-400 uppercase font-bold block mb-1">Price ($)</label>
                                    <input 
                                        type="number" 
                                        className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:border-gold focus:outline-none"
                                        placeholder="0.00"
                                        value={newProduct.price || ''}
                                        onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-400 uppercase font-bold block mb-1">Category</label>
                                    <select 
                                        className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:border-gold focus:outline-none"
                                        value={newProduct.category}
                                        onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                                    >
                                        {['Evening Wear', 'Outerwear', 'Loungewear', 'Formal', 'Casual', 'Accessories'].map(c => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-400 uppercase font-bold block mb-1">Description</label>
                                    <textarea 
                                        className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:border-gold focus:outline-none h-32 resize-none"
                                        placeholder="Describe the materials, fit, and inspiration..."
                                        value={newProduct.description}
                                        onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>
                        <button 
                            onClick={handlePublishProduct}
                            className="w-full bg-gold text-dark font-bold py-4 rounded-xl hover:bg-white transition-colors"
                        >
                            Publish to Showroom
                        </button>
                    </div>
                </div>
                </div>
            )}
        </div>
      );
  }

  // --- SHOPPER VIEW RENDER ---
  return (
    <div className="max-w-7xl mx-auto pb-20 space-y-8 animate-fade-in relative">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Store className="text-gold" size={24} />
            <h2 className="text-3xl font-serif font-bold text-white">The Showroom</h2>
          </div>
          <p className="text-gray-400">Curated pieces from top independent designers.</p>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
             <button 
                onClick={() => setViewMode('VENDOR')}
                className="bg-transparent border border-gold text-gold px-4 py-2 rounded-lg hover:bg-gold hover:text-dark flex items-center gap-2 mr-2 transition-all"
            >
                <LayoutDashboard size={16} /> Vendor Dashboard
            </button>
            <button 
                onClick={() => setIsUploadOpen(true)}
                className="bg-gray-800 text-white border border-gray-700 px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center gap-2 mr-2 transition-colors"
            >
                <Plus size={16} /> List Design
            </button>
            <button 
                onClick={() => setIsOrdersOpen(true)}
                className="bg-gray-800 text-white border border-gray-700 px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center gap-2 mr-2 transition-colors"
            >
                <History size={16} /> Orders
            </button>
            <button 
                onClick={() => setIsCartOpen(true)}
                className="bg-gold text-dark font-bold px-4 py-2 rounded-lg hover:bg-white flex items-center gap-2 transition-colors relative"
            >
                <ShoppingCart size={16} /> Cart
                {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border border-dark">
                        {cart.reduce((acc, item) => acc + item.quantity, 0)}
                    </span>
                )}
            </button>
        </div>
      </header>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {['All', 'Evening Wear', 'Outerwear', 'Loungewear', 'Formal', 'Casual', 'Accessories'].map(cat => (
              <button 
                key={cat} 
                onClick={() => setCategoryFilter(cat)}
                className={`px-4 py-2 rounded-full border text-sm transition-all whitespace-nowrap ${
                    categoryFilter === cat 
                    ? 'bg-gold text-dark border-gold font-bold' 
                    : 'border-gray-700 text-gray-300 hover:bg-gray-800'
                }`}
              >
                  {cat}
              </button>
          ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="group bg-dark-surface rounded-xl overflow-hidden border border-gray-800 hover:border-gold/50 transition-all duration-300 hover:shadow-2xl hover:shadow-gold/10 flex flex-col">
            <div className="relative aspect-[3/4] overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 bg-white/90 rounded-full text-red-500 hover:bg-white transition-colors shadow-lg">
                  <Heart size={18} fill="currentColor" />
                </button>
              </div>
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                 <span className="text-[10px] font-bold text-gold uppercase tracking-wider">{product.category}</span>
                 <div className="flex items-center gap-1 text-gray-400 text-xs">
                    <Tag size={12} />
                    <span>In Stock</span>
                 </div>
              </div>
              <h3 className="text-lg font-serif font-semibold text-white mb-1 group-hover:text-gold transition-colors">{product.name}</h3>
              <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">{product.description}</p>
              <div className="flex justify-between items-center pt-4 border-t border-gray-800 mt-auto">
                <span className="text-xl font-bold text-white">${product.price}</span>
                <button 
                    onClick={() => addToCart(product)}
                    className="bg-white/10 hover:bg-gold hover:text-dark text-white p-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-semibold"
                >
                    <ShoppingCart size={16} /> Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Vendor Upload Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-fade-in">
          <div className="bg-dark-surface border border-gray-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700 flex justify-between items-center bg-gray-900 sticky top-0">
                <h3 className="text-2xl font-serif font-bold text-white">List New Design</h3>
                <button onClick={() => setIsUploadOpen(false)} className="text-gray-400 hover:text-white"><X /></button>
            </div>
            <div className="p-6 space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Image Upload Area */}
                    <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full md:w-1/2 aspect-[3/4] bg-black/50 border-2 border-dashed border-gray-700 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-gold hover:bg-black/70 transition-all relative overflow-hidden"
                    >
                        {newProduct.image ? (
                            <img src={newProduct.image} className="w-full h-full object-cover" />
                        ) : (
                            <>
                                <Upload size={40} className="text-gray-500 mb-2" />
                                <span className="text-sm text-gray-400">Click to upload image</span>
                            </>
                        )}
                        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </div>

                    {/* Form Fields */}
                    <div className="w-full md:w-1/2 space-y-4">
                        <div>
                            <label className="text-xs text-gray-400 uppercase font-bold block mb-1">Product Name</label>
                            <input 
                                type="text" 
                                className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:border-gold focus:outline-none"
                                placeholder="e.g. Summer Breeze Dress"
                                value={newProduct.name}
                                onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="text-xs text-gray-400 uppercase font-bold block mb-1">Price ($)</label>
                            <input 
                                type="number" 
                                className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:border-gold focus:outline-none"
                                placeholder="0.00"
                                value={newProduct.price || ''}
                                onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})}
                            />
                        </div>
                        <div>
                            <label className="text-xs text-gray-400 uppercase font-bold block mb-1">Category</label>
                            <select 
                                className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:border-gold focus:outline-none"
                                value={newProduct.category}
                                onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                            >
                                {['Evening Wear', 'Outerwear', 'Loungewear', 'Formal', 'Casual', 'Accessories'].map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="text-xs text-gray-400 uppercase font-bold block mb-1">Description</label>
                            <textarea 
                                className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:border-gold focus:outline-none h-32 resize-none"
                                placeholder="Describe the materials, fit, and inspiration..."
                                value={newProduct.description}
                                onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                            />
                        </div>
                    </div>
                </div>
                <button 
                    onClick={handlePublishProduct}
                    className="w-full bg-gold text-dark font-bold py-4 rounded-xl hover:bg-white transition-colors"
                >
                    Publish to Showroom
                </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
            <div className="relative w-full max-w-md bg-dark-surface h-full border-l border-gray-800 shadow-2xl flex flex-col animate-slide-in-right">
                <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                    <h3 className="text-xl font-serif font-bold text-white flex items-center gap-2">
                        <ShoppingCart size={20} className="text-gold" /> Your Bag
                    </h3>
                    <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-white"><X /></button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                            <ShoppingCart size={48} className="opacity-20" />
                            <p>Your bag is empty.</p>
                        </div>
                    ) : (
                        cart.map((item, idx) => (
                            <div key={`${item.id}-${idx}`} className="flex gap-4 bg-black/20 p-4 rounded-xl border border-gray-800">
                                <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded-lg" />
                                <div className="flex-1">
                                    <h4 className="font-bold text-white">{item.name}</h4>
                                    <p className="text-xs text-gray-400 mb-2">{item.category}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gold font-bold">${item.price}</span>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                                            <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-400"><Trash2 size={16} /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="p-6 bg-gray-900 border-t border-gray-800">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-gray-400">Total</span>
                        <span className="text-2xl font-bold text-white">${cartTotal.toFixed(2)}</span>
                    </div>
                    <button 
                        onClick={handleCheckout}
                        disabled={cart.length === 0}
                        className="w-full bg-gold text-dark font-bold py-4 rounded-xl hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* Orders History Drawer */}
      {isOrdersOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOrdersOpen(false)}></div>
            <div className="relative w-full max-w-md bg-dark-surface h-full border-l border-gray-800 shadow-2xl flex flex-col animate-slide-in-right">
                <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                    <h3 className="text-xl font-serif font-bold text-white flex items-center gap-2">
                        <History size={20} className="text-gold" /> Order History
                    </h3>
                    <button onClick={() => setIsOrdersOpen(false)} className="text-gray-400 hover:text-white"><X /></button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {orderHistory.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                            <Package size={48} className="opacity-20" />
                            <p>No past orders found.</p>
                        </div>
                    ) : (
                        orderHistory.map((order) => (
                            <div key={order.id} className="bg-black/20 rounded-xl border border-gray-800 overflow-hidden">
                                <div className="p-4 bg-gray-900/50 border-b border-gray-800 flex justify-between items-center">
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase font-bold">Order #{order.id}</p>
                                        <p className="text-xs text-gray-500">{order.date}</p>
                                    </div>
                                    <span className="px-2 py-1 bg-blue-900/30 text-blue-400 text-[10px] font-bold uppercase rounded border border-blue-900/50">
                                        {order.status}
                                    </span>
                                </div>
                                <div className="p-4 space-y-3">
                                    {order.items.map((item, idx) => (
                                        <div key={`${order.id}-item-${idx}`} className="flex justify-between items-start text-sm">
                                            <span className="text-gray-300 flex-1">{item.name} <span className="text-gray-600">x{item.quantity}</span></span>
                                            <span className="text-white font-medium ml-4">${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                    <div className="pt-3 mt-3 border-t border-gray-800 flex justify-between items-center">
                                        <span className="text-sm font-bold text-gray-400">Total</span>
                                        <span className="text-gold font-bold">${order.total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
      )}

      {/* Payment Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4 animate-fade-in">
            <div className="bg-white text-dark rounded-2xl w-full max-w-lg p-8 relative overflow-hidden">
                <button onClick={() => setIsCheckoutOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-dark"><X /></button>
                
                {paymentSuccess ? (
                    <div className="text-center py-10 space-y-4 animate-fade-in">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 mb-4">
                            <CheckCircle size={40} />
                        </div>
                        <h3 className="text-3xl font-serif font-bold">Payment Successful!</h3>
                        <p className="text-gray-600">Your order has been placed. You will receive a confirmation email shortly.</p>
                    </div>
                ) : (
                    <>
                        <h3 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2">
                            <CreditCard /> Secure Checkout
                        </h3>
                        
                        <div className="space-y-4 mb-8">
                            <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
                                <span className="font-bold text-gray-600">Order Total</span>
                                <span className="font-bold text-xl">${cartTotal.toFixed(2)}</span>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-gray-500">Card Number</label>
                                <div className="flex items-center border border-gray-300 rounded-lg px-3 bg-white">
                                    <CreditCard size={20} className="text-gray-400" />
                                    <input type="text" placeholder="0000 0000 0000 0000" className="w-full p-3 outline-none" />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-gray-500">Expiry</label>
                                    <input type="text" placeholder="MM/YY" className="w-full p-3 border border-gray-300 rounded-lg outline-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-gray-500">CVC</label>
                                    <input type="text" placeholder="123" className="w-full p-3 border border-gray-300 rounded-lg outline-none" />
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={processPayment}
                            disabled={isPaymentProcessing}
                            className="w-full bg-dark text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                        >
                            {isPaymentProcessing ? 'Processing...' : `Pay $${cartTotal.toFixed(2)}`}
                        </button>
                    </>
                )}
            </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;