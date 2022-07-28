import { useContext, useEffect, useState } from 'react'
import styles from './ChannelList.module.scss'
import UserInfo from '../UserInfo'
import Channel from '../Channel'
import { ServerContext, UserContext } from '../../context'

const ChannelList = () => {
  const { server } = useContext(ServerContext)
  const [channels, setChannels] = useState(["General"])
  const { user, socket } = useContext(UserContext)
  const regex = /\$<.+>\$/

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
            return <Channel active={true} key={i}>{e}</Channel>
          }
        })
      }
      </ul>
      <UserInfo user={user}/>
    </div>
  )
}

export default ChannelList