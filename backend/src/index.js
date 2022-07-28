const express = require('express');
const cors = require('cors');
const app = express();
const { createServer } = require("http")
const httpServer = createServer(app)
const options = { cors: { origin: '*' } }
const io = require("socket.io")(httpServer, options)
const PORT = process.env.PORT || 4000

var servers = []

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(cors({origin: '*'}));

app.get('/servers', (_, res) => res.json(servers) )
app.post('/servers/add', (req, res) => {
    const { server } = req.body
    servers = [...servers, server]
    res.json({msg: "success"})
})

io.on("connection", socket => {
    socket.on('client-msg', (msg, room) => {
        console.log("Mensaje: ", msg)
        console.log("room", room)
        io.to(room).emit('server-msg', msg)
    })

    socket.on('join-room', room => {
        console.log("Unido a: ", room)
        socket.join(room)
    })

    socket.on("disconnect", () => console.log(`${socket.id} disconnected`))
})

httpServer.listen(PORT, () => console.log(`App running on port ${PORT}`))