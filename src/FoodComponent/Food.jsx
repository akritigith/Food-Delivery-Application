import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import FoodCard from "./FoodCard";
import GetFoodReviews from "../ReviewComponent/GetFoodReviews";
import FoodCarousel from "./FoodCarousel";

const Food = () => {
  const { foodId, categoryId } = useParams();
  let navigate = useNavigate();
  let user = JSON.parse(sessionStorage.getItem("active-customer"));
  const customer_jwtToken = sessionStorage.getItem("customer-jwtToken");
  const [quantity, setQuantity] = useState("");
  const [foods, setFoods] = useState([]);
  const [food, setFood] = useState({
    restaurant: {
      firstName: "",
      id: null,
      emailId: "",
    },
  });

  const retrieveFood = async () => {
    if (!foodId) {
      console.error("Food ID is undefined");
      return { foods: [] };
    }
    const response = await axios.get(
      "http://localhost:8080/api/food/fetch?foodId=" + foodId
    );
    return response.data;
  };

  const retrieveFoodsByCategory = async () => {
    if (!categoryId) {
      console.error("Category ID is undefined");
      return { foods: [] };
    }
    const response = await axios.get(
      "http://localhost:8080/api/food/fetch/category-wise?categoryId=" + categoryId
    );
    console.log(response.data);
    return response.data;
  };

  useEffect(() => {
    const getFood = async () => {
      const retrievedFood = await retrieveFood();
      if (retrievedFood.foods && retrievedFood.foods.length > 0) {
        setFood(retrievedFood.foods[0]);
      } else {
        setFood({
          restaurant: {
            firstName: "",
            id: null,
            emailId: "",
          },
        });
      }
    };

    const getFoodsByCategory = async () => {
      const allFoods = await retrieveFoodsByCategory();
      if (allFoods) {
        setFoods(allFoods.foods);
      }
    };

    getFood();
    getFoodsByCategory();
  }, [foodId]);

  const saveFoodToCart = (userId) => {
    fetch("http://localhost:8080/api/cart/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + customer_jwtToken,
      },
      body: JSON.stringify({
        quantity: quantity,
        userId: userId,
        foodId: foodId,
      }),
    }).then((result) => {
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
            navigate("/customer/cart");
          }, 2000);
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
          }, 2000);
        } else {
          toast.error("It Seems Server is down!!!", {
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
          }, 2000);
        }
      });
    });
  };

  const addToCart = (e) => {
    e.preventDefault();
    if (user == null) {
      alert("Please login to buy the foods!!!");
    } else if (food.quantity < 1) {
      toast.error("Food Out Of Stock !!!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    } else {
      saveFoodToCart(user.id);
      setQuantity("");
    }
  };

  // Add the missing function
  const navigateToAddReviewPage = () => {
    navigate("/food/" + food.id + "/review/add", { state: food });
  };

  const restaurantFoodPage = () => {
    if (!food.restaurant || !food.restaurant.id) {
      toast.error("Restaurant information not available.");
      return;
    }
    navigate(
      `/food/restaurant/${food.restaurant.id}/${food.restaurant.firstName}`,
      {
        state: food.restaurant,
      }
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-3 mt-2 admin">
          <div className="card form-card shadow-lg">
            <FoodCarousel
              item={{
                image1: food.image1,
                image2: food.image2,
                image3: food.image3,
              }}
            />
          </div>
        </div>
        <div className="col-sm-6 mt-2">
          <div className="card form-card shadow-lg">
            <div
              className="card-header bg-color custom-bg-text"
              style={{ borderRadius: "1em", height: "50px" }}
            >
              <h3 className="card-title">{food.name}</h3>
            </div>
            <div className="card-body text-left text-color">
              <div className="text-left mt-3">
                <h3>Description :</h3>
              </div>
              <div className="card-text">
                <h4>{food.description}</h4>
              </div>
            </div>
            <div className="card-body text-left text-color">
              <div className="text-left mt-3">
                <h3>Restaurant Details:</h3>
              </div>
              <div className="d-flex justify-content-left">
                <h4 className="card-text">
                  <b
                    className="text-color"
                    onClick={restaurantFoodPage}
                    style={{ cursor: "pointer" }}
                  >
                    Name:{" "}
                    <span className="text-color-second">
                      {food.restaurant.firstName + " "}
                    </span>
                  </b>
                </h4>
                <h4 className="card-text ms-4">
                  Contact: {food.restaurant.emailId || ""}
                </h4>
              </div>
            </div>
            <div className="card-footer">
              <div className="text-center text-color-second">
                <div>
                  <h4>Price : &#8377;{food.price}</h4>
                </div>
              </div>
              <div className="d-flex justify-content-between mt-4">
                <div>
                  <form className="row g-3" onSubmit={addToCart}>
                    <div className="col-auto">
                      <input
                        type="number"
                        className="form-control"
                        id="addToCart"
                        placeholder="Enter Quantity..."
                        onChange={(e) => setQuantity(e.target.value)}
                        value={quantity}
                        required
                        min={1}
                      />
                    </div>
                    <div className="col-auto">
                      <input
                        type="submit"
                        className="btn bg-color custom-bg-text mb-3"
                        value="Add to Cart"
                      />
                      <ToastContainer />
                    </div>
                  </form>
                </div>
              </div>
              {user && (
                <div>
                  <input
                    type="submit"
                    className="btn bg-color custom-bg-text mb-3"
                    value="Add Review"
                    onClick={navigateToAddReviewPage}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-sm-3 mt-2 admin">
          <GetFoodReviews />
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-md-12">
          <h2 className="text-color">Related Foods:</h2>
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {foods.map((food) => (
              <FoodCard key={food.id || Math.random()} item={food} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Food;