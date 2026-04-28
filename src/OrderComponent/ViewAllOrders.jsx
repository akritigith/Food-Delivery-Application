import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

const ViewAllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [tempOrderId, setTempOrderId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");
    
    const retrieveAllorders = async () => {
      const response = await axios.get(
        "http://localhost:8080/api/order/fetch/all",
        {
          headers: {
            Authorization: "Bearer " + admin_jwtToken,
          },
        }
      );
      return response.data;
    };
    
    const retrieveOrdersById = async () => {
      const response = await axios.get(
        "http://localhost:8080/api/order/fetch?orderId=" + orderId
      );
      return response.data;
    };
    
    const getAllOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        let allOrders;
        if (orderId) {
          allOrders = await retrieveOrdersById();
        } else {
          allOrders = await retrieveAllorders();
        }
        if (allOrders) {
          // Sort orders by orderTime in descending order (latest first)
          const sortedOrders = [...allOrders.orders].sort(
            (a, b) => b.orderTime - a.orderTime
          );
          setOrders(sortedOrders);
          setCurrentPage(1); // reset to first page after fetch
        }
      } catch (err) {
        setError("Failed to fetch orders. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
        setIsSearching(false);
      }
    };
    
    getAllOrders();
  }, [orderId]);

  const formatDateFromEpoch = (epochTime) => {
    if (!epochTime) return "N/A";
    const date = new Date(Number(epochTime));
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined) return "N/A";
    return `₹${parseFloat(amount).toFixed(2)}`;
  };

  const getStatusBadge = (status) => {
    if (!status) return <span className="badge bg-secondary">Unknown</span>;
    
    switch (status.toLowerCase()) {
      case 'delivered':
        return <span className="badge bg-success fw-bold">Delivered</span>;
      case 'pending':
        return <span className="badge bg-warning text-dark fw-bold">Pending</span>;
      case 'on the way':
        return <span className="badge bg-info fw-bold">On the Way</span>;
      case 'cancelled':
        return <span className="badge bg-danger fw-bold">Cancelled</span>;
      default:
        return <span className="badge bg-secondary fw-bold">{status}</span>;
    }
  };

  const searchOrderById = (e) => {
    e.preventDefault();
    setIsSearching(true);
    setOrderId(tempOrderId);
  };

  const resetSearch = () => {
    setTempOrderId("");
    setOrderId("");
    setStatusFilter("");
    setCurrentPage(1);
  };

  // Filter orders first
  const filteredOrders = statusFilter
    ? orders.filter(o => o.status?.toLowerCase() === statusFilter.toLowerCase())
    : orders;

  // Pagination logic
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="container-fluid mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-danger text-white py-3">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="mb-0 fw-bold">Order Management</h2>
            <span className="badge bg-white text-danger fs-6 fw-bold">
              {filteredOrders.length} {filteredOrders.length === 1 ? 'Order' : 'Orders'}
            </span>
          </div>
        </div>
        
        <div className="card-body">
          {/* Search Section */}
          <div className="row mb-4">
            <div className="col-md-8">
              <form onSubmit={searchOrderById} className="d-flex">
                <div className="input-group input-group-lg">
                  <span className="input-group-text bg-danger text-white border-danger fw-bold">
                    <i className="bi bi-search"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control form-control-lg border-danger border-2 fw-bold"
                    placeholder="Search by Order ID..."
                    onChange={(e) => setTempOrderId(e.target.value)}
                    value={tempOrderId}
                    disabled={loading}
                    style={{ boxShadow: "0 0 0 0.2rem rgba(220, 53, 69, 0.25)" }}
                  />
                  <button
                    type="submit"
                    className="btn btn-danger btn-lg fw-bold"
                    disabled={loading || !tempOrderId.trim()}
                  >
                    {isSearching ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                        Searching...
                      </>
                    ) : (
                      "Search"
                    )}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-lg fw-bold ms-2"
                    onClick={resetSearch}
                    disabled={loading || (!orderId && !tempOrderId && !statusFilter)}
                  >
                    Clear
                  </button>
                </div>
              </form>
            </div>
            <div className="col-md-4 text-md-end mt-3 mt-md-0">
              <div className="d-flex justify-content-md-end align-items-center">
                <span className="me-2 text-danger fw-bold">Filter by Status:</span>
                <div className="d-flex">
                  <span 
                    className={`badge me-1 p-2 ${statusFilter==="delivered" ? "bg-dark" : "bg-success"} fw-bold`}
                    style={{cursor:"pointer"}} 
                    onClick={() => {setStatusFilter("delivered"); setCurrentPage(1);}}
                  >
                    Delivered
                  </span>
                  <span 
                    className={`badge me-1 p-2 ${statusFilter==="pending" ? "bg-dark text-white" : "bg-warning text-dark"} fw-bold`}
                    style={{cursor:"pointer"}} 
                    onClick={() => {setStatusFilter("pending"); setCurrentPage(1);}}
                  >
                    Pending
                  </span>
                  <span 
                    className={`badge p-2 ${statusFilter==="on the way" ? "bg-dark" : "bg-info"} fw-bold`}
                    style={{cursor:"pointer"}} 
                    onClick={() => {setStatusFilter("on the way"); setCurrentPage(1);}}
                  >
                    On the Way
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Loading and Error States */}
          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2 text-danger fw-bold">Loading orders...</p>
            </div>
          )}
          
          {error && (
            <div className="alert alert-danger fw-bold" role="alert">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {error}
            </div>
          )}
          
          {/* Orders Table */}
          {!loading && !error && (
            <>
              <div className="table-responsive">
                <table className="table table-hover table-striped align-middle">
                  <thead className="bg-danger text-white sticky-top">
                    <tr>
                      <th scope="col" className="fw-bold">Order ID</th>
                      <th scope="col" className="fw-bold">Food Details</th>
                      <th scope="col" className="fw-bold">Restaurant</th>
                      <th scope="col" className="fw-bold">Customer</th>
                      <th scope="col" className="fw-bold">Order Time</th>
                      <th scope="col" className="fw-bold">Status</th>
                      <th scope="col" className="fw-bold">Delivery</th>
                      <th scope="col" className="fw-bold">Delivery Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentOrders.length > 0 ? (
                      currentOrders.map((order) => (
                        <tr key={order.orderId}>
                          <td className="fw-bold text-danger">{order.orderId || "N/A"}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              {order.food?.image1 ? (
                                <img
                                  src={`http://localhost:8080/api/food/${order.food.image1}`}
                                  className="img-thumbnail me-2 border-danger border-2"
                                  alt="food_pic"
                                  style={{ width: "60px", height: "60px", objectFit: "cover" }}
                                />
                              ) : (
                                <div className="bg-light d-flex align-items-center justify-content-center me-2 border border-danger border-2" 
                                    style={{ width: "60px", height: "60px" }}>
                                  <i className="bi bi-image text-danger"></i>
                                </div>
                              )}
                              <div>
                                <div className="fw-bold text-danger">{order.food?.name || "N/A"}</div>
                                <small className="text-muted fw-bold">
                                  {order.food?.category?.name || "N/A"} • 
                                  Qty: {order.quantity || "N/A"} • 
                                  {formatCurrency(order.food?.price)}
                                </small>
                              </div>
                            </div>
                          </td>
                          <td className="text-danger fw-bold">{order.food?.restaurant?.firstName || "N/A"}</td>
                          <td className="text-danger fw-bold">{order.user?.firstName || "N/A"}</td>
                          <td className="fw-bold">{formatDateFromEpoch(order.orderTime)}</td>
                          <td>{getStatusBadge(order.status)}</td>
                          <td>
                            {order.deliveryPerson ? (
                              <div>
                                <div className="fw-bold text-danger">{order.deliveryPerson.firstName}</div>
                                <small className="text-muted fw-bold">{order.deliveryPerson.phoneNo}</small>
                              </div>
                            ) : (
                              <span className="text-danger fw-bold">Pending</span>
                            )}
                          </td>
                          <td>
                            {order.deliveryDate ? (
                              <div>
                                <div className="fw-bold">{order.deliveryDate}</div>
                                <small className="text-muted fw-bold">{order.deliveryTime}</small>
                              </div>
                            ) : (
                              <span className="text-danger fw-bold">Pending</span>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center py-4">
                          <div className="text-danger fw-bold">
                            <i className="bi bi-inbox fs-1 d-block mb-2"></i>
                            No orders found
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination Controls */}
              {filteredOrders.length > itemsPerPage && (
                <div className="d-flex justify-content-center mt-3">
                  <button
                    className="btn btn-danger fw-bold me-2"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                  >
                    Previous
                  </button>
                  <span className="align-self-center fw-bold">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    className="btn btn-danger fw-bold ms-2"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewAllOrders;