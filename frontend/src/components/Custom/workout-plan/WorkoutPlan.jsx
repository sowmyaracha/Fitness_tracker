import { useEffect, useState } from "react";
import useWorkoutPlan from "../../../hooks/workoutplan/useWorkoutPlan";
import Workout from "../charts/Workout";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function WorkoutPlan() {
  const {
    workoutPlanItems,
    activities,
    fetchWorkoutPlanItems,
    updateWorkoutPlanItem,
    createActivity,
    deleteWorkoutPlanItem,
    createActivityLog,
    getActivites,
    suggestWorkplan,
  } = useWorkoutPlan();

  const [todaysWorkoutPlan, setTodaysWorkoutPlan] = useState([]);
  const [editedItems, setEditedItems] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [activityId, setActivityId] = useState("");
  const [activityDuration, setActivityDuration] = useState("");
  const [newActivity, setNewActivity] = useState({
    name: "",
    duration: 0,
    calories_per_kg: 0,
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [workoutGraphKey, setWorkoutGraphKey] = useState(0);

  const handleSuggestWorkoutPlan = async () => {
    const totalItems = todaysWorkoutPlan.reduce(
      (acc, group) => acc + group.items.length,
      0
    );

    if (totalItems >= 3) {
      toast.info("Workout plan already generated for today.");
      return;
    }
    toast.info("Suggesting Workout Plan...");
    await suggestWorkplan();

    // Update both today's plan and selected date plan
    const today = new Date();
    const formattedToday =
      today.getFullYear() +
      "-" +
      ("0" + (today.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + today.getDate()).slice(-2);

    const todaysPlan = await fetchWorkoutPlanItems(formattedToday);
    setTodaysWorkoutPlan(todaysPlan);

    // If selected date is today, update workoutPlanItems as well
    if (selectedDate.toDateString() === today.toDateString()) {
      await fetchWorkoutPlanItems(formattedToday);
    }

    setWorkoutGraphKey((prev) => prev + 1);
  };

  const handleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleDurationChange = (planItemId, duration) => {
    setEditedItems((prev) => ({
      ...prev,
      [planItemId]: {
        ...prev[planItemId],
        duration: parseFloat(duration), // Change quantity to duration
        // Keep the status value intact if it is already set in editedItems
        status:
          prev[planItemId]?.status ??
          workoutPlanItems
            .flatMap((plan) => plan.items)
            .find((item) => item.id === planItemId)?.status ??
          "PENDING", // Default to 'PENDING' if no status is found
      },
    }));
  };

  const handleStatusChange = (planItemId, status) => {
    setEditedItems((prev) => ({
      ...prev,
      [planItemId]: {
        ...prev[planItemId],
        status, // Update status
        duration:
          prev[planItemId]?.duration ??
          workoutPlanItems
            .flatMap((plan) => plan.items)
            .find((item) => item.id === planItemId)?.duration ??
          0, // Keep duration unchanged if not provided
      },
    }));
  };

  const handleSaveChanges = async () => {
    const updates = Object.entries(editedItems);
    for (const [id, values] of updates) {
      const itemId = parseInt(id, 10);
      const existingItem = workoutPlanItems
        .flatMap((plan) => plan.items)
        .find((item) => item.id === itemId);

      if (
        existingItem &&
        (existingItem.duration !== values.duration ||
          existingItem.status !== values.status)
      ) {
        await updateWorkoutPlanItem(itemId, values.status, values.duration);
      }
    }
    await fetchWorkoutPlanItems(selectedDate);
    setWorkoutGraphKey((prev) => prev + 1);
    setEditedItems({});
    setEditMode(false);
  };

  const handleDeleteItem = async (planItemId) => {
    await deleteWorkoutPlanItem(planItemId);
    await fetchWorkoutPlanItems(selectedDate);
    setWorkoutGraphKey((prev) => prev + 1);
  };

  const handleSubmitActivityLog = async (e) => {
    e.preventDefault();
    await createActivityLog(
      parseInt(activityId, 10),
      parseInt(activityDuration, 10)
    );
    setActivityId("");
    setActivityDuration("");
    fetchWorkoutPlanItems(formattedDate);
    setWorkoutGraphKey((prev) => prev + 1);
  };

  const handleSubmitAddActivity = async (e) => {
    e.preventDefault();
    await createActivity(newActivity);
    getActivites();
    setNewActivity({
      name: "",
      duration: 0,
      calories_per_kg: 0,
    });
  };

  const today = new Date();

  const formattedDate =
    today.getFullYear() +
    "-" +
    ("0" + (today.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + today.getDate()).slice(-2);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedSelectedDate =
      date.getFullYear() +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date.getDate()).slice(-2);
    fetchWorkoutPlanItems(formattedSelectedDate);
  };

  useEffect(() => {
    const initializeTodaysWorkoutPlan = async () => {
      const today = new Date();
      const formattedToday =
        today.getFullYear() +
        "-" +
        ("0" + (today.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + today.getDate()).slice(-2);

      const todaysPlan = await fetchWorkoutPlanItems(formattedToday);
      setTodaysWorkoutPlan(todaysPlan);
    };

    initializeTodaysWorkoutPlan();
    getActivites();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const formattedSelectedDate =
        selectedDate.getFullYear() +
        "-" +
        ("0" + (selectedDate.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + selectedDate.getDate()).slice(-2);
      fetchWorkoutPlanItems(formattedSelectedDate);
    }
  }, [selectedDate]);

  return (
    <div>
      <div className="content-body">
        {/* row */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-3 col-xxl-4">
              <div className="row">
                <div className="col-xl-12">
                  <div className="card flex-xl-column flex-md-row flex-column">
                    <div className="card-body border-bottom pb-4 p-2 event-calender">
                      <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        inline
                        className="form-control w-100"
                        dateFormat="dd/MM/yyyy"
                        calendarClassName="custom-datepicker"
                        wrapperClassName="w-100"
                        dayClassName={(date) =>
                          date.getDate() === selectedDate.getDate() &&
                          date.getMonth() === selectedDate.getMonth() &&
                          date.getFullYear() === selectedDate.getFullYear()
                            ? "selected-day"
                            : undefined
                        }
                        customInput={
                          <input
                            style={{
                              border: "none",
                              backgroundColor: "white",
                              color: "#6CC51D",
                              width: "100%",
                            }}
                          />
                        }
                      />
                      <style>
                        {`
                          .custom-datepicker {
                            width: 100% !important;
                            border: none !important;
                            background-color: white !important;
                          }
                          .react-datepicker {
                            width: 100% !important;
                          }
                          .react-datepicker__month-container {
                            width: 100% !important;
                          }
                          .react-datepicker__month {
                            width: 100% !important;
                          }
                          .react-datepicker__week {
                            display: flex !important;
                            justify-content: space-around !important;
                            width: 100% !important;
                          }
                          .react-datepicker__day {
                            flex: 1 !important;
                            height: 40px !important;
                            line-height: 40px !important;
                            margin: 2px !important;
                            display: flex !important;
                            align-items: center !important;
                            justify-content: center !important;
                          }
                          .react-datepicker__day-names {
                            display: flex !important;
                            justify-content: space-around !important;
                            width: 100% !important;
                          }
                          .react-datepicker__day-name {
                            flex: 1 !important;
                            color: #212631 !important;
                          }
                          .react-datepicker__day--selected {
                            background-color: #6CC51D !important;
                            color: white !important;
                            border-radius: 0.3rem;
                          }
                          .react-datepicker__day:hover {
                            background-color: #e7f5e0 !important;
                            color: #212631 !important;
                          }
                          .react-datepicker__header {
                            background-color: white !important;
                            border-bottom: none !important;
                            width: 100% !important;
                          }
                          .react-datepicker__current-month {
                            color: #212631 !important;
                            font-weight: bold;
                          }
                          .selected-day {
                            background-color: #6CC51D !important;
                            color: white !important;
                            border-radius: 0.3rem;
                          }
                        `}
                      </style>
                    </div>
                    <div className="card-body">
                      <h6 className="fs-16 text-black">
                        Suggested Today's Workout Plan
                      </h6>
                      {todaysWorkoutPlan && todaysWorkoutPlan.length > 0 ? (
                        <div className="mt-4">
                          {todaysWorkoutPlan.map((workoutPlan) => (
                            <div key={workoutPlan.id}>
                              {workoutPlan.items.map((item) => (
                                <div
                                  key={item.id}
                                  className="d-flex mb-4 align-items-center"
                                >
                                  <span className="date-icon me-3">
                                    {today.getDate()}
                                  </span>
                                  <div>
                                    <h6 className="fs-16">
                                      <a href="#" className="text-black">
                                        {item.activity}
                                      </a>
                                    </h6>
                                    <span>{item.status}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-5">
                          No workout plan items found for today.
                        </div>
                      )}

                      <button
                        type="button"
                        className="btn btn-outline-primary rounded"
                        data-bs-toggle="modal"
                        data-bs-target="#addNewPlan"
                      >
                        Add New Activity
                      </button>
                      {/* Modal */}
                      <div className="modal fade" id="addNewPlan">
                        <div
                          className="modal-dialog modal-dialog-centered"
                          role="document"
                        >
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title">Add New Activity</h5>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <form onSubmit={handleSubmitAddActivity}>
                                <div className="form-group">
                                  <label>Activity Name</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Activity Name"
                                    value={newActivity.name}
                                    onChange={(e) =>
                                      setNewActivity({
                                        ...newActivity,
                                        name: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div className="form-group">
                                  <label>Duration</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Activity Unit"
                                    value={newActivity.duration}
                                    onChange={(e) =>
                                      setNewActivity({
                                        ...newActivity,
                                        duration: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div className="form-group">
                                  <label>Calories per kg</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Calories per kg"
                                    value={newActivity.calories_per_kg}
                                    onChange={(e) =>
                                      setNewActivity({
                                        ...newActivity,
                                        calories_per_kg: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <button
                                  className="btn btn-primary"
                                  data-bs-dismiss="modal"
                                >
                                  Add New Activity
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
            </div>
            <div className="col-xl-9 col-xxl-8">
              <div className="row">
                <div className="col-xl-12">
                  <div className="card plan-list">
                    <div className="card-header d-sm-flex d-block pb-0 border-0 ">
                      <div className="me-auto pe-3">
                        <h4 className="text-black fs-20">Plan List</h4>
                      </div>
                      <button
                        type="button"
                        className="btn btn-outline-primary rounded me-3"
                        onClick={handleSuggestWorkoutPlan}
                      >
                        Suggest Workout
                      </button>
                      <a
                        href="javascript:void(0);"
                        data-bs-toggle="modal"
                        data-bs-target="#addNewPlan1"
                        className="btn btn-outline-primary rounded me-3"
                      >
                        Add Workout Log
                      </a>

                      {/* Modal */}
                      <div className="modal fade" id="addNewPlan1">
                        <div
                          className="modal-dialog modal-dialog-centered"
                          role="document"
                        >
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title">Add Workout Log</h5>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <form onSubmit={handleSubmitActivityLog}>
                                <div className="form-group">
                                  <label>Activity</label>
                                  <select
                                    name="activityId"
                                    value={activityId}
                                    onChange={(e) =>
                                      setActivityId(e.target.value)
                                    }
                                    className="form-control input-btn input-number"
                                    style={{
                                      maxHeight: "100px",
                                      overflowY: "auto",
                                      display: "block",
                                    }}
                                  >
                                    <option value="" disabled>
                                      Select an activity
                                    </option>
                                    {activities.map((activity) => (
                                      <option
                                        key={activity.id}
                                        value={activity.id}
                                      >
                                        {activity.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                <div className="form-group">
                                  <label>Duration</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Duration"
                                    value={activityDuration}
                                    onChange={(e) =>
                                      setActivityDuration(e.target.value)
                                    }
                                  />
                                </div>
                                <button
                                  className="btn btn-primary"
                                  data-bs-dismiss="modal"
                                >
                                  Add Workout Log
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="btn btn-outline-primary rounded me-3"
                        onClick={handleEditMode}
                      >
                        Edit
                      </button>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-responsive-md">
                          <thead>
                            <tr>
                              <th>Activity</th>
                              <th>Duration (in mins)</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {workoutPlanItems.map((workoutplan) =>
                              workoutplan.items.map((item) => (
                                <tr key={item.id}>
                                  <td>{item.activity}</td>
                                  <td>
                                    {editMode ? (
                                      <input
                                        type="number"
                                        step={0.1}
                                        className="form-control"
                                        value={
                                          editedItems[item.id]?.duration ??
                                          item.duration
                                        }
                                        onChange={(e) =>
                                          handleDurationChange(
                                            item.id,
                                            e.target.value
                                          )
                                        }
                                      />
                                    ) : (
                                      <p className="mb-0">
                                        {item.duration} min
                                      </p>
                                    )}
                                  </td>
                                  <td>
                                    {editMode ? (
                                      <div className="dropdown mt-sm-0 mt-3">
                                        <select
                                          name="status"
                                          className="form-control input-btn input-number"
                                          value={
                                            editedItems[item.id]?.status ??
                                            item.status
                                          }
                                          onChange={(e) =>
                                            handleStatusChange(
                                              item.id,
                                              e.target.value
                                            )
                                          }
                                        >
                                          <option value="PENDING">
                                            Pending
                                          </option>
                                          <option value="COMPLETED">
                                            Completed
                                          </option>
                                        </select>
                                      </div>
                                    ) : (
                                      <p className="mb-0 text-capitalize">
                                        {item.status.toLowerCase()}
                                      </p>
                                    )}
                                  </td>
                                  <td>
                                    <div className="dropdown">
                                      <button
                                        type="button"
                                        className="btn btn-success light sharp"
                                        data-bs-toggle="dropdown"
                                      >
                                        <svg
                                          width="20px"
                                          height="20px"
                                          viewBox="0 0 24 24"
                                          version="1.1"
                                        >
                                          <g
                                            stroke="none"
                                            strokeWidth={1}
                                            fill="none"
                                            fillRule="evenodd"
                                          >
                                            <rect
                                              x={0}
                                              y={0}
                                              width={24}
                                              height={24}
                                            />
                                            <circle
                                              fill="#000000"
                                              cx={5}
                                              cy={12}
                                              r={2}
                                            />
                                            <circle
                                              fill="#000000"
                                              cx={12}
                                              cy={12}
                                              r={2}
                                            />
                                            <circle
                                              fill="#000000"
                                              cx={19}
                                              cy={12}
                                              r={2}
                                            />
                                          </g>
                                        </svg>
                                      </button>
                                      <div className="dropdown-menu">
                                        <a
                                          className="dropdown-item"
                                          href="#"
                                          onClick={() =>
                                            handleDeleteItem(item.id)
                                          }
                                        >
                                          Delete
                                        </a>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                        {editMode && (
                          <div className="d-flex justify-content-end mt-3">
                            <button
                              className="btn btn-primary me-2"
                              onClick={handleSaveChanges}
                            >
                              Update
                            </button>
                            <button
                              className="btn btn-secondary"
                              onClick={() => setEditMode(false)}
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-12 col-xxl-12 col-md-6 ">
                  <div className="card">
                    <div className="card-header border-0 pb-0">
                      <h5 className="text-black fs-20 mb-0">
                        Weekly Workout Progress
                      </h5>
                    </div>
                    <br></br>
                    <Workout key={workoutGraphKey} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkoutPlan;
