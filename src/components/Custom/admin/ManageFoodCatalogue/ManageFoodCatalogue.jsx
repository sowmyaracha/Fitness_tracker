// import React, { useState, useEffect } from "react";
// import useManageFoodCatalogue from "../../../../hooks/admin/useManageFoodCatalogue";

// function ManageFoodCatalogue() {
//   const {
//     foodItems,
//     users,
//     createFoodItem,
//     updateFoodItem,
//     deleteFoodItem,
//     fetchFoodItems,
//     setFoodItems,
//   } = useManageFoodCatalogue();

//   const [formData, setFormData] = useState({
//     id: null,
//     name: "",
//     calories: "",
//     carbs: "",
//     protein: "",
//     fats: "",
//     serving_size_gm: "",
//     user: "",
//   });

//   const [isEditMode, setIsEditMode] = useState(false);

//   useEffect(() => {
//     (function () {
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
//     const foodData = {
//       name: formData.name,
//       calories: parseFloat(formData.calories),
//       carbs: parseFloat(formData.carbs),
//       protein: parseFloat(formData.protein),
//       fats: parseFloat(formData.fats),
//       serving_size_gm: parseFloat(formData.serving_size_gm),
//       user_id: users.find((u) => u.name === formData.user)?.id,
//     };

//     if (isEditMode) {
//       await updateFoodItem(formData.id, foodData);
//     } else {
//       await createFoodItem(foodData);
//     }

//     setFormData({
//       id: null,
//       name: "",
//       calories: "",
//       carbs: "",
//       protein: "",
//       fats: "",
//       serving_size_gm: "",
//       user: "",
//     });
//     setIsEditMode(false);
//     await fetchFoodItems();
//   };

//   const handleEdit = (item) => {
//     const user = users.find((u) => u.id === item.user_id);
//     setFormData({
//       id: item.id,
//       name: item.name,
//       calories: item.calories,
//       carbs: item.carbs,
//       protein: item.protein,
//       fats: item.fats,
//       serving_size_gm: item.serving_size_gm,
//       user: user?.name || "",
//     });
//     setIsEditMode(true);
//   };

//   const handleDelete = async (id) => {
//     await deleteFoodItem(id);
//   };

//   return (
//     <div>
//       <div className="content-body">
//         <div className="container-fluid">
//           <div className="card card-bx m-b30">
//             <div className="card-header">
//               <h6 className="title">Manage Food Catalogue</h6>
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
//                       <label className="form-label">Food Name</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Enter Food Name"
//                         required
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                       />
//                       <div className="invalid-feedback">
//                         Please enter Food Name.
//                       </div>
//                     </div>
//                     <div className="col-md-6 mb-3">
//                       <label className="form-label">Calories</label>
//                       <input
//                         type="number"
//                         className="form-control"
//                         placeholder="Enter Calories"
//                         required
//                         name="calories"
//                         value={formData.calories}
//                         onChange={handleChange}
//                       />
//                       <div className="invalid-feedback">
//                         Please enter Calories.
//                       </div>
//                     </div>
//                     <div className="col-md-6 mb-3">
//                       <label className="form-label">Carbs</label>
//                       <input
//                         type="number"
//                         className="form-control"
//                         placeholder="Enter Carbs"
//                         required
//                         name="carbs"
//                         value={formData.carbs}
//                         onChange={handleChange}
//                       />
//                       <div className="invalid-feedback">
//                         Please enter Carbs.
//                       </div>
//                     </div>
//                     <div className="col-md-6 mb-3">
//                       <label className="form-label">Protein</label>
//                       <input
//                         type="number"
//                         className="form-control"
//                         placeholder="Enter Protein"
//                         required
//                         name="protein"
//                         value={formData.protein}
//                         onChange={handleChange}
//                       />
//                       <div className="invalid-feedback">
//                         Please enter Protein.
//                       </div>
//                     </div>
//                     <div className="col-md-6 mb-3">
//                       <label className="form-label">Fats</label>
//                       <input
//                         type="number"
//                         className="form-control"
//                         placeholder="Enter Fats"
//                         required
//                         name="fats"
//                         value={formData.fats}
//                         onChange={handleChange}
//                       />
//                       <div className="invalid-feedback">Please enter Fats.</div>
//                     </div>
//                     <div className="col-md-6 mb-3">
//                       <label className="form-label">Serving Size (gm)</label>
//                       <input
//                         type="number"
//                         className="form-control"
//                         placeholder="Enter Serving Size"
//                         required
//                         name="serving_size_gm"
//                         value={formData.serving_size_gm}
//                         onChange={handleChange}
//                       />
//                       <div className="invalid-feedback">
//                         Please enter Serving Size.
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
//                   <h4 className="card-title">Food Catalogue Items</h4>
//                 </div>
//                 <div className="card-body">
//                   <div className="table-responsive">
//                     <table className="table table-responsive-md">
//                       <thead>
//                         <tr>
//                           <th style={{ width: 80 }}>#</th>
//                           <th>Food Name</th>
//                           <th>Calories</th>
//                           <th>Carbs</th>
//                           <th>Protein</th>
//                           <th>Fats</th>
//                           <th>Serving Size (gm)</th>
//                           <th>User</th>
//                           <th>Action</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {foodItems.map((item) => (
//                           <tr key={item.id}>
//                             <td>
//                               <strong className="text-black">
//                                 {String(item.id).padStart(2, "0")}
//                               </strong>
//                             </td>
//                             <td>{item.name}</td>
//                             <td>{item.calories}</td>
//                             <td>{item.carbs}</td>
//                             <td>{item.protein}</td>
//                             <td>{item.fats}</td>
//                             <td>{item.serving_size_gm}</td>
//                             <td>
//                               {users.find((u) => u.id === item.user_id)?.name ||
//                                 "System"}
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
//                                     onClick={() => handleEdit(item)}
//                                   >
//                                     Edit
//                                   </a>
//                                   <a
//                                     className="dropdown-item"
//                                     href="#"
//                                     onClick={() => handleDelete(item.id)}
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
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ManageFoodCatalogue;
import React, { useState, useEffect } from "react";
import useManageFoodCatalogue from "../../../../hooks/admin/useManageFoodCatalogue";

