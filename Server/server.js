const dotenv = require('dotenv')
const http = require('http')
const app = require('./src/app')

dotenv.config();

const PORT = process.env.PORT || 5000;


const server = http.createServer(app);
server.listen(PORT,()=>{
    console.log(`Server listening at port ${PORT}`)
})

  