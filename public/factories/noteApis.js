app.factory("noteApis", ["$http", "$q", function ($http, $q) {

    var createNote=function(data){
        var q=$q.defer();
        $http.post('/api/note/create',data).
        then(function(response){
           q.resolve(response.data.message);
        },function(error){
          q.reject(error.data.message);
        })
    return q.promise;
    }

    var getNotesByUserId=function(data){
        var q=$q.defer();
        $http.get('/api/note/userId/'+data).
        then(function(response){
           q.resolve(response.data.message);
        },function(error){
          q.reject(error.data.message);
        })
    return q.promise;
    }

    var deleteNoteById=function(data){
        var q=$q.defer();
        $http.get('/api/note/delete/'+data).
        then(function(response){
           q.resolve(response.data.message);
        },function(error){
          q.reject(error.data.message);
        })
    return q.promise;
    }


    return {
        createNote:createNote,
        getNotesByUserId:getNotesByUserId,
        deleteNoteById:deleteNoteById
    }

}])