import React, { useState } from "react";
import { setMessage } from "../utils"; // Adjust the path to where `utils.js` is located
import { useGlobalContext } from "../GlobalContext"; // Adjust the path to your GlobalContext
import "../App.css"; // Or the appropriate path to your CSS file



const RegisterFaceButton = () => {
  const { errorsSubstring, sbuser, prefix,  extractValue, } = useGlobalContext(); // Access necessary variables

  const handleRegisterFace = async () => {
    console.log("[Register Face Button]:「顔認証登録」ボタンがクリックされました。");
    try {
      let userID = "";
      let extractedUserID = "";
      const resultJsonString = await window.FaceCaptureInterface.getCapturedFace();
      console.log("[Register Face Button]:Captured Face Data:", resultJsonString);
      setMessage(" ");
      

      if (!resultJsonString) {
        console.log("[Register Face Button]:「停止」button has been pressed");
      } else {
        const resultJsonObject = JSON.parse(resultJsonString);
        const facesArray = resultJsonObject.Faces;
        const numberOfFaces = facesArray.length;

        if (numberOfFaces === 0) {     
          console.log("[Register Face Button]:Captured Nr. of Faces:", numberOfFaces);
          setMessage("顔を認証できませんでした。もう一度試してください。", "showDialog");
          document.getElementById('authContainer').style.display = 'block';
          document.getElementById('transitContainer').style.display = 'none';
        } else if (numberOfFaces === 1) {
          console.log("[Register Face Button]:Captured Nr. of Faces:", numberOfFaces);
          document.getElementById("authContainer").style.display = "none";
          document.getElementById("transitContainer").style.display = "block";

          let base64String = facesArray[0].image64;
          console.log("[Register Face Button]:Captured Face Base64 String:", base64String);

          let qrString = await window.QRInterface.get_QRInfo();
          console.log("[Register Face Button]:qrString value is:", qrString);

          if (qrString !== "Scanner stopped") 
            {
              const extractedRawUserID = extractValue(qrString);
              console.log("[Register Face Button]:extractedUserID value is:", extractedRawUserID);
              // Return  { value: "09000000154", patternMatched: "pattern1" } OR { value: "maen.alaraj", patternMatched: "pattern2" }
              if (extractedRawUserID.value !== null)
                {
                  console.log("[Register Face Button]: Extracted Value:", extractedRawUserID.value);
                  console.log("[Register Face Button]: Pattern Matched  Value:", extractedRawUserID.patternMatched);
                  if (extractedRawUserID.patternMatched === "pattern1")
                    {
                      console.log("[Register Face Button]:pattern1-based block has been executed.");
                      extractedUserID = extractedRawUserID.value;
                      userID = `${prefix}${extractedUserID}`;
                      console.log("[Register Face Button]: The value of userID [pattern1]:", userID);
                      //let addFaceInfo = await window.CCWalletInterface.AddFaces(sbuser, userID, base64String);
                      let addFaceInfo = await window.CCWalletInterface.AddFacesWithErrHandling(sbuser, userID, base64String);
                      console.log("[Register Face Button]:addFaceInfo value is:", addFaceInfo);
                      if (addFaceInfo.includes(errorsSubstring)) 
                        {
                          setMessage("既に登録済みのユーザーのため、登録できませんでした。", "showDialog");
                          document.getElementById('transitContainer').style.display = 'none';
                          document.getElementById('authContainer').style.display = 'block';
                        } 
                        else
                        {
                          setMessage("顔が登録されました。", "showDialog");
                          document.getElementById("transitContainer").style.display = "none";
                          document.getElementById("authContainer").style.display = "block";
                        }
                   }
                      else if (extractedRawUserID.patternMatched === "pattern2")
                        {
                          console.log("[Register Face Button]:pattern2-based block has been executed.");
                          //extractedUserID = await window.CCWalletInterface.GetgckID(extractedRawUserID.value);
                          extractedUserID = await window.CCWalletInterface.GetgckIDWithErrHandling(extractedRawUserID.value);

                          console.log("[Register Face Button]: The value of extractedUserID:", extractedUserID);
                          userID = extractedUserID
                          console.log("[Register Face Button]: The value of userID [pattern2]:", userID);
                          //let addFaceInfo = await window.CCWalletInterface.AddFaces(sbuser, userID, base64String);
                          let addFaceInfo = await window.CCWalletInterface.AddFacesWithErrHandling(sbuser, userID, base64String);

                          console.log("[Register Face Button]:addFaceInfo value is:", addFaceInfo);
                          if (addFaceInfo.includes(errorsSubstring)) 
                            {
                              setMessage("既に登録済みのユーザーのため、登録できませんでした。", "showDialog");
                              document.getElementById('transitContainer').style.display = 'none';
                              document.getElementById('authContainer').style.display = 'block';
                            } 
                             else
                             {
                              setMessage("顔が登録されました。", "showDialog");
                              document.getElementById("transitContainer").style.display = "none";
                              document.getElementById("authContainer").style.display = "block";
                            }
                        }
                      else
                       {
                          console.log("[Register Face Button]:Invalid QR Code. Not [pattern1] neither [pattern2]");
                          setMessage("QRコードの読取りに失敗しました。GC MALL発行のQRコードをかざしてください。", "showDialog");
                          document.getElementById("transitContainer").style.display = "none";
                          document.getElementById("authContainer").style.display = "block";
                       }
                  }
              else
                {
                  console.log("[Register Face Button]:Invalid QR Code.");
                  setMessage("QRコードの読取りに失敗しました。GC MALL発行のQRコードをかざしてください。", "showDialog");
                  document.getElementById("transitContainer").style.display = "none";
                  document.getElementById("authContainer").style.display = "block";
                }
            }
            else 
              {
                console.log("[Register Face Button]:Scanner was stopped.");
                setMessage("QRコードスキャナーが停止しました。", "showDialog");
                document.getElementById("transitContainer").style.display = "none";
                document.getElementById("authContainer").style.display = "block";
              }
        } else if (numberOfFaces > 1) {
          console.log("[Register Face Button]:Captured Nr. of Faces:", numberOfFaces);
          setMessage("複数の顔が検出されたため、顔を認証できませんでした。もう一度やり直してください。", "showDialog");
          document.getElementById("transitContainer").style.display = "none";
          document.getElementById("authContainer").style.display = "block";
        }
      }
    } catch (error) {
      setMessage(`[Register Face Button]エラーが発生しました: ${error.message}`, "showDialog");
      document.getElementById('transitContainer').style.display = 'none';
      document.getElementById('authContainer').style.display = 'block';
    }
  };

  return (
    <div>
      <button
        id="registerFaceButton"
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
        onClick={handleRegisterFace}
      >
        顔認証登録
      </button>
      <div id="message"></div>
    </div>
  );
  
};




export default RegisterFaceButton;
