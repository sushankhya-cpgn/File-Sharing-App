import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:8000');

function App(){
  const[myId,setMyId] = useState('');
  const[myName,setMyName] = useState('');
  const [targetId,setTargetId] = useState('')
  const [peers,setPeers] = useState({})
  const chunkRef = useRef([])

  useEffect(()=>{
    socket.on('peer-list',(peers)=>{
      setPeers(peers)
    })
    socket.on('file-meta',(meta)=>{
      chunkRef.current = []
    })
    socket.on('file-chunk',(chunk)=>{
      chunkRef.current.push(new Uint8Array(chunk))
    })
    socket.on('file-end',()=>{
      const blob = new Blob(chunkRef.current)
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'received-file'
      a.click()
      console.log('file downloaded')
    })
    return(()=>{
      socket.off()
    })
  },[]);

  const handleRegister = ()=>{
    if(myId && myName){
      socket.emit('register',{peerId:myId,name:myName})
    }

  };

  const handleFile = (e)=> {
    const file = e.target.files[0]
    if(!targetId || !file){
      return;
    }

    const chunkSize = 1024*64


    
  }


  return (
    <div style={{ padding: 20 }}>
      <h2>📡 Peer-to-Peer File Share</h2>
      <div>
        <input
          placeholder="Your ID"
          value={myId}
          onChange={(e) => setMyId(e.target.value)}
        />
        <input
          placeholder="Your Name"
          value={myName}
          onChange={(e) => setMyName(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
      </div>

      <h4> Peers online:</h4>
      <select onChange={(e) => setTargetId(e.target.value)} value={targetId}>
        <option value="">Select a peer</option>
        {Object.entries(peers).map(([peerId, peer]) =>
          peerId !== myId ? (
            <option key={peerId} value={peerId}>
              {peer.name} ({peerId})
            </option>
          ) : null
        )}
      </select>

      <div style={{ marginTop: 20 }}>
        <input type="file" onChange={handleFile} />
      </div>
    </div>
  );


}




export default App;
