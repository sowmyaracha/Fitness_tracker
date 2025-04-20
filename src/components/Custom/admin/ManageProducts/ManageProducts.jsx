// import React, { useState, useEffect, useRef } from "react";
// import useManageProducts from "../../../../hooks/admin/useManageProducts";

// function ManageProducts() {
//   const {
//     products,
//     createProduct,
//     updateProduct,
//     deleteProduct,
//     fetchProducts,
//   } = useManageProducts();

//   const [formData, setFormData] = useState({
//     id: null,
//     productName: "",
//     stock: "",
//     price: "",
//     category: "",
//     productImage: null,
//     description: "",
//     status: "",
//   });

//   const [productImageFile, setProductImageFile] = useState(null);
//   const fileInputRef = useRef(null);
//   const [isEditMode, setIsEditMode] = useState(false);

//   const categoryOptions = [
//     "Electronics",
//     "Gadgets",
//     "Home",
//     "Decor",
//     "Books",
//     "Education",
//   ];

//   const statusOptions = ["ACTIVE", "INACTIVE"];

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

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setProductImageFile(file); // Only set the file
//     // No need to update formData.productImage here
//   };

//   const uploadProductImage = async () => {
//     const formDataObj = new FormData();
//     formDataObj.append("file", productImageFile);
//     formDataObj.append("upload_preset", "insightstracker"); // Replace with your Cloudinary preset

//     try {
//       const response = await fetch(
//         "https://api.cloudinary.com/v1_1/dxckq9hel/image/upload", // Replace with your Cloudinary URL
//         {
//           method: "POST",
//           body: formDataObj,
//         }
//       );
//       const data = await response.json();
//       return data.secure_url;
//     } catch (error) {
//       console.error("Error uploading product image:", error);
//       return null;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const form = e.target;

//     if (!form.checkValidity()) {
//       form.classList.add("was-validated");
//       return;
//     }

//     let productImageUrl = formData.productImage; // This will be Cloudinary URL

//     if (productImageFile) {
//       const uploadedUrl = await uploadProductImage();
//       if (!uploadedUrl) return;
//       productImageUrl = uploadedUrl;
//     }

//     const productData = {
//       name: formData.productName,
//       stock: parseInt(formData.stock),
//       price: parseFloat(formData.price),
//       category: formData.category,
//       image_url: productImageUrl, // This will now be Cloudinary URL
//       description: formData.description,
//       status: formData.status,
//     };

//     if (isEditMode) {
//       await updateProduct(formData.id, productData);
//     } else {
//       await createProduct(productData);
//     }

//     // Reset everything after submit
//     setFormData({
//       id: null,
//       productName: "",
//       stock: "",
//       price: "",
//       category: "",
//       productImage: null,
//       description: "",
//       status: "",
//     });
//     setProductImageFile(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//     setIsEditMode(false);
//     form.classList.remove("was-validated");
//     await fetchProducts();
//   };

//   const handleReset = (e) => {
//     e.preventDefault();
//     setFormData({
//       id: null,
//       productName: "",
//       stock: "",
//       price: "",
//       category: "",
//       productImage: null,
//       description: "",
//       status: "",
//     });
//     setProductImageFile(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//     setIsEditMode(false);
//     const formElement = document.querySelector(".needs-validation");
//     formElement.classList.remove("was-validated");
//   };

//   const handleEdit = (product) => {
//     setFormData({
//       id: product.id,
//       productName: product.name,
//       stock: product.stock,
//       price: product.price,
//       category: product.category,
//       productImage: product.image_url,
//       description: product.description,
//       status: product.status,
//     });
//     setIsEditMode(true);
//   };

//   const handleDelete = async (id) => {
//     await deleteProduct(id);
//   };

