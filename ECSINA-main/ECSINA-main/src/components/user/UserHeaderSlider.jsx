"use client";
import React, { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { menu } from "./userDb";
import { usePathname, useRouter } from "next/navigation";

const SliderHeader = () => {
  const [loaded, setLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    created() {
      setLoaded(true);
    },
    slides: {
      perView: 5,
      spacing: 10,
    },
  });
  useEffect(() => {
    
    menu.forEach((c, inx) => {
      if (c.link === pathname) {
        setActiveIndex(inx);
          instanceRef.current.update();
      }
      if (pathname.startsWith("/user/home")) {
        setActiveIndex(0);
          instanceRef.current.update();
      }
      if(pathname.startsWith("/user/my-documents")){
        setActiveIndex(1)
        instanceRef.current.update();
      }
    });
  }, [pathname]);
  return (
    <div className="w-[30%] mx-auto p-2 mt-[20px]">
      <div ref={sliderRef} className="keen-slider">
        {menu.map((image, idx) => (
          <div
            key={image.id}
            className={`
                            keen-slider__slide 
                            transition-all duration-300 
                            flex justify-center items-center cursor-pointer
                          
                        `}
            onClick={() => {
              setActiveIndex(idx);
              instanceRef.current?.moveToIdx(idx);
              router.push(image.link);
            }}
          >
            <div
              className={`
                               transition-colors duration-300
                                ${
                                  activeIndex === idx
                                    ? "text-primary-7"
                                    : "text-black"
                                }
                                ${
                                  pathname === image.link
                                    ? "text-primary-7"
                                    : "text-black"
                                }
                            `}
              dangerouslySetInnerHTML={{ __html: image.svg }}
            />
          </div>
        ))}
      </div>

      {loaded && instanceRef.current && (
        <div className="flex justify-center mt-6 flex-row-reverse w-full mx-auto gap-[15px]">
          {[...Array(menu.length).keys()].map((idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveIndex(idx);
                instanceRef.current?.moveToIdx(idx);
                router.push(menu[idx].link);
              }}
              className={`
                                w-3 h-3 rounded-full transition-all duration-300
                                ${
                                  activeIndex === idx
                                    ? "bg-black"
                                    : "bg-[#00000066] hover:bg-black"
                                }
                            `}
            />
          ))}
        </div>
      )}
    </div>
  );
};


export default SliderHeader;

