import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const apiUrl = import.meta.env.VITE_API_URL;

const useDietPlan = () => {
  const [dietPlanItems, setDietPlanItems] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDietPlanItems = async (date) => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/api/user/get-diet-plan`, {
        withCredentials: true,
        params: { date },
      });
      setDietPlanItems(response.data.dietPlan);
      setLoading(false);
      return response.data.dietPlan;
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const updateDietPlanItem = async (planItemId, quantity, status) => {
    try {
      const response = await axios.put(
        `${apiUrl}/api/user/update-diet-plan`,
        {
          planItemId,
          quantity,
          status,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
      }
      setDietPlanItems((prevItems) =>
        prevItems.map((item) =>
          item.id === planItemId ? { ...item, status, quantity } : item
        )
      );
      return response.data;
    } catch (err) {
      setError(err);
    }
  };

  const deleteDietPlanItem = async (planItemId) => {
    try {
      const response = await axios.delete(
        `${apiUrl}/api/user/delete-diet-plan/${planItemId}`,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
      }
      setDietPlanItems((prevItems) =>
        prevItems.filter((item) => item.id !== planItemId)
      );
      return response.data;
    } catch (err) {
      setError(err);
    }
  };

  const getFoodItems = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/user/get-food-catalogue`,
        {
          withCredentials: true,
        }
      );
      setFoodItems(response.data.foods);
    } catch (err) {
      setError(err);
    }
  };

  const createFoodLog = async (food_id, meal_type, quantity) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/user/create-diet-plan-item`,
        {
          food_id,
          meal_type,
          quantity,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
      }
      return response.data;
    } catch (err) {
      setError(err);
    }
  };
  const createFoodItem = async (food) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/user/create-food-item`,
        {
          name: food.name,
          calories: parseInt(food.calories),
          fats: parseInt(food.fats),
          carbs: parseInt(food.carbs),
          protein: parseInt(food.protein),
          serving_size_gm: parseInt(food.serving_size_gm),
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
      }
      return response.data;
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message); // Show backend message
      } else {
        toast.error("Something went wrong. Please try again.");
      }

      setError(error);
    }
  };

  const suggestDietPlan = async (showToast = true) => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/common/suggest-diet-plan`,
        {
          withCredentials: true,
        }
      );
      if (response.data.success && showToast) {
        toast.success("Diet Plan generated successfully");
      }
      if (!response.data.success && showToast) {
        toast.error("Something went wrong. Please try again.");
      }
      return response.data;
    } catch (err) {
      setError(err);
    }
  };

  return {
    dietPlanItems,
    foodItems,
    loading,
    error,

    fetchDietPlanItems,
    getFoodItems,
    createFoodLog,
    suggestDietPlan,
    createFoodItem,
    updateDietPlanItem,
    deleteDietPlanItem,
  };
};

export default useDietPlan;
