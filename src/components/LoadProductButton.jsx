import React, { useState } from 'react';

const LoadProductButton = ({ onAddProduct, onUpdateTotal }) => {
  const [message, setMessage] = useState('');
  const [total, setTotal] = useState(0);

  const isPositiveInteger = (value) => /^[1-9]\d*$/.test(value);

  const handleLoadProduct = async () => {
    try {
      console.log('Starting product load...');
      const qrstring = await window.QRInterface.get_QRInfo();
      console.log('QR Code string received:', qrstring);

      if (qrstring !== 'Scanner stopped') {
        const qrstr_list = qrstring.split(',');
        console.log('Parsed QR Code list:', qrstr_list);

        if (qrstr_list.length === 6) {
          if (!isPositiveInteger(qrstr_list[2])) {
            console.log('Invalid QR Code detected, not a positive integer.');
            setMessage('商品QRではないものが読み込まれました。');
          } else {
            const item = {
              seller: qrstr_list[0],
              product: qrstr_list[1],
              price: parseInt(qrstr_list[2], 10),
              category: qrstr_list[3],
              date: qrstr_list[4],
            };
            console.log('Item object created:', item);

            const newTotal = total + item.price;
            console.log('Current total:', total, 'Price of new item:', item.price);

            setTotal(newTotal); // Update local total state
            onAddProduct(item); // Pass the new item to App.js
            onUpdateTotal(newTotal); // Update total amount in App.js
            setMessage('商品がリストに追加されました。');
          }
        } else {
          console.log('Invalid QR Code format.');
          setMessage('商品QRではないものが読み込まれました。');
        }
      }
    } catch (error) {
      console.error('Error loading product:', error);
      setMessage('商品読み込み中にエラーが発生しました。');
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
