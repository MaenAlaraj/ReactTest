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
   // const info = await window.CCWalletInterface.GetIniTMS();
    //var info = await window.CCWalletInterface.DelFacesWithErrHandling(sbuser,"9392909000000154"); //アララジ    
    //console.log("[Delete Button]:Responce of CCWalletInterface.DelFacesWithErrHandling:", info);

    
    //var info = await window.CCWalletInterface.DelFacesWithErrHandling(sbuser,"9392909000990001"); //Event 1    
    //console.log("[Delete Button]:Responce of CCWalletInterface.DelFacesWithErrHandling:", info);

    //var info = await window.CCWalletInterface.DelFacesWithErrHandling(sbuser,"9392909000990002"); //Event 2    
    //console.log("[Delete Button]:Responce of CCWalletInterface.DelFacesWithErrHandling:", info);


    //var info = await window.CCWalletInterface.DelFacesWithErrHandling(sbuser,"9392909000990006"); //Event 6    
    //console.log("[Delete Button]:Responce of CCWalletInterface.DelFacesWithErrHandling:", info);


    // Show the transitContainer and hide authContainer
    document.getElementById("authContainer").style.display = "none";
    document.getElementById("transitContainer").style.display = "block";

    try {
      const resultJsonString = await window.FaceCaptureInterface.getFace();
      console.log("[FaceButton]: Face data received:", resultJsonString);

      if (!resultJsonString) {
        setMessage("顔が検出されませんでした。もう一度試してください。", "showDialog");
        document.getElementById("transitContainer").style.display = "none";
        document.getElementById("authContainer").style.display = "block";
        return;
      }

      const resultJsonObject = JSON.parse(resultJsonString);
      const facesArray = resultJsonObject.Faces;
      const numberOfFaces = facesArray.length;

      if (numberOfFaces === 0) {
        setMessage("顔を認証できませんでした。もう一度試してください。", "showDialog");
        document.getElementById('authContainer').style.display = 'block';
        document.getElementById('transitContainer').style.display = 'none';
      } else if (numberOfFaces === 1) {
        console.log("[FaceButton]:Captured Nr. of Faces:", numberOfFaces);
        const base64String = facesArray[0].image64;

        console.log("[FaceButton]:sbuser value is:", sbuser);
        console.log("[FaceButton]:gckid value is:", gckid);
        console.log("[FaceButton]:base64String value is:", base64String);

        // Log the start time
        const startTime = performance.now();
        const info = await window.CCWalletInterface.SearchFaces(sbuser, gckid, base64String);
        //const info = await window.CCWalletInterface.SearchFacesWithErrHandling(sbuser, gckid, base64String);


        // Log the end time and calculate duration
        const endTime = performance.now();
        const duration1 = endTime - startTime;
        console.log(`[FaceButton]: SearchFaces execution time: ${duration1.toFixed(2)} milliseconds`);


        console.log("[FaceButton]: SearchFaces info:", info);
        const match = info.match(/結果：\s*(\d+)/);
        const extractedNumber = match[1];
        console.log("[FaceButton]: Extracted number=", extractedNumber); // Outputs: 09000000154

        //ヘッダー
        const header = window.CCWalletInterface.getHeader();

        //千葉通貨
        let currencyID = window.CCWalletInterface.getCurrencyId();
        
        //GC企画
        const sbUser = window.CCWalletInterface.getSBUser();

        const key = `${header}:${currencyID}.${sbUser}.${extractedNumber}`;

        console.log("Key:", key);


        startTime = performance.now();
        let  strRet = window.CCWalletInterface.CodeTblMnt(key,"","S")
         endTime = performance.now();
        const duration2 = endTime - startTime;

        console.log(`[FaceButton]: CodeTblMnt execution time: ${duration2.toFixed(2)} milliseconds`);
        
        // Total execution time
        const totalDuration = duration1 + duration2;
        console.log(`Total Execution Time: ${totalDuration.toFixed(2)} ms`);


        console.log("Return Value of CodeTblMnt is :", strRet);

        if (info.includes(errorsSubstring)) {
          setMessage("顔認証に失敗しました。「顔認証登録」ボタンから顔を登録してください。", "showDialog");
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
        setMessage("複数の顔が検出されました。もう一度試してください。", "showDialog");
        document.getElementById("transitContainer").style.display = "none";
        document.getElementById("authContainer").style.display = "block";
      }
    } catch (error) {
      setMessage(`[FaceButton]エラーが発生しました: ${error.message}`, "showDialog");
      document.getElementById("transitContainer").style.display = "none";
      document.getElementById("authContainer").style.display = "block";
    }
  };

  return (
    <button id="faceButton"
    style={{
      fontSize: "28px",
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
