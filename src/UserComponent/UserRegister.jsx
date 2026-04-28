// import { useState, useEffect } from "react";
// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer, toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const UserRegister = () => {
//   const navigate = useNavigate();

//   const restaurant = JSON.parse(sessionStorage.getItem("active-restaurant"));

//   const [user, setUser] = useState({
//     firstName: "",
//     lastName: "",
//     emailId: "",
//     password: "",
//     phoneNo: "",
//     street: "",
//     city: "",
//     pincode: "",
//     role: "",
//   });

//   useEffect(() => {
//     if (document.URL.indexOf("customer") != -1) {
//       user.role = "Customer";
//     } else if (document.URL.indexOf("delivery") != -1) {
//       user.role = "Delivery";
//     } else if (document.URL.indexOf("restaurant") != -1) {
//       user.role = "Restaurant";
//     }
//   }, []);

//   const handleUserInput = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const saveUser = (e) => {
//     e.preventDefault();

//     let jwtToken;

//     if (user.role === "Delivery") {
//       user.restaurantId = restaurant.id;
//       // jwtToken = sessionStorage.getItem("restaurant-jwtToken"); // Use bank's JWT token for customer register
//     }

//     fetch("http://localhost:8080/api/user/register", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",

//         //    Authorization: "Bearer " + jwtToken,
//       },
//       body: JSON.stringify(user),
//     })
//       .then((result) => {
//         console.log("result", result);
//         result.json().then((res) => {
//           if (res.success) {
//             toast.success(res.responseMessage, {
//               position: "top-center",
//               autoClose: 1000,
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,
//               progress: undefined,
//             });

//             setTimeout(() => {
//               navigate("/user/login");
//             }, 1000);
//           } else if (!res.success) {
//             toast.error(res.responseMessage, {
//               position: "top-center",
//               autoClose: 1000,
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,
//               progress: undefined,
//             });

//             setTimeout(() => {
//               window.location.reload(true);
//             }, 1000); // Redirect after 3 seconds
//           } else {
//             toast.error("It seems server is down", {
//               position: "top-center",
//               autoClose: 1000,
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,
//               progress: undefined,
//             });

//             setTimeout(() => {
//               window.location.reload(true);
//             }, 1000); // Redirect after 3 seconds
//           }
//         });
//       })
//       .catch((error) => {
//         console.error(error);
//         toast.error("It seems server is down", {
//           position: "top-center",
//           autoClose: 1000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         });
//         setTimeout(() => {
//           window.location.reload(true);
//         }, 1000); // Redirect after 3 seconds
//       });
//     e.preventDefault();
//   };

//   return (
//     <div>
//       <div className="mt-2 d-flex aligns-items-center justify-content-center ms-2 me-2 mb-2">
//         <div
//           className="form-card border-color text-color"
//           style={{ width: "50rem" }}
//         >
//           <div className="container-fluid">
//             <div
//               className="card-header bg-color custom-bg-text mt-2 d-flex justify-content-center align-items-center"
//               style={{
//                 borderRadius: "1em",
//                 height: "45px",
//               }}
//             >
//               <h5 className="card-title">Register Here!!!</h5>
//             </div>
//             <div className="card-body mt-3">
//               <form className="row g-3" onSubmit={saveUser}>
//                 <div className="col-md-6 mb-3 text-color">
//                   <label htmlFor="title" className="form-label">
//                     <b>First Name</b>
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="firstName"
//                     name="firstName"
//                     onChange={handleUserInput}
//                     value={user.firstName}
//                   />
//                 </div>

//                 <div className="col-md-6 mb-3 text-color">
//                   <label htmlFor="title" className="form-label">
//                     <b>Last Name</b>
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="lastName"
//                     name="lastName"
//                     onChange={handleUserInput}
//                     value={user.lastName}
//                   />
//                 </div>

