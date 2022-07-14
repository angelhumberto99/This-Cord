import { useState } from 'react'
import ChatView from './components/ChatView'
import ServerList from './components/ServerList'
import ChannelList from './components/ChannelList'
import './App.css'

function App() {
  const [user, setUser] = useState("")
  const [submited, setSubmited] = useState(false)
  const [server, setServer] = useState("discord")

  const handleSubmit = evt => {
    evt.preventDefault()
    setSubmited(submited => !submited)
  }

  const handleServer = (evt) => {
    setServer(evt)
  }

  return (
    <div className="App">
      <header>This Cord</header>
      { submited ?
        <div className='columns'>
          <ServerList handleServer={handleServer}/>
          <ChannelList server={server} user={user}/>
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
