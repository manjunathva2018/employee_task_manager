//import mongoose module
var mongoose=require('mongoose');
//mongodb://<dbuser>:<dbpassword>@ds029675.mlab.com:29675/employee-task-manager
mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost/employee-task-manager');
//mongoose connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database Connected!')
});


