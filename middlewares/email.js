var nodemailer = require('nodemailer');
var appConfig= require('../appConfig');

module.exports = {
    sendMail: sendMail
}

function sendMail(recipients, subject, body, attachments, cc, callback) {
    // credentials
    var username = appConfig.email.username;
    var password = appConfig.email.password;

    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport('smtps://' + username + ':' + password + '@smtp.gmail.com');

    // let transporter = nodemailer.createTransport({
    //     host: 'smtp.ethereal.email',
    //     port: 587,
    //     secure: false, // true for 465, false for other ports
    //     auth: {
    //         user: account.user, // generated ethereal user
    //         pass: account.pass // generated ethereal password
    //     }
    // });


    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: appConfig.email.from, // sender address
        to: recipients, // list of receivers
        subject: subject, // Subject line
        html: body
    };

    if(cc){
       mailOptions.cc=cc; 
    }

    if(attachments){
        mailOptions.attachments=
            [{   // use URL as an attachment
                filename: attachments.filename,
                path: attachments.filepath
            }]
        }

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(err, info) {
        callback(err, info);
    });
}


