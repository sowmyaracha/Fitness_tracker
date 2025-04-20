// import { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const apiUrl = import.meta.env.VITE_API_URL;

// const useManageUsers = () => {
//   const [users, setUsers] = useState([]);

//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get(`${apiUrl}/api/admin/get-user-details`, {
//         withCredentials: true,
//       });
//       setUsers(res.data.users);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       toast.error("Failed to fetch users");
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const createUser = async (data) => {
//     try {
//       const res = await axios.post(
//         `${apiUrl}/api/admin/create-user-details`,
//         data,
//         {
//           withCredentials: true,
//         }
//       );
//       setUsers((prev) => [...prev, res.data.user]);
//       toast.success("User created successfully!");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to create user");
//     }
//   };

//   const updateUser = async (id, data) => {
//     try {
//       const res = await axios.put(
//         `${apiUrl}/api/admin/modify-user-details/${id}`,
//         data,
//         {
//           withCredentials: true,
//         }
//       );
//       setUsers((prev) =>
//         prev.map((user) => (user.id === id ? res.data.user : user))
//       );
//       toast.success("User updated successfully!");
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to update user");
//     }
//   };

//   const deleteUser = async (id) => {
//     try {
//       await axios.delete(`${apiUrl}/api/admin/delete-users/${id}`, {
//         withCredentials: true,
//       });
//       setUsers((prev) =>
//         prev.map((user) =>
//           user.id === id ? { ...user, status: "INACTIVE" } : user
//         )
//       );

//       toast.success("User deleted successfully!");
//     } catch (error) {
//       toast.error("Failed to delete user");
//     }
//   };

//   return {
//     users,
//     createUser,
//     updateUser,
//     deleteUser,
//     fetchUsers,
//     setUsers,
//   };
// };

// export default useManageUsers;
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

const useManageUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/admin/get-user-details`, {
        withCredentials: true,
      });
      setUsers(res.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const createUser = async (data) => {
    try {
      const res = await axios.post(
        `${apiUrl}/api/admin/create-user-details`,
        data,
        {
          withCredentials: true,
        }
      );
      setUsers((prev) => [...prev, res.data.user]);
      toast.success("User created successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create user");
    }
  };

  const updateUser = async (id, data) => {
    try {
      const res = await axios.put(
        `${apiUrl}/api/admin/modify-user-details/${id}`,
        data,
        {
          withCredentials: true,
        }
      );
      setUsers((prev) =>
        prev.map((user) => (user.id === id ? res.data.user : user))
      );
      toast.success("User updated successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update user");
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/admin/delete-users/${id}`, {
        withCredentials: true,
      });
      setUsers((prev) =>
        prev.map((user) =>
          user.id === id ? { ...user, status: "INACTIVE" } : user
        )
      );

      toast.success("User deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  return {
    users,
    createUser,
    updateUser,
    deleteUser,
    fetchUsers,
    setUsers,
  };
};

export default useManageUsers;