//   return (
//     <div>
//       <div className="content-body">
//         <div className="container-fluid">
//           <div className="card card-bx m-b30">
//             <div className="card-header">
//               <h6 className="title">Manage Products</h6>
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
//                       <label className="form-label">Product Name</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Enter Product Name"
//                         required
//                         name="productName"
//                         value={formData.productName}
//                         onChange={handleChange}
//                       />
//                       <div className="invalid-feedback">
//                         Please enter Product Name.
//                       </div>
//                     </div>
//                     <div className="col-md-6 mb-3">
//                       <label className="form-label">Quantity</label>
//                       <input
//                         type="number"
//                         className="form-control"
//                         placeholder="Enter Quantity"
//                         required
//                         name="stock"
//                         value={formData.stock}
//                         onChange={handleChange}
//                       />
//                       <div className="invalid-feedback">
//                         Please enter Quantity.
//                       </div>
//                     </div>
//                     <div className="col-md-6 mb-3">
//                       <label className="form-label">Price</label>
//                       <input
//                         type="number"
//                         className="form-control"
//                         placeholder="Enter Price"
//                         required
//                         name="price"
//                         value={formData.price}
//                         onChange={handleChange}
//                       />
//                       <div className="invalid-feedback">
//                         Please enter Price.
//                       </div>
//                     </div>
//                     <div className="col-md-6 mb-3">
//                       <label className="form-label">Category</label>
//                       <select
//                         name="category"
//                         className="form-control"
//                         required
//                         value={formData.category}
//                         onChange={handleChange}
//                       >
//                         <option value="" disabled>
//                           Choose Category
//                         </option>
//                         {categoryOptions.map((category) => (
//                           <option key={category} value={category}>
//                             {category}
//                           </option>
//                         ))}
//                       </select>
//                       <div className="invalid-feedback">
//                         Please select Category.
//                       </div>
//                     </div>
//                     <div className="col-md-6 mb-3">
//                       <label className="form-label">Product Image</label>
//                       <input
//                         type="file"
//                         className="form-control"
//                         placeholder="Choose Product Image"
//                         required={!isEditMode}
//                         onChange={handleImageChange}
//                         ref={fileInputRef}
//                       />
//                       <div className="invalid-feedback">
//                         Select Product Image.
//                       </div>
//                     </div>
//                     <div className="col-md-6 mb-3">
//                       <label className="form-label">Description</label>
//                       <textarea
//                         className="form-control"
//                         placeholder="Enter Description"
//                         required
//                         name="description"
//                         value={formData.description}
//                         onChange={handleChange}
//                       />
//                       <div className="invalid-feedback">
//                         Please enter Description.
//                       </div>
//                     </div>
//                     <div className="col-md-6 mb-3">
//                       <label className="form-label">Status</label>
//                       <select
//                         name="status"
//                         className="form-control"
//                         required
//                         value={formData.status}
//                         onChange={handleChange}
//                       >
//                         <option value="" disabled>
//                           Choose Status
//                         </option>
//                         {statusOptions.map((status) => (
//                           <option key={status} value={status}>
//                             {status}
//                           </option>
//                         ))}
//                       </select>
//                       <div className="invalid-feedback">
//                         Please select Status.
//                       </div>
//                     </div>
//                   </div>

