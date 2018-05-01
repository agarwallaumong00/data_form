(function() {
    'use strict';

    var myApp = angular.module('concerto', ['ngMaterial']);

    myApp.controller('concertoController', ['$scope', '$mdDialog', function($scope, $mdDialog) {
        var vm = $scope;
        vm.questions;
        vm.asnwers;
        var a = 0;

        vm.obj = {
            url: "",
            question: [

            ]
        };

        vm.disableAddBtn = function() {
            if(Object.keys(vm.variantQS).length>0 && vm.qa.answer.length>0) {
                return false;
            } else {
                return true;
            }
        }

        vm.removeVariant = function(value) {
           var index = vm.variantsArr.indexOf(value);
           vm.variantsArr.splice(index, 1);
           delete vm.variantQS[value];
        }

        vm.addQA = function() {
            for(var key in vm.variantQS) {
                vm.qa.qs.push(vm.variantQS[key])
            };
            vm.obj.question.push(vm.qa);
            init();
        }

        vm.addQuestionVariant = function(qs, ans) {
            a++;
            vm.variantsArr.push(a);
        }

        vm.view = function(ev) {
            $mdDialog.show({
                controller: dialogController,
                templateUrl: 'dialog.template.html',
                targetEvent: ev,
                clickOutsideToClose: false,
                locals: {
                    params: vm.obj
                }
            })
        }

        function init() {
            vm.variantsArr = [];
            vm.variantsArr.push(a);
            vm.variantQS = {};
            vm.qa = {
                qs: [],
                answer: ""
            };
        }

        init();

        function dialogController($scope, locals) {
            var ctrl = $scope;
            ctrl.data = locals.params

            ctrl.cancel = function() {
                $mdDialog.cancel();
            }

            ctrl.getKeys = function(obj) {
                vm.keys = Object.keys(obj);
            }

        }

    }])
})()