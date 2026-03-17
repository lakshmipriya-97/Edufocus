import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  Terminal, 
  Code, 
  School, 
  Cpu, 
  GitBranch, 
  Cloud, 
  Verified, 
  BrainCircuit,
  Play,
  Network,
  Database,
  Settings2,
  Globe,
  Calculator,
  Home,
  FlaskConical,
  GraduationCap,
  User,
  Eye,
  MoreVertical
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Video, Category } from './types';

const IconMap: Record<string, React.ElementType> = {
  Code,
  School,
  Cpu,
  GitBranch,
  Cloud,
  Network,
  Terminal,
  Database,
  Settings2,
  Globe,
  Calculator,
  GraduationCap
};

export default function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('programming');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(setCategories);
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (selectedCategory) params.append('category', selectedCategory);
    if (searchQuery) params.append('search', searchQuery);

    fetch(`/api/videos?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        setVideos(data);
        setLoading(false);
      });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            <div className="flex items-center gap-2 shrink-0">
              <div className="bg-primary text-white p-1.5 rounded-lg">
                <Terminal size={20} />
              </div>
              <div className="flex flex-col -gap-1">
                <h1 className="text-xl font-bold tracking-tight text-primary leading-none">EduHome</h1>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">B.Tech Edition</span>
              </div>
            </div>

            <div className="flex-1 max-w-2xl hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-primary/5 border-none rounded-xl py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400 outline-none"
                  placeholder="Search DSA, System Design, GATE materials..."
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 text-slate-600 dark:text-slate-400 hover:bg-primary/5 rounded-full md:hidden">
                <Search size={20} />
              </button>
              <button className="relative p-2 text-slate-600 dark:text-slate-400 hover:bg-primary/5 rounded-full">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-background-light"></span>
              </button>
              <div className="size-9 rounded-full bg-primary/20 border border-primary/20 overflow-hidden cursor-pointer">
                <img 
                  className="w-full h-full object-cover" 
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop" 
                  alt="User profile"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Categories */}
        <div className="flex overflow-x-auto gap-3 pb-4 no-scrollbar mb-6">
          {categories.map((cat) => {
            const Icon = IconMap[cat.icon] || Code;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  isActive 
                    ? 'bg-primary text-white' 
                    : 'bg-white dark:bg-slate-800 border border-primary/10 text-slate-600 dark:text-slate-300 hover:bg-primary/5'
                }`}
              >
                <Icon size={16} />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Banner */}
        <div className="bg-primary/5 rounded-xl p-4 mb-8 flex items-center justify-between border border-primary/10">
          <div className="flex items-center gap-3">
            <Verified className="text-primary" size={24} />
            <div>
              <p className="text-sm font-bold text-primary">Verified Academic Content</p>
              <p className="text-xs text-slate-500">Curated by Top IIT & NIT Faculty</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg shadow-sm">
            <BrainCircuit className="text-primary" size={16} />
            <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">AI-DRIVEN PATHS</span>
          </div>
        </div>

        {/* Video Grid */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              {selectedCategory === 'programming' ? 'Top in Programming' : 'GATE Exam Prep'}
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                selectedCategory === 'programming' ? 'bg-green-100 text-green-700' : 'bg-primary/10 text-primary'
              }`}>
                {selectedCategory === 'programming' ? 'Placement Focus' : 'CS & IT Core'}
              </span>
            </h2>
            <button className="text-primary text-sm font-semibold hover:underline">View All</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-video bg-slate-200 dark:bg-slate-700 rounded-xl mb-4"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
                  </div>
                ))
              ) : (
                videos.map((video) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={video.id}
                    className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group border border-primary/5"
                  >
                    <div className="relative aspect-video">
                      <img 
                        className="w-full h-full object-cover" 
                        src={video.thumbnail} 
                        alt={video.title}
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                        <div className="bg-primary text-white p-3 rounded-full shadow-lg">
                          <Play size={20} fill="currentColor" />
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex gap-3">
                        <div className="size-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          {React.createElement(IconMap[video.icon] || Code, { size: 20 })}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold leading-tight line-clamp-2 text-slate-900 dark:text-slate-100">
                            {video.title}
                          </h3>
                          <p className="text-slate-500 text-sm mt-1">{video.author}</p>
                          <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
                            <span className="flex items-center gap-1">
                              <Eye size={12} /> {video.views} views
                            </span>
                            <span>•</span>
                            <span>{video.postedAt}</span>
                          </div>
                        </div>
                        <button className="text-slate-400 hover:text-slate-600">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-t border-primary/10 px-4 pb-3 pt-2 md:pb-4 z-50">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <button className="flex flex-col items-center gap-1 text-primary">
            <Home size={24} fill="currentColor" />
            <span className="text-[10px] font-bold">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors">
            <Terminal size={24} />
            <span className="text-[10px] font-medium">Labs</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors">
            <FlaskConical size={24} />
            <span className="text-[10px] font-medium">Practicals</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors">
            <User size={24} />
            <span className="text-[10px] font-medium">Profile</span>
          </button>
        </div>
      </nav>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
