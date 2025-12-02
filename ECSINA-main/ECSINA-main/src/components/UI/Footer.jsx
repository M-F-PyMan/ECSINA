"use client";
import Link from "next/link";
import Image from "next/image";
import { SlSocialLinkedin } from "react-icons/sl";
import { FiYoutube } from "react-icons/fi";
import { BsInstagram } from "react-icons/bs";
import { RiWhatsappLine } from "react-icons/ri";
import { PiTelegramLogo } from "react-icons/pi";
import useCategories from "@/hooks/useCategories";

const icons = [
  { icon: <SlSocialLinkedin size={20} />, href: "/" },
  { icon: <BsInstagram size={20} />, href: "/" },
  { icon: <RiWhatsappLine size={20} />, href: "/" },
  { icon: <PiTelegramLogo size={20} />, href: "/" },
  { icon: <FiYoutube size={20} />, href: "/" },
];

const navigationLinks = [
  { id: 1, title: "صفحه اصلی", href: "/" },
  { id: 2, title: "محصولات", href: "/products" },
  { id: 3, title: " محصولات", href: "/about" },
  { id: 4, title: "تماس با ما", href: "/contact" },
];

const allCategories = [
  { id: 1, title: "بوم ناب", href: "/" },
  { id: 2, title: "بوم کسب و کار", href: "/" },
  { id: 3, title: "پروپوزال ها", href: "/" },
  { id: 4, title: "بیزینس پلن", href: "/" },
  { id: 5, title: "بیزینس مدل", href: "/" },
];

const Footer = () => {
  const { categories: data, error, isLoading } = useCategories();

  if (error) return <div>error...</div>;
  // const allCategories = data?.categories;
  return (
    <footer className="mt-auto relative">
      {/* Top */}
      <div className="pt-16 flex  justify-center md:justify-start md:gap-4  items-center pr-1 md:pr-16 pb-8">
        <div className="max-w-md flex flex-col items-start ">
          <Link href="/" className="flex items-center gap-2 mb-4 md:mb-10 ">
            <Image
              src={"/assets/icons/Logo.svg"}
              alt="Logo"
              width={50}
              height={50}
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
          <p className="text-[10px] md:text-sm leading-6 mx-8 md:mx-0 font-light md:font-medium text-secondary-18">
          اکسینا یک پلتفرم نوآورانه است که با هدف ساده‌سازی فرآیند تولید اسناد کسب‌ و کار طراحی شده است. ما در اکسینا تلاش کرده‌ایم بستری فراهم کنیم که کاربران حتی با کمترین  دانش تخصصی در این زمینه بتوانند اسناد مهمی مانند بیزینس پلن، بوم مدل کسب‌وکار، پروپوزال، بیزینس مدل، بوم ناب و... را به شکلی کاملاً حرفه‌ای تهیه و ارائه کنند.
          </p>
          {/* Icons */}
          <div className="flex items-center gap-2 mt-5 md:mt-8">
            {icons.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="flex items-center justify-center p-3 text-primary-7   hover:text-white hover:bg-primary-7 rounded-lg transition-all duration-300"
              >
                {item.icon}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row gap-6 items-start md:gap-10 -mt-22 md:mt-0">
          <div>
            <p className=" text-xs md:text-base font-medium text-secondary-18 mb-2 text-nowrap">
              دسترسی سریع
            </p>
            <ul className="flex flex-col items-start gap-2">
              {navigationLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className="text-[10px] md:text-sm text-secondary-18 font-medium transition-all duration-300 hover:text-primary-6"
                >
                  {link.title}
                </Link>
              ))}
            </ul>
          </div>
          <div>
            <p className=" text-xs md:text-base font-medium text-secondary-18 mb-2 text-nowrap">
              دسته بندی محصولات
            </p>
            <ul className="flex flex-col items-start gap-2">
              {allCategories.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="text-[10px] md:text-sm text-secondary-18 font-medium transition-all duration-300 hover:text-primary-6"
                >
                  {item.title}
                </Link>
              ))}
            </ul>
          </div>
        </div>
        {/* wing Image */}
        <div className="hidden lg:block absolute left-0 ">
          <Image src={'assets/icons/Wing2.svg'} alt="" width={150} height={150} />
        </div>
      </div>

      {/* Boottm */}
      <div className="bg-primary-7 rounded-t-sm md:rounded-t-2xl w-full flex items-center justify-center py-3 md:py-5">
        <p className="font-medium text-[10px] md:text-sm text-white">
          © تمامی حقوق مادی و معنوی برای شرکت اکسینا محفوظ است.{" "}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
