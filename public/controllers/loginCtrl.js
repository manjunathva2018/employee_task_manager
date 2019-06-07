
app.controller('loginCtrl', ['$scope', '$rootScope', '$log', '$state', '$window', 'authApis', 'storageService',
    function ($scope, $rootScope, $log, $state, $window, authApis, storageService) {
        $rootScope.loadPage("login",'');
        $rootScope.hideLoader();

        $scope.schema = {
            type: "object",
            properties: {
                userName: {
                    type: "string",
                    title: "Username",
                    minLength: 2,
                    description: "Enter your username"
                },
                password: {
                    type: "string",
                    title: "Password",
                    minLength: 4,
                    description: "Enter your password"
                }
            },
            "required": ["userName", "password"]
        };

        $scope.form = [
            { "key": "userName", "placeholder": "Enter your username" }, {
                "type": "password",
                "key": "password", "placeholder": "Enter your password"
            },
            {
                type: "actions",
                items: [
                    { type: 'submit', title: 'Login', "style": "btn-success" },
                    { type: 'button', title: 'Cancel', "style": "btn-danger", onClick: "cancel()" }
                ]
            }
        ];

        $scope.cancel = function () {
            $scope.model = {};
            $scope.$broadcast('schemaFormRedraw');
        }

        $scope.model = {};
        $scope.onSubmit = function (form) {
            // First we broadcast an event so all fields validate themselves
            $scope.$broadcast('schemaFormValidate');

            // Then we check if the form is valid
            if (form.$valid) {

                $log.log($scope.model);
                // ... do whatever you need to do with your data.
                $scope.login = authApis.checkLogin($scope.model);
                $scope.login.then(function (res) {
                    $log.log("login response", res);
                    $scope.loginResp = res[0];
                    if (res.length > 0) {
                        $rootScope.showLoader();
                        authApis.setAuth($scope.loginResp);
                        if ($scope.loginResp.userType === 0 || $scope.loginResp.userType === 1) {
                            $state.go('admin');
                        }
                        else {
                            $state.go('user');
                        }
                    }
                    else {
                        $rootScope.$broadcast('snackbarError',"Login Failed !, Please try again");
                    }
                }, function (err) {
                    $log.log("login response", err);
                    $rootScope.$broadcast('snackbarError',"Login Failed !, Please try again");
                })
            }
        }

    }]);