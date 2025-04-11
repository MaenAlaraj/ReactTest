import React from "react";
import { setMessage } from "../utils"; // Import setMessage from utils.js
import { useGlobalContext } from "../GlobalContext"; // Adjust the path to your GlobalContext
import useSetBalance from '../useSetBalance'; // Correct the import path


const PaymentButton = ({ totalAmount, productList, removeRow  }) => {
  const { errorsSubstring, errorRetSubstring, lowerLimit, sellerNameRet, validateBalance ,prefix, userBeforePrefix, gcMall_code, payment_terminalID, header_prefix, setTotal, getValueFromCatList, enableButtonById, startTimer    } = useGlobalContext(); // Access necessary variables
   // Call the hook inside the component
   const setBalance = useSetBalance(); // Ensure it's a function

   const handleRemoveRow = (rowIndex) => {
    removeRow(rowIndex);
  };

  const handlePaymentClick = async () => { // Mark the function as async
    console.log("[Pay Button]: Payment initiated.");
    let startTime, endTime;
    startTime = performance.now();
    document.getElementById("mainContainer").style.display = "none";
    document.getElementById("transitContainer").style.display = "block";
    //console.log("[Pay Button]: totalAmount:", totalAmount);
    //console.log("[Pay Button]: productList:", productList);
    if (totalAmount === 0) {
      document.getElementById("mainContainer").style.display = "block";
      document.getElementById("transitContainer").style.display = "none";
      setMessage("商品が読み込まれていません。商品を読み込んでください。", "showDialog");
    } else 
    {
      if (productList.length > 0) {
        //const rows = productList.length;
        //console.log("[Pay Button] The value of rows:", rows);
        const firstRowIndex = productList[0].index; // Get the index of the first row
        //console.log("[Pay Button] The value of index of 1st row:", firstRowIndex);
        const user1 = `${prefix}${userBeforePrefix}`;
        //console.log("[Pay Button] user1:", user1);
        const user2 = `${prefix}${gcMall_code}`;
        //console.log("[Pay Button] user2:", user2);
        const message2 = "[Pay Button] MALL用";
        const firstRow = productList[0]; 
         // Access specific fields of the row
        //console.log("[Pay Button] Seller:", firstRow.seller);
        const sellerCode = firstRow.seller
        //console.log("[Pay Button] Product Name:", firstRow.product);
        const productName = firstRow.product
        //console.log("[Pay Button] Price:", firstRow.price);
        const productPrice = firstRow.price
        //console.log("[Pay Button] Category:", firstRow.category);
        const category = firstRow.category
        //console.log("[Pay Button] Date:", firstRow.date);
        const date = firstRow.date
        const catValue = getValueFromCatList(category);
        //console.log("[Pay Button] catValue:", catValue);
        //const sellerCodeE = `${prefix}${sellerCode}`;
        //console.log("[Pay Button] sellerCodeE:", sellerCodeE);
        //console.log("[Pay Button] payment_terminalID:", payment_terminalID);



        //startTime = performance.now();
        //const sellerNameRet = await window.CCWalletInterface.Name(sellerCodeE, payment_terminalID);
        //endTime = performance.now();
        //console.log(`Processing time[**window.CCWalletInterface.Name]: ${(endTime - startTime)/ 1000}seconds`);




        //console.log("[Pay Button] sellerNameRet:", sellerNameRet);
        const sellerNameTokens = sellerNameRet.split(":");
        //console.log("[Pay Button] sellerNameTokens:", sellerNameTokens);
        const sellerName = sellerNameTokens[1];
        //console.log("[Pay Button] sellerName:", sellerName);
        const amount = parseInt(productPrice, 10);
        //console.log("[Pay Button] amount:", amount);
        const formattedDate = date.replace(/\//g, ".");
        const message1 = `${header_prefix}${sellerCode} ${productName} ${catValue} ${category} ${formattedDate} ${sellerName}`;
        //console.log("[Pay Button] message1:", message1);





        startTime = performance.now();
        const result =  await window.CCWalletInterface.doPointPayment(user1, amount, user2, message1, message2, "");
        //const result =  await window.CCWalletInterface.doPointPaymentWithErrHandling(user1, amount, user2, message1, message2, "");
        
        endTime = performance.now();
        console.log(`Processing time[**window.CCWalletInterface.doPointPayment]: ${(endTime - startTime)/ 1000}seconds`);




        //console.log("[Pay Button] result:", result);  
        if (result.includes(errorsSubstring)) 
          {
            //console.log("Substring found!");
            const errorMessage = `[Pay Button] 支払いエラー：${result}`;
            //console.log(errorMessage);
            document.getElementById("mainContainer").style.display = "block";
            document.getElementById("transitContainer").style.display = "none";
            setMessage(errorMessage, "showDialog");
          }
          else
          {
            console.log("Substring not found!");

            /*startTime = performance.now();
            const Balance_STR =  await window.CCWalletInterface.Balance(user1, payment_terminalID);
            endTime = performance.now();
            console.log(`Processing time[**window.CCWalletInterface.Balance]: ${(endTime - startTime)/ 1000}seconds`);



            console.log("[setBalance] Raw Balance String:", Balance_STR);
            const Balance_LIST = Balance_STR.split(" ");
            console.log("[setBalance] Split Balance String:", Balance_LIST);
            const lowerLimit = Balance_LIST[1].split(":")[1]*/
            console.log("[setBalance] Lower Limit Balance is :", lowerLimit);






           
            const isValid = validateBalance(result, lowerLimit);
            //console.log(isValid ? "Balance is valid" : "Balance is invalid");
            if (isValid === true){
              document.getElementById("loadProduct").disabled = false;            
              setMessage("ご購入ありがとうございます！", "showDialog");
              endTime = performance.now();
              console.log(`Processing time[**Pay Button]: ${(endTime - startTime)/ 1000}seconds`);
            }
            else
            {
              const errorMessage = `[Pay Button] 支払いエラー：${result}`;
              console.log(errorMessage);
              document.getElementById("mainContainer").style.display = "block";
              document.getElementById("transitContainer").style.display = "none";
              setMessage(errorMessage, "showDialog");
            }            
          }
          enableButtonById("loadProduct");
          //startTimer(); 
          removeRow(firstRowIndex); // Call removeRow with the index of the first row
          document.getElementById("mainContainer").style.display = "block";
          document.getElementById("transitContainer").style.display = "none";
          console.log("[Pay Button] userBeforePrefix:", userBeforePrefix);
          setBalance(userBeforePrefix);
          setTotal(0)                   
          } 
        }
      };
      
      return (
      <button id="payment"
      style={{
        fontSize: "22px",
        padding: "16px 40px",
        borderRadius: "8px",
        backgroundColor: "#0c08f1e8",
        color: "white",
        border: "none",
        cursor: "pointer",
        transition: "transform 0.2s ease, background-color 0.3s ease",
      }}
       onClick={handlePaymentClick}>
        支払い
      </button>
      );
    };
export default PaymentButton;
