'use strict';

// Declare app level module which depends on views, and components
angular.module('okoa', [
    'ui.router', 'LocalStorageModule','okoa.dashboard','okoa.services','okoa.home','xeditable','ngSanitize','ngMessages'
])
    .config(['$locationProvider', 'localStorageServiceProvider','$httpProvider', function ($locationProvider, localStorageServiceProvider,$httpProvider) {
        //$locationProvider.hashPrefix('!');

        //configure local storage
        localStorageServiceProvider
            .setPrefix('okoa')
            .setStorageType('localStorage');

        //configure $http
        $httpProvider.defaults.headers.post = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        $httpProvider.defaults.headers.put = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };

        //set interceptors
        $httpProvider.interceptors.push('httpInterceptor');

    }])
    .run(['$state','$rootScope','userService','dataStore','editableOptions', function ($state,$rootScope,userService,dataStore,editableOptions) {
        console.log('Okoa running');

        //load default view
        $state.go('dashboard.dashboard');
        //$state.go('home.landing');

        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {

            if(error.unAuthorized) {
                console.log('Unauthorized');
                $state.go('auth.login');
            }
            else if(error.authorized){
                console.log('Authorized');
                $state.go('home.dashboard');
            }else{
                console.log("State change failed");
            }
        });

        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams, error) {

            dataStore.setParentActivity(fromState.name);
        });

        $rootScope.back = function(){
            console.log('function called');
            $state.go(dataStore.getParentActivity());
        };

        userService.user = dataStore.getUser();

        //configure xeditable
        editableOptions.theme = 'bs3';


    }]);
