import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { useProduct } from '../hooks/useProducts';
import { useCartStore } from '../store/cartStore';
import { Star, ArrowLeft, Plus, Minus, ShoppingCart, Truck, ShieldCheck } from 'lucide-react';
import { toast } from 'react-toastify';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'details' | 'reviews' | 'shipping'>('details');
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
      toast.success('Added to cart!');
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
              src={product.images?.[activeImageIndex] || product.thumbnail} 
              alt={product.title}
              className="w-full h-full object-contain transition-opacity duration-300"
            />
          </div>
          {product.images && product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((img, i) => (
                <div 
                  key={i} 
                  onClick={() => setActiveImageIndex(i)}
                  className={`w-20 h-20 flex-shrink-0 rounded-lg border bg-white dark:bg-slate-900 p-2 cursor-pointer transition-colors ${activeImageIndex === i ? 'border-primary border-2 shadow-sm' : 'border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                </div>
              ))}
            </div>
          )}
        </div>


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
              ({product?.reviews?.length || 0} reviews)
            </span>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <span className="text-sm font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-md">
              {product?.availabilityStatus || 'In Stock'}
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

      {/* Tabs Navigation */}
      <div className="mt-12 border-b border-slate-200 dark:border-slate-700">
        <div className="flex gap-8">
          <button 
            onClick={() => setActiveTab('details')}
            className={`pb-4 font-medium transition-colors border-b-2 ${activeTab === 'details' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
          >
            Details
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`pb-4 font-medium transition-colors border-b-2 ${activeTab === 'reviews' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
          >
            Reviews
          </button>
          <button 
            onClick={() => setActiveTab('shipping')}
            className={`pb-4 font-medium transition-colors border-b-2 ${activeTab === 'shipping' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
          >
            Shipping and Returns
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="pt-8">
        {activeTab === 'details' && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-10 shadow-sm border border-slate-100 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
              {product.sku && (
                <div className="flex justify-between border-b border-slate-100 dark:border-slate-700 pb-2">
                  <span className="text-slate-500 dark:text-slate-400">SKU</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">{product.sku}</span>
                </div>
              )}
              {product.weight && (
                <div className="flex justify-between border-b border-slate-100 dark:border-slate-700 pb-2">
                  <span className="text-slate-500 dark:text-slate-400">Weight</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">{product.weight}</span>
                </div>
              )}
              {product.dimensions && (
                <div className="flex justify-between border-b border-slate-100 dark:border-slate-700 pb-2">
                  <span className="text-slate-500 dark:text-slate-400">Dimensions</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">
                    {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth}
                  </span>
                </div>
              )}
              {product.minimumOrderQuantity && (
                <div className="flex justify-between border-b border-slate-100 dark:border-slate-700 pb-2">
                  <span className="text-slate-500 dark:text-slate-400">Minimum Order</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">{product.minimumOrderQuantity} units</span>
                </div>
              )}
              {product.tags && product.tags.length > 0 && (
                <div className="flex justify-between border-b border-slate-100 dark:border-slate-700 pb-2">
                  <span className="text-slate-500 dark:text-slate-400">Tags</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100 text-right">{product.tags.join(', ')}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-10 shadow-sm border border-slate-100 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Shipping & Returns</h2>
            <div className="space-y-6">
              {product.shippingInformation && (
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Shipping Information</h3>
                  <p className="text-slate-600 dark:text-slate-400">{product.shippingInformation}</p>
                </div>
              )}
              {product.returnPolicy && (
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Return Policy</h3>
                  <p className="text-slate-600 dark:text-slate-400">{product.returnPolicy}</p>
                </div>
              )}
              {product.warrantyInformation && (
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Warranty</h3>
                  <p className="text-slate-600 dark:text-slate-400">{product.warrantyInformation}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-10 shadow-sm border border-slate-100 dark:border-slate-700">
            {/* Reviews Header */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pb-10 border-b border-slate-200 dark:border-slate-700 mb-10">
              
              {/* Write Review Action */}
              <div className="flex flex-col justify-center">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Share your experience</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                  Your unique perspective, lessons, and moments of triumph can resonate deeply with others. Don't hesitate to contribute your story
                </p>
                <button 
                  onClick={() => toast.info('Review feature coming soon!')}
                  className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors self-start"
                >
                  Write a review
                </button>
              </div>

              {/* Average Rating */}
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-end gap-2 mb-3">
                  <span className="text-5xl font-bold text-slate-900 dark:text-white">{product.reviews?.length || 0}</span>
                  <span className="text-2xl text-slate-500 dark:text-slate-400 font-medium mb-1">Reviews</span>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={20} 
                      className={i < Math.round(product.rating) ? "fill-primary text-primary" : "fill-transparent text-slate-300 dark:text-slate-600"} 
                    />
                  ))}
                </div>
              </div>

              {/* Star Progress Bars */}
              <div className="flex flex-col justify-center space-y-2">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = product.reviews ? product.reviews.filter(r => Math.round(r.rating) === star).length : 0;
                  const total = product.reviews?.length || 1;
                  const percentage = product.reviews && product.reviews.length > 0 ? Math.round((count / total) * 100) : 0;
                  
                  return (
                    <div key={star} className="flex items-center gap-3">
                      <span className="w-4 text-sm font-medium text-slate-700 dark:text-slate-300">{star}</span>
                      <Star size={12} className="fill-primary text-primary" />
                      <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all duration-1000"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="w-10 text-right text-sm text-slate-500 dark:text-slate-400">{percentage}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Individual Reviews List */}
            <div className="space-y-8">
              {product.reviews?.map((review, idx) => (
                <div key={idx} className="pb-8 border-b border-slate-100 dark:border-slate-700 last:border-0 last:pb-0">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden flex-shrink-0">
                        <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${review.reviewerName}`} alt={review.reviewerName} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white">{review.reviewerName}</h4>
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          {new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={14} 
                            className={i < review.rating ? "fill-primary text-primary" : "fill-transparent text-slate-300 dark:text-slate-600"} 
                          />
                        ))}
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white ml-1">{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              ))}
              {(!product.reviews || product.reviews.length === 0) && (
                <div className="text-center py-10 text-slate-500">
                  No reviews yet. Be the first to share your experience!
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
