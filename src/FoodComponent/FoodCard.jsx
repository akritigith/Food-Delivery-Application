// 


import { Link } from "react-router-dom";
import CategoryNavigator from "../CategoryComponent/CategoryNavigator";
import { useState } from "react";
import star from "../images/star.png";

const FoodCard = ({ item }) => {
  const [imgError, setImgError] = useState(false);

  if (!item) return null;

  const descriptionToShow = (description, maxLength) => {
    if (!description) return "";
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + "...";
  };

  const {
    id = "",
    name = "Unnamed Item",
    description = "",
    price = "N/A",
    image1 = "",
    category = null,
    restaurant = null,
    averageRating = 0,
    totalReviews = 0,
  } = item;

  const imageUrl = `http://localhost:8080/api/food/${image1}`;

  return (
    <div className="col">
      <div className="card food-card rounded-card h-100 shadow-lg">
        <img
          src={imgError ? "/no-image.png" : imageUrl}
          className="card-img-top rounded"
          alt={name}
          style={{ maxHeight: "300px", margin: "0 auto" }}
          onError={() => setImgError(true)}
        />
        <div className="card-body text-color">
          <h5>
            Category:{" "}
            {category ? (
              <CategoryNavigator
                item={{ id: category.id, name: category.name }}
              />
            ) : (
              <span>No Category</span>
            )}
          </h5>

          {/* Food Name with Restaurant Name */}
          <h5 className="card-title d-flex flex-column text-color-second">
            <div>
              <b>{name}</b>
            </div>
            {restaurant && (
              <div className="mt-1">
                <small className="text-muted">by {restaurant.firstName}</small>
              </div>
            )}
          </h5>

          {/* ⭐ Rating Display */}
          <div className="mb-2">
            <span>
              <b>{averageRating.toFixed(1)}</b>{" "}
              <img
                src={star}
                width="18"
                height="18"
                className="d-inline-block align-top"
                alt="star"
              />{" "}
              ({totalReviews} reviews)
            </span>
          </div>

          <p className="card-text">
            <b>{descriptionToShow(description, 50)}</b>
          </p>
        </div>
        <div className="card-footer">
          <div className="d-flex justify-content-between mt-2">
            {id && category?.id ? (
              <Link
                to={`/food/${id}/category/${category.id}`}
                className="btn bg-color custom-bg-text"
              >
                Add to Cart
              </Link>
            ) : (
              <button className="btn bg-color custom-bg-text" disabled>
                Add to Cart
              </button>
            )}
            <div className="text-color-second">
              <h4>₹{price}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
