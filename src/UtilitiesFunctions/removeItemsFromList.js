// src/UtilitiesFunctions/useRemoveItemsFromList.js
import { useGlobalContext } from "../GlobalContext";

const useRemoveItemsFromList = () => {
  const { items, setItems, setTotal } = useGlobalContext(); // Access context values

  const removeItemsFromList = () => {
    const productList = document.getElementById('productList');
    const listItems = productList.querySelectorAll('li');

    listItems.forEach(listItem => {
      // Skip if the list item is a header
      if (listItem.classList.contains('header-item')) {
        return;
      }
      productList.removeChild(listItem); // Remove the list item from the DOM
    });

    // Clear the items array
    setItems([]); // Update the global items array to be empty

    // Reset the total amount displayed
    setTotal(0); // Reset the total
  };

  return removeItemsFromList;
};

export default useRemoveItemsFromList;
