app.factory("authApis",["$http","$q","$log","storageService",function($http,$q,$log,storageService){

var checkLogin=function(data){
    var q=$q.defer();
    $http.get('/api/users/userName/'+data.userName+'/password/'+data.password).
    then(function(response){
       q.resolve(response.data.message);
    },function(error){
      q.reject(error.data.message);
    })
return q.promise;
}


var updateLogout=function(data){
  var q=$q.defer();
  $http.put('/api/users/updateLogout',data).
  then(function(response){
     q.resolve(response.data.message);
  },function(error){
    q.reject(error.data.message);
  })
return q.promise;
}


var setAuth=function(loginResp){

  var authData={};
  switch(loginResp.userType){
    case 0:authData.roleType='SUPERADMIN';
    break;
    case 1:authData.roleType='ADMIN';
    break;
    case 2:authData.roleType='USER';
    break;
    case 3:authData.roleType='GUEST';
    break;
    default:authData.roleType='GUEST';
  }
  authData.id=loginResp._id;
  authData.userName=loginResp.userName;
  authData.logout=loginResp.logout;

  storageService.setSessionStorage("authData",JSON.stringify(authData));
}

var getPageAccess = function() {
 var pagesRoles = [
    {"title":'SUPERADMIN',
     pages: [
       "employee",
       "task",
       "viewTask",
       "admin",
       "adminProfile",
       "note",
       "settings"
     ],
     sideNav: [
       {
         uiLink: "admin",
         faIcon: "fa fa-line-chart",
         name: "Overview"
       },
       {
         uiLink: "employee",
         faIcon: "fa fa-users",
         name: "Employees"
       },
       {
         uiLink: "task",
         faIcon: "fa fa-tasks",
         name: "Task"
       },
       {
        uiLink: "adminStatus",
        faIcon: "fa fa-file-text-o",
        name: "Status Report"
      },
       {
         uiLink: "note",
         faIcon: "fa fa-sticky-note-o",
         name: "Personal Notes"
       }
     ],
     menuBar: ["admin", "adminProfile"],
     navLogoLink: "/#!/admin"
   },
    {
      'title':'ADMIN',
     pages: [
       "task",
       "viewTask",
       "admin",
       "adminProfile",
       "note",
       "settings"
     ],
     sideNav: [
       {
         uiLink: "admin",
         faIcon: "fa fa-line-chart",
         name: "Overview"
       },
       {
         uiLink: "task",
         faIcon: "fa fa-tasks",
         name: "Task"
       },
       {
        uiLink: "adminStatus",
        faIcon: "fa fa-file-text-o",
        name: "Status Report"
      },
       {
         uiLink: "note",
         faIcon: "fa fa-sticky-note-o",
         name: "Personal Notes"
       }
     ],
     menuBar: ["admin", "adminProfile"],
     navLogoLink: "/#!/admin"
   },
    {'title':'USER',
     pages: [
       "user",
       "userProfile",
       "userTask",
       "viewUserTaskState",
       "userStatus",
       "note",
       "settings"
     ],
     sideNav: [
       {
         uiLink: "user",
         faIcon: "fa fa-line-chart",
         name: "Overview"
       },
       {
         uiLink: "userStatus",
         faIcon: "fa fa-file-text-o",
         name: "Status Report"
       },
       {
         uiLink: "userTask",
         faIcon: "fa fa-tasks",
         name: "Task"
       },
       {
         uiLink: "note",
         faIcon: "fa fa-sticky-note-o",
         name: "Personal Notes"
       }
     ],
     menuBar: ["user", "userProfile"],
     navLogoLink: "/#!/user"
   },
    {'title':'GUEST',
     pages: ["user", "userProfile", "note", "settings"],
     sideNav: [
       {
         uiLink: "user",
         faIcon: "fa fa-line-chart",
         name: "Overview"
       },
       {
         uiLink: "note",
         faIcon: "fa fa-sticky-note-o",
         name: "Personal Notes"
       }
     ],
     menuBar: ["user", "userProfile"],
     navLogoLink: "/#!/user"
   }
  ];
return pagesRoles;
}

return {
    checkLogin:checkLogin,
    updateLogout:updateLogout,
    setAuth:setAuth,
    getPageAccess:getPageAccess
}
}])