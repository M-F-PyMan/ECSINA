"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../UI/Button";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";

function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [selectedValues, setSelectedValues] = useState({});

  const inputesField = [
    { name: "نام و نام خانوادگی", type: "text", title: "FullName" },
    { name: "شماره تماس", type: "text", title: "PhoneNo", required: true },
    { name: "ایمیل", type: "text", title: "Email", required: true },
    { name: "رمز عبور", type: "password", title: "Password1", required: true },
    { name: "تکرار رمز عبور", type: "password", title: "Password2", required: true },
  ];

  const selectBoxFields = [
    {
      name: "نوع کسب کار",
      title: "Jobs",
      options: [
        { id: 1, name: "خدماتی" },
        { id: 2, name: "تولیدی" },
        { id: 3, name: "اینترنتی" },
        { id: 4, name: "خانگی" },
      ],
    },
    {
      name: "سمت شغلی",
      title: "Positions",
      options: [
        { id: 1, name: "مدیر تولید" },
        { id: 2, name: "مدیر عامل" },
        { id: 3, name: "مدیر فنی" },
        { id: 4, name: "کارشناس IT" },
      ],
    },
    {
      name: "حوزه فعالیت",
      title: "Field",
      options: [
        { id: 1, name: "فروش پوشاک" },
        { id: 2, name: "تولید و خدمات" },
        { id: 3, name: "عمده فروشی" },
        { id: 4, name: "سایر" },
      ],
    },
    {
      name: "چطور با ما آشنا شدید؟",
      title: "Meet",
      options: [
        { id: 1, name: "پیج اینیستاگرام" },
        { id: 2, name: "تبلیغات اینترنتی" },
        { id: 3, name: "آشنایان و دوستان" },
        { id: 4, name: "سایر" },
      ],
    },
  ];

  const onSubmit = async (data) => {
  if (data.Password1 !== data.Password2) {
    alert("❌ رمز عبور و تکرار آن یکسان نیستند");
    return;
  }

  try {
    const payload = {
      name: data.FullName,
      mobile: data.PhoneNo,
      email: data.Email,
      password: data.Password1,
      user_job: selectedValues["Jobs"]?.name || "",
      position: selectedValues["Positions"]?.name || "",
      field: selectedValues["Field"]?.name || "",
      meet: selectedValues["Meet"]?.name || "",
    };

    const response = await fetch("http://192.168.56.1:8000/api/v1/accounts/auth/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("پاسخ ناموفق:", response.status, errorText);
      throw new Error("ثبت‌نام ناموفق بود");
    }

    const tokens = await response.json();
    console.log("ثبت‌نام موفق:", tokens);

    localStorage.setItem("access", tokens.access);
    localStorage.setItem("refresh", tokens.refresh);

    alert("ثبت‌نام با موفقیت انجام شد ✅");
  } catch (err) {
    console.error("خطای ثبت‌نام:", err.message);
    alert("❌ ثبت‌نام ناموفق");
  }
};


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col justify-center items-center">
      <div className="grid grid-cols-1 w-full md:w-3/4 my-4 h-full gap-4 md:grid-cols-2 place-content-center place-items-center">
        {inputesField.map((item) => (
          <CustomInput key={item.title} {...item} register={register} errors={errors} />
        ))}
        {selectBoxFields.map((item) => (
          <CustomSelectBox
            name={item.name}
            title={item.title}
            options={item.options}
            key={item.title}
            selectedValues={selectedValues}
            setSelectedValues={setSelectedValues}
          />
        ))}
      </div>
      <Button type="submit" className="p-4 my-4 col-span-1 text-2xl self-center">ثبت نام</Button>
    </form>
  );
}

const CustomInput = ({ name, type, title, required, register, errors }) => {
  return (
    <div className="flex w-full flex-col justify-start items-start gap-1">
      <label className={`mr-2 text-lg ${required && "font-bold"}`}>
        {name}
        {required ? "*" : ""}:
      </label>
      <input
        className="w-full p-2.5 rounded-lg outline-none focus:outline-none border border-[#d5d5d5]"
        type={type}
        {...register(title, { required })}
      />
      {errors[title] && <span className="text-red-500 text-sm">این فیلد الزامی است</span>}
    </div>
  );
};

const CustomSelectBox = ({ name, title, options, selectedValues, setSelectedValues }) => {
  const [selected, setSelected] = useState(options[0]);

  const handleChange = (value) => {
    setSelected(value);
    setSelectedValues({ ...selectedValues, [title]: value });
  };

  return (
    <div className="flex w-full flex-col justify-start items-start gap-1">
      <label className="mr-2 text-lg">{name}:</label>
      <Listbox as="div" className="w-full rounded-lg outline-none focus:outline-none border border-[#d5d5d5]" value={selected} onChange={handleChange}>
        <ListboxButton className="w-full p-2.5 rounded-lg outline-none focus:outline-none border border-[#d5d5d5]">
          {selected.name}
        </ListboxButton>
        <ListboxOptions anchor="bottom">
          {options.map((option) => (
            <ListboxOption key={option.id} value={option} className="data-focus:bg-blue-100">
              {option.name}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
};

export default SignupForm;
