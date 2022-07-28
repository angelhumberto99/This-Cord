import { useState, useEffect } from 'react'
import ChatView from './components/ChatView'
import ServerList from './components/ServerList'
import ChannelList from './components/ChannelList'
import { ServerContext, UserContext, RoomContext } from './context'
import { useSocket } from './hooks'
import './App.css'

function App() {
  const [ user, setUser ] = useState("")
  const [ msgs, setMsgs ] = useState([])
  const [ room, setRoom ] = useState("general")
  const [ submited, setSubmited ] = useState(false)
  const [ server, setServer ] = useState("general")
  const { id, socket } = useSocket()

  const handleSubmit = evt => {
    evt.preventDefault()
    setSubmited(submited => !submited)
  }
  useEffect(() => {
    if (submited) socket.emit('sign-up', user)
  }, [submited, socket])

  useEffect(() => {
    if (socket != null) {
      socket.on('connect', () => {
        socket.emit('join-room', room)
      })

      socket.emit('get-msgs', room, setMsgs)
      socket.on('server-msg', args => setMsgs(args))
    }
  }, [socket, room])

  return (
    <div className="App">
      <header>This Cord</header>
      { submited ?
        <div className='columns'>
          <ServerContext.Provider value={{server, setServer}}>
            <UserContext.Provider value={{user, id, socket}}>
              <RoomContext.Provider value={{room, setRoom, msgs}}>
                <ServerList/>
                <ChannelList/>
                <ChatView/>
              </RoomContext.Provider>
            </UserContext.Provider>
          </ServerContext.Provider>
        </div>
        :
        <form onSubmit={handleSubmit}>
          <label>Usuario </label>
          <input type="text" required 
          onChange={user => setUser(user.target.value)}/>
        </form>
      }
    </div>
  )
}

export default App
