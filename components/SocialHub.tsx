import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Instagram, Twitter, TrendingUp, Youtube } from 'lucide-react';
import { SocialPost } from '../types';

// Custom TikTok Icon
const TiktokIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const MOCK_POSTS: SocialPost[] = [
    {
        id: '1',
        user: 'ElenaDesign',
        avatar: 'https://i.pravatar.cc/150?u=elena',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop',
        caption: 'Just finished this summer piece using the new Measurement Tool! #AhnahTwist #SummerVibes',
        likes: 124,
        comments: 18,
        isLiked: true
    },
    {
        id: '2',
        user: 'FashionForward',
        avatar: 'https://i.pravatar.cc/150?u=fashion',
        image: 'https://images.unsplash.com/photo-1550614000-4b9519e02a48?q=80&w=1000&auto=format&fit=crop',
        caption: 'Cyberpunk aesthetics are taking over this season. What do you think of this palette?',
        likes: 89,
        comments: 42,
        isLiked: false
    },
    {
        id: '3',
        user: 'Studio_Marco',
        avatar: 'https://i.pravatar.cc/150?u=marco',
        image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1000&auto=format&fit=crop',
        caption: 'Velvet dreams. Generated the initial sketch in Design Studio and brought it to life.',
        likes: 256,
        comments: 31,
        isLiked: false
    }
];

const SocialHub: React.FC = () => {
    const [posts, setPosts] = useState<SocialPost[]>(MOCK_POSTS);

    const toggleLike = (id: string) => {
        setPosts(posts.map(post => {
            if (post.id === id) {
                return {
                    ...post,
                    likes: post.isLiked ? post.likes - 1 : post.likes + 1,
                    isLiked: !post.isLiked
                };
            }
            return post;
        }));
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-20">
             <header className="flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <h2 className="text-3xl font-serif font-bold text-white mb-2">Community Feed</h2>
                    <p className="text-gray-400">See what others are creating and share your own designs.</p>
                </div>
                <button className="bg-gold text-dark font-bold px-6 py-3 rounded-xl hover:bg-white transition-colors flex items-center gap-2">
                    <Share2 size={20} /> Share Your Work
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Feed */}
                <div className="lg:col-span-2 space-y-6">
                    {posts.map(post => (
                        <div key={post.id} className="bg-dark-surface border border-gray-800 rounded-2xl overflow-hidden hover:border-gold/30 transition-all">
                            <div className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img src={post.avatar} alt={post.user} className="w-10 h-10 rounded-full border border-gray-700" />
                                    <span className="font-bold text-white">{post.user}</span>
                                </div>
                                <button className="text-gray-400 hover:text-white">•••</button>
                            </div>
                            
                            <div className="relative aspect-[4/5] sm:aspect-video w-full">
                                <img src={post.image} alt="Post content" className="w-full h-full object-cover" />
                            </div>

                            <div className="p-4 space-y-3">
                                <div className="flex items-center gap-4">
                                    <button 
                                        onClick={() => toggleLike(post.id)}
                                        className={`flex items-center gap-1.5 ${post.isLiked ? 'text-red-500' : 'text-white hover:text-gray-300'}`}
                                    >
                                        <Heart size={24} fill={post.isLiked ? "currentColor" : "none"} />
                                    </button>
                                    <button className="text-white hover:text-gray-300">
                                        <MessageCircle size={24} />
                                    </button>
                                    <button className="text-white hover:text-gray-300 ml-auto">
                                        <Share2 size={24} />
                                    </button>
                                </div>
                                
                                <div className="font-bold text-sm">{post.likes} likes</div>
                                
                                <div className="text-sm">
                                    <span className="font-bold mr-2">{post.user}</span>
                                    <span className="text-gray-300">{post.caption}</span>
                                </div>
                                
                                <button className="text-gray-500 text-sm">View all {post.comments} comments</button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sidebar: Trending & Connect */}
                <div className="hidden lg:block space-y-6">
                    {/* Connect Socials */}
                    <div className="bg-dark-surface border border-gray-800 rounded-2xl p-6">
                        <h3 className="font-serif font-bold text-xl text-white mb-4">Connect</h3>
                        <div className="space-y-3">
                            <button className="w-full flex items-center gap-3 p-3 bg-gray-800 rounded-xl hover:bg-pink-600 transition-colors group">
                                <Instagram className="text-pink-400 group-hover:text-white" />
                                <span className="font-medium">Instagram</span>
                            </button>
                             <button className="w-full flex items-center gap-3 p-3 bg-gray-800 rounded-xl hover:bg-blue-500 transition-colors group">
                                <Twitter className="text-blue-400 group-hover:text-white" />
                                <span className="font-medium">Twitter</span>
                            </button>
                            <button className="w-full flex items-center gap-3 p-3 bg-gray-800 rounded-xl hover:bg-red-600 transition-colors group">
                                <Youtube className="text-red-500 group-hover:text-white" />
                                <span className="font-medium">YouTube</span>
                            </button>
                            <button className="w-full flex items-center gap-3 p-3 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors group">
                                <TiktokIcon size={24} className="text-white" />
                                <span className="font-medium">TikTok</span>
                            </button>
                        </div>
                    </div>

                    {/* Trending Hashtags */}
                    <div className="bg-dark-surface border border-gray-800 rounded-2xl p-6">
                        <div className="flex items-center gap-2 mb-4 text-gold">
                            <TrendingUp size={20} />
                            <h3 className="font-bold">Trending Now</h3>
                        </div>
                        <div className="space-y-4">
                            {[
                                { tag: '#DigitalFashionWeek', posts: '12.5k' },
                                { tag: '#AhnahTwist', posts: '8.2k' },
                                { tag: '#SustainableStyle', posts: '5.1k' },
                                { tag: '#AIDesign', posts: '3.4k' }
                            ].map((trend, i) => (
                                <div key={i} className="flex justify-between items-center cursor-pointer hover:bg-gray-800 p-2 rounded-lg -mx-2 transition-colors">
                                    <div>
                                        <div className="font-bold text-white">{trend.tag}</div>
                                        <div className="text-xs text-gray-500">{trend.posts} posts</div>
                                    </div>
                                    <div className="text-gray-600">→</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Ad/Promo */}
                    <div className="relative rounded-2xl overflow-hidden aspect-square group cursor-pointer">
                        <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                             <h4 className="font-serif font-bold text-xl mb-2 text-gold">Premium Training</h4>
                             <p className="text-sm mb-4">Unlock advanced draping techniques.</p>
                             <button className="bg-white text-dark px-4 py-2 rounded-full font-bold text-sm hover:bg-gold">Learn More</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SocialHub;