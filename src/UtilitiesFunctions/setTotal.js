// src/UtilitiesFunctions/setTotal.js

let items = []; // Ensure this array is initialized and managed properly in the global scope or context
let total = 0;

export function setTotal() {
  total = 0;

  // Calculate the total price
  for (const item of items) {
    const price = item.price || 0; // Ensure that price is a number
    total += price;
  }

  // Update the total amount in the DOM
  const totalAmountElement = document.getElementById('totalAmount');
  if (totalAmountElement) {
    totalAmountElement.innerText = `トータル: ${total} pt`;
  } else {
    console.warn("Element with ID 'totalAmount' not found!");
  }
}
