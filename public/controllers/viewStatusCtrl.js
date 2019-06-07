app.controller('viewStatusCtrl', ['$scope','$rootScope','statusApis','storageService','$log','$stateParams',
 function ($scope,$rootScope,statusApis,storageService,$log,$stateParams) {
    $scope.session=JSON.parse(storageService.getSessionStorage("authData"));
    $rootScope.$broadcast('notLoggedIn',$scope.session);
    $rootScope.loadPage("dashboard",$scope.session.roleType);
    $rootScope.hideLoader();
    $scope.statusId=$stateParams.statusId;
   
    // $rootScope.$broadcast('snackbarSucc', "Your Password Updated Successfully!");

    $scope.initialize=function(){
      $scope.getStatus=statusApis.getById( $scope.statusId);
      $scope.getStatus.then(function(resp){
      $scope.status=resp;
      $log.log("view status",$scope.status);
      },function(err){
        $scope.status=[];
      });
    }
}])