import { useContext } from 'react'
import { BiHash } from 'react-icons/bi'
import { RoomContext } from '@/context'
import { useSocket } from '@/hooks'
import styles from './Channel.module.scss'

const Channel = ({ children, active, setActive }) => {
  const { socket } = useSocket()
  const { room, setRoom } = useContext(RoomContext)

  const handleClick = () => {
    if (children?.id) {
      socket.emit('join-room', children.id)
      setRoom(children.id)
      setActive(children.name)
    } else {
      // esto servirá para hacer subsalas
      // let subRoom = `${room}/${children}`
      // socket.emit('join-room', subRoom)
      // setRoom(subRoom)
      setActive(children)
    }
  }

  return (
    <li className={styles.container}>
      <button className={`${styles.channelBtn} ${active && styles.active}`}
        onClick={handleClick}>
        <BiHash className={styles.icon}/>
        { children.name ?? children }
      </button>
    </li>
  )
}

export default Channel