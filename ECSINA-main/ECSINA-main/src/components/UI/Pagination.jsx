"use client";
import { useRouter, useSearchParams } from "next/navigation";

const Pagination = ({ pagination }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // گرفتن صفحه فعلی از query string
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  // محاسبه تعداد صفحات از count
  const pageSize = 10; // سایز پیش‌فرض صفحه (باید با بک‌اند هماهنگ باشه)
  const totalCount = pagination?.count || 0;
  const lastPage = Math.ceil(totalCount / pageSize);

  const goToPage = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page);
    router.push(`?${params.toString()}`);
  };

  const renderPages = () => {
    const pages = [];
    for (let i = 1; i <= lastPage; i++) {
      pages.push(
        <li
          key={i}
          onClick={() => goToPage(i)}
          className={`cursor-pointer text-xs md:text-base px-2 py-1 rounded ${
            i === currentPage ? "text-secondary-22 font-bold" : "text-secondary-21"
          }`}
        >
          {i}
        </li>
      );
    }
    return pages;
  };

  if (!pagination || lastPage <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-5 mt-8 md:mt-16">
      <button
        className="text-xs md:text-lg font-normal text-secondary-21 disabled:opacity-40"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        قبلی
      </button>

      <ul className="flex items-center justify-center gap-3">
        {renderPages()}
      </ul>

      <button
        className="text-xs md:text-lg font-normal text-secondary-21 disabled:opacity-40"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === lastPage}
      >
        بعدی
      </button>
    </div>
  );
};

export default Pagination;
