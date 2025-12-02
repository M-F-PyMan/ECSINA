"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

// دیکشنری فارسی مسیرها
const translationMap = {
  products: "محصولات",
  "biz-model": "بوم کسب و کار",
  canvas1: "اسم قالب", // فقط برای مثال
  // سایر مسیرها...
};

const Breadcrumb = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  let path = "";

  return (
    <div className="container">
      <div className="bg-primary-0 rounded-[10px] p-2 md:px-4 md:py-8">
        <div className="text-primary-16 text-xs font-normal md:text-base flex flex-wrap items-center">
          <Link href="/" className="hover:underline">
            خانه
          </Link>
          {pathSegments.map((segment, index) => {
            path += `/${segment}`;
            const isLast = index === pathSegments.length - 1;

            const translated =
              translationMap[segment] ||
              decodeURIComponent(segment.replace(/-/g, " "));

            return (
              <Fragment key={path}>
                <span className="px-1">/</span>
                {isLast ? (
                  <span className="text-primary-20 font-normal">
                    {translated}
                  </span>
                ) : (
                  <Link href={path} className="hover:underline text-primary-16">
                    {translated}
                  </Link>
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
