/**
 * Created by Andrew on 10/18/16.
 */
angular.module('masikini_mobile.filters', [])
    .filter('reverse', [function () {
        return function(string){
            return string.split('').reverse().join('');
        }
    }])
    .filter('locationProcessor', [function (){
        return function (loc){}
    }]);