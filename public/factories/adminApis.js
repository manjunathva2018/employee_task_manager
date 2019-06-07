app.factory("adminApis",["$http","$q",function($http,$q){

var createEmployee=function(data){
    var q=$q.defer();
    $http.post('/api/users/create',data).
    then(function(response){
       q.resolve(response.data.message);
    },function(error){
      q.reject(error.data.message);
    })
return q.promise;
}

var getAllByUserType=function(data){
  var q=$q.defer();
  $http.get('/api/users/userType/'+data).
  then(function(response){
     q.resolve(response.data.message);
  },function(error){
    q.reject(error.data.message);
  })
return q.promise;
}

var getAllUsers=function(){
  var q=$q.defer();
  $http.get('/api/users/getAll').
  then(function(response){
    let res=response.data.message;
    if(res.length>0){
      q.resolve(res);
    }
    else{
      q.resolve([]);
    }
   
  },function(error){
    q.reject(error.data.message);
  })
return q.promise;
}


// var getAllUsers=function(){
//     var q=$q.defer();
//     $http.get('/api/users/userDetails/getAll').
//     then(function(response){
//       let res=response.data.message;
//       if(res.length>0){
//         let filter=[];
//         for(let i=0;i<res.length;i++){
//           let obj={};
//           obj.No=i+1;
//           obj.userName=res[i].userName;
//           obj.emailId=res[i].emailId;
//           obj.employeeId=res[i].employeeId;
//           obj.dateOfJoining=res[i].dateOfJoining;
//           obj.update="<button ng-click='update("+res[i]._id+")'>Update</button>";
//           obj.delete="<button ng-click='delete("+res[i]._id+")'>Delete</button>";
//           filter.push(obj);
//         }
//         q.resolve(filter);
//       }
//       else{
//         q.resolve([]);
//       }
     
//     },function(error){
//       q.reject(error.data.message);
//     })
// return q.promise;
// }
var getSingleEmployee=function(data){
  var q=$q.defer();
  $http.get('/api/users/id/'+data).
  then(function(response){
     q.resolve(response.data.message[0]);
  },function(error){
    q.reject(error.data.message);
  })
return q.promise;
}

var updateEmployee=function(data){
    var q=$q.defer();
    $http.put('/api/users/update',data).
    then(function(response){
       q.resolve(response.data.message);
    },function(error){
      q.reject(error.data.message);
    })
return q.promise;
}


var deleteEmployee=function(data){

    var q=$q.defer();
    $http.get('/api/users/delete/'+data).
    then(function(response){
       q.resolve(response.data.message);
    },function(error){
      q.reject(error.data.message);
    })
return q.promise;
   
}


    return {
        createEmployee:createEmployee,
        updateEmployee:updateEmployee,
        deleteEmployee:deleteEmployee,
        getAllUsers:getAllUsers,
        getAllByUserType:getAllByUserType,
        getSingleEmployee:getSingleEmployee
    }
}])