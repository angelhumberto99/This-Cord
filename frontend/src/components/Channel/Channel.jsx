import styles from './Channel.module.scss'
import { BiHash } from 'react-icons/bi'
import { useContext } from 'react'
import { UserContext, RoomContext } from '../../context'

const Channel = ({ children, active, setActive }) => {
  const { socket } = useContext(UserContext)
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