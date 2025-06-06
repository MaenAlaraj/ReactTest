import React from "react";
import { useGlobalContext } from "../GlobalContext";
import { setMessage } from '../utils'; // Adjust the relative path based on your project structure
import useSetBalance from '../useSetBalance'; // Correct the import path


const LoadProductButton = ({ productList, setProductList, totalAmount, setTotalAmount }) => {
  const { balanceMessage, disableButtonById, stopTimer, payment_terminalID, prefix, sellerNameRet, setSellerNameRet, userBeforePrefix } = useGlobalContext();

  const isPositiveInteger = (value) => /^[1-9]\d*$/.test(value);
  //const lowerLimit  = -1000;
  const setBalance = useSetBalance(); // Ensure it's a function




  const handleLoadProduct = async () => {
    console.log("[Load Product Button]: Starting product load...");
    stopTimer()
    //const match = balanceMessage.match(/pt残高:(\d+)pt/);
    //console.log("[Load Product Button] match:", match);
    //const extractedBalance = match ? parseInt(match[1], 10) : null;

    console.log("[Load Product Button] userBeforePrefix:", userBeforePrefix);
    const extractedBalance = setBalance(userBeforePrefix);
    console.log("[Load Product Button] setBalance extractedBalance:", extractedBalance);


    console.log("[Load Product Button] Extracted Balance:", extractedBalance);

    const qrstring = await window.QRInterface.get_QRInfo();
    console.log("[Load Product Button] QR Code string received:", qrstring);

    if (qrstring !== "Scanner stopped") {
      const qrstr_list = qrstring.split(",");
      console.log("[Load Product Button] Parsed QR Code list:", qrstr_list);

      if (qrstr_list.length === 6) {
        if (!isPositiveInteger(qrstr_list[2])) {
          console.log("[Load Product Button]: Invalid QR Code detected, not a positive integer.");
          setMessage("商品QRではないものが読み込まれました。","showDialog");
        } else {
          const item = {
            index: productList.length,
            seller: qrstr_list[0],
            product: qrstr_list[1],
            price: parseInt(qrstr_list[2]),
            category: qrstr_list[3],
            date: qrstr_list[4],
          };
          
          if (totalAmount + item.price < extractedBalance ) {
            setProductList((prevItems) => [...prevItems, item]);
            setTotalAmount((prevTotal) => prevTotal + item.price);
            const sellerCode = qrstr_list[0]
            console.log("[Load Product Button] Seller Code:", sellerCode);
            const sellerCodeE = `${prefix}${sellerCode}`;
            console.log("[Load Product Button] sellerCodeE:", sellerCodeE);
            console.log("[Load Product Button] payment_terminalID:", payment_terminalID);
            const sellerNm = await window.CCWalletInterface.Name(sellerCodeE, payment_terminalID);
            //const sellerNm = await window.CCWalletInterface.NameWithErrHandling(sellerCodeE, payment_terminalID);

            // Update the sellerNameRet
            setSellerNameRet(sellerNm)
            console.log("[Load Product Button] sellerNm is :", sellerNm);
            console.log("[Load Product Button] sellerNameRet is :", sellerNameRet);


            console.log("[Load Product Button]: Product successfully added.");
            disableButtonById("loadProduct");
          } else {
            setMessage("残高が足りません。","showDialog");
          }
        }
      } else {
        console.log("[Load Product Button]: Invalid Product QR Code format.");
        setMessage("商品QRではないものが読み込まれました。","showDialog");
      }
    }
  };

  return (
    <div>
      <button id="loadProduct"
      style={{
        fontSize: "22px",
        padding: "16px 40px",
        borderRadius: "8px",
        backgroundColor: "#0c08f1e8",
        color: "white",
        border: "none",
        cursor: "pointer",
        transition: "transform 0.2s ease, background-color 0.3s ease",
      }}
       onClick={handleLoadProduct}>
      商品の読み込み
      </button>
    </div>
  );
};

export default LoadProductButton;
