import axios from "../utils/axiosInstance";
import { useState } from "react";
import { toast } from "react-toastify";

const useProfile = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [isLoading, setIsLoading] = useState(false);

  const updateProfile = async (submittedData) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/api/common/update-profile`, submittedData);
      const data = response.data;
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getProfile = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/common/get-profile`);
      return response.data;
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  return { isLoading, updateProfile, getProfile };
};

export default useProfile;
