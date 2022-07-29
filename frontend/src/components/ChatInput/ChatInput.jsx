import { useState, useContext } from 'react'
import styles from './ChatInput.module.scss'
import { IoAddCircleSharp, IoGiftSharp } from 'react-icons/io5'
import { AiOutlineFileGif } from 'react-icons/ai'
import { TbSticker } from 'react-icons/tb'
import { BsFillEmojiHeartEyesFill } from 'react-icons/bs'
import { RoomContext, ServerContext, UserContext } from '../../context'
import { useSender } from '../../hooks'

const ChatInput = ({ callback }) => {
    const [msg, setMsg] = useState("")
    const { room } = useContext(RoomContext)
    const { socket } = useContext(UserContext)
    const { server } = useContext(ServerContext)
    const { isUser, name } = useSender(socket, server, room)

    const handleSubmit = evt => {
        evt.preventDefault();
        callback(msg)
        setMsg("")
    }

    const placeholder = `Enviar mensaje a ${ isUser ? "@": "#"}${name}`

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.inputContainer}>
                <IoAddCircleSharp className={styles.icon}/>
                <input type="text"
                name="msg"
                value={msg} 
                placeholder={placeholder}
                onChange={msg => setMsg(msg.target.value)}/>
                <IoGiftSharp className={styles.icon}/>
                <AiOutlineFileGif className={styles.icon}/>
                <TbSticker className={styles.icon}/>
                <BsFillEmojiHeartEyesFill className={styles.icon}/>
            </div>
        </form>
    )
}

export default ChatInput