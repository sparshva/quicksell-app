import { PiClockCountdownBold } from "react-icons/pi";
import { MdOutlineTimelapse } from "react-icons/md";
import { MdCheckCircle } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { MdRadioButtonUnchecked } from "react-icons/md";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { MdOutlineSignalCellularAlt1Bar } from "react-icons/md";
import { MdOutlineSignalCellularAlt2Bar } from "react-icons/md";
import { MdOutlineSignalCellularAlt } from "react-icons/md";
import { TbAlertSquareFilled } from "react-icons/tb";
import avatar from "../assets/avatar.jpeg";

// This function is used to get the icon for the status of the ticket. The icon is displayed on the card.

export const getStatusIcon = (status) => {
  if (status === "Backlog") {
    return (
      <PiClockCountdownBold style={{ fontSize: "16px", color: "#63719c" }} />
    );
  } else if (status === "Todo") {
    return (
      <MdRadioButtonUnchecked style={{ fontSize: "16px", color: "#63719c" }} />
    );
  } else if (status === "In progress") {
    return (
      <MdOutlineTimelapse
        style={{
          fontSize: "16px",
          color: "yellow",
          fontWeight: "bold",
        }}
      />
    );
  } else if (status === "Done") {
    return <MdCheckCircle style={{ fontSize: "16px", color: "blue" }} />;
  } else if (status === "Cancelled") {
    return <MdCancel style={{ fontSize: "16px", color: "#63719c" }} />;
  }
};

// This function is used to get the icon for the priority of the ticket. The icon is displayed on the card.

export const getPriorityIcon = (priority) => {
  if (priority == 0) {
    return (
      <BiDotsHorizontalRounded style={{ fontSize: "16px", color: "#63719c" }} />
    );
  } else if (priority == 1) {
    return (
      <MdOutlineSignalCellularAlt1Bar
        style={{ fontSize: "16px", color: "#63719c" }}
      />
    );
  } else if (priority == 2) {
    return (
      <MdOutlineSignalCellularAlt2Bar
        style={{ fontSize: "16px", color: "#63719c" }}
      />
    );
  } else if (priority == 3) {
    return (
      <MdOutlineSignalCellularAlt
        style={{ fontSize: "16px", color: "#63719c" }}
      />
    );
  } else {
    return (
      <TbAlertSquareFilled style={{ fontSize: "16px", color: "orange" }} />
    );
  }
};

// This function is used to group the tickets. The tickets are grouped and ordered based on the grouping and ordering options selected by the user. 
// This function returns an object with the grouped tickets. 

const buildGroupAndOrder = (grouping, ordering, tickets) => {
  let groupedtask = {};
  if (grouping === "Status") {
    groupedtask = {
      Backlog: {
        tickets: [],
        groupIcon: getStatusIcon("Backlog"),
        groupName: "Backlog",
      },
      Todo: {
        tickets: [],
        groupIcon: getStatusIcon("Todo"),
        groupName: "Todo",
      },
      "In progress": {
        tickets: [],
        groupIcon: getStatusIcon("In progress"),
        groupName: "In progress",
      },
      Done: {
        tickets: [],
        groupIcon: getStatusIcon("Done"),
        groupName: "Done",
      },
      Cancelled: {
        tickets: [],
        groupIcon: getStatusIcon("Cancelled"),
        groupName: "Cancelled",
      },
    };

    tickets.forEach((ticket) => {
      ticket.statusicon = getStatusIcon(ticket.status);
      ticket.priorityicon = getPriorityIcon(ticket.priority);
      ticket.userImage = avatar;
      groupedtask[ticket.status].tickets.push(ticket);
    });

    if (ordering === "Priority") {
      Object.keys(groupedtask).forEach((key) => {
        groupedtask[key].tickets.sort((a, b) => {
          return b.priority - a.priority;
        });
      });
    } else if (ordering === "Title") {
      Object.keys(groupedtask).forEach((key) => {
        groupedtask[key].tickets.sort((a, b) => {
          return a.title.localeCompare(b.title);
        });
      });
    }
  } else if (grouping === "Priority") {
    let mapPriority = {
        0: "No Priority",
        1: "Low",
        2: "Medium",
        3: "High",
        4: "Urgent",
    }
    groupedtask = {
      "No Priority": {
        tickets: [],
        groupIcon: getPriorityIcon(0),
        groupName: "No Priority",
      },
      Urgent: {
        tickets: [],
        groupIcon: getPriorityIcon(4),
        groupName: "Urgent",
      },
      High: { tickets: [], groupIcon: getPriorityIcon(3), groupName: "High" },
      Medium: { tickets: [], groupIcon: getPriorityIcon(2), groupName: "Medium" },
      Low: { tickets: [], groupIcon: getPriorityIcon(1), groupName: "Low" },
    };
    tickets.forEach((ticket) => {
      ticket.statusicon = getStatusIcon(ticket.status);
      ticket.priorityicon = getPriorityIcon(ticket.priority);
      ticket.userImage = avatar;
      groupedtask[mapPriority[ticket.priority]].tickets.push(ticket);
    });

    if (ordering === "Priority") {
      Object.keys(groupedtask).forEach((key) => {
        groupedtask[key].tickets.sort((a, b) => {
          return b.priority - a.priority;
        });
      });
    } else if (ordering === "Title") {
      Object.keys(groupedtask).forEach((key) => {
        groupedtask[key].tickets.sort((a, b) => {
          return a.title.localeCompare(b.title);
        });
      });
    }
  } else if (grouping === "User") {
    groupedtask = {};
    tickets.forEach((ticket) => {
      ticket.statusicon = getStatusIcon(ticket.status);
      ticket.priorityicon = getPriorityIcon(ticket.priority);
      ticket.userImage = avatar;
      if (groupedtask[ticket.userName]) {
        groupedtask[ticket.userName].tickets.push(ticket);
      } else {
        groupedtask[ticket.userName] = {
          tickets: [ticket],
          groupIcon: avatar,
          groupName: ticket.userName,
        };
      }
    });
    if (ordering === "Priority") {
      Object.keys(groupedtask).forEach((key) => {
        groupedtask[key].tickets.sort((a, b) => {
          return b.priority - a.priority;
        });
      });
    } else if (ordering === "Title") {
      Object.keys(groupedtask).forEach((key) => {
        groupedtask[key].tickets.sort((a, b) => {
          return a.title.localeCompare(b.title);
        });
      });
    }
  }

  return groupedtask;
}; 
export default buildGroupAndOrder;