//                 <div className="col-md-6 mb-3 text-color">
//                   <b>
//                     <label className="form-label">Email Id</label>
//                   </b>
//                   <input
//                     type="email"
//                     className="form-control"
//                     id="emailId"
//                     name="emailId"
//                     onChange={handleUserInput}
//                     value={user.emailId}
//                   />
//                 </div>
//                 <div className="col-md-6 mb-3">
//                   <label htmlFor="quantity" className="form-label">
//                     <b>Password</b>
//                   </label>
//                   <input
//                     type="password"
//                     className="form-control"
//                     id="password"
//                     name="password"
//                     onChange={handleUserInput}
//                     value={user.password}
//                   />
//                 </div>

//                 <div className="col-md-6 mb-3">
//                   <label htmlFor="contact" className="form-label">
//                     <b>Contact No</b>
//                   </label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     id="phoneNo"
//                     name="phoneNo"
//                     onChange={handleUserInput}
//                     value={user.phoneNo}
//                   />
//                 </div>

//                 <div className="col-md-6 mb-3">
//                   <label htmlFor="description" className="form-label">
//                     <b> Street</b>
//                   </label>
//                   <textarea
//                     className="form-control"
//                     id="street"
//                     name="street"
//                     rows="3"
//                     onChange={handleUserInput}
//                     value={user.street}
//                   />
//                 </div>
//                 <div className="col-md-6 mb-3">
//                   <label htmlFor="price" className="form-label">
//                     <b>City</b>
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="city"
//                     name="city"
//                     onChange={handleUserInput}
//                     value={user.city}
//                   />
//                 </div>
//                 <div className="col-md-6 mb-3">
//                   <label htmlFor="pincode" className="form-label">
//                     <b>Pincode</b>
//                   </label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     id="pincode"
//                     name="pincode"
//                     onChange={handleUserInput}
//                     value={user.pincode}
//                   />
//                 </div>

//                 <div className="d-flex aligns-items-center justify-content-center">
//                   <input
//                     type="submit"
//                     className="btn bg-color custom-bg-text"
//                     value="Register User"
//                   />
//                 </div>
//                 <ToastContainer />
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserRegister;

// import { useState, useEffect } from "react";
// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer, toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const UserRegister = () => {
//   const navigate = useNavigate();

//   const restaurant = JSON.parse(sessionStorage.getItem("active-restaurant"));

//   const [user, setUser] = useState({
//     firstName: "",
//     lastName: "",
//     emailId: "",
//     password: "",
//     phoneNo: "",
//     street: "",
//     city: "",
//     pincode: "",
//     role: "",
//   });

