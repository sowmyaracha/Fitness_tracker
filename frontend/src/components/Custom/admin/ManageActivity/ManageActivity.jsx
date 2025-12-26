import React, { useState, useEffect } from "react";
import useManageActivity from "../../../../hooks/admin/useManageActivity";
import { de } from "date-fns/locale";

function ManageActivity() {
  const {
    activities,
    users,
    createActivity,
    updateActivity,
    deleteActivity,
    fetchActivities,
    setActivities,
  } = useManageActivity();

  const [formData, setFormData] = useState({
    id: null,
    user_id: "",
    name: "",
    unit: "",
    calories_per_kg: "",
    duration: "",
  });

  const [isEditMode, setIsEditMode] = useState(false);

  // useEffect(() => {
  //   (function () {
  //     const forms = document.querySelectorAll(".needs-validation");
  //     Array.prototype.slice.call(forms).forEach(function (form) {
  //       form.addEventListener(
  //         "submit",
  //         function (event) {
  //           if (!form.checkValidity()) {
  //             event.preventDefault();
  //             event.stopPropagation();
  //           }
  //           form.classList.add("was-validated");
  //         },
  //         false
  //       );
  //     });
  //   })();
  // }, []);
  const handleReset = (e) => {
    e.preventDefault();
    setFormData({
      id: null,
      user_id: "",
      name: "",
      unit: "",
      calories_per_kg: "",
      duration: "",
    });
    setIsEditMode(false);
    const form = document.querySelector(".needs-validation");
    if (form) form.classList.remove("was-validated");
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }
    const activityData = {
      name: formData.name,
      duration: parseInt(formData.duration),
      calories_per_kg: parseFloat(formData.calories_per_kg),
      user_id: parseInt(users.find((u) => u.name === formData.user_id)?.id),
    };

    if (isEditMode) {
      await updateActivity(formData.id, activityData);
    } else {
      await createActivity(activityData);
    }

    setFormData({
      id: null,
      user_id: "",
      name: "",
      unit: "",
      calories_per_kg: "",
      duration: "",
    });
    setIsEditMode(false);
    await fetchActivities();
  };

  const handleEdit = (activity) => {
    const user = users.find((u) => u.id === activity.user_id);
    setFormData({
      id: activity.id,
      user_id: user?.name || "",
      name: activity.name,
      unit: activity.unit || "",
      calories_per_kg: activity.calories_per_kg,
      duration: activity.duration,
    });
    setIsEditMode(true);
  };

  const handleDelete = async (id) => {
    await deleteActivity(id);
  };

  return (
    <div className="content-body">
      <div className="container-fluid">
        <div className="card card-bx m-b30">
          <div className="card-header">
            <h6 className="title">Manage Activity</h6>
          </div>
          <div className="card-body">
            <form
              className="needs-validation"
              noValidate
              onSubmit={handleSubmit}
            >
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">User</label>
                  <select
                    name="user_id"
                    className="form-control"
                    required
                    value={formData.user_id}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Choose User
                    </option>
                    {users.map((user) => (
                      <option key={user.id}>{user.name}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Activity Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter Activity Name"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Duration (mins)</label>
                  <input
                    type="number"
                    name="duration"
                    className="form-control"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Calories / kg</label>
                  <input
                    type="number"
                    name="calories_per_kg"
                    className="form-control"
                    value={formData.calories_per_kg}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleReset}
                >
                  Reset
                </button>
                <button type="submit" className="btn btn-primary">
                  {isEditMode ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Activity Items</h4>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-responsive-md">
                <thead>
                  <tr>
                    <th>Activity ID</th>
                    <th>User</th>
                    <th>Activity Name</th>
                    <th>Duration</th>
                    <th>Calories / kg</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity) => (
                    <tr key={activity.id}>
                      <td>{activity.id}</td>
                      <td>
                        {users.find((u) => u.id === activity.user_id)?.name ||
                          "System"}
                      </td>
                      <td>{activity.name}</td>
                      <td>{activity.duration}</td>
                      <td>{activity.calories_per_kg}</td>
                      <td>
                        <div className="dropdown">
                          <button
                            className="btn btn-success light sharp"
                            data-bs-toggle="dropdown"
                          >
                            ⋮
                          </button>
                          <div className="dropdown-menu">
                            <a
                              className="dropdown-item"
                              onClick={() => handleEdit(activity)}
                            >
                              Edit
                            </a>
                            <a
                              className="dropdown-item"
                              onClick={() => handleDelete(activity.id)}
                            >
                              Delete
                            </a>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ManageActivity;
