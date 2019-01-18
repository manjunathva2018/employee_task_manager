app.factory("fileApis",["$http","$q",function($http,$q){

    var uploadFile=function(data){
        var q=$q.defer();
        var config={headers: {
            'Content-Type': undefined
          }}
        $http.post('/api/fileUpload',data,config).
        then(function(response){
           q.resolve(response.data.message);
        },function(error){
          q.reject(error.data);
        })
    return q.promise;
    }


    var downloadFile=function(data){
        var q=$q.defer();
        $http.get('/api/fileDownload/fileName/'+data).
        then(function(response){
           q.resolve(response.data.message);
        },function(error){
          q.reject(error.data);
        })
    return q.promise;
    }
    
    return {
        uploadFile:uploadFile,
        downloadFile:downloadFile
    }
}])