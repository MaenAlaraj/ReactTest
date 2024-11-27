import React from "react";

const LoadProductButton = () => {
  const handleLoadProduct = () => {
    console.log("Loading products...");
  };

  return (
    <button id="loadProduct" onClick={handleLoadProduct}>
      商品読み込み
    </button>
  );
};

export default LoadProductButton;
