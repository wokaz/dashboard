/**
 * Created by Andrew on 4/4/17.
 */
angular.module('okoa.home.services', [])
    .factory('authenticator', ['$http', function ($http) {
        //
    }])
    .factory('searchService', ['$http','urlProvider', function ($http,urlProvider) {
        return {
            amSearch : function(query,page,limit,domain){
                return $http({
                    method: "get",
                    url: urlProvider.apiEndPoint+"search/am/"+query+"?page="+page+"&limit="+limit+"&domain="+domain,
                    data: "page="+page+
                    "&limit="+limit+
                    "&domain="+domain
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