app.controller('userStatusCtrl', ['$scope', '$rootScope', '$log', 'storageService', 'statusApis',
    'adminApis', 'common', 'Upload', 'fileApis', '$window', '$timeout',
    function ($scope, $rootScope, $log, storageService, statusApis, adminApis, common, Upload, fileApis, $window, $timeout) {
        $scope.session = JSON.parse(storageService.getSessionStorage("authData"));
        $rootScope.$broadcast('notLoggedIn', $scope.session);
        $rootScope.loadPage("dashboard",$scope.session.roleType);
        $rootScope.hideLoader();
        $scope.model = {};
        let allAdmins = [];

        $scope.getAdmin = function () {
            $rootScope.showLoader();
            $scope.allAdmin = adminApis.getAllByUserType(0);
            $scope.allAdmin.then(function (res) {
                if (res.length > 0) {
                    for (let i = 0; i < res.length; i++) {
                        let obj = {};
                        obj.name = res[i].userName;
                        obj.value = res[i]._id;
                        allAdmins.push(obj);
                    }
                }
                $log.log("all admin", allAdmins)
                $scope.$broadcast('schemaFormRedraw');
                $rootScope.hideLoader();
            }, function (err) {
                $rootScope.$broadcast('snackbarError', "some error occurred!, while fetching admin names");
                $rootScope.hideLoader();
            })
        }
       

        $scope.getStatus = function () {
            $rootScope.showLoader();
            $scope.status = statusApis.getStatusByUserId($scope.session.id);
            $scope.status.then(function (res) {
                $scope.getTotalStatus = res;
                $rootScope.hideLoader();
            }, function (err) {
                $scope.getTotalStatus = [];
                $rootScope.hideLoader();
            })
        }

        $scope.schema = {
            type: "object",
            properties: {
                message: {
                    type: "string",
                    title: "Message",
                    minLength: 4,
                    description: "Enter your Report Description"
                },
                stage: {
                    type: "string",
                    title: "Status Stage",
                    enum: ['In Progress', 'Completed']
                },
                reportTo: {
                    type: "string",
                    title: "Report To"
                },
                "hourlyStatus": {
                    "type": "array",
                    "title": "Hourly Status",
                    "items": {
                        "type": "object",
                        "properties": {
                            "fromTime": {
                                "title": "From Time", "type": "string"
                            },
                            "toTime": {
                                "title": "To Time", "type": "string"
                            },
                            "description": {
                                "title": "Description", "type": "string"
                            }
                        }
                    }
                },
                chooseFile: {
                    type: "string",
                    title: "File Name"
                }
            },
            "required": ["message", "stage", "reportTo"]
        };

        $scope.form = [
            {
                "type": "text",
                "key": "message",
                "placeholder": "Enter Report Description"
            }, {
                "type": "select",
                "key": "stage"
            },
            {
                "type": "tabarray",
                "title": "{{  'Hourly '+($index+1) }}",
                "key": "hourlyStatus",
                "startEmpty": true,
                "items": [
                    "hourlyStatus[].fromTime",
                    "hourlyStatus[].toTime",
                    {
                        "key": "hourlyStatus[].description",
                        "type": "textarea"
                    }
                ]
            },
            {
                "type": "select",
                "key": "reportTo",
                "titleMap": allAdmins
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
        // assignedToAdminId
        $scope.upload = function (file) {
            $log.log("file upload", file);
            //   var formData = new FormData();
            //   formData.append('statusFile', file); 

            Upload.upload({
                url: '/api/fileUpload',
                data: { statusFile: file }
            }).then(function (resp) {
                // console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                $log.log("File Uploaded successfully");
            }, function (resp) {
                console.log('Error status: ' + resp.status);
                $rootScope.$broadcast('snackbarError', "File did not upload!, Please try again");
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                // console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                $log.log('progress: ' + progressPercentage + '% ')
            });
        };

        $scope.downloadFile = function (fileName) {
            $scope.download = fileApis.downloadFile(fileName)
            $scope.download.then(function (res) {
                $log.log("file download res", res)
            }, function (err) {
                $log.log("file download err", err)
            })
            $timeout(function () {
                $window.open("/api/fileDownload/fileName/" + fileName, '_blank');
            }, 2000);

        }

        $scope.onSubmit = function (form) {
            // First we broadcast an event so all fields validate themselves
            $scope.$broadcast('schemaFormValidate');

            // Then we check if the form is valid
            if (form.$valid) {

                $rootScope.showLoader();
                $log.log($scope.model);
                let obj = {};
                obj.submitedByUser = $scope.session.userName;
                obj.userId = $scope.session.id;
                obj.message = $scope.model.message;
                obj.submittedDate = common.getCurrentDateYMD();
                obj.stage = $scope.model.stage;
                obj.hourlyStatus = $scope.model.hourlyStatus;
                obj.assignedToAdminId = $scope.model.reportTo;
                obj.fileName = $scope.model.chooseFile.name;
                obj.filePath = '/UserFileUpload/' + $scope.model.chooseFile.name;
                $scope.upload($scope.model.chooseFile);
                $log.log("before status save", obj);
                $scope.createStatus = statusApis.createStatus(obj);
                $scope.createStatus.then(function (res) {
                    $rootScope.$broadcast('snackbarSucc', "Your Status Report is  created Successfully!");
                    $scope.model = {};
                    $scope.$broadcast('schemaFormRedraw');
                    $scope.getStatus();
                    $rootScope.hideLoader();
                }, function (err) {
                    $log.log(err);
                    $rootScope.hideLoader();
                    $rootScope.$broadcast('snackbarError', "some error occurred!, Please try again");
                })

                // ... do whatever you need to do with your data.
            }
        }

    }]);