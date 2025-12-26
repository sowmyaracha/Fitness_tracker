
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import useUserShop from "../../../hooks/user/useUserShop";
import useShop from "../../../hooks/shop/useShop";


function UserProductDetail() {
  const { id } = useParams();
  const { singleProduct, loadingProductDetail, relatedProducts } = useShop(id);
  const { addToCart, addToWishlist } = useUserShop();

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart(singleProduct.id, quantity);
    }
  };

  const handleAddToWishlist = () => {
    addToWishlist(singleProduct.id);
  };

  return (
    <div className="content-body">
      <div className="container-fluid">
        <div className="page-titles">
          <h2 className="page-title">Product Detail</h2>
        </div>

        {loadingProductDetail ? (
          <p>Loading product details...</p>
        ) : (
          singleProduct && (
            <>
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-xl-3 col-lg-6 col-md-6 col-xxl-5">
                          <img
                            className="img-fluid rounded"
                            src={singleProduct.image_url}
                            alt={singleProduct.name}
                            width={400}
                          />
                        </div>
                        <div className="col-xl-9 col-lg-6 col-md-6 col-xxl-7 col-sm-12">
                          <div className="product-detail-content">
                            <h4>{singleProduct.name}</h4>
                            <p className="price">${singleProduct.price}</p>
                            <p className="text-black">
                              Availability:{" "}
                              <span className="item">
                                {singleProduct.stock > 0
                                  ? "In stock"
                                  : "Out of stock"}{" "}
                                <i className="fa fa-shopping-basket" />
                              </span>
                            </p>
                            <p className="text-black">
                              Category:{" "}
                              <span className="badge bg-info">
                                {singleProduct.category}
                              </span>
                            </p>
                            <p className="text-content">
                              {singleProduct.description}
                            </p>

                            {/* ✅ Quantity + Buttons */}
                            <div className="d-flex align-items-center mt-4">
                              <label className="me-2">Quantity:</label>
                              <input
                                type="number"
                                min={1}
                                className="form-control"
                                style={{ width: "100px", marginRight: "15px" }}
                                value={quantity}
                                onChange={(e) =>
                                  setQuantity(Number(e.target.value))
                                }
                              />
                              <button
                                className="btn btn-primary me-2"
                                onClick={handleAddToCart}
                              >
                                Add to Cart
                              </button>
                              <button
                                className="btn btn-outline-secondary"
                                onClick={handleAddToWishlist}
                              >
                                Add to Wishlist
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ✅ Related Products */}
              <div className="mt-5">
                <h2 className="page-title">Related Products</h2>
                <div className="row mt-3">
                  {relatedProducts.map((product) => (
                    <div
                      key={product.id}
                      className="col-xl-3 col-xxl-3 col-md-4 col-sm-6"
                    >
                      <Link to={`/dashboard/user/productdetail/${product.id}`}>
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
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
}

export default UserProductDetail;
