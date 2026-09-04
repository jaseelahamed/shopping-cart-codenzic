import { useState, useRef, useEffect } from 'react';
import { ShoppingCart, Search, MapPin, Heart, User, Menu, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useThemeStore } from '../store/themeStore';
import { useDebounce } from '../hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';
import type { ProductListResponse } from '../types';

interface NavbarProps {
  onCartClick: () => void;
}

const Navbar = ({ onCartClick }: NavbarProps) => {
  const items = useCartStore((state) => state.items);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const { isDark, toggleTheme } = useThemeStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const debouncedSearch = useDebounce(searchTerm, 300);
  const searchRef = useRef<HTMLDivElement>(null);

  const { data: searchResults, isLoading: isSearchLoading } = useQuery({
    queryKey: ['searchProducts', debouncedSearch],
    queryFn: async () => {
      if (!debouncedSearch.trim()) return { products: [] } as unknown as ProductListResponse;
      const res = await fetch(`https://dummyjson.com/products/search?q=${debouncedSearch}&limit=6`);
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json() as Promise<ProductListResponse>;
    },
    enabled: debouncedSearch.trim().length > 0,
  });

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
 
      <header className="bg-primary dark:bg-slate-950 text-white shadow-md sticky top-0 z-40 hidden lg:block transition-all duration-300">
        <div className={`cmpad flex items-center justify-between gap-6 transition-all duration-300 ${isScrolled ? 'h-16' : 'h-20'}`}>
      
          <Link to="/" className="flex-shrink-0 flex items-center h-full py-2">
            <img src="/logo-light.svg" alt="Tirur Hypermarket" className="h-full max-h-14 w-auto rounded object-contain" />
          </Link>
          
     
          <div className="flex-1 max-w-2xl flex items-center bg-white dark:bg-slate-800 rounded-lg h-11 relative" ref={searchRef}>
            <Link to="/explore" className="px-4 border-r border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-700 flex items-center h-full text-sm font-medium cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors rounded-l-lg">
              All Categories
            </Link>
            <input 
              type="text" 
              placeholder="Search Products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              className="flex-1 px-4 py-2 text-slate-900 dark:text-slate-100 focus:outline-none bg-transparent placeholder-primary/60 dark:placeholder-primary/60"
            />
            <button className="px-4 text-slate-400 hover:text-primary dark:hover:text-primary transition-colors">
              <Search size={20} />
            </button>

          
            {isSearchFocused && debouncedSearch.trim() && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50 p-4">
                <h3 className="text-slate-500 dark:text-slate-400 font-semibold mb-3 px-1 text-sm">Popular Searches</h3>
                {isSearchLoading ? (
                  <div className="p-4 text-center text-slate-500 dark:text-slate-400 text-sm">Loading...</div>
                ) : searchResults?.products && searchResults.products.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {searchResults.products.map((product) => (
                      <Link 
                        key={product.id} 
                        to={`/product/${product.id}`}
                        onClick={() => {
                          setIsSearchFocused(false);
                          setSearchTerm('');
                        }}
                        className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 dark:border-slate-700 hover:border-primary/30 dark:hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group"
                      >
                        <div className="w-12 h-12 bg-white  rounded flex items-center justify-center overflow-hidden flex-shrink-0">
                          <img src={product.thumbnail} alt={product.title} className="w-full h-full  bg-white  dark:bg-slate-800 object-contain mix-blend-multiply" />
                        </div>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200 group-hover:text-primary dark:group-hover:text-primary-light line-clamp-2">{product.title}</span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-slate-500 dark:text-slate-400 text-sm">No products found for "{debouncedSearch}"</div>
                )}
              </div>
            )}
          </div>

          
          <div className="flex items-center gap-6 flex-shrink-0">
    
            <div className="flex items-center gap-2 text-sm cursor-pointer hover:text-green-100 transition-colors">
              <MapPin size={18} />
              <div className="flex flex-col">
                <span className="text-xs text-green-100">Branch</span>
                <span className="font-medium">Tirur</span>
              </div>
            </div>


            <div className="flex items-center gap-5">
              <button onClick={toggleTheme} className="flex flex-col items-center gap-1 hover:text-green-100 transition-colors" title="Toggle Dark Mode">
                {isDark ? <Sun size={22} /> : <Moon size={22} />}
              </button>
              
              <button className="flex flex-col items-center gap-1 hover:text-green-100 transition-colors">
                <Heart size={22} />
              </button>
              
              <button 
                onClick={onCartClick}
                className="relative flex flex-col items-center gap-1 hover:text-green-100 transition-colors"
              >
                <div className="relative">
                  <ShoppingCart size={22} />
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 bg-white text-primary text-xs font-bold rounded-full">
                      {itemCount}
                    </span>
                  )}
                </div>
              </button>

              <button className="flex items-center gap-2 hover:text-green-100 transition-colors">
                <User size={22} />
                <span className="font-medium">Login</span>
              </button>
            </div>
          </div>
        </div>
      </header>

     
      <header className="bg-primary dark:bg-slate-950 text-white shadow-md sticky top-0 z-40 lg:hidden transition-all duration-300">
        <div className={`cmpad flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-12' : 'h-16'}`}>
          <div className="flex items-center gap-3">
            <button className="p-1 hover:bg-primary-hover rounded-md transition-colors">
              <Menu size={24} />
            </button>
            <Link to="/" className="flex items-center h-10">
              <img src="/logo-light.svg" alt="Tirur Hypermarket" className="h-full w-auto rounded object-contain" />
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-1">
              {isDark ? <Sun size={22} /> : <Moon size={22} />}
            </button>
            <button className="p-1">
              <Search size={22} />
            </button>
            <button onClick={onCartClick} className="relative p-1">
              <ShoppingCart size={22} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 bg-white text-primary text-[10px] font-bold rounded-full">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
