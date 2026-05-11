import { useEffect } from "react";
import useDashStats from "../../../hooks/dashStats/useDashStats";
import CalorieChart from "../charts/CalorieChart";
import DashboardAdminCharts from "../charts/DashBardAdminCharts";
import Nutrients from "../charts/Nutrients";
import RadialChart from "../charts/RadialChart";
import { Link } from "react-router-dom";
import useDietPlan from "../../../hooks/dieplan/useDietPlan";
import useWorkoutPlan from "../../../hooks/workoutplan/useWorkoutPlan";

function DashBoardUser() {
  const {
    userDashboardStats,
    suggestedProducts,
    loading,
    error,
    fetchUserDashStats,
    suggestProducts,
  } = useDashStats();
  const { dietPlanItems, fetchDietPlanItems, suggestDietPlan } = useDietPlan();
  const { workoutPlanItems, fetchWorkoutPlanItems, suggestWorkplan } =
    useWorkoutPlan();
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
        fetchUserDashStats();
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

  console.log(suggestedProducts);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!userDashboardStats) {
    return <div>No data available</div>;
  }
  return (
    {(!userDashboardStats?.profile?.height || !userDashboardStats?.profile?.weight) && (
  <div style={{
    background: "linear-gradient(135deg, #4CAF50, #45a049)",
    color: "white",
    padding: "12px 20px",
    borderRadius: "8px",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  }}>
    <span>👋 Welcome! Please complete your profile to get personalized diet and workout plans.</span>
    <a href="/dashboard/user/settings" style={{ color: "white", fontWeight: "bold", textDecoration: "underline" }}>
      Complete Profile →
    </a>
  </div>
)}
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
                        backgroundColor: "#6f42c1", // Purple for calories stats
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
                          d="M39.9353 18.3544C39.8731 18.1666 38.3337 13.75 32.5 13.75C25.9703 13.75 22.8666 17.9659 21.795 19.8719C20.6306 19.1822 19.1838 18.75 17.5 18.75C15.7922 18.75 14.35 19.1375 13.1275 19.7072C13.5697 16.695 13.6987 13.1119 13.7353 11.25H17.5C17.9175 11.25 18.3081 11.0413 18.54 10.6934L21.04 6.94344C21.4075 6.39156 21.2806 5.64813 20.7494 5.25031C18.3166 3.42531 15.1269 1.25 13.75 1.25C11.6137 1.25 6.95688 6.24344 5.16469 9.38C0.0584378 18.3153 0 31.925 0 32.5C0 32.8797 0.172188 33.2391 0.46875 33.4759C7.56469 39.1522 15.7519 40 20 40C23.3716 40 29.9756 39.4391 36.3306 35.6834C38.5938 34.3456 40 31.8706 40 29.2244V18.75C40 18.6156 39.9781 18.4822 39.9353 18.3544Z"
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
                      {(
                        userDashboardStats?.weeklyProgress?._sum
                          ?.calories_burned ?? 0
                      ).toFixed(2)}
                    </h3>
                    <p
                      className="mb-0"
                      style={{ fontSize: "16px", color: "#6c757d" }}
                    >
                      Weekly Calories Burned
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl col-md-4 col-sm-6">
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
                      {(
                        userDashboardStats?.totalCaloriesBurnedUser?._sum
                          ?.calories_burned ?? 0
                      ).toFixed(2)}
                    </h3>
                    <p
                      className="mb-0"
                      style={{ fontSize: "16px", color: "#6c757d" }}
                    >
                      Total Calories Burned
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl col-md-4 col-sm-6">
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
                      {userDashboardStats.totalUserDietPrograms}
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
                        backgroundColor: "#6610f2", // Indigo for workout stats
                      }}
                    >
                      <i
                        className="fa-solid fa-dumbbell"
                        style={{ fontSize: "24px", color: "white" }}
                      ></i>
                    </div>
                  </div>
                  <div className="stat-content">
                    <h3
                      className="mb-2"
                      style={{ fontSize: "24px", fontWeight: "600" }}
                    >
                      {userDashboardStats.totalUserWorkoutPrograms}
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
              <div className="card-body pt-3">
                {/* <div id="chartBar" /> */}
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
                {/* <div id="radialBar" /> */}
                <RadialChart />
                <p className="fs-14">
                  Progrees based on your fitness activity{" "}
                </p>
                <Link
                  to="/dashboard/user/workoutplan"
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

export default DashBoardUser;
