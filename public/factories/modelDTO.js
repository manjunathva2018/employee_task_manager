app.factory("statusApis",["$http","$q",function($http,$q){

var employeeDTO={
    "id":null,
    "userName":null,
    "password":null,
    "emailId":null,
    "employeeId":null,
    "dateOfJoining":null,
    "userType":null
}


var taskDTO={
    "_id":null,
    "assignedBy":null,
    "adminId":null,
    "title":null,
    "message":null,
    "priority":null,
    "assignedOn":null,
    "toBeCompletedBy":null,
    "assignedToId":null,
    "completedDate":null,
    "currentStatus":null
}

var statusDTO={
    "submitedByUser":null,
    "userId":null,
    "message":null,
    "submittedDate":null,
    "stage":null,
    "hourlyStatus":null,
    "assignedToAdminId":null,
    "fileName":null,
    "filePath":null
}

    return {
        employeeDTO:employeeDTO,
        taskDTO:taskDTO,
        statusDTO:statusDTO
    };
}])