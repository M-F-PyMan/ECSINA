"use client";
import useSWR from "swr";
import Category from "../UI/Category";

const icons = [
  "assets/icons/Status1.svg",
  "assets/icons/Computer.svg",
  "assets/icons/Document.svg",
  "assets/icons/Status2.svg",
  "assets/icons/Status3.svg",
];

// fetcher عمومی
const fetcher = (url) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access") || ""}`,
    },
  }).then((res) => res.json());

const Categories = () => {
  const { data, error, isLoading } = useSWR(
    "http://10.1.192.2:8000/api/categories/",
    fetcher
  );

  if (error) return <div>خطا در بارگذاری دسته‌بندی‌ها...</div>;
  if (isLoading)
    return (
      <div className="flex items-center justify-center text-2xl mt-5">
        در حال بارگذاری...
      </div>
    );

  const allCategories = data?.results?.map((category, index) => ({
    ...category,
    icon: icons[index % icons.length],
  }));

  return (
    <div className="mt-10 md:mt-16 flex items-center flex-wrap justify-center gap-4 md:gap-8">
      {allCategories?.map((category) => (
        <Category key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Categories;
