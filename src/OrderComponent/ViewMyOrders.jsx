// import { useState, useEffect } from "react";
// import axios from "axios";
// import React from "react";
// const ViewMyOrders = () => {
//   let user = JSON.parse(sessionStorage.getItem("active-customer"));
//   const customer_jwtToken = sessionStorage.getItem("customer-jwtToken");

//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const getAllOrders = async () => {
//       const allOrders = await retrieveCart();
//       if (allOrders) {
//         setOrders(allOrders.orders);
//       }
//     };

//     getAllOrders();
//   }, []);

//   const retrieveCart = async () => {
//     const response = await axios.get(
//       "http://localhost:8080/api/order/fetch/user-wise?userId=" + user.id,
//       {
//         headers: {
//           Authorization: "Bearer " + customer_jwtToken, // Replace with your actual JWT token
//         },
//       }
//     );
//     console.log(response.data);
//     return response.data;
//   };

//   const formatDateFromEpoch = (epochTime) => {
//     const date = new Date(Number(epochTime));
//     const formattedDate = date.toLocaleString(); // Adjust the format as needed

//     return formattedDate;
//   };

//   return (
//     <div className="mt-3">
//       <div
//         className="card form-card ms-2 me-2 mb-5 shadow-lg"
//         style={{
//           height: "40rem",
//         }}
//       >
//         <div
//           className="card-header custom-bg-text text-center bg-color"
//           style={{
//             borderRadius: "1em",
//             height: "50px",
//           }}
//         >
//           <h2>My Orders</h2>
//         </div>
//         <div
//           className="card-body"
//           style={{
//             overflowY: "auto",
//           }}
//         >
//           <div className="table-responsive">
//             <table className="table table-hover text-color text-center">
//               <thead className="table-bordered border-color bg-color custom-bg-text">
//                 <tr>
//                   <th scope="col">Order Id</th>
//                   <th scope="col">Food</th>
//                   <th scope="col">Food Name</th>
//                   <th scope="col">Category</th>
//                   <th scope="col">Restaurant</th>
//                   <th scope="col">Price</th>
//                   <th scope="col">Quantity</th>
//                   <th scope="col">Order Time</th>
//                   <th scope="col">Order Status</th>
//                   <th scope="col">Delivery Person</th>
//                   <th scope="col">Delivery Contact</th>
//                   <th scope="col">Delivery Time</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {orders.map((order) => {
//                   return (
//                     <tr>
//                       <td>
//                         <b>{order.orderId}</b>
//                       </td>
//                       <td>
//                         <img
//                           src={
//                             "http://localhost:8080/api/food/" +
//                             order.food.image1
//                           }
//                           className="img-fluid"
//                           alt="food_pic"
//                           style={{
//                             maxWidth: "90px",
//                           }}
//                         />
//                       </td>
//                       <td>
//                         <b>{order.food.name}</b>
//                       </td>
//                       <td>
//                         <b>{order.food.category.name}</b>
//                       </td>
//                       <td>
//                         <b>{order.food.restaurant.firstName}</b>
//                       </td>
//                       <td>
//                         <b>{order.food.price}</b>
//                       </td>
//                       <td>
//                         <b>{order.quantity}</b>
//                       </td>
//                       <td>
//                         <b>{formatDateFromEpoch(order.orderTime)}</b>
//                       </td>
//                       <td>
//                         <b>{order.status}</b>
//                       </td>
//                       <td>
//                         {(() => {
//                           if (order.deliveryPerson) {
//                             return <b>{order.deliveryPerson.firstName}</b>;
//                           } else {
//                             return <b className="text-danger">Pending</b>;
//                           }
//                         })()}
//                       </td>
//                       <td>
//                         {(() => {
//                           if (order.deliveryPerson) {
//                             return <b>{order.deliveryPerson.phoneNo}</b>;
//                           } else {
//                             return <b className="text-danger">Pending</b>;
//                           }
//                         })()}
//                       </td>
//                       <td>
//                         {(() => {
//                           if (order.deliveryDate) {
//                             return (
//                               <b>
//                                 {order.deliveryDate + " " + order.deliveryTime}
//                               </b>
//                             );
//                           } else {
//                             return <b className="text-danger">Pending</b>;
//                           }
//                         })()}
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewMyOrders;



// import { useState, useEffect } from "react";
// import axios from "axios";
// import React from "react";
// import { useNavigate } from "react-router-dom";

// const ViewMyOrders = () => {
//   let user = JSON.parse(sessionStorage.getItem("active-customer"));
//   const customer_jwtToken = sessionStorage.getItem("customer-jwtToken");
//   const navigate = useNavigate();

//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const getAllOrders = async () => {
//       const allOrders = await retrieveCart();
//       if (allOrders) {
//         setOrders(allOrders.orders);
//       }
//     };

