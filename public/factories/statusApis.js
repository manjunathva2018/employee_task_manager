app.factory("statusApis",["$http","$q",function($http,$q){

    var createStatus=function(data){
        var q=$q.defer();
        $http.post('/api/status/statusDetails/create',data).
        then(function(response){
           q.resolve(response.data.message);
        },function(error){
          q.reject(error.data.message);
        })
    return q.promise;
    }

    var getStatusByUserId=function(data){
        var q=$q.defer();
        $http.get('/api/status/statusDetails/getAll/userId/'+data).
        then(function(response){
           q.resolve(response.data.message);
        },function(error){
          q.reject(error.data.message);
        })
    return q.promise;
    }
  
    var getStatusAssignedToAdminId=function(data){
        var q=$q.defer();
        $http.get('/api/status/statusDetails/getAll/assignedToAdminId/'+data).
        then(function(response){
           q.resolve(response.data.message);
        },function(error){
          q.reject(error.data.message);
        })
    return q.promise;
    }
  
    var updateStatus=function(data){
        var q=$q.defer();
        $http.put('/api/status/statusDetails/update',data).
        then(function(response){
           q.resolve(response.data.message);
        },function(error){
          q.reject(error.data.message);
        })
    return q.promise;
    }

    return {
        createStatus:createStatus,
        getStatusByUserId:getStatusByUserId,
        getStatusAssignedToAdminId:getStatusAssignedToAdminId,
        updateStatus:updateStatus
    }
}])