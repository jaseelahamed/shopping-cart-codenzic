import React from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';

interface FiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  maxPrice: number | "";
  setMaxPrice: (price: number | "") => void;
  categories: string[];
  clearFilters: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  maxPrice,
  setMaxPrice,
  categories,
  clearFilters,
  isOpen,
  onClose
}) => {
  return (
    <>
      {/* Mobile overlay background */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden transition-opacity" 
          onClick={onClose}
        />
      )}

      {/* Sidebar / Mobile Drawer */}
      <aside className={`
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0
        fixed md:sticky top-0 md:top-6 left-0 
        z-50 md:z-0
        w-4/5 max-w-sm md:w-64 h-full md:h-fit 
        overflow-y-auto md:overflow-visible
        bg-white dark:bg-slate-800 
        p-6 md:rounded-2xl shadow-xl md:shadow-sm 
        border-r md:border border-slate-100 dark:border-slate-700
        transition-transform duration-300 ease-in-out
        flex-shrink-0 space-y-6 self-start text-slate-900 dark:text-slate-100
      `}>
        <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={20} className="text-primary" />
            <h2 className="font-semibold text-lg">Filters</h2>
          </div>
          {onClose && (
            <button 
              onClick={onClose}
              className="md:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
            >
              <X size={20} className="text-slate-500" />
            </button>
          )}
        </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm transition-shadow placeholder-primary/60 dark:placeholder-primary/60"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm transition-shadow appearance-none"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Max Price: {maxPrice ? `$${maxPrice}` : 'Any'}
          </label>
          <input
            type="range"
            min="0"
            max="2000"
            step="50"
            value={maxPrice || 2000}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-primary"
          />
        </div>

        <button
          onClick={clearFilters}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 hover:text-slate-900 transition-colors text-sm font-medium"
        >
          <X size={16} />
          Clear Filters
        </button>
      </div>
    </aside>
    </>
  );
};

export default Filters;
