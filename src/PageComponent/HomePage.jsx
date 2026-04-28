// // import React, { useState, useEffect } from "react";
// // import { useParams } from "react-router-dom";
// // import axios from "axios";
// // import FoodCard from "../FoodComponent/FoodCard";
// // import Carousel from "./Carousel";
// // import Footer from "../NavbarComponent/Footer";

// // const HomePage = () => {
// //   const { categoryId, categoryName } = useParams();
// //   const [foods, setFoods] = useState([]);
// //   const [searchText, setSearchText] = useState("");
// //   const [tempSearchText, setTempSearchText] = useState("");

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         let response;

// //         if (categoryId == null && searchText === "") {
// //           // Fetch all foods
// //           response = await axios.get(
// //             `http://localhost:8080/api/food/fetch/all`
// //           );
// //         } else if (searchText) {
// //           // Fetch foods by name
// //           response = await axios.get(
// //             `http://localhost:8080/api/food/search?foodName=${searchText}`
// //           );
// //         } else {
// //           // Fetch foods by category
// //           response = await axios.get(
// //             `http://localhost:8080/api/food/fetch/category-wise?categoryId=${categoryId}`
// //           );
// //         }
// //         if (response.data) {
// //           setFoods(response.data.foods);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching data:", error);
// //       }
// //     };

// //     fetchData();
// //   }, [categoryId, searchText]);

// //   const searchFoods = (e) => {
// //     e.preventDefault();
// //     setSearchText(tempSearchText);
// //   };

// //   return (
// //     <div className="container-fluid mb-2">
// //       <Carousel />

// //       <div className="d-flex aligns-items-center justify-content-center mt-5">
// //         <form className="row g-3">
// //           <div className="col-auto">
// //             <input
// //               type="text"
// //               className="form-control"
// //               id="inputPassword2"
// //               placeholder="Enter Food Name..."
// //               onChange={(e) => setTempSearchText(e.target.value)}
// //               style={{
// //                 width: "350px",
// //               }}
// //               value={tempSearchText}
// //               required
// //             />
// //           </div>
// //           <div className="col-auto">
// //             <button
// //               type="submit"
// //               className="btn bg-color custom-bg-text mb-3"
// //               onClick={searchFoods}
// //             >
// //               Search
// //             </button>
// //           </div>
// //         </form>
// //       </div>

// //       <div className="col-md-12 mt-3 mb-5">
// //         <div className="row row-cols-1 row-cols-md-4 g-4">
// //           {foods.map((food) => {
// //             return <FoodCard item={food} key={food.id} />;
// //           })}
// //         </div>
// //       </div>
// //       <hr />
// //       <Footer />
// //     </div>
// //   );
// // };

// // export default HomePage;
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import FoodCard from "../FoodComponent/FoodCard";
// import Carousel from "./Carousel";
// import Footer from "../NavbarComponent/Footer";

// const HomePage = () => {
//   const { categoryId, categoryName } = useParams();
//   const [foods, setFoods] = useState([]);
//   const [searchText, setSearchText] = useState("");
//   const [tempSearchText, setTempSearchText] = useState("");
//   const [visibleCount, setVisibleCount] = useState(8); // Initially show 8 items
//   const [showMore, setShowMore] = useState(false); // Track if we're showing all items

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         let response;
//         if (categoryId == null && searchText === "") {
//           // Fetch all foods
//           response = await axios.get(
//             `http://localhost:8080/api/food/fetch/all`
//           );
//         } else if (searchText) {
//           // Fetch foods by name
//           response = await axios.get(
//             `http://localhost:8080/api/food/search?foodName=${searchText}`
//           );
//         } else {
//           // Fetch foods by category
//           response = await axios.get(
//             `http://localhost:8080/api/food/fetch/category-wise?categoryId=${categoryId}`
//           );
//         }
//         if (response.data) {
//           setFoods(response.data.foods);
//           // Reset visibility when new data is loaded
//           setVisibleCount(8);
//           setShowMore(false);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, [categoryId, searchText]);

//   const searchFoods = (e) => {
//     e.preventDefault();
//     setSearchText(tempSearchText);
//   };

//   const handleShowMore = () => {
//     if (showMore) {
//       // If already showing all, go back to initial count
//       setVisibleCount(8);
//       setShowMore(false);
//     } else {
//       // Show all items
//       setVisibleCount(foods.length);
//       setShowMore(true);
//     }
//   };

