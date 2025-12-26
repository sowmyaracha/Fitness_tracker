function features() {
  return (
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
            Stay motivated by logging every workout and seeing your improvements
            over time.
          </p>
        </div>
      </div>
    </div>
  );
}

export default features;
