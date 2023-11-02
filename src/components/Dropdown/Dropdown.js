import React from 'react'
import styles from './Dropdown.module.css'

// This component is used to display the dropdown on the screen. The dropdown is used to select the setting for the task details. The setting can be either be displaying cards in a group or ordering cards in a list according to the user. The setting is passed as props to this component from the Navbar component.

const Dropdown = ({setting,setSetting,settingArr}) => {
  return (
    <div>
      <select
        className={styles.select}
        value={setting}
        onChange={(e) => setSetting(e.target.value)}
      >
        {settingArr.map((setting) => (
            <option key={setting.value} value={setting.value} className={styles.option} >
                {setting.label}
            </option>
            ))}
      </select>
    </div>
  );
}

export default Dropdown