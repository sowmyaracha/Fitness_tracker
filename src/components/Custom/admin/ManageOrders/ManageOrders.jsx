import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ManageOrders() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      user: "John Doe",
      totalPrice: "150",
      status: "Completed",
      date: "2023-10-01T10:00:00",
    },
    {
      id: 2,
      user: "Jane Smith",
      totalPrice: "200",
      status: "Pending",
      date: "2023-10-02T14:30:00",
    },
    {
      id: 3,
      user: "Alice Johnson",
      totalPrice: "100",
      status: "Cancelled",
      date: "2023-10-03T09:45:00",
    },
    {
      id: 4,
      user: "David",
      totalPrice: "300",
      status: "Pending",
      date: "2023-10-04T09:45:00",
    },
    {
      id: 5,
      user: "Kenny",
      totalPrice: "250",
      status: "Pending",
      date: "2023-10-05T09:45:00",
    },
    {
      id: 6,
      user: "Mark",
      totalPrice: "200",
      status: "Pending",
      date: "2023-10-06T09:45:00",
    },
  ]);

  const [formData, setFormData] = useState({
    id: null,
    user: "",
    totalPrice: "",
    status: "",
    date: "",
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
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === formData.id ? { ...order, ...formData } : order
        )
      );
    } else {
      setOrders((prevOrders) => [
        ...prevOrders,
        { ...formData, id: prevOrders.length + 1 },
      ]);
    }
    setFormData({
      id: null,
      user: "",
      totalPrice: "",
      status: "",
      date: "",
    });
    setIsEditMode(false);
  };

  const handleEdit = (order) => {
    setFormData(order);
    setIsEditMode(true);
  };

  const handleDelete = (id) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
  };

  return (
    <div>
      <div className="content-body">
        <div className="container-fluid">
          <div className="card card-bx m-b30">
            <div className="card-header">
              <h6 className="title">Manage Orders</h6>
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
                      <label className="form-label">User</label>
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
                        <option>John Doe</option>
                        <option>Jane Smith</option>
                        <option>Alice Johnson</option>
                        <option>David</option>
                        <option>Kenny</option>
                        <option>Mark</option>
                      </select>
                      <div className="invalid-feedback">
                        Please select User.
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Total Price</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Total Price"
                        required
                        name="totalPrice"
                        value={formData.totalPrice}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">
                        Please enter Total Price.
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
                        <option>Completed</option>
                        <option>Pending</option>
                        <option>Cancelled</option>
                      </select>
                      <div className="invalid-feedback">
                        Please select Status.
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Date</label>
                      <br />
                      <DatePicker
                        selected={
                          formData.date ? new Date(formData.date) : null
                        }
                        onChange={handleDateChange}
                        showTimeSelect
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
                  <h4 className="card-title">Order Items</h4>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-responsive-md">
                      <thead>
                        <tr>
                          <th style={{ width: 80 }}>#</th>
                          <th>User</th>
                          <th>Total Price</th>
                          <th>Status</th>
                          <th>Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr key={order.id}>
                            <td>
                              <strong className="text-black">
                                {String(order.id).padStart(2, "0")}
                              </strong>
                            </td>
                            <td>{order.user}</td>
                            <td>{order.totalPrice}</td>
                            <td>{order.status}</td>
                            <td>{new Date(order.date).toLocaleString()}</td>
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
                                    onClick={() => handleEdit(order)}
                                  >
                                    Edit
                                  </a>
                                  <a
                                    className="dropdown-item"
                                    href="#"
                                    onClick={() => handleDelete(order.id)}
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

export default ManageOrders;
