'use strict';

// Declare app level module which depends on views, and components
angular.module('okoa', [
    'ui.router', 'LocalStorageModule','okoa.dashboard','okoa.services','okoa.home','xeditable','ngSanitize','ngMessages','ngTable','toastr'
])
    .run(['$state','$rootScope','userService','dataStore','editableOptions', function ($state,$rootScope,userService,dataStore,editableOptions) {
        console.log('Okoa running');

        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
            console.log('State change error ::',error);

            if(error.unAuthorized) {
                console.log('Unauthorized');
                $state.go('home.login');
            }else if(error.authorized){
                console.log('Authorized');
                $state.go('dashboard.dashboard');
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

        //load default view
        //$state.go('dashboard.dashboard');
        $state.go('home.landing');


    }])
    .config(['$locationProvider', 'localStorageServiceProvider','$httpProvider', function ($locationProvider, localStorageServiceProvider,$httpProvider) {
        //$locationProvider.hashPrefix('!');

        //configure local storage
        localStorageServiceProvider
            .setPrefix('okoa')
            .setStorageType('localStorage');

        //configure $http
        $httpProvider.defaults.headers.post = {
            'Content-Type': 'application/json'
        };

        //set interceptors
        $httpProvider.interceptors.push('httpInterceptor');
    }])
;
