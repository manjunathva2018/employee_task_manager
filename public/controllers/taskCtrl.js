app.controller('taskCtrl', ['$scope', '$rootScope', '$window', '$log', 'adminApis', 'storageService','common', 'taskApis', 
function ($scope, $rootScope, $window, $log, adminApis, storageService, common, taskApis) {
        $scope.session = JSON.parse(storageService.getSessionStorage("admin"));
        $rootScope.$broadcast('notLoggedIn', $scope.session);
        $rootScope.locationName = "admin";
        $rootScope.loader = false;
        $rootScope.innerDiv = true;

        $scope.model = {};
        let dropDown = [];

        $scope.allEmps = adminApis.getAllEmployee();
        $scope.allEmps.then(function (res) {
            $log.log("all emps res", res);
            let total = res;
            if (total.length > 0) {
                for (let i = 0; i < total.length; i++) {
                    let obj = {};
                    obj.name = total[i].emailId;
                    obj.value = total[i]._id;
                    dropDown.push(obj);
                }
            }
            $log.log("dropdown", dropDown);
            $scope.$broadcast('schemaFormRedraw');
        }, function (err) {
            $log.log("all emps err", err);
        })

        $scope.schema = {
            type: "object",
            properties: {
                email: {
                    "title": "Email",
                    "type": "string",
                    "description": "Select employee's Email."
                },
                task: {
                    type: "string",
                    title: "task",
                    minLength: 4,
                    description: "Enter the task to be assigned"
                },
                title: {
                    type: "string",
                    title: "title",
                    minLength: 4,
                    description: "Enter the title of the task"
                }
            },
            "required": ["email", "task"]
        };


        $scope.form = [
            {
                "key": "email",
                "type": "select",
                "titleMap": dropDown
            }, {
                "key": "title", "placeholder": "Enter the title of the task"
            }, {
                "type": "textarea",
                "key": "task", "placeholder": "Enter the task to be assigned"
            },
            {
                type: "actions",
                items: [
                    { type: 'submit', title: 'Save', "style": "btn-success", },
                    { type: 'button', title: 'Cancel', "style": "btn-danger", onClick: "cancel()" }
                ]
            }
        ];

        $scope.cancel = function () {
            $scope.model = {};
            $scope.$broadcast('schemaFormRedraw');
        }


        $scope.getAllTasksById = function () {
            $rootScope.loader = true;
            $rootScope.innerDiv = false;
            $scope.displayTask = taskApis.displayTasks($scope.session.id);
            $scope.displayTask.then(function (res) {
                $log.log("task table res", res);
                $scope.totalTasks = res;
                $rootScope.loader = false;
                $rootScope.innerDiv = true;
            }, function (err) {
                $log.log("task table err", err);
                $scope.totalTasks = [];
                $rootScope.loader = false;
                $rootScope.innerDiv = true;
                $rootScope.$broadcast('snackbarError',"some error occurred on task Table !, Please try again");
            });
        }
        $scope.getAllTasksById();


        $scope.onSubmit = function (form) {
            // First we broadcast an event so all fields validate themselves
            $scope.$broadcast('schemaFormValidate');

            // Then we check if the form is valid
            if (form.$valid) {
                // ... do whatever you need to do with your data.
                $log.log($scope.model);
                $rootScope.loader = true;
                $rootScope.innerDiv = false;
                let obj = {};
                obj.assignedBy = $scope.session.userName;
                obj.adminId = $scope.session.id;
                obj.title = $scope.model.title;
                obj.message = $scope.model.task;
                obj.assignedOn = common.getTodayDate();
                obj.assignedToId = $scope.model.email;
                $log.log("before submit:", obj);
                $scope.createTask = taskApis.createtasks(obj);
                $scope.createTask.then(function (res) {
                    $rootScope.loader = false;
                    $rootScope.innerDiv = true;
                    $rootScope.$broadcast('snackbarSucc',"Task Added Successfully!");

                    $log.log("task response", res);
                    $scope.model = {};
                    $scope.$broadcast('schemaFormRedraw');
                    $scope.getAllTasksById();
                }, function (err) {
                    $log.log(err);
                    $rootScope.loader = false;
                    $rootScope.innerDiv = true;
                    $rootScope.$broadcast('snackbarError',"some error occurred!, Please try again");
                })
            }
        }
    }]);