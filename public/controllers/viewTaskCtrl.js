app.controller('viewTaskCtrl', ['$scope', '$rootScope', '$window', '$log','$stateParams', 'adminApis', 'storageService', 'common', 'taskApis',
    function ($scope, $rootScope, $window, $log,$stateParams, adminApis, storageService, common, taskApis) {
        $scope.session = JSON.parse(storageService.getSessionStorage("authData"));
        $rootScope.$broadcast('notLoggedIn', $scope.session);
        $rootScope.loadPage("dashboard",$scope.session.roleType);
        $rootScope.hideLoader();
        $scope.taskId=$stateParams.taskId;

        $scope.initialize=function(){
            taskApis.getOneByTaskId($scope.taskId).then(function(resp){
                $scope.taskRes=resp;
                $log.log("getOneByTaskId",resp);
                if($scope.taskRes[0].currentStatus!=undefined){
                    switch($scope.taskRes[0].currentStatus){
                        case 'completed':$scope.value=100;break;
                        case 'onGoing':$scope.value=50;break;
                        case 'onHold':$scope.value=10;break;
                        default:$scope.value=5;
                    }
                }
               
            },function(err){
                $scope.taskRes=[];
            })
        }

    }])