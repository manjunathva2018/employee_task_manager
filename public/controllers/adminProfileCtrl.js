
app.controller('adminProfileCtrl', ['$scope', '$rootScope', 'adminApis', 'storageService', '$log',
 function ($scope, $rootScope, adminApis, storageService, $log) {
    $scope.session = JSON.parse(storageService.getSessionStorage("authData"));
    $rootScope.$broadcast('notLoggedIn', $scope.session);
    $rootScope.loadPage("dashboard",$scope.session.roleType);
    $rootScope.hideLoader();
   
    $scope.profileSchema = {
        type: "object",
        properties: {
            title:{
                type: "string",
                title: "Title",
                description: "Enter your Title",
                enum: ['Mr.','Mrs.','Ms.','Miss']
            },
            firstName: {
                type: "string",
                title: "First Name",
                minLength: 4,
                description: "Enter your First Name"
            }, lastName: {
                type: "string",
                title: "Last Name",
                minLength: 4,
                description: "Enter your Last Name"
            },
            profileImage: {
                type: "string",
                title: "Profile Image",
                minLength: 4,
                description: "Enter Profile Image"
            },
            language: {
                type: "string",
                title: " Mother tongue",
                minLength: 4,
                description: "Enter your First Language"
            },
            qualification:{
                type: "string",
                title: "Qualification",
                minLength: 4,
                description: "Enter your Qualification"
            },
            userName: {
                type: "string",
                title: "Username",
                minLength: 4,
                description: "Enter your old user name"
            },
            gender: {
                type: "string",
                title: "Gender",
                minLength: 4,
                description: "Enter your Gender"
            },
            dateOfBirth: {
                type: "string",
                title: "Date of Birth",
                "format": "date",
                description: "Enter Date Of Birth"
            },
            doj: {
                type: "string",
                title: "Date of joining",
                "format": "date",
                description: "Enter Date Of Joining"
            },
            empId:{
                type: "string",
                title: "Employee ID",
                minLength: 4,
                description: "Enter employee ID Number"
            },
            mobileNumber:{
                type: "string",
                title: "Mobile Number",
                minLength: 4,
                description: "Enter Mobile Number"
            },
            alternateNumber:{
                type: "string",
                title: "Alternate Number",
                minLength: 4,
                description: "Enter Alternate Number"
            },
            emailId:{
                type: "string",
                title: "Email",
                "pattern": "^\\S+@\\S+$",
                description: "Enter your Email ID"
            },
            jobDesignation:{
                type: "string",
                title: "Job Designation",
                minLength: 4,
                description: "Enter Job Designation"
            },
            workExperience:{
                type: "string",
                title: "Work Experience",
                minLength: 4,
                description: "Enter Work Experience"
            },
            address:{
                type: "object",
                title:"Address",
                properties: {
                    addressLine1:{
                        type: "string",
                        title: "Address Line 1",
                        minLength: 4,
                        description: "Enter Address"
                    },
                    addressLine2:{
                        type: "string",
                        title: "Address Line 2",
                        minLength: 4,
                        description: "Enter Address"
                    },
                    city:{
                        type: "string",
                        title: "City",
                        minLength: 4,
                        description: "Enter City"
                    },
                    state:{
                        type: "string",
                        title: "State",
                        minLength: 4,
                        description: "Enter State"
                    },
                    pincode:{
                        type: "string",
                        title: "Pincode",
                        minLength: 4,
                        description: "Enter Pincode"
                    }

                }
            },
            aboutYourSelf:{
                type: "string",
                title: "About Yourself",
                minLength: 4,
                description: "Tell about yourself"
            }
        },
        "required": ["firstName", "gender"]
    };

    $scope.cancel = function () {
        $scope.model = {};
        $scope.$broadcast('schemaFormRedraw');
    }

}]);