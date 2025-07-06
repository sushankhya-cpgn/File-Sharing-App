const express = require('express');
const app = express();
const cors = require('cors');
const fileRoutes = require('./routes/fileRoutes');


app.use(express.json());
app.use(express.static('./uploads'))
// app.use('/api/files',fileRoutes);



module.exports = app;
