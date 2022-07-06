import React from 'react'
import styles from './ServerItem.module.scss'
import { AddCircleOutline, LogoDiscord } from 'react-ionicons'


const ServerItem = ({element, callback}) => {
  return (
    <div className={styles.item} onClick={() => callback(element)}>
      {
        element === "discord"?
        <LogoDiscord width="25px" height="25px"/> : 
        element !== "new" ?
        <div>{element[0]}</div>:
        <AddCircleOutline width="25px" height="25px"/>
      }
    </div>
  )
}

export default ServerItem;