//   return (
//     <div className="container-fluid mb-2">
//       <Carousel />
//       <div className="d-flex aligns-items-center justify-content-center mt-5">
//         <form className="row g-3">
//           <div className="col-auto">
//             <input
//               type="text"
//               className="form-control"
//               id="inputPassword2"
//               placeholder="Enter Food Name..."
//               onChange={(e) => setTempSearchText(e.target.value)}
//               style={{
//                 width: "350px",
//               }}
//               value={tempSearchText}
//               required
//             />
//           </div>
//           <div className="col-auto">
//             <button
//               type="submit"
//               className="btn bg-color custom-bg-text mb-3"
//               onClick={searchFoods}
//             >
//               Search
//             </button>
//           </div>
//         </form>
//       </div>
      
//       <div className="col-md-12 mt-3 mb-3">
//         <div className="row row-cols-1 row-cols-md-4 g-4">
//           {foods.slice(0, visibleCount).map((food) => {
//             return <FoodCard item={food} key={food.id} />;
//           })}
//         </div>
//       </div>
      
//       {foods.length > 8 && (
//         <div className="d-flex justify-content-center mb-4">
//           <button
//             className="btn bg-color custom-bg-text"
//             onClick={handleShowMore}
//           >
//             {showMore ? "Show Less" : "Show More"}
//           </button>
//         </div>
//       )}
      
//       <hr />
//       <Footer />
//     </div>
//   );
// };

// export default HomePage;


import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FoodCard from "../FoodComponent/FoodCard";
import Carousel from "./Carousel";
import Footer from "../NavbarComponent/Footer";

const HomePage = () => {
  const { categoryId, categoryName } = useParams();
  const [foods, setFoods] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [tempSearchText, setTempSearchText] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;

        if (categoryId == null && searchText === "") {
          response = await axios.get(`http://localhost:8080/api/food/fetch/all`);
        } else if (searchText) {
          response = await axios.get(
            `http://localhost:8080/api/food/search?foodName=${searchText}`
          );
        } else {
          response = await axios.get(
            `http://localhost:8080/api/food/fetch/category-wise?categoryId=${categoryId}`
          );
        }

        if (response.data) {
          let foodsData = response.data.foods;

          // Fetch ratings for each food
          const foodsWithRatings = await Promise.all(
            foodsData.map(async (food) => {
              try {
                const reviewRes = await axios.get(
                  `http://localhost:8080/api/food/review/fetch?foodId=${food.id}`
                );
                return {
                  ...food,
                  averageRating: reviewRes.data.averageRating || 0,
                  totalReviews: reviewRes.data.reviews
                    ? reviewRes.data.reviews.length
                    : 0,
                };
              } catch (err) {
                console.error("Error fetching reviews for food:", food.id, err);
                return { ...food, averageRating: 0, totalReviews: 0 };
              }
            })
          );

          setFoods(foodsWithRatings);
          setVisibleCount(8);
          setShowMore(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [categoryId, searchText]);

  const searchFoods = (e) => {
    e.preventDefault();
    setSearchText(tempSearchText);
  };

  const handleShowMore = () => {
    if (showMore) {
      setVisibleCount(8);
      setShowMore(false);
    } else {
      setVisibleCount(foods.length);
      setShowMore(true);
    }
  };

  return (
    <div className="container-fluid mb-2">
      <Carousel />
      <div className="d-flex aligns-items-center justify-content-center mt-5">
        <form className="row g-3">
          <div className="col-auto">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Food Name..."
              onChange={(e) => setTempSearchText(e.target.value)}
              style={{ width: "350px" }}
              value={tempSearchText}
              required
            />
          </div>
          <div className="col-auto">
            <button
              type="submit"
              className="btn bg-color custom-bg-text mb-3"
              onClick={searchFoods}
            >
              Search
            </button>
          </div>
        </form>
      </div>

      <div className="col-md-12 mt-3 mb-3">
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {foods.slice(0, visibleCount).map((food) => {
            return <FoodCard item={food} key={food.id} />;
          })}
        </div>
      </div>

      {foods.length > 8 && (
        <div className="d-flex justify-content-center mb-4">
          <button
            className="btn bg-color custom-bg-text"
            onClick={handleShowMore}
          >
            {showMore ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
      <hr />
      <Footer />
    </div>
  );
};

export default HomePage;
