import { useState, useEffect } from 'react'
import { useSocket } from '@/hooks'
import { ServerContext, RoomContext } from '@/context'
import ChatView from '@/components/ChatView'
import ServerList from '@/components/ServerList'
import ChannelList from '@/components/ChannelList'

const Home = () => {
  const [ msgs, setMsgs ] = useState([])
  const [ room, setRoom ] = useState("general")
  const [ server, setServer ] = useState("general")
  const { id, socket } = useSocket()  

  useEffect(() => {
    socket.emit('get-msgs', room, id, (arg) => setMsgs(arg))
  }, [])

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('join-room', room)
    })
    
    socket.on('new-message', () => {
      socket.emit('get-msgs', room, id, (arg) => setMsgs(arg))
    })
  }, [socket, room])

  return (
    <div className='columns'>
      <ServerContext.Provider value={{server, setServer}}>
        <RoomContext.Provider value={{room, setRoom, msgs}}>
          <ServerList/>
          <ChannelList/>
          <ChatView/>
        </RoomContext.Provider>
      </ServerContext.Provider>
    </div>
  )
}

export default Home