app.controller('employeeCtrl', ['$scope', '$rootScope', 'adminApis', '$log','storageService',
 function ($scope, $rootScope, adminApis, $log,storageService) {

    $scope.session = JSON.parse(storageService.getSessionStorage("admin")) ;
    $rootScope.$broadcast('notLoggedIn', $scope.session);
    $rootScope.locationName = "admin";
    $rootScope.loader = false;
    $rootScope.innerDiv = true;
    $scope.model = {};

    $scope.getEmp = adminApis.getAllEmployee();
    $scope.getEmp.then(function (res) {
        $rootScope.loader = false;
        $rootScope.innerDiv = true;
        $scope.totalEmp = res;
        $log.log("totalEmp", $scope.totalEmp);
        //    $('#empTable').DataTable();
        //    $('#empTable').DataTable({
        //     data: $scope.totalEmp,
        //     "columns": [
        //         { "data": "No" },
        //         { "data": "userName" },
        //         { "data": "emailId" },
        //         { "data": "employeeId" },
        //         { "data": "dateOfJoining" },{"data":"update"},{"data":"delete"}
        //     ]
        // });
    }, function (err) {
        $rootScope.loader = false;
        $rootScope.innerDiv = true;
        $scope.totalEmp = [];
        $log.log("totalEmp", err);
    })

    $scope.update = function (id) {
        $log.log(id);
        $scope.getSingleEmp = adminApis.getSingleEmployee(id);
        $scope.getSingleEmp.then(function (res) {
            $scope.model = {};
            $log.log("update res", res);
            $scope.model.userName = res.userName;
            $scope.model.email = res.emailId;
            $scope.model.password = res.password;
            $scope.model.empId = res.employeeId;
            $scope.model.doj = res.dateOfJoining;
            $scope.model.id = res._id;
            $log.log($scope.model);
            $scope.$broadcast('schemaFormRedraw');
        }, function (err) {
            $log.log("update err", err);
        });
    }

    $scope.delete = function (id) {
        $log.log(id);
        $scope.deleteEmp = adminApis.deleteEmployee(id);
        $scope.deleteEmp.then(function (res) {
            $rootScope.$broadcast('snackbarSucc', "Employee Deleted Successfully!");
          
            $log.log("deleteEmp response", res);
            $scope.getEmp = adminApis.getAllEmployee();
            $scope.getEmp.then(function (res) {
                $scope.totalEmp = res;
                $log.log("totalEmp", $scope.totalEmp);
                //    $('#empTable').DataTable();
                //    $('#empTable').DataTable({
                //     data: $scope.totalEmp,
                //     "columns": [
                //         { "data": "No" },
                //         { "data": "userName" },
                //         { "data": "emailId" },
                //         { "data": "employeeId" },
                //         { "data": "dateOfJoining" },{"data":"update"},{"data":"delete"}
                //     ]
                // });
            }, function (err) {
                $scope.totalEmp = [];
                $log.log("totalEmp", err);
            })

        }, function (err) {
          
            $log.log("emp error", err);
            $rootScope.$broadcast('snackbarError',"some error occurred!, Please try again");
        })
    }

    $scope.schema = {
        type: "object",
        properties: {
            userName: {
                type: "string",
                title: "Username",
                minLength: 2,
                description: "Enter employee's username"
            },
            email: {
                "title": "Email",
                "type": "string",
                "pattern": "^\\S+@\\S+$",
                "description": "Employee's Email."
            },

            password: {
                type: "string",
                title: "Password",
                minLength: 4,
                description: "Enter employee's password"
            },
            empId: {
                type: "string",
                title: "Employee Id"
            },
            doj: {
                type: "string",
                title: "Date of joining",
                "pattern": "^[0-9]{4}/[0-9]{2}/[0-9]{2}$",
            },
            dob:{
                    "title": "Date of Birth",
                    "type": "string",
                    "format": "date"  
            }
        },
        "required": ["userName", "password", "email", "empId", "doj"]
    };

    $scope.form = [
        { "key": "userName", "placeholder": "Enter employee's username" },
        {
            "type": "password",
            "key": "password",
            "placeholder": "Enter employee's password"
        }, { "key": "email", "placeholder": "Enter employee's email" },
        { "key": "empId", "placeholder": "Enter employee's Id" },
        { "key": "doj", "placeholder": "yyyy/mm/dd" },
        {
            "key": "dob",
            "minDate": "1995-09-01",
            "maxDate": new Date(),
            "format": "yyyy-mm-dd"
          },
        {
            type: "actions",
            items: [
                { type: 'submit', title: 'Save', "style": "btn-success", },
                { type: 'button', title: 'Update', "style": "btn-info", onClick: "saveUpdate(employeeForm)" },
                { type: 'button', title: 'Cancel', "style": "btn-danger", onClick: "cancel()" }
            ]
        }
    ];

    $scope.cancel = function () {
        $scope.model = {};
        $scope.$broadcast('schemaFormRedraw');
    }

    $scope.saveUpdate = function (form) {
        $scope.$broadcast('schemaFormValidate');
        if (form.$valid) {
            $rootScope.loader = true;
            $rootScope.innerDiv = false;
            let obj = {};
            obj.id = $scope.model.id;
            obj.userName = $scope.model.userName;
            obj.password = $scope.model.password;
            obj.emailId = $scope.model.email;
            obj.employeeId = $scope.model.empId;
            obj.dateOfJoining = $scope.model.doj;
            obj.userType = 1;
            $log.log("obj:", obj);
            $scope.updateEmp = adminApis.updateEmployee(obj);
            $scope.updateEmp.then(function (res) {
                $rootScope.$broadcast('snackbarSucc',"Employee Updated Successfully!");
                $log.log("emp response", res);
                $scope.model = {};
                $scope.$broadcast('schemaFormRedraw');
                $rootScope.loader = false;
                $rootScope.innerDiv = true;
                $scope.getEmp = adminApis.getAllEmployee();
                $scope.getEmp.then(function (res) {
                    $scope.totalEmp = res;
                });
            }, function (err) {
                $rootScope.loader = false;
                $rootScope.innerDiv = true;
                $log.log("emp error", err);
                $rootScope.$broadcast('snackbarError',"some error occurred!, Please try again");
            })
        }
    }


    $scope.onSubmit = function (form) {
        // First we broadcast an event so all fields validate themselves
        $scope.$broadcast('schemaFormValidate');

        // Then we check if the form is valid
        if (form.$valid) {
            $rootScope.loader = true;
            $rootScope.innerDiv = false;
            let obj = {};
            obj.userName = $scope.model.userName;
            obj.password = $scope.model.password;
            obj.emailId = $scope.model.email;
            obj.employeeId = $scope.model.empId;
            obj.dateOfJoining = $scope.model.doj;
            obj.userType = 1;
            $log.log("obj:", obj);
            $scope.createEmp = adminApis.createEmployee(obj);
            $scope.createEmp.then(function (res) {
                 
                $rootScope.$broadcast('snackbarSucc',"Employee Added Successfully!");
             
                $log.log("emp response", res);
                $scope.model = {};
                $scope.$broadcast('schemaFormRedraw');
                $scope.getEmp = adminApis.getAllEmployee();
                $scope.getEmp.then(function (res) {
                    $scope.totalEmp = res;
                    $log.log("totalEmp", $scope.totalEmp);
                    // $('#empTable').DataTable({
                    //     data: $scope.totalEmp,
                    //     "columns": [
                    //         { "data": "No" },
                    //         { "data": "userName" },
                    //         { "data": "emailId" },
                    //         { "data": "employeeId" },
                    //         { "data": "dateOfJoining" },{"data":"update"},{"data":"delete"}
                    //     ]
                    // });
                }, function (err) {
                    $scope.totalEmp = [];
                })
                $rootScope.loader = false;
                $rootScope.innerDiv = true;
            }, function (err) {
                $rootScope.loader = false;
                $rootScope.innerDiv = true;
                $log.log("emp error", err);
                $rootScope.$broadcast('snackbarError',"some error occurred!, Please try again");
            });
            // ... do whatever you need to do with your data.
        }
    }
}]);