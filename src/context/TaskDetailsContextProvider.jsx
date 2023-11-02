import React, { createContext,useEffect,useState } from "react";
import TaskDetailsContext from "./TaskDetailsContext";
import axios from "axios";
import buildGroupAndOrder from "../utils/buildGroupAndOrder";

// This file contains the context provider for the application. It is responsible for fetching the data from the API and storing it in the local storage. It also contains the state for the application and the functions to update the state. The state is passed down to the components using the context provider. 

const TaskDetailsContextProvider = ({ children }) => {

  const storedTickets = localStorage.getItem("tickets");
  const initialTickets = storedTickets ? JSON.parse(storedTickets) : [];
  const [tickets, setTickets] = useState(initialTickets);

  const storedUsers = localStorage.getItem("users");
  const initialUsers = storedUsers ? JSON.parse(storedUsers) : [];
  const [users, setUsers] = useState(initialUsers);

  const storedGroupedTasks = localStorage.getItem("groupedTasks");
  const initialGroupedTasks = storedGroupedTasks
    ? JSON.parse(storedGroupedTasks)
    : [];
  const [groupedTasks, setGroupedTasks] = useState(initialGroupedTasks);
  
  const [grouping, setGrouping] = useState(localStorage.getItem("grouping")==null?"Status":localStorage.getItem("grouping"));
  
  const [ordering, setOrdering] = useState(localStorage.getItem("ordering")==null?"Priority":localStorage.getItem("ordering"));

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try{const result = await axios.get(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );
      let userTickets = result.data.tickets;
      let idMap = {};
      result.data.users.forEach((user) => {
        idMap[user.id] = user.name;
      }
      );
    
      userTickets.forEach((ticket) => {
        ticket.userName = idMap[ticket.userId];
      });
      setTickets(userTickets);
      setUsers(result.data.users);
      window.localStorage.setItem("tickets", JSON.stringify(userTickets));
      window.localStorage.setItem("users", JSON.stringify(result.data.users));
      setAlertMessage("Data Fetched Successfully");
      setShowAlert(true);
    }
      catch(e){
        console.log(e);
        setAlertMessage("Error Fetching Data");
        setShowAlert(true);
      }
    };
    
    
    let localTickets = localStorage.getItem("tickets");
    if(localTickets===null){
      fetchData();
    }
    
  }, []);

  useEffect(() => {
    let groupedtask = buildGroupAndOrder(grouping, ordering, tickets);
    setGroupedTasks(groupedtask);
    localStorage.setItem("groupedTasks", JSON.stringify([groupedtask]));
    localStorage.setItem("grouping", grouping);
    localStorage.setItem("ordering", ordering);
    
  }, [grouping, ordering, tickets, setGroupedTasks]);



  return (
    <TaskDetailsContext.Provider
      value={{
        tickets,
        setTickets,
        users,
        setUsers,
        groupedTasks,
        setGroupedTasks,
        grouping,
        setGrouping,
        ordering,
        setOrdering,
        isSettingsOpen,
        setIsSettingsOpen,
        showAlert,
        setShowAlert,
        alertMessage,
        setAlertMessage,

      }}
    >
      {children}
    </TaskDetailsContext.Provider>
  );
};

export default TaskDetailsContextProvider;
