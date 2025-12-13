'use client'
import Title from "@/components/user/Title";
import React from "react";
import { FaPlus } from "react-icons/fa";

const page = () => {
  return (
    <div className="container mx-auto h-full font-iransans pb-[40px] ">
      <div className="hidden md:block" >
        <Title title={"ثبت تیکت جدید"} />
      </div>
      <div className="bg-white rounded-[30px]  md:border-1 p-[30px] md:p-[60px] ">
        <form className="space-y-6 flex flex-col  scroll-auto">
          <div className="flex gap-[5px] flex-col md:flex-row items-start md:items-center rounded-[30px] md:border py-[15px] px-[10px]">
            <label htmlFor="subject" className="font-bold basis-[15%] text-[13px] md:text-[16px]">
              موضوع تیکت :
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="موضوع..."
              className="shadow-[0px_0px_7px_0px_#00000042] md:shadow-none py-[10px] md:py-0 rounded-[8px] px-[5px] basis-[100%] w-full outline-0 border-0 placeholder:text-[14px] md:placeholder:text-[16px]"
              required
            />
          </div>
          <div className="flex gap-[5px] flex-col md:flex-row items-start md:items-center rounded-[30px] md:border py-[15px] px-[10px]">
            <label htmlFor="priority" className="font-bold basis-[15%] text-[13px] md:text-[16px]">
              اولویت :
            </label>
            <select
              id="priority"
              name="priority"
              className="shadow-[0px_0px_7px_0px_#00000042] md:shadow-none py-[10px] md:py-0 rounded-[8px] px-[5px] outline-0 border-0 w-full basis-[90%] text-[14px] md:text-[16px]"
              defaultValue="without"
            >
              <option value="without">بدون اولویت</option>
              <option value="low">کم</option>
              <option value="medium">متوسط</option>
              <option value="urgent">فوری</option>
            </select>
          </div>

          <div className="flex gap-[5px] md:flex-row flex-col items-start rounded-[30px] md:border py-[15px] px-[10px]">
            <label htmlFor="message" className=" font-bold basis-[15%] text-[13px] md:text-[16px]">
              متن تیکت:
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              placeholder="متن تیکت را وارد کنید..."
              className="min-h-[200px] w-full border-0 outline-0   basis-[90%] placeholder:text-[14px] md:placeholder:text-[16px] shadow-[0px_0px_7px_0px_#00000042] md:shadow-none py-[10px] md:py-0 rounded-[8px] px-[5px]"
              required
            ></textarea>
          </div>

          <div className="w-[80%] md:w-[50%] mx-auto flex justify-between items-center">
            
            <div className="flex flex-col items-center">
              <label
                htmlFor="uploadImage"
                className="cursor-pointer flex flex-col items-center"
              >
                <div className="border-2 border-main-1 md:border-[#00000040] w-[50px] h-[50px] flex justify-center items-center rounded-full hover:text-main-1 hover:border-main-1 transition-colors">
                  <FaPlus
                 
                    size={30}
                    className="text-main-1 md:text-[#00000040] "
                  />
                </div>
                <span className="font-bold mt-2 text-[14px] md:text-[14px]">آپلود تصویر</span>
              </label>
              <input
                type="file"
                id="uploadImage"
                accept="image/*"
                className="hidden"
                multiple
               
              />
            </div>

            <div className="flex flex-col items-center">
              <label
                htmlFor="uploadFile"
                className="cursor-pointer flex flex-col items-center"
              >
                <div className="border-2 border-main-1 md:border-[#00000040] w-[50px] h-[50px] flex justify-center items-center rounded-full hover:text-main-1 hover:border-main-1 transition-colors">
                  <FaPlus
                    size={30}
                    className="text-main-1 md:text-[#00000040]"
                  />
                </div>
                <span className="font-bold mt-2 text-[14px] md:text-[14px]">آپلود فایل</span>
              </label>
              <input
                type="file"
                id="uploadFile"
                className="hidden"
                multiple
                
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full md:w-[50%] self-center text-center bg-main-1 text-white font-medium py-3 px-6 rounded-[30px] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
          >
            ارسال تیکت
          </button>
        </form>
      </div>
      <div>
        <p className="font-bold text-[16px] md:text-[20px] mt-[16px] text-center">
        قبل از ارسال تیکت توجه کنید...
    
      </p>
          <p className="font-normal  text-[14px] border-r-2 border-r-main-1 pr-[5px] mt-[10px]">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
        </p>
      </div>
    </div>
  );
};

export default page;
