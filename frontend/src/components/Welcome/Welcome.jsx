import { useContext } from 'react'
import { BiHash } from 'react-icons/bi'
import { RoomContext, UserContext, ServerContext } from '../../context'
import styles from './Welcome.module.scss'
import UserImage from '../UserImage'
import { useSender } from '../../hooks'

export default function Welcome() {
  const { room } = useContext(RoomContext)
  const { socket } = useContext(UserContext)
  const { server } = useContext(ServerContext)
  const { isUser, name } = useSender(socket, server, room)

  return (
    <div className={styles.container}>
      {
        isUser === false
        ? <>
            <BiHash className={styles.icon}/>
            <h1>¡Te damos la bienvenida a #{name}!</h1>
            <p>Aquí empieza el canal #{name}</p>
          </>
        : <>
            <UserImage styling={styles.icon} user={name}/>
            <h1>{name}</h1>
            <p>Este es el comienzo de tu historia de mensajes directos con <b>@{name}</b></p>
          </>
      }
    </div>
  )
}
