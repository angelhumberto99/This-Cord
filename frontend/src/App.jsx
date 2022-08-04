import { useState } from 'react'
import { UserContext } from './context'
import { Login, Home } from './pages'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

function App() {
  const [ user, setUser ] = useState("")

  return (
    <div className="App">
      <header>This Cord</header>
      <UserContext.Provider value={{user, setUser}}>
        <BrowserRouter>
          <Routes>
            <Route index element={<Login/>}/>
            <Route path='/home' 
              element={ user === "" 
                ? <Navigate replace to="/"/>
                : <Home/>
              }
            />
            <Route path='*' element={<Navigate replace to="/"/>}/>
          </Routes>  
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  )
}

export default App
