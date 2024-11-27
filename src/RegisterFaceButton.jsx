import React from "react";

const RegisterFaceButton = () => {
  const handleRegisterFace = () => {
    console.log("Register Face button clicked!");
  };

  return (
    <button id="registerFaceButton" onClick={handleRegisterFace}>
      Register Face
    </button>
  );
};

export default RegisterFaceButton;
