import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

const useManageActivity = () => {
  const [activities, setActivities] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchActivities = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/admin/get-activities`, {
        withCredentials: true,
      });
      setActivities(res.data.activities);
    } catch (error) {
      console.error("Error fetching activities:", error);
      toast.error("Failed to fetch activities");
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
    fetchActivities();
    fetchUsers();
  }, []);

  const createActivity = async (data) => {
    try {
      const res = await axios.post(
        `${apiUrl}/api/admin/create-activity`,
        data,
        {
          withCredentials: true,
        }
      );
      setActivities((prev) => [...prev, res.data.activity]);
      toast.success("Activity created successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create activity");
    }
  };

  const updateActivity = async (id, data) => {
    try {
      const res = await axios.put(
        `${apiUrl}/api/admin/update-activity/${id}`,
        data,
        { withCredentials: true }
      );
      setActivities((prev) =>
        prev.map((a) => (a.id === id ? res.data.activity : a))
      );
      toast.success("Activity updated successfully!");
    } catch (error) {
      toast.error("Failed to update activity");
    }
  };

  const deleteActivity = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/admin/delete-activity/${id}`, {
        withCredentials: true,
      });
      setActivities((prev) => prev.filter((a) => a.id !== id));
      toast.success("Activity deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete activity");
    }
  };

  return {
    activities,
    users,
    createActivity,
    updateActivity,
    deleteActivity,
    fetchActivities,
    setActivities,
  };
};

export default useManageActivity;