//     getAllOrders();
//   }, []);

//   const retrieveCart = async () => {
//     const response = await axios.get(
//       "http://localhost:8080/api/order/fetch/user-wise?userId=" + user.id,
//       {
//         headers: {
//           Authorization: "Bearer " + customer_jwtToken,
//         },
//       }
//     );
//     console.log(response.data);
//     return response.data;
//   };

//   const formatDateFromEpoch = (epochTime) => {
//     const date = new Date(Number(epochTime));
//     const formattedDate = date.toLocaleString();
//     return formattedDate;
//   };
  
//   const navigateToAddReviewPage = (food) => {
//     navigate("/food/" + food.id + "/review/add", { state: food });
//   };

//   return (
//     <div className="mt-3">
//       <div
//         className="card form-card ms-2 me-2 mb-5 shadow-lg"
//         style={{ height: "40rem" }}
//       >
//         <div
//           className="card-header custom-bg-text text-center bg-color"
//           style={{ borderRadius: "1em", height: "50px" }}
//         >
//           <h2>My Orders</h2>
//         </div>
//         <div className="card-body" style={{ overflowY: "auto" }}>
//           <div className="table-responsive">
//             <table className="table table-hover text-color text-center">
//               <thead className="table-bordered border-color bg-color custom-bg-text">
//                 <tr>
//                   <th scope="col">Order Id</th>
//                   <th scope="col">Food</th>
//                   <th scope="col">Food Name</th>
//                   <th scope="col">Category</th>
//                   <th scope="col">Restaurant</th>
//                   <th scope="col">Price</th>
//                   <th scope="col">Quantity</th>
//                   <th scope="col">Order Time</th>
//                   <th scope="col">Order Status</th>
//                   <th scope="col">Delivery Person</th>
//                   <th scope="col">Delivery Contact</th>
//                   <th scope="col">Delivery Time</th>
//                   <th scope="col">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {orders.map((order) => {
//                   return (
//                     <tr key={order.orderId}>
//                       <td><b>{order.orderId}</b></td>
//                       <td>
//                         <img
//                           src={"http://localhost:8080/api/food/" + order.food.image1}
//                           className="img-fluid"
//                           alt="food_pic"
//                           style={{ maxWidth: "90px" }}
//                         />
//                       </td>
//                       <td><b>{order.food.name}</b></td>
//                       <td><b>{order.food.category.name}</b></td>
//                       <td><b>{order.food.restaurant.firstName}</b></td>
//                       <td><b>{order.food.price}</b></td>
//                       <td><b>{order.quantity}</b></td>
//                       <td><b>{formatDateFromEpoch(order.orderTime)}</b></td>
//                       <td><b>{order.status}</b></td>
//                       <td>
//                         {order.deliveryPerson ? (
//                           <b>{order.deliveryPerson.firstName}</b>
//                         ) : (
//                           <b className="text-danger">Pending</b>
//                         )}
//                       </td>
//                       <td>
//                         {order.deliveryPerson ? (
//                           <b>{order.deliveryPerson.phoneNo}</b>
//                         ) : (
//                           <b className="text-danger">Pending</b>
//                         )}
//                       </td>
//                       <td>
//                         {order.deliveryDate ? (
//                           <b>{order.deliveryDate + " " + order.deliveryTime}</b>
//                         ) : (
//                           <b className="text-danger">Pending</b>
//                         )}
//                       </td>
//                       <td>
//                         <button
//                           className="btn"
//                           style={{
//                             backgroundColor: order.status === 'Delivered' ? '#dc3545' : 'gray',
//                             color: 'white',
//                             cursor: order.status === 'Delivered' ? 'pointer' : 'not-allowed',
//                             transition: 'background-color 0.3s, color 0.3s',
//                           }}
//                           onMouseOver={e => {
//                             if (order.status === 'Delivered') {
//                               e.currentTarget.style.backgroundColor = 'white';
//                               e.currentTarget.style.color = 'black';
//                             }
//                           }}
//                           onMouseOut={e => {
//                             if (order.status === 'Delivered') {
//                               e.currentTarget.style.backgroundColor = '#dc3545';
//                               e.currentTarget.style.color = 'white';
//                             }
//                           }}
//                           disabled={order.status !== 'Delivered'}
//                           onClick={() => navigateToAddReviewPage(order.food)}
//                         >
//                           Add Review
//                         </button>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewMyOrders;


// 

