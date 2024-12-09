import React, { useState } from "react";
import { useGlobalContext } from "../GlobalContext";

const LoadProductButton = () => {
  const { items, setItems, total, setTotal, balanceMessage, setMessage } =
    useGlobalContext();
  const [message, setLocalMessage] = useState("");

  const isPositiveInteger = (value) => /^[1-9]\d*$/.test(value);

  const handleLoadProduct = async () => {
    console.log("Starting product load...");

    let extractedBalance = null;
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
      if (qrstr_list.length === 6) {
        if (!isPositiveInteger(qrstr_list[2])) {
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

          if (total + item.price <= extractedBalance) {
            setItems((prevItems) => [...prevItems, item]);
            setTotal(total + item.price);
            setMessage("");
          } else {
            setMessage("残高が足りません。");
          }
        }
      } else {
        setMessage("商品QRではないものが読み込まれました。");
      }
    }
  };

  const removeItem = (index, price) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
    setTotal(total - price);
  };

  return (
    <div>
      <button onClick={handleLoadProduct}>商品読み込み</button>
      <div id="totalAmount">トータル: {total} pt</div>

      <div className="scroll-container">
        <ul id="productList">
          {/* Header row */}
          <li className="header-item">
            <span>コード</span>
            <span>商品名</span>
            <span>ポイント</span>
            <span>CAT.</span>
            <span>日付</span>
            <span>削除</span>
          </li>

          {/* Render each product */}
          {items.map((item, index) => (
            <li key={index} className="product-item">
              <span>{item.seller}</span> {/* Code */}
              <span>{item.product}</span> {/* Product Name */}
              <span>{item.price} pt</span> {/* Points */}
              <span>{item.category}</span> {/* Category */}
              <span>{item.date}</span> {/* Date */}
              <div
                className="remove-item"
                onClick={() => removeItem(index, item.price)}
              >
                ❌
              </div>
            </li>
          ))}
        </ul>
      </div>

      {message && <div className="show_message">{message}</div>}
    </div>
  );
};

export default LoadProductButton;
