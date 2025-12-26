// function ProductDetail() {
//   const products = [
//     {
//       name: "Bowflex",
//       price: "$761.00",
//       imgUrl: "/assets/images/product/1.jpg",
//     },
//     {
//       name: "Rogue",
//       price: "$159.00",
//       imgUrl: "/assets/images/product/2.jpg",
//     },
//     {
//       name: "Amazon Neoprene",
//       price: "$357.00",
//       imgUrl: "/assets/images/product/3.jpg",
//     },
//     {
//       name: "REP Fitness",
//       price: "$654.00",
//       imgUrl: "/assets/images/product/4.jpg",
//     },
//   ];
//   return (
//     <div className="content-body">
//       <div className="container-fluid">
//         <div className="page-titles">
//           <h2 className="page-title">Product Detail</h2>
//         </div>
//         <div className="row">
//           <div className="col-lg-12">
//             <div className="card">
//               <div className="card-body">
//                 <div className="row">
//                   <div className="col-xl-3 col-lg-6  col-md-6 col-xxl-5 ">
//                     <div className="tab-content" id="myTabContent">
//                       <div>
//                         <img
//                           className="img-fluid rounded "
//                           src="/assets/images/product/1.jpg"
//                           alt="Product"
//                           width={400}
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="col-xl-9 col-lg-6  col-md-6 col-xxl-7 col-sm-12">
//                     <div className="product-detail-content">
//                       {/*Product details*/}
//                       <div className="new-arrival-content mt-md-0 mt-3 pr">
//                         <h4>Back Dumbbells</h4>
//                         <br />
//                         <div className="d-table mb-2">
//                           <p className="price float-start d-block">$325.00</p>
//                         </div>
//                         <br />
//                         <p className="text-black">
//                           Availability:{" "}
//                           <span className="item">
//                             {" "}
//                             In stock <i className="fa fa-shopping-basket" />
//                           </span>
//                         </p>
//                         <br />

//                         <p className="text-black">
//                           Product tags:&nbsp;&nbsp;
//                           <span className="badge badge-success light">Gym</span>
//                           <span className="badge badge-danger light">
//                             Workout
//                           </span>
//                           <span className="badge badge-warning light">
//                             Equipment
//                           </span>
//                         </p>
//                         <br />
//                         <p className="text-content">
//                           Dumbbells are one of the most popular and versatile
//                           pieces of fitness equipment used for strength training
//                           and toning muscles. They consist of a handle with a
//                           weight at each end, and are typically made from a
//                           variety of materials such as cast iron, rubber-coated,
//                           neoprene, or vinyl, catering to different preferences
//                           and workout environments. Dumbbells come in many
//                           sizes, ranging from light weights (as low as 1 lb) to
//                           heavy-duty weights (over 100 lbs), allowing users to
//                           choose the right amount of resistance for their
//                           fitness level and goals. One of the major advantages
//                           of dumbbells is their ability to target specific
//                           muscles. Unlike barbells, which usually require the
//                           use of both hands, dumbbells allow for unilateral
//                           training, meaning each arm or leg works independently.
//                           This can help correct muscle imbalances and improve
//                           muscle symmetry.
//                         </p>

//                         <div className="d-flex align-items-end flex-wrap mt-4">
//                           <div className="filtaring-area me-3">
//                             <div className="shopping-cart  me-3">
//                               <a
//                                 className="btn btn-primary"
//                                 style={{ width: "200px" }}
//                                 href="javascript:void();"
//                               >
//                                 <i className="fa fa-heart me-2" />
//                                 Add to Wishlist
//                               </a>
//                             </div>
//                           </div>
//                           {/*Quantity start*/}
//                           <div className="col-2 px-0  me-3">
//                             <input
//                               type="number"
//                               name="num"
//                               className="form-control input-btn input-number"
//                               defaultValue={1}
//                               min={1}
//                               max={10}
//                             />
//                           </div>
//                           {/*Quanatity End*/}
//                         </div>
//                         <div className="d-flex align-items-end flex-wrap mt-4">
//                           <div className="filtaring-area me-3">
//                             <div className="shopping-cart  me-3">
//                               <a
//                                 className="btn btn-primary"
//                                 href="javascript:void();"
//                                 style={{ width: "200px" }}
//                               >
//                                 <i className="fa fa-cart-plus me-2" />
//                                 Add to Cart
//                               </a>
//                             </div>
//                           </div>

//                           <div className="shopping-cart  me-3">
//                             <a
//                               className="btn btn-primary"
//                               href="javascript:void();"
//                               style={{ width: "200px" }}
//                             >
//                               <i className="fa fa-shopping-basket me-2" />
//                               Checkout
//                             </a>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <h2 className="page-title"> Related Products</h2>
//           <br />
//           <div className="col-xl-12 col-xxl-12 col-md-12 col-sm-12">
//             <div className="row">
//               {products.map((product, index) => (
//                 <div
//                   key={index}
//                   className="col-xl-3 col-xxl-3 col-md-4 col-sm-6"
//                 >
//                   <div className="card">
//                     <div className="card-body product-grid-card">
//                       <div className="new-arrival-product">
//                         <div className="new-arrivals-img-contnent">
//                           <img
//                             className="img-fluid rounded"
//                             src={product.imgUrl}
//                             alt={product.name}
//                           />
//                         </div>
//                         <div className="new-arrival-content text-center mt-3">
//                           <h4>{product.name}</h4>
//                           <span className="price">{product.price}</span>
//                           <div className="icons mt-3">
//                             <i className="fas fa-heart me-2" />{" "}
//                             {/* Wishlist icon */}
//                             <i className="fas fa-cart-plus" /> {/* Cart icon */}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductDetail;
import { useParams } from "react-router-dom";
import useShop from "../../../hooks/shop/useShop";

function ProductDetail() {
  const { id } = useParams();
  const { singleProduct, loadingProductDetail } = useShop(id);

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
                          <div className="mt-4 d-flex gap-3">
                            <button className="btn btn-primary">
                              <i className="fa fa-heart me-2" />
                              Add to Wishlist
                            </button>
                            <input
                              type="number"
                              min={1}
                              defaultValue={1}
                              className="form-control w-auto"
                            />
                            <button className="btn btn-primary">
                              <i className="fa fa-cart-plus me-2" />
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
