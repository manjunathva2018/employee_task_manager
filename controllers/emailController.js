var EMAIL = require('../middlewares/email'),
STATUS_TEMPLATE = require('../middlewares/statusTemplate');
var dateFormat = require('dateformat');
var path=require('path');

module.exports.emailStatusReport = function(data,callback){//Sends email to the specified user
	var obj = data;
    var receipents = obj.toEmail;
    var subject = "Status Report "+dateFormat(new Date(),'d/m/yyyy h:MM TT');
    var body = STATUS_TEMPLATE.statusEmailTemplate(obj.hourlyStatus);
    var attachments=null;
    // var attachments={};
    // attachments.filename= "";
    // attachments.filepath=path.join(__dirname,'../public/UserFileUpload',attachments.filename);
    var cc=null;
    EMAIL.sendMail(receipents,subject,body,attachments,cc,function(err, info) {
        if (err) {
				console.log(err)
            callback(err,null)
        }else{
				console.log(info)
        	callback(null,info)
        }
    })
}

