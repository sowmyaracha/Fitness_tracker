import React, { useEffect } from "react";
import useDietStats from "../../../hooks/dieplan/useDietStats";

function PersonalRecord() {
  const { personalRecord, loading, error, fetchPersonalRecord } =
    useDietStats();

  useEffect(() => {
    fetchPersonalRecord();
  }, []);

  // Ensure personalRecord is defined before rendering
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  // Check if personalRecord is not null or undefined
  if (!personalRecord || typeof personalRecord !== "object") {
    return <div>No workout data available</div>;
  }

  return (
    <div className="content-body">
      <div className="container-fluid">
        <div className="row">
         
          {Object.keys(personalRecord).map((activityName) => {
            const activitySessions = personalRecord[activityName];
            return (
              <div key={activityName} className="col-xl-4 col-xxl-6 col-lg-6">
                <div className="card">
                  <div className="card-header bg-warning">
                    <div className="d-flex me-3 align-items-center">
                      <span className="p-3 me-3 rounded-circle bg-white">
                        {/* SVG or icon for each activity */}
                        <i className="fas fa-chart-line"></i>
                      </span>
                      <h4 className="fs-20 text-white mb-0">{activityName}</h4>
                    </div>
                  </div>
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table shadow-hover">
                        <thead>
                          <tr>
                            <th>
                              <span className="font-w600 text-black fs-16">
                                Date
                              </span>
                            </th>
                            <th>
                              <span className="font-w600 text-black fs-16">
                                Duration
                              </span>
                            </th>
                            <th>
                              <span className="font-w600 text-black fs-16">
                                Calories Burned
                              </span>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {activitySessions.map((session, index) => (
                            <tr key={index}>
                              <td>
                                <p className="text-black mb-1 font-w600">
                                  {session.day}
                                </p>
                                <span className="fs-14">{session.date.split(",").slice(1).join(",").trim()}</span>
                              </td>
                              <td>
                                <p className="text-black mb-1 font-w600">
                                  {session.sessionDuration}
                                </p>
                              </td>
                              <td>
                                <p className="text-black mb-1 font-w600">
                                  {session.caloriesBurned}
                                </p>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PersonalRecord;
