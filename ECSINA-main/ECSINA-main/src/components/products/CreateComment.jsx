import Image from "next/image";
import Button from "../UI/Button";

const CreateComment = () => {
  return (
    <div className="container mt-24 md:mt-36">
      <div className="shadow-future-cart rounded-2xl py-5 md:py-8 px-3 md:px-16 bg-white">
        {/* TITLE */}
        <div className="flex items-center justify-end">
          <p className="text-base border-b-3 pb-3 border-primary-7  md:text-4xl font-bold text-black">
            ثبت نظر جدید
          </p>
        </div>
        {/* AVATAR */}
        <div className="flex items-center gap-2 md:gap-6 mt-3 ">
          {/* user Image */}
          <div className="relative w-10 h-10 md:w-16 md:h-16">
            <Image
              src={"/assets/images/User.png"}
              alt=""
              fill
              className="rounded-full"
            />
          </div>
          <p className="text-black text-base md:text-3xl font-bold">
            نام کاربری
          </p>
        </div>

        {/* TEXT AREA */}
        <div>
          <div className="bg-blue-50 rounded-xl p-4 text-right mt-4 md:mt-8 ">
            <textarea
              className="w-full p-2 md:p-5 bg-transparent border-none focus:outline-none resize-none text-base md:text-xl placeholder-primary-7"
              rows="5"
              placeholder="نظر خود را بنویسید..."
            ></textarea>
          </div>
          <div className=" flex items-center justify-center mt-5 border md:border-2 border-primary-7 rounded-2xl py-3 cursor-pointer hover:bg-primary-7/10 transition-all duration-300 ">
            <button className="text-primary-7 font-medium text-base md:text-2xl cursor-pointer">
              ارسال پیام
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateComment;
