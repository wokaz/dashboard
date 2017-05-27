/**
 * Created by Andrew on 4/4/17.
 */
/**
 * Created by Andrew on 9/5/16.
 */
angular.module('okoa.home.controllers', [])
    .controller('HomeController',['$state','dataStore','$scope','userService','$rootScope','authorizer','$interval','urlProvider','$location', function ($state,dataStore,$scope,userService,$rootScope,authorizer,$interval,urlProvider,$location) {
        //console.log('The user',user);

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

    }])
    .controller('LandingController',['$state','$scope','dataStore', function ($state,$scope,dataStore) {
        //console.log('The user');
        $scope.title = "Dashboard";
        $scope.hhead = "head";
        //dataStore.setParentActivity("home.landing");
    }])
    .controller('LoginController',['$state','$scope','dataStore','authenticator', function ($state,$scope,dataStore,authenticator) {
        //console.log('The user');
        $scope.title = "Login";
        $scope.loginData = {};
        //dataStore.setParentActivity("home.search");

        $scope.login = function(){
            console.log('Attempt to login ::' , $scope.loginData);

            $scope.loading = true;
            $state.go('dashboard.dashboard');
            //authenticator.login($scope.loginData)
            //    .then(function (response) {
            //        $scope.loading = false;
            //        if(response.success){
            //            $scope.callSuccess = true;
            //            $scope.payload = response.payload;
            //        }else{
            //            $scope.callFail = true;
            //            $scope.callError = response.message;
            //        }
            //    },function(err){
            //        $scope.loading = false;
            //        $scope.callFail = true;
            //        $scope.callSuccess = false;
            //        $scope.callError = err.statusText;
            //    })
        }
    }])
    .controller('RegisterController',['$state','$scope','dataStore','registrationService','$stateParams', function ($state,$scope,dataStore,registrationService,$stateParams) {
        //console.log('The user');
        $scope.title = "Register";
        $scope.registerData = {};

        $scope.register = function(){
            $scope.loading = true;
            console.log("registering , data ::",$scope.registerData);
            //registrationService.register($scope.registerData)
            //    .then(function (response) {
            //        $scope.loading = false;
            //        if(response.success){
            //            $scope.callSuccess = true;
            //            $scope.payload = response.payload;
            //        }else{
            //            $scope.callFail = true;
            //            $scope.callError = response.message;
            //        }
            //    },function(err){
            //        $scope.loading = false;
            //        $scope.callFail = true;
            //        $scope.callSuccess = false;
            //        $scope.callError = err.statusText;
            //    })
        }
    }])
    .controller('DetailsUSController',['$state','$scope','productService','$stateParams',function($state,$scope,productService,$stateParams){
        //set up slides
        $scope.myInterval = 4000;
        $scope.item = {};
        $scope.slides = [
            {
                image : "//unsplash.it/604/300",
                text : "image one",
                id : 0
            },
            {
                image : "//unsplash.it/602/300",
                text : "image two",
                id : 1
            },
            {
                image : "//unsplash.it/605/300",
                text : "image three",
                id : 2
            }
        ];

        $scope.title = "womens ankjdsa ajsdjasbd jahbsdsahjs dahjsvdjhasda sdvajsdvahdavsdaj";
        $scope.price = 1212121;

        $scope.getProduct = function(){
            $scope.loading = true;
            productService.am($stateParams.itemId,'us')
                .then(function (response) {
                    $scope.loading = false;
                    if(response.status){
                        $scope.callSuccess = true;
                        $scope.callFail = false;

                        $scope.item.title = response.results.title;
                        $scope.item.image = response.results.image;
                        $scope.item.price = response.results.price_;
                        $scope.item.finalCost = response.results.finalCost;
                        $scope.item.features = response.results.features;
                        $scope.item.shippingDays = response.results.shippingDays;
                    }else{
                        $scope.callSuccess = false;
                        $scope.callFail = true;
                        $scope.callError = response.message;
                    }
                })
        };

        $scope.getProduct();
    }]);