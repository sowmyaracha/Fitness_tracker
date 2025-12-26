function PaymentFailed() {
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
                    src="/assets/images/product/9.jpg"
                    alt="Success"
                    className="img-fluid"
                    width={220}
                  />
                </div>
                <h3 style={{ textAlign: "center" }}>Payment Failed 😢</h3>
                <p style={{ textAlign: "center" }}>
                  Something went wrong with your payment method. Please try
                  again.
                </p>
                <div className="text-start">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                      <strong>Payment Status:</strong>{" "}
                      <span className="text-failed">❌ Failed</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <strong>Date:</strong> 27/01/2025
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <strong>Customer:</strong> John Miller
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <strong>Payment Method:</strong> VISA
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <strong>Order Number:</strong> 586789863
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <strong>Total:</strong>{" "}
                      <span className="fw-bold">$273</span>
                    </li>
                  </ul>
                </div>
                <h5 className="mt-4">Order Line</h5>
                <ul
                  className="list-group list-group-flush text-start"
                  style={{ maxWidth: 700 }}
                >
                  <li className="list-group-item d-flex justify-content-between">
                    <img
                      src="/assets/images/product/1.jpg"
                      alt="Product"
                      className="me-3"
                      width={70}
                    />
                    <li className="w-100 d-flex justify-content-between">
                      <div>
                        <p className="mb-0">Product’s name</p>
                        <small>x3 items</small>
                      </div>
                      <span className="ms-auto">$73</span>{" "}
                      {/* Price moved to the right extreme */}
                    </li>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <img
                      src="/assets/images/product/2.jpg"
                      alt="Product"
                      className="me-3"
                      width={70}
                    />
                    <li className="w-100 d-flex justify-content-between">
                      <div>
                        <p className="mb-0">Product’s name</p>
                        <small>x4 items</small>
                      </div>
                      <span className="ms-auto">$50</span>{" "}
                      {/* Price moved to the right extreme */}
                    </li>
                  </li>
                </ul>
                <button className="btn btn-dark mt-4 w-100">
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

export default PaymentFailed;
