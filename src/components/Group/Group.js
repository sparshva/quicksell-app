import React,{useContext} from "react";
import Card from "../Card/Card";
import styles from "./Group.module.css";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import TaskDetailsContext from "../../context/TaskDetailsContext";

// This component is used to display the tickets in the form of groups. The tickets are grouped based on the grouping option selected by the user. The tickets are passed as props to this component from the Home component. 

const Group = ({ groupName, groupIcon, tickets, users }) => {

  const {grouping} = useContext(TaskDetailsContext);

  return (
    <div className={styles.groupbox}>
      <div className={styles.heading}>
        <div className={styles.headingLeft}>
          <div className={styles.groupIcon}>
            {grouping == "User" && (
              <img src={groupIcon} alt="avatar" width="20" height="20" />
            )}
            {grouping != "User" && groupIcon}
          </div>
          <div className={styles.groupName}>{groupName}</div>
          {tickets && (
            <div className={styles.groupLength}>{tickets.length}</div>
          )}
          {!tickets && <div className={styles.groupLength}>0</div>}
        </div>
        <div className={styles.headingRight}>
          <div>
            <AiOutlinePlus
              style={{
                fontSize: "15px",
                color: "#63719c",
                cursor: "pointer",
              }}
            />
          </div>
          <div>
            <BiDotsHorizontalRounded
              style={{
                fontSize: "15px",
                color: "#63719c",
                cursor: "pointer",
              }}
            />
          </div>
        </div>
      </div>
      <div>
        {tickets &&
          tickets.length > 0 &&
          tickets.map((ticket, index) => (
            <Card key={index} ticket={ticket} users={users} />
          ))}
      </div>
    </div>
  );
};

export default Group;