//                   <div className="d-flex justify-content-end gap-2">
//                     <button type="submit" className="btn btn-primary">
//                       {isEditMode ? "Edit" : "Add"}
//                     </button>
//                     <button
//                       type="button"
//                       className="btn btn-primary"
//                       onClick={handleReset}
//                     >
//                       Reset
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
//                   <h4 className="card-title">Product Items</h4>
//                 </div>
//                 <div className="card-body">
//                   <div className="table-responsive">
//                     <table className="table table-responsive-md">
//                       <thead>
//                         <tr>
//                           <th style={{ width: 80 }}>#</th>
//                           <th>Product Image</th>
//                           <th>Product Name</th>
//                           <th>Quantity</th>
//                           <th>Price</th>
//                           <th>Category</th>
//                           <th>Status</th>
//                           <th>Description</th>
//                           <th>Action</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {products.map((product) => (
//                           <tr key={product.id}>
//                             <td>
//                               <strong className="text-black">
//                                 {String(product.id).padStart(2, "0")}
//                               </strong>
//                             </td>
//                             <td>
//                               <div className="d-flex align-items-center">
//                                 <div
//                                   style={{
//                                     width: "100px",
//                                     height: "60px",
//                                     overflow: "hidden",
//                                   }}
//                                 >
//                                   <img
//                                     src={
//                                       product.image_url ||
//                                       "/assets/images/product/1.jpg"
//                                     }
//                                     style={{
//                                       width: "100%",
//                                       height: "100%",
//                                       objectFit: "contain",
//                                     }}
//                                     className="rounded-lg me-2"
//                                     width={70}
//                                     alt=""
//                                   />
//                                 </div>
//                               </div>
//                             </td>
//                             <td>{product.name}</td>
//                             <td>{product.stock}</td>
//                             <td>{product.price}</td>
//                             <td>{product.category}</td>
//                             <td>{product.status}</td>
//                             <td
//                               style={{
//                                 maxWidth: "200px",
//                                 whiteSpace: "nowrap",
//                                 overflow: "hidden",
//                                 textOverflow: "ellipsis",
//                               }}
//                             >
//                               {product.description}
//                             </td>
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
//                                     onClick={() => handleEdit(product)}
//                                   >
//                                     Edit
//                                   </a>
//                                   <a
//                                     className="dropdown-item"
//                                     href="#"
//                                     onClick={() => handleDelete(product.id)}
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

// export default ManageProducts;
import React, { useState, useEffect, useRef } from "react";
import useManageProducts from "../../../../hooks/admin/useManageProducts";

