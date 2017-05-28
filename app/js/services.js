/**
 * Created by Andrew on 9/6/16.
 */

angular.module('okoa.services',[])
    .service('urlProvider',function () {
        //this.apiEndPoint = "http://212.47.246.249:8080/";
        this.apiEndPoint = "http://192.168.1.203:8080/";
        //this.session_timeout = 600;
        this.session_timeout = 86400;
    })
    .factory('userService',['dataStore', function (dataStore) {
        var userStore = {};

        userStore.get = function(){
            userStore.user = dataStore.getUser();
            return dataStore.getUser();
        };

        return userStore;
    }])
    .factory('httpInterceptor',['$rootScope','$interval','dataStore', function ($rootScope,$interval,dataStore) {
        return {
            request :function(config) {
                $rootScope.$broadcast('session_checkin','session timeout');
                //if (dataStore.getLogin() !== null) {
                config.headers['Authorization'] = 'Bearer ' + dataStore.localGet('token');
                //config.headers.Authorization = 'Bearer ' + dataStore.localGet('token');
                //if (dataStore.localGet('token') !== null) {
                //    config.headers['Authorization'] = 'bearer ' + dataStore.localGet('token');
                //}
                return config;
            }
        }
    }])
    .factory('dataStore',['localStorageService', function (localStorageService) {
        return {
            setParentActivity : function(parent){
                if(parent.length > 0){
                    localStorageService.set('parentActivity',parent);
                }
            },
            getParentActivity : function(){
                return localStorageService.get('parentActivity');
            },
            setUser : function (user) {
                localStorageService.set('user',user);
            },
            getUser : function () {
                return localStorageService.get('user');
            },
            removeUser : function () {
                localStorageService.remove('user');
            },
            localStore : function(key,value){
                localStorageService.set(key,value);
            },
            localGet : function (key){
                return localStorageService.get(key);
            },
            remove : function (key) {
                localStorageService.remove(key);
            },
            clearAll : function(){
                return localStorageService.clearAll();
            }
        }
    }])
    .factory('authorizer',['dataStore','$http','urlProvider', function (dataStore,$http,urlProvider) {
        return {
            login : function (credentials) {
                //current password masikini_mobile
                return $http({
                    method: "post",
                    url: urlProvider.apiEndPoint+"adminLogin",
                    data:"username="+credentials.username+
                        "&password="+credentials.password
                }).then(function(response){
                    return response.data;
                });
            },
            logout : function (){
                return $http({
                    method: "get",
                    url: urlProvider.apiEndPoint+"adminLogout"
                }).then(function(response){
                    return response.data;
                });
            }
        }

    }]);