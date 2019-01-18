app.factory("taskApis",["$http","$q",function($http,$q){


    var createtasks=function(data){
        var q=$q.defer();
        $http.post('/api/tasks/taskDetails/create',data).
        then(function(response){
           q.resolve(response.data.message);
        },function(error){
          q.reject(error.data);
        })
    return q.promise;
    }

    var displayTasks=function(data){
        var q=$q.defer();
        $http.get('/api/tasks/taskDetails/getAll/adminId/'+data).
        then(function(response){
           q.resolve(response.data.message);
        },function(error){
          q.reject(error.data);
        })
    return q.promise;
    }


    
    var displayTasksByUserId=function(data){
        var q=$q.defer();
        $http.get('/api/tasks/taskDetails/getAll/assignedToId/'+data).
        then(function(response){
           q.resolve(response.data.message);
        },function(error){
          q.reject(error.data);
        })
    return q.promise;
    }


return {createtasks:createtasks,
    displayTasks:displayTasks,
    displayTasksByUserId:displayTasksByUserId};
}])