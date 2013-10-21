'use strict';

angular.module('nordTestApp', [])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .factory('persons', function($http, $q) {
        return {
            getPersons: function() {
               var dfd = $q.defer();
                $http({
                    url: 'http://localhost:8888/nordtestserver/',
                    method: 'GET',
                    params: {select: 1}
                })
                    .success(function(data) {
                        console.log(data);
                        if(!!data.error) {
                            dfd.reject(data.error) ;
                        }

                        dfd.resolve(data);
                    })
                    .error(function(reason) {
                        dfd.reject(reason);
                    });
                return dfd.promise;
            },
            addPerson: function(name, gender, age) {
                var dfd = $q.defer();
                $http({
                    url: 'http://localhost:8888/nordtestserver/',
                    method: 'POST',
                    data: {name: name, gender: gender, age: age}
                })
                    .success(function(data) {
                        console.log(data);
                        if(!!data.error) {
                            console.warn('error be found, time to reject');
                            dfd.reject(data.error) ;
                        }

                        dfd.resolve(data);
                    })
                    .error(function(reason) {
                        dfd.reject(reason);
                    });
                return dfd.promise;
            },
            removePerson: function(id) {
                var dfd = $q.defer();
                $http({
                    url: 'http://localhost:8888/nordtestserver/',
                    method: 'GET',
                    params: {remove: 1, id: id}
                })
                    .success(function(data) {
                        console.log(data);
                        if(!!data.error) {
                            console.warn('error be found, time to reject');
                            dfd.reject(data.error) ;
                        }

                        dfd.resolve(data);
                    })
                    .error(function(reason) {
                        dfd.reject(reason);
                    });
                return dfd.promise;
            }
        };
    });

angular.module('nordTestApp')
    .filter('orderObjectBy', function () {
        return function (items, field, reverse) {
            var filtered = [];
            angular.forEach(items, function (item) {
                filtered.push(item);
            });
            filtered.sort(function (a, b) {
                //console.log(field);

                if(field === 'id') {
                    return a[1] - b[1];
                } else {
                    if (a[field] > b[field]) return 1;
                    if (a[field] < b[field]) return -1;
                    return 0;
                }

            });
            if (reverse) filtered.reverse();
            return filtered;
        };
    })
    .filter('filterObjs', function () {
        return function (itemsToFilter, filterAgainst) {


            var filterRegEx = new RegExp(filterAgainst),
                filteredItems = [];
            if (filterAgainst === "" || filterAgainst == undefined) {
                return itemsToFilter;
            } else {
                for (var k in itemsToFilter) {
                    var item = itemsToFilter[k],
                        match = false;

                    console.log(item);


                    for (var attr in item) {
                        var stringItem = item[attr].toString();
                        console.log(item[attr]);
                        if (stringItem.match(filterRegEx)) {
                            item[match] = true;
                            console.log('match');
                            filteredItems.push(item);
                        }
                        break;


                    }
                }
                return filteredItems;
            }
        }
    });