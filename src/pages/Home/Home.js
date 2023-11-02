import React, { useState, useEffect,useContext } from "react";
import styles from "./Home.module.css";
import Navbar from "../../components/Navbar/Navbar.js";
import Group from "../../components/Group/Group.js";
import TaskDetailsContext from "../../context/TaskDetailsContext";

//This file is the main screen of the application. It is used to display the tickets in the form of groups. The tickets are grouped based on the grouping option and ordered based on the ordering option selected by the user.

const Home = () => {

  const { users, groupedTasks} = useContext(TaskDetailsContext);

  return (
    <div className={styles.home}>
      <div className={styles.display_settings}>
        <Navbar />
      </div>
      <div className={styles.display}>
        {groupedTasks != {} &&
          Object.keys(groupedTasks).map((key) => {
            return (
              <Group
                key={key}
                groupName={groupedTasks[key].groupName}
                groupIcon={groupedTasks[key].groupIcon}
                tickets={groupedTasks[key].tickets}
                users={users}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Home;
