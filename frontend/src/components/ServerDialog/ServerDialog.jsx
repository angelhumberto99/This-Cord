import { useState } from 'react'
import { addServer } from '@/services'
import { useSocket } from '@/hooks'
import styles from './ServerDialog.module.scss'

const ServerDialog = ({ close, setServers }) => {
  const [ server, setServer ] = useState("")
  const { socket } = useSocket()

  const handleSubmit = evt => {
    evt.preventDefault()
    socket.emit('join-room', server)
    setServers(prev => prev.concat(server))
    addServer({ server })
    close()
  }

  return (
    <>
        <header id={styles.title}>
            <h2>Crear un servidor</h2>
        </header>
        <p id={styles.msg}>Tu servidor es donde te reúnes con tus amigos. crea el tuyo y comienza a hablar.</p>
        <form id={styles.container} onSubmit={handleSubmit}>
            <label id={styles.label}>NOMBRE DEL SERVIDOR</label>
            <input id={styles.input} autoComplete="off" placeholder="servidor"
              value={server}
              onChange={server => setServer(server.target.value)}/>
            <button id={styles.btnSubmit} disabled={server===''}>Crear</button>
        </form>
    </>
  )
}

export default ServerDialog
