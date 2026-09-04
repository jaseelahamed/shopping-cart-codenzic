import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col cmpad py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-12">
        <Link to="/" className="text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary-light transition-colors">
          Home
        </Link>
        <span className="text-slate-300 dark:text-slate-600">-</span>
        <span className="text-slate-400 dark:text-slate-500">404</span>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center relative max-w-2xl mx-auto w-full">
        
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center -z-10 opacity-60 dark:opacity-20">
          <div className="relative w-full h-full max-w-[400px] max-h-[300px]">
            {/* Triangle Top */}
            <svg className="absolute top-0 right-1/4 w-8 h-8 text-slate-200" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L22 20H2L12 2Z" />
            </svg>
            
            {/* Empty Triangle Top Right */}
            <svg className="absolute top-8 right-8 w-6 h-6 text-slate-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 2L22 20H2L12 2Z" />
            </svg>

            {/* Square Left */}
            <div className="absolute top-1/4 left-8 w-8 h-8 border-2 border-slate-200 rotate-12"></div>
            
            {/* Filled Shape Bottom Left */}
            <svg className="absolute bottom-1/4 left-0 w-12 h-12 text-slate-200 rotate-[-15deg]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2 22L22 12L2 2V22Z" />
            </svg>
            <div className="absolute bottom-1/4 left-6 w-8 h-8 bg-blue-100 rounded-full mix-blend-multiply opacity-50"></div>

            {/* Circle Bottom Right */}
            <div className="absolute bottom-1/4 right-8 w-10 h-10 border-2 border-slate-200 rounded-full"></div>
            <div className="absolute bottom-1/4 right-4 w-12 h-12 bg-blue-100 rounded-full mix-blend-multiply opacity-50"></div>

            {/* Diagonal Lines Top Right */}
            <div className="absolute top-1/4 right-0 w-16 h-16 opacity-50">
              <svg width="100%" height="100%" viewBox="0 0 40 40">
                <path d="M0 40L40 0M0 30L30 0M10 40L40 10M0 20L20 0M20 40L40 20" stroke="currentColor" strokeWidth="1" className="text-slate-300" />
              </svg>
            </div>
          </div>
        </div>

        {/* 404 Text */}
        <h1 className="text-[120px] leading-none md:text-[160px] font-bold text-[#051c42] dark:text-white tracking-tighter z-10 drop-shadow-sm">
          404
        </h1>
        
        <p className="text-2xl md:text-3xl font-semibold text-[#051c42] dark:text-slate-200 mt-4 mb-8 z-10 text-center">
          Sorry, Page not found
        </p>

        <Link 
          to="/" 
          className="px-8 py-3 bg-[#1e40af] hover:bg-[#1e3a8a] text-white font-medium rounded-md shadow-lg hover:shadow-xl transition-all z-10"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
