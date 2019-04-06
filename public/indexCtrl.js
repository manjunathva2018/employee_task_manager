var app = angular.module("mainApp", [
  "ui.router",
  "ngRoute",
  "ngSanitize",
  "schemaForm",
  "ngFileUpload"
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

  var userStatusUpload = {
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
  function ($scope, $log, $window, $rootScope, $state, $timeout, storageService) {
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
      var obj = {
        "superAdmin": {
          "navLogoLink": {
            "code": "/#!/admin"
          }
        },
        "admin": {},
        "user": {
          "navLogoLink": {
            "code": "/#!/user"
          }
        }

      }

      if (locationName == 'dashboard' && role == 'superAdmin') {
        $rootScope.navLogoLink = obj.superAdmin.navLogoLink.code;
      }
      if (locationName == 'dashboard' && role == 'admin') { }
      if (locationName == 'dashboard' && role == 'user') {
        $rootScope.navLogoLink = obj.user.navLogoLink.code;
      }
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


  }
]);


// function snackbarSucc() {
//   var x = document.getElementById()
//   x.className = "show";
//   setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
// }
