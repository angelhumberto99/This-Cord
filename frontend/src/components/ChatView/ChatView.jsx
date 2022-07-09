import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import styles from './ChatView.module.scss'
import MessageCard from '../MessageCard'
import { IoAddCircleSharp, IoGiftSharp } from 'react-icons/io5'
import { AiOutlineFileGif } from 'react-icons/ai'
import { TbSticker } from 'react-icons/tb'
import { BsFillEmojiHeartEyesFill } from 'react-icons/bs'
const ENDPOINT = "http://localhost:4000"

const ChatView = ({user}) => {
  const [msg, setMsg] = useState("")
  const [msgs, setMsgs] = useState([])
  const [socket, setSocket] = useState(null)
  const [room, setRoom] = useState("")
  
  useEffect(() => {
    setSocket(io(ENDPOINT))
  }, [])

  useEffect(() => {
    if (socket != null) {
      socket.on('connect', () => {
        socket.on('server-msg', args => {
          setMsgs(msgs => [...msgs, args])
        })
      })
    }
  }, [socket])

  const handleSubmit = evt => {
    evt.preventDefault();
    const today = new Date()
    const date = `${today.getDate()}/${(today.getMonth()+1)}/${today.getFullYear()}`
    socket.emit('client-msg', {
      from: user,
      msg,
      date
    }, room)
    setMsg("")
    setMsgs(msgs => [...msgs, { from: user, msg, date }])
  }
  
  const joinRoom = (evt) => {
    evt.preventDefault()
    console.log(room)
    socket.emit('join-room', room)
  } 

  return (
    <div className={styles.card}>
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
        <div className={styles.inputContainer}>
          <IoAddCircleSharp className={styles.icon}/>
          <input type="text"
          value={msg} 
          placeholder="Enviar mensaje"
          onChange={msg => setMsg(msg.target.value)}/>
          <IoGiftSharp className={styles.icon}/>
          <AiOutlineFileGif className={styles.icon}/>
          <TbSticker className={styles.icon}/>
          <BsFillEmojiHeartEyesFill className={styles.icon}/>
        </div>
      </form>
    </div>
  )
}

export default ChatView