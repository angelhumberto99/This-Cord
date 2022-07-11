import { useState } from 'react'
import styles from './ServerList.module.scss'
import ServerItem from '../ServerItem'
import Dialog from '../Dialog'
import ServerDialog from '../ServerDialog'

const ServerList = ({servers, handleServer}) => {
  const [ active, setActive ] = useState("discord")
  const [dialog, setDialog] = useState(false)

  const handleButton = (evt) => {
    if (evt === 'new') setDialog(true)
    handleServer(evt)
    setActive(evt)
  }

  return (
    <>
      <div className={styles.container}>
        <ServerItem element={"discord"} active={active} callback={handleButton}/>
        <hr className={styles.separator} color='gray'/>
        {
          servers.map((e,i) => <ServerItem 
            active={active}
            key={i} 
            element={e} 
            callback={handleButton}
          />)
        }
        <ServerItem element={"new"} active={active} callback={handleButton}/>
        <ServerItem element={"compass"} active={active} callback={handleButton}/>
      </div>
      {
        dialog &&
        <Dialog close={() => setDialog(false)}>
          <ServerDialog close={() => setDialog(false)}/>
        </Dialog>
      }
    </>
  )
}

export default ServerList