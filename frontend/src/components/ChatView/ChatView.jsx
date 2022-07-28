import { useState, useEffect, useContext } from 'react'
import styles from './ChatView.module.scss'
import ChatArea from '../ChatArea'
import ChatInput from '../ChatInput'
import { getDate } from '../../utils'
import { UserContext, RoomContext } from '../../context'
import { useSocket } from '../../hooks'

const ChatView = () => {
  const [ msgs, setMsgs ] = useState([])
  const { user } = useContext(UserContext)
  const { room } = useContext(RoomContext)
  const {socket} = useSocket()
  
  useEffect(() => {
    if (socket != null) {
      socket.on('connect', () => {
        socket.on('server-msg', args => {
          setMsgs(msgs => msgs.concat(args))
        })
      })
    }
  }, [socket])

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