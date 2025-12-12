'use client'
import React from "react";
import useSWR from "swr";
import MobileMenu from "./MobileMenu";
import Button from "./Button";
import Link from "next/link";
import Image from "next/image";

const fetcher = (url) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access") || ""}`,
    },
  }).then((res) => res.json());

const Navbar = () => {
  const [openId, setOpenId] = React.useState(null);
  const handleToggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  // گرفتن دسته‌بندی‌ها از بک‌اند
  const { data: categories, error, isLoading } = useSWR(
    "http://10.1.192.2:8000/api/categories/",
    fetcher
  );

  const navigationLinks = [
    { id: 1, title: "صفحه اصلی", href: "/" },
    {
      id: 2,
      title: "محصولات ما",
      href: "/products",
      subLink: categories?.results?.map((cat) => ({
        id: cat.id,
        title: cat.title,
        icon: cat.icon || "/assets/icons/Default.svg",
        href: `/categories/${cat.id}`,
      })),
    },
    { id: 3, title: "درباره ی ما", href: "/about" },
    { id: 4, title: "تماس با ما", href: "/contact" },
  ];

  return (
    <header id="header" className="container mt-4 md:mt-10">
      {/* Desktop */}
      <nav className="hidden md:flex justify-between items-center">
        <div className="flex items-center gap-3 xl:gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={"/assets/icons/Logo.svg"}
              width={50}
              height={50}
              alt="Logo"
            />
            <span className="w-[1px] h-16 bg-secondary-13"></span>
            <div className="text-black flex flex-col items-start gap-1">
              <span className="text-xl font-bold">اکسینا</span>
              <span className="text-xs font-[100]">همراهـــــــــــــیِ نوین</span>
              <span className="text-sm font-light">اسناد تجاری</span>
            </div>
          </Link>

          {/* Links */}
          <ul className="flex items-center gap-2 lg:gap-8">
            {navigationLinks.map((link) => (
              <li key={link.id} className="relative group">
                <Link
                  className="text-black text-nowrap lg:text-2xl font-medium hover:text-primary-7 transition-all duration-100"
                  href={link.href}
                >
                  {link.title}
                </Link>

                {/* Dropdown */}
                {link.subLink && (
                  <ul className="absolute text-xl top-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 hidden group-hover:block bg-white shadow-dropdown rounded-xl p-5 px-3 w-[550px] h-72 mt-2 z-50 transition-all duration-300">
                    <span className="w-[1px] bg-secondary-18 h-full absolute top-0 right-45"></span>
                    {link.subLink.map((item) => (
                      <li key={item.id} className="mb-2">
                        <Link
                          href={item.href}
                          className={`flex items-center gap-2 w-full text-left m-2 hover:text-primary-7 text-black transition-colors duration-200 ${
                            openId === item.id ? "font-bold text-primary-7" : ""
                          }`}
                          onClick={() => handleToggle(item.id)}
                        >
                          <Image
                            src={item.icon}
                            width={20}
                            height={20}
                            alt={item.title}
                          />
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Register button */}
        <Link href="/auth/register">
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
