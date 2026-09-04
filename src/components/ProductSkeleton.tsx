const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col p-3 h-[320px] animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-square bg-slate-200 rounded-lg mb-3"></div>
      
      {/* Content Skeleton */}
      <div className="flex flex-col flex-grow">
        {/* Title */}
        <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-slate-200 rounded w-2/3 mb-3"></div>
        
        {/* Unit & Rating */}
        <div className="flex justify-between mb-2">
          <div className="h-3 bg-slate-200 rounded w-8"></div>
          <div className="h-3 bg-slate-200 rounded w-12"></div>
        </div>
        
        {/* Price & Button */}
        <div className="mt-auto flex items-end justify-between">
          <div className="flex flex-col gap-1 w-1/2">
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            <div className="h-3 bg-slate-200 rounded w-1/2"></div>
          </div>
          <div className="h-8 w-10 bg-slate-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
