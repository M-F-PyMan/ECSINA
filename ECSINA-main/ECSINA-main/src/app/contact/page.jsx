import MainLayout from "@/components/layout/MainLayout";
import Typography from "@/components/UI/Typography";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "تماس با ما",
  description:
    "از طریق این فرم می‌توانید مشکلات یا درخواست‌های خود را به‌صورت تیکت ثبت کنید تا تیم پشتیبانی با اولویت بالا پاسخ دهد.",
  keywords: "",
  openGraph: {
    title: "Ecsina",
    type: "website",
    locale: "fa_IR",
  },
};

export default function ContactPage() {
  return (
    <MainLayout>
      <section className="flex flex-col items-center my-5 min-w-screen">
        <div className="py-12 pb-10 px-4 md:px-8 lg:px-12 w-[90%] lg:w-4/5 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 shadow-xl bg-[#FFFFFF05] rounded-lg">
          <div className="col-span-1 flex flex-col justify-start">
            <h1 className="text-black md:text-right text-center text-xl md:text-3xl font-bold pt-8">
              ارسال تیکت پشتیبانی
            </h1>
            <Typography className="font-medium taxt-base sm:text-lg my-4 text-center md:text-right">
              مشکلات یا درخواست‌های خود را از طریق فرم زیر ثبت کنید. تیم پشتیبانی
              با توجه به اولویت، پاسخ خواهد داد.
            </Typography>
          </div>
          <ContactForm />
        </div>
      </section>
    </MainLayout>
  );
}
