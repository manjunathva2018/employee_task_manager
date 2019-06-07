app.controller('noteCtrl', ['$scope', '$rootScope', 'noteApis', 'storageService', '$log','common',
 function ($scope, $rootScope, noteApis, storageService, $log,common) {
    $scope.session = JSON.parse(storageService.getSessionStorage("authData"));
    $rootScope.$broadcast('notLoggedIn', $scope.session);
    $rootScope.loadPage("dashboard",$scope.session.roleType);
    $rootScope.hideLoader();

$scope.toggleBox=function(){
   angular.element('#noteBox').toggleClass('close-note-box');
}

$scope.initialize=function(){
   $scope.getAllNotesByUser();
}

$scope.getAllNotesByUser=function(){
   $rootScope.showLoader();
   $scope.displayNotes = noteApis.getNotesByUserId($scope.session.id);
   $scope.displayNotes.then(function (res) {
       $log.log("get All Notes by users res", res);
       $scope.totalNotes = res;
       $rootScope.hideLoader();
   }, function (err) {
       $log.log("task table err", err);
       $scope.totalNotes = [];
       $rootScope.hideLoader();
       $rootScope.$broadcast('snackbarError', "some error occurred on retrieving Notes !, Please try again");
   });
}  

$scope.schema = {
   type: "object",
   properties: {
       message: {
           type: "string",
           title: "Notes",
           minLength: 4,
           description: "Enter your Note",
           "format": "html"
       }
   },
   "required": ["message"]
};

$scope.form = [
   {
       "type": "wysiwyg",
       "key": "message", "placeholder": "Enter your Note",
       "tinymceOptions": {
        "toolbar": [
          "undo redo | styleselect | bold italic | link image",
          "alignleft aligncenter alignright"
        ],
        "height": 210
      }
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


$scope.model = {};
$scope.onSubmit = function (form) {
    // First we broadcast an event so all fields validate themselves
    $scope.$broadcast('schemaFormValidate');

    // Then we check if the form is valid
    if (form.$valid) {

        $rootScope.showLoader();
        $log.log($scope.model);
        let obj = {};
        obj.message = $scope.model.message;
        obj.userId = $scope.session.id;
        obj.createdOn=moment();
        $log.log("before save", obj);
        $scope.saveNote = noteApis.createNote(obj);
        $scope.saveNote.then(function (res) {
            $rootScope.$broadcast('snackbarSucc', "Your Note has been saved Successfully!");
            $scope.model = {};
            $scope.$broadcast('schemaFormRedraw');
            $scope.getAllNotesByUser();
            $rootScope.hideLoader();
        }, function (err) {
            $rootScope.$broadcast('snackbarError',"some error occurred!, Please try again");
            $rootScope.hideLoader();
        })
        // ... do whatever you need to do with your data.
    }
}

     $scope.deleteById = function (id) {
         $log.log("delete note id", id);
         common.confirmDialog("Are you sure, you want to delete this Note?").then(function (result) {
             $log.log("Inside Confirm", result);
             $scope.deleteNoteApi = noteApis.deleteNoteById(id);
             $scope.deleteNoteApi.then(function (res) {
                 $rootScope.$broadcast('snackbarSucc', "Note Deleted Successfully!");
                 $log.log("delete Note response", res);
                 $scope.getAllNotesByUser();
             }, function (err) {
                 $log.log("delete Note error", err);
                 $rootScope.$broadcast('snackbarError', "some error occurred!, Please try again");
             })
         }, function (result) {
             $log.log("Inside Confirm", result)
         })

     }

 }])