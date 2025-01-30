import React, { useState } from "react";
import { setMessage } from "../utils"; // Adjust the path to utils.js
import { useGlobalContext } from "../GlobalContext"; // Adjust the path to your GlobalContext
import { checkValueInQrstrList } from '../UtilitiesFunctions/checkValueInQrstrList';
import useSetBalance from '../useSetBalance'; // Correct the import path

const QrButton = () => {
  const { prefix, startTimer,extractValue } = useGlobalContext(); // Access the global context as needed
  const setBalance = useSetBalance(); // Ensure it's a function

  const handleQr = async () => {
    console.log("[QR Auth. Button]:「QR認証」ボタンがクリックされました。");
    //setIsButtonDisabled(true); // Disable the button while processing

    try {
      let userID = "";
      let extractedUserID = "";
      // Show transitContainer and hide authContainer
      document.getElementById("authContainer").style.display = "none";
      document.getElementById("transitContainer").style.display = "block";

      // Simulate getting QR code data
      const qrString = await window.QRInterface.get_QRInfo();
      console.log("[QR Auth. Button]:QR Code Data:", qrString);
      setMessage(" ");
      if (qrString !== "Scanner stopped") 
        {
          const extractedRawUserID = extractValue(qrString);
          console.log("[QR Auth. Button]:extractedUserID value is:", extractedRawUserID);
          if (extractedRawUserID.value !== null)
            {
              console.log("[QR Auth. Button]: Extracted Value:", extractedRawUserID.value);
              console.log("[QR Auth. Button]: Pattern Matched  Value:", extractedRawUserID.patternMatched);
              if (extractedRawUserID.patternMatched === "pattern1")    // ,09000000154,,000184,0,20/04/23
              {
                console.log("[QR Auth. Button]:pattern1-based block has been executed.");
                extractedUserID = extractedRawUserID.value;
                userID = `${prefix}${extractedUserID}`;
                console.log("[QR Auth. Button]: The value of userID [pattern1]:", userID);
              }
              else if (extractedRawUserID.patternMatched === "pattern2")  //USER::maen.alaraj
              {
                console.log("[Register Face Button]:pattern2-based block has been executed.");
                extractedUserID = await window.CCWalletInterface.GetgckID(extractedRawUserID.value);
                console.log("[Register Face Button]: The value of extractedUserID:", extractedUserID);
                userID = extractedUserID
                extractedUserID = userID.replace(prefix, ""); // Removes the prefix from the string
                console.log("[Register Face Button]: The value of userID [pattern2]:", userID);
                console.log("[Register Face Button]: The value of modified extractedUserID [pattern2]:", extractedUserID);
              }


              setMessage(`GCユーザー: ${userID}`, "user");

              // Transition to the main container
              document.getElementById("transitContainer").style.display = "none";
              document.getElementById("mainContainer").style.display = "block";
              
              setBalance(extractedUserID);
              startTimer();
            }else
            {
              console.log("[QR Auth. Button]:Invalid QR Code.");
              setMessage("QRコードの読取りに失敗しました。GC MALL発行のQRコードをかざしてください。","show_message");
    
              // Transition back to the auth container
              document.getElementById("transitContainer").style.display = "none";
              document.getElementById("authContainer").style.display = "block";
            }
        }





























      /*if (qrString !== "Scanner stopped") {
        const match = qrString.match(/,(.*?),/);
        const extractedUserID = match ? match[1] : null;

        if (extractedUserID !== null && checkValueInQrstrList(extractedUserID)) {
          console.log("[QR Auth. Button]:Valid QR Code UserID:", extractedUserID);
          const userID = `${prefix}${extractedUserID}`;
          setMessage(`GCユーザー: ${userID}`, "user");

          // Transition to the main container
          document.getElementById("transitContainer").style.display = "none";
          document.getElementById("mainContainer").style.display = "block";

          setBalance(extractedUserID);

          startTimer();
        
        } else {
          console.log("[QR Auth. Button]:Invalid QR Code.");
          setMessage("QRコードの読取りに失敗しました。GC MALL発行のQRコードをかざしてください。","show_message");

          // Transition back to the auth container
          document.getElementById("transitContainer").style.display = "none";
          document.getElementById("authContainer").style.display = "block";
        }
      }*/ 
      else {
        console.log("[QR Auth. Button]:Scanner was stopped.");
        setMessage("QRコードスキャナーが停止しました。", "show_message");

        // Transition back to the auth container
        document.getElementById("transitContainer").style.display = "none";
        document.getElementById("authContainer").style.display = "block";
      }
    } catch (error) {
      console.error("[QR Auth. Button]:Error processing QR code:", error.message);
      setMessage(`[QR Auth. Button]エラーが発生しました: ${error.message}`, "show_message");

      // Transition back to the auth container
      document.getElementById("transitContainer").style.display = "none";
      document.getElementById("authContainer").style.display = "block";
    } 
  };

  return (
    <button id="qrButton"
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
     onClick={handleQr}>
      QR認証
    </button>
  );
};

export default QrButton;
