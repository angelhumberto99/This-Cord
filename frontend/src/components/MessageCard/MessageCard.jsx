import styles from './MessageCard.module.scss'

const MessageCard = ({children}) => {
  return (
    <div className={styles.messageCard}>
      <div className={styles.img}>
        <span>
          {children.from[0]}
        </span>
      </div>
      <div>
        <span className={styles.sender}>{children.from}</span>
        <span className={styles.date}>{children.date}</span>
        <div>
          <span>{children.msg}</span>
        </div>
      </div>
    </div>
  )
}

export default MessageCard