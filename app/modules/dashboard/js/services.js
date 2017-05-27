/**
 * Created by Andrew on 9/5/16.
 */
angular.module('okoa.dashboard.services', [])
    .factory('dataService',['$http','urlProvider', function ($http,urlProvider) {
        return{
            mobileImages : function () {
                return $http({
                    method: "get",
                    url: urlProvider.apiEndPoint+"getMobileImages"
                }).then(function(response){
                    return response.data;
                });
            },
            webImages : function () {
                return $http({
                    method: "get",
                    url: urlProvider.apiEndPoint+"getWebImages"
                }).then(function(response){
                    return response.data;
                });
            }
        }
    }])
    .factory('transactionService',['$http','urlProvider', function ($http,urlProvider) {
        return {

        }
    }]);
