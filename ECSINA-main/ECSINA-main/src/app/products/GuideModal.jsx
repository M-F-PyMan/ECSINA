"use client";
import React, { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { IoCloseSharp } from "react-icons/io5";

function GuideModal() {
  const [isOpen, setIsOpen] = useState(false);
  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  return (
    <>
      <button
        onClick={open}
        className="bg-primary-7 rounded-xl md:rounded-2xl text-white text-nowrap py-3 px-5 md:py-5  lg:px-11 text-xs lg:text-2xl font-semibold cursor-pointer hover:bg-primary-8 transition-all duration-200 "
      >
        راهنمای دانلود قالب
      </button>
      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 w-screen overflow-y-auto sm:p-4">
          <div className="flex w-screen min-h-full items-center justify-center">
            <DialogPanel
              transition
              className="sm:w-4/5 w-full shadow-xl rounded-2xl bg-secondary-2 drop-shadow-2xl p-10   duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle as="h2" className={"flex justify-between items-center"}>
                <h2 className="text-3xl font-bold ">راهنمای دانلود و استفاده از قالب‌های رایگان</h2>
                <IoCloseSharp className="hover:opacity-70" onClick={close} size={20} />
              </DialogTitle>
              <p className="mt-5 text-lg font-semibold leading-10">
                اکسین در این بخش، مجموعه‌ای از قالب‌های حرفه‌ای و استاندارد را برای دانلود رایگان در اختیار شما قرار می‌دهد تا بتوانید به‌راحتی و بدون هزینه از آن‌ها در پروژه‌های خود استفاده کنید.
                <br />
                این قالب‌ها با هدف افزایش بهره‌وری و صرفه‌جویی در زمان تهیه شده‌اند و برای دانشجویان، کسب‌وکارهای مختلف، استارتاپ‌ها، شرکت‌ها و سازمان‌ها مناسب هستند.
              </p>
              <div className="mt-8">
                <h3 className="text-2xl my-6 font-bold">نحوه دانلود و استفاده</h3>
                <ul className="flex flex-col items-start gap-3">
                  <li className="text-xl font-bold"> 1.قالب مورد نظر خود را جستجو کنید.</li>
                  <li className="text-xl font-bold"> 2.قالب دلخواه خود را از لیست قالب‌های پیشنهادی اکسین انتخاب کنید.</li>
                  <li className="text-xl font-bold"> 3.روی دکمه "دانلود" کلیک کنید و فایل را دریافت کنید.</li>
                  <li className="text-xl font-bold"> 4.فایل را با نرم‌افزار Microsoft Word باز کنید.</li>
                  <li className="text-xl font-bold"> 5.اطلاعات موردنظر خود را در تیترهای مشخص‌شده و با کمک توضیحات وارد کنید.</li>
                  <li className="text-xl font-bold">6.پس از ویرایش، فایل را ذخیره کرده و در پروژه‌های خود استفاده کنید. نکات مهم </li>
                </ul>
                <h3 className="text-red-700 text-3xl font-bold my-16">نکات مهم</h3>
                <div className="space-y-6">
                  <p className="text-lg font-semibold">
                    <span className="font-bold text-xl">پوشش کامل تیترهای مهم اسناد تجاری:</span> در طراحی این قالب‌ها تلاش شده تا تمام سرفصل‌های ضروری در اسناد تجاری گنجانده شود.
                  </p>
                  <p className="text-lg font-semibold">
                    <h1 className="inline font-bold text-xl">به‌روزرسانی مداوم و اضافه شدن قالب‌های جدید:</h1>
                    قالب‌ها به‌صورت مرتب به‌روز می‌شوند و در آینده دسته‌بندی‌های جدیدی نیز به این مجموعه اضافه خواهد شد. پیشنهاد می‌کنیم هر از چند گاهی به این صفحه سر بزنید تا از آخرین به‌روزرسانی‌ها
                    مطلع شوید.
                  </p>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default GuideModal;
