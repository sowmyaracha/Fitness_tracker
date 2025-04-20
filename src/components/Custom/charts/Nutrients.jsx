import React, { useEffect, useState } from "react";
import useDietStats from "../../../hooks/dieplan/useDietStats";

export default function Nutrients() {
  const { dietStats, loading, error, fetchDietStats } = useDietStats();
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalFats, setTotalFats] = useState(0);
  const [totalCarbs, setTotalCarbs] = useState(0);

  useEffect(() => {
    fetchDietStats();
  }, []);

  useEffect(() => {
    if (dietStats && dietStats.length > 0) {
      let proteinSum = 0;
      let fatsSum = 0;
      let carbsSum = 0;

      dietStats.forEach((stat) => {
        // Assuming the stat is an object where the first key is the day, and the values contain the nutrient values
        const values = stat; // Use the `stat` directly as it contains the required values

        proteinSum += parseFloat(values.protein);
        fatsSum += parseFloat(values.fats);
        carbsSum += parseFloat(values.carbs);
      });

      setTotalProtein(proteinSum);
      setTotalFats(fatsSum);
      setTotalCarbs(carbsSum);
    }
  }, [dietStats]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!dietStats || dietStats.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="col-xl-3 col-xxl-4 col-md-6">
      <div className="card">
        <div className="card-header border-0 pb-0">
          <h4 className="text-black fs-20 mb-0">Nutrients Summary</h4>
        </div>
        <div className="card-body">
          {/* Protein Total */}
          <div className="media align-items-center border border-warning rounded p-3 mb-md-4 mb-3">
            <div className="d-inline-block me-3 position-relative donut-chart-sale2">
              <i className="fas fa-utensils"></i>
              <small className="text-primary"></small>
            </div>
            <div>
              <h4 className="fs-18 text-black mb-0">Total Protein</h4>
              <span className="fs-14 text-warning">
                {totalProtein.toFixed(2)} grams
              </span>
            </div>
          </div>

          {/* Fats Total */}
          <div className="media align-items-center border border-info rounded p-3 mb-md-4 mb-3">
            <div className="d-inline-block me-3 position-relative donut-chart-sale2">
              <i className="fas fa-utensils"></i>
              <small className="text-primary"></small>
            </div>
            <div>
              <h4 className="fs-18 text-black mb-0">Total Fats</h4>
              <span className="fs-14 text-info">
                {totalFats.toFixed(2)} grams
              </span>
            </div>
          </div>

          {/* Carbs Total */}
          <div className="media align-items-center border border-secondary rounded p-3">
            <div className="d-inline-block me-3 position-relative donut-chart-sale2">
              <i className="fas fa-utensils"></i>
              <small className="text-primary"></small>
            </div>
            <div>
              <h4 className="fs-18 text-black mb-0">Total Carbs</h4>
              <span className="fs-14 text-secondary">
                {totalCarbs.toFixed(2)} grams
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
