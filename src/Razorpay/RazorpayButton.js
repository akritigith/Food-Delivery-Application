// // src/components/RazorpayButton.jsx
// import React from "react";
// import useRazorpay from "../hooks/useRazorpay";




// const RazorpayButton = ({ amount, orderDetails }) => {
//   // Use the custom hook to ensure the Razorpay script is loaded
  
//   const isScriptLoaded = useRazorpay();


 

//   const handlePayment = async () => {
//     if (!isScriptLoaded) {
//       alert("Razorpay SDK is loading. Please wait...");
//       return;
//     }

//     // 1. --- CREATE ORDER ---
//     // The amount is in the smallest currency unit (e.g., paise for INR)
//     const amountInPaise = amount * 100;

//     const response = await fetch(
//       "http://localhost:8080/api/payment/create-order",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ amount: amountInPaise }),
//       }
//     );

//     if (!response.ok) {
//       alert("Failed to create Razorpay order. Please try again.");
//       return;
//     }

//     const orderData = await response.json();
//     console.log("Order created:", orderData);

//     // 2. --- CONFIGURE RAZORPAY OPTIONS ---
//     const options = {
//       key: "rzp_test_RDYAtSxBoQtKXm", // Replace with your Key ID
//       amount: orderData.amount,
//       currency: "INR",
//       name: "My Online Food App",
//       description: `Payment for Order #${orderDetails.id || "N/A"}`,
//       image: "https://example.com/your_logo.png", // Your logo URL
//       order_id: orderData.id,

//       // 3. --- SET HANDLER FUNCTION ---
//       handler: async function (response) {
//         console.log("Payment successful response:", response);

//         // 4. --- VERIFY PAYMENT ON BACKEND ---
//         try {
//           const verificationResponse = await fetch(
//             "http://localhost:8080/api/payment/verify-signature",
//             {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify({
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_signature: response.razorpay_signature,
//               }),
//             }
//           );

//           if (verificationResponse.ok) {
//             alert("Payment successful and verified!");
//             // Here you can navigate to a success page or update the UI
//           } else {
//             alert("Payment verification failed. Please contact support.");
//           }
//         } catch (error) {
//           console.error("Verification API call failed:", error);
//           alert("Could not verify payment. Please contact support.");
//         }
//       },
//       prefill: {
//         name: "Test User",
//         email: "test.user@example.com",
//         contact: "9999999999",
//       },
//       notes: {
//         address: "Your company address",
//         order_details: JSON.stringify(orderDetails), // Pass any extra details
//       },
//       theme: {
//         color: "#F37254",
//       },
//     };

//     // 5. --- OPEN RAZORPAY CHECKOUT ---
//     const rzp = new window.Razorpay(options);
//     rzp.open();

//     rzp.on("payment.failed", function (response) {
//       alert("Payment failed!");
//       console.error("Payment failed response:", response);
//     });
//   };

//   return (
//     <button onClick={handlePayment} disabled={!isScriptLoaded}>
//       {isScriptLoaded ? `Pay ₹${amount}` : "Loading..."}
//     </button>
//   );
// };

// export default RazorpayButton;



// src/components/RazorpayButton.jsx
import React from "react";
import useRazorpay from "../hooks/useRazorpay";

const RazorpayButton = ({ amount, orderDetails, className }) => {
  const isScriptLoaded = useRazorpay();

  const handlePayment = async () => {
    if (!isScriptLoaded) {
      alert("Razorpay SDK is loading. Please wait...");
      return;
    }
    
    const amountInPaise = amount * 100;
    const response = await fetch(
      "http://localhost:8080/api/payment/create-order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: amountInPaise }),
      }
    );
    
    if (!response.ok) {
      alert("Failed to create Razorpay order. Please try again.");
      return;
    }
    
    const orderData = await response.json();
    console.log("Order created:", orderData);

    const options = {
      key: "rzp_test_RDYAtSxBoQtKXm", // Replace with your Key ID
      amount: orderData.amount,
      currency: "INR",
      name: "My Online Food App",
      description: `Payment for Order #${orderDetails.id || "N/A"}`,
      image: "https://example.com/your_logo.png", // Your logo URL
      order_id: orderData.id,
      handler: async function (response) {
        console.log("Payment successful response:", response);
        try {
          const verificationResponse = await fetch(
            "http://localhost:8080/api/payment/verify-signature",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            }
          );
          if (verificationResponse.ok) {
            alert("Payment successful and verified!");
            // Here you can navigate to a success page or update the UI
          } else {
            alert("Payment verification failed. Please contact support.");
          }
        } catch (error) {
          console.error("Verification API call failed:", error);
          alert("Could not verify payment. Please contact support.");
        }
      },
      prefill: {
        name: "Test User",
        email: "test.user@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Your company address",
        order_details: JSON.stringify(orderDetails),
      },
      theme: {
        color: "#F37254", // This sets the Razorpay modal theme color
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    rzp.on("payment.failed", function (response) {
      alert("Payment failed!");
      console.error("Payment failed response:", response);
    });
  };

  return (
    <button 
      onClick={handlePayment} 
      disabled={!isScriptLoaded}
      className={`btn ${className || ""}`}
    >
      {isScriptLoaded ? `Pay ₹${amount}` : "Loading..."}
    </button>
  );
};

export default RazorpayButton;
