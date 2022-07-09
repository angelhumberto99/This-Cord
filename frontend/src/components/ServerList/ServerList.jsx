import { useState } from 'react'
import styles from './ServerList.module.scss'
import ServerItem from '../ServerItem'

const ServerList = ({servers, handleServer}) => {
  const [ active, setActive ] = useState("discord")

  const handleButton = (evt) => {
    handleServer(evt)
    setActive(evt)
  }

  return (
    <div className={styles.container}>
      <ServerItem element={"discord"} active={active === "discord"} callback={handleButton}/>
      <hr className={styles.separator} color='gray'/>
      {
        servers.map((e,i) => <ServerItem 
          active={active === e}
          key={i} 
          element={e} 
          callback={handleButton}
        />)
      }
    </div>
  )
}

export default ServerList