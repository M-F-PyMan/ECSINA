import { useState, useEffect } from "react";
import { getAllCategories } from "@/services/categories/getAllCategories";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await getAllCategories();

        setCategories(data);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, error, isLoading };
};

export default useCategories;
