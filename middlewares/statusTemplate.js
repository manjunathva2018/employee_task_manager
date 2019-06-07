module.exports.statusEmailTemplate = function(data){
    var tableBody=[];
    for(var i=0;i<data.length;i++){
     tableBody.push('<tr><td>'+data[i].fromTime+'</td><td>'+data[i].toTime+'</td><td>'+data[i].description+'</td></tr>');
    }

    var bodyTemplate= `
    <html>
    <head>
<style>
.content-table {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    min-width: 400px;
    border-radius: 5px 5px 0 0;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  }
  .content-table thead tr {
    background-color: #009879;
    color: #ffffff;
    text-align: left;
    font-weight: bold;
  }
  
  .content-table th,
  .content-table td {
    padding: 12px 15px;
  }
  
  .content-table tbody tr {
    border-bottom: 1px solid #dddddd;
  }
  
  .content-table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
  }
  
  .content-table tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
  }
    </style>
</head>
<body>
	<table border="0" cellpadding="30" cellspacing="0" width="100%">
        <tbody>
            <tr>
                <td valign="top" style="color:#333333;font-family:Lucida Grande,sans-serif;font-size:14px;line-height:22px;text-align:left">
                    <div> 
                        <span style="color:#663333;font-family:Georgia,serif;font-size:30px;font-weight:normal;margin-bottom:10px"></span>
                        <p style="font-family:Century Gothic;font-size:18px;font-weight:normal;margin-bottom:5px">
                        <img src="http://manjunath-test-app.herokuapp.com/img/logo.png"  height="50" width="200" style="margin-left:40%"/>
                            <br/>
                            <h3>Today's Status Report</h3>
                            <br/>
                            <table class='content-table'>
                            <thead>
                            <tr>
                            <th>From Time</th>
                            <th>To Time</th>
                            <th>Description</th>
                            </tr>
                            </thead>
                            <tbody>
                            `+tableBody.join('')+`
                            <tbody>
                            </table>
                            <br/>
                            <span style="font-family:Georgia,serif;font-size:18px;font-weight:normal;margin-bottom:3px">Thanks,</span>
                            <br/>
                            <span style="font-family:Georgia,serif;font-size:20px;font-weight:normal;margin-bottom:5px">Aroha Team</span>
                        </p>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    </body>
    </html>`;
    return bodyTemplate;
}