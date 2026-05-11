import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";

const useProfilePic = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfilePic = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${apiUrl}/api/user/get-profilepic`);
      setProfilePicUrl(response.data.profilePic);
    } catch (err) {
      console.error("Error fetching profile picture:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfilePic();
  }, []);

  return { profilePicUrl, loading, error, refetch: fetchProfilePic };
};

export default useProfilePic;
