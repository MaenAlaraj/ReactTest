// UtilitiesFunctions/removeItemsFromList.js

export const removeItemsFromList = (setItems, setTotal) => {
    // Clear items array and reset the state
    setItems([]); // Assuming `setItems` is a setter function for the 'items' state
  
    // Call setTotal function to reset the total amount
    setTotal(0); // Resets the total to 0
  };
  
  export const setTotal = (items) => {
    let total = 0;
    
    // Calculate the total amount based on the items' price
    items.forEach(item => {
      total += item.price;
    });
  
    // Update the total amount on the UI (React way)
    return total;
  };
  