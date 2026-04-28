// // import { useState, useEffect } from "react";
// // import axios from "axios";
// // import React from "react";

// // const ViewAllFoods = () => {
// //   const [allFoods, setAllFoods] = useState([]);

// //   useEffect(() => {
// //     const getAllFoods = async () => {
// //       const allFoods = await retrieveAllFoods();
// //       if (allFoods) {
// //         setAllFoods(allFoods.foods);
// //       }
// //     };

// //     getAllFoods();
// //   }, []);

// //   const retrieveAllFoods = async () => {
// //     const response = await axios.get(
// //       "http://localhost:8080/api/food/fetch/all"
// //     );
// //     console.log(response.data);
// //     return response.data;
// //   };

// //   return (
// //     <div className="mt-3">
// //       <div
// //         className="card form-card ms-2 me-2 mb-5 shadow-lg"
// //         style={{
// //           height: "45rem",
// //         }}
// //       >
// //         <div
// //           className="card-header custom-bg-text text-center bg-color"
// //           style={{
// //             borderRadius: "1em",
// //             height: "50px",
// //           }}
// //         >
// //           <h2>All Foods</h2>
// //         </div>
// //         <div
// //           className="card-body"
// //           style={{
// //             overflowY: "auto",
// //           }}
// //         >
// //           <div className="table-responsive">
// //             <table className="table table-hover text-color text-center">
// //               <thead className="table-bordered border-color bg-color custom-bg-text">
// //                 <tr>
// //                   <th scope="col">Food</th>
// //                   <th scope="col">Name</th>
// //                   <th scope="col">Description</th>
// //                   <th scope="col">Category</th>

// //                   <th scope="col">Price</th>
// //                   <th scope="col">Restaurant</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {allFoods.map((food) => {
// //                   return (
// //                     <tr>
// //                       <td>
// //                         <img
// //                           src={"http://localhost:8080/api/food/" + food.image1}
// //                           class="img-fluid"
// //                           alt="food_pic"
// //                           style={{
// //                             maxWidth: "90px",
// //                           }}
// //                         />
// //                       </td>
// //                       <td>
// //                         <b>{food.name}</b>
// //                       </td>
// //                       <td>
// //                         <b>{food.description}</b>
// //                       </td>
// //                       <td>
// //                         <b>{food.category.name}</b>
// //                       </td>

// //                       <td>
// //                         <b>{food.price}</b>
// //                       </td>
// //                       <td>
// //                         <b>{food.restaurant.firstName}</b>
// //                       </td>
// //                     </tr>
// //                   );
// //                 })}
// //               </tbody>
// //             </table>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ViewAllFoods;



// import { useState, useEffect } from "react";
// import axios from "axios";
// import React from "react";

// const ViewAllFoods = () => {
//   const [allFoods, setAllFoods] = useState([]);

//   useEffect(() => {
//     const getAllFoods = async () => {
//       const allFoods = await retrieveAllFoods();
//       if (allFoods) {
//         setAllFoods(allFoods.foods);
//       }
//     };
//     getAllFoods();
//   }, []);

//   const retrieveAllFoods = async () => {
//     const response = await axios.get(
//       "http://localhost:8080/api/food/fetch/all"
//     );
//     console.log(response.data);
//     return response.data;
//   };

//   return (
//     <div className="mt-3">
//       <div
//         className="card form-card ms-2 me-2 mb-5 shadow-lg"
//         style={{
//           height: "45rem",
//         }}
//       >
//         <div
//           className="card-header custom-bg-text text-center bg-color"
//           style={{
//             borderRadius: "1em",
//             height: "50px",
//           }}
//         >
//           <h2>All Foods</h2>
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
//                   <th scope="col">Food</th>
//                   <th scope="col">Name</th>
//                   <th scope="col">Description</th>
//                   <th scope="col">Category</th>
//                   <th scope="col">Price</th>
//                   <th scope="col">Restaurant</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {allFoods.map((food) => (
//                   <tr key={food.id}>
//                     <td>
//                       {food.image1 ? (
//                         <img
//                           src={"http://localhost:8080/api/food/" + food.image1}
//                           className="img-fluid"
//                           alt="food_pic"
//                           style={{
//                             maxWidth: "90px",
//                           }}
//                         />
//                       ) : (
//                         <span>No Image</span>
//                       )}
//                     </td>
//                     <td>
//                       <b>{food.name || "N/A"}</b>
//                     </td>
//                     <td>
//                       <b>{food.description || "N/A"}</b>
//                     </td>
//                     <td>
//                       <b>{food.category?.name || "N/A"}</b>
//                     </td>
//                     <td>
//                       <b>{food.price || "N/A"}</b>
//                     </td>
//                     <td>
//                       <b>{food.restaurant?.firstName || "N/A"}</b>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewAllFoods;


import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

const ViewAllFoods = () => {
  const [allFoods, setAllFoods] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const getAllFoods = async () => {
      const allFoods = await retrieveAllFoods();
      if (allFoods) {
        setAllFoods(allFoods.foods);
      }
    };
    getAllFoods();
  }, []);

  const retrieveAllFoods = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/food/fetch/all"
    );
    console.log(response.data);
    return response.data;
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFoods = allFoods.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(allFoods.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 shadow-lg"
        style={{
          height: "auto",
          borderRadius: "1em",
          border: "1px solid #ccc",
        }}
      >
        <div
          className="card-header custom-bg-text text-center bg-color"
          style={{
            borderRadius: "1em 1em 0 0",
            height: "50px",
          }}
        >
          <h2>All Foods</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="table-responsive">
            <table className="table table-hover text-color text-center table-bordered">
              <thead className="bg-color custom-bg-text">
                <tr>
                  <th scope="col">Food</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Category</th>
                  <th scope="col">Price</th>
                  <th scope="col">Restaurant</th>
                </tr>
              </thead>
              <tbody>
                {currentFoods.map((food) => (
                  <tr key={food.id}>
                    <td>
                      {food.image1 ? (
                        <img
                          src={`http://localhost:8080/api/food/${food.image1}`}
                          className="img-fluid"
                          alt="food_pic"
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                            borderRadius: "8px",
                            margin: "5px",
                          }}
                        />
                      ) : (
                        <span>No Image</span>
                      )}
                    </td>
                    <td>
                      <b>{food.name || "N/A"}</b>
                    </td>
                    <td>
                      <b>{food.description || "N/A"}</b>
                    </td>
                    <td>
                      <b>{food.category?.name || "N/A"}</b>
                    </td>
                    <td>
                      <b>{food.price || "N/A"}</b>
                    </td>
                    <td>
                      <b>{food.restaurant?.firstName || "N/A"}</b>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <button
              className="btn btn-outline-secondary"
              onClick={handlePrev}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="btn btn-outline-secondary"
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllFoods;
