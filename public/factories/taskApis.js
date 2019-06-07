app.factory("taskApis", ["$http", "$q", function ($http, $q) {


  var createtasks = function (data) {
    var q = $q.defer();
    $http.post('/api/tasks/create', data).
      then(function (response) {
        q.resolve(response.data.message);
      }, function (error) {
        q.reject(error.data.message);
      })
    return q.promise;
  }

  var displayTasks = function (data) {
    var q = $q.defer();
    $http.get('/api/tasks/getAllByAdmin/adminId/' + data).
      then(function (response) {
        q.resolve(response.data.message);
      }, function (error) {
        q.reject(error.data.message);
      })
    return q.promise;
  }

  var displayTasksByUserId = function (data) {
    var q = $q.defer();
    $http.get('/api/tasks/getAllByUser/assignedToId/' + data).
      then(function (response) {
        q.resolve(response.data.message);
      }, function (error) {
        q.reject(error.data.message);
      })
    return q.promise;
  }

  var updateTask = function (data) {
    var q = $q.defer();
    $http.put('/api/tasks/update', data).
      then(function (response) {
        q.resolve(response.data.message);
      }, function (error) {
        q.reject(error.data.message);
      })
    return q.promise;
  }

  var getOneByTaskId = function (data) {
    var q = $q.defer();
    $http.get('/api/tasks/id/'+data).
      then(function (response) {
        q.resolve(response.data.message);
      }, function (error) {
        q.reject(error.data.message);
      })
    return q.promise;
  }

  return {
    createtasks: createtasks,
    displayTasks: displayTasks,
    displayTasksByUserId: displayTasksByUserId,
    updateTask: updateTask,
    getOneByTaskId:getOneByTaskId
  };
}])