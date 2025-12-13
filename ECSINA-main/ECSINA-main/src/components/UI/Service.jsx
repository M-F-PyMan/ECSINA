"use client";
import Image from "next/image";
import Link from "next/link";

const Service = ({ service }) => {
  return (
    <>
      {/* Desktop */}
      <div className="group hidden md:flex px-6 bg-secondary-2 py-4 flex-col items-start gap-5 border border-primary-7 rounded-4xl md:min-h-96 md:w-[220px] shadow-product-cart hover:shadow-hover hover:scale-101 transition-all duration-300">
        <div className="p-4 rounded-md relative max-w-[64px] flex items-center justify-center gradient-cart-icon">
          <Image
            width={64}
            height={64}
            src={service.icon || "/assets/icons/Default.svg"}
            alt={`Service icon for ${service.title}`}
            className="inline-flex"
          />
        </div>
        <h6 className="text-2xl text-black font-bold">{service.title}</h6>
        <p className="invisible md:visible text-xl text-black font-normal">
          {service.description}
        </p>

        <Link
          href={`/services/${service.id}`}
          className="rounded-2xl p-4 mr-auto cursor-pointer gradient-cart-icon"
        >
          <Image
            src={"/assets/icons/Arrow.svg"}
            width={13}
            height={13}
            alt="Go to service"
            className="group-hover:rotate-45 transition-all duration-300"
          />
        </Link>
      </div>

      {/* Mobile */}
      <div
        className="p-3 md:hidden rounded-md flex flex-col gap-2 items-center justify-center min-w-24 min-h-20"
        style={{ backgroundImage: "var(--gradient-cart-icon)" }}
      >
        <Image
          width={20}
          height={20}
          src={service.icon || "/assets/icons/Default.svg"}
          alt={`Service icon for ${service.title}`}
        />
        <p className="text-white text-sm">{service.title}</p>
      </div>
    </>
  );
};

export default Service;
