var app = angular.module("mainApp", [
  "ui.router",
  "ngRoute",
  "ngSanitize",
  "schemaForm",
  "ngFileUpload"
]);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  var loginState = {
    name: "login",
    url: "/login",
    templateUrl: "./views/login.html",
    controller: "loginCtrl"
  };
  var employeeState = {
    name: "employee",
    url: "/employee",
    templateUrl: "./views/employee.html",
    controller: "employeeCtrl"
  };
  var taskState = {
    name: "task",
    url: "/task",
    templateUrl: "./views/task.html",
    controller: "taskCtrl"
  };
  var adminState = {
    name: "admin",
    url: "/admin",
    templateUrl: "./views/admin.html",
    controller: "adminCtrl"
  };
  var adminProfileState = {
    name: "adminProfile",
    url: "/admin/profile",
    templateUrl: "./views/adminProfile.html",
    controller: "adminProfileCtrl"
  };

  var userState = {
    name: "user",
    url: "/user",
    templateUrl: "./views/user.html",
    controller: "userCtrl"
  };

  var userProfileState = {
    name: "userProfile",
    url: "/user/profile",
    templateUrl: "./views/userProfile.html",
    controller: "userProfileCtrl"
  };

var userTaskState={
  name: "userTask",
  url: "/userTask",
  templateUrl: "./views/userTask.html",
  controller: "userTaskCtrl"
}

var userStatusUpload={
  name: "userStatus",
  url: "/userStatus",
  templateUrl: "./views/userStatus.html",
  controller: "userStatusCtrl"
}

  $urlRouterProvider.otherwise("/login");
  $stateProvider.state(loginState);
  $stateProvider.state(employeeState);
  $stateProvider.state(taskState);
  $stateProvider.state(adminState);
  $stateProvider.state(adminProfileState);
  $stateProvider.state(userState);
  $stateProvider.state(userTaskState);
  $stateProvider.state(userProfileState);
  $stateProvider.state(userStatusUpload);
  $locationProvider.hashPrefix("!");
});

app.controller("mainCtrl", [
  "$scope",
  "$log",
  "$window",
  "$rootScope",
  "$state",
  "$timeout",
  "storageService",
  function($scope, $log, $window, $rootScope,$state,$timeout,storageService) {
    $rootScope.locationName = "login";
    $rootScope.loader = true;
    $rootScope.innerDiv = false;

    $rootScope.navbarName = $window.localStorage["nickName"];
    if ($rootScope.navbarName == null || $rootScope.navbarName == undefined) {
      $rootScope.navbarName = "Enter your nick name";
    }

    // $log.log("nickName", $rootScope.navbarName);

    $rootScope.changeNickName = function(nickName) {
      $window.localStorage["nickName"] = nickName;
      $rootScope.navbarName = $window.localStorage["nickName"];
      // $log.log("changeNickName", $rootScope.navbarName);
    };

    $scope.activateState = function(state) {
      if (state == "admin") {
        $rootScope.adminState = true;
        $rootScope.employeeState = false;
        $rootScope.taskState = false;
        console.log("adminState", $rootScope.adminState);
      } else if (state == "employee") {
        $rootScope.employeeState = true;
        $rootScope.adminState = false;
        $rootScope.taskState = false;
        console.log("employeeState", $rootScope.employeeState);
      } else if (state == "task") {
        $rootScope.taskState = true;
        $rootScope.employeeState = false;
        $rootScope.adminState = false;

        console.log("taskState", $rootScope.taskState);
      }
      else if (state == "user") {
        $rootScope.userState = true;
        $rootScope.userStatusUpload = false;
        $rootScope.userTaskState = false;

        console.log("userState", $rootScope.userState);
      }else if (state == "userStatus") {
        $rootScope.userState = false;
        $rootScope.userStatusUpload = true;
        $rootScope.userTaskState = false;

        console.log("userStatus", $rootScope.userStatusUpload);
      }
      else if (state == "userTaskState") {
        $rootScope.userState = false;
        $rootScope.userStatusUpload = false;
        $rootScope.userTaskState = true;

        console.log("userTaskState", $rootScope.userTaskState);
      }
      
    };

    $scope.adminLogout=function(){
   storageService.removeSessionStorage("auth");
   $state.go("login");
    }

    $scope.userLogout=function(){
    storageService.removeSessionStorage("auth");
    $state.go("login");
    }

$rootScope.snackbarSucc=function(message){
  $rootScope.succMessage=message;
  var ele=angular.element("#snackbarSuccess");
  ele.addClass("show");
  $timeout(function(){
   ele.removeClass("show"); 
  },5000)
}
   
$rootScope.snackbarError=function(message){
  $rootScope.errMessage=message;
  var ele=angular.element("#snackbarError");
  ele.addClass("show");
  $timeout(function(){
   ele.removeClass("show"); 
  },5000)
}

// $rootScope.snackbarSucc("hjdkgdhggud");
// $rootScope.snackbarError("some Error Occurred");

  }
]);


// function snackbarSucc() {
//   var x = document.getElementById()
//   x.className = "show";
//   setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
// }
