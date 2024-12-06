import React, { useState, useContext } from 'react';
import { useGlobalContext } from '../GlobalContext'; // Import the context

const LoadProductButton = ({ onAddProduct }) => {
  // Access the global context values
  const {
    items,
    setItems,
    total,
    setTotal,
    Balance,
    balanceMessage,
    setBalance,
    setMessage, // Assuming setMessage is also part of the context
  } = useGlobalContext();

  const [message, setLocalMessage] = useState('');
  const isPositiveInteger = (value) => /^[1-9]\d*$/.test(value);

  const handleLoadProduct = async () => {
    console.log("Starting product load...");
  
    let extractedBalance = null;
    console.log("Balance message:", balanceMessage);
  
    const match = balanceMessage.match(/pt残高:(\d+)pt/);
    if (match && match[1]) {
      extractedBalance = parseInt(match[1], 10);
      console.log("Extracted Balance:", extractedBalance);
    } else {
      console.log("Failed to extract balance from message.");
    }
  
    try {
      const qrstring = await window.QRInterface.get_QRInfo();
      console.log("QR Code string received:", qrstring);
  
      if (qrstring !== "Scanner stopped") {
        const qrstr_list = qrstring.split(",");
        console.log("Parsed QR Code list:", qrstr_list);
  
        if (qrstr_list.length === 6 && isPositiveInteger(qrstr_list[2])) {
          const item = {
            index: items.length,
            seller: qrstr_list[0],
            product: qrstr_list[1],
            price: parseInt(qrstr_list[2]),
            category: qrstr_list[3],
            date: qrstr_list[4],
          };
  
          if (total + item.price <= extractedBalance) {
            console.log("Adding item:", item);
  
            setItems((prevItems) => [...prevItems, item]);
  
            setTotal((prevTotal) => {
              const newTotal = prevTotal + item.price;
              console.log("Updated total:", newTotal);
              return newTotal;
            });
  
            onAddProduct(item, total + item.price);
          } else {
            setMessage("残高が足りません。");
          }
        } else {
          setMessage("商品QRではないものが読み込まれました。");
        }
      }
    } catch (error) {
      console.error("Error loading product:", error);
      setMessage("QRコードの読み取り中にエラーが発生しました。");
    }
  };
  
  

  return (
    <div>
      <button id="loadProduct" onClick={handleLoadProduct}>
        商品読み込み
      </button>    
      {message && <div className="show_message">{message}</div>}
    </div>
  );
};

export default LoadProductButton;
