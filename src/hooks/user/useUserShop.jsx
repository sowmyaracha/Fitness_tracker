import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

const useUserShop = () => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/common/get-cart`, {
        withCredentials: true,
      });
      setCart(response.data.data || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
      toast.error("Error fetching cart. Please try again.");
    }
  };

  const fetchWishlist = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/common/get-wishlist`, {
        withCredentials: true,
      });

      setWishlist(response.data.data || []);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      toast.error("Error fetching wishlist. Please try again.");
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      await axios.post(
        `${apiUrl}/api/common/add-to-cart`,
        { productId, quantity },
        { withCredentials: true }
      );
      toast.success("Item added to cart");
      fetchCart();
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Failed to add item to cart.");
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`${apiUrl}/api/common/delete-from-cart/${productId}`, {
        withCredentials: true,
      });
      toast.success("Item removed from cart");
      fetchCart();
    } catch (error) {
      console.error("Remove from cart error:", error);
      toast.error("Failed to remove item from cart.");
    }
  };

  const addToWishlist = async (productId) => {
    try {
      await axios.post(
        `${apiUrl}/api/common/add-to-wishlist`,
        { productId },
        { withCredentials: true }
      );
      toast.success("Item added to wishlist");
      fetchWishlist();
    } catch (error) {
      if (
        error.response &&
        error.response.data?.message === "Item already in wishlist"
      ) {
        toast.info("Item already in wishlist");
      } else {
        console.error("Add to wishlist error:", error);
        toast.error("Failed to add item to wishlist.");
      }
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete(
        `${apiUrl}/api/common/delete-from-wishlist/${productId}`,
        {
          withCredentials: true,
        }
      );
      toast.success("Item removed from wishlist");
      fetchWishlist();
    } catch (error) {
      console.error("Remove from wishlist error:", error);
      toast.error("Failed to remove item from wishlist.");
    }
  };

  const moveToCartFromWishlist = async (productId) => {
    try {
      await addToCart(productId, 1);
      await removeFromWishlist(productId);
    } catch (error) {
      toast.error("Failed to move item to cart.");
    }
  };
  const createOrder = async (orderData) => {
    try {
      console.log("inside create order");
      const response = await axios.post(
        `${apiUrl}/api/user/create-order`,
        orderData,
        { withCredentials: true }
      );

      toast.success("Order placed successfully!");
      return response.data.order;
    } catch (error) {
      console.error("Create order error:", error);
      toast.error("Failed to create order.");
      throw error;
    }
  };
  useEffect(() => {
    fetchCart();
    fetchWishlist();
  }, []);

  return {
    cart,
    wishlist,
    fetchCart,
    fetchWishlist,
    addToCart,
    removeFromCart,
    addToWishlist,
    removeFromWishlist,
    moveToCartFromWishlist,
    createOrder,
  };
};

export default useUserShop;
