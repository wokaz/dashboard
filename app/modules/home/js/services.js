/**
 * Created by Andrew on 4/4/17.
 */
angular.module('okoa.home.services', [])
    .factory('authenticator', ['$http','urlProvider', function ($http,urlProvider) {
        return {
            login : function(loginData){
                return $http({
                    method: "post",
                    url: urlProvider.apiEndPoint + "security/login",
                    //headers: {
                    //    "Content-Type": "application/json"
                    //},
                    data: loginData
                }).then(function(response){
                    return response.data;
                });
            }
        }
    }])
    .factory('registrationService', ['$http','urlProvider', function ($http,urlProvider) {
        return {
            register : function(registerData){
                return $http({
                    method: "post",
                    url: urlProvider.apiEndPoint+"setup/create",
                    data: registerData
                }).then(function(response){
                    return response.data;
                });
            }
        }
    }])
    .factory('productService', ['$http','urlProvider', function ($http,urlProvider) {
        return {
            am : function(itemId,domain){
                return $http({
                    method: "get",
                    url: urlProvider.apiEndPoint+"product/am/"+itemId+"?domain="+domain
                }).then(function(response){
                    return response.data;
                });
            }
        }
    }]);