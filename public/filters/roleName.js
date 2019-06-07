app.filter('roleName', function() {
    return function( input ) {
        switch(input){
            case 0:return 'Super Admin';
            case 1:return 'Admin';
            case 2:return 'User';
            case 3:return 'Guest';
            default:return input;
        }
    }
   
  });