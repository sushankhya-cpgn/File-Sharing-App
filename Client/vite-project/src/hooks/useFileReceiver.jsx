import { useEffect, useRef } from "react";

function useReceiver(socket){
    
const chunkRef = useRef([])
useEffect(()=>{

    if(!socket.current) return;
    socket.current.on('file-meta',(meta)=>{
        console.log('Receiving',meta);
        chunkRef.current = [];
      })
      socket.current.on('file-chunk',(chunk)=>{
        chunkRef.current.push(new Uint8Array(chunk));
      })
      socket.current.on('file-end',()=>{
        const blob = new Blob(chunkRef.current);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'received-file';
        a.click();
        console.log('file downloaded');
      })

      return(()=>{
        socket.current.off('file-meta');
        socket.current.off('file-chunk');
        socket.current.off('file-end');
      })
},[socket])
}

export default useReceiver