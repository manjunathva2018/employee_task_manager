app.controller('registerCtrl',['$scope','$injector','customService',function(s,i,customService){
    const h=i.get('$http'),t=i.get('$timeout'),w=i.get('$window'),st = i.get('$state'),r = i.get('$rootScope');

    s.form={newUName:"",companyName:"",email:"",newPass:"",confirmPassword:""};
     s.passVal=true;

    s.submitRegister=function(form){
        s.passVal=customService.valConfirmPassword(form.newPass,form.confirmPassword);
        console.log("confirm password",s.passVal);
        if(s.passVal==true){
            let obj={};
            obj.userName=form.newUName;
            obj.companyName=form.companyName;
            obj.email=form.email;
            obj.password=form.newPass;
            h.post('/api/user/registerDetails/create',obj).then(function(response){
            console.log("register response",response);
            },function(error){
            console.log("register error",error);
            });
            s.form={newUName:"",companyName:"",email:"",newPass:"",confirmPassword:""};
        }
       
    }
 }]);