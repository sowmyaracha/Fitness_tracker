import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import PriceFilterCard from "./PriceFilterCard";
import useShop from "../../../hooks/shop/useShop";
import useUserShop from "../../../hooks/user/useUserShop";

function ProductGrid() {
  const [searchTerm, setSearchTerm] = useState("");
  const [price, setPrice] = useState(1000);
  const [stockFilter, setStockFilter] = useState(null);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  const location = useLocation();
  const navigate = useNavigate();

  const { filteredProducts, loadingProducts, applyFilters } = useShop();
  const { addToCart, addToWishlist } = useUserShop();

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  useEffect(() => {
    applyFilters({
      search: searchTerm,
      price,
      stock: stockFilter,
      categories,
    });
  }, [searchTerm, price, stockFilter, categories]);

  const handleProductClick = (id) => {
    navigate(`/dashboard/user/productdetail/${id}`);
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
                  <div key={product.id} className="col-xl-3 col-md-4 col-sm-6">
                    <div className="card">
                      <div
                        className="card-body product-grid-card"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleProductClick(product.id)}
                      >
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

                      {/* ⭐️ Action buttons (Cart + Wishlist) */}
                      {/* <div className="card-footer d-flex justify-content-between">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => addToCart(product.id, 1)}
                          title="Add to Cart"
                        >
                          <i className="fas fa-shopping-cart"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => addToWishlist(product.id)}
                          title="Add to Wishlist"
                        >
                          <i className="fas fa-heart"></i>
                        </button>
                      </div> */}
                      <div className="card-footer d-flex flex-column text-center gap-2">
                        <button
                          className="btn btn-sm btn-outline-primary d-flex align-items-center justify-content-center gap-2"
                          onClick={() => addToCart(product.id, 1)}
                          title="Add to Cart"
                        >
                          <i className="fas fa-shopping-cart"></i>
                          <span>Add to Cart</span>
                        </button>

                        <button
                          className="btn btn-sm btn-outline-secondary d-flex align-items-center justify-content-center gap-2"
                          onClick={() => addToWishlist(product.id)}
                          title="Add to Wishlist"
                        >
                          <i className="fas fa-heart"></i>
                          <span>Add to Wishlist</span>
                        </button>
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
          <div className="row mt-4">
            <div className="col-xl-12 d-flex justify-content-center">
              <div className="pagination">
                <button
                  className="btn btn-primary me-2"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Prev
                </button>
                <span className="align-middle py-4">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="btn btn-primary ms-2"
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

export default ProductGrid;
