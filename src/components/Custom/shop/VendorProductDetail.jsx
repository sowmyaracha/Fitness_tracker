// pages/admin/shop/ProductDetail.jsx
import { Link, useParams } from "react-router-dom";
import useShop from "../../../hooks/shop/useShop";

function VendorProductDetail() {
  const { id } = useParams();
  const { singleProduct, loadingProductDetail, relatedProducts } = useShop(id);

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
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ✅ Related Products Section */}
              <div className="mt-5">
                <h2 className="page-title">Related Products</h2>
                <div className="row mt-3">
                  {relatedProducts.map((product) => (
                    <div
                      key={product.id}
                      className="col-xl-3 col-xxl-3 col-md-4 col-sm-6"
                    >
                      <Link
                        to={`/dashboard/vendor/productdetail/${product.id}`}
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

export default VendorProductDetail;
