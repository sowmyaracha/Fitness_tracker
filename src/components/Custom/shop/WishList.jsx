// function WishList() {
//   const cartItems = [
//     {
//       id: 1,
//       image: "/assets/images/product/1.jpg",
//       name: "Product A",
//       unitPrice: "$10.00",
//       quantity: 2,
//       totalPrice: "$20.00",
//       action: "Edit/Delete",
//     },
//     {
//       id: 2,
//       image: "/assets/images/product/2.jpg",
//       name: "Product B",
//       unitPrice: "$15.00",
//       quantity: 1,
//       totalPrice: "$15.00",
//       action: "Edit/Delete",
//     },
//     {
//       id: 3,
//       image: "/assets/images/product/3.jpg",
//       name: "Product C",
//       unitPrice: "$30.00",
//       quantity: 3,
//       totalPrice: "$90.00",
//       action: "Edit/Delete",
//     },
//     {
//       id: 4,
//       image: "/assets/images/product/4.jpg",
//       name: "Product D",
//       unitPrice: "$20.00",
//       quantity: 1,
//       totalPrice: "$20.00",
//       action: "Edit/Delete",
//     },
//     {
//       id: 5,
//       image: "/assets/images/product/5.jpg",
//       name: "Product E",
//       unitPrice: "$10.00",
//       quantity: 2,
//       totalPrice: "$20.00",
//       action: "Edit/Delete",
//     },
//     {
//       id: 6,
//       image: "/assets/images/product/6.jpg",
//       name: "Product F",
//       unitPrice: "$30.00",
//       quantity: 3,
//       totalPrice: "$90.00",
//       action: "Edit/Delete",
//     },
//     {
//       id: 7,
//       image: "/assets/images/product/7.jpg",
//       name: "Product G",
//       unitPrice: "$20.00",
//       quantity: 1,
//       totalPrice: "$20.00",
//       action: "Edit/Delete",
//     },
//   ];

//   return (
//     <div className="content-body">
//       <div className="container-fluid">
//         <div className="row">
//           <div className="col-lg-12">
//             <div className="card">
//               <div className="card-header">
//                 <h4 className="card-title">WishList Items</h4>
//               </div>
//               <div className="card-body">
//                 <div className="table-responsive">
//                   <table className="table table-responsive-md">
//                     <thead>
//                       <tr>
//                         <th style={{ width: 80 }}>#</th>
//                         <th>IMAGE</th>
//                         <th>NAME</th>
//                         <th>UNIT PRICE</th>
//                         <th>QUANTITY</th>
//                         <th>TOTAL PRICE</th>
//                         <th>Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {cartItems.map((item) => (
//                         <tr key={item.id}>
//                           <td>
//                             <strong className="text-black">
//                               {String(item.id).padStart(2, "0")}
//                             </strong>
//                           </td>
//                           <td>
//                             <div className="d-flex align-items-center">
//                               <img
//                                 src={item.image}
//                                 className="rounded-lg me-2"
//                                 width={70}
//                                 alt
//                               />
//                             </div>
//                           </td>
//                           <td> {item.name}</td>
//                           <td>{item.unitPrice}</td>
//                           <td>{item.quantity}</td>
//                           <td>{item.totalPrice}</td>
//                           <td>
//                             <div className="dropdown">
//                               <button
//                                 type="button"
//                                 className="btn btn-success light sharp"
//                                 data-bs-toggle="dropdown"
//                               >
//                                 <svg
//                                   width="20px"
//                                   height="20px"
//                                   viewBox="0 0 24 24"
//                                   version="1.1"
//                                 >
//                                   <g
//                                     stroke="none"
//                                     strokeWidth={1}
//                                     fill="none"
//                                     fillRule="evenodd"
//                                   >
//                                     <rect x={0} y={0} width={24} height={24} />
//                                     <circle
//                                       fill="#000000"
//                                       cx={5}
//                                       cy={12}
//                                       r={2}
//                                     />
//                                     <circle
//                                       fill="#000000"
//                                       cx={12}
//                                       cy={12}
//                                       r={2}
//                                     />
//                                     <circle
//                                       fill="#000000"
//                                       cx={19}
//                                       cy={12}
//                                       r={2}
//                                     />
//                                   </g>
//                                 </svg>
//                               </button>
//                               <div className="dropdown-menu">
//                                 <a className="dropdown-item" href="#">
//                                   Move to Cart
//                                 </a>
//                                 <a className="dropdown-item" href="#">
//                                   Remove
//                                 </a>
//                               </div>
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default WishList;
import React from "react";
import useUserShop from "../../../hooks/user/useUserShop";

function WishList() {
  const { wishlist, removeFromWishlist, moveToCartFromWishlist, loading } =
    useUserShop();

  return (
    <div className="content-body">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Wishlist Items</h4>
              </div>
              <div className="card-body">
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-responsive-md">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>IMAGE</th>
                          <th>NAME</th>
                          <th>PRICE</th>
                          <th>ACTION</th>
                        </tr>
                      </thead>
                      <tbody>
                        {wishlist.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="text-center">
                              No items found.
                            </td>
                          </tr>
                        ) : (
                          wishlist.map((item, index) => (
                            <tr key={item.id}>
                              <td>{index + 1}</td>
                              <td>
                                <img
                                  src={item.product.image_url}
                                  width={70}
                                  alt={item.product.name}
                                />
                              </td>
                              <td>{item.product.name}</td>
                              <td>${Number(item.product.price).toFixed(2)}</td>
                              <td>
                                <button
                                  className="btn btn-primary btn-sm me-2"
                                  onClick={() =>
                                    moveToCartFromWishlist(item.product_id)
                                  }
                                >
                                  Move to Cart
                                </button>
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() =>
                                    removeFromWishlist(item.product_id)
                                  }
                                >
                                  <i className="fas fa-trash"></i>
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WishList;
