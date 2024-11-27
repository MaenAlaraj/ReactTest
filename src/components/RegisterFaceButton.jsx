import React, { useState } from "react";

const RegisterFaceButton = () => {
  const [message, setMessage] = useState("");

  const handleRegisterFace = async () => {
    try {
      // Call the method exposed by your Android WebView
      const resultJsonString = await window.FaceCaptureInterface.getCapturedFace();
      if (!resultJsonString) {
        setMessage("顔を認証できませんでした。もう一度やり直してください。");
      } else {
        const resultJsonObject = JSON.parse(resultJsonString);
        const facesArray = resultJsonObject.Faces;
        const numberOfFaces = facesArray.length;
        if (numberOfFaces === 0) {
          setMessage("顔を認証できませんでした。もう一度やり直してください。");
        } else {
          const base64String = facesArray[0].image64;
          setMessage("顔が正常にキャプチャされました。");
          console.log("Captured Face Base64 String:", base64String);
        }
      }
    } catch (error) {
      setMessage(`エラーが発生しました: ${error.message}`);
      console.error("Error processing face detection:", error);
    }
  };

  return (
    <div>
      <button id="registerFaceButton" onClick={handleRegisterFace}>
        顔認証登録
      </button>
      <div>{message}</div>
    </div>
  );
};

export default RegisterFaceButton;
