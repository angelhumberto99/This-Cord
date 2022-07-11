import { useState } from 'react'
import styles from './ServerDialog.module.scss'

const ServerDialog = ({close}) => {
  const [server, setServer] = useState("")
  return (
    <>
        <header id={styles.title}>
            <h2>Crear un servidor</h2>
        </header>
        <p id={styles.msg}>Tu servidor es donde te reúnes con tus amigos. crea el tuyo y comienza a hablar.</p>
        <form id={styles.container} onSubmit={evt => {
            evt.preventDefault()
            close()
        }}>
            <label id={styles.label}>NOMBRE DEL SERVIDOR</label>
            <input id={styles.input} placeholder="servidor"
              value={server}
              onChange={server => setServer(server.target.value)}/>
            <button id={styles.btnSubmit} disabled={server===''}>Crear</button>
        </form>
    </>
  )
}

export default ServerDialog
