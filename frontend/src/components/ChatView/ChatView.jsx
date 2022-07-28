import { useContext } from 'react'
import styles from './ChatView.module.scss'
import ChatArea from '../ChatArea'
import ChatInput from '../ChatInput'
import { getDate } from '../../utils'
import { UserContext, RoomContext } from '../../context'

const ChatView = () => {
  const { user, socket } = useContext(UserContext)
  const { room, msgs } = useContext(RoomContext)

  const handleSubmit = msg => {
    const date = getDate()
    socket.emit('join-room', room)
    socket.emit('client-msg', {
      from: user,
      msg,
      date
    }, room)
  }

  return (
    <div className={styles.card}>
      <ChatArea msgs={msgs}/>
      <ChatInput callback={handleSubmit}/>
    </div>
  )
}

export default ChatView