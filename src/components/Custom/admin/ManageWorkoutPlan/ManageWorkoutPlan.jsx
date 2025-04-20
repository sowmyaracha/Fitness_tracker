import React, { useEffect, useState } from "react";
import useManageWorkoutPlanItem from "../../../../hooks/admin/useManageWorkoutPlanItem";

function ManageWorkoutPlan() {
  const {
    workoutPlans,
    users,
    activities,
    createWorkoutPlanItem,
    updateWorkoutPlanItem,
    deleteWorkoutPlanItem,
    fetchWorkoutPlans,
    setWorkoutPlans, // Add this to directly update the state
  } = useManageWorkoutPlanItem();

  const [formData, setFormData] = useState({
    id: null,
    workout_plan_id: "",
    activity: "",
    status: "",
    duration: "",
    user: "",
    plan_type: "USER",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // useEffect(() => {
  //   (function () {
  //     "use strict";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleReset = (e) => {
    e.preventDefault();
    setFormData({
      id: null,
      workout_plan_id: "",
      activity: "",
      status: "",
      duration: "",
      user: "",
      plan_type: "USER",
    });
    setIsEditMode(false);
    const form = document.querySelector(".needs-validation");
    if (form) form.classList.remove("was-validated");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }
    const requiredFields = {
      workout_plan_id: parseInt(formData.workout_plan_id),
      activity_id: activities.find(
        (activity) => activity.name === formData.activity
      )?.id,
      duration: parseInt(formData.duration),
      status: formData.status.toUpperCase(),
      user_id: users.find((user) => user.name === formData.user)?.id,
      plan_type: formData.plan_type,
    };

    if (isEditMode) {
      const updatedPlan = await updateWorkoutPlanItem(
        formData.id,
        requiredFields
      );
      await fetchWorkoutPlans();
    } else {
      await createWorkoutPlanItem(requiredFields);
      await fetchWorkoutPlans();
    }

    setFormData({
      id: null,
      workout_plan_id: "",
      activity: "",
      status: "",
      duration: "",
      user: "",
      plan_type: "USER",
    });
    setIsEditMode(false);
  };

  const handleEdit = (plan) => {
    setFormData({
      id: plan.id,
      workout_plan_id: plan.workout_plan_id,
      activity:
        activities.find((activity) => activity.id === plan.activity_id)?.name ||
        "",
      status: plan.status,
      duration: plan.duration.toString(),
      user: users.find((user) => user.id === plan.user_id)?.name || "",
      plan_type: plan.plan_type,
    });
    setIsEditMode(true);
  };

  const handleDelete = async (id) => {
    await deleteWorkoutPlanItem(id);
    setWorkoutPlans((prevWorkoutPlans) =>
      prevWorkoutPlans.filter((plan) => plan.id !== id)
    );
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(workoutPlans.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <nav className="d-flex justify-content-end">
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={`page-item ${currentPage === number ? "active" : ""}`}
            >
              <a
                onClick={() => handlePageChange(number)}
                className="page-link"
                href="#!"
              >
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  };

  const currentWorkoutPlans = workoutPlans.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <div className="content-body">
        <div className="container-fluid">
          <div className="card card-bx m-b30">
            <div className="card-header">
              <h6 className="title">Manage Workout Plan</h6>
            </div>
            <div className="card-body">
              <div className="basic-form">
                <form
                  className="needs-validation"
                  noValidate
                  onSubmit={handleSubmit}
                >
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Workout Plan ID</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Workout Plan ID"
                        required
                        name="workout_plan_id"
                        value={formData.workout_plan_id}
                        onChange={handleChange}
                        disabled={isEditMode}
                      />
                      <div className="invalid-feedback">
                        Please enter Workout Plan ID.
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Activity</label>
                      <select
                        name="activity"
                        className="form-control"
                        required
                        value={formData.activity}
                        onChange={handleChange}
                      >
                        <option value="" disabled>
                          Choose Activity
                        </option>
                        {activities.map((activity) => (
                          <option key={activity.id}>{activity.name}</option>
                        ))}
                      </select>
                      <div className="invalid-feedback">
                        Please select Activity.
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Status</label>
                      <select
                        name="status"
                        className="form-control"
                        required
                        value={formData.status}
                        onChange={handleChange}
                      >
                        <option value="" disabled>
                          Choose Status
                        </option>
                        <option>COMPLETED</option>
                        <option>PENDING</option>
                      </select>
                      <div className="invalid-feedback">
                        Please select Status.
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Duration (mins)</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Duration"
                        required
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">
                        Please enter Duration.
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">User</label>
                      <select
                        name="user"
                        className="form-control"
                        required
                        value={formData.user}
                        onChange={handleChange}
                        disabled={isEditMode}
                      >
                        <option value="" disabled>
                          Choose User
                        </option>
                        {users.map((user) => (
                          <option key={user.id}>{user.name}</option>
                        ))}
                      </select>
                      <div className="invalid-feedback">
                        Please select User.
                      </div>
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
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Workout Plan Items</h4>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-responsive-md">
                      <thead>
                        <tr>
                          <th>Workout Plan Item ID</th>
                          <th>Workout Plan ID</th>
                          <th>Activity</th>
                          <th>Status</th>
                          <th>Duration (mins)</th>
                          <th>User</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* {currentWorkoutPlans.map((plan) => (
                          <tr key={plan.id}>
                            <td>
                              <strong className="text-black">
                                {String(plan.id).padStart(2, "0")}
                              </strong>
                            </td>
                            <td>{plan.workout_plan_id}</td>
                            <td>{plan.activity_name}</td>
                            <td>{plan.status}</td>
                            <td>{plan.duration}</td>
                            <td>{plan.user_name}</td>
                            <td>
                              <div className="dropdown">
                                <button
                                  type="button"
                                  className="btn btn-success light sharp"
                                  data-bs-toggle="dropdown"
                                >
                                  <svg
                                    width="20px"
                                    height="20px"
                                    viewBox="0 0 24 24"
                                    version="1.1"
                                  >
                                    <g
                                      stroke="none"
                                      strokeWidth={1}
                                      fill="none"
                                      fillRule="evenodd"
                                    >
                                      <rect
                                        x={0}
                                        y={0}
                                        width={24}
                                        height={24}
                                      />
                                      <circle
                                        fill="#000000"
                                        cx={5}
                                        cy={12}
                                        r={2}
                                      />
                                      <circle
                                        fill="#000000"
                                        cx={12}
                                        cy={12}
                                        r={2}
                                      />
                                      <circle
                                        fill="#000000"
                                        cx={19}
                                        cy={12}
                                        r={2}
                                      />
                                    </g>
                                  </svg>
                                </button>
                                <div className="dropdown-menu">
                                  <a
                                    className="dropdown-item"
                                    href="#"
                                    onClick={() => handleEdit(plan)}
                                  >
                                    Edit
                                  </a>
                                  <a
                                    className="dropdown-item"
                                    href="#"
                                    onClick={() => handleDelete(plan.id)}
                                  >
                                    Delete
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))} */}
                        {currentWorkoutPlans
                          .filter((plan) => plan && plan.id) // <- ensures 'plan' exists and has an 'id'
                          .map((plan) => (
                            <tr key={plan.id}>
                              <td>
                                <strong className="text-black">
                                  {String(plan.id).padStart(2, "0")}
                                </strong>
                              </td>
                              <td>{plan.workout_plan_id}</td>
                              <td>{plan.activity_name}</td>
                              <td>{plan.status}</td>
                              <td>{plan.duration}</td>
                              <td>{plan.user_name}</td>
                              <td>
                                <div className="dropdown">
                                  <button
                                    type="button"
                                    className="btn btn-success light sharp"
                                    data-bs-toggle="dropdown"
                                  >
                                    ⋮
                                  </button>
                                  <div className="dropdown-menu">
                                    <a
                                      className="dropdown-item"
                                      onClick={() => handleEdit(plan)}
                                    >
                                      Edit
                                    </a>
                                    <a
                                      className="dropdown-item"
                                      onClick={() => handleDelete(plan.id)}
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
                  {renderPagination()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageWorkoutPlan;
