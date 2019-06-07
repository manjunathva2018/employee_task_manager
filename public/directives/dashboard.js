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
        "<li><a ui-sref='settings'>Settings</a></li>",
      "<li class='dropdown'>",
      "<a class='dropdown-toggle' data-toggle='dropdown'>Account<span class='caret'></span></a>",
      "<ul class='dropdown-menu'>",
      "<li><a ui-sref='{{uiLink}}'><i class='fa fa-tachometer' aria-hidden='true'></i> Dashboard</a></li>",
      "<li><a ui-sref='{{roleLink}}'><i class='fa fa-user-circle-o' aria-hidden='true'</i> Profile</a></li>",
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
  "$rootScope",
  "$state",
  "storageService",
  "authApis",
  function($scope,$rootScope,$state, storageService,authApis) {
    //notification count
    $scope.totalCount = 0;

    var pagesRoles = authApis.getPageAccess();

    for (var i = 0; i < pagesRoles.length; i++) {

      if ($scope.role === pagesRoles[i].title) {
        $scope.uiLink = pagesRoles[i].menuBar[0];
        $scope.roleLink = pagesRoles[i].menuBar[1];
        $rootScope.navLogoLink = pagesRoles[i].navLogoLink;
        $scope.logout = function() {
          var value = JSON.parse(storageService.getSessionStorage("authData"));
          var obj = { id: value.id, logout: new Date() };
          $rootScope.$broadcast("logout", obj);
          storageService.removeSessionStorage("authData");
          $state.go("login");
        };
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
      "<div><ul class='nav nav-sidebar'><li class='user-data'><small><i class='fa fa-user-circle'></i> username : {{session.userName}}</small></li><li class='user-data'><small><i class='fa fa-sign-out'></i> last logout : {{session.logout | date:'dd/MM/yyyy hh:mma'}}</small></li></ul>",
        "<ul class='nav nav-sidebar'>",
      "<li ui-sref-active='active' ng-repeat='items in outData'><a ui-sref='{{items.uiLink}}' ><i class='{{items.faIcon}}' aria-hidden='true'></i> {{items.name}} <span class='sr-only'>(current)</span></a></li>",
      "</ul></div>"
    ].join("")
  };
});

app.controller('sideNavbarCtrl',['$scope','$rootScope','storageService','authApis',function($scope,$rootScope,storageService,authApis){
$scope.outData = [];
$scope.session = JSON.parse(storageService.getSessionStorage("authData"));
var pagesRoles = authApis.getPageAccess();

for (var i = 0; i < pagesRoles.length; i++) {
  if ($scope.session.roleType === pagesRoles[i].title) {
    $scope.outData=pagesRoles[i].sideNav;
  }
}
   
}])
