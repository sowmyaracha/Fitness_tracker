// // hooks/shop/useShop.js
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const apiUrl = import.meta.env.VITE_API_URL;

// const useShop = (productId = null) => {
//   const [products, setProducts] = useState([]);
//   const [singleProduct, setSingleProduct] = useState(null);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [loadingProducts, setLoadingProducts] = useState(true);
//   const [loadingProductDetail, setLoadingProductDetail] = useState(true);

//   // Fetch all active products
//   const fetchProducts = async () => {
//     setLoadingProducts(true);
//     try {
//       const res = await axios.get(`${apiUrl}/api/user/get-products`, {
//         withCredentials: true,
//       });
//       if (res.data.success) {
//         setProducts(res.data.products);
//       } else {
//         toast.error("No products found.");
//       }
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       toast.error("Failed to fetch products.");
//     } finally {
//       setLoadingProducts(false);
//     }
//   };

//   // Fetch single product by ID
//   const fetchProductById = async (id) => {
//     setLoadingProductDetail(true);
//     try {
//       const res = await axios.get(
//         `${apiUrl}/api/user/get-product-by-id/${id}`,
//         {
//           withCredentials: true,
//         }
//       );
//       if (res.data.success) {
//         setSingleProduct(res.data.product);
//         fetchRelatedProducts(res.data.product.category); // Fetch related on product load
//       } else {
//         toast.error("Product not found.");
//       }
//     } catch (error) {
//       console.error("Error fetching product detail:", error);
//       toast.error("Failed to load product details.");
//     } finally {
//       setLoadingProductDetail(false);
//     }
//   };

