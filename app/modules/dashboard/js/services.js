angular.module('okoa.dashboard.services', [])
    .factory('dataService',['$http','urlProvider','dataStore', function ($http,urlProvider,dataStore) {
        return{
            getUsers : function () {
                return $http({
                    method: "get",
                    url: urlProvider.apiEndPoint+"account/users"
                }).then(function(response){
                    return response.data;
                });
            },
            getLoans : function () {
                return $http({
                    method: "get",
                    url: urlProvider.apiEndPoint+"account/loans"
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
                    url: urlProvider.apiEndPoint+"account/summary"
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
            },
            groupSummary : function () {
                return $http({
                    method: "get",
                    url: urlProvider.apiEndPoint+"profile/summary"
                }).then(function(response){
                    return response.data;
                });
            }
        }
    }])
    .factory('transactionService',['$http','urlProvider', function ($http,urlProvider) {
        return {
            updateSettings: function (updateData) {
                return $http({
                    method: "post",
                    url: urlProvider.apiEndPoint + "updateSettings",
                    data: updateData
                }).then(function (response) {
                    return response.data;
                });
            },
            updateUser: function (updateData) {
                return $http({
                    method: "post",
                    url: urlProvider.apiEndPoint + "account/approve",
                    data: updateData
                }).then(function (response) {
                    return response.data;
                });
            }
        }
    }]);
