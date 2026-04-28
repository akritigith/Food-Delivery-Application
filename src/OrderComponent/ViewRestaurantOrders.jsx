import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

const ViewRestaurantOrders = () => {
  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [tempOrderId, setTempOrderId] = useState("");
  const [assignOrderId, setAssignOrderId] = useState("");
  const [deliveryPersonId, setDeliveryPersonId] = useState("");
  const [allDelivery, setAllDelivery] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const [restaurant_jwtToken, setRestaurant_jwtToken] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const storedRestaurant = JSON.parse(sessionStorage.getItem("active-restaurant"));
    const storedToken = sessionStorage.getItem("restaurant-jwtToken");
    setRestaurant(storedRestaurant);
    setRestaurant_jwtToken(storedToken);
  }, []);

  useEffect(() => {
    if (!restaurant) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [allOrders, allUsers] = await Promise.all([
          orderId ? retrieveOrdersById() : retrieveAllorders(),
          retrieveAllUser(),
        ]);

        if (allOrders?.orders) {
          setOrders(allOrders.orders);
        } else {
          setOrders([]);
        }

        if (allUsers?.users) {
          setAllDelivery(allUsers.users);
        } else {
          setAllDelivery([]);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
        toast.error("Failed to load data", {
          position: "top-center",
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [orderId, restaurant]);

  const retrieveAllorders = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/order/fetch/restaurant-wise?restaurantId=${restaurant.id}`,
        {
          headers: { Authorization: `Bearer ${restaurant_jwtToken}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  };

  const retrieveAllUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/user/fetch/restaurant/delivery-person?restaurantId=${restaurant.id}`,
        {
          headers: { Authorization: `Bearer ${restaurant_jwtToken}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching delivery persons:", error);
      throw error;
    }
  };

  const retrieveOrdersById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/order/fetch?orderId=${orderId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching order by ID:", error);
      throw error;
    }
  };

  const formatDateFromEpoch = (epochTime) => {
    if (!epochTime) return "N/A";
    const date = new Date(Number(epochTime));
    return date.toLocaleString();
  };

  const searchOrderById = (e) => {
    e.preventDefault();
    if (tempOrderId.trim() === "") {
      toast.error("Please enter an order ID", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }
    setOrderId(tempOrderId);
    setCurrentPage(1); // reset to page 1 when searching
  };

  const assignDelivery = (orderId) => {
    setAssignOrderId(orderId);
    handleShow();
  };

  const assignToDelivery = async (e) => {
    e.preventDefault();

    if (!deliveryPersonId) {
      toast.error("Please select a delivery person", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/order/assign/delivery-person",
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${restaurant_jwtToken}`,
          },
          body: JSON.stringify({
            orderId: assignOrderId,
            deliveryId: deliveryPersonId,
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        toast.success(result.responseMessage, {
          position: "top-center",
          autoClose: 1000,
        });
        setTimeout(() => {
          window.location.reload(true);
        }, 2000);
      } else {
        toast.error(result.responseMessage || "Assignment failed", {
          position: "top-center",
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.error("Error assigning delivery:", error);
      toast.error("Server error. Please try again later.", {
        position: "top-center",
        autoClose: 1000,
      });
    }
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const sortOrders = (orders) => {
    return [...orders].sort((a, b) => {
      const aIsDelivered = a.status === "Delivered";
      const bIsDelivered = b.status === "Delivered";

      if (aIsDelivered && !bIsDelivered) return 1;
      if (!aIsDelivered && bIsDelivered) return -1;

      return b.orderTime - a.orderTime;
    });
  };

  // Pagination logic
  const sortedOrders = sortOrders(orders);
  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);
  const paginatedOrders = sortedOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (!restaurant) {
    return (
      <div className="container mt-5 text-center">
        <h2 className="text-danger">
          Restaurant data not found. Please log in again.
        </h2>
      </div>
    );
  }

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
          <h2>Restaurant Orders</h2>
        </div>
        <div className="card-body" style={{ overflowY: "auto" }}>
          <form className="row g-3" onSubmit={searchOrderById}>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Order Id..."
                onChange={(e) => setTempOrderId(e.target.value)}
                value={tempOrderId}
              />
            </div>
            <div className="col-auto">
              <button
                type="submit"
                className="btn bg-color custom-bg-text mb-3"
              >
                Search
              </button>
            </div>
          </form>

          {loading ? (
            <div className="text-center mt-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          ) : (
            <div>
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
                      <th scope="col">Customer</th>
                      <th scope="col">Order Time</th>
                      <th scope="col">Order Status</th>
                      <th scope="col">Delivery Person</th>
                      <th scope="col">Delivery Contact</th>
                      <th scope="col">Delivery Time</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedOrders.length > 0 ? (
                      paginatedOrders.map((order) => (
                        <tr key={order?.orderId || Math.random()}>
                          <td>
                            <b>{order?.orderId || "N/A"}</b>
                          </td>
                          <td>
                            <img
                              src={
                                order?.food?.image1
                                  ? `http://localhost:8080/api/food/${order.food.image1}`
                                  : "https://via.placeholder.com/90"
                              }
                              className="img-fluid"
                              alt="food_pic"
                              style={{ maxWidth: "90px" }}
                            />
                          </td>
                          <td>
                            <b>{order?.food?.name || "N/A"}</b>
                          </td>
                          <td>
                            <b>{order?.food?.category?.name || "N/A"}</b>
                          </td>
                          <td>
                            <b>{order?.food?.restaurant?.firstName || "N/A"}</b>
                          </td>
                          <td>
                            <b>{order?.food?.price || "N/A"}</b>
                          </td>
                          <td>
                            <b>{order?.quantity || "N/A"}</b>
                          </td>
                          <td>
                            <b>{order?.user?.firstName || "N/A"}</b>
                          </td>
                          <td>
                            <b>{formatDateFromEpoch(order?.orderTime)}</b>
                          </td>
                          <td>
                            <b>{order?.status || "N/A"}</b>
                          </td>
                          <td>
                            <b>
                              {order?.deliveryPerson?.firstName ? (
                                order.deliveryPerson.firstName
                              ) : (
                                <span className="text-danger">Pending</span>
                              )}
                            </b>
                          </td>
                          <td>
                            <b>
                              {order?.deliveryPerson?.phoneNo ? (
                                order.deliveryPerson.phoneNo
                              ) : (
                                <span className="text-danger">Pending</span>
                              )}
                            </b>
                          </td>
                          <td>
                            <b>
                              {order?.deliveryDate ? (
                                `${order.deliveryDate} ${order.deliveryTime || ""}`
                              ) : (
                                <span className="text-danger">Processing</span>
                              )}
                            </b>
                          </td>
                          <td>
                            {order?.deliveryPerson ? (
                              <span className="text-success">Delivery Assigned</span>
                            ) : (
                              <button
                                className="btn btn-sm bg-color custom-bg-text ms-2"
                                onClick={() => assignDelivery(order.orderId)}
                              >
                                Assign Delivery
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="14" className="text-center">
                          No orders found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-3">
                  <button
                    className="btn btn-outline-primary me-2"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                  >
                    Previous
                  </button>
                  <span className="align-self-center">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    className="btn btn-outline-primary ms-2"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton className="bg-color custom-bg-text">
          <Modal.Title>Assign To Delivery Person</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="ms-3 mt-3 mb-3 me-3">
            <form onSubmit={assignToDelivery}>
              <div className="mb-3">
                <label htmlFor="orderId" className="form-label">
                  <b>Order Id</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={assignOrderId}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="deliveryPerson" className="form-label">
                  <b>Delivery Person</b>
                </label>
                <select
                  name="deliveryPersonId"
                  onChange={(e) => setDeliveryPersonId(e.target.value)}
                  className="form-select"
                  value={deliveryPersonId}
                  required
                >
                  <option value="">Select Delivery Person</option>
                  {allDelivery.map((delivery) => (
                    <option key={delivery?.id} value={delivery?.id}>
                      {delivery?.firstName} {delivery?.lastName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="d-flex aligns-items-center justify-content-center mb-2">
                <button type="submit" className="btn bg-color custom-bg-text">
                  Assign
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default ViewRestaurantOrders;
