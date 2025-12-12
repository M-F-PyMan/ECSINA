"use client";
import useSWR from "swr";
import MyAccordion from "../UI/MyAccordion";

const fetcher = (url) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access") || ""}`,
    },
  }).then((res) => res.json());

const FrequentlyQuestions = ({ categoryId }) => {
  const { data, error, isLoading } = useSWR(
    categoryId
      ? `http://10.1.192.2:8000/api/faqs/?category=${categoryId}`
      : "http://10.1.192.2:8000/api/faqs/",
    fetcher
  );

  if (error) return <div>خطا در بارگذاری سوالات متداول...</div>;
  if (isLoading)
    return (
      <div className="flex items-center justify-center text-2xl mt-5">
        در حال بارگذاری...
      </div>
    );

  const faqs = data?.results || [];

  return (
    <div className="container">
      <div className="border border-primary-7 rounded-[10px] md:rounded-4xl shadow-product-cart mt-16 md:mt-48">
        {/* Header */}
        <div className="bg-primary-0 rounded-t-[10px] md:rounded-t-4xl py-2 md:py-4">
          <span className="bg-primary-8 rounded-tr-[7px] md:rounded-tr-4xl px-2 md:px-5 py-[13px] md:py-4 text-white text-[10px] md:text-[18px] font-semibold">
            سوالات متداول
          </span>
        </div>

        {/* Body */}
        <div className="px-4 md:px-14 pt-3 md:pt-9 pb-6">
          <MyAccordion allowMultiple={false} items={faqs.map((faq) => ({
            id: faq.id,
            title: faq.title,
            content: faq.description,
            file: faq.file_url,
          }))} />
        </div>
      </div>
    </div>
  );
};

export default FrequentlyQuestions;
