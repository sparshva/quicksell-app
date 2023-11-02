import React, { useEffect, useState ,useContext,useRef} from "react";
import styles from "./Navbar.module.css";
import { VscSettings } from "react-icons/vsc";
import { MdKeyboardArrowDown } from "react-icons/md";
import TaskDetailsContext from "../../context/TaskDetailsContext";
import useOutsideClick from "../../utils/hooks/closeDisplayMenu";
import Dropdown from "../Dropdown/Dropdown";

// This component is used to display the display settings dropdown menu on the screen. The display settings dropdown menu is displayed when the user clicks on the display button. The display settings dropdown menu contains the grouping and ordering options. The grouping and ordering options are passed as props to the Dropdown component from the Navbar component. 

const Navbar = () => {
 
  const {
    grouping,
    setGrouping,
    ordering,
    setOrdering,
    isSettingsOpen,
    setIsSettingsOpen,
    
  } = useContext(TaskDetailsContext);
  const displayDropdownRef = useRef(null);

  useOutsideClick(displayDropdownRef, () => {
    if (isSettingsOpen) {
      setIsSettingsOpen(false);
    }
  }); 

  let groupingArr = [
    { value: "Status", label: "Status" },
    { value: "User", label: "User" },
    { value: "Priority", label: "Priority" },
  ];
  let orderingArr = [
    { value: "Priority", label: "Priority" },
    { value: "Title", label: "Title" },
  ];

  return (
    <div className={styles.display}>
      <div ref={displayDropdownRef}>
        <div
          className={styles.display_button}
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
        >
          <VscSettings
            style={{
              transform: "rotate(90deg)",
              fontSize: "15px",
              color: "#63719c",
            }}
          />
          <div className={styles.name}>Display</div>
          <MdKeyboardArrowDown style={{ fontSize: "15px", color: "#63719c" }} />
        </div>
        {isSettingsOpen && (
          <div className={styles.menu}>
            <div className={styles.grouping}>
              <div>Grouping</div>
              <div>
                <Dropdown
                  setting={grouping}
                  setSetting={setGrouping}
                  settingArr={groupingArr}
                />
              </div>
            </div>
            <div className={styles.ordering}>
              <div>Ordering</div>
              <div>
                <Dropdown
                  setting={ordering}
                  setSetting={setOrdering}
                  settingArr={orderingArr}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
