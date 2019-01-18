app.controller('userStatusCtrl', ['$scope', '$rootScope', '$log', 'storageService', 'statusApis',
    'adminApis', 'common', 'Upload', 'fileApis', '$window', '$timeout',
    function ($scope, $rootScope, $log, storageService, statusApis, adminApis, common, Upload, fileApis, $window, $timeout) {
        $scope.session = JSON.parse(storageService.getSessionStorage("user"));
        $rootScope.$broadcast('notLoggedIn', $scope.session);
        $rootScope.locationName = "user";
        $rootScope.loader = false;
        $rootScope.innerDiv = true;
        $scope.model = {};
        let allAdmin = [];
        $scope.getAdmin = function () {
            $rootScope.loader = true;
            $rootScope.innerDiv = false;
            $scope.allAdmin = adminApis.getAllAdmin();
            $scope.allAdmin.then(function (res) {
                let obj = {};
                if (res.length > 0) {
                    for (let i = 0; i < res.length; i++) {
                        obj.name = res[i].userName;
                        obj.value = res[i]._id;
                        allAdmin.push(obj);
                    }
                }
                $log.log("all admin", allAdmin)
                $scope.$broadcast('schemaFormRedraw');
                $rootScope.loader = false;
                $rootScope.innerDiv = true;
            }, function (err) {
                $rootScope.snackbarError("some error occurred!, while fetching admin names");
                $rootScope.loader = false;
                $rootScope.innerDiv = true;
            })
        }
        $scope.getAdmin();



        $scope.getStatus = function () {
            $rootScope.loader = true;
            $rootScope.innerDiv = false;
            $scope.status = statusApis.getStatusByUserId($scope.session.id);
            $scope.status.then(function (res) {
                $rootScope.loader = false;
                $rootScope.innerDiv = true;
                $scope.getTotalStatus = res;
            }, function (err) {
                $scope.getTotalStatus = [];
            })
        }

        $scope.getStatus();

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
            }, {
                "type": "select",
                "key": "reportTo",
                titleMap: allAdmin
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

                $rootScope.loader = true;
                $rootScope.innerDiv = false;
                $log.log($scope.model);
                let obj = {};
                obj.submitedByUser = $scope.session.userName;
                obj.userId = $scope.session.id;
                obj.message = $scope.model.message;
                obj.submittedDate = common.getTodayDate();
                obj.stage = $scope.model.stage;
                obj.assignedToAdminId = $scope.model.reportTo;
                obj.fileName = $scope.model.chooseFile.name;
                obj.filePath = '/UserFileUpload/' + $scope.model.chooseFile.name;
                $scope.upload($scope.model.chooseFile);
                $log.log("before status save", obj);
                $scope.createStatus = statusApis.createStatus(obj);
                $scope.createStatus.then(function (res) {
                    $rootScope.snackbarSucc("Your Status Report is  created Successfully!");
                    $scope.model = {};
                    $scope.$broadcast('schemaFormRedraw');
                    $scope.getStatus();
                    $rootScope.loader = false;
                    $rootScope.innerDiv = true;
                }, function (err) {
                    $rootScope.snackbarError("some error occurred!, Please try again");
                })


                // ... do whatever you need to do with your data.
            }
        }

    }]);