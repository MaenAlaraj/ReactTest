import React from "react";

const RegisterFaceButton = () => {
  const handleRegisterFace = () => {
    try {
      // Call the method exposed by your Android WebView
      const resultJsonString = window.FaceCaptureInterface.getCapturedFace();
      console.log("Captured Face Data:", resultJsonString);
    } catch (error) {
      console.error("Error calling FaceCaptureInterface.getCapturedFace:", error);
    }
  };

  return (
    <button id="registerFaceButton" onClick={handleRegisterFace}>
      Register Face
    </button>
  );
};

export default RegisterFaceButton;