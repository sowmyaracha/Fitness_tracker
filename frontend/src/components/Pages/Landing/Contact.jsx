import { useEffect } from "react";

function Contact() {
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
  return (
    <div>
      <div>
        <div className="dz-bnr-inr dz-bnr-inr-sm text-center- overlay-primary-dark">
          <div className="container ">
            <strong className="d-flex text-primary justify-content-center mt-5">
              <h1>Contact Us</h1>
            </strong>
          </div>
        </div>
      </div>
      <section className="map-wrapper1 overflow-hidden  content-inner ">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-7 col-lg-7 col-md-12 col-12 ">
              <div className="form-wrapper style-1 ">
                <h2 className="title m-a0 wow fadeInUp" data-wow-delay="1.6s">
                  Get In touch
                </h2>
                <p
                  className="font-text text-primary p-b10 wow fadeInUp"
                  data-wow-delay="1.7s"
                >
                  We are here for you. How we can help?
                </p>
                <div className="contact-area">
                  <form className="needs-validation" noValidate>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter your name"
                          required
                          name="name"
                        />
                        <div className="invalid-feedback">
                          Please enter your name.
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter your email"
                          required
                          name="email"
                        />
                        <div className="invalid-feedback">
                          Please enter your email.
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Subject</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter the subject"
                          required
                          name="subject"
                        />
                        <div className="invalid-feedback">
                          Please enter the subject.
                        </div>
                      </div>
                      <div className="col-md-12 mb-3">
                        <label className="form-label">Message</label>
                        <textarea
                          className="form-control"
                          placeholder="Type your message..."
                          required
                          name="message"
                          rows={5}
                        />
                        <div className="invalid-feedback">
                          Please enter your message.
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-xl-5 col-lg-5 col-md-12 col-12">
              <img src="/assets/images/ab1.png" alt="img" width={700} />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 col-lg-3 border-top-md mb-4 border-end-md">
              <div className="py-7 text-center">
                <div className="mb-3">
                  <i className="fas fa fa-map-marker-alt fs-2 text-primary" />
                </div>
                <div className="lh-1">
                  <h2 className="mb-1">Office </h2>
                  <a href="https://maps.app.goo.gl/KFd4adjq2YzSsCnt8">
                    <span>insightstracker.fit HQ</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 border-top-md mb-4 border-end-lg">
              <div className="py-7 text-center">
                <div className="mb-3">
                  <i className="fas fa-phone-alt fs-2 text-primary" />
                </div>
                <div className="lh-1">
                  <h2 className="mb-1">Phone</h2>
                  <span>+18172722011</span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 border-top-lg mb-4 border-end-md">
              <div className="py-7 text-center">
                <div className="mb-3">
                  <i className="fas fa-envelope fs-2 text-primary" />
                </div>
                <div className="lh-1">
                  <h2 className="mb-1">Email</h2>
                  <span>support@insightstracker.fit</span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 border-top-lg mb-4">
              <div className="py-7 text-center">
                <div className="mb-3">
                  <i className="fas fa-clock fs-2 text-primary" />
                </div>
                <div className="lh-1">
                  <h2 className="mb-1">Working Hours</h2>
                  <span>Mon-Fri: 9am - 7pm</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <br></br>
      </section>
    </div>
  );
}

export default Contact;
