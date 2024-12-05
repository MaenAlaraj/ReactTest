// src/UtilitiesFunctions/setTotal.js
import { useGlobalContext } from "../GlobalContext";

const useSetTotal = () => {
  const { items, setTotal } = useGlobalContext(); // Get the context values

  const calculateTotal = () => {
    let total = 0;
    for (const item of items) {
      total += item.price; // Summing up the prices
    }

    setTotal(total); // Update the total in the global context
    document.getElementById('totalAmount').innerText = `トータル: ${total}pt`; // Display the total
  };

  return calculateTotal;
};

export default useSetTotal;