import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const ViewMyOrders = () => {
  let user = JSON.parse(sessionStorage.getItem("active-customer"));
  const customer_jwtToken = sessionStorage.getItem("customer-jwtToken");
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const getAllOrders = async () => {
      const allOrders = await retrieveOrders();
      if (allOrders) {
        // Sort orders by orderTime in descending order (most recent first)
        const sortedOrders = allOrders.orders.sort(
          (a, b) => b.orderTime - a.orderTime
        );
        setOrders(sortedOrders);
      }
    };
    getAllOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const retrieveOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/order/fetch/user-wise?userId=" + user.id,
        {
          headers: {
            Authorization: "Bearer " + customer_jwtToken,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      return null;
    }
  };

  const formatDateFromEpoch = (epochTime) => {
    const date = new Date(Number(epochTime));
    const formattedDate = date.toLocaleString();
    return formattedDate;
  };

  const navigateToAddReviewPage = (food) => {
    navigate("/food/" + food.id + "/review/add", { state: food });
  };

  // Calculate the orders to display on the current page
  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Calculate total pages
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 shadow-lg"
        style={{ height: "40rem" }}
      >
        <div
          className="card-header custom-bg-text text-center bg-color"
          style={{ borderRadius: "1em", height: "50px" }}
        >
          <h2>My Orders</h2>
        </div>
        <div className="card-body" style={{ overflowY: "auto" }}>
          <div className="table-responsive">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th scope="col">Order Id</th>
                  <th scope="col">Food</th>
                  <th scope="col">Food Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Restaurant</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Order Time</th>
                  <th scope="col">Order Status</th>
                  <th scope="col">Delivery Person</th>
                  <th scope="col">Delivery Contact</th>
                  <th scope="col">Delivery Time</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.length > 0 ? (
                  currentOrders.map((order) => {
                    return (
                      <tr key={order.orderId}>
                        <td>
                          <b>{order.orderId}</b>
                        </td>
                        <td>
                          <img
                            src={
                              "http://localhost:8080/api/food/" +
                              order.food.image1
                            }
                            className="img-fluid"
                            alt="food_pic"
                            style={{ maxWidth: "90px" }}
                          />
                        </td>
                        <td>
                          <b>{order.food.name}</b>
                        </td>
                        <td>
                          <b>{order.food.category.name}</b>
                        </td>
                        <td>
                          <b>{order.food.restaurant.firstName}</b>
                        </td>
                        <td>
                          <b>{order.food.price}</b>
                        </td>
                        <td>
                          <b>{order.quantity}</b>
                        </td>
                        <td>
                          <b>{formatDateFromEpoch(order.orderTime)}</b>
                        </td>
                        <td>
                          <b>{order.status}</b>
                        </td>
                        <td>
                          {order.deliveryPerson ? (
                            <b>{order.deliveryPerson.firstName}</b>
                          ) : (
                            <b className="text-danger">Pending</b>
                          )}
                        </td>
                        <td>
                          {order.deliveryPerson ? (
                            <b>{order.deliveryPerson.phoneNo}</b>
                          ) : (
                            <b className="text-danger">Pending</b>
                          )}
                        </td>
                        <td>
                          {order.deliveryDate ? (
                            <b>
                              {order.deliveryDate + " " + order.deliveryTime}
                            </b>
                          ) : (
                            <b className="text-danger">Pending</b>
                          )}
                        </td>
                        <td>
                          <button
                            className="btn"
                            style={{
                              backgroundColor:
                                order.status === "Delivered" ? "#dc3545" : "gray",
                              color: "white",
                              cursor:
                                order.status === "Delivered"
                                  ? "pointer"
                                  : "not-allowed",
                              transition: "background-color 0.3s, color 0.3s",
                            }}
                            onMouseOver={(e) => {
                              if (order.status === "Delivered") {
                                e.currentTarget.style.backgroundColor = "white";
                                e.currentTarget.style.color = "black";
                              }
                            }}
                            onMouseOut={(e) => {
                              if (order.status === "Delivered") {
                                e.currentTarget.style.backgroundColor =
                                  "#dc3545";
                                e.currentTarget.style.color = "white";
                              }
                            }}
                            disabled={order.status !== "Delivered"}
                            onClick={() => navigateToAddReviewPage(order.food)}
                          >
                            Add Review
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="13">No orders found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {orders.length > itemsPerPage && (
          <div className="card-footer">
            <nav aria-label="Page navigation">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button
                    className="btn me-2"
                    style={{
                      backgroundColor: "#dc3545",
                      color: "white",
                      transition: "background-color 0.3s, color 0.3s",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = "white";
                      e.currentTarget.style.color = "black";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "#dc3545";
                      e.currentTarget.style.color = "white";
                    }}
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                </li>
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="btn"
                    style={{
                      backgroundColor: "#dc3545",
                      color: "white",
                      transition: "background-color 0.3s, color 0.3s",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = "white";
                      e.currentTarget.style.color = "black";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "#dc3545";
                      e.currentTarget.style.color = "white";
                    }}
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewMyOrders;