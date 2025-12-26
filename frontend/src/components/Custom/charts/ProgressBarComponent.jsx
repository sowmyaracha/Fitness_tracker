import React from "react";

const ProgressBarComponent = ({ progressData }) => {
  return (
    
    <div className="col-xl-12 col-md-6">
      <div className="card">
        <div className="card-header border-0 pb-0">
          <h4 className="text-black fs-20 mb-0">My Progress </h4>
        </div>
        <div className="card-body text-center">
          <div className="progress-container mb-4">
            {progressData.length === 0 && (
              <div className="col-xl-12">No data available</div>
            )}
            {progressData.map((item, index) => (
              <div key={index} className="mb-3">
                <span className="fs-14 text-black d-block">{item.label}</span>
                <div className="progress" style={{ height: "20px" }}>
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${item.percentage}%` }}
                    aria-valuenow={item.percentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    {item.percentage}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBarComponent;
