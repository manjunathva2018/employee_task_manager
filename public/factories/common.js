app.factory("common",["$log","$http","$q","$window",function($log,$http,$q,$window){

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

var getCurrentDateYMD=function(){
     var now=moment().format('YYYY/MM/DD HH:mm:ss');
     return now; 
}

var confirmDialog=function(message){
     var q=$q.defer();
      var result= $window.confirm(message);
   if(result === true){
     q.resolve("OK");
   }
   else{
     q.reject("Cancel")
   }
     return q.promise;
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
    parseDate:parseDate,
    confirmDialog:confirmDialog,
    getCurrentDateYMD:getCurrentDateYMD
}

   
}])