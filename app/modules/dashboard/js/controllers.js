/**
 * Created by Andrew on 9/5/16.
 */
angular.module('okoa.dashboard.controllers', [])
    .controller('MainController',['$state','dataStore','$scope','userService','$rootScope','authorizer','$interval','urlProvider','$location', function ($state,dataStore,$scope,userService,$rootScope,authorizer,$interval,urlProvider,$location) {
        //console.log('The user',user);
        $rootScope.counter = urlProvider.session_timeout;

        console.log("jasjdvajd");

        $scope.logout = function () {
            //scrub info
            userService.user = undefined;
            dataStore.removeUser();
            authorizer.logout()
                .then(function (response) {
                    if(response.status){
                        dataStore.remove("returnTo");
                        dataStore.localStore("returnTo",$location.path());
                        $state.go('auth.login');
                    }else{
                        console.log('logout failed');
                    }
                });
        };

        var timer = $interval(function () {
            $rootScope.counter += -1;
            //console.log('counter ::', $rootScope.counter);
            //console.log('Current path ::',$location.path());
            if($rootScope.counter < 0){
                console.log("Session timed out :::",new Date().toLocaleTimeString());
                $interval.cancel(timer);
                dataStore.localStore("session_timedout",true);
                $scope.logout();
            }

        }, 1000);

        $scope.$on('session_checkin', function (event,data) {
            //$scope.logout();
            //$interval.cancel(timer);
            $rootScope.counter = urlProvider.session_timeout;
            console.log("Session Start :::",new Date().toLocaleTimeString());
        });

    }])
    .controller('DashboardController',['$state','$scope', function ($state,$scope) {
        //console.log('The user');
        $scope.title = "Dashboard";
        $scope.hhead = "head";
    }]);