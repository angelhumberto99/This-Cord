import { useRef, useEffect, useContext } from 'react'
import MessageCard from '../MessageCard'
import styles from './ChatArea.module.scss';
import Welcome from '../Welcome';

const ChatArea = ({ msgs }) => {
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current.scrollIntoView({behavior: 'smooth'})
  }, [msgs])

  return (
    <ul className={styles.chatArea}>
      <Welcome/>
      {
        msgs.map((e, i) => {
          return (
            <>
              <MessageCard key={`${e}${i}`}>
                {e}
              </MessageCard>
            </>
          )
        })
      }
      <div ref={scrollRef}/>
    </ul>
  )
}

export default ChatArea