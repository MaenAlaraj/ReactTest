// src/UtilitiesFunctions/checkValueInQrstrList.js

import { setMessage } from '../utils'; // Adjust the relative path based on your project structure
function containsOnlyNumbers(value) {
  return /^[0-9]+$/.test(value); // Check if the string contains only numbers
}

export function checkValueInQrstrList(valueToCheck) {
  let message = ""; // Initialize the message variable

  if (containsOnlyNumbers(valueToCheck)) {
    message = "[checkValueInQrstrList]: ユーザーIDの値は数値です。";
    console.log(message);
    return true;
  } else {
    message = "[checkValueInQrstrList]:ユーザーIDの値は数値ではありません。";
    console.log(message);
    return false;
  }
}
