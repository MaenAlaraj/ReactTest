import React from "react";
import { setMessage } from "../utils"; // Adjust the path to where `utils.js` is located
import { useGlobalContext } from "../GlobalContext"; // Adjust the path to your GlobalContext

const RegisterFaceButton = () => {
  const { sbuser } = useGlobalContext(); // Access sbuser from context

  const handleRegisterFace = async () => {
    try {
      // Call the method exposed by your Android WebView
      const resultJsonString = await window.FaceCaptureInterface.getCapturedFace();
      console.log("Captured Face Data:", resultJsonString);

      if (!resultJsonString) {
        document.getElementById('authContainer').style.display = 'block';
        document.getElementById('transitContainer').style.display = 'none';
      } else {
        const resultJsonObject = JSON.parse(resultJsonString);
        const facesArray = resultJsonObject.Faces;
        const numberOfFaces = facesArray.length;

        if (numberOfFaces === 0) {
          console.log("Captured Nr. of Faces:", numberOfFaces);
          setMessage("顔を認証できませんでした。もう一度やり直してください。");
        } else {
          const base64String = facesArray[0].image64;
          setMessage("顔が正常にキャプチャされました。", "show_message");
          console.log("Captured Face Base64 String:", base64String);
          
          
          
          console.log("sbuser value is :", sbuser);
          const info = await window.CCWalletInterface.DelFaces(sbuser, "9392909000000154"); // Use sbuser here
          window.ToastInterface.showToast(info);
        }
      }
    } catch (error) {
      setMessage(`エラーが発生しました: ${error.message}`, "show_message");
      console.error("Error processing face detection:", error);
    }
  };

  return (
    <div>
      <button id="registerFaceButton" onClick={handleRegisterFace}>
        顔認証登録
      </button>
      <div id="message"></div>
    </div>
  );
};

export default RegisterFaceButton;
