app.directive('ngPlaceholder', ['$timeout', function ($timeout) {

    var i = document.createElement('input');
    if (i.hasOwnProperty('placeholder')) {
        return {};
    }

    return {
        restrict: 'A',
        scope: {},
        compile: function (element) {

            element.append('<div class="placeholder" ng-click="setInput()">{{ placeholder }}</div>');

            return function (scope) {
                // get the placeholder value from included element
                var input = element.find('input');

                scope.placeholder = input.attr('placeholder');

                scope.setInput = function () {
                    $timeout(function () {
                        input.focus();
                    });
                };

                input.bind('keyup', function () {
                    scope.$apply(function () {
                        scope.placeholder = (input.val() === '') ? input.attr('placeholder') : scope.placeholder = '';
                    });

                }).bind('blur', function () {
                    if (input.val() === '') {
                        scope.$apply(function () {
                            scope.placeholder = input.attr('placeholder');
                        });
                    }
                });
            };
        }
    };
}]);
