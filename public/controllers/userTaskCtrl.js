app.controller('userTaskCtrl', ['$scope', '$rootScope', '$log', 'storageService',
    'taskApis', 'adminApis',
    function ($scope, $rootScope, $log, storageService, taskApis, adminApis) {
        $scope.session = JSON.parse(storageService.getSessionStorage("user"));
        $rootScope.$broadcast('notLoggedIn', $scope.session);
        $rootScope.loadPage("dashboard","user");
        $rootScope.hideLoader();

        $scope.showTasks = function () {
            $rootScope.showLoader();
            $scope.tasksAssigned = taskApis.displayTasksByUserId($scope.session.id);
            $scope.tasksAssigned.then(function (res) {
                $scope.totalTasks = res;
                $log.log("tasksAssigned res", res);
                $rootScope.hideLoader();
            }, function (err) {
                $scope.totalTasks = [];
                $log.log("tasksAssigned err", err);
                $rootScope.hideLoader();
                $rootScope.$broadcast('snackbarError', "some error occurred!,Assigned tasks is not displayed");
            });
            // $rootScope.snackbarSucc("Your Password Updated Successfully!");
        }
        

        $scope.schema = {
            type: "object",
            properties: {
                task: {
                    "type": "string",
                    "title": "Task",
                },
                currentStatus: {
                    type: "string",
                    title: "Current Status",
                    description: "Select current status"
                },
                completedDate: {
                    "title": "Completed Date",
                    "type": "string",
                    "description": "Select completed date",
                    "format": "date"
                }
            },
            "required": ["task", "currentStatus"]
        };

        $scope.form = [
            { "type": "textarea", key: "task", readonly: true },
            {
                key: "currentStatus",
                placeholder: "select current status of the task",
                type: "select",
                titleMap: [
                    { name: "On Going", value: "onGoing" },
                    { name: "Completed", value: "completed" },
                    { name: "On Hold", value: "onHold" }
                ]
            },
            {
                "key": "completedDate",
                "placeholder": "yyyy/mm/dd",
                "minDate": "new Date()",
                "format": "yyyy-mm-dd",
                // "condition": "(model.currentStatus === 'completed')"
            },
            {
                type: "actions",
                items: [
                    { type: "submit", title: "Save", style: "btn-success" },
                    {
                        type: "button",
                        title: "Cancel",
                        style: "btn-danger",
                        onClick: "cancel()"
                    }
                ]
            }
        ];

        $scope.update = function (item) {
            $log.info(item);
            $scope.model = {};
            $scope.model.task = item.message;
            $scope.model._id = item._id
            $scope.model.title = item.title;
            $scope.model.assignedToId = item.assignedToId;
            $scope.model.assignedOn = item.assignedOn;
            $scope.model.assignedBy = item.assignedBy;
            $scope.model.adminId = item.adminId;
            if (item.completedDate != undefined && item.currentStatus != undefined) {
                $scope.model.completedDate = item.completedDate;
                $scope.model.currentStatus = item.currentStatus;
            }
            $scope.$broadcast('schemaFormRedraw');
        }

        $scope.cancel = function () {
            $scope.model = {};
            $scope.$broadcast('schemaFormRedraw');
        }

        $scope.onSubmit = function (form) {
            $scope.$broadcast('schemaFormValidate');

            // Then we check if the form is valid
            if (form.$valid) {
                $rootScope.showLoader();
                let obj = {};
                obj._id = $scope.model._id;
                obj.assignedBy = $scope.model.assignedBy;
                obj.adminId = $scope.model.adminId;
                obj.title = $scope.model.title;
                obj.message = $scope.model.task;
                obj.priority = $scope.model.priority;
                obj.assignedOn = $scope.model.assignedOn;
                obj.toBeCompletedBy = $scope.model.toBeCompletedBy;
                obj.assignedToId = $scope.model.assignedToId;
                obj.currentStatus = $scope.model.currentStatus;
                obj.completedDate = $scope.model.completedDate;
                $log.log("obj:", obj);
                $scope.updateTask = taskApis.updateTask(obj);
                $scope.updateTask.then(function (res) {
                    $rootScope.$broadcast('snackbarSucc', "Task Updated Successfully!");
                    $log.log("update task response", res);
                    $scope.model = {};
                    $scope.$broadcast('schemaFormRedraw');
                    $scope.showTasks();
                    $rootScope.hideLoader();
                }, function (err) {
                    $rootScope.hideLoader();
                    $log.error("update task error", err);
                    $rootScope.$broadcast('snackbarError', "some error occurred!, Please try again");
                });
            }
        }

    }]);
