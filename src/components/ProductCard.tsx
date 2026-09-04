import { Plus, Minus, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { useCartStore } from '../store/cartStore';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem, removeItem, updateQuantity, items } = useCartStore();
  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem?.quantity || 0;
  const isAtMaxLimit = quantity >= 5;

  const handleIncrement = () => {
    if (quantity === 0) {
      addItem(product);
    } else if (!isAtMaxLimit) {
      updateQuantity(product.id, quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity === 1) {
      removeItem(product.id);
    } else if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    }
  };

 
  const originalPrice = product.price * 1.2;
  const discountPercent = Math.round(((originalPrice - product.price) / originalPrice) * 100);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden flex flex-col hover:shadow-md transition-shadow group p-3">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-white mb-3 rounded-lg">
          <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm z-10">
            {discountPercent}% OFF
          </span>
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      </Link>
      
      <div className="flex flex-col flex-grow">
        <Link to={`/product/${product.id}`} className="block group/title">
          <h3 className="text-sm font-medium text-slate-800 group-hover/title:text-primary transition-colors line-clamp-2 min-h-[40px] mb-1" title={product.title}>
            {product.title}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs text-slate-500">1 {product.category === 'groceries' ? 'kg' : 'pc'}</div>
          <div className="flex items-center gap-1">
            <Star size={12} className="fill-amber-400 text-amber-400" />
            <span className="text-xs font-medium text-slate-600">{product.rating.toFixed(1)}</span>
          </div>
        </div>
        
        <div className="mt-auto flex items-end justify-between">
          <div className="flex flex-col">
            <span className="font-bold text-lg text-slate-900 leading-none mb-1">
              ₹{(product.price * 80).toFixed(2)}
            </span>
            <span className="text-xs text-slate-400 line-through leading-none">
              ₹{(originalPrice * 80).toFixed(2)}
            </span>
          </div>
          
          <div>
            {quantity === 0 ? (
              <button
                onClick={handleIncrement}
                className="w-10 h-8 flex items-center justify-center bg-primary/10 text-primary hover:bg-primary hover:text-white border border-primary rounded-lg transition-colors ml-auto"
                aria-label="Add to cart"
              >
                <Plus size={18} strokeWidth={2.5} />
              </button>
            ) : (
              <div className="flex items-center justify-between bg-primary text-white rounded-lg p-1 w-[80px]">
                <button 
                  onClick={handleDecrement}
                  className="w-6 h-6 flex items-center justify-center hover:bg-white/20 rounded-md transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="font-semibold text-sm w-6 text-center">{quantity}</span>
                <button 
                  onClick={handleIncrement}
                  disabled={isAtMaxLimit}
                  className="w-6 h-6 flex items-center justify-center hover:bg-white/20 disabled:opacity-50 rounded-md transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
