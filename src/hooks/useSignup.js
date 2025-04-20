import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const signup = async (dataToSend) => {
    const { email, password, firstname, lastname, gender, dob, profilePic } =
      dataToSend;
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          firstname,
          lastname,
          gender,
          dob,
          profilePic,
        }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      if (data.success) {
        toast.success(data.message);
        navigate("/auth/verify-email"); // Redirect to verify-email page
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyEmail = async (code) => {
    setLoading(true);

    try {
      const res = await fetch(`${apiUrl}/api/auth/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();
      console.log("res from verify email", data);
      if (data.error) {
        throw new Error(data.error);
      }

      if (data.success) {
        toast.success(data.message);
        navigate("/auth/login"); // Redirect to login page
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup, verifyEmail };
};

export default useSignup;
