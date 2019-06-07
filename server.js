var express=require('express');
var path=require('path');
var bodyParser = require('body-parser');
const helmet = require('helmet')

var mongooseconfig=require('./config/mongooseConfig');
var app=express();

//import routers
var user = require(path.join(__dirname, '/routes/user'));
var tasks=require(path.join(__dirname, '/routes/task'));
var status =require(path.join(__dirname, '/routes/status'));
var profile = require(path.join(__dirname, '/routes/profile'));
var fileUpload=require(path.join(__dirname, '/routes/fileUpload'));
var fileDownload=require(path.join(__dirname, '/routes/fileDownload'));
var note =require(path.join(__dirname, '/routes/note'));
var excel= require(path.join(__dirname,'/routes/excel'));

//use middlewares
app.use(helmet())    //helmet sets headers for security
app.use(express.static('public'));

//use body parser
app.use(bodyParser.json());

//use the api
app.use('/api/users', user);
app.use('/api/tasks',tasks);
app.use('/api/status',status);
app.use('/api/profile',profile);
app.use('/api/fileUpload',fileUpload);
app.use('/api/fileDownload',fileDownload);
app.use('/api/note',note);
app.use('/api/excelExport',excel);

   
const port = process.env.PORT || 2000;
 
var server=app.listen(port,function(){
    console.log('\x1b[33m%s\x1b[0m','Server started at port : '+ server.address().port);
})