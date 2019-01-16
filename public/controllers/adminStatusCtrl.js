app.controller('adminStatusCtrl', ['$scope','$rootScope','adminApis','storageService','$log',  function ($scope,$rootScope,adminApis,storageService,$log) {
    $rootScope.locationName="admin";
    $rootScope.loader=false;
    $rootScope.innerDiv=true;
    $scope.session=JSON.parse(storageService.getSessionStorage("auth"));

}])