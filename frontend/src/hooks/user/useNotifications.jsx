import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/user/get-user-notifications`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setNotifications(res.data.notifications);
        setUnreadCount(res.data.notifications.length);
      }
    } catch (err) {
      console.error("Failed to fetch notifications", err);
      toast.error("Failed to fetch notifications");
    }
  };

  const markAllAsRead = async () => {
    try {
      const res = await axios.put(
        `${apiUrl}/api/user/mark-notifications-as-read`,
        {},
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
        setUnreadCount(0);
      }
    } catch (err) {
      console.error("Failed to mark notifications as read", err);
      toast.error("Failed to mark notifications as read");
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return {
    notifications,
    unreadCount,
    fetchNotifications,
    markAllAsRead,
  };
};

export default useNotifications;
