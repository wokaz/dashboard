angular.module('okoa.dashboard.services', [])
    .factory('dataService',['$http','urlProvider', function ($http,urlProvider) {
        return{
            getUsers : function () {
                return $http({
                    method: "get",
                    url: urlProvider.apiEndPoint+"getUsers"
                }).then(function(response){
                    return response.data;
                });
            },
            pendingApprovals : function () {
                return $http({
                    method: "get",
                    url: urlProvider.apiEndPoint+"pendingApprovals"
                }).then(function(response){
                    return response.data;
                });
            },
            initData : function () {
                return $http({
                    method: "get",
                    url: urlProvider.apiEndPoint+"initData"
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
