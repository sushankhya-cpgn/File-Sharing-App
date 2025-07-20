const express = require('express');
const app = express();
const cors = require('cors');
const fileRoutes = require('./routes/fileRoutes');
const loginRoutes = require('./routes/loginRoutes')

app.use(cors({
    origin: 'http://localhost:5173', // your React frontend
    credentials: true // optional, only if you’re using cookies
  }));


app.use(express.json());
app.use(express.static('./uploads'))
// app.use('/api/files',fileRoutes);
app.use('/api/auth',loginRoutes)


module.exports = app;
