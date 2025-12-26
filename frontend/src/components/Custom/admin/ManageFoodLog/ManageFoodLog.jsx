import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ManageFoodLog() {
  const [foodLogs, setFoodLogs] = useState([
    {
      id: 1,
      foodName: "Apple",
      quantity: "200g",
      date: "2025-02-01T09:30:00", // ISO string format
      user: "John Doe",
    },
    {
      id: 2,
      foodName: "Chicken Breast",
      quantity: "150g",
      date: "2025-02-02T10:45:00",
      user: "Sans",
    },
    {
      id: 3,
      foodName: "Brown Rice",
      quantity: "100g",
      date: "2025-02-03T12:00:00",
      user: "Mark",
    },
    {
      id: 4,
      foodName: "Avocado",
      quantity: "1 unit",
      date: "2025-02-04T14:30:00",
      user: "David",
    },
    {
      id: 5,
      foodName: "Salmon",
      quantity: "200g",
      date: "2025-02-05T18:00:00",
      user: "Kenny",
    },
  ]);

  const [formData, setFormData] = useState({
    id: null,
    foodName: "",
    quantity: "",
    date: "",
    user: "",
  });

  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    (function () {
      "use strict";
      const forms = document.querySelectorAll(".needs-validation");
      Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener(
          "submit",
          function (event) {
            if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add("was-validated");
          },
          false
        );
      });
    })();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      date: date,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      setFoodLogs((prevFoodLogs) =>
        prevFoodLogs.map((log) =>
          log.id === formData.id ? { ...log, ...formData } : log
        )
      );
    } else {
      setFoodLogs((prevFoodLogs) => [
        ...prevFoodLogs,
        { ...formData, id: prevFoodLogs.length + 1 },
      ]);
    }
    setFormData({
      id: null,
      foodName: "",
      quantity: "",
      date: "",
      user: "",
    });
    setIsEditMode(false);
  };

  const handleEdit = (log) => {
    setFormData(log);
    setIsEditMode(true);
  };

  const handleDelete = (id) => {
    setFoodLogs((prevFoodLogs) => prevFoodLogs.filter((log) => log.id !== id));
  };

  return (
    <div>
      <div className="content-body">
        <div className="container-fluid">
          <div className="card card-bx m-b30">
            <div className="card-header">
              <h6 className="title">Manage Food Log</h6>
            </div>
            <div className="card-body">
              <div className="basic-form">
                <form
                  className="needs-validation"
                  noValidate
                  onSubmit={handleSubmit}
                >
                  <div className="row">
                    <div className=" col-md-6 mb-3 ">
                      <label className="form-label">Food Name </label>
                      <select
                        name="foodName"
                        className="form-control"
                        required
                        defaultValue=""
                        value={formData.foodName}
                        onChange={handleChange}
                      >
                        <option value="" disabled>
                          Choose Food Item
                        </option>
                        <option>Apple</option>
                        <option> Chicken Breast</option>
                        <option>Grilled Fish</option>
                        <option>Brown Rice</option>
                        <option>Avocado</option>
                        <option>Salmon</option>
                        <option>Quinoa Salad</option>
                      </select>
                      <div className="invalid-feedback">
                        Please enter Food Name.
                      </div>
                    </div>
                    <div className=" col-md-6 mb-3 ">
                      <label className="form-label">Quantity</label>
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

                    <div className=" col-md-6 mb-3 ">
                      <label className="form-label">User </label>
                      <select
                        name="user"
                        className="form-control"
                        required
                        value={formData.user}
                        onChange={handleChange}
                      >
                        <option value="" disabled>
                          Choose User
                        </option>
                        <option>David</option>
                        <option>John</option>
                        <option>Sans</option>
                        <option>Mark</option>
                        <option>Kenny</option>
                      </select>
                      <div className="invalid-feedback">
                        Please select User.
                      </div>
                    </div>
                    <div className=" col-md-6 mb-3 ">
                      <label className="form-label">Date & Time</label>
                      <br></br>
                      <DatePicker
                        selected={
                          formData.date ? new Date(formData.date) : null
                        }
                        onChange={handleDateChange}
                        showTimeSelect
                        placeholderText="Select Date & Time"
                        timeFormat="HH:mm aa"
                        timeIntervals={15}
                        dateFormat="dd/MM/yyyy h:mm aa"
                        className="form-control"
                        required
                      />
                      <div className="invalid-feedback">
                        Please select Date.
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end">
                    {" "}
                    <button type="submit" className="btn btn-primary">
                      {isEditMode ? "Edit" : "Add"}
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
                  <h4 className="card-title">Food Log Items</h4>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-responsive-md">
                      <thead>
                        <tr>
                          <th style={{ width: 80 }}>#</th>
                          <th>Food Name</th>
                          <th>Quantity</th>
                          <th>Date</th>
                          <th>User</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {foodLogs.map((log) => (
                          <tr key={log.id}>
                            <td>
                              <strong className="text-black">
                                {String(log.id).padStart(2, "0")}
                              </strong>
                            </td>
                            <td>{log.foodName}</td>
                            <td>{log.quantity}</td>
                            <td>
                              {new Date(log.date).toLocaleString("en-GB", {
                                weekday: "short",
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                                hour12: true,
                              })}
                            </td>
                            <td>{log.user}</td>
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
                                    onClick={() => handleEdit(log)}
                                  >
                                    Edit
                                  </a>
                                  <a
                                    className="dropdown-item"
                                    href="#"
                                    onClick={() => handleDelete(log.id)}
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
        </div>
      </div>
    </div>
  );
}

export default ManageFoodLog;
