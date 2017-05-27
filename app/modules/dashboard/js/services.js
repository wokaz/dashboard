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
            loanPendingApprovals : function () {
                return $http({
                    method: "get",
                    url: urlProvider.apiEndPoint+"loanPendingApprovals"
                }).then(function(response){
                    return response.data;
                });
            },
            initData : function () {
                return $http({
                    method: "get",
                    url: urlProvider.apiEndPoint+"account"
                }).then(function(response){
                    return response.data;
                });
            },
            transactions : function () {
                return $http({
                    method: "get",
                    url: urlProvider.apiEndPoint+"transactions"
                }).then(function(response){
                    return response.data;
                });
            }
        }
    }])
    .factory('transactionService',['$http','urlProvider', function ($http,urlProvider) {
        return {
            updateSettings : function (updateData) {
            return $http({
                method: "post",
                url: urlProvider.apiEndPoint+"updateSettings",
                data : updateData
            }).then(function(response){
                return response.data;
            });
        }
        }
    }]);
