import { useState } from 'react'
import { useContext } from 'react'
import { useSocket } from '@/hooks'
import { UserContext } from '@/context'
import { useNavigate } from 'react-router-dom'
import { RiDiscordFill } from 'react-icons/ri'
import styles from './Login.module.scss'

const Login = () => {
  const { user, setUser } = useContext(UserContext)
  const [ animate, setAnimate ] = useState(false)
  const { socket } = useSocket()
  const navigator = useNavigate()

  const handleSubmit = evt => {
    evt.preventDefault()
    socket.emit('sign-up', user)
    setAnimate(prev => !prev)
    setTimeout(() => navigator('/home'), 300)
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.blob} ${animate ? styles.fillGrow : undefined}`}/>
      <span className={styles.logo}>
        <RiDiscordFill className={styles.icon}/>
        <h1>THIS CORD</h1>
      </span>
      <div className={styles.card}>
        <h3>¡Bienvenido de vuelta!</h3>
        <p>¡Estamos emocionados de tenerte de vuelta!</p>
        <form className={styles.formCard} onSubmit={handleSubmit}>
          <label>Usuario </label>
          <input autoComplete="off" type="text" required id={styles.userInput}
          onChange={user => setUser(user.target.value)}/>
          <button id={styles.btnSubmit} disabled={user===''}>
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login