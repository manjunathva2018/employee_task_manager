app.controller('adminCtrl', ['$scope', '$rootScope', '$window', '$log', 'storageService', 'adminApis', 'taskApis',
    function ($scope, $rootScope, $window, $log, storageService, adminApis, taskApis) {
        $scope.session = JSON.parse(storageService.getSessionStorage("authData"));
        $rootScope.$broadcast('notLoggedIn', $scope.session);
        $rootScope.loadPage("dashboard",$scope.session.roleType);
        $rootScope.hideLoader();
        $scope.totalEmp = '-';
        $scope.totalAssigned = '-';

        $scope.employees = adminApis.getAllUsers();
        $scope.employees.then(function (res) {
            $scope.totalEmp = res.length;
        }, function (err) {
            $scope.totalEmp = 0;
        })

        $scope.taskAssigned = taskApis.displayTasks($scope.session.id);
        $scope.taskAssigned.then(function (res) {
            $scope.totalAssigned = res.length;
        }, function (err) {
            $scope.totalAssigned = 0;
        })


        // $rootScope.$broadcast('snackbarError',"some error occurred!, Please try again");
    }]);