function ManageFoodCatalogue() {
  const {
    foodItems,
    users,
    createFoodItem,
    updateFoodItem,
    deleteFoodItem,
    fetchFoodItems,
    setFoodItems,
  } = useManageFoodCatalogue();

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    calories: "",
    carbs: "",
    protein: "",
    fats: "",
    serving_size_gm: "",
    user_id: "",
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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
      name: "",
      calories: "",
      carbs: "",
      protein: "",
      fats: "",
      serving_size_gm: "",
      user_id: "",
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
    const foodData = {
      name: formData.name,
      calories: parseFloat(formData.calories),
      carbs: parseFloat(formData.carbs),
      protein: parseFloat(formData.protein),
      fats: parseFloat(formData.fats),
      serving_size_gm: parseFloat(formData.serving_size_gm),
      user_id: parseInt(formData.user_id),
    };

    if (isEditMode) {
      await updateFoodItem(formData.id, foodData);
    } else {
      await createFoodItem(foodData);
    }

    setFormData({
      id: null,
      name: "",
      calories: "",
      carbs: "",
      protein: "",
      fats: "",
      serving_size_gm: "",
      user_id: "",
    });
    setIsEditMode(false);
    await fetchFoodItems();
  };

  const handleEdit = (item) => {
    setFormData({
      id: item.id,
      name: item.name,
      calories: item.calories,
      carbs: item.carbs,
      protein: item.protein,
      fats: item.fats,
      serving_size_gm: item.serving_size_gm,
      user_id: item.user_id?.toString() || "",
    });
    setIsEditMode(true);
  };

  const handleDelete = async (id) => {
    await deleteFoodItem(id);
    setFoodItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const currentItems = foodItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(foodItems.length / itemsPerPage);

  return (
    <div className="content-body">
      <div className="container-fluid">
        <div className="card card-bx m-b30">
          <div className="card-header">
            <h6 className="title">Manage Food Items</h6>
          </div>
          <div className="card-body">
            <form
              className="needs-validation"
              noValidate
              onSubmit={handleSubmit}
            >
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Food Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Food Name"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">
                    Please enter Food Name.
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Calories (kcal)</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Calories"
                    required
                    name="calories"
                    value={formData.calories}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">Please enter Calories.</div>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Carbs (gm)</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Carbs"
                    required
                    name="carbs"
                    value={formData.carbs}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">Please enter Carbs.</div>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Protein (gm)</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Protein"
                    required
                    name="protein"
                    value={formData.protein}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">Please enter Protein.</div>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Fats (gm)</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Fats"
                    required
                    name="fats"
                    value={formData.fats}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">Please enter Fats.</div>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Serving Size (gm)</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Serving Size"
                    required
                    name="serving_size_gm"
                    value={formData.serving_size_gm}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">
                    Please enter Serving Size.
                  </div>
                </div>
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
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                  <div className="invalid-feedback">Please select User.</div>
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

        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Food Items</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-responsive-md">
                    <thead>
                      <tr>
                        <th>Food Item ID</th>
                        <th>Food Name</th>
                        <th>Calories</th>
                        <th>Carbs</th>
                        <th>Protein</th>
                        <th>Fats</th>
                        <th>Serving Size (gm)</th>
                        <th>User</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <strong className="text-black">
                              {String(item.id).padStart(2, "0")}
                            </strong>
                          </td>
                          <td>{item.name}</td>
                          <td>{item.calories}</td>
                          <td>{item.carbs}</td>
                          <td>{item.protein}</td>
                          <td>{item.fats}</td>
                          <td>{item.serving_size_gm}</td>
                          <td>
                            {users.find((u) => u.id === item.user_id)?.name ||
                              "System"}
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
                                  onClick={() => handleEdit(item)}
                                >
                                  Edit
                                </a>
                                <a
                                  className="dropdown-item"
                                  onClick={() => handleDelete(item.id)}
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
                  {totalPages > 1 && (
                    <nav className="d-flex justify-content-end mt-3">
                      <ul className="pagination">
                        {Array.from({ length: totalPages }).map((_, i) => (
                          <li
                            key={i}
                            className={`page-item ${
                              currentPage === i + 1 ? "active" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => handlePageChange(i + 1)}
                            >
                              {i + 1}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageFoodCatalogue;
