// src/UtilitiesFunctions/useRemoveItemsFromList.js
import { useGlobalContext } from "../GlobalContext";

const useRemoveItemsFromList = () => {
  const { setItems, setTotal } = useGlobalContext(); // Access context values

  const removeItemsFromList = () => {
    const productList = document.getElementById("productList");

    if (!productList) {
      console.error("Element with ID 'productList' not found.");
      return;
    }

    const listItems = productList.querySelectorAll("li");

    listItems.forEach(listItem => {
      if (listItem.classList.contains("header-item")) {
        // Skip header items
        return;
      }
      productList.removeChild(listItem);
    });

    //setItems([]); // Clear the global items array
    console.log("Items removed and global items array cleared.");

    setTotal(0)
  };

  return removeItemsFromList;
};

export default useRemoveItemsFromList;
