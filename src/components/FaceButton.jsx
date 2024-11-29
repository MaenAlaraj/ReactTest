import React from "react";
import { setMessage } from "../utils"; // Import setMessage from utils.js

const FaceButton = () => {
  const handleFace = async () => {
    console.log("[REACT Console]:「顔認証」ボタンがクリックされました。");

    // Show the transitContainer and hide authContainer
    document.getElementById("authContainer").style.display = "none";
    document.getElementById("transitContainer").style.display = "block";

    try {
      // Call the method exposed by your Android WebView to get face data
      const resultJsonString = await window.FaceCaptureInterface.getFace();
      console.log("[REACT Console]: Face data received:", resultJsonString);

      if (!resultJsonString) {
        setMessage("顔が検出されませんでした。もう一度試してください。", "show_message");
        document.getElementById("transitContainer").style.display = "none";
        document.getElementById("authContainer").style.display = "block";
        return;
      }

      const resultJsonObject = JSON.parse(resultJsonString);
      const facesArray = resultJsonObject.Faces;
      const numberOfFaces = facesArray.length;

      if (numberOfFaces === 0) {
        setMessage("顔を認証できませんでした。もう一度試してください。", "show_message");
        document.getElementById("transitContainer").style.display = "none";
        document.getElementById("authContainer").style.display = "block";
      } else if (numberOfFaces === 1) {
        console.log("[REACT Console]: One face detected.");
        const base64String = facesArray[0].image64;

        // Simulate SearchFaces operation
        const info = await window.CCWalletInterface.SearchFaces("sbuser", "gckid", base64String);
        console.log("[REACT Console]: SearchFaces info:", info);

        if (info.includes("errorsSubstring")) {
          setMessage("顔認証に失敗しました。「顔認証登録」ボタンから顔を登録してください。", "show_message");
          document.getElementById("transitContainer").style.display = "none";
          document.getElementById("authContainer").style.display = "block";
        } else {
          const CCW_FaceResponse_LIST = info.split("：");
          const userID = CCW_FaceResponse_LIST[1].trim();
          setMessage(`GCユーザー: ${userID}`, "user");

          // Transition to mainContainer
          document.getElementById("transitContainer").style.display = "none";
          document.getElementById("mainContainer").style.display = "block";
        }
      } else if (numberOfFaces > 1) {
        setMessage("複数の顔が検出されました。もう一度試してください。", "show_message");
        document.getElementById("transitContainer").style.display = "none";
        document.getElementById("authContainer").style.display = "block";
      }
    } catch (error) {
      setMessage(`エラーが発生しました: ${error.message}`, "show_message");
      document.getElementById("transitContainer").style.display = "none";
      document.getElementById("authContainer").style.display = "block";
    }
  };

  return (
    <button id="faceButton" onClick={handleFace}>
      顔認証
    </button>
  );
};

export default FaceButton;
