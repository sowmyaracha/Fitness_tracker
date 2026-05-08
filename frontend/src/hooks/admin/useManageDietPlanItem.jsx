// import { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const apiUrl = import.meta.env.VITE_API_URL;

// const useManageDietPlanItem = () => {
//   const [dietPlans, setDietPlans] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [foodItems, setFoodItems] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [userResponse, foodResponse, dietPlanResponse] =
//           await Promise.all([
//             axios.get(`${apiUrl}/api/admin/get-user-name-list`, {
//               withCredentials: true,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//             }),
//             axios.get(`${apiUrl}/api/user/get-food-catalogue`, {
//               withCredentials: true,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//             }),
//             axios.get(`${apiUrl}/api/admin/get-diet-plan-items`, {
//               withCredentials: true,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//             }),
//           ]);

//         setUsers(userResponse.data.userNameList);
//         setFoodItems(foodResponse.data.foods);
//         setDietPlans(dietPlanResponse.data.dietPlanItems);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const createDietPlanItem = async (formData) => {
//     try {
//       const response = await axios.post(
//         `${apiUrl}/api/admin/create-diet-plan-item`,
//         formData,
//         { withCredentials: true,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
//       );
//       setDietPlans((prevDietPlans) => [
//         ...prevDietPlans,
//         response.data.dietPlanItem,
//       ]);
//     } catch (error) {
//       console.error("Error creating diet plan item:", error);
//     }
//   };

//   const updateDietPlanItem = async (id, formData) => {
//     try {
//       const response = await axios.put(
//         `${apiUrl}/api/admin/update-diet-plan-item/${id}`,
//         formData,
//         { withCredentials: true,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
//       );
//       setDietPlans((prevDietPlans) =>
//         prevDietPlans.map((plan) =>
//           plan.id === id ? response.data.dietPlanItem : plan
//         )
//       );
//     } catch (error) {
//       console.error("Error updating diet plan item:", error);
//     }
//   };

//   const deleteDietPlanItem = async (id) => {
//     try {
//       await axios.delete(`${apiUrl}/api/admin/delete-diet-plan-item/${id}`, {
//         withCredentials: true,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setDietPlans((prevDietPlans) =>
//         prevDietPlans.filter((plan) => plan.id !== id)
//       );
//     } catch (error) {
//       console.error("Error deleting diet plan item:", error);
//     }
//   };

//   return {
//     dietPlans,
//     users,
//     foodItems,
//     createDietPlanItem,
//     updateDietPlanItem,
//     deleteDietPlanItem,
//   };
// };

// export default useManageDietPlanItem;
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

const useManageDietPlanItem = () => {
  const [dietPlans, setDietPlans] = useState([]);
  const [users, setUsers] = useState([]);
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, foodResponse, dietPlanResponse] =
          await Promise.all([
            axios.get(`${apiUrl}/api/admin/get-user-name-list`, {
              withCredentials: true,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            }),
            axios.get(`${apiUrl}/api/user/get-food-catalogue`, {
              withCredentials: true,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            }),
            axios.get(`${apiUrl}/api/admin/get-diet-plan-items`, {
              withCredentials: true,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            }),
          ]);

        setUsers(userResponse.data.userNameList);
        setFoodItems(foodResponse.data.foods);
        setDietPlans(dietPlanResponse.data.dietPlanItems);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data. Please try again later.");
      }
    };

    fetchData();
  }, []);

  const createDietPlanItem = async (formData) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/admin/create-diet-plan-item`,
        formData,
        { withCredentials: true,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setDietPlans((prevDietPlans) => [
        ...prevDietPlans,
        response.data.dietPlanItem,
      ]);
      toast.success("Diet plan item created successfully!");
    } catch (error) {
      console.error("Error creating diet plan item:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error creating diet plan item. Please try again.");
      }
    }
  };

  const updateDietPlanItem = async (id, formData) => {
    try {
      const response = await axios.put(
        `${apiUrl}/api/admin/update-diet-plan-item/${id}`,
        formData,
        { withCredentials: true,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setDietPlans((prevDietPlans) =>
        prevDietPlans.map((plan) =>
          plan.id === id ? response.data.dietPlanItem : plan
        )
      );
      toast.success("Diet plan item updated successfully!");
    } catch (error) {
      console.error("Error updating diet plan item:", error);
      toast.error("Error updating diet plan item. Please try again.");
    }
  };

  const deleteDietPlanItem = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/admin/delete-diet-plan-item/${id}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setDietPlans((prevDietPlans) =>
        prevDietPlans.filter((plan) => plan.id !== id)
      );
      toast.success("Diet plan item deleted successfully!");
    } catch (error) {
      console.error("Error deleting diet plan item:", error);
      toast.error("Error deleting diet plan item. Please try again.");
    }
  };

  return {
    dietPlans,
    users,
    foodItems,
    createDietPlanItem,
    updateDietPlanItem,
    deleteDietPlanItem,
  };
};

export default useManageDietPlanItem;
