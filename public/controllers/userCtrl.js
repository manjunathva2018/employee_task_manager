app.controller('userCtrl', ['$scope', '$rootScope', '$log', '$window', 'storageService', 'statusApis', 'taskApis',
    function ($scope, $rootScope, $log, $window, storageService, statusApis, taskApis) {
        $scope.session = JSON.parse(storageService.getSessionStorage("user"));
        $rootScope.$broadcast('notLoggedIn', $scope.session);
        $rootScope.locationName = "user";
        $rootScope.loader = false;
        $rootScope.innerDiv = true;
        $scope.userName = $scope.session.userName;

        $scope.getTotalStatus = '-';
        $scope.totalTasks = '-';

        $scope.getStatus = function () {
            $rootScope.loader = true;
            $rootScope.innerDiv = false;
            $scope.status = statusApis.getStatusByUserId($scope.session.id);
            $scope.status.then(function (res) {
                $rootScope.loader = false;
                $rootScope.innerDiv = true;
                $scope.getTotalStatus = res.length;
            }, function (err) {
                $scope.getTotalStatus = 0;
            })
        }
        $scope.getStatus();

        $scope.showTasks = function () {
            $rootScope.loader = true;
            $rootScope.innerDiv = false;
            $scope.tasksAssigned = taskApis.displayTasksByUserId($scope.session.id);
            $scope.tasksAssigned.then(function (res) {
                $scope.totalTasks = res.length;
                $log.log("tasksAssigned res", res);
                $rootScope.loader = false;
                $rootScope.innerDiv = true;
            }, function (err) {
                $scope.totalTasks = 0;
                $log.log("tasksAssigned err", err);
                $rootScope.loader = false;
                $rootScope.innerDiv = true;
                $rootScope.snackbarError("some error occurred!,Assigned tasks is not displayed");
            });
            // $rootScope.snackbarSucc("Your Password Updated Successfully!");

        }
        $scope.showTasks();

    }]);