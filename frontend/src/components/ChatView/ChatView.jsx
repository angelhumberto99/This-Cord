import { useState, useEffect } from 'react'
import { useSocket } from '../../hooks'
import styles from './ChatView.module.scss'
import ChatArea from '../ChatArea'
import ChatInput from '../ChatInput'
import { getDate } from '../../utils'

const ChatView = ({user}) => {
  const [msgs, setMsgs] = useState([])
  const [room, setRoom] = useState("")
  const { socket } = useSocket()
  
  useEffect(() => {
    if (socket != null) {
      socket.on('connect', () => {
        socket.on('server-msg', args => {
          setMsgs(msgs => [...msgs, args])
        })
      })
    }
  }, [socket])

  const handleSubmit = msg => {
    const date = getDate()
    socket.emit('client-msg', {
      from: user,
      msg,
      date
    }, room)
    setMsgs(msgs => [...msgs, { from: user, msg, date }])
  }
  
  // const joinRoom = (evt) => {
  //   evt.preventDefault()
  //   console.log(room)
  //   socket.emit('join-room', room)
  // } 

  return (
    <div className={styles.card}>
      <ChatArea msgs={msgs}/>
      <ChatInput callback={handleSubmit}/>
    </div>
  )
}

export default ChatView