app.directive("menuBar", function($compile) {
  function linkFunction(scope, element, attributes, controllers) {
      //     var temp="<div></div>";
    //    var demo=$compile(temp)(scope);
  }
  return {
    restrict: "E",
    replace: false,
    scope: {
      role: "=role",
      totalCount: "=?count"
    },
    link: linkFunction,
    controller: "menuBarCtrl",
    template: [
        "<ul class='nav navbar-nav navbar-right'>",
        "<li class='dropdown'><a class='dropdown-toggle' data-toggle='dropdown'><i class='fa fa-bell-o' aria-hidden='true'></i>",
        "<span class='badge badge-color bell-number'>{{totalCount}}</span> <span class='caret'></span></a>",
        "<ul class='dropdown-menu'>",
        "<li>nh</li>",
        "</ul> </li>",
        "<li><a>Settings</a></li>",
      "<li class='dropdown'>",
      "<a class='dropdown-toggle' data-toggle='dropdown'>Account<span class='caret'></span></a>",
      "<ul class='dropdown-menu'>",
      "<li><a ui-sref='{{uiLink}}'><i class='fa fa-tachometer' aria-hidden='true'></i> Dashboard</a></li>",
      "<li><a ng-href='{{roleLink}}'><i class='fa fa-user-circle-o' aria-hidden='true'</i> Profile</a></li>",
      "<li class='divider'></li>",
      "<li><a ng-click='logout();'><i class='fa fa-sign-out' aria-hidden='true'></i> Log Out</a></li>",
      "</ul>",
      "</li>",
      "</ul>"
    ].join("")
  };
});

app.controller("menuBarCtrl", [
  "$scope",
  "$state",
  "storageService",
  function($scope, $state, storageService) {
    $scope.totalCount = 0;
    if ($scope.role == "superAdmin") {
      $scope.uiLink = "admin";
      $scope.roleLink = "/#!/admin/profile";
      $scope.logout =function() {
        storageService.removeSessionStorage("admin");
        $state.go("login");
      };
    }
    if ($scope.role == "admin") {
      $scope.uiLink = "admin";
      $scope.roleLink = "/#!/admin/profile";
      $scope.logout = function() {
        storageService.removeSessionStorage("admin");
        $state.go("login");
      };
    }
    if ($scope.role == "user") {
      $scope.uiLink = "user";
      $scope.roleLink = "/#!/user/profile";
      $scope.logout =function() {
        storageService.removeSessionStorage("user");
        $state.go("login");
      }
    }
  }
]);

app.directive("sideNavbar", function() {
  function linkFunction(scope, elem, attrs) {}
  return {
    restrict: "E",
    replace: true,
    scope: {
      role: "=role"
    },
    link: linkFunction,
    controller:'sideNavbarCtrl' ,
    template: [
        "<ul class='nav nav-sidebar'>",
      "<li ui-sref-active='active'><a ui-sref='{{uiLink}}' ><i class='fa fa-line-chart' aria-hidden='true'></i> Overview <span class='sr-only'>(current)</span></a></li>",
      "<li ui-sref-active='active'><a ui-sref='{{uiLink1}}' ><i class='fa fa-users' aria-hidden='true'></i> Employees</a></li>",
      "<li ui-sref-active='active'><a ui-sref='{{uiLink2}}' ><i class='fa fa-tasks' aria-hidden='true'></i> Task</a></li>",
      "</ul>"
    ].join("")
  };
});

app.controller('sideNavbarCtrl',['$scope','$rootScope',function($scope,$rootScope){
    if ($scope.role == "superAdmin") {
        $scope.uiLink = "admin";
        $scope.uiLink1 = "employee";
        $scope.uiLink2 = "task";
      }
      if ($scope.role == "admin") {
        $scope.uiLink = "admin";
        $scope.uiLink1 = "employee";
        $scope.uiLink2 = "task";
      }
      if ($scope.role == "user") {
        $scope.uiLink = "user";
        $scope.uiLink1 = "userStatus";
        $scope.uiLink2 = "userTask";
      }
    
}])
