'use client'
import React from "react";
import MobileMenu from "./MobileMenu";
import Button from "./Button";
import Link from "next/link";
import Image from "next/image";

const navigationLinks = [
  { id: 1, title: "صفحه اصلی", href: "/" },
  {
    id: 2,
    title: "محصولات ما",
    href: "/products",
    subLink: [
      {
        title: "بوم کسب و کار",
        icon: "/assets/icons/Computer.svg",
        id: 1,
      },
      {
        title: "بیزنس مدل",
        icon: "/assets/icons/Status1.svg",
        id: 2,
      },
      {
        title: "بیزنس پلن",
        icon: "/assets/icons/Status2.svg",
        id: 3,
      },
      {
        title: "پروپوزال ها",
        icon: "/assets/icons/Document.svg",
        id: 4,
      },
      {
        title: "بوم ناب",
        icon: "/assets/icons/Status3.svg",
        id: 5,
      },
    ],
  },
  { id: 3, title: "درباره ی ما", href: "/about" },
  { id: 4, title: "تماس با ما", href: "/contact" },
];

const Navbar = () => {
  // for show links in dropdown
  const [openId, setOpenId] = React.useState(null)
  const handleToggle = (id) => {
    setOpenId(openId === id ? null : id)
  }
  return (
    <header id="header" className="container mt-4 md:mt-10">
      {/* Desktop */}
      <nav className="hidden md:flex justify-between items-center">
        <div className=" flex items-center gap-3 xl:gap-8">
          {/* Logo and text */}
          <Link href="/" className="flex items-center gap-2 ">
            <Image
              src={"/assets/icons/Logo.svg"}
              width={50}
              height={50}
              alt="Logo"
            />
            <span className="w-[1px]  h-16 bg-secondary-13"></span>
            <div className="text-black flex flex-col items-start gap-1">
              <span className="text-xl font-bold">اکسینا</span>
              <span className="text-xs font-[100]">
                همراهـــــــــــــیِ نوین
              </span>
              <span className="text-sm font-light">اسناد تجاری</span>
            </div>
          </Link>
          {/*  links*/}
          <ul className="flex items-center gap-2 lg:gap-8">
            {navigationLinks.map((link) => (
              <li key={link.id} className="relative group">
                {/* nav links */}
                <Link
                  className={` text-black text-nowrap  lg:text-2xl font-medium hover:text-primary-7 transition-all duration-100`}
                  href={link.href}
                >
                  {link.title}
                </Link>
                {/* dropdown links */}
                {link.subLink && (
                  <ul className="absolute text-xl top-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 hidden group-hover:block bg-white shadow-dropdown rounded-xl p-5 px-3 w-[550px] h-72 mt-2 z-50 transition-all duration-300 ">
                    <span className="w-[1px] bg-secondary-18 h-full absolute top-0 right-45"></span>
                    {link.subLink.map((item) => (
                      <li key={item.id} className="mb-2">
                        <button
                          className={`flex items-center gap-2 w-full text-left m-2 hover:text-primary-7 text-black transition-colors duration-200 ${openId === item.id ? "font-bold text-primary-7" : ""}`}
                          onClick={() => handleToggle(item.id)}
                        >
                          <Image
                            src={item.icon}
                            width={20}
                            height={20}
                            className="invert"
                          />
                          <span>{item.title}</span>
                        </button>
                        {openId === item.id && (
                          <div className="absolute top-10 left-60">
                            <Link
                              href='#'
                              className="text-primary-7"
                            >
                              {item.title}
                            </Link>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
        <Link href="/auth">
          <Button icon={"/assets/icons/Arrow.svg"}>ثبت نام</Button>
        </Link>
      </nav>
      {/* Mobile */}
      <div className="block md:hidden">
        <MobileMenu links={navigationLinks} />
      </div>
    </header>
  );
};

export default Navbar;
