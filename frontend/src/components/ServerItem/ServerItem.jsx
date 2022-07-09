import React from 'react'
import styles from './ServerItem.module.scss'
import { SiDiscord } from 'react-icons/si'
import { MdAdd } from 'react-icons/md'
import { IoCompassSharp } from 'react-icons/io5'

const ServerItem = ({element, callback}) => {
  const renderIcon = () => {
    switch (element) {
      case 'discord':
        return <SiDiscord className={styles.icon}/>
      case 'new':
        return <MdAdd className={styles.icon} color="3ba55d"/>
      case 'compass':
        return <IoCompassSharp className={styles.icon} color="3ba55d"/>
      default:
        return <p>{element.slice(0,4)}</p>
    }
  }

  return (
    <div className={[styles.item]} onClick={() => callback(element)}>
      { renderIcon() }
    </div>
  )
}

export default ServerItem;
