import { io } from 'socket.io-client'

const ENDPOINT = "http://localhost:4000"
const socket = io(ENDPOINT)

const useSocket = () => {
    return { id: socket.id, socket }
}

export default useSocket