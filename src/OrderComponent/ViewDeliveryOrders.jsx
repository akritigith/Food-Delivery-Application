import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

const ViewDeliveryOrders = () => {
  const deliveryPerson = JSON.parse(sessionStorage.getItem("active-delivery"));
  const delivery_jwtToken = sessionStorage.getItem("delivery-jwtToken");
  const [orders, setOrders] = useState([]);
  const [deliveryUpdateRequest, setDeliveryUpdateRequest] = useState({
    orderId: "",
    deliveryStatus: "",
    deliveryTime: "",
    deliveryDate: "",
    deliveryId: deliveryPerson?.id || "",
  });
  const [deliveryStatus, setDeliveryStatus] = useState([]);
  const [deliveryTime, setDeliveryTime] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [tempOrderId, setTempOrderId] = useState("");
  const [assignOrderId, setAssignOrderId] = useState("");
  const [showModal, setShowModal] = useState(false);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;
  
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  
  const handleInput = (e) => {
    setDeliveryUpdateRequest({
      ...deliveryUpdateRequest,
      [e.target.name]: e.target.value,
    });
  };
  
  useEffect(() => {
    const getAllOrders = async () => {
      let allOrders;
      if (orderId) {
        allOrders = await retrieveOrdersById();
      } else {
        allOrders = await retrieveAllorders();
      }
      if (allOrders) {
        // Sort by latest first - using epoch time comparison
        const sortedOrders = [...allOrders.orders].sort((a, b) => {
          // Convert to numbers if they're strings, otherwise use as-is
          const timeA = typeof a.orderTime === 'string' ? Number(a.orderTime) : a.orderTime;
          const timeB = typeof b.orderTime === 'string' ? Number(b.orderTime) : b.orderTime;
          return timeB - timeA; // Descending order (newest first)
        });
        setOrders(sortedOrders);
      }
    };
    
    const getAllDeliveryStatus = async () => {
      let allStatus = await retrieveAllDeliveryStatus();
      if (allStatus) {
        setDeliveryStatus(allStatus);
      }
    };
    
    const getAllDeliveryTiming = async () => {
      let allTiming = await retrieveAllDeliveryTiming();
      if (allTiming) {
        setDeliveryTime(allTiming);
      }
    };
    
    getAllOrders();
    getAllDeliveryStatus();
    getAllDeliveryTiming();
  }, [orderId]);
  
  const retrieveAllorders = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/order/fetch/delivery-wise?deliveryPersonId=${deliveryPerson?.id}`,
      {
        headers: {
          Authorization: `Bearer ${delivery_jwtToken}`,
        },
      }
    );
    return response.data;
  };
  
  const retrieveAllDeliveryStatus = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/order/fetch/delivery-status/all"
    );
    return response.data;
  };
  
  const retrieveAllDeliveryTiming = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/order/fetch/delivery-time/all"
    );
    return response.data;
  };
  
  const retrieveOrdersById = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/order/fetch?orderId=${orderId}`
    );
    return response.data;
  };
  
  const formatDateFromEpoch = (epochTime) => {
    if (!epochTime) return "N/A";
    const date = new Date(Number(epochTime));
    return date.toLocaleString();
  };
  
  const searchOrderById = (e) => {
    e.preventDefault();
    setOrderId(tempOrderId);
    setCurrentPage(1); // reset pagination on search
  };
  
  const updateDelivery = (orderId) => {
    setAssignOrderId(orderId);
    // Reset form when opening modal for new order
    setDeliveryUpdateRequest({
      orderId: orderId,
      deliveryStatus: "",
      deliveryTime: "",
      deliveryDate: "",
      deliveryId: deliveryPerson?.id || "",
    });
    handleShow();
  };
  
  const updateOrderStatus = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!deliveryUpdateRequest.deliveryStatus || !deliveryUpdateRequest.deliveryDate || !deliveryUpdateRequest.deliveryTime) {
      toast.error("Please fill all fields", { autoClose: 1000 });
      return;
    }
    
    try {
      const response = await axios.put(
        "http://localhost:8080/api/order/update/delivery-status",
        deliveryUpdateRequest,
        {
          headers: {
            Authorization: `Bearer ${delivery_jwtToken}`,
          },
        }
      );
      
      const res = response.data;
      
      if (res.success) {
        toast.success(res.responseMessage, { autoClose: 1000 });
        // Sort the updated orders by latest first
        const sortedOrders = [...res.orders].sort((a, b) => {
          const timeA = typeof a.orderTime === 'string' ? Number(a.orderTime) : a.orderTime;
          const timeB = typeof b.orderTime === 'string' ? Number(b.orderTime) : b.orderTime;
          return timeB - timeA;
        });
        setOrders(sortedOrders);
        handleClose(); // Close modal after successful update
      } else {
        toast.error(res.responseMessage || "Update failed", { autoClose: 1000 });
      }
    } catch (error) {
      console.error(error);
      toast.error("It seems server is down", { autoClose: 1000 });
    }
  };
  
  // Pagination calculation
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);
  
  return (
    <div className="mt-3">
      <div className="card form-card ms-2 me-2 mb-5 shadow-lg" style={{ height: "40rem" }}>
        <div className="card-header custom-bg-text text-center bg-color" style={{ borderRadius: "1em", height: "50px" }}>
          <h2 className="fw-bold">My Delivery Orders</h2>
        </div>
        <div className="card-body" style={{ overflowY: "auto" }}>
          {/* Search */}
          <form className="row g-3 mb-3">
            <div className="col-auto">
              <input
                type="text"
                className="form-control fw-bold"
                placeholder="Enter Order Id..."
                onChange={(e) => setTempOrderId(e.target.value)}
                value={tempOrderId}
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn bg-color custom-bg-text fw-bold mb-3" onClick={searchOrderById}>
                Search
              </button>
            </div>
          </form>
          
          {/* Orders Table */}
          <div className="table-responsive">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th className="fw-bold">Order Id</th>
                  <th className="fw-bold">Order Status</th>
                  <th className="fw-bold">Food</th>
                  <th className="fw-bold">Food Name</th>
                  <th className="fw-bold">Category</th>
                  <th className="fw-bold">Restaurant</th>
                  <th className="fw-bold">Price</th>
                  <th className="fw-bold">Quantity</th>
                  <th className="fw-bold">Customer</th>
                  <th className="fw-bold">Order Time</th>
                  <th className="fw-bold">Delivery Person</th>
                  <th className="fw-bold">Delivery Contact</th>
                  <th className="fw-bold">Delivery Time</th>
                  <th className="fw-bold">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order) => (
                  <tr key={order.orderId}>
                    <td><b>{order.orderId || "N/A"}</b></td>
                    <td><b>{order.status || "N/A"}</b></td>
                    <td>
                      {order.food?.image1 ? (
                        <img src={"http://localhost:8080/api/food/" + order.food.image1} className="img-fluid" alt="food_pic" style={{ maxWidth: "90px" }} />
                      ) : <span>No Image</span>}
                    </td>
                    <td><b>{order.food?.name || "N/A"}</b></td>
                    <td><b>{order.food?.category?.name || "N/A"}</b></td>
                    <td><b>{order.food?.restaurant?.firstName || "N/A"}</b></td>
                    <td><b>{order.food?.price || "N/A"}</b></td>
                    <td><b>{order.quantity || "N/A"}</b></td>
                    <td><b>{order.user?.firstName || "N/A"}</b></td>
                    <td><b>{formatDateFromEpoch(order.orderTime)}</b></td>
                    <td>{order.deliveryPerson ? <b>{order.deliveryPerson.firstName}</b> : <b className="text-danger">Pending</b>}</td>
                    <td>{order.deliveryPerson ? <b>{order.deliveryPerson.phoneNo}</b> : <b className="text-danger">Pending</b>}</td>
                    <td>{order.deliveryDate ? <b>{order.deliveryDate + " " + (order.deliveryTime || "")}</b> : <b className="text-danger">Processing</b>}</td>
                    <td>
                      {order.status === "Delivered" ? (
                        <b className="text-success">Delivered</b>
                      ) : (
                        <button className="btn btn-sm bg-color custom-bg-text ms-2 fw-bold" onClick={() => updateDelivery(order.orderId)}>
                          Update Status
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Controls */}
          <div className="d-flex justify-content-center mt-3">
            <Button
              className="me-2 fw-bold"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous
            </Button>
            <span className="align-self-center fw-bold">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              className="ms-2 fw-bold"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
      
      {/* Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton className="bg-color custom-bg-text">
          <Modal.Title className="fw-bold">Update Delivery Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="ms-3 mt-3 mb-3 me-3">
            <form onSubmit={updateOrderStatus}>
              <div className="mb-3">
                <label className="form-label fw-bold"><b>Order Id</b></label>
                <input type="text" className="form-control fw-bold" value={assignOrderId} readOnly />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold"><b>Delivery Date</b></label>
                <input type="date" className="form-control fw-bold" name="deliveryDate" onChange={handleInput} value={deliveryUpdateRequest.deliveryDate} required />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold"><b>Delivery Time</b></label>
                <select name="deliveryTime" onChange={handleInput} className="form-control fw-bold" value={deliveryUpdateRequest.deliveryTime} required>
                  <option value="">Select Delivery Time</option>
                  {deliveryTime.map((time, index) => (
                    <option key={index} value={time}>{time}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold"><b>Delivery Status</b></label>
                <select name="deliveryStatus" onChange={handleInput} className="form-control fw-bold" value={deliveryUpdateRequest.deliveryStatus} required>
                  <option value="">Select Delivery Status</option>
                  {deliveryStatus.map((status, index) => (
                    <option key={index} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              <div className="d-flex aligns-items-center justify-content-center mb-2">
                <button type="submit" className="btn bg-color custom-bg-text fw-bold">
                  Update Status
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} className="fw-bold">Close</Button>
        </Modal.Footer>
      </Modal>
      
      <ToastContainer />
    </div>
  );
};

export default ViewDeliveryOrders;