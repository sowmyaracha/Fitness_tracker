// import { useEffect, useState } from "react";

// function Integrations() {
//   const [integrations, setIntegrations] = useState([
//     {
//       id: 1,
//       integrationName: "OpenAI",
//       apiKey: "abc123",
//     },
//     {
//       id: 2,
//       integrationName: "Stripe",
//       apiKey: "def456",
//     },
//     {
//       id: 3,
//       integrationName: "Twilio",
//       apiKey: "ghi789",
//     },
//   ]);

//   const [formData, setFormData] = useState({
//     id: null,
//     integrationName: "",
//     apiKey: "",
//   });

//   const [isEditMode, setIsEditMode] = useState(false);

//   useEffect(() => {
//     (function () {
//       "use strict";
//       const forms = document.querySelectorAll(".needs-validation");
//       Array.prototype.slice.call(forms).forEach(function (form) {
//         form.addEventListener(
//           "submit",
//           function (event) {
//             if (!form.checkValidity()) {
//               event.preventDefault();
//               event.stopPropagation();
//             }
//             form.classList.add("was-validated");
//           },
//           false
//         );
//       });
//     })();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (isEditMode) {
//       setIntegrations((prevIntegrations) =>
//         prevIntegrations.map((integration) =>
//           integration.id === formData.id
//             ? { ...integration, ...formData }
//             : integration
//         )
//       );
//     } else {
//       setIntegrations((prevIntegrations) => [
//         ...prevIntegrations,
//         { ...formData, id: prevIntegrations.length + 1 },
//       ]);
//     }
//     setFormData({
//       id: null,
//       integrationName: "",
//       apiKey: "",
//     });
//     setIsEditMode(false);
//   };

//   const handleEdit = (integration) => {
//     setFormData(integration);
//     setIsEditMode(true);
//   };

//   const handleDelete = (id) => {
//     setIntegrations((prevIntegrations) =>
//       prevIntegrations.filter((integration) => integration.id !== id)
//     );
//   };

//   return (
//     <div>
//       <div className="content-body">
//         <div className="container-fluid">
//           <div className="card card-bx m-b30">
//             <div className="card-header">
//               <h6 className="title">Manage Integration</h6>
//             </div>
//             <div className="card-body">
//               <div className="basic-form">
//                 <form
//                   className="needs-validation"
//                   noValidate
//                   onSubmit={handleSubmit}
//                 >
//                   <div className="row">
//                     <div className="col-md-6 mb-3">
//                       <label className="form-label">Integration Name</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Enter Integration Name"
//                         required
//                         name="integrationName"
//                         value={formData.integrationName}
//                         onChange={handleChange}
//                       />
//                       <div className="invalid-feedback">
//                         Please enter Integration Name.
//                       </div>
//                     </div>
//                     <div className="col-md-6 mb-3">
//                       <label className="form-label">API Key</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Enter API Key"
//                         required
//                         name="apiKey"
//                         value={formData.apiKey}
//                         onChange={handleChange}
//                       />
//                       <div className="invalid-feedback">
//                         Please enter API Key.
//                       </div>
//                     </div>
//                   </div>

//                   <div className="d-flex justify-content-end">
//                     <button type="submit" className="btn btn-primary">
//                       {isEditMode ? "Edit" : "Add"}
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>

