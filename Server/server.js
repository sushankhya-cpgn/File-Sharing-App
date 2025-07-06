const dotenv = require('dotenv')
const http = require('http')
const app = require('./src/app')
const socket = require('socket.io')
const os = require('os')
const fs = require('fs')
const cors = require('cors')
app.use(cors())

const PORT = process.env.PORT || 8000;


dotenv.config();
const server = http.createServer(app);

const io = new socket.Server(server,{
    cors:{
        origin:'*'
    }
})


let peers = {}

io.on("connection",(socket)=>{
    console.log("Connection started successfully")

    socket.on('register',({peerId,name})=>{
        peers[peerId]  = {name, socketId:peerId}
        io.emit('peer-list',peers)
    })

    socket.on("send-to-peer",({targetId,meta})=>{
    
})
})


server.listen(PORT,()=>{
    console.log(`Server listening at port ${PORT}`)
})

  