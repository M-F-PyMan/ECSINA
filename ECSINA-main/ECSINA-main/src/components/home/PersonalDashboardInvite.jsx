import Link from "next/link";
import Image from "next/image";
import InviteCall from "../UI/InviteCall";

const inviteCards = [
  {
    id: 1,
    title: "یک فضای اختصاصی دقیقا مطابق نیاز های تو !",
    description: `با ثبت نام در اکسینا، یک داشبورد کاملا شخصی سازی شده خواهی داشت که میتوانی اسنادت را مدیریت کنی .
 ما به موقع تو را از آخرین تغییرات با خبر میکنیم . همچنین تو با اشتراک گذاری نظر و ایده هات میتوانی در این تغییرات نقش داشته باشی . در این بخش تو به پشتیبانی سریع هم دسترسی داری .`,
    image: "/assets/images/NotFound.png",
  },
  {
    id: 2,
    title: "سندت را ارسال کن ، ما بهت کمک میکنیم حرفه ای تر شه!",
    description: `در این بخش، اسناد تکمیل‌شده‌ات را برای بازبینی ارسال کن تا ما آن‌ها را بررسی کنیم، اشکالات احتمالی را اصلاح کنیم یا بخش‌های جدیدی اضافه کنیم تا سندت کاملاً شخصی‌سازی‌شده و حرفه‌ای باشد.`,
    image: "/assets/images/NotFound.png",
  },
  {
    id: 3,
    title: "اسنادت را مدیریت کن.",
    description: `در این بخش تمام اسناد تجاریت را دقیقا همانطور که میخواهی سازمان دهی کن .`,
    image: "/assets/images/NotFound.png",
  },
];

const PersonalDashboardInvite = () => {
  return (
    <div className="container mt-16 md:mt-60">
      <Link href="/" className="flex items-center justify-center gap-2 ">
        <Image
          src={"/assets/icons/ArrowRight.svg"}
          alt=""
          width={30}
          height={30}
          className="text-black  block md:hidden"
        />
        <Image
          src={"/assets/icons/ArrowRight.svg"}
          alt=""
          width={50}
          height={50}
          className="text-black hidden md:block"
        />
        <p className="text-black font-semibold text-base  md:text-4xl ">
          برای دسترسی به داشتن داشبورد شخصی خود ثبت نام کنید.
        </p>
      </Link>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 md:mt-24">
        {inviteCards.map((card, index) => (
          <div className={index === 0 ? "md:col-span-2" : ""} key={card.id}>
            <InviteCall card={card} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalDashboardInvite;
