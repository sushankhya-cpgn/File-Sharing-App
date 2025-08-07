
import React, {useEffect, useState} from 'react';
import useSocket from '../hooks/useSocket';
import useFileSender from '../hooks/useFileSender';
import useReceiver from '../hooks/useFileReceiver';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TransferReceiverPage = () =>{
    const[myId,setMyId] = useState('');
    const[myName,setMyName] = useState('');
    const [targetId,setTargetId] = useState('')
    const {peers,registerPeer,socket} = useSocket('http://localhost:8000')
    const {handleFile} = useFileSender(targetId,socket)
    const navigate = useNavigate();
    useReceiver(socket); 
    const URL = 'http://localhost:8000/api/user';


    useEffect(()=>{
      
      const fetchData = async()=>{
        try{
          const user= await axios.get(
            URL+'/',{
              headers:{
                'Content-Type':'application/json'
              },
              withCredentials:true
            }
          )
          
          setMyName(user?.data.message.email.split('@')[0]);
          setMyId(user?.data.message.id)
          if(myId){
            handleRegister()
          }
          console.log("Hi")
        }

        catch(err){
          navigate('/login')
        }

       
       
      }

      fetchData();
      
    },[myId])
  
    const handleRegister = ()=>{
      console.log(myId); // Blamk value
      console.log("aaa")
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
        <p>{myId}</p>  
        <p>{myName}</p>
        </div>
  
        {myId && (
  <>
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
  </>
)}

  
        <div style={{ marginTop: 20 }}>
          <input type="file" onChange={handleFile} />
        </div>
      </div>
    );  
}

export default TransferReceiverPage;




