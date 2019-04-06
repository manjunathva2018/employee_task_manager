app.controller('adminStatusCtrl', ['$scope','$rootScope','adminApis','storageService','$log', 
 function ($scope,$rootScope,adminApis,storageService,$log) {
    $scope.session=JSON.parse(storageService.getSessionStorage("admin"));
    $rootScope.$broadcast('notLoggedIn',$scope.session);
    $rootScope.loadPage("dashboard","superAdmin");
    $rootScope.hideLoader();
   
    // $rootScope.$broadcast('snackbarSucc', "Your Password Updated Successfully!");
}])