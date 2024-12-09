import React from "react";
import { useGlobalContext } from "../GlobalContext";

const LoadProductButton = ({ productList, setProductList, totalAmount, setTotalAmount }) => {
  const { balanceMessage, setMessage } = useGlobalContext();

  const isPositiveInteger = (value) => /^[1-9]\d*$/.test(value);

  const handleLoadProduct = async () => {
    console.log("Starting product load...");

    const match = balanceMessage.match(/pt残高:(\d+)pt/);
    const extractedBalance = match ? parseInt(match[1], 10) : null;

    console.log("Extracted Balance:", extractedBalance);

    const qrstring = await window.QRInterface.get_QRInfo();
    console.log("QR Code string received:", qrstring);

    if (qrstring !== "Scanner stopped") {
      const qrstr_list = qrstring.split(",");
      console.log("Parsed QR Code list:", qrstr_list);

      if (qrstr_list.length === 6) {
        if (!isPositiveInteger(qrstr_list[2])) {
          console.log("Invalid QR Code detected, not a positive integer.");
          setMessage("商品QRではないものが読み込まれました。");
        } else {
          const item = {
            index: productList.length,
            seller: qrstr_list[0],
            product: qrstr_list[1],
            price: parseInt(qrstr_list[2]),
            category: qrstr_list[3],
            date: qrstr_list[4],
          };

          if (totalAmount + item.price <= extractedBalance) {
            setProductList((prevItems) => [...prevItems, item]);
            setTotalAmount((prevTotal) => prevTotal + item.price);
            console.log("Product successfully added.");
          } else {
            console.log("Insufficient balance.");
            setMessage("残高が足りません。");
          }
        }
      } else {
        console.log("Invalid QR Code format.");
        setMessage("商品QRではないものが読み込まれました。");
      }
    }
  };

  return (
      <button id="loadProduct" onClick={handleLoadProduct}>
      商品のNNNNNNNN読み込み
      </button>
  );
};

export default LoadProductButton;
