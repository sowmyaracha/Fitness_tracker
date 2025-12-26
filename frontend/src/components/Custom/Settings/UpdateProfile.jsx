import { useEffect, useState } from "react";
import useProfile from "../../../hooks/useProfile";
import { set } from "date-fns";
function UpdateProfile(props) {
  const apiUrl = import.meta.env.VITE_API_URL;
  let initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    dob: "",
    phone: "",
    bloodGroup: "",
    activityType: "",
    goal: "",
    height: 0,
    weight: 0,
    address: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  // const [profilePicFile, setProfilePicFile] = useState(null);
  const { isLoading, updateProfile, getProfile } = useProfile();
  const handleWeigthChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, weight: parseInt(value) }));
  };
  const handleHeightChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, height: parseInt(value) }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  // const handleFileChange = (e) => {
  //   setProfilePicFile(e.target.files[0]);
  // };
  // const uploadProfilePic = async () => {
  //   if (!profilePicFile) return null; // Skip upload if no file is selected
  //   const formDataObj = new FormData();
  //   formDataObj.append("file", profilePicFile);
  //   formDataObj.append("upload_preset", "insightstracker"); // Replace with your Cloudinary preset

  //   try {
  //     const response = await fetch(
  //       "https://api.cloudinary.com/v1_1/dxckq9hel/image/upload", // Replace with your Cloudinary URL
  //       {
  //         method: "POST",
  //         body: formDataObj,
  //       }
  //     );
  //     const data = await response.json();

  //     return data.secure_url;
  //   } catch (error) {
  //     console.error("Error uploading profile picture:", error);
  //     return null;
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data before proceeding

    // Handle Profile Picture Upload
    // const profilePicUrl = await uploadProfilePic();

    const dataToSend = {
      ...formData,

    };
    // After profile picture is uploaded and form data is updated

     await updateProfile(dataToSend);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const profileData = await getProfile();

      if (profileData) {
        const dob = new Date(profileData.user.dob);
        const formattedDob = dob.toISOString().split("T")[0];
        setFormData({
          firstName: profileData.user?.first_name,
          lastName: profileData.user?.last_name,
          email: profileData.user?.email,
          gender: profileData.user?.gender,
          dob: formattedDob,
          phone: profileData.profile?.phone,
          bloodGroup: profileData.profile?.blood_group,
          activityType: profileData.profile?.activity_type,
          goal: profileData.profile?.goal,
          height: profileData.profile?.height,
          weight: profileData.profile?.weight,
          address: profileData.profile?.address,
        });
      }
    };

    fetchProfile();
  }, []);
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
    <form className="needs-validation" noValidate onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6 mb-3 ">
          <label className="form-label">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter First Name"
            required
          />
          <div className="invalid-feedback">Please enter First Name.</div>
        </div>
        <div className="col-md-6 mb-3 ">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter Last Name"
            required
          />
          <div className="invalid-feedback">Please enter Last Name.</div>
        </div>
      </div>
      <div className="row">
        <div className=" col-md-6 mb-3 ">
          <label className="form-label">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="form-control"
            required
            defaultValue=""
          >
            <option value="" disabled>
              Choose Gender
            </option>
            <option>Male</option>
            <option>Female</option>
          </select>
          <div className="invalid-feedback">Please select Gender.</div>
        </div>
        <div className=" col-md-6 mb-3 ">
          <label className="form-label">DOB</label>
          <input
            type="date"
            className="form-control"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            placeholder="Enter Date of Birth"
            required
          />
          <div className="invalid-feedback">Please enter DOB.</div>
        </div>
      </div>
      <div className="row">
        <div className=" col-md-6 mb-3 ">
          <label className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter Phone"
            required
          />
          <div className="invalid-feedback">Please enter Phone.</div>
        </div>

        <div className=" col-md-6 mb-3 ">
          <label className="form-label">Blood Group</label>
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="form-control"
            required
            defaultValue=""
          >
            <option value="" disabled>
              Choose Blood Group
            </option>
            <option value="O_POSITIVE">O+</option>
            <option value="O_NEGATIVE">O-</option>
            <option value="A_POSITIVE">A+</option>
            <option value="A_NEGATIVE">A-</option>
            <option value="B_POSITIVE">B+</option>
            <option value="B_NEGATIVE">B-</option>
            <option value="AB_POSITIVE">AB+</option>
            <option value="AB_NEGATIVE">AB-</option>
          </select>
          <div className="invalid-feedback">Please select Blood Group.</div>
        </div>
      </div>
      <div className="row">
        <div className=" col-md-6 mb-3 ">
          <label className="form-label">Activity Level</label>
          <select
            name="activityType"
            value={formData.activityType}
            onChange={handleChange}
            className="form-control"
            required
            defaultValue=""
          >
            <option value="" disabled>
              Choose Activity
            </option>
            <option value="MODERATE">Moderate</option>
            <option value="ACTIVE">Active</option>
            <option value="LAZY">Inactive</option>
            <option value="SPORTS_PERSON">Athlete</option>
          </select>
          <div className="invalid-feedback">Please select Activity Level.</div>
        </div>
        <div className=" col-md-6 mb-3 ">
          <label className="form-label">Goal</label>
          <select
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            className="form-control"
            required
            defaultValue=""
          >
            <option value="" disabled>
              Choose Goal
            </option>
            <option value="LOSE">Lose Weight</option>

            <option value="MAINTAIN">Maintain Weight</option>
            <option value="GAIN">Increase Weight</option>
          </select>
          <div className="invalid-feedback">Please select Goal.</div>
        </div>
      </div>
      {/* <div className="row">
        <div className=" col-md-6 mb-3 ">
          <label className="form-label">Profile Picture</label>
          <input
            type="file"
            name="profilePic"
            onChange={handleFileChange}
            className="form-control"
            placeholder="Choose Profile Picture"
          />
          <div className="invalid-feedback">Select Profile Picture.</div>
        </div>
        <div className=" col-md-6 mb-3 ">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter Email"
            required
            readOnly
          />
          <div className="invalid-feedback">Please enter Email.</div>
        </div>
      </div> */}

      <div className="row">
        <div className=" col-md-6 mb-3 ">
          <label className="form-label">Height (cm)</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleHeightChange}
            className="form-control"
            placeholder="Enter Height"
            required
          />
          <div className="invalid-feedback">Please enter Height in cm.</div>
        </div>{" "}
        <div className=" col-md-6 mb-3 ">
          <label className="form-label">Weight (kgs)</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleWeigthChange}
            className="form-control"
            placeholder="Enter Weight"
            required
          />
          <div className="invalid-feedback">Please enter Weight in kg.</div>
        </div>
      </div>
      <div className=" col-md-12 mb-3 ">
        <label className="form-label">Address</label>
        <textarea
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter Address"
          rows="5"
          required
        />
        <div className="invalid-feedback">Please enter Address.</div>
      </div>
      <div className="d-flex justify-content-end">
        {" "}
        <button type="submit" className="btn btn-primary">
          {isLoading ? "Updating..." : "Update"}
        </button>
      </div>
    </form>
  );
}

export default UpdateProfile;
