import { useState, useEffect, useContext } from 'react'
import getServers from '../../services/getServers'
import styles from './JoinDialog.module.scss'
import UserImage from '../UserImage'
import { UserContext } from '../../context'

const JoinDialog = ({ close, setServers }) => {
  const [ joinables, setJoinables ] = useState({})
  const { socket } = useContext(UserContext)

  const handleSubmit = el => {
    socket.emit('join-room', el)
    setServers(prev => prev.filter(e => e !== el).concat(el))
    close()
  }

  useEffect(() =>{
    getServers().then(res => setJoinables(res))
  }, [])

  return (
    <>
        <header id={styles.title}>
            <h2>Unirse a Servidor</h2>
        </header>
        <p id={styles.msg}>Desde juegos, a música y enseñanza, aquí encontrarás tu sitio.</p>
        
        <div id={styles.serversList}>
          { 
            joinables.length === 0
            ? <p><b>Ups :(</b><br/>parece que no hay servidores disponibles</p>
            : Object.keys(joinables).map(e => {
                return (
                  <div key={e} className={styles.btnWrapper}>
                    <button 
                      className={styles.joinableBtn}
                      onClick={() => handleSubmit(e)}
                    >
                      <UserImage user={e} styling={styles.joinableContent}/>
                    </button>
                    <p>{e}</p>
                  </div>
                )
              })
          }
        </div>
    </>
  )
}

export default JoinDialog
