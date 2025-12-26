import { Link } from "react-router-dom";

import CalorieChart from "../charts/CalorieChart";
import DashboardAdminCharts from "../charts/DashBardAdminCharts";
import RadialChart from "../charts/RadialChart";
import Nutrients from "../charts/Nutrients";
import useDashStats from "../../../hooks/dashStats/useDashStats";
import { useEffect } from "react";
import useDietPlan from "../../../hooks/dieplan/useDietPlan";
import useWorkoutPlan from "../../../hooks/workoutplan/useWorkoutPlan";

function DashBoardAdmin() {
  const {
    adminDashboardStats,
    suggestedProducts,
    loading,
    error,
    fetchAdminDashStats,
    suggestProducts,
  } = useDashStats();
  const { fetchDietPlanItems, suggestDietPlan } = useDietPlan();
  const { fetchWorkoutPlanItems, suggestWorkplan } = useWorkoutPlan();
  const today = new Date();

  const formattedDate =
    today.getFullYear() +
    "-" +
    ("0" + (today.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + today.getDate()).slice(-2);

  useEffect(() => {
    const initDashboard = async () => {
      try {
        fetchAdminDashStats();
        suggestProducts();

        const dietData = await fetchDietPlanItems(formattedDate);
        const workoutData = await fetchWorkoutPlanItems(formattedDate);

        const isDietEmpty =
          !dietData || dietData.every((plan) => plan.items.length === 0);
        const isWorkoutEmpty =
          !workoutData || workoutData.every((plan) => plan.items.length === 0);

        if (isDietEmpty) {
          await suggestDietPlan(false);
          await fetchDietPlanItems(formattedDate);
        }

        if (isWorkoutEmpty) {
          await suggestWorkplan(false);
          await fetchWorkoutPlanItems(formattedDate);
        }
      } catch (err) {
        console.error("Dashboard initialization failed:", err);
      }
    };

    initDashboard();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!adminDashboardStats) {
    return <div>No data available</div>;
  }
  return (
    <div className="content-body">
      {/* row */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-3 col-md-4 col-sm-6">
            <div className="card">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="stat-icon me-3">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "60px",
                        height: "60px",
                        backgroundColor: "#0d6efd",
                      }}
                    >
                      <svg
                        width={30}
                        height={30}
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M26.1666 19.5283C27.8064 18.2461 29.0052 16.484 29.5958 14.4879C30.1863 12.4919 30.1393 10.3612 29.4611 8.39317C28.783 6.4251 27.5076 4.71772 25.8128 3.5091C24.118 2.30048 22.0883 1.65088 20.0066 1.65088C17.925 1.65088 15.8953 2.30048 14.2005 3.5091C12.5057 4.71772 11.2303 6.4251 10.5522 8.39317C9.87403 10.3612 9.82697 12.4919 10.4175 14.4879C11.0081 16.484 12.2069 18.2461 13.8466 19.5283C10.7486 20.761 8.09109 22.8939 6.21709 25.6517C4.34309 28.4096 3.33862 31.6657 3.33331 35V36.6667C3.33331 37.1087 3.50891 37.5326 3.82147 37.8452C4.13403 38.1577 4.55795 38.3333 4.99998 38.3333H35C35.442 38.3333 35.8659 38.1577 36.1785 37.8452C36.4911 37.5326 36.6666 37.1087 36.6666 36.6667V35C36.6624 31.6673 35.6599 28.4122 33.7884 25.6546C31.9169 22.8969 29.2622 20.7631 26.1666 19.5283ZM13.3333 11.6667C13.3333 10.3481 13.7243 9.0592 14.4569 7.96287C15.1894 6.86654 16.2306 6.01206 17.4488 5.50748C18.6669 5.00289 20.0074 4.87087 21.3006 5.12811C22.5938 5.38534 23.7817 6.02028 24.714 6.95263C25.6464 7.88498 26.2813 9.07286 26.5385 10.3661C26.7958 11.6593 26.6638 12.9997 26.1592 14.2179C25.6546 15.4361 24.8001 16.4773 23.7038 17.2098C22.6075 17.9423 21.3185 18.3333 20 18.3333C18.2319 18.3333 16.5362 17.631 15.2859 16.3807C14.0357 15.1305 13.3333 13.4348 13.3333 11.6667ZM6.66665 35C6.66665 31.4638 8.0714 28.0724 10.5719 25.5719C13.0724 23.0714 16.4638 21.6667 20 21.6667C23.5362 21.6667 26.9276 23.0714 29.4281 25.5719C31.9286 28.0724 33.3333 31.4638 33.3333 35H6.66665Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="stat-content">
                    <h3
                      className="mb-2"
                      style={{ fontSize: "24px", fontWeight: "600" }}
                    >
                      {adminDashboardStats.totalVendors}
                    </h3>
                    <p
                      className="mb-0"
                      style={{ fontSize: "16px", color: "#6c757d" }}
                    >
                      Vendors
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-4 col-sm-6">
            <div className="card">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="stat-icon me-3">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "60px",
                        height: "60px",
                        backgroundColor: "#198754",
                      }}
                    >
                      <i
                        className="fas fa-dollar-sign"
                        style={{ fontSize: "24px", color: "white" }}
                      ></i>
                    </div>
                  </div>
                  <div className="stat-content">
                    <h3
                      className="mb-2"
                      style={{ fontSize: "24px", fontWeight: "600" }}
                    >
                      ${adminDashboardStats.totalSales._sum.total_price || 0}
                    </h3>
                    <p
                      className="mb-0"
                      style={{ fontSize: "16px", color: "#6c757d" }}
                    >
                      Total Sale Amount
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-md-4 col-sm-6">
            <div className="card">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="stat-icon me-3">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "60px",
                        height: "60px",
                        backgroundColor: "#0dcaf0",
                      }}
                    >
                      <i
                        className="fa fa-list-alt"
                        style={{ fontSize: "24px", color: "white" }}
                      />
                    </div>
                  </div>
                  <div className="stat-content">
                    <h3
                      className="mb-2"
                      style={{ fontSize: "24px", fontWeight: "600" }}
                    >
                      {adminDashboardStats.totalProducts}
                    </h3>
                    <p
                      className="mb-0"
                      style={{ fontSize: "16px", color: "#6c757d" }}
                    >
                      Products
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-4 col-sm-6">
            <div className="card">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="stat-icon me-3">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "60px",
                        height: "60px",
                        backgroundColor: "#198754",
                      }}
                    >
                      <i
                        className="fa-solid fa-shopping-cart"
                        style={{ fontSize: "24px", color: "white" }}
                      />
                    </div>
                  </div>
                  <div className="stat-content">
                    <h3
                      className="mb-2"
                      style={{ fontSize: "24px", fontWeight: "600" }}
                    >
                      {adminDashboardStats.totalSalesCount || 0}
                    </h3>
                    <p
                      className="mb-0"
                      style={{ fontSize: "16px", color: "#6c757d" }}
                    >
                      Total No. of Sales
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-4 col-sm-6">
            <div className="card">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="stat-icon me-3">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "60px",
                        height: "60px",
                        backgroundColor: "#0d6efd",
                      }}
                    >
                      <svg
                        width={30}
                        height={30}
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M26.1666 19.5283C27.8064 18.2461 29.0052 16.484 29.5958 14.4879C30.1863 12.4919 30.1393 10.3612 29.4611 8.39317C28.783 6.4251 27.5076 4.71772 25.8128 3.5091C24.118 2.30048 22.0883 1.65088 20.0066 1.65088C17.925 1.65088 15.8953 2.30048 14.2005 3.5091C12.5057 4.71772 11.2303 6.4251 10.5522 8.39317C9.87403 10.3612 9.82697 12.4919 10.4175 14.4879C11.0081 16.484 12.2069 18.2461 13.8466 19.5283C10.7486 20.761 8.09109 22.8939 6.21709 25.6517C4.34309 28.4096 3.33862 31.6657 3.33331 35V36.6667C3.33331 37.1087 3.50891 37.5326 3.82147 37.8452C4.13403 38.1577 4.55795 38.3333 4.99998 38.3333H35C35.442 38.3333 35.8659 38.1577 36.1785 37.8452C36.4911 37.5326 36.6666 37.1087 36.6666 36.6667V35C36.6624 31.6673 35.6599 28.4122 33.7884 25.6546C31.9169 22.8969 29.2622 20.7631 26.1666 19.5283ZM13.3333 11.6667C13.3333 10.3481 13.7243 9.0592 14.4569 7.96287C15.1894 6.86654 16.2306 6.01206 17.4488 5.50748C18.6669 5.00289 20.0074 4.87087 21.3006 5.12811C22.5938 5.38534 23.7817 6.02028 24.714 6.95263C25.6464 7.88498 26.2813 9.07286 26.5385 10.3661C26.7958 11.6593 26.6638 12.9997 26.1592 14.2179C25.6546 15.4361 24.8001 16.4773 23.7038 17.2098C22.6075 17.9423 21.3185 18.3333 20 18.3333C18.2319 18.3333 16.5362 17.631 15.2859 16.3807C14.0357 15.1305 13.3333 13.4348 13.3333 11.6667ZM6.66665 35C6.66665 31.4638 8.0714 28.0724 10.5719 25.5719C13.0724 23.0714 16.4638 21.6667 20 21.6667C23.5362 21.6667 26.9276 23.0714 29.4281 25.5719C31.9286 28.0724 33.3333 31.4638 33.3333 35H6.66665Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="stat-content">
                    <h3
                      className="mb-2"
                      style={{ fontSize: "24px", fontWeight: "600" }}
                    >
                      {adminDashboardStats.totalUsers}
                    </h3>
                    <p
                      className="mb-0"
                      style={{ fontSize: "16px", color: "#6c757d" }}
                    >
                      Users
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-4 col-sm-6">
            <div className="card">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="stat-icon me-3">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "60px",
                        height: "60px",
                        backgroundColor: "#198754",
                      }}
                    >
                      <i
                        className="fa-solid fa-fire"
                        style={{ fontSize: "24px", color: "white" }}
                      />
                    </div>
                  </div>
                  <div className="stat-content">
                    <h3
                      className="mb-2"
                      style={{ fontSize: "24px", fontWeight: "600" }}
                    >
                      {adminDashboardStats.totalCaloriesBurned._sum.calories_burned.toFixed(
                        2
                      )}
                    </h3>
                    <p
                      className="mb-0"
                      style={{ fontSize: "16px", color: "#6c757d" }}
                    >
                      Calories Burnt (All Users)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-4 col-sm-6">
            <div className="card">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="stat-icon me-3">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "60px",
                        height: "60px",
                        backgroundColor: "#198754",
                      }}
                    >
                      <i
                        className="fa-solid fa-person-walking"
                        style={{ fontSize: "24px", color: "white" }}
                      />
                    </div>
                  </div>
                  <div className="stat-content">
                    <h3
                      className="mb-2"
                      style={{ fontSize: "24px", fontWeight: "600" }}
                    >
                      {adminDashboardStats.totalActivities}
                    </h3>
                    <p
                      className="mb-0"
                      style={{ fontSize: "16px", color: "#6c757d" }}
                    >
                      Activities
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-4 col-sm-6">
            <div className="card">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="stat-icon me-3">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "60px",
                        height: "60px",
                        backgroundColor: "#0d6efd",
                      }}
                    >
                      <i
                        className="fa-solid fa-utensils"
                        style={{ fontSize: "24px", color: "white" }}
                      />
                    </div>
                  </div>
                  <div className="stat-content">
                    <h3
                      className="mb-2"
                      style={{ fontSize: "24px", fontWeight: "600" }}
                    >
                      {adminDashboardStats.totalFoodItems || 0}
                    </h3>
                    <p
                      className="mb-0"
                      style={{ fontSize: "16px", color: "#6c757d" }}
                    >
                      Food items
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-4 col-sm-6">
            <div className="card">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="stat-icon me-3">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "60px",
                        height: "60px",
                        backgroundColor: "#0d6efd",
                      }}
                    >
                      <i
                        className="fa-solid fa-fire"
                        style={{ fontSize: "24px", color: "white" }}
                      />
                    </div>
                  </div>
                  <div className="stat-content">
                    <h3
                      className="mb-2"
                      style={{ fontSize: "24px", fontWeight: "600" }}
                    >
                      {adminDashboardStats?.weeklyProgress?._sum?.calories_burned != null
                      ? adminDashboardStats.weeklyProgress._sum.calories_burned.toFixed(2)
                      : "0.00"}

                    </h3>
                    <p
                      className="mb-0"
                      style={{ fontSize: "16px", color: "#6c757d" }}
                    >
                      Weekly Calories Burnt
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-4 col-sm-6">
            <div className="card">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="stat-icon me-3">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "60px",
                        height: "60px",
                        backgroundColor: "#198754",
                      }}
                    >
                      <i
                        className="fa-solid fa-utensils"
                        style={{ fontSize: "24px", color: "white" }}
                      />
                    </div>
                  </div>
                  <div className="stat-content">
                    <h3
                      className="mb-2"
                      style={{ fontSize: "24px", fontWeight: "600" }}
                    >
                      {adminDashboardStats.totalUserDietPrograms}
                    </h3>
                    <p
                      className="mb-0"
                      style={{ fontSize: "16px", color: "#6c757d" }}
                    >
                      Diet Programs
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-4 col-sm-6">
            <div className="card">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="stat-icon me-3">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "60px",
                        height: "60px",
                        backgroundColor: "#198754",
                      }}
                    >
                      <i
                        className="fa-solid fa-dumbbell"
                        style={{ fontSize: "24px", color: "white" }}
                      />
                    </div>
                  </div>
                  <div className="stat-content">
                    <h3
                      className="mb-2"
                      style={{ fontSize: "24px", fontWeight: "600" }}
                    >
                      {adminDashboardStats.totalUserWorkoutPrograms}
                    </h3>
                    <p
                      className="mb-0"
                      style={{ fontSize: "16px", color: "#6c757d" }}
                    >
                      Workout Programs
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-9 col-xxl-8">
            <div className="card">
              <div className="card-header flex-wrap pb-0 border-0">
                <div className="me-auto pe-3 mb-2">
                  <h4 className="text-black fs-20">Workout Statistic</h4>
                  <p className="fs-13 mb-2 mb-sm-0 text-black">
                    Activities performed
                  </p>
                </div>
              </div>
              <div className="card-body ">
                <DashboardAdminCharts />
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-xxl-4 col-md-6">
            <div className="card">
              <div className="card-header border-0 pb-0">
                <h4 className="text-black fs-20 mb-0">Workout Progress</h4>
              </div>
              <div className="card-body text-center">
                <RadialChart />

                <br></br>
                <Link
                  to="/dashboard/admin/workoutplan"
                  className="btn btn-outline-primary rounded"
                >
                  See Workout Plan
                </Link>
              </div>
            </div>
          </div>
          <Nutrients />
          <div className="col-xl-9 col-xxl-8">
            <div className="card">
              <div className="card-header d-sm-flex d-block pb-0 border-0">
                <div className="me-auto pe-3">
                  <h4 className="text-black fs-20">Calories Chart</h4>
                  <p className="fs-13 mb-0 text-black">
                    Analytics based on Calories burned
                  </p>
                </div>
              </div>
              <div className="card-body">
                <CalorieChart />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="card">
            <div className="card-header d-sm-flex d-block pb-0 border-0">
              <div className="me-auto">
                <h4 className="text-black fs-20">Suggested Products</h4>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                {Array.isArray(suggestedProducts) &&
                suggestedProducts.length > 0 ? (
                  suggestedProducts.map((product) => (
                    <div
                      key={product.id}
                      className="col-xl-3 col-xxl-3 col-md-4 col-sm-6"
                    >
                      <Link to={`/dashboard/admin/productdetail/${product.id}`}>
                        <div className="card border border-gray-200 border-2 rounded shadow-sm">
                          <div className="card-body product-grid-card">
                            <div className="new-arrival-product">
                              <div
                                className="new-arrivals-img-contnent"
                                style={{
                                  position: "relative",
                                  height: "200px",
                                  overflow: "hidden",
                                }}
                              >
                                <img
                                  className="img-fluid rounded"
                                  src={product.image_url}
                                  alt={product.name}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                  }}
                                />
                              </div>
                              <div className="new-arrival-content text-center mt-3">
                                <h4>{product.name}</h4>
                                <span className="price">${product.price}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center">
                    <p>No suggestions found or still loading...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoardAdmin;
