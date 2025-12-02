"use client";
import useProducts from "@/hooks/useProducts";
import Product from "../UI/Product";
import Pagination from "../UI/Pagination";

const AllProducts = () => {
  const { products, pagination, error, isLoading } = useProducts();

  if (isLoading)
    return (
      <div className="text-2xl flex items-center justify-center mt-5">
        در حال بارگذاری...
      </div>
    );

  return (
    <>
      <div className=" mt-8 mx-16 md:mx-0 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {products?.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
      <Pagination pagination={pagination} />
    </>
  );
};

export default AllProducts;
