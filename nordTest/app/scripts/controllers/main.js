'use strict';

angular.module('nordTestApp')
  .controller('MainCtrl', function ($scope, persons) {
        $scope.persons = false;
        $scope.noPersons = $scope.persons=={};
        $scope.order='id';
        $scope.error=false;
        var newID = 1,
            newPerson;

        persons.getPersons().then(
            function(data) {
                $scope.persons = data;
            },
            function(reason) {});

        $scope.addPerson = function() {

            /*function newID() {
                var newID = 1;


                *//*
                 * loop through the IDs until a free ID is found
                 *//*
                while (!!$scope.persons[newID]) {
                    newID++;
                }

                return newID;

            }

            newPerson = {
                id: newID(),
                name: $scope.name,
                age: $scope.age,
                gender: $scope.gender
            };

            //$scope.persons.push(newPerson);
            if(!$scope.persons) {$scope.persons = {};}
            $scope.persons[newPerson.id] = newPerson;*/

            var genderInt = 1;

            if ($scope.gender === 'female') {
                genderInt = 2;
            }

            persons.addPerson($scope.name, genderInt, $scope.age).then(
                function (status) {
                    console.log(status);
                    $scope.persons = persons.getPersons();
                },
                function (reason) {
                    console.warn(reason);
                }
            );
        };


        $scope.removePerson = function(id) {
            //$scope.persons.splice(id-1, 1);


            persons.removePerson(id).then(
                function(status) {
                    //delete $scope.persons[id];
                    $scope.persons = status;
                },
                function(reason) {
                    $scope.error = reason;
                }
            );
        };



    });
