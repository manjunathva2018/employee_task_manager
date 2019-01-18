app.controller('adminStatusCtrl', ['$scope','$rootScope','adminApis','storageService','$log',  function ($scope,$rootScope,adminApis,storageService,$log) {
    $scope.session=JSON.parse(storageService.getSessionStorage("admin"));
    $rootScope.$broadcast('notLoggedIn',$scope.session);
    $rootScope.locationName="admin";
    $rootScope.loader=false;
    $rootScope.innerDiv=true;
   

}])