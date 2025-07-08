import React, {useState} from 'react';
import useSocket from './hooks/useSocket';
import useFileSender from './hooks/useFileSender';
import useReceiver from './hooks/useFileReceiver';

function App(){
  const[myId,setMyId] = useState('');
  const[myName,setMyName] = useState('');
  const [targetId,setTargetId] = useState('')
  const {peers,registerPeer,socket} = useSocket('http://localhost:8000')
  const {handleFile} = useFileSender(targetId,socket)
  useReceiver(socket); 

  const handleRegister = ()=>{
    if(myId && myName){
      registerPeer(myId,myName);
      socket.current.emit('register',{peerId:myId,name:myName});
      console.log("Someone registerd")
    }
  };

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
