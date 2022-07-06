import React from 'react'
import styles from './ServerList.module.scss'
import ServerItem from '../ServerItem'

const ServerList = ({servers, handleServer}) => {
  const handleButton = (evt) => {
    handleServer(evt)
  }

  return (
    <div className={styles.container}>
      <ServerItem element={"discord"} callback={handleButton}/>
      <hr className={styles.separator} color='gray'/>
      {
        servers.map((e,i) => <ServerItem key={i} element={e} callback={handleButton}/>)
      }
    </div>
  )
}

export default ServerList