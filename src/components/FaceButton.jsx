import React from "react";

const FaceButton = () => {
  const handleFace = () => {
    console.log("Face button clicked.");
  };

  return (
    <button id="faceButton" onClick={handleFace}>
      顔認証
    </button>
  );
};

export default FaceButton;
