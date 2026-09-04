import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Home = () => {
  const { data, isLoading } = useProducts();
  const products = data?.products || [];

  return (
    <div className="space-y-12">

      <section>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="rounded-2xl overflow-hidden shadow-sm"
        >
          <SwiperSlide>
            <img src="/ChatGPT-Image-May-16,-2026,-06_58_01-PM-1-1778938394329-319886229.png" alt="Banner 1" className="w-full h-auto object-cover aspect-[3/1] md:aspect-[4/1]" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/Frame-1437259593-1778934627047-834570883.png" alt="Banner 2" className="w-full h-auto object-cover aspect-[3/1] md:aspect-[4/1]" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/mob-banner-1778934821528-869995146.png" alt="Banner 3" className="w-full h-auto object-cover aspect-[3/1] md:aspect-[4/1]" />
          </SwiperSlide>
        </Swiper>
      </section>


      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Featured Products</h2>
          <Link to="/explore" className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-hover transition-colors">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pb-12">
            {[...Array(10)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <Swiper
              modules={[Autoplay, Navigation]}
              spaceBetween={16}
              slidesPerView={2}
              loop={true}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              navigation={true}
              style={{ '--swiper-navigation-size': '20px', '--swiper-theme-color': '#16a34a' } as React.CSSProperties}
              breakpoints={{
                640: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
                1280: { slidesPerView: 5 }
              }}
              className="featured-swiper px-2"
            >
              {products.slice(0, 10).map((product) => (
                <SwiperSlide key={product.id} className="h-auto">
                  <div className="h-full pt-1 pb-1">
                    <ProductCard product={product} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <Swiper
              modules={[Autoplay, Navigation]}
              spaceBetween={16}
              slidesPerView={2}
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              navigation={true}
              style={{ '--swiper-navigation-size': '20px', '--swiper-theme-color': '#16a34a' } as React.CSSProperties}
              breakpoints={{
                640: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
                1280: { slidesPerView: 5 }
              }}
              className="featured-swiper px-2"
            >
              {products.slice(10, 20).map((product) => (
                <SwiperSlide key={product.id} className="h-auto">
                  <div className="h-full pt-1 pb-1">
                    <ProductCard product={product} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