//           <div className="row">
//             <div className="col-lg-12">
//               <div className="card">
//                 <div className="card-header">
//                   <h4 className="card-title">Integration Items</h4>
//                 </div>
//                 <div className="card-body">
//                   <div className="table-responsive">
//                     <table className="table table-responsive-md">
//                       <thead>
//                         <tr>
//                           <th style={{ width: 80 }}>#</th>
//                           <th>Integration Name</th>
//                           <th>API Key</th>
//                           <th>Action</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {integrations.map((integration) => (
//                           <tr key={integration.id}>
//                             <td>
//                               <strong className="text-black">
//                                 {String(integration.id).padStart(2, "0")}
//                               </strong>
//                             </td>
//                             <td>{integration.integrationName}</td>
//                             <td>{integration.apiKey}</td>
//                             <td>
//                               <div className="dropdown">
//                                 <button
//                                   type="button"
//                                   className="btn btn-success light sharp"
//                                   data-bs-toggle="dropdown"
//                                 >
//                                   <svg
//                                     width="20px"
//                                     height="20px"
//                                     viewBox="0 0 24 24"
//                                     version="1.1"
//                                   >
//                                     <g
//                                       stroke="none"
//                                       strokeWidth={1}
//                                       fill="none"
//                                       fillRule="evenodd"
//                                     >
//                                       <rect
//                                         x={0}
//                                         y={0}
//                                         width={24}
//                                         height={24}
//                                       />
//                                       <circle
//                                         fill="#000000"
//                                         cx={5}
//                                         cy={12}
//                                         r={2}
//                                       />
//                                       <circle
//                                         fill="#000000"
//                                         cx={12}
//                                         cy={12}
//                                         r={2}
//                                       />
//                                       <circle
//                                         fill="#000000"
//                                         cx={19}
//                                         cy={12}
//                                         r={2}
//                                       />
//                                     </g>
//                                   </svg>
//                                 </button>
//                                 <div className="dropdown-menu">
//                                   <a
//                                     className="dropdown-item"
//                                     href="#"
//                                     onClick={() => handleEdit(integration)}
//                                   >
//                                     Edit
//                                   </a>
//                                   <a
//                                     className="dropdown-item"
//                                     href="#"
//                                     onClick={() => handleDelete(integration.id)}
//                                   >
//                                     Delete
//                                   </a>
//                                 </div>
//                               </div>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Integrations;
import { useEffect, useState } from "react";

function Integrations() {
  const [integrations, setIntegrations] = useState([
    {
      id: 1,
      integrationName: "OpenAI",
      apiKey: "abc123",
    },
    {
      id: 2,
      integrationName: "Stripe",
      apiKey: "def456",
    },
    {
      id: 3,
      integrationName: "Twilio",
      apiKey: "ghi789",
    },
  ]);

  const [formData, setFormData] = useState({
    id: null,
    integrationName: "",
    apiKey: "",
  });

  const [isEditMode, setIsEditMode] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      setIntegrations((prevIntegrations) =>
        prevIntegrations.map((integration) =>
          integration.id === formData.id
            ? { ...integration, ...formData }
            : integration
        )
      );
    } else {
      setIntegrations((prevIntegrations) => [
        ...prevIntegrations,
        { ...formData, id: prevIntegrations.length + 1 },
      ]);
    }
    setFormData({
      id: null,
      integrationName: "",
      apiKey: "",
    });
    setIsEditMode(false);
  };

  const handleEdit = (integration) => {
    setFormData(integration);
    setIsEditMode(true);
  };

  const handleDelete = (id) => {
    setIntegrations((prevIntegrations) =>
      prevIntegrations.filter((integration) => integration.id !== id)
    );
  };

  // Utility function to mask API key
  const maskApiKey = (apiKey) => {
    return apiKey ? "******" : "";
  };

  return (
    <div>
      <div className="content-body">
        <div className="container-fluid">
          <div className="card card-bx m-b30">
            <div className="card-header">
              <h6 className="title">Manage Integration</h6>
            </div>
            <div className="card-body">
              <div className="basic-form">
                <form
                  className="needs-validation"
                  noValidate
                  onSubmit={handleSubmit}
                >
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Integration Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Integration Name"
                        required
                        name="integrationName"
                        value={formData.integrationName}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">
                        Please enter Integration Name.
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">API Key</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter API Key"
                        required
                        name="apiKey"
                        value={formData.apiKey}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">
                        Please enter API Key.
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary">
                      {isEditMode ? "Edit" : "Add"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Integration Items</h4>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-responsive-md">
                      <thead>
                        <tr>
                          <th style={{ width: 80 }}>#</th>
                          <th>Integration Name</th>
                          <th>API Key</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {integrations.map((integration) => (
                          <tr key={integration.id}>
                            <td>
                              <strong className="text-black">
                                {String(integration.id).padStart(2, "0")}
                              </strong>
                            </td>
                            <td>{integration.integrationName}</td>
                            <td>{maskApiKey(integration.apiKey)}</td>{" "}
                            {/* Masking the API key */}
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
                                    onClick={() => handleEdit(integration)}
                                  >
                                    Edit
                                  </a>
                                  <a
                                    className="dropdown-item"
                                    href="#"
                                    onClick={() => handleDelete(integration.id)}
                                  >
                                    Delete
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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

export default Integrations;
