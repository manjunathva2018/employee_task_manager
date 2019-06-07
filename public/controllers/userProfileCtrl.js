app.controller('userProfileCtrl', ['$scope', '$rootScope', '$log', '$window','storageService',
    function ($scope, $rootScope, $log, $window,storageService ) {
        $scope.session = JSON.parse(storageService.getSessionStorage("authData"));
        $rootScope.$broadcast('notLoggedIn', $scope.session);
        $rootScope.loadPage("dashboard",$scope.session.roleType);
        $rootScope.hideLoader();
       
        $rootScope.$broadcast('snackbarError',"some error occurred!, Please try again");
    }]);