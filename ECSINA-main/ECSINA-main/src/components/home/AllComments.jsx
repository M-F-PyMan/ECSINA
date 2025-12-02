"use client";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useState, useRef, useEffect } from "react";
import Commnet from "../UI/Commnet";
import Image from "next/image";

const AllComments = () => {
  const [comments, setComments] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const timer = useRef(null);

  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    slides: { perView: 2, spacing: 12 },
    breakpoints: {
      "(min-width: 1024px)": { slides: { perView: 4, spacing: 32 } },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  // گرفتن داده‌ها از API خانه
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://192.168.56.1:8000/api/home/");
        if (res.ok) {
          const data = await res.json();
          setComments(data.comments || []);
        }
      } catch (err) {
        console.error("خطا در گرفتن کامنت‌ها:", err);
      }
    };
    fetchData();
  }, []);

  // Autoplay
  useEffect(() => {
    if (!slider.current) return;
    timer.current = setInterval(() => {
      slider.current?.next();
    }, 3000);
    return () => clearInterval(timer.current);
  }, [slider]);

  return (
    <div className="container mt-16 md:mt-48">
      <p className="text-xl md:text-4xl font-bold flex items-center justify-center">
        نظرات همراهان ما
      </p>

      <div className="relative mt-10 md:mt-24">
        <div ref={sliderRef} className="keen-slider">
          {comments.map((comment) => (
            <div key={comment.id} className="keen-slider__slide">
              <Commnet commnet={comment} />
            </div>
          ))}
        </div>
        {/* Arrows + Pagination مثل قبل */}
      </div>
    </div>
  );
};

export default AllComments;
