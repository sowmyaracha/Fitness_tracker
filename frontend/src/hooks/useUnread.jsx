import { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";

const apiUrl = import.meta.env.VITE_API_URL;

const useUnread = (userId) => {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnreadMessages = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/common/unread-messages-count`);
        setUnreadCount(response.data.unreadMessagesCount);
      } catch (error) {
        console.error("Failed to fetch unread messages count", error);
      }
    };

    if (userId) {
      fetchUnreadMessages();
    }
  }, [userId]);

  return unreadCount;
};

export default useUnread;
