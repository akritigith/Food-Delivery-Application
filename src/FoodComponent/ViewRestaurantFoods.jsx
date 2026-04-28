import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ViewRestaurantFoods = () => {
  const restaurant = JSON.parse(sessionStorage.getItem("active-restaurant"));
  const restaurant_jwtToken = sessionStorage.getItem("restaurant-jwtToken");
  const [allFoods, setAllFoods] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    const getAllFoods = async () => {
      if (!restaurant) {
        console.error("No active restaurant found in sessionStorage");
        toast.error("No active restaurant found. Please login or select a restaurant.");
        return;
      }
      const allFoods = await retrieveAllFoods();
      if (allFoods) {
        setAllFoods(allFoods.foods);
      }
    };
    getAllFoods();
  }, []);

  const retrieveAllFoods = async () => {
    if (!restaurant) {
      console.error("No active restaurant found in sessionStorage");
      toast.error("No active restaurant found. Please login or select a restaurant.");
      return null;
    }
    const response = await axios.get(
      "http://localhost:8080/api/food/fetch/restaurant-wise?restaurantId=" +
        restaurant.id
    );
    console.log(response.data);
    return response.data;
  };

  const deleteFood = (foodId, e) => {
    if (!restaurant) {
      toast.error("No active restaurant found. Please login or select a restaurant.");
      return;
    }
    fetch(
      "http://localhost:8080/api/food/delete?foodId=" +
        foodId +
        "&restaurantId=" +
        restaurant.id,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + restaurant_jwtToken,
        },
      }
    )
      .then((result) => {
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
              window.location.reload(true);
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

  const updateFood = (food) => {
    navigate("/restaurant/food/update", { state: food });
  };

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 shadow-lg"
        style={{
          height: "45rem",
        }}
      >
        <div
          className="card-header custom-bg-text text-center bg-color d-flex align-items-center justify-content-center"
          style={{
            borderRadius: "1em",
            height: "50px",
          }}
        >
          <h2 className="mb-0">My Foods</h2>
        </div>
        <div
          className="card-body d-flex flex-column"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="table-responsive">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th scope="col" className="py-3">Food</th>
                  <th scope="col" className="py-3">Name</th>
                  <th scope="col" className="py-3">Description</th>
                  <th scope="col" className="py-3">Category</th>
                  <th scope="col" className="py-3">Price</th>
                  <th scope="col" className="py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {allFoods.map((food) => {
                  return (
                    <tr key={food.id}>
                      <td className="align-middle py-3">
                        <div className="d-flex justify-content-center">
                          <img
                            src={"http://localhost:8080/api/food/" + food.image1}
                            className="img-fluid"
                            alt="food_pic"
                            style={{
                              maxWidth: "90px",
                            }}
                          />
                        </div>
                      </td>
                      <td className="align-middle py-3">
                        <b>{food.name}</b>
                      </td>
                      <td className="align-middle py-3">
                        <b>{food.description}</b>
                      </td>
                      <td className="align-middle py-3">
                        <b>{food.category ? food.category.name : "No Category"}</b>
                      </td>
                      <td className="align-middle py-3">
                        <b>₹{food.price}</b>
                      </td>
                      <td className="align-middle py-3">
                        <div className="d-flex justify-content-center gap-2">
                          <button
                            onClick={() => updateFood(food)}
                            className="btn btn-sm bg-color custom-bg-text"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => deleteFood(food.id)}
                            className="btn btn-sm bg-color custom-bg-text"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewRestaurantFoods;