import AllComments from "@/components/home/AllComments";
import Guidance from "@/components/home/Guidance";
import HeroBanner from "@/components/home/HeroBanner";
import OurServices from "@/components/home/OurServices";
import PersonalDashboardInvite from "@/components/home/PersonalDashboardInvite";
import TemplateFeatures from "@/components/home/TemplateFeatures";
import "./globals.css";
import "keen-slider/keen-slider.min.css";
import MainLayout from "@/components/layout/MainLayout";
import HeaderLink from "@/components/home/HeaderLink";

export const metadata = {
  title: "صفحه اصلی | اکسینا",
  description:
    "سایت تخصصی ما با ارائه خدمات حرفه‌ای در زمینه نگارش پروپوزال و طراحی بوم کسب‌وکار و.. همراه شما در مسیر موفقیت است. ما با تیمی متخصص و باتجربه، آماده ارائه مشاوره و خدمات تخصصی به دانشجویان، استارتاپ‌ها و سازمان‌ها هستیم.",
  keywords: "",
  openGraph: {
    title: "Ecsina",
    type: "website",
    locale: "fa_IR",
  },
};

export default function Home() {
  return (
    <MainLayout>
      <HeroBanner />
      <OurServices />
      <TemplateFeatures />
      <PersonalDashboardInvite />
      <HeaderLink />
      <AllComments />
      <Guidance />
    </MainLayout>
  );
}
