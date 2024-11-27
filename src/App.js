import React from "react";
import './style.css';  // Import the CSS file

import RegisterFaceButton from './components/RegisterFaceButton';
import FaceButton from './components/FaceButton';
import QRButton from './components/QrButton';
import LoadProduct from './components/LoadProductButton';
import Payment from './components/PaymentButton';

const App = () => {
  return (
    <div className="App">
      <div className="auth-container">
        <p>GC Mall アプリ</p>
        <p>GCのQRか顔を読み込ませてください</p>
        <div className="button-container">
          <FaceButton />
          <QRButton />
        </div>
        <RegisterFaceButton />
      </div>
      <div className="scroll-container" id="productList">
        <LoadProduct />
      </div>
      <Payment />
    </div>
  );
};

export default App;
