import { useState, useEffect } from "react";
import { getAllProducts } from "@/services/products/getAllProducts";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await getAllProducts();

        if (response.error) {
          setError(response.error);
        } else {
          setProducts(response.data?.products || []);
          setPagination(response.data?.pagination || null);
          setError(null);
        }
      } catch (err) {
        setError("خطا در دریافت داده‌ها");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return {
    products,
    pagination,
    error,
    isLoading,
  };
};

export default useProducts;
