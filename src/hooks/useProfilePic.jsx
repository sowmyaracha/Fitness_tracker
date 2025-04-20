import { useEffect, useState } from "react";

const useProfilePic = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfilePic = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${apiUrl}/api/user/get-profilepic`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setProfilePicUrl(data.profilePic); // assuming response is { url: "http://..." }
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

  return {
    profilePicUrl,
    loading,
    error,
    refetch: fetchProfilePic,
  };
};

export default useProfilePic;
