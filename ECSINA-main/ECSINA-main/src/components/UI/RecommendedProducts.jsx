"use client";

import { TbMathGreater } from "react-icons/tb";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useState, useRef, useEffect } from "react";
import Product from "./Product";

const RecommendedProducts = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const timer = useRef(null);
  const [products, setProducts] = useState([]);

  // گرفتن داده از بک‌اند
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://10.1.192.2:8000/api/proposals/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access") || ""}`,
          },
        });
        const json = await res.json();
        setProducts(json.results || []);
      } catch (err) {
        console.error("خطا در گرفتن محصولات:", err);
      }
    };
    fetchProducts();
  }, []);

  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1.5,
      spacing: 8,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: {
          perView: 3,
          spacing: 24,
        },
      },
      "(min-width: 1024px)": {
        slides: {
          perView: 4,
          spacing: 32,
        },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  // Autoplay
  useEffect(() => {
    if (!slider.current) return;

    timer.current = setInterval(() => {
      slider.current?.next();
    }, 3000);

    return () => clearInterval(timer.current);
  }, [slider]);

  // اگر محصولات هنوز نیومده
  if (!products.length) {
    return <p className="text-center mt-10">در حال بارگذاری محصولات...</p>;
  }

  return (
    <div className="container">
      <div className="relative mt-10 md:mt-24 border border-primary-7 rounded-2xl md:border-none bg-white md:bg-transparent p-5 pb-10 md:pb-0 md:p-0">
        <div>
          <p className="text-black font-bold text-base md:text-3xl">
            قالب‌های پیشنهادی
          </p>
        </div>

        {/* Slider */}
        <div ref={sliderRef} className="keen-slider mt-4 md:mt-6">
          {products.map((product) => (
            <div key={product.id} className="keen-slider__slide">
              <Product product={product} />
            </div>
          ))}
        </div>

        {/* Arrows */}
        {loaded && slider.current && (
          <>
            <button
              onClick={() => {
                slider.current.prev();
                clearInterval(timer.current);
              }}
              aria-label="قبلی"
              className="absolute top-5 md:top-0 left-5 bg-primary-7 shadow-invite-cart rounded-md p-1 cursor-pointer rotate-180"
            >
              <TbMathGreater className="w-4 h-4 md:w-6 md:h-6" stroke="#fff" />
            </button>
            <button
              onClick={() => {
                slider.current.next();
                clearInterval(timer.current);
              }}
              aria-label="بعدی"
              className="absolute top-5 md:top-0 left-15 md:left-15 bg-primary-7 shadow-invite-cart rounded-md p-1 cursor-pointer"
            >
              <TbMathGreater className="w-4 h-4 md:w-6 md:h-6" stroke="#fff" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default RecommendedProducts;
