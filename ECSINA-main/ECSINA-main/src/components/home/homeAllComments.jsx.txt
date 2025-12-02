"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useState, useRef, useEffect } from "react";

import Commnet from "../UI/Commnet";
import Image from "next/image";

const allComents = [
  {
    id: 1,
    name: "امیررضا کاظمیان",
    role: "بنیانگذار استارتاپ فناوران",
    description: "فرم بیزینس پلنی که پر کرده بودم بعد از بازبینی خیلی کامل‌تر شد. توی جلسه ارائه واقعاً بهم کمک کرد. کاش زودتر با این سرویس آشنا می‌شدم.",
    rate: 4.8,
  },
  {
    id: 2,
    name: "امیررضا کاظمیان",
    role: "بنیانگذار استارتاپ فناوران",
    description: "فرم بیزینس پلنی که پر کرده بودم بعد از بازبینی خیلی کامل‌تر شد. توی جلسه ارائه واقعاً بهم کمک کرد. کاش زودتر با این سرویس آشنا می‌شدم.",
    rate: 4.8,
  },
  {
    id: 3,
    name: "امیررضا کاظمیان",
    role: "بنیانگذار استارتاپ فناوران",
    description: "فرم بیزینس پلنی که پر کرده بودم بعد از بازبینی خیلی کامل‌تر شد. توی جلسه ارائه واقعاً بهم کمک کرد. کاش زودتر با این سرویس آشنا می‌شدم.",
    rate: 4.8,
  },
  {
    id: 4,
    name: "امیررضا کاظمیان",
    role: "بنیانگذار استارتاپ فناوران",
    description: "فرم بیزینس پلنی که پر کرده بودم بعد از بازبینی خیلی کامل‌تر شد. توی جلسه ارائه واقعاً بهم کمک کرد. کاش زودتر با این سرویس آشنا می‌شدم.",
    rate: 4.8,
  },
  {
    id: 5,
    name: "امیررضا کاظمیان",
    role: "بنیانگذار استارتاپ فناوران",
    description: "فرم بیزینس پلنی که پر کرده بودم بعد از بازبینی خیلی کامل‌تر شد. توی جلسه ارائه واقعاً بهم کمک کرد. کاش زودتر با این سرویس آشنا می‌شدم.",
    rate: 4.8,
  },
  {
    id: 6,
    name: "امیررضا کاظمیان",
    role: "بنیانگذار استارتاپ فناوران",
    description: "فرم بیزینس پلنی که پر کرده بودم بعد از بازبینی خیلی کامل‌تر شد. توی جلسه ارائه واقعاً بهم کمک کرد. کاش زودتر با این سرویس آشنا می‌شدم.",
    rate: 4.8,
  },
  {
    id: 7,
    name: "امیررضا کاظمیان",
    role: "بنیانگذار استارتاپ فناوران",
    description: "فرم بیزینس پلنی که پر کرده بودم بعد از بازبینی خیلی کامل‌تر شد. توی جلسه ارائه واقعاً بهم کمک کرد. کاش زودتر با این سرویس آشنا می‌شدم.",
    rate: 4.8,
  },
  {
    id: 8,
    name: "امیررضا کاظمیان",
    role: "بنیانگذار استارتاپ فناوران",
    description: "فرم بیزینس پلنی که پر کرده بودم بعد از بازبینی خیلی کامل‌تر شد. توی جلسه ارائه واقعاً بهم کمک کرد. کاش زودتر با این سرویس آشنا می‌شدم.",
    rate: 4.8,
  },
  {
    id: 9,
    name: "امیررضا کاظمیان",
    role: "بنیانگذار استارتاپ فناوران",
    description: "فرم بیزینس پلنی که پر کرده بودم بعد از بازبینی خیلی کامل‌تر شد. توی جلسه ارائه واقعاً بهم کمک کرد. کاش زودتر با این سرویس آشنا می‌شدم.",
    rate: 4.8,
  },
  {
    id: 10,
    name: "امیررضا کاظمیان",
    role: "بنیانگذار استارتاپ فناوران",
    description: "فرم بیزینس پلنی که پر کرده بودم بعد از بازبینی خیلی کامل‌تر شد. توی جلسه ارائه واقعاً بهم کمک کرد. کاش زودتر با این سرویس آشنا می‌شدم.",
    rate: 4.8,
  },
];
const AllComments = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const timer = useRef(null);

  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    slides: {
      perView: 2,
      spacing: 12,
    },
    breakpoints: {
      "(min-width: 1024px)": {
        slides: { perView: 4, spacing: 32 },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  //  Autoplay
  useEffect(() => {
    if (!slider.current) return;

    timer.current = setInterval(() => {
      slider.current?.next();
    }, 3000);

    return () => clearInterval(timer.current);
  }, [slider]);

  return (
    <div className="container mt-16 md:mt-48">
      <p className=" text-xl md:text-4xl font-bold flex items-center justify-center">نظرات همراهان ما</p>

      <div className="relative mt-10 md:mt-24">
        {/* Slider */}
        <div ref={sliderRef} className="keen-slider">
          {allComents.map((comment) => (
            <div key={comment.id} className="keen-slider__slide">
              <Commnet commnet={comment} />
            </div>
          ))}
        </div>

        {/* Arrows */}
        {loaded && slider.current && (
          <>
            <button
              onClick={() => slider.current.prev()}
              className="absolute hidden md:block -left-2 md:-left-5 top-2/5 -translate-y-1/2 border border-primary-7 rounded-md px-2 py-1 cursor-pointer rotate-180"
            >
              <Image src={"assets/icons/NextArrow.svg"} alt="" width={10} height={10} />
            </button>
            <button
              onClick={() => slider.current.next()}
              className="absolute hidden md:block -right22 md:-right-5 top-2/5 -translate-y-1/2 border border-primary-7 rounded-md px-2 py-1 cursor-pointer"
            >
              <Image src={"assets/icons/NextArrow.svg"} alt="" width={10} height={10} />
            </button>
          </>
        )}

        {/* Pagination */}
        {loaded && slider.current && (
          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={() => slider.current.next()} className="cursor-pointer">
              <Image src={"assets/icons/NextArrow.svg"} alt="Prev" width={10} height={10} />
            </button>

            <ul className="flex items-center gap-2">
              {[...Array(slider.current.track.details.slides.length).keys()].map((idx) => (
                <li key={Math.floor(Math.round() * 1000)}>
                  <button
                    onClick={() => slider.current.moveToIdx(idx)}
                    className={` w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full transition-all ${currentSlide === idx ? "bg-primary-15" : "bg-gray-300"}`}
                  />
                </li>
              ))}
            </ul>
            <button onClick={() => slider.current.prev()} className=" cursor-pointer rotate-180">
              <Image src={"/assets/icons/NextArrow.svg"} alt="Next" width={10} height={10} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllComments;
