import React from "react";

const PaymentButton = () => {
  const handlePayment = () => {
    console.log("Payment initiated.");
  };

  return (
    <button id="payment" onClick={handlePayment}>
      支払い
    </button>
  );
};

export default PaymentButton;
