import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddFoodForm = () => {
  const [categories, setCategories] = useState([]);
  const restaurant = JSON.parse(sessionStorage.getItem("active-restaurant"));
  const restaurant_jwtToken = sessionStorage.getItem("restaurant-jwtToken");
  let navigate = useNavigate();
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    image1: "",
    image2: "",
    image3: ""
  });

  const retrieveAllCategories = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/category/fetch/all"
    );
    return response.data;
  };

  useEffect(() => {
    const getAllCategories = async () => {
      const resCategory = await retrieveAllCategories();
      if (resCategory) {
        setCategories(resCategory.categories);
      }
    };
    getAllCategories();
  }, []);

  const [selectedImage1, setSelectImage1] = useState(null);
  const [selectedImage2, setSelectImage2] = useState(null);
  const [selectedImage3, setSelectImage3] = useState(null);

  const [food, setFood] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    restaurantId: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFood({ ...food, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Validate name
    if (!food.name.trim()) {
      newErrors.name = "This field is mandatory";
      isValid = false;
    }

    // Validate description
    if (!food.description.trim()) {
      newErrors.description = "This field is mandatory";
      isValid = false;
    }

    // Validate price
    if (!food.price) {
      newErrors.price = "This field is mandatory";
      isValid = false;
    } else if (isNaN(food.price) || parseFloat(food.price) <= 0) {
      newErrors.price = "Price must be a positive number";
      isValid = false;
    }

    // Validate category
    if (!food.categoryId) {
      newErrors.categoryId = "This field is mandatory";
      isValid = false;
    }

    // Validate images
    if (!selectedImage1) {
      newErrors.image1 = "This field is mandatory";
      isValid = false;
    }
    if (!selectedImage2) {
      newErrors.image2 = "This field is mandatory";
      isValid = false;
    }
    if (!selectedImage3) {
      newErrors.image3 = "This field is mandatory";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const saveFood = (e) => {
    e.preventDefault();
    
    if (restaurant === null) {
      toast.error("Restaurant Id is missing!!!", { position: "top-center" });
      return;
    }

    if (!validateForm()) {
      toast.error("Please fill all mandatory fields", { position: "top-center" });
      return;
    }

    const formData = new FormData();
    formData.append("name", food.name);
    formData.append("description", food.description);
    formData.append("price", parseFloat(food.price));
    formData.append("categoryId", food.categoryId);
    formData.append("restaurantId", restaurant.id);
    formData.append("image1", selectedImage1);
    formData.append("image2", selectedImage2);
    formData.append("image3", selectedImage3);

    axios
      .post("http://localhost:8080/api/food/add", formData, {
        headers: {
          Authorization: "Bearer " + restaurant_jwtToken,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        const response = resp.data;
        if (response.success) {
          toast.success(response.responseMessage, {
            position: "top-center",
            autoClose: 1000,
          });
          setTimeout(() => {
            navigate("/home");
          }, 2000);
        } else {
          toast.error(response.responseMessage || "Something went wrong", {
            position: "top-center",
            autoClose: 1000,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(
          error.response?.data?.responseMessage || "Server error. Try again.",
          {
            position: "top-center",
            autoClose: 1000,
          }
        );
      });
  };

  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center mb-4">
        <div className="card form-card shadow-lg" style={{ width: "45rem" }}>
          <div className="container-fluid">
            <div
              className="card-header bg-color custom-bg-text mt-2 text-center"
              style={{
                borderRadius: "1em",
                height: "45px",
              }}
            >
              <h5 className="card-title">Add Food</h5>
            </div>
            <div className="card-body text-color">
              <form className="row g-3">
                <div className="col-md-6 mb-3">
                  <label htmlFor="title" className="form-label">
                    <b>Food Title</b>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    id="title"
                    name="name"
                    onChange={handleInput}
                    value={food.name}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="description" className="form-label">
                    <b>Food Description</b>
                  </label>
                  <textarea
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                    id="description"
                    name="description"
                    rows="3"
                    onChange={handleInput}
                    value={food.description}
                  />
                  {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <b>Category</b>
                  </label>
                  <select
                    name="categoryId"
                    onChange={handleInput}
                    className={`form-control ${errors.categoryId ? 'is-invalid' : ''}`}
                    value={food.categoryId}
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => {
                      return (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      );
                    })}
                  </select>
                  {errors.categoryId && <div className="invalid-feedback">{errors.categoryId}</div>}
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="price" className="form-label">
                    <b>Food Price</b>
                  </label>
                  <input
                    type="number"
                    className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                    id="price"
                    name="price"
                    onChange={handleInput}
                    value={food.price}
                    min="0"
                    step="0.01"
                  />
                  {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="formFile1" className="form-label">
                    <b> Select 1st Image</b>
                  </label>
                  <input
                    className={`form-control ${errors.image1 ? 'is-invalid' : ''}`}
                    type="file"
                    id="formFile1"
                    name="image1"
                    onChange={(e) => {
                      setSelectImage1(e.target.files[0]);
                      if (errors.image1) setErrors({...errors, image1: ""});
                    }}
                    required
                  />
                  {errors.image1 && <div className="invalid-feedback">{errors.image1}</div>}
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="formFile2" className="form-label">
                    <b> Select 2nd Image</b>
                  </label>
                  <input
                    className={`form-control ${errors.image2 ? 'is-invalid' : ''}`}
                    type="file"
                    id="formFile2"
                    name="image2"
                    onChange={(e) => {
                      setSelectImage2(e.target.files[0]);
                      if (errors.image2) setErrors({...errors, image2: ""});
                    }}
                    required
                  />
                  {errors.image2 && <div className="invalid-feedback">{errors.image2}</div>}
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="formFile3" className="form-label">
                    <b> Select 3rd Image</b>
                  </label>
                  <input
                    className={`form-control ${errors.image3 ? 'is-invalid' : ''}`}
                    type="file"
                    id="formFile3"
                    name="image3"
                    onChange={(e) => {
                      setSelectImage3(e.target.files[0]);
                      if (errors.image3) setErrors({...errors, image3: ""});
                    }}
                    required
                  />
                  {errors.image3 && <div className="invalid-feedback">{errors.image3}</div>}
                </div>
                <div className="d-flex aligns-items-center justify-content-center mb-2">
                  <button
                    type="submit"
                    className="btn bg-color custom-bg-text"
                    onClick={saveFood}
                  >
                    Add Food
                  </button>
                </div>
              </form>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFoodForm;