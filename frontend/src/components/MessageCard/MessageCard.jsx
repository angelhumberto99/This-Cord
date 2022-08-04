import UserImage from '../UserImage'
import styles from './MessageCard.module.scss'

const MessageCard = ({ children }) => {
  return (
    <li className={styles.messageCard}>
      <UserImage styling={styles.img} user={children.from}/>
      <div>
        <span className={styles.sender}>{children.from}</span>
        <span className={styles.date}>{children.date}</span>
        <div>
          <span>{children.msg}</span>
        </div>
      </div>
    </li>
  )
}

export default MessageCard