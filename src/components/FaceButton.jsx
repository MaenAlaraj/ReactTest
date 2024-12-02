import React from "react";
import { setMessage } from "../utils"; // Import setMessage from utils.js
import { useGlobalContext } from "../GlobalContext"; // Adjust the path to your GlobalContext
import { checkValueInQrstrList } from '../UtilitiesFunctions/checkValueInQrstrList';
import { setBalance } from "../UtilitiesFunctions/setBalance";



const FaceButton = () => {
  const { errorsSubstring, sbuser, gckid } = useGlobalContext(); // Access necessary variables

  const handleFace = async () => {
    console.log("[REACT Console]:「顔認証」ボタンがクリックされました。");

    //var info = await window.CCWalletInterface.DelFaces(sbuser,"9392909000000154"); //アララジ 
    //await window.ToastInterface.showToast(info);

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
        document.getElementById('authContainer').style.display = 'block';
        document.getElementById('transitContainer').style.display = 'none';
      } else if (numberOfFaces === 1) {
        console.log("[REACT Console]:Captured Nr. of Faces:", numberOfFaces);
        const base64String = facesArray[0].image64;


        console.log("[REACT Console]:sbuser value is:", sbuser);
        console.log("[REACT Console]:gckid value is:", gckid);
        console.log("[REACT Console]:base64String value is:", base64String);
        // Simulate SearchFaces operation
        const info = await window.CCWalletInterface.SearchFaces(sbuser, gckid, base64String);
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


          setBalance(userID); // Call the imported function


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
