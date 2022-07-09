import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
const ENDPOINT = "http://localhost:4000"

const useSocket = () => {
    const [socket, setSocket] = useState(null)
    const [id, setId] = useState("")

    useEffect(() => {
        setSocket(io(ENDPOINT))
    }, [])

    useEffect(() => {
        if (socket != null) {
          socket.on('connect', () => {
            setId(socket.id)
          })
        }
      }, [socket])

    return { id, socket }
}

export default useSocket