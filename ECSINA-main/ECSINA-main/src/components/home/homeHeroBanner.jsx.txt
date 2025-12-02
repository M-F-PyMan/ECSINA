import { TiChartLine } from "react-icons/ti";

import Button from "../UI/Button";

import Image from "next/image";

const stars = [
  {
    id: 1,
    icon: "/assets/icons/Star.svg",
    alt: "Star",
    moblieSize: 20,
    desktopSize: 30,
    className: "absolute -top-1/6 right-9/20  md:-top-5/12 md:right-1/8",
  },
  {
    id: 2,
    icon: "/assets/icons/Star.svg",
    alt: "Star",
    moblieSize: 20,
    desktopSize: 30,
    className: "absolute top-1/4 -right-1/6 md:top-1/8 md:-right-1/8",
  },
  {
    id: 3,
    icon: "/assets/icons/Star.svg",
    alt: "Star",
    moblieSize: 20,
    desktopSize: 30,
    className: "absolute top-1/4 -left-1/6  md:top-1/8 md:-left-1/8",
  },
  {
    id: 4,
    icon: "/assets/icons/Star.svg",
    alt: "Star",
    moblieSize: 20,
    desktopSize: 30,
    className: "absolute -bottom-1/24 left-1/6 md:bottom-1/12 md:left-1/4",
  },
  {
    id: 5,
    icon: "/assets/icons/Star.svg",
    alt: "Star",
    moblieSize: 20,
    desktopSize: 30,
    className: "absolute bottom-1/24 right-1/6 md:bottom-1/24 md:right-1/4",
  },
];

const Sticker = ({ children, className = "" }) => {
  return (
    <div
      className={` ${className} shadow-2xl px-4 py-2.5 rounded-[8px] items-center justify-center shadow-sticker`}
    >
      <span className="text-secondary-19 text-[10px] md:text-base font-semibold">
        {children}
      </span>
    </div>
  );
};
const HeroBanner = () => {
  return (
    <section className="container mt-5 md:mt-20">
      <div className="flex flex-col items-center gap-3 md:gap-6 z-100">
        <h2 className="text-lg  md:text-5xl text-black font-semibold text-center">
          با اکسینا، اسناد تجاری را مثل حرفه‌ای‌ها بساز!
        </h2>
        <h6 className="text-base md:text-3xl font-normal text-black  md:max-w-[60%] text-center">
          قالب‌های آماده، راهنمای کامل، همه‌چی اینجاست تا کارت سریع و بی‌دردسر
          پیش بره!
        </h6>
        <Button icon={"/assets/icons/Arrow.svg"}>رایگان دانلود کن</Button>
      </div>

      <div className=" relative flex justify-around  mt-8 md:mt-20 z-10">
        <Sticker className="rotate-15">قالب های آماده</Sticker>
        <Sticker className="rotate-6 ">رایگان!</Sticker>
        <Sticker>
          <TiChartLine className="h-5 w-5  md:w-9 md:h-9" />
        </Sticker>
        <Sticker className="-rotate-15">الهام بگیر و اجرا کن</Sticker>
      </div>

      <div className=" relative flex justify-center mt-10 z-10">
        {/* LOGO Desktop */}
        <div className="relative hidden md:block ">
          <div>
            <Image
              src={"/assets/icons/MainLogo.svg"}
              alt="Main Logo"
              width={600}
              height={550}
              className="z-20"
            />
          </div>
          {/* gradient-landing */}
          {stars.map((star) => (
            <Image
              key={star.id}
              src={star.icon}
              alt={star.alt}
              width={star.desktopSize}
              height={star.desktopSize}
              className={star.className}
            />
          ))}
        </div>
        {/* LOGO Mobile */}

        <div className="relative block md:hidden">
          <Image
            src={"/assets/icons/MainLogo.svg"}
            alt="Main Logo"
            width={250}
            height={200}
          />

          {stars.map((star) => (
            <Image
              key={star.id}
              src={star.icon}
              alt={star.alt}
              width={star.moblieSize}
              height={star.moblieSize}
              className={star.className}
            />
          ))}
        </div>
      </div>
      <div className="w-40 h-40 md:w-64 md:h-64 ">
        <Image
          src={"assets/icons/Gradient.svg"}
          alt=""
          fill
          className="absolute -top-1/6 left-1/4 -z-10"
        />
      </div>
      {/* wings */}
      <div className="-mt-40 px-10 flex items-center justify-between">
        <Image src={'assets/icons/Wing2.svg'} alt="" className="max-sm:hidden scale-x-[-1]" width={150} height={100}/>
        <Image src={'assets/icons/Wing2.svg'} alt="" className="max-sm:hidden " width={150} height={100}/> 
      </div>
    </section>
  );
};

export default HeroBanner;
