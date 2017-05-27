/**
 * Created by Andrew on 9/5/16.
 */

var myApp = angular.module('okoa.dashboard', ['okoa.dashboard.controllers','okoa.dashboard.services']);

myApp.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('dashboard',{
        url: '/dashboard',
        abstract:true,
        controller:'MainController',
        //resolve: {
        //    user: ['userService', '$q', function (userService, $q) {
        //        return userService.user || $q.reject({unAuthorized: true});
        //    }]
        //},
        templateUrl:'modules/dashboard/home.html'
    }).state('dashboard.dashboard',{
        url:'',
        controller:'DashboardController',
        templateUrl: 'modules/dashboard/views/dashboard.html'
    }).state('dashboard.settings',{
        url:'/settings',
        controller:'SettingsController',
        templateUrl:'modules/dashboard/views/settings.html'
    })
}]);