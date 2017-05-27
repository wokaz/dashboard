/**
 * Created by Andrew on 9/7/16.
 */
angular.module('masikini_mobile.auth.controllers',[])
    .controller('AuthController',['$scope','$rootScope', function ($scope,$rootScope) {
        //console.log('Running smoothly');
    }])
    .controller('LoginController',['$scope','$state','authorizer','dataStore','userService','Facebook', function ($scope,$state,authorizer,dataStore,userService,Facebook) {
        $scope.title = "Admin Login";
        $scope.buttonText = "Login";
        $scope.credentials = {};
        $scope.session_timedout = dataStore.localGet("session_timedout");

        var tt = dataStore.localGet("returnTo");
        if(angular.isUndefined(tt) || tt === "" || tt === null){
            console.log("passed");
        }

        $scope.login = function(){
            $scope.loading = true;
            dataStore.remove('session_timedout');
            dataStore.localStore('session_timedout',false);
        };

        $scope.fbLogin = function(){
            Facebook.login(function (response) {
                console.log('FB response ::',response);
            })
        };

        $scope.getLoginStatus = function(){
            Facebook.getLoginStatus(function (response) {
                if(response.status === 'connected'){
                    //$scope.loggedIn = true;
                    console.log('Fb logged in');
                    $scope.me();
                }else{
                    //$scope.loggedIn = false;
                    console.log('Fb log in failed');
                }
            })
        };

        $scope.me = function() {
            Facebook.api('/me', function(response) {
                var fbuser = response;
                console.log('FB user ::',fbuser);
            });
        };
}]);