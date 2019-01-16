var express=require('express');
var app=express();
var path=require('path');
var bodyParser = require('body-parser');

var mongooseconfig=require('./config/mongooseConfig');

//import routers
var user = require(path.join(__dirname, '/routes/user'));
var tasks=require(path.join(__dirname, '/routes/task'));
var status =require(path.join(__dirname, '/routes/status'));
var fileUpload=require(path.join(__dirname, '/routes/fileUpload'));
var fileDownload=require(path.join(__dirname, '/routes/fileDownload'));

app.use(express.static('public'));


//use body parser
app.use(bodyParser.json());

//use the api
app.use('/api/alluser', user);
app.use('/api/tasks',tasks);
app.use('/api/status',status);
app.use('/api/fileUpload',fileUpload);
app.use('/api/fileDownload',fileDownload);

   
const port = process.env.PORT || 2000;
 
var server=app.listen(port,function(){
    console.log('Server started at port : '+ server.address().port);
})