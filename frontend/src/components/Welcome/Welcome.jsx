import { useContext } from 'react'
import { BiHash } from 'react-icons/bi'
import { RoomContext, ServerContext } from '@/context'
import { useSender } from '@/hooks'
import UserImage from '../UserImage'
import styles from './Welcome.module.scss'

export default function Welcome() {
  const { room } = useContext(RoomContext)
  const { server } = useContext(ServerContext)
  const { isUser, name } = useSender(server, room)

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
