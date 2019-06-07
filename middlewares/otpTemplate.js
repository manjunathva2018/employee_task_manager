module.exports.otpEmailTemplate = function(otp){
	var bodyTemplate= 
	`<table border="0" cellpadding="30" cellspacing="0" width="100%">
        <tbody>
            <tr>
                <td valign="top" style="color:#333333;font-family:Lucida Grande,sans-serif;font-size:14px;line-height:22px;text-align:left">
                    <div> 
                        <span style="color:#663333;font-family:Georgia,serif;font-size:30px;font-weight:normal;margin-bottom:10px"></span>
                        <p style="font-family:Century Gothic;font-size:18px;font-weight:normal;margin-bottom:5px">
                        <img src="http://manjunath-test-app.herokuapp.com/img/logo.png"  height="50" width="200" style="margin-left:40%"/>
                            <br/>
                            <br/>
                            <br/>
                            <h1>Your OTP is `+otp+`</h1> 
                            <h3> Please do not share this with anyone.</h3> 
                            <br/>
                            <span style="font-family:Georgia,serif;font-size:18px;font-weight:normal;margin-bottom:3px">Thanks,</span>
                            <br/>
                            <span style="font-family:Georgia,serif;font-size:20px;font-weight:normal;margin-bottom:5px">Aroha Team</span>
                        </p>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>`;
    return bodyTemplate;
}