function ManageProducts() {
  const {
    products,
    createProduct,
    updateProduct,
    deleteProduct,
    fetchProducts,
  } = useManageProducts();

  const [formData, setFormData] = useState({
    id: null,
    productName: "",
    stock: "",
    price: "",
    category: "",
    productImage: null,
    description: "",
    status: "",
  });

  const [productImageFile, setProductImageFile] = useState(null);
  const fileInputRef = useRef(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const categoryOptions = [
    "Accessories",
    "Electronics",
    "Equipment",
    "Footwear",
    "Gadgets",
    "Indoor",
    "Supplements",
  ];

  const statusOptions = ["ACTIVE", "INACTIVE"];

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductImageFile(file); // Only set the file
    // No need to update formData.productImage here
  };

  const uploadProductImage = async () => {
    const formDataObj = new FormData();
    formDataObj.append("file", productImageFile);
    formDataObj.append("upload_preset", "insightstracker"); // Replace with your Cloudinary preset

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dxckq9hel/image/upload", // Replace with your Cloudinary URL
        {
          method: "POST",
          body: formDataObj,
        }
      );
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading product image:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    let productImageUrl = formData.productImage; // This will be Cloudinary URL

    if (productImageFile) {
      const uploadedUrl = await uploadProductImage();
      if (!uploadedUrl) return;
      productImageUrl = uploadedUrl;
    }

    const productData = {
      name: formData.productName,
      stock: parseInt(formData.stock),
      price: parseFloat(formData.price),
      category: formData.category,
      image_url: productImageUrl, // This will now be Cloudinary URL
      description: formData.description,
      status: formData.status,
    };

    if (isEditMode) {
      await updateProduct(formData.id, productData);
    } else {
      await createProduct(productData);
    }

    // Reset everything after submit
    setFormData({
      id: null,
      productName: "",
      stock: "",
      price: "",
      category: "",
      productImage: null,
      description: "",
      status: "",
    });
    setProductImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setIsEditMode(false);
    form.classList.remove("was-validated");
    await fetchProducts();
  };

  const handleReset = (e) => {
    e.preventDefault();
    setFormData({
      id: null,
      productName: "",
      stock: "",
      price: "",
      category: "",
      productImage: null,
      description: "",
      status: "",
    });
    setProductImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setIsEditMode(false);
    const formElement = document.querySelector(".needs-validation");
    formElement.classList.remove("was-validated");
  };

  const handleEdit = (product) => {
    setFormData({
      id: product.id,
      productName: product.name,
      stock: product.stock,
      price: product.price,
      category: product.category,
      productImage: product.image_url,
      description: product.description,
      status: product.status,
    });
    setIsEditMode(true);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(products.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <nav className="d-flex justify-content-end">
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={`page-item ${currentPage === number ? "active" : ""}`}
            >
              <a
                onClick={() => handlePageChange(number)}
                className="page-link"
                href="#!"
              >
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  };

  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <div className="content-body">
        <div className="container-fluid">
          <div className="card card-bx m-b30">
            <div className="card-header">
              <h6 className="title">Manage Products</h6>
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
                      <label className="form-label">Product Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Product Name"
                        required
                        name="productName"
                        value={formData.productName}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">
                        Please enter Product Name.
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Quantity</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Quantity"
                        required
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">
                        Please enter Quantity.
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Price</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Price"
                        required
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">
                        Please enter Price.
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Category</label>
                      <select
                        name="category"
                        className="form-control"
                        required
                        value={formData.category}
                        onChange={handleChange}
                      >
                        <option value="" disabled>
                          Choose Category
                        </option>
                        {categoryOptions.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                      <div className="invalid-feedback">
                        Please select Category.
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Product Image</label>
                      <input
                        type="file"
                        className="form-control"
                        placeholder="Choose Product Image"
                        required={!isEditMode}
                        onChange={handleImageChange}
                        ref={fileInputRef}
                      />
                      <div className="invalid-feedback">
                        Select Product Image.
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        placeholder="Enter Description"
                        required
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">
                        Please enter Description.
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Status</label>
                      <select
                        name="status"
                        className="form-control"
                        required
                        value={formData.status}
                        onChange={handleChange}
                      >
                        <option value="" disabled>
                          Choose Status
                        </option>
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                      <div className="invalid-feedback">
                        Please select Status.
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end gap-2">
                    <button type="submit" className="btn btn-primary">
                      {isEditMode ? "Update" : "Add"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleReset}
                    >
                      Reset
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
                  <h4 className="card-title">Product Items</h4>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-responsive-md">
                      <thead>
                        <tr>
                          <th style={{ width: 80 }}>#</th>
                          <th>Product Image</th>
                          <th>Product Name</th>
                          <th>Quantity</th>
                          <th>Price</th>
                          <th>Category</th>
                          <th>Status</th>
                          <th>Description</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentProducts.map((product) => (
                          <tr key={product.id}>
                            <td>
                              <strong className="text-black">
                                {String(product.id).padStart(2, "0")}
                              </strong>
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <div
                                  style={{
                                    width: "100px",
                                    height: "60px",
                                    overflow: "hidden",
                                  }}
                                >
                                  <img
                                    src={
                                      product.image_url ||
                                      "/assets/images/product/1.jpg"
                                    }
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "contain",
                                    }}
                                    className="rounded-lg me-2"
                                    width={70}
                                    alt=""
                                  />
                                </div>
                              </div>
                            </td>
                            <td>{product.name}</td>
                            <td>{product.stock}</td>
                            <td>{product.price} $</td>
                            <td>{product.category}</td>
                            <td>{product.status}</td>
                            <td
                              style={{
                                maxWidth: "200px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {product.description}
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
                                    onClick={() => handleEdit(product)}
                                  >
                                    Edit
                                  </a>
                                  <a
                                    className="dropdown-item"
                                    href="#"
                                    onClick={() => handleDelete(product.id)}
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
                  {renderPagination()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageProducts;
