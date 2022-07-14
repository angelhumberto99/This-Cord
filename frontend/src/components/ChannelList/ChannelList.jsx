import styles from './ChannelList.module.scss'
import UserInfo from '../UserInfo'
import Channel from '../Channel'

const ChannelList = ({server, user}) => {
  const channels = ["canal1", "canal2"]
  return (
    <div className={styles.container}>
      <h3>
        {server}
      </h3>
      <ul className={styles.channelContainer}>
      {
        channels.map((e, i) => {
          return <Channel key={i}>{e}</Channel>
        })
      }
      </ul>
      <UserInfo user={user}/>
    </div>
  )
}

export default ChannelList