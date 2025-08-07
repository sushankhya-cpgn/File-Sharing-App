
function useFileSender(targetId,socket){
   
    const handleFile = (e)=> {
        const file = e.target.files[0];
        if(!targetId || !file){
          return;
        }
    
        const chunkSize = 1024*64;
        let offset = 0;
        socket.current.emit('send-to-peer',({targetId,meta:{
          filename: file.name,
          size: file.size
        }}))
    
        const reader = new FileReader();
    
        reader.addEventListener("load",async(e)=>{
          socket.current.emit('send-chunk-to-peer',({targetId,chunk:e.target.result}));
          await waitForAck(offset);
          offset+= e.target.result.byteLength;
    
          if(offset<file.size){
            readSlice(offset);
          }
          else{
            socket.current.emit("end-to-peer",{targetId});
            console.log('File sent');
          }
        })
    
        const readSlice = (o) =>{
          const slice = file.slice(offset,o+chunkSize);
          reader.readAsArrayBuffer(slice);
    
        }
        readSlice(0);
      }

      return {handleFile}
    
}


  export default useFileSender