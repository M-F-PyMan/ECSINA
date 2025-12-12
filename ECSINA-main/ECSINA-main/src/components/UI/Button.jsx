"use client";
import Image from "next/image";

const Button = ({
  children,
  variant = "primary",
  type = "button",
  disabled = false,
  icon = null,
  iconAlt = "button icon",
  iconSize = 16,
  onClick,
  className = "",
  fullWidth = false,
  ...props
}) => {
  const baseStyles =
    "flex items-center justify-center relative gap-2 rounded-xl py-3 px-9 md:px-12 md:py-4 text-xs md:text-xl font-medium cursor-pointer transition-all duration-200 group";

  const variants = {
    primary: "bg-primary-7 text-white hover:bg-primary-8",
    outline: "border border-2 border-primary-7 bg-transparent",
    secondary: "bg-secondary-5 text-black hover:bg-secondary-6",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  const disabledStyles =
    "bg-secondary-16 text-gray-400 cursor-not-allowed pointer-events-none";

  const btnClass = [
    baseStyles,
    fullWidth ? "w-full" : "",
    disabled ? disabledStyles : variants[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={btnClass}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {icon && (
        <Image
          src={icon}
          alt={iconAlt}
          width={iconSize}
          height={iconSize}
          unoptimized
          className={`object-contain transition-transform duration-200 group-hover:rotate-45 ${
            variant === "outline" ? "invert" : ""
          }`}
        />
      )}
      <span>{children}</span>
    </button>
  );
};

export default Button;
