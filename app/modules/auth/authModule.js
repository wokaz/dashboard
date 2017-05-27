/**
 * Created by Andrew on 9/7/16.
 */

angular.module('masikini_mobile.auth',['masikini_mobile.auth.controllers','masikini_mobile.auth.services'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('auth',{
            url:'/auth',
            controller:'AuthController',
            abstract:true,
            //resolve: {
            //    user: ['userService', '$q', function (userService, $q) {
            //        if (userService.user) {
            //            return $q.reject({authorized: true});
            //        }
            //    }]
            //},
            templateUrl:'modules/auth/home.html'
        }).state('auth.login',{
            url:'/login',
            controller: 'LoginController',
            templateUrl: 'modules/auth/views/login.html'
        })
    }]);