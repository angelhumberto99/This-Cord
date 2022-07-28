import { useContext } from 'react'
import styles from './ChannelList.module.scss'
import UserInfo from '../UserInfo'
import Channel from '../Channel'
import { ServerContext, UserContext } from '../../context'

const ChannelList = () => {
  const { server } = useContext(ServerContext)
  const channels = ["General"]
  const { user } = useContext(UserContext)

  const regex = /\$<.+>\$/

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
        server.match(regex)
        ? null :
        channels.map((e, i) => {
          return <Channel active={true} key={i}>{e}</Channel>
        })
      }
      </ul>
      <UserInfo user={user}/>
    </div>
  )
}

export default ChannelList