const express = require('express');
const multer = require('multer');
const path = require('path')
const { uploadfile, downloadfile, listfiles } = require('../controller/fileController');
const { loginController } = require('../controller/loginController');
 
const router = express.Router();



// Route to list all files
router.get('/',listfiles)

// Route to download file
router.get('/:filename',downloadfile);

//Route to upload file
router.post('/login',loginController);

module.exports = router;



