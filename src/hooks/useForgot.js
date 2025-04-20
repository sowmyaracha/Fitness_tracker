import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const useForgot = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const forgotPassword = async (email) => {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      if (data.success) {
        toast.success(data.message);
        navigate("/auth/reset-password");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const resetPassword = async (token, newPassword) => {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      if (data.success) {
        toast.success(data.message);
        navigate("/auth/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, forgotPassword, resetPassword };
};
export default useForgot;
