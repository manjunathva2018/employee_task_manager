app.controller('userTaskCtrl', ['$scope', '$rootScope', '$log','storageService',
'taskApis','adminApis',
function ($scope, $rootScope, $log,storageService,taskApis,adminApis) {
    $rootScope.locationName = "user";
    $rootScope.loader = false;
    $rootScope.innerDiv = true;
    $scope.session=JSON.parse(storageService.getSessionStorage("auth"));

$scope.showTasks=function(){
    $rootScope.loader = true;
    $rootScope.innerDiv = false;
    $scope.tasksAssigned=taskApis.displayTasksByUserId( $scope.session.id);
    $scope.tasksAssigned.then(function(res){
        $scope.totalTasks=res;
        $log.log("tasksAssigned res",res);
        $rootScope.loader = false;
        $rootScope.innerDiv = true;
    },function(err){
        $scope.totalTasks=[];
        $log.log("tasksAssigned err",err);
        $rootScope.loader = false;
        $rootScope.innerDiv = true;
        $rootScope.snackbarError("some error occurred!,Assigned tasks is not displayed");
    });
    // $rootScope.snackbarSucc("Your Password Updated Successfully!");
   
}
$scope.showTasks();
   
}]);
