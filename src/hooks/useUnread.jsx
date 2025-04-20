import { useState, useEffect } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
const useUnread = (userId) => {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnreadMessages = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/api/common/unread-messages-count`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        const data = await response.json();

        setUnreadCount(data.unreadMessagesCount);
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
