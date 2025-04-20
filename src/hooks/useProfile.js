import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useProfile = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const updateProfile = async (submittedData) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/common/update-profile`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submittedData),
      });

      const data = await response.json();

      console.log("Data=", data);
      if (data.error) {
        throw new Error(data.error);
      }

      if (data.success) {
        toast.success(data.message);
        // Redirect to the dashboard
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const getProfile = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/common/get-profile`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      console.log("Data=", data);
      if (data.error) {
        throw new Error(data.error);
      }
      return data;
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };
  return { isLoading, updateProfile, getProfile };
};

export default useProfile;
