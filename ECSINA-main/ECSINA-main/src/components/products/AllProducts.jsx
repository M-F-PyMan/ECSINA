"use client";
import useSWR from "swr";
import Product from "../UI/Product";
import Pagination from "../UI/Pagination";

const fetcher = (url) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access") || ""}`,
    },
  }).then((res) => res.json());

const AllProducts = () => {
  const { data, error, isLoading } = useSWR(
    "http://10.1.192.2:8000/api/products/",
    fetcher
  );

  if (error) return <div>خطا در بارگذاری محصولات...</div>;
  if (isLoading)
    return (
      <div className="text-2xl flex items-center justify-center mt-5">
        در حال بارگذاری...
      </div>
    );

  const products = data?.results || [];
  const pagination = {
    count: data?.count,
    next: data?.next,
    previous: data?.previous,
  };

  return (
    <>
      <div className="mt-8 mx-16 md:mx-0 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
      <Pagination pagination={pagination} />
    </>
  );
};

export default AllProducts;
