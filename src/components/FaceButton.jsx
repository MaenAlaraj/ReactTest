import React from "react";
import { setMessage } from "../utils";
import { useGlobalContext } from "../GlobalContext";
import { useSetBalance } from "../useSetBalance";

const FaceButton = () => {
  const { errorsSubstring, sbuser, gckid } = useGlobalContext();
  const { balanceMessage, setBalance } = useSetBalance();

  const handleFace = async () => {
    console.log("[REACT Console]:「顔認証」ボタンがクリックされました。");

    document.getElementById("authContainer").style.display = "none";
    document.getElementById("transitContainer").style.display = "block";

    try {
      const resultJsonString = await window.FaceCaptureInterface.getFace();

      if (!resultJsonString) {
        setMessage("顔が検出されませんでした。もう一度試してください。", "show_message");
        document.getElementById("transitContainer").style.display = "none";
        document.getElementById("authContainer").style.display = "block";
        return;
      }

      const resultJsonObject = JSON.parse(resultJsonString);
      const facesArray = resultJsonObject.Faces;

      if (facesArray.length === 1) {
        const base64String = facesArray[0].image64;
        const info = await window.CCWalletInterface.SearchFaces(sbuser, gckid, base64String);

        if (info.includes(errorsSubstring)) {
          setMessage(
            "顔認証に失敗しました。「顔認証登録」ボタンから顔を登録してください。",
            "show_message"
          );
          document.getElementById("transitContainer").style.display = "none";
          document.getElementById("authContainer").style.display = "block";
        } else {
          const CCW_FaceResponse_LIST = info.split("：");
          const userID = CCW_FaceResponse_LIST[1].trim();
          setMessage(`GCユーザー: ${userID}`, "user");

          // Set the balance
          setBalance(userID);

          // Transition to mainContainer
          document.getElementById("transitContainer").style.display = "none";
          document.getElementById("mainContainer").style.display = "block";

          // Update the message element in mainContainer
          const messageElement = document.getElementById("message");
          if (messageElement) {
            messageElement.innerHTML = balanceMessage;
            console.log("[REACT Console]: Updated message:", balanceMessage);
          }
        }
      } else {
        setMessage(
          "複数の顔が検出されました。もう一度試してください。",
          "show_message"
        );
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
