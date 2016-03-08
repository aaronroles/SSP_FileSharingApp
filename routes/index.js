var express = require('express');
var router = express.Router();
var fs = require('fs');

// Temp global variable
var files = new Array();
var fileId = 0;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/uploadFile', function(req, res, next){
   res.render('fileUpload'); 
});

router.post('/uploadFile', function(req, res, next){
   console.log(req.files[0].filename);
   /* var file = {}; 
   file.name = req.files[0].filename;
   file.id = fileId++; */
   req.files[0]._id = fileId++;
   
   console.log(req.files[0]);
   
   files.push(req.files[0]);
   
   res.redirect('/files'); 
});

router.get('/files', function(req, res, next){
    res.render('test', {theFiles: files});
})

router.get('/deleteFile/:fileID', function(req, res, next){
   console.log('Delete ' + req.params.fileID); 
   for(var i=0; i<files.length; i++){
       if(files[i]._id == req.params.fileID){
           fs.unlink('./uploads/' + files[i].filename, function(error){
               
           });
        files.splice(i, 1);
        break;
       }
   }
   res.redirect('/files'); 
});

module.exports = router;
