import { useContext } from 'react'
import styles from './UserInfo.module.scss'
import VoiceControlls from '../VoiceControlls'
import UserImage from '../UserImage'
import { UserContext } from '../../context'

const UserInfo = ({user}) => {
    const { id } = useContext(UserContext)
    
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