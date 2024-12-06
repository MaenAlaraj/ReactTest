import React, { useState, useContext } from 'react';
import { useGlobalContext } from '../GlobalContext'; // Import the context

const LoadProductButton = () => {
  // Access the global context values
  const {
    items,
    setItems,
    total,
    setTotal,
    Balance,
    setBalance,
    setMessage, // Assuming setMessage is also part of the context
  } = useGlobalContext();

  const [message, setLocalMessage] = useState('');

  const isPositiveInteger = (value) => /^[1-9]\d*$/.test(value);

  const handleLoadProduct = async () => {
    console.log("Starting product load...");
  
    // Extract balance from <p id="message">
    const messageElement = document.getElementById('message');
    if (messageElement) {
      const balanceMessage = messageElement.textContent;
      console.log("Balance message:", balanceMessage);
  
      // Regular expression to extract the value of ○○
      const match = balanceMessage.match(/pt残高:(\d+)pt/);
      if (match && match[1]) {
        const extractedBalance = parseInt(match[1], 10);
        console.log("Extracted Balance:", extractedBalance);
        Balance = extractedBalance; // Update the context variable Balance
      } else {
        console.log("Failed to extract balance from message.");
      }
    } else {
      console.log("Message element not found.");
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
          console.log("Current total:", total, "Price of new item:", price, "Balance:", Balance);
  
          if (total + price < Balance) {
            setItems((prevItems) => {
              const newItems = [...prevItems, item];
              console.log("Items updated:", newItems);
              return newItems;
            });
  
            setTotal((prevTotal) => {
              const newTotal = prevTotal + price;
              console.log("Total updated:", newTotal);
              return newTotal;
            });
  
            document.getElementById('totalAmount').innerText = `トータル: ${total + price} pt`;
  
            const listItem = (
              <li key={item.index}>
                <span>{item.seller}</span>
                <span>{item.product}</span>
                <span>{item.price} pt</span>
                <span>{item.category}</span>
                <span>{item.date}</span>
                <div
                  className="remove-item"
                  onClick={() => removeItem(item, price)}
                >
                  ❌
                </div>
              </li>
            );
  
            const list = document.getElementById('productList');
            list.appendChild(listItem);
            document.getElementById('loadProduct').disabled = true;
            console.log("Product added to list and button disabled.");
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
      console.log("Items after removal:", updatedItems);
      return updatedItems;
    });

    setTotal((prevTotal) => {
      const newTotal = prevTotal - price;
      console.log("Total after removal:", newTotal);
      return newTotal;
    });

    document.getElementById('totalAmount').innerText = `トータル: ${total - price} pt`;
    document.getElementById('loadProduct').disabled = false;
    console.log("Product removed and button re-enabled.");
  };

  return (
    <div>
      <button id="loadProduct" onClick={handleLoadProduct}>
        商品読み込み
      </button>
      <div id="totalAmount">トータル: {total} pt</div>
      <ul id="productList">
        {items.map((item) => (
          <li key={item.index}>
            <span>{item.seller}</span>
            <span>{item.product}</span>
            <span>{item.price} pt</span>
            <span>{item.category}</span>
            <span>{item.date}</span>
            <div
              className="remove-item"
              onClick={() => removeItem(item, item.price)}
            >
              ❌
            </div>
          </li>
        ))}
      </ul>
      {message && <div className="show_message">{message}</div>}
    </div>
  );
};

export default LoadProductButton;
