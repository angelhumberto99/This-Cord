import MessageCard from '../MessageCard'
import styles from './ChatArea.module.scss';

const ChatArea = ({msgs}) => {
  return (
    <ul className={styles.chatArea}>
      {
        msgs.map((e, i) => {
          return (
            <MessageCard key={`${e}${i}`}>
              {e}
            </MessageCard>
          )
        })
      }
    </ul>
  )
}

export default ChatArea