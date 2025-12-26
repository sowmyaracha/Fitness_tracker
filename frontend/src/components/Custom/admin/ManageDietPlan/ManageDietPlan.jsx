// import React, { useEffect, useState } from "react";
// import useManageDietPlanItem from "../../../../hooks/admin/useManageDietPlanItem";

// function ManageDietPlan() {
//   const {
//     dietPlans,
//     users,
//     foodItems,
//     createDietPlanItem,
//     updateDietPlanItem,
//     deleteDietPlanItem,
//   } = useManageDietPlanItem();
//   const [formData, setFormData] = useState({
//     id: null,
//     diet_plan_id: "",
//     user: "",
//     quantity: "",
//     mealType: "",
//     status: "",
//     foodItem: "",
//     plan_type: "USER",
//   });
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   useEffect(() => {
//     (function () {
//       "use strict";
//       const forms = document.querySelectorAll(".needs-validation");
//       Array.prototype.slice.call(forms).forEach(function (form) {
//         form.addEventListener(
//           "submit",
//           function (event) {
//             if (!form.checkValidity()) {
//               event.preventDefault();
//               event.stopPropagation();
//             }
//             form.classList.add("was-validated");
//           },
//           false
//         );
//       });
//     })();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const requiredFields = {
//       diet_plan_id: parseInt(formData.diet_plan_id),
//       meal_type: formData.mealType.toUpperCase(),
//       food_id: foodItems.find((food) => food.name === formData.foodItem)?.id,
//       quantity: parseFloat(formData.quantity),
//       user_id: users.find((user) => user.name === formData.user)?.id,
//       plan_type: formData.plan_type,
//       status: formData.status.toUpperCase(),
//     };

//     if (isEditMode) {
//       // requiredFields.status = formData.status.toUpperCase();
//       console.log(requiredFields);
//       await updateDietPlanItem(formData.id, requiredFields);
//     } else {
//       await createDietPlanItem(requiredFields);
//     }

//     setFormData({
//       id: null,
//       diet_plan_id: "",
//       user: "",
//       quantity: "",
//       mealType: "",
//       status: "",
//       foodItem: "",
//       plan_type: "USER",
//       created_by_id: 1,
//     });
//     setIsEditMode(false);
//   };

//   const handleEdit = (plan) => {
//     setFormData({
//       id: plan.id,
//       diet_plan_id: plan.diet_plan_id,
//       user: users.find((user) => user.id === plan.user_id)?.name || "",
//       quantity: plan.quantity.toString(),
//       mealType: plan.meal_type.toLowerCase(),
//       status: plan.status.toLowerCase(),
//       foodItem: foodItems.find((food) => food.id === plan.food_id)?.name || "",
//       plan_type: plan.plan_type,
//       created_by_id: plan.created_by_id,
//     });
//     setIsEditMode(true);
//   };

//   const handleDelete = (id) => {
//     deleteDietPlanItem(id);
//   };

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const renderPagination = () => {
//     const pageNumbers = [];
//     for (let i = 1; i <= Math.ceil(dietPlans.length / itemsPerPage); i++) {
//       pageNumbers.push(i);
//     }

//     return (
//       <nav className="d-flex justify-content-end">
//         <ul className="pagination">
//           {pageNumbers.map((number) => (
//             <li
//               key={number}
//               className={`page-item ${currentPage === number ? "active" : ""}`}
//             >
//               <a
//                 onClick={() => handlePageChange(number)}
//                 className="page-link"
//                 href="#!"
//               >
//                 {number}
//               </a>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     );
//   };

//   const currentDietPlans = dietPlans.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   return (
//     <div>
//       <div className="content-body">
//         <div className="container-fluid">
//           <div className="card card-bx m-b30">
//             <div className="card-header">
//               <h6 className="title">Manage Diet Plan</h6>
//             </div>
//             <div className="card-body">
//               <div className="basic-form">
//                 <form
//                   className="needs-validation"
//                   noValidate
//                   onSubmit={handleSubmit}
//                 >
//                   <div className="row">
//                     <div className="col-md-6 mb-3">
//                       <label className="form-label">Diet Plan ID</label>
//                       <input
//                         type="number"
//                         className="form-control"
//                         placeholder="Enter Diet Plan ID"
//                         required
//                         name="diet_plan_id"
//                         value={formData.diet_plan_id}
//                         onChange={handleChange}
//                       />
//                       <div className="invalid-feedback">
//                         Please enter Diet Plan ID.
//                       </div>
//                     </div>
//                     <div className="col-md-6 mb-3">
//                       <label className="form-label">User</label>
//                       <select
//                         name="user"
//                         className="form-control"
//                         required
//                         value={formData.user}
//                         onChange={handleChange}
//                       >
//                         <option value="" disabled>
//                           Choose User
//                         </option>
//                         {users.map((user) => (
//                           <option key={user.id}>{user.name}</option>
//                         ))}
//                       </select>
//                       <div className="invalid-feedback">
//                         Please select User.
//                       </div>
//                     </div>
//                     <div className="col-md-6 mb-3">
//                       <label className="form-label">Quantity</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Enter Quantity"
//                         required
//                         name="quantity"
//                         value={formData.quantity}
//                         onChange={handleChange}
//                       />
//                       <div className="invalid-feedback">
//                         Please enter Quantity.
//                       </div>
//                     </div>
//                     <div className="col-md-6 mb-3">
//                       <label className="form-label">Meal Type</label>
//                       <select
//                         name="mealType"
//                         className="form-control"
//                         required
//                         value={formData.mealType}
//                         onChange={handleChange}
//                       >
//                         <option value="" disabled>
//                           Choose Meal Type
//                         </option>
//                         <option>Breakfast</option>
//                         <option>Lunch</option>
//                         <option>Dinner</option>
//                         <option>Snack</option>
//                       </select>
//                       <div className="invalid-feedback">
//                         Please select Meal Type.
//                       </div>
//                     </div>
//                     <div className="col-md-6 mb-3">
//                       <label className="form-label">Status</label>
//                       <select
//                         name="status"
//                         className="form-control"
//                         required
//                         value={formData.status}
//                         onChange={handleChange}
//                       >
//                         <option value="" disabled>
//                           Choose Status
//                         </option>
//                         <option>Completed</option>
//                         <option>Pending</option>
//                       </select>
//                       <div className="invalid-feedback">
//                         Please select Status.
//                       </div>
//                     </div>
//                     <div className="col-md-6 mb-3">
//                       <label className="form-label">Food Item</label>
//                       <select
//                         name="foodItem"
//                         className="form-control"
//                         required
//                         value={formData.foodItem}
//                         onChange={handleChange}
//                       >
//                         <option value="" disabled>
//                           Choose Food Item
//                         </option>
//                         {foodItems.map((food) => (
//                           <option key={food.id}>{food.name}</option>
//                         ))}
//                       </select>
//                       <div className="invalid-feedback">
//                         Please select Food Item.
//                       </div>
//                     </div>
//                   </div>

//                   <div className="d-flex justify-content-end">
//                     <button type="submit" className="btn btn-primary">
//                       {isEditMode ? "Edit" : "Add"}
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>

//           <div className="row">
//             <div className="col-lg-12">
//               <div className="card">
//                 <div className="card-header">
//                   <h4 className="card-title">Diet Plan Items</h4>
//                 </div>
//                 <div className="card-body">
//                   <div className="table-responsive">
//                     <table className="table table-responsive-md">
//                       <thead>
//                         <tr>
//                           <th style={{ width: 80 }}>#</th>
//                           <th>Diet Plan ID</th>
//                           <th>User</th>
//                           <th>Quantity</th>
//                           <th>Meal Type</th>
//                           <th>Status</th>
//                           <th>Food Item</th>
//                           <th>Action</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {currentDietPlans.map((plan) => (
//                           <tr key={plan.id}>
//                             <td>
//                               <strong className="text-black">
//                                 {String(plan.id).padStart(2, "0")}
//                               </strong>
//                             </td>
//                             <td>{plan.diet_plan_id}</td>
//                             <td>
//                               {
//                                 users.find((user) => user.id === plan.user_id)
//                                   ?.name
//                               }
//                             </td>
//                             <td>{plan.quantity}</td>
//                             <td>{plan.meal_type}</td>
//                             <td>{plan.status}</td>
//                             <td>
//                               {
//                                 foodItems.find(
//                                   (food) => food.id === plan.food_id
//                                 )?.name
//                               }
//                             </td>
//                             <td>
//                               <div className="dropdown">
//                                 <button
//                                   type="button"
//                                   className="btn btn-success light sharp"
//                                   data-bs-toggle="dropdown"
//                                 >
//                                   <svg
//                                     width="20px"
//                                     height="20px"
//                                     viewBox="0 0 24 24"
//                                     version="1.1"
//                                   >
//                                     <g
//                                       stroke="none"
//                                       strokeWidth={1}
//                                       fill="none"
//                                       fillRule="evenodd"
//                                     >
//                                       <rect
//                                         x={0}
//                                         y={0}
//                                         width={24}
//                                         height={24}
//                                       />
//                                       <circle
//                                         fill="#000000"
//                                         cx={5}
//                                         cy={12}
//                                         r={2}
//                                       />
//                                       <circle
//                                         fill="#000000"
//                                         cx={12}
//                                         cy={12}
//                                         r={2}
//                                       />
//                                       <circle
//                                         fill="#000000"
//                                         cx={19}
//                                         cy={12}
//                                         r={2}
//                                       />
//                                     </g>
//                                   </svg>
//                                 </button>
//                                 <div className="dropdown-menu">
//                                   <a
//                                     className="dropdown-item"
//                                     href="#"
//                                     onClick={() => handleEdit(plan)}
//                                   >
//                                     Edit
//                                   </a>
//                                   <a
//                                     className="dropdown-item"
//                                     href="#"
//                                     onClick={() => handleDelete(plan.id)}
//                                   >
//                                     Delete
//                                   </a>
//                                 </div>
//                               </div>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                   {renderPagination()}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ManageDietPlan;
import React, { useEffect, useState } from "react";
import useManageDietPlanItem from "../../../../hooks/admin/useManageDietPlanItem";

function ManageDietPlan() {
  const {
    dietPlans,
    users,
    foodItems,
    createDietPlanItem,
    updateDietPlanItem,
    deleteDietPlanItem,
  } = useManageDietPlanItem();
  const [formData, setFormData] = useState({
    id: null,
    diet_plan_id: "",
    user: "",
    quantity: "",
    mealType: "",
    status: "",
    foodItem: "",
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
      diet_plan_id: "",
      user: "",
      quantity: "",
      mealType: "",
      status: "",
      foodItem: "",
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
      diet_plan_id: parseInt(formData.diet_plan_id),
      meal_type: formData.mealType.toUpperCase(),
      food_id: foodItems.find((food) => food.name === formData.foodItem)?.id,
      quantity: parseFloat(formData.quantity),
      user_id: users.find((user) => user.name === formData.user)?.id,
      plan_type: formData.plan_type,
    };

    if (isEditMode) {
      requiredFields.status = formData.status.toUpperCase();
      const updatedPlan = await updateDietPlanItem(formData.id, requiredFields);
      setWorkoutPlans((prevWorkoutPlans) =>
        prevWorkoutPlans.map((plan) =>
          plan.id === updatedPlan.id ? updatedPlan : plan
        )
      );
    } else {
      await createDietPlanItem(requiredFields);
    }

    setFormData({
      id: null,
      diet_plan_id: "",
      user: "",
      quantity: "",
      mealType: "",
      status: "",
      foodItem: "",
      plan_type: "USER",
    });
    setIsEditMode(false);
    if (form) form.classList.remove("was-validated");
  };

  const handleEdit = (plan) => {
    setFormData({
      id: plan.id,
      diet_plan_id: plan.diet_plan_id,
      user: users.find((user) => user.id === plan.user_id)?.name || "",
      quantity: plan.quantity.toString(),
      mealType: plan.meal_type,
      status: plan.status,
      foodItem: foodItems.find((food) => food.id === plan.food_id)?.name || "",
      plan_type: plan.plan_type,
      created_by_id: plan.created_by_id,
    });
    setIsEditMode(true);
  };

  const handleDelete = (id) => {
    deleteDietPlanItem(id);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(dietPlans.length / itemsPerPage); i++) {
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

  const currentDietPlans = dietPlans.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <div className="content-body">
        <div className="container-fluid">
          <div className="card card-bx m-b30">
            <div className="card-header">
              <h6 className="title">Manage Diet Plan</h6>
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
                      <label className="form-label">Diet Plan ID</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Diet Plan ID"
                        required
                        name="diet_plan_id"
                        value={formData.diet_plan_id}
                        onChange={handleChange}
                        disabled={isEditMode}
                      />
                      <div className="invalid-feedback">
                        Please enter Diet Plan ID.
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
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Quantity (gm)</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Quantity"
                        required
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">
                        Please enter Quantity.
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Meal Type</label>
                      <select
                        name="mealType"
                        className="form-control"
                        required
                        value={formData.mealType}
                        onChange={handleChange}
                      >
                        <option value="" disabled>
                          Choose Meal Type
                        </option>
                        <option value="BREAKFAST">Breakfast</option>
                        <option value="LUNCH">Lunch</option>
                        <option value="DINNER">Dinner</option>
                        <option value="SNACK">Snack</option>
                      </select>
                      <div className="invalid-feedback">
                        Please select Meal Type.
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
                        <option value="COMPLETED">Completed</option>
                        <option value="PENDING">Pending</option>
                      </select>
                      <div className="invalid-feedback">
                        Please select Status.
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Food Item</label>
                      <select
                        name="foodItem"
                        className="form-control"
                        required
                        value={formData.foodItem}
                        onChange={handleChange}
                      >
                        <option value="" disabled>
                          Choose Food Item
                        </option>
                        {foodItems.map((food) => (
                          <option key={food.id}>{food.name}</option>
                        ))}
                      </select>
                      <div className="invalid-feedback">
                        Please select Food Item.
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
                    <> </>
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
                  <h4 className="card-title">Diet Plan Items</h4>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-responsive-md">
                      <thead>
                        <tr>
                          <th>DietPlan Item ID</th>
                          <th>Diet Plan ID</th>
                          <th>User</th>
                          <th>Quantity</th>
                          <th>Meal Type</th>
                          <th>Status</th>
                          <th>Food Item</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentDietPlans.map((plan) => (
                          <tr key={plan.id}>
                            <td>
                              <strong className="text-black">
                                {String(plan.id).padStart(2, "0")}
                              </strong>
                            </td>
                            <td>{plan.diet_plan_id}</td>
                            <td>
                              {
                                users.find((user) => user.id === plan.user_id)
                                  ?.name
                              }
                            </td>
                            <td>{plan.quantity}</td>
                            <td>{plan.meal_type}</td>
                            <td>{plan.status}</td>
                            <td>
                              {
                                foodItems.find(
                                  (food) => food.id === plan.food_id
                                )?.name
                              }
                            </td>
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

export default ManageDietPlan;
