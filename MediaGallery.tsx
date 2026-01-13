
import React, { useState } from 'react';
import { Image as ImageIcon, Plus, Search, Filter, Camera, Trash2 } from 'lucide-react';
import { GalleryItem } from '../types';

interface MediaGalleryProps {
  gallery: GalleryItem[];
  setGallery: React.Dispatch<React.SetStateAction<GalleryItem[]>>;
}

const MediaGallery: React.FC<MediaGalleryProps> = ({ gallery, setGallery }) => {
  const [filter, setFilter] = useState('All');
  
  const categories = ['All', 'Events', 'Meetings', 'VIP', 'General'];

  const filteredItems = filter === 'All' ? gallery : gallery.filter(item => item.category === filter);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate upload
      const newItem: GalleryItem = {
        id: Math.random().toString(36).substr(2, 9),
        url: URL.createObjectURL(file), // Mock URL
        title: file.name.split('.')[0],
        category: 'General',
        date: new Date().toISOString().split('T')[0]
      };
      setGallery(prev => [newItem, ...prev]);
    }
  };

  const handleDelete = (id: string) => {
    setGallery(prev => prev.filter(i => i.id !== id));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all whitespace-nowrap ${
                filter === cat ? 'bg-white text-slate-950' : 'glass text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <label className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-2xl font-bold cursor-pointer transition-all shadow-lg shadow-blue-500/20">
          <Camera size={20} />
          <span>Capture Moment</span>
          <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
        </label>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredItems.map(item => (
          <div key={item.id} className="glass-card rounded-2xl overflow-hidden group aspect-square relative">
            <img src={item.url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <h5 className="text-white font-bold text-sm truncate">{item.title}</h5>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[10px] text-slate-400 font-medium">{item.date}</span>
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="text-rose-400 hover:text-rose-300 p-1"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="col-span-full py-20 flex flex-col items-center text-slate-500">
            <ImageIcon size={64} className="mb-4 opacity-10" />
            <p className="text-lg">No media assets found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaGallery;
