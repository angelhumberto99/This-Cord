import { useState, useEffect } from 'react'
import ChatView from './components/ChatView'
import ServerList from './components/ServerList'
import ChannelList from './components/ChannelList'
import { ServerContext, UserContext, RoomContext } from './context'
import { useSocket } from './hooks'
import './App.css'

function App() {
  const [ user, setUser ] = useState("")
  const [ room, setRoom ] = useState("global")
  const [ submited, setSubmited ] = useState(false)
  const [ server, setServer ] = useState("$<Inicio>$")
  const { id, socket } = useSocket()

  const handleSubmit = evt => {
    evt.preventDefault()
    setSubmited(submited => !submited)
  }

  useEffect(() => {
    if (socket != null) {
      socket.on("connect", () => {
        socket.emit('join-room', "global")
      })
    }
  }, [socket])

  return (
    <div className="App">
      <header>This Cord</header>
      { submited ?
        <div className='columns'>
          <ServerContext.Provider value={{server, setServer}}>
            <UserContext.Provider value={{user, id, socket}}>
              <RoomContext.Provider value={{room, setRoom}}>
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
