app.controller('viewUserTaskCtrl', ['$scope', '$rootScope', '$log', 'storageService', 'statusApis',
    'adminApis', 'common', 'Upload', 'fileApis', '$window', '$timeout',
    function ($scope, $rootScope, $log, storageService, statusApis, adminApis, common, Upload, fileApis, $window, $timeout) {
        $scope.session = JSON.parse(storageService.getSessionStorage("authData"));
        $rootScope.$broadcast('notLoggedIn', $scope.session);
        $rootScope.loadPage("dashboard",$scope.session.roleType);
        $rootScope.hideLoader();



    }])