import { useState, useContext } from 'react'
import { ServerContext, RoomContext } from '@/context'
import { useSocket } from '@/hooks'
import ServerItem from '../ServerItem'
import Dialog from '../Dialog'
import ServerDialog from '../ServerDialog'
import JoinDialog from '../JoinDialog'
import styles from './ServerList.module.scss'

const ServerList = () => {
  const [ active, setActive ] = useState("general")
  const [ dialog, setDialog ] = useState(false)
  const [ servers, setServers ] = useState(["general"])
  const { setServer } = useContext(ServerContext)
  const { setRoom } = useContext(RoomContext)
  const { socket } = useSocket()

  const handleButton = (evt) => {
    if (evt === '$<Añadir un servidor>$' || evt === '$<Explora servidores>$')
      setDialog(true)
    setServer(evt)
    if (!evt.match(/\$<.+>\$/)) {
      socket.emit('join-room', evt)
      setRoom(evt)
    }
    setActive(evt)
  }

  return (
    <>
      <ul className={styles.container}>
        <ServerItem element={"$<Inicio>$"} active={active} callback={handleButton}/>
        <li>
          <hr className={styles.separator} color='gray'/>
        </li>
        {
          servers.map((e,i) => <ServerItem 
            active={active}
            key={i} 
            element={e} 
            callback={handleButton}
          />)
        }
        <ServerItem element={"$<Añadir un servidor>$"} active={active} callback={handleButton}/>
        <ServerItem element={"$<Explora servidores>$"} active={active} callback={handleButton}/>
      </ul>
      {
        dialog === true
        ? <Dialog close={() => setDialog(false)}>
          {
            active === '$<Añadir un servidor>$'
            ? <ServerDialog close={() => setDialog(false)} setServers={setServers}/>
            : <JoinDialog close={() => setDialog(false)} setServers={setServers}/>
          }
        </Dialog>
        : null
      }
    </>
  )
}

export default ServerList