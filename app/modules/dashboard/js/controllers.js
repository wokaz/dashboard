/**
 * Created by Andrew on 9/5/16.
 */
angular.module('okoa.dashboard.controllers', [])
    .controller('MainController',['$state','dataStore','$scope','userService','$rootScope','authorizer','$interval','urlProvider','$location', function ($state,dataStore,$scope,userService,$rootScope,authorizer,$interval,urlProvider,$location) {
        //console.log('The user',user);
        $rootScope.counter = urlProvider.session_timeout;

        $scope.logout = function () {
            //scrub info
            userService.user = undefined;
            dataStore.removeUser();
            $state.go('home.login');
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
    .controller('DashboardController',['$state','$scope','dataStore','dataService', function ($state,$scope,dataStore,dataService) {
        //console.log('The user');
        $scope.title = "Dashboard";

        console.log('User token ::',dataStore.localGet('token'));
        console.log('Group code ::',dataStore.localGet('sacco_code'));

        $scope.getInitData = function(){
            $scope.loading = true;
            dataService.initData()
                .then(function (response) {
                    $scope.loading = false;
                    console.log("Init response ::",response);
                })
        };

        $scope.getInitData();
    }])
    .controller('UsersController',['$state','$scope','dataService','dataStore', function ($state,$scope,dataService,dataStore) {
        $scope.title = "Users";

        console.log("user token ::" + dataStore.localGet('token'));
    }])
    .controller('LoansController',['$state','$scope','dataService', function ($state,$scope,dataService) {
        $scope.title = "Loans";
    }])
    .controller('LogoutController',['$state','$scope','userService','dataStore', function ($state,$scope,userService,dataStore) {
        $scope.title = "Logout";

        userService.user = undefined;
        dataStore.removeUser();
        $state.go('home.login');
    }])
    .controller('SettingsController',['$state','$scope','transactionService', function ($state,$scope,transactionService) {
        console.log('Settings pom pom');
        $scope.title = "Settings";

        $scope.settings = {};
        $scope.updateData = {};
        $scope.settings.description = "SAC DIS";
        $scope.settings.spendable = 6;

        //validate
        $scope.valSpendable  = function(data){
            if(data < 5 || data > 10){
                return "The allowable range is between 5-10 %";
            }
        };

        $scope.updateSettings = function () {
            $scope.loading = true;
            transactionService.updateSettings($scope.updateData)
                .then(function (response) {
                    $scope.loading = false;
                    if(response.success){
                        $scope.callSuccess = true;
                    }else{
                        $scope.callFail = true;
                        $scope.callError = response.message;
                    }
                }, function (err) {
                    $scope.loading = false;
                    $scope.callFail = true;
                    $scope.callSuccess = false;
                    $scope.callError = err.statusText;
                })
        }

    }]);