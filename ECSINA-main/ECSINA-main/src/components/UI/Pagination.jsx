"use client";
import { useRouter, useSearchParams } from "next/navigation";

const Pagination = ({ pagination }) => {
  const { current_page, last_page } = pagination || {};
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page);
    router.push(`?${params.toString()}`);
  };

  const renderPages = () => {
    const pages = [];
    for (let i = 1; i <= last_page; i++) {
      pages.push(
        <li
          key={i}
          onClick={() => goToPage(i)}
          className={`cursor-pointer text-xs md:text-base px-2 py-1 rounded ${
            i === current_page ? " text-secondary-22" : "text-secondary-21"
          }`}
        >
          {i}
        </li>
      );
    }
    return pages;
  };

  //   if (!pagination || last_page <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-5 mt-8 md:mt-16">
      <button
        className="text-xs md:text-lg font-normal text-secondary-21 disabled:opacity-40"
        onClick={() => goToPage(current_page - 1)}
        disabled={current_page === 1}
      >
        قبلی
      </button>

      <ul className="flex items-center justify-center gap-3">
        {renderPages()}
      </ul>

      <button
        className="text-xs md:text-lg font-normal text-secondary-21 disabled:opacity-40"
        onClick={() => goToPage(current_page + 1)}
        disabled={current_page === last_page}
      >
        بعدی
      </button>
    </div>
  );
};

export default Pagination;
