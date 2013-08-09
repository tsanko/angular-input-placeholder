
app.directive('ngPlaceholder', function () {

    var i = document.createElement('input');
    if (i.hasOwnProperty('placeholder')) {
        return {};
    }

    return {
        restrict: 'A',
        require: 'ngModel',
        // Don't isolate the scope as this directive modifies DOM outside the element's scope.
        //scope: {},
        compile: function (element, attrs) {

            element.parent().append('<div class="placeholder" ng-click="setFocusFor(\'' + attrs.ngModel + '\')">{{ placeholder' + attrs.ngModel + ' }}</div>');

            return function (scope) {

                scope.$parent['placeholder' + attrs.ngModel] = element.attr('placeholder');

                scope.$parent.setFocusFor = function (model) {
                    angular.element('input[ng-model=' + model + ']').focus();
                };

                element.on('keyup', function () {
                    scope.$apply(function () {
                        scope.$parent['placeholder' + attrs.ngModel] = (element.val() === '') ? element.attr('placeholder') : scope.$parent['placeholder' + attrs.ngModel] = '';
                    });

                }).on('blur', function () {
                        if (element.val() === '') {
                            scope.$apply(function () {
                                scope.$parent['placeholder' + attrs.ngModel] = element.attr('placeholder');
                            });
                        }
                    });
            };
        }
    };
});