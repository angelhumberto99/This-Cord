import './App.css'
import ChatView from './components/ChatView'
import { useState } from 'react'

function App() {
  const [user, setUser] = useState("")
  const [submited, setSubmited] = useState(false)

  const handleSubmit = evt => {
    evt.preventDefault()
    setSubmited(submited => !submited)
  }

  return (
    <div className="App">
      { submited ?
        <ChatView user={user}/>
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
