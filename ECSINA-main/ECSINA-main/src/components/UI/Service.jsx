"use client";

import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Link from "next/link";

function Service({ service }) {
  // اگر service موجود نیست، placeholder ساده نمایش بده
  if (!service || typeof service !== "object") {
    return (
      <div className="p-4 rounded-md bg-secondary-2 text-center">
        در حال بارگذاری...
      </div>
    );
  }

  const iconSrc = service?.icon || "/assets/icons/Default.svg";
  const title = service?.title || "بدون عنوان";
  const description = service?.description || "";

  return (
    <>
      {/* Desktop */}
      <div
        className="group hidden md:flex px-6 bg-secondary-2 py-4 flex-col items-start gap-5 border border-primary-7 rounded-4xl md:min-h-96 md:w-[220px] shadow-product-cart hover:shadow-hover hover:scale-101 transition-all duration-300"
        role="article"
        aria-label={title}
      >
        <div className="p-4 rounded-md relative max-w-[64px] flex items-center justify-center gradient-cart-icon">
          <Image
            width={64}
            height={64}
            src={iconSrc}
            alt={`Service icon for ${title}`}
            className="inline-flex"
            unoptimized
          />
        </div>

        <h6 className="text-2xl text-black font-bold">{title}</h6>

        <p className="invisible md:visible text-xl text-black font-normal">
          {description}
        </p>

        <Link
          href={`/services/${service?.id ?? ""}`}
          className="rounded-2xl p-4 mr-auto cursor-pointer gradient-cart-icon"
          aria-label={`مشاهده سرویس ${title}`}
        >
          <Image
            src={"/assets/icons/Arrow.svg"}
            width={13}
            height={13}
            alt="Go to service"
            className="group-hover:rotate-45 transition-all duration-300"
            unoptimized
          />
        </Link>
      </div>

      {/* Mobile */}
      <div
        className="p-3 md:hidden rounded-md flex flex-col gap-2 items-center justify-center min-w-24 min-h-20"
        style={{ backgroundImage: "var(--gradient-cart-icon)" }}
        role="article"
        aria-label={title}
      >
        <Image
          width={20}
          height={20}
          src={iconSrc}
          alt={`Service icon for ${title}`}
          unoptimized
        />
        <p className="text-white text-sm">{title}</p>
      </div>
    </>
  );
}

Service.propTypes = {
  service: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    icon: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
  }),
};

Service.defaultProps = {
  service: {},
};

export default Service;
