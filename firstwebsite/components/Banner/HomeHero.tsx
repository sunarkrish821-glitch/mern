'use client';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function HomeHero() {
  return (
    <section className="w-full">
      <Swiper
        modules={[Navigation, Autoplay]}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 3000 }}
        loop={true}
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="w-full h-[500px] bg-gradient-to-r from-teal-800 via-teal-600 to-emerald-500 flex items-center justify-between px-20">
            <div className="text-white max-w-lg">
              <p className="text-teal-200 text-sm font-semibold uppercase tracking-widest mb-3">
                New Arrivals 2025
              </p>
              <h1 className="text-6xl font-bold mb-6 leading-tight">
                Shop The <br/>
                <span className="text-yellow-300">Latest Trends</span>
              </h1>
              <p className="text-teal-100 text-lg mb-8">
                Discover thousands of premium products at unbeatable prices!
              </p>
              <div className="flex gap-4">
                <button className="bg-white text-teal-700 px-8 py-3 rounded-full font-bold hover:bg-yellow-300 hover:text-teal-900 transition">
                  Shop Now →
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-teal-700 transition">
                  View Deals
                </button>
              </div>
            </div>
            <div className="text-white text-center hidden lg:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <p className="text-7xl font-bold text-yellow-300">50%</p>
                <p className="text-2xl font-semibold mt-2">OFF</p>
                <p className="text-teal-200 mt-1">On Selected Items</p>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="w-full h-[500px] bg-gradient-to-r from-purple-800 via-purple-600 to-pink-500 flex items-center justify-between px-20">
            <div className="text-white max-w-lg">
              <p className="text-purple-200 text-sm font-semibold uppercase tracking-widest mb-3">
                Limited Time Offer
              </p>
              <h1 className="text-6xl font-bold mb-6 leading-tight">
                Premium <br/>
                <span className="text-yellow-300">Quality Products</span>
              </h1>
              <p className="text-purple-100 text-lg mb-8">
                Free delivery on orders above $50. Shop today!
              </p>
              <div className="flex gap-4">
                <button className="bg-white text-purple-700 px-8 py-3 rounded-full font-bold hover:bg-yellow-300 hover:text-purple-900 transition">
                  Explore Now →
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-purple-700 transition">
                  Learn More
                </button>
              </div>
            </div>
            <div className="text-white text-center hidden lg:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <p className="text-7xl font-bold text-yellow-300">FREE</p>
                <p className="text-2xl font-semibold mt-2">DELIVERY</p>
                <p className="text-purple-200 mt-1">Orders Above $50</p>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="w-full h-[500px] bg-gradient-to-r from-orange-700 via-orange-500 to-yellow-400 flex items-center justify-between px-20">
            <div className="text-white max-w-lg">
              <p className="text-orange-200 text-sm font-semibold uppercase tracking-widest mb-3">
                Flash Sale
              </p>
              <h1 className="text-6xl font-bold mb-6 leading-tight">
                Mega Sale <br/>
                <span className="text-white drop-shadow">Starts Today!</span>
              </h1>
              <p className="text-orange-100 text-lg mb-8">
                Hurry up! Limited stock available on top products.
              </p>
              <div className="flex gap-4">
                <button className="bg-white text-orange-700 px-8 py-3 rounded-full font-bold hover:bg-yellow-300 hover:text-orange-900 transition">
                  Grab Deal →
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-orange-700 transition">
                  View All
                </button>
              </div>
            </div>
            <div className="text-white text-center hidden lg:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <p className="text-7xl font-bold text-white">24H</p>
                <p className="text-2xl font-semibold mt-2">FLASH SALE</p>
                <p className="text-orange-200 mt-1">Don&apos;t Miss Out!</p>
              </div>
            </div>
          </div>
        </SwiperSlide>

      </Swiper>
    </section>
  );
}