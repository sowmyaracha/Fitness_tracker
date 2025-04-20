// components/Orders.jsx
import React, { useState } from "react";
import useUserOrders from "../../../hooks/user/useUserOrders";


function Orders() {
  const { orders, orderItems, fetchOrderItems } = useUserOrders();
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const handleRowClick = async (orderId) => {
    setSelectedOrderId(orderId);
    await fetchOrderItems(orderId);
    const modal = new bootstrap.Modal(
      document.getElementById("orderItemsModal")
    );
    modal.show();
  };

  return (
    <div className="content-body">
      <div className="container-fluid">
        {/* Modal */}
        <div
          className="modal fade"
          id="orderItemsModal"
          tabIndex="-1"
          aria-labelledby="orderItemsModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="orderItemsModalLabel">
                  Order #{String(selectedOrderId).padStart(2, "0")} Items
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Product</th>
                      <th>Unit Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItems.length > 0 ? (
                      orderItems.map((item, index) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.product?.name || "Unknown"}</td>
                          <td>${item.price}</td>
                          <td>{item.quantity}</td>
                          <td>${item.price * item.quantity}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No items found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Orders List</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                {!orders ||orders.length === 0 ? (
  <div className="text-center my-4">You have no orders yet.</div>
) : (
                  <table className="table table-responsive-md ">
                    <thead>
                      <tr>
                        <th style={{ width: 200 }}>Order ID</th>
                        <th>Username</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Total Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr
                          key={order.id}
                          onClick={() => handleRowClick(order.id)}
                          style={{ cursor: "pointer" }}
                        >
                          <td>
                            <strong className="text-black">
                              {String(order.id).padStart(2, "0")}
                            </strong>
                          </td>
                          <td>{order.name}</td>
                          <td>
                            {new Date(order.created_at).toLocaleDateString()}
                          </td>
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
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      {/* container-fluid */}
    </div>
  );
}

export default Orders;
