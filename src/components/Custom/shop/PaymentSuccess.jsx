import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { order, formData, cart } = location.state || {};

  useEffect(() => {
    if (!order) {
      navigate("/dashboard/user/cart"); // if someone lands here without state
    }
  }, [order]);
  const handleContinue = () => {
    navigate("/dashboard/user/shop");
  };
  return (
    <div>
      <div className="content-body">
        <div className="container-fluid">
          <div className="row">
            <div className="d-flex justify-content-center align-items-center min-vh-100">
              <div
                className="card p-4 shadow-sm"
                style={{ maxWidth: "700px", width: "100%" }}
              >
                <div className="mb-3 text-center">
                  <img
                    src="/assets/images/product/8.jpg"
                    alt="Success"
                    className="img-fluid"
                    width={220}
                  />
                </div>
                <h3 style={{ textAlign: "center" }}>
                  Thank you for your purchase! 🎉
                </h3>
                <p style={{ textAlign: "center" }}>
                  Your order has been successfully placed.
                </p>
                <div className="text-start">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                      <strong>Payment Status:</strong>{" "}
                      <span className="text-success">✔ Successful</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <strong>Date:</strong>{" "}
                      {new Date(order.created_at).toLocaleDateString()}
                    </li>

                    <li className="list-group-item d-flex justify-content-between">
                      <strong>Payment Method:</strong> VISA
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <strong>Order Number:</strong> {order.id}
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <strong>Total:</strong>{" "}
                      <span className="fw-bold">${order.total_price}</span>
                    </li>
                  </ul>
                </div>

                <h5 className="mt-4">Order Line</h5>
                <ul
                  className="list-group list-group-flush text-start"
                  style={{ maxWidth: 700 }}
                >
                  {cart.map((item) => (
                    <li
                      key={item.id}
                      className="list-group-item d-flex justify-content-between"
                    >
                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className="me-3"
                        width={70}
                      />
                      <li className="w-100 d-flex justify-content-between">
                        <div>
                          <p className="mb-0">{item.product.name}</p>
                          <small>x{item.quantity} items</small>
                        </div>
                        <span className="ms-auto">
                          ${(item.quantity * item.product.price).toFixed(2)}
                        </span>
                      </li>
                    </li>
                  ))}
                </ul>

                <button
                  className="btn btn-dark mt-4 w-100"
                  onClick={handleContinue}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
