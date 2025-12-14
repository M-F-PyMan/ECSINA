"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { menu } from "./userDb";
import { usePathname, useRouter } from "next/navigation";

/**
 * SliderHeader
 * - Uses icons from userDb as React components
 * - Keeps active slide in sync with pathname
 * - Guards instanceRef usage and avoids calling update when instance is not ready
 * - Responsive perView fallback and safe navigation via router.push
 */

function SliderHeader() {
  const router = useRouter();
  const pathname = usePathname();

  const [loaded, setLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      initial: 0,
      slides: {
        perView: 5,
        spacing: 10,
      },
      created() {
        setLoaded(true);
      },
      breakpoints: {
        "(max-width: 640px)": {
          slides: { perView: 3, spacing: 8 },
        },
        "(min-width: 641px) and (max-width: 1024px)": {
          slides: { perView: 4, spacing: 10 },
        },
      },
    },
    []
  );

  const safeUpdate = useCallback(() => {
    if (instanceRef && instanceRef.current && typeof instanceRef.current.update === "function") {
      instanceRef.current.update();
    }
  }, [instanceRef]);

  useEffect(() => {
    let foundIndex = menu.findIndex((m) => m.link === pathname);

    if (foundIndex === -1) {
      if (pathname?.startsWith("/user/home")) foundIndex = 0;
      else if (pathname?.startsWith("/user/my-documents")) foundIndex = 1;
      else foundIndex = 0;
    }

    setActiveIndex(foundIndex);

    if (instanceRef && instanceRef.current && typeof instanceRef.current.moveToIdx === "function") {
      instanceRef.current.moveToIdx(foundIndex);
    } else {
      safeUpdate();
    }
  }, [pathname, instanceRef, safeUpdate]);

  return (
    <div className="w-[30%] mx-auto p-2 mt-[20px]">
      <div ref={sliderRef} className="keen-slider">
        {menu.map((item, idx) => {
          const Icon = item.Icon;
          const isActive = activeIndex === idx || pathname === item.link;
          return (
            <div
              key={item.id}
              className="keen-slider__slide transition-all duration-300 flex justify-center items-center cursor-pointer"
              onClick={() => {
                setActiveIndex(idx);
                if (instanceRef && instanceRef.current && typeof instanceRef.current.moveToIdx === "function") {
                  instanceRef.current.moveToIdx(idx);
                }
                try {
                  router.push(item.link);
                } catch {
                  if (typeof window !== "undefined") window.location.href = item.link;
                }
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setActiveIndex(idx);
                  instanceRef?.current?.moveToIdx(idx);
                  router.push(item.link);
                }
              }}
            >
              <div className={`transition-colors duration-300 ${isActive ? "text-primary-7" : "text-black"}`} aria-current={isActive ? "true" : "false"}>
                {Icon ? <Icon className="w-[32px] h-[32px]" /> : null}
              </div>
            </div>
          );
        })}
      </div>

      {loaded && instanceRef?.current && (
        <div className="flex justify-center mt-6 flex-row-reverse w-full mx-auto gap-[15px]">
          {Array.from({ length: menu.length }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveIndex(idx);
                instanceRef.current?.moveToIdx(idx);
                try {
                  router.push(menu[idx].link);
                } catch {
                  if (typeof window !== "undefined") window.location.href = menu[idx].link;
                }
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${activeIndex === idx ? "bg-black" : "bg-[#00000066] hover:bg-black"}`}
              aria-label={`slide-${idx}`}
              aria-pressed={activeIndex === idx}
              type="button"
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default SliderHeader;
