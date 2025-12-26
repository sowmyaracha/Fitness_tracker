import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

const useManageFoodCatalogue = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchFoodItems = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/admin/get-food-items`, {
        withCredentials: true,
      });
      setFoodItems(res.data.foods);
    } catch (error) {
      console.error("Error fetching food items:", error);
      toast.error("Failed to fetch food items");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/admin/get-user-name-list`, {
        withCredentials: true,
      });
      setUsers(res.data.userNameList);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchFoodItems();
    fetchUsers();
  }, []);

  const createFoodItem = async (data) => {
    try {
      const res = await axios.post(
        `${apiUrl}/api/admin/create-food-item`,
        data,
        {
          withCredentials: true,
        }
      );
      setFoodItems((prev) => [...prev, res.data.food]);
      toast.success("Food item created successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create food item"
      );
    }
  };

  const updateFoodItem = async (id, data) => {
    try {
      const res = await axios.put(
        `${apiUrl}/api/admin/update-food-item/${id}`,
        data,
        { withCredentials: true }
      );
      setFoodItems((prev) =>
        prev.map((item) => (item.id === id ? res.data.food : item))
      );
      toast.success("Food item updated successfully!");
    } catch (error) {
      toast.error("Failed to update food item");
    }
  };

  const deleteFoodItem = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/admin/delete-food-item/${id}`, {
        withCredentials: true,
      });
      setFoodItems((prev) => prev.filter((item) => item.id !== id));
      toast.success("Food item deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete food item");
    }
  };

  return {
    foodItems,
    users,
    createFoodItem,
    updateFoodItem,
    deleteFoodItem,
    fetchFoodItems,
    setFoodItems,
  };
};

export default useManageFoodCatalogue;
