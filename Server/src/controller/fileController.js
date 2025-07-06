const fs = require('fs');
const os = require('os');

exports.uploadfile = function(req,res){
    console.log('Uploaded',req.file)
  
    res.status(200).json({
        message:"File Uploaded",
        fileURL:`http://localhost:5000/api/files/upload/${req.file.filename}`
    })
}

exports.downloadfile = function(req,res){
    

}

exports.listfiles = function(req,res){
const files = fs.readdirSync('./uploads')
res.json(files)
}