import { Outlet, Link, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import CartSidebar from './CartSidebar';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import { Home, ShoppingCart, RefreshCw, User, Search } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useThemeStore } from '../store/themeStore';

const Layout = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();
  const items = useCartStore((state) => state.items);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const isDark = useThemeStore((state) => state.isDark);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 pb-16 lg:pb-0 transition-colors duration-300">
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <main className="cmpad py-8 flex-grow w-full">
        <Outlet />
      </main>
      <Footer />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

 
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex justify-around items-center py-2 lg:hidden z-50 px-2 transition-colors duration-300">
        <Link to="/" className={`flex flex-col items-center p-2 ${location.pathname === '/' ? 'text-primary' : 'text-slate-500 dark:text-slate-400'}`}>
          <Home size={24} />
          <span className="text-[10px] mt-1 font-medium">Home</span>
        </Link>
        <Link to="/explore" className={`flex flex-col items-center p-2 ${location.pathname === '/explore' ? 'text-primary' : 'text-slate-500 dark:text-slate-400'}`}>
          <Search size={24} />
          <span className="text-[10px] mt-1 font-medium">Explore</span>
        </Link>
        <button onClick={() => setIsCartOpen(true)} className="flex flex-col items-center p-2 text-slate-500 dark:text-slate-400 relative">
          <ShoppingCart size={24} />
          {itemCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          )}
          <span className="text-[10px] mt-1 font-medium">Cart</span>
        </button>
        <button className="flex flex-col items-center p-2 text-slate-500 dark:text-slate-400">
          <RefreshCw size={24} />
          <span className="text-[10px] mt-1 font-medium">Re order</span>
        </button>
        <button className="flex flex-col items-center p-2 text-slate-500 dark:text-slate-400">
          <User size={24} />
          <span className="text-[10px] mt-1 font-medium">Account</span>
        </button>
      </div>
    </div>
  );
};

export default Layout;
