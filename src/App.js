import React from "react";
import './style.css';
import './App.css'; // Import the CSS file here
import { useGlobalContext } from "./GlobalContext";

import RegisterFaceButton from './components/RegisterFaceButton';
import FaceButton from './components/FaceButton';
import QRButton from './components/QrButton';
import LoadProduct from './components/LoadProductButton';
import Payment from './components/PaymentButton';
import LogoutButton from './components/LogoutButton';
import WiFiStatus from './components/WiFiStatus';

const App = () => {
  const { balanceMessage } = useGlobalContext();
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
          <div className="user-details-row">
            <p id="user"></p>
            <WiFiStatus /> {/* Align WiFiStatus to the right, next to the user */}
          </div>
          <LogoutButton id="logoutButton" /> {/* Place LogoutButton below WiFiStatus */}
          <p id="message">{balanceMessage}</p> {/* Place message below LogoutButton */}
        </div>
        
        <button id="loadProduct">商品の読み込み</button>

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
          </ul>
        </div>
        <p id="Balance"></p>
        <div id="totalAmount">トータル: 0pt</div>
        <div className=".vertical">
          <Payment />
        </div>
      </div>
    </div>
  );
};

export default App;
