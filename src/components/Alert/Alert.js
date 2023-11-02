import React, { useState, useEffect,useContext } from "react";
import styles from "./Alert.module.css";
import TaskDetailsContext from "../../context/TaskDetailsContext";

// This component is used to display the alert message on the screen when the data is fetched successfully or when there is an error in fetching the data from the API endpoint and the alert message is displayed for 2 seconds and then it is hidden. The alert message is displayed in green color when the data is fetched successfully and in red color when there is an error in fetching the data.

const Alert = () => {
    const { showAlert, setShowAlert, alertMessage, setAlertMessage } =
      useContext(TaskDetailsContext);

    useEffect(() => {
      if (showAlert) {
        // Clear the timeout if the alert is manually closed
        setTimeout(() => {
          setShowAlert(false);
          console.log("Alert hidden");
        }, 2000);
      }
    }, [showAlert]);
  

   return (
     <>
       {showAlert && alertMessage == "Data Fetched Successfully" && (
         <div className={styles.custom_alert_success}>
           <p>{alertMessage}</p>
         </div>
       )}
       {showAlert && alertMessage == "Error Fetching Data" && (
         <div className={styles.custom_alert_error}>
           <p>{alertMessage}</p>
         </div>
       )}
     </>
   );
};

export default Alert;
