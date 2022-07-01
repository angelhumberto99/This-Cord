import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import styles from './ChatView.module.scss'
import MessageCard from '../MessageCard'
const ENDPOINT = "http://localhost:4000"

const ChatView = ({user, callback}) => {
  const [msg, setMsg] = useState("")
  const [msgs, setMsgs] = useState([])
  const [socket, setSocket] = useState(null)
  const [room, setRoom] = useState("")
  const [id, setId] = useState("")
  
  useEffect(() => {
    setSocket(io(ENDPOINT))
  }, [])

  useEffect(() => {
    if (socket != null) {
      socket.on('connect', () => {
        socket.on('server-msg', args => {
          setMsgs(msgs => [...msgs, args])
        })
        setId(socket.id)
      })
    }
  }, [socket])

  const handleSubmit = evt => {
    evt.preventDefault();
    socket.emit('client-msg', {
      from: user,
      msg 
    }, room)
    setMsg("")
    setMsgs(msgs => [...msgs, { from: user, msg }])
  }
  
  const joinRoom = (evt) => {
    evt.preventDefault()
    console.log(room)
    socket.emit('join-room', room)
  } 

  return (
    <div>
      <h2>{user}</h2>
      <h3>{id}</h3>
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
        <label>msg: </label>
        <input type="text" value={msg} 
        onChange={msg => setMsg(msg.target.value)}/>
        <br/>
        <label>room: </label>
        <input type="text" value={room}
        onChange={room => setRoom(room.target.value)}/>
        <button type='button' onClick={joinRoom}>join</button>
        <br/>
        <button type='submit'>Send</button>
      </form>
    </div>
  )
}

export default ChatView