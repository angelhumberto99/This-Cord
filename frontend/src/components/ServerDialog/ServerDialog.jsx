import { useState } from 'react'
import styles from './ServerDialog.module.scss'
import { ServersStore } from '../../redux/stores'
import { ServersActions } from '../../redux/actions'

const ServerDialog = ({close}) => {
  const [server, setServer] = useState("")

  const handleSubmit = evt => {
    evt.preventDefault()
    ServersStore.dispatch({type: ServersActions.ADD, payload: server})
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
            <input id={styles.input} placeholder="servidor"
              value={server}
              onChange={server => setServer(server.target.value)}/>
            <button id={styles.btnSubmit} disabled={server===''}>Crear</button>
        </form>
    </>
  )
}

export default ServerDialog
