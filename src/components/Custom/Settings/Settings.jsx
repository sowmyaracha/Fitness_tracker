import { useEffect, useState } from "react";
import UpdateProfile from "./UpdateProfile";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

function Settings() {
  // Define state to store profile data
  const apiUrl = import.meta.env.VITE_API_URL;
  const [showPicModal, setShowPicModal] = useState(false);
  const [newPicFile, setNewPicFile] = useState(null);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    dob: "",
    bloodGroup: "",
    activityLevel: "",
    goal: "",
    height: "",
    weight: "",
    memberSince: "",
    totalCaloriesBurned: "",
    gender: "",
    weeklyProgress: "",
    profilePic: "",
  });

  // Fetch profile data when the component mounts
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/common/get-profile`, {
          withCredentials: true, // Ensure cookies are included in the request
        });
        if (response.data.success) {
          const data = response.data;

          const formattedDob = new Date(data.user.dob).toLocaleDateString(
            "en-CA"
          ); // "en-CA" for yyyy-mm-dd format
          const formattedMemberSince = new Date(
            data.user.created_at
          ).toLocaleDateString("en-CA");

          // Assuming the response structure is similar to this

          setProfileData((prevData) => ({
            ...prevData, // Spread the existing profile data to retain the already set values
            name: data.user?.name,
            email: data.user?.email,
            dob: formattedDob,
            memberSince: formattedMemberSince,
            totalCaloriesBurned: 1233, // Static value or replace with actual data if available
            gender: data.user?.gender,
            weeklyProgress: 80, // Static value or replace with actual data if available
            profilePic: data.user?.profilePic,
            bloodGroup: data.profile?.blood_group,
            activityLevel: data.profile?.activity_type,
            goal: data.profile?.goal,
            height: data.profile?.height,
            weight: data.profile?.weight,
          }));
        } else {
          console.error("Failed to fetch profile data");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <>
      <div className="content-body">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-4 col-lg-4">
              <div className="clearfix">
                <div className="row">
                  <div className="d-flex justify-content-center align-items-center min-vh-100">
                    <div
                      className="card p-4 shadow-sm"
                      style={{ maxWidth: "700px", width: "100%" }}
                    >
                      {/* <div className="mb-3 text-center">
                        <img
                          src={profileData.profilePic}
                          alt="User"
                          className="img-fluid rounded-circle"
                          width={150}
                        />
                      </div> */}
                      <div className="mb-3 text-center position-relative">
                        <img
                          src={profileData.profilePic}
                          alt="User"
                          className="img-fluid rounded-circle"
                          width={150}
                        />
                        <button
                          className="btn btn-sm btn-light border position-absolute p-1"
                          style={{
                            bottom: "10px",
                            right: "calc(50% - 75px)",
                            fontSize: "12px",
                          }}
                          onClick={() => setShowPicModal(true)}
                          title="Change profile picture"
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                      </div>

                      <h3 style={{ textAlign: "center" }}>
                        {profileData.name}
                      </h3>
                      <p style={{ textAlign: "center" }}>
                        Fitness Tracker Profile
                      </p>
                      <div></div>
                      <div className="text-start">
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item d-flex justify-content-between">
                            <strong>Name:</strong>{" "}
                            <span className="text-black">
                              {profileData.name}
                            </span>
                          </li>
                          <li className="list-group-item d-flex justify-content-between">
                            <strong>Email:</strong>{" "}
                            <span className="text-black">
                              {profileData.email}
                            </span>
                          </li>
                          <li className="list-group-item d-flex justify-content-between">
                            <strong>Date of Birth:</strong>{" "}
                            <span className="text-black">
                              {profileData.dob}
                            </span>
                          </li>
                          <li className="list-group-item d-flex justify-content-between">
                            <strong>Blood Group:</strong>{" "}
                            <span className="text-black">
                              {profileData.bloodGroup === "O_POSITIVE"
                                ? "O+"
                                : profileData.bloodGroup === "O_NEGATIVE"
                                ? "O-"
                                : profileData.bloodGroup === "A_POSITIVE"
                                ? "A+"
                                : profileData.bloodGroup === "A_NEGATIVE"
                                ? "A-"
                                : profileData.bloodGroup === "B_POSITIVE"
                                ? "B+"
                                : profileData.bloodGroup === "B_NEGATIVE"
                                ? "B-"
                                : profileData.bloodGroup === "AB_POSITIVE"
                                ? "AB+"
                                : profileData.bloodGroup === "AB_NEGATIVE"
                                ? "AB-"
                                : "Unknown"}
                            </span>
                          </li>
                          <li className="list-group-item d-flex justify-content-between">
                            <strong>Activity Level:</strong>{" "}
                            <span className="text-black">
                              {profileData.activityLevel === "SPORTS_PERSON"
                                ? "Athlete"
                                : profileData.activityLevel === "MODERATE"
                                ? "Moderate"
                                : profileData.activityLevel === "ACTIVE"
                                ? "Active"
                                : profileData.activityLevel === "LAZY"
                                ? "Inactive"
                                : "Unknown"}
                            </span>
                          </li>
                          <li className="list-group-item d-flex justify-content-between">
                            <strong>Goal:</strong>{" "}
                            <span className="text-black">
                              {profileData.goal === "LOSE"
                                ? "Lose Weight"
                                : profileData.goal === "MAINTAIN"
                                ? "Maintain Weight"
                                : profileData.goal === "GAIN"
                                ? "Increase Weight"
                                : "Unknown"}
                            </span>
                          </li>
                          <li className="list-group-item d-flex justify-content-between">
                            <strong>Height:</strong>{" "}
                            <span className="text-black">
                              {profileData.height} cm
                            </span>
                          </li>
                          <li className="list-group-item d-flex justify-content-between">
                            <strong>Weight:</strong>{" "}
                            <span className="text-black">
                              {profileData.weight} kgs
                            </span>
                          </li>
                          <li className="list-group-item d-flex justify-content-between">
                            <strong>Member Since:</strong>{" "}
                            <span className="text-black">
                              {profileData.memberSince}
                            </span>
                          </li>
                          <li className="list-group-item d-flex justify-content-between">
                            <strong>Total Calories Burned:</strong>{" "}
                            <span className="text-danger">
                              {profileData.totalCaloriesBurned}
                            </span>
                          </li>
                          <li className="list-group-item d-flex justify-content-between">
                            <strong>Gender:</strong>{" "}
                            <span className="text-black">
                              {profileData.gender}
                            </span>
                          </li>
                          <li className="list-group-item d-flex justify-content-between">
                            <strong>Weekly Progress:</strong>{" "}
                            <span className="fw-bold">
                              {profileData.weeklyProgress}%
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-8 col-lg-8">
              <div className="card card-bx m-b30">
                <div className="card-header">
                  <h6 className="title">Update Profile</h6>
                </div>
                <div className="card-body">
                  <div className="basic-form">
                    <UpdateProfile />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showPicModal} onHide={() => setShowPicModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Profile Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setNewPicFile(e.target.files[0])}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPicModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={async () => {
              if (!newPicFile) return;

              const formData = new FormData();
              formData.append("file", newPicFile);
              formData.append("upload_preset", "insightstracker"); // your cloudinary preset

              try {
                const res = await fetch(
                  "https://api.cloudinary.com/v1_1/dxckq9hel/image/upload",
                  { method: "POST", body: formData }
                );
                const data = await res.json();
                console.log(data);

                if (data.secure_url) {
                  // Send URL to backend to update user profile
                  await axios.post(
                    `${apiUrl}/api/common/upload-profile-picture`,
                    { profilePic: data.secure_url },
                    { withCredentials: true }
                  );
                  setProfileData((prev) => ({
                    ...prev,
                    profilePic: data.secure_url,
                  }));
                  setShowPicModal(false);
                  setNewPicFile(null);
                }
              } catch (error) {
                console.error("Failed to upload", error);
              }
            }}
          >
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
      ;
    </>
  );
}

export default Settings;
