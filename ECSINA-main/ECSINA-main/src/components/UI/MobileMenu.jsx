"use client";
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import { useState } from "react";

const MobileMenu = ({ links }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={openMenu} aria-label="Open menu" className="cursor-pointer">
            <GiHamburgerMenu size={33} />
          </button>

          <Link href="/auth/register">
            <Button icon={"/assets/icons/Arrow.svg"}>ثبت نام</Button>
          </Link>
        </div>

        <Link href="/">
          <Image width={44} height={44} src={"/assets/icons/Logo.svg"} alt="Logo" />
        </Link>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-[3px] z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeMenu}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 gradient-nav-background shadow-nav-sidebar z-50 transform transition-transform duration-300 rounded-bl-[50px] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          {/* Close Icon */}
          <button onClick={closeMenu} aria-label="Close menu" className="cursor-pointer mt-8 mr-[75%]">
            <AiOutlineClose size={25} className="text-white" />
          </button>

          {/* Menu Links */}
          <ul className="p-6 flex flex-col items-start gap-6">
            {links.map((link) => (
              <li key={link.id} className="text-white text-sm font-semibold">
                <Link href={link.href} onClick={closeMenu}>
                  {link.title}
                </Link>
                {link.subLink && (
                  <ul className="flex flex-col py-2 pl-4">
                    {link.subLink.map((item) => (
                      <li key={item.id} className="py-1">
                        <Link href={item.href} onClick={closeMenu} className="text-white text-xs hover:text-primary-6">
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
