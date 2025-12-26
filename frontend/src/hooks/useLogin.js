import { useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const useLogin = () => {
  const [loading, setLoading] = useState(false);


  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      if (data.success) {
        sessionStorage.setItem("userId", data.userId);
       
        toast.success(data.message);
        // window.location.href = `/auth/verify?userId=${data.userId}`;
        navigate(`/auth/verify`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (otp) => {
    setLoading(true);
    try {
      const userId = sessionStorage.getItem("userId");
      if (!userId) throw new Error("User ID is missing. Please login again.");

      const res = await fetch(`${apiUrl}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp, userId }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      if (data.success) {
        toast.success(data.message);

        localStorage.setItem("name", data.user.name);
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("user", JSON.stringify(data.user));
        setAuth({
          role: data.role,
          user: data.user,
          token: data.token,
        });
        Cookies.set("token", data.token);
        sessionStorage.removeItem("userId"); // Clean up after success
        navigate("/dashboard/" + data.role);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login, verifyOTP };
};

export default useLogin;
