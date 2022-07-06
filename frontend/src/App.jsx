import './App.css'
import ChatView from './components/ChatView'
import ServerList from './components/ServerList'
import UserList from './components/UserList'
import { useState } from 'react'
import { useEffect } from 'react'

function App() {
  const [user, setUser] = useState("")
  const [submited, setSubmited] = useState(false)
  const [server, setServer] = useState("Server")

  const handleSubmit = evt => {
    evt.preventDefault()
    setSubmited(submited => !submited)
  }

  const servers = ["Udg", "modular", "new"]

  const handleServer = (evt) => {
    setServer(evt)
  }

  return (
    <div className="App">
      { submited ?
        <div className='columns'>
          <ServerList servers={servers} handleServer={handleServer}/>
          <UserList server={server}/>
          <ChatView user={user}/>
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
