// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import useShop from "../../../hooks/shop/useShop";
// import PriceFilterCard from "./PriceFilterCard";

// function AdminShop() {
//   const [role, setRole] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [price, setPrice] = useState(1000);
//   const [stockFilter, setStockFilter] = useState(null);
//   const [categories, setCategories] = useState([]);

//   const location = useLocation();
//   const navigate = useNavigate();
//   const { filteredProducts, loadingProducts, applyFilters } = useShop();

//   useEffect(() => {
//     if (location.pathname) {
//       const currentRole = location.pathname.split("/")[2];
//       setRole(currentRole);
//     }
//   }, [location.pathname]);

//   useEffect(() => {
//     applyFilters({
//       search: searchTerm,
//       price,
//       stock: stockFilter,
//       categories,
//     });
//   }, [searchTerm, price, stockFilter, categories]);

//   const handleProductClick = (id) => {
//     navigate(`/dashboard/${role}/productdetail/${id}`);
//   };

//   return (
//     <div className="content-body">
//       <div className="container-fluid">
//         <div className="row">
//           <div className="col-xl-12 mb-3">
//             <div className="input-group">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Search..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <button className="btn btn-primary">
//                 <i className="fas fa-search"></i>
//               </button>
//             </div>
//           </div>

//           <div className="col-xl-9">
//             <div className="row">
//               {loadingProducts ? (
//                 <p>Loading products...</p>
//               ) : filteredProducts.length === 0 ? (
//                 <p>No products found.</p>
//               ) : (
//                 filteredProducts.map((product) => (
//                   <div
//                     key={product.id}
//                     className="col-xl-3 col-md-4 col-sm-6"
//                     onClick={() => handleProductClick(product.id)}
//                     style={{ cursor: "pointer" }}
//                   >
//                     <div className="card">
//                       <div className="card-body product-grid-card">
//                         <div className="new-arrival-product">
//                           <div className="new-arrivals-img-contnent">
//                             <img
//                               className="img-fluid rounded"
//                               src={product.image_url}
//                               alt={product.name}
//                             />
//                           </div>
//                           <div className="new-arrival-content text-center mt-3">
//                             <h4>{product.name}</h4>
//                             <span className="price">${product.price}</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//           <div className="col-xl-3">
//             <PriceFilterCard
//               price={price}
//               setPrice={setPrice}
//               stockFilter={stockFilter}
//               setStockFilter={setStockFilter}
//               categories={categories}
//               setCategories={setCategories}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default AdminShop;
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useShop from "../../../hooks/shop/useShop";
import PriceFilterCard from "./PriceFilterCard";

function AdminShop() {
  const [role, setRole] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [price, setPrice] = useState(1000);
  const [stockFilter, setStockFilter] = useState(null);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Add state for current page
  const [productsPerPage] = useState(12); // Show 12 products per page

  const location = useLocation();
  const navigate = useNavigate();
  const { filteredProducts, loadingProducts, applyFilters } = useShop();

  // Pagination logic: Determine the current products to show based on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  useEffect(() => {
    if (location.pathname) {
      const currentRole = location.pathname.split("/")[2];
      setRole(currentRole);
    }
  }, [location.pathname]);

  useEffect(() => {
    applyFilters({
      search: searchTerm,
      price,
      stock: stockFilter,
      categories,
    });
  }, [searchTerm, price, stockFilter, categories]);

  const handleProductClick = (id) => {
    navigate(`/dashboard/${role}/productdetail/${id}`);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="content-body">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 mb-3">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-primary">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>

          <div className="col-xl-9">
            <div className="row">
              {loadingProducts ? (
                <p>Loading products...</p>
              ) : currentProducts.length === 0 ? (
                <p>No products found.</p>
              ) : (
                currentProducts.map((product) => (
                  <div
                    key={product.id}
                    className="col-xl-3 col-md-4 col-sm-6"
                    onClick={() => handleProductClick(product.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="card">
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
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="col-xl-3">
            <PriceFilterCard
              price={price}
              setPrice={setPrice}
              stockFilter={stockFilter}
              setStockFilter={setStockFilter}
              categories={categories}
              setCategories={setCategories}
            />
          </div>
        </div>

        {/* Pagination Controls */}
        {filteredProducts.length > productsPerPage && (
          <div className="row">
            <div className="col-xl-12">
              <div className="pagination">
                <button
                  className="btn btn-primary"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Prev
                </button>
                <span className="mx-3 py-3">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="btn btn-primary"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminShop;
