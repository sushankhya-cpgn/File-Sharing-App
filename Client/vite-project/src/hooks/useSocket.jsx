import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

function useSocket(SOCKET_URL){
    const socketRef = useRef(null);
    const chunkRef = useRef([])
    const [peers,setPeers] = useState({})

    useEffect(()=>{
        socketRef.current = io(SOCKET_URL)
        socketRef.current.on('peer-list',(peers)=>{
          setPeers(peers);
        })   
        return () => {
          socketRef.current.off('peer-list');
        
        };
    
      },[SOCKET_URL]);

      const registerPeer = (id,name)=>{
        console.log(id,name)
        if(id && name){
            socketRef.current.emit('register',{peerId:id,name:name});
          }
    }

      return {peers, registerPeer, socket:socketRef}
}




export default useSocket;