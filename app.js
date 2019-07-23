'use strict';

var express = require('express');
var cors = require('cors');
var multer = require("multer");
// require and use "multer"...

var app = express();
const storage = multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null, "./public/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  }
});

const upload = multer({storage: storage}).single("upfile");

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.post("/api/fileanalyse", (req,res) => {
  upload(req, res, (err) => {
    if(err){
      console.log(req.body);
      console.log(err);
      res.send("Error loading file");
    } else {
      console.log(req.file);
      res.json({name: req.file.originalname, type: req.file.mimetype, filesize: req.file.size});
    }
  });
});

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening at' + process.env.PORT || 3000);
});
