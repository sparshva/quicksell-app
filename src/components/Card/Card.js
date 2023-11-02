import React from "react";
import styles from "./Card.module.css";
import { BsCircleFill } from "react-icons/bs";

// This component is used to display the ticket details in the form of cards in the Group component. The ticket details are passed as props to this component from the Group component. 

const Card = ({ ticket }) => {
  return (
    <div className={styles.card}>
      <div className={styles.row1}>
        <div className={styles.id}>{ticket.id}</div>
        <div className={styles.image}>
          <img src={ticket.userImage} alt="avatar" width="20" height="20" />
        </div>
      </div>
      <div className={styles.row2}>
        <div className={styles.statusIcon}>{ticket.statusicon}</div>
        <div className={styles.title}>{ticket.title}</div>
      </div>
      <div className={styles.row3}>
        <div className={styles.priorityIcon}>{ticket.priorityicon}</div>
        {ticket.tag && ticket.tag.length > 0 &&
          ticket.tag.map((tag, index) => (
            <div className={styles.tag} key={index}>
              <div className={styles.tagCircle}>
                <BsCircleFill
                  style={{
                    fontSize: "8px",
                    color: "#a1abc4",
                    marginRight: "3px",
                  }}
                />
              </div>
              <div className={styles.tagName}>{tag}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Card;
