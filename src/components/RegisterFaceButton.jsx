import React from "react";
import { setMessage } from "../utils"; // Adjust the path to where `utils.js` is located
import { useGlobalContext } from "../GlobalContext"; // Adjust the path to your GlobalContext

const RegisterFaceButton = () => {
  const { errorsSubstring, sbuser, extractedUserID, prefix } = useGlobalContext(); // Access errorsSubstring and other variables

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
          let base64String = facesArray[0].image64;
          setMessage("顔が正常にキャプチャされました。", "show_message");
          console.log("Captured Face Base64 String[REACT] :", base64String);
                 
          console.log("sbuser value is [REACT] :", sbuser);
          //const info = await window.CCWalletInterface.DelFaces(sbuser, "9392909000000154"); // Use sbuser here
          //window.ToastInterface.showToast(info);

          let qrString = await window.QRInterface.get_QRInfo();
          console.log("qrString value is [REACT] :", qrString);
          if (qrString !== "Scanner stopped") {
            let qrstrList = qrString.split(",");
            console.log("qrstrList value is [REACT] :", qrstrList);
            let extractedUserID = qrstrList[1]; // Example extraction
            console.log("extractedUserID value is [REACT] :", extractedUserID);
             /*let  userID = `${prefix}${extractedUserID}`;
            console.log("userID value is [REACT] :", userID);
            /*let addFaceInfo = await window.CCWalletInterface.AddFaces(sbuser, userID, base64String);
            if (addFaceInfo.includes(errorsSubstring)) {
              setMessage("既に登録済みのユーザーのため、登録できませんでした。");
            } 
            else 
            {
              setMessage("顔が登録されました。");
            }*/
          } 
          else {
            setMessage("QRコードの読取りに失敗しました。GC MALL発行のQRコードをかざしてください。");
          }





        }
      }
    } catch (error) {
      setMessage(`エラーが発生しました: ${error.message}`, "show_message");
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
