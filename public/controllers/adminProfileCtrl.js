
app.controller('adminProfileCtrl', ['$scope', '$rootScope', 'adminApis', 'storageService', '$log', function ($scope, $rootScope, adminApis, storageService, $log) {
    $scope.session = JSON.parse(storageService.getSessionStorage("admin"));
    $rootScope.$broadcast('notLoggedIn', $scope.session);

    $rootScope.locationName = "admin";
    $rootScope.loader = false;
    $rootScope.innerDiv = true;
    $scope.schema = {
        type: "object",
        properties: {
            oldPassword: {
                type: "string",
                title: "Old Password",
                minLength: 4,
                description: "Enter your old password"
            },
            newPassword: {
                type: "string",
                title: "New Password",
                minLength: 4,
                description: "Enter your New password"
            }
        },
        "required": ["oldPassword", "newPassword"]
    };

    $scope.form = [
        {
            "type": "password",
            "key": "oldPassword", "placeholder": "Enter your old password"
        }, {
            "type": "password",
            "key": "newPassword", "placeholder": "Enter your new password"
        },
        {
            type: "actions",
            items: [
                { type: 'submit', title: 'Save', "style": "btn-success" },
                { type: 'button', title: 'Cancel', onClick: "cancel()", "style": "btn-danger" }
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


            $rootScope.loader = true;
            $rootScope.innerDiv = false;
            $log.log($scope.model);
            let obj = {};
            obj.password = $scope.model.newPassword;
            obj.id = $scope.session.id;
            $log.log("before update", obj);
            $scope.updateAdminPass = adminApis.updateEmployee(obj);
            $scope.updateAdminPass.then(function (res) {
                $rootScope.$broadcast('snackbarSucc', "Your Password Updated Successfully!");
                $scope.model = {};
                $scope.$broadcast('schemaFormRedraw');
                $rootScope.loader = false;
                $rootScope.innerDiv = true;
            }, function (err) {
                $rootScope.$broadcast('snackbarError',"some error occurred!, Please try again");
            })


            // ... do whatever you need to do with your data.
        }
    }

}]);