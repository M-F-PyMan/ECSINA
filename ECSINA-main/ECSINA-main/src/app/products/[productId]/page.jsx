"use client";
import { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import ProductDetails from "@/components/products/ProductDetails";
import AboutProduct from "@/components/products/AboutProduct";
import FrequentlyQuestions from "@/components/products/FrequentlyQuestions";
import CreateComment from "@/components/products/CreateComment";
import RecommendedProducts from "@/components/UI/RecommendedProducts";

export default function ProductPage({ params }) {
  const { productId } = params;
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `http://10.1.192.2:8000/products/products/${productId}/detail/`
        );
        if (!res.ok) throw new Error("خطا در دریافت جزئیات محصول");
        const json = await res.json();
        setData(json);
      } catch (e) {
        setErr(e.message);
      }
    })();
  }, [productId]);

  return (
    <MainLayout>
      <section className="gradient-main-background min-h-screen pb-5">
        {err && <div className="text-red-600">{err}</div>}
        {!data ? (
          <div className="text-center mt-10">در حال بارگذاری...</div>
        ) : (
          <>
            {/* جزئیات محصول شامل تب‌ها و دکمه دانلود */}
            <ProductDetails data={data} />

            {/* توضیحات محصول */}
            <AboutProduct description={data.proposal?.description} />

            {/* سوالات متداول */}
            <FrequentlyQuestions faqs={data.faqs} />

            {/* بخش ثبت نظر */}
            <CreateComment proposalId={data.proposal?.id} />

            {/* محصولات پیشنهادی مشابه */}
            <RecommendedProducts categoryId={data.proposal?.category} />
          </>
        )}
      </section>
    </MainLayout>
  );
}
