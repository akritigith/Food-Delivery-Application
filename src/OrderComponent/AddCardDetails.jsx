import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const AddCardDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("active-customer"));
  const priceToPay = location.state.priceToPay;
  const customer_jwtToken = sessionStorage.getItem("customer-jwtToken");
  
  const [card, setCard] = useState({
    cardName: "",
    cardNumber: "",
    validThrough: "",
    cvv: "",
  });
  
  const [errors, setErrors] = useState({});
  const [discount, setDiscount] = useState("none");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCardInput = (e) => {
    const { name, value } = e.target;
    
    // Format card number with spaces every 4 digits
    if (name === "cardNumber") {
      // Remove any non-digit characters
      const digitsOnly = value.replace(/\D/g, '');
      // Format with spaces every 4 digits
      const formattedValue = digitsOnly
        .replace(/(\d{4})/g, "$1 ")
        .trim();
      setCard({ ...card, [name]: formattedValue });
      setErrors({ ...errors, [name]: "" });
      return;
    }
    
    // Format expiry date as MM/YY
    if (name === "validThrough") {
      const formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d{0,2})/, "$1/$2")
        .substring(0, 5);
      setCard({ ...card, [name]: formattedValue });
      setErrors({ ...errors, [name]: "" });
      return;
    }
    
    setCard({ ...card, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleDiscountChange = (e) => {
    setDiscount(e.target.value);
  };

  const calculateDiscountAmount = () => {
    if (discount === "flat100") {
      return 100;
    } else if (discount === "percent10") {
      return priceToPay * 0.1;
    }
    return 0;
  };

  const calculateFinalPrice = () => {
    const finalPrice = priceToPay - calculateDiscountAmount();
    return Math.max(0, finalPrice);
  };

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    // Cardholder name validation
    if (!card.cardName.trim()) {
      newErrors.cardName = "Cardholder name is required";
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(card.cardName)) {
      newErrors.cardName = "Name should only contain letters and spaces";
      isValid = false;
    }

    // Card number validation - simplified for testing
    const cardNumberDigits = card.cardNumber.replace(/\s/g, "");
    if (!cardNumberDigits) {
      newErrors.cardNumber = "Card number is required";
      isValid = false;
    } else if (!/^\d{16}$/.test(cardNumberDigits)) {
      newErrors.cardNumber = "Card number must be exactly 16 digits";
      isValid = false;
    }

    // Expiry date validation
    if (!card.validThrough.trim()) {
      newErrors.validThrough = "Expiry date is required";
      isValid = false;
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(card.validThrough)) {
      newErrors.validThrough = "Use MM/YY format (e.g., 12/25)";
      isValid = false;
    } else {
      // Check if the card is expired
      const [month, year] = card.validThrough.split('/');
      const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (expiryDate < today) {
        newErrors.validThrough = "Card has expired";
        isValid = false;
      }
    }

    // CVV validation
    if (!card.cvv.trim()) {
      newErrors.cvv = "CVV is required";
      isValid = false;
    } else if (!/^\d{3}$/.test(card.cvv)) {
      newErrors.cvv = "CVV must be exactly 3 digits";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const payForOrder = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fill all fields according to the requirements", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`http://localhost:8080/api/order/add?userId=${user.id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${customer_jwtToken}`,
        },
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast.success(result.responseMessage, {
          position: "top-center",
          autoClose: 1000,
        });
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      } else {
        toast.error(result.responseMessage || "Payment failed. Please try again.", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Server error. Please try again later.", {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center">
        <div className="card form-card border-color" style={{ width: "25rem" }}>
          <div className="card-header bg-color custom-bg-text">
            <h5 className="card-title text-center">Payment Details</h5>
          </div>
          <div className="card-body text-color custom-bg">
            <form onSubmit={payForOrder}>
              {/* Cardholder Name */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  <b>Name on Card</b>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.cardName ? "is-invalid" : ""}`}
                  id="name"
                  name="cardName"
                  onChange={handleCardInput}
                  value={card.cardName}
                  placeholder="John Doe"
                />
                {errors.cardName && (
                  <div className="invalid-feedback">{errors.cardName}</div>
                )}
              </div>
              
              {/* Card Number */}
              <div className="mb-3">
                <label htmlFor="cardNumber" className="form-label">
                  <b>Card Number</b>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.cardNumber ? "is-invalid" : ""}`}
                  id="cardNumber"
                  name="cardNumber"
                  onChange={handleCardInput}
                  value={card.cardNumber}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
                {errors.cardNumber && (
                  <div className="invalid-feedback">{errors.cardNumber}</div>
                )}
                <div className="form-text">Enter 16-digit card number</div>
              </div>
              
              {/* Expiry Date */}
              <div className="mb-3">
                <label htmlFor="validThrough" className="form-label">
                  <b>Valid Through</b>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.validThrough ? "is-invalid" : ""}`}
                  id="validThrough"
                  name="validThrough"
                  placeholder="MM/YY"
                  onChange={handleCardInput}
                  value={card.validThrough}
                  maxLength={5}
                />
                {errors.validThrough && (
                  <div className="invalid-feedback">{errors.validThrough}</div>
                )}
              </div>
              
              {/* CVV */}
              <div className="mb-3">
                <label htmlFor="cvv" className="form-label">
                  <b>CVV</b>
                </label>
                <input
                  type="password"
                  className={`form-control ${errors.cvv ? "is-invalid" : ""}`}
                  id="cvv"
                  name="cvv"
                  onChange={handleCardInput}
                  value={card.cvv}
                  placeholder="123"
                  maxLength={3}
                />
                {errors.cvv && (
                  <div className="invalid-feedback">{errors.cvv}</div>
                )}
              </div>
              
              {/* Discount Section */}
              <div className="mb-3">
                <label className="form-label">
                  <b>Choose an Offer</b>
                </label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="discount"
                    id="flat100"
                    value="flat100"
                    checked={discount === "flat100"}
                    onChange={handleDiscountChange}
                  />
                  <label className="form-check-label" htmlFor="flat100">
                    ₹100 Flat Discount
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="discount"
                    id="percent10"
                    value="percent10"
                    checked={discount === "percent10"}
                    onChange={handleDiscountChange}
                  />
                  <label className="form-check-label" htmlFor="percent10">
                    10% Discount
                  </label>
                </div>
              </div>
              
              {discount !== "none" && (
                <div className="mb-3 p-3 bg-light rounded">
                  <h6 className="text-success">
                    Original Price: ₹{priceToPay.toFixed(2)}
                  </h6>
                  <h6 className="text-danger">
                    Discount Applied: -₹{calculateDiscountAmount().toFixed(2)}
                  </h6>
                  <h5 className="text-primary">
                    Payable Amount: ₹{calculateFinalPrice().toFixed(2)}
                  </h5>
                </div>
              )}
              
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn custom-bg-text bg-color"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Processing...
                    </>
                  ) : (
                    `Pay ₹${calculateFinalPrice().toFixed(2)}`
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddCardDetails;