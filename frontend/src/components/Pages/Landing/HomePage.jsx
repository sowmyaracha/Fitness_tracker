import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <section className="py-lg-16 py-8">
        <div className="container">
          {/* row */}
          <div className="row align-items-center ">
            {/* col */}
            <div className="col-lg-6 mb-6 mb-lg-0">
              <div className>
                <h1 className="display-4 fw-bold  py-5">
                  Personalised Fitness Tracker
                </h1>

                <p className="pe-lg-10 mb-5">
                  Track your workouts, monitor your diet, and achieve your
                  fitness goals with our all-in-one fitness tracker.
                </p>
                {/* btn */}
                <a href="/auth/signup" className="btn btn-primary">
                  Join Free Now
                </a>
              </div>
            </div>
            {/* col */}
            <div className="col-lg-6 d-flex justify-content-center ">
              {/* images */}
              <div className="position-relative">
                <img
                  src="/assets/images/hero1.png"
                  alt
                  className=" "
                  style={{ width: "110%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="py-8  bg-white mb-5 ">
        <div className="container mt-10">
          <div className="row mb-8 justify-content-center">
            {/* caption */}
            <div className="col-lg-8 col-md-12 col-12 text-center mt-5">
              <span className="text-primary mb-3 d-block text-uppercase fw-semibold ls-xl">
                Product Features
              </span>

              <p className="lead">
                This platform provides many features for collaboration of
                fitness tracking and management.
              </p>
            </div>
          </div>
          {/* row */}
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              {/* card */}
              <div className="card mb-4 card-hover">
                {/* img */}
                <div className>
                  <img
                    src="/assets/images/pf1.png"
                    alt
                    className="card-img-top img-fluid"
                  />
                </div>
                {/* card body */}
                <div className="card-body">
                  <h4 className="mb-0 fw-semibold">
                    {" "}
                    <a href="#" className="text-inherit">
                      Effortlessly Track Your Workouts and Progress
                    </a>
                  </h4>
                  <p className="mb-3">
                    Stay motivated by logging every workout and seeing your
                    improvements over time.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              {/* card */}
              <div className="card mb-4 card-hover">
                {/* img */}
                <div className>
                  <img
                    src="/assets/images/pf2.png"
                    alt
                    className="card-img-top img-fluid"
                  />
                </div>
                {/* card body */}
                <div className="card-body">
                  <h4 className="mb-0 fw-semibold">
                    {" "}
                    <a href="#" className="text-inherit">
                      Log Your Food Intake with Ease
                    </a>
                  </h4>
                  <p className="mb-3">
                    Keep track of your meals to ensure you’re meeting your
                    nutritional goals.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              {/* card */}
              <div className="card mb-4 card-hover">
                {/* img */}
                <div className>
                  <img
                    src="/assets/images/pf33.png"
                    alt
                    className="card-img-top img-fluid"
                  />
                </div>
                {/* card body */}
                <div className="card-body">
                  <h4 className="mb-0 fw-semibold">
                    {" "}
                    <a href="#" className="text-inherit">
                      Get Personalized Plans Tailored Just for You
                    </a>
                  </h4>
                  <p className="mb-3">
                    Receive customized workout and diet plans that fit your
                    lifestyle.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              {/* card */}
              <div className="card mb-4 card-hover">
                {/* img */}
                <div className>
                  <img
                    src="/assets/images/pf4.png"
                    alt
                    className="card-img-top img-fluid"
                  />
                </div>
                {/* card body */}
                <div className="card-body">
                  <h4 className="mb-0 fw-semibold">
                    {" "}
                    <a href="#" className="text-inherit">
                      Real-time Progress Tracking
                    </a>
                  </h4>
                  <p className="mb-3">
                    Monitor your daily fitness stats, steps, and calorie intake
                    in one place.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              {/* card */}
              <div className="card mb-4 card-hover">
                {/* img */}
                <div className>
                  <img
                    src="/assets/images/pf55.png"
                    alt
                    className="card-img-top img-fluid"
                  />
                </div>
                {/* card body */}
                <div className="card-body">
                  <h4 className="mb-0 fw-semibold">
                    {" "}
                    <a href="#" className="text-inherit">
                      Seamless E-Commerce Integration
                    </a>
                  </h4>
                  <p className="mb-3">
                    Buy fitness products, track orders, and manage your cart
                    effortlessly.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12">
              {/* card */}
              <div className="card mb-4 card-hover">
                {/* img */}
                <div className>
                  <img
                    src="/assets/images/pf5.png"
                    alt
                    className="card-img-top img-fluid"
                  />
                </div>
                {/* card body */}
                <div className="card-body">
                  <h4 className="mb-0 fw-semibold">
                    {" "}
                    <a href="#" className="text-inherit">
                      AI-Powered Recommendations
                    </a>
                  </h4>
                  <p className="mb-3">
                    Get personalized workout and diet suggestions based on your
                    goals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-8 ">
        <div className="container">
          <div className="row">
            <div className="offset-lg-2 col-lg-9 col-md-12 col-12 text-center">
              <span
                className="fs-4 text-primary mb-3 d-block text-uppercase
                  fw-semibold"
              >
                get things done
              </span>
              {/* heading  */}
              <h2 className="display-6 mt-4 mb-3  fw-bold">
                Transform Your Fitness Journey Today!
              </h2>
              {/* para  */}
              <p className="lead  px-lg-8 mb-6">
                Join us now for a free and start achieving your fitness goals
                effortlessly.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="py-8">
        {/* container */}
        <div className="container">
          <div className="row">
            <div className=" col-xl-12 col-12">
              <div className="row">
                <div className="col-xl-7 col-lg-7 col-md-12 col-12">
                  {/* heading */}

                  <h5 className="display-6 mt-4 mb-4 fw-bold">
                    Unlock Your Fitness Potential Today
                  </h5>
                  {/* para */}
                  <p className="fs-3  mb-5">
                    Experience the power of real-time stats and personalized
                    fitness plans. Our tracker helps you log workouts and meals
                    effortlessly.{" "}
                  </p>
                </div>
                <div className=" col-xl-5 col-lg-5 col-md-12 col-12">
                  <div className="position-relative">
                    <img
                      src="/assets/images/hb.png"
                      alt
                      className=" "
                      style={{ width: "110%" }}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <div className="row">
                  {/* content */}
                  <div className="col-lg-6 col-md-6 col-12">
                    <div className="mb-6 pe-xl-12">
                      <h3 className="mb-3 fw-bold">Real-Time Stats</h3>
                      <p className="mb-0 fs-4 ">
                        Stay updated with live feedback on your progress and
                        performance..
                      </p>
                    </div>
                    <Link to="/auth/login" className="btn btn-primary mt-4">
                      Learn more
                    </Link>
                  </div>
                  {/* content */}
                  <div className="col-lg-6 col-md-6 col-12">
                    <div className="mb-6 pe-xl-12">
                      <h3 className="mb-3 fw-bold">Personalized Plans</h3>
                      <p className="mb-0 fs-4 ">
                        Tailor your workout and diet plans to fit your unique
                        goals and preferences.
                      </p>
                    </div>
                    <Link to="/auth/login" className="btn btn-primary mt-4">
                      Start Tracking Now
                    </Link>
                  </div>
                  {/* content */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br></br>
    </div>
  );
}

export default HomePage;
