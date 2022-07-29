import { useState, useEffect } from 'react'

const useSender = (socket, server, room) => {
  const [ name, setName ] = useState("")
  const [ isUser, setIsUser ] = useState(false)

  useEffect(() => {
    if (server === "$<Inicio>$") {
      setIsUser(true)
      socket.emit("get-users", (e) => {
        let userName = (e.filter(el => el.id === room))[0]?.name
        setName(userName ?? 'Inicio')
      })
      
    } else if (!server.match(/\$<.+>\$/)){
      setIsUser(false)
      setName(server)
    }
  }, [server, room])

  return { isUser, name }
}

export default useSender