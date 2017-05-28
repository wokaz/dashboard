/**
 * Created by Andrew on 9/5/16.
 */
angular.module('okoa.dashboard.controllers', [])
    .controller('MainController',['$state','dataStore','$scope','userService','$rootScope','authorizer','$interval','urlProvider','$location', function ($state,dataStore,$scope,userService,$rootScope,authorizer,$interval,urlProvider,$location) {
        //console.log('The user',user);
        $rootScope.counter = urlProvider.session_timeout;
        $scope.rData = dataStore.localGet('registerData');

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
                //dataStore.localStore("session_timedout",true);
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

        console.log('Group code ::',dataStore.localGet('sacco_code'));
        $scope.rData = dataStore.localGet('registerData');
        console.log('Register data ::',$scope.rData);

        $scope.getInitData = function(){
            $scope.loading = true;
            dataService.initData()
                .then(function (response) {
                    $scope.loading = false;
                    console.log("Init response ::",response);
                    if(response.accepted){
                        $scope.callSuccess =true;
                        $scope.summary = response.data;
                    }else{
                        $scope.callFail = true;
                        $scope.callError = response.description;
                    }
                }, function (err) {
                    console.log("users call error ::",err);
                    $scope.loading = false;
                    $scope.callFail = true;
                    $scope.callSuccess = false;
                    $scope.callError = response.statusText;
                })
        };

        $scope.getInitData();

        $scope.getProfileSummary = function () {
            $scope.p_loading = true;
            dataService.groupSummary()
                .then(function (response) {
                    console.log("Group summary ::",response);
                    $scope.p_loading = false;
                    if(response.accepted){
                        dataStore.localStore('profile',response.data);
                        $scope.profile = response.data
                    }else{
                        $scope.p_callFail = true;
                    }
                })
        };

        $scope.getProfileSummary();
    }])
    .controller('UsersController',['$state','$scope','dataService','dataStore','NgTableParams','transactionService','toastr', function ($state,$scope,dataService,dataStore,NgTableParams,transactionService,toastr) {
        $scope.title = "Users";
        var users = [];
        //toastr.success("Yay");

        $scope.getUsers = function () {
            $scope.loading  = true;
            dataService.getUsers()
                .then(function (response) {
                    console.log('users response ::',response);
                    $scope.loading = false;
                    if(response.accepted){
                        $scope.callSuccess = true;
                        users = response.data;

                        $scope.tableParams = new NgTableParams({}, {
                            dataset: users
                        });
                    }else{
                        $scope.callFail = true;
                        $scope.callError = response.description;
                    }
                }, function (err) {
                    console.log("users call error ::",err);
                    $scope.loading = false;
                    $scope.callFail = true;
                    $scope.callSuccess = false;
                    $scope.callError = response.statusText;
                })
        };

        $scope.getUsers();

        $scope.approve = function(data){
            var updateData = {};
            updateData.phone = data.phone;
            updateData.approved = true;
            $scope.u_loading = true;
            transactionService.updateUser(updateData)
                .then(function (response) {
                    $scope.u_loading = false;
                    if(response.accepted){
                        toastr.success(response.description);
                        $scope.u_callSuccess = true;
                        $scope.u_callMessage = response.description;
                    }else{
                        toastr.error(response.description);
                        $scope.u_callFail = true;
                        $scope.u_callError = response.description;
                    }
                }, function (err) {
                    toastr.error(response.description);
                    $scope.u_loading = false;
                    $scope.u_callFail = true;
                    $scope.u_callError = err.statusText;
                })
        }
    }])
    .controller('LoansController',['$state','$scope','dataService','NgTableParams','transactionService','toastr', function ($state,$scope,dataService,NgTableParams,transactionService,toastr) {
        $scope.title = "Loans";
        var loans = [];

        $scope.getLoans = function(){
            $scope.loading = true;
            dataService.getLoans()
                .then(function (response) {
                    if(response.accepted){
                        $scope.callSuccess = true;
                        loans = response.data;
                    }else{
                        $scope.callFail = true;
                        $scope.callError = response.description;
                    }
                }, function (err) {
                    $scope.loading = false;
                    $scope.callFail = true;
                    $scope.callSuccess = false;
                    $scope.callError = err.statusText;
                })
        };

        $scope.getLoans();

        $scope.approve = function(data){
            var updateData = {};
            updateData.phone = data.phone;
            updateData.approved = true;
            transactionService.approveLoan(updateData)
                .then(function (response) {
                    $scope.u_loading = false;
                    if(response.accepted){
                        toastr.success("Yay " + response.description);
                    }else{
                        toastr.error("Error !" + response.description);
                    }
                })
        };
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