app.directive('ngPlaceholder', function () {

    return {
        restrict: 'A',
        require: 'ngModel',
        // Don't isolate the scope as this directive modifies DOM outside the element's scope.
        //scope: {},
        compile: function (element, attrs) {
            
            var i = document.createElement('input');
            if ('placeholder' in i) {
                // yay! placeholder is supported - set it!
                element.attr('placeholder', attrs.zbxPlaceholder);
                return {};
            }

            element.parent().append('<div class="placeholder" ng-click="setFocusFor(\'' + attrs.ngModel + '\')">{{ placeholder' + attrs.ngModel + ' }}</div>');

            return function (scope) {

                scope.$parent['placeholder' + attrs.ngModel] = attrs.zbxPlaceholder;

                scope.$parent.setFocusFor = function (model) {
                    angular.element('input[ng-model=' + model + ']').focus();
                };

                element.on('keyup', function () {
                    scope.$apply(function () {
                        scope.$parent['placeholder' + attrs.ngModel] = (element.val() === '') ? attrs.zbxPlaceholder : scope.$parent['placeholder' + attrs.ngModel] = '';
                    });

                }).on('blur', function () {
                        if (element.val() === '') {
                            scope.$apply(function () {
                                scope.$parent['placeholder' + attrs.ngModel] = attrs.zbxPlaceholder;
                            });
                        }
                    });
            };
        }
    };
});
