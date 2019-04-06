app.factory("common",["$log","$http","$q",function($log,$http,$q){

var getDateFormat=function(data){
    var n = new Date(data);
    var currentDate = n.getDate()-1;
    var currentMonth = n.getMonth() + 1; //Months are zero based
    var currentYear = n.getFullYear();
     var toDate =currentDate + "/" + currentMonth + "/" + currentYear;
     return toDate;
}

var getCurrentDate=function(){
     var now=moment().format('DD/MM/YYYY HH:mm:ss');
     return now;
}

var parseDate=function(data){
     var val=moment(data,'DD/MM/YYYY HH:mm:ss');
}

var getTodayDate=function(){
    var n = new Date();
    var currentDate = n.getDate()-1;
    var currentMonth = n.getMonth() + 1; //Months are zero based
    var currentYear = n.getFullYear();
     var toDate =currentYear + "/" + currentMonth + "/" + currentDate;
     return toDate;
}

return {
    getDateFormat:getDateFormat,
    getTodayDate:getTodayDate,
    getCurrentDate:getCurrentDate,
    parseDate:parseDate
}

   
}])