import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AdminOrders() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      image: "/assets/images/product/1.jpg",
      name: "Product A",
      unitPrice: "$10.00",
      quantity: 2,
      totalPrice: "$20.00",
    },
    {
      id: 2,
      image: "/assets/images/product/2.jpg",
      name: "Product B",
      unitPrice: "$15.00",
      quantity: 1,
      totalPrice: "$15.00",
    },
    {
      id: 3,
      image: "/assets/images/product/3.jpg",
      name: "Product C",
      unitPrice: "$30.00",
      quantity: 3,
      totalPrice: "$90.00",
    },
    {
      id: 4,
      image: "/assets/images/product/4.jpg",
      name: "Product D",
      unitPrice: "$20.00",
      quantity: 1,
      totalPrice: "$20.00",
    },
    {
      id: 5,
      image: "/assets/images/product/5.jpg",
      name: "Product E",
      unitPrice: "$10.00",
      quantity: 2,
      totalPrice: "$20.00",
    },
    {
      id: 6,
      image: "/assets/images/product/6.jpg",
      name: "Product F",
      unitPrice: "$30.00",
      quantity: 3,
      totalPrice: "$90.00",
    },
    {
      id: 7,
      image: "/assets/images/product/7.jpg",
      name: "Product G",
      unitPrice: "$20.00",
      quantity: 1,
      totalPrice: "$20.00",
    },
  ]);

  const [formData, setFormData] = useState({
    id: null,
    image: null,
    name: "",
    unitPrice: "",
    quantity: "",
    totalPrice: "",
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file ? URL.createObjectURL(file) : null,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === formData.id ? { ...item, ...formData } : item
        )
      );
    } else {
      setCartItems((prevItems) => [
        ...prevItems,
        { ...formData, id: prevItems.length + 1 },
      ]);
    }
    setFormData({
      id: null,
      image: null,
      name: "",
      unitPrice: "",
      quantity: "",
      totalPrice: "",
    });
    setIsEditMode(false);
  };

  const handleEdit = (item) => {
    setFormData({
      id: item.id,
      image: item.image,
      name: item.name,
      unitPrice: item.unitPrice,
      quantity: item.quantity,
      totalPrice: item.totalPrice,
    });
    setIsEditMode(true);
  };

  const handleDelete = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="content-body">
      <div className="container-fluid">
        {/* Modal */}
        <div className="modal fade" id="editOrderModal">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{isEditMode ? "Edit" : "Add"} Item</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body">
                <form
                  className="needs-validation"
                  noValidate
                  onSubmit={handleSubmit}
                >
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Product Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Product Name"
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">
                        Please enter Product Name.
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Unit Price</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Unit Price"
                        required
                        name="unitPrice"
                        value={formData.unitPrice}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">
                        Please enter Unit Price.
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Quantity</label>
                      <input
                        type="number"
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
                      <label className="form-label">Product Image</label>
                      <input
                        type="file"
                        className="form-control"
                        placeholder="Choose Product Image"
                        required
                        onChange={handleImageChange}
                      />
                      <div className="invalid-feedback">
                        Select Product Image.
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
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Cart Items</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-responsive-md">
                    <thead>
                      <tr>
                        <th style={{ width: 80 }}>#</th>
                        <th>IMAGE</th>
                        <th>NAME</th>
                        <th>UNIT PRICE</th>
                        <th>QUANTITY</th>
                        <th>TOTAL PRICE</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <strong className="text-black">
                              {String(item.id).padStart(2, "0")}
                            </strong>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                src={item.image}
                                className="rounded-lg me-2"
                                width={70}
                                alt={item.name}
                              />
                            </div>
                          </td>
                          <td>{item.name}</td>
                          <td>{item.unitPrice}</td>
                          <td>{item.quantity}</td>
                          <td>{item.totalPrice}</td>
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
                                    <rect x={0} y={0} width={24} height={24} />
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
                                  data-bs-toggle="modal"
                                  data-bs-target="#editOrderModal"
                                  onClick={() => handleEdit(item)}
                                >
                                  Edit
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() => handleDelete(item.id)}
                                >
                                  Remove
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
  );
}

export default AdminOrders;
