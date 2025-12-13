"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const ScrollTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    document.getElementById("header")?.scrollIntoView({ behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 w-10 h-10 md:w-15 md:h-15 rounded-xl shadow-icon gradient-stroke2 cursor-pointer hover:scale-105 transition-transform duration-300 z-50"
    >
      <Image
        src={"/assets/icons/ArrowRight.svg"}
        alt="Scroll to top"
        fill
        className="-rotate-45"
      />
    </button>
  );
};

export default ScrollTopButton;
