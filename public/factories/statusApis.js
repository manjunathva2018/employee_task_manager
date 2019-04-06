app.factory("statusApis",["$http","$q",function($http,$q){

    var createStatus=function(data){
        var q=$q.defer();
        $http.post('/api/status/create',data).
        then(function(response){
           q.resolve(response.data.message);
        },function(error){
          q.reject(error.data.message);
        })
    return q.promise;
    }

    var getStatusByUserId=function(data){
        var q=$q.defer();
        $http.get('/api/status/getAllByUser/userId/'+data).
        then(function(response){
           q.resolve(response.data.message);
        },function(error){
          q.reject(error.data.message);
        })
    return q.promise;
    }
  
    var getStatusAssignedToAdminId=function(data){
        var q=$q.defer();
        $http.get('/api/status/getAllByAdmin/assignedToAdminId/'+data).
        then(function(response){
           q.resolve(response.data.message);
        },function(error){
          q.reject(error.data.message);
        })
    return q.promise;
    }
  
    var updateStatus=function(data){
        var q=$q.defer();
        $http.put('/api/status/update',data).
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