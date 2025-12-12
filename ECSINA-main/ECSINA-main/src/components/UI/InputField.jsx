"use client";
import React from "react";

function InputField({
  title,
  value,
  id,
  className,
  type = "text",
  boxClassName,
  required = false,
  onChange,
}) {
  return (
    <div className={`relative ${boxClassName}`}>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full block px-6 pt-6 pb-2 rounded-md text-base bg-primary-0 text-primary-14 appearance-none focus:outline-none focus:ring-0 peer ${className}`}
        placeholder=" "
      />
      <label
        htmlFor={id}
        className="absolute text-sm text-main-1 duration-150 transform -translate-y-3
          scale-75 top-4 z-10 origin-[0] right-6
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-3"
      >
        {required && <span className="text-main-4 px-1 mt-2 text-sm">*</span>}
        {title}
      </label>
    </div>
  );
}

export default InputField;