//   // ✅ Fetch related products by category
//   const fetchRelatedProducts = async (category) => {
//     try {
//       const res = await axios.get(`${apiUrl}/api/user/get-related-products`, {
//         params: { category },
//         withCredentials: true,
//       });
//       if (res.data.success) {
//         setRelatedProducts(res.data.products);
//       } else {
//         toast.error("No related products found.");
//       }
//     } catch (error) {
//       console.error("Error fetching related products:", error);
//       toast.error("Failed to fetch related products.");
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     if (productId) {
//       fetchProductById(productId);
//     }
//   }, [productId]);

//   return {
//     products,
//     singleProduct,
//     relatedProducts,
//     loadingProducts,
//     loadingProductDetail,
//     fetchProducts,
//     fetchProductById,
//   };
// };

// export default useShop;
// hooks/shop/useShop.js
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const apiUrl = import.meta.env.VITE_API_URL;

// const useShop = (productId = null) => {
//   const [products, setProducts] = useState([]);
//   const [singleProduct, setSingleProduct] = useState(null);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [loadingProducts, setLoadingProducts] = useState(true);
//   const [loadingProductDetail, setLoadingProductDetail] = useState(true);

//   // Filters & search state
//   const [searchTerm, setSearchTerm] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("");
//   const [stockFilter, setStockFilter] = useState(""); // "IN_STOCK" | "OUT_OF_STOCK" | ""
//   const [priceRange, setPriceRange] = useState([0, 1000]); // min, max

//   // ✅ Fetch all active products with search and filters
//   const fetchProducts = async () => {
//     setLoadingProducts(true);
//     try {
//       const res = await axios.get(`${apiUrl}/api/user/get-products`, {
//         params: {
//           search: searchTerm || undefined,
//           category: categoryFilter || undefined,
//           stock: stockFilter || undefined,
//           minPrice: priceRange[0],
//           maxPrice: priceRange[1],
//         },
//         withCredentials: true,
//       });

//       if (res.data.success) {
//         setProducts(res.data.products);
//       } else {
//         toast.error("No products found.");
//       }
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       toast.error("Failed to fetch products.");
//     } finally {
//       setLoadingProducts(false);
//     }
//   };

//   // ✅ Fetch single product by ID
//   const fetchProductById = async (id) => {
//     setLoadingProductDetail(true);
//     try {
//       const res = await axios.get(
//         `${apiUrl}/api/user/get-product-by-id/${id}`,
//         {
//           withCredentials: true,
//         }
//       );
//       if (res.data.success) {
//         setSingleProduct(res.data.product);
//         fetchRelatedProducts(res.data.product.category);
//       } else {
//         toast.error("Product not found.");
//       }
//     } catch (error) {
//       console.error("Error fetching product detail:", error);
//       toast.error("Failed to load product details.");
//     } finally {
//       setLoadingProductDetail(false);
//     }
//   };

//   // ✅ Fetch related products by category
//   const fetchRelatedProducts = async (category) => {
//     try {
//       const res = await axios.get(`${apiUrl}/api/user/get-related-products`, {
//         params: { category },
//         withCredentials: true,
//       });
//       if (res.data.success) {
//         setRelatedProducts(res.data.products);
//       } else {
//         toast.error("No related products found.");
//       }
//     } catch (error) {
//       console.error("Error fetching related products:", error);
//       toast.error("Failed to fetch related products.");
//     }
//   };

//   // Refetch on filter/search changes
//   useEffect(() => {
//     fetchProducts();
//   }, [searchTerm, categoryFilter, stockFilter, priceRange]);

//   useEffect(() => {
//     if (productId) {
//       fetchProductById(productId);
//     }
//   }, [productId]);

//   return {
//     products,
//     singleProduct,
//     relatedProducts,
//     loadingProducts,
//     loadingProductDetail,
//     fetchProducts,
//     fetchProductById,

//     // Filters
//     setSearchTerm,
//     setCategoryFilter,
//     setStockFilter,
//     setPriceRange,
//     searchTerm,
//     categoryFilter,
//     stockFilter,
//     priceRange,
//   };
// };

// export default useShop;
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

const useShop = (productId = null) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingProductDetail, setLoadingProductDetail] = useState(true);

  // ✅ Fetch all products with optional filters
  const applyFilters = async (filters = {}) => {
    setLoadingProducts(true);

    try {
      const res = await axios.get(`${apiUrl}/api/user/get-products`, {
        params: {
          search: filters.search || "",
          category: filters.categories?.[0] || "", // Only handling one category for now
          stock: filters.stock || "",
          minPrice: 0,
          maxPrice: filters.price || 1000,
        },
        withCredentials: true,
      });

      if (res.data.success) {
        setFilteredProducts(res.data.products);
      } else {
        setFilteredProducts([]);
        toast.error(res.data.message || "No products found");
      }
    } catch (error) {
      console.error("Error fetching filtered products:", error);
      toast.error("Failed to fetch products.");
    } finally {
      setLoadingProducts(false);
    }
  };

  // Fetch single product by ID
  const fetchProductById = async (id) => {
    setLoadingProductDetail(true);
    try {
      const res = await axios.get(`${apiUrl}/api/user/get-product-by-id/${id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setSingleProduct(res.data.product);
        fetchRelatedProducts(res.data.product.category);
      } else {
        toast.error("Product not found.");
      }
    } catch (error) {
      console.error("Error fetching product detail:", error);
      toast.error("Failed to load product details.");
    } finally {
      setLoadingProductDetail(false);
    }
  };

  // Fetch related products
  const fetchRelatedProducts = async (category) => {
    try {
      const res = await axios.get(`${apiUrl}/api/user/get-related-products`, {
        params: { category },
        withCredentials: true,
      });

      if (res.data.success) {
        setRelatedProducts(res.data.products);
      } else {
        setRelatedProducts([]);
        toast.error("No related products found.");
      }
    } catch (error) {
      console.error("Error fetching related products:", error);
      toast.error("Failed to fetch related products.");
    }
  };

  useEffect(() => {
    // Initial load
    applyFilters(); // load all by default
  }, []);

  useEffect(() => {
    if (productId) {
      fetchProductById(productId);
    }
  }, [productId]);

  return {
    filteredProducts,
    products,
    singleProduct,
    relatedProducts,
    loadingProducts,
    loadingProductDetail,
    fetchProductById,
    fetchRelatedProducts,
    applyFilters, // ✅ return this
  };
};

export default useShop;
