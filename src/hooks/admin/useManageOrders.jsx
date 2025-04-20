import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

const useManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchOrders(); // Fetch on mount
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/common/get-product-name-list`,
        {
          withCredentials: true,
        }
      );
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Error fetching products. Please try again.");
    }
  };
  const fetchOrderItems = async (orderId) => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/admin/get-all-order-items/${orderId}`,
        { withCredentials: true }
      );
      setOrderItems(response.data.orderItems);
    } catch (error) {
      console.error("Error fetching order items:", error);
      toast.error("Error fetching order items. Please try again later.");
    }
  };

  const createOrderItem = async (formData) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/admin/create-order-item`,
        formData,
        { withCredentials: true }
      );
      setOrderItems((prevOrderItems) => [
        ...prevOrderItems,
        response.data.orderItem,
      ]);
      toast.success("Order item created successfully!");
    } catch (error) {
      console.error("Error creating order item:", error);
      toast.error("Error creating order item. Please try again.");
    }
  };

  const updateOrderItem = async (id, formData) => {
    try {
      const response = await axios.put(
        `${apiUrl}/api/admin/update-order-item/${id}`,
        {
          data: {
            quantity: formData.quantity,
            price: formData.price,
            order: {
              connect: { id: formData.order_id },
            },
            product: {
              connect: { id: formData.product_id },
            },
          },
        },
        { withCredentials: true }
      );
      setOrderItems((prevOrderItems) =>
        prevOrderItems.map((item) =>
          item.id === id ? response.data.orderItem : item
        )
      );
      toast.success("Order item updated successfully!");
    } catch (error) {
      console.error("Error updating order item:", error);
      toast.error("Error updating order item. Please try again.");
    }
  };

  const deleteOrderItem = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/admin/delete-order-item/${id}`, {
        withCredentials: true,
      });
      setOrderItems((prevOrderItems) =>
        prevOrderItems.filter((item) => item.id !== id)
      );
      toast.success("Order item deleted successfully!");
    } catch (error) {
      console.error("Error deleting order item:", error);
      toast.error("Error deleting order item. Please try again.");
    }
  };

  const updateOrder = async (id, formData) => {
    try {
      const response = await axios.put(
        `${apiUrl}/api/admin/update-order/${id}`,
        formData,
        { withCredentials: true }
      );
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? response.data.order : order
        )
      );
      toast.success("Order updated successfully!");
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Error updating order. Please try again.");
    }
  };

  const deleteOrder = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/admin/delete-order/${id}`, {
        withCredentials: true,
      });
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
      toast.success("Order deleted successfully!");
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Error deleting order. Please try again.");
    }
  };
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/admin/get-orders`, {
        withCredentials: true,
      });
      setOrders(response.data.formattedData);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Error fetching orders. Please try again.");
    }
  };
  const adminUpdateOrderDetails = async (formData) => {
    try {
      const response = await axios.put(
        `${apiUrl}/api/admin/update-order/${formData.order_id}`,
        formData,
        { withCredentials: true }
      );
      toast.success("Order details updated successfully!");
      fetchOrders(); // Refresh orders list
    } catch (error) {
      console.error("Error updating full order details:", error);
      toast.error("Failed to update order details.");
    }
  };

  return {
    orders,
    orderItems,
    products,
    fetchOrders,
    fetchOrderItems,
    adminUpdateOrderDetails,
    createOrderItem,
    updateOrderItem,
    deleteOrderItem,
    updateOrder,
    deleteOrder,
  };
};

export default useManageOrders;
