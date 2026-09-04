import { useParams, Link } from 'react-router-dom';
import { useProduct } from '../hooks/useProducts';
import { useCartStore } from '../store/cartStore';
import { Star, ArrowLeft, Plus, Minus, ShoppingCart, Truck, ShieldCheck } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, isError } = useProduct(id);
  const { addItem, updateQuantity, removeItem, items } = useCartStore();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Product not found</h2>
        <Link to="/explore" className="text-primary hover:underline mt-4 inline-block">Back to Explore</Link>
      </div>
    );
  }

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
    <div className="cmpad pb-12">
      <Link to="/explore" className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors mb-6">
        <ArrowLeft size={20} />
        <span className="font-medium">Back to products</span>
      </Link>

      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-10 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col md:flex-row gap-10 transition-colors duration-300">
        {/* Images */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="aspect-square rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 overflow-hidden relative p-8 flex items-center justify-center">
            <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-md z-10">
              {discountPercent}% OFF
            </span>
            <img 
              src={product.images?.[0] || product.thumbnail} 
              alt={product.title}
              className="w-full h-full object-contain"
            />
          </div>
          {product.images && product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((img, i) => (
                <div key={i} className="w-20 h-20 flex-shrink-0 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-2 cursor-pointer hover:border-primary dark:hover:border-primary">
                  <img src={img} alt="" className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="mb-2">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">{product.brand || product.category}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">{product.title}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/30 px-2 py-1 rounded-md">
              <Star size={16} className="fill-amber-400 text-amber-400" />
              <span className="text-sm font-bold text-amber-700 dark:text-amber-400">{product.rating.toFixed(1)}</span>
            </div>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              ({product.reviews?.length || 0} reviews)
            </span>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <span className="text-sm font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-md">
              {product.availabilityStatus || 'In Stock'}
            </span>
          </div>

          <div className="flex items-end gap-3 mb-6">
            <span className="text-4xl font-bold text-slate-900 dark:text-white">₹{(product.price * 80).toFixed(2)}</span>
            <span className="text-xl text-slate-400 dark:text-slate-500 line-through mb-1">₹{(originalPrice * 80).toFixed(2)}</span>
            <span className="text-sm text-slate-500 dark:text-slate-400 mb-2 ml-2">incl. of all taxes</span>
          </div>

          <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 mb-8 space-y-3 border border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
              <Truck size={20} className="text-slate-400 dark:text-slate-500" />
              <span className="text-sm">{product.shippingInformation || 'Standard Delivery'}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
              <ShieldCheck size={20} className="text-slate-400 dark:text-slate-500" />
              <span className="text-sm">{product.warrantyInformation || 'Quality Guaranteed'}</span>
            </div>
          </div>

          <div className="mt-auto">
            {quantity === 0 ? (
              <button
                onClick={handleIncrement}
                className="w-full md:w-auto px-12 py-4 bg-primary text-white hover:bg-primary-hover rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-sm shadow-primary/20"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
            ) : (
              <div className="flex items-center bg-primary text-white rounded-xl p-2 w-full md:w-48 shadow-sm shadow-primary/20">
                <button 
                  onClick={handleDecrement}
                  className="w-12 h-12 flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors"
                >
                  <Minus size={20} />
                </button>
                <span className="flex-1 font-bold text-xl text-center">{quantity}</span>
                <button 
                  onClick={handleIncrement}
                  disabled={isAtMaxLimit}
                  className="w-12 h-12 flex items-center justify-center hover:bg-white/20 disabled:opacity-50 rounded-lg transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>
            )}
            {isAtMaxLimit && (
              <p className="text-xs text-red-500 mt-2">Maximum limit of 5 reached for this item.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
