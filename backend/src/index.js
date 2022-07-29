const express = require('express');
const cors = require('cors');
const app = express();
const { createServer } = require("http")
const httpServer = createServer(app)
const options = { cors: { origin: '*' } }
const io = require("socket.io")(httpServer, options)
const PORT = process.env.PORT || 4000

let servers = { 
    general: {
        msgs: []
    }
}

let users = []

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(cors({origin: '*'}));

app.get('/servers', (_, res) => res.json(servers) )
app.post('/servers/add', (req, res) => {
    const { server } = req.body
    if (servers[server] === undefined)
        servers[server] = { msgs: []}
    res.json({msg: "success"})
})

function getUser(id, room) {
    let user = users.filter(e => e.id === id)

    if (user[0].dms[room] === undefined) {
        user[0].dms[room] = { msgs : [] }
    }

    return user[0]
}

io.on("connection", socket => {
    socket.on("sign-up", name => {
        if (name !== "") {
            var user = {
                id: socket.id,
                name,
                dms: {} 
            }
            users.push(user)
            socket.broadcast.emit("logged", users)
        }
    })

    socket.on('client-msg', (msg, room) => {
        if (servers[room] === undefined) {
            let sender = getUser(socket.id, room)
            let receiver = getUser(room, socket.id)

            sender.dms[room].msgs.push(msg)
            receiver.dms[socket.id].msgs.push(msg)

            users = users.map(u => {
                if (u.id === sender.id) {
                    u.dms = sender.dms
                } else if (u.id === receiver.id) {
                    u.dms = receiver.dms
                }
                return u
            })
        } else {
            servers[room].msgs.push(msg)
        }
        io.emit('new-message')
    })

    socket.on("get-msgs", (room, id, cb) => {
        if (servers[room] === undefined) {
            var user = getUser(socket.id, room)
            if (id === socket.id || id === room)
                cb(user.dms[room].msgs)
        } else {
            cb(servers[room].msgs)
        }
    })

    socket.on("get-users", cb => cb(users))

    socket.on('join-room', room => {
        socket.join(room)
        io.emit('new-message')
    })

    socket.on("disconnect", () => {
        users = users.filter(e => e.id !== socket.id)
        socket.broadcast.emit("logged", users)
    })
})

httpServer.listen(PORT, () => console.log(`App running on port ${PORT}`))