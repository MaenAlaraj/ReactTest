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

  const handleLoadProduct =  async () => {
    //stopTimer();
    const qrstring = await window.QRInterface.get_QRInfo();

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
          
          const price = item.price;
          if (total + price < Balance) {
            setItems(prevItems => {
              const newItems = [...prevItems, item];
              setTotal(prevTotal => prevTotal + price);
              document.getElementById('totalAmount').innerText = `トータル: ${total + price} pt`;
              return newItems;
            });

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
          } else {
            setMessage("残高が足りません。");
          }
        }
      } else {
        setMessage("商品QRではないものが読み込まれました。");
      }
    }
  };

  const removeItem = (item, price) => {
    setItems(prevItems => {
      const updatedItems = prevItems.filter(i => i.index !== item.index);
      setTotal(prevTotal => prevTotal - price);
      document.getElementById('totalAmount').innerText = `トータル: ${total - price} pt`;
      return updatedItems;
    });

    document.getElementById('loadProduct').disabled = false;
  };

  return (
    <div>
      <button id="loadProduct" onClick={handleLoadProduct}>
        商品読み込み
      </button>
      <div id="totalAmount">トータル: {total} pt</div>
      <ul id="productList">
        {items.map(item => (
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
