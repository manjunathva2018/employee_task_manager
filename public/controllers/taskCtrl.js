app.controller('taskCtrl', ['$scope', '$rootScope', '$window', '$log', 'adminApis', 'storageService', 'common', 'taskApis',
    function ($scope, $rootScope, $window, $log, adminApis, storageService, common, taskApis) {
        $scope.session = JSON.parse(storageService.getSessionStorage("admin"));
        $rootScope.$broadcast('notLoggedIn', $scope.session);
        $rootScope.loadPage("dashboard","superAdmin");
        $rootScope.hideLoader();

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
                    "type": "string",
                    "title": "Task",
                    "minLength": 4,
                    description: "Enter the task to be assigned"
                },
                title: {
                    "type": "string",
                    "title": "Title",
                    "minLength": 4,
                    description: "Enter the title of the task"
                },
                toBeCompletedBy: {
                    "type": "string",
                    "title": "End Date",
                    description: "Select the End Date of this task",
                    "format": "date"
                },
                priority: {
                    "type": "string",
                    "title": "Priority",
                    description: "Select the Priority of this task"
                }

            },
            "required": ["email", "task", "end", "priority"]
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
                "format": "yyyy-mm-dd",
                "key": "toBeCompletedBy",
                "placeholder": "yyyy/mm/dd",
                "minDate": "new Date()",
                "placeholder": "Select the end date of this task"
            },
            {
                "type": "select",
                "key": "priority",
                "placeholder": "Select the Priority of this task",
                "titleMap": {
                    "low": "Low",
                    "medium": "Medium",
                    "high": "High",
                    "emergency": "Emergency"
                }
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
            $rootScope.showLoader();
            $scope.displayTask = taskApis.displayTasks($scope.session.id);
            $scope.displayTask.then(function (res) {
                $log.log("task table res", res);
                $scope.totalTasks = res;
                $rootScope.hideLoader();

            }, function (err) {
                $log.log("task table err", err);
                $scope.totalTasks = [];
                $rootScope.hideLoader();
                $rootScope.$broadcast('snackbarError', "some error occurred on task Table !, Please try again");
            });
        }
      


        $scope.onSubmit = function (form) {
            // First we broadcast an event so all fields validate themselves
            $scope.$broadcast('schemaFormValidate');

            // Then we check if the form is valid
            if (form.$valid) {
                // ... do whatever you need to do with your data.
                $log.warn($scope.model);
                $rootScope.showLoader();
                let obj = {};
                obj.assignedBy = $scope.session.userName;
                obj.adminId = $scope.session.id;
                obj.title = $scope.model.title;
                obj.message = $scope.model.task;
                obj.priority = $scope.model.priority;
                obj.assignedOn = common.getTodayDate();
                obj.toBeCompletedBy = $scope.model.toBeCompletedBy;
                obj.assignedToId = $scope.model.email;
                $log.warn("before submit:", obj);
                $scope.createTask = taskApis.createtasks(obj);
                $scope.createTask.then(function (res) {
                    $rootScope.hideLoader();
                    $rootScope.$broadcast('snackbarSucc', "Task Added Successfully!");

                    $log.log("task response", res);
                    $scope.model = {};
                    $scope.$broadcast('schemaFormRedraw');
                    $scope.getAllTasksById();
                }, function (err) {
                    $log.error(err);
                    $rootScope.hideLoader();
                    $rootScope.$broadcast('snackbarError', "some error occurred!, Please try again");
                })
            }
        }
    }]);