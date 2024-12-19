import React, { useState } from "react";
import { setMessage } from "../utils"; // Adjust the path to where `utils.js` is located
import { useGlobalContext } from "../GlobalContext"; // Adjust the path to your GlobalContext
import { checkValueInQrstrList } from '../UtilitiesFunctions/checkValueInQrstrList';



const RegisterFaceButton = () => {
  const { errorsSubstring, sbuser, prefix,  extractValue, } = useGlobalContext(); // Access necessary variables
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleRegisterFace = async () => {
    console.log("[Register Face Button]:「顔認証登録」ボタンがクリックされました。");
    try {
      // Call the method exposed by your Android WebView
      const resultJsonString = await window.FaceCaptureInterface.getCapturedFace();
      console.log("[Register Face Button]:Captured Face Data:", resultJsonString);
      setMessage(" ");
      

      if (!resultJsonString) {
        setMessage("「停止」button has been pressed.");
        console.log("[Register Face Button]:「停止」button has been pressed");
        //document.getElementById("authContainer").style.display = "block";
        //document.getElementById("transitContainer").style.display = "none";
      } else {
        const resultJsonObject = JSON.parse(resultJsonString);
        const facesArray = resultJsonObject.Faces;
        const numberOfFaces = facesArray.length;

        if (numberOfFaces === 0) {     
          console.log("[Register Face Button]:Captured Nr. of Faces:", numberOfFaces);
          setMessage("顔を認証できませんでした。もう一度試してください。", "show_message");
          document.getElementById('authContainer').style.display = 'block';
          document.getElementById('transitContainer').style.display = 'none';
        } else if (numberOfFaces === 1) {
          console.log("[Register Face Button]:Captured Nr. of Faces:", numberOfFaces);
          document.getElementById("authContainer").style.display = "none";
          document.getElementById("transitContainer").style.display = "block";

          let base64String = facesArray[0].image64;
          setMessage("顔が正常にキャプチャされました。", "show_message");
          console.log("[Register Face Button]:Captured Face Base64 String:", base64String);

          let qrString = await window.QRInterface.get_QRInfo();
          console.log("[Register Face Button]:qrString value is:", qrString);

          if (qrString !== "Scanner stopped") {
            //const match = qrString.match(/,(.*?),/);
            //const extractedUserID = match ? match[1] : null;
            const extractedRawUserID = extractValue(qrString);







            console.log("[Register Face Button]:extractedUserID value is:", extractedRawUserID);
            //if (extractedUserID !== null && checkValueInQrstrList(extractedUserID)) {
            if (extractedRawUserID !== null) {
              console.log("[Register Face Button]:Condition satisfied which is extractedUserID is NOT Null");
              const extractedUserID = await window.CCWalletInterface.GetgckID(extractedRawUserID);
              let userID = `${prefix}${extractedUserID}`;
              
              let addFaceInfo = await window.CCWalletInterface.AddFaces(sbuser, userID, base64String);
              console.log("[Register Face Button]:addFaceInfo value is:", addFaceInfo);
              if (addFaceInfo.includes(errorsSubstring)) {
                setMessage("既に登録済みのユーザーのため、登録できませんでした。");
                document.getElementById('transitContainer').style.display = 'none';
                document.getElementById('authContainer').style.display = 'block';
              } else {
                setMessage("顔が登録されました。");
                setIsButtonDisabled(true); // Disable the button here
                document.getElementById("transitContainer").style.display = "none";
                document.getElementById("authContainer").style.display = "block";
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
          console.log("[Register Face Button]:Captured Nr. of Faces:", numberOfFaces);
          setMessage("複数の顔が検出されたため、顔を認証できませんでした。もう一度やり直してください。", "show_message");
          document.getElementById("transitContainer").style.display = "none";
          document.getElementById("authContainer").style.display = "block";
        }
      }
    } catch (error) {
      setMessage(`エラーが発生しました: ${error.message}`, "show_message");
      document.getElementById('transitContainer').style.display = 'none';
      document.getElementById('authContainer').style.display = 'block';
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
