import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import styles from './ChatView.module.scss'
import MessageCard from '../MessageCard'
const ENDPOINT = "http://localhost:4000"

const ChatView = ({user}) => {
  const [msg, setMsg] = useState("")
  const [msgs, setMsgs] = useState([])
  const [socket, setSocket] = useState(null)
  
  useEffect(() => {
    setSocket(io(ENDPOINT))
  }, [])

  useEffect(() => {
    if (socket != null)
      socket.on('server-msg', args => {
        setMsgs(msgs => [...msgs, args])
      })
  }, [socket])

  const handleSubmit = evt => {
    evt.preventDefault();
    socket.emit('client-msg', {
      from: user,
      msg 
    })
    setMsg("")
    setMsgs(msgs => [...msgs, { from: user, msg }])
  }

  return (
    <div>
      <h2>{user}</h2>
      <div className={styles.chatArea}>
        {
          msgs.map((e, i) => {
            return <MessageCard key={`${e}${i}`}>
              {e}
            </MessageCard>
          })
        }
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={msg} 
        onChange={msg => setMsg(msg.target.value)}/>
      </form>
    </div>
  )
}

export default ChatView