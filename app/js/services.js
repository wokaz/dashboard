/**
 * Created by Andrew on 9/6/16.
 */

angular.module('okoa.services',[])
    .service('urlProvider',function () {
        this.apiEndPoint = "http://127.0.0.1/api/";
        this.session_timeout = 600;
    })
    .factory('userService',['dataStore', function (dataStore) {
        var userStore = {};

        userStore.get = function(){
            userStore.user = dataStore.getUser();
            return dataStore.getUser();
        };

        return userStore;
    }])
    .factory('httpInterceptor',['$rootScope','$interval', function ($rootScope) {
        return {
            request :function(config) {
                //console.log('The counter',$rootScope.counter);
                //console.log("Initial :::",new Date().toLocaleTimeString());
                $rootScope.$broadcast('session_checkin','session timeout');
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

    }])
    .factory('theSocketer',['$websocket', function ($websocket) {
        // Open a WebSocket connection
        var dataStream = $websocket('ws://localhost:8001/echo');

        var collection = [];

        dataStream.onMessage(function(message) {
            collection.push(JSON.parse(message.data));
            console.log('Socket message',angular.fromJson(message.data));
        });

        dataStream.onOpen(function () {
            console.log('Socket open');
        });

        dataStream.onClose(function(event){
            console.log('Socket closed ::',event);
        });

        return {
            collection: collection,
            get: function() {
                dataStream.send(JSON.stringify({ action: 'get' }));
            }
        };

    }]);