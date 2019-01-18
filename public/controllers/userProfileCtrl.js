app.controller('userProfileCtrl', ['$scope', '$rootScope', '$log', '$window',
    function ($scope, $rootScope, $log, $window) {
        $scope.session = JSON.parse(storageService.getSessionStorage("user"));
        $rootScope.$broadcast('notLoggedIn', $scope.session);
        $rootScope.locationName = "user";
        $rootScope.loader = false;
        $rootScope.innerDiv = true;
    }]);