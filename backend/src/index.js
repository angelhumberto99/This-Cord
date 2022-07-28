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
            let user = getUser(socket.id, room)
            user.dms[room].msgs.push(msg)
            users = users.map(u => {
                if (u.id === user.id)
                    u.dms = user.dms
                return u
            })
            io.to(room).emit('server-msg', user.dms[room].msgs)
        } else {
            servers[room].msgs.push(msg)
            io.to(room).emit('server-msg', servers[room].msgs)
        }
    })

    socket.on("get-msgs", (room, cb) => {
        if (servers[room] === undefined) {
            let user = getUser(socket.id, room)
            cb(user.dms[room].msgs)
        } else {
            cb(servers[room].msgs)
        }
    })

    socket.on("get-users", cb => cb(users))

    socket.on('join-room', room => {
        socket.join(room)
    })

    socket.on("disconnect", () => {
        console.log("before: ", users)
        console.log("socket: ",socket.id)
        users = users.filter(e => e.id !== socket.id)
        socket.broadcast.emit("logged", users)
        console.log("after: ", users)
    })
})

httpServer.listen(PORT, () => console.log(`App running on port ${PORT}`))