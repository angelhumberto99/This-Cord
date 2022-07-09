import './App.css'
import ChatView from './components/ChatView'
import ServerList from './components/ServerList'
import UserList from './components/UserList'
import { useState } from 'react'

function App() {
  const [user, setUser] = useState("")
  const [submited, setSubmited] = useState(false)
  const [server, setServer] = useState("discord")

  const handleSubmit = evt => {
    evt.preventDefault()
    setSubmited(submited => !submited)
  }

  const servers = ["Udg", "Modular", "new", "compass"]

  const handleServer = (evt) => {
    setServer(evt)
  }

  return (
    <div className="App">
      <header>This Cord</header>
      { submited ?
        <div className='columns'>
          <ServerList servers={servers} handleServer={handleServer}/>
          <UserList server={server} user={user}/>
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
