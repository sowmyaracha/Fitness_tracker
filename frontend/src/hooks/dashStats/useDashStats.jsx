import axios from "axios";
import { useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;
const useDashStats = () => {
  const [adminDashboardStats, setAdminDashboardStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userDashboardStats, setUserDashboardStats] = useState(null);
  const [vendorDashboardStats, setVendorDashboardStats] = useState(null);
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const fetchAdminDashStats = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${apiUrl}/api/admin/admin-dashboard`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setAdminDashboardStats(response.data);
    } catch (err) {
      setError(err.response ? err.response.data : "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  const fetchUserDashStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${apiUrl}/api/user/get-user-dashboard`,
        {
          withCredentials: true,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setUserDashboardStats(response.data);
    } catch (err) {
      setError(err.response ? err.response.data : "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  const fetchVendorDashStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${apiUrl}/api/user/get-vendor-dashboard`,
        {
          withCredentials: true,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setVendorDashboardStats(response.data);
    } catch (err) {
      setError(err.response ? err.response.data : "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const suggestProducts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/user/suggest-products`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setSuggestedProducts(response.data.suggestedProducts);
    } catch (error) {
      console.error("Error fetching suggested products:", error);
      throw error;
    }
  };
  return {
    adminDashboardStats,
    userDashboardStats,
    vendorDashboardStats,
    loading,
    error,
    fetchAdminDashStats,
    fetchUserDashStats,
    fetchVendorDashStats,
    suggestedProducts,
    suggestProducts,
  };
};

export default useDashStats;
