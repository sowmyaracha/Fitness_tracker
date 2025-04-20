import React, { useEffect, useState } from "react";
import useManageOrders from "../../../hooks/admin/useManageOrders";

function AdminOrders() {
  const {
    orders,
    orderItems,
    products,
    fetchOrders,
    fetchOrderItems,
    createOrderItem,
    updateOrderItem,
    deleteOrderItem,
    updateOrder,
    adminUpdateOrderDetails,
    deleteOrder,
  } = useManageOrders();

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    unitPrice: "",
    quantity: "",
    totalPrice: "",
    product_id: "",
    order_id: "",
    user_id: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    status: "",
    created_at: "",
    total_price: "",
  });

  const [editingItemId, setEditingItemId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [showItemEditForm, setShowItemEditForm] = useState(false);

  useEffect(() => {
    (function () {
      const forms = document.querySelectorAll(".needs-validation");
      Array.prototype.slice.call(forms).forEach((form) => {
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
    if (name === "name") {
      const selectedProduct = products.find(
        (product) => product.name === value
      );
      setFormData((prevData) => ({
        ...prevData,
        name: value,
        unitPrice: selectedProduct?.price?.toString() || "",
        product_id: selectedProduct?.id || "",
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    const requiredFields = {
      product_id: products.find((product) => product.name === formData.name)
        ?.id,
      order_id: currentOrderId,
      user_id: orders.find((order) => order.id === currentOrderId)?.user_id,
      quantity: parseInt(formData.quantity),
      price: parseFloat(formData.unitPrice),
    };

    if (editingItemId) {
      await updateOrderItem(formData.id, requiredFields);
    } else {
      await createOrderItem(requiredFields);
    }

    await fetchOrders();
    await fetchOrderItems(currentOrderId);

    setFormData({
      id: null,
      name: "",
      unitPrice: "",
      quantity: "",
      totalPrice: "",
    });
    setEditingItemId(null);
    setShowItemEditForm(false);
    form.classList.remove("was-validated");
  };

  const handleEdit = (item) => {
    setEditingItemId(item.id);
    setFormData((prev) => ({
      ...prev,
      id: item.id,
      name: products.find((product) => product.id === item.product_id)?.name,
      unitPrice: item.price.toString(),
      quantity: item.quantity.toString(),
      totalPrice: (item.price * item.quantity).toString(),
      product_id: item.product_id,
      order_id: currentOrderId,
      user_id: orders.find((order) => order.id === currentOrderId)?.user_id,
    }));
    setShowItemEditForm(true);
  };

  const handleDelete = async (id) => {
    await deleteOrderItem(id);
    await fetchOrderItems(currentOrderId);
    await fetchOrders();
  };

  const handleOrderEdit = async (order) => {
    setCurrentOrderId(order.id);
    setFormData({
      order_id: order.id,
      firstname: order.firstname || "",
      lastname: order.lastname || "",
      email: order.email || "",
      phone: order.phone || "",
      address: order.address || "",
      status: order.status,
      total_price: order.total_price,
      name: order.name,
      created_at: order.created_at,
      id: order.id,
    });
    await fetchOrderItems(order.id);
  };

  const handleOrderDelete = async (id) => {
    await deleteOrder(id);
    await fetchOrders();
  };

  const handleInfoClick = (orderId) => {
    setCurrentOrderId(orderId);
    fetchOrderItems(orderId);
  };

  const handleUpdateOrderDetails = async (e) => {
    e.preventDefault();
    await adminUpdateOrderDetails(formData);
    await fetchOrders();
  };

  return (
    <div className="content-body">
      <div className="container-fluid">
        {/* MODAL */}
        <div className="modal fade" id="editOrderModal">
          <div
            className="modal-dialog modal-dialog-centered modal-xl"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <div className="d-flex justify-content-between align-items-center w-100">
                  <h5 className="modal-title mb-0">Order Items & Details</h5>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => setShowItemEditForm(true)}
                  >
                    Add New Item
                  </button>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body">
                {/* Order Info Edit */}
                <form
                  className="needs-validation mb-4"
                  noValidate
                  onSubmit={handleUpdateOrderDetails}
                >
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label>Order ID</label>
                      <input
                        className="form-control"
                        value={formData.order_id}
                        readOnly
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Username</label>
                      <input
                        className="form-control"
                        value={formData.name}
                        readOnly
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Date</label>
                      <input
                        className="form-control"
                        value={new Date(
                          formData.created_at
                        ).toLocaleDateString()}
                        readOnly
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Status</label>
                      <select
                        className="form-control"
                        name="status"
                        required
                        value={formData.status}
                        onChange={handleChange}
                      >
                        <option value="" disabled>
                          Choose Status
                        </option>
                        <option value="PENDING">Pending</option>
                        <option value="DELIVERED">Delivered</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>First Name</label>
                      <input
                        className="form-control"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Last Name</label>
                      <input
                        className="form-control"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Email</label>
                      <input
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Phone</label>
                      <input
                        className="form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label>Address</label>
                      <textarea
                        className="form-control"
                        name="address"
                        rows="2"
                        value={formData.address}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-primary" type="submit">
                      Save Order Details
                    </button>
                  </div>
                </form>

                {/* Order Item Edit */}
                {showItemEditForm && (
                  <form
                    className="needs-validation mb-4"
                    noValidate
                    onSubmit={handleSubmit}
                  >
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label>Product</label>
                        <select
                          className="form-control"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Choose a product</option>
                          {products.map((product) => (
                            <option key={product.id} value={product.name}>
                              {product.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label>Quantity</label>
                        <input
                          type="number"
                          className="form-control"
                          name="quantity"
                          value={formData.quantity}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label>Unit Price</label>
                        <input
                          type="number"
                          className="form-control"
                          name="unitPrice"
                          value={formData.unitPrice}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button className="btn btn-success" type="submit">
                        Save Item
                      </button>
                    </div>
                  </form>
                )}

                {/* Order Items Table */}
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Unit Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItems.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>
                          <img
                            src={item.product?.image_url || "/placeholder.png"}
                            alt=""
                            width={50}
                          />
                        </td>
                        <td>{item.product?.name || "Unknown"}</td>
                        <td>${item.price}</td>
                        <td>{item.quantity}</td>
                        <td>${item.price * item.quantity}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-warning me-2"
                            onClick={() => handleEdit(item)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Order List */}
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Orders</h4>
              </div>
              <div className="card-body">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>User</th>
                      <th>Status</th>
                      <th>Total</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.name}</td>
                        <td>
                          <span
                            className={`badge ${
                              order.status === "DELIVERED"
                                ? "bg-success"
                                : order.status === "PENDING"
                                ? "bg-warning"
                                : "bg-danger"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td>${order.total_price}</td>
                        <td>
                          <div className="d-flex">
                            <button
                              className="btn btn-info btn-sm me-2"
                              data-bs-toggle="modal"
                              data-bs-target="#editOrderModal"
                              onClick={() => handleOrderEdit(order)}
                            >
                              Info
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleOrderDelete(order.id)}
                            >
                              Delete
                            </button>
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
  );
}

export default AdminOrders;
