import React, { useState } from "react";
import { setMessage } from "../utils"; // Adjust the path to utils.js
import { useGlobalContext } from "../GlobalContext"; // Adjust the path to your GlobalContext
import { checkValueInQrstrList } from '../UtilitiesFunctions/checkValueInQrstrList';

const QrButton = () => {
  const { prefix } = useGlobalContext(); // Access the global context as needed
  //const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleQr = async () => {
    console.log("[QR Auth. Button]:「QR認証」ボタンがクリックされました。");
    //setIsButtonDisabled(true); // Disable the button while processing

    try {
      // Show transitContainer and hide authContainer
      document.getElementById("authContainer").style.display = "none";
      document.getElementById("transitContainer").style.display = "block";

      // Simulate getting QR code data
      const qrString = await window.QRInterface.get_QRInfo();
      console.log("[QR Auth. Button]:QR Code Data:", qrString);
      setMessage(" ");

      if (qrString !== "Scanner stopped") {
        const match = qrString.match(/,(.*?),/);
        const extractedUserID = match ? match[1] : null;

        if (extractedUserID !== null && checkValueInQrstrList(extractedUserID)) {
          console.log("[REACT Console]:Valid QR Code UserID:", extractedUserID);
          const userID = `${prefix}${extractedUserID}`;
          //setMessage(`GCユーザー: ${userID}`, "user");

          // Transition to the main container
          document.getElementById("transitContainer").style.display = "none";
          document.getElementById("mainContainer").style.display = "block";
        } else {
          console.log("[QR Auth. Button]:Invalid QR Code.");
          setMessage(
            "QRコードの読取りに失敗しました。GC MALL発行のQRコードをかざしてください。","show_message"
          );

          // Transition back to the auth container
          document.getElementById("transitContainer").style.display = "none";
          document.getElementById("authContainer").style.display = "block";
        }
      } else {
        console.log("[QR Auth. Button]:Scanner was stopped.");
        setMessage("QRコードスキャナーが停止しました。", "show_message");

        // Transition back to the auth container
        document.getElementById("transitContainer").style.display = "none";
        document.getElementById("authContainer").style.display = "block";
      }
    } catch (error) {
      console.error("[QR Auth. Button]:Error processing QR code:", error.message);
      setMessage(`エラーが発生しました: ${error.message}`, "show_message");

      // Transition back to the auth container
      document.getElementById("transitContainer").style.display = "none";
      document.getElementById("authContainer").style.display = "block";
    } 
  };

  return (
    <button id="qrButton" onClick={handleQr}>
      QR認証
    </button>
  );
};

export default QrButton;
