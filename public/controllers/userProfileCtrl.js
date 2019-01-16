app.controller('userProfileCtrl', ['$scope', '$rootScope', '$log','$window', function ($scope, $rootScope, $log,$window) {
    $rootScope.locationName = "user";
    $rootScope.loader = false;
    $rootScope.innerDiv = true;
}]);