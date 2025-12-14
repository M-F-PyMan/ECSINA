"use client";

import React from "react";
import UserHeader from "./UserHeader";
import { buttons, buttons1 } from "./userDb";
import ButtonUser from "./ButtonUser";
import ButtonsMobile from "./ButtonsMobile";
import { usePathname } from "next/navigation";

function UserLayoutComponent({ children }) {
  const pathname = usePathname();

  // تعیین مجموعه دکمه‌ها بر اساس مسیر فعلی (خواناتر از شرط تو در تو در JSX)
  const buttonsToShow = React.useMemo(() => {
    if (pathname?.startsWith("/user/my-documents")) return buttons1;
    if (pathname === "/user" || pathname?.startsWith("/user/home")) return buttons;
    return [];
  }, [pathname]);

  return (
    <div>
      <UserHeader />

      <div className="flex items-center justify-between mt-[20px] container mx-auto h-full">
        {buttonsToShow.map((b) => (
          <ButtonUser key={b.id} {...b} />
        ))}
      </div>

      <main>{children}</main>

      <div className="mt-[50px] md:hidden pb-[10px]">
        <ButtonsMobile />
      </div>
    </div>
  );
}

export default UserLayoutComponent;
