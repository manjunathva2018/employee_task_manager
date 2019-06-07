app.controller('userCtrl', ['$scope', '$rootScope', '$log', '$window', 'storageService', 'statusApis', 'taskApis','common',
    function ($scope, $rootScope, $log, $window, storageService, statusApis, taskApis,common) {
        $scope.session = JSON.parse(storageService.getSessionStorage("authData"));
        $rootScope.$broadcast('notLoggedIn', $scope.session);
        $rootScope.loadPage("dashboard",$scope.session.roleType);
        $rootScope.hideLoader();
        $scope.userName = $scope.session.userName;

        $scope.getTotalStatus = '-';
        $scope.totalTasks = '-';

        $scope.getStatus = function () {
            $rootScope.showLoader();
            $scope.status = statusApis.getStatusByUserId($scope.session.id);
            $scope.status.then(function (res) {
                $scope.getTotalStatus = res.length;
                $rootScope.hideLoader();
            }, function (err) {
                $scope.getTotalStatus = 0;
                $rootScope.hideLoader();
                $rootScope.$broadcast('snackbarError', "some error occurred!, Please try again");
            })
        }
        $scope.getStatus();

        $scope.showTasks = function () {
            $rootScope.showLoader();
            $scope.tasksAssigned = taskApis.displayTasksByUserId($scope.session.id);
            $scope.tasksAssigned.then(function (res) {
                $scope.totalTasks = res.length;
                $log.log("tasksAssigned res", res);
                $rootScope.hideLoader();
            }, function (err) {
                $scope.totalTasks = 0;
                $log.log("tasksAssigned err", err);
                $rootScope.hideLoader();
                $rootScope.$broadcast('snackbarError', "some error occurred!,Assigned tasks is not displayed");
            });
            // $rootScope.snackbarSucc("Your Password Updated Successfully!");
        }

        $scope.showTasks();
       $log.log(common.getCurrentDate());
    }]);