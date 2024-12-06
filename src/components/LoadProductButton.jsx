// src/components/LoadProductButton.jsx
import React, { useState, useContext } from 'react';
import { useGlobalContext } from '../GlobalContext'; // Import the context

const LoadProductButton = ({ setProductList, setTotalAmount }) => {
  const { items, setItems, total, setTotal, balanceMessage, setMessage } = useGlobalContext();
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
            index: items.length,
            seller: qrstr_list[0],
            product: qrstr_list[1],
            price: parseInt(qrstr_list[2]),
            category: qrstr_list[3],
            date: qrstr_list[4],
          };
          console.log("Item object created:", item);

          const price = item.price;
          console.log("Current total:", total, "Price of new item:", price, "Balance:", extractedBalance);

          if (total + price < extractedBalance) {
            setItems((prevItems) => {
              const newItems = [...prevItems, item];
              setProductList(newItems);  // Update product list in App.js
              return newItems;
            });

            setTotal((prevTotal) => {
              const newTotal = prevTotal + price;
              setTotalAmount(newTotal);  // Update total amount in App.js
              return newTotal;
            });

            console.log("Product added to list.");
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

  const removeItem = (item, price) => {
    console.log("Removing item:", item);

    setItems((prevItems) => {
      const updatedItems = prevItems.filter((i) => i.index !== item.index);
      setProductList(updatedItems);  // Update product list after removal
      return updatedItems;
    });

    setTotal((prevTotal) => {
      const newTotal = prevTotal - price;
      setTotalAmount(newTotal);  // Update total amount after removal
      return newTotal;
    });
  };

  return (
    <div>
      <button id="loadProduct" onClick={handleLoadProduct}>
        商品読み込み
      </button>
      <div>{message && <div className="show_message">{message}</div>}</div>
    </div>
  );
};

export default LoadProductButton;
