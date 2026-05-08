import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

const useManageWorkoutPlanItem = () => {
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [users, setUsers] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, activityResponse, workoutPlanResponse] =
          await Promise.all([
            axios.get(`${apiUrl}/api/admin/get-user-name-list`, {
              withCredentials: true,
            }),
            axios.get(`${apiUrl}/api/user/get-activities`, {
              withCredentials: true,
            }),
            axios.get(`${apiUrl}/api/admin/get-workout-plan-items`, {
              withCredentials: true,
            }),
          ]);

        setUsers(userResponse.data.userNameList);
        setActivities(activityResponse.data.activities);
        setWorkoutPlans(workoutPlanResponse.data.workoutPlanItems);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data. Please try again later.");
      }
    };

    fetchData();
  }, []);
  const fetchWorkoutPlans = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/admin/get-workout-plan-items`,
        {
          withCredentials: true,
        }
      );
      setWorkoutPlans(response.data.workoutPlanItems);
    } catch (error) {
      console.error("Error fetching workout plans:", error);
      toast.error("Error fetching workout plans. Please try again later.");
    }
  };
  const createWorkoutPlanItem = async (formData) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/admin/create-workout-plan-item`,
        formData,
        { withCredentials: true }
      );
      setWorkoutPlans((prevWorkoutPlans) => [
        ...prevWorkoutPlans,
        response.data.workoutPlanItem,
      ]);
      toast.success("Workout plan item created successfully!");
    } catch (error) {
      console.error("Error creating workout plan item:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error creating workout plan item. Please try again.");
      }
    }
  };

  const updateWorkoutPlanItem = async (id, formData) => {
    try {
      const response = await axios.put(
        `${apiUrl}/api/admin/update-workout-plan-item/${id}`,
        formData,
        { withCredentials: true }
      );
      setWorkoutPlans((prevWorkoutPlans) =>
        prevWorkoutPlans.map((plan) =>
          plan.id === id ? response.data.workoutPlanItem : plan
        )
      );
      toast.success("Workout plan item updated successfully!");
    } catch (error) {
      console.error("Error updating workout plan item:", error);
      toast.error("Error updating workout plan item. Please try again.");
    }
  };

  const deleteWorkoutPlanItem = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/admin/delete-workout-plan-item/${id}`, {
        withCredentials: true,
      });
      setWorkoutPlans((prevWorkoutPlans) =>
        prevWorkoutPlans.filter((plan) => plan.id !== id)
      );
      toast.success("Workout plan item deleted successfully!");
    } catch (error) {
      console.error("Error deleting workout plan item:", error);
      toast.error("Error deleting workout plan item. Please try again.");
    }
  };

  return {
    workoutPlans,
    users,
    activities,
    setWorkoutPlans,
    createWorkoutPlanItem,
    updateWorkoutPlanItem,
    deleteWorkoutPlanItem,
    fetchWorkoutPlans
  };
};

export default useManageWorkoutPlanItem;
