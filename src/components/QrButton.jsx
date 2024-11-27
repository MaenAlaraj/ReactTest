import React from "react";

const QrButton = () => {
  const handleQr = () => {
    console.log("QR button clicked.");
  };

  return (
    <button id="qrButton" onClick={handleQr}>
      QR認証
    </button>
  );
};

export default QrButton;
