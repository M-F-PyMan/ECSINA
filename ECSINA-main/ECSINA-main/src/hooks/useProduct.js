import { useState, useEffect, useCallback } from "react";
import getProductById from "@/services/products/getProdutById";

const useProduct = (productId) => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProduct = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedProduct = await getProductById(productId);
      setProduct(fetchedProduct);
      setError(null);
    } catch (err) {
      setError(err);
    }
    setIsLoading(false);
  }, [productId]);

  useEffect(() => {
    if (!productId) return;

    fetchProduct();
  }, [productId, fetchProduct]);

  return { product, error, isLoading };
};

export default useProduct;
