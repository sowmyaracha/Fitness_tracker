import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

const useManageProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/admin/get-all-products`, {
        withCredentials: true,
      });
      setProducts(res.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const createProduct = async (data) => {
    try {
      const res = await axios.post(`${apiUrl}/api/admin/create-product`, data, {
        withCredentials: true,
      });
      setProducts((prev) => [...prev, res.data.product]);
      toast.success("Product created successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create product");
    }
  };

  const updateProduct = async (id, data) => {
    try {
      const res = await axios.put(
        `${apiUrl}/api/admin/update-product/${id}`,
        data,
        {
          withCredentials: true,
        }
      );
      setProducts((prev) =>
        prev.map((product) => (product.id === id ? res.data.product : product))
      );
      toast.success("Product updated successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update product");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/admin/delete-product/${id}`, {
        withCredentials: true,
      });
      setProducts((prev) =>
        prev.map((product) =>
          product.id === id ? { ...product, status: "INACTIVE" } : product
        )
      );
      toast.success("Product deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  return {
    products,
    createProduct,
    updateProduct,
    deleteProduct,
    fetchProducts,
    setProducts,
  };
};

export default useManageProducts;
