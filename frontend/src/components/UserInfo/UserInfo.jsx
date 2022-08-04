import { useSocket } from '@/hooks'
import VoiceControlls from '../VoiceControlls'
import UserImage from '../UserImage'
import styles from './UserInfo.module.scss'

const UserInfo = ({user}) => {
    const { id } = useSocket()
    
    const copy = () => {
      navigator.clipboard.writeText(id)
    }

    return (
      <div className={styles.userInfo}>
        <UserImage user={user}/>
        <div id={styles.userWrapper}>
          <div>
            <p>{user}</p>
          </div>
          <div className={styles.copyId} onClick={copy}>
            <p className={styles.id}>#{id}</p>
          </div>
        </div>
        <VoiceControlls/>
      </div>
  )
}

export default UserInfo