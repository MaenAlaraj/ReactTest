// src/App.js

import React, { useState } from "react";
import './style.css';
import './App.css'; // Import the CSS file here
import { useGlobalContext } from "./GlobalContext";

import RegisterFaceButton from './components/RegisterFaceButton';
import FaceButton from './components/FaceButton';
import QRButton from './components/QrButton';
import LoadProductButton  from './components/LoadProductButton';
import Payment from './components/PaymentButton';
import LogoutButton from './components/LogoutButton';
import WiFiStatus from './components/WiFiStatus';



const App = () => {
  const { balanceMessage } = useGlobalContext();
  const [showLoadProductButton, setShowLoadProductButton] = useState(false);
  const [productList, setProductList] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  return (
    <div className="App">
      {/* Authentication Container */}
      <div className="auth-container" id="authContainer">
        <p>GC Mall</p>
        <p>顔またはGCのQRを読み込ませてください</p>
        <div className="button-container">
          <FaceButton />
          <QRButton />
        </div>
        <div id="bottomLeftText">
          <span className="text-content"></span>
        </div>
        <RegisterFaceButton />
      </div>

      {/* Transit Container */}
      <div className="auth-container" id="transitContainer" style={{ display: "none" }}>
        <p>処理中...</p>
      </div>







      {/* Main Content After Successful Authentication */}
      <div id="mainContainer" style={{ display: "none" }}>
        <div id="user-container">
          <p id="user"></p> {/* User information */}
          <div className="user-details-container">
            <WiFiStatus /> {/* WiFi status aligned with user */}
            <LogoutButton id="logoutButton" /> {/* Logout button below WiFi status */}
          </div>
        </div>
        <p id="message">{balanceMessage}</p> {/* Balance message below LogoutButton */}



        
        {/* Button to show LoadProductButton */}
        {!showLoadProductButton && (
          <button id="loadProduct" onClick={() => setShowLoadProductButton(true)}>
            商品の読み込み
          </button>
        )}

        {/* Render the LoadProductButton component */}
        {showLoadProductButton && <LoadProductButton />}

        

        <div>
      <div className="scroll-container">
        <ul id="productList">
          <li className="header-item">
            <span>コード</span>
            <span>商品名</span>
            <span>ポイント</span>
            <span>CAT.</span>
            <span>日付</span>
            <span>削除</span>
          </li>
          {productList.map((item, index) => (
            <li key={index}>
              <span>{item.seller}</span>
              <span>{item.product}</span>
              <span>{item.price} pt</span>
              <span>{item.category}</span>
              <span>{item.date}</span>
              <div
                className="remove-item"
                onClick={() => {
                  // Remove item and update total
                  setProductList((prevList) => prevList.filter((_, i) => i !== index));
                  setTotalAmount((prevTotal) => prevTotal - item.price);
                }}
              >
                ❌
              </div>
            </li>
          ))}
        </ul>
      </div>
      <p id="Balance"></p>
      <div id="totalAmount">トータル: {totalAmount} pt</div>
      <LoadProductButton
        onAddProduct={(newItem, newTotal) => {
          setProductList((prevList) => [...prevList, newItem]);
          setTotalAmount(newTotal);
        }}
      />
    </div>
        <div className=".vertical">
          <Payment />
        </div>
      </div>
    </div>
  );
};

export default App;
