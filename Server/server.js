const dotenv = require('dotenv')
const http = require('http')
const app = require('./src/app')
const socket = require('socket.io')
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
        peers[peerId]  = {name, socketId:socket.id}
        io.emit('peer-list',peers)
        console.log('Registration handled')
    })

    socket.on("send-to-peer",({targetId,meta})=>{
        const targetSocketId = peers[targetId]?.socketId
        if(targetSocketId){
            io.to(targetSocketId).emit('file-meta',meta)
        }
    })
    
    socket.on("send-chunk-to-peer",({targetId,chunk})=>{
        const targetSocketId = peers[targetId]?.socketId
        if(targetSocketId){
            io.to(targetSocketId).emit('file-chunk',chunk)
        }
    })

    socket.on("end-to-peer",({targetId})=>{
        const targetSocketId = peers[targetId]?.socketId
        if(targetSocketId){
            io.to(targetSocketId).emit('file-end')
        }
    })

    socket.on("disconnect",()=>{
        console.log(`Socket ${socket.id} disconnected`);
        const disconnectedPeerId = Object.keys(peers).find(
            (peerID)=>{
              return  peers[peerID].socketId === socket.id
            }
        )

        if(disconnectedPeerId){
            delete peers[disconnectedPeerId];
        }

        io.emit('peer-list',peers)

    })

})


server.listen(PORT,()=>{
    console.log(`Server listening at port ${PORT}`)
})

  