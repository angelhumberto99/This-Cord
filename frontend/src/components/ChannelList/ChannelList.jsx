import { useContext, useEffect, useState } from 'react'
import { ServerContext, UserContext } from '@/context'
import { useSocket } from '@/hooks'
import UserInfo from '../UserInfo'
import Channel from '../Channel'
import styles from './ChannelList.module.scss'

const ChannelList = () => {
  const { server } = useContext(ServerContext)
  const [channels, setChannels] = useState([])
  const [ active, setActive ] = useState("general")
  const { user } = useContext(UserContext)
  const { socket } = useSocket()
  const regex = /\$<.+>\$/
  
  useEffect(() => {
    let filterChannels = channels.filter(e => e.name !== user)
    setActive(filterChannels[0]?.name ?? "general")
  }, [channels])

  useEffect(() => {
    if (server === "$<Inicio>$") {
      socket.emit("get-users", setChannels)
      socket.on("logged", users => setChannels(users))
    } else {
      setChannels(["general"])
    }
  }, [socket, server])

  
  return (
    <div className={styles.container}>
      <h3>
        {
          server.match(regex)
          ? server.slice(2, -2)
          : server
        }
      </h3>
      <ul className={styles.channelContainer}>
      {
        server.match(regex) && server !== "$<Inicio>$"
        ? null :
        channels.map((e, i) => {
          if (e.name !== user){
            const isActive = active === (e.name ?? e)
            return <Channel active={isActive} setActive={setActive} key={i}>{e}</Channel>
          }
        })
      }
      </ul>
      <UserInfo user={user}/>
    </div>
  )
}

export default ChannelList