//   // ✅ errors state added
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (document.URL.indexOf("customer") != -1) {
//       user.role = "Customer";
//     } else if (document.URL.indexOf("delivery") != -1) {
//       user.role = "Delivery";
//     } else if (document.URL.indexOf("restaurant") != -1) {
//       user.role = "Restaurant";
//     }
//   }, []);

//   const handleUserInput = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" }); // clear error on typing
//   };

//   const validateForm = () => {
//     let formErrors = {};
//     if (!user.firstName) formErrors.firstName = "Field is mandatory";
//     if (!user.lastName) formErrors.lastName = "Field is mandatory";
//     if (!user.emailId) formErrors.emailId = "Field is mandatory";
//     if (!user.password) formErrors.password = "Field is mandatory";
//     if (!user.phoneNo) formErrors.phoneNo = "Field is mandatory";
//     if (!user.street) formErrors.street = "Field is mandatory";
//     if (!user.city) formErrors.city = "Field is mandatory";
//     if (!user.pincode) formErrors.pincode = "Field is mandatory";
//     setErrors(formErrors);
//     return Object.keys(formErrors).length === 0;
//   };

//   const saveUser = (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       toast.error("Please fill all mandatory fields!", {
//         position: "top-center",
//         autoClose: 1500,
//       });
//       return;
//     }

//     let jwtToken;

//     if (user.role === "Delivery") {
//       user.restaurantId = restaurant.id;
//       // jwtToken = sessionStorage.getItem("restaurant-jwtToken"); // Use bank's JWT token for customer register
//     }

//     fetch("http://localhost:8080/api/user/register", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",

//         //    Authorization: "Bearer " + jwtToken,
//       },
//       body: JSON.stringify(user),
//     })
//       .then((result) => {
//         console.log("result", result);
//         result.json().then((res) => {
//           if (res.success) {
//             toast.success(res.responseMessage, {
//               position: "top-center",
//               autoClose: 1000,
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,
//               progress: undefined,
//             });

//             setTimeout(() => {
//               navigate("/user/login");
//             }, 1000);
//           } else if (!res.success) {
//             toast.error(res.responseMessage, {
//               position: "top-center",
//               autoClose: 1000,
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,
//               progress: undefined,
//             });

//             setTimeout(() => {
//               window.location.reload(true);
//             }, 1000); // Redirect after 3 seconds
//           } else {
//             toast.error("It seems server is down", {
//               position: "top-center",
//               autoClose: 1000,
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,
//               progress: undefined,
//             });

//             setTimeout(() => {
//               window.location.reload(true);
//             }, 1000); // Redirect after 3 seconds
//           }
//         });
//       })
//       .catch((error) => {
//         console.error(error);
//         toast.error("It seems server is down", {
//           position: "top-center",
//           autoClose: 1000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         });
//         setTimeout(() => {
//           window.location.reload(true);
//         }, 1000); // Redirect after 3 seconds
//       });
//     e.preventDefault();
//   };

//   return (
//     <div>
//       <div className="mt-2 d-flex aligns-items-center justify-content-center ms-2 me-2 mb-2">
//         <div
//           className="form-card border-color text-color"
//           style={{ width: "50rem" }}
//         >
//           <div className="container-fluid">
//             <div
//               className="card-header bg-color custom-bg-text mt-2 d-flex justify-content-center align-items-center"
//               style={{
//                 borderRadius: "1em",
//                 height: "45px",
//               }}
//             >
//               <h5 className="card-title">Register Here!!!</h5>
//             </div>
//             <div className="card-body mt-3">
//               <form className="row g-3" onSubmit={saveUser}>
//                 <div className="col-md-6 mb-3 text-color">
//                   <label htmlFor="title" className="form-label">
//                     <b>First Name</b>
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="firstName"
//                     name="firstName"
//                     onChange={handleUserInput}
//                     value={user.firstName}
//                   />
//                   {errors.firstName && (
//                     <small className="text-danger">{errors.firstName}</small>
//                   )}
//                 </div>

//                 <div className="col-md-6 mb-3 text-color">
//                   <label htmlFor="title" className="form-label">
//                     <b>Last Name</b>
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="lastName"
//                     name="lastName"
//                     onChange={handleUserInput}
//                     value={user.lastName}
//                   />
//                   {errors.lastName && (
//                     <small className="text-danger">{errors.lastName}</small>
//                   )}
//                 </div>

//                 <div className="col-md-6 mb-3 text-color">
//                   <b>
//                     <label className="form-label">Email Id</label>
//                   </b>
//                   <input
//                     type="email"
//                     className="form-control"
//                     id="emailId"
//                     name="emailId"
//                     onChange={handleUserInput}
//                     value={user.emailId}
//                   />
//                   {errors.emailId && (
//                     <small className="text-danger">{errors.emailId}</small>
//                   )}
//                 </div>
//                 <div className="col-md-6 mb-3">
//                   <label htmlFor="quantity" className="form-label">
//                     <b>Password</b>
//                   </label>
//                   <input
//                     type="password"
//                     className="form-control"
//                     id="password"
//                     name="password"
//                     onChange={handleUserInput}
//                     value={user.password}
//                   />
//                   {errors.password && (
//                     <small className="text-danger">{errors.password}</small>
//                   )}
//                 </div>

//                 <div className="col-md-6 mb-3">
//                   <label htmlFor="contact" className="form-label">
//                     <b>Contact No</b>
//                   </label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     id="phoneNo"
//                     name="phoneNo"
//                     onChange={handleUserInput}
//                     value={user.phoneNo}
//                   />
//                   {errors.phoneNo && (
//                     <small className="text-danger">{errors.phoneNo}</small>
//                   )}
//                 </div>

//                 <div className="col-md-6 mb-3">
//                   <label htmlFor="description" className="form-label">
//                     <b> Street</b>
//                   </label>
//                   <textarea
//                     className="form-control"
//                     id="street"
//                     name="street"
//                     rows="3"
//                     onChange={handleUserInput}
//                     value={user.street}
//                   />
//                   {errors.street && (
//                     <small className="text-danger">{errors.street}</small>
//                   )}
//                 </div>
//                 <div className="col-md-6 mb-3">
//                   <label htmlFor="price" className="form-label">
//                     <b>City</b>
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="city"
//                     name="city"
//                     onChange={handleUserInput}
//                     value={user.city}
//                   />
//                   {errors.city && (
//                     <small className="text-danger">{errors.city}</small>
//                   )}
//                 </div>
//                 <div className="col-md-6 mb-3">
//                   <label htmlFor="pincode" className="form-label">
//                     <b>Pincode</b>
//                   </label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     id="pincode"
//                     name="pincode"
//                     onChange={handleUserInput}
//                     value={user.pincode}
//                   />
//                   {errors.pincode && (
//                     <small className="text-danger">{errors.pincode}</small>
//                   )}
//                 </div>

//                 <div className="d-flex aligns-items-center justify-content-center">
//                   <input
//                     type="submit"
//                     className="btn bg-color custom-bg-text"
//                     value="Register User"
//                   />
//                 </div>
//                 <ToastContainer />
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserRegister;
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {
  const navigate = useNavigate();
  const restaurant = JSON.parse(sessionStorage.getItem("active-restaurant"));
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    phoneNo: "",
    street: "",
    city: "",
    pincode: "",
    role: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (document.URL.indexOf("customer") !== -1) {
      setUser(prev => ({ ...prev, role: "Customer" }));
    } else if (document.URL.indexOf("delivery") !== -1) {
      setUser(prev => ({ ...prev, role: "Delivery" }));
    } else if (document.URL.indexOf("restaurant") !== -1) {
      setUser(prev => ({ ...prev, role: "Restaurant" }));
    }
  }, []);

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    
    // Clear error when user starts typing
    if (value.trim() !== "") {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    let formErrors = {};
    const requiredFields = ["firstName", "lastName", "emailId", "password", "phoneNo", "street", "city", "pincode"];
    
    requiredFields.forEach(field => {
      if (!user[field] || user[field].trim() === "") {
        formErrors[field] = "Field is mandatory";
      }
    });
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (user.emailId && !emailRegex.test(user.emailId)) {
      formErrors.emailId = "Please enter a valid email";
    }
    
    // Phone number validation
    if (user.phoneNo && (user.phoneNo.length < 10 || user.phoneNo.length > 15)) {
      formErrors.phoneNo = "Please enter a valid phone number";
    }
    
    // Pincode validation
    if (user.pincode && (user.pincode.length < 6 || user.pincode.length > 6)) {
      formErrors.pincode = "Pincode must be 6 digits";
    }
    
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const saveUser = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill all mandatory fields correctly!", {
        position: "top-center",
        autoClose: 1500,
      });
      return;
    }
    
    let jwtToken;
    if (user.role === "Delivery") {
      user.restaurantId = restaurant.id;
    }
    
    fetch("http://localhost:8080/api/user/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((result) => {
        console.log("result", result);
        result.json().then((res) => {
          if (res.success) {
            toast.success(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              navigate("/user/login");
            }, 1000);
          } else if (!res.success) {
            toast.error(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              window.location.reload(true);
            }, 1000);
          } else {
            toast.error("It seems server is down", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              window.location.reload(true);
            }, 1000);
          }
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("It seems server is down", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          window.location.reload(true);
        }, 1000);
      });
  };

  // Helper function to determine input field class
  const getFieldClass = (fieldName) => {
    return `form-control ${errors[fieldName] ? 'is-invalid' : ''}`;
  };

  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center ms-2 me-2 mb-2">
        <div
          className="form-card border-color text-color"
          style={{ width: "50rem" }}
        >
          <div className="container-fluid">
            <div
              className="card-header bg-color custom-bg-text mt-2 d-flex justify-content-center align-items-center"
              style={{
                borderRadius: "1em",
                height: "45px",
              }}
            >
              <h5 className="card-title">Register Here!!!</h5>
            </div>
            <div className="card-body mt-3">
              <form className="row g-3" onSubmit={saveUser}>
                <div className="col-md-6 mb-3 text-color">
                  <label htmlFor="firstName" className="form-label">
                    <b>First Name</b>
                  </label>
                  <input
                    type="text"
                    className={getFieldClass("firstName")}
                    id="firstName"
                    name="firstName"
                    onChange={handleUserInput}
                    value={user.firstName}
                  />
                  {errors.firstName && (
                    <div className="invalid-feedback">{errors.firstName}</div>
                  )}
                </div>
                <div className="col-md-6 mb-3 text-color">
                  <label htmlFor="lastName" className="form-label">
                    <b>Last Name</b>
                  </label>
                  <input
                    type="text"
                    className={getFieldClass("lastName")}
                    id="lastName"
                    name="lastName"
                    onChange={handleUserInput}
                    value={user.lastName}
                  />
                  {errors.lastName && (
                    <div className="invalid-feedback">{errors.lastName}</div>
                  )}
                </div>
                <div className="col-md-6 mb-3 text-color">
                  <b>
                    <label htmlFor="emailId" className="form-label">Email Id</label>
                  </b>
                  <input
                    type="email"
                    className={getFieldClass("emailId")}
                    id="emailId"
                    name="emailId"
                    onChange={handleUserInput}
                    value={user.emailId}
                  />
                  {errors.emailId && (
                    <div className="invalid-feedback">{errors.emailId}</div>
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="password" className="form-label">
                    <b>Password</b>
                  </label>
                  <input
                    type="password"
                    className={getFieldClass("password")}
                    id="password"
                    name="password"
                    onChange={handleUserInput}
                    value={user.password}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="phoneNo" className="form-label">
                    <b>Contact No</b>
                  </label>
                  <input
                    type="number"
                    className={getFieldClass("phoneNo")}
                    id="phoneNo"
                    name="phoneNo"
                    onChange={handleUserInput}
                    value={user.phoneNo}
                  />
                  {errors.phoneNo && (
                    <div className="invalid-feedback">{errors.phoneNo}</div>
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="street" className="form-label">
                    <b>Street</b>
                  </label>
                  <textarea
                    className={getFieldClass("street")}
                    id="street"
                    name="street"
                    rows="3"
                    onChange={handleUserInput}
                    value={user.street}
                  />
                  {errors.street && (
                    <div className="invalid-feedback">{errors.street}</div>
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="city" className="form-label">
                    <b>City</b>
                  </label>
                  <input
                    type="text"
                    className={getFieldClass("city")}
                    id="city"
                    name="city"
                    onChange={handleUserInput}
                    value={user.city}
                  />
                  {errors.city && (
                    <div className="invalid-feedback">{errors.city}</div>
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="pincode" className="form-label">
                    <b>Pincode</b>
                  </label>
                  <input
                    type="number"
                    className={getFieldClass("pincode")}
                    id="pincode"
                    name="pincode"
                    onChange={handleUserInput}
                    value={user.pincode}
                  />
                  {errors.pincode && (
                    <div className="invalid-feedback">{errors.pincode}</div>
                  )}
                </div>
                <div className="d-flex aligns-items-center justify-content-center">
                  <input
                    type="submit"
                    className="btn bg-color custom-bg-text"
                    value="Register User"
                  />
                </div>
                <ToastContainer />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;