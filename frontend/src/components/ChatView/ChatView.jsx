import { useContext } from 'react'
import { getDate } from '@/utils'
import { UserContext, RoomContext } from '@/context'
import { useSocket } from '@/hooks'
import ChatArea from '../ChatArea'
import ChatInput from '../ChatInput'
import styles from './ChatView.module.scss'

const ChatView = () => {
  const { user } = useContext(UserContext)
  const { socket } = useSocket()
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