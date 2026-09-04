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
}

const Filters: React.FC<FiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  maxPrice,
  setMaxPrice,
  categories,
  clearFilters
}) => {
  return (
    <aside className="w-full md:w-64 flex-shrink-0 space-y-6 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 h-fit sticky top-6 self-start text-slate-900 dark:text-slate-100">
      <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
        <SlidersHorizontal size={20} className="text-primary" />
        <h2 className="font-semibold text-lg">Filters</h2>
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
  );
};

export default Filters;
