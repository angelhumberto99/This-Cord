const { createServer } = require("http")
const httpServer = createServer()
const options = { cors: { origin: '*' } }
const io = require("socket.io")(httpServer, options)
const PORT = process.env.PORT || 4000

io.on("connection", socket => {
    socket.on('client-msg', (msg, room) => {
        console.log("Mensaje: ", msg)
        console.log("room", room)
        if (room == "") {
            socket.broadcast.emit('server-msg', msg)
        } else {
            socket.to(room).emit('server-msg', msg)
        }
    })

    socket.on('join-room', room => {
        socket.join(room)
    })

    socket.on("disconnect", () => console.log(`${socket.id} disconnected`))
})

httpServer.listen(PORT, () => console.log(`App running on port ${PORT}`))