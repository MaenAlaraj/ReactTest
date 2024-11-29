import React, { useState } from "react";
import { setMessage } from "../utils"; // Adjust the path to where `utils.js` is located
import { useGlobalContext } from "../GlobalContext"; // Adjust the path to your GlobalContext
import { checkValueInQrstrList } from '../UtilitiesFunctions/checkValueInQrstrList';



const RegisterFaceButton = () => {
  const { errorsSubstring, sbuser, prefix } = useGlobalContext(); // Access necessary variables
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleRegisterFace = async () => {
    console.log("[REACT Console]:「顔認証登録」ボタンがクリックされました。");
    try {
      // Call the method exposed by your Android WebView
      const resultJsonString = await window.FaceCaptureInterface.getCapturedFace();
      console.log("[REACT Console]:Captured Face Data:", resultJsonString);

      if (!resultJsonString) {
        document.getElementById("authContainer").style.display = "block";
        document.getElementById("transitContainer").style.display = "none";
      } else {
        const resultJsonObject = JSON.parse(resultJsonString);
        const facesArray = resultJsonObject.Faces;
        const numberOfFaces = facesArray.length;

        if (numberOfFaces === 0) {
          console.log("[REACT Console]:Captured Nr. of Faces:", numberOfFaces);
          setMessage("顔を認証できませんでした。もう一度やり直してください。");
        } else if (numberOfFaces === 1) {
          console.log("[REACT Console]:Captured Nr. of Faces:", numberOfFaces);
          //document.getElementById("authContainer").style.display = "none";
          //document.getElementById("transitContainer").style.display = "block";

          let base64String = facesArray[0].image64;
          setMessage("顔が正常にキャプチャされました。", "show_message");
          console.log("[REACT Console]:Captured Face Base64 String:", base64String);

          let qrString = await window.QRInterface.get_QRInfo();
          console.log("[REACT Console]:qrString value is:", qrString);

          if (qrString !== "Scanner stopped") {
            const match = qrString.match(/,(.*?),/);
            const extractedUserID = match ? match[1] : null;

            if (extractedUserID !== null && checkValueInQrstrList(extractedUserID)) {
              console.log("[REACT Console]:Condition satisfied");
              let userID = `${prefix}${extractedUserID}`;
              let addFaceInfo = await window.CCWalletInterface.AddFaces(sbuser, userID, base64String);

              if (addFaceInfo.includes(errorsSubstring)) {
                setMessage("既に登録済みのユーザーのため、登録できませんでした。");
              } else {
                setMessage("顔が登録されました。");
                setIsButtonDisabled(false); // Disable the button here
              }
            } else {
              setMessage("QRコードの読取りに失敗しました。GC MALL発行のQRコードをかざしてください。");
              document.getElementById("transitContainer").style.display = "none";
              document.getElementById("authContainer").style.display = "block";
            }
          } else {
            document.getElementById("transitContainer").style.display = "none";
            document.getElementById("authContainer").style.display = "block";
          }
        } else if (numberOfFaces > 1) {
          console.log("[REACT Console]:Captured Nr. of Faces:", numberOfFaces);
          setMessage("複数の顔が検出されたため、顔を認証できませんでした。もう一度やり直してください。", "show_message");
          document.getElementById("transitContainer").style.display = "none";
          document.getElementById("authContainer").style.display = "block";
        }
      }
    } catch (error) {
      setMessage(`エラーが発生しました: ${error.message}`, "show_message");
    }
  };

  return (
    <div>
      <button id="registerFaceButton" onClick={handleRegisterFace} disabled={isButtonDisabled}>
        顔認証登録
      </button>
      <div id="message"></div>
    </div>
  );
};

export default RegisterFaceButton;
