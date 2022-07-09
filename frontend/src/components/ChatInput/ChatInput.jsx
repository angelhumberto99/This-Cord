import { useState } from 'react'
import styles from './ChatInput.module.scss'
import { IoAddCircleSharp, IoGiftSharp } from 'react-icons/io5'
import { AiOutlineFileGif } from 'react-icons/ai'
import { TbSticker } from 'react-icons/tb'
import { BsFillEmojiHeartEyesFill } from 'react-icons/bs'

const ChatInput = ({callback}) => {
    const [msg, setMsg] = useState("")

    const handleSubmit = evt => {
        evt.preventDefault();
        callback(msg)
        setMsg("")
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputContainer}>
                    <IoAddCircleSharp className={styles.icon}/>
                    <input type="text"
                    name="msg"
                    value={msg} 
                    placeholder="Enviar mensaje"
                    onChange={msg => setMsg(msg.target.value)}/>
                    <IoGiftSharp className={styles.icon}/>
                    <AiOutlineFileGif className={styles.icon}/>
                    <TbSticker className={styles.icon}/>
                    <BsFillEmojiHeartEyesFill className={styles.icon}/>
                </div>
            </form>
        </>
    )
}

export default ChatInput