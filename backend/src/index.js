const { createServer } = require("http")
const httpServer = createServer()
const options = { cors: { origin: '*' } }
const io = require("socket.io")(httpServer, options)
const PORT = process.env.PORT || 4000

io.on("connection", socket => {
    socket.on('client-msg', msg => {
        console.log("Mensaje: ", msg)
        socket.broadcast.emit('server-msg', msg)
    })

    socket.on("disconnect", () => console.log(`${socket.id} disconnected`))
})

httpServer.listen(PORT, () => console.log(`App running on port ${PORT}`))