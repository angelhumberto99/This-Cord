import styles from './UserList.module.scss'
import UserInfo from '../UserInfo'
import Channel from '../Channel'

const UserList = ({server, user}) => {
  const channels = ["canal1", "canal2"]
  return (
    <div className={styles.container}>
      <h3>
        {server}
      </h3>
      <div className={styles.channelContainer}>
      {
        channels.map((e, i) => {
          return <Channel key={i}>{e}</Channel>
        })
      }
      </div>
      <UserInfo user={user}/>
    </div>
  )
}

export default UserList