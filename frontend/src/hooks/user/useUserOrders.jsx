// hooks/useUserOrders.js
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

const useUserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/user/get-user-orders`, {
        withCredentials: true,
      });
      setOrders(response.data.formattedData);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Error fetching orders. Please try again.");
    }
  };

  const fetchOrderItems = async (orderId) => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/user/get-all-order-items/${orderId}`,
        { withCredentials: true }
      );
      setOrderItems(response.data.orderItems);
    } catch (error) {
      console.error("Error fetching order items:", error);
      toast.error("Error fetching order items. Please try again later.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    orderItems,
    fetchOrders,
    fetchOrderItems,
  };
};

export default useUserOrders;
