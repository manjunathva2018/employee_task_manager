app.controller('adminStatusCtrl', ['$scope','$rootScope','statusApis','storageService','$log', 
 function ($scope,$rootScope,statusApis,storageService,$log) {
    $scope.session=JSON.parse(storageService.getSessionStorage("authData"));
    $rootScope.$broadcast('notLoggedIn',$scope.session);
    $rootScope.loadPage("dashboard",$scope.session.roleType);
    $rootScope.hideLoader();
   
    // $rootScope.$broadcast('snackbarSucc', "Your Password Updated Successfully!");
    $scope.totalStatus=[];
    $scope.initialize=function(){
       $scope.status=statusApis.getStatusAssignedToAdminId($scope.session.id);
      $scope.status.then(function(resp){
       $scope.totalStatus=resp;
       $log.log("totalStatus",resp);
      },function(err){
        $scope.totalStatus=[];
        $log.log("totalStatus error",err);
      });
    }
}])