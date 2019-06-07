var app = angular.module("mainApp", [
  "ui.router",
  "ngRoute",
  "ngSanitize",
  "schemaForm",
  "ngFileUpload",
  "schemaForm-tinymce"
]);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
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

var viewTaskState={
  name:'viewTask',
  url:"/task/:taskId",
 templateUrl:"./views/viewTask.html",
 controller:"viewTaskCtrl"
}

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

  var userTaskState = {
    name: "userTask",
    url: "/userTask",
    templateUrl: "./views/userTask.html",
    controller: "userTaskCtrl"
  }

  var viewUserTaskState={
    name:"viewUserTaskState",
    url:"/userTask/:userTaskId",
    templateUrl: "./views/viewUserTask.html",
    controller: "viewUserTaskCtrl"
  }

  var userStatusUpload = {
    name: "userStatus",
    url: "/userStatus",
    templateUrl: "./views/userStatus.html",
    controller: "userStatusCtrl"
  }

  var adminStatusState={
    name: "adminStatus",
    url: "/adminStatus",
    templateUrl: "./views/adminStatus.html",
    controller: "adminStatusCtrl"
  }

  var viewStatusState={
    name: "viewStatus",
    url:"/status/:statusId",
    templateUrl: "./views/viewStatus.html",
    controller: "viewStatusCtrl"
  }

  var noteState = {
    name: "note",
    url: "/note",
    templateUrl: "./views/note.html",
    controller: "noteCtrl"
  }

  var settingsState={
    name: "settings",
    url: "/settings",
    templateUrl: "./views/settings.html",
    controller: "settingsCtrl"
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
  $stateProvider.state(adminStatusState);
  $stateProvider.state(viewStatusState);
  $stateProvider.state(viewTaskState);
  $stateProvider.state(viewUserTaskState);
  $stateProvider.state(noteState);
  $stateProvider.state(settingsState);
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
  "authApis",
  function ($scope, $log, $window, $rootScope, $state, $timeout, storageService,authApis) {
    $rootScope.locationName = "login";
    $rootScope.showLoader = function () {
      $rootScope.loader = true;
      $rootScope.innerDiv = false;
    }
    $rootScope.showLoader();

    $rootScope.hideLoader = function () {
      $rootScope.loader = false;
      $rootScope.innerDiv = true;
    }

    $rootScope.loadPage = function (locationName, role) {
      $rootScope.locationName = locationName;
      $rootScope.role = role;
    }

    $rootScope.navbarName = $window.localStorage["nickName"];
    if ($rootScope.navbarName == null || $rootScope.navbarName == undefined) {
      $rootScope.navbarName = "Enter your nick name";
    }

    $rootScope.changeNickName = function (nickName) {
      $window.localStorage["nickName"] = nickName;
      $rootScope.navbarName = $window.localStorage["nickName"];
      // $log.log("changeNickName", $rootScope.navbarName);
    };

    $rootScope.$on('snackbarSucc', function (event, message) {
      $rootScope.succMessage = message;
      var ele = angular.element("#snackbarSuccess");
      ele.addClass("show");
      $timeout(function () {
        ele.removeClass("show");
      }, 5000)
    })

    $rootScope.$on('snackbarError', function (event, message) {
      $rootScope.errMessage = message;
      var ele = angular.element("#snackbarError");
      ele.addClass("show");
      $timeout(function () {
        ele.removeClass("show");
      }, 5000)
    })

    $rootScope.$on('notLoggedIn', function (event, data) {
      $log.log("from notLoggedIn event", data);
      if (data === null || data === undefined) {
        $state.go('login');
      }
    });

    $rootScope.$on('logout',function(event,data){
      $log.log("from Logout event", data);
      authApis.updateLogout(data).then(function(resp){
        $log.log("Loggout out successfully", resp);
      },function(err){
        $log.log("error while Logging out", err);
      })
    });


  }
]);


// function snackbarSucc() {
//   var x = document.getElementById()
//   x.className = "show";
//   setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
// }
