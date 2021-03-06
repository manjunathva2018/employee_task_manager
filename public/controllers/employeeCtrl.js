app.controller('employeeCtrl', ['$scope', '$rootScope', 'adminApis', '$log', 'storageService',
    function ($scope, $rootScope, adminApis, $log, storageService) {

        $scope.session = JSON.parse(storageService.getSessionStorage("authData"));
        $rootScope.$broadcast('notLoggedIn', $scope.session);
        $rootScope.loadPage("dashboard",$scope.session.roleType);
        
        $rootScope.hideLoader();
       
        $scope.model = {};

        $scope.allEmployee=function(){

            $rootScope.showLoader();
            $scope.getEmp = adminApis.getAllUsers();
            $scope.getEmp.then(function (res) {
                $scope.totalEmp = res;
                $log.log("totalEmp", $scope.totalEmp);
                $rootScope.hideLoader();
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
                $rootScope.hideLoader();
            })
        }
       

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
                $scope.model.userType=res.userType;
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
                $scope.allEmployee();
            }, function (err) {
                $log.log("emp error", err);
                $rootScope.$broadcast('snackbarError', "some error occurred!, Please try again");
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
                userType:{
                    type: "integer",
                    title: "Role Type"
                },
                doj: {
                    type: "string",
                    title: "Date of joining",
                    // "pattern": "^[0-9]{4}/[0-9]{2}/[0-9]{2}$",
                    "format": "date"
                }
            },
            "required": ["userName", "password", "email", "empId", "doj"]
        };

        $scope.form = [
            { "key": "userName",
             "placeholder": "Enter employee's username" 
            },
            {
                "type": "password",
                "key": "password",
                "placeholder": "Enter employee's password"
            },
            {
                "key": "email",
                "placeholder": "Enter employee's email"
            },
            {
                "key": "empId",
                "placeholder": "Enter employee's Id"
            },
            {
                "key": "userType",
                "placeholder": "Enter user role",
                "type": "select",
                "titleMap": [
                 { value: 0, name: "Super Admin" },
                  { value: 1, name: "Admin" },
                  { value: 2, name: "User"},
                  { value: 3, name: "Guest"}
                ]
              },
            {
                "key": "doj",
                "placeholder": "yyyy/mm/dd",
                "minDate": "2000-01-01",
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
                $rootScope.showLoader();
                let obj = {};
                obj.id = $scope.model.id;
                obj.userName = $scope.model.userName;
                obj.password = $scope.model.password;
                obj.emailId = $scope.model.email;
                obj.employeeId = $scope.model.empId;
                obj.dateOfJoining = $scope.model.doj;
                obj.userType = $scope.model.userType;
                $log.log("obj:", obj);
                $scope.updateEmp = adminApis.updateEmployee(obj);
                $scope.updateEmp.then(function (res) {
                    $rootScope.$broadcast('snackbarSucc', "Employee Updated Successfully!");
                    $log.log("emp response", res);
                    $scope.model = {};
                    $scope.$broadcast('schemaFormRedraw');
                    $scope.allEmployee();
                    $rootScope.hideLoader();
                }, function (err) {
                    $rootScope.hideLoader();
                    $log.log("emp error", err);
                    $rootScope.$broadcast('snackbarError', "some error occurred!, Please try again");
                })
            }
        }


        $scope.onSubmit = function (form) {
            // First we broadcast an event so all fields validate themselves
            $scope.$broadcast('schemaFormValidate');

            // Then we check if the form is valid
            if (form.$valid) {
                $rootScope.showLoader();
                let obj = {};
                obj.userName = $scope.model.userName;
                obj.password = $scope.model.password;
                obj.emailId = $scope.model.email;
                obj.employeeId = $scope.model.empId;
                obj.dateOfJoining = $scope.model.doj;
                obj.userType = $scope.model.userType;
                $log.log("obj:", obj);
                $scope.createEmp = adminApis.createEmployee(obj);
                $scope.createEmp.then(function (res) {
                    $rootScope.$broadcast('snackbarSucc', "Employee Added Successfully!");
                    $log.log("emp response", res);
                    $scope.model = {};
                    $scope.$broadcast('schemaFormRedraw');
                    $scope.allEmployee();
                    $rootScope.hideLoader();
                    
                }, function (err) {
                    $rootScope.hideLoader();
                    $log.log("emp error", err);
                    $rootScope.$broadcast('snackbarError', "some error occurred!, Please try again");
                });
                // ... do whatever you need to do with your data.
            }
        }
    }]);