import { useContext } from 'react'
import { useSocket } from '@/hooks'
import { UserContext } from '@/context'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { user, setUser } = useContext(UserContext)
  const { socket } = useSocket()
  const navigator = useNavigate()

  const handleSubmit = evt => {
    evt.preventDefault()
    socket.emit('sign-up', user)
    navigator('/home')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Usuario </label>
      <input type="text" required 
      onChange={user => setUser(user.target.value)}/>
    </form>
  )
}

export default Login