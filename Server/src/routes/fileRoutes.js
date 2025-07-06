const express = require('express');
const multer = require('multer');
const path = require('path')
const { uploadfile, downloadfile, listfiles } = require('../controller/fileController');
 
const router = express.Router();

// Multer Configuration

const storage = multer.diskStorage({
    destination:'./uploads',
    filename: function(req,file,cb){
        const extension = file.originalname.split('.')[1]
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.' + extension

        cb(null,file.filename+'-'+uniqueSuffix)
    }
});

const upload = multer({storage:storage});

// Route to list all files
router.get('/',listfiles)

// Route to download file
router.get('/:filename',downloadfile);

//Route to upload file
router.post('/upload',upload.single('file'),uploadfile);

module.exports = router;



