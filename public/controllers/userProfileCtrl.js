app.controller('userProfileCtrl', ['$scope', '$rootScope', '$log', '$window',
    function ($scope, $rootScope, $log, $window) {
        $scope.session = JSON.parse(storageService.getSessionStorage("user"));
        $rootScope.$broadcast('notLoggedIn', $scope.session);
        $rootScope.loadPage("dashboard","user");
        $rootScope.hideLoader();
       
        $rootScope.$broadcast('snackbarError',"some error occurred!, Please try again");
    }]);