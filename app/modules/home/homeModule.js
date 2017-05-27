/**
 * Created by Andrew on 4/4/17.
 */
var myApp = angular.module('okoa.home', ['okoa.home.controllers','okoa.home.services']);

myApp.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('home',{
        url: '/home',
        abstract:true,
        controller:'HomeController',
        //resolve: {
        //    user: ['userService', '$q', function (userService, $q) {
        //        return userService.user || $q.reject({unAuthorized: true});
        //    }]
        //},
        templateUrl:'modules/home/home.html'
    }).state('home.landing',{
        url:'',
        controller:'LandingController',
        templateUrl: 'modules/home/views/landing.html'
    }).state('home.login',{
        url:'/login',
        controller:'LoginController',
        templateUrl: 'modules/home/views/login.html'
    }).state('home.register',{
        url:'/register',
        controller:'RegisterController',
        templateUrl: 'modules/home/views/register.html'
    })
}]);