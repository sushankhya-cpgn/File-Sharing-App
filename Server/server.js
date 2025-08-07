const dotenv = require('dotenv')
const http = require('http')
const app = require('./src/app')
const socket = require('socket.io')
const cors = require('cors')
const redis = require('redis')
app.use(cors())

const PORT = process.env.PORT || 8000;
dotenv.config();

const server = http.createServer(app);

const io = new socket.Server(server,{
    cors:{
        origin:'*'
    }
})

const client = redis.createClient();
client.on('error',(err)=>console.error("Redis Client Error",err));
client.connect();



let peers = {}

io.on("connection",(socket)=>{
    console.log("Connection started successfully")

    socket.on('register',({peerId,name})=>{
        peers[peerId]  = {name, socketId:socket.id}
        io.emit('peer-list',peers)
        console.log('Registration handled')
    })

    // Get offset for resuming
    socket.on("get-offset",async({targetId},callback)=>{
        const offSetKeyPrefix = `offset:${targetId}`;
        const offset = await client.get(offSetKeyPrefix) || 0;
        callback({offset});

    })

    socket.on("send-to-peer",({targetId,meta})=>{
        const targetSocketId = peers[targetId]?.socketId
        if(targetSocketId){
            io.to(targetSocketId).emit('file-meta',meta);
        }
    })
    
    socket.on("send-chunk-to-peer",async({targetId,chunk})=>{

        const fileKeyPrefix = `file:${targetId}` ;
        const offSetKeyPrefix = `offset:${targetId}`;
        // Information about offset
        let offset = await client.get(offSetKeyPrefix) || 0;
        // Information about chunk
        await client.set(`${fileKeyPrefix}:${offset}`,chunk);
        // Forwarding logic
        const targetSocketId = peers[targetId]?.socketId
        if(targetSocketId){
            io.to(targetSocketId).emit('file-chunk',chunk)
            socket.emit("chunk-ack",offset);
        }

        // Updating offset
        await client.set(offSetKeyPrefix,parseInt(offset)+chunk.length)

        // Delete the keys after expiration
        await client.expire(`${fileKeyPrefix}:${offset}}`,3600);
        await client.expire(`${offSetKeyPrefix}`,3600);

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

  