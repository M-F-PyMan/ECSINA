"use client";
import { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import ProductDetails from "@/components/products/ProductDetails";
import AboutProduct from "@/components/products/AboutProduct";
import FrequentlyQuestions from "@/components/products/FrequentlyQuestions";
import CreateComment from "@/components/products/CreateComment";
import CommentsList from "@/components/products/CommentsList";
import RecommendedProducts from "@/components/UI/RecommendedProducts";

export default function ProductPage({ params }) {
  const { productId } = params;
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [err, setErr] = useState("");

  // گرفتن جزئیات محصول
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `http://10.1.192.2:8000/products/products/${productId}/detail/`
        );
        if (!res.ok) throw new Error("خطا در دریافت جزئیات محصول");
        const json = await res.json();
        setData(json);

        // گرفتن کامنت‌ها بعد از دریافت proposalId
        if (json?.proposal?.id) {
          const resComments = await fetch(
            `http://10.1.192.2:8000/comments/?proposal=${json.proposal.id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access") || ""}`,
              },
            }
          );
          if (resComments.ok) {
            const commentsJson = await resComments.json();
            setComments(commentsJson);
          }
        }
      } catch (e) {
        setErr(e.message);
      }
    })();
  }, [productId]);

  return (
    <MainLayout>
      <section className="gradient-main-background min-h-screen pb-10">
        {err && <div className="text-red-600">{err}</div>}
        {!data ? (
          <div className="text-center mt-10">در حال بارگذاری...</div>
        ) : (
          <div className="space-y-8">
            {/* جزئیات محصول */}
            <ProductDetails data={data} />

            {/* توضیحات محصول */}
            <AboutProduct description={data.proposal?.description} />

            {/* سوالات متداول */}
            <FrequentlyQuestions faqs={data.faqs} />

            {/* بخش کامنت‌ها */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-bold mb-4">نظرات کاربران</h2>
              <CreateComment
                proposalId={data.proposal?.id}
                onNewComment={(newComment) =>
                  setComments((prev) => [newComment, ...prev])
                }
              />
              <CommentsList comments={comments} />
            </div>

            {/* محصولات پیشنهادی */}
            <RecommendedProducts categoryId={data.proposal?.category} />
          </div>
        )}
      </section>
    </MainLayout>
  );
}
