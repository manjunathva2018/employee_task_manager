app.factory("loginApis",["$http","$q","$log",function($http,$q,$log){

var checkLogin=function(data){
    var q=$q.defer();
    $http.get('/api/alluser/userName/'+data.userName+'/password/'+data.password).
    then(function(response){
       q.resolve(response.data.message);
    },function(error){
      q.reject(error.data.message);
    })
return q.promise;
}

return {
    checkLogin:checkLogin
}
}])