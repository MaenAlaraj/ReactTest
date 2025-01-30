import React from "react";
import { setMessage } from "../utils"; // Import setMessage from utils.js
import { useGlobalContext } from "../GlobalContext"; // Adjust the path to your GlobalContext

import useSetBalance from '../useSetBalance'; // Correct the import path


const FaceButton = () => {
  const { errorsSubstring, sbuser, gckid, startTimer } = useGlobalContext(); // Access necessary variables
  
  
  // Call the hook inside the component
  const setBalance = useSetBalance(); // Ensure it's a function

  const handleFace = async () => {
    console.log("[FaceButton]:「顔認証」ボタンがクリックされました。");

    //var info = await window.CCWalletInterface.DelFaces(sbuser,"9392909000000154"); //アララジ    
    //console.log("[Delete Button]:Responce of CCWalletInterface.DelFaces:", info);

    // Show the transitContainer and hide authContainer
    document.getElementById("authContainer").style.display = "none";
    document.getElementById("transitContainer").style.display = "block";

    try {
      const resultJsonString = await window.FaceCaptureInterface.getFace();
      console.log("[FaceButton]: Face data received:", resultJsonString);

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
        document.getElementById('authContainer').style.display = 'block';
        document.getElementById('transitContainer').style.display = 'none';
      } else if (numberOfFaces === 1) {
        console.log("[FaceButton]:Captured Nr. of Faces:", numberOfFaces);
        const base64String = facesArray[0].image64;

        console.log("[FaceButton]:sbuser value is:", sbuser);
        console.log("[FaceButton]:gckid value is:", gckid);
        console.log("[FaceButton]:base64String value is:", base64String);

        const info = await window.CCWalletInterface.SearchFaces(sbuser, gckid, base64String);
        console.log("[FaceButton]: SearchFaces info:", info);

        if (info.includes(errorsSubstring)) {
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

          // Here, call the updateBalance function
          setBalance(userID);  // Call setBalance with the userID

          startTimer();
        }
      } else if (numberOfFaces > 1) {
        setMessage("複数の顔が検出されました。もう一度試してください。", "show_message");
        document.getElementById("transitContainer").style.display = "none";
        document.getElementById("authContainer").style.display = "block";
      }
    } catch (error) {
      setMessage(`[FaceButton]エラーが発生しました: ${error.message}`, "show_message");
      document.getElementById("transitContainer").style.display = "none";
      document.getElementById("authContainer").style.display = "block";
    }
  };

  return (
    <button id="faceButton"
    style={{
      fontSize: "24px",
      padding: "16px 40px",
      borderRadius: "8px",
      backgroundColor: "#0c08f1e8",
      color: "white",
      border: "none",
      cursor: "pointer",
      transition: "transform 0.2s ease, background-color 0.3s ease",
    }}
    onClick={handleFace}>
      顔認証
    </button>
  );
};

export default FaceButton;
