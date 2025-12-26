import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useUserShop from "../../../hooks/user/useUserShop";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
function Checkout() {
  const [role, setRole] = useState(null);
  const location = useLocation();
  const { cart, createOrder } = useUserShop();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname) {
      const currentRole = location.pathname.split("/")[2];
      setRole(currentRole);
    }
  }, [location.pathname]);
  useEffect(() => {
    (function () {
      "use strict";
      var forms = document.querySelectorAll(".needs-validation");
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
  const handleSubmit = (e) => {
    // e.preventDefault();
    // console.log("redirecting");
    // window.location.href = `/dashboard/${role}/payment`;
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    const data = new FormData(form);
    const formatted = Object.fromEntries(data.entries());
    setFormData(formatted);
    setShowModal(true);
  };
  return (
    <div>
      <div className="content-body">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-4 order-lg-2 mb-4">
                      <h4 className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-black">Your cart</span>
                        <span className="badge badge-primary badge-pill">
                          {cart.length}
                        </span>
                      </h4>
                      <ul className="list-group mb-3">
                        {cart.map((item) => (
                          <li
                            key={item.id}
                            className="list-group-item d-flex justify-content-between lh-condensed"
                          >
                            <div>
                              <h6 className="my-0">{item.product.name}</h6>
                              <small className="text-muted">
                                x{item.quantity}
                              </small>
                            </div>
                            <span className="text-muted">
                              ${(item.quantity * item.product.price).toFixed(2)}
                            </span>
                          </li>
                        ))}
                        <li className="list-group-item d-flex justify-content-between">
                          <span>Total (USD)</span>
                          <strong>
                            $
                            {cart
                              .reduce(
                                (total, item) =>
                                  total +
                                  item.quantity * Number(item.product.price),
                                0
                              )
                              .toFixed(2)}
                          </strong>
                        </li>
                      </ul>
                    </div>
                    <div className="col-lg-8 order-lg-1">
                      <h4 className="mb-3">Billing address</h4>
                      <form
                        className="needs-validation"
                        noValidate
                        onSubmit={handleSubmit}
                      >
                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <label htmlFor="firstName">First name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="firstName"
                              placeholder="First Name"
                              name="first_name"
                              required
                            />
                            <div className="invalid-feedback">
                              Valid first name is required.
                            </div>
                          </div>
                          <div className="col-md-6 mb-3">
                            <label htmlFor="lastName">Last name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="lastName"
                              placeholder="Last Name"
                              name="last_name"
                              required
                            />
                            <div className="invalid-feedback">
                              Valid last name is required.
                            </div>
                          </div>
                        </div>

                        <div className="mb-3">
                          <label htmlFor="email">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            required
                            placeholder="you@example.com"
                          />
                          <div className="invalid-feedback">
                            Please enter a valid email address for shipping
                            updates.
                          </div>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="address">Address</label>
                          <input
                            type="text"
                            className="form-control"
                            id="address"
                            name="address"
                            placeholder="1234 Main St"
                            required
                          />
                          <div className="invalid-feedback">
                            Please enter your shipping address.
                          </div>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="address2">Phone </label>
                          <input
                            type="text"
                            className="form-control"
                            id="address2"
                            name="phone"
                            placeholder="Phone"
                            required
                            minLength={10}
                          />
                        </div>

                        <hr className="mb-4" />
                        <h4 className="mb-3">Payment</h4>
                        <div className="d-block my-3">
                          <div className="form-check custom-radio mb-2">
                            <input
                              id="credit"
                              name="paymentMethod"
                              type="radio"
                              className="form-check-input"
                              required
                            />
                            <label
                              className="form-check-label"
                              htmlFor="credit"
                            >
                              Credit card
                            </label>
                          </div>
                          <div className="form-check custom-radio mb-2">
                            <input
                              id="debit"
                              name="paymentMethod"
                              type="radio"
                              className="form-check-input"
                              required
                            />
                            <label className="form-check-label" htmlFor="debit">
                              Debit card
                            </label>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <label htmlFor="cc-name">Name on card</label>
                            <input
                              type="text"
                              className="form-control"
                              id="cc-name"
                              placeholder
                              required
                            />
                            <small className="text-muted">
                              Full name as displayed on card
                            </small>
                            <div className="invalid-feedback">
                              Name on card is required
                            </div>
                          </div>
                          <div className="col-md-6 mb-3">
                            <label htmlFor="cc-number">
                              Credit card number
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="cc-number"
                              placeholder
                              required
                            />
                            <div className="invalid-feedback">
                              Credit card number is required
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-3 mb-3">
                            <label htmlFor="cc-expiration">Expiration</label>
                            <input
                              type="text"
                              className="form-control"
                              id="cc-expiration"
                              placeholder
                              required
                            />
                            <div className="invalid-feedback">
                              Expiration date required
                            </div>
                          </div>
                          <div className="col-md-3 mb-3">
                            <label htmlFor="cc-expiration">CVV</label>
                            <input
                              type="text"
                              className="form-control"
                              minLength={3}
                              maxLength={4}
                              id="cc-cvv"
                              placeholder
                              required
                            />
                            <div className="invalid-feedback">
                              Security code required
                            </div>
                          </div>
                        </div>
                        <hr className="mb-4" />
                        <button
                          className="btn btn-primary btn-lg btn-block"
                          type="submit"
                        >
                          Continue to checkout
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to place this order?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          {/* <Button
            variant="primary"
            onClick={async () => {
              const orderPayload = cart.map((item) => ({
                product_id: item.product_id,
                quantity: item.quantity,
              }));

              try {
                const order = await createOrder(orderPayload);
                setShowModal(false);
                navigate("/dashboard/user/payment", {
                  state: { order, formData, cart },
                });
              } catch (err) {
                setShowModal(false);
              }
            }}
          >
            Pay
          </Button> */}
          <Button
            variant="primary"
            onClick={async () => {
              const orderPayload = {
                ...formData, // includes first_name, last_name, email, phone, address
                items: cart.map((item) => ({
                  product_id: item.product_id,
                  quantity: item.quantity,
                })),
              };

              try {
                console.log(orderPayload);
                const order = await createOrder(orderPayload);
                setShowModal(false);
                navigate("/dashboard/user/payment", {
                  state: { order, formData, cart },
                });
              } catch (err) {
                setShowModal(false);
              }
            }}
          >
            Pay
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Checkout;
