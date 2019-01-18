
app.controller('loginCtrl', ['$scope', '$rootScope', '$log', '$state', '$window', 'loginApis', 'storageService',
    function ($scope, $rootScope, $log, $state, $window, loginApis, storageService) {
        $rootScope.locationName = "login";
        $rootScope.loader = false;
        $rootScope.innerDiv = true;

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
                $scope.login = loginApis.checkLogin($scope.model);
                $scope.login.then(function (res) {
                    $log.log("login response", res);
                    $scope.loginRes = res[0];
                    if (res.length > 0) {
                        $rootScope.loader = true;
                        $rootScope.innerDiv = false;

                        if ($scope.loginRes.userType === 0) {
                            storageService.setSessionStorage("admin",
                                JSON.stringify({ "type": $scope.loginRes.userType, "id": $scope.loginRes._id, "userName": $scope.loginRes.userName }));
                            $state.go('admin');
                        }
                        else {
                            storageService.setSessionStorage("user",
                                JSON.stringify({ "type": $scope.loginRes.userType, "id": $scope.loginRes._id, "userName": $scope.loginRes.userName }));
                            $state.go('user');
                        }
                    }
                    else {
                        $rootScope.snackbarError("Login Failed !, Please try again");
                    }
                }, function (err) {
                    $log.log("login response", err);
                    $rootScope.snackbarError("Login Failed !, Please try again");
                })
            }
        }

    }]);