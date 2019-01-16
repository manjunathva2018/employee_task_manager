app.factory("storageService", ["$window", function ($window) {
    var getLocalStorage = function (key) {
        var value = $window.localStorage[key];
        return value;
    }
    var setLocalStorage = function (key, value) {
        $window.localStorage[key] = value;
    }
    var removeLocalStorage = function (key) {
        $window.localStorage.removeItem[key];
    }

    var clearLocalStorage=function(){
        $window.localStorage.clear();
    }

  var setSessionStorage=function(key,value){
    $window.sessionStorage.setItem(key,value)
  }

  var removeSessionStorage=function(key){
    $window.sessionStorage.removeItem(key);
  }

  var getSessionStorage=function(key){
    var value=$window.sessionStorage.getItem(key);
    return value;
  }

    return {
        getLocalStorage: getLocalStorage,
        setLocalStorage: setLocalStorage,
        removeLocalStorage: removeLocalStorage,
        clearLocalStorage:clearLocalStorage,
        setSessionStorage:setSessionStorage,
        getSessionStorage:getSessionStorage,
        removeSessionStorage:removeSessionStorage
    }
}])