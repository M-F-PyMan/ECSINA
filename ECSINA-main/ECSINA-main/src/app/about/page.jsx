import MainLayout from "@/components/layout/MainLayout";
import Typography from "@/components/UI/Typography";
import Image from "next/image";

export const metadata = {
  title: "درباره اکسینا",
  description: "صفحه درباره ما",
};

async function getAboutData() {
  const res = await fetch("http://192.168.56.1:8000/api/v1/support/about/", {
    cache: "no-store", // برای گرفتن داده‌ی تازه
  });
  return res.json();
}

export default async function AboutPage() {
  const data = await getAboutData();

  return (
    <MainLayout>
      <section className="my-5 flex flex-col items-center justify-center gradient_about min-w-screen">
        <div className="container mx-8 my-12 p-5 py-12 relative shadow-2xl md:shadow-none rounded-lg">
          <h1 className="text-black text-center text-2xl md:text-4xl mb-12 font-bold pt-8">
            {data.title}
          </h1>
          <div className="text-balance px-8 md:px-2">
            <h2 className="font-extralight text-base md:text-xl text-center">
              {data.subtitle}
            </h2>
            <Typography className="font-extralight text-base md:text-xl text-wrap text-center">
              {data.description}
            </Typography>
          </div>
        </div>

        <div className="mt-24 md:mt-56 pb-36 container">
          <h1 className="font-bold text-2xl md:text-4xl z-50">اکسین چطور کار می‌کند؟</h1>
          <p className="text-lg md:text-2xl text-center md:mx-24 my-8 z-50">
            ویژگی‌های اصلی پلتفرم شامل:
          </p>
          <div className="grid gap-5 md:gap-10 grid-cols-1 lg:grid-cols-2 my-6 px-4 sm:px-8">
            {data.features.map((item) => (
              <div
                key={item.title}
                className="h-80 flex items-center justify-evenly flex-col bg-secondary-2 border border-primary-7 rounded-4xl p-4 hover:shadow-lg transition-all ease-linear duration-500 py-8"
              >
                <h1 className="text-black text-2xl font-bold text-center my-3">{item.title}</h1>
                <Typography className="text-lg text-center leading-10 px-10">{item.desc}</Typography>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
